import { extendTheme, theme as base } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      html: {
        scrollBehaviour: 'smooth',
        
      },
    },
  },
  fonts:{
    heading:`Circular Std, ${base.fonts?.heading}`,
    body:`Circular Std, ${base.fonts?.body}`,
  }
});

export default theme;
