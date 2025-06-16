
import React, { useState, useRef, useEffect } from 'react';
import { MapPin, User, BookOpen, Heart } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { FormData, validateStep1, validateStep2, validateStep3, validateStep4 } from '@/types/FormData';
import FormStep from './forms/FormStep';
import RestaurantInfoStep from './forms/RestaurantInfoStep';
import ContactInfoStep from './forms/ContactInfoStep';
import MenuDetailsStep from './forms/MenuDetailsStep';
import FinalTouchesStep from './forms/FinalTouchesStep';
import FormNavigation from './forms/FormNavigation';

const OrderForm = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [hasAttemptedContinue, setHasAttemptedContinue] = useState(false);
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

  const validateCurrentStep = () => {
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
    
    return validation;
  };

  useEffect(() => {
    if (stepContentRef.current) {
      setContainerHeight(stepContentRef.current.scrollHeight);
    }
    // Clear validation errors and reset attempt flag when step changes
    setValidationErrors([]);
    setHasAttemptedContinue(false);
  }, [currentStep]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const nextStep = () => {
    setHasAttemptedContinue(true);
    const validation = validateCurrentStep();
    setValidationErrors(validation.errors);
    
    if (validation.isValid && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setValidationErrors([]);
      setHasAttemptedContinue(false);
    }
  };

  const handleSubmit = async () => {
    setHasAttemptedContinue(true);
    const validation = validateCurrentStep();
    setValidationErrors(validation.errors);
    
    if (!validation.isValid) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log('Submitting form data:', formData);
      
      const { data, error } = await supabase
        .from('form_submissions')
        .insert([
          {
            restaurant_name: formData.restaurantName,
            contact_name: formData.contactName,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            menu_type: formData.menuType,
            menu_content: formData.menuContent,
            material_preference: formData.materialPreference,
            additional_notes: formData.additionalNotes
          }
        ])
        .select();

      if (error) {
        console.error('Error submitting form:', error);
        toast({
          title: "Submission Error",
          description: "There was an error submitting your request. Please try again.",
          variant: "destructive",
        });
        return;
      }

      console.log('Form submitted successfully:', data);
      
      // Sync to Google Sheets with your specific spreadsheet ID
      const spreadsheetId = '1minZg8Jy7-Sd4RD6RdL_NW0635JuGVyNnuipOzxGPXQ';
      try {
        const { error: sheetError } = await supabase.functions.invoke('sync-to-google-sheets', {
          body: { 
            submissionId: data[0].id,
            spreadsheetId: spreadsheetId
          }
        });
        
        if (sheetError) {
          console.error('Error syncing to Google Sheets:', sheetError);
        } else {
          console.log('Successfully synced to Google Sheets');
        }
      } catch (sheetError) {
        console.error('Error syncing to Google Sheets:', sheetError);
      }
      
      toast({
        title: "Request Submitted!",
        description: "Thank you! We'll create your free braille menus and be in touch within 24 hours.",
      });
      
      // Reset form
      setFormData({
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
      setCurrentStep(1);
      setValidationErrors([]);
      setHasAttemptedContinue(false);
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Unexpected Error",
        description: "There was an unexpected error. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCurrentStep = () => {
    const errorsToShow = hasAttemptedContinue ? validationErrors : [];
    
    switch (currentStep) {
      case 1:
        return <RestaurantInfoStep formData={formData} onInputChange={handleInputChange} errors={errorsToShow} />;
      case 2:
        return <ContactInfoStep formData={formData} onInputChange={handleInputChange} errors={errorsToShow} />;
      case 3:
        return <MenuDetailsStep formData={formData} onInputChange={handleInputChange} errors={errorsToShow} />;
      case 4:
        return <FinalTouchesStep formData={formData} onInputChange={handleInputChange} errors={errorsToShow} />;
      default:
        return null;
    }
  };

  const validation = validateCurrentStep();
  const canProceed = validation.isValid;
  const errorsToShow = hasAttemptedContinue ? validationErrors : [];

  return (
    <section className="py-24 bg-light-bg">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-dark-text mb-4 headline-underline">
            Partner with Us
          </h2>
          <p className="text-lg text-medium-text max-w-3xl mx-auto">Join hundreds of restaurants in making dining more accessible.</p>
        </div>

        <div className="structured-card overflow-hidden">
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
              onPrevStep={prevStep} 
              onNextStep={nextStep} 
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              canProceed={canProceed}
              validationErrors={errorsToShow}
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default OrderForm;
