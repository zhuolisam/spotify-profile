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
  },
  textStyle:{
    p: {
      fontSize: ['48px', '72px'],
      fontWeight: 'bold',
    }
  }
});

export default theme;
