
import React from 'react';
import { Heart, ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';

interface FormNavigationProps {
  currentStep: number;
  onPrevStep: () => void;
  onNextStep: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

const FormNavigation: React.FC<FormNavigationProps> = ({ 
  currentStep, 
  onPrevStep, 
  onNextStep, 
  onSubmit,
  isSubmitting = false
}) => {
  return (
    <div className="flex justify-between items-center mt-12 pt-8 border-t border-light-gray">
      <button
        type="button"
        onClick={onPrevStep}
        className="secondary-button disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        disabled={currentStep === 1 || isSubmitting}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Go Back
      </button>

      {currentStep < 4 ? (
        <button
          type="button"
          onClick={onNextStep}
          className="primary-button flex items-center"
          disabled={isSubmitting}
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      ) : (
        <button
          type="button"
          onClick={onSubmit}
          className="primary-button bg-brand-terracotta hover:bg-brand-terracotta/90 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Heart className="w-4 h-4 mr-2" />
              Submit Request
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default FormNavigation;
