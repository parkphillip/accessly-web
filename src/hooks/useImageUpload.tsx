
import { supabase } from '@/integrations/supabase/client';
import { FormData } from '@/types/FormData';

export const useImageUpload = () => {
  const uploadImagesAndGetUrls = async (files: File[], formData: FormData) => {
    const urls: string[] = [];
    
    // Create a clean filename from restaurant name
    const cleanRestaurantName = formData.restaurantName
      .replace(/[^a-zA-Z0-9\s]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .toLowerCase(); // Convert to lowercase
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileExtension = file.name.split('.').pop() || 'jpg';
      
      // Use restaurant name + index for multiple images
      const fileName = files.length > 1 
        ? `${cleanRestaurantName}-menu-${i + 1}.${fileExtension}`
        : `${cleanRestaurantName}-menu.${fileExtension}`;
      
      const filePath = `menus/${Date.now()}-${fileName}`;
      
      const { data, error } = await supabase.storage
        .from('menu-images')
        .upload(filePath, file);
      if (error) throw error;
      
      // Get clean public URL
      const { data: publicData } = supabase.storage.from('menu-images').getPublicUrl(filePath);
      if (publicData && publicData.publicUrl) {
        urls.push(publicData.publicUrl);
      }
    }
    return urls;
  };

  return {
    uploadImagesAndGetUrls
  };
};
