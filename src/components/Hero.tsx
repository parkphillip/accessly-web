
import React, { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const [animationStage, setAnimationStage] = useState(0);
  
  // Braille patterns for "every menu tells a story"
  const brailleSequence = [
    '⠑', '⠧', '⠑', '⠗', '⠽', '⠀', '⠍', '⠑', '⠝', '⠥', '⠀', '⠞', '⠑', '⠇', '⠇', '⠎', '⠀', '⠁', '⠀', '⠎', '⠞', '⠕', '⠗', '⠽'
  ];
  
  const finalText = "every menu tells a story".split('');

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimationStage((prev) => (prev + 1) % 4);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const scrollToNext = () => {
    const element = document.getElementById('impact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center relative bg-slate-900">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side - Content */}
        <div className="space-y-8">
          {/* Animated tagline */}
          <div className="h-12 overflow-hidden">
            <div className="flex flex-wrap items-center gap-1">
              {(animationStage === 0 || animationStage === 2 ? brailleSequence : finalText).map((char, index) => (
                <span
                  key={index}
                  className={`transition-all duration-700 ${
                    animationStage === 0 || animationStage === 2
                      ? 'text-2xl font-mono text-blue-400 opacity-100 transform translate-y-0' 
                      : 'text-2xl font-light text-slate-300 opacity-100 transform translate-y-0'
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>

          {/* Main Headline */}
          <div className="space-y-6">
            <h1 className="text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
              Free braille menus
              <span className="block text-blue-400">for restaurants</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-slate-400 max-w-2xl font-light leading-relaxed">
              No cost. No catch. Just better access for blind and visually impaired diners everywhere.
            </p>
          </div>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              onClick={() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })}
              className="group bg-blue-600 text-white px-8 py-4 text-lg font-medium hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-200 shadow-lg"
            >
              <span className="group-hover:hidden">Build access with us</span>
              <span className="hidden group-hover:inline">Get your free menus</span>
            </button>
            
            <button 
              onClick={() => document.getElementById('workshop')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-slate-600 text-slate-300 px-8 py-4 text-lg font-medium hover:border-blue-400 hover:text-blue-400 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-slate-700"
            >
              Experience braille
            </button>
          </div>
        </div>

        {/* Right Side - Visual Element */}
        <div className="flex justify-center">
          <div className="relative">
            {/* Person-centered image placeholder */}
            <div className="w-80 h-96 bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center text-slate-400 text-lg font-medium shadow-2xl border border-slate-600">
              [Person reading braille menu]
            </div>
            
            {/* Floating braille sample */}
            <div className="absolute -top-4 -right-4 bg-slate-800 border border-slate-600 p-6 shadow-2xl">
              <div className="text-3xl font-mono text-blue-400 leading-relaxed">
                ⠍⠑⠝⠥<br/>
                ⠍⠑⠝⠥
              </div>
              <div className="text-sm text-slate-400 mt-2 font-medium">
                "MENU" in braille
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button 
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce focus:outline-none focus:ring-4 focus:ring-blue-200 rounded-full p-2"
        aria-label="Scroll to next section"
      >
        <ArrowDown className="w-6 h-6 text-slate-400" />
      </button>
    </section>
  );
};

export default Hero;
