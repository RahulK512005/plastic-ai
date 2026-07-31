import { CapacityTierDetail, PlanDetail, PricingForTier, CapacityTier, SubscriptionPlanId, RegistrationType } from '../types/registration';

export const CAPACITY_TIERS: CapacityTierDetail[] = [
  {
    id: 'tier1',
    title: 'Tier 1',
    range: '0–149 MT/year',
    description: 'Ideal for small processors, local recyclers, and regional brand aggregators starting EPR tracking.',
    recommendedFor: 'Emerging Units & Local Aggregators',
  },
  {
    id: 'tier2',
    title: 'Tier 2',
    range: '150–399 MT/year',
    description: 'Designed for growing recycling facilities and mid-sized FMCG brands with steady monthly volumes.',
    recommendedFor: 'Mid-sized Processors & Brands',
  },
  {
    id: 'tier3',
    title: 'Tier 3',
    range: '400+ MT/year',
    description: 'High-volume recycling hubs and large national brand owners managing multi-state plastic packaging.',
    recommendedFor: 'Large Enterprise Units & PIBOs',
  }
];

export const PRICING_MATRIX: Record<CapacityTier, PricingForTier> = {
  tier1: {
    tier: 'tier1',
    starter: { price: '₹45,000', period: 'year' },
    growth: { price: '₹95,000', period: 'year' },
    enterprise: { price: '₹1,60,000', period: 'year' },
  },
  tier2: {
    tier: 'tier2',
    starter: { price: '₹85,000', period: 'year' },
    growth: { price: '₹1,80,000', period: 'year' },
    enterprise: { price: '₹3,20,000', period: 'year' },
  },
  tier3: {
    tier: 'tier3',
    starter: { price: '₹1,50,000', period: 'year' },
    growth: { price: '₹3,10,000', period: 'year' },
    enterprise: { price: '₹5,50,000', period: 'year' },
  },
  tier4: {
    tier: 'tier4',
    starter: { price: 'Custom', period: 'Contact Sales' },
    growth: { price: 'Custom', period: 'Contact Sales' },
    enterprise: { price: 'Custom Pricing', period: 'Contact Sales' },
  },
};

export const STARTER_FEATURES: string[] = [
  'Dashboard & Company Profile',
  'Document Vault',
  'Basic EPR Tracking',
  'Manual Invoice Management',
  'Marketplace Access',
  'Compliance Reports',
  'BRSR Report Generation',
  'Audit Readiness Score',
];

export const GROWTH_FEATURES: string[] = [
  'Everything in Starter',
  'Advanced Analytics',
  'WhatsApp Notifications',
  'Priority Support',
  'Bi-weekly Account Call',
  'Deadline Reminders',
];

export const ENTERPRISE_FEATURES: string[] = [
  'Everything in Growth',
  'AI Compliance Insights',
  'Dedicated Account Manager',
  'Automatic Invoice Sync',
  'Custom Reports',
  '24×7 Auditor Assistance',
  'Priority Support',
];

export const PLAN_DETAILS: PlanDetail[] = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'Essential EPR compliance and marketplace listing for operational needs.',
    popular: false,
    features: STARTER_FEATURES,
  },
  {
    id: 'growth',
    name: 'Growth',
    tagline: 'Complete automation with priority support and real-time alerts.',
    popular: true,
    features: GROWTH_FEATURES,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'Customized scale, dedicated auditor assistance, and AI insights.',
    popular: false,
    features: ENTERPRISE_FEATURES,
  },
];

export const BRAND_REQUIRED_DOCUMENTS = [
  {
    id: 'gst',
    title: 'GST Certificate',
    description: 'Upload valid GSTIN Registration Certificate (Form GST REG-06)',
    required: true,
    allowedTypes: 'PDF, PNG, JPG',
  },
  {
    id: 'pan',
    title: 'PAN Card',
    description: 'Company or Authorized Signatory Permanent Account Number card',
    required: true,
    allowedTypes: 'PDF, PNG, JPG',
  },
  {
    id: 'factory_license',
    title: 'Factory License',
    description: 'Valid state industrial factory permit or shop registration',
    required: true,
    allowedTypes: 'PDF, PNG, JPG',
  },
  {
    id: 'coi_cert',
    title: 'Certificate of Incorporation',
    description: 'Upload ROC Company Incorporation Certificate or Partnership Deed',
    required: true,
    allowedTypes: 'PDF, PNG, JPG',
  },
  {
    id: 'epr_cert',
    title: 'EPR Certificate',
    description: 'CPCB Registration or existing EPR fulfillments record',
    required: true,
    allowedTypes: 'PDF, PNG, JPG',
  },
  {
    id: 'cancelled_cheque',
    title: 'Cancelled Cheque',
    description: 'Upload company cancelled cheque or bank statement for account verification',
    required: true,
    allowedTypes: 'PDF, PNG, JPG',
  },
];

export const RECYCLER_REQUIRED_DOCUMENTS = [
  {
    id: 'gst',
    title: 'GST Certificate',
    description: 'Upload valid GSTIN Registration Certificate (Form GST REG-06)',
    required: true,
    allowedTypes: 'PDF, PNG, JPG',
  },
  {
    id: 'pan',
    title: 'PAN Card',
    description: 'Company or Authorized Signatory Permanent Account Number card',
    required: true,
    allowedTypes: 'PDF, PNG, JPG',
  },
  {
    id: 'factory_license',
    title: 'Factory License',
    description: 'Valid state industrial factory permit or shop registration',
    required: true,
    allowedTypes: 'PDF, PNG, JPG',
  },
  {
    id: 'pollution_cert',
    title: 'Pollution Certificate',
    description: 'Consent to Operate (CTO) or Consent to Establish (CTE) from SPCB/PCC',
    required: true,
    allowedTypes: 'PDF, PNG, JPG',
  },
  {
    id: 'coi_cert',
    title: 'Certificate of Incorporation',
    description: 'Upload ROC Company Incorporation Certificate or Partnership Deed',
    required: true,
    allowedTypes: 'PDF, PNG, JPG',
  },
  {
    id: 'auth_letter',
    title: 'Authorized Signatory Letter',
    description: 'Upload Board Resolution or Authorization Letter for authorized signatory',
    required: true,
    allowedTypes: 'PDF, PNG, JPG',
  },
  {
    id: 'cancelled_cheque',
    title: 'Cancelled Cheque',
    description: 'Upload company cancelled cheque or bank statement for account verification',
    required: true,
    allowedTypes: 'PDF, PNG, JPG',
  },
  {
    id: 'recycler_cert',
    title: 'Recycler Authorized Certification',
    description: 'Upload CPCB/SPCB Authorized Recycler Registration Certificate or Processing License',
    required: true,
    allowedTypes: 'PDF, PNG, JPG',
  },
  {
    id: 'epr_cert',
    title: 'EPR Certificate',
    description: 'CPCB Registration or existing EPR fulfillments record',
    required: true,
    allowedTypes: 'PDF, PNG, JPG',
  },
];

export const REQUIRED_DOCUMENTS = BRAND_REQUIRED_DOCUMENTS;

export function getRequiredDocuments(registrationType?: RegistrationType) {
  return registrationType === 'brand' ? BRAND_REQUIRED_DOCUMENTS : RECYCLER_REQUIRED_DOCUMENTS;
}

export const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Delhi NCR',
  'Dadra & Nagar Haveli and Daman & Diu',
  'Puducherry',
];
