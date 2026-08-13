import { notFound } from 'next/navigation';
import { getPropertyConfig } from '../../../lib/config/demo-property';

interface PageProps {
  params: { slug: string };
}

export default function StayPage({ params }: PageProps) {
  const config = getPropertyConfig(params.slug);

  if (!config) notFound();

  return (
    <div className="min-h-screen bg-navy">
      <header className="sticky top-0 z-50 bg-navy border-b border-sand/10">
        <div className="mx-auto max-w-[960px] px-4 py-4 flex items-center justify-between">
          <span className="font-sans font-bold text-sm tracking-widest text-sand/80 uppercase">
            Charteris
          </span>
          <span className="text-xs text-sand/50">{config.branding.propertyName}</span>
        </div>
      </header>

      <main className="mx-auto max-w-[960px] px-4 py-6 space-y-8">
        {/* Feature components arrive in PR-2 */}
        <p className="text-sand/60 text-sm text-center py-20">
          {config.branding.propertyName} — Sprint 1 guest experience loading…
        </p>
      </main>

      <footer className="py-6 text-center">
        <span className="text-xs text-sand/40">Powered by Charteris</span>
      </footer>
    </div>
  );
}
