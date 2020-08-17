import React, { useContext, useCallback, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';
import { motion } from 'framer-motion';

import { ReactComponent as Logo } from '../../assets/svgs/gatsbyx.svg';
import { ReactComponent as Night } from '../../assets/svgs/night.svg';
import { ReactComponent as Day } from '../../assets/svgs/day.svg';
import { ReactComponent as Menu } from '../../assets/svgs/menu.svg';

import { STYLES } from '../../enums';
import { CustomThemeContext } from '../../contexts/theme';
import { NavigationContext } from '../../contexts/navigation';
import useIsLoggedIn from '../../hooks/useIsLoggedIn';
import CustomButton from '../clickables/customButton';
import CustomLink from '../clickables/customLink';
import NavMenu from './navigation';

const FixedHeader = styled(motion.header)`
  top: 0;
  left: 0;
  right: 0;
  position: fixed;
  width: 100vw;
  z-index: 10;
  background-color: ${({ theme }) => theme.colors.box};
  overflow-x: hidden;
  overflow-y: auto;
  border-bottom: ${({ theme }) =>
    `${theme.border.width} ${theme.border.style} ${theme.border.color}`};
  box-shadow: 0 2px 8px
    ${({ theme }) => STYLES.hexToRgba(theme.colors.font, 0.15)};

  ul {
    padding-inline-start: 0;
  }

  @media screen and (max-width: ${STYLES.breakpoints.phoneWidth}px) {
    ${({ isExpanded }) => (isExpanded ? 'bottom: 0;' : '')}
  }
`;

const NavBar = styled.nav`
  margin: 3vh 5vw 1vh 5vw;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const NavMenuToggle = styled.div`
  justify-self: flex-start;
  svg {
    width: 28px;
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

const QuickLinks = styled.ul`
  display: flex;
  list-style-type: none;

  li {
    margin-right: 2vw;
  }
`;

const Theming = styled.div`
  justify-self: flex-start;
  margin: 0 0 0 5vw;
  svg {
    width: 28px;
  }
`;

// pages for quick access on desktop
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
  const isLoggedIn = useIsLoggedIn();
  const theme = useContext(ThemeContext);
  const { themeKeys, theme: key, switchTheme } = useContext(CustomThemeContext);
  const { toggleMenu, isOpen } = useContext(NavigationContext);
  const toggleThemeRef = useRef();

  const toggleTheme = useCallback(() => {
    if (key === themeKeys.light) {
      switchTheme(themeKeys.dark);
    } else if (key === themeKeys.dark) {
      switchTheme(themeKeys.light);
    }
    // a11y: we do this to ensure the toggleTheme stays in focus after we switched out the svg
    setTimeout(() => toggleThemeRef.current.focus());
  }, [themeKeys, key, switchTheme]);

  const quickLinks = useMemo(
    () => (
      <QuickLinks className="hide-on-mobile">
        {pages.map(page => (
          <li key={page.name}>
            <CustomLink link={page.link} isPage>
              {page.name}
            </CustomLink>
          </li>
        ))}
      </QuickLinks>
    ),
    []
  );

  return (
    <FixedHeader
      isExpanded={isOpen}
      animate={{
        backgroundColor: theme.colors.background,
        borderBottom: theme.border.color,
      }}
      transition={{ duration: 0.85 }}
      initial={false}
    >
      <NavBar>
        <NavMenuToggle>
          <CustomButton
            onClick={toggleMenu}
            label="Toggle navigation menu"
            title={`${isOpen ? 'Close' : 'Open'} navigation menu`}
          >
            <Menu />
          </CustomButton>
        </NavMenuToggle>
        <Branding>
          <CustomLink link="/" isPage>
            <Logo />
          </CustomLink>
        </Branding>
        {quickLinks}
        <QuickNavRight>
          {!isLoggedIn && (
            <>
              <li className="hide-on-mobile">
                <CustomLink link="/signup" isPage>
                  Signup
                </CustomLink>
              </li>
              <li>
                <CustomLink link="/login" isPage>
                  Login
                </CustomLink>
              </li>
            </>
          )}
        </QuickNavRight>
        <Theming className="hide-on-mobile">
          <CustomButton
            onClick={toggleTheme}
            label="Toggle theme"
            title={`Switch to ${key} mode.`}
            ref={toggleThemeRef}
          >
            {key === themeKeys.light ? <Night /> : <Day />}
          </CustomButton>
        </Theming>
      </NavBar>
      {isOpen && <NavMenu />}
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
