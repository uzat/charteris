'use client';

import type { Experience } from '../../../lib/types/property';

const AVAILABILITY_CONFIG = {
  available: {
    badge: null,
    cta: 'Book Now',
    cardOpacity: '',
    ctaStyle: { backgroundColor: '#C9A96E', color: '#1B2A3B' },
  },
  limited: {
    badge: { label: 'Limited Availability', style: { backgroundColor: '#F59E0B', color: '#1B2A3B' } },
    cta: 'Book Now',
    cardOpacity: '',
    ctaStyle: { backgroundColor: '#C9A96E', color: '#1B2A3B' },
  },
  on_request: {
    badge: { label: 'On Request', style: { backgroundColor: '#1B2A3B', color: '#C9A96E', border: '1px solid #C9A96E' } },
    cta: 'Request to Book',
    cardOpacity: '',
    ctaStyle: { backgroundColor: 'transparent', color: '#C9A96E', border: '1px solid #C9A96E' },
  },
  check_availability: {
    badge: null,
    cta: 'Check Availability',
    cardOpacity: '',
    ctaStyle: { backgroundColor: 'transparent', color: '#E8DCC8', border: '1px solid rgba(232,220,200,0.3)' },
  },
  booked_out: {
    badge: { label: 'Fully Booked', style: { backgroundColor: 'rgba(232,220,200,0.15)', color: 'rgba(232,220,200,0.5)' } },
    cta: 'Fully Booked',
    cardOpacity: 'opacity-60',
    ctaStyle: { backgroundColor: 'transparent', color: 'rgba(232,220,200,0.4)', border: '1px solid rgba(232,220,200,0.2)', cursor: 'not-allowed' },
  },
  seasonal: {
    badge: { label: 'Seasonal', style: { backgroundColor: 'rgba(232,220,200,0.15)', color: 'rgba(232,220,200,0.6)' } },
    cta: 'Check Dates',
    cardOpacity: '',
    ctaStyle: { backgroundColor: 'transparent', color: '#E8DCC8', border: '1px solid rgba(232,220,200,0.3)' },
  },
} as const;

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  const av = AVAILABILITY_CONFIG[experience.availability];
  const isBookedOut = experience.availability === 'booked_out';

  function handleCta(e: React.MouseEvent) {
    e.preventDefault();
    if (isBookedOut) return;
    console.warn(`[Charteris] Booking CTA clicked for experience: ${experience.id}`);
  }

  return (
    <div className={`rounded-xl overflow-hidden bg-navy-dark ${av.cardOpacity}`}>
      <div className="relative aspect-[16/9] bg-sand/10">
        {av.badge && (
          <span
            className="absolute top-2 left-2 rounded px-2 py-0.5 text-xs font-semibold"
            style={av.badge.style}
          >
            {av.badge.label}
          </span>
        )}
        {experience.minNoticeHours && (
          <span className="absolute top-2 right-2 rounded bg-navy/80 px-2 py-0.5 text-xs text-sand/70">
            {experience.minNoticeHours}hr notice
          </span>
        )}
        <div className="absolute inset-0 flex items-center justify-center text-sand/20 text-sm">
          {experience.category}
        </div>
      </div>

      <div className="p-4">
        <p className="text-xs text-gold uppercase tracking-wider mb-1">{experience.category}</p>
        <h3 className="text-sm font-semibold text-sand leading-snug mb-1">{experience.title}</h3>
        <p className="text-xs text-sand/50 leading-relaxed mb-3 line-clamp-2">{experience.description}</p>

        <div className="flex items-center justify-between gap-2">
          <span className="text-xs text-sand/60">
            From{' '}
            <span className="text-sand font-semibold">
              ${experience.priceFrom} {experience.currency}
            </span>
          </span>

          <a
            href={experience.bookingUrl ?? '#'}
            onClick={handleCta}
            className="shrink-0 rounded px-3 py-1.5 text-xs font-semibold transition-opacity"
            style={av.ctaStyle}
            aria-disabled={isBookedOut}
            tabIndex={isBookedOut ? -1 : 0}
          >
            {av.cta}
          </a>
        </div>
      </div>
    </div>
  );
}
