import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { STYLES } from '../../enums';

const Div = styled.div`
  ${({ collapse }) => (collapse ? '' : 'width: 100%;')}
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto;
  row-gap: ${({ gap }) => gap};
  justify-items: ${({ centered }) => (centered ? 'center' : 'start')};
  align-items: ${({ centered }) => (centered ? 'center' : 'start')};
  margin: ${({ margin }) => margin};

  @media screen and (max-width: ${STYLES.breakpoints.phoneWidth}px) {
    width: 100%;
  }
`;

const Stack = ({ children, collapse, centered, gap, margin }) => (
  <Div collapse={collapse} gap={gap} margin={margin} centered={centered}>
    {children}
  </Div>
);

Stack.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  collapse: PropTypes.bool,
  centered: PropTypes.bool,
  gap: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  margin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Stack.defaultProps = {
  collapse: false,
  centered: true,
  gap: 0,
  margin: 0,
};

export default Stack;
