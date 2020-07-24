import { useState, useEffect } from 'react';
import { LOADING_STATUS } from '../enums';

const useStatus = () => {
  const [status, setStatus] = useState(LOADING_STATUS.IS_IDLE);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(status === LOADING_STATUS.IS_LOADING);
  }, [status]);

  return { status, setStatus, isLoading };
};

export default useStatus;
