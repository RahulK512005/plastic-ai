'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { RegistrationWizard } from '@/components/registration/RegistrationWizard';

export default function RecyclerSignupPage() {
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
        initialType="recycler"
      />
    </div>
  );
}