import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
const NetworkMap = () => {
  const restaurants = [{
    name: "Bella's Corner Bistro",
    city: "Brooklyn, NY",
    x: 75,
    y: 25,
    type: "Italian",
    years: "2 years with us"
  }, {
    name: "Golden Gate Dim Sum",
    city: "San Francisco, CA",
    x: 10,
    y: 35,
    type: "Chinese",
    years: "6 months with us"
  }, {
    name: "Deep Dish Dreams",
    city: "Chicago, IL",
    x: 55,
    y: 30,
    type: "Pizza",
    years: "1 year with us"
  }, {
    name: "Hill Country BBQ",
    city: "Austin, TX",
    x: 45,
    y: 60,
    type: "Barbecue",
    years: "3 years with us"
  }, {
    name: "Ocean Breeze Cafe",
    city: "Miami, FL",
    x: 80,
    y: 75,
    type: "Seafood",
    years: "8 months with us"
  }, {
    name: "Mountain View Diner",
    city: "Denver, CO",
    x: 40,
    y: 40,
    type: "American",
    years: "1.5 years with us"
  }, {
    name: "Portland Coffee Co.",
    city: "Portland, OR",
    x: 15,
    y: 20,
    type: "Cafe",
    years: "4 months with us"
  }, {
    name: "Peach Tree Kitchen",
    city: "Atlanta, GA",
    x: 70,
    y: 65,
    type: "Southern",
    years: "2.5 years with us"
  }];
  return <section id="network" className="py-24 bg-subtle-gray/50 bg-slate-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-dark-text mb-4">
            A Nationwide Network of Inclusion
          </h2>
          <p className="text-lg text-medium-text max-w-3xl mx-auto">
            From local diners to fine dining, our partners are leading the charge in making their communities more accessible.
          </p>
        </div>

        {/* Map area */}
        <div className="structured-card p-4 md:p-8 mb-16">
          <div className="relative w-full h-96 bg-light-bg border border-light-gray rounded-lg overflow-hidden bg-subtle-dots">
            {restaurants.map((restaurant, index) => <div key={index} className="absolute transform -translate-x-1/2 -translate-y-1/2 group" style={{
            left: `${restaurant.x}%`,
            top: `${restaurant.y}%`
          }}>
                <div className="relative flex items-center justify-center">
                  <div className="w-3 h-3 bg-brand-terracotta rounded-full transition-transform duration-300 group-hover:scale-150"></div>
                  <div className="absolute w-6 h-6 border-2 border-brand-terracotta rounded-full animate-ping opacity-70"></div>
                  
                  <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 w-max">
                    <div className="bg-off-white px-3 py-2 rounded-md text-sm shadow-medium border border-light-gray">
                      <div className="font-serif font-semibold text-dark-text">{restaurant.name}</div>
                      <div className="text-xs text-medium-text">{restaurant.city}</div>
                    </div>
                  </div>
                </div>
              </div>)}
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="structured-card p-8">
            <div className="text-5xl font-mono font-bold text-brand-navy mb-2">47</div>
            <div className="text-lg font-serif font-semibold text-dark-text">States Covered</div>
            <p className="text-sm text-medium-text mt-1">Spreading accessibility coast to coast.</p>
          </div>
          
          <div className="structured-card p-8">
            <div className="text-5xl font-mono font-bold text-brand-navy mb-2">100%</div>
            <div className="text-lg font-serif font-semibold text-dark-text">Free of Charge</div>
            <p className="text-sm text-medium-text mt-1">Funded by grants and donations.</p>
          </div>
          
          <div className="structured-card p-8">
            <div className="text-5xl font-mono font-bold text-brand-navy mb-2">24/7</div>
            <div className="text-lg font-serif font-semibold text-dark-text">Support</div>
            <p className="text-sm text-medium-text mt-1">Always here to help our partners.</p>
          </div>
        </div>
      </div>
    </section>;
};
export default NetworkMap;