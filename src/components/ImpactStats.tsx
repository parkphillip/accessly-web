"use client";

import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useInView } from 'framer-motion';

const AnimatedNumber = ({ n, precision = 0 }: { n: number; precision?: number }) => {
  const springs = useSpring({
    from: { number: 0 },
    to: { number: n },
    delay: 200,
    config: { mass: 1, tension: 20, friction: 14 },
  });

  return <animated.span>{springs.number.to((val) => val.toFixed(precision))}</animated.span>;
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
                        People globally live with a vision impairment that could have been prevented or has yet to be addressed. <span className="text-xs text-slate-500">(WHO)</span>
                    </p>
                </div>
                <div>
                    <p className="text-6xl lg:text-7xl font-bold font-heading text-off-white">
                        {isInView ? <AnimatedNumber n={90} precision={0} /> : '0'}<span className="text-blue-400">%</span>
                    </p>
                    <p className="mt-3 text-lg text-slate-300 leading-relaxed">
                        Of restaurant guests with vision loss need assistance to read the menu, limiting their autonomy. <span className="text-xs text-slate-500">(BrailleWorks)</span>
                    </p>
                </div>
                <div>
                    <p className="text-6xl lg:text-7xl font-bold font-heading text-off-white">
                        {isInView ? <AnimatedNumber n={7} precision={0} /> : '0'}<span className="text-blue-400">M</span>
                    </p>
                    <p className="mt-3 text-lg text-slate-300 leading-relaxed">
                        Americans report significant vision loss, impacting daily activities like dining out with friends and family. <span className="text-xs text-slate-500">(CDC)</span>
                    </p>
                </div>
            </div>
            <div className="mt-20 text-center border-t border-gray-700/50 pt-12">
                <h4 className="text-2xl font-heading text-off-white font-semibold mb-4">The Cost of Inaccessibility</h4>
                <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed">
                    Without accessible menus, only <span className="font-bold text-off-white">10%</span> of diners with vision impairments experience full independence. The rest face heavy reliance on others (<span className="font-bold text-off-white">45%</span>) or require direct assistance (<span className="font-bold text-off-white">45%</span>), turning a simple pleasure into a challenge.
                </p>
            </div>
        </div>
    );
};
