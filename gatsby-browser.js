// import logger before doing anything else
import './src/utilities/logger';

import { ENV } from './src/enums';
import CustomProviders from './wrapWithProvider';
import CustomLayout from './wrapPageElement';

/**
 * stripe sets up fraud detection,
 * so we want to include it for every page
 * but we can do it async
 */
import('@stripe/stripe-js').then();

// we can do this asynch as well
import('logrocket').then(({ default: LogRocket }) => {
  if (ENV.useLogrocket) {
    console.tag().debug('boosting up logrocket');
    // network logging disabled to protect user's passwords
    const logConfig = { network: { isEnabled: false } };
    LogRocket.init(ENV.logrocketProject, logConfig);
  }
});

export const wrapPageElement = CustomLayout;
export const wrapRootElement = CustomProviders;
