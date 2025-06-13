
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
      { threshold: 0.3 }
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
    <section id="impact" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-8">
        <div ref={sectionRef} className="mb-16">
          <h2 className="text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            Making Real Impact
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl font-light leading-relaxed">
            Every braille menu we create opens doors to independence and dignity. 
            Here's how we're transforming restaurant accessibility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="group bg-white p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-slate-900 flex items-center justify-center mb-6">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div className="text-4xl font-bold text-slate-900 mb-2 font-mono">
              {counts.restaurants.toLocaleString()}
            </div>
            <div className="text-lg font-medium text-slate-900 mb-3">Partner Restaurants</div>
            <div className="text-sm text-slate-600 leading-relaxed">
              From local cafes to national chains, restaurants trust us to make their spaces accessible.
            </div>
          </div>

          <div className="group bg-white p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-slate-900 flex items-center justify-center mb-6">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="text-4xl font-bold text-slate-900 mb-2 font-mono">
              {counts.customers.toLocaleString()}
            </div>
            <div className="text-lg font-medium text-slate-900 mb-3">Customers Served</div>
            <div className="text-sm text-slate-600 leading-relaxed">
              Visually impaired diners now enjoy independent dining experiences at partner locations.
            </div>
          </div>

          <div className="group bg-white p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-slate-900 flex items-center justify-center mb-6">
              <Book className="w-6 h-6 text-white" />
            </div>
            <div className="text-4xl font-bold text-slate-900 mb-2 font-mono">
              {counts.menus.toLocaleString()}
            </div>
            <div className="text-lg font-medium text-slate-900 mb-3">Braille Menus Created</div>
            <div className="text-sm text-slate-600 leading-relaxed">
              Each menu is carefully crafted with high-quality materials and perfect braille translation.
            </div>
          </div>
        </div>

        <div className="bg-white p-12 shadow-lg">
          <h3 className="text-3xl font-bold text-slate-900 mb-6 tracking-tight">
            Why This Matters
          </h3>
          <p className="text-lg text-slate-600 leading-relaxed font-light">
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
