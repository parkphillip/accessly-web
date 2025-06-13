
import React, { useState, useEffect } from 'react';
import { Menu, Book } from 'lucide-react';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'impact', label: 'Impact' },
    { id: 'workshop', label: 'Workshop' },
    { id: 'network', label: 'Network' },
    { id: 'order', label: 'Get Started' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = navItems.map(item => item.id);
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-cream/95 backdrop-blur-lg shadow-paper border-b border-warm-gray/20' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-full mx-auto px-6 lg:px-12 xl:px-16">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-sage/20 border-2 border-sage/40 rounded-lg flex items-center justify-center transform rotate-2 shadow-paper">
              <Book className="w-5 h-5 text-sage" />
            </div>
            <div className="relative">
              <span className="text-2xl font-serif font-bold text-charcoal">
                Accessly
              </span>
              {/* Handwritten underline */}
              <div className="absolute -bottom-1 left-0 w-full h-1 bg-sage/30 transform -rotate-1 rounded-full"></div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-6 py-3 rounded-full transition-all duration-300 group font-medium ${
                  activeSection === item.id
                    ? 'bg-sage text-cream shadow-paper transform -rotate-1'
                    : 'text-charcoal hover:text-sage hover:bg-warm-tan/50'
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                {activeSection !== item.id && (
                  <div className="absolute inset-0 bg-warm-tan/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:rotate-1"></div>
                )}
              </button>
            ))}
          </div>

          <button className="md:hidden p-3 rounded-xl hover:bg-warm-tan/50 transition-colors group transform hover:rotate-2">
            <Menu className="w-6 h-6 text-charcoal group-hover:text-sage transition-colors" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
