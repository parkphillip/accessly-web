
import React from 'react';
import ProcessTimeline from './ProcessTimeline';
import { motion } from 'framer-motion';

const ProcessSection = () => {
  return <motion.section id="process" className="py-32 bg-white" initial={{
    opacity: 0
  }} whileInView={{
    opacity: 1
  }} viewport={{
    once: true,
    amount: 0.2
  }} transition={{
    duration: 0.5
  }}>
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-heading font-bold text-dark-text mb-6 leading-tight">Our Simple Process</h2>
          <p className="text-xl text-medium-text max-w-3xl mx-auto leading-relaxed">
            From request to delivery, we've streamlined everything to make
            getting braille menus effortless and completely free for your
            restaurant.
          </p>
        </div>
        <ProcessTimeline />
      </div>
    </motion.section>;
};

export default ProcessSection;
