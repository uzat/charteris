import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockSingle = vi.fn();
const mockOrder = vi.fn();
const mockEqExp = vi.fn(() => ({ order: mockOrder }));
const mockEqSec = vi.fn(() => ({ order: mockOrder }));
const mockSelectExp = vi.fn(() => ({ eq: mockEqExp }));
const mockSelectSec = vi.fn(() => ({ eq: mockEqSec }));
const mockEqProp = vi.fn(() => ({ single: mockSingle }));
const mockSelectProp = vi.fn(() => ({ eq: mockEqProp }));

const mockFrom = vi.fn((table: string) => {
  if (table === 'properties') return { select: mockSelectProp };
  if (table === 'experiences') return { select: mockSelectExp };
  return { select: mockSelectSec };
});

vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({ from: mockFrom })),
}));

const PROPERTY_ROW = {
  id: 'prop-uuid-1',
  slug: 'sorrento-ridge',
  name: 'Sorrento Ridge Estate',
  host_name: 'Sarah Collins',
  host_phone: '0412 345 678',
  agency_name: 'Jellis Craig ShortStays',
  accent_color: null,
  tier: 'luxury',
  quiet_hours_start_hour: 22,
  quiet_hours_end_hour: 8,
  quiet_hours_timezone: 'Australia/Melbourne',
  quiet_hours_message: 'Keep it down after 10pm.',
  checkout_time: { hour: 10, minute: 0 },
  bin_night: { day: 2, type: 'general waste' },
};

const EXPERIENCE_ROW = {
  id: 'exp-uuid-1',
  property_id: 'prop-uuid-1',
  title: 'Helicopter Tour',
  description: 'Great views.',
  image_url: '/img/heli.jpg',
  category: 'Adventure',
  suitable_for: [],
  restrictions: [],
  availability: 'available',
  price_from: 395,
  currency: 'AUD',
  booking_url: null,
  operator: 'Peninsula Air',
  min_notice_hours: null,
  min_party_size: 1,
  max_party_size: 4,
  operating_days: null,
  display_order: 0,
};

const SECTION_ROW = {
  id: 'sec-uuid-1',
  property_id: 'prop-uuid-1',
  title: 'Wi-Fi',
  content: 'Network: Test\nPassword: test123',
  icon: 'wifi',
  display_order: 0,
};

describe('getPropertyConfig', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
    process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-service-key';
    mockOrder.mockResolvedValue({ data: [] });
  });

  it('returns null when property slug is not found', async () => {
    mockSingle.mockResolvedValue({ data: null });
    const { getPropertyConfig } = await import('../../../../lib/data/getPropertyConfig');
    const result = await getPropertyConfig('nonexistent');
    expect(result).toBeNull();
  });

  it('returns a PropertyConfig for a known slug', async () => {
    mockSingle.mockResolvedValue({ data: PROPERTY_ROW });
    mockOrder.mockResolvedValue({ data: [EXPERIENCE_ROW] });

    const { getPropertyConfig } = await import('../../../../lib/data/getPropertyConfig');
    const result = await getPropertyConfig('sorrento-ridge');

    expect(result).not.toBeNull();
    expect(result?.slug).toBe('sorrento-ridge');
    expect(result?.branding.propertyName).toBe('Sorrento Ridge Estate');
    expect(result?.quietHours.startHour).toBe(22);
    expect(result?.quietHours.endHour).toBe(8);
    expect(result?.hostName).toBe('Sarah Collins');
  });

  it('maps suitable_for [] to "all"', async () => {
    mockSingle.mockResolvedValue({ data: PROPERTY_ROW });
    mockOrder.mockResolvedValueOnce({ data: [EXPERIENCE_ROW] }).mockResolvedValueOnce({ data: [] });

    const { getPropertyConfig } = await import('../../../../lib/data/getPropertyConfig');
    const result = await getPropertyConfig('sorrento-ridge');

    expect(result?.experiences[0].suitableFor).toBe('all');
  });

  it('maps non-empty suitable_for array through unchanged', async () => {
    const rowWithSuitableFor = { ...EXPERIENCE_ROW, suitable_for: ['family', 'couples'] };
    mockSingle.mockResolvedValue({ data: PROPERTY_ROW });
    mockOrder.mockResolvedValueOnce({ data: [rowWithSuitableFor] }).mockResolvedValueOnce({ data: [] });

    const { getPropertyConfig } = await import('../../../../lib/data/getPropertyConfig');
    const result = await getPropertyConfig('sorrento-ridge');

    expect(result?.experiences[0].suitableFor).toEqual(['family', 'couples']);
  });

  it('returns empty experiences and houseManual arrays when tables are empty', async () => {
    mockSingle.mockResolvedValue({ data: PROPERTY_ROW });
    mockOrder.mockResolvedValue({ data: [] });

    const { getPropertyConfig } = await import('../../../../lib/data/getPropertyConfig');
    const result = await getPropertyConfig('sorrento-ridge');

    expect(result?.experiences).toEqual([]);
    expect(result?.houseManual).toEqual([]);
  });

  it('maps house_manual_sections rows to HouseManualSection', async () => {
    mockSingle.mockResolvedValue({ data: PROPERTY_ROW });
    mockOrder
      .mockResolvedValueOnce({ data: [] })
      .mockResolvedValueOnce({ data: [SECTION_ROW] });

    const { getPropertyConfig } = await import('../../../../lib/data/getPropertyConfig');
    const result = await getPropertyConfig('sorrento-ridge');

    expect(result?.houseManual[0]).toEqual({
      id: 'sec-uuid-1',
      title: 'Wi-Fi',
      content: 'Network: Test\nPassword: test123',
      icon: 'wifi',
    });
  });

  it('maps checkoutTime and binNight from property row', async () => {
    mockSingle.mockResolvedValue({ data: PROPERTY_ROW });
    mockOrder.mockResolvedValue({ data: [] });

    const { getPropertyConfig } = await import('../../../../lib/data/getPropertyConfig');
    const result = await getPropertyConfig('sorrento-ridge');

    expect(result?.checkoutTime).toEqual({ hour: 10, minute: 0 });
    expect(result?.binNight).toEqual({ day: 2, type: 'general waste' });
  });

  it('throws when SUPABASE_SERVICE_ROLE_KEY is missing', async () => {
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    vi.resetModules();
    const mod = await import('../../../../lib/data/getPropertyConfig');
    await expect(mod.getPropertyConfig('sorrento-ridge')).rejects.toThrow(
      /SUPABASE_SERVICE_ROLE_KEY/
    );
  });
});
