/**
 * API endpoint for scraping availability data
 * Can be called manually or by a cron service
 * 
 * Usage: GET /api/cron/scrape-availability
 */

import { NextRequest, NextResponse } from 'next/server';
import { runScraper } from '@/lib/scraper';

// Basic auth using an environment variable
const CRON_SECRET = process.env.CRON_SECRET || '';

export async function GET(request: NextRequest) {
  // Check authorization header
  const authHeader = request.headers.get('authorization');
  
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const result = await runScraper(true);
    
    return NextResponse.json(
      {
        success: true,
        updated: result.updated,
        message: result.message,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
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
