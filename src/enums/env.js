export default Object.freeze({
  apiUrl: process.env.GATSBY_API_URL,
  logLevel: process.env.GATSBY_LOG_LEVEL,
  useLogrocket: process.env.GATSBY_LOGROCKET_ENABLED,
  logrocketProject: process.env.GATSBY_LOGROCKET_PROJECT,
  stripePublicKey: process.env.GATSBY_STRIPE_PUBLIC_KEY,
  mediaPath: process.env.GATSBY_MEDIA_PATH,
});
