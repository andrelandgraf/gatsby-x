import { useEffect } from 'react';

import useFocusNode from './useFocusNode';

const useFocusOnMount = ref => {
  const focusNode = useFocusNode();
  useEffect(() => {
    console.log('tryyyyyy');
    if (ref.current) {
      console.log('focussing');
      focusNode(ref.current);
    }
  }, [focusNode, ref]);
};

export default useFocusOnMount;
