
import React from 'react';
import { Heart, ArrowLeft, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

interface FormNavigationProps {
  currentStep: number;
  onPrevStep: () => void;
  onNextStep: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
  canProceed?: boolean;
  validationErrors?: string[];
}

const FormNavigation: React.FC<FormNavigationProps> = ({ 
  currentStep, 
  onPrevStep, 
  onNextStep, 
  onSubmit,
  isSubmitting = false,
  canProceed = true,
  validationErrors = []
}) => {
  return (
    <div className="mt-12 pt-8 border-t border-light-gray">
      {validationErrors.length > 0 && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-red-800 mb-2">Please fix the following errors:</h4>
              <ul className="text-sm text-red-700 space-y-1">
                {validationErrors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex justify-between items-center">
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
            className="primary-button flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting || !canProceed}
          >
            Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onSubmit}
            className="primary-button bg-brand-terracotta hover:bg-brand-terracotta/90 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting || !canProceed}
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
    </div>
  );
};

export default FormNavigation;
