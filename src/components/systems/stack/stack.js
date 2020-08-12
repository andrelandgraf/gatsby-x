import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import { STYLES } from '../../../enums';

const spring = {
  type: 'spring',
  stiffness: 700,
  damping: 100,
};

const Div = styled.div`
  ${({ collapseX }) => (collapseX ? '' : 'width: 100%;')}
  ${({ expandY }) => (expandY ? 'min-height: 100%;' : '')}
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-auto-rows: minmax(min-content, max-content);
  row-gap: ${({ gap }) => gap};
  justify-items: ${({ centered }) => (centered ? 'center' : 'start')};
  align-items: ${({ centered }) => (centered ? 'center' : 'start')};
  text-align: ${({ centered }) => (centered ? 'center' : 'left')};
  margin: ${({ margin }) => margin};

  @media screen and (max-width: ${STYLES.breakpoints.phoneWidth}px) {
    width: 100%;
  }
`;

const MotionedDiv = motion.custom(Div);

const Stack = ({
  children,
  collapseX,
  expandY,
  centered,
  gap,
  margin,
  useMotion,
}) => (
  <>
    {useMotion ? (
      <MotionedDiv
        collapseX={collapseX}
        expandY={expandY}
        gap={gap}
        margin={margin}
        centered={centered}
        layout
        transition={spring}
      >
        {children}
      </MotionedDiv>
    ) : (
      <Div collapseX={collapseX} gap={gap} margin={margin} centered={centered}>
        {children}
      </Div>
    )}
  </>
);

Stack.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  collapseX: PropTypes.bool,
  expandY: PropTypes.bool,
  centered: PropTypes.bool,
  gap: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  margin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  useMotion: PropTypes.bool,
};

Stack.defaultProps = {
  collapseX: false,
  expandY: false,
  centered: true,
  gap: 0,
  margin: 0,
  useMotion: false,
};

export default Stack;
