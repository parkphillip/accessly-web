
import React, { useState, useEffect, useRef } from 'react';

// A set of characters for the scramble effect
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

interface AnimatedTextProps {
  text: string; // Expects a string, e.g., "Accessible\nWorld"
  className?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className }) => {
  const [displayedText, setDisplayedText] = useState('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // This effect runs the scramble animation
  useEffect(() => {
    // Set initial text to empty to avoid flash of final text
    setDisplayedText(text.split('\n').map(line => ' '.repeat(line.length)).join('\n'));
    let iteration = 0;
    
    if (intervalRef.current) {
        clearInterval(intervalRef.current);
    }

    // Start animation after a short delay
    const startTimeout = setTimeout(() => {
      const targetLines = text.split('\n');
      const maxLen = Math.max(...targetLines.map(l => l.length));

      intervalRef.current = setInterval(() => {
        const newText = targetLines
          .map((line) => {
            return [...line]
              .map((letter, index) => {
                if (index < iteration) {
                  return line[index];
                }
                if (letter === ' ') return ' ';
                // Return a random character for the scramble effect
                return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
              })
              .join('');
          })
          .join('\n');

        setDisplayedText(newText);

        if (iteration >= maxLen) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setDisplayedText(text); // Ensure it cleanly ends on the correct text
        }

        iteration += 1 / 3; // Controls the speed of the reveal
      }, 35); // ms between each frame update
    }, 500); // ms delay before starting animation

    // Cleanup on component unmount
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      clearTimeout(startTimeout);
    };
  }, [text]);

  return (
    <span className={className ? `${className} whitespace-pre-wrap` : 'whitespace-pre-wrap'}>
      {displayedText.split('\n').map((line, i) => (
        <div 
          key={i} 
          className="animated-text-line" 
          style={{ 
            display: 'block',
            lineHeight: '1.1',
            marginBottom: i === 0 ? '4px' : 0, 
          }}
        >
          {/* We let the parent component control font-size, color, etc. via className */}
          <span style={{ letterSpacing: '1px' }}>
            {line}
          </span>
        </div>
      ))}
    </span>
  );
};

export default AnimatedText;
