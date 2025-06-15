
import React from 'react';
import { motion } from 'framer-motion';

const CostOfInaccessibility = () => {
  return (
    <motion.section 
      id="cost" 
      className="pt-24 pb-32 bg-slate-50"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
            <h4 className="text-4xl font-heading text-dark-text font-bold mb-4">The Cost of Inaccessibility</h4>
            <div className="w-16 h-1 bg-brand-terracotta mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <motion.div 
              className="relative order-2 lg:order-1 flex justify-center items-center group lg:col-span-2"
            >
                <div className="absolute bg-brand-navy/5 w-[450px] h-[450px] rounded-full blur-3xl transition-all duration-500 group-hover:bg-brand-navy/10"></div>
                <img 
                  src="/lovable-uploads/c7975745-76c2-4e5f-bc18-09cedfa14dfb.png" 
                  alt="Hands reading braille text, representing accessible communication and independence" 
                  className="relative rounded-full shadow-strong w-[400px] h-[400px] object-cover transition-transform duration-500 group-hover:scale-105" 
                />
            </motion.div>
            
            <div className="space-y-8 order-1 lg:order-2 lg:col-span-3">
                <p className="text-xl text-dark-text leading-relaxed">
                    Without accessible menus, the dining experience becomes fundamentally different—creating reliance and turning simple pleasure into challenge.
                </p>
                
                <div className="space-y-8">
                    <div className="relative">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-lg font-medium text-dark-text">Dine independently</span>
                            <span className="text-3xl font-heading font-bold text-brand-navy">10%</span>
                        </div>
                        <div className="w-full bg-subtle-gray rounded-full h-2">
                            <motion.div className="bg-brand-navy h-2 rounded-full" initial={{
            width: 0
          }} whileInView={{
            width: "10%"
          }} viewport={{
            once: true
          }} transition={{
            duration: 1.5,
            delay: 0.5
          }}></motion.div>
                        </div>
                    </div>
                    
                    <div className="relative">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-lg font-medium text-dark-text">Require assistance</span>
                            <span className="text-3xl font-heading font-bold text-brand-terracotta">90%</span>
                        </div>
                        <div className="w-full bg-subtle-gray rounded-full h-2">
                            <motion.div className="bg-brand-terracotta h-2 rounded-full" initial={{
            width: 0
          }} whileInView={{
            width: "90%"
          }} viewport={{
            once: true
          }} transition={{
            duration: 1.5,
            delay: 0.7
          }}></motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </motion.section>
  );
};

export default CostOfInaccessibility;
