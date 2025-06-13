
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
    <section id="order" className="py-32 bg-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800/20 to-slate-900/40"></div>
      <div className="absolute top-1/4 -right-64 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -left-32 w-80 h-80 bg-slate-700/10 rounded-full blur-2xl"></div>

      <div className="max-w-4xl mx-auto px-8 relative">
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight">
            Get Your Free Braille Menus
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
            Ready to make your restaurant more accessible? Complete this simple form and we'll create 
            your professional braille menus at absolutely no cost to you.
          </p>
        </div>

        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl shadow-black/20 overflow-hidden">
          {/* Progress Bar */}
          <div className="bg-slate-800/60 border-b border-slate-700/50 p-8">
            <div className="flex items-center justify-between mb-6">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.number} className="flex items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      currentStep >= step.number 
                        ? 'bg-blue-500 border-blue-400 text-white shadow-lg shadow-blue-500/25' 
                        : 'bg-slate-700/50 border-slate-600/50 text-slate-400'
                    }`}>
                      {currentStep > step.number ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    {step.number < 4 && (
                      <div className={`w-20 h-0.5 mx-4 transition-all duration-300 ${
                        currentStep > step.number ? 'bg-blue-500 shadow-sm shadow-blue-500/50' : 'bg-slate-600/50'
                      }`}></div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white">
                Step {currentStep}: {steps[currentStep - 1].title}
              </h3>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-12">
            {/* Step 1: Restaurant Info */}
            {currentStep === 1 && (
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-3">
                    Restaurant Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.restaurantName}
                    onChange={(e) => handleInputChange('restaurantName', e.target.value)}
                    className="w-full p-4 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200"
                    placeholder="Enter your restaurant name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-200 mb-3">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full p-4 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200"
                      placeholder="123 Main Street"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-200 mb-3">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full p-4 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200"
                      placeholder="Your city"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-3">
                    State *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className="w-full p-4 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200"
                    placeholder="State"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Contact Details */}
            {currentStep === 2 && (
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-3">
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={(e) => handleInputChange('contactName', e.target.value)}
                    className="w-full p-4 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-3">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full p-4 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-3">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full p-4 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Menu Content */}
            {currentStep === 3 && (
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-3">
                    Menu Type *
                  </label>
                  <select
                    value={formData.menuType}
                    onChange={(e) => handleInputChange('menuType', e.target.value)}
                    className="w-full p-4 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200"
                  >
                    <option value="full-menu">Full Menu</option>
                    <option value="dinner-only">Dinner Menu Only</option>
                    <option value="lunch-only">Lunch Menu Only</option>
                    <option value="drinks-only">Drinks Menu Only</option>
                    <option value="specials">Daily Specials</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-3">
                    Menu Content *
                  </label>
                  <textarea
                    required
                    value={formData.menuContent}
                    onChange={(e) => handleInputChange('menuContent', e.target.value)}
                    className="w-full p-4 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200 h-48 resize-none"
                    placeholder="Please paste your menu content here, or describe what you'd like included. We'll work with you to format it perfectly for braille."
                  />
                </div>
              </div>
            )}

            {/* Step 4: Preferences */}
            {currentStep === 4 && (
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-3">
                    Material Preference
                  </label>
                  <select
                    value={formData.materialPreference}
                    onChange={(e) => handleInputChange('materialPreference', e.target.value)}
                    className="w-full p-4 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200"
                  >
                    <option value="standard">Standard Paper (Recommended)</option>
                    <option value="heavy-duty">Heavy-Duty Paper</option>
                    <option value="plastic">Plastic Coating</option>
                    <option value="laminated">Laminated</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-3">
                    Additional Notes
                  </label>
                  <textarea
                    value={formData.additionalNotes}
                    onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                    className="w-full p-4 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200 h-40 resize-none"
                    placeholder="Any special requests, questions, or additional information you'd like to share?"
                  />
                </div>

                <div className="bg-slate-800/30 border border-slate-700/30 p-8 rounded-2xl">
                  <h4 className="font-semibold text-white mb-4 text-lg">What Happens Next?</h4>
                  <ul className="text-slate-300 space-y-3 leading-relaxed">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      We'll review your request within 24 hours
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      Our team will contact you to confirm details
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      Your braille menus will be professionally created
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      Free shipping directly to your restaurant
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      Ongoing support and updates at no cost
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-12 pt-8 border-t border-slate-700/50">
              <button
                type="button"
                onClick={prevStep}
                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-200 ${
                  currentStep === 1 
                    ? 'bg-slate-800/30 text-slate-500 cursor-not-allowed border border-slate-700/30' 
                    : 'bg-slate-700/50 text-slate-200 hover:bg-slate-700/70 border border-slate-600/50 hover:border-slate-500/50'
                }`}
                disabled={currentStep === 1}
              >
                Previous
              </button>

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center gap-3 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                >
                  Next Step
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white px-10 py-4 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200 flex items-center gap-3 shadow-lg shadow-green-500/25 hover:shadow-green-500/40"
                >
                  Submit Request
                  <Check className="w-5 h-5" />
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
