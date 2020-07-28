import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import STYLES from '../../enums/styles';

const Label = styled.label`
  ${({ alignLeft }) => (alignLeft ? 'width: 100%;' : '')}
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
`;

const Span = styled.span`
  text-align: left;
  font-size: ${STYLES.fontSizes.s};
`;

const Box = styled.input`
  margin-right: 15px;
  display: block;
`;

const Checkbox = ({ label, checked, onChange, required, id, alignLeft }) => (
  <Label htmlFor={id} alignLeft={alignLeft}>
    <Box
      type="checkbox"
      id={id}
      checked={checked}
      onChange={onChange}
      required={required}
    />
    <Span>{label}</Span>
  </Label>
);

Checkbox.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  id: PropTypes.string.isRequired,
  alignLeft: PropTypes.bool,
};

Checkbox.defaultProps = {
  required: false,
  alignLeft: false,
};

export default Checkbox;
