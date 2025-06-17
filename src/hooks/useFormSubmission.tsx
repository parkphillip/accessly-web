
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { FormData } from '@/types/FormData';
import { useImageUpload } from './useImageUpload';

export const useFormSubmission = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { uploadImagesAndGetUrls } = useImageUpload();

  const handleSubmit = async (
    formData: FormData,
    validation: { isValid: boolean; errors: string[] },
    setValidationState: (errors: string[], attempted: boolean) => void,
    resetForm: () => void
  ) => {
    console.log('🚀 SUBMIT FUNCTION CALLED!');
    
    setValidationState(validation.errors, true);
    
    console.log('🔍 Final validation result:', validation);
    
    if (!validation.isValid) {
      console.log('❌ Validation failed, cannot submit:', validation.errors);
      return;
    }

    console.log('✅ Validation passed, proceeding with submission...');
    setIsSubmitting(true);
    
    try {
      console.log('📋 Preparing submission data...');
      
      let menuImageUrls: string[] = [];
      let imageFileNames: string[] = [];
      
      if (formData.menuInputType === 'image' && formData.menuImages.length > 0) {
        const { urls, fileNames } = await uploadImagesAndGetUrls(formData.menuImages, formData);
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
      resetForm();
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
    isSubmitting,
    isSubmitted,
    handleSubmit
  };
};
