import { useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import router from 'next/router';

import Layout from 'components/layouts/Layout';

export default function SingleTrack() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const track_id = router.query.trackId;
    setLoading(false);
  }, []);

  return (
    <Layout>
      {loading ? (
        <>
          <Box
            w="100%"
            h="100vh"
            display={'flex'}
            placeContent="center"
          >
            <Text color="white">Loading</Text>
          </Box>
        </>
      ) : (
        <>
          <Box
            w="100%"
            h="100vh"
            color="brand.primaryWhite"
            textAlign={'center'}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text
              fontSize="3xl"
              fontWeight="extrabold"
            >
              Coming soon.
            </Text>
          </Box>
        </>
      )}
    </Layout>
  );
}
