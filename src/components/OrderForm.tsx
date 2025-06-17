
import React from 'react';
import { useOrderForm } from '@/hooks/useOrderForm';
import OrderFormHeader from './forms/OrderFormHeader';
import OrderFormSuccess from './forms/OrderFormSuccess';
import OrderFormContent from './forms/OrderFormContent';

const OrderForm = () => {
  const {
    formData,
    currentStep,
    isSubmitting,
    validationErrors,
    hasAttemptedContinue,
    isSubmitted,
    containerHeight,
    stepContentRef,
    handleInputChange,
    nextStep,
    prevStep,
    handleSubmit,
    validateCurrentStep
  } = useOrderForm();

  return (
    <section className="py-24 bg-light-bg">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <OrderFormHeader />

        <div className="structured-card overflow-hidden">
          {isSubmitted ? (
            <OrderFormSuccess />
          ) : (
            <OrderFormContent
              formData={formData}
              currentStep={currentStep}
              isSubmitting={isSubmitting}
              validationErrors={validationErrors}
              hasAttemptedContinue={hasAttemptedContinue}
              containerHeight={containerHeight}
              stepContentRef={stepContentRef}
              onInputChange={handleInputChange}
              onPrevStep={prevStep}
              onNextStep={nextStep}
              onSubmit={handleSubmit}
              validateCurrentStep={validateCurrentStep}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default OrderForm;
