
import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

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
            <h4 className="text-4xl font-heading text-dark-text font-bold mb-4">The State of Accessibility</h4>
            <div className="w-16 h-1 bg-brand-terracotta mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
            <div className="order-2 lg:order-1 lg:col-span-2">
              <a href="/accessibility_report.pdf" target="_blank" rel="noopener noreferrer" className="block group">
                <div className="relative w-full min-h-[400px] lg:min-h-[450px] bg-white rounded-lg shadow-md border border-slate-200 p-8 flex flex-col justify-center items-center text-center transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                  <FileText className="w-16 h-16 text-slate-300 mb-6" />
                  <h3 className="text-xl font-bold text-brand-navy mb-2">Local Restaurant Report</h3>
                  <p className="text-dark-text/70 mb-4">Click to view the full PDF report in a new tab.</p>
                  <p className="text-xs text-dark-text/50">
                    (Upload your PDF and an optional cover image to the project, then update the file paths here!)
                  </p>
                </div>
              </a>
            </div>
            
            <div className="space-y-8 order-1 lg:order-2 lg:col-span-3">
                <p className="text-xl text-dark-text leading-relaxed">
                  Our recent survey of 212 local restaurants revealed a significant accessibility gap: <strong className="text-brand-terracotta font-bold underline">none</strong> offered Braille menus.
                </p>
                
                <div className="space-y-8">
                    <div className="relative">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-lg font-medium text-dark-text">Restaurants with Braille Menus</span>
                            <span className="text-3xl font-heading font-bold text-brand-navy">0%</span>
                        </div>
                        <div className="w-full bg-subtle-gray rounded-full h-2">
                            <motion.div 
                              className="bg-brand-navy h-2 rounded-full" 
                              initial={{ width: 0 }} 
                              whileInView={{ width: "0%" }} 
                              viewport={{ once: true }} 
                              transition={{ duration: 1.5, delay: 0.5 }}
                            ></motion.div>
                        </div>
                    </div>
                    
                    <div className="relative">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-lg font-medium text-dark-text">Opportunity for Inclusive Dining</span>
                            <span className="text-3xl font-heading font-bold text-brand-terracotta">100%</span>
                        </div>
                        <div className="w-full bg-subtle-gray rounded-full h-2">
                            <motion.div 
                              className="bg-brand-terracotta h-2 rounded-full" 
                              initial={{ width: 0 }} 
                              whileInView={{ width: "100%" }} 
                              viewport={{ once: true }} 
                              transition={{ duration: 1.5, delay: 0.7 }}
                            ></motion.div>
                        </div>
                    </div>
                </div>

                <p className="text-xl text-dark-text leading-relaxed font-semibold pt-4">
                  Here's how we're fixing that...
                </p>
            </div>
        </div>
      </div>
    </motion.section>
  );
};

export default CostOfInaccessibility;
