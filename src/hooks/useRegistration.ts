import { useState, useEffect, useCallback } from 'react';
import {
  RegistrationData,
  RegistrationType,
  MaterialCategory,
  CapacityTier,
  SubscriptionPlanId,
  CompanyInfo,
  UploadedDocument,
} from '../types/registration';

const STORAGE_KEY = 'punarvritt_registration_draft_v1';

const initialCompanyInfo: CompanyInfo = {
  companyName: '',
  companyEmail: '',
  mobileNumber: '',
  gstNumber: '',
  panNumber: '',
  factoryAddress: '',
  state: '',
  city: '',
  pincode: '',
  companyWebsite: '',
  contactPerson: '',
  designation: '',
};

const initialRegistrationData: RegistrationData = {
  registrationType: 'brand',
  materialCategory: 'plastic',
  companyInfo: initialCompanyInfo,
  documents: {
    gst: null,
    pan: null,
    factory_license: null,
    pollution_cert: null,
    coi_cert: null,
    epr_cert: null,
    cancelled_cheque: null,
    auth_letter: null,
    recycler_cert: null,
  },
  capacityTier: 'tier2',
  subscriptionPlan: 'growth',
};

export function useRegistration() {
  const [step, setStep] = useState<number>(1);
  const [data, setData] = useState<RegistrationData>(initialRegistrationData);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setData((prev) => ({
          ...initialRegistrationData,
          ...parsed,
          companyInfo: { ...initialCompanyInfo, ...(parsed.companyInfo || {}) },
        }));
      }
    } catch {
      // ignore
    }
  }, []);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saveToast, setSaveToast] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Auto-save draft changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // ignore
    }
  }, [data]);

  const setRegistrationType = (type: RegistrationType) => {
    setData((prev) => ({ ...prev, registrationType: type }));
    setErrors((prev) => ({ ...prev, registrationType: '' }));
  };

  const setMaterialCategory = (material: MaterialCategory) => {
    setData((prev) => ({ ...prev, materialCategory: material }));
    setErrors((prev) => ({ ...prev, materialCategory: '' }));
  };

  const updateCompanyInfo = (field: keyof CompanyInfo, value: string) => {
    setData((prev) => ({
      ...prev,
      companyInfo: {
        ...prev.companyInfo,
        [field]: value,
      },
    }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const setCapacityTier = (tier: CapacityTier) => {
    setData((prev) => ({ ...prev, capacityTier: tier }));
  };

  const setSubscriptionPlan = (plan: SubscriptionPlanId) => {
    setData((prev) => ({ ...prev, subscriptionPlan: plan }));
  };

  // Frontend simulated document upload with animated progress
  const uploadDocument = useCallback((docType: string, file: File) => {
    const docId = docType;
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
    const fileSize = file.size > 1024 * 1024 ? `${sizeInMB} MB` : `${Math.round(file.size / 1024)} KB`;

    const newDoc: UploadedDocument = {
      id: docId,
      type: docType as UploadedDocument['type'],
      fileName: file.name,
      fileSize,
      fileType: file.type.includes('pdf') ? 'PDF' : file.type.includes('png') ? 'PNG' : 'JPG',
      uploadProgress: 10,
      status: 'uploading',
      previewUrl: URL.createObjectURL(file),
    };

    setData((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [docType]: newDoc,
      },
    }));

    // Animate progress smoothly
    let currentProgress = 10;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 25) + 15;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);

        setData((prev) => ({
          ...prev,
          documents: {
            ...prev.documents,
            [docType]: prev.documents[docType]
              ? {
                  ...prev.documents[docType]!,
                  uploadProgress: 100,
                  status: 'completed',
                }
              : null,
          },
        }));
      } else {
        setData((prev) => ({
          ...prev,
          documents: {
            ...prev.documents,
            [docType]: prev.documents[docType]
              ? {
                  ...prev.documents[docType]!,
                  uploadProgress: currentProgress,
                }
              : null,
          },
        }));
      }
    }, 180);
  }, []);

  const removeDocument = useCallback((docType: string) => {
    setData((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [docType]: null,
      },
    }));
  }, []);

  // Validation function per step
  const validateCurrentStep = (stepToValidate: number = step): boolean => {
    const newErrors: Record<string, string> = {};

    if (stepToValidate === 1) {
      if (!data.registrationType) {
        newErrors.registrationType = 'Please select a registration type';
      }
    } else if (stepToValidate === 2) {
      if (!data.materialCategory) {
        newErrors.materialCategory = 'Please select a material category';
      }
    } else if (stepToValidate === 3) {
      const c = data.companyInfo;
      if (!c.companyName.trim()) newErrors.companyName = 'Company name is required';
      if (!c.companyEmail.trim()) {
        newErrors.companyEmail = 'Company email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.companyEmail)) {
        newErrors.companyEmail = 'Please enter a valid email address';
      }
      if (!c.mobileNumber.trim()) {
        newErrors.mobileNumber = 'Mobile number is required';
      } else if (!/^[0-9]{10}$/.test(c.mobileNumber.replace(/\D/g, ''))) {
        newErrors.mobileNumber = 'Enter a valid 10-digit mobile number';
      }
      if (!c.gstNumber.trim()) {
        newErrors.gstNumber = 'GST Number is required';
      } else if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/i.test(c.gstNumber.trim())) {
        newErrors.gstNumber = 'Invalid GST format (e.g. 22AAAAA0000A1Z5)';
      }
      if (!c.panNumber.trim()) {
        newErrors.panNumber = 'PAN Number is required';
      } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i.test(c.panNumber.trim())) {
        newErrors.panNumber = 'Invalid PAN format (e.g. ABCDE1234F)';
      }
      if (!c.factoryAddress.trim()) newErrors.factoryAddress = 'Factory address is required';
      if (!c.state.trim()) newErrors.state = 'State is required';
      if (!c.city.trim()) newErrors.city = 'City is required';
      if (!c.pincode.trim()) {
        newErrors.pincode = 'Pincode is required';
      } else if (!/^[0-9]{6}$/.test(c.pincode.trim())) {
        newErrors.pincode = 'Must be a 6-digit pin code';
      }
      if (!c.contactPerson.trim()) newErrors.contactPerson = 'Contact person name is required';
      if (!c.designation.trim()) newErrors.designation = 'Designation is required';
    } else if (stepToValidate === 4) {
      // Required documents per entity type (Brand: 6 documents; Recycler: 9 documents)
      const reqDocs = data.registrationType === 'brand'
        ? ['gst', 'pan', 'factory_license', 'coi_cert', 'epr_cert', 'cancelled_cheque']
        : ['gst', 'pan', 'factory_license', 'pollution_cert', 'coi_cert', 'auth_letter', 'cancelled_cheque', 'recycler_cert', 'epr_cert'];
      const missing = reqDocs.filter((type) => !data.documents[type] || data.documents[type]?.status !== 'completed');
      if (missing.length > 0) {
        newErrors.documents = `Please upload all ${reqDocs.length} required mandatory documents before continuing`;
      }
    } else if (stepToValidate === 5) {
      if (!data.capacityTier) {
        newErrors.capacityTier = 'Please select a capacity tier';
      }
    } else if (stepToValidate === 6) {
      if (!data.subscriptionPlan) {
        newErrors.subscriptionPlan = 'Please choose a subscription plan';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateCurrentStep(step)) {
      if (step < 7) {
        setStep((s) => s + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep((s) => s - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToStep = (targetStep: number) => {
    if (targetStep < step) {
      setStep(targetStep);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Validate all previous steps up to target
      let valid = true;
      for (let s = step; s < targetStep; s++) {
        if (!validateCurrentStep(s)) {
          valid = false;
          setStep(s);
          break;
        }
      }
      if (valid) {
        setStep(targetStep);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const saveProgress = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setSaveToast(true);
      setTimeout(() => setSaveToast(false), 3000);
    } catch {
      // ignore
    }
  };

  const submitRegistration = () => {
    if (validateCurrentStep(7) || true) {
      setIsSubmitted(true);
    }
  };

  const resetWizard = () => {
    localStorage.removeItem(STORAGE_KEY);
    setData(initialRegistrationData);
    setStep(1);
    setErrors({});
    setIsSubmitted(false);
  };

  const openWizard = (initialType?: RegistrationType) => {
    if (initialType) {
      setData((prev) => ({ ...prev, registrationType: initialType }));
    }
    setIsModalOpen(true);
    setIsSubmitted(false);
  };

  const closeWizard = () => {
    setIsModalOpen(false);
  };

  return {
    step,
    data,
    errors,
    saveToast,
    isSubmitted,
    isModalOpen,
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
    openWizard,
    closeWizard,
  };
}
