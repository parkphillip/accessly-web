
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import DonationForm from '@/components/DonationForm';

const Fund = () => {
  return (
    <div className="bg-off-white min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow pt-16">
        <DonationForm />
      </main>
      <Footer />
    </div>
  );
};

export default Fund;
