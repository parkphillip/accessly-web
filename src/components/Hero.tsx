import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlobeDemo from './GlobeDemo';
import AnimatedText from './AnimatedText';

const Hero = () => {
  return <section id="hero" className="relative flex items-center bg-off-white overflow-visible py-20 lg:py-0 lg:min-h-screen">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-subtle-dots opacity-20 animate-move-bg bg-slate-300"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 w-full">
        <div className="flex flex-wrap lg:flex-nowrap gap-8 items-center min-h-[650px]">
          {/* Left Column: Text Content */}
          <div className="w-full lg:w-2/5 text-center lg:text-left flex flex-col justify-center">
            <div className="px-6 lg:px-0">
              <h1 className="text-4xl lg:text-7xl font-heading font-semibold text-dark-text leading-tight tracking-tight">
                <span className="block mb-1">Building an</span>
                <AnimatedText text={"Accessible"} className="text-brand-navy" />
                <span className="block mt-1">World</span>
              </h1>
              <p className="text-2xl lg:text-4xl text-brand-navy font-normal font-sans mt-4">One Menu at a Time.</p>
              <p className="mt-6 text-lg lg:text-xl text-medium-text max-w-md mx-auto lg:mx-0 leading-relaxed">
                We're building a future where accessibility is standard, not special. Our first initiative: helping restaurants offer braille menus, simply and affordably.
              </p>
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
          <div className="hidden lg:flex lg:w-3/5 min-h-[650px] flex items-center justify-center">
            <GlobeDemo size={650} />
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;
