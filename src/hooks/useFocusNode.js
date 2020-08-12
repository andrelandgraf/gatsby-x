import { useCallback } from 'react';

const useFocusNode = () =>
  useCallback(node => {
    if (!node || !node.focus || node === document.activeElement) return;
    node.focus();
    if (
      node.tagName &&
      node.tagName.toLowerCase() === 'input' &&
      typeof node.select === 'function'
    ) {
      node.select();
    }
  }, []);

export default useFocusNode;
