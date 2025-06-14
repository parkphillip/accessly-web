import React from 'react';
interface FormData {
  restaurantName: string;
  address: string;
  city: string;
  state: string;
}
interface RestaurantInfoStepProps {
  formData: FormData;
  onInputChange: (field: keyof FormData, value: string) => void;
}
const RestaurantInfoStep: React.FC<RestaurantInfoStepProps> = ({
  formData,
  onInputChange
}) => {
  return <div className="space-y-8 animate-fade-in">
      <div className="relative">
        <label className="block text-lg font-serif font-semibold text-charcoal mb-4">
          What's your restaurant called? *
        </label>
        <input type="text" required value={formData.restaurantName} onChange={e => onInputChange('restaurantName', e.target.value)} className="w-full p-5 bg-cream/80 border-2 border-warm-gray/50 rounded-2xl text-charcoal placeholder-pencil/60 focus:border-sage/60 focus:outline-none transition-all duration-200 font-light text-lg linen-texture" placeholder="e.g., Mario's Italian Kitchen" />
        
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-lg font-serif font-semibold text-charcoal mb-4">
            Street Address *
          </label>
          <input type="text" required value={formData.address} onChange={e => onInputChange('address', e.target.value)} className="w-full p-5 bg-cream/80 border-2 border-warm-gray/50 rounded-2xl text-charcoal placeholder-pencil/60 focus:border-sage/60 focus:outline-none transition-all duration-200 font-light linen-texture" placeholder="123 Main Street" />
        </div>
        <div>
          <label className="block text-lg font-serif font-semibold text-charcoal mb-4">
            City *
          </label>
          <input type="text" required value={formData.city} onChange={e => onInputChange('city', e.target.value)} className="w-full p-5 bg-cream/80 border-2 border-warm-gray/50 rounded-2xl text-charcoal placeholder-pencil/60 focus:border-sage/60 focus:outline-none transition-all duration-200 font-light linen-texture" placeholder="Your wonderful city" />
        </div>
      </div>

      <div>
        <label className="block text-lg font-serif font-semibold text-charcoal mb-4">
          State *
        </label>
        <input type="text" required value={formData.state} onChange={e => onInputChange('state', e.target.value)} className="w-full p-5 bg-cream/80 border-2 border-warm-gray/50 rounded-2xl text-charcoal placeholder-pencil/60 focus:border-sage/60 focus:outline-none transition-all duration-200 font-light linen-texture" placeholder="State" />
      </div>
    </div>;
};
export default RestaurantInfoStep;