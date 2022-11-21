import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { Box, Grid, GridItem, Text, Image, Flex } from '@chakra-ui/react';
import axios from 'axios';

import Layout from 'components/layouts/Layout';
import { AuthContext } from 'providers/AuthContext';
import Link from 'next/link';

export default function Playlists() {
  // @ts-ignore
  const { authenticated, setauthenticated } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [playlists, setplaylists] = useState<any[]>([]);

  useEffect(() => {
    console.log('useEffect from Recent.tsx');

    if (authenticated) {
      const token = JSON.parse(
        window.localStorage.getItem('access_token') || ''
      );

      const headers = {
        Authorization: `Bearer ${token?.access_token}`,
        'Content-Type': 'application/json',
      };

      axios
        .get('https://api.spotify.com/v1/me/playlists?offset=0&limit=20', {
          headers,
        })
        .then((res) => {
          console.log(res.data.items);
          if (playlists.length === 0) {
            setplaylists(res.data.items);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  return (
    <>
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
          <Box
            w="100%"
            color="brand.primaryWhite"
            minW={'max-content'}
          >
            <Text
              as="h1"
              textAlign={{ base: 'center', md: 'left' }}
              fontSize={'2xl'}
              fontWeight="extrabold"
              lineHeight={'1.0'}
            >
              Your Playlists
            </Text>
            <Grid
              mt="3rem"
              templateColumns={'repeat(auto-fit, minmax(12.5rem, 1fr))'}
              gap="1.8rem"
              textAlign="center"
              fontSize={'md'}
            >
              {playlists.map((playlist, index) => (
                <GridItem key={index}>
                  {/* TODO: add link to playlist*/}
                  <Link href="#">
                    <Image
                      src={playlist['images'][0]['url']}
                      alt={playlist['name']}
                      cursor="pointer"
                      _hover={{ opacity: '0.6' }}
                      transition={'all 0.2s ease-in-out'}
                    />
                  </Link>
                  <Text
                    mt="1rem"
                    lineHeight={'1.2'}
                    cursor="pointer"
                    textUnderlineOffset={'0.2em'}
                    textDecorationThickness={'1px'}
                    _hover={{ textDecor: 'underline' }}
                    transition={'all 0.2s ease-in-out'}
                  >
                    {playlist['name']}
                  </Text>
                  <Text
                    as="span"
                    fontSize={'xs'}
                    color="brand.primaryGray"
                    lineHeight={'0.6'}
                    letterSpacing="widest"
                    fontWeight="thin"
                  >
                    {playlist['tracks']['total']} TRACKS
                  </Text>
                </GridItem>
              ))}
            </Grid>
          </Box>
        )}
      </Layout>
    </>
  );
}
