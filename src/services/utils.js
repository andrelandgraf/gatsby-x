import { throwCustomError } from '../utilities/error';
import { ERROR_TYPES } from '../enums';

export const HTTP_CODE_UNAUTHORIZED = 401;
export const HTTP_CODE_SERVICE_UNAVAILABLE = 503;

export const isNetworkError = err =>
  err.message === 'Network Error' ||
  (err.response &&
    Number(err.response.status) === HTTP_CODE_SERVICE_UNAVAILABLE);

export const isUnauthorizedError = status =>
  Number(status) === HTTP_CODE_UNAUTHORIZED;

export const throwNetworkError = () => {
  if (window.navigator.onLine) {
    throwCustomError(
      new Error('no internet connection'),
      ERROR_TYPES.noInternetConnection
    );
  }
  throwCustomError(
    new Error('server not reachable'),
    ERROR_TYPES.serversNotReachable
  );
};
