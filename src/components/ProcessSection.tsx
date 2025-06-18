import React from 'react';
import ProcessTimeline from './ProcessTimeline';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const ProcessSection = () => {
  return <motion.section id="process" className="py-32 bg-slate-50" initial={{
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
          <h2 className="text-5xl lg:text-6xl font-heading font-bold text-dark-text mb-6 leading-tight">Our Mission is Simple</h2>
          <p className="text-xl text-medium-text max-w-3xl mx-auto leading-relaxed">Our first initiative: helping every restaurant offer braille menus, simply and affordably.</p>
        </div>
        <ProcessTimeline />
        <div className="text-center mt-20">
            <Link to="/partner">
              <Button size="lg" className="group">
                Partner With Us
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
        </div>
      </div>
    </motion.section>;
};
export default ProcessSection;
