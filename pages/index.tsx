import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, Container, Grid, Text, Button } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

// import useAuth from 'lib/hooks/auth';
import Layout from 'components/layouts/Layout';
import { AuthContext } from 'providers/AuthContext';

const Home: NextPage = () => {
  useEffect(() => {
    console.log('useEffect from Index');
  });
  
  return (
    <Layout>
      <Box
        as="main"
        ml={{ base: '0rem', md: '6rem' }}
        padding="60px 50px"
        bgColor={'gray.800'}
      >
        <Box
          w="100%"
          h="100vh"
          display={'flex'}
          placeContent="center"
        >
          <Text color="white">Hello World</Text>
        </Box>
      </Box>
    </Layout>
  );
};

export default Home;
