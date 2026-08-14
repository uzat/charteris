import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import GuestPageContent from '../../components/features/GuestPageContent';
import type { PropertyConfig } from '../../lib/types/property';

const config: PropertyConfig = {
  slug: 'test-property',
  tier: 'luxury',
  branding: { propertyName: 'Test Estate', attribution: 'charteris' },
  quietHours: { startHour: 22, endHour: 8, timezone: 'Australia/Melbourne', message: 'Quiet please.' },
  experiences: [
    {
      id: 'exp-1',
      title: 'Couples Retreat',
      description: 'Romantic getaway.',
      imageUrl: '',
      category: 'Wellness',
      priceFrom: 300,
      currency: 'AUD',
      availability: 'available',
      suitableFor: ['couples'],
      restrictions: [],
    },
    {
      id: 'exp-2',
      title: 'Family Adventure',
      description: 'Kids welcome.',
      imageUrl: '',
      category: 'Adventure',
      priceFrom: 150,
      currency: 'AUD',
      availability: 'available',
      suitableFor: ['family'],
      restrictions: [],
    },
  ],
  houseManual: [{ id: 'wifi', title: 'Wi-Fi', content: 'Password: abc' }],
  hostName: 'Jane',
  hostPhone: '0400000000',
};

describe('GuestPageContent', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-01-15T01:00:00Z')); // midday Melbourne — quiet hours inactive
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders immediately without any overlay or loading state', () => {
    render(<GuestPageContent config={config} bookingType="couples" />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('shows only experiences suitable for the booking type', () => {
    render(<GuestPageContent config={config} bookingType="couples" />);
    expect(screen.getByText('Couples Retreat')).toBeInTheDocument();
    expect(screen.queryByText('Family Adventure')).not.toBeInTheDocument();
  });

  it('shows different experiences for a different booking type', () => {
    render(<GuestPageContent config={config} bookingType="family" />);
    expect(screen.getByText('Family Adventure')).toBeInTheDocument();
    expect(screen.queryByText('Couples Retreat')).not.toBeInTheDocument();
  });

  it('renders the concierge section', () => {
    render(<GuestPageContent config={config} bookingType="general" />);
    expect(screen.getByRole('region', { name: /concierge/i })).toBeInTheDocument();
  });

  it('renders the house manual', () => {
    render(<GuestPageContent config={config} bookingType="general" />);
    expect(screen.getByText(/house manual/i)).toBeInTheDocument();
    expect(screen.getByText('Wi-Fi')).toBeInTheDocument();
  });

  it('caches the booking type to sessionStorage on mount', () => {
    const setItem = vi.spyOn(Storage.prototype, 'setItem');
    render(<GuestPageContent config={config} bookingType="corporate" />);
    expect(setItem).toHaveBeenCalledWith('charteris_booking_type', 'corporate');
    setItem.mockRestore();
  });
});
