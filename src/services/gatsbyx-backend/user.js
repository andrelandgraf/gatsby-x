import API from './api';
import { postRequest, getRequest, putRequest } from './request';
import { removeAuthTokens } from '../../utilities/storage';
import { authenticate, GRANT_TYPES } from './oauth';

const TAG = 'userService';

export const logUserIn = (email, password) => {
  const data = {
    grant_type: GRANT_TYPES.PASSWORD,
    username: email,
    password,
  };
  return authenticate(data);
};

export const registerUser = ({ email, password, givenName, familyName }) => {
  if (!email || !password || !givenName || !familyName) {
    throw new Error('passed user object misses required fields');
  }
  return postRequest(API.REGISTER, {
    user: {
      email,
      password,
      givenName,
      familyName,
    },
  })
    .then(() => logUserIn(email, password))
    .catch(err => {
      console.tag(TAG).error('Error while registering new user', err);
      //   if (isCustomError(err)) {
      //     throw err;
      //   }
      // throwUsernameAlreadyTaken();
    });
};

export const fetchUser = () => getRequest(API.ME);

export const logUserOut = () => removeAuthTokens();

export const changePassword = password =>
  putRequest(API.CHANGEPW, { password });

export const checkoutCourse = id => postRequest(`${API.CHECKOUT}${id}`, {});

export const putVideoProgress = (id, index, progress) =>
  putRequest(API.PROGRESS.replace('{id}', id).replace('{index}', index), {
    progress,
  });

export const putPermissions = permissions =>
  putRequest(API.PERMISSIONS, { permissions });

export const resetVideoProgress = id =>
  putRequest(API.RESET.replace('{id}', id), {});

export const applyResetPw = email =>
  putRequest(API.TOKEN, { email }).catch(err => {
    console.tag(TAG).debug('applyResetPw failed');
    // if (isCustomError(err)) {
    //   console.tag(TAG).debug('forwarding custom error');
    //   throw err;
    // }

    const { code } = err.response.data;
    console.tag(TAG).debug('code from backend is', code);
    // throwEmailNotFound();
    throw err;
  });
