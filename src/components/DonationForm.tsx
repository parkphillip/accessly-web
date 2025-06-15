
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart } from 'lucide-react';

const donationAmounts = [25, 50, 100, 250];

const DonationForm = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState('');

  const handleAmountClick = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setCustomAmount(value);
    setSelectedAmount(null);
  };
  
  const handleCustomFocus = () => {
    setSelectedAmount(null);
  }

  const finalAmount = selectedAmount ?? (customAmount ? parseInt(customAmount, 10) : 0);

  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-2xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl lg:text-5xl font-heading font-bold text-dark-text mb-4">
            Fund Our Mission
          </h1>
          <p className="text-lg text-medium-text max-w-3xl mx-auto leading-relaxed">
            Your contribution helps us provide free braille menus to restaurants, making the world more accessible one menu at a time. Every dollar makes a difference.
          </p>
        </div>

        <div className="structured-card p-8 mt-12">
          <h2 className="text-lg font-semibold text-dark-text mb-6 text-center">Choose a donation amount</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {donationAmounts.map(amount => (
              <Button
                key={amount}
                variant={selectedAmount === amount ? 'default' : 'outline'}
                size="lg"
                className="w-full h-16 text-xl font-mono"
                onClick={() => handleAmountClick(amount)}
              >
                ${amount}
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-light-gray"></div>
            <span className="text-medium-text font-medium text-sm">OR</span>
            <div className="flex-1 h-px bg-light-gray"></div>
          </div>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-text text-xl font-semibold">$</span>
            <Input
              type="text"
              placeholder="Custom Amount"
              className="form-input text-xl h-16 pl-8 pr-4 text-center font-mono"
              value={customAmount}
              onChange={handleCustomAmountChange}
              onFocus={handleCustomFocus}
            />
          </div>

          <div className="mt-8">
            <Button className="w-full primary-button h-14 text-lg group" size="lg" disabled={!finalAmount || finalAmount <= 0}>
              Donate ${finalAmount > 0 ? finalAmount : ''}
              <Heart className="ml-2 h-5 w-5 fill-brand-terracotta text-brand-terracotta transition-transform group-hover:scale-110" />
            </Button>
          </div>

           <p className="text-xs text-center text-medium-text mt-4">
            Accessly is a registered 501(c)(3) non-profit organization.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DonationForm;
