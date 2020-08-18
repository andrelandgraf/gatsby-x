import { useContext, useState, useEffect } from 'react';

import { UserContext } from '../contexts/user';

const useIsLoggedIn = () => {
  const { user } = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(!!user);

  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);

  return isLoggedIn;
};

export default useIsLoggedIn;
