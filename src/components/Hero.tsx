
import React, { useState, useEffect } from 'react';
import { ArrowDown, Heart, MapPin } from 'lucide-react';

const Hero = () => {
  const [typewriterText, setTypewriterText] = useState('');
  const fullText = 'Every person deserves the dignity of reading their own menu.';

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypewriterText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  const scrollToImpact = () => {
    const element = document.getElementById('impact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-paper via-warm-tan/20 to-cream relative overflow-hidden pt-24">
      {/* Background texture elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-32 h-32 bg-sage/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-32 right-32 w-48 h-48 bg-dusty-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-coffee/10 rounded-full blur-xl"></div>
      </div>

      <div className="max-w-8xl mx-auto px-8 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left column - Main content */}
          <div className="space-y-12">
            {/* Handwritten note at top */}
            <div className="font-script text-2xl text-sage transform -rotate-2 mb-8">
              Started by people who care ♡
            </div>

            <div className="relative">
              <h1 className="text-6xl lg:text-8xl font-serif font-bold text-charcoal leading-tight mb-8">
                Free Braille
                <br />
                <span className="relative inline-block">
                  Menus
                  {/* Hand-drawn circle around "Menus" */}
                  <svg className="absolute -inset-4 w-full h-full pointer-events-none" viewBox="0 0 200 80">
                    <ellipse cx="100" cy="40" rx="90" ry="35" stroke="#8a9a7d" strokeWidth="3" fill="none" strokeDasharray="8,4" opacity="0.6" transform="rotate(-2 100 40)" />
                  </svg>
                </span>
                <br />
                for Every Restaurant
              </h1>

              {/* Sticky note style callout */}
              <div className="absolute -top-4 -right-16 bg-cream p-6 shadow-paper rounded transform rotate-6 border-l-4 border-dusty-blue/50">
                <div className="font-script text-lg text-charcoal">Yes, completely free!</div>
              </div>
            </div>

            {/* Typewriter subtitle */}
            <div className="text-2xl lg:text-3xl text-pencil font-light leading-relaxed h-20 flex items-center">
              <span className="font-serif">{typewriterText}</span>
              <span className="typewriter-cursor"></span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 pt-8">
              <button 
                onClick={() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })}
                className="group bg-gradient-to-r from-sage to-dusty-blue text-cream px-12 py-6 rounded-2xl font-serif font-semibold text-xl hover:shadow-paper-lift transition-all duration-300 flex items-center justify-center gap-4 shadow-paper transform hover:-rotate-1 relative"
              >
                <Heart className="w-6 h-6" />
                <span>Get Your Free Menus</span>
                
                {/* Handwritten arrow pointing to button */}
                <div className="absolute -top-8 -right-8 font-script text-sage text-lg transform rotate-12">
                  <span>Start here!</span>
                  <div className="w-16 h-8 relative mt-1">
                    <svg viewBox="0 0 64 32" className="absolute inset-0">
                      <path d="M2 25 Q 32 10 58 20" stroke="#8a9a7d" strokeWidth="2" fill="none" strokeLinecap="round" />
                      <polygon points="55,18 58,20 55,22" fill="#8a9a7d" />
                    </svg>
                  </div>
                </div>
              </button>

              <button 
                onClick={scrollToImpact}
                className="group bg-paper text-charcoal px-10 py-6 rounded-2xl font-serif font-semibold text-xl hover:bg-cream/80 border-2 border-warm-gray/50 hover:border-dusty-blue/50 transition-all duration-300 flex items-center justify-center gap-4 shadow-paper hover:shadow-paper-lift transform hover:rotate-1"
              >
                <span>See Our Impact</span>
                <ArrowDown className="w-5 h-5 group-hover:animate-bounce" />
              </button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-12 pt-12 opacity-80">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-sage rounded-full"></div>
                <span className="text-pencil font-light">847+ Restaurants</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-dusty-blue rounded-full"></div>
                <span className="text-pencil font-light">12,500+ Customers Served</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-coffee rounded-full"></div>
                <span className="text-pencil font-light">Always Free</span>
              </div>
            </div>
          </div>

          {/* Right column - Visual element */}
          <div className="relative">
            {/* Main paper card with braille simulation */}
            <div className="paper-card p-12 rounded-3xl shadow-paper-lift transform rotate-2 relative">
              <div className="mb-8">
                <h3 className="text-3xl font-serif font-bold text-charcoal mb-6">Sample Menu</h3>
                
                {/* Braille dots simulation */}
                <div className="space-y-6">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center gap-4">
                      {/* Braille dots pattern */}
                      <div className="grid grid-cols-2 gap-1 w-8">
                        {Array.from({ length: 6 }).map((_, j) => (
                          <div key={j} className="w-1.5 h-1.5 bg-charcoal rounded-full opacity-60"></div>
                        ))}
                      </div>
                      {/* Menu item line */}
                      <div className="flex-1 h-1 bg-warm-gray/40 rounded transform rotate-1"></div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Restaurant location pin */}
              <div className="absolute -top-4 -right-4 bg-dusty-blue/20 p-4 rounded-full shadow-paper transform -rotate-12">
                <MapPin className="w-6 h-6 text-dusty-blue" />
              </div>
              
              {/* Handwritten note */}
              <div className="absolute -bottom-6 -left-6 font-script text-lg text-sage transform rotate-6 bg-cream p-4 rounded shadow-paper">
                Tactile & dignified ♡
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-8 -left-8 w-16 h-16 bg-sage/20 rounded-full shadow-paper transform rotate-45 opacity-60"></div>
            <div className="absolute -bottom-4 -right-8 w-12 h-20 bg-coffee/20 rounded shadow-paper transform -rotate-12 opacity-70"></div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-14 border-2 border-sage/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-sage/50 rounded-full mt-3 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
