
// A more complete Braille character map
export const brailleMap: { [key: string]: string } = {
  'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑', 'f': '⠋', 'g': '⠛', 'h': '⠓',
  'i': '⠊', 'j': '⠚', 'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝', 'o': '⠕', 'p': '⠏',
  'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞', 'u': '⠥', 'v': '⠧', 'w': '⠺', 'x': '⠭',
  'y': '⠽', 'z': '⠵', ' ': '⠀'
};

/**
 * Translates a string to Braille.
 */
export const translateToBraille = (text: string): string => {
  const lowerCaseText = text.toLowerCase();
  let brailleString = '';
  for (let i = 0; i < lowerCaseText.length; i++) {
    brailleString += brailleMap[lowerCaseText[i]] || '⠀'; // Use braille space for unknown chars
  }
  return brailleString;
};

// Alias for backwards compatibility if needed elsewhere
export const textToBraille = translateToBraille;

export const sampleTexts = [
  "Main Courses\n\nFilet Mignon - 8oz center cut, potato gratin\n\nPan-Seared Salmon - with asparagus and lemon-dill sauce\n\nChicken Parmesan - breaded chicken, marinara, mozzarella",
  "Desserts\n\nChocolate Lava Cake - with vanilla bean ice cream\n\nNew York Cheesecake - with raspberry coulis\n\nTiramisu - coffee-soaked ladyfingers, mascarpone cream",
  "Beverages\n\nCoffee\n\nTea\n\nSoda\n\nSparkling Water"
];
