import { useContext, useMemo } from 'react';

import { UserContext } from '../contexts/user';

const useUserHasItem = id => {
  const { user } = useContext(UserContext);
  const userHasItem = useMemo(
    () => !!user?.items?.find(itemId => itemId === id),
    [user, id]
  );
  return userHasItem;
};

export default useUserHasItem;
