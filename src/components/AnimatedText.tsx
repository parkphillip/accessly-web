
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { translateToBraille } from '../utils/brailleUtils';

// A set of characters for the scramble effect
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const BRAILLE_CHARS = '⠁⠃⠉⠙⠑⠋⠛⠓⠊⠚⠅⠇⠍⠝⠕⠏⠟⠗⠎⠞⠥⠧⠺⠭⠽⠵';

interface AnimatedTextProps {
  text: string; // Expects a string, e.g., "Accessible\nWorld"
  className?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isBraille, setIsBraille] = useState(false);
  
  const animationIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const toggleIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Memoize braille translation to avoid re-computation
  const brailleText = useMemo(() => {
    return text
      .split('\n')
      .map(line => translateToBraille(line))
      .join('\n');
  }, [text]);

  // This effect runs the scramble animation whenever `isBraille` changes.
  useEffect(() => {
    const targetText = isBraille ? brailleText : text;
    const scrambleChars = isBraille ? BRAILLE_CHARS : SCRAMBLE_CHARS;
    
    const targetLines = targetText.split('\n');
    const maxLen = Math.max(...targetLines.map(l => l.length));

    let iteration = 0;
    
    if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
    }

    animationIntervalRef.current = setInterval(() => {
      const newText = targetLines
        .map((line) => {
          return [...line]
            .map((letter, index) => {
              if (index < iteration) {
                return line[index];
              }
              if (letter === ' ') return ' ';
              return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
            })
            .join('');
        })
        .join('\n');

      setDisplayedText(newText);

      if (iteration >= maxLen) {
        if (animationIntervalRef.current) clearInterval(animationIntervalRef.current);
        setDisplayedText(targetText); // Cleanly finish on the target text
      }

      iteration += 1 / 3; // Animation speed
    }, 35); // Frame rate

    return () => {
      if (animationIntervalRef.current) clearInterval(animationIntervalRef.current);
    };
  }, [isBraille, text, brailleText]);

  // This effect toggles between English and Braille modes.
  useEffect(() => {
    // Initial display: empty
    setDisplayedText(text.split('\n').map(line => ' '.repeat(line.length)).join('\n'));
    
    // Start with English text animation after a delay
    const initialTimeout = setTimeout(() => {
        setIsBraille(false);
        
        // Then, set up the recurring toggle
        if (toggleIntervalRef.current) clearInterval(toggleIntervalRef.current);
        toggleIntervalRef.current = setInterval(() => {
            setIsBraille(prev => !prev);
        }, 4000); // Switch every 4 seconds

    }, 500); // Delay before starting the very first animation

    return () => {
      clearTimeout(initialTimeout);
      if (toggleIntervalRef.current) clearInterval(toggleIntervalRef.current);
      if (animationIntervalRef.current) clearInterval(animationIntervalRef.current);
    };
  }, [text]); // Only depends on the base text prop

  return (
    <span className={className ? `${className} whitespace-pre-wrap` : 'whitespace-pre-wrap'}>
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
          {line}
        </div>
      ))}
    </span>
  );
};

export default AnimatedText;
