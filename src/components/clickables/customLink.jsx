import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from 'styled-components';

import { NavigationContext } from '../../contexts/navigation';
import { StyledButton } from './button';

export const ButtonContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 40px;
    margin-right: 5px;
  }
`;

export const styles = {
  asA: 'a',
  asButton: 'button',
  asPrimaryButton: 'primaryButton',
};

const CustomLink = ({
  children,
  link,
  isPage,
  newTab,
  onClick,
  as,
  title,
  download,
}) => {
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

  if (as === styles.asButton || as === styles.asPrimaryButton) {
    /**
     * why? To style download link as button
     * for all other button link usage use
     * onClick () => navigate() instead
     */
    return (
      <StyledButton
        as="a"
        className={`a-as-button clickable ${
          as === styles.asPrimaryButton ? 'primary' : ''
        }`}
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        title={title}
        download={download}
      >
        <ButtonContent>{children}</ButtonContent>
      </StyledButton>
    );
  }

  return (
    <>
      {newTab ? (
        <a
          href={link}
          className={`${isPage ? 'page' : ''}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          title={title}
          download={download}
        >
          {children}
        </a>
      ) : (
        <Link
          to={link}
          className={`${isPage ? 'page' : ''}`}
          activeClassName={`${isPage ? 'current-page' : ''}`}
          onClick={handleClick}
          title={title}
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
  as: PropTypes.oneOfType(Object.values(styles)),
  title: PropTypes.string,
  download: PropTypes.string,
};

CustomLink.defaultProps = {
  isPage: false,
  newTab: false,
  onClick: undefined,
  as: styles.asA,
  title: '',
  download: undefined,
};

export default CustomLink;
