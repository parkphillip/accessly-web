
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

  return (
    <section className="py-24 bg-light-bg">
      <motion.div
        className="max-w-3xl mx-auto px-6 lg:px-8 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInVariants}
      >
        <h3 className="text-4xl lg:text-5xl font-heading font-bold text-dark-text mb-6 leading-tight">
          Our Mission is Simple
        </h3>
        <p className="text-xl text-medium-text leading-relaxed">
          We believe every dining experience should be accessible. By providing free braille menus, we empower restaurants to welcome every guest with dignity and independence. It's not just about compliance; it's about community.
        </p>
      </motion.div>
    </section>
  );
};

export default MissionIntro;
