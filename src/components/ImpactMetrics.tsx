
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
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section id="impact" className="py-32 bg-gradient-to-b from-brand-navy to-brand-navy/95">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header with cleaner typography */}
        <motion.div 
          className="text-center mb-20" 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, amount: 0.3 }} 
          variants={fadeInVariants}
        >
          <h2 className="text-5xl lg:text-6xl font-heading font-bold text-off-white mb-6 leading-tight">
            Dining Through a<br />Different Lens
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            For millions with vision impairments, dining out presents hidden barriers.
          </p>
        </motion.div>

        {/* Stats component with new layout */}
        <div className="mb-24">
          <ImpactStats />
        </div>

        {/* Solution statement */}
        <motion.div 
          className="text-center max-w-3xl mx-auto"
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, amount: 0.5 }} 
          variants={fadeInVariants}
        >
          <h3 className="text-3xl lg:text-4xl font-heading font-bold mb-6 text-off-white">
            This is Where We Come In
          </h3>
          <div className="w-16 h-1 bg-blue-400 mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-off-white/90 leading-relaxed mb-8">
            Accessly provides free, high-quality braille menus to restaurants. We believe access shouldn't be an afterthought—it's fundamental hospitality that empowers independence.
          </p>
          
          {/* Testimonial */}
          <div className="bg-black/10 border border-white/10 p-8 rounded-2xl backdrop-blur-sm">
            <blockquote className="text-2xl font-heading italic text-off-white leading-relaxed mb-4">
              "For the first time, I felt like just another customer, not a burden. That feeling is priceless."
            </blockquote>
            <p className="text-off-white/70">— Jessica L., Diner in Austin, TX</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactMetrics;
