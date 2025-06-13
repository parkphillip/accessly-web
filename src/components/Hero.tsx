
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
      } else {
        // Reset to start the cycle again
        setAnimationStage(0);
      }
    }, animationStage === 0 ? 800 : animationStage === 1 ? 2000 : animationStage === 2 ? 2000 : 3000);

    return () => clearTimeout(timer);
  }, [animationStage]);

  const scrollToNext = () => {
    const element = document.getElementById('impact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Animated Brand Name */}
        <div className="mb-16">
          <div className="flex justify-center items-center space-x-3 mb-12">
            {brailleSequence.map((braille, index) => (
              <div key={index} className="relative w-20 h-20 flex items-center justify-center">
                {/* Braille character */}
                <div
                  className={`absolute text-5xl font-mono text-teal-600 transition-all duration-700 ${
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
                  className={`absolute text-6xl font-bold text-slate-800 transition-all duration-700 ${
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
          <h1 className="text-6xl md:text-8xl font-bold text-slate-800 mb-8 leading-tight">
            Free Braille Menus
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 mt-4">
              for Every Restaurant
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-slate-600 mb-16 max-w-3xl mx-auto font-light">
            No cost, no catch—just better accessibility for everyone.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button 
              onClick={() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-12 py-5 rounded-full text-xl font-semibold hover:from-teal-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Get Your Free Menus
            </button>
            
            <button 
              onClick={() => document.getElementById('workshop')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-slate-300 text-slate-700 px-12 py-5 rounded-full text-xl font-semibold hover:border-teal-600 hover:text-teal-700 transition-all duration-200"
            >
              Learn About Braille
            </button>
          </div>
        </div>

        {/* Features Preview */}
        <div className={`mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 delay-500 ${
          animationStage < 3 ? 'opacity-0 transform translate-y-8' : 'opacity-100 transform translate-y-0'
        }`}>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl">⠠</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Professional Quality</h3>
            <p className="text-slate-600">Restaurant-grade braille menus printed on durable materials</p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl">⠏</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Fast Delivery</h3>
            <p className="text-slate-600">Your custom braille menus delivered within 5-7 business days</p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl">⠓</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Completely Free</h3>
            <p className="text-slate-600">No hidden costs, no subscriptions - just better accessibility</p>
          </div>
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
