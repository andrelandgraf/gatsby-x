import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { locationType } from '../prop-types/page';
import { STYLES } from '../enums';

/**
 * Parses search string, does not handle array queries
 * @param {string} queryString
 */
function parseQuery(queryString) {
  if (!queryString) return {};
  const query = {};
  const pairs = queryString.replace(/^\?/, '').split('&');
  for (let i = 0; i < pairs.length; i += 1) {
    const pair = pairs[i].split('=');
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return query;
}

// new context
const BrowserContext = React.createContext({
  width: 0,
  height: 0,
  delayedWidth: 0,
  isMobile: false,
  isPad: false,
  pathname: '/',
  search: '',
  parameters: {},
  hash: '',
});

function BrowserContextProvider({ children, location }) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(true);
  const [isPad, setIsPad] = useState(true);

  useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
    setIsMobile(window.innerWidth <= STYLES.breakpoints.phoneWidth);
    setIsPad(window.innerWidth <= STYLES.breakpoints.padWidth);

    const reportWindowSize = () => {
      setHeight(window.innerHeight);
      setWidth(window.innerWidth);
      setIsMobile(window.innerWidth <= STYLES.breakpoints.phoneWidth);
      setIsPad(window.innerWidth <= STYLES.breakpoints.padWidth);
    };

    const listener = window.addEventListener('resize', reportWindowSize);
    return () => window.removeEventListener('resize', listener);
  }, []);

  const context = {
    width,
    height,
    isMobile,
    isPad,
    pathname: location.pathname,
    search: location.search,
    parameters: parseQuery(location.search),
    hash: location.hash,
    state: location.state,
  };

  return (
    <BrowserContext.Provider value={context}>
      {children}
    </BrowserContext.Provider>
  );
}

BrowserContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  location: locationType.isRequired,
};

export { BrowserContext, BrowserContextProvider };
