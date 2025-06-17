import React, { useState, useRef, useEffect } from 'react';
import { MapPin, User, BookOpen, Heart, Facebook, Twitter, Instagram } from 'lucide-react';
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
    zipCode: '',
    menuType: 'full-menu',
    menuInputType: 'image',
    menuImages: [],
    menuContent: '',
    materialPreference: 'standard',
    additionalNotes: ''
  });
  const [containerHeight, setContainerHeight] = useState<number | undefined>();
  const stepContentRef = useRef<HTMLDivElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Test Supabase connection on component mount
  useEffect(() => {
    const testSupabaseConnection = async () => {
      console.log('🔍 Testing Supabase connection...');
      try {
        // Use a simple select query instead of count(*) which causes parsing errors
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

  useEffect(() => {
    if (stepContentRef.current) {
      setContainerHeight(stepContentRef.current.scrollHeight);
    }
    // Clear validation errors and reset attempt flag when step changes
    setValidationErrors([]);
    setHasAttemptedContinue(false);
  }, [currentStep]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    console.log(`📝 Input changed - ${field}:`, value);
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear validation errors when user starts typing
    if (hasAttemptedContinue && validationErrors.length > 0) {
      setValidationErrors([]);
    }
  };

  const nextStep = () => {
    console.log(`➡️ NEXT STEP CLICKED - Current step: ${currentStep}`);
    console.log(`➡️ Form data:`, formData);
    
    setHasAttemptedContinue(true);
    const validation = validateCurrentStep();
    
    console.log(`➡️ Validation result:`, validation);
    
    if (validation.isValid && currentStep < 4) {
      console.log(`✅ Moving from step ${currentStep} to step ${currentStep + 1}`);
      setCurrentStep(currentStep + 1);
      setValidationErrors([]);
      setHasAttemptedContinue(false);
    } else {
      console.log(`❌ Cannot proceed from step ${currentStep}:`, validation.errors);
      setValidationErrors(validation.errors);
    }
  };

  const prevStep = () => {
    console.log(`⬅️ PREV STEP CLICKED - Current step: ${currentStep}`);
    if (currentStep > 1) {
      console.log(`⬅️ Moving back from step ${currentStep} to step ${currentStep - 1}`);
      setCurrentStep(currentStep - 1);
      setValidationErrors([]);
      setHasAttemptedContinue(false);
    }
  };

  const uploadImagesAndGetUrls = async (files: File[]) => {
    const urls: string[] = [];
    for (const file of files) {
      const filePath = `menus/${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from('menu-images')
        .upload(filePath, file);
      if (error) throw error;
      const { data: publicData } = supabase.storage.from('menu-images').getPublicUrl(filePath);
      if (publicData && publicData.publicUrl) urls.push(publicData.publicUrl);
    }
    return urls;
  };

  const handleSubmit = async () => {
    console.log('🚀🚀🚀 SUBMIT FUNCTION CALLED!');
    console.log('📊 Current form data:', formData);
    console.log('📊 Current step:', currentStep);
    
    setHasAttemptedContinue(true);
    const validation = validateCurrentStep();
    
    console.log('🔍 Final validation result:', validation);
    
    if (!validation.isValid) {
      console.log('❌ Validation failed, cannot submit:', validation.errors);
      setValidationErrors(validation.errors);
      return;
    }

    console.log('✅ Validation passed, proceeding with submission...');
    setIsSubmitting(true);
    
    try {
      console.log('📋 Preparing submission data...');
      
      let menuImageUrls: string[] = [];
      if (formData.menuInputType === 'image' && formData.menuImages.length > 0) {
        menuImageUrls = await uploadImagesAndGetUrls(formData.menuImages);
      }
      const submissionData = {
        restaurant_name: formData.restaurantName,
        contact_name: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip_code: formData.zipCode,
        menu_type: formData.menuType,
        menu_content: formData.menuContent,
        material_preference: formData.materialPreference,
        additional_notes: formData.additionalNotes,
        menu_images: menuImageUrls
      };
      
      console.log('📤 About to submit to Supabase:', submissionData);
      
      const { data, error } = await supabase
        .from('form_submissions')
        .insert([submissionData])
        .select();

      console.log('📬 Supabase response - Data:', data);
      console.log('📬 Supabase response - Error:', error);

      if (error) {
        console.error('❌ Supabase submission error:', error);
        toast({
          title: "Submission Error",
          description: `Database error: ${error.message}. Please try again.`,
          variant: "destructive",
        });
        return;
      }

      if (!data || data.length === 0) {
        console.error('❌ No data returned from Supabase insert');
        toast({
          title: "Submission Error",
          description: "No data was returned from the database. Please try again.",
          variant: "destructive",
        });
        return;
      }

      console.log('✅ Form submitted successfully to database:', data);
      
      toast({
        title: "Request Submitted!",
        description: "Thank you! We'll create your free braille menus and be in touch within 24 hours.",
      });
      
      console.log('🔄 Resetting form...');
      // Reset form
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
      setCurrentStep(1);
      setValidationErrors([]);
      setHasAttemptedContinue(false);
      setIsSubmitted(true);
      console.log('✅ Form reset complete');
    } catch (error) {
      console.error('💥 Unexpected error during submission:', error);
      console.error('💥 Error stack:', error instanceof Error ? error.stack : 'No stack trace');
      toast({
        title: "Unexpected Error",
        description: `There was an unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`,
        variant: "destructive",
      });
    } finally {
      console.log('🏁 Setting isSubmitting to false');
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

  // Calculate if user can proceed - always allow if validation passes
  const validation = validateCurrentStep();
  const canProceed = validation.isValid;
  const errorsToShow = hasAttemptedContinue ? validationErrors : [];

  console.log(`🎯 Render - Current step: ${currentStep}, Can proceed: ${canProceed}, Is submitting: ${isSubmitting}`);

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
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center py-24">
              <h3 className="text-3xl font-bold mb-4">Thank you, we will be in touch with you shortly</h3>
              <div className="flex space-x-6 mt-6">
                <a href="#" aria-label="Facebook" className="text-gray-500 hover:text-primary"><Facebook size={32} /></a>
                <a href="#" aria-label="Twitter" className="text-gray-500 hover:text-primary"><Twitter size={32} /></a>
                <a href="#" aria-label="Instagram" className="text-gray-500 hover:text-primary"><Instagram size={32} /></a>
              </div>
            </div>
          ) : (
            <div className="bg-subtle-gray/50">
              <FormStep steps={steps} currentStep={currentStep} />
            </div>
          )}
          {!isSubmitted && (
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
                canProceed={validateCurrentStep().isValid}
                validationErrors={hasAttemptedContinue ? validationErrors : []}
              />
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default OrderForm;
