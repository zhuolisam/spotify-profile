import { useEffect, useState, useContext } from 'react';
import {
  Box,
  Text,
  Grid,
  GridItem,
  Image,
  AspectRatio,
} from '@chakra-ui/react';
import axios from 'axios';

import { AuthContext } from 'providers/AuthContext';
import Layout from 'components/layouts/Layout';
import Link from 'next/link';
import InfoButton from 'components/InfoButton';

type ArtistsList = {
  long_term: [];
  medium_term: [];
  short_term: [];
};

enum TimeRange {
  LONG_TERM = 'long_term',
  MEDIUM_TERM = 'medium_term',
  SHORT_TERM = 'short_term',
}

export default function TopArtist() {
  // @ts-ignore
  const { authenticated, setauthenticated } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [artists, setArtists] = useState<ArtistsList>({
    long_term: [],
    medium_term: [],
    short_term: [],
  });

  const [timeRange, settimeRange] = useState<TimeRange>(TimeRange.LONG_TERM);

  useEffect(() => {
    console.log('useEffect from topArtist');

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
      const topArtistsMediumTimeReq = axios.get(
        'https://api.spotify.com/v1/me/top/artists?limit=50&time_range=medium_term',
        { headers }
      );
      const topArtistsShortTimeReq = axios.get(
        'https://api.spotify.com/v1/me/top/artists?limit=50&time_range=short_term',
        { headers }
      );

      axios
        .all([
          topArtistsAllTimeReq,
          topArtistsMediumTimeReq,
          topArtistsShortTimeReq,
        ])
        .then(
          axios.spread((...responses) => {
            if (artists.long_term.length === 0) {
              setArtists({
                ...artists,
                long_term: responses[0].data.items,
                medium_term: responses[1].data.items,
                short_term: responses[2].data.items,
              });
            }
            console.log('responses', responses[1].data.items);
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
            minW={'max-content'}
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
                Top Artists
              </Text>
              <Box
                mt={{ base: '2rem', md: '0' }}
                display="flex"
                justifyContent={{ base: 'space-around', md: 'flex-end' }}
                mr="-15px"
              >
                <Box
                  as="button"
                  px="1rem"
                  textDecoration={
                    timeRange == TimeRange.LONG_TERM ? 'underline' : 'none'
                  }
                  _hover={{
                    color: 'brand.primaryWhite',
                  }}
                  cursor="pointer"
                  color={
                    timeRange == TimeRange.LONG_TERM
                      ? 'brand.primaryWhite'
                      : 'brand.primaryGray'
                  }
                  textUnderlineOffset={'0.2em'}
                  textDecorationThickness={'1px'}
                  transition={'all 0.2s ease-in-out'}
                  onClick={() => settimeRange(TimeRange.LONG_TERM)}
                >
                  All Time
                </Box>
                <Box
                  as="button"
                  px="1rem"
                  textDecoration={
                    timeRange == TimeRange.MEDIUM_TERM ? 'underline' : 'none'
                  }
                  _hover={{
                    color: 'brand.primaryWhite',
                  }}
                  color={
                    timeRange == TimeRange.MEDIUM_TERM
                      ? 'brand.primaryWhite'
                      : 'brand.primaryGray'
                  }
                  cursor="pointer"
                  textUnderlineOffset={'0.2em'}
                  textDecorationThickness={'1px'}
                  transition={'all 0.2s ease-in-out'}
                  onClick={() => settimeRange(TimeRange.MEDIUM_TERM)}
                >
                  Last 6 Months
                </Box>
                <Box
                  as="button"
                  px="1rem"
                  textDecoration={
                    timeRange == TimeRange.SHORT_TERM ? 'underline' : 'none'
                  }
                  _hover={{
                    color: 'brand.primaryWhite',
                  }}
                  color={
                    timeRange == TimeRange.SHORT_TERM
                      ? 'brand.primaryWhite'
                      : 'brand.primaryGray'
                  }
                  cursor="pointer"
                  textUnderlineOffset={'0.2em'}
                  textDecorationThickness={'1px'}
                  transition={'all 0.2s ease-in-out'}
                  onClick={() => settimeRange(TimeRange.SHORT_TERM)}
                >
                  Last 4 Weeks
                </Box>{' '}
                {/*Last 4 Weeks */}
              </Box>
              {/* Three Buttons */}
            </Box>
            {/* Header */}
            <Grid
              mt="3rem"
              templateColumns={{
                base: 'repeat(auto-fit, minmax(9.5rem, 1fr))',
                md: 'repeat(auto-fit, minmax(12.5rem, 1fr))',
              }}
              gap="2rem"
              textAlign="center"
              fontSize={'md'}
            >
              {artists[timeRange].map((artist, index) => (
                <GridItem key={index}>
                  {/* TODO: add link to artist*/}
                  <Box
                    position="relative"
                    role="group"
                    cursor="pointer"
                  >
                    <Link href="#">
                      <>
                        <AspectRatio
                          w={{ base: '9.5rem', md: '12.5rem' }}
                          ratio={1}
                          mx="auto"
                        >
                          <Image
                            src={artist['images'][0]['url']}
                            alt={artist['name']}
                            objectFit="cover"
                            borderRadius="full"
                            _hover={{ opacity: '0.6' }}
                            _groupHover={{ opacity: '0.6' }}
                            transition={'all 0.2s ease-in-out'}
                          />
                        </AspectRatio>
                        <InfoButton
                          position="absolute"
                          right="0"
                          left="0"
                          top="0"
                          bottom="0"
                          opacity="0"
                          mx="auto"
                          my="auto"
                          w="2rem"
                          h="2rem"
                          _groupHover={{ opacity: '1' }}
                          transition="all 0.2s ease-in-out"
                        />
                      </>
                    </Link>
                  </Box>
                  <Text
                    mt="1rem"
                    lineHeight={'1.2'}
                    cursor="pointer"
                    textUnderlineOffset={'0.2em'}
                    textDecorationThickness={'1px'}
                    _hover={{ textDecor: 'underline' }}
                    transition={'all 0.2s ease-in-out'}
                  >
                    {artist['name']}
                  </Text>
                </GridItem>
              ))}
            </Grid>
          </Box> /* body */
        )}
      </Layout>
    </>
  );
}
