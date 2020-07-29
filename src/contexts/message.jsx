import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence } from 'framer-motion';

import { MESSAGE_TYPES } from '../enums';
import { Stack } from '../components';
import Message from '../components/message/message';

const MessageContext = React.createContext({
  message: '',
  setMessage: () => {},
  type: MESSAGE_TYPES.INFO,
  setType: () => {},
});

function MessageProvider({ children }) {
  const [message, setMessage] = useState('');
  const [type, setType] = useState(MESSAGE_TYPES.INFO);

  const context = {
    message,
    setMessage,
    type,
    setType,
  };

  return (
    <MessageContext.Provider value={context}>
      <Stack gap="10vh" useMotion>
        <AnimatePresence>
          {message && (
            <Message
              key="message"
              message={message}
              type={type}
              onResolve={() => setMessage('')}
            />
          )}
        </AnimatePresence>
        {children}
      </Stack>
    </MessageContext.Provider>
  );
}

MessageProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export { MessageContext, MessageProvider, MESSAGE_TYPES };
