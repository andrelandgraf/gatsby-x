import React from 'react';

import { MESSAGE_TYPES } from '../../enums';
import Message from './message';

export default { title: 'Message' };

export const withInfo = () => (
  <Message type={MESSAGE_TYPES.info} message="Test Message" />
);

export const withSuccess = () => (
  <Message type={MESSAGE_TYPES.success} message="Test Message" />
);

export const withWarning = () => (
  <Message type={MESSAGE_TYPES.warning} message="Test Message" />
);

export const withError = () => (
  <Message type={MESSAGE_TYPES.error} message="Test Message" />
);

export const withLongMessage = () => (
  <Message
    type={MESSAGE_TYPES.info}
    message="This is a very long message to see if the layout and design still looks good when the message is well... long!"
  />
);
