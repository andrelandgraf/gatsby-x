import React, { useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const DialogContext = React.createContext({
  isOpen: false,
  openDialog: () => {},
  closeDialog: () => {},
});

const DialogProvider = ({ setPageHidden, children }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [dialog, setDialog] = useState(null);
  const focusRef = useRef();

  const openDialog = useCallback(
    newDialog => {
      setPageHidden(true);
      setDialog(newDialog);
      setShowDialog(true);
      if (document.activeElement) {
        focusRef.current = document.activeElement;
      }
    },
    [setPageHidden]
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

  console.log('context', context);

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
