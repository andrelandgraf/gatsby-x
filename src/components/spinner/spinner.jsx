import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ReactComponent as SpinningSvg } from '../../assets/svgs/spinner.svg';
import { STYLES } from '../../enums';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 50px;
    fill: ${({ theme }) => theme.colors.primary};
  }
  &.tiny {
    svg {
      width: 30px;
    }
  }
  &.fullpage {
    position: absolute;
    z-index: 2147483647;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: translate3d(0, 0, 0);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) =>
      STYLES.hexToRgba(theme.colors.background, 0.8)};
    color: ${({ theme }) => STYLES.hexToRgba(theme.colors.headlines, 0.8)};
    font-size: ${STYLES.fontWeights.semiBold};
  }
`;

export const spinnerType = Object.freeze({
  fullpage: 'fullpage',
  tiny: 'tiny',
  default: 'default',
});

/**
 * Loading spinner component
 * @param fullpage if the loading spinner should disable all content
 * @param message message to be displayed next to the spinner
 * @param tiny if a tiny spinner should be displayed e.g. to be used inside a button
 */
const Spinner = ({ message, type }) => (
  <Container className={type}>
    <SpinningSvg />
    {message}
  </Container>
);

Spinner.propTypes = {
  type: PropTypes.oneOf(Object.keys(spinnerType).map(key => spinnerType[key])),
  message: PropTypes.string,
};

Spinner.defaultProps = {
  type: spinnerType.default,
  message: '',
};

export default Spinner;
