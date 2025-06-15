import React, { useState, useRef, useEffect } from 'react';
import { MapPin, User, BookOpen, Heart } from 'lucide-react';
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
    additionalNotes: ''
  });
  const [containerHeight, setContainerHeight] = useState<number | undefined>();
  const stepContentRef = useRef<HTMLDivElement>(null);
  const steps = [{
    number: 1,
    title: 'Restaurant Info',
    icon: MapPin,
    note: 'Location details'
  }, {
    number: 2,
    title: 'Contact Person',
    icon: User,
    note: 'How we reach you'
  }, {
    number: 3,
    title: 'Menu Details',
    icon: BookOpen,
    note: 'What to convert'
  }, {
    number: 4,
    title: 'Finalize',
    icon: Heart,
    note: 'Review & Submit'
  }];
  useEffect(() => {
    if (stepContentRef.current) {
      setContainerHeight(stepContentRef.current.scrollHeight);
    }
  }, [currentStep]);
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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
  return <section className="py-24 bg-light-bg">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-dark-text mb-4 headline-underline">
            Partner with Us
          </h2>
          <p className="text-lg text-medium-text max-w-3xl mx-auto">Join hundreds of restaurants in making dining more accessible. </p>
        </div>

        <div className="structured-card overflow-hidden">
          <div className="bg-subtle-gray/50">
            <FormStep steps={steps} currentStep={currentStep} />
          </div>

          <form className="p-8 md:p-12">
            <div style={{
            height: containerHeight
          }} className="overflow-hidden transition-[height] duration-500 ease-in-out">
              <div ref={stepContentRef}>
                {renderCurrentStep()}
              </div>
            </div>
            <FormNavigation currentStep={currentStep} onPrevStep={prevStep} onNextStep={nextStep} onSubmit={handleSubmit} />
          </form>
        </div>
      </div>
    </section>;
};
export default OrderForm;