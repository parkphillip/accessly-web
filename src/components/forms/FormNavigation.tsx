
import React from 'react';
import { Heart } from 'lucide-react';

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
    <div className="flex justify-between mt-12 pt-8 border-t-2 border-warm-gray/30">
      <button
        type="button"
        onClick={onPrevStep}
        className={`px-8 py-4 rounded-2xl font-serif font-semibold transition-all duration-300 ${
          currentStep === 1 
            ? 'bg-warm-gray/30 text-pencil/50 cursor-not-allowed border-2 border-warm-gray/30' 
            : 'bg-paper text-charcoal hover:bg-cream/80 border-2 border-warm-gray/50 hover:border-dusty-blue/50 shadow-paper hover:shadow-paper-lift transform hover:-rotate-1'
        }`}
        disabled={currentStep === 1}
      >
        ← Go Back
      </button>

      {currentStep < 4 ? (
        <button
          type="button"
          onClick={onNextStep}
          className="bg-gradient-to-r from-sage to-dusty-blue text-cream px-8 py-4 rounded-2xl font-serif font-semibold hover:shadow-paper-lift transition-all duration-300 flex items-center gap-3 shadow-paper transform hover:rotate-1 relative"
        >
          <span>Continue →</span>
          <div className="absolute -top-2 -right-2 font-script text-xs text-sage/70 transform rotate-12">
            Keep going!
          </div>
        </button>
      ) : (
        <button
          type="button"
          onClick={onSubmit}
          className="bg-gradient-to-r from-coffee to-sage text-cream px-10 py-4 rounded-2xl font-serif font-semibold hover:shadow-paper-lift transition-all duration-300 flex items-center gap-3 shadow-paper transform hover:-rotate-1 relative"
        >
          <Heart className="w-5 h-5" />
          <span>Send My Request</span>
          <div className="absolute -top-3 -right-3 font-script text-xs text-coffee/70 transform rotate-12">
            Let's do this!
          </div>
        </button>
      )}
    </div>
  );
};

export default FormNavigation;
