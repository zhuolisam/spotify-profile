import Head from 'next/head';
import { Box, Text } from '@chakra-ui/react';
import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

import { AuthContext } from 'providers/AuthContext';
import NavBar from 'components/NavBar';
import axios from 'axios';

type Props = {
  children?: React.ReactNode;
};

function Layout({ children }: Props) {
  // @ts-ignore
  const { authenticated, setauthenticated } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    console.log('useEffect from Layout');
    document.body.style.backgroundColor = 'rgb(24,24,24)';

    const access_token = JSON.parse(
      window.localStorage.getItem('access_token') || 'null'
    );

    //if access_token is expired, refresh it
    if (
      access_token &&
      Date.now() - access_token.timestamp > access_token.expires_in * 1000
    ) {
      console.log('refreshing token');
      setauthenticated(false);
      axios
        .post(`/api/refresh_token`, {
          refreshToken: access_token.refresh_token,
        })
        .then((res) => {
          console.log('successful refresh: ', res);
          const token_data = { ...res.data, timestamp: Date.now() };
          window.localStorage.setItem(
            'access_token',
            JSON.stringify(token_data)
          );
          setauthenticated(true);
        })
        .catch((err) => {
          console.error(err);
        });
      return;
    }

    if (access_token) {
      console.log('user authenticated');
      setauthenticated(true);
      return;
    }

    //if no token at all, login again
    if (!access_token) {
      router.push('/login');
      return;
    }
  });

  return (
    <>
      <Head>
        <title>Spotify Profile</title>
        <meta
          name="description"
          content="Generated by create next app"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
        {/* <link rel="icon" href="/logo/spotify-logo-png-7053.png" /> */}
      </Head>

      {
        <>
          <NavBar />
          {authenticated ? (
            <>
              <Box
                as="main"
                ml={{ base: '0rem', md: '6rem' }}
                mb={{ base: '4.5rem', md: '0rem' }}
                padding={{ base: '30px 25px', sm: '60px 50px', md: '80px 80px' }}
                bgColor={'brand.secondaryBlack'}
                minHeight="100vh"
              >
                {children}
              </Box>
            </>
          ) : (
            <>
              <Box
                as="main"
                display={'flex'}
                flexDir={'column'}
                placeContent="center"
                h={'100vh'}
                w={'100vw'}
              >
                <Text mx={'auto'}>Authenticating</Text>
              </Box>
            </>
          )}
        </>
      }
    </>
  );
}

export default Layout;
