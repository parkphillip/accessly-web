
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ImpactStats } from './ImpactStats';

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};
const ImpactMetrics = () => {
  return <section id="impact" className="py-24 bg-brand-navy">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div className="text-center mb-20" initial="hidden" whileInView="visible" viewport={{
        once: true,
        amount: 0.3
      }} variants={itemVariants}>
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-off-white mb-4">
            Dining Through a Different Lens
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            For millions with vision impairments, dining out presents hidden barriers. We're focused on restoring dignity and independence.
          </p>
        </motion.div>

        <div className="mb-24">
            <ImpactStats />
        </div>

        <motion.div className="bg-black/20 border border-white/10 text-off-white p-12 rounded-lg" initial="hidden" whileInView="visible" viewport={{
        once: true,
        amount: 0.5
      }} variants={itemVariants}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <h3 className="text-3xl font-heading font-bold mb-4 headline-underline after:bg-blue-400">
                This is Where We Come In
              </h3>
              <p className="text-lg text-off-white/80 leading-relaxed">
                Accessly provides free, high-quality braille menus to restaurants, no questions asked. We believe that access shouldn't be an afterthought. It’s a fundamental part of hospitality that empowers independence, ensures privacy, and fosters a more inclusive dining experience for everyone.
              </p>
            </div>
            
            <div className="bg-black/20 p-6 rounded-lg border border-off-white/20">
              <blockquote className="text-xl font-heading italic text-off-white leading-relaxed">
                "For the first time, I felt like just another customer, not a burden. That feeling is priceless."
              </blockquote>
              <p className="font-sans text-sm text-off-white/70 mt-4">— Jessica L., Diner in Austin, TX</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>;
};
export default ImpactMetrics;
