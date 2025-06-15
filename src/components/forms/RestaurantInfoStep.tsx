
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
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <label htmlFor="restaurantName" className="form-label">
          What's your restaurant called? *
        </label>
        <input
          id="restaurantName"
          type="text"
          required
          value={formData.restaurantName}
          onChange={(e) => onInputChange('restaurantName', e.target.value)}
          className="form-input"
          placeholder="e.g., Mario's Italian Kitchen"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="address" className="form-label">
            Street Address *
          </label>
          <input
            id="address"
            type="text"
            required
            value={formData.address}
            onChange={(e) => onInputChange('address', e.target.value)}
            className="form-input"
            placeholder="123 Main Street"
          />
        </div>
        <div>
          <label htmlFor="city" className="form-label">
            City *
          </label>
          <input
            id="city"
            type="text"
            required
            value={formData.city}
            onChange={(e) => onInputChange('city', e.target.value)}
            className="form-input"
            placeholder="Your wonderful city"
          />
        </div>
      </div>

      <div>
        <label htmlFor="state" className="form-label">
          State *
        </label>
        <input
          id="state"
          type="text"
          required
          value={formData.state}
          onChange={(e) => onInputChange('state', e.target.value)}
          className="form-input"
          placeholder="State"
        />
      </div>
    </div>
  );
};

export default RestaurantInfoStep;
