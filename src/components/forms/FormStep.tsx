
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
    <div className="border-b border-light-gray p-6 md:p-8">
      <div className="flex items-start justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = currentStep === step.number;
          const isCompleted = currentStep > step.number;

          return (
            <div key={step.number} className="flex items-center w-full">
              <div className="flex flex-col items-center text-center w-24">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isCompleted
                    ? 'bg-brand-navy border-brand-navy text-off-white'
                    : isActive 
                    ? 'bg-off-white border-brand-navy text-brand-navy'
                    : 'bg-off-white border-light-gray text-medium-text'
                }`}>
                  {isCompleted ? <Check className="w-6 h-6" /> : <Icon className="w-5 h-5" />}
                </div>
                <div className="mt-2">
                    <p className={`font-sans text-sm font-semibold ${isCompleted || isActive ? 'text-dark-text' : 'text-medium-text'}`}>{step.title}</p>
                    <p className="text-xs text-medium-text">{step.note}</p>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mt-6 mx-4 transition-all duration-300 ${isCompleted ? 'bg-brand-navy' : 'bg-light-gray'}`}></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FormStep;
