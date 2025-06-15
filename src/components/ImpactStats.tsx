
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

const CounterStats = ({ inView }: { inView: boolean }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-center sm:text-left">
    <div>
      <p className="text-6xl lg:text-7xl font-bold font-heading text-off-white">
        {inView ? <AnimatedNumber n={2.2} precision={1} /> : '0.0'}<span className="text-blue-400">B</span>
      </p>
      <p className="mt-2 text-slate-300">Global vision impairment <span className="text-xs text-slate-500">(WHO)</span></p>
    </div>
    <div>
      <p className="text-6xl lg:text-7xl font-bold font-heading text-off-white">
        {inView ? <AnimatedNumber n={7} precision={0} /> : '0'}<span className="text-blue-400">M</span>
      </p>
      <p className="mt-2 text-slate-300">Americans with vision loss <span className="text-xs text-slate-500">(CDC)</span></p>
    </div>
  </div>
);

const RelianceStats = ({ inView }: { inView: boolean }) => (
  <div className="text-center sm:text-left">
    <p className="text-6xl lg:text-7xl font-bold font-heading text-off-white">
      {inView ? <AnimatedNumber n={90} precision={0} /> : '0'}<span className="text-blue-400">%</span>
    </p>
    <p className="mt-2 text-slate-300">Guests who need help reading menus <span className="text-xs text-slate-500">(BrailleWorks)</span></p>
  </div>
);

const AutonomyStats = () => (
    <div className="text-center sm:text-left">
        <h4 className="text-2xl font-heading text-off-white font-semibold mb-3">Typical Diner Autonomy</h4>
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0 text-slate-300">
            <p><span className="font-bold text-off-white text-lg">45%</span> Heavy Reliance</p>
            <p><span className="font-bold text-off-white text-lg">45%</span> Required Assistance</p>
            <p><span className="font-bold text-off-white text-lg">10%</span> Full Independence</p>
        </div>
        <p className="text-xs text-slate-500 mt-2">Breakdown of diner experience without accessible menus.</p>
    </div>
);


export const ImpactStats = () => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <div ref={ref} className="h-full flex flex-col justify-center space-y-12">
            <CounterStats inView={isInView} />
            <RelianceStats inView={isInView} />
            <AutonomyStats />
        </div>
    );
};
