
// A more complete Braille character map
export const brailleMap: { [key: string]: string } = {
  'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑', 'f': '⠋', 'g': '⠛', 'h': '⠓',
  'i': '⠊', 'j': '⠚', 'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝', 'o': '⠕', 'p': '⠏',
  'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞', 'u': '⠥', 'v': '⠧', 'w': '⠺', 'x': '⠭',
  'y': '⠽', 'z': '⠵', ' ': '⠀'
};

/**
 * Translates a string to Braille, padding with non-breaking spaces
 * to ensure the output has the same length as the input for animation purposes.
 */
export const textToBraille = (text: string): string => {
  const lowerCaseText = text.toLowerCase();
  let brailleString = '';
  for (let i = 0; i < lowerCaseText.length; i++) {
    brailleString += brailleMap[lowerCaseText[i]] || '⠀'; // Use braille space for unknown chars
  }
  return brailleString;
};
