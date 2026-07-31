'use client';

import React, { useState } from 'react';
import { RegistrationWizard } from '../../components/registration/RegistrationWizard';
import { useRouter } from 'next/navigation';

export const BrandSignupPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#FAFAF8] py-12 px-4 flex items-center justify-center">
      <RegistrationWizard
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          router.push('/');
        }}
        initialType="brand"
      />
    </div>
  );
};
