
"use client";

import React, { useEffect } from 'react';
import { useInView, motion, useMotionValue, useTransform, animate } from 'framer-motion';

const AnimatedNumber = ({ n, precision = 0 }: { n: number; precision?: number }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => latest.toFixed(precision));

  useEffect(() => {
    const controls = animate(count, n, {
      duration: 2.5,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [count, n]);

  return <motion.span>{rounded}</motion.span>;
};

export const ImpactStats = () => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const stats = [
        {
            value: 2.2,
            precision: 1,
            suffix: 'B',
            description: "people globally have unaddressed vision impairments",
            source: "WHO"
        },
        {
            value: 90,
            precision: 0,
            suffix: '%',
            description: "of restaurant guests with vision loss need assistance reading menus",
            source: "BrailleWorks"
        },
        {
            value: 7,
            precision: 0,
            suffix: 'M',
            description: "Americans report significant vision loss impacting daily activities",
            source: "CDC"
        }
    ];
    
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
        <div ref={ref} className="space-y-16">
            {/* Flowing stats layout */}
            <div className="space-y-12">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        variants={fadeInVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        transition={{ delay: index * 0.3 }}
                        className="text-center max-w-2xl mx-auto"
                    >
                        <div className="text-7xl lg:text-8xl font-heading font-bold text-off-white mb-2">
                            {isInView ? <AnimatedNumber n={stat.value} precision={stat.precision} /> : '0'}
                            <span className="text-blue-400">{stat.suffix}</span>
                        </div>
                        <p className="text-xl text-slate-300 leading-relaxed">
                            {stat.description}
                        </p>
                        <p className="text-sm text-off-white/60 mt-2">({stat.source})</p>
                    </motion.div>
                ))}
            </div>
            
            {/* Cost of Inaccessibility with integrated layout */}
            <motion.div 
                className="mt-24"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <div className="text-center mb-16">
                    <h4 className="text-4xl font-heading text-off-white font-bold mb-4">The Cost of Inaccessibility</h4>
                    <div className="w-16 h-1 bg-blue-400 mx-auto rounded-full"></div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Image section */}
                    <div className="relative">
                        <img 
                            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80&auto=format&fit=crop" 
                            alt="Person using technology, representing digital access and independence" 
                            className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                    </div>
                    
                    {/* Content section */}
                    <div className="space-y-8">
                        <p className="text-xl text-slate-200 leading-relaxed">
                            Without accessible menus, the dining experience becomes fundamentally different—creating reliance and turning simple pleasure into challenge.
                        </p>
                        
                        <div className="space-y-6">
                            <div className="border-l-4 border-blue-400 pl-6">
                                <div className="text-5xl font-heading font-bold text-off-white mb-2">10%</div>
                                <p className="text-lg text-slate-300">experience full independence while dining</p>
                            </div>
                            
                            <div className="border-l-4 border-brand-terracotta pl-6">
                                <div className="text-5xl font-heading font-bold text-off-white mb-2">90%</div>
                                <p className="text-lg text-slate-300">rely heavily on others or require staff assistance</p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
