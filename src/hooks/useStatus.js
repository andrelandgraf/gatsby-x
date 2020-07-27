import { useState, useEffect } from 'react';
import { LOADING_STATUS } from '../enums';

const useStatus = () => {
  const [status, setStatus] = useState(LOADING_STATUS.isIdle);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(status === LOADING_STATUS.isLoading);
  }, [status]);

  return { status, setStatus, isLoading };
};

export default useStatus;
