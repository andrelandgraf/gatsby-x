import { createGlobalStyle } from 'styled-components';

import { STYLES } from '../../enums';

const fonts =
  'Jura, Avenir, Rubik, Lato,"Lucida Grande","Lucida Sans Unicode",Tahoma,Sans-Serif';

export default createGlobalStyle`
* {
  box-sizing: border-box;
  overflow-wrap: break-word;
  font-family: ${fonts};
}

body {
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.font};
  margin: 0;
  font-family: ${fonts};
  font-size: ${STYLES.fontSizes.s};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

svg {
  fill: ${({ theme }) => theme.colors.headlines};
}

h1 {
  font-size: ${STYLES.fontSizes.xxl};
  font-weight: ${STYLES.fontWeights.normal};
  color: ${({ theme }) => theme.colors.headlines};
  margin: 20px 0;

  @media screen and (max-width: ${STYLES.breakpoints.phoneWidth}px) {
    margin: 10px 0;
  }
}

h2 {
  font-size: ${STYLES.fontSizes.m};
  font-weight: ${STYLES.fontWeights.normal};
  color: ${({ theme }) => theme.colors.headlines};
  margin: 20px 0;

  @media screen and (max-width: ${STYLES.breakpoints.phoneWidth}px) {
    margin: 10px 0;
    max-width: 90vw;
  }
}

h3 {
  margin: 20px 0;
  font-size: ${STYLES.fontSizes.s};
  font-weight: ${STYLES.fontWeights.normal};
  color: ${({ theme }) => theme.colors.headlines};
  max-width: 50vw;

  @media screen and (max-width: ${STYLES.breakpoints.phoneWidth}px) {
      margin: 10px 0;
      max-width: 90vw;
  }
}

h4 {
  margin: 20px 0;
  font-size: ${STYLES.fontSizes.s};
  font-weight: ${STYLES.fontWeights.medium};
  color: ${({ theme }) => theme.colors.headlines};
  max-width: 50vw;

  @media screen and (max-width: ${STYLES.breakpoints.phoneWidth}px) {
      margin: 10px 0;
      max-width: 90vw;
  }
}


p {
  hyphens: none;
  line-height: 1.8;
  font-size: ${STYLES.fontSizes.s};
  max-width: 800px;
  margin: 20px 0;

  @media screen and (max-width: ${STYLES.breakpoints.phoneWidth}px) {
    margin: 10px 0;
    max-width: 90vw;
  }

  &.justified {
    text-align: justify;
  }
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
  color: ${({ theme }) => theme.colors.font};
}

ul {
  margin: 0;
  padding-inline-start: 0;
}

li {
  line-height: 1.8;
  padding: 2px;
  font-size: ${STYLES.fontSizes.s};
  max-width: 800px;
}

a {
  touch-action: manipulation;
  &:hover {
      cursor: pointer;
  }

  padding: 0;
  text-decoration: none;
  :focus {
    outline: 0;
  }

  &.link {
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.font};
    text-decoration-color: ${({ theme }) => theme.colors.font};
    :hover {
      color: ${({ theme }) => theme.colors.primary};
      text-decoration-color: ${({ theme }) => theme.colors.primary};
    }
    :focus {
      color: ${({ theme }) => theme.colors.primary};
      text-decoration-color: ${({ theme }) => theme.colors.primary};
    }
  }

  &.page {
    color: ${({ theme }) => theme.colors.headlines};
    :hover {
      text-decoration: underline;
      color: ${({ theme }) => theme.colors.primary};
      text-decoration-color: ${({ theme }) => theme.colors.primary};
    }

    :focus {
      text-decoration: underline;
      color: ${({ theme }) => theme.colors.primary};
      text-decoration-color: ${({ theme }) => theme.colors.primary};
    }
  }

  &.current-page {
    text-decoration: underline;
    color: ${STYLES.colors.disabled};
    text-decoration-color: ${({ theme }) => theme.colors.primary};
    cursor: auto;
  }
}

button {
  touch-action: manipulation;
  &:hover {
      cursor: pointer;
  }
  &:focus {
    outline: 0;
  }
}

input[type='submit'] {
  touch-action: manipulation;
  &:hover {
      cursor: pointer;
  }
  &:focus {
    outline: 0;
  }
}

input:not([type='checkbox']):not([type='submit']) {
  font-size: ${STYLES.fontSizes.m};
  display: block;
  width: 100%;
  height: 100%;
  padding: 5px 10px;
  background: none;
  background-image: none;
  border: 1px solid ${({ theme }) => theme.colors.font};
  color: ${({ theme }) => theme.colors.font};
  border-radius:0;
  transition:border-color .25s ease, box-shadow .25s ease;
  &:focus {
    outline: 0;
  }
  margin: 1vh 0;
}

.box {
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  box-shadow: 0 2px 8px ${({ theme }) =>
    STYLES.hexToRgba(theme.colors.font, 0.15)};
}

.not-displayed {
  display: none !important;
}

.not-displayed-on-mobile {
  @media screen and (max-width: ${STYLES.breakpoints.phoneWidth}px) {
      display: none !important;
  }
}

.clickable {
  touch-action: manipulation;

  &:hover {
      cursor: pointer;
  }
}
`;
