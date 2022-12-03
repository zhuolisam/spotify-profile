import { useEffect, useState, useContext, useMemo } from 'react';
import {
  Box,
  Text,
  Image,
  Button,
  Grid,
  Flex,
  GridItem,
} from '@chakra-ui/react';
import axios from 'axios';

import { AuthContext } from 'providers/AuthContext';
import Layout from 'components/layouts/Layout';
import BarChart from 'components/BarChart';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { milliToMinutes } from 'lib/helpers/helperUtils';
import InfoButton from 'components/InfoButton';

export type PlaylistType = {
  id: string;
  name: string;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  owner: string;
  description: string;
  tracks: [];
};

type audioFeatureType = {
  acousticness: number;
  danceability: number;
  energy: number;
  instrumentalness: number;
  liveness: number;
  speechiness: number;
  valence: number;
};

export default function SinglePlaylist() {
  const router = useRouter();
  const { authenticated } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const [playlist, setPlaylist] = useState<PlaylistType | null>(null);
  const [audioFeatures, setAudioFeatures] = useState<any | null>(null);

  const memoizedAudioFeatures = useMemo<audioFeatureType | void>(() => {
    if (audioFeatures != null) {
      return {
        acousticness:
          audioFeatures.reduce((acc: number, curr: any) => {
            return acc + curr.acousticness;
          }, 0) / audioFeatures.length,
        danceability:
          audioFeatures.reduce((acc: number, curr: any) => {
            return acc + curr.danceability;
          }, 0) / audioFeatures.length,
        energy:
          audioFeatures.reduce((acc: number, curr: any) => {
            return acc + curr.energy;
          }, 0) / audioFeatures.length,
        instrumentalness:
          audioFeatures.reduce((acc: number, curr: any) => {
            return acc + curr.instrumentalness;
          }, 0) / audioFeatures.length,
        liveness:
          audioFeatures.reduce((acc: number, curr: any) => {
            return acc + curr.liveness;
          }, 0) / audioFeatures.length,
        speechiness:
          audioFeatures.reduce((acc: number, curr: any) => {
            return acc + curr.speechiness;
          }, 0) / audioFeatures.length,
        valence:
          audioFeatures.reduce((acc: number, curr: any) => {
            return acc + curr.valence;
          }, 0) / audioFeatures.length,
      };
    }
  }, [audioFeatures]);

  useEffect(() => {
    const playlist_id = router.query.playlistId;
    if (authenticated && playlist_id) {
      const token = JSON.parse(
        window.localStorage.getItem('access_token') || ''
      );

      const headers = {
        Authorization: `Bearer ${token?.access_token}`,
        'Content-Type': 'application/json',
      };

      axios
        .get(`https://api.spotify.com/v1/playlists/${playlist_id}`, {
          headers,
        })
        .then((res) => {
          if (playlist === null) {
            const tracks_id_list =
              res.data.tracks.items
                .reduce((acc: string, track: any) => {
                  return acc + `${track.track.id},`;
                }, '')
                .slice(0, -1) || '';

            const prepare = {
              id: res.data.id,
              name: res.data.name,
              images: res.data.images,
              owner: res.data.owner.display_name,
              description: res.data.description,
              tracks: res.data.tracks.items,
            };

            axios
              .get(
                `https://api.spotify.com/v1/audio-features?ids=${tracks_id_list}`,
                {
                  headers,
                }
              )
              .then((res) => {
                if (audioFeatures === null) {
                  setAudioFeatures(res.data.audio_features);
                  setPlaylist(prepare);
                }
                setLoading(false);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

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
            color="brand.primaryWhite"
            display="flex"
            flexDir={{ sm: 'column', md: 'row' }}
          >
            <Box
              textAlign="center"
              w={{ base: '100%', md: '30%' }}
              minW="12rem"
            >
              <Image
                src={playlist?.images[0]?.url}
                alt={playlist?.name.toString()}
                loading="lazy"
                display={{ base: 'none', md: 'block' }}
                mx={'auto'}
              />
              <Text
                as="h2"
                fontSize={'2rem'}
                fontWeight="bold"
                color="brand.primaryWhite"
                mt={'0.5rem'}
              >
                {playlist?.name}
              </Text>
              <Text
                as="h2"
                mt="0.5rem"
                fontSize={'1rem'}
                color="brand.secondaryGray"
              >
                By {playlist?.owner}
              </Text>
              {playlist?.description && (
                <Text
                  as="h2"
                  mt="0.5rem"
                  fontSize={'1rem'}
                  color="brand.secondaryGray"
                >
                  By {playlist?.description}
                </Text>
              )}
              <Text
                as="h2"
                fontSize={'1.1rem'}
                color="brand.primaryWhite"
                mt={'0.9rem'}
              >
                {playlist?.tracks.length} tracks
              </Text>
              <Link
                href={{
                  pathname: `/recommendations/[playlistId]`,
                  query: {
                    playlistId: playlist?.id,
                    playlistName: playlist?.name,
                    tracks_ids: playlist?.tracks
                      .slice(-5)
                      .map((track) => track['track']['id'])
                      .join(','),
                  },
                }}
                as={`/recommendations/${playlist?.id}?playlistName=${playlist?.name}&tracks_ids=${playlist?.tracks}`}
              >
                <Button
                  mt="1.6rem"
                  mx="auto"
                  bgColor={'brand.spotifyGreen'}
                  _hover={{ filter: 'brightness(110%)' }}
                  _active={{ filter: 'brightness(110%)' }}
                  borderRadius="full"
                  transition="all 0.2s ease-in-out"
                  p="0.2rem 1.5rem"
                  fontWeight={'bold'}
                  fontSize="0.8rem"
                  letterSpacing={'widest'}
                  whiteSpace="normal"
                >
                  GET RECOMMENDATION
                </Button>
              </Link>
              <BarChart
                orientation="horizontal"
                chartData={[
                  {
                    name: 'acousticness',
                    value: memoizedAudioFeatures?.acousticness || 0,
                  },
                  {
                    name: 'danceability',
                    value: memoizedAudioFeatures?.danceability || 0,
                  },
                  {
                    name: 'energy',
                    value: memoizedAudioFeatures?.energy || 0,
                  },
                  {
                    name: 'instrumentalness',
                    value: memoizedAudioFeatures?.instrumentalness || 0,
                  },
                  {
                    name: 'liveness',
                    value: memoizedAudioFeatures?.liveness || 0,
                  },
                  {
                    name: 'speechiness',
                    value: memoizedAudioFeatures?.speechiness || 0,
                  },
                  {
                    name: 'valence',
                    value: memoizedAudioFeatures?.valence || 0,
                  },
                ]}
                position="relative"
                mx="auto"
                mt="2rem"
                title="Audio Features"
                titleSize="16rem"
                tickSize="12rem"
                width="100%"
                height={'auto'}
              />
            </Box>
            {/* end of playlist info */}
            <Flex
              flexDir="column"
              gap="2rem"
              ml={{ base: '0', md: '3rem' }}
              flexGrow="1"
            >
              {playlist?.tracks.map((track, index) => (
                <>
                  <Link href={`/tracks/${track['track']['id']}`}>
                    <Grid
                      key={index}
                      templateColumns={'auto 1fr'}
                      alignItems="center"
                      cursor={'pointer'}
                      role="group"
                    >
                      <GridItem position="relative">
                        <Image
                          src={track['track']['album']['images'][0]['url']}
                          alt={track['track']['name']}
                          boxSize="3.2rem"
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
                        gridTemplateColumns={'1fr max-content'}
                        gap={'10px'}
                      >
                        <GridItem
                          overflow={'hidden'}
                          textOverflow={'ellipsis'}
                          whiteSpace={'nowrap'}
                          pr="1px"
                        >
                          <Text
                            fontSize={{ base: 'md', md: 'large' }}
                            textUnderlineOffset={'0.2em'}
                            textDecorationThickness={'1px'}
                            _hover={{ textDecor: 'underline' }}
                          >
                            {track['track']['name']}
                          </Text>
                          <Text
                            fontSize={'sm'}
                            color="brand.primaryGray"
                          >
                            {track['track']['artists'][0]['name']} ·{' '}
                            {track['track']['album']['name']}
                          </Text>
                        </GridItem>
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
              ))}
            </Flex>
          </Box>
        </>
      )}
    </Layout>
  );
}
