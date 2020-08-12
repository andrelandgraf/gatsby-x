import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import STYLES from '../../enums/styles';

const Background = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.buttonBackground};
  opacity: 0.5;
  z-index: 99;
  overflow: hidden;
`;

const Modal = styled.div`
  overflow-y: scroll;
  position: fixed;
  z-index: 100;
  background-color: ${({ theme }) => theme.colors.boxBackground};
  opacity: 1;
  margin: auto;
  padding: 40px;
  width: 50vw;
  height: 50vh;
  top: 25vh;
  left: 0;
  right: 0;
  @media screen and (max-width: ${STYLES.breakpoints.padWidth}px) {
    padding: 20px;
    width: 60vw;
    height: 60vh;
  }
  @media screen and (max-width: ${STYLES.breakpoints.phoneWidth}px) {
    top: 8vh;
    width: 90vw;
    height: 85vh;
  }
`;

const Dialog = ({ title, handleKeyDown, children }) => {
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      <Background />
      <Modal className="box" role="dialog" aria-label={title} tabIndex="-1">
        {children}
      </Modal>
    </>
  );
};

Dialog.propTypes = {
  title: PropTypes.string.isRequired,
  handleKeyDown: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Dialog;
