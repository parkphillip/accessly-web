
"use client";

import React, { useEffect } from 'react';
import { useInView, motion, useMotionValue, useTransform, animate } from 'framer-motion';

const AnimatedNumber = ({ n, precision = 0 }: { n: number; precision?: number }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => latest.toFixed(precision));

  useEffect(() => {
    const controls = animate(count, n, {
      duration: 2,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [count, n]);

  return <motion.span>{rounded}</motion.span>;
};

export const ImpactStats = () => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <div ref={ref}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
                <div>
                    <p className="text-6xl lg:text-7xl font-bold font-heading text-off-white">
                        {isInView ? <AnimatedNumber n={2.2} precision={1} /> : '0.0'}<span className="text-blue-400">B</span>
                    </p>
                    <p className="mt-3 text-lg text-slate-300 leading-relaxed">
                        People globally live with a vision impairment that could have been prevented or has yet to be addressed. <span className="text-xs text-off-white/70">(WHO)</span>
                    </p>
                </div>
                <div>
                    <p className="text-6xl lg:text-7xl font-bold font-heading text-off-white">
                        {isInView ? <AnimatedNumber n={90} precision={0} /> : '0'}<span className="text-blue-400">%</span>
                    </p>
                    <p className="mt-3 text-lg text-slate-300 leading-relaxed">
                        Of restaurant guests with vision loss need assistance to read the menu, limiting their autonomy. <span className="text-xs text-off-white/70">(BrailleWorks)</span>
                    </p>
                </div>
                <div>
                    <p className="text-6xl lg:text-7xl font-bold font-heading text-off-white">
                        {isInView ? <AnimatedNumber n={7} precision={0} /> : '0'}<span className="text-blue-400">M</span>
                    </p>
                    <p className="mt-3 text-lg text-slate-300 leading-relaxed">
                        Americans report significant vision loss, impacting daily activities like dining out with friends and family. <span className="text-xs text-off-white/70">(CDC)</span>
                    </p>
                </div>
            </div>
            <div className="mt-20 text-center border-t border-white/20 pt-12">
                <h4 className="text-2xl font-heading text-off-white font-semibold mb-4">The Cost of Inaccessibility</h4>
                <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed">
                    Without accessible menus, only <span className="font-bold text-off-white">10%</span> of diners with vision impairments experience full independence. The rest face heavy reliance on others (<span className="font-bold text-off-white">45%</span>) or require direct assistance (<span className="font-bold text-off-white">45%</span>), turning a simple pleasure into a challenge.
                </p>
            </div>
        </div>
    );
};
