/**
 * Availability Scraper for Asuka III Cruises
 *
 * Attempts to fetch availability data from plan.asukacruise.co.jp
 * and updates src/data/availability.json.
 *
 * Usage: npx tsx scripts/scrape-availability.ts
 */

import { runScraper } from '../src/lib/scraper';

async function main() {
  await runScraper(true, true);
}

main().catch(console.error);
