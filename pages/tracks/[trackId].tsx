import { useEffect, useState, useContext } from 'react';
import { Box, Text, Image, Button, Grid } from '@chakra-ui/react';
import axios from 'axios';

import { AuthContext } from 'providers/AuthContext';
import Layout from 'components/layouts/Layout';
import BarChart from 'components/BarChart';
import { useRouter } from 'next/router';
import { milliToMinutes } from 'lib/helpers/helperUtils';

type TrackType = {
  id: string;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  name: string;
  artists: string[];
  album_name: string;
  release_date: string;
  external_url: string;
  album_url: string;
  popularity: number;
  duration_ms: number;
};

type audioAnalysisType = {
  key: number;
  modality: number;
  time_signature: number;
  tempo: number;
  bars: number;
  beats: number;
  sections: number;
  segments: number;
};

const pitchClassNotation: { [key: string]: any } = {
  0: 'C',
  1: 'C♯/D♭',
  2: 'D',
  3: 'D♯/E♭',
  4: 'E',
  5: 'F',
  6: 'F♯/G♭',
  7: 'G',
  8: 'G♯/A♭',
  9: 'A',
  10: 'A♯/B♭',
  11: 'B',
};

const modality: { [key: string]: any } = {
  0: 'Minor',
  1: 'Major',
};

export function WrappedGridItem({
  keyy,
  info,
}: {
  keyy: string;
  info: string | number;
}) {
  return (
    <Box
      borderRight="1px solid rgb(64,64,64)"
      borderBottom="1px solid rgb(64,64,64)"
      p="0.8rem 0.625rem"
      color="brand.secondaryGray"
    >
      <Text
        as="h3"
        fontWeight={'extrabold'}
        fontSize={{ base: '1.5rem', md: '1.75rem' }}
      >
        {info}
      </Text>
      <Text
        fontWeight={'thin'}
        fontSize={{ base: 'xs', md: 'sm' }}
      >
        {keyy}
      </Text>
    </Box>
  );
}

export default function SingleTrack() {
  const router = useRouter();
  const { authenticated } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const [track, setTrack] = useState<TrackType | null>();
  const [audioAnalysis, setAudioAnalysis] =
    useState<audioAnalysisType | null>();
  const [audioFeatures, setAudioFeatures] = useState<any | null>();

  useEffect(() => {
    const track_id = router.query.trackId;

    if (authenticated && track_id) {
      const token = JSON.parse(
        window.localStorage.getItem('access_token') || ''
      );

      const headers = {
        Authorization: `Bearer ${token?.access_token}`,
        'Content-Type': 'application/json',
      };

      const trackInfoReq = axios.get(
        `https://api.spotify.com/v1/tracks/${track_id}`,
        { headers }
      );
      const audioAnalysisReq = axios.get(
        `https://api.spotify.com/v1/audio-analysis/${track_id}`,
        { headers }
      );

      const audioFeaturesReq = axios.get(
        `https://api.spotify.com/v1/audio-features/${track_id}`,
        { headers }
      );

      axios
        .all([trackInfoReq, audioAnalysisReq, audioFeaturesReq])
        .then(
          axios.spread((...responses) => {
            if (track == null) {
              const trackInfoData = responses[0].data;
              setTrack({
                images: trackInfoData.album.images,
                name: trackInfoData.name,
                artists: trackInfoData.artists.map(
                  (artist: any) => artist.name
                ),
                album_name: trackInfoData.album.name,
                release_date: trackInfoData.album.release_date,
                external_url: trackInfoData.external_urls.spotify,
                id: trackInfoData.id,
                album_url: trackInfoData.album.external_urls.spotify,
                popularity: trackInfoData.popularity,
                duration_ms: trackInfoData.duration_ms,
              });
            }

            if (audioAnalysis == null) {
              setAudioAnalysis({
                key: responses[1].data.track.key,
                modality: responses[1].data.track.mode,
                time_signature: responses[1].data.track.time_signature,
                tempo: responses[1].data.track.tempo,
                bars: responses[1].data.bars.length,
                beats: responses[1].data.beats.length,
                sections: responses[1].data.sections.length,
                segments: responses[1].data.segments.length,
              });
            }

            if (audioFeatures == null) {
              setAudioFeatures({
                acousticness: responses[2].data.acousticness,
                danceability: responses[2].data.danceability,
                energy: responses[2].data.energy,
                instrumentalness: responses[2].data.instrumentalness,
                liveness: responses[2].data.liveness,
                speechiness: responses[2].data.speechiness,
                valence: responses[2].data.valence,
              });
            }
            setLoading(false);
          })
        )
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
          >
            <Box
              display="flex"
              flexDir={{ base: 'column', sm: 'row' }}
            >
              <Image
                boxSize={{ base: '13rem', md: '16rem' }}
                src={track?.images[0]?.url}
                alt={track?.name.toString()}
                loading="lazy"
                objectFit="cover"
                mx={{ base: 'auto', sm: '0' }}
                mr={{ base: 'auto', sm: '1.8rem' }}
              />
              <Box
                textAlign={{ base: 'center', sm: 'left' }}
                flexShrink="1"
              >
                <Text
                  as="h1"
                  fontSize={{ base: '2rem', md: '2.3rem' }}
                  fontWeight={'extrabold'}
                  mt={{ base: '1.2rem', md: '0' }}
                >
                  {track?.name}
                </Text>
                <Text
                  as="h2"
                  mt="0.3rem"
                  color="brand.secondaryGray"
                  fontSize={{ base: '1.3rem', md: '1.5rem' }}
                  fontWeight={'normal'}
                >
                  {track?.artists.join(', ')}
                </Text>
                <a
                  href={track?.album_url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Text
                    as="h3"
                    mt="0.3rem"
                    color="brand.primaryGray"
                    fontSize={{ base: '0.85rem', md: '0.95rem' }}
                    fontWeight={'thin'}
                    letterSpacing="wide"
                    cursor={'pointer'}
                  >
                    {track?.album_name} · {track?.release_date.substring(0, 4)}
                  </Text>
                </a>
                <a
                  href={track?.external_url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    mt="1.2rem"
                    bgColor={'brand.spotifyGreen'}
                    _hover={{ filter: 'brightness(110%)' }}
                    _active={{ filter: 'brightness(110%)' }}
                    p="0.2rem 1.5rem"
                    borderRadius="full"
                    transition="all 0.2s ease-in-out"
                    fontWeight={'bold'}
                    fontSize="0.8rem"
                    letterSpacing={'widest'}
                  >
                    PLAY ON SPOTIFY
                  </Button>
                </a>
              </Box>
            </Box>{' '}
            {/* end of track info */}
            <Grid
              templateColumns={{
                base: 'repeat(2, minmax(6rem, 1fr))',
                sm: 'repeat(auto-fit, minmax(6.5rem, 1fr))',
                md: 'repeat(5, minmax(6.4rem, 1fr))',
              }}
              borderLeft="1px solid rgb(64,64,64)"
              borderTop="1px solid rgb(64,64,64)"
              textAlign="center"
              mt="4rem"
            >
              <WrappedGridItem
                info={milliToMinutes(track?.duration_ms || 0)}
                keyy={'Duration'}
              />
              <WrappedGridItem
                info={pitchClassNotation[audioAnalysis?.key || 0]}
                keyy={'Key'}
              />
              <WrappedGridItem
                info={modality[audioAnalysis?.modality || 0]}
                keyy={'Modality'}
              />
              <WrappedGridItem
                info={audioAnalysis?.time_signature || 0}
                keyy={'Time Signature'}
              />
              <WrappedGridItem
                info={Math.round(audioAnalysis?.tempo || 0)}
                keyy={'Tempo (BPM)'}
              />
              <WrappedGridItem
                info={track?.popularity + '' + '%'}
                keyy={'Popularity'}
              />
              <WrappedGridItem
                info={audioAnalysis?.bars || 0}
                keyy={'Bars'}
              />
              <WrappedGridItem
                info={audioAnalysis?.beats || 0}
                keyy={'Beats'}
              />
              <WrappedGridItem
                info={audioAnalysis?.sections || 0}
                keyy={'Sections'}
              />
              <WrappedGridItem
                info={audioAnalysis?.segments || 0}
                keyy={'Segments'}
              />
            </Grid>
            {/* end of audio analysis */}
            <BarChart
              orientation="vertical"
              chartData={[
                {
                  name: 'acousticness',
                  value: audioFeatures?.acousticness || 0,
                },
                {
                  name: 'danceability',
                  value: audioFeatures?.danceability || 0,
                },
                {
                  name: 'energy',
                  value: audioFeatures?.energy || 0,
                },
                {
                  name: 'instrumentalness',
                  value: audioFeatures?.instrumentalness || 0,
                },
                {
                  name: 'liveness',
                  value: audioFeatures?.liveness || 0,
                },
                {
                  name: 'speechiness',
                  value: audioFeatures?.speechiness || 0,
                },
                {
                  name: 'valence',
                  value: audioFeatures?.valence || 0,
                },
              ]}
              position="relative"
              mx="auto"
              mt="5rem"
              title="Audio Features"
              titleSize="16rem"
              tickSize="12rem"
              width="100%"
              height={'auto'}
              maxW="40rem"
            />
          </Box>
        </>
      )}
    </Layout>
  );
}
