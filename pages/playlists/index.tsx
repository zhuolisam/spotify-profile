import { useState, useEffect, useContext } from 'react';
import { Box, Grid, GridItem, Text, Image } from '@chakra-ui/react';
import axios from 'axios';

import Layout from 'components/layouts/Layout';
import { AuthContext } from 'providers/AuthContext';
import Link from 'next/link';

export default function Playlists() {
  // @ts-ignore
  const { authenticated } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [playlists, setplaylists] = useState<any[]>([]);

  useEffect(() => {
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
              templateColumns={{
                base: 'repeat(auto-fit, minmax(7.5rem, 1fr))',
                sm: 'repeat(auto-fit, minmax(10rem, 1fr))',
                md: 'repeat(auto-fit, minmax(12.5rem, 1fr))',
              }}
              gap="1.25rem"
              textAlign="center"
              fontSize={'md'}
            >
              {playlists.map((playlist, index) => (
                <GridItem key={index}>
                  {/* TODO: add link to playlist*/}
                  <Link href={`playlists/${playlist.id}`}>
                    <Image
                      src={playlist['images'][0]['url']}
                      alt={playlist['name']}
                      boxSize={{ base: '7.5rem', md: '12.5rem' }}
                      objectFit="cover"
                      cursor="pointer"
                      _hover={{ opacity: '0.6' }}
                      transition={'all 0.2s ease-in-out'}
                      mx="auto"
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
