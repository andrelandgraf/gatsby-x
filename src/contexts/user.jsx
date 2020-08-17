import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import LogRocket from 'logrocket';

import { LOADING_STATUS, ENV } from '../enums';
import { isAuthenticated } from '../utilities/storage';
import { fetchUser, logUserOut } from '../services/gatsbyx-backend/user';
import useStatus from '../hooks/useStatus';

const tag = 'UserContext';

const UserContext = React.createContext({
  user: undefined,
  setUser: () => {},
  status: LOADING_STATUS.isIdle,
  setStatus: () => {},
  isLoading: false,
  handleLogout: () => {},
});

function UserProvider({ children }) {
  const [user, setUser] = useState();
  const [startedLogrocket, setStartedLogrocket] = useState(false);
  const { status, setStatus, isLoading } = useStatus();

  const handleLogout = useCallback(() => {
    logUserOut();
    setUser(undefined);
  }, []);

  // once we are on the browser, run this code
  useEffect(() => {
    if (isAuthenticated()) {
      console.tag(tag).debug('authTokens found in localStorage');
      setStatus(LOADING_STATUS.IS_LOADING);
      fetchUser()
        .then(fetchedUser => {
          console.tag(tag).debug('updating user', fetchedUser);
          setStatus(LOADING_STATUS.HAS_SUCCEEDED);
          setUser(fetchedUser);
        })
        .catch(error => {
          console.tag(tag).error(error);
          setStatus(LOADING_STATUS.hasFailed);
          setUser(undefined);
          logUserOut();
        });
    }
  }, [setStatus]);

  useEffect(() => {
    if (user && !startedLogrocket && ENV.useLogrocket) {
      setStartedLogrocket(true);
      LogRocket.identify(user._id, {
        name: user.givenName,
        email: user._id,
      });
    }
  }, [startedLogrocket, user]);

  const context = {
    user,
    setUser,
    status,
    setStatus,
    isLoading,
    handleLogout,
  };

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export { UserContext, UserProvider };
