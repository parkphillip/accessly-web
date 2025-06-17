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

  // Compute the widest text (English or Braille) for ghost sizing
  const widestText = useMemo(() => {
    return brailleText.length > text.length ? brailleText : text;
  }, [brailleText, text]);

  const targetText = isBraille ? brailleText : text;

  // This effect runs the combined typewriter and decode animation.
  useEffect(() => {
    // Don't run the animation on the very first render.
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const scrambleChars = isBraille ? BRAILLE_SCRAMBLE_CHARS : ENGLISH_SCRAMBLE_CHARS;
    
    if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
    }
    
    let currentIndex = 0;
    let revealedText = '';
    let scrambleIteration = 0;
    const scramblePerChar = 3; // Slightly slower
    const frameRate = 35; // Slightly slower

    // Reset displayed text to empty to start the typing animation from scratch
    setDisplayedText('');

    animationIntervalRef.current = setInterval(() => {
        if (currentIndex >= targetText.length) {
            if (animationIntervalRef.current) clearInterval(animationIntervalRef.current);
            setDisplayedText(targetText); // Final clean up
            return;
        }

        // Scramble the current character for a few frames
        if (scrambleIteration < scramblePerChar) {
            const randomChar = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
            setDisplayedText(revealedText + randomChar);
            scrambleIteration++;
        } else {
            // Reveal the correct character and move to the next one
            revealedText += targetText[currentIndex];
            currentIndex++;
            scrambleIteration = 0;
            // Set the text for the next frame, which will be the revealed part
            setDisplayedText(revealedText);
        }
    }, frameRate);

    return () => {
      if (animationIntervalRef.current) clearInterval(animationIntervalRef.current);
    };
  }, [targetText, brailleText, text]);

  // This effect handles the timed toggling between English and Braille.
  useEffect(() => {
    if (toggleIntervalRef.current) clearInterval(toggleIntervalRef.current);
    
    toggleIntervalRef.current = setInterval(() => {
        setIsBraille(prev => !prev);
    }, 5000); // Faster toggle between English and Braille

    return () => {
      if (toggleIntervalRef.current) clearInterval(toggleIntervalRef.current);
      if (animationIntervalRef.current) clearInterval(animationIntervalRef.current);
    };
  }, []);

  const dynamicClassName = [
    className,
    'whitespace-pre-wrap',
    'transition-all duration-500',
    'animated-text-container',
    isBraille ? 'font-mono' : '',
  ].filter(Boolean).join(' ');

  const renderTextWithBraille = (textToRender: string) => {
    const linesToRender = textToRender.split('\n');
    return linesToRender.map((line, lineIndex) => (
      <span 
        key={lineIndex} 
        className="animated-text-line" 
        style={{
          display: 'inline', // Inline for no line break
          lineHeight: 'inherit', // Inherit for natural alignment
          whiteSpace: 'pre', // Preserve spaces, no wrapping
          overflow: 'visible', // Never cut off
        }}
      >
        {[...line].map((char, j) => {
          if (char.charCodeAt(0) >= 0x2800 && char.charCodeAt(0) <= 0x28FF) {
            return <BrailleChar key={`${j}-${char}`} braille={char} />;
          }
          return char;
        })}
      </span>
    ));
  };

  return (
    <span 
      className={dynamicClassName} 
      style={{
        display: 'inline-block',
        verticalAlign: 'baseline',
        position: 'relative',
        height: '1.1em', // Fixed height matching heading line height
        lineHeight: '1.1',
      }}
    >
      {/* Ghost element for sizing, prevents layout jumps */}
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
      {/* Visible animated element */}
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
