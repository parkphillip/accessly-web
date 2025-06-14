
// Braille character mapping (Grade 1 Braille)
export const brailleMap: Record<string, string> = {
  'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑', 'f': '⠋', 'g': '⠛', 'h': '⠓', 'i': '⠊', 'j': '⠚',
  'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝', 'o': '⠕', 'p': '⠏', 'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞',
  'u': '⠥', 'v': '⠧', 'w': '⠺', 'x': '⠭', 'y': '⠽', 'z': '⠵',
  '0': '⠚', '1': '⠁', '2': '⠃', '3': '⠉', '4': '⠙', '5': '⠑', '6': '⠋', '7': '⠛', '8': '⠓', '9': '⠊',
  ' ': ' ', '.': '⠲', ',': '⠂', '?': '⠦', '!': '⠖', "'": '⠄', '"': '⠶', '-': '⠤', '$': '⠫'
};

// Common Grade 2 contractions for more authentic feel
const contractions: Record<string, string> = {
  'and': '⠯', 'for': '⠿', 'of': '⠷', 'the': '⠮', 'with': '⠾',
  'you': '⠽', 'as': '⠵', 'but': '⠃', 'can': '⠉', 'do': '⠙',
  'every': '⠑', 'from': '⠋', 'go': '⠛', 'have': '⠓', 'just': '⠚',
  'knowledge': '⠅', 'like': '⠇', 'more': '⠍', 'not': '⠝', 'people': '⠏',
  'quite': '⠟', 'rather': '⠗', 'so': '⠎', 'that': '⠞', 'us': '⠥',
  'very': '⠧', 'will': '⠺', 'it': '⠭', 'his': '⠓⠊⠎'
};

export const translateToBraille = (text: string): string => {
  const words = text.toLowerCase().split(/(\s+|\n)/);
  
  return words.map(word => {
    // Preserve whitespace and newlines
    if (/\s/.test(word)) return word;
    
    // Check for contractions first
    if (contractions[word]) {
      return contractions[word];
    }
    
    // Translate character by character
    return word.split('').map(char => brailleMap[char] || char).join('');
  }).join('');
};

export const sampleTexts = [
  `APPETIZERS
Bruschetta
Fresh tomatoes, basil, garlic on toasted bread
$8.50

Caesar Salad
Romaine lettuce, parmesan, croutons
$12.00`,

  `MAIN COURSES
Grilled Salmon
Atlantic salmon with lemon herbs
$24.00

Pasta Primavera
Fresh vegetables with linguine
$18.50

Beef Tenderloin
8oz with roasted vegetables
$32.00`,

  `DESSERTS
Chocolate Mousse
Rich dark chocolate with berries
$9.00

Tiramisu
Classic Italian coffee dessert
$10.50

Fresh Fruit Tart
Seasonal fruits with pastry cream
$8.50`
];
