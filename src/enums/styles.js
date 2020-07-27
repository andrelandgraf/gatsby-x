export default Object.freeze({
  breakpoints: {
    phoneWidth: 750,
    phoneHeight: 1080,
    padWidth: 1024,
    pcWidth: 1281,
  },
  colors: {
    white: '#fff',
    mattWhite: '#fcf7f8',
    indigo: '#304FFE',
    mattIndigo: '#3d5afe',
    lightBlue: '#00b0ff',
    mattLightBlue: '#03a0f0',
    black: '#000000',
    yellow: '#f9c901',
    orangeYellow: '#fcb43a',
    honeyRed: '#992409',
    mattBlack: '#23212c',
    mattBlackLighter: '#44424e',
    mattBlackLightest: '#777582',
    mattGrey: '#3a3637',
    mattGreyLighter: '#585455',
    brown: '#985b10',
    darkBrown: '#6b4701',
    success: '#15d2a7',
    error: '#ff0033',
    warning: '#fcb43a',
    info: '#1890ff',
    disabled: '#757070',
    fontGrey: '#404040',
    fontWhite: '#f1edfd',
  },
  fontSizes: {
    xs: '14px',
    s: '18px',
    m: '20px',
    l: '24px',
    xl: '26px',
    xxl: '32px',
  },
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    heavy: 900,
  },
  hexToRgba: (hex, opacity) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const parsed = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(parsed);
    return `rgba(${parseInt(result[1], 16)},${parseInt(
      result[2],
      16
    )},${parseInt(result[3], 16)},${opacity})`;
  },
});
