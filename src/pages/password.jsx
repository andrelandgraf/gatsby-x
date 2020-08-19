import React from 'react';

import { MessageProvider } from '../contexts/message';
import Password from '../containers/password';
import { SEO } from '../components';

const PasswordPage = () => (
  <MessageProvider>
    <SEO title="Change Password" shouldIndex={false} />
    <Password />
  </MessageProvider>
);

export default PasswordPage;
