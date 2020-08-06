import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import { ReactComponent as Info } from '../../assets/svgs/info.svg';
import { ReactComponent as Warning } from '../../assets/svgs/warning.svg';
import { ReactComponent as Success } from '../../assets/svgs/success.svg';
import { ReactComponent as Cancel } from '../../assets/svgs/cancel.svg';

import { MESSAGE_TYPES, STYLES } from '../../enums';
import CustomButton from '../clickables/customButton';

const MessageBox = styled(motion.div)`
  display: flex;
  align-items: center;
  padding: 2vh 2vw;
  margin: 0;
  min-width: 50%;
  max-width: 70%;
  text-align: left;
  @media screen and (max-width: ${STYLES.breakpoints.phoneWidth}px) {
    font-size: ${STYLES.fontSizes.xs};
    width: 100%;
    min-width: 100%;
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

  .gamify-icon {
    display: block;
    @media screen and (max-width: ${STYLES.breakpoints.phoneWidth}px) {
      display: none;
    }
  }
`;

const MessageText = styled.div`
  margin: 0 auto 0 20px;
  padding-right: 20px;
  max-width: 600px;
  font-weight: ${STYLES.fontWeights.normal};
  @media screen and (max-width: ${STYLES.breakpoints.phoneWidth}px) {
    margin: 0 auto 0 0;
  }
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
const Message = ({ type, message, onResolve, classes }) => {
  const gamifyIcon = useMemo(() => {
    switch (type) {
      case MESSAGE_TYPES.error:
      case MESSAGE_TYPES.warning:
        return <Warning className="gamify-icon" />;
      case MESSAGE_TYPES.success:
        return <Success className="gamify-icon" />;
      default:
        return <Info className="gamify-icon" />;
    }
  }, [type]);
  return (
    <MessageBox
      className={`box ${type}-message ${classes}`}
      initial="visible"
      animate="visible"
      exit="hidden"
      variants={{
        visible: { opacity: 1, transition: { duration: 2 } },
        hidden: { opacity: 0, transition: { duration: 0.6 } },
      }}
      role="alertdialog"
    >
      {gamifyIcon}
      <MessageText>
        <h4>{type}</h4>
        <span>{message}</span>
      </MessageText>
      <CustomButton
        id="dismiss-message"
        label="Dismiss message"
        title="Mark message as read and remove it from the page."
        onClick={onResolve}
      >
        <Cancel />
      </CustomButton>
    </MessageBox>
  );
};

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
