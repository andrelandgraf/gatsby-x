import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const NavigationContext = React.createContext({
  isOpen: false,
  toggleMenu: () => {},
  openMenu: () => {},
  closeMenu: () => {},
});

const NavigationProvider = ({ setPageHidden, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setPageHidden(!isOpen);
    setIsOpen(!isOpen);
  }, [isOpen, setPageHidden]);

  const openMenu = useCallback(() => {
    setPageHidden(true);
    setIsOpen(true);
  }, [setPageHidden]);

  const closeMenu = useCallback(() => {
    setPageHidden(false);
    setIsOpen(false);
  }, [setPageHidden]);

  const context = {
    isOpen,
    toggleMenu,
    openMenu,
    closeMenu,
  };

  return (
    <NavigationContext.Provider value={context}>
      {children}
    </NavigationContext.Provider>
  );
};

NavigationProvider.propTypes = {
  setPageHidden: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export { NavigationContext, NavigationProvider };
