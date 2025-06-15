import React from 'react';
import { Mail, Phone, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  const links = [{
    id: 'hero',
    label: 'Home'
  }, {
    id: 'impact',
    label: 'Impact'
  }, {
    id: 'network',
    label: 'Network'
  }, {
    id: 'order',
    label: 'Get Started'
  }];
  return <footer className="bg-dark-text text-light-bg">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          {/* Brand section */}
          <div className="md:col-span-5">
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-3xl font-serif font-bold text-off-white">Accessly</span>
            </div>
            <p className="text-base text-light-gray leading-relaxed mb-6 max-w-md">
              Providing free, high-quality braille menus to restaurants to foster a more inclusive and accessible dining experience for everyone.
            </p>
          </div>

          {/* Quick links */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4 text-off-white">Menu</h3>
            <ul className="space-y-3">
              {links.map(link => <li key={link.id}>
                  <button onClick={() => scrollToSection(link.id)} className="text-light-gray hover:text-brand-terracotta transition-colors duration-300">
                    {link.label}
                  </button>
                </li>)}
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="md:col-span-3">
            <h3 className="text-lg font-semibold mb-4 text-off-white">Contact Us</h3>
            <div className="space-y-4 mb-8">
              <a href="mailto:hello@accessly.org" className="flex items-center space-x-3 group">
                <Mail className="w-5 h-5 text-light-gray group-hover:text-brand-terracotta transition-colors" />
                <span className="text-light-gray group-hover:text-brand-terracotta transition-colors">hello@accessly.org</span>
              </a>
              <div className="flex items-center space-x-3 group">
                <Phone className="w-5 h-5 text-light-gray" />
                <span className="text-light-gray">1-800-BRAILLE</span>
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-4 text-off-white">Follow Us</h3>
            <div className="flex items-center space-x-6">
               <a href="#" aria-label="Visit our Instagram page" className="text-light-gray hover:text-brand-terracotta transition-colors duration-300">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" aria-label="Visit our Twitter page" className="text-light-gray hover:text-brand-terracotta transition-colors duration-300">
                  <Twitter className="w-6 h-6" />
                </a>
            </div>
          </div>

           {/* Legal */}
           <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4 text-off-white">Legal</h3>
            <ul className="space-y-3">
              <li><button className="text-light-gray hover:text-brand-terracotta transition-colors">Privacy Policy</button></li>
              <li><button className="text-light-gray hover:text-brand-terracotta transition-colors">Terms of Service</button></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-light-gray/20 pt-8 text-center text-sm text-medium-text">
          <p>© {new Date().getFullYear()} Accessly. All rights reserved. A non-profit initiative dedicated to accessibility.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;
