import React from 'react';

import { MessageProvider } from '../contexts/message';
import Signup from '../containers/signup';
import SEO from '../components/layout/seo';

const SignupPage = () => (
  <MessageProvider>
    <SEO title="Signup" shouldIndex={false} />
    <Signup />
  </MessageProvider>
);

export default SignupPage;
