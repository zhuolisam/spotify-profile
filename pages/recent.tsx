import { useState, useEffect, useContext } from 'react';
import { Box, Grid, GridItem, Text, Image, Flex } from '@chakra-ui/react';
import axios from 'axios';
import Link from 'next/link';

import Layout from 'components/layouts/Layout';
import { AuthContext } from 'providers/AuthContext';
import InfoButton from 'components/InfoButton';
import { milliToMinutes } from 'lib/helpers/helperUtils';
import LoaderSpinner from 'components/LoaderSpinner';

export default function Recent() {
  // @ts-ignore
  const { authenticated } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [recentTracks, setrecentTracks] = useState<any[]>([]);

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
        .get('https://api.spotify.com/v1/me/player/recently-played', {
          headers,
        })
        .then((res) => {
          // console.log(res.data.items);
          if (recentTracks.length === 0) {
            setrecentTracks(res.data.items);
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
          <LoaderSpinner />
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
              Recently Played Tracks
            </Text>
            <Grid
              w="100%"
              mt="3rem"
              templateColumns={'1fr'}
              gap="2rem"
            >
              {recentTracks.slice(0, 50).map((track, index) => {
                return (
                  <>
                    <Link href={`tracks/${track['track']['id']}`}>
                      <Grid
                        key={index}
                        templateColumns={'auto 1fr'}
                        alignItems="center"
                        cursor={'pointer'}
                        role="group"
                      >
                        <GridItem
                          h="100%"
                          position="relative"
                        >
                          <Image
                            src={track['track']['album']['images'][0]['url']}
                            alt={track['track']['name']}
                            h="100%"
                            maxH="3rem"
                            loading="lazy"
                            objectFit={'cover'}
                            _groupHover={{ opacity: '0.5' }}
                            transition="all 0.2s ease-in-out"
                          />
                          <InfoButton
                            position="absolute"
                            right="0"
                            left="0"
                            top="0"
                            bottom="0"
                            opacity="0"
                            mx="auto"
                            my="auto"
                            w="1.5rem"
                            h="1.5rem"
                            _groupHover={{ opacity: '1' }}
                            transition="all 0.2s ease-in-out"
                          />
                        </GridItem>
                        <Grid
                          ml="1rem"
                          templateColumns={'1fr max-content'}
                          alignItems="center"
                        >
                          <Flex
                            flexDir="column"
                            justifyContent={'center'}
                          >
                            <Box w="max-content">
                              <Text
                                fontSize={{ base: 'md', md: 'large' }}
                                textUnderlineOffset={'0.2em'}
                                textDecorationThickness={'1px'}
                                _hover={{ textDecor: 'underline' }}
                              >
                                {track['track']['name']}
                              </Text>
                            </Box>

                            <Text
                              fontSize={'sm'}
                              color="brand.primaryGray"
                            >
                              {track['track']['artists']
                                .map((artist: any) => {
                                  return artist['name'];
                                })
                                .join(', ')}{' '}
                              · {track['track']['album']['name']}
                            </Text>
                          </Flex>
                          <GridItem
                            ml="1rem"
                            fontSize={'sm'}
                            color="brand.primaryGray"
                          >
                            {milliToMinutes(track['track']['duration_ms'])}
                          </GridItem>
                        </Grid>
                      </Grid>
                    </Link>
                  </>
                );
              })}
            </Grid>
          </Box>
        )}
      </Layout>
    </>
  );
}
