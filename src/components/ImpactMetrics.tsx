
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

  const staggerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section id="impact" className="py-24 bg-light-bg">
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

        {/* Mission & Testimonial Combined Card */}
        <motion.div 
          className="max-w-4xl mx-auto"
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, amount: 0.5 }} 
          variants={staggerVariants}
        >
          <motion.div 
            className="bg-off-white rounded-3xl p-12 shadow-subtle border border-subtle-gray/20"
            variants={fadeInVariants}
          >
            <motion.h3 
              className="text-3xl lg:text-4xl font-heading font-bold mb-8 text-dark-text text-center"
              variants={fadeInVariants}
            >
              This is Where We Come In
            </motion.h3>
            
            <motion.div 
              className="w-16 h-1 bg-brand-terracotta mx-auto rounded-full mb-8"
              variants={fadeInVariants}
            ></motion.div>
            
            <motion.p 
              className="text-xl text-dark-text leading-relaxed mb-12 text-center max-w-3xl mx-auto"
              variants={fadeInVariants}
            >
              Accessly provides free, high-quality braille menus to restaurants. We believe access shouldn't be an afterthought—it's fundamental hospitality that empowers independence.
            </motion.p>
            
            {/* Testimonial */}
            <motion.div 
              className="border-l-4 border-brand-navy pl-8 max-w-2xl mx-auto"
              variants={fadeInVariants}
            >
              <blockquote className="text-2xl font-heading italic text-dark-text leading-relaxed mb-4">
                "For the first time, I felt like just another customer, not a burden. That feeling is priceless."
              </blockquote>
              <p className="text-medium-text font-medium">— Jessica L., Diner in Austin, TX</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactMetrics;
