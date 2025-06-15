import React, { useState, useEffect, useRef } from 'react';
import { Users, MapPin, BookOpenCheck } from 'lucide-react';
const ImpactMetrics = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    restaurants: 0,
    customers: 0,
    menus: 0
  });
  const sectionRef = useRef<HTMLDivElement>(null);
  const finalCounts = {
    restaurants: 847,
    customers: 12500,
    menus: 3240
  };
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, {
      threshold: 0.3
    });
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
          menus: Math.floor(finalCounts.menus * progress)
        });
        if (step >= steps) {
          clearInterval(interval);
          setCounts(finalCounts);
        }
      }, stepDuration);
      return () => clearInterval(interval);
    }
  }, [isVisible]);
  return <section id="impact" className="py-24 bg-subtle-gray/50 bg-slate-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={sectionRef} className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-dark-text mb-4">
            Making a Tangible Difference
          </h2>
          <p className="text-lg text-medium-text max-w-3xl mx-auto">
            Every menu we deliver contributes to a more independent and dignified dining experience. Here's the story told through our data.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Metric Card */}
          <div className="structured-card p-8 text-center">
            <div className="w-14 h-14 bg-brand-navy/10 text-brand-navy rounded-xl flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-7 h-7" />
            </div>
            <div className="text-5xl font-mono font-bold text-dark-text mb-2">
              {counts.restaurants.toLocaleString()}
            </div>
            <div className="text-lg font-heading font-semibold text-brand-navy mb-2">Partner Restaurants</div>
            <p className="text-medium-text text-sm">
              From corner cafes to national chains across the country.
            </p>
          </div>

          {/* Metric Card */}
          <div className="structured-card p-8 text-center">
            <div className="w-14 h-14 bg-brand-terracotta/10 text-brand-terracotta rounded-xl flex items-center justify-center mx-auto mb-6">
              <Users className="w-7 h-7" />
            </div>
            <div className="text-5xl font-mono font-bold text-dark-text mb-2">
              {counts.customers.toLocaleString()}+
            </div>
            <div className="text-lg font-heading font-semibold text-brand-terracotta mb-2">Diners Empowered</div>
            <p className="text-medium-text text-sm">
              Individuals who can now order with independence and privacy.
            </p>
          </div>

          {/* Metric Card */}
          <div className="structured-card p-8 text-center">
            <div className="w-14 h-14 bg-medium-text/10 text-medium-text rounded-xl flex items-center justify-center mx-auto mb-6">
              <BookOpenCheck className="w-7 h-7" />
            </div>
            <div className="text-5xl font-mono font-bold text-dark-text mb-2">
              {counts.menus.toLocaleString()}
            </div>
            <div className="text-lg font-heading font-semibold text-medium-text mb-2">Braille Menus Delivered</div>
            <p className="text-medium-text text-sm">
              Each one is quality-checked and produced entirely free of charge.
            </p>
          </div>
        </div>

        {/* Why This Matters section */}
        <div className="structured-card bg-brand-navy text-off-white p-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <h3 className="text-3xl font-heading font-bold mb-4 headline-underline after:bg-brand-terracotta">
                More Than Just Dots
              </h3>
              <p className="text-lg text-off-white/80 leading-relaxed">
                An estimated <span className="font-bold text-off-white">2.2 billion people</span> globally have a near or distance vision impairment. Providing braille menus is a crucial step towards creating equitable public spaces. It's not just about compliance; it's about fostering a culture of respect, dignity, and true hospitality.
              </p>
            </div>
            
            <div className="bg-black/20 p-6 rounded-lg border border-off-white/20">
              <blockquote className="text-xl font-heading italic text-off-white leading-relaxed">
                "For the first time, I felt like just another customer, not a burden. That feeling is priceless."
              </blockquote>
              <p className="font-sans text-sm text-off-white/70 mt-4">— Jessica L., Diner in Austin, TX</p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default ImpactMetrics;