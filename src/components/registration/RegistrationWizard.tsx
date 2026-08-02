'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, ShieldCheck, Check, Loader2, AlertCircle } from 'lucide-react';
import { useRegistration } from '../../hooks/useRegistration';
import { WizardHeader } from './WizardHeader';
import { Stepper } from './Stepper';
import { RegistrationCard } from './RegistrationCard';
import { MaterialCard } from './MaterialCard';
import { CompanyForm } from './CompanyForm';
import { UploadCard } from './UploadCard';
import { CapacityCard } from './CapacityCard';
import { PricingCard } from './PricingCard';
import { SummaryCard } from './SummaryCard';
import { SuccessModal } from './SuccessModal';
import { PrimaryButton } from './PrimaryButton';
import { SecondaryButton } from './SecondaryButton';
import { getRequiredDocuments } from '../../data/pricing';

interface RegistrationWizardProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: 'brand' | 'recycler';
}

const STEP_TITLES = [
  'Choose Registration Type',
  'Choose Primary Material Category',
  'Company Information & Identification',
  'Upload Required Compliance Documents',
  'Select Annual Processing Capacity',
  'Select Subscription Plan',
  'Registration Summary & Submission',
];

export const RegistrationWizard: React.FC<RegistrationWizardProps> = ({
  isOpen,
  onClose,
  initialType,
}) => {
  const {
    step,
    data,
    errors,
    saveToast,
    isSubmitted,
    isPaymentLoading,
    paymentError,
    paymentResult,
    setRegistrationType,
    setMaterialCategory,
    updateCompanyInfo,
    setCapacityTier,
    setSubscriptionPlan,
    uploadDocument,
    removeDocument,
    nextStep,
    prevStep,
    goToStep,
    saveProgress,
    submitRegistration,
    resetWizard,
  } = useRegistration();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-0 sm:p-4 md:p-6 overflow-y-auto">
      {/* Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-[#FAFAF8] w-full max-w-6xl h-[100dvh] sm:h-auto sm:max-h-[90vh] sm:rounded-3xl border-0 sm:border border-[#D6E8DE] shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Wizard Header */}
        <WizardHeader
          currentStep={step}
          totalSteps={7}
          stepTitle={STEP_TITLES[step - 1]}
          onSaveProgress={saveProgress}
          onClose={onClose}
          saveToast={saveToast}
        />

        {/* Stepper */}
        <Stepper currentStep={step} totalSteps={7} onStepClick={goToStep} />

        {/* Step Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="max-w-5xl mx-auto"
            >
              {/* Step title */}
              <div className="mb-6 sm:mb-8 text-center sm:text-left">
                <span className="text-xs font-bold uppercase tracking-widest text-[#0F766E] block mb-1">
                  Step {step} of 7
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
                  {STEP_TITLES[step - 1]}
                </h2>
              </div>

              {/* STEP 1 */}
              {step === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  <RegistrationCard
                    type="brand"
                    selected={data.registrationType === 'brand'}
                    onSelect={setRegistrationType}
                    onContinue={nextStep}
                  />
                  <RegistrationCard
                    type="recycler"
                    selected={data.registrationType === 'recycler'}
                    onSelect={setRegistrationType}
                    onContinue={nextStep}
                  />
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
                  <MaterialCard
                    material="plastic"
                    selected={data.materialCategory === 'plastic'}
                    onSelect={setMaterialCategory}
                  />
                  <MaterialCard
                    material="metal"
                    selected={data.materialCategory === 'metal'}
                    onSelect={setMaterialCategory}
                  />
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <CompanyForm
                  companyInfo={data.companyInfo}
                  onChange={updateCompanyInfo}
                  errors={errors}
                />
              )}

              {/* STEP 4 */}
              {step === 4 && (
                <div className="space-y-4">
                  {errors.documents && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold mb-4">
                      {errors.documents}
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {getRequiredDocuments(data.registrationType).map((doc) => (
                      <UploadCard
                        key={doc.id}
                        docType={doc.id}
                        title={doc.title}
                        description={doc.description}
                        required={doc.required}
                        allowedTypes={doc.allowedTypes}
                        document={data.documents[doc.id] || null}
                        onUpload={uploadDocument}
                        onRemove={removeDocument}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 5 */}
              {step === 5 && (
                <CapacityCard
                  selectedTier={data.capacityTier}
                  onSelect={setCapacityTier}
                />
              )}

              {/* STEP 6 */}
              {step === 6 && (
                <PricingCard
                  capacityTier={data.capacityTier}
                  selectedPlan={data.subscriptionPlan}
                  onSelectPlan={setSubscriptionPlan}
                />
              )}

              {/* STEP 7 */}
              {step === 7 && (
                <SummaryCard data={data} onGoToStep={goToStep} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 z-20 border-t border-[#D6E8DE] bg-white px-4 sm:px-8 py-3.5 sm:py-4 flex flex-col gap-2 shadow-md sm:shadow-none">

          {/* Payment error banner */}
          {step === 7 && paymentError && (
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{paymentError}</span>
            </div>
          )}

          <div className="flex items-center justify-between gap-3">
            <div>
              {step > 1 ? (
                <SecondaryButton
                  onClick={prevStep}
                  size="md"
                  icon={<ArrowLeft className="w-4 h-4" />}
                  disabled={isPaymentLoading}
                >
                  Previous
                </SecondaryButton>
              ) : (
                <SecondaryButton onClick={onClose} size="md">
                  Cancel
                </SecondaryButton>
              )}
            </div>

            <div className="flex items-center gap-3">
              {step < 7 ? (
                <PrimaryButton
                  onClick={nextStep}
                  size="md"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Next Step
                </PrimaryButton>
              ) : (
                <PrimaryButton
                  onClick={submitRegistration}
                  size="lg"
                  disabled={isPaymentLoading}
                  icon={
                    isPaymentLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <ShieldCheck className="w-5 h-5" />
                    )
                  }
                  className="bg-[#16A34A] hover:bg-[#15803D] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isPaymentLoading ? 'Processing…' : 'Pay & Register'}
                </PrimaryButton>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Success Modal */}
      {isSubmitted && (
        <SuccessModal
          data={data}
          paymentResult={paymentResult}
          onReset={() => resetWizard()}
          onClose={() => onClose()}
        />
      )}
    </div>
  );
};
