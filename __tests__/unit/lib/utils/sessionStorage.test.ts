import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getStoredBookingType,
  setStoredBookingType,
  clearStoredBookingType,
} from '../../../../lib/utils/sessionStorage';

describe('sessionStorage utils', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('returns null when nothing is stored', () => {
    expect(getStoredBookingType()).toBeNull();
  });

  it('stores and retrieves a booking type', () => {
    setStoredBookingType('family');
    expect(getStoredBookingType()).toBe('family');
  });

  it('clears a stored booking type', () => {
    setStoredBookingType('couples');
    clearStoredBookingType();
    expect(getStoredBookingType()).toBeNull();
  });

  it('overwrites an existing booking type', () => {
    setStoredBookingType('family');
    setStoredBookingType('corporate');
    expect(getStoredBookingType()).toBe('corporate');
  });

  it('returns null when getItem throws', () => {
    const spy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('Storage unavailable');
    });
    expect(getStoredBookingType()).toBeNull();
    spy.mockRestore();
  });

  it('does not throw when setItem throws', () => {
    const spy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Storage unavailable');
    });
    expect(() => setStoredBookingType('family')).not.toThrow();
    spy.mockRestore();
  });
});
