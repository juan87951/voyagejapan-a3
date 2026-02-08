import { NextResponse } from 'next/server';
import { head } from '@vercel/blob';
import availabilityData from '@/data/availability.json';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const metadata = await head('availability.json');
    const response = await fetch(metadata.url);
    if (response.ok) {
      const data = await response.json();
      return NextResponse.json(data);
    }
  } catch {
    // Blob doesn't exist yet or fetch failed — fall through to static data
  }

  return NextResponse.json(availabilityData);
}
