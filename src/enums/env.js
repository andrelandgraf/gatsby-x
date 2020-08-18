export default Object.freeze({
  apiUrl: process.env.GATSBY_API_URL,
  logLevel: process.env.GATSBY_LOG_LEVEL,
  useLogrocket: process.env.GATSBY_LOG_ROCKET_ENABLED,
  stripePublicKey: process.env.GATSBY_STRIPE_PUBLIC_KEY,
  mediaPath: process.env.GATSBY_MEDIA_PATH,
});
