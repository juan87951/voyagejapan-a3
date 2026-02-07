import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US').format(price);
}

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export const EXCHANGE_RATE = 130;

export function formatPriceUSD(jpyPrice: number): string {
  const usd = Math.round(jpyPrice / EXCHANGE_RATE);
  return `$${new Intl.NumberFormat('en-US').format(usd)}`;
}

export function cabinAvailabilitySlug(categoryName: string): string {
  return categoryName
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}
