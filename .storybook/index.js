import React, { useCallback, useContext, useEffect } from 'react';
import addons from "@storybook/addons";
import styled from "styled-components";

import { CustomThemeProvider, CustomThemeContext } from '../src/contexts/theme';
import GlobalStyle from "../src/components/layout/globalStyle";

const Centered = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ThemeSwitcher = ({children}) => {
    const { switchTheme } = useContext(CustomThemeContext);
    const updateTheme = useCallback(({selected}) => switchTheme(selected), []);

    useEffect(() => {
        const channel = addons.getChannel();
        channel.on("setTheme", updateTheme);
        return () => channel.removeListener("setTheme", updateTheme);
    }, [])

    return <>{children}</>
}

const CustomDecorator = ({children}) => (
    <CustomThemeProvider>
        <GlobalStyle/>
        <ThemeSwitcher>
            <Centered>{children}</Centered>
        </ThemeSwitcher>
    </CustomThemeProvider>
);

export default CustomDecorator;
