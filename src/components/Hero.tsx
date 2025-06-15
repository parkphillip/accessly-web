import React from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlobeDemo from './GlobeDemo';
import AnimatedText from './AnimatedText';
const Hero = () => {
  const scrollToNext = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <section id="hero" className="relative min-h-screen flex items-center bg-off-white overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-subtle-dots opacity-20 animate-move-bg bg-slate-300"></div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 lg:gap-16 items-center">
        
        {/* Left Column: Text Content */}
        <div className="text-center lg:text-left">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-7xl font-heading font-bold text-dark-text leading-tight tracking-tight">
              Building an <AnimatedText text={"Accessible"} className="text-brand-navy font-mono" />
              <span style={{
              display: 'block',
              lineHeight: '1.1',
              minHeight: '1.2em'
            }} className="text-brand-navy font-heading font-semibold">
                World
              </span>
              <span className="block text-3xl lg:text-4xl text-medium-text font-normal font-sans mt-4">One Menu at a Time</span>
            </h1>
            <p className="mt-6 text-lg lg:text-xl text-medium-text max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Accessly is a civic startup building a future where access is standard, not special. We're starting with free braille menus for every restaurant.
            </p>
          </div>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center lg:justify-start items-center">
            <Link to="/partner" className="primary-button inline-flex items-center gap-2 px-[18px]">
              <span className="w-1.5 h-1.5 bg-brand-terracotta rounded-full"></span>
              Apply to be a Partner
            </Link>
            <Link to="/fund" className="font-medium text-brand-navy hover:underline text-base flex items-center gap-2 group">
              Fund Our Mission
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
        
        {/* Right Column: Globe */}
        <div className="hidden lg:flex justify-center items-center relative w-full h-[500px]">
          <div className="absolute w-full h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <GlobeDemo />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button onClick={() => scrollToNext('impact')} className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 group flex flex-col items-center gap-2 text-medium-text hover:text-dark-text transition-colors z-10" aria-label="Scroll to next section">
        <span className="font-sans text-sm py-0 my-0 text-center font-normal">Explore</span>
        <ArrowDown className="w-5 h-5 animate-bounce" />
      </button>
    </section>;
};
export default Hero;