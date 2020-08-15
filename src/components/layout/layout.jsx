/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useContext, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import styled, { ThemeContext } from 'styled-components';
import { motion } from 'framer-motion';

import { DialogProvider } from '../../contexts/dialog';
import { NavigationProvider } from '../../contexts/navigation';
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
`;

const Layout = ({ children }) => {
  const theme = useContext(ThemeContext);
  const ref = useRef();
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  // important for supporting a11y on modal dialogs
  const setPageHidden = useCallback(
    (isHidden = false) => {
      if (ref.current) {
        ref.current.setAttribute('aria-hidden', `${isHidden}`);
        document.body.classList.toggle('no-scroll', !isHidden);
      }
    },
    [ref]
  );

  return (
    <NavigationProvider setPageHidden={setPageHidden}>
      <DialogProvider setPageHidden={setPageHidden}>
        <GlobalStyle />
        <Page
          animate={{ backgroundColor: theme.colors.background }}
          transition={{ duration: 0.85 }}
          initial={false}
          ref={ref}
        >
          <Header siteTitle={data.site.siteMetadata.title} />
          <Content>{children}</Content>
          <Footer />
        </Page>
      </DialogProvider>
    </NavigationProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
