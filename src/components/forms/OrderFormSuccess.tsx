
import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const OrderFormSuccess: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <h3 className="text-3xl font-bold mb-4">
        Thank you, we will be in touch with you shortly
      </h3>
      <div className="flex space-x-6 mt-6">
        <a href="#" aria-label="Facebook" className="text-gray-500 hover:text-primary">
          <Facebook size={32} />
        </a>
        <a href="#" aria-label="Twitter" className="text-gray-500 hover:text-primary">
          <Twitter size={32} />
        </a>
        <a href="#" aria-label="Instagram" className="text-gray-500 hover:text-primary">
          <Instagram size={32} />
        </a>
      </div>
    </div>
  );
};

export default OrderFormSuccess;
