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
  margin: 0;
}

h2 {
  font-size: ${STYLES.fontSizes.m};
  font-weight: ${STYLES.fontWeights.normal};
  color: ${({ theme }) => theme.colors.headlines};
  margin: 0;

  @media screen and (max-width: ${STYLES.breakpoints.phoneWidth}px) {
    max-width: 90vw;
  }
}

h3 {
  margin: 0;
  font-size: ${STYLES.fontSizes.s};
  font-weight: ${STYLES.fontWeights.normal};
  color: ${({ theme }) => theme.colors.headlines};
  max-width: 50vw;

  @media screen and (max-width: ${STYLES.breakpoints.phoneWidth}px) {
      max-width: 90vw;
  }
}

h4 {
  margin: 0;
  font-size: ${STYLES.fontSizes.s};
  font-weight: ${STYLES.fontWeights.medium};
  color: ${({ theme }) => theme.colors.headlines};
  max-width: 50vw;

  @media screen and (max-width: ${STYLES.breakpoints.phoneWidth}px) {
      max-width: 90vw;
  }
}


p {
  hyphens: none;
  line-height: 1.8;
  font-size: ${STYLES.fontSizes.s};
  max-width: 800px;
  margin: 0;

  @media screen and (max-width: ${STYLES.breakpoints.phoneWidth}px) {
    max-width: 90vw;
  }

  &.justified {
    text-align: justify;
  }
}

pre {
  max-width: 800px;
  overflow: auto;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
  color: ${({ theme }) => theme.colors.font};
}

ul {
  margin: 0;
}

li {
  margin: 0;
  line-height: 1.8;
  padding: 2px;
  font-size: ${STYLES.fontSizes.s};
  max-width: 800px;
}

a {
  padding: 0;
  touch-action: manipulation;
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.font};
  text-decoration-color: ${({ theme }) => theme.colors.font};

  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.primary};
    text-decoration-color: ${({ theme }) => theme.colors.primary};
  }

  :focus {
    outline: 0;
    color: ${({ theme }) => theme.colors.primary};
    text-decoration-color: ${({ theme }) => theme.colors.primary};
  }

  &.page {
    text-decoration: none;
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
    text-decoration: none;
    color: ${STYLES.colors.disabled};
    cursor: auto;
    pointer-events: none;
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
  border-radius: 10px;
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
