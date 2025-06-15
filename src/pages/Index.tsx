
import React from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import ImpactMetrics from '../components/ImpactMetrics';
import NetworkMap from '../components/NetworkMap';
import Footer from '../components/Footer';
import Marquee from '../components/Marquee';
import ProcessSection from '../components/ProcessSection';
import CostOfInaccessibility from '../components/CostOfInaccessibility';
import MissionIntro from '../components/MissionIntro';
import PartnerCTA from '../components/PartnerCTA';

const Index = () => {
  return (
    <div className="min-h-screen bg-light-bg">
      <Navigation />
      <Hero />
      <Marquee />
      <ImpactMetrics />
      <CostOfInaccessibility />
      <MissionIntro />
      <ProcessSection />
      <PartnerCTA />
      <NetworkMap />
      <Footer />
    </div>
  );
};

export default Index;
