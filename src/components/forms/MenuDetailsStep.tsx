
import React from 'react';
import { FormData } from '@/types/FormData';

interface MenuDetailsStepProps {
  formData: FormData;
  onInputChange: (field: keyof FormData, value: string) => void;
  errors?: string[];
}

const MenuDetailsStep: React.FC<MenuDetailsStepProps> = ({ 
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
        <label htmlFor="menuType" className="form-label">
          What type of menu do you need?
        </label>
        <select
          id="menuType"
          value={formData.menuType}
          onChange={(e) => onInputChange('menuType', e.target.value)}
          className="form-input"
        >
          <option value="full-menu">Complete Menu (most popular)</option>
          <option value="dinner-only">Dinner Menu Only</option>
          <option value="lunch-only">Lunch Menu Only</option>
          <option value="drinks-only">Drinks & Beverages</option>
          <option value="specials">Daily Specials Board</option>
        </select>
      </div>

      <div>
        <label htmlFor="menuContent" className="form-label">
          Provide your menu content *
        </label>
        <textarea
          id="menuContent"
          required
          value={formData.menuContent}
          onChange={(e) => onInputChange('menuContent', e.target.value)}
          className={`form-input min-h-[150px] resize-y ${hasError(errors, 'menu') ? 'border-red-500 bg-red-50' : ''}`}
          placeholder="Paste your menu here, or provide a link. We will format it for braille conversion."
        />
        <p className="text-xs text-medium-text mt-2">
          Don't worry about formatting. We'll handle the conversion to make it clear and readable in braille.
        </p>
      </div>
    </div>
  );
};

export default MenuDetailsStep;
