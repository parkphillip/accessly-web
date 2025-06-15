
import React from 'react';
import { ArrowDown } from 'lucide-react';
import alee from '/public/placeholder.svg';

const Hero = () => {
  const scrollToNext = () => {
    const element = document.getElementById('impact');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return (
    <section id="hero" className="relative min-h-screen flex items-center bg-light-bg py-32 md:py-24">
      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side - Content */}
        <div className="space-y-8 z-10">
          <h1 className="text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-dark-text leading-tight">
            Braille Menus
            <span className="block text-brand-navy">on <span className="italic text-brand-terracotta">Every</span> Table.</span>
          </h1>
          
          <p className="text-lg lg:text-xl text-medium-text max-w-xl leading-relaxed">
            Accessly is a civic startup making public spaces accessible—starting with braille menus. We're building toward a future where access is standard, not special.
          </p>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button onClick={() => document.getElementById('order')?.scrollIntoView({
            behavior: 'smooth'
          })} className="primary-button">
              Get Your Free Menus
            </button>
            
            <button onClick={() => document.getElementById('impact')?.scrollIntoView({
            behavior: 'smooth'
          })} className="secondary-button">
              See Our Impact
            </button>
          </div>
        </div>

        {/* Right Side - Visual */}
        <div className="relative flex justify-center items-center h-full">
          <div className="relative w-[320px] h-[400px] lg:w-[400px] lg:h-[500px]">
            <div className="absolute inset-0 bg-subtle-gray rounded-2xl transform -rotate-3"></div>
            <img src={alee} alt="Person reading a braille menu in a restaurant" className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-strong" />
            <div className="absolute -bottom-8 -right-8 structured-card p-4 text-center">
              <div className="text-4xl font-mono text-brand-navy tracking-widest">⠍⠑⠝⠥</div>
              <div className="text-sm font-medium text-medium-text mt-2">"Menu" in Braille</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - Fixed positioning for better full screen support */}
      <button 
        onClick={scrollToNext} 
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 group flex flex-col items-center gap-2 text-medium-text hover:text-dark-text transition-colors z-10" 
        aria-label="Scroll to next section"
      >
        <span className="font-sans text-sm py-0 my-0 text-center font-normal">Explore</span>
        <ArrowDown className="w-5 h-5 animate-bounce" />
      </button>
    </section>
  );
};

export default Hero;
