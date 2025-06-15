
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const PartnerCTA = () => {
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
      className="max-w-4xl mx-auto py-32 text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInVariants}
    >
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

export default PartnerCTA;
