import React from 'react';
import PropTypes from 'prop-types';

import { GatsbyImagesProvider } from './src/contexts/images';
import { CustomThemeProvider } from './src/contexts/theme';

// Instantiating store in `wrapRootElement` handler ensures:
//  - there is fresh store for each SSR page
//  - it will be called only once in browser, when React mounts
const wrapWithProvider = ({ element }) => (
  <GatsbyImagesProvider>
    <CustomThemeProvider>{element}</CustomThemeProvider>{' '}
  </GatsbyImagesProvider>
);

wrapWithProvider.propTypes = {
  element: PropTypes.node.isRequired,
};

export default wrapWithProvider;
