import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Dialog from '../components/dialog/dialog';

const DialogContext = React.createContext({
  isOpen: false,
  toggleDialog: () => {},
  closeDialog: () => {},
});

function DialogProvider({ children }) {
  const [showDialog, setShowDialog] = useState(false);
  const [dialog, setDialog] = useState(null);

  const openDialog = useCallback(newDialog => {
    setDialog(newDialog);
    setShowDialog(true);
  }, []);

  const closeDialog = useCallback(() => {
    setShowDialog(false);
    setDialog(null);
  }, []);

  const context = {
    isOpen: showDialog,
    openDialog,
    closeDialog,
  };

  return (
    <DialogContext.Provider value={context}>
      {showDialog && <Dialog>{dialog}</Dialog>}
      {children}
    </DialogContext.Provider>
  );
}

DialogProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export { DialogContext, DialogProvider };
