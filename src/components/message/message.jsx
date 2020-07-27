import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Info from '../../assets/svgs/info.svg';
import Warning from '../../assets/svgs/warning.svg';
import Success from '../../assets/svgs/success.svg';
import Cancel from '../../assets/svgs/cancel.svg';

import { MESSAGE_TYPES, STYLES } from '../../enums';
import IconButton from '../clickables/customButton';

//   box-shadow: none;
const MessageBox = styled.div`
  display: flex;
  align-items: center;
  padding: 2vh 2vw;
  margin: 0 auto;
  min-width: 50%;
  max-width: 70%;
  @media screen and (max-width: ${STYLES.breakpoints.phoneWidth}px) {
    font-size: ${STYLES.fontSizes.xs};
    padding: 1vh 1vw;
    width: 100%;
  }
  &.error-message {
    background-color: ${STYLES.colors.error};
    color: ${STYLES.colors.fontWhite};
    svg {
      fill: ${STYLES.colors.fontWhite};
    }
  }
  &.warning-message {
    background-color: ${STYLES.colors.warning};
    color: ${STYLES.colors.fontWhite};
    svg {
      fill: ${STYLES.colors.fontWhite};
    }
  }
  &.info-message {
    background-color: ${STYLES.colors.info};
    color: ${STYLES.colors.fontWhite};
    svg {
      fill: ${STYLES.colors.fontWhite};
    }
  }
  &.success-message {
    background-color: ${STYLES.colors.success};
    color: ${STYLES.colors.fontWhite};
    svg {
      fill: ${STYLES.colors.fontWhite};
    }
  }

  svg {
    width: 30px;
  }
`;

const MessageText = styled.div`
  margin: 0 auto 0 20px;
  padding-right: 20px;
  max-width: 600px;
  font-weight: ${STYLES.fontWeights.normal};
  h4 {
    color: ${STYLES.colors.fontWhite};
    font-weight: ${STYLES.fontWeights.semiBold};
    margin: 0 0 5px 0;
  }
`;

/**
 * Message component to display info, warnings and error messages to the user
 * @param type if err, warning or info
 * @param message the message content
 * @param onResolve function to e.g. close the message
 * @param classes further css classes for styling
 */
const Message = ({ type, message, onResolve, classes }) => (
  <MessageBox className={`box ${type}-message ${classes}`}>
    {type === MESSAGE_TYPES.error && <Warning />}
    {type === MESSAGE_TYPES.warning && <Warning />}
    {type === MESSAGE_TYPES.info && <Info />}
    {type === MESSAGE_TYPES.success && <Success />}
    <MessageText>
      <h4>{type}</h4>
      <span>{message}</span>
    </MessageText>
    <IconButton id="dismiss-message" alt="dismiss message" onClick={onResolve}>
      <Cancel />
    </IconButton>
  </MessageBox>
);

Message.propTypes = {
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  type: PropTypes.string,
  onResolve: PropTypes.func,
  classes: PropTypes.string,
};

Message.defaultProps = {
  type: 'info',
  classes: '',
  onResolve: undefined,
};

export default Message;
