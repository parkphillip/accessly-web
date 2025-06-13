
import React, { useState, useEffect } from 'react';

const BrailleDemo = () => {
  const [inputText, setInputText] = useState('Welcome to our restaurant');
  const [brailleOutput, setBrailleOutput] = useState<string[]>([]);
  const [isConverting, setIsConverting] = useState(false);

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

  const startConversion = () => {
    setIsConverting(true);
    const braille = convertToBraille(inputText);
    setBrailleOutput([]);
    
    let index = 0;
    const interval = setInterval(() => {
      setBrailleOutput(prev => [...prev, braille[index]]);
      index++;
      
      if (index >= braille.length) {
        clearInterval(interval);
        setIsConverting(false);
      }
    }, 80);
  };

  useEffect(() => {
    startConversion();
  }, []);

  return (
    <section id="demo" className="py-20 bg-gradient-to-b from-amber-50 to-stone-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-playfair text-stone-800 mb-6">
            Braille Conversion Demo
          </h2>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto">
            Experience how text transforms into braille. Type any message below and see it converted 
            into the tactile dots that provide independence to visually impaired diners.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="mb-8">
              <label className="block text-lg font-semibold text-stone-700 mb-4">
                Enter your text:
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full p-4 border-2 border-stone-200 rounded-xl text-lg focus:border-amber-500 focus:outline-none resize-none transition-colors duration-200"
                rows={3}
                placeholder="Type your message here..."
              />
            </div>

            <button
              onClick={startConversion}
              disabled={isConverting}
              className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-8 py-3 rounded-full font-semibold hover:from-amber-700 hover:to-amber-800 transition-all duration-200 shadow-md disabled:opacity-50"
            >
              {isConverting ? 'Converting...' : 'Convert to Braille'}
            </button>

            <div className="mt-8 p-6 bg-stone-50 rounded-xl border">
              <h3 className="text-lg font-semibold text-stone-700 mb-4">Braille Output:</h3>
              <div 
                className="text-4xl leading-relaxed font-mono bg-white p-6 rounded-lg min-h-[120px] flex flex-wrap items-center border"
                style={{ letterSpacing: '0.15em' }}
              >
                {brailleOutput.map((char, index) => (
                  <span
                    key={index}
                    className="inline-block transition-opacity duration-200"
                    style={{ 
                      color: char === '⠀' ? 'transparent' : '#d97706'
                    }}
                  >
                    {char}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-xl border border-amber-200">
                <h4 className="font-semibold text-stone-800 mb-3">About Braille</h4>
                <p className="text-stone-600 text-sm">
                  Braille consists of patterns of raised dots arranged in cells of up to six dots each. 
                  Each character is formed by a unique combination, creating a complete tactile reading system.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                <h4 className="font-semibold text-stone-800 mb-3">Our Quality Standards</h4>
                <p className="text-stone-600 text-sm">
                  Every braille menu uses high-grade materials and precise dot formation for clear, 
                  comfortable reading. All menus are quality-tested before delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrailleDemo;
