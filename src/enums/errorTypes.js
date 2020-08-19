export default Object.freeze({
  /** shared errors */

  // wrong email or password
  wrongCredentials: 'wrongCredentials',
  // no user account for this email
  userNotFound: 'userNotFound',
  // session expired due to expired refresh token
  sessionExpired: 'sessionExpired',
  // unable to find requested object
  ressourceNotFound: 'ressourceNotFound',
  // bad request, e.g. missing parameters
  badRequest: 'badRequest',
  // signup error: email address already in use
  emailTaken: 'emailTaken',

  /** frontend only errors */
  // the servers don't respond
  serversNotReachable: 'serversNotReachable',
  // client has no internet connection
  noInternetConnection: 'noInternetConnection',
});
