import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from 'styled-components';

import { ReactComponent as Logo } from '../../assets/svgs/gatsbyx.svg';
import { ReactComponent as Night } from '../../assets/svgs/night.svg';

import { CustomThemeContext } from '../../contexts/theme';
import CustomButton from '../clickables/customButton';
import CustomLink from '../clickables/customLink';

const FixedHeader = styled.header`
  top: 0;
  left: 0;
  position: fixed;
  width: 100vw;
  z-index: 10;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Navigation = styled.nav`
  margin: 3vh 0 1vh 0;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Branding = styled.div`
  margin-left: 5vw;
  svg {
    width: 120px;
    fill: ${({ theme }) => theme.colors.headlines};
  }
`;

const List = styled.ul`
  margin-left: auto;
  margin-right: 5vw;
  list-style-type: none;
`;

const Theming = styled.div`
  justify-self: flex-start;
  margin-right: 5vw;
  svg {
    width: 28px;
  }
`;

const Header = ({ siteTitle }) => {
  const { themeKeys, theme, switchTheme } = useContext(CustomThemeContext);

  const toggle = useCallback(() => {
    if (theme === themeKeys.light) {
      switchTheme(themeKeys.dark);
    } else if (theme === themeKeys.dark) {
      switchTheme(themeKeys.light);
    }
  }, [themeKeys, theme, switchTheme]);

  return (
    <FixedHeader>
      <Navigation>
        <Branding>
          <Link to="/">
            <Logo />
          </Link>
        </Branding>
        <List>
          <li>
            <CustomLink link="/login" isPage>
              Login
            </CustomLink>
          </li>
        </List>
        <Theming>
          <CustomButton id="toggle-theme" onClick={toggle}>
            <Night />
          </CustomButton>
        </Theming>
      </Navigation>
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
