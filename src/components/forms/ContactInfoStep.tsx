
import React from 'react';
import { FormData } from '@/types/FormData';

interface ContactInfoStepProps {
  formData: FormData;
  onInputChange: (field: keyof FormData, value: string) => void;
  errors?: string[];
}

const ContactInfoStep: React.FC<ContactInfoStepProps> = ({ 
  formData, 
  onInputChange,
  errors = []
}) => {
  const hasError = (fieldErrors: string[], fieldName: string) => {
    return fieldErrors.some(error => error.toLowerCase().includes(fieldName.toLowerCase()));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <label htmlFor="contactName" className="form-label">
          Contact Person's Name *
        </label>
        <input
          id="contactName"
          type="text"
          required
          value={formData.contactName}
          onChange={(e) => onInputChange('contactName', e.target.value)}
          className={`form-input ${hasError(errors, 'contact') ? 'border-red-500 bg-red-50' : ''}`}
          placeholder="e.g., Jane Doe"
        />
      </div>

      <div>
        <label htmlFor="email" className="form-label">
          Contact Email *
        </label>
        <input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => onInputChange('email', e.target.value)}
          className={`form-input ${hasError(errors, 'email') ? 'border-red-500 bg-red-50' : ''}`}
          placeholder="e.g., contact@yourrestaurant.com"
        />
      </div>

      <div>
        <label htmlFor="phone" className="form-label">
          Contact Phone Number *
        </label>
        <input
          id="phone"
          type="tel"
          required
          value={formData.phone}
          onChange={(e) => onInputChange('phone', e.target.value)}
          className={`form-input ${hasError(errors, 'phone') ? 'border-red-500 bg-red-50' : ''}`}
          placeholder="(555) 123-4567"
        />
        <p className="text-xs text-medium-text mt-2">
          We'll only use this for urgent questions about your menu.
        </p>
      </div>
    </div>
  );
};

export default ContactInfoStep;
