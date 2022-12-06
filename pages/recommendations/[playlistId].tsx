import { useEffect, useState, useContext } from 'react';
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  Image,
  useToast,
} from '@chakra-ui/react';
import router from 'next/router';
import axios from 'axios';

import Layout from 'components/layouts/Layout';
import { AuthContext } from 'providers/AuthContext';
import { PlaylistType } from 'pages/playlists/[playlistId]';
import { milliToMinutes } from 'lib/helpers/helperUtils';
import Link from 'next/link';
import InfoButton from 'components/InfoButton';
import LoaderSpinner from 'components/LoaderSpinner';

interface PlaylistRecommendationType extends PlaylistType {
  recommendationTracks: [];
}

enum AddStatus {
  ADDING,
  ADDED,
  DEFAULT,
}

export default function PlaylistRecommendation() {
  const [loading, setLoading] = useState<boolean>(true);
  const [adding, setAdding] = useState<AddStatus>(AddStatus.DEFAULT);
  const { authenticated } = useContext(AuthContext);
  const [playlist, setPlaylist] = useState<PlaylistRecommendationType | null>(
    null
  );
  const [me, setMe] = useState<any>(null);
  const toast = useToast();
  const [externalUri, setExternalUri] = useState<string>('');

  const toastWrapper = ({
    color,
    message,
  }: {
    color: string;
    message: string;
  }) => {
    toast({
      position: 'bottom',
      isClosable: true,
      duration: 1000,
      render: () => (
        <Box
          fontFamily={'heading'}
          fontWeight={'bold'}
          fontSize={'md'}
          color="white"
          p="0.5rem 2rem"
          bg={color}
          borderRadius="xl"
          textAlign={'center'}
          ml={{ base: '0', md: '4.5rem' }}
          mb={{ base: '4.5rem', md: '1rem' }}
        >
          {message}
        </Box>
      ),
    });
  };

  const addSpotifyRecommendation = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setAdding(AddStatus.ADDING);
    try {
      const token = JSON.parse(
        window.localStorage.getItem('access_token') || ''
      );

      let config = {
        headers: {
          Authorization: `Bearer ${token?.access_token}`,
          'Content-Type': 'application/json',
        },
      };

      //post axios request to add to spotify playlist
      const response = await axios.post(
        `https://api.spotify.com/v1/users/${me?.id}/playlists`,
        {
          name: `Recommended Tracks Based On ${playlist?.name}`,
        },
        { headers: config.headers }
      );

      const resData = response.data;
      let addItemsResponse = null;
      if (response.status === 201) {
        //post axios request to add to spotify playlist
        addItemsResponse = await axios.post(
          `https://api.spotify.com/v1/playlists/${resData?.id}/tracks`,
          {
            uris: playlist?.recommendationTracks.map((track: any) => {
              return track?.uri;
            }),
          },
          { headers: config.headers }
        );
      } else {
        toastWrapper({
          color: 'red.500',
          message: 'Failed to Create Playlist',
        });
        return;
      }

      setAdding(AddStatus.ADDED);
      setExternalUri(resData?.external_urls?.spotify);

      if (addItemsResponse?.status === 201) {
        toastWrapper({ color: 'brand.primaryBlue', message: 'Tracks Added' });
      } else {
        toastWrapper({ color: 'red.500', message: 'Failed to Add TracksF' });
      }
    } catch (error) {
      console.log(error);
      setAdding(AddStatus.DEFAULT);
      toastWrapper({ color: 'red.500', message: 'Something Went Wrong' });
    }
  };

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
            const prepare = {
              id: res.data.id,
              name: res.data.name,
              images: res.data.images,
              owner: res.data.owner.display_name,
              description: res.data.description,
              tracks: res.data.tracks.items,
            };

            axios
              .get(`https://api.spotify.com/v1/me`, {
                headers,
              })
              .then((res) => {
                setMe(res.data);
              });

            const tracks_ids = prepare?.tracks
              .slice(-5)
              .reduce((acc: string, curr: any) => {
                return acc + `${curr.track.id},`;
              }, '')
              .slice(0, -1);

            axios
              .get(
                `https://api.spotify.com/v1/recommendations?seed_tracks=${tracks_ids}&seed_artists=&seed_genres=`,
                {
                  headers,
                }
              )
              .then((res) => {
                setPlaylist({
                  ...prepare,
                  recommendationTracks: res.data.tracks,
                });
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
    setLoading(false);
  });

  return (
    <Layout>
      {loading ? (
        <LoaderSpinner />
      ) : (
        <>
          <Box
            w="100%"
            color="brand.primaryWhite"
          >
            <Box
              display={'flex'}
              flexDir={{ base: 'column', md: 'row' }}
              justifyContent="space-between"
              alignItems="center"
              gap={6}
            >
              <Heading
                as="h1"
                textAlign={{ base: 'center', md: 'left' }}
                fontSize={'2xl'}
                fontWeight="extrabold"
                lineHeight={'1.0'}
              >
                Recommended Tracks Based On{' '}
                <Link href={`/playlists/${playlist?.id}`}>
                  <Text
                    display="inline-block"
                    cursor="pointer"
                    _hover={{ color: 'brand.spotifyGreen' }}
                    transition="all 0.2s ease-in-out"
                  >
                    {playlist?.name}
                  </Text>
                </Link>
              </Heading>

              {adding != AddStatus.ADDED && (
                <Button
                  {...(adding == AddStatus.ADDING
                    ? {
                        isLoading: true,
                        loadingText: 'Adding',
                      }
                    : {})}
                  spinnerPlacement="start"
                  bgColor={'brand.spotifyGreen'}
                  _hover={{ filter: 'brightness(110%)' }}
                  _active={{ filter: 'brightness(110%)' }}
                  borderRadius="full"
                  transition="all 0.2s ease-in-out"
                  p="0.2rem 1.5rem"
                  fontWeight={'bold'}
                  fontSize="0.8rem"
                  letterSpacing={'widest'}
                  whiteSpace={'normal'}
                  onClick={addSpotifyRecommendation}
                >
                  SAVE TO SPOTIFY
                </Button>
              )}
              {adding == AddStatus.ADDED && (
                <a
                  href={externalUri == '' ? '#' : externalUri}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button
                    border="1px"
                    borderColor={'white'}
                    bgColor="brand.secondaryBlack"
                    borderRadius={'full'}
                    letterSpacing="wide"
                    fontSize={'0.8em'}
                    px={'1.5rem'}
                    _hover={{
                      bgColor: 'white',
                      color: 'brand.secondaryBlack',
                    }}
                  >
                    OPEN IN SPOTIFY
                  </Button>
                </a>
              )}
            </Box>
            <Flex
              mt="3rem"
              flexDir="column"
              gap="2rem"
              flexGrow="1"
            >
              {playlist?.recommendationTracks.map((track, index) => (
                <>
                  <Link href={`/tracks/${track['id']}`}>
                    <Grid
                      key={index}
                      templateColumns={'auto 1fr'}
                      alignItems="center"
                      cursor={'pointer'}
                      role="group"
                    >
                      <GridItem position="relative">
                        <Image
                          src={track['album']['images'][0]['url']}
                          alt={track['name']}
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
                            {track['name']}
                          </Text>
                          <Text
                            fontSize={'sm'}
                            color="brand.primaryGray"
                          >
                            {track['artists'][0]['name']} ·{' '}
                            {track['album']['name']}
                          </Text>
                        </GridItem>
                        <GridItem
                          ml="1rem"
                          fontSize={'sm'}
                          color="brand.primaryGray"
                        >
                          {milliToMinutes(track['duration_ms'])}
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
