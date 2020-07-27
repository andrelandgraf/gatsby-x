import CustomError from '../utilities/error';

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
    throw CustomError(
      'Sorry, it looks like you lost your internet connection. Please check your connection and try again.'
    );
  }
  throw CustomError(
    'Sorry, it looks like our servers are currently not reachable. Please try again later.'
  );
};
