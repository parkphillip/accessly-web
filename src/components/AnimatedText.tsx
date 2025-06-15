
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
  // Start with the plain English text.
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

  // This effect runs the scramble animation whenever `isBraille` changes.
  useEffect(() => {
    // Don't run the animation on the very first render.
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const targetText = isBraille ? brailleText : text;
    const targetLines = targetText.split('\n');
    
    // Choose scramble characters based on the animation direction.
    // To Braille -> use Braille chars. To English -> use English chars.
    const scrambleChars = isBraille ? BRAILLE_SCRAMBLE_CHARS : ENGLISH_SCRAMBLE_CHARS;
    
    let iteration = 0;
    
    if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
    }

    animationIntervalRef.current = setInterval(() => {
      const newText = targetLines
        .map((line) => {
          return [...line]
            .map((_, index) => {
              if (index < iteration) {
                return line[index];
              }
              return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
            })
            .join('');
        })
        .join('\n');

      setDisplayedText(newText);
      
      const maxLen = Math.max(...targetLines.map(l => l.length));
      if (iteration >= maxLen) {
        if (animationIntervalRef.current) clearInterval(animationIntervalRef.current);
        setDisplayedText(targetText); // Cleanly finish on the target text
      }

      iteration += 1 / 2; // Animation speed
    }, 30); // Frame rate

    return () => {
      if (animationIntervalRef.current) clearInterval(animationIntervalRef.current);
    };
  }, [isBraille, text, brailleText]);

  // This effect handles the timed toggling between English and Braille.
  useEffect(() => {
    // Set up the recurring toggle
    if (toggleIntervalRef.current) clearInterval(toggleIntervalRef.current);
    
    toggleIntervalRef.current = setInterval(() => {
        setIsBraille(prev => !prev);
    }, 4000); // Switch every 4 seconds

    return () => {
      if (toggleIntervalRef.current) clearInterval(toggleIntervalRef.current);
      if (animationIntervalRef.current) clearInterval(animationIntervalRef.current);
    };
  }, []); // Run only once on mount

  const dynamicClassName = [
    className,
    'whitespace-pre-wrap',
    'transition-all duration-300', // Smooth transition for any style changes
    'animated-text-container', // General class for our text
  ].filter(Boolean).join(' ');

  return (
    <span className={dynamicClassName}>
      {displayedText.split('\n').map((line, i) => (
        <div 
          key={i} 
          className="animated-text-line" 
          style={{ 
            display: 'block',
            lineHeight: '1.1',
            minHeight: '1.2em', // Prevent layout shift on empty lines
            marginBottom: i === 0 ? '4px' : 0, 
          }}
        >
          {[...line].map((char, j) => {
            // Conditionally render BrailleChar if the character is in the braille unicode range.
            // This works for both the final braille text and the scramble animation.
            if (char.charCodeAt(0) >= 0x2800 && char.charCodeAt(0) <= 0x28FF) {
              return <BrailleChar key={`${j}-${char}`} braille={char} />;
            }
            // Otherwise, render the character as plain text (for English).
            return char;
          })}
        </div>
      ))}
    </span>
  );
};

export default AnimatedText;
