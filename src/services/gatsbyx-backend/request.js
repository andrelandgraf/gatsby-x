import axios from 'axios';

import { refreshAuthToken } from './oauth';
import {
  isUnauthorizedError,
  isNetworkError,
  throwNetworkError,
} from '../utils';
import { getAccessToken } from '../../utilities/storage';
import { throwCustomError } from '../../utilities/error';

const tag = 'httpService';

function getHeaders() {
  return {
    accept: 'application/json',
    authorization: `Bearer ${getAccessToken()}`,
  };
}

function postHeaders() {
  return {
    'content-type': 'application/json',
    authorization: `Bearer ${getAccessToken()}`,
  };
}

const handleError = (err, endpoint, method, request) => {
  console.tag(tag).debug('error response', err.response);
  console
    .tag(tag)
    .error(`Error in ${method} request to entpoint ${endpoint}`, err);
  if (isNetworkError(err)) {
    throwNetworkError();
  }
  const { status } = err.response;
  if (isUnauthorizedError(status)) {
    return refreshAuthToken(request);
  }
  throw throwCustomError(err);
};

export const postRequest = (endpoint, data) =>
  axios
    .post(endpoint, data, { headers: postHeaders() })
    .then(res => res.data)
    .catch(err => {
      handleError(err, endpoint, 'post', () => postRequest(endpoint, data));
    });

export const putRequest = (endpoint, data) =>
  axios
    .put(endpoint, data, { headers: postHeaders() })
    .then(res => res.data)
    .catch(err => {
      handleError(err, endpoint, 'put', () => putRequest(endpoint, data));
    });

export const deleteRequest = (endpoint, data) =>
  axios
    .delete(endpoint, { headers: postHeaders(), data })
    .then(res => res.data)
    .catch(err => {
      handleError(err, endpoint, 'delete', () => deleteRequest(endpoint, data));
    });

export const getRequest = endpoint =>
  axios
    .get(endpoint, { headers: getHeaders() })
    .then(res => res.data)
    .catch(err => {
      handleError(err, endpoint, 'get', () => getRequest(endpoint));
    });
