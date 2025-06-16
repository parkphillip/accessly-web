
import React from 'react';
import GoogleMap from './GoogleMap';

// Sample restaurant locations for demonstration
const restaurantLocations = [
  { lat: 40.7128, lng: -74.0060, name: "NYC Restaurant" },
  { lat: 34.0522, lng: -118.2437, name: "LA Restaurant" },
  { lat: 41.8781, lng: -87.6298, name: "Chicago Restaurant" },
  { lat: 29.7604, lng: -95.3698, name: "Houston Restaurant" },
  { lat: 33.4484, lng: -112.0740, name: "Phoenix Restaurant" },
];

const NetworkMap = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-dark-text mb-4">
            Our Network
          </h2>
          <p className="text-lg text-medium-text max-w-3xl mx-auto">
            See where we're making dining more accessible across the country.
          </p>
        </div>
        
        <div className="bg-light-bg rounded-2xl p-8">
          <GoogleMap locations={restaurantLocations} />
        </div>
      </div>
    </section>
  );
};

export default NetworkMap;
