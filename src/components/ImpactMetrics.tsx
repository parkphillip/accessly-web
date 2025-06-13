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
  return (
    <section id="impact" className="py-32 bg-warm-tan/30 bg-stone-200">
      <div className="max-w-8xl mx-auto px-8 lg:px-16">
        <div ref={sectionRef} className="text-center mb-32 relative">
          {/* Hand-drawn circle around title */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg width="500" height="250" className="text-sage/20">
              <ellipse cx="250" cy="125" rx="220" ry="100" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="5,5" opacity="0.4" transform="rotate(-2 250 125)" />
            </svg>
          </div>
          
          <h2 className="text-6xl lg:text-8xl font-serif font-bold text-charcoal mb-12 relative">
            Making Real Impact
          </h2>
          
          {/* Handwritten annotation */}
          <div className="absolute top-0 right-1/4 font-script text-dusty-blue text-2xl transform rotate-12">
            These are real numbers!
          </div>
          
          <p className="text-2xl lg:text-3xl text-pencil max-w-4xl mx-auto leading-relaxed font-light">
            Every braille menu we create opens doors to independence and dignity. 
            <span className="font-script text-sage"> Here's the human story in numbers.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
          {/* Restaurant metric with paper aesthetic */}
          <div className="group paper-card p-16 transform hover:scale-105 hover:-rotate-1 transition-all duration-500 relative overflow-hidden">
            <div className="w-20 h-20 bg-sage/20 border-2 border-sage/40 rounded-xl flex items-center justify-center mb-12 shadow-paper transform rotate-3">
              <MapPin className="w-10 h-10 text-sage" />
            </div>
            
            {/* Hand-drawn underline for the number */}
            <div className="relative mb-10">
              <div className="text-7xl font-serif font-bold text-charcoal font-mono">
                {counts.restaurants.toLocaleString()}
              </div>
              <div className="absolute -bottom-3 left-0 w-full h-2 bg-sage/30 transform -rotate-1 rounded-full"></div>
            </div>
            
            <div className="text-2xl font-serif font-semibold text-sage mb-6">Partner Restaurants</div>
            <div className="text-lg text-pencil leading-relaxed">
              From corner cafes to national chains, restaurants trust us to make their spaces accessible.
            </div>
            
            {/* Sticky note style testimonial */}
            <div className="absolute -bottom-3 -right-3 bg-cream p-3 shadow-paper rounded transform rotate-6 border-l-2 border-dusty-blue/30">
              <div className="font-script text-sm text-charcoal">"Game changer!"</div>
            </div>
          </div>

          {/* Customer metric */}
          <div className="group paper-card p-16 transform hover:scale-105 hover:rotate-1 transition-all duration-500 relative">
            <div className="w-20 h-20 bg-dusty-blue/20 border-2 border-dusty-blue/40 rounded-xl flex items-center justify-center mb-12 shadow-paper transform -rotate-2">
              <Users className="w-10 h-10 text-dusty-blue" />
            </div>
            
            <div className="relative mb-10">
              <div className="text-7xl font-serif font-bold text-charcoal font-mono">
                {counts.customers.toLocaleString()}
              </div>
              {/* Scribbled circle around number */}
              <svg className="absolute -inset-6 w-full h-full pointer-events-none" viewBox="0 0 100 60">
                <ellipse cx="50" cy="30" rx="45" ry="25" stroke="#6b7c94" strokeWidth="2" fill="none" strokeDasharray="3,2" opacity="0.3" transform="rotate(5 50 30)" />
              </svg>
            </div>
            
            <div className="text-2xl font-serif font-semibold text-dusty-blue mb-6">Customers Served</div>
            <div className="text-lg text-pencil leading-relaxed">
              Visually impaired diners now enjoy independent dining experiences nationwide.
            </div>
            
            {/* Handwritten arrow */}
            <div className="absolute -top-6 -left-6 font-script text-sage text-lg transform -rotate-12">
              <span>Growing daily!</span>
              <div className="w-16 h-8 relative">
                <svg viewBox="0 0 48 24" className="absolute inset-0">
                  <path d="M2 20 Q 24 8 42 16" stroke="#8a9a7d" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <polygon points="40,14 42,16 40,18" fill="#8a9a7d" />
                </svg>
              </div>
            </div>
          </div>

          {/* Menus metric */}
          <div className="group paper-card p-16 transform hover:scale-105 hover:-rotate-1 transition-all duration-500 relative">
            <div className="w-20 h-20 bg-coffee/20 border-2 border-coffee/40 rounded-xl flex items-center justify-center mb-12 shadow-paper transform rotate-1">
              <Book className="w-10 h-10 text-coffee" />
            </div>
            
            <div className="text-7xl font-serif font-bold text-charcoal font-mono mb-10">
              {counts.menus.toLocaleString()}
            </div>
            
            <div className="text-2xl font-serif font-semibold text-coffee mb-6">Braille Menus Created</div>
            <div className="text-lg text-pencil leading-relaxed">
              Each menu is carefully crafted with high-quality materials and perfect braille translation.
            </div>
            
            {/* Paper clip decoration */}
            <div className="absolute top-6 right-6 w-8 h-12 border-2 border-warm-gray rounded-t-full transform rotate-12 opacity-60"></div>
          </div>
        </div>

        {/* Why This Matters section with editorial layout */}
        <div className="relative">
          <div className="paper-card p-20 transform -rotate-1 shadow-paper-lift relative overflow-hidden">
            {/* Watercolor wash background */}
            <div className="absolute top-0 right-0 w-60 h-60 bg-sage/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-dusty-blue/10 rounded-full blur-2xl"></div>
            
            <div className="relative">
              <h3 className="text-5xl font-serif font-bold text-charcoal mb-12 scribble-underline">
                Why This Matters
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                <div className="lg:col-span-2">
                  <p className="text-2xl text-pencil leading-relaxed font-light mb-8">
                    <span className="font-serif font-semibold text-charcoal">24 million Americans</span> have significant vision loss, yet most restaurants remain inaccessible. 
                  </p>
                  <p className="text-2xl text-pencil leading-relaxed font-light">
                    By providing <span className="font-script text-sage text-3xl">free braille menus</span>, we're not just improving dining experiences—we're fostering 
                    independence, dignity, and true inclusion in our communities.
                  </p>
                </div>
                
                {/* Pull quote with handwritten style */}
                <div className="paper-card p-8 transform rotate-2 shadow-paper border-l-4 border-sage/50">
                  <div className="font-script text-2xl text-charcoal leading-relaxed">
                    "Every dot we emboss is a door we open to independence."
                  </div>
                  <div className="font-sans text-lg text-pencil mt-6">— Maria, Braille Reader</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Scattered elements around the main card */}
          <div className="absolute -top-6 -left-6 w-12 h-12 bg-warm-tan shadow-paper rounded transform rotate-45 opacity-60"></div>
          <div className="absolute -bottom-4 -right-4 w-8 h-16 bg-dusty-blue/20 shadow-paper rounded transform -rotate-12 opacity-70"></div>
        </div>
      </div>
    </section>
  );
};

export default ImpactMetrics;
