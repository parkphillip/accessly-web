
import React, { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const [textRevealed, setTextRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTextRevealed(true), 300);
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
      <div className="absolute inset-0 bg-gradient-to-br from-stone-100 via-amber-50 to-stone-200"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h1 className={`text-5xl md:text-7xl font-bold font-playfair text-stone-800 mb-6 leading-tight transition-all duration-800 ${
            textRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Free Braille Menus
            <span className="block text-amber-700">
              for Every Restaurant
            </span>
          </h1>
            
          <p className="text-xl md:text-2xl text-stone-600 mb-8 max-w-3xl mx-auto leading-relaxed font-inter opacity-0 animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            Transform your restaurant into an inclusive space. We provide completely free braille menus 
            to any restaurant, anywhere. No cost, no catch—just better accessibility for everyone.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 opacity-0 animate-fade-in" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            <button 
              onClick={() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-amber-700 hover:to-amber-800 transition-all duration-200 shadow-lg hover:scale-105"
            >
              Get Your Free Menus
            </button>
            
            <button 
              onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-stone-400 text-stone-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-stone-100 transition-all duration-200 hover:border-amber-500 hover:text-amber-700"
            >
              See Braille Demo
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
            {[
              { value: "100%", label: "Completely Free", delay: "0.8s" },
              { value: "24M+", label: "Americans Need Braille", delay: "1s" },
              { value: "48hrs", label: "Average Delivery", delay: "1.2s" }
            ].map((stat, index) => (
              <div key={index} className="text-center opacity-0 animate-fade-in" style={{ animationDelay: stat.delay, animationFillMode: 'forwards' }}>
                <div className="text-4xl font-bold font-playfair text-amber-700 mb-2">{stat.value}</div>
                <div className="text-stone-600 font-inter">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button 
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hover:text-amber-600 transition-colors duration-200"
      >
        <ArrowDown className="w-8 h-8 text-stone-500" />
      </button>
    </section>
  );
};

export default Hero;
