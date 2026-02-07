import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = getSupabase();

    const { data, error } = await supabase.from('inquiries').insert([
      {
        name: body.name,
        email: body.email,
        phone: body.phone || null,
        country: body.country,
        preferred_cruise: body.preferredCruise || null,
        cabin_class: body.cabinClass || null,
        guest_count: body.guestCount || null,
        message: body.message || null,
      },
    ]);

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: 'Failed to save inquiry' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
