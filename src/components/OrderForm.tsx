
import React, { useState } from 'react';
import { MapPin, User, Book, Heart } from 'lucide-react';
import FormStep from './forms/FormStep';
import RestaurantInfoStep from './forms/RestaurantInfoStep';
import ContactInfoStep from './forms/ContactInfoStep';
import MenuDetailsStep from './forms/MenuDetailsStep';
import FinalTouchesStep from './forms/FinalTouchesStep';
import FormNavigation from './forms/FormNavigation';

interface FormData {
  restaurantName: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  menuType: string;
  menuContent: string;
  materialPreference: string;
  additionalNotes: string;
}

const OrderForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    restaurantName: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    menuType: 'full-menu',
    menuContent: '',
    materialPreference: 'standard',
    additionalNotes: '',
  });

  const steps = [
    { number: 1, title: 'Your Restaurant', icon: MapPin, note: 'Tell us about your place' },
    { number: 2, title: 'Contact Info', icon: User, note: 'How we reach you' },
    { number: 3, title: 'Menu Details', icon: Book, note: 'What to convert' },
    { number: 4, title: 'Final Touches', icon: Heart, note: 'Almost done!' },
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Thank you! We\'ll create your free braille menus and be in touch within 24 hours.');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <RestaurantInfoStep 
            formData={formData} 
            onInputChange={handleInputChange} 
          />
        );
      case 2:
        return (
          <ContactInfoStep 
            formData={formData} 
            onInputChange={handleInputChange} 
          />
        );
      case 3:
        return (
          <MenuDetailsStep 
            formData={formData} 
            onInputChange={handleInputChange} 
          />
        );
      case 4:
        return (
          <FinalTouchesStep 
            formData={formData} 
            onInputChange={handleInputChange} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <section id="order" className="py-32 bg-warm-gray relative overflow-hidden">
      {/* Paper texture overlay */}
      <div className="absolute inset-0 opacity-30 bg-paper-texture"></div>
      
      {/* Handwritten decorative elements */}
      <div className="absolute top-20 right-16 transform rotate-12">
        <div className="font-script text-4xl text-sage opacity-40">Let's do this!</div>
        <div className="w-24 h-2 bg-sage opacity-30 transform -rotate-6 mt-2 rounded-full"></div>
      </div>
      
      <div className="absolute bottom-32 left-12 transform -rotate-12">
        <div className="font-script text-2xl text-dusty-blue opacity-50">Free forever ♡</div>
      </div>

      <div className="w-full mx-auto px-6 lg:px-12 xl:px-16 relative">
        <div className="text-center mb-20">
          <div className="relative inline-block">
            <h2 className="text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-charcoal mb-8 leading-tight">
              Let's Make Your Restaurant More Accessible
            </h2>
            {/* Hand-drawn underline */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-4/5 h-4 bg-sage/20 transform -rotate-1 rounded-full"></div>
          </div>
          <p className="text-xl lg:text-2xl text-pencil max-w-4xl mx-auto leading-relaxed font-light">
            Ready to welcome more diners? This quick form helps us create perfect braille menus 
            for your restaurant. No cost, no catch—just better accessibility.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="paper-card rounded-3xl shadow-paper-lift overflow-hidden transform -rotate-1">
            <FormStep steps={steps} currentStep={currentStep} />

            <form className="p-12 bg-paper/50">
              {renderCurrentStep()}
              <FormNavigation
                currentStep={currentStep}
                onPrevStep={prevStep}
                onNextStep={nextStep}
                onSubmit={handleSubmit}
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderForm;
