import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get('session_id');

  if (!sessionId) {
    return NextResponse.json({ error: 'Missing session_id' }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  const { data: booking, error } = await supabase
    .from('bookings')
    .select('id, customer_name, customer_email, cruise_title, cabin_name, cabin_class, guest_count, deposit_amount, currency, status, created_at')
    .eq('stripe_session_id', sessionId)
    .single();

  if (error || !booking) {
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
  }

  return NextResponse.json({ booking });
}
