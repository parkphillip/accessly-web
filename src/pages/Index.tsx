
import React from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import ImpactMetrics from '../components/ImpactMetrics';
import BrailleDemo from '../components/BrailleWorkshop';
import NetworkMap from '../components/NetworkMap';
import OrderForm from '../components/OrderForm';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
      <Navigation />
      <Hero />
      <ImpactMetrics />
      <BrailleDemo />
      <NetworkMap />
      <OrderForm />
      <Footer />
    </div>
  );
};

export default Index;
