
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { translateToBraille } from '../utils/brailleUtils';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className }) => {
  const [isBraille, setIsBraille] = useState(false);
  const brailleText = useMemo(() => translateToBraille(text), [text]);
  const [displayedText, setDisplayedText] = useState(text);
  const isInitialRender = useRef(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsBraille(prev => !prev);
    }, 5000); // Toggles between text and braille every 5 seconds
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Don't run the animation on the initial render.
    // The first animation will be from text to braille after the first interval.
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    const sourceText = isBraille ? text : brailleText;
    const targetText = isBraille ? brailleText : text;

    let i = 0;
    const interval = setInterval(() => {
      if (i > text.length) {
        clearInterval(interval);
        setDisplayedText(targetText); // Ensure final state is perfect
        return;
      }
      
      const morphedPart = targetText.substring(0, i);
      const originalPart = sourceText.substring(i);
      setDisplayedText(morphedPart + originalPart);
      
      i++;
    }, 80); // Speed of character "decode"

    return () => clearInterval(interval);
  }, [isBraille, text, brailleText]);

  return <span className={className}>{displayedText}</span>;
};

export default AnimatedText;
