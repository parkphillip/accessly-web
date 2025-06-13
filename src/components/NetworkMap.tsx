
import React from 'react';
import { MapPin, Coffee, Users } from 'lucide-react';

const NetworkMap = () => {
  // Restaurant locations with more personality
  const restaurants = [
    { name: "Bella's Corner Bistro", city: "Brooklyn, NY", x: 75, y: 25, type: "Italian", years: "2 years with us" },
    { name: "Golden Gate Dim Sum", city: "San Francisco, CA", x: 10, y: 35, type: "Chinese", years: "6 months with us" },
    { name: "Deep Dish Dreams", city: "Chicago, IL", x: 55, y: 30, type: "Pizza", years: "1 year with us" },
    { name: "Hill Country BBQ", city: "Austin, TX", x: 45, y: 60, type: "Barbecue", years: "3 years with us" },
    { name: "Ocean Breeze Cafe", city: "Miami, FL", x: 80, y: 75, type: "Seafood", years: "8 months with us" },
    { name: "Mountain View Diner", city: "Denver, CO", x: 40, y: 40, type: "American", years: "1.5 years with us" },
    { name: "Portland Coffee Co.", city: "Portland, OR", x: 15, y: 20, type: "Cafe", years: "4 months with us" },
    { name: "Peach Tree Kitchen", city: "Atlanta, GA", x: 70, y: 65, type: "Southern", years: "2.5 years with us" },
  ];

  return (
    <section id="network" className="py-24 bg-cream relative overflow-hidden">
      {/* Paper texture overlay */}
      <div className="absolute inset-0 opacity-20 bg-linen-texture"></div>
      
      {/* Handwritten elements */}
      <div className="absolute top-16 left-10 transform -rotate-12">
        <div className="font-script text-3xl text-sage opacity-60">Growing every day!</div>
        <div className="w-20 h-2 bg-sage opacity-30 transform rotate-6 mt-1 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-8 relative">
        <div className="text-center mb-20">
          <div className="relative inline-block">
            <h2 className="text-5xl lg:text-6xl font-serif font-bold text-charcoal mb-8 leading-tight">
              Our Restaurant Family
            </h2>
            {/* Scribbled underline */}
            <div className="absolute -bottom-3 left-0 right-0 h-4 scribble-underline"></div>
          </div>
          <p className="text-xl text-pencil max-w-3xl mx-auto leading-relaxed font-light">
            From family diners to fine dining, restaurants across the country are making their spaces 
            more welcoming. See where you can find braille menus today.
          </p>
        </div>

        {/* Main map area */}
        <div className="paper-card p-12 rounded-3xl shadow-paper-lift mb-16 transform -rotate-1">
          <div className="relative w-full h-96 bg-warm-tan/50 border-2 border-warm-gray/50 rounded-2xl overflow-hidden shadow-inner-paper">
            {/* Hand-drawn map background */}
            <div className="absolute inset-0 opacity-10 linen-texture"></div>
            
            {/* Restaurant pins */}
            {restaurants.map((restaurant, index) => (
              <div
                key={index}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                style={{ left: `${restaurant.x}%`, top: `${restaurant.y}%` }}
              >
                <div className="relative">
                  {/* Pin with character */}
                  <div className="w-6 h-6 bg-sage border-2 border-warm-gray rounded-full shadow-paper animate-pulse group-hover:scale-150 transition-transform duration-300 flex items-center justify-center">
                    <div className="w-2 h-2 bg-cream rounded-full"></div>
                  </div>
                  
                  {/* Handwritten-style tooltip */}
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                    <div className="paper-card px-4 py-3 rounded-xl text-sm whitespace-nowrap shadow-paper-lift transform -rotate-1">
                      <div className="font-serif font-semibold text-charcoal">{restaurant.name}</div>
                      <div className="text-xs text-pencil">{restaurant.city} • {restaurant.type}</div>
                      <div className="text-xs font-script text-sage">{restaurant.years}</div>
                    </div>
                  </div>
                  
                  {/* Connection lines - hand-drawn style */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none -z-10">
                    <circle
                      cx="50%"
                      cy="50%"
                      r="30"
                      fill="none"
                      stroke="#8a9a7d"
                      strokeWidth="1"
                      opacity="0.2"
                      strokeDasharray="2,2"
                      className="animate-ping"
                      style={{ animationDelay: `${index * 0.5}s` }}
                    />
                  </svg>
                </div>
              </div>
            ))}
            
            {/* Hand-drawn connecting strings */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
              <defs>
                <pattern id="string" patternUnits="userSpaceOnUse" width="4" height="4">
                  <circle cx="2" cy="2" r="0.5" fill="#8a9a7d"/>
                </pattern>
              </defs>
              {restaurants.slice(0, -1).map((_, index) => {
                const current = restaurants[index];
                const next = restaurants[index + 1];
                return (
                  <path
                    key={index}
                    d={`M ${current.x}% ${current.y}% Q ${(current.x + next.x) / 2}% ${(current.y + next.y) / 2 - 10}% ${next.x}% ${next.y}%`}
                    stroke="url(#string)"
                    strokeWidth="1"
                    fill="none"
                    className="animate-pulse"
                    style={{ animationDelay: `${index * 0.3}s` }}
                  />
                );
              })}
            </svg>
          </div>

          {/* Handwritten annotations around the map */}
          <div className="absolute -top-4 left-1/4 font-script text-sage text-sm transform -rotate-6">
            ← West Coast Strong!
          </div>
          <div className="absolute -bottom-6 right-1/3 font-script text-dusty-blue text-sm transform rotate-3">
            Southern Hospitality ↗
          </div>
        </div>

        {/* Stats cards with personality */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="paper-card p-8 rounded-2xl shadow-paper transform -rotate-1 hover:rotate-0 transition-transform duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-sage/20 border-2 border-sage/40 rounded-xl flex items-center justify-center transform rotate-3 shadow-paper">
                <MapPin className="w-6 h-6 text-sage" />
              </div>
              <div className="font-script text-sage text-sm transform rotate-2">
                Coast to coast!
              </div>
            </div>
            <div className="text-4xl font-serif font-bold text-charcoal mb-3">47</div>
            <div className="text-lg font-serif font-semibold text-dusty-blue mb-3">States Covered</div>
            <div className="text-pencil text-sm leading-relaxed">From Alaska to Florida, accessibility is spreading</div>
          </div>
          
          <div className="paper-card p-8 rounded-2xl shadow-paper transform rotate-1 hover:rotate-0 transition-transform duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-dusty-blue/20 border-2 border-dusty-blue/40 rounded-xl flex items-center justify-center transform -rotate-2 shadow-paper">
                <Coffee className="w-6 h-6 text-dusty-blue" />
              </div>
              <div className="font-script text-dusty-blue text-sm transform -rotate-3">
                Always open!
              </div>
            </div>
            <div className="text-4xl font-serif font-bold text-charcoal mb-3">24/7</div>
            <div className="text-lg font-serif font-semibold text-sage mb-3">Service</div>
            <div className="text-pencil text-sm leading-relaxed">Round-the-clock support for restaurants</div>
          </div>
          
          <div className="paper-card p-8 rounded-2xl shadow-paper transform -rotate-1 hover:rotate-0 transition-transform duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-coffee/20 border-2 border-coffee/40 rounded-xl flex items-center justify-center transform rotate-2 shadow-paper">
                <Users className="w-6 h-6 text-coffee" />
              </div>
              <div className="font-script text-coffee text-sm transform rotate-1">
                No strings attached!
              </div>
            </div>
            <div className="text-4xl font-serif font-bold text-charcoal mb-3">100%</div>
            <div className="text-lg font-serif font-semibold text-coffee mb-3">Free Forever</div>
            <div className="text-pencil text-sm leading-relaxed">Because accessibility shouldn't cost extra</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NetworkMap;
