
import React from 'react';
import { MapPin, User, BookOpen, Heart } from 'lucide-react';
import { FormData } from '@/types/FormData';
import FormStep from './FormStep';
import RestaurantInfoStep from './RestaurantInfoStep';
import ContactInfoStep from './ContactInfoStep';
import MenuDetailsStep from './MenuDetailsStep';
import FinalTouchesStep from './FinalTouchesStep';
import FormNavigation from './FormNavigation';

interface OrderFormContentProps {
  formData: FormData;
  currentStep: number;
  isSubmitting: boolean;
  validationErrors: string[];
  hasAttemptedContinue: boolean;
  containerHeight: number | undefined;
  stepContentRef: React.RefObject<HTMLDivElement>;
  onInputChange: (field: keyof FormData, value: string) => void;
  onPrevStep: () => void;
  onNextStep: () => void;
  onSubmit: () => void;
  validateCurrentStep: () => { isValid: boolean; errors: string[] };
}

const OrderFormContent: React.FC<OrderFormContentProps> = ({
  formData,
  currentStep,
  isSubmitting,
  validationErrors,
  hasAttemptedContinue,
  containerHeight,
  stepContentRef,
  onInputChange,
  onPrevStep,
  onNextStep,
  onSubmit,
  validateCurrentStep
}) => {
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

  const renderCurrentStep = () => {
    const errorsToShow = hasAttemptedContinue ? validationErrors : [];
    
    switch (currentStep) {
      case 1:
        return <RestaurantInfoStep formData={formData} onInputChange={onInputChange} errors={errorsToShow} />;
      case 2:
        return <ContactInfoStep formData={formData} onInputChange={onInputChange} errors={errorsToShow} />;
      case 3:
        return <MenuDetailsStep formData={formData} onInputChange={onInputChange} errors={errorsToShow} />;
      case 4:
        return <FinalTouchesStep formData={formData} onInputChange={onInputChange} errors={errorsToShow} />;
      default:
        return null;
    }
  };

  const errorsToShow = hasAttemptedContinue ? validationErrors : [];

  return (
    <>
      <div className="bg-subtle-gray/50">
        <FormStep steps={steps} currentStep={currentStep} />
      </div>
      <form className="p-8 md:p-12">
        <div style={{ height: containerHeight }} className="overflow-hidden transition-[height] duration-500 ease-in-out">
          <div ref={stepContentRef}>
            {renderCurrentStep()}
          </div>
        </div>
        <FormNavigation 
          currentStep={currentStep} 
          onPrevStep={onPrevStep} 
          onNextStep={onNextStep} 
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          canProceed={validateCurrentStep().isValid}
          validationErrors={errorsToShow}
        />
      </form>
    </>
  );
};

export default OrderFormContent;
