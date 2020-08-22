<h1 align="center">
  Gatsby Skeleton - GatsbyX
</h1>
<h2 align="center">
  <a href="https://www.demo.andre-landgraf.cool/">
    👉 Live Demo
  </a>
</h2>

Kick off your project with this boilerplate. This starter configures my tech stack of choice based on React and Gatsby to get up and running in no time. There is also a corresponding backend! Find the gatsby-x-backend [here](https://github.com/andrelandgraf/gatsby-x-backend).

## 🚀 Quick start

**Use this Gatsby Starter.**

Use the Gatsby CLI to create a new site, specifying the default starter.

```shell
# create a new Gatsby site using the default starter
gatsby new gatsy-x-starter https://github.com/andrelandgraf/gatsby-x
```

**Start developing.**

Navigate into your new site’s directory and start it up.

```shell
cd my-default-starter/
gatsby develop
```

**Open the source code and start editing!**

Your site is now running at `http://localhost:8000`!

_Note: You'll also see a second link:_`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql)._

Open the `my-default-starter` directory in your code editor of choice and edit `src/pages/index.js`. Save your changes and the browser will update in real time!

**Inspect all components in isolation using Storybook.**

Navigate into your new site’s directory and start it up.

```shell
npm run storybook
```

## ↔ Connect to backend

**Configure your secrets**

Create a `.env.development` file

```
touch .env.development
```

And paste the following secrets:
(remove any '/' at the end of the urls!)

```
GATSBY_API_URL=http://localhost:8888 #change to prod url on your .env.production
API_URL=http://localhost:8888 #change to prod url on your .env.production
GATSBY_PILATES_STUDIO_SECRET=oauthSecret #make sure you safe the same secret in your backend
GATSBY_STRIPE_PUBLIC_KEY=#your stripe public key! Be careful not to set your secret key into your frontend ever!
GATSBY_MEDIA_PATH=#an url to your hosted assets e.g. pdfs etc
GATSBY_LOGROCKET_ENABLED=[true|false]
GATSBY_LOGROCKET_PROJECT=#your logrocket project name
LOG_LEVEL=[error|warn|info|http|verbose|debug]
GATSBY_LOG_LEVEL=[error|warn|info|http|verbose|debug]
```

## 🔙 The backend

Please find the skeleton backend for this frontend here: https://github.com/andrelandgraf/gatsby-x-backend

Follow the README.md on the backend repository and run the backend.

Visit `http://localhost:8000/signup` and create a first user on your webapp!

## 🧐 What's inside

**Following features ship with this skeleton:**

- Storybook
- Playroom
- Styled-Components
- Framer Motions
- MDX
- LogRocket
- Stripe Checkout API
- No-Sweat™ Eslint and Prettier by Wes Bos
- Base components with emphasis on a11y
- OAuth2 auth flow with login/signup
- Level based logging

For more information visit the [landing page](https://demo.andre-landgraf.cool/) of this project.

## 🎓 Learning Gatsby

Looking for more guidance? Full documentation for Gatsby lives [on the website](https://www.gatsbyjs.org/). Here are some places to start:

- **For most developers, we recommend starting with our [in-depth tutorial for creating a site with Gatsby](https://www.gatsbyjs.org/tutorial/).** It starts with zero assumptions about your level of ability and walks through every step of the process.

- **To dive straight into code samples, head [to our documentation](https://www.gatsbyjs.org/docs/).** In particular, check out the _Guides_, _API Reference_, and _Advanced Tutorials_ sections in the sidebar.

## 💫 Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/gatsbyjs/gatsby-starter-default)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/gatsbyjs/gatsby-starter-default)
