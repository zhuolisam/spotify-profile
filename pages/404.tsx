import type { NextPage } from 'next';
import { Box, Text } from '@chakra-ui/react';

import Layout from 'components/layouts/Layout';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <Layout>
      <Box
        as="main"
        ml={{ base: '0rem', md: '6rem' }}
        padding="60px 50px"
        bgColor={'brand.secondaryBlack'}
      >
        <Box
          w="100%"
          h="100vh"
          display={'flex'}
          flexDir="column"
          justifyContent={'center'}
          alignItems={'center'}
          gap="1rem"
        >
          <Text color="white">Error</Text>

          <Text color="white">
            Redirect to {''}
            <Link href="/">
              <Text _hover={{ color: 'brand.spotifyGreen' }}>Home Page</Text>
            </Link>
          </Text>
        </Box>
      </Box>
    </Layout>
  );
};

export default Home;
