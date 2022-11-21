import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, Container, Grid, Text, Button } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

// import useAuth from 'lib/hooks/auth';
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
        >
          <Text color="white">Error</Text>

          <Text color="white">
            Redirect to {''}
            <Link href="/">
              <Text>Home Page</Text>
            </Link>
          </Text>
        </Box>
      </Box>
    </Layout>
  );
};

export default Home;
