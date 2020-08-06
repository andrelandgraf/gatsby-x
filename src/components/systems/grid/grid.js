import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { STYLES } from '../../../enums';

const Div = styled.div`
  ${({ collapse }) => (collapse ? '' : 'width: 100%;')}
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
  grid-gap: ${({ gap }) => gap};
  margin: ${({ margin }) => margin};

  @media screen and (max-width: ${STYLES.breakpoints.phoneWidth}px) {
    grid-template-columns: minmax(0, 1fr);
    width: 100%;
  }
`;

const Grid = ({ children, collapse, gap, margin }) => (
  <Div collapse={collapse} gap={gap} margin={margin}>
    {children}
  </Div>
);

Grid.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  collapse: PropTypes.bool,
  gap: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  margin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Grid.defaultProps = {
  collapse: false,
  gap: 0,
  margin: 0,
};

export default Grid;
