
import React from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import DiningLens from '../components/DiningLens';
import CostOfInaccessibility from '../components/CostOfInaccessibility';
import Footer from '../components/Footer';
import Marquee from '../components/Marquee';
import ProcessSection from '../components/ProcessSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-light-bg">
      <Navigation />
      <Hero />
      <Marquee />
      <DiningLens />
      <CostOfInaccessibility />
      <ProcessSection />
      <Footer />
    </div>
  );
};

export default Index;
