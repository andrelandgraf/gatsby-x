import React from 'react';
import Checkout from './stripeCheckout';

export default { title: 'StripeCheckout' };

export const withDefault = () => <Checkout id="123" />;

export const withDisabled = () => <Checkout id="123" disabled />;
