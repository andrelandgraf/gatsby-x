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
  ${({ collapse }) => (collapse ? '' : 'width: 100%;')}
  display: grid;
  grid-template-columns: minmax(0, 1fr);
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

const Stack = ({ children, collapse, centered, gap, margin, useMotion }) => (
  <>
    {useMotion ? (
      <MotionedDiv
        collapse={collapse}
        gap={gap}
        margin={margin}
        centered={centered}
        layout
        transition={spring}
      >
        {children}
      </MotionedDiv>
    ) : (
      <Div collapse={collapse} gap={gap} margin={margin} centered={centered}>
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
  collapse: PropTypes.bool,
  centered: PropTypes.bool,
  gap: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  margin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  useMotion: PropTypes.bool,
};

Stack.defaultProps = {
  collapse: false,
  centered: true,
  gap: 0,
  margin: 0,
  useMotion: false,
};

export default Stack;
