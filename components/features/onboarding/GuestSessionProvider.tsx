'use client';

import { useState, useEffect } from 'react';
import type { BookingType } from '../../../lib/types/property';
import { getStoredBookingType } from '../../../lib/utils/sessionStorage';
import OnboardingOverlay from './OnboardingOverlay';

interface GuestSessionProviderProps {
  children: (bookingType: BookingType) => React.ReactNode;
}

export default function GuestSessionProvider({ children }: GuestSessionProviderProps) {
  const [bookingType, setBookingType] = useState<BookingType | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = getStoredBookingType();
    if (stored) setBookingType(stored);
    setReady(true);
  }, []);

  if (!ready) return null;

  if (!bookingType) {
    return <OnboardingOverlay onComplete={setBookingType} />;
  }

  return <>{children(bookingType)}</>;
}
