
import { useState, useRef, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { FormData } from '@/types/FormData';
import { useFormValidation } from './useFormValidation';
import { useFormSubmission } from './useFormSubmission';

export const useOrderForm = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [containerHeight, setContainerHeight] = useState<number | undefined>();
  const stepContentRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState<FormData>({
    restaurantName: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    menuType: 'full-menu',
    menuInputType: 'image',
    menuImages: [],
    menuContent: '',
    materialPreference: 'standard',
    additionalNotes: ''
  });

  const {
    validationErrors,
    hasAttemptedContinue,
    validateCurrentStep,
    clearValidationErrors,
    setValidationState
  } = useFormValidation();

  const {
    isSubmitting,
    isSubmitted,
    handleSubmit: submitForm
  } = useFormSubmission();

  // Test Supabase connection on component mount
  useEffect(() => {
    const testSupabaseConnection = async () => {
      console.log('🔍 Testing Supabase connection...');
      try {
        const { data, error } = await supabase
          .from('form_submissions')
          .select('id')
          .limit(1);
        
        if (error) {
          console.error('❌ Supabase connection test failed:', error);
          toast({
            title: "Connection Error",
            description: `Failed to connect to database: ${error.message}`,
            variant: "destructive",
          });
        } else {
          console.log('✅ Supabase connection successful');
        }
      } catch (err) {
        console.error('❌ Supabase connection test threw error:', err);
      }
    };

    testSupabaseConnection();
  }, [toast]);

  // Handle container height and clear validation errors when step changes
  useEffect(() => {
    if (stepContentRef.current) {
      setContainerHeight(stepContentRef.current.scrollHeight);
    }
    clearValidationErrors();
  }, [currentStep, clearValidationErrors]);

  // Reset form to initial state after successful submission
  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        console.log('🔄 Auto-resetting form after successful submission...');
        resetForm();
      }, 3000); // Reset after 3 seconds to let user see success message

      return () => clearTimeout(timer);
    }
  }, [isSubmitted]);

  const handleInputChange = (field: keyof FormData, value: string | File[]) => {
    console.log(`📝 Input changed - ${field}:`, value instanceof Array ? `${value.length} files` : value);
    
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear validation errors when user starts typing/changing values
    if (hasAttemptedContinue && validationErrors.length > 0) {
      clearValidationErrors();
    }
  };

  const nextStep = () => {
    console.log(`➡️ NEXT STEP CLICKED - Current step: ${currentStep}`);
    
    const validation = validateCurrentStep(currentStep, formData);
    setValidationState(validation.errors, true);
    
    console.log(`➡️ Validation result:`, validation);
    
    if (validation.isValid && currentStep < 4) {
      console.log(`✅ Moving from step ${currentStep} to step ${currentStep + 1}`);
      setCurrentStep(currentStep + 1);
      clearValidationErrors();
    } else {
      console.log(`❌ Cannot proceed from step ${currentStep}:`, validation.errors);
    }
  };

  const prevStep = () => {
    console.log(`⬅️ PREV STEP CLICKED - Current step: ${currentStep}`);
    if (currentStep > 1) {
      console.log(`⬅️ Moving back from step ${currentStep} to step ${currentStep - 1}`);
      setCurrentStep(currentStep - 1);
      clearValidationErrors();
    }
  };

  const resetForm = () => {
    console.log('🔄 Resetting form to initial state...');
    
    // Reset all form data to initial values
    setFormData({
      restaurantName: '',
      contactName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      menuType: 'full-menu',
      menuInputType: 'image',
      menuImages: [],
      menuContent: '',
      materialPreference: 'standard',
      additionalNotes: ''
    });
    
    // Reset form state
    setCurrentStep(1);
    clearValidationErrors();
    
    console.log('✅ Form reset complete');
  };

  const handleSubmit = async () => {
    console.log('🚀 handleSubmit called from useOrderForm');
    const validation = validateCurrentStep(currentStep, formData);
    await submitForm(formData, validation, setValidationState, resetForm);
  };

  const getCurrentStepValidation = () => {
    return validateCurrentStep(currentStep, formData);
  };

  return {
    formData,
    currentStep,
    isSubmitting,
    validationErrors,
    hasAttemptedContinue,
    isSubmitted,
    containerHeight,
    stepContentRef,
    handleInputChange,
    nextStep,
    prevStep,
    handleSubmit,
    validateCurrentStep: getCurrentStepValidation
  };
};
