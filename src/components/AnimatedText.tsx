
import React, { useState, useEffect, useRef } from 'react';
import { lineToBraille } from '../utils/brailleUtils';
import BrailleChar from './BrailleChar';

interface AnimatedTextProps {
  text: string; // Expects exactly "Accessible\nWorld"
  className?: string;
}

/**
 * Returns an array of arrays, one per line, each an array of characters.
 */
function splitLines(text: string) {
  return text.split('\n').map(line => [...line]);
}

/**
 * Morph a character-by-character array from src to target with a delay per char.
 */
const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className }) => {
  // textLines: e.g. [["A","c",...], ["W","o",...]]
  const textLines = splitLines(text);
  const brailleLines = textLines.map(lineArr =>
    lineArr.map(
      ch => (/[a-zA-Z]/.test(ch) ? lineToBraille(ch)[0] || '' : '')
    )
  );

  const [stage, setStage] = useState<'text'|'braille'>('text');
  const [progress, setProgress] = useState<number>(0);
  const [displayLines, setDisplayLines] = useState<string[][]>(textLines);

  // Animation parameters
  const intervalMs = 65;
  const delayBetweenStates = 1300; // pause when fully text or fully braille

  // Animation logic: staggered, per char morph, per line
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    let interval: ReturnType<typeof setInterval> | null = null;
    let cancel = false;

    function runMorph() {
      setProgress(0);
      let curr = 0;
      let state = stage === 'text' ? 'braille' : 'text';
      // Compute line lengths
      const maxLen = Math.max(...textLines.map(l => l.length));
      interval = setInterval(() => {
        if (cancel) return;
        curr++;
        setProgress(curr);
        // For each line
        setDisplayLines(
          textLines.map((line, rowIdx) =>
            line.map((ch, chIdx) => {
              if (chIdx < curr) {
                // Shown as braille or text
                return state === 'braille'
                  ? brailleLines[rowIdx][chIdx] // Only show real braille cell if exists
                  : textLines[rowIdx][chIdx];
              } else {
                return state === 'braille'
                  ? textLines[rowIdx][chIdx]
                  : brailleLines[rowIdx][chIdx];
              }
            })
          )
        );
        if (curr >= maxLen) {
          clearInterval(interval!);
          setStage(state as typeof stage);
          timeout = setTimeout(() => {
            if (!cancel) {
              runMorph();
            }
          }, delayBetweenStates);
        }
      }, intervalMs);
    }

    timeout = setTimeout(() => {
      runMorph();
    }, delayBetweenStates);

    return () => {
      cancel = true;
      if (timeout) clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
    // Only rerun when source text changes
    // eslint-disable-next-line
  }, [text]);

  // Root rendering: always two lines, each morphs independently, only real letters map to braille
  return (
    <span className={className ? `${className} whitespace-pre-wrap` : 'whitespace-pre-wrap'}>
      {displayLines.map((lineArr, i) => (
        <div key={i} className="braille-line" style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: '0.1em',
          marginBottom: i === 0 ? '4px' : 0
        }}>
          {lineArr.map((ch, j) => {
            if (/[a-zA-Z]/.test(textLines[i][j])) {
              // If this is a letter, show as text/braille as needed
              if (/[⠁-⠵]/.test(ch)) {
                // Render as styled braille character
                return <BrailleChar key={j} braille={ch} animate={stage==='braille'} />;
              } else {
                // Render as clean letter, monospace
                return (
                  <span
                    key={j}
                    style={{
                      fontFamily: '"JetBrains Mono", monospace',
                      fontSize: 26,
                      fontWeight: 500,
                      color: '#343a40',
                      margin: '0 6px',
                      verticalAlign: 'middle',
                      letterSpacing: '2px'
                    }}
                  >{ch}</span>
                );
              }
            } else if (textLines[i][j] === ' ') {
              // For space: just render empty space
              return <span key={j} style={{ display: 'inline-block', minWidth: 13 }}>{' '}</span>;
            }
            // For any non-supported char (shouldn't happen)
            return null;
          })}
        </div>
      ))}
    </span>
  );
};

export default AnimatedText;
