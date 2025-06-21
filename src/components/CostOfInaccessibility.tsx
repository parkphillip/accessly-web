import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const CostOfInaccessibility = () => {
  return (
    <motion.section 
      id="cost" 
      className="py-20 lg:py-32 bg-white"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-4xl lg:text-5xl font-heading text-dark-text font-bold mb-4">The State of Accessibility</h2>
            <div className="w-16 h-1 bg-brand-terracotta mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-stretch">
            <div className="order-2 lg:order-1 lg:col-span-2">
              <a href="/accessibility_report.pdf" target="_blank" rel="noopener noreferrer" className="block group h-full">
                <Card className="overflow-hidden transition-all duration-500 ease-in-out group-hover:shadow-xl border-2 border-transparent h-full flex flex-col rounded-2xl">
                  <CardContent className="p-0 flex-grow">
                    <div className="relative h-full">
                      <img 
                        src="/lovable-uploads/c7975745-76c2-4e5f-bc18-09cedfa14dfb.png" 
                        alt="Braille document representing an accessibility report" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-6 w-full">
                        <h3 className="text-2xl font-bold text-white mb-2 font-heading">Local Restaurant Report</h3>
                        <p className="text-white/90 flex items-center group-hover:underline">
                          View the full report <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </a>
            </div>
            
            <div className="space-y-8 order-1 lg:order-2 lg:col-span-3 text-center lg:text-left">
                <p className="text-xl text-dark-text leading-relaxed">
                  We surveyed 230 local restaurants in Southern California. Only 2 had Braille menus—and both were outdated. That's a gap we're here to close.
                </p>
                
                <div className="space-y-6 pt-4">
                    <div className="relative">
                        <div className="flex justify-between items-baseline mb-1">
                            <span className="text-lg font-medium text-dark-text">Restaurants with Braille Menus</span>
                            <span className="text-4xl font-heading font-bold text-brand-navy">0.9%</span>
                        </div>
                        <div className="w-full bg-subtle-gray rounded-full h-2.5">
                            <motion.div 
                              className="bg-brand-navy h-2.5 rounded-full" 
                              initial={{ width: '0%' }} 
                              whileInView={{ width: "0.9%" }} 
                              viewport={{ once: true }} 
                              transition={{ duration: 1.5, delay: 0.5 }}
                            ></motion.div>
                        </div>
                    </div>
                    
                    <div className="relative">
                        <div className="flex justify-between items-baseline mb-1">
                            <span className="text-lg font-medium text-dark-text">Restaurants with Audio Menus for Blind Diners</span>
                            <span className="text-4xl font-heading font-bold text-brand-terracotta">3.0%</span>
                        </div>
                        <div className="w-full bg-subtle-gray rounded-full h-2.5">
                            <motion.div 
                              className="bg-brand-terracotta h-2.5 rounded-full" 
                              initial={{ width: '0%' }} 
                              whileInView={{ width: "3.0%" }} 
                              viewport={{ once: true }} 
                              transition={{ duration: 1.5, delay: 0.7 }}
                            ></motion.div>
                        </div>
                    </div>
                </div>

                <p className="text-xl text-medium-text leading-relaxed font-medium pt-6 border-t border-light-gray mt-8 hidden sm:block">
                  These numbers reflect barriers. We're working to eliminate them.
                </p>
            </div>
        </div>
      </div>
    </motion.section>
  );
};

export default CostOfInaccessibility;
