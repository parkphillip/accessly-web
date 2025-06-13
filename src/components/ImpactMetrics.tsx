
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
    <section id="impact" className="py-24 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-8">
        <div ref={sectionRef} className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight">
            Making Real Impact
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
            Every braille menu we create opens doors to independence and dignity. 
            Here's how we're transforming restaurant accessibility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="group bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600/50 p-10 rounded-2xl shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/30 transition-all duration-500 transform hover:scale-[1.02]">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-8 shadow-lg">
              <MapPin className="w-7 h-7 text-white" />
            </div>
            <div className="text-5xl font-bold text-white mb-4 font-mono tracking-tight">
              {counts.restaurants.toLocaleString()}
            </div>
            <div className="text-xl font-semibold text-blue-300 mb-4">Partner Restaurants</div>
            <div className="text-slate-400 leading-relaxed">
              From local cafes to national chains, restaurants trust us to make their spaces accessible.
            </div>
          </div>

          <div className="group bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600/50 p-10 rounded-2xl shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/30 transition-all duration-500 transform hover:scale-[1.02]">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-8 shadow-lg">
              <Users className="w-7 h-7 text-white" />
            </div>
            <div className="text-5xl font-bold text-white mb-4 font-mono tracking-tight">
              {counts.customers.toLocaleString()}
            </div>
            <div className="text-xl font-semibold text-blue-300 mb-4">Customers Served</div>
            <div className="text-slate-400 leading-relaxed">
              Visually impaired diners now enjoy independent dining experiences at partner locations.
            </div>
          </div>

          <div className="group bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600/50 p-10 rounded-2xl shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/30 transition-all duration-500 transform hover:scale-[1.02]">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-8 shadow-lg">
              <Book className="w-7 h-7 text-white" />
            </div>
            <div className="text-5xl font-bold text-white mb-4 font-mono tracking-tight">
              {counts.menus.toLocaleString()}
            </div>
            <div className="text-xl font-semibold text-blue-300 mb-4">Braille Menus Created</div>
            <div className="text-slate-400 leading-relaxed">
              Each menu is carefully crafted with high-quality materials and perfect braille translation.
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600/50 p-12 rounded-2xl shadow-2xl">
          <h3 className="text-3xl font-bold text-white mb-8 tracking-tight">
            Why This Matters
          </h3>
          <p className="text-lg text-slate-300 leading-relaxed font-light">
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
