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

export const registerUser = ({ email, password, givenName, familyName }) =>
  postRequest(API.REGISTER, {
    user: {
      email,
      password,
      givenName,
      familyName,
    },
  }).then(() => logUserIn(email, password));

export const fetchUser = () => getRequest(API.ME);

export const logUserOut = () => removeAuthTokens();

export const changePassword = password =>
  putRequest(API.CHANGEPW, { password });

export const applyResetPw = email => putRequest(API.TOKEN, { email });
