import React from 'react';
import { MessageProvider } from '../contexts/message';

import SEO from '../components/layout/seo';

const LoginPage = () => (
  <MessageProvider>
    <SEO title="Login" shouldIndex={false} />
    <h1>Login</h1>
  </MessageProvider>
);

export default LoginPage;
