
import React from 'react';
import Navigation from '@/components/Navigation';
import NetworkMap from '@/components/NetworkMap';
import Footer from '@/components/Footer';

const Network = () => {
  return (
    <div className="bg-off-white min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow pt-16">
        <NetworkMap />
      </main>
      <Footer />
    </div>
  );
};

export default Network;
