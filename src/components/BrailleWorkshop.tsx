import React, { useState, useEffect } from 'react';
import { PenTool, Sparkles } from 'lucide-react';

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
    const braille = convertToBraille(inputText);
    setBrailleOutput([]);
    
    const interval = setInterval(() => {
      setBrailleOutput(prev => [...prev, braille[braille.length - prev.length - 1]]);
      if (prev.length >= braille.length -1) {
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, 100);
  };

  useEffect(() => {
    const braille = convertToBraille(inputText);
    setBrailleOutput(braille);
  }, []);

  return (
    <section id="workshop" className="py-24 bg-light-bg">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-dark-text mb-4">
            Experience Digital Braille
          </h2>
          <p className="text-lg text-medium-text max-w-3xl mx-auto">
            See how text is converted into the tactile system used by millions. This tool simulates the translation process our experts use for every menu.
          </p>
        </div>

        <div className="structured-card p-8 md:p-12">
          {/* Input Area */}
          <div className="mb-8">
            <label htmlFor="braille-input" className="block text-lg font-serif font-semibold text-dark-text mb-4">
              Enter text to convert:
            </label>
            <textarea
              id="braille-input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full p-4 bg-light-bg border border-light-gray text-dark-text rounded-md text-base focus:border-brand-navy focus:ring-1 focus:ring-brand-navy focus:outline-none resize-none shadow-inner-subtle"
              rows={3}
              placeholder="Type here..."
            />
          </div>

          <button
            onClick={startAnimation}
            disabled={isAnimating}
            className="primary-button w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            <span>{isAnimating ? 'Converting...' : 'Convert to Braille'}</span>
          </button>

          {/* Output Area */}
          <div className="mt-10 border-t border-light-gray pt-8">
             <h3 className="text-lg font-serif font-semibold text-dark-text mb-4">Braille Output:</h3>
             <div 
                className="text-4xl leading-relaxed font-mono bg-subtle-gray/50 p-6 border border-light-gray shadow-inner-subtle min-h-[120px] rounded-md flex flex-wrap items-center"
                style={{ letterSpacing: '0.3em' }}
                aria-live="polite"
              >
                {brailleOutput.map((char, index) => (
                  <span
                    key={index}
                    className="text-brand-navy"
                  >
                    {char}
                  </span>
                ))}
                {isAnimating && (
                  <span className="inline-block w-px h-8 bg-dark-text ml-1 animate-blink border border-dark-text" />
                )}
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrailleWorkshop;
