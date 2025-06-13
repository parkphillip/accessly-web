
import React from 'react';
import { MapPin } from 'lucide-react';

const NetworkMap = () => {
  // Placeholder restaurant locations
  const restaurants = [
    { name: "Bella Vista Italian", city: "New York, NY", x: 75, y: 25 },
    { name: "Golden Gate Bistro", city: "San Francisco, CA", x: 10, y: 35 },
    { name: "Deep Dish Palace", city: "Chicago, IL", x: 55, y: 30 },
    { name: "BBQ Junction", city: "Austin, TX", x: 45, y: 60 },
    { name: "Ocean Breeze Seafood", city: "Miami, FL", x: 80, y: 75 },
    { name: "Mountain View Cafe", city: "Denver, CO", x: 40, y: 40 },
    { name: "Riverside Grill", city: "Portland, OR", x: 15, y: 20 },
    { name: "Southern Comfort", city: "Atlanta, GA", x: 70, y: 65 },
  ];

  return (
    <section id="network" className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight">
            Our Growing Network
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
            From coast to coast, restaurants are joining the accessibility movement. 
            See where you can find braille menus and discover how your community is becoming more inclusive.
          </p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-12 shadow-2xl">
          <div className="relative w-full h-96 bg-slate-900/50 border border-slate-700/50 rounded-xl overflow-hidden">
            {/* Simplified US map background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800/30 to-slate-900/30"></div>
            
            {restaurants.map((restaurant, index) => (
              <div
                key={index}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                style={{ left: `${restaurant.x}%`, top: `${restaurant.y}%` }}
              >
                <div className="relative">
                  <div className="w-4 h-4 bg-blue-400 rounded-full shadow-lg animate-pulse group-hover:scale-150 transition-transform duration-300"></div>
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-slate-800 border border-slate-700/50 text-white px-4 py-3 rounded-xl text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap z-10 shadow-2xl">
                    <div className="font-semibold text-blue-300">{restaurant.name}</div>
                    <div className="text-xs text-slate-400">{restaurant.city}</div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Animated connection lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {restaurants.map((restaurant, index) => (
                <circle
                  key={`circle-${index}`}
                  cx={`${restaurant.x}%`}
                  cy={`${restaurant.y}%`}
                  r="20"
                  fill="none"
                  stroke="#60a5fa"
                  strokeWidth="1"
                  opacity="0.2"
                  className="animate-ping"
                  style={{ animationDelay: `${index * 0.5}s` }}
                />
              ))}
            </svg>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 border border-slate-700/50 p-8 rounded-xl shadow-lg hover:bg-slate-800/70 transition-colors duration-300">
              <div className="w-12 h-12 bg-blue-500/20 border border-blue-500/30 rounded-lg flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-3 font-mono">47</div>
              <div className="text-lg font-semibold text-blue-300 mb-3">States</div>
              <div className="text-slate-400 text-sm leading-relaxed">Nationwide coverage expanding daily</div>
            </div>
            
            <div className="bg-slate-800/50 border border-slate-700/50 p-8 rounded-xl shadow-lg hover:bg-slate-800/70 transition-colors duration-300">
              <div className="w-12 h-12 bg-blue-500/20 border border-blue-500/30 rounded-lg flex items-center justify-center mb-6">
                <span className="text-blue-400 text-lg font-bold">24</span>
              </div>
              <div className="text-3xl font-bold text-white mb-3 font-mono">24/7</div>
              <div className="text-lg font-semibold text-blue-300 mb-3">Service</div>
              <div className="text-slate-400 text-sm leading-relaxed">Order processing around the clock</div>
            </div>
            
            <div className="bg-slate-800/50 border border-slate-700/50 p-8 rounded-xl shadow-lg hover:bg-slate-800/70 transition-colors duration-300">
              <div className="w-12 h-12 bg-blue-500/20 border border-blue-500/30 rounded-lg flex items-center justify-center mb-6">
                <span className="text-blue-400 text-lg">✓</span>
              </div>
              <div className="text-3xl font-bold text-white mb-3 font-mono">100%</div>
              <div className="text-lg font-semibold text-blue-300 mb-3">Free</div>
              <div className="text-slate-400 text-sm leading-relaxed">No hidden costs or commitments</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NetworkMap;
