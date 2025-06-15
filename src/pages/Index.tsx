
import React from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import ImpactMetrics from '../components/ImpactMetrics';
import CostOfInaccessibility from '../components/CostOfInaccessibility';
import Footer from '../components/Footer';
import Marquee from '../components/Marquee';
import ProcessSection from '../components/ProcessSection';
import BrailleGlobe from '../components/BrailleGlobe';

const Index = () => {
  return (
    <div className="min-h-screen bg-light-bg">
      <Navigation />
      <div className="relative">
        <BrailleGlobe />
        <Hero />
      </div>
      <Marquee />
      <ImpactMetrics />
      <CostOfInaccessibility />
      <ProcessSection />
      <Footer />
    </div>
  );
};

export default Index;
