
import React, { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const [textRevealed, setTextRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTextRevealed(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const scrollToNext = () => {
    const element = document.getElementById('impact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Enhanced background with moving gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-100 via-amber-50 to-stone-200 opacity-80"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-amber-100/30 to-transparent animate-shimmer bg-[length:200%_200%]"></div>
      
      {/* Floating elements for visual interest */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-amber-200/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-stone-300/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-amber-300/20 rounded-full blur-lg animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <div className="overflow-hidden">
            <h1 className={`text-5xl md:text-7xl font-bold font-playfair text-stone-800 mb-6 leading-tight transition-all duration-1000 ${
              textRevealed ? 'animate-text-reveal' : 'translate-y-full opacity-0'
            }`}>
              Free Braille Menus
              <span className="block text-amber-700 bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                for Every Restaurant
              </span>
            </h1>
          </div>
            
          <p className="text-xl md:text-2xl text-stone-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-up font-inter" style={{ animationDelay: '0.5s' }}>
            Transform your restaurant into an inclusive space. We provide completely free braille menus 
            to any restaurant, anywhere. No cost, no catch—just better accessibility for everyone.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-slide-up" style={{ animationDelay: '0.8s' }}>
            <button 
              onClick={() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative bg-gradient-to-r from-amber-600 to-amber-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-amber-700 hover:to-amber-800 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 animate-glow overflow-hidden"
            >
              <span className="relative z-10">Get Your Free Menus</span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button 
              onClick={() => document.getElementById('workshop')?.scrollIntoView({ behavior: 'smooth' })}
              className="relative border-2 border-stone-400 text-stone-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-stone-100 transition-all duration-300 hover:border-amber-500 hover:text-amber-700 hover:scale-105 hover:shadow-lg overflow-hidden group"
            >
              <span className="relative z-10">Try Braille Workshop</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-amber-50 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
            {[
              { value: "100%", label: "Completely Free", delay: "1s" },
              { value: "24M+", label: "Americans Need Braille", delay: "1.2s" },
              { value: "48hrs", label: "Average Delivery", delay: "1.4s" }
            ].map((stat, index) => (
              <div key={index} className="text-center animate-slide-up hover:scale-110 transition-transform duration-300" style={{ animationDelay: stat.delay }}>
                <div className="text-4xl font-bold font-playfair text-amber-700 mb-2 hover:animate-glow">{stat.value}</div>
                <div className="text-stone-600 font-inter">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button 
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hover:animate-pulse hover:scale-125 transition-transform duration-300"
      >
        <ArrowDown className="w-8 h-8 text-stone-500 hover:text-amber-600" />
      </button>
    </section>
  );
};

export default Hero;
