
import React from 'react';
import { Check, LucideIcon } from 'lucide-react';

interface FormStepProps {
  steps: {
    number: number;
    title: string;
    icon: LucideIcon;
    note: string;
  }[];
  currentStep: number;
}

const FormStep: React.FC<FormStepProps> = ({ steps, currentStep }) => {
  return (
    <div className="bg-cream/80 border-b-2 border-warm-gray/30 p-8 linen-texture">
      <div className="flex items-center justify-between mb-6">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.number} className="flex items-center">
              <div className="text-center">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 transform ${
                  currentStep >= step.number 
                    ? 'bg-sage border-sage/60 text-cream shadow-paper rotate-3' 
                    : 'bg-paper border-warm-gray/50 text-pencil'
                }`}>
                  {currentStep > step.number ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <Icon className="w-6 h-6" />
                  )}
                </div>
                <div className="mt-2 font-script text-sm text-pencil transform rotate-1">
                  {step.note}
                </div>
              </div>
              {index < 3 && (
                <div className={`w-16 h-1 mx-4 transition-all duration-500 rounded-full ${
                  currentStep > step.number 
                    ? 'bg-sage shadow-sm transform rotate-1' 
                    : 'bg-warm-gray/50'
                }`}></div>
              )}
            </div>
          );
        })}
      </div>
      <div className="text-center">
        <h3 className="text-2xl font-serif font-semibold text-charcoal">
          {steps[currentStep - 1].title}
        </h3>
        <div className="font-script text-sage mt-1">
          Step {currentStep} of 4
        </div>
      </div>
    </div>
  );
};

export default FormStep;
