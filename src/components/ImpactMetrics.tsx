
import React from 'react';
import { motion } from 'framer-motion';
import { ImpactStats } from './ImpactStats';

const ImpactMetrics = () => {
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
    <section id="impact" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header with cleaner typography */}
        <motion.div 
          className="text-center mb-20" 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, amount: 0.3 }} 
          variants={fadeInVariants}
        >
          <h2 className="text-5xl lg:text-6xl font-heading font-bold text-dark-text mb-6 leading-tight">
            Dining Through a<br />Different Lens
          </h2>
          <p className="text-xl text-medium-text max-w-2xl mx-auto leading-relaxed">
            For millions with vision impairments, dining out presents hidden barriers.
          </p>
        </motion.div>

        {/* Stats component with new layout */}
        <div className="mb-20">
          <ImpactStats />
        </div>
      </div>
    </section>
  );
};

export default ImpactMetrics;
