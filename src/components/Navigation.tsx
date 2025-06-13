
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-slate-100/95 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-600 to-blue-700 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-slate-100 rounded-full opacity-80"></div>
            </div>
            <span className="text-xl font-bold text-slate-800">Accessly</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-2 rounded-full transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'text-slate-700 hover:text-teal-700 hover:bg-slate-200/50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button className="md:hidden p-2 rounded-lg hover:bg-slate-200/50 transition-colors">
            <Menu className="w-6 h-6 text-slate-700" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
