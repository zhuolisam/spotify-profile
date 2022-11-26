import { useEffect, useState, useContext } from 'react';
import { Box, Text, Grid, GridItem, Image, Flex } from '@chakra-ui/react';
import axios from 'axios';

import { AuthContext } from 'providers/AuthContext';
import Layout from 'components/layouts/Layout';
import Link from 'next/link';
import InfoButton from 'components/InfoButton';
import { milliToMinutes } from 'lib/helpers/helperUtils';

type TracksList = {
  long_term: [];
  medium_term: [];
  short_term: [];
};

enum TimeRange {
  LONG_TERM = 'long_term',
  MEDIUM_TERM = 'medium_term',
  SHORT_TERM = 'short_term',
}

export default function TopTracks() {
  // @ts-ignore
  const { authenticated, setauthenticated } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [tracks, setTracks] = useState<TracksList>({
    long_term: [],
    medium_term: [],
    short_term: [],
  });

  const [timeRange, settimeRange] = useState<TimeRange>(TimeRange.LONG_TERM);

  useEffect(() => {

    if (authenticated) {
      const token = JSON.parse(
        window.localStorage.getItem('access_token') || ''
      );

      const headers = {
        Authorization: `Bearer ${token?.access_token}`,
        'Content-Type': 'application/json',
      };

      const topTracksAllTimeReq = axios.get(
        'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term',
        { headers }
      );
      const topTracksMediumTimeReq = axios.get(
        'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term',
        { headers }
      );
      const topTracksShortTimeReq = axios.get(
        'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term',
        { headers }
      );

      axios
        .all([
          topTracksAllTimeReq,
          topTracksMediumTimeReq,
          topTracksShortTimeReq,
        ])
        .then(
          axios.spread((...responses) => {
            if (tracks.long_term.length === 0) {
              setTracks({
                ...tracks,
                long_term: responses[0].data.items,
                medium_term: responses[1].data.items,
                short_term: responses[2].data.items,
              });
            }
            setLoading(false);
          })
        )
        .catch((err) => {
          console.log(err);
        });
    }
    setLoading(false);
  }, []);

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
            <Box
              display={'flex'}
              flexDirection={{ base: 'column', md: 'row' }}
              justifyContent="space-between"
            >
              <Text
                as="h1"
                textAlign={{ base: 'center', md: 'left' }}
                fontSize={'2xl'}
                fontWeight="extrabold"
                lineHeight={'1.0'}
              >
                Top Tracks
              </Text>
              <Box
                mt={{ base: '2rem', md: '0' }}
                display="flex"
                justifyContent={{ base: 'space-around', md: 'flex-end' }}
                mr={{ base: '0', md: '-15px' }}
                fontSize={{ base: 'sm', md: 'md' }}
                transition={'all 0.2s ease-in-out'}
              >
                <Box
                  as="button"
                  px={{ base: '0', md: '0.6rem' }}
                  _hover={{
                    color: 'brand.primaryWhite',
                  }}
                  cursor="pointer"
                  color={
                    timeRange == TimeRange.LONG_TERM
                      ? 'brand.primaryWhite'
                      : 'brand.primaryGray'
                  }
                  onClick={() => settimeRange(TimeRange.LONG_TERM)}
                >
                  <Box
                    as="span"
                    pb={{ base: '0px', md: '2px' }}
                    borderBottom={
                      timeRange == TimeRange.LONG_TERM
                        ? '1px solid white'
                        : 'transparent'
                    }
                  >
                    All Time
                  </Box>
                </Box>
                <Box
                  as="button"
                  px={{ base: '0', md: '0.6rem' }}
                  _hover={{
                    color: 'brand.primaryWhite',
                  }}
                  color={
                    timeRange == TimeRange.MEDIUM_TERM
                      ? 'brand.primaryWhite'
                      : 'brand.primaryGray'
                  }
                  cursor="pointer"
                  transition={'all 0.2s ease-in-out'}
                  onClick={() => settimeRange(TimeRange.MEDIUM_TERM)}
                >
                  <Box
                    as="span"
                    pb={{ base: '0px', md: '2px' }}
                    borderBottom={
                      timeRange == TimeRange.MEDIUM_TERM
                        ? '1px solid white'
                        : 'none'
                    }
                  >
                    Last 6 Months
                  </Box>
                </Box>
                <Box
                  as="button"
                  px={{ base: '0', md: '0.6rem' }}
                  _hover={{
                    color: 'brand.primaryWhite',
                  }}
                  color={
                    timeRange == TimeRange.SHORT_TERM
                      ? 'brand.primaryWhite'
                      : 'brand.primaryGray'
                  }
                  cursor="pointer"
                  onClick={() => settimeRange(TimeRange.SHORT_TERM)}
                >
                  <Box
                    as="span"
                    pb={{ base: '0px', md: '2px' }}
                    borderBottom={
                      timeRange == TimeRange.SHORT_TERM
                        ? '1px solid white'
                        : 'none'
                    }
                  >
                    Last 4 Weeks
                  </Box>
                </Box>{' '}
                {/*Last 4 Weeks */}
              </Box>
              {/* Three Buttons */}
            </Box>
            {/* Header */}
            <Flex
              mt="3rem"
              flexDir="column"
              gap="2rem"
            >
              {tracks[timeRange].slice(0, 10).map((track, index) => (
                <>
                  <Link href={`tracks/${track['id']}`}>
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
          </Box> /* body */
        )}
      </Layout>
    </>
  );
}
