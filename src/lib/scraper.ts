/**
 * Reusable availability scraper module
 * Can be imported and called from API routes or scripts
 */

import * as fs from 'fs';
import * as path from 'path';

const AVAILABILITY_FILE = path.join(process.cwd(), 'src', 'data', 'availability.json');

// Mapping of cruise slugs to their plan.asukacruise.co.jp voyage IDs
const VOYAGE_IDS: Record<string, string> = {
  'spring-kagoshima-ishigaki': 'A301',
  'spring-ofunato-aomori': 'A302',
  'spring-hakodate-fushiki': 'A303',
  'golden-week-guam': 'A304',
  'japan-discovery': 'A305',
  'early-summer-kyushu-amami': 'A306',
  'summer-suruga-anniversary': 'A307',
  'summer-hokkaido-kushiro': 'A308',
  'nichinan-fireworks': 'A309',
  'summer-hokkaido-rishiri': 'A310',
};

type AvailabilityStatus = 'available' | 'waitlist' | 'sold_out';

interface AvailabilityData {
  lastUpdated: string;
  cruises: Record<string, Record<string, AvailabilityStatus>>;
}

function parseSymbol(symbol: string): AvailabilityStatus {
  const trimmed = symbol.trim();
  if (trimmed === '〇' || trimmed === '○') return 'available';
  if (trimmed === '△') return 'waitlist';
  if (trimmed === '×' || trimmed === '✕') return 'sold_out';
  return 'available';
}

async function scrapeVoyage(voyageId: string): Promise<Record<string, AvailabilityStatus> | null> {
  const url = `https://plan.asukacruise.co.jp/voyage/${voyageId}`;

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; VoyageJapan/1.0)',
        'Accept': 'text/html',
        'Accept-Language': 'ja,en;q=0.9',
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      console.warn(`  HTTP ${response.status} for ${voyageId}`);
      return null;
    }

    const html = await response.text();

    const cabinCategories = [
      'royal-penthouse', 'grand-penthouse', 'captains-suite',
      'panorama-suite', 'asuka-suite', 'midship-suite', 'junior-suite',
      'asuka-balcony-a', 'asuka-balcony-b', 'asuka-balcony-c', 'asuka-balcony-d',
      'solo-balcony',
    ];

    const symbols = html.match(/[〇○△×✕]/g);
    if (!symbols || symbols.length < cabinCategories.length) {
      console.warn(`  Could not parse symbols for ${voyageId} (found ${symbols?.length || 0})`);
      return null;
    }

    const result: Record<string, AvailabilityStatus> = {};
    cabinCategories.forEach((cat, i) => {
      result[cat] = parseSymbol(symbols[i]);
    });

    return result;
  } catch (error) {
    console.warn(`  Failed to fetch ${voyageId}: ${error instanceof Error ? error.message : error}`);
    return null;
  }
}

export async function runScraper(verbose = false): Promise<{ updated: boolean; message: string }> {
  if (verbose) {
    console.log('Asuka III Availability Scraper');
    console.log('=============================\n');
  }

  let existing: AvailabilityData;
  try {
    existing = JSON.parse(fs.readFileSync(AVAILABILITY_FILE, 'utf-8'));
    if (verbose) console.log(`Loaded existing data (last updated: ${existing.lastUpdated})\n`);
  } catch {
    existing = { lastUpdated: '', cruises: {} };
    if (verbose) console.log('No existing data found, starting fresh\n');
  }

  let updated = false;
  let updateCount = 0;

  for (const [slug, voyageId] of Object.entries(VOYAGE_IDS)) {
    if (verbose) console.log(`Scraping ${slug} (${voyageId})...`);
    const result = await scrapeVoyage(voyageId);

    if (result) {
      existing.cruises[slug] = result;
      updated = true;
      updateCount++;
      if (verbose) console.log(`  OK - updated`);
    } else {
      if (verbose) console.log(`  Skipped - keeping existing data`);
    }
  }

  if (updated) {
    existing.lastUpdated = new Date().toISOString();
    fs.writeFileSync(AVAILABILITY_FILE, JSON.stringify(existing, null, 2) + '\n');
    const message = `Updated ${updateCount} cruises. Saved to ${AVAILABILITY_FILE}`;
    if (verbose) console.log(`\n${message}`);
    return { updated: true, message };
  } else {
    const message = 'No updates made (all fetches failed or returned no data)';
    if (verbose) console.log(`\n${message}`);
    return { updated: false, message };
  }
}
