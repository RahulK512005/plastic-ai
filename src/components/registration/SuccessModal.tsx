'use client';

import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ShieldCheck, Download, RefreshCw, ArrowRight, Recycle, FileCheck } from 'lucide-react';
import { RegistrationData } from '../../types/registration';
import { PrimaryButton } from './PrimaryButton';
import { SecondaryButton } from './SecondaryButton';

interface SuccessModalProps {
  data: RegistrationData;
  onReset: () => void;
  onClose: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  data,
  onReset,
  onClose,
}) => {
  const regId = `PNR-2026-${Math.floor(10000 + Math.random() * 90000)}`;

  const handleDownloadReceipt = () => {
    const text = `========================================================\nPUNARVRITT CIRCULAR ECONOMY MARKETPLACE\nREGISTRATION RECEIPT (FRONTEND DEMO)\n========================================================\nRegistration ID: ${regId}\nCompany Name: ${data.companyInfo.companyName || 'EcoPoly Recyclers'}\nRegistration Type: ${data.registrationType.toUpperCase()}\nMaterial Stream: ${data.materialCategory.toUpperCase()}\nCapacity Tier: ${data.capacityTier.toUpperCase()}\nSelected Plan: ${data.subscriptionPlan.toUpperCase()}\nGSTIN: ${data.companyInfo.gstNumber || 'N/A'}\nPAN: ${data.companyInfo.panNumber || 'N/A'}\nState: ${data.companyInfo.state || 'N/A'}\nStatus: VERIFIED & PENDING CPCB SYNC\n========================================================`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${regId}_Punarvritt_Registration.txt`;
    a.click();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-[#D6E8DE] shadow-2xl relative text-center overflow-hidden"
      >
        {/* Background glow circle */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#ECFDF5] rounded-full blur-2xl pointer-events-none" />

        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
          className="w-20 h-20 rounded-3xl bg-[#0F766E] text-white flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#0F766E]/30 relative z-10"
        >
          <CheckCircle2 className="w-10 h-10" />
        </motion.div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight mb-2 relative z-10">
          Registration Submitted Successfully
        </h2>

        {/* Frontend Demo Badge */}
        <div className="inline-block mb-6 relative z-10">
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold border border-amber-300 shadow-xs">
            (Frontend Demo)
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto mb-6 relative z-10">
          Your company onboarding request has been processed locally. A confirmation copy and compliance checklist have been saved to your session draft.
        </p>

        {/* Registration ID Banner */}
        <div className="bg-[#FAFAF8] border border-[#D6E8DE] rounded-2xl p-4 mb-6 text-left relative z-10 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#D6E8DE]">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0F766E]">
              <ShieldCheck className="w-4 h-4" />
              <span>CPCB Reference ID</span>
            </div>
            <span className="font-mono text-xs font-bold text-[#0F172A] bg-emerald-100 px-2 py-0.5 rounded">
              {regId}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-slate-400 font-medium block">Company</span>
              <span className="font-bold text-[#0F172A] truncate block">
                {data.companyInfo.companyName || 'EcoPoly Recyclers Pvt Ltd'}
              </span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">Account Type</span>
              <span className="font-bold text-[#0F766E] capitalize">
                {data.registrationType} • {data.materialCategory}
              </span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">Capacity Band</span>
              <span className="font-bold text-[#0F172A] uppercase">
                {data.capacityTier}
              </span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">Plan Chosen</span>
              <span className="font-bold text-[#0F172A] capitalize">
                {data.subscriptionPlan} Plan
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 relative z-10">
          <PrimaryButton
            onClick={handleDownloadReceipt}
            fullWidth
            size="lg"
            icon={<Download className="w-5 h-5" />}
          >
            Download Registration Summary
          </PrimaryButton>

          <div className="grid grid-cols-2 gap-3">
            <SecondaryButton
              onClick={onReset}
              fullWidth
              size="md"
              icon={<RefreshCw className="w-4 h-4 text-slate-500" />}
            >
              Start New Wizard
            </SecondaryButton>

            <SecondaryButton
              onClick={onClose}
              fullWidth
              size="md"
              icon={<Recycle className="w-4 h-4 text-[#0F766E]" />}
            >
              Return Home
            </SecondaryButton>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
