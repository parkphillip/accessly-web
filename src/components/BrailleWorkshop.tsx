
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
    }, 60);
  };

  useEffect(() => {
    startConversion();
  }, []);

  return (
    <section id="demo" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Braille Conversion Demo
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience how text transforms into braille. Type any message below and see it converted 
            into the tactile dots that provide independence to visually impaired diners.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <div className="mb-8">
              <label className="block text-lg font-semibold text-black mb-4">
                Enter your text:
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:border-black focus:outline-none resize-none transition-colors duration-200 bg-white"
                rows={3}
                placeholder="Type your message here..."
              />
            </div>

            <button
              onClick={startConversion}
              disabled={isConverting}
              className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isConverting ? 'Converting...' : 'Convert to Braille'}
            </button>

            <div className="mt-8 p-6 bg-white rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-black mb-4">Braille Output:</h3>
              <div 
                className="text-4xl leading-relaxed font-mono bg-gray-50 p-6 rounded-lg min-h-[120px] flex flex-wrap items-center border border-gray-200"
                style={{ letterSpacing: '0.15em' }}
              >
                {brailleOutput.map((char, index) => (
                  <span
                    key={index}
                    className="inline-block transition-opacity duration-200"
                    style={{ 
                      color: char === '⠀' ? 'transparent' : '#000000'
                    }}
                  >
                    {char}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-black mb-3">About Braille</h4>
                <p className="text-gray-600 text-sm">
                  Braille consists of patterns of raised dots arranged in cells of up to six dots each. 
                  Each character is formed by a unique combination, creating a complete tactile reading system.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-black mb-3">Our Quality Standards</h4>
                <p className="text-gray-600 text-sm">
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
