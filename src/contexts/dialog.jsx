import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useContext,
} from 'react';
import PropTypes from 'prop-types';

import { NavigationContext } from './navigation';

const DialogContext = React.createContext({
  isOpen: false,
  openDialog: () => {},
  closeDialog: () => {},
});

const DialogProvider = ({ setPageHidden, children }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [dialog, setDialog] = useState(null);
  const { closeMenu } = useContext(NavigationContext);
  const focusRef = useRef();

  const openDialog = useCallback(
    newDialog => {
      closeMenu();
      setPageHidden(true);
      setDialog(newDialog);
      setShowDialog(true);
      if (document.activeElement) {
        focusRef.current = document.activeElement;
      }
    },
    [closeMenu, setPageHidden]
  );

  const closeDialog = useCallback(() => {
    setPageHidden(false);
    setShowDialog(false);
    setDialog(null);
    if (focusRef.current) {
      setTimeout(() => {
        if (document.body.contains(focusRef.current)) {
          focusRef.current.focus();
        }
      });
    }
  }, [setPageHidden]);

  useEffect(
    () => () => {
      setPageHidden(false);
    },
    [setPageHidden]
  );

  const context = {
    isOpen: showDialog,
    openDialog,
    closeDialog,
  };

  return (
    <DialogContext.Provider value={context}>
      {showDialog && dialog}
      {children}
    </DialogContext.Provider>
  );
};

DialogProvider.propTypes = {
  setPageHidden: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export { DialogContext, DialogProvider };
