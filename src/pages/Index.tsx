
import React from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import ImpactMetrics from '../components/ImpactMetrics';
import BrailleWorkshop from '../components/BrailleWorkshop';
import NetworkMap from '../components/NetworkMap';
import OrderForm from '../components/OrderForm';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      <Hero />
      <ImpactMetrics />
      <BrailleWorkshop />
      <NetworkMap />
      <OrderForm />
      <Footer />
    </div>
  );
};

export default Index;
