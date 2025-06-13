
import React, { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const [animationStage, setAnimationStage] = useState(0);
  
  // Braille patterns for "ACCESSLY" - simplified representation
  const brailleSequence = [
    '⠁', '⠉', '⠉', '⠑', '⠎', '⠎', '⠇', '⠽'
  ];
  
  const finalText = ['A', 'C', 'C', 'E', 'S', 'S', 'L', 'Y'];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (animationStage < 3) {
        setAnimationStage(animationStage + 1);
      }
    }, animationStage === 0 ? 1000 : animationStage === 1 ? 2000 : 1500);

    return () => clearTimeout(timer);
  }, [animationStage]);

  const scrollToNext = () => {
    const element = document.getElementById('impact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 opacity-80"></div>
      
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Animated Braille Brand Name */}
          <div className="mb-8">
            <div className="flex justify-center items-center space-x-2 mb-4">
              {brailleSequence.map((braille, index) => (
                <div
                  key={index}
                  className={`text-4xl font-mono transition-all duration-500 ${
                    animationStage === 0 
                      ? 'opacity-0 transform translate-y-4' 
                      : animationStage === 1
                      ? 'opacity-100 text-slate-800'
                      : 'opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {braille}
                </div>
              ))}
            </div>
            
            <div className="flex justify-center items-center space-x-1">
              {finalText.map((letter, index) => (
                <div
                  key={index}
                  className={`text-5xl md:text-6xl font-bold text-slate-800 transition-all duration-500 ${
                    animationStage < 2 
                      ? 'opacity-0 transform scale-0' 
                      : 'opacity-100 transform scale-100'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {letter}
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className={`transition-all duration-1000 ${
            animationStage < 3 ? 'opacity-0 transform translate-y-8' : 'opacity-100 transform translate-y-0'
          }`}>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight">
              Free Braille Menus
              <span className="block text-teal-700">for Every Restaurant</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your restaurant into an inclusive space. We provide completely free braille menus 
              to any restaurant, anywhere. No cost, no catch—just better accessibility for everyone.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <button 
                onClick={() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-teal-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Get Your Free Menus
              </button>
              
              <button 
                onClick={() => document.getElementById('workshop')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-slate-400 text-slate-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-slate-100 transition-all duration-200"
              >
                Try Braille Workshop
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-700 mb-2">100%</div>
                <div className="text-slate-600">Completely Free</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-700 mb-2">2.2M+</div>
                <div className="text-slate-600">Braille Readers in US</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-700 mb-2">48hrs</div>
                <div className="text-slate-600">Average Delivery</div>
              </div>
            </div>
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
