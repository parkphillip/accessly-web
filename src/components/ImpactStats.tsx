"use client";

import React, { useEffect } from 'react';
import { useInView, motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Eye, UsersRound, Accessibility } from 'lucide-react';

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
            description: "with vision impairments globally",
            icon: Eye,
            color: "text-brand-navy"
        },
        {
            value: 90,
            precision: 0,
            suffix: '%',
            description: "need help reading menus",
            icon: UsersRound,
            color: "text-brand-navy"
        },
        {
            value: 10,
            precision: 0,
            suffix: '%',
            description: "dine with full independence",
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
        <motion.div 
            ref={ref}
            className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-16"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            {stats.map((stat, index) => (
                <motion.div
                    key={index}
                    variants={fadeInVariants}
                    className="text-center"
                >
                    <div className="flex items-center justify-center gap-6 mb-4">
                        <stat.icon className={`w-12 h-12 ${stat.color}`} />
                        <div className="text-7xl lg:text-8xl font-heading font-bold text-dark-text">
                            {isInView ? <AnimatedNumber n={stat.value} precision={stat.precision} /> : '0'}
                            <span className={stat.color}>{stat.suffix}</span>
                        </div>
                    </div>
                    
                    <p className="text-xl text-medium-text leading-relaxed">
                        {stat.description}
                    </p>
                </motion.div>
            ))}
        </motion.div>
    );
};
