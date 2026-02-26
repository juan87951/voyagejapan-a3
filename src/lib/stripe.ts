import Stripe from 'stripe';

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  }
  return _stripe;
}

// Deposit amount in USD cents ($500.00 = 50000 cents)
export const DEPOSIT_AMOUNT_CENTS = 50000;
export const DEPOSIT_AMOUNT_DISPLAY = '$500';
