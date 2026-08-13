'use client';
import type { PropertyConfig } from '../../lib/types/property';
import GuestSessionProvider from './onboarding/GuestSessionProvider';
import QuietHoursBanner from './quiet-hours/QuietHoursBanner';
import ConciergeSearch from './concierge/ConciergeSearch';
import ExperienceGrid from './experiences/ExperienceGrid';
import HouseManual from './house-manual/HouseManual';

interface GuestPageContentProps {
  config: PropertyConfig;
}

export default function GuestPageContent({ config }: GuestPageContentProps) {
  return (
    <GuestSessionProvider>
      {(bookingType) => (
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
      )}
    </GuestSessionProvider>
  );
}
