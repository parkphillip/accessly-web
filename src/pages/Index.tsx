

import React from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import ImpactMetrics from '../components/ImpactMetrics';
import NetworkMap from '../components/NetworkMap';
import OrderForm from '../components/OrderForm';
import Footer from '../components/Footer';
import Marquee from '../components/Marquee';

const Index = () => {
  return (
    <div className="min-h-screen bg-light-bg">
      <Navigation />
      <Hero />
      <Marquee />
      <ImpactMetrics />
      <NetworkMap />
      <OrderForm />
      <Footer />
    </div>
  );
};

export default Index;
