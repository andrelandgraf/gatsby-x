function configureStackTrace(objectRef, className) {
  if (Error.captureStackTrace) {
    Error.captureStackTrace(objectRef, className);
  }
}

class CustomError extends Error {
  isCustomError = true;

  // see enums/errorTypes
  type = undefined;

  constructor(...args) {
    super(...args);
    configureStackTrace(this, CustomError);
  }
}

export const throwCustomError = (error, fallbackType) => {
  const customError = new CustomError(error.message);
  customError.type = error.type || error?.response?.data?.type || fallbackType;
  console
    .tag('customError')
    .debug('throwing custom error with type', customError.type);
  throw customError;
};

export const isCustomError = error => error.isCustomError;
