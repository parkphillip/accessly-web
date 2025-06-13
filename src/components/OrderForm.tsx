
import React, { useState } from 'react';
import { ArrowRight, Check, Book, MapPin, User } from 'lucide-react';

interface FormData {
  restaurantName: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  menuType: string;
  menuContent: string;
  materialPreference: string;
  additionalNotes: string;
}

const OrderForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    restaurantName: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    menuType: 'full-menu',
    menuContent: '',
    materialPreference: 'standard',
    additionalNotes: '',
  });

  const steps = [
    { number: 1, title: 'Restaurant Info', icon: MapPin },
    { number: 2, title: 'Contact Details', icon: User },
    { number: 3, title: 'Menu Content', icon: Book },
    { number: 4, title: 'Preferences', icon: Check },
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you! We\'ll process your free braille menu request within 24 hours.');
  };

  return (
    <section id="order" className="py-20 bg-gradient-to-b from-amber-50 to-stone-50">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-800 mb-6">
            Get Your Free Braille Menus
          </h2>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto">
            Ready to make your restaurant more accessible? Complete this simple form and we'll create 
            your professional braille menus at absolutely no cost to you.
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
          {/* Progress Bar */}
          <div className="bg-gradient-to-r from-amber-100 to-stone-100 p-6">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.number} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentStep >= step.number 
                        ? 'bg-amber-600 text-white' 
                        : 'bg-stone-200 text-stone-500'
                    }`}>
                      {currentStep > step.number ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    {step.number < 4 && (
                      <div className={`w-16 h-1 mx-2 ${
                        currentStep > step.number ? 'bg-amber-600' : 'bg-stone-200'
                      }`}></div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-stone-800">
                Step {currentStep}: {steps[currentStep - 1].title}
              </h3>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            {/* Step 1: Restaurant Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">
                    Restaurant Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.restaurantName}
                    onChange={(e) => handleInputChange('restaurantName', e.target.value)}
                    className="w-full p-3 border border-stone-300 rounded-lg focus:border-amber-500 focus:outline-none"
                    placeholder="Enter your restaurant name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-2">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full p-3 border border-stone-300 rounded-lg focus:border-amber-500 focus:outline-none"
                      placeholder="123 Main Street"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full p-3 border border-stone-300 rounded-lg focus:border-amber-500 focus:outline-none"
                      placeholder="Your city"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className="w-full p-3 border border-stone-300 rounded-lg focus:border-amber-500 focus:outline-none"
                    placeholder="State"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Contact Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={(e) => handleInputChange('contactName', e.target.value)}
                    className="w-full p-3 border border-stone-300 rounded-lg focus:border-amber-500 focus:outline-none"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full p-3 border border-stone-300 rounded-lg focus:border-amber-500 focus:outline-none"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full p-3 border border-stone-300 rounded-lg focus:border-amber-500 focus:outline-none"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Menu Content */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">
                    Menu Type *
                  </label>
                  <select
                    value={formData.menuType}
                    onChange={(e) => handleInputChange('menuType', e.target.value)}
                    className="w-full p-3 border border-stone-300 rounded-lg focus:border-amber-500 focus:outline-none"
                  >
                    <option value="full-menu">Full Menu</option>
                    <option value="dinner-only">Dinner Menu Only</option>
                    <option value="lunch-only">Lunch Menu Only</option>
                    <option value="drinks-only">Drinks Menu Only</option>
                    <option value="specials">Daily Specials</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">
                    Menu Content *
                  </label>
                  <textarea
                    required
                    value={formData.menuContent}
                    onChange={(e) => handleInputChange('menuContent', e.target.value)}
                    className="w-full p-3 border border-stone-300 rounded-lg focus:border-amber-500 focus:outline-none h-40 resize-none"
                    placeholder="Please paste your menu content here, or describe what you'd like included. We'll work with you to format it perfectly for braille."
                  />
                </div>
              </div>
            )}

            {/* Step 4: Preferences */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">
                    Material Preference
                  </label>
                  <select
                    value={formData.materialPreference}
                    onChange={(e) => handleInputChange('materialPreference', e.target.value)}
                    className="w-full p-3 border border-stone-300 rounded-lg focus:border-amber-500 focus:outline-none"
                  >
                    <option value="standard">Standard Paper (Recommended)</option>
                    <option value="heavy-duty">Heavy-Duty Paper</option>
                    <option value="plastic">Plastic Coating</option>
                    <option value="laminated">Laminated</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    value={formData.additionalNotes}
                    onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                    className="w-full p-3 border border-stone-300 rounded-lg focus:border-amber-500 focus:outline-none h-32 resize-none"
                    placeholder="Any special requests, questions, or additional information you'd like to share?"
                  />
                </div>

                <div className="bg-gradient-to-r from-amber-50 to-stone-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-stone-800 mb-3">What Happens Next?</h4>
                  <ul className="text-sm text-stone-600 space-y-2">
                    <li>• We'll review your request within 24 hours</li>
                    <li>• Our team will contact you to confirm details</li>
                    <li>• Your braille menus will be professionally created</li>
                    <li>• Free shipping directly to your restaurant</li>
                    <li>• Ongoing support and updates at no cost</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-stone-200">
              <button
                type="button"
                onClick={prevStep}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  currentStep === 1 
                    ? 'bg-stone-100 text-stone-400 cursor-not-allowed' 
                    : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                }`}
                disabled={currentStep === 1}
              >
                Previous
              </button>

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-amber-700 hover:to-amber-800 transition-all duration-200 flex items-center gap-2"
                >
                  Next Step
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200 flex items-center gap-2"
                >
                  Submit Request
                  <Check className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default OrderForm;
