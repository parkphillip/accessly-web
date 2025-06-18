import React from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import DiningLens from '../components/DiningLens';
import CostOfInaccessibility from '../components/CostOfInaccessibility';
import Footer from '../components/Footer';
import ProcessSection from '../components/ProcessSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-light-bg">
      <Navigation />
      <Hero />
      <div className="my-12" />
      <DiningLens />
      <div className="my-12" />
      <CostOfInaccessibility />
      <div className="my-12" />
      <ProcessSection />
      <Footer />
    </div>
  );
};

export default Index;
