import React from 'react';

import pagePropsTypess from './src/prop-types/page';
import Layout from './src/components/layout/layout';
import { BrowserContextProvider } from './src/contexts/browser';

// Pass all props (hence the ...props)
// to the layout component so it has access to things like pageContext or location
const wrapPageElement = ({ element, props: { location } }) => (
  <BrowserContextProvider location={location}>
    <Layout>{element}</Layout>
  </BrowserContextProvider>
);

wrapPageElement.propTypes = pagePropsTypess;

export default wrapPageElement;
