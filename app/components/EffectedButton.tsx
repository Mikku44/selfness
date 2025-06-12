// BubbleButton.tsx
'use client';

import { motion, useAnimation } from 'framer-motion';

const topBubbles = {
  initial: {
    backgroundPosition: [
      '5% 90%',
      '10% 90%',
      '15% 90%',
    ],
  },
  animate: {
    backgroundPosition: [
      '0% 70%',
      '10% 30%',
      '20% -10%',
    ],
    backgroundSize: ['0% 0%', '0% 0%', '0% 0%'],
    transition: {
      duration: 2,
      ease: 'easeInOut',
    },
  },
};

const bottomBubbles = {
  initial: {
    backgroundPosition: [
      '10% -10%',
      '30% 10%',
    ],
  },
  animate: {
    backgroundPosition: [
      '0% 90%',
      '20% 90%',
    ],
    backgroundSize: ['0% 0%', '0% 0%'],
    transition: {
      duration: 2,
      ease: 'easeInOut',
    },
  },
};


export const EffectedButton = () => {
  const controls = useAnimation();

  const triggerAnimation = () => {
    controls.start('animate');
  };

  return (
    <motion.button
      className="btn-bubble"
      onClick={triggerAnimation}
      whileTap={{ scale: 0.9, boxShadow: '0 2px 25px rgba(255, 0, 130, 0.2)' }}
    >
      <motion.span
        className="bubble before"
        initial="initial"
        animate={controls}
        variants={topBubbles}
      />
      <motion.span
        className="bubble after"
        initial="initial"
        animate={controls}
        variants={bottomBubbles}
      />
      Click Me
    </motion.button>
  );
};
