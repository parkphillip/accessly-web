// A mapping for lower-case letters only. No spaces or placeholders.
export const brailleMap: { [key: string]: string } = {
  'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑', 'f': '⠋', 'g': '⠛', 'h': '⠓',
  'i': '⠊', 'j': '⠚', 'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝', 'o': '⠕', 'p': '⠏',
  'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞', 'u': '⠥', 'v': '⠧', 'w': '⠺', 'x': '⠭',
  'y': '⠽', 'z': '⠵'
};

/**
 * Translate a word to a braille string (one braille cell per character).
 * Empty string or unsupported chars are returned as "" (NOT a visual cell).
 */
export function wordToBraille(word: string): string[] {
  return [...word].map(letter => brailleMap[letter.toLowerCase()] || '');
}

export function lineToBraille(line: string): string[] {
  return line.split('').map(l => brailleMap[l.toLowerCase()] || '');
}

/**
 * Translates a string to a braille string, ignoring spaces and unknown characters.
 * @param text The input string (e.g., "Hello World")
 * @returns The braille representation (e.g., "⠓⠑⠇⠇⠕⠺⠕⠗⠇⠙")
 */
export const translateToBraille = (text: string): string => {
  return text
    .split('')
    .map(char => {
      const lowerChar = char.toLowerCase();
      // Return braille char if it exists, otherwise return an empty string
      // This effectively removes spaces and any other non-mappable characters
      return brailleMap[lowerChar] || '';
    })
    .join('');
};

export const sampleTexts: string[] = [
  "Starters\nGarlic Bread - 4.50\nBruschetta - 6.00\n\nMain Courses\nMargherita Pizza - 12.00\nSpaghetti Carbonara - 14.50",
  "Desserts\nTiramisu - 7.00\nCheesecake - 6.50\n\nDrinks\nWater - 2.00\nCola - 2.50"
];
