import React from 'react';
import PropTypes from 'prop-types';

import SEO from '../components/layout/seo';
import { Grid, Stack, CustomLink } from '../components';

const treats = [
  {
    name: 'React',
    reasoning: 'My favorite frontend framework.',
    link: 'https://reactjs.org/',
  },
  {
    name: 'Gatsby',
    reasoning:
      'Blazing fast static site generator for React. Offers an amazing plugin ecosystem and server-side rendering through GraphQL.',
    link: 'https://www.gatsbyjs.org/',
  },
  {
    name: 'Styled-Components',
    reasoning:
      'CSS-in-JS for scoped styling and simple theming through JavaScript.',
    link: 'https://styled-components.com/',
  },
  {
    name: 'Framer Motion',
    reasoning:
      'Doing animaitons right is hard. Doing animations with React components is cumbersome. Framer Motion brings animations into the component world. The only struggle that stays: how to not overdo it...',
    link: 'https://www.framer.com/motion/',
  },
  {
    name: 'Storybook',
    reasoning:
      'Judge and showcase each React component in isolation. Perfect tool for iterating on your design system.',
    link: 'https://github.com/seek-oss/playroom',
  },
  {
    name: 'Playroom',
    reasoning:
      'Just started using Playroom but I already love it. Rapid JSX prototyping.',
    link: 'https://github.com/seek-oss/playroom',
  },
  {
    name: 'MDX',
    reasoning: `Changelog, README, Documentation, Privacy, Legal: some pages just need to be a wall of text. Formatting this in components is a pain. MDX let's you import components inside your .mdx files and enables markdown syntax. Now you can write Gatsby pages in .mdx files!`,
    link: 'https://mdxjs.com/',
  },
  {
    name: 'LogRocket',
    reasoning:
      'Easy to use and amazing free-tier logging software for bug tracking.',
    link: 'https://logrocket.com/',
  },
  {
    name: 'Netlify',
    reasoning:
      'Free static site hosting platform. One of my favorite services on this planet.',
    link: 'https://www.netlify.com/',
  },
  {
    name: 'stripe',
    reasoning:
      'Stripe offers an amazing checkout API. They are awesome folks, the charges are highly competitive and their new website looks stunning!',
    link: 'https://stripe.com/',
  },
  {
    name: 'No-Sweat™ Eslint and Prettier by Wes Bos',
    reasoning:
      'Builds on top of eslint-config-airbnb and manages prettier and eslint "under the hood".',
    link: 'https://github.com/wesbos/eslint-config-wesbos',
  },
  {
    name: 'Syntax.fm',
    reasoning:
      'My favorite tech podcast. Can and should be considered as part of my tech stack.',
    link: 'https://syntax.fm/',
  },
  {
    name: 'Figma',
    reasoning:
      'The logo for GatsbyX was made with Figma! Figma is a cloud-based design application. I use it to create svgs and simple first mockups.',
    link: 'https://figma.com/',
  },
  {
    name: 'a11y',
    reasoning:
      'Web accessibility as a design choice and part of the design system.',
    link: 'https://reactjs.org/docs/accessibility.html',
  },
  {
    name: 'axios',
    reasoning:
      'Powerful alternative for the web fetch api. Works both server-side and client-side and enables easy REST calls.',
    link: 'https://github.com/axios/axios',
  },
  {
    name: 'oauth2',
    reasoning:
      'Sophisticaed alternative to cookies and jwt tokens. Enables refreshToken functionalities and third-party authorization.',
    link: 'https://oauth.net/2/',
  },
];

const Box = ({ name, link, reasoning }) => (
  <div className="box" style={{ padding: '10px' }}>
    <Stack gap="4px" margin="6px" centered={false}>
      <h2>{name}</h2>
      <p>{reasoning}</p>
      <CustomLink link={link} newTab>
        {link}
      </CustomLink>
    </Stack>
  </div>
);

Box.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  reasoning: PropTypes.string.isRequired,
};

const IndexPage = () => (
  <>
    <SEO title="Home" />
    <Stack gap="20px">
      <Stack margin="10px">
        <h1>Demo</h1>
      </Stack>
      <p>Welcome to this demo website.</p>
      <p>
        This project is my personal playground for design ideas and also my
        Gatsby skeleton application.
      </p>
      <Stack margin="40px 0 0 0">
        <Stack margin="20px">
          <h1>Tech Stack</h1>
        </Stack>
        <Grid gap="20px">
          {treats.map(treat => (
            <Box
              key={treat.name}
              name={treat.name}
              reasoning={treat.reasoning}
              link={treat.link}
            ></Box>
          ))}
        </Grid>
      </Stack>
    </Stack>
  </>
);

export default IndexPage;
