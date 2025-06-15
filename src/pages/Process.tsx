
import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ProcessTimeline from '../components/ProcessTimeline';

const Process = () => {
  return (
    <div className="min-h-screen bg-light-bg">
      <Navigation />
      <main className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h1 className="text-5xl lg:text-6xl font-heading font-bold text-dark-text mb-6 leading-tight">
              Our Simple Process
            </h1>
            <p className="text-xl text-medium-text max-w-3xl mx-auto leading-relaxed">
              From request to delivery, we've streamlined everything to make
              getting braille menus effortless and completely free for your
              restaurant.
            </p>
          </div>
          <ProcessTimeline />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Process;
