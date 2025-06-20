import React from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import DiningLens from '../components/DiningLens';
import CostOfInaccessibility from '../components/CostOfInaccessibility';
import Footer from '../components/Footer';
import ProcessSection from '../components/ProcessSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-light-bg overflow-x-hidden">
      <Navigation />
      <Hero />
      <DiningLens />
      <CostOfInaccessibility />
      <ProcessSection />
      <Footer />
    </div>
  );
};
// this is gonna be a game changer for next launch
export default Index;
