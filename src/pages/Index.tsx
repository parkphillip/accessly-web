
import React from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import ImpactMetrics from '../components/ImpactMetrics';
import BrailleMenuBook from '../components/BrailleMenuBook';
import NetworkMap from '../components/NetworkMap';
import OrderForm from '../components/OrderForm';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-900">
      <Navigation />
      <Hero />
      <ImpactMetrics />
      <BrailleMenuBook />
      <NetworkMap />
      <OrderForm />
      <Footer />
    </div>
  );
};

export default Index;
