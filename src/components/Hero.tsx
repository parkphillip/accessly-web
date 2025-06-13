
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
      setAnimationStage((prev) => (prev + 1) % 4);
    }, animationStage === 0 ? 1000 : animationStage === 1 ? 3000 : animationStage === 2 ? 3000 : 2000);

    return () => clearTimeout(timer);
  }, [animationStage]);

  const scrollToNext = () => {
    const element = document.getElementById('impact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center relative bg-slate-50">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side - Content */}
        <div className="lg:col-span-7 space-y-8">
          {/* Animated Brand Name */}
          <div className="mb-8">
            <div className="flex items-baseline space-x-1">
              {brailleSequence.map((braille, index) => (
                <div key={index} className="relative">
                  {/* Braille character */}
                  <div
                    className={`text-4xl font-mono text-teal-700 transition-all duration-500 ${
                      animationStage === 0 || animationStage === 2
                        ? 'opacity-100 transform translate-y-0' 
                        : 'opacity-0 transform translate-y-2'
                    }`}
                    style={{ transitionDelay: `${index * 80}ms` }}
                  >
                    {braille}
                  </div>
                  
                  {/* Letter transformation */}
                  <div
                    className={`absolute inset-0 text-4xl font-bold text-slate-900 transition-all duration-500 ${
                      animationStage === 1 || animationStage === 3
                        ? 'opacity-100 transform translate-y-0' 
                        : 'opacity-0 transform translate-y-2'
                    }`}
                    style={{ transitionDelay: `${index * 80}ms` }}
                  >
                    {finalLetters[index]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Headline */}
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-tight tracking-tight">
              Free braille menus
              <span className="block text-teal-700">for every restaurant</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-slate-700 max-w-2xl font-light leading-relaxed">
              No cost. No catch. Just better access for blind and visually impaired diners everywhere.
            </p>
          </div>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              onClick={() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })}
              className="group bg-teal-700 text-white px-8 py-4 text-lg font-medium hover:bg-teal-800 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-teal-200"
            >
              <span className="group-hover:hidden">Join the movement</span>
              <span className="hidden group-hover:inline">Get your free menus</span>
            </button>
            
            <button 
              onClick={() => document.getElementById('workshop')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-slate-400 text-slate-700 px-8 py-4 text-lg font-medium hover:border-teal-700 hover:text-teal-700 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-slate-200"
            >
              Learn about braille
            </button>
          </div>
        </div>

        {/* Right Side - Visual Element */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative">
            {/* Person-centered image placeholder */}
            <div className="w-80 h-96 bg-gradient-to-br from-teal-100 to-slate-200 flex items-center justify-center text-slate-600 text-lg font-medium shadow-2xl">
              [Person reading braille menu]
            </div>
            
            {/* Floating braille sample */}
            <div className="absolute -top-4 -right-4 bg-white p-6 shadow-lg">
              <div className="text-3xl font-mono text-teal-700 leading-relaxed">
                ⠍⠑⠝⠥<br/>
                ⠍⠑⠝⠥
              </div>
              <div className="text-sm text-slate-600 mt-2 font-medium">
                "MENU" in braille
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button 
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce focus:outline-none focus:ring-4 focus:ring-teal-200 rounded-full p-2"
        aria-label="Scroll to next section"
      >
        <ArrowDown className="w-6 h-6 text-slate-600" />
      </button>
    </section>
  );
};

export default Hero;
