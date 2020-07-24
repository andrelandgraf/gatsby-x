import React from 'react';
import Button from './button';

export default { title: 'Button' };

export const withDefault = () => <Button label="Hello Button" />;

export const withPrimary = () => <Button label="Hello Button" primary />;

export const withDisabled = () => <Button label="Hello Button" disabled />;
