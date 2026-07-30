'use client';

import React, { useState } from 'react';
import { RegistrationWizard } from '@/components/registration/RegistrationWizard';

export default function BrandSignupPage() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#FAFAF8] py-12 px-4 flex items-center justify-center">
      <RegistrationWizard
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          window.location.href = '/';
        }}
        initialType="brand"
      />
    </div>
  );
}