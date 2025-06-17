
import { useState, useRef, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { FormData, validateStep1, validateStep2, validateStep3, validateStep4 } from '@/types/FormData';

export const useOrderForm = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [hasAttemptedContinue, setHasAttemptedContinue] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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
    setValidationErrors([]);
    setHasAttemptedContinue(false);
  }, [currentStep]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    console.log(`📝 Input changed - ${field}:`, value);
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (hasAttemptedContinue && validationErrors.length > 0) {
      setValidationErrors([]);
    }
  };

  const nextStep = () => {
    console.log(`➡️ NEXT STEP CLICKED - Current step: ${currentStep}`);
    
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
    const fileNames: string[] = [];
    
    for (const file of files) {
      const filePath = `menus/${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from('menu-images')
        .upload(filePath, file);
      if (error) throw error;
      
      // Get clean public URL without quotes or brackets
      const { data: publicData } = supabase.storage.from('menu-images').getPublicUrl(filePath);
      if (publicData && publicData.publicUrl) {
        urls.push(publicData.publicUrl);
        fileNames.push(file.name);
      }
    }
    return { urls, fileNames };
  };

  const handleSubmit = async () => {
    console.log('🚀 SUBMIT FUNCTION CALLED!');
    
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
      let imageFileNames: string[] = [];
      
      if (formData.menuInputType === 'image' && formData.menuImages.length > 0) {
        const { urls, fileNames } = await uploadImagesAndGetUrls(formData.menuImages);
        menuImageUrls = urls;
        imageFileNames = fileNames;
      }

      // Combine address fields into full_address
      const fullAddress = `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`;
      
      const submissionData = {
        restaurant_name: formData.restaurantName,
        contact_name: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        full_address: fullAddress,
        menu_type: formData.menuType,
        menu_content: formData.menuContent,
        material_preference: formData.materialPreference,
        additional_notes: formData.additionalNotes,
        menu_images: menuImageUrls, // Clean URLs without quotes/brackets
        image_file_names: imageFileNames,
        created_at: new Date().toISOString() // Ensure proper timestamp for ordering
      };
      
      console.log('📤 About to submit to Supabase:', submissionData);
      
      // Insert with explicit ordering by created_at
      const { data, error } = await supabase
        .from('form_submissions')
        .insert([submissionData])
        .select()
        .order('created_at', { ascending: true }); // Ensure proper ordering

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
    validateCurrentStep
  };
};
