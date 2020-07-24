import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

import { STYLES } from '../enums';

const themeKeys = {
  dark: 'dark',
  light: 'light',
};

const themes = {
  dark: {
    colors: {
      background: STYLES.colors.mattBlack,
      boxBackground: STYLES.colors.mattBlackLighter,
      headlines: STYLES.colors.white,
      font: STYLES.colors.fontWhite,
      primary: STYLES.colors.orangeYellow,
      secondary: STYLES.colors.honeyRed,
    },
  },
  light: {
    colors: {
      background: STYLES.colors.white,
      boxBackground: STYLES.colors.font,
      headlines: STYLES.colors.black,
      font: STYLES.colors.fontGrey,
      primary: STYLES.colors.honeyRed,
      secondary: STYLES.colors.orangeYellow,
    },
  },
};

const CustomThemeContext = React.createContext({
  theme: themeKeys.light,
  setTheme: () => {},
  themeKeys,
});

function CustomThemeProvider({ children }) {
  const [theme, setTheme] = useState(themeKeys.light);

  useEffect(() => {
    const storedThemeKey = localStorage.getItem('theme');
    if (storedThemeKey && themes[storedThemeKey]) {
      setTheme(storedThemeKey);
    }
  }, []);

  const switchTheme = useCallback(newThemeKey => {
    if (newThemeKey && themes[newThemeKey]) {
      setTheme(newThemeKey);
      localStorage.setItem('theme', newThemeKey);
    } else {
      console.tag().warn(`theme ${newThemeKey} not found`);
    }
  }, []);

  const context = {
    switchTheme,
    theme,
    themeKeys,
  };

  return (
    <CustomThemeContext.Provider value={context}>
      <ThemeProvider theme={themes[theme]}>{children}</ThemeProvider>
    </CustomThemeContext.Provider>
  );
}

CustomThemeProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export { CustomThemeContext, CustomThemeProvider, themeKeys };
