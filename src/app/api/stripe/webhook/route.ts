import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { getSupabaseAdmin } from '@/lib/supabase';
import { sendDepositConfirmation, sendAdminBookingNotification } from '@/lib/emails';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event;
  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      const bookingId = session.metadata?.booking_id;

      if (!bookingId) break;

      // Update booking status
      const { data: booking } = await supabase
        .from('bookings')
        .update({
          status: 'deposit_paid',
          stripe_payment_intent_id: session.payment_intent as string,
          updated_at: new Date().toISOString(),
        })
        .eq('id', bookingId)
        .select()
        .single();

      // Send emails (non-blocking)
      if (booking) {
        sendDepositConfirmation(booking).catch(err =>
          console.error('Deposit confirmation email error:', err)
        );
        // Fetch full inquiry data for admin notification
        const { data: inquiry } = await supabase
          .from('inquiries')
          .select('*')
          .eq('id', booking.inquiry_id)
          .single();

        if (inquiry) {
          sendAdminBookingNotification({
            ...booking,
            country: inquiry.country,
            phone: inquiry.phone,
            passport: inquiry.passport,
            message: inquiry.message,
          }).catch(err =>
            console.error('Admin booking notification error:', err)
          );
        }
      }
      break;
    }

    case 'checkout.session.expired': {
      const session = event.data.object;
      const bookingId = session.metadata?.booking_id;

      if (!bookingId) break;

      await supabase
        .from('bookings')
        .update({
          status: 'expired',
          updated_at: new Date().toISOString(),
        })
        .eq('id', bookingId);
      break;
    }

    case 'charge.refunded': {
      const charge = event.data.object;
      const paymentIntentId = charge.payment_intent;

      if (!paymentIntentId) break;

      await supabase
        .from('bookings')
        .update({
          status: 'refunded',
          updated_at: new Date().toISOString(),
        })
        .eq('stripe_payment_intent_id', paymentIntentId);
      break;
    }
  }

  return NextResponse.json({ received: true });
}
