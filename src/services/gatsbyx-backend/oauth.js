import axios from 'axios';
import qs from 'qs';

import API from './api';
import {
  setAccessToken,
  setRefreshToken,
  getRefreshToken,
  removeAuthTokens,
} from '../../utilities/storage';
import {
  isNetworkError,
  isUnauthorizedError,
  throwNetworkError,
} from '../utils';
import CustomError, { isCustomError } from '../../utilities/error';

const tag = 'authService';

export const GRANT_TYPES = {
  REFRESH_TOKEN: 'refresh_token',
  PASSWORD: 'password',
};

/**
 * getTokenHeaders returns the required headers for the authentication request
 */
export const getTokenHeaders = () => {
  const clientId = 'gatsbyx';
  const clientSecret = process.env.GATSBY_PILATES_STUDIO_SECRET;
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
    'base64'
  );
  return {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Basic ${credentials}`,
  };
};

/**
 * postAuthRequest requests the access token (e.g. through refresh token or user authentication)
 */
const postAuthRequest = (data, headers) =>
  axios.post(API.TOKEN, data, { headers }).catch(err => {
    console
      .tag(tag)
      .error(`error in post request to endpoint ${API.TOKEN}`, err);
    if (isNetworkError(err)) {
      throwNetworkError();
    }
    throw err;
  });

/**
 * authenticate handles the login of a user via token retrieval
 */
export const authenticate = data =>
  postAuthRequest(qs.stringify(data), getTokenHeaders())
    .then(res => {
      setAccessToken(res.data.accessToken);
      setRefreshToken(res.data.refreshToken);
      return res.data.user;
    })
    .catch(err => {
      console.tag(tag).error('error in authenticate', err);
      if (isCustomError(err)) {
        throw err;
      }
      throw CustomError(
        'It looks like your credentials are wrong. Please check your email address for any typos and retry your password. You can always reset your password in case you forgot it'
      );
    });

const ONE_HOUR = 60 * 60 * 1000; /* ms */
let refreshPromise;
let refreshPromised;
/**
 *  refreshAuthToken gets called to retrieve a new access token via the refresh token
 */
export const refreshAuthToken = async resolve => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    throw Error('no refresh token found in localstorage');
  }
  const data = {
    grant_type: GRANT_TYPES.REFRESH_TOKEN,
    refresh_token: refreshToken,
  };
  console.tag(tag).debug(`now is ${Date.now()}`);
  if (!refreshPromise || Date.now() - refreshPromised > ONE_HOUR) {
    console.tag(tag).debug(`one hour has passed since ${refreshPromised}`);
    refreshPromised = Date.now();
    refreshPromise = authenticate(data);
  } else {
    console
      .tag(tag)
      .debug('someone already called for refresh token, I will just wait');
  }
  await refreshPromise;

  resolve().catch(err => {
    console
      .tag(tag)
      .error(`${err.response.data.code}:${err.response.message}`, err);
    const { status } = err.response;
    if (isUnauthorizedError(status)) {
      removeAuthTokens();
      throw CustomError('Please login again, your session timed out.');
    }
    throw err;
  });
};

export const resetPassword = (accessToken, password) =>
  axios
    .put(
      API.CHANGEPW,
      { password },
      {
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then(res => res.data)
    .catch(err => {
      console
        .tag(tag)
        .error(
          `Error in resetPassword request to entpoint ${API.CHANGEPW}`,
          err
        );
      if (isNetworkError(err)) {
        throwNetworkError();
      }
      throw err;
    });
