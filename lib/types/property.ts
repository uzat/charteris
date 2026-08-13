export type BookingType =
  | 'family'
  | 'couples'
  | 'friends'
  | 'corporate'
  | 'hen_party'
  | 'birthday'
  | 'general';

export type PropertyTier = 'luxury' | 'premium' | 'standard';

export type AvailabilityState =
  | 'available'
  | 'limited'
  | 'booked_out'
  | 'seasonal'
  | 'on_request'
  | 'check_availability';

export interface Experience {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  priceFrom: number;
  currency: string;
  availability: AvailabilityState;
  suitableFor: BookingType[] | 'all';
  restrictions: BookingType[];
  minNoticeHours?: number;
  minPartySize?: number;
  maxPartySize?: number;
  operatingDays?: number[];
  bookingUrl?: string;
  operator?: string;
}

export interface HouseManualSection {
  id: string;
  title: string;
  icon?: string;
  content: string;
}

export interface QuietHoursConfig {
  startHour: number;
  endHour: number;
  timezone: string;
  message: string;
}

export interface PropertyBranding {
  propertyName: string;
  agencyName?: string;
  accentColor?: string;
  attribution: 'charteris' | 'co-branded' | 'white-label';
}

export interface PropertyConfig {
  slug: string;
  tier: PropertyTier;
  branding: PropertyBranding;
  quietHours: QuietHoursConfig;
  experiences: Experience[];
  houseManual: HouseManualSection[];
  hostName: string;
  hostPhone: string;
}
