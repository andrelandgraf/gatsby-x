// import logger before doing anything else
import './src/utilities/logger';

import CustomProviders from './wrapWithProvider';
import CustomLayout from './wrapPageElement';

export const wrapPageElement = CustomLayout;
export const wrapRootElement = CustomProviders;
