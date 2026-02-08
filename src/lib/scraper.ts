/**
 * Reusable availability scraper module
 * Parses the structured mainData JSON from each voyage page for accurate
 * availability status based on room quantity.
 */

import * as fs from 'fs';
import * as path from 'path';

const AVAILABILITY_FILE = path.join(process.cwd(), 'src', 'data', 'availability.json');

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

// Map Asuka price keys to our cabin slugs
// Some categories have variants (MS/M3/MU, AS/AU) — we pick the best availability
const PRICE_KEY_TO_CABIN: Record<string, string> = {
  'RP': 'royal-penthouse',
  'GP': 'grand-penthouse',
  'CS': 'captains-suite',
  'PS': 'panorama-suite',
  'AS': 'asuka-suite',
  'AU': 'asuka-suite',       // universal variant → same category
  'MS': 'midship-suite',
  'M3': 'midship-suite',     // 3-person variant → same category
  'MU': 'midship-suite',     // universal variant → same category
  'JS': 'junior-suite',
  'BA': 'asuka-balcony-a',
  'BB': 'asuka-balcony-b',
  'BC': 'asuka-balcony-c',
  'BD': 'asuka-balcony-d',
  'B1': 'solo-balcony',
};

function quantityToStatus(qty: number): AvailabilityStatus {
  if (qty === 0) return 'sold_out';
  if (qty === 1) return 'waitlist';
  return 'available';
}

// Pick the better availability (available > waitlist > sold_out)
function betterStatus(a: AvailabilityStatus, b: AvailabilityStatus): AvailabilityStatus {
  const order: Record<AvailabilityStatus, number> = { available: 2, waitlist: 1, sold_out: 0 };
  return order[a] >= order[b] ? a : b;
}

interface MainDataPrice {
  price_key: string;
  quantity: string;
}

interface MainDataRelation {
  is_main: string;
  prices: MainDataPrice[];
}

interface MainDataCourse {
  relations: MainDataRelation[];
}

interface MainData {
  courses: MainDataCourse[];
}

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

    // Parse the structured mainData JSON from the page
    const match = html.match(/var mainData = ({[\s\S]*?});\s/);
    if (!match) {
      console.warn(`  Could not find mainData for ${voyageId}`);
      return null;
    }

    const mainData: MainData = JSON.parse(match[1]);
    const course = mainData.courses?.[0];
    if (!course) return null;

    // Use the main (non-club) relation
    const relation = course.relations.find(r => r.is_main === '1');
    if (!relation) return null;

    const result: Record<string, AvailabilityStatus> = {};

    for (const price of relation.prices) {
      const cabin = PRICE_KEY_TO_CABIN[price.price_key];
      if (!cabin) continue;
      const qty = parseInt(price.quantity, 10) || 0;
      const status = quantityToStatus(qty);

      // For categories with variants (midship-suite, asuka-suite),
      // pick the best availability across all variants
      if (result[cabin]) {
        result[cabin] = betterStatus(result[cabin], status);
      } else {
        result[cabin] = status;
      }
    }

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
    console.log('AsukaIII Availability Scraper');
    console.log('============================\n');
  }

  let existing: AvailabilityData;
  try {
    existing = JSON.parse(fs.readFileSync(AVAILABILITY_FILE, 'utf-8'));
    if (verbose) console.log(`Loaded existing data (last updated: ${existing.lastUpdated})\n`);
  } catch {
    existing = { lastUpdated: '', cruises: {} };
    if (verbose) console.log('No existing data found, starting fresh\n');
  }

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
