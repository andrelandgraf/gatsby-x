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

  console.log('isOpen', isOpen);

  const toggleMenu = useCallback(() => {
    setIsOpen(!isOpen);
    setPageHidden(isOpen);
  }, [isOpen, setPageHidden]);

  const openMenu = useCallback(() => {
    setIsOpen(true);
    setPageHidden(true);
  }, [setPageHidden]);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setPageHidden(false);
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
