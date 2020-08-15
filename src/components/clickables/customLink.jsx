import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import { NavigationContext } from '../../contexts/navigation';

const CustomLink = ({ children, link, isPage, newTab, onClick }) => {
  const { closeMenu } = useContext(NavigationContext);

  const handleClick = useCallback(
    e => {
      if (isPage) {
        closeMenu();
      }
      if (onClick) {
        onClick(e);
      }
    },
    [closeMenu, isPage, onClick]
  );

  return (
    <>
      {newTab ? (
        <a
          href={link}
          className={`${isPage ? 'page' : ''}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
        >
          {children}
        </a>
      ) : (
        <Link
          to={link}
          className={`${isPage ? 'page' : ''}`}
          activeClassName={`${isPage ? 'current-page' : ''}`}
          onClick={handleClick}
        >
          {children}
        </Link>
      )}
    </>
  );
};

CustomLink.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  link: PropTypes.string.isRequired,
  isPage: PropTypes.bool,
  newTab: PropTypes.bool,
  onClick: PropTypes.func,
};

CustomLink.defaultProps = {
  isPage: false,
  newTab: false,
  onClick: undefined,
};

export default CustomLink;
