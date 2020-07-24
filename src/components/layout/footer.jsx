import React from 'react';
import styled from 'styled-components';

import { STYLES } from '../../enums';

const FooterMenu = styled.footer`
  position: absolute;
  bottom: 0;
  margin-top: 10vh;
  margin-bottom: 5px;
  width: 100vw;
  display: flex;
  align-items: flex-end;
  flex-direction: row;
`;

const FooterItems = styled.ul`
  width: 100%;
  list-style-type: none;
  overflow: hidden;
  display: flex;
  padding: 0;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  li {
    margin: 0 2vw;
    font-size: ${STYLES.fontSizes.xs};
    text-align: center;
  }
  @media screen and (max-width: ${STYLES.breakpoints.phoneWidth}px) {
    flex-direction: column;
  }
`;

const Footer = () => (
  <FooterMenu>
    <FooterItems>
      <li key="about">
        {'Like  it? '}
        <a
          href="https://www.buymeacoffee.com/andrelandgraf"
          className="link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Buy me a coffee
        </a>
        .
      </li>
      <li key="copyright">
        <a
          href="https://andre-landgraf.cool"
          className="link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Andre Landgraf
        </a>
        {' © 2020'}
      </li>
    </FooterItems>
  </FooterMenu>
);

export default Footer;
