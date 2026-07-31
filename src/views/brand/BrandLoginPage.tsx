'use client';

import React, { useState } from 'react';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { PasswordInput } from '../../components/auth/PasswordInput';
import { Checkbox } from '../../components/ui/Checkbox';
import { Button } from '../../components/ui/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Building2, LogIn, ArrowLeft } from 'lucide-react';

export const BrandLoginPage: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Frontend navigation only
    router.push('/brand/dashboard');
  };

  return (
    <AuthLayout
      title="Brand Owner Portal Login"
      subtitle="Access your EPR credit balance, certificate logs, and CPCB audit reports."
      userType="brand"
    >
      <div className="max-w-md mx-auto w-full">
        <Card variant="default" padding="lg" className="shadow-md">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Brand Login</h2>
              <p className="text-xs text-slate-500">Sign in to your corporate account</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <Input
              label="Official Email Address"
              name="email"
              type="email"
              placeholder="brand@company.com"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
              requiredStar
            />

            <div>
              <div className="flex items-center justify-between mb-1">
                <span />
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Password reset instructions sent to your official email.');
                  }}
                  className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline"
                >
                  Forgot Password?
                </a>
              </div>

              <PasswordInput
                label="Password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                error={errors.password}
                requiredStar
              />
            </div>

            <div className="pt-1">
              <Checkbox
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                label="Remember this device for 30 days"
              />
            </div>

            <div className="space-y-3 pt-3">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                icon={<LogIn className="w-4 h-4" />}
                iconPosition="right"
              >
                Login to Dashboard
              </Button>

              <Button
                type="button"
                variant="outline"
                size="md"
                fullWidth
                icon={<ArrowLeft className="w-4 h-4" />}
                iconPosition="left"
                onClick={() => router.push('/')}
              >
                Back to Home
              </Button>
            </div>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs text-slate-600">
            <span>Don't have an account? </span>
            <Link
              href="/brand/signup"
              className="font-bold text-emerald-700 hover:text-emerald-800 hover:underline ml-1"
            >
              Create Brand Account
            </Link>
          </div>
        </Card>
      </div>
    </AuthLayout>
  );
};
