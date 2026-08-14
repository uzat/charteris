import type { PropertyConfig, Experience, HouseManualSection } from '../types/property';
import { createServiceClient } from '../supabase/server';

export async function getPropertyConfig(slug: string): Promise<PropertyConfig | null> {
  const supabase = createServiceClient();

  const { data: property } = await supabase
    .from('properties')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!property) return null;

  const [{ data: experiences }, { data: sections }] = await Promise.all([
    supabase.from('experiences').select('*').eq('property_id', property.id).order('display_order'),
    supabase.from('house_manual_sections').select('*').eq('property_id', property.id).order('display_order'),
  ]);

  return mapToPropertyConfig(property, experiences ?? [], sections ?? []);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapToPropertyConfig(p: any, exps: any[], secs: any[]): PropertyConfig {
  return {
    slug: p.slug,
    tier: p.tier,
    branding: {
      propertyName: p.name,
      agencyName: p.agency_name ?? undefined,
      accentColor: p.accent_color ?? undefined,
      attribution: 'co-branded',
    },
    quietHours: {
      startHour: p.quiet_hours_start_hour,
      endHour: p.quiet_hours_end_hour,
      timezone: p.quiet_hours_timezone,
      message: p.quiet_hours_message ?? '',
    },
    hostName: p.host_name ?? '',
    hostPhone: p.host_phone ?? '',
    checkoutTime: p.checkout_time ?? undefined,
    binNight: p.bin_night ?? undefined,
    experiences: exps.map(mapExperience),
    houseManual: secs.map(mapSection),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapExperience(e: any): Experience {
  return {
    id: e.id,
    title: e.title,
    description: e.description ?? '',
    imageUrl: e.image_url ?? '',
    category: e.category,
    suitableFor: e.suitable_for.length === 0 ? 'all' : e.suitable_for,
    restrictions: e.restrictions ?? [],
    availability: e.availability,
    priceFrom: e.price_from ?? 0,
    currency: e.currency ?? 'AUD',
    bookingUrl: e.booking_url ?? undefined,
    operator: e.operator ?? undefined,
    minNoticeHours: e.min_notice_hours ?? undefined,
    minPartySize: e.min_party_size ?? undefined,
    maxPartySize: e.max_party_size ?? undefined,
    operatingDays: e.operating_days ?? undefined,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapSection(s: any): HouseManualSection {
  return {
    id: s.id,
    title: s.title,
    content: s.content,
    icon: s.icon ?? undefined,
  };
}
