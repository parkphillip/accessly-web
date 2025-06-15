
"use client";

import React, { useEffect } from 'react';
import { useInView, motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Eye, Users, Accessibility } from 'lucide-react';

const AnimatedNumber = ({ n, precision = 0 }: { n: number; precision?: number }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => latest.toFixed(precision));

  useEffect(() => {
    const controls = animate(count, n, {
      duration: 2.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
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
            description: "people globally have vision impairments",
            icon: Eye,
            color: "text-brand-navy"
        },
        {
            value: 90,
            precision: 0,
            suffix: '%',
            description: "need assistance reading menus while dining",
            icon: Users,
            color: "text-brand-terracotta"
        },
        {
            value: 10,
            precision: 0,
            suffix: '%',
            description: "experience full independence while dining",
            icon: Accessibility,
            color: "text-brand-navy"
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
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
            }
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
            }
        }
    };

    return (
        <div ref={ref} className="space-y-32">
            {/* Flowing stats layout */}
            <motion.div 
                className="space-y-16"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        variants={fadeInVariants}
                        className="text-center max-w-3xl mx-auto"
                    >
                        {/* Icon and animated number */}
                        <div className="flex items-center justify-center gap-6 mb-4">
                            <stat.icon className={`w-12 h-12 ${stat.color}`} />
                            <div className="text-7xl lg:text-8xl font-heading font-bold text-dark-text">
                                {isInView ? <AnimatedNumber n={stat.value} precision={stat.precision} /> : '0'}
                                <span className={stat.color}>{stat.suffix}</span>
                            </div>
                        </div>
                        
                        {/* Description */}
                        <p className="text-xl text-medium-text leading-relaxed">
                            {stat.description}
                        </p>
                        
                        {/* Subtle divider for non-last items */}
                        {index < stats.length - 1 && (
                            <div className="w-24 h-px bg-subtle-gray mx-auto mt-12"></div>
                        )}
                    </motion.div>
                ))}
            </motion.div>
            
            {/* Cost of Inaccessibility with uploaded braille image */}
            <motion.div 
                className="mt-32"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <div className="text-center mb-16">
                    <h4 className="text-4xl font-heading text-dark-text font-bold mb-4">The Cost of Inaccessibility</h4>
                    <div className="w-16 h-1 bg-brand-terracotta mx-auto rounded-full"></div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
                    {/* Braille image section */}
                    <div className="relative order-2 lg:order-1">
                        <img 
                            src="/lovable-uploads/c7975745-76c2-4e5f-bc18-09cedfa14dfb.png" 
                            alt="Hands reading braille text, representing accessible communication and independence" 
                            className="rounded-2xl shadow-medium w-full object-cover aspect-[4/3]"
                        />
                    </div>
                    
                    {/* Content section with progress visualization */}
                    <div className="space-y-8 order-1 lg:order-2">
                        <p className="text-xl text-dark-text leading-relaxed">
                            Without accessible menus, the dining experience becomes fundamentally different—creating reliance and turning simple pleasure into challenge.
                        </p>
                        
                        {/* Minimalist progress bars */}
                        <div className="space-y-8">
                            <div className="relative">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-lg font-medium text-dark-text">Dine independently</span>
                                    <span className="text-3xl font-heading font-bold text-brand-navy">10%</span>
                                </div>
                                <div className="w-full bg-subtle-gray rounded-full h-2">
                                    <motion.div 
                                        className="bg-brand-navy h-2 rounded-full"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: "10%" }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5, delay: 0.5 }}
                                    ></motion.div>
                                </div>
                            </div>
                            
                            <div className="relative">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-lg font-medium text-dark-text">Require assistance</span>
                                    <span className="text-3xl font-heading font-bold text-brand-terracotta">90%</span>
                                </div>
                                <div className="w-full bg-subtle-gray rounded-full h-2">
                                    <motion.div 
                                        className="bg-brand-terracotta h-2 rounded-full"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: "90%" }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5, delay: 0.7 }}
                                    ></motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
