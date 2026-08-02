import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { cookies } from 'next/headers';
import { createClient as createServerClient } from '../../../../../utils/supabase/server';
import { createServiceClient } from '../../../../../utils/supabase/service';
import { PRICE_AMOUNTS } from '../../../../data/pricing';
import type { CapacityTier, SubscriptionPlanId } from '../../../../types/registration';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export interface CreateOrderRequest {
  capacityTier: CapacityTier;
  subscriptionPlan: SubscriptionPlanId;
  registrationType: 'brand' | 'recycler';
  materialCategory: 'plastic' | 'metal';
  companyInfo: {
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
  };
}

export async function POST(req: NextRequest) {
  try {
    // 1. Auth — must be signed in
    const cookieStore = await cookies();
    const supabase = createServerClient(cookieStore);
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized — please sign in before completing payment.' },
        { status: 401 },
      );
    }

    // 2. Parse and validate body
    const body: CreateOrderRequest = await req.json();
    const { capacityTier, subscriptionPlan, registrationType, materialCategory, companyInfo } = body;

    if (!capacityTier || !subscriptionPlan || !companyInfo?.companyName) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    // 3. Resolve amount (paise = INR × 100). Custom / tier4 not allowed online.
    const amountInPaise = PRICE_AMOUNTS[capacityTier]?.[subscriptionPlan];
    if (!amountInPaise || amountInPaise <= 0) {
      return NextResponse.json(
        { error: 'Selected plan requires a custom quote. Please contact sales.' },
        { status: 400 },
      );
    }

    // 4. Create Razorpay order
    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      receipt: `reg_${user.id.slice(0, 8)}_${Date.now()}`,
      notes: {
        userId: user.id,
        companyName: companyInfo.companyName,
        plan: subscriptionPlan,
        tier: capacityTier,
      },
    });

    // 5. Upsert draft company row (status = 'draft') via service client (bypasses RLS)
    const service = createServiceClient();

    const { data: company, error: upsertError } = await service
      .from('companies')
      .upsert(
        {
          profile_id: user.id,
          name: companyInfo.companyName,
          email: companyInfo.companyEmail,
          mobile_number: companyInfo.mobileNumber,
          gst_number: companyInfo.gstNumber.toUpperCase(),
          pan_number: companyInfo.panNumber.toUpperCase(),
          factory_address: companyInfo.factoryAddress,
          state: companyInfo.state,
          city: companyInfo.city,
          pincode: companyInfo.pincode,
          website: companyInfo.companyWebsite || null,
          contact_person: companyInfo.contactPerson,
          designation: companyInfo.designation,
          registration_type: registrationType,
          material_category: materialCategory,
          capacity_tier: capacityTier,
          subscription_plan: subscriptionPlan,
          status: 'draft',
          razorpay_order_id: order.id,
          amount_paid: amountInPaise,
        },
        { onConflict: 'profile_id' },
      )
      .select('id')
      .single();

    if (upsertError) {
      console.error('[create-order] upsert company error:', upsertError);
      return NextResponse.json(
        { error: 'Failed to save registration draft. Please try again.' },
        { status: 500 },
      );
    }

    // 6. Create payment record (status = 'created')
    const { error: paymentError } = await service.from('payments').insert({
      company_id: company.id,
      razorpay_order_id: order.id,
      amount: amountInPaise,
      currency: 'INR',
      status: 'created',
    });

    if (paymentError) {
      console.error('[create-order] insert payment error:', paymentError);
      // Non-fatal — order was still created; proceed
    }

    return NextResponse.json({
      orderId: order.id,
      amount: amountInPaise,
      currency: 'INR',
      companyId: company.id,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error('[create-order] unexpected error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
