import { css } from 'styled-components';

const mediaQuery = (...query) => (...rules) => css`@media ${css(...query)} { ${css(...rules)} }`;

export const breakpoint = {
  small:     360,
  medium:    640,
  large:     1024,
  xlarge:      1440,
  xxlarge: 1920,
};

export const style = {
  dimension: {
    normal : {
      maxSiteWidth: '1440px',
      pagePadding: {
        xSmall: '0.5rem',
        small: '0.8rem',
        medium: '1.1rem',
        large: '3rem',
        xLarge: '4rem',
        xxLarge: '4rem'
      }
    }
  },
  color: {
    
    almostWhite: '#EFEFEF',
    trueWhite: '#FFF',
    brandingBlue: '#0064B0',
    brandingWhite: '#FFF',
    trueBlack: '#000',
    almostBlack: '#3F3F3F',
    darkBlue: '#004777',

    altWhite: '#F4F4F1',
    
    brightBlue: '#0064B1',


    notReallyBlack: '#999999',
    
    
    justBlue: '#0000ff',
    
    farkTransparentDarkBlue: '#1D2D6D',
    aquaBlue: '#00C8FF',
    lightBlue: '#1C4283',
    backgroundBlue: '#213880',
    placeholderBlue: '#4B4BD2',
    traderRed: '#FE6565',
    exchangeGreen: '#00FAA5',
    lime: '#00F9A9',
    bittersweet: '#FE6565',
    logoBlue: '#5258A6'
  
  },
  font: {
    family: {
      standard: "'Open Sans', sans-serif",
      fancy: "'Montserrat', sans-serif"  
    }
  }
}



export const media = {
  xSmall:    mediaQuery`(max-width: ${(breakpoint.small - 1) / 16}em)`,
  small:     mediaQuery`(min-width: ${breakpoint.small / 16}em) and (max-width: ${(breakpoint.medium - 1) / 16}em)`,
  medium:    mediaQuery`(min-width: ${breakpoint.medium / 16}em) and (max-width: ${(breakpoint.large - 1) / 16}em)`,
  large:     mediaQuery`(min-width: ${breakpoint.large / 16}em) and (max-width: ${(breakpoint.
    xlarge - 1) / 16}em)`,
  xLarge:    mediaQuery`(min-width: ${breakpoint.xlarge / 16}em) and (max-width: ${(breakpoint.xxlarge - 1) / 16}em)`,
  xxLarge: mediaQuery`(min-width: ${breakpoint.xxlarge / 16}em)`,
  
  

  xSmallUp:      mediaQuery`(min-width: 0em)`,
  smallUp:       mediaQuery`(min-width: ${breakpoint.small / 16}em)`,
  mediumUp:      mediaQuery`(min-width: ${breakpoint.medium / 16}em)`,
  largeUp:       mediaQuery`(min-width: ${breakpoint.large / 16}em)`,
  xLargeUp:      mediaQuery`(min-width: ${breakpoint.xlarge / 16}em)`,
  xxLargeUp:     mediaQuery`(min-width: ${breakpoint.xxlarge / 16}em)`,  

  xSmallDown:    mediaQuery`(max-width: ${(breakpoint.small - 1) / 16}em)`,
  smallDown:     mediaQuery`(max-width: ${(breakpoint.medium - 1) / 16}em)`,
  mediumDown:    mediaQuery`(max-width: ${(breakpoint.large - 1)/ 16}em)`,
  largeDown:     mediaQuery`(max-width: ${(breakpoint.xlarge - 1) / 16}em)`,
  xLargeDown:    mediaQuery`(max-width: ${(breakpoint.xxlarge - 1) / 16}em)`,
  xxLargeDown:    mediaQuery`(min-width: 0em)`,
  

  landscape: mediaQuery`(orientation:landscape)`,
  portrait: mediaQuery`(orientation:portrait)`,
  print:     mediaQuery`print`,
};


