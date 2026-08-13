import { notFound } from 'next/navigation';
import { getPropertyConfig } from '../../../lib/config/demo-property';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import QuietHoursBanner from '../../../components/features/quiet-hours/QuietHoursBanner';
import GuestSessionProvider from '../../../components/features/onboarding/GuestSessionProvider';
import ExperienceGrid from '../../../components/features/experiences/ExperienceGrid';
import HouseManual from '../../../components/features/house-manual/HouseManual';

interface PageProps {
  params: { slug: string };
}

export default function StayPage({ params }: PageProps) {
  const config = getPropertyConfig(params.slug);

  if (!config) notFound();

  return (
    <div className="min-h-screen bg-navy">
      <Header propertyName={config.branding.propertyName} />

      <GuestSessionProvider>
        {(bookingType) => (
          <main className="mx-auto max-w-[960px] px-4 py-6 space-y-6">
            <QuietHoursBanner config={config.quietHours} />
            {/* CHR-07: ConciergeSearch */}
            <ExperienceGrid
              experiences={config.experiences}
              bookingType={bookingType}
            />
            <HouseManual sections={config.houseManual} />
          </main>
        )}
      </GuestSessionProvider>

      <Footer />
    </div>
  );
}
