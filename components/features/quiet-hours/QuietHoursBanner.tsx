'use client';

import { useState, useEffect } from 'react';
import type { QuietHoursConfig } from '../../../lib/types/property';
import { getQuietHoursStatus } from '../../../lib/utils/quietHours';

interface QuietHoursBannerProps {
  config: QuietHoursConfig;
}

export default function QuietHoursBanner({ config }: QuietHoursBannerProps) {
  const [status, setStatus] = useState(() => getQuietHoursStatus(config));

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(getQuietHoursStatus(config));
    }, 60_000);
    return () => clearInterval(interval);
  }, [config]);

  if (status.state === 'inactive') return null;

  if (status.state === 'active') {
    return (
      <div
        className="rounded-lg px-4 py-4"
        style={{ backgroundColor: '#2A1F0A' }}
        role="alert"
        aria-live="polite"
      >
        <div className="flex items-start gap-3">
          <span
            className="mt-0.5 shrink-0 rounded px-2 py-0.5 text-xs font-bold uppercase tracking-wider"
            style={{ backgroundColor: '#F59E0B', color: '#1B2A3B' }}
          >
            Active Now
          </span>
          <div>
            <p className="text-sm font-semibold text-amber-200">Quiet Hours</p>
            <p className="mt-0.5 text-xs text-amber-200/70">{status.message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="rounded-lg border-l-[3px] border-sand/60 bg-navy px-4 py-4"
      role="status"
    >
      <div className="flex items-start gap-3">
        <div>
          <p className="text-sm font-semibold text-sand/80">Quiet Hours Starting Soon</p>
          <p className="mt-0.5 text-xs text-sand/50">
            In {status.minutesUntilStart} minute{status.minutesUntilStart !== 1 ? 's' : ''} —{' '}
            {status.message}
          </p>
        </div>
      </div>
    </div>
  );
}
