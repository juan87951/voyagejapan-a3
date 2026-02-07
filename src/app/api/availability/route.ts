import { NextResponse } from 'next/server';
import availabilityData from '@/data/availability.json';

export const revalidate = 900; // 15 minutes

export async function GET() {
  return NextResponse.json(availabilityData);
}
