import React, { useContext, useCallback, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';
import { motion } from 'framer-motion';

import { ReactComponent as Logo } from '../../assets/svgs/gatsbyx.svg';
import { ReactComponent as Night } from '../../assets/svgs/night.svg';
import { ReactComponent as Day } from '../../assets/svgs/day.svg';

import { STYLES } from '../../enums';
import { CustomThemeContext } from '../../contexts/theme';
import CustomButton from '../clickables/customButton';
import CustomLink from '../clickables/customLink';

const FixedHeader = styled(motion.header)`
  top: 0;
  left: 0;
  position: fixed;
  width: 100vw;
  z-index: 10;
  background-color: ${({ theme }) => theme.colors.background};

  ul {
    padding-inline-start: 0;
  }
`;

const Navigation = styled.nav`
  margin: 3vh 0 1vh 0;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const NavigationMobile = styled.nav`
  padding: 0 0 1vh 5vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow-x: auto;

  @media screen and (min-width: ${STYLES.breakpoints.phoneWidth}px) {
    display: none;
  }
`;

const Branding = styled.div`
  margin: 0 5vw 0 5vw;
  svg {
    width: 120px;
    fill: ${({ theme }) => theme.colors.headlines};
  }
`;

const QuickNavRight = styled.ul`
  display: flex;
  margin-left: auto;
  list-style-type: none;

  li {
    margin-right: 2vw;
  }
`;

const HideOnMobile = styled.div`
  @media screen and (max-width: ${STYLES.breakpoints.phoneWidth}px) {
    display: none;
  }
`;

const MainNav = styled.ul`
  display: flex;
  list-style-type: none;

  li {
    margin-right: 2vw;
  }
`;

const Theming = styled.div`
  justify-self: flex-start;
  margin: 0 5vw 0 5vw;
  svg {
    width: 28px;
  }
`;

const pages = [
  {
    name: 'README',
    link: '/readme',
  },
  {
    name: 'VS Code',
    link: '/vscode',
  },
];

const Header = ({ siteTitle }) => {
  const { themeKeys, theme: key, switchTheme } = useContext(CustomThemeContext);
  const theme = useContext(ThemeContext);
  const toggleRef = useRef();

  const toggle = useCallback(() => {
    if (key === themeKeys.light) {
      switchTheme(themeKeys.dark);
    } else if (key === themeKeys.dark) {
      switchTheme(themeKeys.light);
    }
    // a11y: we do this to ensure the toggle stays in focus after we switched out the svg
    setTimeout(() => toggleRef.current.focus());
  }, [themeKeys, key, switchTheme]);

  const mainNav = useMemo(
    () => (
      <MainNav>
        {pages.map(page => (
          <li key={page.name}>
            <CustomLink link={page.link} isPage>
              {page.name}
            </CustomLink>
          </li>
        ))}
      </MainNav>
    ),
    []
  );

  return (
    <FixedHeader
      animate={{ backgroundColor: theme.colors.background }}
      transition={{ duration: 0.85 }}
      initial={false}
    >
      <Navigation>
        <Branding>
          <CustomLink link="/" isPage>
            <Logo />
          </CustomLink>
        </Branding>
        <HideOnMobile>{mainNav}</HideOnMobile>
        <QuickNavRight>
          <li>
            <CustomLink link="/signup" isPage>
              Signup
            </CustomLink>
          </li>
          <li>
            <CustomLink link="/login" isPage>
              Login
            </CustomLink>
          </li>
        </QuickNavRight>
        <Theming>
          <CustomButton
            onClick={toggle}
            label="Toggle theme"
            title={`Switch to ${key} mode.`}
            ref={toggleRef}
          >
            {key === themeKeys.light ? <Night /> : <Day />}
          </CustomButton>
        </Theming>
      </Navigation>
      <NavigationMobile>{mainNav}</NavigationMobile>
    </FixedHeader>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
