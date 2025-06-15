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

// Added to fix build errors from read-only files
export const translateToBraille = (text: string): string => {
  return text.split('').map(char => brailleMap[char.toLowerCase()] || ' ').join('');
};

export const sampleTexts: { [key: string]: string } = {
  'Sample Menu 1': 'Item 1\nItem 2\nItem 3',
  'Sample Menu 2': 'Drink A\nDrink B\nDrink C',
};
