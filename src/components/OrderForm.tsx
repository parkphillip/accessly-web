
import React, { useState } from 'react';
import { ArrowRight, Check, Book, MapPin, User, Heart } from 'lucide-react';

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
    { number: 1, title: 'Your Restaurant', icon: MapPin, note: 'Tell us about your place' },
    { number: 2, title: 'Contact Info', icon: User, note: 'How we reach you' },
    { number: 3, title: 'Menu Details', icon: Book, note: 'What to convert' },
    { number: 4, title: 'Final Touches', icon: Heart, note: 'Almost done!' },
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
    alert('Thank you! We\'ll create your free braille menus and be in touch within 24 hours.');
  };

  return (
    <section id="order" className="py-32 bg-warm-gray relative overflow-hidden">
      {/* Paper texture overlay */}
      <div className="absolute inset-0 opacity-30 bg-paper-texture"></div>
      
      {/* Handwritten decorative elements */}
      <div className="absolute top-20 right-16 transform rotate-12">
        <div className="font-script text-4xl text-sage opacity-40">Let's do this!</div>
        <div className="w-24 h-2 bg-sage opacity-30 transform -rotate-6 mt-2 rounded-full"></div>
      </div>
      
      <div className="absolute bottom-32 left-12 transform -rotate-12">
        <div className="font-script text-2xl text-dusty-blue opacity-50">Free forever ♡</div>
      </div>

      <div className="max-w-4xl mx-auto px-8 relative">
        <div className="text-center mb-20">
          <div className="relative inline-block">
            <h2 className="text-5xl lg:text-6xl font-serif font-bold text-charcoal mb-8 leading-tight">
              Let's Make Your Restaurant More Accessible
            </h2>
            {/* Hand-drawn underline */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-4/5 h-4 bg-sage/20 transform -rotate-1 rounded-full"></div>
          </div>
          <p className="text-xl text-pencil max-w-3xl mx-auto leading-relaxed font-light">
            Ready to welcome more diners? This quick form helps us create perfect braille menus 
            for your restaurant. No cost, no catch—just better accessibility.
          </p>
        </div>

        <div className="paper-card rounded-3xl shadow-paper-lift overflow-hidden transform -rotate-1">
          {/* Progress section with personality */}
          <div className="bg-cream/80 border-b-2 border-warm-gray/30 p-8 linen-texture">
            <div className="flex items-center justify-between mb-6">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.number} className="flex items-center">
                    <div className="text-center">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 transform ${
                        currentStep >= step.number 
                          ? 'bg-sage border-sage/60 text-cream shadow-paper rotate-3' 
                          : 'bg-paper border-warm-gray/50 text-pencil'
                      }`}>
                        {currentStep > step.number ? (
                          <Check className="w-6 h-6" />
                        ) : (
                          <Icon className="w-6 h-6" />
                        )}
                      </div>
                      <div className="mt-2 font-script text-sm text-pencil transform rotate-1">
                        {step.note}
                      </div>
                    </div>
                    {index < 3 && (
                      <div className={`w-16 h-1 mx-4 transition-all duration-500 rounded-full ${
                        currentStep > step.number 
                          ? 'bg-sage shadow-sm transform rotate-1' 
                          : 'bg-warm-gray/50'
                      }`}></div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-serif font-semibold text-charcoal">
                {steps[currentStep - 1].title}
              </h3>
              <div className="font-script text-sage mt-1">
                Step {currentStep} of 4
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-12 bg-paper/50">
            {/* Step 1: Restaurant Info */}
            {currentStep === 1 && (
              <div className="space-y-8 animate-fade-in">
                <div className="relative">
                  <label className="block text-lg font-serif font-semibold text-charcoal mb-4">
                    What's your restaurant called? *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.restaurantName}
                    onChange={(e) => handleInputChange('restaurantName', e.target.value)}
                    className="w-full p-5 bg-cream/80 border-2 border-warm-gray/50 rounded-2xl text-charcoal placeholder-pencil/60 focus:border-sage/60 focus:outline-none transition-all duration-200 font-light text-lg linen-texture"
                    placeholder="e.g., Mario's Italian Kitchen"
                  />
                  <div className="absolute -right-8 top-1/2 font-script text-sage text-sm transform rotate-12">
                    We love the name! →
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-serif font-semibold text-charcoal mb-4">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full p-5 bg-cream/80 border-2 border-warm-gray/50 rounded-2xl text-charcoal placeholder-pencil/60 focus:border-sage/60 focus:outline-none transition-all duration-200 font-light linen-texture"
                      placeholder="123 Main Street"
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-serif font-semibold text-charcoal mb-4">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full p-5 bg-cream/80 border-2 border-warm-gray/50 rounded-2xl text-charcoal placeholder-pencil/60 focus:border-sage/60 focus:outline-none transition-all duration-200 font-light linen-texture"
                      placeholder="Your wonderful city"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-serif font-semibold text-charcoal mb-4">
                    State *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className="w-full p-5 bg-cream/80 border-2 border-warm-gray/50 rounded-2xl text-charcoal placeholder-pencil/60 focus:border-sage/60 focus:outline-none transition-all duration-200 font-light linen-texture"
                    placeholder="State"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Contact Details */}
            {currentStep === 2 && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <label className="block text-lg font-serif font-semibold text-charcoal mb-4">
                    Who should we contact? *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={(e) => handleInputChange('contactName', e.target.value)}
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
                    onChange={(e) => handleInputChange('email', e.target.value)}
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
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full p-5 bg-cream/80 border-2 border-warm-gray/50 rounded-2xl text-charcoal placeholder-pencil/60 focus:border-sage/60 focus:outline-none transition-all duration-200 font-light linen-texture"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Menu Content */}
            {currentStep === 3 && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <label className="block text-lg font-serif font-semibold text-charcoal mb-4">
                    What type of menu? *
                  </label>
                  <select
                    value={formData.menuType}
                    onChange={(e) => handleInputChange('menuType', e.target.value)}
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
                    onChange={(e) => handleInputChange('menuContent', e.target.value)}
                    className="w-full p-5 bg-cream/80 border-2 border-warm-gray/50 rounded-2xl text-charcoal placeholder-pencil/60 focus:border-sage/60 focus:outline-none transition-all duration-200 h-48 resize-none font-light leading-relaxed linen-texture"
                    placeholder="Paste your menu here, or just describe what you'd like included. We'll work together to make it perfect for braille reading!"
                  />
                  <div className="absolute -right-12 top-1/2 font-script text-dusty-blue text-sm transform rotate-6">
                    Don't worry about formatting!
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Preferences */}
            {currentStep === 4 && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <label className="block text-lg font-serif font-semibold text-charcoal mb-4">
                    Material preference (we'll advise what works best)
                  </label>
                  <select
                    value={formData.materialPreference}
                    onChange={(e) => handleInputChange('materialPreference', e.target.value)}
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
                    onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
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
            )}

            {/* Navigation with personality */}
            <div className="flex justify-between mt-12 pt-8 border-t-2 border-warm-gray/30">
              <button
                type="button"
                onClick={prevStep}
                className={`px-8 py-4 rounded-2xl font-serif font-semibold transition-all duration-300 ${
                  currentStep === 1 
                    ? 'bg-warm-gray/30 text-pencil/50 cursor-not-allowed border-2 border-warm-gray/30' 
                    : 'bg-paper text-charcoal hover:bg-cream/80 border-2 border-warm-gray/50 hover:border-dusty-blue/50 shadow-paper hover:shadow-paper-lift transform hover:-rotate-1'
                }`}
                disabled={currentStep === 1}
              >
                ← Go Back
              </button>

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-gradient-to-r from-sage to-dusty-blue text-cream px-8 py-4 rounded-2xl font-serif font-semibold hover:shadow-paper-lift transition-all duration-300 flex items-center gap-3 shadow-paper transform hover:rotate-1 relative"
                >
                  <span>Continue →</span>
                  <div className="absolute -top-2 -right-2 font-script text-xs text-sage/70 transform rotate-12">
                    Keep going!
                  </div>
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-gradient-to-r from-coffee to-sage text-cream px-10 py-4 rounded-2xl font-serif font-semibold hover:shadow-paper-lift transition-all duration-300 flex items-center gap-3 shadow-paper transform hover:-rotate-1 relative"
                >
                  <Heart className="w-5 h-5" />
                  <span>Send My Request</span>
                  <div className="absolute -top-3 -right-3 font-script text-xs text-coffee/70 transform rotate-12">
                    Let's do this!
                  </div>
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
