export interface PortOfCall {
  day: number;
  port: string;
  arrival?: string;
  departure?: string;
  isSeaDay?: boolean;
}

export type AvailabilityStatus = 'available' | 'waitlist' | 'sold_out';

export interface AvailabilityData {
  lastUpdated: string;
  cruises: Record<string, Record<string, AvailabilityStatus>>;
}

export interface CabinCategory {
  class: 'penthouse' | 'suite' | 'balcony';
  classLabel: string;
  name: string;
  slug: string;
  priceFrom?: number;
  clubPrice?: number;
  singleOnly?: boolean;
  status?: AvailabilityStatus;
}

export interface Cruise {
  id: string;
  slug: string;
  asukaCruiseId: number;
  title: string;
  shortDescription: string;
  departureDate: string;
  endDate: string;
  duration: {
    days: number;
    nights: number;
  };
  departurePort: string;
  route: string;
  highlights: string[];
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  featured: boolean;
  imageUrl: string;
  routeMapUrl?: string;
  itinerary: PortOfCall[];
  cabinCategories: CabinCategory[];
}

export interface ShipSpec {
  label: string;
  value: string;
}

export interface CabinType {
  name: string;
  slug: string;
  class: 'penthouse' | 'suite' | 'balcony';
  description: string;
  size: string;
  sizeNum: number;
  imageUrl: string;
  roomCount: number;
  deck: string;
  maxOccupancy: number;
  features: string[];
}

export interface Restaurant {
  name: string;
  cuisine: string;
  description: string;
}
