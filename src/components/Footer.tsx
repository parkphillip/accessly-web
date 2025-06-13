
import React from 'react';
import { MapPin, Book } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/50 text-white py-20">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-blue-500/20 border border-blue-500/30 rounded-lg flex items-center justify-center">
                <Book className="w-6 h-6 text-blue-400" />
              </div>
              <span className="text-2xl font-bold text-white">Accessly</span>
            </div>
            <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-md font-light">
              Making restaurants accessible to everyone through free braille menus. 
              No cost, no catch—just better accessibility for all.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="bg-blue-500/20 border border-blue-500/30 text-blue-300 px-4 py-2 rounded-lg text-sm font-medium">
                100% Free Service
              </div>
              <div className="bg-slate-800/50 border border-slate-700/50 text-slate-300 px-4 py-2 rounded-lg text-sm font-medium">
                24/7 Support
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-4 text-slate-400">
              <li>
                <button 
                  onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-blue-300 transition-colors duration-300 text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('impact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-blue-300 transition-colors duration-300 text-left"
                >
                  Impact
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('workshop')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-blue-300 transition-colors duration-300 text-left"
                >
                  Workshop
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-blue-300 transition-colors duration-300 text-left"
                >
                  Get Started
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Contact</h3>
            <div className="space-y-4 text-slate-400">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500/20 border border-blue-500/30 rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-blue-400" />
                </div>
                <span>Available Nationwide</span>
              </div>
              <div className="space-y-2">
                <div>
                  <span className="text-blue-300 font-medium">Email:</span> hello@accessly.org
                </div>
                <div>
                  <span className="text-blue-300 font-medium">Phone:</span> 1-800-BRAILLE
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-slate-500">
              © 2024 Accessly. Funded by grants and donations to keep our service free.
            </div>
            <div className="flex space-x-8 text-slate-500">
              <button className="hover:text-blue-300 transition-colors duration-300">Privacy Policy</button>
              <button className="hover:text-blue-300 transition-colors duration-300">Terms of Service</button>
              <button className="hover:text-blue-300 transition-colors duration-300">Accessibility</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
