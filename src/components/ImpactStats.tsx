
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
            source: "WHO",
            icon: Eye,
            color: "text-brand-navy"
        },
        {
            value: 90,
            precision: 0,
            suffix: '%',
            description: "need assistance reading menus while dining",
            source: "BrailleWorks",
            icon: Users,
            color: "text-brand-terracotta"
        },
        {
            value: 10,
            precision: 0,
            suffix: '%',
            description: "experience full independence while dining",
            source: "Accessibility Studies",
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
        <div ref={ref}>
            {/* Horizontal scrolling stats on mobile, grid on desktop */}
            <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-20"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        variants={fadeInVariants}
                        className="text-center group hover:scale-105 transition-transform duration-300"
                    >
                        {/* Icon */}
                        <div className="flex justify-center mb-4">
                            <stat.icon className={`w-8 h-8 ${stat.color}`} />
                        </div>
                        
                        {/* Animated Number */}
                        <div className="text-6xl lg:text-7xl font-heading font-bold text-dark-text mb-2">
                            {isInView ? <AnimatedNumber n={stat.value} precision={stat.precision} /> : '0'}
                            <span className={stat.color}>{stat.suffix}</span>
                        </div>
                        
                        {/* Description */}
                        <p className="text-lg text-medium-text leading-relaxed mb-2 max-w-xs mx-auto">
                            {stat.description}
                        </p>
                        
                        {/* Source */}
                        <p className="text-sm text-medium-text/70">({stat.source})</p>
                    </motion.div>
                ))}
            </motion.div>
            
            {/* Cost of Inaccessibility with minimalist progress visualization */}
            <motion.div 
                className="mt-24"
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
                    {/* Image section */}
                    <div className="relative order-2 lg:order-1">
                        <img 
                            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80&auto=format&fit=crop" 
                            alt="Person using technology, representing digital access and independence" 
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
