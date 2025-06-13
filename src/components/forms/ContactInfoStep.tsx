
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
    <div className="space-y-8 animate-fade-in">
      <div>
        <label className="block text-lg font-serif font-semibold text-charcoal mb-4">
          Who should we contact? *
        </label>
        <input
          type="text"
          required
          value={formData.contactName}
          onChange={(e) => onInputChange('contactName', e.target.value)}
          className="w-full p-5 bg-cream/80 border-2 border-warm-gray/50 rounded-2xl text-charcoal placeholder-pencil/60 focus:border-sage/60 focus:outline-none transition-all duration-200 font-light text-lg linen-texture"
          placeholder="Your full name"
        />
      </div>

      <div>
        <label className="block text-lg font-serif font-semibold text-charcoal mb-4">
          Best email to reach you? *
        </label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => onInputChange('email', e.target.value)}
          className="w-full p-5 bg-cream/80 border-2 border-warm-gray/50 rounded-2xl text-charcoal placeholder-pencil/60 focus:border-sage/60 focus:outline-none transition-all duration-200 font-light linen-texture"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label className="block text-lg font-serif font-semibold text-charcoal mb-4">
          Phone number (for quick questions) *
        </label>
        <input
          type="tel"
          required
          value={formData.phone}
          onChange={(e) => onInputChange('phone', e.target.value)}
          className="w-full p-5 bg-cream/80 border-2 border-warm-gray/50 rounded-2xl text-charcoal placeholder-pencil/60 focus:border-sage/60 focus:outline-none transition-all duration-200 font-light linen-texture"
          placeholder="(555) 123-4567"
        />
      </div>
    </div>
  );
};

export default ContactInfoStep;
