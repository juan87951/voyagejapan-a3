import type { Cruise, CabinCategory } from '@/types';

// Base JPY prices per person (double occupancy) for a 10-day reference cruise
const basePrices: Record<string, number> = {
  'Royal Penthouse': 4_950_000,
  'Grand Penthouse': 4_500_000,
  "Captain's Suite": 3_420_000,
  'Panorama Suite': 2_700_000,
  'Asuka Suite': 2_160_000,
  'Midship Suite': 1_800_000,
  'Junior Suite': 1_440_000,
  'Asuka Balcony A': 1_100_000,
  'Asuka Balcony B': 1_070_000,
  'Asuka Balcony C': 1_040_000,
  'Asuka Balcony D': 1_020_000,
  'Solo Balcony': 1_350_000,
};

function scalePrice(base: number, days: number): number {
  return Math.round((base * days) / 10 / 10000) * 10000;
}

function buildCabinCategories(days: number): CabinCategory[] {
  return [
    { class: 'penthouse', classLabel: 'Penthouse', name: 'Royal Penthouse', slug: 'royal-penthouse', priceFrom: scalePrice(basePrices['Royal Penthouse'], days) },
    { class: 'penthouse', classLabel: 'Penthouse', name: 'Grand Penthouse', slug: 'grand-penthouse', priceFrom: scalePrice(basePrices['Grand Penthouse'], days) },
    { class: 'suite', classLabel: 'Suite', name: "Captain's Suite", slug: 'captains-suite', priceFrom: scalePrice(basePrices["Captain's Suite"], days) },
    { class: 'suite', classLabel: 'Suite', name: 'Panorama Suite', slug: 'panorama-suite', priceFrom: scalePrice(basePrices['Panorama Suite'], days) },
    { class: 'suite', classLabel: 'Suite', name: 'Asuka Suite', slug: 'asuka-suite', priceFrom: scalePrice(basePrices['Asuka Suite'], days) },
    { class: 'suite', classLabel: 'Suite', name: 'Midship Suite', slug: 'midship-suite', priceFrom: scalePrice(basePrices['Midship Suite'], days) },
    { class: 'suite', classLabel: 'Suite', name: 'Junior Suite', slug: 'junior-suite', priceFrom: scalePrice(basePrices['Junior Suite'], days) },
    { class: 'balcony', classLabel: 'Balcony', name: 'Asuka Balcony A', slug: 'asuka-balcony', priceFrom: scalePrice(basePrices['Asuka Balcony A'], days) },
    { class: 'balcony', classLabel: 'Balcony', name: 'Asuka Balcony B', slug: 'asuka-balcony', priceFrom: scalePrice(basePrices['Asuka Balcony B'], days) },
    { class: 'balcony', classLabel: 'Balcony', name: 'Asuka Balcony C', slug: 'asuka-balcony', priceFrom: scalePrice(basePrices['Asuka Balcony C'], days) },
    { class: 'balcony', classLabel: 'Balcony', name: 'Asuka Balcony D', slug: 'asuka-balcony', priceFrom: scalePrice(basePrices['Asuka Balcony D'], days) },
    { class: 'balcony', classLabel: 'Balcony', name: 'Solo Balcony', slug: 'solo-balcony', priceFrom: scalePrice(basePrices['Solo Balcony'], days), singleOnly: true },
  ];
}

export const cruises: Cruise[] = [
  {
    id: 'voyage-1',
    slug: 'spring-kagoshima-ishigaki',
    title: 'Spring Kagoshima & Ishigaki Cruise',
    shortDescription: 'Discover the subtropical beauty of southern Japan, from Kagoshima\'s hot springs to Ishigaki\'s pristine beaches.',
    departureDate: '2026-04-08',
    endDate: '2026-04-16',
    duration: { days: 9, nights: 8 },
    departurePort: 'Kobe',
    route: 'Kobe → Kagoshima → Ishigaki → Kobe',
    highlights: [
      'Ibusuki sand bath hot springs',
      'Subtropical nature of Ishigaki Island',
      'Kabira Bay — one of Japan\'s most beautiful bays',
      'Cherry blossom season in southern Japan'
    ],
    season: 'spring',
    featured: true,
    imageUrl: '/images/cruises/kagoshima-ishigaki.jpg',
    itinerary: [
      { day: 1, port: 'Kobe', departure: '17:00' },
      { day: 2, port: 'At Sea', isSeaDay: true },
      { day: 3, port: 'Kagoshima', arrival: '08:00', departure: '18:00' },
      { day: 4, port: 'At Sea', isSeaDay: true },
      { day: 5, port: 'Ishigaki', arrival: '08:00', departure: '18:00' },
      { day: 6, port: 'Ishigaki', arrival: '08:00', departure: '17:00' },
      { day: 7, port: 'At Sea', isSeaDay: true },
      { day: 8, port: 'At Sea', isSeaDay: true },
      { day: 9, port: 'Kobe', arrival: '09:00' }
    ],
    cabinCategories: buildCabinCategories(9),
  },
  {
    id: 'voyage-2',
    slug: 'spring-ofunato-aomori',
    title: 'Spring Ofunato & Aomori Cruise',
    shortDescription: 'Experience Tohoku\'s cherry blossoms at their peak along the dramatic Sanriku coastline.',
    departureDate: '2026-04-20',
    endDate: '2026-04-25',
    duration: { days: 6, nights: 5 },
    departurePort: 'Yokohama',
    route: 'Yokohama → Ofunato → Aomori → Yokohama',
    highlights: [
      'Tohoku cherry blossoms in full bloom',
      'Sanriku coastline — dramatic cliffs and coves',
      'Aomori cultural heritage and Nebuta history',
      'Fresh seafood from northern waters'
    ],
    season: 'spring',
    featured: false,
    imageUrl: '/images/cruises/ofunato-aomori.jpg',
    itinerary: [
      { day: 1, port: 'Yokohama', departure: '17:00' },
      { day: 2, port: 'At Sea', isSeaDay: true },
      { day: 3, port: 'Ofunato', arrival: '08:00', departure: '17:00' },
      { day: 4, port: 'Aomori', arrival: '08:00', departure: '17:00' },
      { day: 5, port: 'At Sea', isSeaDay: true },
      { day: 6, port: 'Yokohama', arrival: '09:00' }
    ],
    cabinCategories: buildCabinCategories(6),
  },
  {
    id: 'voyage-3',
    slug: 'spring-hakodate-fushiki',
    title: 'Spring Hakodate & Fushiki Cruise',
    shortDescription: 'From Hakodate\'s legendary night views to Toyama Bay\'s mountain backdrop, a journey through northern spring.',
    departureDate: '2026-04-25',
    endDate: '2026-05-02',
    duration: { days: 8, nights: 7 },
    departurePort: 'Yokohama',
    route: 'Yokohama → Hakodate → Fushiki (Toyama) → Yokohama',
    highlights: [
      'Hakodate night view — one of Japan\'s top 3',
      'Goryokaku cherry blossoms',
      'Tateyama mountain backdrop at Fushiki',
      'Toyama Bay seafood — the "natural aquarium"'
    ],
    season: 'spring',
    featured: true,
    imageUrl: '/images/cruises/hakodate-fushiki.jpg',
    itinerary: [
      { day: 1, port: 'Yokohama', departure: '17:00' },
      { day: 2, port: 'At Sea', isSeaDay: true },
      { day: 3, port: 'Hakodate', arrival: '08:00', departure: '20:00' },
      { day: 4, port: 'At Sea', isSeaDay: true },
      { day: 5, port: 'Fushiki', arrival: '08:00', departure: '17:00' },
      { day: 6, port: 'At Sea', isSeaDay: true },
      { day: 7, port: 'At Sea', isSeaDay: true },
      { day: 8, port: 'Yokohama', arrival: '09:00' }
    ],
    cabinCategories: buildCabinCategories(8),
  },
  {
    id: 'voyage-4',
    slug: 'golden-week-guam',
    title: 'Golden Week Guam Cruise',
    shortDescription: 'An international voyage to tropical Guam during Japan\'s Golden Week holiday, with extended sea days.',
    departureDate: '2026-05-02',
    endDate: '2026-05-11',
    duration: { days: 10, nights: 9 },
    departurePort: 'Yokohama',
    route: 'Yokohama → Guam → Yokohama',
    highlights: [
      'International cruise to tropical Guam',
      'Total lunar eclipse viewing opportunity at sea',
      'Extended relaxation days at sea',
      'Golden Week special onboard events'
    ],
    season: 'spring',
    featured: false,
    imageUrl: '/images/cruises/guam.jpg',
    itinerary: [
      { day: 1, port: 'Yokohama', departure: '17:00' },
      { day: 2, port: 'At Sea', isSeaDay: true },
      { day: 3, port: 'At Sea', isSeaDay: true },
      { day: 4, port: 'At Sea', isSeaDay: true },
      { day: 5, port: 'Guam', arrival: '08:00', departure: '18:00' },
      { day: 6, port: 'Guam', arrival: '08:00', departure: '17:00' },
      { day: 7, port: 'At Sea', isSeaDay: true },
      { day: 8, port: 'At Sea', isSeaDay: true },
      { day: 9, port: 'At Sea', isSeaDay: true },
      { day: 10, port: 'Yokohama', arrival: '09:00' }
    ],
    cabinCategories: buildCabinCategories(10),
  },
  {
    id: 'voyage-5',
    slug: 'japan-discovery',
    title: 'Japan Discovery Cruise — Full Circumnavigation',
    shortDescription: 'The ultimate 23-day journey around Japan — 14 prefectures, 15 ports, from Okinawa to Hokkaido.',
    departureDate: '2026-05-12',
    endDate: '2026-06-03',
    duration: { days: 23, nights: 22 },
    departurePort: 'Yokohama',
    route: 'Yokohama → Nagasaki → Kagoshima → Tanegashima → Amami → Naha → Miyakojima → Ishigaki → Sakai-Minato → Kanazawa → Fushiki → Sado → Akita → Hakodate → Miyako → Ishinomaki → Yokohama',
    highlights: [
      'Full circumnavigation of Japan — 14 prefectures',
      'JAXA Tanegashima Space Center special visit',
      'Kanazawa traditional cuisine at historic ryotei',
      'Kogei crafts and cultural experiences at every port',
      'Future Cruise Credit ¥300,000 for My ASUKA CLUB members'
    ],
    season: 'spring',
    featured: true,
    imageUrl: '/images/cruises/japan-discovery.jpg',
    itinerary: [
      { day: 1, port: 'Yokohama', departure: '17:00' },
      { day: 2, port: 'At Sea', isSeaDay: true },
      { day: 3, port: 'Nagasaki', arrival: '08:00', departure: '18:00' },
      { day: 4, port: 'Kagoshima', arrival: '08:00', departure: '17:00' },
      { day: 5, port: 'Tanegashima', arrival: '08:00', departure: '17:00' },
      { day: 6, port: 'Naze (Amami)', arrival: '08:00', departure: '17:00' },
      { day: 7, port: 'Naha', arrival: '08:00', departure: '18:00' },
      { day: 8, port: 'Miyakojima', arrival: '08:00', departure: '17:00' },
      { day: 9, port: 'Ishigaki', arrival: '08:00', departure: '17:00' },
      { day: 10, port: 'At Sea', isSeaDay: true },
      { day: 11, port: 'At Sea', isSeaDay: true },
      { day: 12, port: 'Sakai-Minato', arrival: '08:00', departure: '17:00' },
      { day: 13, port: 'Kanazawa', arrival: '08:00', departure: '18:00' },
      { day: 14, port: 'Fushiki', arrival: '08:00', departure: '17:00' },
      { day: 15, port: 'Sado', arrival: '08:00', departure: '17:00' },
      { day: 16, port: 'Akita', arrival: '08:00', departure: '17:00' },
      { day: 17, port: 'Hakodate', arrival: '08:00', departure: '18:00' },
      { day: 18, port: 'At Sea', isSeaDay: true },
      { day: 19, port: 'Miyako', arrival: '08:00', departure: '17:00' },
      { day: 20, port: 'Ishinomaki', arrival: '08:00', departure: '17:00' },
      { day: 21, port: 'At Sea', isSeaDay: true },
      { day: 22, port: 'At Sea', isSeaDay: true },
      { day: 23, port: 'Yokohama', arrival: '09:00' }
    ],
    cabinCategories: buildCabinCategories(23),
  },
  {
    id: 'voyage-6',
    slug: 'early-summer-kyushu-amami',
    title: 'Early Summer Kyushu & Amami Cruise',
    shortDescription: 'From Beppu\'s legendary hot springs to Amami\'s subtropical paradise — the best of Kyushu.',
    departureDate: '2026-06-10',
    endDate: '2026-06-17',
    duration: { days: 8, nights: 7 },
    departurePort: 'Kobe',
    route: 'Kobe → Beppu → Kagoshima → Naze (Amami) → Kobe',
    highlights: [
      'Beppu — Japan\'s hot spring capital',
      'Sakurajima volcano views from Kagoshima',
      'Subtropical Amami Oshima nature',
      'Mangrove kayaking and coral reef snorkeling'
    ],
    season: 'summer',
    featured: false,
    imageUrl: '/images/cruises/kyushu-amami.jpg',
    itinerary: [
      { day: 1, port: 'Kobe', departure: '17:00' },
      { day: 2, port: 'At Sea', isSeaDay: true },
      { day: 3, port: 'Beppu', arrival: '08:00', departure: '17:00' },
      { day: 4, port: 'Kagoshima', arrival: '08:00', departure: '17:00' },
      { day: 5, port: 'Naze (Amami)', arrival: '08:00', departure: '17:00' },
      { day: 6, port: 'At Sea', isSeaDay: true },
      { day: 7, port: 'At Sea', isSeaDay: true },
      { day: 8, port: 'Kobe', arrival: '09:00' }
    ],
    cabinCategories: buildCabinCategories(8),
  },
  {
    id: 'voyage-7',
    slug: 'summer-suruga-anniversary',
    title: 'Summer Suruga Cruise — 1st Anniversary',
    shortDescription: 'Celebrate Asuka III\'s 1st anniversary with Mt. Fuji views from Suruga Bay.',
    departureDate: '2026-07-18',
    endDate: '2026-07-21',
    duration: { days: 4, nights: 3 },
    departurePort: 'Yokohama',
    route: 'Yokohama → Shimizu → Yokohama',
    highlights: [
      'Asuka III 1st Anniversary celebration',
      'Mt. Fuji panoramic views from Suruga Bay',
      'Shimizu port — gateway to Shizuoka tea country',
      'Summer holiday special entertainment'
    ],
    season: 'summer',
    featured: false,
    imageUrl: '/images/cruises/suruga.jpg',
    itinerary: [
      { day: 1, port: 'Yokohama', departure: '17:00' },
      { day: 2, port: 'Shimizu', arrival: '08:00', departure: '18:00' },
      { day: 3, port: 'At Sea', isSeaDay: true },
      { day: 4, port: 'Yokohama', arrival: '09:00' }
    ],
    cabinCategories: buildCabinCategories(4),
  },
  {
    id: 'voyage-8',
    slug: 'summer-hokkaido-kushiro',
    title: 'Summer Hokkaido Cruise — Kushiro, Muroran & Hakodate',
    shortDescription: 'Explore Hokkaido at its finest — marshlands, night views, and world-class seafood.',
    departureDate: '2026-07-25',
    endDate: '2026-08-01',
    duration: { days: 8, nights: 7 },
    departurePort: 'Yokohama',
    route: 'Yokohama → Kushiro → Muroran → Hakodate → Yokohama',
    highlights: [
      'Kushiro Marshland — Japan\'s largest wetland',
      'Muroran — dramatic cape and night views',
      'Hakodate morning market and fresh seafood',
      'Best season to visit Hokkaido'
    ],
    season: 'summer',
    featured: true,
    imageUrl: '/images/cruises/hokkaido-kushiro.jpg',
    itinerary: [
      { day: 1, port: 'Yokohama', departure: '17:00' },
      { day: 2, port: 'At Sea', isSeaDay: true },
      { day: 3, port: 'At Sea', isSeaDay: true },
      { day: 4, port: 'Kushiro', arrival: '08:00', departure: '17:00' },
      { day: 5, port: 'Muroran', arrival: '08:00', departure: '17:00' },
      { day: 6, port: 'Hakodate', arrival: '08:00', departure: '18:00' },
      { day: 7, port: 'At Sea', isSeaDay: true },
      { day: 8, port: 'Yokohama', arrival: '09:00' }
    ],
    cabinCategories: buildCabinCategories(8),
  },
  {
    id: 'voyage-9',
    slug: 'nichinan-fireworks',
    title: 'Nichinan Fireworks Cruise',
    shortDescription: 'A spectacular fireworks display at sea along the mythological Nichinan coastline.',
    departureDate: '2026-07-30',
    endDate: '2026-08-02',
    duration: { days: 4, nights: 3 },
    departurePort: 'Kobe',
    route: 'Kobe → Aburatsu (Nichinan) → Kobe',
    highlights: [
      'Spectacular fireworks display at sea',
      'Nichinan coastline — home of Japanese mythology',
      'Aoshima shrine and Devil\'s Washboard rock formations',
      'Kobe departure — easy access from Osaka/Kyoto'
    ],
    season: 'summer',
    featured: false,
    imageUrl: '/images/cruises/nichinan-fireworks.jpg',
    itinerary: [
      { day: 1, port: 'Kobe', departure: '17:00' },
      { day: 2, port: 'Aburatsu (Nichinan)', arrival: '08:00', departure: '21:00' },
      { day: 3, port: 'At Sea', isSeaDay: true },
      { day: 4, port: 'Kobe', arrival: '09:00' }
    ],
    cabinCategories: buildCabinCategories(4),
  },
  {
    id: 'voyage-10',
    slug: 'summer-hokkaido-rishiri',
    title: 'Summer Hokkaido Cruise — Rishiri, Rumoi & Otaru',
    shortDescription: 'Discover northern Hokkaido\'s wilderness — the "floating mountain" of Rishiri and Otaru\'s charming canal town.',
    departureDate: '2026-08-08',
    endDate: '2026-08-15',
    duration: { days: 8, nights: 7 },
    departurePort: 'Yokohama',
    route: 'Yokohama → Rishiri → Rumoi → Otaru → Yokohama',
    highlights: [
      'Rishiri Island — the "floating mountain" of the north',
      'Rishiri kelp and sea urchin — Japan\'s finest',
      'Rumoi sunset coast — golden evening views',
      'Otaru canal town — historic port city charm'
    ],
    season: 'summer',
    featured: false,
    imageUrl: '/images/cruises/hokkaido-rishiri.jpg',
    itinerary: [
      { day: 1, port: 'Yokohama', departure: '17:00' },
      { day: 2, port: 'At Sea', isSeaDay: true },
      { day: 3, port: 'At Sea', isSeaDay: true },
      { day: 4, port: 'Rishiri', arrival: '08:00', departure: '17:00' },
      { day: 5, port: 'Rumoi', arrival: '08:00', departure: '17:00' },
      { day: 6, port: 'Otaru', arrival: '08:00', departure: '18:00' },
      { day: 7, port: 'At Sea', isSeaDay: true },
      { day: 8, port: 'Yokohama', arrival: '09:00' }
    ],
    cabinCategories: buildCabinCategories(8),
  },
];

export function getCruiseBySlug(slug: string): Cruise | undefined {
  return cruises.find((c) => c.slug === slug);
}

export function getFeaturedCruises(): Cruise[] {
  return cruises.filter((c) => c.featured);
}

export function getCruisesBySeason(season: string): Cruise[] {
  if (season === 'all') return cruises;
  return cruises.filter((c) => c.season === season);
}
