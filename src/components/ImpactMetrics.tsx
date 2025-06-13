
import React, { useState, useEffect, useRef } from 'react';
import { Users, MapPin, Book } from 'lucide-react';

const ImpactMetrics = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({ restaurants: 0, customers: 0, menus: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  const finalCounts = { restaurants: 847, customers: 12500, menus: 3240 };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      let step = 0;
      const interval = setInterval(() => {
        step++;
        const progress = step / steps;
        
        setCounts({
          restaurants: Math.floor(finalCounts.restaurants * progress),
          customers: Math.floor(finalCounts.customers * progress),
          menus: Math.floor(finalCounts.menus * progress),
        });

        if (step >= steps) {
          clearInterval(interval);
          setCounts(finalCounts);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }
  }, [isVisible]);

  return (
    <section id="impact" className="py-20 bg-gradient-to-b from-stone-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={sectionRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-800 mb-6">
            Making Real Impact
          </h2>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto">
            Every braille menu we create opens doors to independence and dignity. 
            Here's how we're transforming restaurant accessibility across the country.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <div className="text-4xl font-bold text-amber-700 mb-2">
              {counts.restaurants.toLocaleString()}
            </div>
            <div className="text-lg text-stone-600 mb-4">Partner Restaurants</div>
            <div className="text-sm text-stone-500">
              From local cafes to national chains, restaurants trust us to make their spaces accessible.
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div className="text-4xl font-bold text-blue-700 mb-2">
              {counts.customers.toLocaleString()}
            </div>
            <div className="text-lg text-stone-600 mb-4">Customers Served</div>
            <div className="text-sm text-stone-500">
              Visually impaired diners now enjoy independent dining experiences at partner locations.
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Book className="w-8 h-8 text-white" />
            </div>
            <div className="text-4xl font-bold text-green-700 mb-2">
              {counts.menus.toLocaleString()}
            </div>
            <div className="text-lg text-stone-600 mb-4">Braille Menus Created</div>
            <div className="text-sm text-stone-500">
              Each menu is carefully crafted with high-quality materials and perfect braille translation.
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-100 to-stone-100 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-stone-800 mb-4">
            Why This Matters
          </h3>
          <p className="text-lg text-stone-600 max-w-4xl mx-auto">
            24 million Americans have significant vision loss, yet most restaurants remain inaccessible. 
            By providing free braille menus, we're not just improving dining experiences—we're fostering 
            independence, dignity, and true inclusion in our communities.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ImpactMetrics;
