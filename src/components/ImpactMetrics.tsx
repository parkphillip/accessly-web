import React, { useState, useEffect, useRef } from 'react';
import { Users, MapPin, Book } from 'lucide-react';
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
  return <section id="impact" className="py-24 bg-warm-tan/30 bg-stone-200">
      <div className="max-w-7xl mx-auto px-8">
        <div ref={sectionRef} className="text-center mb-20 relative">
          {/* Hand-drawn circle around title */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg width="400" height="200" className="text-sage/20">
              <ellipse cx="200" cy="100" rx="180" ry="80" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="5,5" opacity="0.4" transform="rotate(-2 200 100)" />
            </svg>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-serif font-bold text-charcoal mb-8 relative">
            Making Real Impact
          </h2>
          
          {/* Handwritten annotation */}
          <div className="absolute top-0 right-1/4 font-script text-dusty-blue text-lg transform rotate-12">
            These are real numbers!
          </div>
          
          <p className="text-xl text-pencil max-w-3xl mx-auto leading-relaxed font-light">
            Every braille menu we create opens doors to independence and dignity. 
            <span className="font-script text-sage"> Here's the human story in numbers.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Restaurant metric with paper aesthetic */}
          <div className="group paper-card p-10 transform hover:scale-105 hover:-rotate-1 transition-all duration-500 relative overflow-hidden">
            <div className="w-14 h-14 bg-sage/20 border-2 border-sage/40 rounded-xl flex items-center justify-center mb-8 shadow-paper transform rotate-3">
              <MapPin className="w-7 h-7 text-sage" />
            </div>
            
            {/* Hand-drawn underline for the number */}
            <div className="relative mb-6">
              <div className="text-5xl font-serif font-bold text-charcoal font-mono">
                {counts.restaurants.toLocaleString()}
              </div>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-sage/30 transform -rotate-1 rounded-full"></div>
            </div>
            
            <div className="text-xl font-serif font-semibold text-sage mb-4">Partner Restaurants</div>
            <div className="text-pencil leading-relaxed">
              From corner cafes to national chains, restaurants trust us to make their spaces accessible.
            </div>
            
            {/* Sticky note style testimonial */}
            <div className="absolute -bottom-2 -right-2 bg-cream p-2 shadow-paper rounded transform rotate-6 border-l-2 border-dusty-blue/30">
              <div className="font-script text-xs text-charcoal">"Game changer!"</div>
            </div>
          </div>

          {/* Customer metric */}
          <div className="group paper-card p-10 transform hover:scale-105 hover:rotate-1 transition-all duration-500 relative">
            <div className="w-14 h-14 bg-dusty-blue/20 border-2 border-dusty-blue/40 rounded-xl flex items-center justify-center mb-8 shadow-paper transform -rotate-2">
              <Users className="w-7 h-7 text-dusty-blue" />
            </div>
            
            <div className="relative mb-6">
              <div className="text-5xl font-serif font-bold text-charcoal font-mono">
                {counts.customers.toLocaleString()}
              </div>
              {/* Scribbled circle around number */}
              <svg className="absolute -inset-4 w-full h-full pointer-events-none" viewBox="0 0 100 60">
                <ellipse cx="50" cy="30" rx="45" ry="25" stroke="#6b7c94" strokeWidth="2" fill="none" strokeDasharray="3,2" opacity="0.3" transform="rotate(5 50 30)" />
              </svg>
            </div>
            
            <div className="text-xl font-serif font-semibold text-dusty-blue mb-4">Customers Served</div>
            <div className="text-pencil leading-relaxed">
              Visually impaired diners now enjoy independent dining experiences nationwide.
            </div>
            
            {/* Handwritten arrow */}
            <div className="absolute -top-4 -left-4 font-script text-sage text-sm transform -rotate-12">
              <span>Growing daily!</span>
              <div className="w-12 h-6 relative">
                <svg viewBox="0 0 48 24" className="absolute inset-0">
                  <path d="M2 20 Q 24 8 42 16" stroke="#8a9a7d" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <polygon points="40,14 42,16 40,18" fill="#8a9a7d" />
                </svg>
              </div>
            </div>
          </div>

          {/* Menus metric */}
          <div className="group paper-card p-10 transform hover:scale-105 hover:-rotate-1 transition-all duration-500 relative">
            <div className="w-14 h-14 bg-coffee/20 border-2 border-coffee/40 rounded-xl flex items-center justify-center mb-8 shadow-paper transform rotate-1">
              <Book className="w-7 h-7 text-coffee" />
            </div>
            
            <div className="text-5xl font-serif font-bold text-charcoal font-mono mb-6">
              {counts.menus.toLocaleString()}
            </div>
            
            <div className="text-xl font-serif font-semibold text-coffee mb-4">Braille Menus Created</div>
            <div className="text-pencil leading-relaxed">
              Each menu is carefully crafted with high-quality materials and perfect braille translation.
            </div>
            
            {/* Paper clip decoration */}
            <div className="absolute top-4 right-4 w-6 h-8 border-2 border-warm-gray rounded-t-full transform rotate-12 opacity-60"></div>
          </div>
        </div>

        {/* Why This Matters section with editorial layout */}
        <div className="relative">
          <div className="paper-card p-12 transform -rotate-1 shadow-paper-lift relative overflow-hidden">
            {/* Watercolor wash background */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-sage/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-dusty-blue/10 rounded-full blur-2xl"></div>
            
            <div className="relative">
              <h3 className="text-3xl font-serif font-bold text-charcoal mb-8 scribble-underline">
                Why This Matters
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2">
                  <p className="text-lg text-pencil leading-relaxed font-light mb-6">
                    <span className="font-serif font-semibold text-charcoal">24 million Americans</span> have significant vision loss, yet most restaurants remain inaccessible. 
                  </p>
                  <p className="text-lg text-pencil leading-relaxed font-light">
                    By providing <span className="font-script text-sage text-xl">free braille menus</span>, we're not just improving dining experiences—we're fostering 
                    independence, dignity, and true inclusion in our communities.
                  </p>
                </div>
                
                {/* Pull quote with handwritten style */}
                <div className="paper-card p-6 transform rotate-2 shadow-paper border-l-4 border-sage/50">
                  <div className="font-script text-xl text-charcoal leading-relaxed">
                    "Every dot we emboss is a door we open to independence."
                  </div>
                  <div className="font-sans text-sm text-pencil mt-4">— Maria, Braille Reader</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Scattered elements around the main card */}
          <div className="absolute -top-4 -left-4 w-8 h-8 bg-warm-tan shadow-paper rounded transform rotate-45 opacity-60"></div>
          <div className="absolute -bottom-3 -right-3 w-6 h-10 bg-dusty-blue/20 shadow-paper rounded transform -rotate-12 opacity-70"></div>
        </div>
      </div>
    </section>;
};
export default ImpactMetrics;