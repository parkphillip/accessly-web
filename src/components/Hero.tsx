
import React, { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';

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
    <section id="hero" className="min-h-screen flex items-center relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),transparent)]" />
      
      <div className="relative max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* Left Side - Content */}
        <div className="space-y-10">
          {/* Typing Animation */}
          <div className="h-14 flex items-center">
            <span className="text-2xl font-mono text-blue-300 tracking-wider">
              {currentText}
              <span className={`inline-block w-0.5 h-6 bg-blue-300 ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`} />
            </span>
          </div>

          {/* Main Headline */}
          <div className="space-y-8">
            <h1 className="text-6xl lg:text-7xl font-bold text-white leading-[0.9] tracking-tight">
              Free braille menus
              <span className="block text-blue-300 mt-2">for restaurants</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-slate-300 max-w-2xl leading-relaxed font-light">
              No cost. No catch. Just better access for blind and visually impaired diners everywhere.
            </p>
          </div>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-6 pt-6">
            <button 
              onClick={() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative bg-gradient-to-r from-blue-600 to-blue-500 text-white px-10 py-5 text-lg font-medium rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-[1.02] shadow-xl hover:shadow-blue-500/25"
            >
              <span className="relative z-10">Build access with us</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            
            <button 
              onClick={() => document.getElementById('workshop')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-slate-600 text-slate-300 px-10 py-5 text-lg font-medium rounded-lg hover:border-blue-400 hover:text-blue-300 hover:bg-slate-700/30 transition-all duration-300 transform hover:scale-[1.02]"
            >
              Experience braille
            </button>
          </div>
        </div>

        {/* Right Side - Visual Element */}
        <div className="flex justify-center">
          <div className="relative">
            {/* Main image placeholder */}
            <div className="w-80 h-96 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl flex items-center justify-center text-slate-400 text-lg font-medium shadow-2xl border border-slate-600/50 backdrop-blur-sm">
              [Person reading braille menu]
            </div>
            
            {/* Floating braille sample */}
            <div className="absolute -top-4 -right-6 bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-600/50 p-8 rounded-xl shadow-2xl backdrop-blur-sm">
              <div className="text-3xl font-mono text-blue-300 leading-relaxed tracking-wide">
                ⠍⠑⠝⠥<br/>
                ⠍⠑⠝⠥
              </div>
              <div className="text-sm text-slate-400 mt-3 font-medium">
                "MENU" in braille
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button 
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce focus:outline-none focus:ring-4 focus:ring-blue-400/30 rounded-full p-3 hover:bg-slate-800/50 transition-colors"
        aria-label="Scroll to next section"
      >
        <ArrowDown className="w-6 h-6 text-slate-400" />
      </button>
    </section>
  );
};

export default Hero;
