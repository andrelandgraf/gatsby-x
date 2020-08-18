import { useEffect } from 'react';

import useFocusNode from './useFocusNode';

const useFocusOnMount = ref => {
  const focusNode = useFocusNode();
  useEffect(() => {
    if (ref.current) {
      focusNode(ref.current);
    }
  }, [focusNode, ref]);
};

export default useFocusOnMount;
