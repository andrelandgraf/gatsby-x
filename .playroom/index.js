import React from 'react';
import styled from "styled-components";

import { STYLES } from "../src/enums"
import { CustomThemeProvider } from '../src/contexts/theme';
import GlobalStyle from "../src/components/layout/globalStyle";

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
  @media screen and (max-width: ${STYLES.breakpoints.phoneWidth}px) {
    margin-top: 30vh;
  }
`;

const CustomDecorator = ({children}) => (
    <CustomThemeProvider>
        <Page>
            <GlobalStyle />
            <Content>{children}</Content>
        </Page>
    </CustomThemeProvider>
);

export default CustomDecorator;
