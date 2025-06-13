
import React, { useState, useEffect } from 'react';

const BrailleWorkshop = () => {
  const [inputText, setInputText] = useState('Welcome to our restaurant');
  const [brailleOutput, setBrailleOutput] = useState<string[]>([]);
  const [animationIndex, setAnimationIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Simple braille mapping for demo
  const brailleMap: { [key: string]: string } = {
    'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑', 'f': '⠋', 'g': '⠛', 'h': '⠓',
    'i': '⠊', 'j': '⠚', 'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝', 'o': '⠕', 'p': '⠏',
    'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞', 'u': '⠥', 'v': '⠧', 'w': '⠺', 'x': '⠭',
    'y': '⠽', 'z': '⠵', ' ': '⠀', '.': '⠲', ',': '⠂', '!': '⠖', '?': '⠦'
  };

  const convertToBraille = (text: string) => {
    return text.toLowerCase().split('').map(char => brailleMap[char] || '⠀');
  };

  const startAnimation = () => {
    setIsAnimating(true);
    setAnimationIndex(0);
    const braille = convertToBraille(inputText);
    setBrailleOutput([]);
    
    let index = 0;
    const interval = setInterval(() => {
      setBrailleOutput(prev => [...prev, braille[index]]);
      index++;
      
      if (index >= braille.length) {
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, 100);
  };

  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <section id="workshop" className="py-20 bg-gradient-to-b from-amber-50 to-stone-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-800 mb-6">
            Interactive Braille Workshop
          </h2>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto">
            Experience the beauty of braille firsthand. Type any text below and watch it transform 
            into tactile dots—the same dots that give independence to millions of visually impaired diners.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
            <div className="mb-8">
              <label className="block text-lg font-semibold text-stone-700 mb-4">
                Type your text:
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full p-4 border-2 border-stone-200 rounded-xl text-lg focus:border-amber-500 focus:outline-none resize-none"
                rows={3}
                placeholder="Enter text to see it in braille..."
              />
            </div>

            <button
              onClick={startAnimation}
              disabled={isAnimating}
              className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-8 py-3 rounded-full font-semibold hover:from-amber-700 hover:to-amber-800 transition-all duration-200 shadow-lg disabled:opacity-50"
            >
              {isAnimating ? 'Converting...' : 'Convert to Braille'}
            </button>

            <div className="mt-8 p-6 bg-stone-100 rounded-xl">
              <h3 className="text-lg font-semibold text-stone-700 mb-4">Braille Output:</h3>
              <div 
                className="text-4xl leading-relaxed font-mono bg-white p-6 rounded-lg shadow-inner min-h-[120px] flex flex-wrap items-center"
                style={{ letterSpacing: '0.2em' }}
              >
                {brailleOutput.map((char, index) => (
                  <span
                    key={index}
                    className={`inline-block transition-all duration-300 ${
                      index < animationIndex ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-50'
                    }`}
                    style={{ 
                      transitionDelay: `${index * 50}ms`,
                      color: char === '⠀' ? 'transparent' : '#d97706'
                    }}
                  >
                    {char}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-xl">
                <h4 className="font-semibold text-stone-800 mb-3">Did You Know?</h4>
                <p className="text-stone-600 text-sm">
                  Braille consists of patterns of raised dots arranged in cells of up to six dots each. 
                  Each character is formed by a unique combination of these dots, creating a complete 
                  tactile reading system.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                <h4 className="font-semibold text-stone-800 mb-3">Quality Matters</h4>
                <p className="text-stone-600 text-sm">
                  Our braille menus use high-grade materials and precise dot formation to ensure 
                  clear, comfortable reading. Every menu is quality-tested by braille readers 
                  before delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrailleWorkshop;
