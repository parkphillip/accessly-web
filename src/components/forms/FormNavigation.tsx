
import React from 'react';
import { Heart, ArrowLeft, ArrowRight } from 'lucide-react';

interface FormNavigationProps {
  currentStep: number;
  onPrevStep: () => void;
  onNextStep: () => void;
  onSubmit: () => void;
}

const FormNavigation: React.FC<FormNavigationProps> = ({ 
  currentStep, 
  onPrevStep, 
  onNextStep, 
  onSubmit 
}) => {
  return (
    <div className="flex justify-between items-center mt-12 pt-8 border-t border-light-gray">
      <button
        type="button"
        onClick={onPrevStep}
        className="secondary-button disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        disabled={currentStep === 1}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Go Back
      </button>

      {currentStep < 4 ? (
        <button
          type="button"
          onClick={onNextStep}
          className="primary-button flex items-center"
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      ) : (
        <button
          type="button"
          onClick={onSubmit}
          className="primary-button bg-brand-terracotta hover:bg-brand-terracotta/90 flex items-center"
        >
          <Heart className="w-4 h-4 mr-2" />
          Submit Request
        </button>
      )}
    </div>
  );
};

export default FormNavigation;
