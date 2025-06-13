
import React from 'react';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const scrollToNext = () => {
    const element = document.getElementById('impact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-stone-100 via-amber-50 to-stone-200 opacity-60"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-stone-800 mb-6 leading-tight">
              Free Braille Menus
              <span className="block text-amber-700">for Every Restaurant</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-stone-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your restaurant into an inclusive space. We provide completely free braille menus 
              to any restaurant, anywhere. No cost, no catch—just better accessibility for everyone.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in">
            <button 
              onClick={() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-amber-700 hover:to-amber-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Get Your Free Menus
            </button>
            
            <button 
              onClick={() => document.getElementById('workshop')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-stone-400 text-stone-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-stone-100 transition-all duration-200"
            >
              Try Braille Workshop
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
            <div className="text-center animate-fade-in">
              <div className="text-3xl font-bold text-amber-700 mb-2">100%</div>
              <div className="text-stone-600">Completely Free</div>
            </div>
            <div className="text-center animate-fade-in">
              <div className="text-3xl font-bold text-amber-700 mb-2">24M+</div>
              <div className="text-stone-600">Americans Need Braille</div>
            </div>
            <div className="text-center animate-fade-in">
              <div className="text-3xl font-bold text-amber-700 mb-2">48hrs</div>
              <div className="text-stone-600">Average Delivery</div>
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
      >
        <ArrowDown className="w-8 h-8 text-stone-500" />
      </button>
    </section>
  );
};

export default Hero;
