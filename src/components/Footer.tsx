
import React from 'react';
import { MapPin, Book } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-stone-800 to-stone-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                <Book className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">Accessly</span>
            </div>
            <p className="text-stone-300 text-lg leading-relaxed mb-6 max-w-md">
              Making restaurants accessible to everyone through free braille menus. 
              No cost, no catch—just better accessibility for all.
            </p>
            <div className="flex items-center space-x-4">
              <div className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                100% Free Service
              </div>
              <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                24/7 Support
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3 text-stone-300">
              <li>
                <button 
                  onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-amber-400 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('impact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-amber-400 transition-colors"
                >
                  Impact
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('workshop')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-amber-400 transition-colors"
                >
                  Workshop
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-amber-400 transition-colors"
                >
                  Get Started
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3 text-stone-300">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Available Nationwide</span>
              </div>
              <div>
                <span className="text-amber-400">Email:</span> hello@accessly.org
              </div>
              <div>
                <span className="text-amber-400">Phone:</span> 1-800-BRAILLE
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-stone-400 mb-4 md:mb-0">
              © 2024 Accessly. Funded by grants and donations to keep our service free.
            </div>
            <div className="flex space-x-6 text-stone-400">
              <button className="hover:text-amber-400 transition-colors">Privacy Policy</button>
              <button className="hover:text-amber-400 transition-colors">Terms of Service</button>
              <button className="hover:text-amber-400 transition-colors">Accessibility</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
