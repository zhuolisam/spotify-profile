import { useEffect, useState, useContext } from 'react';
import { Box, Text, Grid, GridItem, Image, HStack } from '@chakra-ui/react';
import axios from 'axios';

import { AuthContext } from 'providers/AuthContext';
import Layout from 'components/layouts/Layout';
import { useRouter } from 'next/router';
import LoaderSpinner from 'components/LoaderSpinner';

type Artist = {
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  name: String;
  followers: number;
  genres: String[];
  popularity: number;
};

export default function SingleArtist() {
  const { authenticated } = useContext(AuthContext);
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [artist, setArtist] = useState<Artist | null>(null);

  useEffect(() => {
    const artist_id = router.query.artistId;

    if (authenticated) {
      const token = JSON.parse(
        window.localStorage.getItem('access_token') || ''
      );

      const headers = {
        Authorization: `Bearer ${token?.access_token}`,
        'Content-Type': 'application/json',
      };

      axios
        .get(`https://api.spotify.com/v1/artists/${artist_id}`, { headers })
        .then((res) => {
          if (artist == null) {
            setArtist({
              images: res.data.images,
              name: res.data.name,
              followers: res.data.followers.total,
              genres: res.data.genres,
              popularity: res.data.popularity,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
      setLoading(false);
    }
  });

  return (
    <>
      <Layout>
        {loading ? (
          <LoaderSpinner />
        ) : (
          <>
            <Box
              display="flex"
              flexDir={'column'}
              justifyContent="center"
              alignItems="center"
              color="brand.primaryWhite"
              py="3rem"
            >
              <Image
                boxSize="17rem"
                borderRadius={'full'}
                src={artist?.images[0]?.url}
                alt={artist?.name.toString()}
                loading="lazy"
                objectFit="cover"
                mx="auto"
              ></Image>
              <Box
                mt="2rem"
                textAlign={'center'}
              >
                <Text
                  as="h1"
                  fontSize={{ base: '2em', md: '7xl' }}
                  fontWeight="extrabold"
                >
                  {artist?.name}
                </Text>
                <Grid
                  mt="1rem"
                  templateColumns={'1fr 1fr 1fr'}
                  alignItems="center"
                  gap="0.6rem"
                  lineHeight={'1.1'}
                >
                  <Box>
                    <Text
                      fontSize={{ base: '1.3rem', md: '1.8rem' }}
                      color="brand.primaryBlue"
                      fontWeight={'extrabold'}
                    >
                      {artist?.followers.toLocaleString()}
                    </Text>
                    <Text
                      as="span"
                      color="brand.primaryGray"
                      fontSize={{ base: '0.7rem', md: '0.9rem' }}
                      fontWeight={'thin'}
                      letterSpacing={'tight'}
                      textTransform={'uppercase'}
                    >
                      Followers
                    </Text>
                  </Box>
                  <Box>
                    <Text
                      fontSize={{ base: '1.3rem', md: '1.8rem' }}
                      color="brand.primaryBlue"
                      fontWeight={'extrabold'}
                      textTransform={'capitalize'}
                    >
                      {artist?.genres[0]}
                    </Text>
                    <Text
                      as="span"
                      color="brand.primaryGray"
                      fontSize={{ base: '0.7rem', md: '0.9rem' }}
                      fontWeight={'thin'}
                      letterSpacing={'tight'}
                      textTransform={'uppercase'}
                    >
                      Genres
                    </Text>
                  </Box>
                  <Box>
                    <Text
                      fontSize={{ base: '1.3rem', md: '1.8rem' }}
                      color="brand.primaryBlue"
                      fontWeight={'extrabold'}
                    >
                      {artist?.popularity}%
                    </Text>
                    <Text
                      as="span"
                      color="brand.primaryGray"
                      fontSize={{ base: '0.7rem', md: '0.9rem' }}
                      fontWeight={'thin'}
                      letterSpacing={'tight'}
                      textTransform={'uppercase'}
                    >
                      Popularity
                    </Text>
                  </Box>
                </Grid>
              </Box>
            </Box>
          </>
        )}
      </Layout>
    </>
  );
}
