import { notFound } from 'next/navigation';
import { getPropertyConfig } from '../../../lib/config/demo-property';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';

interface PageProps {
  params: { slug: string };
}

export default function StayPage({ params }: PageProps) {
  const config = getPropertyConfig(params.slug);

  if (!config) notFound();

  return (
    <div className="min-h-screen bg-navy">
      <Header propertyName={config.branding.propertyName} />

      <main className="mx-auto max-w-[960px] px-4 py-6 space-y-6">
        {/* CHR-03: QuietHoursBanner */}
        {/* CHR-07: ConciergeSearch */}
        {/* CHR-05: ExperienceGrid */}
        {/* CHR-06: HouseManual */}
      </main>

      <Footer />
    </div>
  );
}
