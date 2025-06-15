
import React from 'react';

interface BrailleCharProps {
  braille: string; // A single braille character like '⠁'
  className?: string;
}

/**
 * Renders a single Braille character by programmatically creating dots,
 * instead of relying on a font character. This gives us full styling control.
 */
const BrailleChar: React.FC<BrailleCharProps> = ({ braille, className }) => {
  // Gracefully handle empty or non-braille characters to prevent errors
  if (!braille || braille.charCodeAt(0) < 0x2800 || braille.charCodeAt(0) > 0x28FF) {
    // Render a container that occupies space but is empty, preventing layout shift during animations.
    return <div className={`braille-char-container ${className ?? ''}`} />;
  }

  // The Braille unicode block starts at U+2800. The offset gives us a bitmask for the dots.
  const code = braille.charCodeAt(0) - 0x2800;

  // The bits in `code` correspond to the 6 dots in a cell.
  // We check each bit to see if the corresponding dot should be "filled".
  // The grid is filled row by row, so the order is: dot 1, dot 4, dot 2, dot 5, etc.
  return (
    <div
      className={`braille-char-container ${className ?? ''}`}
      aria-hidden="true" // Decorative, as text is available
    >
      <div className="braille-grid">
        <div className={`braille-dot ${(code & (1 << 0)) ? 'filled' : ''}`}></div> {/* Dot 1 (top-left) */}
        <div className={`braille-dot ${(code & (1 << 3)) ? 'filled' : ''}`}></div> {/* Dot 4 (top-right) */}
        <div className={`braille-dot ${(code & (1 << 1)) ? 'filled' : ''}`}></div> {/* Dot 2 (mid-left) */}
        <div className={`braille-dot ${(code & (1 << 4)) ? 'filled' : ''}`}></div> {/* Dot 5 (mid-right) */}
        <div className={`braille-dot ${(code & (1 << 2)) ? 'filled' : ''}`}></div> {/* Dot 3 (bottom-left) */}
        <div className={`braille-dot ${(code & (1 << 5)) ? 'filled' : ''}`}></div> {/* Dot 6 (bottom-right) */}
      </div>
    </div>
  );
};

export default BrailleChar;
