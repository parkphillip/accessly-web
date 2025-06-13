import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';

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
        ? 'bg-stone-100/95 backdrop-blur-md shadow-xl border-b border-stone-200/50' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold font-playfair text-stone-800 hover:text-amber-700 transition-colors duration-300">
              Accessly
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-2 rounded-full transition-all duration-300 font-medium overflow-hidden ${
                  activeSection === item.id
                    ? 'bg-amber-600 text-white shadow-lg transform scale-105'
                    : 'text-stone-700 hover:text-amber-700 hover:bg-stone-200/50 hover:scale-105'
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                {activeSection === item.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-700 animate-shimmer bg-[length:200%_100%]"></div>
                )}
              </button>
            ))}
          </div>

          <button className="md:hidden p-2 rounded-lg hover:bg-stone-200/50 transition-all duration-300 hover:scale-110">
            <Menu className="w-6 h-6 text-stone-700" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
