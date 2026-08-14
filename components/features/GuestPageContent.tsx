'use client';
import { useEffect } from 'react';
import type { BookingType, PropertyConfig } from '../../lib/types/property';
import { setStoredBookingType } from '../../lib/utils/sessionStorage';
import QuietHoursBanner from './quiet-hours/QuietHoursBanner';
import ConciergeSearch from './concierge/ConciergeSearch';
import ExperienceGrid from './experiences/ExperienceGrid';
import HouseManual from './house-manual/HouseManual';

interface GuestPageContentProps {
  config: PropertyConfig;
  bookingType: BookingType;
}

export default function GuestPageContent({ config, bookingType }: GuestPageContentProps) {
  useEffect(() => {
    setStoredBookingType(bookingType);
  }, [bookingType]);

  return (
    <main className="mx-auto max-w-[960px] px-4 py-6 space-y-6">
      <QuietHoursBanner config={config.quietHours} />
      <ConciergeSearch
        bookingType={bookingType}
        propertyName={config.branding.propertyName}
      />
      <ExperienceGrid
        experiences={config.experiences}
        bookingType={bookingType}
      />
      <HouseManual sections={config.houseManual} />
    </main>
  );
}
