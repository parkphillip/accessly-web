import React, { useState, useEffect } from 'react';
import { Menu, ArrowRight } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
const navItems: {
  id: string;
  label: string;
  href?: string;
}[] = [{
  id: 'hero',
  label: 'Home'
}, {
  id: 'impact',
  label: 'Impact'
}, {
  id: 'process',
  label: 'Our Mission'
}, {
  id: 'network',
  label: 'Network',
  href: '/network'
}, {
  id: 'fund-our-mission',
  label: 'Fund Our Mission',
  href: '/fund'
}];
const Navigation = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [activeSection, setActiveSection] = useState(isHomePage ? 'hero' : '');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    let ticking = false;
    let scrollTimeout: NodeJS.Timeout;
    let lastScrollY = window.scrollY;
    const SCROLL_THRESHOLD = 20;
    const SCROLL_DELTA_THRESHOLD = 5;
    const SECTION_CHECK_DELAY = 150; // Increased debounce time for section detection

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDelta = Math.abs(currentScrollY - lastScrollY);
          
          // Only update if scroll delta is significant
          if (scrollDelta > SCROLL_DELTA_THRESHOLD) {
            setIsScrolled(currentScrollY > SCROLL_THRESHOLD);
            
            // Debounce section detection with increased delay
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
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
            }, SECTION_CHECK_DELAY);
          }
          
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleOtherPageScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDelta = Math.abs(currentScrollY - lastScrollY);
          
          if (scrollDelta > SCROLL_DELTA_THRESHOLD) {
            setIsScrolled(currentScrollY > SCROLL_THRESHOLD);
          }
          
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    if (isHomePage) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
    } else {
      setActiveSection('');
      window.addEventListener('scroll', handleOtherPageScroll, { passive: true });
      handleOtherPageScroll();
    }

    return () => {
      if (isHomePage) {
        window.removeEventListener('scroll', handleScroll);
      } else {
        window.removeEventListener('scroll', handleOtherPageScroll);
      }
      clearTimeout(scrollTimeout);
    };
  }, [isHomePage]);
  const handleLinkClick = (sectionId?: string) => {
    setIsMenuOpen(false); // Close menu on link click
    if (sectionId) {
      // Use a timeout to ensure the menu is closed before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    }
  };
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  return <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'p-2' : ''}`}>
      <div className={`transition-all duration-300 max-w-6xl mx-auto ${isScrolled ? 'bg-off-white/95 backdrop-blur-sm rounded-xl shadow-medium border border-light-gray/50' : 'bg-transparent'}`}>
        <div className="flex items-center justify-between h-16 px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            {isHomePage ? <button onClick={() => scrollToSection('hero')} className="flex items-center space-x-3">
                <span className="font-heading font-bold text-dark-text text-xl">
                  Accessly
                </span>
              </button> : <Link to="/" className="flex items-center space-x-3">
                <span className="font-heading font-bold text-dark-text text-xl">
                  Accessly
                </span>
              </Link>}
          </div>

          {/* Navigation Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map(item => {
            if (item.href) {
              return <Link key={item.id} to={item.href} className="relative px-4 py-2 rounded-md transition-colors duration-300 font-medium text-base text-medium-text hover:text-dark-text hover:bg-subtle-gray/70">
                    {item.label}
                  </Link>;
            }
            return isHomePage ? <button key={item.id} onClick={() => scrollToSection(item.id)} className={`relative px-4 py-2 rounded-md transition-colors duration-300 font-medium text-base ${activeSection === item.id ? 'text-brand-navy' : 'text-medium-text hover:text-dark-text hover:bg-subtle-gray/70'}`}>
                  {item.label}
                  {activeSection === item.id && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-1 bg-brand-terracotta rounded-full"></div>}
                </button> : <Link key={item.id} to={`/#${item.id}`} className="relative px-4 py-2 rounded-md transition-colors duration-300 font-medium text-base text-medium-text hover:text-dark-text hover:bg-subtle-gray/70">
                  {item.label}
                </Link>;
          })}
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
          <button 
            className="md:hidden p-2 rounded-md hover:bg-subtle-gray transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6 text-dark-text" />
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40" 
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-2/3 max-w-xs bg-off-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col p-8 space-y-6">
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="self-end p-2 mb-4"
          >
          </button>
          
          {navItems.map(item => {
            if (item.href) {
              return (
                <Link 
                  key={item.id} 
                  to={item.href}
                  onClick={() => handleLinkClick()}
                  className="text-lg font-medium text-dark-text hover:text-brand-navy"
                >
                  {item.label}
                </Link>
              );
            }
            return (
              isHomePage ? (
                <button 
                  key={item.id} 
                  onClick={() => handleLinkClick(item.id)}
                  className="text-lg font-medium text-dark-text hover:text-brand-navy text-left"
                >
                  {item.label}
                </button>
              ) : (
                <Link 
                  key={item.id} 
                  to={`/#${item.id}`}
                  onClick={() => handleLinkClick()}
                  className="text-lg font-medium text-dark-text hover:text-brand-navy"
                >
                  {item.label}
                </Link>
              )
            );
          })}
          <div className="pt-4">
             <Link to="/partner" onClick={() => handleLinkClick()}>
                <Button className="w-full group">
                  Partner With Us
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
          </div>
        </div>
      </div>
    </nav>;
};
export default Navigation;