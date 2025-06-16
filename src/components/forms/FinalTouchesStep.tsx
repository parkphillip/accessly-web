
import React from 'react';
import { FormData } from '@/types/FormData';

interface FinalTouchesStepProps {
  formData: FormData;
  onInputChange: (field: keyof FormData, value: string) => void;
  errors?: string[];
}

const FinalTouchesStep: React.FC<FinalTouchesStepProps> = ({
  formData,
  onInputChange,
  errors = []
}) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <label htmlFor="materialPreference" className="form-label">
          Material preference
        </label>
        <select
          id="materialPreference"
          value={formData.materialPreference}
          onChange={(e) => onInputChange('materialPreference', e.target.value)}
          className="form-input"
        >
          <option value="standard">Standard Paper (recommended for most)</option>
          <option value="heavy-duty">Heavy-Duty Paper (high traffic)</option>
          <option value="plastic">Plastic Coating (easy cleaning)</option>
          <option value="laminated">Laminated (extra durability)</option>
        </select>
        <p className="text-xs text-medium-text mt-2">
          We'll advise what works best based on your menu.
        </p>
      </div>

      <div>
        <label htmlFor="additionalNotes" className="form-label">
          Anything else we should know?
        </label>
        <textarea
          id="additionalNotes"
          value={formData.additionalNotes}
          onChange={(e) => onInputChange('additionalNotes', e.target.value)}
          className="form-input min-h-[150px] resize-y"
          placeholder="Special requests, questions, or just say hi!"
        />
      </div>

      <div className="bg-subtle-gray/50 p-6 rounded-lg border border-light-gray">
        <h4 className="font-heading font-semibold text-dark-text mb-4 text-lg">
          What happens next?
        </h4>
        <ul className="text-medium-text space-y-3 leading-relaxed text-sm list-disc list-inside">
          <li>We'll review your request within 24 hours (usually much faster!).</li>
          <li>Our team will contact you to confirm all the details.</li>
          <li>Your beautiful braille menus will be professionally created.</li>
          <li>Free shipping directly to your restaurant door.</li>
          <li>Ongoing support and menu updates at no cost, ever.</li>
        </ul>
      </div>
    </div>
  );
};

export default FinalTouchesStep;
