
import React from 'react';
import { motion } from 'framer-motion';

const processSteps = [
  {
    step: 1,
    title: 'Request Your Menus',
    description:
      'Start by filling out our simple online form. Tell us about your restaurant and upload your current menu file. It only takes a few minutes.',
  },
  {
    step: 2,
    title: 'We Transcribe & Design',
    description:
      'Our expert team carefully transcribes your menu into Unified English Braille (UEB). We format it for clarity and ease of use, ensuring a high-quality reading experience.',
  },
  {
    step: 3,
    title: 'Printing & Quality Check',
    description:
      'Using state-of-the-art embossers, we print your menus on durable, water-resistant paper. Each menu undergoes a rigorous quality check to ensure accuracy and legibility.',
  },
  {
    step: 4,
    title: 'Shipped Free of Charge',
    description:
      'Once ready, we ship the braille menus directly to your restaurant at no cost to you. They arrive ready to be placed on your tables, improving accessibility immediately.',
  },
];

const ProcessTimeline = () => {
  return (
    <div className="relative">
      {/* The timeline line */}
      <div className="absolute top-0 left-4 h-full w-0.5 bg-gray-200 -translate-x-1/2"></div>
      
      <motion.div
        className="space-y-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        transition={{ staggerChildren: 0.4 }}
      >
        {processSteps.map((step, index) => (
          <motion.div
            key={index}
            className="flex gap-8 items-start"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
          >
            {/* The dot */}
            <div className="flex-shrink-0 z-10">
              <div className="w-8 h-8 rounded-full bg-brand-navy flex items-center justify-center ring-8 ring-light-bg">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
            
            {/* The content */}
            <div>
              <span className="text-sm font-bold text-brand-terracotta uppercase tracking-wider">Step {step.step}</span>
              <h3 className="text-3xl font-heading font-bold text-dark-text mt-1 mb-3">{step.title}</h3>
              <p className="text-lg text-medium-text leading-relaxed">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ProcessTimeline;
