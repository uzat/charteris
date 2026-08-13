import { notFound } from 'next/navigation';
import { getPropertyConfig } from '../../../lib/config/demo-property';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import GuestPageContent from '../../../components/features/GuestPageContent';

interface PageProps {
  params: { slug: string };
}

export default function StayPage({ params }: PageProps) {
  const config = getPropertyConfig(params.slug);

  if (!config) notFound();

  return (
    <div className="min-h-screen bg-navy">
      <Header propertyName={config.branding.propertyName} />
      <GuestPageContent config={config} />
      <Footer />
    </div>
  );
}
