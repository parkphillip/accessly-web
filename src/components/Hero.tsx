
import React, { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const [animationStage, setAnimationStage] = useState(0);
  
  // Braille patterns for "ACCESSLY"
  const brailleSequence = [
    '⠁', '⠉', '⠉', '⠑', '⠎', '⠎', '⠇', '⠽'
  ];
  
  const finalLetters = ['A', 'C', 'C', 'E', 'S', 'S', 'L', 'Y'];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (animationStage < 3) {
        setAnimationStage(animationStage + 1);
      }
    }, animationStage === 0 ? 800 : animationStage === 1 ? 2000 : 1000);

    return () => clearTimeout(timer);
  }, [animationStage]);

  const scrollToNext = () => {
    const element = document.getElementById('impact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Animated Brand Name */}
        <div className="mb-12">
          <div className="flex justify-center items-center space-x-2 mb-8">
            {brailleSequence.map((braille, index) => (
              <div key={index} className="relative w-16 h-16 flex items-center justify-center">
                {/* Braille character */}
                <div
                  className={`absolute text-4xl font-mono text-teal-600 transition-all duration-700 ${
                    animationStage === 0 
                      ? 'opacity-0 transform translate-y-4' 
                      : animationStage === 1
                      ? 'opacity-100 transform translate-y-0'
                      : animationStage === 2
                      ? 'opacity-100 transform scale-110'
                      : 'opacity-0 transform scale-0'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {braille}
                </div>
                
                {/* Letter transformation */}
                <div
                  className={`absolute text-5xl font-bold text-slate-800 transition-all duration-700 ${
                    animationStage < 3 
                      ? 'opacity-0 transform scale-0' 
                      : 'opacity-100 transform scale-100'
                  }`}
                  style={{ transitionDelay: `${index * 100 + 500}ms` }}
                >
                  {finalLetters[index]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className={`transition-all duration-1000 ${
          animationStage < 3 ? 'opacity-0 transform translate-y-8' : 'opacity-100 transform translate-y-0'
        }`}>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-800 mb-8 leading-tight">
            Free Braille Menus
            <span className="block text-teal-600 mt-2">for Every Restaurant</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-2xl mx-auto">
            No cost, no catch—just better accessibility for everyone.
          </p>

          <button 
            onClick={() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-10 py-4 rounded-full text-xl font-semibold hover:from-teal-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Get Your Free Menus
          </button>
        </div>
      </div>

      <button 
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
      >
        <ArrowDown className="w-8 h-8 text-slate-500" />
      </button>
    </section>
  );
};

export default Hero;
