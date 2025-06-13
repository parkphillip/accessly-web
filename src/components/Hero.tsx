
import React, { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToNext = () => {
    const element = document.getElementById('impact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center relative bg-white">
      {/* Subtle braille dots pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-32 left-16 w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
        <div className="absolute top-36 left-16 w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
        <div className="absolute top-40 left-20 w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
        <div className="absolute top-44 left-20 w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
        
        <div className="absolute top-64 right-24 w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
        <div className="absolute top-68 right-20 w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
        <div className="absolute top-72 right-24 w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
        
        <div className="absolute bottom-48 left-28 w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
        <div className="absolute bottom-52 left-32 w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          {/* Problem statement first */}
          <div className={`mb-8 transition-all duration-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <p className="text-lg text-gray-600 mb-3">
              Right now, <strong className="text-gray-900">24 million Americans</strong> who are blind or visually impaired 
              have to ask someone else to read them a menu.
            </p>
            <p className="text-lg text-gray-600">
              That's not independence. That's not dignity.
            </p>
          </div>

          {/* Main heading */}
          <h1 className={`text-5xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight transition-all duration-700 delay-200 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            Free Braille Menus
            <span className="block text-gray-700 text-4xl lg:text-5xl mt-2 font-medium">
              for Every Restaurant
            </span>
          </h1>
            
          {/* Solution statement */}
          <div className={`mb-12 transition-all duration-700 delay-400 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <p className="text-xl text-gray-700 mb-6 max-w-2xl leading-relaxed">
              We provide completely free braille menus to any restaurant, anywhere.
            </p>
            <div className="flex items-center gap-2 text-lg">
              <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
              <span className="text-gray-900 font-medium">No cost. No catch. Just better accessibility.</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className={`flex flex-col sm:flex-row items-start gap-4 mb-16 transition-all duration-700 delay-600 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <button 
              onClick={() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gray-900 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-800 transition-colors duration-200 shadow-sm"
            >
              Get Your Free Menus
            </button>
            
            <button 
              onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-gray-700 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-50 transition-colors duration-200 border border-gray-200"
            >
              See How Braille Works
            </button>
          </div>

          {/* Impact stats - more naturally positioned */}
          <div className={`grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl transition-all duration-700 delay-800 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className="text-center sm:text-left">
              <div className="text-3xl font-bold text-gray-900 mb-1">100%</div>
              <div className="text-gray-700 font-medium mb-1">Completely Free</div>
              <div className="text-sm text-gray-500">No hidden costs</div>
            </div>
            
            <div className="text-center sm:text-left">
              <div className="text-3xl font-bold text-gray-900 mb-1">24M+</div>
              <div className="text-gray-700 font-medium mb-1">Americans Need This</div>
              <div className="text-sm text-gray-500">Blind or visually impaired</div>
            </div>
            
            <div className="text-center sm:text-left">
              <div className="text-3xl font-bold text-gray-900 mb-1">48hrs</div>
              <div className="text-gray-700 font-medium mb-1">Average Delivery</div>
              <div className="text-sm text-gray-500">From order to restaurant</div>
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
      >
        <ArrowDown className="w-5 h-5" />
      </button>
    </section>
  );
};

export default Hero;
