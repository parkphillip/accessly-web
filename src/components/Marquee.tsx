
import React from 'react';

const marqueeItems = [
  "Dignity in Dining",
  "Accessibility as Standard",
  "Independence for All",
  "Empowering Communities",
  "Menus for Everyone",
  "Building an Inclusive World",
];

const Marquee = () => {
  // Duplicate items for seamless loop
  const extendedItems = [...marqueeItems, ...marqueeItems];

  return (
    <section className="bg-brand-navy text-off-white py-4 overflow-hidden relative select-none">
      <div className="marquee-track flex gap-12 whitespace-nowrap">
        {extendedItems.map((item, index) => (
          <div key={index} className="flex items-center gap-12">
            <span className="text-xl font-serif italic">{item}</span>
            <span className="text-brand-terracotta text-2xl font-bold">•</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Marquee;
