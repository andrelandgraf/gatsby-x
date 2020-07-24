import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { STYLES } from '../../enums';

const StyledButton = styled.button`
  line-height: 1.499;
  position: relative;
  display: inline-block;
  font-weight: ${STYLES.fontWeights.normal};
  white-space: nowrap;
  text-align: center;
  background-image: none;
  border: 1px solid transparent;
  padding: 8px 16px;
  font-size: ${STYLES.fontSizes.m};
  color: ${({ theme }) => theme.colors.font};
  background-color: ${({ theme }) => theme.colors.background};
  border-color: ${({ theme }) => theme.colors.font};
  &.primary {
    color: ${({ theme }) => theme.colors.headlines};
    background-color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
    -webkit-box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
    &:hover {
      color: ${({ theme }) => theme.colors.headlines};
      background-color: ${STYLES.colors.background};
      border-color: ${({ theme }) => theme.colors.secondary};
    }
    &:focus {
      color: ${({ theme }) => theme.colors.headlines};
      background-color: ${STYLES.colors.background};
      border-color: ${({ theme }) => theme.colors.secondary};
    }
  }
  &:disabled {
    color: rgba(0, 0, 0, 0.25);
    background-color: #f5f5f5;
    border-color: #d9d9d9;
    text-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  &:hover {
    color: ${({ theme }) => theme.colors.font};
    background-color: ${({ theme }) => theme.colors.secondary};
    border-color: ${({ theme }) => theme.colors.font};
  }
  &:focus {
    color: ${({ theme }) => theme.colors.font};
    background-color: ${({ theme }) => theme.colors.seconday};
    border-color: ${({ theme }) => theme.colors.font};
  }
  &:active {
    -webkit-box-shadow: none;
    box-shadow: none;
  }
`;

/**
 * Standard button component
 * @param classes further css classes
 * @param label a label for the button
 * @param onClick function
 * @param primary if its a primary button (styling)
 * @param disabled if the button should be disabled (styling)
 */
const Button = React.forwardRef(
  ({ classes, label, onClick, primary, disabled }, ref) => (
    <StyledButton
      ref={ref}
      className={`${primary ? 'primary' : ''} ${classes}`}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </StyledButton>
  )
);

Button.displayName = 'Button';

Button.propTypes = {
  classes: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  primary: PropTypes.bool,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  classes: '',
  label: 'click',
  onClick: undefined,
  primary: false,
  disabled: false,
};

export default Button;
