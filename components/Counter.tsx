import { Box, Image, Show, Text } from '@chakra-ui/react';
import { useEffect } from 'react';

export default function Counter() {
  useEffect(() => {
    console.log('useEffect from Test Component');
  });
  return (
    <>
      <Box>Component </Box>
    </>
  );
}
