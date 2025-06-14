import React, { useState, useEffect } from 'react';
import { Menu, Book } from 'lucide-react';
const Navigation = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = [{
    id: 'hero',
    label: 'Home'
  }, {
    id: 'impact',
    label: 'Impact'
  }, {
    id: 'workshop',
    label: 'Workshop'
  }, {
    id: 'network',
    label: 'Network'
  }, {
    id: 'order',
    label: 'Get Started'
  }];
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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
        block: 'start'
      });
    }
  };
  return <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-off-white/95 backdrop-blur-sm shadow-subtle border-b border-light-gray' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#hero" className="flex items-center space-x-3" onClick={() => scrollToSection('hero')}>
            
            <span className="text-2xl font-serif font-bold text-dark-text">
              Accessly
            </span>
          </a>

          <div className="hidden md:flex items-center space-x-2">
            {navItems.map(item => <button key={item.id} onClick={() => scrollToSection(item.id)} className={`relative px-4 py-2 rounded-md transition-colors duration-300 font-medium text-sm ${activeSection === item.id ? 'text-brand-navy' : 'text-medium-text hover:text-dark-text hover:bg-subtle-gray/70'}`}>
                {item.label}
                {activeSection === item.id && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-1 bg-brand-terracotta rounded-full"></div>}
              </button>)}
          </div>

          <button className="md:hidden p-2 rounded-md hover:bg-subtle-gray transition-colors">
            <Menu className="w-6 h-6 text-dark-text" />
          </button>
        </div>
      </div>
    </nav>;
};
export default Navigation;