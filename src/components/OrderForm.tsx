
import React, { useState } from 'react';
import { Store, User, FileText, Sparkles } from 'lucide-react';
import FormStep from './forms/FormStep';
import RestaurantInfoStep from './forms/RestaurantInfoStep';
import ContactInfoStep from './forms/ContactInfoStep';
import MenuDetailsStep from './forms/MenuDetailsStep';
import FinalTouchesStep from './forms/FinalTouchesStep';
import FormNavigation from './forms/FormNavigation';

interface FormData {
  // Restaurant info
  restaurantName: string;
  address: string;
  city: string;
  state: string;
  
  // Contact info
  contactName: string;
  email: string;
  phone: string;
  
  // Menu details
  menuType: string;
  menuContent: string;
  
  // Final touches
  materialPreference: string;
  additionalNotes: string;
}

const OrderForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    restaurantName: '',
    address: '',
    city: '',
    state: '',
    contactName: '',
    email: '',
    phone: '',
    menuType: 'full-menu',
    menuContent: '',
    materialPreference: 'standard',
    additionalNotes: '',
  });

  const steps = [
    { number: 1, title: 'Tell us about your restaurant', icon: Store, note: 'Where you are' },
    { number: 2, title: 'How can we reach you?', icon: User, note: 'Contact info' },
    { number: 3, title: 'Share your menu with us', icon: FileText, note: 'Menu details' },
    { number: 4, title: 'Final touches', icon: Sparkles, note: 'Almost done!' },
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Thank you! We\'ll be in touch within 24 hours to get your free braille menus started.');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <RestaurantInfoStep formData={formData} onInputChange={handleInputChange} />;
      case 2:
        return <ContactInfoStep formData={formData} onInputChange={handleInputChange} />;
      case 3:
        return <MenuDetailsStep formData={formData} onInputChange={handleInputChange} />;
      case 4:
        return <FinalTouchesStep formData={formData} onInputChange={handleInputChange} />;
      default:
        return null;
    }
  };

  return (
    <section id="order" className="py-32 bg-paper relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-32 left-32 w-48 h-48 bg-sage/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-32 w-64 h-64 bg-dusty-blue/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-8 lg:px-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 relative">
          <div className="absolute -top-8 -right-16 font-script text-sage text-2xl transform rotate-12">
            This will only take 3 minutes! →
          </div>
          
          <h2 className="text-6xl lg:text-7xl font-serif font-bold text-charcoal mb-8 scribble-underline">
            Get Your Free Braille Menus
          </h2>
          <p className="text-2xl text-pencil max-w-4xl mx-auto leading-relaxed font-light">
            We'll work with you to create beautiful, professional braille menus at absolutely no cost.
            <span className="font-script text-dusty-blue"> Ready to make your restaurant more accessible?</span>
          </p>
        </div>

        {/* Form Container */}
        <div className="paper-card rounded-3xl shadow-paper-lift overflow-hidden transform hover:rotate-0 transition-all duration-500">
          <FormStep steps={steps} currentStep={currentStep} />
          
          <div className="p-16">
            {renderCurrentStep()}
            <FormNavigation
              currentStep={currentStep}
              onPrevStep={handlePrevStep}
              onNextStep={handleNextStep}
              onSubmit={handleSubmit}
            />
          </div>
        </div>

        {/* Trust indicators */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-8 bg-cream/60 px-12 py-6 rounded-full shadow-inner-paper">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-sage rounded-full"></div>
              <span className="text-lg text-pencil font-light">100% Free Forever</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-dusty-blue rounded-full"></div>
              <span className="text-lg text-pencil font-light">No Hidden Fees</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-coffee rounded-full"></div>
              <span className="text-lg text-pencil font-light">Professional Quality</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderForm;
