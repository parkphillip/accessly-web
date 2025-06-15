
"use client";

import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import LiquidGauge from 'react-liquid-gauge';
import { useInView } from 'framer-motion';

const AnimatedNumber = ({ n, precision = 0 }: { n: number; precision?: number }) => {
  const [props] = useSpring(() => ({
    from: { number: 0 },
    to: { number: n },
    delay: 200,
    config: { mass: 1, tension: 20, friction: 14 },
  }), [n]);
  
  if (!props?.number) return null;

  return <animated.span>{props.number.to((val) => val.toFixed(precision))}</animated.span>;
};

const CounterStats = ({ inView }: { inView: boolean }) => (
  <div className="flex justify-around text-center mb-12">
    <div className="text-off-white" aria-label="2.2 Billion Global vision impairment">
      <p className="text-4xl lg:text-5xl font-bold font-heading text-off-white">
        {inView ? <AnimatedNumber n={2.2} precision={1} /> : '0.0'}B
      </p>
      <p className="text-slate-300 mt-2 text-sm">Global vision impairment</p>
      <p className="text-xs text-slate-500 mt-1">(WHO, 2019)</p>
    </div>
    <div className="text-off-white" aria-label="7 Million Americans with vision loss">
      <p className="text-4xl lg:text-5xl font-bold font-heading text-off-white">
        {inView ? <AnimatedNumber n={7} precision={0} /> : '0'}M
      </p>
      <p className="text-slate-300 mt-2 text-sm">Americans with vision loss</p>
      <p className="text-xs text-slate-500 mt-1">(CDC VEHSS, 2017)</p>
    </div>
  </div>
);

const RelianceGauge = ({ inView }: { inView: boolean }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setValue(90), 200);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  return (
    <div className="text-center mb-12">
      <div
        style={{ width: '150px', height: '150px' }}
        className="mx-auto"
        role="img"
        aria-label="90 percent of guests need help reading menus"
        aria-valuenow={90}
      >
        <LiquidGauge
          value={value}
          width={150}
          height={150}
          riseAnimation={true}
          waveAnimate={true}
          riseAnimationTime={2000}
          waveFrequency={2}
          waveAmplitude={1}
          circleStyle={{ fill: '#4b5563' }}
          waveStyle={{ fill: '#3b82f6' }}
          textStyle={{ fill: '#3b82f6' }}
          waveTextStyle={{ fill: '#fff' }}
          textRenderer={(props) => {
              const displayValue = Math.round(props.value);
              return <tspan className="font-bold">{`${displayValue}%`}</tspan>;
          }}
        />
      </div>
      <p className="text-slate-300 mt-4">Guests who need help reading menus</p>
      <p className="text-xs text-slate-500 mt-1">(BrailleWorks survey, 2023)</p>
    </div>
  );
};

const MorphingBar = ({ inView }: { inView: boolean }) => {
  const [morphed, setMorphed] = useState(false);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setMorphed(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  const relianceSpring = useSpring({ width: morphed ? '45%' : '100%', config: { duration: 500 } });
  const assistanceSpring = useSpring({ width: morphed ? '45%' : '0%', config: { duration: 500 }, delay: 500 });
  const independenceSpring = useSpring({ width: morphed ? '10%' : '0%', config: { duration: 500 }, delay: 500 });

  return (
    <div className="w-full">
        <h3 className="text-lg font-bold text-off-white mb-2 text-center">Typical Diner Autonomy</h3>
        <div className="flex w-full h-10 rounded-lg overflow-hidden bg-gray-700" role="img" aria-label="Bar chart showing diner autonomy. Initially 100% heavy reliance, which morps to 45% heavy reliance, 45% some help, and 10% full independence.">
            <animated.div style={relianceSpring} className="bg-blue-600">
                 <span className="sr-only">Heavy reliance</span>
            </animated.div>
            <animated.div style={assistanceSpring} className="bg-blue-500">
                 <span className="sr-only">Some help</span>
            </animated.div>
             <animated.div style={independenceSpring} className="bg-blue-400">
                 <span className="sr-only">Full independence</span>
            </animated.div>
        </div>
         <div className="flex flex-wrap justify-between mt-2 text-xs text-slate-300 px-1 gap-2">
            <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-blue-600 mr-2"></span>Heavy Reliance</div>
            <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>Some Help</div>
            <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-blue-400 mr-2"></span>Independence</div>
        </div>
    </div>
  );
};

export const ImpactVisuals = () => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <div ref={ref} className="bg-gray-900/50 p-6 md:p-8 rounded-lg border border-gray-700/50 h-full flex flex-col justify-around">
            <CounterStats inView={isInView} />
            <RelianceGauge inView={isInView} />
            <MorphingBar inView={isInView} />
        </div>
    );
};
