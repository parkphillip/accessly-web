export interface FormData {
  restaurantName: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  menuType: string;
  menuInputType: 'image' | 'text';
  menuImages: File[];
  menuContent: string;
  materialPreference: string;
  additionalNotes: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const US_STATES = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' }
] as const;

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
  if (!formData.zipCode.trim()) {
    errors.push('Zip code is required');
  } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode.trim())) {
    errors.push('Please enter a valid zip code (e.g., 12345 or 12345-6789)');
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
    errors.push('Please input a valid email');
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

  if (formData.menuInputType === 'image') {
    if (!formData.menuImages || formData.menuImages.length === 0) {
      errors.push('Please upload at least one image of your menu.');
    }
  } else if (formData.menuInputType === 'text') {
    if (!formData.menuContent.trim()) {
      errors.push('Please enter your menu content.');
    }
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
