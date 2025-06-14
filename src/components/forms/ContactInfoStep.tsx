
import React from 'react';

interface FormData {
  contactName: string;
  email: string;
  phone: string;
}

interface ContactInfoStepProps {
  formData: FormData;
  onInputChange: (field: keyof FormData, value: string) => void;
}

const ContactInfoStep: React.FC<ContactInfoStepProps> = ({ formData, onInputChange }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <label htmlFor="contactName" className="form-label">
          Contact Person's Name
        </label>
        <input
          id="contactName"
          type="text"
          required
          value={formData.contactName}
          onChange={(e) => onInputChange('contactName', e.target.value)}
          className="form-input"
          placeholder="e.g., Jane Doe"
        />
      </div>

      <div>
        <label htmlFor="email" className="form-label">
          Contact Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => onInputChange('email', e.target.value)}
          className="form-input"
          placeholder="e.g., contact@yourrestaurant.com"
        />
      </div>

      <div>
        <label htmlFor="phone" className="form-label">
          Contact Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          required
          value={formData.phone}
          onChange={(e) => onInputChange('phone', e.target.value)}
          className="form-input"
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
