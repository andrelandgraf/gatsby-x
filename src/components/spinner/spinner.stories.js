import React from 'react';
import Spinner, { spinnerType } from './spinner';

export default { title: 'Spinner' };

export const withDefault = () => <Spinner />;

export const withFullscreen = () => <Spinner type={spinnerType.fullpage} />;

export const withTiny = () => <Spinner type={spinnerType.fullpage} />;

export const withMessage = () => (
  <Spinner message="This should only take a moment." />
);

export const withMessageFullscreen = () => (
  <Spinner type={spinnerType.fullpage} message="Please hold on a second." />
);
