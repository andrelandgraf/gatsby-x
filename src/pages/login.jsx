import React from 'react';

import { MessageProvider } from '../contexts/message';
import Login from '../containers/login';

const LoginPage = () => (
  <MessageProvider>
    <Login />
  </MessageProvider>
);

export default LoginPage;
