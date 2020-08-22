const {
  NODE_ENV,
  URL: NETLIFY_SITE_URL = 'http://localhost:8000',
  DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
  CONTEXT: NETLIFY_ENV = NODE_ENV,
} = process.env;
const isNetlifyProduction = NETLIFY_ENV === 'production';
const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL;

module.exports = {
  siteMetadata: {
    siteUrl,
    title: `GatsbyX`,
    description: `Hello World. I love Gatsby! This is my Gatsby skeleton. There is a lot of tooling and pluggin' around Gatsby and I am tired of doing it from scratch for every new project.`,
    author: `@andrelandgraf94`,
    image: '/images/logo.png',
  },
  plugins: [
    {
      resolve: `gatsby-plugin-svgr`,
      options: {
        ref: true,
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/imgs`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        // 404 always excluded
        // exclude: ['/'] if you want to hide your side from crawling
        exclude: ['/login', '/signup', '/password'],
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        resolveEnv: () => NETLIFY_ENV,
        env: {
          production: {
            // consider disallowing pages like imprint, login, change password, signup from crawling
            // disallow: ['/'] to exclude all if you want to hide your side from crawling
            policy: [
              { userAgent: '*', disallow: ['/login', '/signup', '/password'] },
            ],
          },
          'branch-deploy': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null,
          },
          'deploy-preview': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null,
          },
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Skeleton X`,
        short_name: `GatsbyX`,
        start_url: `/`,
        background_color: `#23212c`,
        theme_color: `#304FFE`,
        display: `standalone`,
        icon: `src/assets/imgs/logo.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        precachePages: [
          '/',
          '/404',
          '/login',
          '/signup',
          '/dialog',
          '/password',
          '/items/*',
        ],
      },
    },
  ],
};
