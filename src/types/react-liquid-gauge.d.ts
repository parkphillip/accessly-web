
declare module 'react-liquid-gauge' {
  import * as React from 'react';

  export interface LiquidGaugeProps {
    value: number;
    width?: number;
    height?: number;
    min?: number;
    max?: number;
    circleThickness?: number;
    circleFillGap?: number;
    circleColor?: string;
    waveHeight?: number;
    waveCount?: number;
    waveRise?: boolean;
    waveRiseTime?: number;
    waveRiseAt?: number;
    waveAnimate?: boolean;
    waveAnimateTime?: number;
    waveHeightScaling?: boolean;
    waveOffset?: number;
    textRenderer?: (props: { value: number; width: number; height: number; textSize: number }) => React.ReactNode;
    textSize?: number;
    valueCountUp?: boolean;
    riseAnimation?: boolean;
    riseAnimationTime?: number;
    riseAnimationAt?: number;
    innerRadius?: number;
    outerRadius?: number;
    margin?: number;
    waveFrequency?: number;
    waveAmplitude?: number;
    gradient?: boolean;
    gradientStops?: Array<{ key: string; stopColor: string; stopOpacity: number }>;
    circleStyle?: React.CSSProperties;
    waveStyle?: React.CSSProperties;
    textStyle?: React.CSSProperties;
    waveTextStyle?: React.CSSProperties;
    id?: string;
  }

  const LiquidGauge: React.FC<LiquidGaugeProps>;
  export default LiquidGauge;
}
