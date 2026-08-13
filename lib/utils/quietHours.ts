import type { QuietHoursConfig } from '../types/property';

export type QuietHoursStatus =
  | { state: 'active'; message: string }
  | { state: 'upcoming'; minutesUntilStart: number; message: string }
  | { state: 'inactive' };

export function getQuietHoursStatus(
  config: QuietHoursConfig,
  mockDate?: Date
): QuietHoursStatus {
  const now = mockDate ?? new Date();

  const formatter = new Intl.DateTimeFormat('en-AU', {
    timeZone: config.timezone,
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  });

  const parts = formatter.formatToParts(now);
  const hour = parseInt(parts.find((p) => p.type === 'hour')?.value ?? '0', 10);
  const minute = parseInt(parts.find((p) => p.type === 'minute')?.value ?? '0', 10);

  const currentMinutes = hour * 60 + minute;
  const startMinutes = config.startHour * 60;
  const endMinutes = config.endHour * 60;

  // Quiet hours span midnight (e.g. 22:00–08:00)
  const isActive =
    config.startHour > config.endHour
      ? currentMinutes >= startMinutes || currentMinutes < endMinutes
      : currentMinutes >= startMinutes && currentMinutes < endMinutes;

  if (isActive) {
    return { state: 'active', message: config.message };
  }

  const minutesUntil =
    currentMinutes <= startMinutes
      ? startMinutes - currentMinutes
      : 24 * 60 - currentMinutes + startMinutes;

  if (minutesUntil <= 60) {
    return {
      state: 'upcoming',
      minutesUntilStart: minutesUntil,
      message: config.message,
    };
  }

  return { state: 'inactive' };
}
