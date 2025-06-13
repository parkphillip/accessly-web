
import React from 'react';
import { Heart, Mail, Phone, MapPin, Book } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-charcoal text-cream py-32 relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-40 h-40 bg-sage/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-dusty-blue/20 rounded-full blur-xl"></div>
      </div>

      <div className="max-w-8xl mx-auto px-8 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          {/* Brand section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-16 h-16 bg-sage/20 border-2 border-sage/40 rounded-lg flex items-center justify-center transform rotate-2 shadow-paper">
                <Book className="w-8 h-8 text-sage" />
              </div>
              <div className="relative">
                <span className="text-4xl font-serif font-bold text-cream">
                  Accessly
                </span>
                <div className="absolute -bottom-1 left-0 w-full h-1 bg-sage/30 transform -rotate-1 rounded-full"></div>
              </div>
            </div>
            
            <p className="text-xl text-cream/80 leading-relaxed font-light mb-12">
              Making dining accessible, one braille menu at a time. 
              <span className="font-script text-sage text-2xl"> Built with love by people who care.</span>
            </p>

            {/* Mission statement card */}
            <div className="paper-card bg-cream/10 p-8 rounded-2xl shadow-paper transform rotate-1 border border-sage/20">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-6 h-6 text-sage" />
                <span className="font-serif font-semibold text-xl">Our Promise</span>
              </div>
              <p className="text-cream/90 leading-relaxed">
                Every braille menu is completely free, professionally made, and delivered with care. 
                No hidden costs, no catch—just our commitment to accessibility.
              </p>
            </div>
          </div>

          {/* Contact & Info */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Get in Touch */}
            <div>
              <h3 className="text-3xl font-serif font-bold text-cream mb-8 relative">
                Get in Touch
                <div className="absolute -bottom-2 left-0 w-20 h-1 bg-sage/50 transform -rotate-1 rounded-full"></div>
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-sage/20 rounded-full flex items-center justify-center group-hover:bg-sage/30 transition-colors">
                    <Mail className="w-6 h-6 text-sage" />
                  </div>
                  <div>
                    <div className="font-medium text-cream">Email us</div>
                    <div className="text-cream/70">hello@accessly.org</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-dusty-blue/20 rounded-full flex items-center justify-center group-hover:bg-dusty-blue/30 transition-colors">
                    <Phone className="w-6 h-6 text-dusty-blue" />
                  </div>
                  <div>
                    <div className="font-medium text-cream">Call us</div>
                    <div className="text-cream/70">(555) 123-MENU</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-coffee/20 rounded-full flex items-center justify-center group-hover:bg-coffee/30 transition-colors">
                    <MapPin className="w-6 h-6 text-coffee" />
                  </div>
                  <div>
                    <div className="font-medium text-cream">Visit us</div>
                    <div className="text-cream/70">San Francisco, CA</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-3xl font-serif font-bold text-cream mb-8 relative">
                Learn More
                <div className="absolute -bottom-2 left-0 w-20 h-1 bg-dusty-blue/50 transform rotate-1 rounded-full"></div>
              </h3>
              
              <div className="space-y-4">
                <a href="#impact" className="block text-xl text-cream/80 hover:text-sage transition-colors hover:translate-x-2 transform duration-200">
                  Our Impact
                </a>
                <a href="#workshop" className="block text-xl text-cream/80 hover:text-sage transition-colors hover:translate-x-2 transform duration-200">
                  How It Works
                </a>
                <a href="#network" className="block text-xl text-cream/80 hover:text-sage transition-colors hover:translate-x-2 transform duration-200">
                  Restaurant Network
                </a>
                <a href="#order" className="block text-xl text-cream/80 hover:text-sage transition-colors hover:translate-x-2 transform duration-200">
                  Get Started
                </a>
              </div>

              {/* Handwritten note */}
              <div className="mt-12 font-script text-2xl text-sage transform -rotate-2 bg-cream/10 p-6 rounded-xl shadow-inner-paper">
                Questions? We're here to help! ♡
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-cream/20 mt-24 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-cream/60 text-lg">
            © 2024 Accessly. Made with <Heart className="w-5 h-5 inline mx-1 text-sage" /> for accessibility.
          </div>
          
          <div className="flex items-center gap-8">
            <a href="#" className="text-cream/60 hover:text-sage transition-colors text-lg">Privacy</a>
            <a href="#" className="text-cream/60 hover:text-sage transition-colors text-lg">Terms</a>
            <a href="#" className="text-cream/60 hover:text-sage transition-colors text-lg">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
