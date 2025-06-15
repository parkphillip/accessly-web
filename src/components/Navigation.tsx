import React, { useState, useEffect } from 'react';
import { Menu, ArrowRight } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const navItems = [{
  id: 'hero',
  label: 'Home'
}, {
  id: 'impact',
  label: 'Impact'
}, {
  id: 'process',
  label: 'Our Process'
}];

const Navigation = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [activeSection, setActiveSection] = useState(isHomePage ? 'hero' : '');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

    const handleOtherPageScroll = () => setIsScrolled(window.scrollY > 20);

    if (isHomePage) {
      window.addEventListener('scroll', handleScroll);
      handleScroll();
    } else {
      setActiveSection('');
      window.addEventListener('scroll', handleOtherPageScroll);
      handleOtherPageScroll();
    }

    return () => {
      if (isHomePage) {
        window.removeEventListener('scroll', handleScroll);
      } else {
        window.removeEventListener('scroll', handleOtherPageScroll);
      }
    };
  }, [isHomePage]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-off-white/95 backdrop-blur-sm shadow-subtle border-b border-light-gray' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with improved badge separation */}
          <div className="flex items-center space-x-4">
            {isHomePage ? (
              <button 
                onClick={() => scrollToSection('hero')}
                className="flex items-center space-x-3" 
              >
                <span className="text-2xl font-heading font-bold text-dark-text">
                  Accessly
                </span>
              </button>
            ) : (
              <Link to="/" className="flex items-center space-x-3">
                <span className="text-2xl font-heading font-bold text-dark-text">
                  Accessly
                </span>
              </Link>
            )}
            
            {/* Separated badge with better contrast */}
            <div className="hidden sm:block">
              <div className="bg-brand-navy text-off-white inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full shadow-subtle border border-brand-navy/20">
                <span className="w-1.5 h-1.5 bg-brand-terracotta rounded-full"></span>
                Now Accepting Partners
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map(item => (
              isHomePage ? (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-2 rounded-md transition-colors duration-300 font-medium text-base ${
                    activeSection === item.id 
                      ? 'text-brand-navy' 
                      : 'text-medium-text hover:text-dark-text hover:bg-subtle-gray/70'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-1 bg-brand-terracotta rounded-full"></div>
                  )}
                </button>
              ) : (
                <Link
                  key={item.id}
                  to={`/#${item.id}`}
                  className="relative px-4 py-2 rounded-md transition-colors duration-300 font-medium text-base text-medium-text hover:text-dark-text hover:bg-subtle-gray/70"
                >
                  {item.label}
                </Link>
              )
            ))}
             <div className="pl-2">
                <Link to="/partner">
                  <Button className="group">
                    Partner With Us
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-md hover:bg-subtle-gray transition-colors">
            <Menu className="w-6 h-6 text-dark-text" />
          </button>
        </div>
        
        {/* Mobile badge for small screens */}
        <div className="sm:hidden pb-3">
          <div className="bg-brand-navy text-off-white inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full shadow-subtle">
            <span className="w-1.5 h-1.5 bg-brand-terracotta rounded-full"></span>
            Now Accepting Partners
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
