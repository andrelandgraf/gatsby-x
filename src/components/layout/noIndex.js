import React from 'react';
import { Helmet } from 'react-helmet';

const NoIndexLayout = () => (
  <Helmet>
    <meta name="robots" content="noindex" />
  </Helmet>
);

export default NoIndexLayout;
