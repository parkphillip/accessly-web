
"use client";

import React, { useEffect } from 'react';
import { useInView, motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Eye, Users, Accessibility } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
            icon: <Eye className="w-10 h-10 text-blue-400" />,
            value: 2.2,
            precision: 1,
            suffix: 'B',
            description: "People globally with a vision impairment that is unaddressed.",
            source: "WHO"
        },
        {
            icon: <Users className="w-10 h-10 text-blue-400" />,
            value: 90,
            precision: 0,
            suffix: '%',
            description: "Of restaurant guests with vision loss need assistance to read the menu.",
            source: "BrailleWorks"
        },
        {
            icon: <Accessibility className="w-10 h-10 text-blue-400" />,
            value: 7,
            precision: 0,
            suffix: 'M',
            description: "Americans report significant vision loss, impacting daily activities.",
            source: "CDC"
        }
    ];
    
    const cardVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.2,
                duration: 0.7,
                ease: "easeOut",
            },
        }),
    };

    return (
        <div ref={ref}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        custom={index}
                        variants={cardVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="flex"
                    >
                        <Card className="bg-black/20 border-white/10 h-full w-full flex flex-col text-center hover:bg-black/40 transition-colors duration-300 rounded-lg">
                            <CardHeader className="items-center pt-8">
                                {stat.icon}
                                <CardTitle className="text-5xl lg:text-6xl font-bold font-heading text-off-white pt-4">
                                    {isInView ? <AnimatedNumber n={stat.value} precision={stat.precision} /> : '0'}
                                    <span className="text-blue-400">{stat.suffix}</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow flex flex-col justify-center p-6">
                                <p className="text-slate-300 leading-relaxed">
                                    {stat.description} <span className="text-xs text-off-white/70">({stat.source})</span>
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
            
            <motion.div 
                className="mt-24 border-t border-white/20 pt-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.6 }}
            >
                <div className="text-center mb-12">
                  <h4 className="text-3xl font-heading text-off-white font-semibold mb-4 headline-underline after:bg-blue-400">The Cost of Inaccessibility</h4>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="flex justify-center">
                        <img 
                            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80&auto=format&fit=crop" 
                            alt="Person using a laptop, representing digital access and independence" 
                            className="rounded-lg shadow-xl w-full max-w-md object-cover aspect-square"
                        />
                    </div>
                    <div className="text-left space-y-8">
                        <p className="text-slate-200 text-lg leading-relaxed">
                            Without accessible menus, the dining experience is fundamentally different. This lack of autonomy creates reliance on others, turning a simple pleasure into a challenge.
                        </p>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4 p-4 bg-black/20 rounded-lg border border-white/10">
                                <div className="text-blue-400 font-bold text-4xl shrink-0">10%</div>
                                <p className="text-slate-300 mt-1">Only 10% of diners with vision impairments experience full independence.</p>
                            </div>
                            <div className="flex items-start gap-4 p-4 bg-black/20 rounded-lg border border-white/10">
                                <div className="text-blue-400 font-bold text-4xl shrink-0">90%</div>
                                <p className="text-slate-300 mt-1">The remaining 90% face heavy reliance on others or require direct assistance from staff.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
