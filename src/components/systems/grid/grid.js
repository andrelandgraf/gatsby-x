import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { STYLES } from '../../../enums';

const Div = styled.div`
  ${({ collapse }) => (collapse ? '' : 'width: 100%;')}
  display: grid;
  grid-template-columns: ${({ columns }) =>
    `repeat(${columns}, minmax(0, 1fr))`};
  grid-gap: ${({ gap }) => gap};
  margin: ${({ margin }) => margin};
  justify-items: ${({ centered }) => (centered ? 'center' : 'normal')};
  align-items: ${({ centered }) => (centered ? 'center' : 'normal')};
  text-align: ${({ centered }) => (centered ? 'center' : 'left')};

  @media screen and (max-width: ${STYLES.breakpoints.phoneWidth}px) {
    grid-template-columns: minmax(0, 1fr);
    width: 100%;
  }
`;

const Grid = ({ children, collapse, gap, margin, centered, columns }) => (
  <Div
    collapse={collapse}
    gap={gap}
    margin={margin}
    centered={centered}
    columns={columns}
  >
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
  columns: PropTypes.number,
  centered: PropTypes.bool,
};

Grid.defaultProps = {
  collapse: false,
  gap: 0,
  margin: 0,
  columns: 3,
  centered: false,
};

export default Grid;
