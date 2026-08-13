'use client';
import { useState } from 'react';
import type { HouseManualSection } from '../../../lib/types/property';
import CollapsiblePanel from './CollapsiblePanel';

interface HouseManualProps {
  sections: HouseManualSection[];
}

export default function HouseManual({ sections }: HouseManualProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <section aria-label="House Manual">
      <h2 className="mb-3 text-base font-semibold text-sand/70 uppercase tracking-widest">
        House Manual
      </h2>
      <div className="space-y-2">
        {sections.map(section => (
          <CollapsiblePanel
            key={section.id}
            section={section}
            isOpen={openId === section.id}
            onToggle={() => handleToggle(section.id)}
          />
        ))}
      </div>
    </section>
  );
}
