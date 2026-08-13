import type { BookingType } from '../types/property';

const BOOKING_TYPE_KEY = 'charteris_booking_type';

export function getStoredBookingType(): BookingType | null {
  try {
    const value = window.sessionStorage.getItem(BOOKING_TYPE_KEY);
    return (value as BookingType) ?? null;
  } catch {
    return null;
  }
}

export function setStoredBookingType(type: BookingType): void {
  try {
    window.sessionStorage.setItem(BOOKING_TYPE_KEY, type);
  } catch {
    // iOS Safari private mode: storage unavailable — caller falls back to React state
  }
}

export function clearStoredBookingType(): void {
  try {
    window.sessionStorage.removeItem(BOOKING_TYPE_KEY);
  } catch {
    // noop
  }
}
