
"use client";

import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import LiquidGauge from 'react-liquid-gauge';
import { useInView } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AnimatedNumber = ({ n, precision = 0 }: { n: number; precision?: number }) => {
  const { number } = useSpring({
    from: { number: 0 },
    to: n,
    delay: 200,
    config: { mass: 1, tension: 20, friction: 14 },
  });
  
  if (!number) return null;

  return <animated.span>{number.to((val) => val.toFixed(precision))}</animated.span>;
};

const CounterStats = ({ inView }: { inView: boolean }) => (
  <div className="grid grid-cols-2 gap-4 text-center">
    <Card className="bg-gray-900/75 border-gray-700/50">
      <CardHeader className="p-4">
        <CardTitle className="text-3xl lg:text-4xl font-bold font-heading text-off-white">
          {inView ? <AnimatedNumber n={2.2} precision={1} /> : '0.0'}B
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-slate-300 text-xs">Global vision impairment</p>
        <p className="text-xs text-slate-500 mt-1">(WHO)</p>
      </CardContent>
    </Card>
    <Card className="bg-gray-900/75 border-gray-700/50">
      <CardHeader className="p-4">
        <CardTitle className="text-3xl lg:text-4xl font-bold font-heading text-off-white">
          {inView ? <AnimatedNumber n={7} precision={0} /> : '0'}M
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-slate-300 text-xs">Americans with vision loss</p>
        <p className="text-xs text-slate-500 mt-1">(CDC)</p>
      </CardContent>
    </Card>
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
    <Card className="bg-gray-900/75 border-gray-700/50 text-center">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Menu Reliance</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
         <div
            style={{ width: '120px', height: '120px' }}
            className="mx-auto"
            role="img"
            aria-label="90 percent of guests need help reading menus"
            aria-valuenow={90}
          >
            <LiquidGauge
              value={value}
              width={120}
              height={120}
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
                  if (props === null) return null;
                  const displayValue = Math.round(props.value);
                  return <tspan className="font-bold">{`${displayValue}%`}</tspan>;
              }}
            />
          </div>
        <p className="text-slate-300 text-xs mt-2">Guests who need help reading menus</p>
        <p className="text-xs text-slate-500 mt-1">(BrailleWorks)</p>
      </CardContent>
    </Card>
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
    <Card className="bg-gray-900/75 border-gray-700/50">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg text-center">Typical Diner Autonomy</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex w-full h-8 rounded-md overflow-hidden bg-gray-700" role="img" aria-label="Bar chart showing diner autonomy. Initially 100% heavy reliance, which morps to 45% heavy reliance, 45% some help, and 10% full independence.">
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
         <div className="flex flex-wrap justify-between mt-2 text-xs text-slate-400 px-1 gap-2">
            <div className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-blue-600 mr-1.5"></span>Reliance</div>
            <div className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 mr-1.5"></span>Assistance</div>
            <div className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-blue-400 mr-1.5"></span>Independence</div>
        </div>
      </CardContent>
    </Card>
  );
};

export const ImpactStats = () => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <div ref={ref} className="h-full flex flex-col justify-around space-y-4">
            <CounterStats inView={isInView} />
            <RelianceGauge inView={isInView} />
            <MorphingBar inView={isInView} />
        </div>
    );
};
