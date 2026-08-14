import { describe, it, expect } from 'vitest';
import { parseBookingType } from '../../../../lib/utils/bookingType';

describe('parseBookingType', () => {
  it.each([
    'family', 'couples', 'friends', 'corporate', 'hen_party', 'birthday', 'general',
  ])('accepts valid type "%s"', (type) => {
    expect(parseBookingType(type)).toBe(type);
  });

  it('returns general for undefined', () => {
    expect(parseBookingType(undefined)).toBe('general');
  });

  it('returns general for empty string', () => {
    expect(parseBookingType('')).toBe('general');
  });

  it('returns general for an unrecognised value', () => {
    expect(parseBookingType('vip')).toBe('general');
  });

  it('accepts the first element when passed an array', () => {
    expect(parseBookingType(['couples', 'family'])).toBe('couples');
  });

  it('returns general when array contains only invalid values', () => {
    expect(parseBookingType(['unknown'])).toBe('general');
  });
});
