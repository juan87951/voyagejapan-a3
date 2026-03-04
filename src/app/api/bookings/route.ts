import { NextRequest, NextResponse } from 'next/server';
import { getStripe, DEPOSIT_AMOUNT_CENTS } from '@/lib/stripe';
import { getSupabaseAdmin } from '@/lib/supabase';
import { cruises } from '@/data';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = getSupabaseAdmin();

    // Validate required fields
    if (!body.name || !body.email || !body.passport || !body.country || !body.preferredCruise || !body.cabinClass) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const guestCount = parseInt(body.guestCount || '1', 10) || 1;

    // Look up cruise details
    const cruise = cruises.find(c => c.slug === body.preferredCruise);
    const cruiseTitle = cruise?.title || body.preferredCruise;

    // Resolve cabin name from class
    const cabinClassLabels: Record<string, string> = {
      penthouse: 'Penthouse',
      suite: 'Suite',
      balcony: 'Balcony',
    };
    const cabinName = cabinClassLabels[body.cabinClass] || body.cabinClass;

    // 1. Insert inquiry (preserves existing behavior)
    const { data: inquiry, error: inquiryError } = await supabase
      .from('inquiries')
      .insert([
        {
          name: body.name,
          email: body.email,
          passport: body.passport,
          phone: body.phone || null,
          country: body.country,
          preferred_cruise: body.preferredCruise || null,
          cabin_class: body.cabinClass || null,
          guest_count: body.guestCount || null,
          message: body.message || null,
          terms_agreed: body.termsAgreement || false,
          terms_agreed_at: body.termsAgreement ? new Date().toISOString() : null,
        },
      ])
      .select('id')
      .single();

    if (inquiryError) {
      console.error('Supabase inquiry insert error:', inquiryError);
      return NextResponse.json({ error: 'Failed to save inquiry' }, { status: 500 });
    }

    // 2. Calculate deposit
    const depositAmount = DEPOSIT_AMOUNT_CENTS * guestCount;

    // 3. Insert booking
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .insert([
        {
          inquiry_id: inquiry.id,
          customer_name: body.name,
          customer_email: body.email,
          cruise_slug: body.preferredCruise,
          cruise_title: cruiseTitle,
          cabin_name: cabinName,
          cabin_class: body.cabinClass,
          guest_count: guestCount,
          deposit_amount: depositAmount,
          currency: 'usd',
          status: 'pending_payment',
        },
      ])
      .select('id')
      .single();

    if (bookingError) {
      console.error('Supabase booking insert error:', bookingError);
      return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
    }

    // 4. Create Stripe Checkout Session
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://voyagejapan-a3.vercel.app';

    const session = await getStripe().checkout.sessions.create({
      mode: 'payment',
      currency: 'usd',
      customer_email: body.email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: DEPOSIT_AMOUNT_CENTS,
            product_data: {
              name: `Booking Deposit – ${cruiseTitle}`,
              description: `${cabinName} class, ${guestCount} guest${guestCount > 1 ? 's' : ''}`,
            },
          },
          quantity: guestCount,
        },
      ],
      metadata: {
        booking_id: booking.id.toString(),
        inquiry_id: inquiry.id.toString(),
      },
      success_url: `${baseUrl}/booking/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/contact?cancelled=true`,
    });

    // 5. Store session ID on booking
    await supabase
      .from('bookings')
      .update({ stripe_session_id: session.id })
      .eq('id', booking.id);

    return NextResponse.json({ checkoutUrl: session.url });
  } catch (error) {
    console.error('Booking API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
