import React, { useContext, useMemo, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import { ReactComponent as Night } from '../../assets/svgs/night.svg';
import { ReactComponent as Day } from '../../assets/svgs/day.svg';

import { STYLES } from '../../enums';
import { CustomThemeContext } from '../../contexts/theme';
import { UserContext } from '../../contexts/user';
import useIsLoggedIn from '../../hooks/useIsLoggedIn';
import Stack from '../systems/stack';
import CustomLink from '../clickables/customLink';
import CustomButton from '../clickables/customButton';

const Menu = styled.nav`
  padding: 20px 5vw 5vh 5vw;
  @media screen and (max-width: ${STYLES.breakpoints.phoneWidth}px) {
    margin: 5px 0 0 0;
  }
`;

const Section = styled.ul`
  border-bottom: 1px solid ${STYLES.colors.border};
  padding-bottom: 20px;

  li {
    line-height: 2.5;
  }
`;

const Title = styled.li`
  list-style-type: none;
`;

const Action = styled.li`
  display: inline-flex;
  justify-items: center;

  svg {
    margin-left: 10px;
    width: 28px;
  }
`;

const MotionedMenu = motion.custom(Menu);

const pages = [
  {
    name: 'Home',
    link: '/',
  },
  {
    title: 'Documentation',
  },
  {
    name: 'README',
    link: '/readme',
  },
  {
    name: 'VS Code',
    link: '/vscode',
  },
  {
    title: 'Demos',
  },
  {
    name: 'Dialog',
    link: '/dialog',
  },
  {
    name: 'NotFoundPage',
    link: '/404',
  },
];

const NavMenu = () => {
  const isLoggedIn = useIsLoggedIn();
  const { handleLogout } = useContext(UserContext);
  const { themeKeys, theme: key, switchTheme } = useContext(CustomThemeContext);
  const toggleRef = useRef();

  const toggleTheme = useCallback(() => {
    if (key === themeKeys.light) {
      switchTheme(themeKeys.dark);
    } else if (key === themeKeys.dark) {
      switchTheme(themeKeys.light);
    }
    // a11y: we do this to ensure the toggle stays in focus after we switched out the svg
    setTimeout(() => toggleRef.current.focus());
  }, [themeKeys, key, switchTheme]);

  const actions = useMemo(
    () => [
      <CustomButton
        key="Toggle theme"
        onClick={toggleTheme}
        label="Toggle theme"
        title={`Switch to ${key} mode.`}
        ref={toggleRef}
      >
        <Action>
          <span>Toggle theme</span>
          {key === themeKeys.light ? <Night /> : <Day />}
        </Action>
      </CustomButton>,
    ],
    [key, themeKeys.light, toggleTheme]
  );

  return (
    <MotionedMenu
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={{
        visible: { opacity: 1, transition: { duration: 2 } },
        hidden: { opacity: 0, transition: { duration: 0.6 } },
      }}
      role="dialog"
    >
      <Stack gap="20px" centered={false} collapseX>
        <h1>Navigation</h1>
        <Section>
          {pages.map(item =>
            item.title ? (
              <Title key={item.title}>
                <h2>{item.title}</h2>
              </Title>
            ) : (
              <li key={item.name}>
                <CustomLink link={item.link} isPage>
                  {item.name}
                </CustomLink>
              </li>
            )
          )}
        </Section>
        {isLoggedIn && (
          <>
            <h1>Profile</h1>
            <Section>
              <li className={isLoggedIn ? 'hide' : ''}>
                <CustomLink link="/signup" isPage>
                  Signup
                </CustomLink>
              </li>
              <li className={isLoggedIn ? 'hide' : ''}>
                <CustomLink link="/login" isPage>
                  Login
                </CustomLink>
              </li>
              <CustomButton
                key="Logout"
                onClick={handleLogout}
                label="Logout"
                title="Logout"
              >
                <Action>
                  <span>Logout</span>
                </Action>
              </CustomButton>
            </Section>
          </>
        )}
        <h1>Accessibility</h1>
        <Section>{actions.map(action => action)}</Section>
      </Stack>
    </MotionedMenu>
  );
};

export default NavMenu;
