
import React from 'react';

interface BrailleCharProps {
  braille: string;
  className?: string;
}

// New styles for a cleaner, more 'tactile' look
const dotStyle: React.CSSProperties = {
  display: 'inline-block',
  fontFamily: '"JetBrains Mono", monospace',
  color: '#2c5282', // brand-navy
  fontWeight: 500,
  letterSpacing: '0.15em',
  fontSize: '1.75rem', // 28px
  lineHeight: '1',
  verticalAlign: 'middle',
  userSelect: 'none',
};

const BrailleChar: React.FC<BrailleCharProps> = ({ braille, className }) => {
  return (
    <span
      className={`braille-char ${className ?? ''}`}
      style={dotStyle}>
      {braille}
    </span>
  );
};

export default BrailleChar;
