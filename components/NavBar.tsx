import { Box, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function NavBar() {
  const { pathname } = useRouter();

  return (
    <Box
      as="nav"
      position="fixed"
      w={{ base: '100%', md: '6rem' }}
      h={{ base: '4.5rem', md: '100%' }}
      minH="70"
      bottom="0"
      zIndex={1}
      backgroundColor="brand.primaryBlack"
    >
      <Box
        w="100%"
        h="100%"
        display={{ base: 'block', md: 'flex' }}
        flexDirection={{ md: 'column' }}
        justifyContent="space-between"
        alignItems="center"
        textAlign="center"
        fontWeight="thin"
        fontSize="0.7rem"
        letterSpacing="tight"
      >
        <Link href={'/'}>
          <Box
            boxSize=""
            display={{ base: 'none', md: 'flex' }}
            placeContent="center"
            mt="20px"
            cursor={'pointer'}
            className="logo-box"
          >
            <Image
              pt="5"
              minW="3.5rem"
              w="3.5rem"
              src="/logo/spotify-logo-png-7053.png"
              alt="Spotify Logo"
              transition={'all 0.2s ease-in-out'}
              sx={{
                '.logo-box:hover &': {
                  filter: 'brightness(120%)',
                },
              }}
            />
          </Box>
        </Link>
        {/* NavBar Tabs */}
        <Box
          w="100%"
          h={{ base: '100%', md: 'auto' }}
          textColor={'brand.primaryGray'}
          display={{ base: 'flex', md: 'flex' }}
          flexDirection={{ base: 'row', md: 'column' }}
          justifyContent={'space-between'}
          alignItems={{ base: 'center', md: 'center' }}
          textAlign="center"
        >
          {/* Profile */}
          <Link href={'/'}>
            <Box
              w="100%"
              h={{ base: '100%', md: 'auto' }}
              transition={'all 0.2s ease-in-out'}
              _hover={{
                borderColor: 'brand.spotifyGreen',
                bg: 'brand.secondaryBlack',
                textColor: 'white',
              }}
              bg={
                pathname === '/' ? 'brand.secondaryBlack' : 'brand.primaryBlack'
              }
              borderLeft={{ base: '0', md: '5px solid' }}
              borderTop={{ base: '3px solid', md: '0' }}
              borderColor={{
                base: pathname === '/' ? 'brand.spotifyGreen' : 'transparent',
                md: pathname === '/' ? 'brand.spotifyGreen' : 'transparent',
              }}
              cursor={'pointer'}
              textColor={pathname === '/' ? 'white' : 'currentColor'}
            >
              <Box
                w="100%"
                h="100%"
                display="flex"
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                py={'15px'}
              >
                <svg
                  id="user-icon"
                  viewBox="0 0 1024 1024"
                  width="20"
                  height="20"
                  fill="currentColor"
                >
                  <path d="m730.06 679.64q-45.377 53.444-101.84 83.443t-120 29.999q-64.032 0-120.75-30.503t-102.6-84.451q-40.335 13.109-77.645 29.747t-53.948 26.722l-17.142 10.084q-29.747 19.159-51.175 57.729t-21.428 73.107 25.461 59.242 60.754 24.705h716.95q35.293 0 60.754-24.705t25.461-59.242-21.428-72.603-51.679-57.225q-6.554-4.033-18.907-10.84t-51.427-24.453-79.409-30.755zm-221.84 25.72q-34.285 0-67.561-14.873t-60.754-40.335-51.175-60.502-40.083-75.124-25.461-84.451-9.075-87.728q0-64.032 19.915-116.22t54.452-85.964 80.67-51.931 99.072-18.151 99.072 18.151 80.67 51.931 54.452 85.964 19.915 116.22q0 65.04-20.167 130.58t-53.948 116.72-81.426 83.443-98.568 32.268z"></path>
                </svg>
                <Text
                  as="span"
                  mt="1"
                >
                  Profile
                </Text>
              </Box>
            </Box>
          </Link>

          {/* Top Artist */}
          <Link href={'/artists'}>
            <Box
              w="100%"
              h={{ base: '100%', md: 'auto' }}
              transition={'all 0.2s ease-in-out'}
              _hover={{
                borderColor: 'brand.spotifyGreen',
                bg: 'brand.secondaryBlack',
                textColor: 'white',
              }}
              bg={
                pathname === '/artists'
                  ? 'brand.secondaryBlack'
                  : 'brand.primaryBlack'
              }
              borderLeft={{ base: '0', md: '5px solid' }}
              borderTop={{ base: '3px solid', md: '0' }}
              borderColor={{
                base:
                  pathname === '/artists'
                    ? 'brand.spotifyGreen'
                    : 'transparent',
                md:
                  pathname === '/artists'
                    ? 'brand.spotifyGreen'
                    : 'transparent',
              }}
              cursor={'pointer'}
              textColor={pathname === '/artists' ? 'white' : 'currentColor'}
            >
              <Box
                w="100%"
                h="100%"
                display="flex"
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                py={'15px'}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  viewBox="0 0 50 50"
                  width="20"
                  height="auto"
                  fill="currentColor"
                >
                  <title>Microphone</title>
                  <g>
                    <path d="M44.159,3.341C41.932,1.115,39.013,0,36.093,0c-2.919,0-5.838,1.114-8.064,3.341c-4.454,4.454-4.454,11.677,0,16.131     c2.227,2.227,5.146,3.341,8.064,3.341s5.839-1.114,8.066-3.341C48.613,15.019,48.613,7.796,44.159,3.341z"></path>
                    <path d="M22.161,14.999L0.646,39.161c-0.9,1.011-0.854,2.604,0.103,3.562l1.132,1.133L1.158,44.58     c-0.477,0.477-0.477,1.256,0,1.731l0.108,0.108c0.477,0.478,1.256,0.478,1.733,0l0.723-0.724l1.055,1.055     c0.957,0.957,2.552,1.003,3.563,0.104l24.155-21.509c-2.469-0.633-4.739-1.902-6.589-3.752     C24.019,19.706,22.779,17.416,22.161,14.999z M21.02,29.268l-5.145,5.146c-0.77,0.771-2.018,0.771-2.787,0     c-0.769-0.771-0.77-2.02,0-2.787l5.145-5.146c0.77-0.771,2.018-0.771,2.787,0C21.789,27.251,21.79,28.499,21.02,29.268z"></path>
                  </g>
                </svg>
                <Text as="span">Top Artists</Text>
              </Box>
            </Box>
          </Link>
          {/* Top Tracks */}
          <Link href={'/tracks'}>
            <Box
              w="100%"
              h={{ base: '100%', md: 'auto' }}
              transition={'all 0.2s ease-in-out'}
              _hover={{
                borderColor: 'brand.spotifyGreen',
                bg: 'brand.secondaryBlack',
                textColor: 'white',
              }}
              bg={
                pathname === '/tracks'
                  ? 'brand.secondaryBlack'
                  : 'brand.primaryBlack'
              }
              borderLeft={{ base: '0', md: '5px solid' }}
              borderTop={{ base: '3px solid', md: '0' }}
              borderColor={{
                base:
                  pathname === '/tracks' ? 'brand.spotifyGreen' : 'transparent',
                md:
                  pathname === '/tracks' ? 'brand.spotifyGreen' : 'transparent',
              }}
              cursor={'pointer'}
              textColor={pathname === '/tracks' ? 'white' : 'currentColor'}
            >
              <Box
                w="100%"
                h="100%"
                display="flex"
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                py={'15px'}
              >
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 489.164 489.164"
                  width="20"
                  height="auto"
                  fill="currentColor"
                >
                  <path d="M159.582,75.459v285.32c-14.274-10.374-32.573-16.616-52.5-16.616c-45.491,0-82.5,32.523-82.5,72.5s37.009,72.5,82.5,72.5 s82.5-32.523,82.5-72.5V168.942l245-60.615v184.416c-14.274-10.374-32.573-16.616-52.5-16.616c-45.491,0-82.5,32.523-82.5,72.5 s37.009,72.5,82.5,72.5s82.5-32.523,82.5-72.5V0L159.582,75.459z"></path>
                </svg>
                <Text as="span">Top Tracks</Text>
              </Box>
            </Box>
          </Link>
          {/* Recent */}
          <Link href={'/recent'}>
            <Box
              w="100%"
              h={{ base: '100%', md: 'auto' }}
              transition={'all 0.2s ease-in-out'}
              _hover={{
                borderColor: 'brand.spotifyGreen',
                bg: 'brand.secondaryBlack',
                textColor: 'white',
              }}
              bg={
                pathname === '/recent'
                  ? 'brand.secondaryBlack'
                  : 'brand.primaryBlack'
              }
              borderLeft={{ base: '0', md: '5px solid' }}
              borderTop={{ base: '3px solid', md: '0' }}
              borderColor={{
                base:
                  pathname === '/recent' ? 'brand.spotifyGreen' : 'transparent',
                md:
                  pathname === '/recent' ? 'brand.spotifyGreen' : 'transparent',
              }}
              cursor={'pointer'}
              textColor={pathname === '/recent' ? 'white' : 'currentColor'}
            >
              <Box
                w="100%"
                h="100%"
                display="flex"
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                py={'15px'}
              >
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 510 510"
                  width="20"
                  height="auto"
                  fill="currentColor"
                >
                  <title>Time</title>
                  <g>
                    <g id="history">
                      <path d="M267.75,12.75c-89.25,0-168.3,48.45-209.1,122.4L0,76.5v165.75h165.75    l-71.4-71.4c33.15-63.75,96.9-107.1,173.4-107.1C372.3,63.75,459,150.45,459,255s-86.7,191.25-191.25,191.25    c-84.15,0-153-53.55-181.05-127.5H33.15c28.05,102,122.4,178.5,234.6,178.5C402.9,497.25,510,387.6,510,255    C510,122.4,400.35,12.75,267.75,12.75z M229.5,140.25V270.3l119.85,71.4l20.4-33.15l-102-61.2v-107.1H229.5z"></path>
                    </g>
                  </g>
                </svg>
                <Text as="span">Recent</Text>
              </Box>
            </Box>
          </Link>

          {/* playlists */}
          <Link href={'/playlists'}>
            <Box
              w="100%"
              h={{ base: '100%', md: 'auto' }}
              transition={'all 0.2s ease-in-out'}
              _hover={{
                borderColor: 'brand.spotifyGreen',
                bg: 'brand.secondaryBlack',
                textColor: 'white',
              }}
              bg={
                pathname === '/playlists'
                  ? 'brand.secondaryBlack'
                  : 'brand.primaryBlack'
              }
              borderLeft={{ base: '0', md: '5px solid' }}
              borderTop={{ base: '3px solid', md: '0' }}
              borderColor={{
                base:
                  pathname === '/playlists'
                    ? 'brand.spotifyGreen'
                    : 'transparent',
                md:
                  pathname === '/playlists'
                    ? 'brand.spotifyGreen'
                    : 'transparent',
              }}
              cursor={'pointer'}
              textColor={pathname === '/playlists' ? 'white' : 'currentColor'}
            >
              <Box
                w="100%"
                h="100%"
                display="flex"
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                py={'15px'}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  viewBox="0 0 405.333 405.333"
                  width="20"
                  height="auto"
                  fill="currentColor"
                >
                  <g>
                    <rect
                      x="0"
                      y="53.333"
                      width="256"
                      height="42.667"
                    ></rect>
                    <rect
                      x="0"
                      y="138.667"
                      width="256"
                      height="42.667"
                    ></rect>
                    <path d="M298.667,53.333v174.613c-6.72-2.453-13.76-3.947-21.333-3.947c-35.307,0-64,28.693-64,64c0,35.307,28.693,64,64,64     c35.307,0,64-28.693,64-64V96h64V53.333H298.667z"></path>
                    <rect
                      x="0"
                      y="224"
                      width="170.667"
                      height="42.667"
                    ></rect>
                  </g>
                </svg>
                <Text as="span">playlists</Text>
              </Box>
            </Box>
          </Link>
        </Box>

        <Box
          display={{ base: 'none', md: 'block' }}
          mb="20px"
          cursor={'pointer'}
          textColor={'gray.400'}
          _hover={{ textColor: 'white' }}
          transition={'all 0.2s ease-in-out'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 496 512"
            width="2rem"
            height="auto"
            fill="currentColor"
          >
            <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
          </svg>
        </Box>
      </Box>
    </Box>
  );
}
