import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Message from '../components/message/message';

import MESSAGE_TYPES from '../enums/messageTypes';

// new context
const MessageContext = React.createContext({
  message: '',
  setMessage: () => {},
  type: MESSAGE_TYPES.INFO,
  setType: () => {},
});

// corresponding provider component
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
      <div className="message-container">
        {message && (
          <Message
            message={message}
            type={type}
            onResolve={() => setMessage('')}
          />
        )}
        {children}
      </div>
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
