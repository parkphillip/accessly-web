
import React from 'react';
import { Heart } from 'lucide-react';

interface FormData {
  materialPreference: string;
  additionalNotes: string;
}

interface FinalTouchesStepProps {
  formData: FormData;
  onInputChange: (field: keyof FormData, value: string) => void;
}

const FinalTouchesStep: React.FC<FinalTouchesStepProps> = ({ formData, onInputChange }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <label className="block text-lg font-serif font-semibold text-charcoal mb-4">
          Material preference (we'll advise what works best)
        </label>
        <select
          value={formData.materialPreference}
          onChange={(e) => onInputChange('materialPreference', e.target.value)}
          className="w-full p-5 bg-cream/80 border-2 border-warm-gray/50 rounded-2xl text-charcoal focus:border-sage/60 focus:outline-none transition-all duration-200 font-light linen-texture"
        >
          <option value="standard">Standard Paper (recommended for most)</option>
          <option value="heavy-duty">Heavy-Duty Paper (high traffic)</option>
          <option value="plastic">Plastic Coating (easy cleaning)</option>
          <option value="laminated">Laminated (extra durability)</option>
        </select>
      </div>

      <div>
        <label className="block text-lg font-serif font-semibold text-charcoal mb-4">
          Anything else we should know?
        </label>
        <textarea
          value={formData.additionalNotes}
          onChange={(e) => onInputChange('additionalNotes', e.target.value)}
          className="w-full p-5 bg-cream/80 border-2 border-warm-gray/50 rounded-2xl text-charcoal placeholder-pencil/60 focus:border-sage/60 focus:outline-none transition-all duration-200 h-40 resize-none font-light leading-relaxed linen-texture"
          placeholder="Special requests, questions, or just say hi! We love hearing from restaurant owners."
        />
      </div>

      <div className="paper-card p-8 rounded-2xl shadow-inner-paper transform rotate-1">
        <h4 className="font-serif font-semibold text-charcoal mb-6 text-xl flex items-center gap-3">
          <Heart className="w-6 h-6 text-sage" />
          What happens next?
        </h4>
        <ul className="text-pencil space-y-4 leading-relaxed">
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-sage rounded-full mt-2 flex-shrink-0"></div>
            <span>We'll review your request within 24 hours (usually much faster!)</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-dusty-blue rounded-full mt-2 flex-shrink-0"></div>
            <span>Our team will contact you to confirm all the details</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-coffee rounded-full mt-2 flex-shrink-0"></div>
            <span>Your beautiful braille menus will be professionally created</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-sage rounded-full mt-2 flex-shrink-0"></div>
            <span>Free shipping directly to your restaurant door</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-dusty-blue rounded-full mt-2 flex-shrink-0"></div>
            <span>Ongoing support and menu updates at no cost, ever</span>
          </li>
        </ul>
        <div className="mt-6 font-script text-sage text-lg transform -rotate-1">
          It's really that simple! ♡
        </div>
      </div>
    </div>
  );
};

export default FinalTouchesStep;
