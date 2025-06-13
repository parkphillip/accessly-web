
import React, { useState, useEffect } from 'react';
import { PenTool } from 'lucide-react';

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
    <section id="workshop" className="py-24 bg-warm-tan relative overflow-hidden">
      {/* Paper texture overlay */}
      <div className="absolute inset-0 opacity-30 bg-paper-texture"></div>
      
      {/* Handwritten elements */}
      <div className="absolute top-20 right-10 transform rotate-12">
        <div className="font-script text-2xl text-sage opacity-70">Try it yourself!</div>
        <div className="w-16 h-1 bg-sage opacity-40 transform -rotate-12 mt-2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-8 relative">
        <div className="text-center mb-20">
          <div className="relative inline-block">
            <h2 className="text-5xl lg:text-6xl font-serif font-bold text-charcoal mb-8 leading-tight">
              Experience the Magic of Braille
            </h2>
            {/* Handwritten underline */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 h-3 bg-dusty-blue/30 transform -rotate-1 rounded-full"></div>
          </div>
          <p className="text-xl text-pencil max-w-3xl mx-auto leading-relaxed font-light">
            Type any text below and watch it transform into the raised dots that bring independence 
            to millions of diners. Each dot is precisely positioned for fingertip reading.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="paper-card p-12 rounded-3xl shadow-paper-lift transform -rotate-1 hover:rotate-0 transition-transform duration-500">
            {/* Workshop header with icon */}
            <div className="flex items-center gap-4 mb-10">
              <div className="w-14 h-14 bg-sage/20 border-2 border-sage/40 rounded-xl flex items-center justify-center transform rotate-3 shadow-paper">
                <PenTool className="w-7 h-7 text-sage" />
              </div>
              <div>
                <h3 className="text-2xl font-serif font-semibold text-charcoal">Digital Braille Converter</h3>
                <p className="text-pencil font-script">Like our workshop tools, but faster!</p>
              </div>
            </div>

            <div className="mb-10">
              <label className="block text-xl font-serif font-semibold text-charcoal mb-6">
                What would you like to convert?
              </label>
              <div className="relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="w-full p-6 bg-cream/80 border-2 border-warm-gray/50 text-charcoal rounded-2xl text-lg focus:border-sage/60 focus:outline-none resize-none shadow-inner font-light leading-relaxed linen-texture"
                  rows={3}
                  placeholder="Enter text to see it transformed into braille dots..."
                />
                {/* Handwritten annotation */}
                <div className="absolute -right-8 top-1/2 transform translate-x-full -translate-y-1/2">
                  <div className="font-script text-sage text-sm transform rotate-12">
                    Type here →
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={startAnimation}
              disabled={isAnimating}
              className="bg-gradient-to-r from-sage to-dusty-blue text-cream px-10 py-4 font-serif font-semibold rounded-2xl hover:shadow-paper-lift transition-all duration-300 transform hover:-rotate-1 shadow-paper disabled:opacity-50 disabled:transform-none relative"
            >
              <span className="relative z-10">
                {isAnimating ? 'Converting to Braille...' : 'Transform to Braille'}
              </span>
              {/* Handwritten emphasis */}
              <div className="absolute -bottom-2 -right-2 font-script text-xs text-dusty-blue/70 transform rotate-12">
                Magic!
              </div>
            </button>

            <div className="mt-10 paper-card p-8 rounded-2xl shadow-inner-paper transform rotate-1">
              <div className="flex items-center gap-3 mb-6">
                <h3 className="text-xl font-serif font-semibold text-charcoal">Your Braille Translation:</h3>
                <div className="font-script text-sage text-sm">(Touch-readable dots)</div>
              </div>
              <div 
                className="text-4xl leading-relaxed font-mono bg-paper/80 p-8 border-2 border-warm-gray/30 shadow-inner min-h-[120px] flex flex-wrap items-center rounded-xl linen-texture"
                style={{ letterSpacing: '0.3em' }}
              >
                {brailleOutput.map((char, index) => (
                  <span
                    key={index}
                    className={`inline-block transition-all duration-300 ${
                      index < animationIndex ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-50'
                    }`}
                    style={{ 
                      transitionDelay: `${index * 50}ms`,
                      color: char === '⠀' ? 'transparent' : '#6b7c94'
                    }}
                  >
                    {char}
                  </span>
                ))}
                {isAnimating && (
                  <span className="typewriter-cursor bg-charcoal"></span>
                )}
              </div>
            </div>

            {/* Educational cards with handwritten touches */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="paper-card p-8 rounded-2xl shadow-paper transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-sage rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-serif font-semibold text-charcoal mb-4 text-lg">The Science Behind Touch</h4>
                    <p className="text-pencil leading-relaxed">
                      Each braille character uses up to 6 raised dots in specific patterns. Your fingertips 
                      can detect these tiny elevations, creating a complete reading system through touch alone.
                    </p>
                    {/* Handwritten note */}
                    <div className="mt-4 font-script text-sm text-sage transform rotate-1">
                      ~2,500 nerve endings per fingertip!
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="paper-card p-8 rounded-2xl shadow-paper transform rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-dusty-blue rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-serif font-semibold text-charcoal mb-4 text-lg">Our Quality Promise</h4>
                    <p className="text-pencil leading-relaxed">
                      Every braille menu we create is tested by actual braille readers. We use premium 
                      materials and precise dot formation for the clearest possible tactile experience.
                    </p>
                    {/* Handwritten note */}
                    <div className="mt-4 font-script text-sm text-dusty-blue transform -rotate-1">
                      Tested by real experts ✓
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrailleWorkshop;
