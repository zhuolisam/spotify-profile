import { extendTheme, theme as base } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      html: {
        scrollBehaviour: 'smooth',
      },
    },
  },
  fonts: {
    heading: `Circular Std, ${base.fonts?.heading}`,
    body: `Circular Std, ${base.fonts?.body}`,
  },
  textStyle: {
    p: {
      fontSize: ['48px', '72px'],
      fontWeight: 'normal',
    },
  },
  colors: {
    brand: {
      primaryBlack: 'rgb(4,3,6)',
      secondaryBlack: 'rgb(24,24,24)',
      primaryWhite: 'rgb(255,255,255)',
      primaryGray: 'rgb(155,155,155)',
      spotifyGreen: 'rgb(30,215,96)',
    },
  },
  fontWeights:{
    thin: 450,
    normal: 500,
    bold: 700,
    extrabold: 900,
  }
});

export default theme;
