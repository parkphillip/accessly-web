import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { translateToBraille } from '../utils/brailleUtils';
import BrailleChar from './BrailleChar';

const BRAILLE_SCRAMBLE_CHARS = '⠁⠃⠉⠙⠑⠋⠛⠓⠊⠚⠅⠇⠍⠝⠕⠏⠟⠗⠎⠞⠥⠧⠺⠭⠽⠵';
const ENGLISH_SCRAMBLE_CHARS = 'abcdefghijklmnopqrstuvwxyz';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className }) => {
  const isMobile = useIsMobile();

  const brailleText = useMemo(() => {
    return text
      .split('\n')
      .map(line => translateToBraille(line))
      .join('\n');
  }, [text]);

  const [displayedText, setDisplayedText] = useState(brailleText);
  const [isBraille, setIsBraille] = useState(true);

  const animationIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const toggleIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isInitialMount = useRef(true);

  const widestText = useMemo(() => {
    return brailleText.length > text.length ? brailleText : text;
  }, [brailleText, text]);

  const targetText = isBraille ? brailleText : text;

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    const scrambleChars = isBraille ? BRAILLE_SCRAMBLE_CHARS : ENGLISH_SCRAMBLE_CHARS;
    if (animationIntervalRef.current) clearInterval(animationIntervalRef.current);

    let currentIndex = 0;
    let revealedText = '';
    let scrambleIteration = 0;
    const scramblePerChar = 3;
    const frameRate = 35;

    setDisplayedText('');

    animationIntervalRef.current = setInterval(() => {
      if (currentIndex >= targetText.length) {
        if (animationIntervalRef.current) clearInterval(animationIntervalRef.current);
        setDisplayedText(targetText);
        return;
      }
      if (scrambleIteration < scramblePerChar) {
        const randomChar = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        setDisplayedText(revealedText + randomChar);
        scrambleIteration++;
      } else {
        revealedText += targetText[currentIndex];
        currentIndex++;
        scrambleIteration = 0;
        setDisplayedText(revealedText);
      }
    }, frameRate);

    return () => {
      if (animationIntervalRef.current) clearInterval(animationIntervalRef.current);
    };
  }, [targetText, brailleText, text]);

  useEffect(() => {
    if (toggleIntervalRef.current) clearInterval(toggleIntervalRef.current);
    const initialDelay = setTimeout(() => {
      setIsBraille(false);
      toggleIntervalRef.current = setInterval(() => {
        setIsBraille(prev => !prev);
      }, 5000);
    }, 1000);

    return () => {
      if (toggleIntervalRef.current) clearInterval(toggleIntervalRef.current);
      if (animationIntervalRef.current) clearInterval(animationIntervalRef.current);
      clearTimeout(initialDelay);
    };
  }, []);

  const dynamicClassName = [
    className,
    'whitespace-pre-wrap',
    'transition-all duration-500',
    'animated-text-container',
    isMobile ? 'text-center' : '',
    isBraille ? 'font-mono' : '',
  ].filter(Boolean).join(' ');

  const renderTextWithBraille = (textToRender: string) => {
    return textToRender.split('\n').map((line, lineIndex) => (
      <span 
        key={lineIndex} 
        className="animated-text-line" 
        style={{
          display: 'inline',
          lineHeight: 'inherit',
          whiteSpace: 'pre',
          overflow: 'visible',
        }}
      >
        {[...line].map((char, j) =>
          char.charCodeAt(0) >= 0x2800 && char.charCodeAt(0) <= 0x28FF
            ? <BrailleChar key={`${j}-${char}`} braille={char} />
            : char
        )}
      </span>
    ));
  };

  const rootStyle: React.CSSProperties = {
    display: isMobile ? 'block' : 'inline-block',
    width: isMobile ? '100%' : 'auto',
    verticalAlign: 'baseline',
    position: 'relative',
    height: '1.1em',
    lineHeight: '1.1',
  };

  return (
    <span 
      className={dynamicClassName} 
      style={rootStyle}
    >
      <span style={{
        opacity: 0,
        pointerEvents: 'none',
        userSelect: 'none',
        display: 'inline-block',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        verticalAlign: 'baseline',
        lineHeight: '1.1',
      }}>
        {renderTextWithBraille(widestText)}
      </span>
      <span style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        userSelect: 'none',
        verticalAlign: 'baseline',
        lineHeight: '1.1',
      }}>
        {renderTextWithBraille(displayedText)}
      </span>
    </span>
  );
};

export default AnimatedText;
