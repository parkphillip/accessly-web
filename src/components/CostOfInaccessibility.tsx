
import React from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
            <h4 className="text-4xl font-heading text-dark-text font-bold mb-4">The Cost of Inaccessibility</h4>
            <div className="w-16 h-1 bg-brand-terracotta mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
            <div className="order-2 lg:order-1 lg:col-span-2">
              <Accordion type="single" collapsible className="w-full bg-white rounded-lg shadow-md border border-slate-200">
                <AccordionItem value="item-1" className="border-b-0">
                  <AccordionTrigger className="px-6 py-4 text-lg font-medium text-brand-navy hover:no-underline">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5" />
                      <span>View Full Accessibility Report</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="bg-slate-100 p-6 rounded-md text-center border border-slate-200">
                      <p className="text-dark-text/90 mb-2">
                        Ready to display your research?
                      </p>
                      <p className="text-sm text-dark-text/70">
                        Just upload your PDF to the project and let me know the file path. I'll embed it here for you.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            
            <div className="space-y-8 order-1 lg:order-2 lg:col-span-3">
                <p className="text-xl text-dark-text leading-relaxed">
                    Our latest research reveals significant barriers for individuals with disabilities, highlighting key areas for improvement in public and commercial spaces.
                </p>
                
                <div className="space-y-8">
                    <div className="relative">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-lg font-medium text-dark-text">Venues Meeting Accessibility Standards</span>
                            <span className="text-3xl font-heading font-bold text-brand-navy">25%</span>
                        </div>
                        <div className="w-full bg-subtle-gray rounded-full h-2">
                            <motion.div 
                              className="bg-brand-navy h-2 rounded-full" 
                              initial={{ width: 0 }} 
                              whileInView={{ width: "25%" }} 
                              viewport={{ once: true }} 
                              transition={{ duration: 1.5, delay: 0.5 }}
                            ></motion.div>
                        </div>
                    </div>
                    
                    <div className="relative">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-lg font-medium text-dark-text">Individuals Reporting Navigational Challenges</span>
                            <span className="text-3xl font-heading font-bold text-brand-terracotta">75%</span>
                        </div>
                        <div className="w-full bg-subtle-gray rounded-full h-2">
                            <motion.div 
                              className="bg-brand-terracotta h-2 rounded-full" 
                              initial={{ width: 0 }} 
                              whileInView={{ width: "75%" }} 
                              viewport={{ once: true }} 
                              transition={{ duration: 1.5, delay: 0.7 }}
                            ></motion.div>
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
