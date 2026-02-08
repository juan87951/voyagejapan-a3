/**
 * API endpoint for scraping availability data
 * Can be called manually or by a cron service
 *
 * Usage: GET /api/cron/scrape-availability?secret=YOUR_SECRET
 */

import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { runScraper } from '@/lib/scraper';

// Allow up to 60 seconds for scraping all voyages (Hobby plan max)
export const maxDuration = 60;

const CRON_SECRET = process.env.CRON_SECRET || '';

function isAuthorized(request: NextRequest): boolean {
  if (!CRON_SECRET) return true;

  // Check query param (?secret=...)
  const querySecret = request.nextUrl.searchParams.get('secret');
  if (querySecret === CRON_SECRET) return true;

  // Check Authorization header (Bearer ...)
  const authHeader = request.headers.get('authorization');
  if (authHeader === `Bearer ${CRON_SECRET}`) return true;

  return false;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await runScraper(true, false);

    // Persist to Vercel Blob so the data survives ephemeral serverless filesystems
    if (result.updated && result.data) {
      await put('availability.json', JSON.stringify(result.data), {
        access: 'public',
        addRandomSuffix: false,
        contentType: 'application/json',
      });
    }

    return NextResponse.json({
      success: true,
      updated: result.updated,
      message: result.message,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Scraper error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
