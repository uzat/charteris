import { describe, it, expect } from 'vitest';
import { getQuietHoursStatus } from '../../../../lib/utils/quietHours';
import type { QuietHoursConfig } from '../../../../lib/types/property';

const config: QuietHoursConfig = {
  startHour: 22,
  endHour: 8,
  timezone: 'Australia/Melbourne',
  message: 'Quiet hours in effect.',
};

describe('getQuietHoursStatus', () => {
  it('returns active during quiet hours at midnight', () => {
    // 2024-01-15 00:00 AEDT = 2024-01-14 13:00 UTC
    const date = new Date('2024-01-14T13:00:00Z');
    expect(getQuietHoursStatus(config, date).state).toBe('active');
  });

  it('returns active at 10pm exactly', () => {
    // 2024-01-15 22:00 AEDT = 2024-01-15 11:00 UTC
    const date = new Date('2024-01-15T11:00:00Z');
    expect(getQuietHoursStatus(config, date).state).toBe('active');
  });

  it('returns inactive at midday', () => {
    // 2024-01-15 12:00 AEDT = 2024-01-15 01:00 UTC
    const date = new Date('2024-01-15T01:00:00Z');
    expect(getQuietHoursStatus(config, date).state).toBe('inactive');
  });

  it('returns upcoming when 30 minutes before start', () => {
    // 2024-01-15 21:30 AEDT = 2024-01-15 10:30 UTC
    const date = new Date('2024-01-15T10:30:00Z');
    const result = getQuietHoursStatus(config, date);
    expect(result.state).toBe('upcoming');
    if (result.state === 'upcoming') {
      expect(result.minutesUntilStart).toBe(30);
    }
  });

  it('returns inactive when 90 minutes before start', () => {
    // 2024-01-15 20:30 AEDT = 2024-01-15 09:30 UTC
    const date = new Date('2024-01-15T09:30:00Z');
    expect(getQuietHoursStatus(config, date).state).toBe('inactive');
  });

  it('returns inactive just after quiet hours end at 8am', () => {
    // 2024-01-15 08:01 AEDT = 2024-01-14 21:01 UTC
    const date = new Date('2024-01-14T21:01:00Z');
    expect(getQuietHoursStatus(config, date).state).toBe('inactive');
  });

  it('active status carries the config message', () => {
    const date = new Date('2024-01-15T11:00:00Z');
    const result = getQuietHoursStatus(config, date);
    if (result.state === 'active') {
      expect(result.message).toBe(config.message);
    }
  });
});
