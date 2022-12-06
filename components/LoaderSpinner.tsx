import { chakra, shouldForwardProp, Box, List, Flex } from '@chakra-ui/react';
import { motion, isValidMotionProp } from 'framer-motion';

const Beepop = chakra(motion.li, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

export const BeepopBox = ({
  delayTime,
  props,
}: {
  delayTime: number;
  props?: any;
}) => {
  return (
    <Beepop
      {...props}
      h="50px"
      w="8px"
      bg="brand.ternaryGray"
      animate={{ scaleY: [0.2, 1, 0.2] }}
      // @ts-ignore
      transition={{
        duration: 0.8,
        delay: delayTime,
        repeat: Infinity,
        ease: 'linear',
      }}
      style={{ transformOrigin: 'bottom' }}
    />
  );
};

function LoaderSpinner() {
  return (
    <Box h="100vh">
      <List
        display="flex"
        gap="5px"
        justifyContent={'center'}
        listStyleType="none"
        mt="20rem"
      >
        <BeepopBox delayTime={0.15} />
        <BeepopBox delayTime={0.4} />
        <BeepopBox delayTime={0.15} />
        <BeepopBox delayTime={0.25} />
        <BeepopBox delayTime={0.35} />
      </List>
    </Box>
  );
}

export default LoaderSpinner;
