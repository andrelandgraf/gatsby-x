import { useContext, useCallback } from 'react';

import { MESSAGE_TYPES } from '../enums';
import { isCustomError } from '../utilities/error';
import { MessageContext } from '../contexts/message';

const errorMessages = {
  // wrong email or password
  wrongCredentials:
    'It looks like your credentials are wrong. Please check your email address for any typos and retry your password. You can always reset your password in case you forgot it',
  // no user account for this email
  userNotFound:
    'There is no account with the given email address. Please check your email address for any typos. This form only works if you are already registered. Are you a new user? Please click on Signup.',
  // session expired due to expired refresh token
  sessionExpired: 'Please login again, your session timed out.',
  // unable to find requested object
  ressourceNotFound:
    'Excuse us, something went wrong here. We are unable to find what you are looking for. This error has been reported and we will try to solve this issue as soon as possible. Try refreshing the page, maybe that works already.',
  // bad request, e.g. missing parameters
  badRequest:
    'Excuse us, something went wrong here. We made a bad request to our servers. This error has been reported and we will try to solve this issue as soon as possible. Try refreshing the page, maybe that works already.',
  // signup error: email address already in use
  emailTaken:
    'Sorry, it looks like this email is already taken. Is that you? This page is for new users. If you already have an user account with us, click on login.',
  // the servers don't respond
  serversNotReachable:
    'Sorry, it looks like our servers are currently not reachable. Please try again later.',
  // client has no internet connection
  noInternetConnection:
    'It looks like you lost your internet connection. Please check your connection and try again.',
  // generic fallback message
  generic:
    'Sorry, something went wrong. This error has been reported and we will try to solve this issue as soon as possible. Try refreshing the page, maybe that works already.',
};

const useDisplayErrorMessage = () => {
  const { setMessage, setType } = useContext(MessageContext);
  const displayErrorMessage = useCallback(
    error => {
      setType(MESSAGE_TYPES.error);
      if (isCustomError(error)) {
        if (
          !error.type ||
          !Object.keys(errorMessages).find(key => key === error.type)
        ) {
          error.type = 'generic';
        }
        const message = errorMessages[error.type];
        setMessage(message);
      } else {
        setMessage(errorMessages.generic);
      }
    },
    [setMessage, setType]
  );

  return displayErrorMessage;
};

export default useDisplayErrorMessage;
