'use client';

import { useState, useEffect } from 'react';
import type { BookingType } from '../../../lib/types/property';
import {
  getStoredBookingType,
  setStoredBookingType,
} from '../../../lib/utils/sessionStorage';

const BOOKING_OPTIONS: { type: BookingType; label: string; emoji: string }[] = [
  { type: 'family', label: 'Family', emoji: '👨‍👩‍👧‍👦' },
  { type: 'couples', label: 'Couples', emoji: '💑' },
  { type: 'friends', label: 'Friends', emoji: '🥂' },
  { type: 'corporate', label: 'Corporate', emoji: '💼' },
  { type: 'hen_party', label: "Hen's Party", emoji: '🎉' },
  { type: 'birthday', label: 'Birthday', emoji: '🎂' },
];

interface OnboardingOverlayProps {
  onComplete: (type: BookingType) => void;
}

export default function OnboardingOverlay({ onComplete }: OnboardingOverlayProps) {
  const [selected, setSelected] = useState<BookingType | null>(null);

  function handleSelect(type: BookingType) {
    setSelected(type);
  }

  function handleConfirm() {
    const type = selected ?? 'general';
    setStoredBookingType(type);
    onComplete(type);
  }

  function handleSkip() {
    setStoredBookingType('general');
    onComplete('general');
  }

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-navy px-6"
      role="dialog"
      aria-modal="true"
      aria-label="Welcome — tell us about your stay"
    >
      <div className="w-full max-w-md">
        <h1 className="mb-2 text-center text-2xl font-bold text-sand">
          Welcome
        </h1>
        <p className="mb-8 text-center text-sm text-sand/60">
          What brings you here? We&apos;ll tailor your experience.
        </p>

        <div className="grid grid-cols-2 gap-3">
          {BOOKING_OPTIONS.map(({ type, label, emoji }) => {
            const isSelected = selected === type;
            return (
              <button
                key={type}
                onClick={() => handleSelect(type)}
                className="flex min-h-[56px] items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors"
                style={{
                  borderColor: '#C9A96E',
                  backgroundColor: isSelected ? '#C9A96E' : 'transparent',
                  color: isSelected ? '#1B2A3B' : '#E8DCC8',
                }}
                aria-pressed={isSelected}
              >
                <span className="text-xl">{emoji}</span>
                {label}
              </button>
            );
          })}
        </div>

        <button
          onClick={handleConfirm}
          disabled={!selected}
          className="mt-6 w-full rounded-lg py-3 text-sm font-bold uppercase tracking-wider transition-opacity disabled:opacity-40"
          style={{ backgroundColor: '#C9A96E', color: '#1B2A3B' }}
        >
          Continue
        </button>

        <button
          onClick={handleSkip}
          className="mt-3 w-full py-2 text-xs text-sand/40 hover:text-sand/60"
        >
          Skip
        </button>
      </div>
    </div>
  );
}
