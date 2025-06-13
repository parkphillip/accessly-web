
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
    <section id="network" className="py-20 bg-gradient-to-b from-stone-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-800 mb-6">
            Our Growing Network
          </h2>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto">
            From coast to coast, restaurants are joining the accessibility movement. 
            See where you can find braille menus and discover how your community is becoming more inclusive.
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
          <div className="relative w-full h-96 bg-gradient-to-br from-stone-100 to-amber-100 rounded-xl overflow-hidden">
            {/* Simplified US map background */}
            <div className="absolute inset-0 bg-gradient-to-br from-stone-200 to-stone-300 opacity-30"></div>
            
            {restaurants.map((restaurant, index) => (
              <div
                key={index}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                style={{ left: `${restaurant.x}%`, top: `${restaurant.y}%` }}
              >
                <div className="relative">
                  <div className="w-4 h-4 bg-amber-600 rounded-full shadow-lg animate-pulse group-hover:scale-150 transition-transform"></div>
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-stone-800 text-white px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    <div className="font-semibold">{restaurant.name}</div>
                    <div className="text-xs text-stone-300">{restaurant.city}</div>
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
                  stroke="#d97706"
                  strokeWidth="1"
                  opacity="0.3"
                  className="animate-ping"
                  style={{ animationDelay: `${index * 0.5}s` }}
                />
              ))}
            </svg>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl">
              <MapPin className="w-8 h-8 text-amber-600 mx-auto mb-3" />
              <div className="font-semibold text-stone-800 mb-2">47 States</div>
              <div className="text-sm text-stone-600">Nationwide coverage expanding daily</div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <div className="w-8 h-8 bg-blue-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                <span className="text-white text-xs font-bold">24</span>
              </div>
              <div className="font-semibold text-stone-800 mb-2">24/7 Service</div>
              <div className="text-sm text-stone-600">Order processing around the clock</div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
              <div className="w-8 h-8 bg-green-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <div className="font-semibold text-stone-800 mb-2">100% Free</div>
              <div className="text-sm text-stone-600">No hidden costs or commitments</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NetworkMap;
