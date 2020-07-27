const windowExists = () => typeof window !== 'undefined';

export const getRefreshToken = () =>
  windowExists() ? window.localStorage.refreshToken : undefined;

export const getAccessToken = () =>
  windowExists() ? window.localStorage.accessToken : undefined;

export const setRefreshToken = refreshToken => {
  if (windowExists()) window.localStorage.refreshToken = refreshToken;
};

export const setAccessToken = accessToken => {
  if (windowExists()) window.localStorage.accessToken = accessToken;
};

export const removeAuthTokens = () => {
  if (windowExists()) window.localStorage.removeItem('accessToken');
  if (windowExists()) window.localStorage.removeItem('refreshToken');
};

export const isAuthenticated = () => !!getAccessToken();

/**
 * Path to redirect after login/signup
 * @param {string} path
 */
export const setOnLoginRediret = path => {
  if (windowExists()) window.sessionStorage.onLoginPath = path;
};

export const getOnLoginRedirect = () =>
  windowExists() ? window.sessionStorage.onLoginPath : undefined;
