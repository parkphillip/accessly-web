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
    <section id="impact" className="py-20 bg-gradient-to-b from-stone-50 to-amber-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-amber-200/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-stone-300/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div ref={sectionRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-playfair text-stone-800 mb-6 animate-slide-up">
            Making Real Impact
          </h2>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto font-inter animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Every braille menu we create opens doors to independence and dignity. 
            Here's how we're transforming restaurant accessibility across the country.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { 
              icon: MapPin, 
              count: counts.restaurants, 
              label: 'Partner Restaurants',
              description: 'From local cafes to national chains, restaurants trust us to make their spaces accessible.',
              color: 'from-amber-500 to-amber-600',
              bgColor: 'from-amber-50 to-amber-100',
              textColor: 'text-amber-700',
              delay: '0s'
            },
            { 
              icon: Users, 
              count: counts.customers, 
              label: 'Customers Served',
              description: 'Visually impaired diners now enjoy independent dining experiences at partner locations.',
              color: 'from-blue-500 to-blue-600',
              bgColor: 'from-blue-50 to-blue-100',
              textColor: 'text-blue-700',
              delay: '0.2s'
            },
            { 
              icon: Book, 
              count: counts.menus, 
              label: 'Braille Menus Created',
              description: 'Each menu is carefully crafted with high-quality materials and perfect braille translation.',
              color: 'from-green-500 to-green-600',
              bgColor: 'from-green-50 to-green-100',
              textColor: 'text-green-700',
              delay: '0.4s'
            }
          ].map((item, index) => (
            <div key={index} className={`group bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 hover:scale-105 animate-slide-up border border-stone-200/50`} style={{ animationDelay: item.delay }}>
              <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <item.icon className="w-8 h-8 text-white" />
              </div>
              <div className={`text-4xl font-bold font-playfair ${item.textColor} mb-2 group-hover:animate-glow transition-all duration-300`}>
                {item.count.toLocaleString()}
              </div>
              <div className="text-lg text-stone-600 mb-4 font-semibold font-inter">{item.label}</div>
              <div className="text-sm text-stone-500 font-inter group-hover:text-stone-600 transition-colors duration-300">
                {item.description}
              </div>
              
              {/* Hover effect overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.bgColor} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-amber-100 via-stone-100 to-amber-100 rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-amber-200/50 animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <h3 className="text-2xl font-bold font-playfair text-stone-800 mb-4 animate-shimmer bg-gradient-to-r from-stone-800 via-amber-800 to-stone-800 bg-clip-text bg-[length:200%_100%]">
            Why This Matters
          </h3>
          <p className="text-lg text-stone-600 max-w-4xl mx-auto font-inter leading-relaxed">
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
