import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from 'styled-components';

import Logo from '../../assets/svgs/gatsby.svg';
import Night from '../../assets/svgs/night.svg';

import { CustomThemeContext } from '../../contexts/theme';
import CustomButton from '../clickables/customButton';

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
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  justify-items: center;
  margin-left: 5vw;
  svg {
    margin-right: 10px;
    width: 40px;
  }
`;

const Theming = styled.div`
  justify-self: flex-start;
  margin-left: auto;
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
          <Link to="/">
            <h1 style={{ margin: 0 }}>{siteTitle}</h1>
          </Link>
        </Branding>
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
