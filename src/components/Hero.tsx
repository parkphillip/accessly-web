import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlobeDemo from './GlobeDemo';
import AnimatedText from './AnimatedText';

const Hero = () => {
  return <section id="hero" className="relative min-h-screen flex items-center bg-off-white overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-subtle-dots opacity-20 animate-move-bg bg-slate-300"></div>
      
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex flex-wrap lg:flex-nowrap gap-8 items-center">
          {/* Left Column: Text Content */}
          <div className="w-full lg:flex-shrink-0 lg:w-2/5 text-center lg:text-left">
            <div>
              <h1 className="text-5xl lg:text-7xl font-heading font-semibold text-dark-text leading-tight tracking-tight">
                <span className="block mb-1">Building an</span>
                <AnimatedText text={"Accessible"} className="text-brand-navy" />
                <span className="block mt-1">World</span>
              </h1>
              <p className="text-3xl lg:text-4xl text-brand-navy font-normal font-sans mt-4">One Menu at a Time</p>
              <p className="mt-6 text-lg lg:text-xl text-medium-text max-w-2xl mx-auto lg:mx-0 leading-relaxed">Accessly is a civic startup building a future where access is standard, not special. We're starting with
free braille menus for every restaurant.</p>
            </div>

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center lg:justify-start items-center">
              <Link to="/partner" className="primary-button inline-flex items-center gap-2 px-[16px]">
                
                Apply to be a Partner
              </Link>
              <Link to="/fund" className="font-medium text-brand-navy hover:underline text-base flex items-center gap-2 group">
                Fund Our Mission
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Column: Globe */}
          <div className="hidden lg:flex w-full lg:w-3/5 justify-center items-center relative min-h-[650px]">
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
              <GlobeDemo size={650} />
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;
