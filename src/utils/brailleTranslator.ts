
// Grade 2 Braille translation utility
const brailleMap: Record<string, string> = {
  'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑', 'f': '⠋',
  'g': '⠛', 'h': '⠓', 'i': '⠊', 'j': '⠚', 'k': '⠅', 'l': '⠇',
  'm': '⠍', 'n': '⠝', 'o': '⠕', 'p': '⠏', 'q': '⠟', 'r': '⠗',
  's': '⠎', 't': '⠞', 'u': '⠥', 'v': '⠧', 'w': '⠺', 'x': '⠭',
  'y': '⠽', 'z': '⠵', ' ': '⠀',
  '1': '⠁', '2': '⠃', '3': '⠉', '4': '⠙', '5': '⠑',
  '6': '⠋', '7': '⠛', '8': '⠓', '9': '⠊', '0': '⠚',
  '.': '⠲', ',': '⠂', '?': '⠦', '!': '⠖', "'": '⠄',
  '-': '⠤', '/': '⠌', '$': '⠈⠙'
};

// Common Grade 2 contractions
const contractions: Record<string, string> = {
  'and': '⠯', 'for': '⠿', 'of': '⠷', 'the': '⠮', 'with': '⠾',
  'you': '⠽', 'as': '⠵', 'but': '⠃', 'can': '⠉', 'do': '⠙',
  'every': '⠑', 'from': '⠋', 'go': '⠛', 'have': '⠓', 'just': '⠚',
  'knowledge': '⠅', 'like': '⠇', 'more': '⠍', 'not': '⠝', 'people': '⠏',
  'quite': '⠟', 'rather': '⠗', 'so': '⠎', 'that': '⠞', 'us': '⠥',
  'very': '⠧', 'will': '⠺', 'it': '⠭', 'your': '⠽'
};

export interface BrailleChar {
  braille: string;
  english: string;
  position: [number, number, number];
}

export function translateToBraille(text: string): BrailleChar[] {
  const result: BrailleChar[] = [];
  const words = text.toLowerCase().split(/\s+/);
  let x = 0;
  let y = 0;
  const lineHeight = 0.08;
  const charWidth = 0.04;

  words.forEach((word, wordIndex) => {
    // Check for contractions first
    if (contractions[word]) {
      result.push({
        braille: contractions[word],
        english: word,
        position: [x, y, 0]
      });
      x += charWidth;
    } else {
      // Translate character by character
      for (const char of word) {
        const brailleChar = brailleMap[char] || '⠀';
        result.push({
          braille: brailleChar,
          english: char,
          position: [x, y, 0]
        });
        x += charWidth;
      }
    }

    // Add space between words (except last word)
    if (wordIndex < words.length - 1) {
      result.push({
        braille: '⠀',
        english: ' ',
        position: [x, y, 0]
      });
      x += charWidth;
    }

    // Line wrapping
    if (x > 1.2) {
      x = 0;
      y -= lineHeight;
    }
  });

  return result;
}

export function formatMenuContent(content: string): { title: string; items: string[] } {
  const lines = content.trim().split('\n').filter(line => line.trim());
  
  if (lines.length === 0) {
    return {
      title: 'Sample Menu',
      items: [
        'Appetizers',
        'Caesar Salad - $12',
        'Bruschetta - $8',
        'Main Courses',
        'Grilled Salmon - $24',
        'Ribeye Steak - $32',
        'Pasta Primavera - $18'
      ]
    };
  }

  return {
    title: lines[0] || 'Menu',
    items: lines.slice(1)
  };
}
