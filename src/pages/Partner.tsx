
import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import OrderForm from '../components/OrderForm';

const Partner = () => {
  return (
    <div className="min-h-screen bg-light-bg">
      <Navigation />
      <main>
        <OrderForm />
      </main>
      <Footer />
    </div>
  );
};

export default Partner;
