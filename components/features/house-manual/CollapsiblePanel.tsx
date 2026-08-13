'use client';

import { useState } from 'react';
import type { HouseManualSection } from '../../../lib/types/property';

interface CollapsiblePanelProps {
  section: HouseManualSection;
  isOpen: boolean;
  onToggle: () => void;
}

export default function CollapsiblePanel({ section, isOpen, onToggle }: CollapsiblePanelProps) {
  const isEmergency = section.id === 'emergency-contacts';

  return (
    <div className={`rounded-lg overflow-hidden ${isEmergency ? 'border border-amber/30' : 'border border-sand/10'}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
        aria-expanded={isOpen}
        aria-controls={`panel-${section.id}`}
      >
        <span className={`text-sm font-medium ${isEmergency ? 'text-amber-300' : 'text-sand/80'}`}>
          {section.title}
        </span>
        <span
          className="ml-2 shrink-0 text-sand/40 transition-transform duration-250"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          aria-hidden="true"
        >
          ▾
        </span>
      </button>

      <div
        id={`panel-${section.id}`}
        className="overflow-hidden transition-all duration-[250ms] ease-in-out"
        style={{ maxHeight: isOpen ? '600px' : '0px' }}
        aria-hidden={!isOpen}
      >
        <div className="px-4 pb-4 pt-1">
          {isEmergency && (
            <p className="mb-2 text-base font-bold text-amber-300">000 — Emergency Services</p>
          )}
          <p className="text-xs text-sand/60 whitespace-pre-line leading-relaxed">
            {section.content}
          </p>
        </div>
      </div>
    </div>
  );
}
