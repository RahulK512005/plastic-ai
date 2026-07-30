export type RegistrationType = 'brand' | 'recycler';

export type MaterialCategory = 'plastic' | 'metal';

export type CapacityTier = 'tier1' | 'tier2' | 'tier3' | 'tier4';

export type SubscriptionPlanId = 'starter' | 'growth' | 'enterprise';

export interface CompanyInfo {
  companyName: string;
  companyEmail: string;
  mobileNumber: string;
  gstNumber: string;
  panNumber: string;
  factoryAddress: string;
  state: string;
  city: string;
  pincode: string;
  companyWebsite: string;
  contactPerson: string;
  designation: string;
}

export interface UploadedDocument {
  id: string;
  type: 'gst' | 'pan' | 'factory_license' | 'pollution_cert' | 'coi_cert' | 'epr_cert' | 'cancelled_cheque' | 'auth_letter' | 'recycler_cert';
  fileName: string;
  fileSize: string;
  fileType: string;
  uploadProgress: number;
  status: 'uploading' | 'completed' | 'error';
  previewUrl?: string;
}

export interface RegistrationData {
  registrationType: RegistrationType;
  materialCategory: MaterialCategory;
  companyInfo: CompanyInfo;
  documents: Record<string, UploadedDocument | null>;
  capacityTier: CapacityTier;
  subscriptionPlan: SubscriptionPlanId;
}

export interface CapacityTierDetail {
  id: CapacityTier;
  title: string;
  range: string;
  description: string;
  recommendedFor: string;
}

export interface PlanDetail {
  id: SubscriptionPlanId;
  name: string;
  tagline: string;
  popular?: boolean;
  features: string[];
}

export interface PricingForTier {
  tier: CapacityTier;
  starter: { price: string; period: string };
  growth: { price: string; period: string };
  enterprise: { price: string; period: string };
}
