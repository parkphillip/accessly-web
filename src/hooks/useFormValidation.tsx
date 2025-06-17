
import { useState } from 'react';
import { FormData, validateStep1, validateStep2, validateStep3, validateStep4 } from '@/types/FormData';

export const useFormValidation = () => {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [hasAttemptedContinue, setHasAttemptedContinue] = useState(false);

  const validateCurrentStep = (currentStep: number, formData: FormData) => {
    console.log(`🔍 Validating step ${currentStep}`);
    let validation;
    switch (currentStep) {
      case 1:
        validation = validateStep1(formData);
        break;
      case 2:
        validation = validateStep2(formData);
        break;
      case 3:
        validation = validateStep3(formData);
        break;
      case 4:
        validation = validateStep4(formData);
        break;
      default:
        validation = { isValid: true, errors: [] };
    }
    
    console.log(`📋 Step ${currentStep} validation result:`, validation);
    return validation;
  };

  const clearValidationErrors = () => {
    setValidationErrors([]);
    setHasAttemptedContinue(false);
  };

  const setValidationState = (errors: string[], attempted: boolean) => {
    setValidationErrors(errors);
    setHasAttemptedContinue(attempted);
  };

  return {
    validationErrors,
    hasAttemptedContinue,
    validateCurrentStep,
    clearValidationErrors,
    setValidationState
  };
};
