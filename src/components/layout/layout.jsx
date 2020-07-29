/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import styled, { ThemeContext } from 'styled-components';
import { motion } from 'framer-motion';

import { STYLES } from '../../enums';
import GlobalStyle from './globalStyle';
import Header from './header';
import Footer from './footer';

const Page = styled(motion.div)`
  position: relative;
  width: 100vw;
  max-width: 3600px;
  min-height: 100vh;
  overflow-x: hidden;
`;

const Content = styled.main`
  width: 90vw;
  overflow-x: hidden;
  margin: 20vh 5vw 15vh 5vw;
  min-height: 70vh;
  @media screen and (orientation: landscape) and (max-width: ${STYLES
      .breakpoints.phoneWidth}px) {
    margin-top: 10vh;
  }
`;

const Layout = ({ children }) => {
  const theme = useContext(ThemeContext);
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <Page
      animate={{ backgroundColor: theme.colors.background }}
      transition={{ duration: 0.85 }}
    >
      <GlobalStyle />
      <Header siteTitle={data.site.siteMetadata.title} />
      <Content>{children}</Content>
      <Footer />
    </Page>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
