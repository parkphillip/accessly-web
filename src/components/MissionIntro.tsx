import React from 'react';
import { motion } from 'framer-motion';
const MissionIntro = () => {
  const fadeInVariants = {
    hidden: {
      opacity: 0,
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
      }
    }
  };
  return;
};
export default MissionIntro;