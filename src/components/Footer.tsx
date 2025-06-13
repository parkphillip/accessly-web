
import React from 'react';
import { MapPin, Book, Heart, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-charcoal text-paper py-20 relative overflow-hidden">
      {/* Subtle paper texture */}
      <div className="absolute inset-0 opacity-5 bg-linen-texture"></div>
      
      {/* Handwritten decorative elements */}
      <div className="absolute top-8 right-16 font-script text-3xl text-sage/30 transform rotate-12">
        Made with ♡
      </div>

      <div className="max-w-7xl mx-auto px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand section with personality */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-14 h-14 bg-sage/20 border-2 border-sage/40 rounded-xl flex items-center justify-center transform rotate-3 shadow-paper">
                <Book className="w-7 h-7 text-sage" />
              </div>
              <div className="relative">
                <span className="text-3xl font-serif font-bold text-paper">Accessly</span>
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-sage/40 transform -rotate-1 rounded-full"></div>
              </div>
            </div>
            <p className="text-lg text-paper/80 leading-relaxed mb-8 max-w-md font-light">
              Making restaurants accessible to everyone through free braille menus. 
              No cost, no catch—just a more inclusive world, one menu at a time.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="bg-sage/20 border border-sage/30 text-sage px-4 py-2 rounded-xl text-sm font-medium transform -rotate-1 shadow-paper">
                100% Free Forever
              </div>
              <div className="bg-paper/10 border border-paper/20 text-paper/80 px-4 py-2 rounded-xl text-sm font-medium transform rotate-1 shadow-paper">
                Community Funded
              </div>
              <div className="bg-dusty-blue/20 border border-dusty-blue/30 text-dusty-blue px-4 py-2 rounded-xl text-sm font-medium transform -rotate-1 shadow-paper">
                Always Here to Help
              </div>
            </div>
            {/* Handwritten note */}
            <div className="mt-6 font-script text-sage/70 text-lg transform rotate-1">
              Accessibility should never cost extra ♡
            </div>
          </div>

          {/* Quick links with character */}
          <div>
            <h3 className="text-xl font-serif font-semibold mb-6 text-paper relative">
              Quick Links
              <div className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-sage/40 transform rotate-1"></div>
            </h3>
            <ul className="space-y-4 text-paper/70">
              <li>
                <button 
                  onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-sage transition-colors duration-300 text-left font-light hover:font-normal flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-sage rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('impact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-sage transition-colors duration-300 text-left font-light hover:font-normal flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-sage rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Our Impact
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('workshop')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-sage transition-colors duration-300 text-left font-light hover:font-normal flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-sage rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Try Braille
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('network')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-sage transition-colors duration-300 text-left font-light hover:font-normal flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-sage rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Restaurant Network
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-sage transition-colors duration-300 text-left font-light hover:font-normal flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-sage rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Get Started
                </button>
              </li>
            </ul>
          </div>

          {/* Contact with warmth */}
          <div>
            <h3 className="text-xl font-serif font-semibold mb-6 text-paper relative">
              Let's Connect
              <div className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-dusty-blue/40 transform -rotate-1"></div>
            </h3>
            <div className="space-y-6 text-paper/70">
              <div className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-sage/20 border border-sage/30 rounded-xl flex items-center justify-center transform group-hover:rotate-3 transition-transform">
                  <MapPin className="w-5 h-5 text-sage" />
                </div>
                <div>
                  <div className="font-medium text-paper">Nationwide Service</div>
                  <div className="text-sm font-script text-sage/70">Coast to coast!</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 group">
                  <div className="w-10 h-10 bg-dusty-blue/20 border border-dusty-blue/30 rounded-xl flex items-center justify-center transform group-hover:rotate-3 transition-transform">
                    <Mail className="w-5 h-5 text-dusty-blue" />
                  </div>
                  <div>
                    <div className="text-sm text-paper/60">Email us anytime:</div>
                    <div className="font-medium text-dusty-blue">hello@accessly.org</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 group">
                  <div className="w-10 h-10 bg-coffee/20 border border-coffee/30 rounded-xl flex items-center justify-center transform group-hover:rotate-3 transition-transform">
                    <Phone className="w-5 h-5 text-coffee" />
                  </div>
                  <div>
                    <div className="text-sm text-paper/60">Call or text:</div>
                    <div className="font-medium text-coffee">1-800-BRAILLE</div>
                  </div>
                </div>
              </div>
              
              {/* Personal touch */}
              <div className="mt-6 p-4 bg-paper/5 border border-paper/10 rounded-xl">
                <div className="font-script text-sage text-sm transform -rotate-1">
                  "Real people answer our phones - we're here to help!" - Sarah, Co-founder
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section with character */}
        <div className="border-t border-paper/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-paper/60 flex items-center gap-3">
              <Heart className="w-4 h-4 text-sage" />
              <span>© 2024 Accessly. Funded by grants and donations to keep our service free.</span>
            </div>
            <div className="flex space-x-8 text-paper/60">
              <button className="hover:text-sage transition-colors duration-300 font-light hover:font-normal">
                Privacy Policy
              </button>
              <button className="hover:text-sage transition-colors duration-300 font-light hover:font-normal">
                Terms of Service
              </button>
              <button className="hover:text-sage transition-colors duration-300 font-light hover:font-normal">
                Accessibility Statement
              </button>
            </div>
          </div>
          
          {/* Final handwritten touch */}
          <div className="text-center mt-8">
            <div className="font-script text-lg text-sage/50 transform rotate-1">
              Making the world more accessible, one menu at a time ♡
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
