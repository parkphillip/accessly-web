
import React from 'react';

interface BrailleCharProps {
  braille: string;
  className?: string;
  animate?: boolean;
}

const dotStyle: React.CSSProperties = {
  display: 'inline-block',
  width: 16,
  height: 29,
  fontSize: 28,
  letterSpacing: '2px',
  lineHeight: '1',
  fontFamily: '"JetBrains Mono", monospace',
  color: '#2c5282',
  background: 'transparent',
  verticalAlign: 'middle',
  userSelect: 'none',
  margin: '0 6px',
  filter: 'none'
};

const BrailleChar: React.FC<BrailleCharProps> = ({ braille, className, animate }) => {
  return (
    <span
      className={`braille-char ${className ?? ''}`}
      style={{
        ...dotStyle,
        opacity: animate === false ? 0.7 : 1,
        transition: animate ? 'filter 0.18s, opacity 0.22s, color 0.22s' : undefined,
      }}>
      {braille}
    </span>
  );
};

export default BrailleChar;
