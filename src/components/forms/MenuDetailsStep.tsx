
import React from 'react';

interface FormData {
  menuType: string;
  menuContent: string;
}

interface MenuDetailsStepProps {
  formData: FormData;
  onInputChange: (field: keyof FormData, value: string) => void;
}

const MenuDetailsStep: React.FC<MenuDetailsStepProps> = ({ formData, onInputChange }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <label className="block text-lg font-serif font-semibold text-charcoal mb-4">
          What type of menu? *
        </label>
        <select
          value={formData.menuType}
          onChange={(e) => onInputChange('menuType', e.target.value)}
          className="w-full p-5 bg-cream/80 border-2 border-warm-gray/50 rounded-2xl text-charcoal focus:border-sage/60 focus:outline-none transition-all duration-200 font-light linen-texture"
        >
          <option value="full-menu">Complete Menu (most popular)</option>
          <option value="dinner-only">Dinner Menu Only</option>
          <option value="lunch-only">Lunch Menu Only</option>
          <option value="drinks-only">Drinks & Beverages</option>
          <option value="specials">Daily Specials Board</option>
        </select>
      </div>

      <div className="relative">
        <label className="block text-lg font-serif font-semibold text-charcoal mb-4">
          Your menu content *
        </label>
        <textarea
          required
          value={formData.menuContent}
          onChange={(e) => onInputChange('menuContent', e.target.value)}
          className="w-full p-5 bg-cream/80 border-2 border-warm-gray/50 rounded-2xl text-charcoal placeholder-pencil/60 focus:border-sage/60 focus:outline-none transition-all duration-200 h-48 resize-none font-light leading-relaxed linen-texture"
          placeholder="Paste your menu here, or just describe what you'd like included. We'll work together to make it perfect for braille reading!"
        />
        <div className="absolute -right-12 top-1/2 font-script text-dusty-blue text-sm transform rotate-6">
          Don't worry about formatting!
        </div>
      </div>
    </div>
  );
};

export default MenuDetailsStep;
