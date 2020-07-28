import React from 'react';
import Checkbox from './checkbox';

export default { title: 'Checkbox' };

export const withDefault = () => <Checkbox label="Checkbox label" />;

export const withLeftAligned = () => (
  <Checkbox label="Checkbox label" alignLeft />
);

export const withChecked = () => <Checkbox label="Checked label" checked />;
