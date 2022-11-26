import type { NextPage } from 'next';
import {
  Box,
  Grid,
  Text,
  Button,
  Flex,
  Image,
  GridItem,
} from '@chakra-ui/react';

import { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

// import useAuth from 'lib/hooks/auth';
import Layout from 'components/layouts/Layout';
import { AuthContext } from 'providers/AuthContext';
import { milliToMinutes } from 'lib/helpers/helperUtils';
import InfoButton from 'components/InfoButton';
import Link from 'next/link';

const Home: NextPage = () => {
  const { authenticated,setauthenticated} = useContext(AuthContext);

  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [me, setMe] = useState({
    images: '',
    display_name: '',
    following: 0,
    followers: 0,
    playlists: 0,
  });

  const [topTracks, settopTracks] = useState([]);
  const [topArtists, settopArtists] = useState([]);

  useEffect(() => {
    console.log('useEffect from home');
    if (authenticated) {
      const token = JSON.parse(
        window.localStorage.getItem('access_token') || ''
      );

      const headers = {
        Authorization: `Bearer ${token?.access_token}`,
        'Content-Type': 'application/json',
      };

      const topArtistsAllTimeReq = axios.get(
        'https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term',
        { headers }
      );
      const topTracksAllTimeReq = axios.get(
        'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term',
        { headers }
      );

      const myProfile = axios.get('https://api.spotify.com/v1/me', { headers });
      const myPlaylist = axios.get(
        'https://api.spotify.com/v1/me/playlists?offset=0&limit=20',
        { headers }
      );
      const myFollowing = axios.get(
        'https://api.spotify.com/v1/me/following?type=artist',
        { headers }
      );

      axios
        .all([
          topArtistsAllTimeReq,
          topTracksAllTimeReq,
          myProfile,
          myPlaylist,
          myFollowing,
        ])
        .then(
          axios.spread((...responses) => {
            const topArtistsAllTime = responses[0].data.items;
            const topTracksAllTime = responses[1].data.items;

            if (topArtists.length === 0) {
              console.log('set top artists');
              settopArtists(topArtistsAllTime);
            }
            if (topTracks.length === 0) {
              console.log('set top tracks');
              settopTracks(topTracksAllTime);
            }
            if (me.display_name === '') {
              console.log('set me');
              setMe({
                ...me,
                display_name: responses[2].data.display_name,
                followers: responses[2].data.followers.total,
                images: responses[2].data.images[0].url as string,
                following: responses[4].data.artists.total,
                playlists: responses[3].data.total,
              });
            }
            setLoading(false);
            console.log(topTracks);
          })
        )
        .catch((err) => {
          console.error(err);
        });
    }
  },);

  const logOut = () => {
    window.localStorage.removeItem('access_token');
    setauthenticated(false);
    router.push('/login');
  };

  return (
    <Layout>
      <>
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
              width={'100%'}
              color="white"
            >
              {/* Top Part */}
              <Flex
                flexDir="column"
                as="header"
                justifyContent={'center'}
                alignItems={'center'}
                gap="1.6rem"
                mb="5rem"
              >
                {/* Profile Pic */}
                <Box>
                  <Image
                    src={me.images}
                    alt="pic"
                    borderRadius="full"
                    boxSize="150px"
                    mx="auto"
                    loading="lazy"
                  ></Image>
                </Box>
                <Text
                  fontSize={'5xl'}
                  fontWeight="bold"
                  lineHeight={'1.0'}
                  textAlign={'center'}
                >
                  {me.display_name}
                </Text>
                <Flex
                  gap="2rem"
                  mb="0.5rem"
                >
                  <Box
                    display="flex"
                    flexDir={'column'}
                    alignItems="center"
                  >
                    <Text
                      fontSize="1.2em"
                      color="brand.spotifyGreen"
                      fontWeight={'extrabold'}
                    >
                      {me.followers}
                    </Text>
                    <Text
                      color="brand.primaryGray"
                      textTransform="uppercase"
                      fontSize={'0.7em'}
                      letterSpacing="widest"
                    >
                      Followers
                    </Text>
                  </Box>
                  <Box
                    display="flex"
                    flexDir={'column'}
                    alignItems="center"
                  >
                    <Text
                      fontSize="1.2em"
                      color="brand.spotifyGreen"
                      fontWeight={'extrabold'}
                    >
                      {me.following}
                    </Text>
                    <Text
                      color="brand.primaryGray"
                      textTransform="uppercase"
                      fontSize={'0.7em'}
                      letterSpacing="widest"
                    >
                      Following
                    </Text>
                  </Box>
                  <Box
                    display="flex"
                    flexDir={'column'}
                    alignItems="center"
                  >
                    <Text
                      fontSize="1.2em"
                      color="brand.spotifyGreen"
                      fontWeight={'extrabold'}
                    >
                      {me.playlists}
                    </Text>
                    <Text
                      color="brand.primaryGray"
                      textTransform="uppercase"
                      fontSize={'0.7em'}
                      letterSpacing="widest"
                    >
                      Playlists
                    </Text>
                  </Box>
                </Flex>
                <Button
                  border="1px"
                  borderColor={'white'}
                  bgColor="brand.secondaryBlack"
                  borderRadius={'full'}
                  letterSpacing="wide"
                  fontSize={'0.8em'}
                  px={'2rem'}
                  onClick={logOut}
                  _hover={{ bgColor: 'white', color: 'brand.secondaryBlack' }}
                >
                  LOGOUT
                </Button>
              </Flex>

              {/* Bottom Part */}
              <Box
                display={{ base: 'block', md: 'grid' }}
                gridTemplateColumns={{ md: '1fr 1fr' }}
                justifyContent="center"
                gap="2rem"
              >
                {/* Top Artist of All Time */}
                <GridItem>
                  <Flex
                    justifyContent="space-between"
                    alignItems={'center'}
                    mb="2rem"
                  >
                    <Text
                      as="h2"
                      fontSize={{ base: 'md', md: 'large' }}
                      fontWeight="bold"
                    >
                      Top Artists of All Time
                    </Text>
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
                      SEE MORE
                    </Button>
                  </Flex>
                  <Flex
                    flexDir="column"
                    gap="2rem"
                  >
                    {topArtists.slice(0, 10).map((artist, index) => (
                      <Flex
                        key={index}
                        width="100%"
                        justifyContent={'left'}
                        alignItems="center"
                        cursor={'pointer'}
                        role="group"
                      >
                        <Link href={`/artists/${artist['id']}`}>
                          <Box position="relative">
                            <Image
                              src={artist['images'][0]['url']}
                              alt={artist['name']}
                              boxSize="3.2rem"
                              borderRadius="full"
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
                          </Box>
                        </Link>
                        <Link href={`/artists/${artist['id']}`}>
                          <Text
                            textUnderlineOffset={'0.2em'}
                            textDecorationThickness={'1px'}
                            _hover={{ textDecoration: 'underline' }}
                            transition="all 0.2s ease-in-out"
                            ml="1rem"
                          >
                            {artist['name']}
                          </Text>
                        </Link>
                      </Flex>
                    ))}
                  </Flex>
                </GridItem>

                {/* Top Tracks of All Time */}
                <GridItem mt={{ base: '5rem', md: '0' }}>
                  <Flex
                    justifyContent="space-between"
                    alignItems={'center'}
                    mb="2rem"
                  >
                    <Text
                      as="h2"
                      fontSize={{ base: 'md', md: 'large' }}
                      fontWeight="bold"
                    >
                      Top Tracks of All Time
                    </Text>
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
                      SEE MORE
                    </Button>
                  </Flex>
                  <Flex
                    flexDir="column"
                    gap="2rem"
                  >
                    {topTracks.slice(0, 10).map((track, index) => (
                      <>
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
                      </>
                    ))}
                  </Flex>
                </GridItem>
              </Box>
            </Box>
          </>
        )}
      </>
    </Layout>
  );
};

export default Home;
