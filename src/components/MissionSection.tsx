
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const MissionSection = () => {
  const fadeInVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto my-24 text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInVariants}
    >
      <motion.h3
        className="text-3xl lg:text-4xl font-heading font-bold mb-6 text-dark-text"
        variants={fadeInVariants}
      >
        This is Where We Come In
      </motion.h3>

      <motion.div
        className="w-16 h-1 bg-brand-terracotta mx-auto rounded-full mb-8"
        variants={fadeInVariants}
      ></motion.div>

      <motion.p
        className="text-xl text-dark-text leading-relaxed mb-12 max-w-3xl mx-auto"
        variants={fadeInVariants}
      >
        Accessly provides free, high-quality braille menus to restaurants. We
        believe access shouldn't be an afterthought but built into hospitality.
        Our simple process above makes it happen.
      </motion.p>

      <motion.div variants={fadeInVariants}>
        <Link to="/partner">
          <Button size="lg" className="group">
            Partner With Us
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
};
export default MissionSection;
