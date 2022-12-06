import { Box, Center, chakra, Flex, shouldForwardProp } from '@chakra-ui/react';
import { motion } from 'framer-motion';

export const CounterSection = chakra(motion.div, {
  shouldForwardProp: (prop) => {
    return shouldForwardProp(prop) || prop === 'transition';
  },
});

export const CounterBox = ({
  delayTime,
  props,
}: {
  delayTime: number;
  props?: any;
}) => {
  return (
    <CounterSection
      {...props}
      h="100px"
      w="10px"
      bg="brand.secondaryGray"
      animate={{ scaleY: [0.2, 1, 0.2] }}
      // @ts-ignore
      transition={{
        duration: 1.2,
        delay: delayTime,
        repeat: Infinity,
        type: 'linear',
      }}
      style={{ transformOrigin: 'bottom' }}
    />
  );
};

export default function Counter() {
  return (
    <>
      <CounterSection
        // @ts-ignore
        transition={{ duration: 0.8 }}
        mb={6}
      >
        <Flex
          gap="5px"
          justifyContent={'center'}
        >
          <CounterBox delayTime={0.25} />
          <CounterBox delayTime={0.5} />
          <CounterBox delayTime={0.35} />
          <CounterBox delayTime={0.65} />
          <CounterBox delayTime={0.55} />
        </Flex>
      </CounterSection>
    </>
  );
}
