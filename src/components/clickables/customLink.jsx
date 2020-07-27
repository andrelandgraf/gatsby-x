import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

const CustomLink = ({ children, link, isPage, isLink, newTab, onClick }) => (
  <>
    {newTab ? (
      <a
        href={link}
        className={`${isPage ? 'page' : ''} ${isLink && !isPage ? 'link' : ''}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
      >
        {children}
      </a>
    ) : (
      <Link
        to={link}
        className={`${isPage ? 'page' : ''} ${isLink && !isPage ? 'link' : ''}`}
        activeClassName={`${isPage ? 'current-page' : ''}`}
        onClick={onClick}
      >
        {children}
      </Link>
    )}
  </>
);

CustomLink.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  link: PropTypes.string.isRequired,
  isPage: PropTypes.bool,
  isLink: PropTypes.bool,
  newTab: PropTypes.bool,
  onClick: PropTypes.func,
};

CustomLink.defaultProps = {
  isPage: false,
  isLink: true,
  newTab: false,
  onClick: undefined,
};

export default CustomLink;
