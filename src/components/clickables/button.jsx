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
  color: ${({ theme }) => theme.colors.headlines};
  background-color: ${({ theme }) => theme.colors.buttonBackground};
  border-color: ${({ theme }) => theme.colors.buttonBackground};
  border-radius: 10px;
  box-shadow: 0 2px 8px
    ${({ theme }) => STYLES.hexToRgba(theme.colors.font, 0.15)};
  text-shadow: 0 -1px 0 ${({ theme }) => STYLES.hexToRgba(theme.colors.font, 0.15)};
  &.primary {
    color: ${({ theme }) => theme.colors.headlines};
    background-color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    &:hover {
      background-color: ${({ theme }) => theme.colors.secondary};
      border-color: ${({ theme }) => theme.colors.secondary};
    }
    &:focus {
      background-color: ${({ theme }) => theme.colors.secondary};
      border-color: ${({ theme }) => theme.colors.secondary};
    }
  }
  &:disabled {
    color: rgba(0, 0, 0, 0.25);
    background-color: #f5f5f5;
    border-color: #d9d9d9;
    pointer-events: none;
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    border-color: ${({ theme }) => theme.colors.secondary};
  }
  &:focus {
    background-color: ${({ theme }) => theme.colors.seconday};
    border-color: ${({ theme }) => theme.colors.seconday};
  }
  &:active {
    -webkit-box-shadow: none;
    box-shadow: none;
    transform: translateY(0.5px);
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
