import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getSupabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

async function sendNotification(body: Record<string, string | null>) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFICATION_EMAIL;
  if (!apiKey || !to) return; // Skip silently if not configured

  const resend = new Resend(apiKey);
  const cruiseInfo = body.preferredCruise ? `Preferred Cruise: ${body.preferredCruise}` : 'No cruise selected';
  const cabinInfo = body.cabinClass ? `Cabin Class: ${body.cabinClass}` : '';
  const guestInfo = body.guestCount ? `Guests: ${body.guestCount}` : '';

  await resend.emails.send({
    from: 'Voyage Japan <notifications@' + (process.env.RESEND_DOMAIN || 'resend.dev') + '>',
    to: to.split(',').map(e => e.trim()),
    subject: `New Inquiry from ${body.name}`,
    html: `
      <h2>New Voyage Japan Inquiry</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px;">
        <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;font-weight:600;">${body.name}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;">${body.email}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;">Passport</td><td style="padding:8px;border-bottom:1px solid #eee;">${body.passport}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;">Phone</td><td style="padding:8px;border-bottom:1px solid #eee;">${body.phone || '—'}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;">Country</td><td style="padding:8px;border-bottom:1px solid #eee;">${body.country}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;">Cruise</td><td style="padding:8px;border-bottom:1px solid #eee;">${cruiseInfo}</td></tr>
        ${cabinInfo ? `<tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;">Cabin</td><td style="padding:8px;border-bottom:1px solid #eee;">${cabinInfo}</td></tr>` : ''}
        ${guestInfo ? `<tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;">Guests</td><td style="padding:8px;border-bottom:1px solid #eee;">${guestInfo}</td></tr>` : ''}
      </table>
      ${body.message ? `<h3 style="margin-top:20px;">Message</h3><p style="background:#f9f9f9;padding:12px;border-radius:8px;">${body.message}</p>` : ''}
      <p style="color:#999;font-size:12px;margin-top:24px;">Sent from Voyage Japan inquiry form</p>
    `,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = getSupabase();

    const { data, error } = await supabase.from('inquiries').insert([
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
      },
    ]);

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: 'Failed to save inquiry' }, { status: 500 });
    }

    // Send email notification (non-blocking — don't fail the response if email fails)
    sendNotification(body).catch(err => console.error('Email notification error:', err));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
