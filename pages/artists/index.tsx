import { useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';

import Layout from 'components/layouts/Layout';

export default function TopArtist() {
  const [artistRenderCount, setartistRenderCount] = useState(0);

  useEffect(() => {
    console.log('useEffect from topArtist');
    setartistRenderCount(1);
    console.log('artistRenderCount: ', artistRenderCount);
  }, []);

  return (
    <>
      <Layout>
        <Box>
          <Text color='white'>{artistRenderCount}</Text>
        </Box>
      </Layout>
    </>
  );
}
