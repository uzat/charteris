'use client';

import type { BookingType, Experience } from '../../../lib/types/property';
import { filterExperiences } from '../../../lib/utils/experienceFilter';
import ExperienceCard from './ExperienceCard';

interface ExperienceGridProps {
  experiences: Experience[];
  bookingType: BookingType;
}

export default function ExperienceGrid({ experiences, bookingType }: ExperienceGridProps) {
  const filtered = filterExperiences(experiences, bookingType);

  if (filtered.length === 0) {
    return (
      <section>
        <h2 className="text-base font-bold text-sand mb-4">
          Curated Local Experiences
        </h2>
        <p className="text-sm text-sand/50 text-center py-8">
          No experiences available for your group type right now.
        </p>
      </section>
    );
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-sand">Curated Local Experiences</h2>
        <span className="text-xs text-gold">{filtered.length} available</span>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {filtered.map((exp) => (
          <ExperienceCard key={exp.id} experience={exp} />
        ))}
      </div>
    </section>
  );
}
