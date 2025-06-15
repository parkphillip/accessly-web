import React, { useState, useEffect, useRef, useMemo } from 'react';
import { translateToBraille } from '../utils/brailleUtils';
import BrailleChar from './BrailleChar';

// Character sets for the scramble effect
const BRAILLE_SCRAMBLE_CHARS = '⠁⠃⠉⠙⠑⠋⠛⠓⠊⠚⠅⠇⠍⠝⠕⠏⠟⠗⠎⠞⠥⠧⠺⠭⠽⠵';
const ENGLISH_SCRAMBLE_CHARS = 'abcdefghijklmnopqrstuvwxyz';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className }) => {
  const [displayedText, setDisplayedText] = useState(text);
  const [isBraille, setIsBraille] = useState(false);
  
  const animationIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const toggleIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isInitialMount = useRef(true);

  // Memoize braille translation to avoid re-computation.
  const brailleText = useMemo(() => {
    return text
      .split('\n')
      .map(line => translateToBraille(line))
      .join('\n');
  }, [text]);

  // This effect runs the typewriter/scramble animation.
  useEffect(() => {
    // Don't run the animation on the very first render.
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const targetText = isBraille ? brailleText : text;
    const scrambleChars = isBraille ? BRAILLE_SCRAMBLE_CHARS : ENGLISH_SCRAMBLE_CHARS;
    
    if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
    }
    
    let currentIndex = 0;
    let scrambleIteration = 0;
    const scramblePerChar = 3; // Number of scramble frames for each character
    const frameRate = 30; // ms per frame

    animationIntervalRef.current = setInterval(() => {
      // Phase 1: Scramble the character at the current position
      if (scrambleIteration < scramblePerChar) {
        const prefix = targetText.substring(0, currentIndex);
        const randomChar = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        setDisplayedText(prefix + randomChar);
        scrambleIteration++;
      } else {
        // Phase 2: Reveal the character and advance
        currentIndex++;
        const newText = targetText.substring(0, currentIndex);
        setDisplayedText(newText);
        scrambleIteration = 0;
        
        // End of animation
        if (currentIndex >= targetText.length) {
          if (animationIntervalRef.current) clearInterval(animationIntervalRef.current);
        }
      }
    }, frameRate);

    return () => {
      if (animationIntervalRef.current) clearInterval(animationIntervalRef.current);
    };
  }, [isBraille, text, brailleText]);

  // This effect handles the timed toggling between English and Braille.
  useEffect(() => {
    if (toggleIntervalRef.current) clearInterval(toggleIntervalRef.current);
    
    toggleIntervalRef.current = setInterval(() => {
        setIsBraille(prev => !prev);
    }, 5000); // Increased interval to allow for the longer typing animation

    return () => {
      if (toggleIntervalRef.current) clearInterval(toggleIntervalRef.current);
      if (animationIntervalRef.current) clearInterval(animationIntervalRef.current);
    };
  }, []);

  const dynamicClassName = [
    className,
    'whitespace-pre-wrap',
    'transition-all duration-300',
    'animated-text-container',
    isBraille ? 'font-mono' : '',
  ].filter(Boolean).join(' ');

  const lines = displayedText.split('\n');

  return (
    <span className={dynamicClassName}>
      {lines.map((line, lineIndex) => (
        <div 
          key={lineIndex} 
          className="animated-text-line" 
          style={{ 
            display: 'block',
            lineHeight: '1.1',
            minHeight: '1.2em',
            marginBottom: lineIndex === 0 ? '4px' : 0, 
          }}
        >
          {[...line].map((char, j) => {
            if (char.charCodeAt(0) >= 0x2800 && char.charCodeAt(0) <= 0x28FF) {
              return <BrailleChar key={`${j}-${char}`} braille={char} />;
            }
            return char;
          })}
        </div>
      ))}
    </span>
  );
};

export default AnimatedText;
