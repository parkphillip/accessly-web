
import React from 'react';

const marqueeItems = [
  "Making Menus Accessible",
  "Starting with Restaurants",
  "Free Braille Menus for All",
  "Building Tomorrow's Standard",
  "One Menu at a Time",
  "Join the Movement",
];

const Marquee = () => {
  // Duplicate items for seamless loop
  const extendedItems = [...marqueeItems, ...marqueeItems];

  return (
    <section className="bg-brand-navy text-off-white py-4 overflow-hidden relative select-none">
      <div className="marquee-track flex gap-12 whitespace-nowrap">
        {extendedItems.map((item, index) => (
          <div key={index} className="flex items-center gap-12">
            <span className="text-xl font-heading italic">{item}</span>
            <span className="text-brand-terracotta text-2xl font-bold">•</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Marquee;
