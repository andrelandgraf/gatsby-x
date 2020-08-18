import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { STYLES } from '../../enums';
import Spinner, { spinnerType } from '../spinner/spinner';

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
    border-color: ${({ theme }) => theme.border.color};
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

  &.submit {
    margin: 0 5px;
    width: 100%;
  }
`;

const Button = React.forwardRef(
  ({ classes, label, onClick, primary, disabled, isLoading, submit }, ref) => (
    <StyledButton
      ref={ref}
      className={`${primary || submit ? 'primary' : ''} ${
        submit ? 'submit' : ''
      } ${classes}`}
      type={submit ? 'submit' : 'button'}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? <Spinner type={spinnerType.tiny} message={label} /> : label}
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
  isLoading: PropTypes.bool,
  submit: PropTypes.bool,
};

Button.defaultProps = {
  classes: '',
  label: 'click',
  onClick: undefined,
  primary: false,
  disabled: false,
  isLoading: false,
  submit: false,
};

export default Button;
