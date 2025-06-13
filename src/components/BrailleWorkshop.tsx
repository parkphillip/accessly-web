
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
    <section id="workshop" className="py-24 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight">
            Experience Braille
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
            Type any text below and watch it transform into tactile dots—the same dots that give independence to millions of visually impaired diners.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-600/50 p-12 rounded-2xl shadow-2xl">
            <div className="mb-10">
              <label className="block text-xl font-semibold text-white mb-6">
                Type your text:
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full p-6 bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-slate-600/50 text-white rounded-xl text-lg focus:border-blue-500/50 focus:outline-none resize-none shadow-inner font-light leading-relaxed"
                rows={3}
                placeholder="Enter text to see it in braille..."
              />
            </div>

            <button
              onClick={startAnimation}
              disabled={isAnimating}
              className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-10 py-4 font-semibold rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-[1.02] shadow-xl hover:shadow-blue-500/25 disabled:opacity-50 disabled:transform-none"
            >
              {isAnimating ? 'Converting...' : 'Convert to Braille'}
            </button>

            <div className="mt-10 p-8 bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-600/50 rounded-xl shadow-inner">
              <h3 className="text-xl font-semibold text-white mb-6">Braille Output:</h3>
              <div 
                className="text-4xl leading-relaxed font-mono bg-slate-950/50 p-8 border border-slate-700/50 shadow-inner min-h-[120px] flex flex-wrap items-center rounded-lg"
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
                      color: char === '⠀' ? 'transparent' : '#93c5fd'
                    }}
                  >
                    {char}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-600/50 p-8 rounded-xl shadow-lg">
                <h4 className="font-semibold text-white mb-4 text-lg">Did You Know?</h4>
                <p className="text-slate-300 leading-relaxed">
                  Braille consists of patterns of raised dots arranged in cells of up to six dots each. 
                  Each character is formed by a unique combination of these dots, creating a complete 
                  tactile reading system.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-600/50 p-8 rounded-xl shadow-lg">
                <h4 className="font-semibold text-white mb-4 text-lg">Quality Matters</h4>
                <p className="text-slate-300 leading-relaxed">
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
