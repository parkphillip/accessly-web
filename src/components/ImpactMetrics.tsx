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
    <section id="impact" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={sectionRef} className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Making Real Impact
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every braille menu we create opens doors to independence and dignity. 
            Here's how we're transforming restaurant accessibility across the country.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { 
              icon: MapPin, 
              count: counts.restaurants, 
              label: 'Partner Restaurants',
              description: 'From local cafes to national chains, restaurants trust us to make their spaces accessible.'
            },
            { 
              icon: Users, 
              count: counts.customers, 
              label: 'Customers Served',
              description: 'Visually impaired diners now enjoy independent dining experiences at partner locations.'
            },
            { 
              icon: Book, 
              count: counts.menus, 
              label: 'Braille Menus Created',
              description: 'Each menu is carefully crafted with high-quality materials and perfect braille translation.'
            }
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mx-auto mb-6">
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-4xl font-bold text-black mb-2">
                {item.count.toLocaleString()}
              </div>
              <div className="text-lg text-black mb-4 font-semibold">{item.label}</div>
              <div className="text-sm text-gray-600 leading-relaxed">
                {item.description}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-100">
          <h3 className="text-2xl font-bold text-black mb-4">
            Why This Matters
          </h3>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
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
