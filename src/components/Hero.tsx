
import React, { useState, useEffect } from 'react';
import { ArrowDown, Edit3 } from 'lucide-react';

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
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center relative bg-cream overflow-hidden">
      {/* Scattered paper elements */}
      <div className="absolute top-20 left-10 w-20 h-16 bg-warm-tan shadow-paper rounded-lg transform rotate-12 opacity-60"></div>
      <div className="absolute top-40 right-20 w-16 h-12 bg-paper shadow-paper rounded transform -rotate-6 opacity-40"></div>
      <div className="absolute bottom-32 left-1/3 w-24 h-20 bg-warm-gray/30 shadow-paper rounded-lg transform rotate-6 opacity-30"></div>
      
      <div className="relative w-full mx-auto px-6 lg:px-12 xl:px-16 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* Left Side - Content */}
        <div className="space-y-12 relative">
          {/* Handwritten arrow pointing to typewriter */}
          <div className="absolute -top-8 left-20 font-script text-pencil text-sm transform -rotate-12">
            <span>watch the magic!</span>
            <div className="w-16 h-8 relative">
              <svg className="absolute inset-0" viewBox="0 0 64 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 24 Q 32 8 56 16" stroke="#6b6b6b" strokeWidth="2" fill="none" strokeLinecap="round"/>
                <polygon points="54,14 56,16 54,18" fill="#6b6b6b"/>
              </svg>
            </div>
          </div>

          {/* Typing Animation with typewriter aesthetic */}
          <div className="paper-card p-6 transform rotate-1">
            <div className="h-16 flex items-center border-b border-warm-gray/30 mb-4">
              <Edit3 className="w-5 h-5 text-pencil mr-3" />
              <span className="text-lg font-mono text-charcoal tracking-wider">
                {currentText}
                <span className={`inline-block w-0.5 h-6 bg-charcoal ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`} />
              </span>
            </div>
            <div className="text-xs text-pencil font-mono">OUTPUT: Real-time braille translation</div>
          </div>

          {/* Main Headline with handwritten touches */}
          <div className="space-y-8 relative">
            <h1 className="text-6xl lg:text-7xl xl:text-8xl font-serif font-bold text-charcoal leading-[0.9]">
              Free braille menus
              <span className="block text-sage mt-4 scribble-underline">for restaurants</span>
            </h1>
            
            {/* Handwritten note */}
            <div className="absolute -right-4 top-32 font-script text-dusty-blue text-lg transform rotate-6 bg-cream p-3 shadow-paper rounded border-l-4 border-sage/30">
              No cost,<br/>no catch!
            </div>
            
            <p className="text-xl lg:text-2xl xl:text-3xl text-pencil max-w-2xl leading-relaxed font-light">
              Making dining accessible through the simple power of touch. 
              <span className="font-script text-sage">Every dot matters.</span>
            </p>
          </div>

          {/* Call to Action with paper aesthetic */}
          <div className="flex flex-col sm:flex-row gap-6 pt-6">
            <button 
              onClick={() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative bg-sage text-cream px-10 py-5 text-lg font-medium rounded-lg hover:bg-dusty-blue transition-all duration-300 transform hover:scale-105 hover:-rotate-1 shadow-paper hover:shadow-paper-lift"
            >
              <span className="relative z-10">Start your journey</span>
            </button>
            
            <button 
              onClick={() => document.getElementById('workshop')?.scrollIntoView({ behavior: 'smooth' })}
              className="paper-card text-charcoal px-10 py-5 text-lg font-medium hover:bg-warm-tan/50 transition-all duration-300 transform hover:scale-105 hover:rotate-1"
            >
              Feel the braille
            </button>
          </div>
        </div>

        {/* Right Side - Tactile Visual */}
        <div className="flex justify-center relative">
          <div className="relative">
            {/* Main image placeholder with polaroid style */}
            <div className="w-80 h-96 bg-warm-tan rounded-lg flex flex-col items-center justify-center text-pencil text-lg font-medium shadow-paper-lift border-8 border-cream transform -rotate-2">
              <div className="text-center mb-4">
                <div className="w-32 h-24 bg-warm-gray/40 rounded-lg mb-4 flex items-center justify-center">
                  📸
                </div>
                <div className="text-sm">Person reading</div>
                <div className="text-sm">braille menu</div>
              </div>
              {/* Polaroid caption */}
              <div className="absolute bottom-6 font-script text-charcoal">
                Independence in action
              </div>
            </div>
            
            {/* Floating braille sample with paper texture */}
            <div className="absolute -top-4 -right-8 paper-card p-6 transform rotate-6 shadow-paper-lift">
              <div className="text-3xl font-mono text-sage leading-relaxed tracking-wide mb-3">
                ⠍⠑⠝⠥<br/>
                ⠍⠑⠝⠥
              </div>
              <div className="text-sm text-pencil font-medium border-t border-warm-gray/30 pt-2">
                "MENU" in braille
              </div>
              {/* Hand-drawn arrow */}
              <div className="absolute -left-8 top-4 w-12 h-6">
                <svg viewBox="0 0 48 24" className="w-full h-full">
                  <path d="M2 12 Q 24 4 42 12" stroke="#8a9a7d" strokeWidth="2" fill="none" strokeLinecap="round"/>
                  <polygon points="40,10 42,12 40,14" fill="#8a9a7d"/>
                </svg>
              </div>
            </div>

            {/* Scattered sticky notes */}
            <div className="absolute -left-12 bottom-20 bg-cream p-3 shadow-paper rounded transform -rotate-12 border-l-4 border-dusty-blue/50">
              <div className="font-script text-sm text-charcoal">
                Touch<br/>changes<br/>everything
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator with hand-drawn style */}
      <button 
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce focus:outline-none focus:ring-4 focus:ring-sage/30 rounded-full p-4 hover:bg-warm-tan/30 transition-colors group"
        aria-label="Scroll to next section"
      >
        <ArrowDown className="w-6 h-6 text-pencil group-hover:text-sage transition-colors" />
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 font-script text-xs text-pencil whitespace-nowrap">
          keep reading ↓
        </div>
      </button>
    </section>
  );
};

export default Hero;
