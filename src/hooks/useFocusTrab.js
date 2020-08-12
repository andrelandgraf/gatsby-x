import { useCallback } from 'react';

import useFocusNode from './useFocusNode';

const useFocusTrab = (
  firstFocusableRef,
  lastFocusableRef = firstFocusableRef
) => {
  const focusNode = useFocusNode();
  const handleKeyDown = useCallback(
    event => {
      const { current: firstNode } = firstFocusableRef;
      const { current: lastNode } = lastFocusableRef;
      if (event.key === 'Tab' || event.keyCode === 9) {
        if (event.shiftKey && event.target === firstNode) {
          event.preventDefault();
          focusNode(lastNode);
          return;
        }
        if (!event.shiftKey && event.target === lastNode) {
          event.preventDefault();
          focusNode(firstNode);
        }
      }
    },
    [firstFocusableRef, focusNode, lastFocusableRef]
  );
  return handleKeyDown;
};

export default useFocusTrab;
