
import React, { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [typewriterText, setTypewriterText] = useState('');
  const fullText = "Free Braille Menus";

  useEffect(() => {
    setIsLoaded(true);
    
    // Typewriter effect for main heading
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypewriterText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const scrollToNext = () => {
    const element = document.getElementById('impact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative bg-white overflow-hidden">
      {/* Subtle braille-inspired background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-2 h-2 bg-gray-900 rounded-full"></div>
        <div className="absolute top-24 left-20 w-2 h-2 bg-gray-900 rounded-full"></div>
        <div className="absolute top-28 left-20 w-2 h-2 bg-gray-900 rounded-full"></div>
        <div className="absolute top-32 left-24 w-2 h-2 bg-gray-900 rounded-full"></div>
        <div className="absolute top-36 left-24 w-2 h-2 bg-gray-900 rounded-full"></div>
        <div className="absolute top-40 left-24 w-2 h-2 bg-gray-900 rounded-full"></div>
        
        <div className="absolute top-60 right-32 w-2 h-2 bg-gray-900 rounded-full"></div>
        <div className="absolute top-64 right-32 w-2 h-2 bg-gray-900 rounded-full"></div>
        <div className="absolute top-68 right-28 w-2 h-2 bg-gray-900 rounded-full"></div>
        
        <div className="absolute bottom-40 left-32 w-2 h-2 bg-gray-900 rounded-full"></div>
        <div className="absolute bottom-44 left-36 w-2 h-2 bg-gray-900 rounded-full"></div>
        <div className="absolute bottom-48 left-32 w-2 h-2 bg-gray-900 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left column - Main content */}
          <div className="text-left">
            <div className="mb-6">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
                Making dining accessible for everyone
              </div>
            </div>

            <h1 className={`text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <span className="relative">
                {typewriterText}
                <span className="animate-pulse">|</span>
              </span>
              <span className="block text-gray-600 mt-2">
                for Every Restaurant
              </span>
            </h1>
              
            <p className={`text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed transition-all duration-700 delay-300 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <strong className="text-gray-900">24 million Americans</strong> who are blind or visually impaired 
              shouldn't have to ask someone else to read them a menu. We provide completely free braille menus 
              to any restaurant, anywhere.
            </p>

            <div className={`flex flex-col sm:flex-row items-start gap-4 mb-12 transition-all duration-700 delay-500 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <button 
                onClick={() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })}
                className="group bg-gray-900 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Get Your Free Menus
                <div className="w-full h-0.5 bg-amber-400 mt-2 scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
              </button>
              
              <button 
                onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
              >
                See How Braille Works
              </button>
            </div>

            <div className={`text-sm text-gray-500 transition-all duration-700 delay-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <span className="font-medium text-gray-700">No cost. No catch.</span> Just better accessibility.
            </div>
          </div>

          {/* Right column - Impact stats with tactile cards */}
          <div className={`space-y-6 transition-all duration-700 delay-400 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            {[
              { 
                value: "100%", 
                label: "Completely Free", 
                desc: "No hidden fees or costs",
                accent: "border-l-4 border-l-green-400"
              },
              { 
                value: "24M", 
                label: "Americans Need Braille", 
                desc: "People who are blind or visually impaired",
                accent: "border-l-4 border-l-amber-400"
              },
              { 
                value: "48hrs", 
                label: "Average Delivery", 
                desc: "From order to your restaurant",
                accent: "border-l-4 border-l-blue-400"
              }
            ].map((stat, index) => (
              <div 
                key={index} 
                className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${stat.accent}`}
                style={{ 
                  animationDelay: `${600 + index * 100}ms`,
                  filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.05))'
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-gray-700 font-medium mb-1">{stat.label}</div>
                    <div className="text-sm text-gray-500">{stat.desc}</div>
                  </div>
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button 
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200 animate-bounce"
      >
        <ArrowDown className="w-6 h-6" />
      </button>
    </section>
  );
};

export default Hero;
