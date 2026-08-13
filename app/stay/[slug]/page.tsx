import { notFound } from 'next/navigation';
import { getPropertyConfig } from '../../../lib/config/demo-property';
import { parseBookingType } from '../../../lib/utils/bookingType';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import GuestPageContent from '../../../components/features/GuestPageContent';

interface PageProps {
  params: { slug: string };
  searchParams: { group?: string | string[] };
}

export default function StayPage({ params, searchParams }: PageProps) {
  const config = getPropertyConfig(params.slug);
  if (!config) notFound();

  const bookingType = parseBookingType(searchParams.group);

  return (
    <div className="min-h-screen bg-navy">
      <Header propertyName={config.branding.propertyName} />
      <GuestPageContent config={config} bookingType={bookingType} />
      <Footer />
    </div>
  );
}
