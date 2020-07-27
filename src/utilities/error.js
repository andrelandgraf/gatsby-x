function configureStackTrace(objectRef, className) {
  if (Error.captureStackTrace) {
    Error.captureStackTrace(objectRef, className);
  }
}

export default class CustomError extends Error {
  isCustomError = true;

  constructor(...args) {
    super(...args);
    configureStackTrace(this, CustomError);
  }
}

export const isCustomError = error => error.isCustomError;
