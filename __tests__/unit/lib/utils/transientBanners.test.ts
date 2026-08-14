import { describe, it, expect } from 'vitest';
import { getActiveBanner, formatCheckoutTime } from '../../../../lib/utils/transientBanners';
import type { PropertyConfig } from '../../../../lib/types/property';

// January 2024 — Melbourne is AEDT (UTC+11)
// Jan 16 2024 is a Tuesday (day 2 in JS convention)

const binNightConfig: Pick<PropertyConfig, 'binNight' | 'checkoutTime'> = {
  binNight: { day: 2, type: 'general waste and recycling' }, // Tuesday
  checkoutTime: undefined,
};

const checkoutConfig: Pick<PropertyConfig, 'binNight' | 'checkoutTime'> = {
  binNight: undefined,
  checkoutTime: { hour: 10, minute: 0 },
};

const bothConfig: Pick<PropertyConfig, 'binNight' | 'checkoutTime'> = {
  binNight: { day: 2, type: 'general waste and recycling' },
  checkoutTime: { hour: 10, minute: 0 },
};

const emptyConfig: Pick<PropertyConfig, 'binNight' | 'checkoutTime'> = {
  binNight: undefined,
  checkoutTime: undefined,
};

describe('getActiveBanner', () => {
  describe('bin night', () => {
    it('returns bin night banner at 17:00 on Tuesday (lower bound inclusive)', () => {
      // 2024-01-16 17:00 AEDT = 2024-01-16T06:00:00Z
      const result = getActiveBanner(binNightConfig, new Date('2024-01-16T06:00:00Z'));
      expect(result?.type).toBe('bin_night');
      expect(result?.message).toBe('Bin night tonight');
      expect(result?.detail).toBe('general waste and recycling');
    });

    it('returns bin night banner at 22:00 on Tuesday (upper bound inclusive)', () => {
      // 2024-01-16 22:00 AEDT = 2024-01-16T11:00:00Z
      const result = getActiveBanner(binNightConfig, new Date('2024-01-16T11:00:00Z'));
      expect(result?.type).toBe('bin_night');
    });

    it('returns null at 16:59 on Tuesday (before window)', () => {
      // 2024-01-16 16:59 AEDT = 2024-01-16T05:59:00Z
      const result = getActiveBanner(binNightConfig, new Date('2024-01-16T05:59:00Z'));
      expect(result).toBeNull();
    });

    it('returns null on Wednesday at 18:00 (wrong day)', () => {
      // 2024-01-17 18:00 AEDT = 2024-01-17T07:00:00Z
      const result = getActiveBanner(binNightConfig, new Date('2024-01-17T07:00:00Z'));
      expect(result).toBeNull();
    });
  });

  describe('checkout', () => {
    it('returns checkout banner at 07:00 (lower bound inclusive)', () => {
      // 2024-01-16 07:00 AEDT = 2024-01-15T20:00:00Z
      const result = getActiveBanner(checkoutConfig, new Date('2024-01-15T20:00:00Z'));
      expect(result?.type).toBe('checkout');
      expect(result?.message).toBe('Check-out today');
      expect(result?.detail).toBe('10:00 AM');
    });

    it('returns checkout banner at 09:00 (upper bound inclusive, checkoutTime=10:00)', () => {
      // 2024-01-16 09:00 AEDT = 2024-01-15T22:00:00Z
      const result = getActiveBanner(checkoutConfig, new Date('2024-01-15T22:00:00Z'));
      expect(result?.type).toBe('checkout');
    });

    it('returns null at 06:59 (before window)', () => {
      // 2024-01-16 06:59 AEDT = 2024-01-15T19:59:00Z
      const result = getActiveBanner(checkoutConfig, new Date('2024-01-15T19:59:00Z'));
      expect(result).toBeNull();
    });

    it('returns null at 10:00 (at checkoutTime, past window)', () => {
      // 2024-01-16 10:00 AEDT = 2024-01-15T23:00:00Z
      const result = getActiveBanner(checkoutConfig, new Date('2024-01-15T23:00:00Z'));
      expect(result).toBeNull();
    });
  });

  describe('priority', () => {
    it('returns checkout when both checkout and bin night conditions are met', () => {
      // Tuesday 07:00 AEDT — both windows active
      const result = getActiveBanner(bothConfig, new Date('2024-01-15T20:00:00Z'));
      expect(result?.type).toBe('checkout');
    });
  });

  describe('no config', () => {
    it('returns null when neither binNight nor checkoutTime is configured', () => {
      const result = getActiveBanner(emptyConfig, new Date('2024-01-16T06:00:00Z'));
      expect(result).toBeNull();
    });

    it('returns null when conditions are not met at 14:00 Wednesday', () => {
      // 2024-01-17 14:00 AEDT = 2024-01-17T03:00:00Z
      const result = getActiveBanner(bothConfig, new Date('2024-01-17T03:00:00Z'));
      expect(result).toBeNull();
    });
  });

  describe('dismissKey', () => {
    it('sets correct dismissKey for bin night banner', () => {
      const result = getActiveBanner(binNightConfig, new Date('2024-01-16T06:00:00Z'));
      expect(result?.dismissKey).toBe('banner_dismissed_bin_night');
    });

    it('sets correct dismissKey for checkout banner', () => {
      const result = getActiveBanner(checkoutConfig, new Date('2024-01-15T20:00:00Z'));
      expect(result?.dismissKey).toBe('banner_dismissed_checkout');
    });
  });
});

describe('formatCheckoutTime', () => {
  it('formats 10:00 as "10:00 AM"', () => {
    expect(formatCheckoutTime(10, 0)).toBe('10:00 AM');
  });

  it('formats 14:30 as "2:30 PM"', () => {
    expect(formatCheckoutTime(14, 30)).toBe('2:30 PM');
  });

  it('formats 12:00 as "12:00 PM"', () => {
    expect(formatCheckoutTime(12, 0)).toBe('12:00 PM');
  });

  it('formats 0:00 as "12:00 AM"', () => {
    expect(formatCheckoutTime(0, 0)).toBe('12:00 AM');
  });

  it('pads single-digit minutes', () => {
    expect(formatCheckoutTime(9, 5)).toBe('9:05 AM');
  });
});
