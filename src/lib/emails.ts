import { Resend } from 'resend';

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

function getFrom() {
  return `Voyage Japan <notifications@${process.env.RESEND_DOMAIN || 'resend.dev'}>`;
}

export async function sendDepositConfirmation(booking: {
  id: number;
  customer_name: string;
  customer_email: string;
  cruise_title: string;
  cabin_name: string | null;
  deposit_amount: number;
  guest_count: number;
}) {
  const resend = getResend();
  if (!resend) return;

  const totalDeposit = (booking.deposit_amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  await resend.emails.send({
    from: getFrom(),
    to: booking.customer_email,
    subject: `Deposit Received - ${booking.cruise_title}`,
    html: `
      <h2>Deposit Confirmation</h2>
      <p>Dear ${booking.customer_name},</p>
      <p>Your deposit of <strong>${totalDeposit}</strong> has been received for <strong>${booking.cruise_title}</strong>.</p>
      <table style="border-collapse:collapse;width:100%;max-width:600px;margin:16px 0;">
        <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;">Cruise</td><td style="padding:8px;border-bottom:1px solid #eee;font-weight:600;">${booking.cruise_title}</td></tr>
        ${booking.cabin_name ? `<tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;">Cabin Preference</td><td style="padding:8px;border-bottom:1px solid #eee;">${booking.cabin_name}</td></tr>` : ''}
        <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;">Guests</td><td style="padding:8px;border-bottom:1px solid #eee;">${booking.guest_count}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;">Deposit</td><td style="padding:8px;border-bottom:1px solid #eee;">${totalDeposit}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;">Reference</td><td style="padding:8px;border-bottom:1px solid #eee;font-weight:600;">VJ-${booking.id}</td></tr>
      </table>
      <h3>What happens next</h3>
      <ol>
        <li>We will confirm cabin availability within 24–48 hours</li>
        <li>If confirmed, you will receive a final fare invoice</li>
        <li>If unavailable, your deposit will be fully refunded</li>
      </ol>
      <p style="color:#999;font-size:12px;margin-top:24px;">Sent from Voyage Japan</p>
    `,
  });
}

export async function sendAdminBookingNotification(booking: {
  id: number;
  customer_name: string;
  customer_email: string;
  cruise_title: string;
  cabin_name: string | null;
  cabin_class: string | null;
  deposit_amount: number;
  guest_count: number;
  country: string;
  phone: string | null;
  passport: string;
  message: string | null;
}) {
  const resend = getResend();
  if (!resend) return;

  const to = process.env.NOTIFICATION_EMAIL;
  if (!to) return;

  const totalDeposit = (booking.deposit_amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  await resend.emails.send({
    from: getFrom(),
    to: to.split(',').map(e => e.trim()),
    subject: `New Booking Deposit - VJ-${booking.id} - ${booking.customer_name}`,
    html: `
      <h2>New Booking Deposit Received</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px;">
        <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;">Reference</td><td style="padding:8px;border-bottom:1px solid #eee;font-weight:600;">VJ-${booking.id}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;font-weight:600;">${booking.customer_name}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;">${booking.customer_email}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;">Passport</td><td style="padding:8px;border-bottom:1px solid #eee;">${booking.passport}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;">Phone</td><td style="padding:8px;border-bottom:1px solid #eee;">${booking.phone || '—'}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;">Country</td><td style="padding:8px;border-bottom:1px solid #eee;">${booking.country}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;">Cruise</td><td style="padding:8px;border-bottom:1px solid #eee;">${booking.cruise_title}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;">Cabin</td><td style="padding:8px;border-bottom:1px solid #eee;">${booking.cabin_name || '—'} (${booking.cabin_class || '—'})</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;">Guests</td><td style="padding:8px;border-bottom:1px solid #eee;">${booking.guest_count}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;">Deposit</td><td style="padding:8px;border-bottom:1px solid #eee;font-weight:600;">${totalDeposit}</td></tr>
      </table>
      ${booking.message ? `<h3 style="margin-top:20px;">Message</h3><p style="background:#f9f9f9;padding:12px;border-radius:8px;">${booking.message}</p>` : ''}
      <p style="color:#999;font-size:12px;margin-top:24px;">Sent from Voyage Japan booking system</p>
    `,
  });
}
