/**
 * Reusable availability scraper module
 * Can be imported and called from API routes or scripts
 */

import * as fs from 'fs';
import * as path from 'path';

const AVAILABILITY_FILE = path.join(process.cwd(), 'src', 'data', 'availability.json');

// Mapping of cruise slugs to their plan.asukacruise.co.jp page IDs
const VOYAGE_IDS: Record<string, number> = {
  'spring-kochi-iwakuni': 97160,
  'spring-kagoshima-ishigaki': 97163,
  'spring-weekend-suruga': 97165,
  'spring-ofunato-aomori': 97166,
  'spring-hakodate-fushiki': 97167,
  'golden-week-guam': 97168,
  'japan-discovery': 98587,
  'early-summer-kyushu-amami': 98839,
  'early-summer-weekend-gamagori': 98840,
  'early-summer-ogasawara': 98841,
  'early-summer-weekend-kochi': 98844,
  'early-summer-yokkaichi-yokohama': 98833,
  'early-summer-weekend-shimoda': 98845,
  'summer-ogasawara-a': 98842,
  'summer-hakata-busan': 98846,
  'summer-weekend-yokkaichi': 98847,
  'summer-ogasawara-b': 98843,
  'summer-holiday-suruga': 98848,
  'summer-hokkaido-kushiro': 98849,
  'summer-hokkaido-rishiri': 98880,
  'summer-toba-kobe': 98835,
  'tateyama-fireworks': 98919,
  'kanmon-fireworks': 98925,
  'kumano-fireworks': 98930,
  'summer-hokkaido-abashiri': 98933,
  'summer-hokkaido-muroran': 98937,
  'autumn-hiroshima-hakata': 98838,
  'autumn-weekend-jeju': 98947,
  'autumn-seto-wakayama-shodoshima': 98948,
  'autumn-kochi-kobe': 98938,
  'autumn-seto-beppu': 98952,
  'autumn-holiday-tanegashima-kochi': 98953,
  'autumn-hokkaido-michinoku': 98960,
  'autumn-suruga-yokohama': 98942,
  'autumn-tanegashima-nagasaki-kagoshima': 98961,
  'autumn-holiday-toba': 98962,
  'autumn-seto-hyuga-matsuyama': 98963,
  'autumn-hitachinaka-kobe': 98946,
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

const cabinCategories = [
  'royal-penthouse', 'grand-penthouse', 'captains-suite',
  'panorama-suite', 'asuka-suite', 'midship-suite', 'junior-suite',
  'asuka-balcony-a', 'asuka-balcony-b', 'asuka-balcony-c', 'asuka-balcony-d',
  'solo-balcony',
];

async function scrapeVoyage(voyageId: number): Promise<Record<string, AvailabilityStatus> | null> {
  const url = `https://plan.asukacruise.co.jp/asuka3/${voyageId}/`;

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

async function scrapeBatch(
  entries: [string, number][],
  verbose: boolean
): Promise<Record<string, Record<string, AvailabilityStatus>>> {
  const results: Record<string, Record<string, AvailabilityStatus>> = {};
  const promises = entries.map(async ([slug, voyageId]) => {
    if (verbose) console.log(`Scraping ${slug} (${voyageId})...`);
    const result = await scrapeVoyage(voyageId);
    if (result) {
      results[slug] = result;
      if (verbose) console.log(`  OK - ${slug}`);
    } else {
      if (verbose) console.log(`  Skipped - ${slug}`);
    }
  });
  await Promise.all(promises);
  return results;
}

export async function runScraper(verbose = false, writeToFile = false): Promise<{ updated: boolean; message: string; data?: AvailabilityData }> {
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

  // Scrape in parallel batches of 10 to stay within timeout
  const allEntries = Object.entries(VOYAGE_IDS);
  const BATCH_SIZE = 10;
  let updateCount = 0;

  for (let i = 0; i < allEntries.length; i += BATCH_SIZE) {
    const batch = allEntries.slice(i, i + BATCH_SIZE);
    if (verbose) console.log(`\nBatch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(allEntries.length / BATCH_SIZE)}`);
    const batchResults = await scrapeBatch(batch, verbose);
    for (const [slug, data] of Object.entries(batchResults)) {
      existing.cruises[slug] = data;
      updateCount++;
    }
  }

  if (updateCount > 0) {
    existing.lastUpdated = new Date().toISOString();
    if (writeToFile) {
      fs.writeFileSync(AVAILABILITY_FILE, JSON.stringify(existing, null, 2) + '\n');
    }
    const message = `Updated ${updateCount} cruises`;
    if (verbose) console.log(`\n${message}`);
    return { updated: true, message, data: existing };
  } else {
    const message = 'No updates made (all fetches failed or returned no data)';
    if (verbose) console.log(`\n${message}`);
    return { updated: false, message, data: existing };
  }
}
