import React, { useState, useEffect } from 'react';
import { ArrowDown, Edit3 } from 'lucide-react';
import alee from '/public/placeholder.svg';
const Hero = () => {
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  // Braille and English text
  const brailleText = '⠑⠧⠑⠗⠽ ⠍⠑⠝⠥ ⠞⠑⠇⠇⠎ ⠁ ⠎⠞⠕⠗⠽';
  const englishText = 'every menu tells a story';
  useEffect(() => {
    const typingSequence = async () => {
      setIsTyping(true);
      setCurrentText('');

      // Type braille text
      for (let i = 0; i <= brailleText.length; i++) {
        setCurrentText(brailleText.substring(0, i));
        await new Promise(resolve => setTimeout(resolve, 80));
      }

      // Pause
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Clear and type English
      setCurrentText('');
      await new Promise(resolve => setTimeout(resolve, 200));
      for (let i = 0; i <= englishText.length; i++) {
        setCurrentText(englishText.substring(0, i));
        await new Promise(resolve => setTimeout(resolve, 60));
      }

      // Pause before restarting
      await new Promise(resolve => setTimeout(resolve, 3000));
      setIsTyping(false);
    };
    const interval = setInterval(typingSequence, 8000);
    typingSequence(); // Start immediately

    return () => clearInterval(interval);
  }, []);

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);
  const scrollToNext = () => {
    const element = document.getElementById('impact');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <section id="hero" className="min-h-screen flex items-center bg-light-bg py-32 md:py-24">
      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side - Content */}
        <div className="space-y-8 z-10">
          <h1 className="text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-dark-text leading-tight">
            Dignity on the Menu.
            <span className="block text-brand-navy">Accessibility for All.</span>
          </h1>
          
          <p className="text-lg lg:text-xl text-medium-text max-w-xl leading-relaxed">
            We provide high-quality, durable braille menus to restaurants, empowering visually impaired diners with independence. No cost, no catch—just a commitment to a more inclusive world.
          </p>
          
          {/* Typing Animation */}
          <div className="structured-card p-4">
            <div className="h-12 flex items-center border-b border-light-gray mb-3">
              <Edit3 className="w-5 h-5 text-medium-text mr-3 shrink-0" />
              <span className="text-base font-mono text-dark-text tracking-wider overflow-x-hidden whitespace-nowrap">
                {currentText}
                <span className="inline-block w-px h-5 bg-dark-text ml-1 animate-blink border border-dark-text" />
              </span>
            </div>
            <div className="text-xs text-medium-text font-mono">Grade 2 Braille Translation</div>
          </div>

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

      {/* Scroll indicator */}
      <button onClick={scrollToNext} className="absolute bottom-8 left-1/2 -translate-x-1/2 group flex flex-col items-center gap-2 text-medium-text hover:text-dark-text transition-colors" aria-label="Scroll to next section">
        <span className="font-sans text-sm py-0 my-0 text-center font-normal">Explore</span>
        <ArrowDown className="w-5 h-5 animate-bounce" />
      </button>
    </section>;
};
export default Hero;