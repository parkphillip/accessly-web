import React, { useState, useEffect, useMemo } from 'react';
import { translateToBraille } from '../utils/brailleUtils';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className }) => {
  const [isBraille, setIsBraille] = useState(false);
  const [displayedText, setDisplayedText] = useState(text);
  const brailleText = useMemo(() => translateToBraille(text), [text]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsBraille(prev => !prev);
    }, 5000); // Toggles between text and braille every 5 seconds
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const targetText = isBraille ? brailleText : text;
    let i = 0;
    const interval = setInterval(() => {
      if (i >= text.length) {
        clearInterval(interval);
        return;
      }
      setDisplayedText(current => targetText.substring(0, i + 1) + text.substring(i + 1));
      i++;
    }, 50); // Speed of character reveal

    return () => clearInterval(interval);
  }, [isBraille, text, brailleText]);

  return <span className={className}>{displayedText}</span>;
};

export default AnimatedText;
