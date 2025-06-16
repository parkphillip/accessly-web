export interface FormData {
  restaurantName: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  menuType: string;
  menuContent: string;
  materialPreference: string;
  additionalNotes: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateStep1 = (formData: FormData): ValidationResult => {
  const errors: string[] = [];
  
  if (!formData.restaurantName.trim()) {
    errors.push('Restaurant name is required');
  }
  if (!formData.address.trim()) {
    errors.push('Street address is required');
  }
  if (!formData.city.trim()) {
    errors.push('City is required');
  }
  if (!formData.state.trim()) {
    errors.push('State is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateStep2 = (formData: FormData): ValidationResult => {
  const errors: string[] = [];
  let isValid = true;

  if (!formData.contactName.trim()) {
    errors.push('Contact name is required');
    isValid = false;
  }
  if (!formData.email.trim()) {
    errors.push('Email is required');
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.push('Please use a valid email');
    isValid = false;
  }
  if (!formData.phone.trim()) {
    errors.push('Phone number is required');
    isValid = false;
  }

  return {
    isValid,
    errors
  };
};

export const validateStep3 = (formData: FormData): ValidationResult => {
  const errors: string[] = [];
  
  if (!formData.menuContent.trim()) {
    errors.push('Menu content is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateStep4 = (formData: FormData): ValidationResult => {
  // Step 4 has no required fields, just final touches
  return {
    isValid: true,
    errors: []
  };
};
