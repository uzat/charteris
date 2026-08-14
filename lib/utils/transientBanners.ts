import type { PropertyConfig } from '../types/property';

const TZ = 'Australia/Melbourne';

export type BannerType = 'bin_night' | 'checkout';

export interface BannerSpec {
  type: BannerType;
  message: string;
  detail: string;
  dismissKey: string;
}

export const DISMISS_KEYS = {
  bin_night: 'banner_dismissed_bin_night',
  checkout: 'banner_dismissed_checkout',
} as const;

// Day-of-week numbers follow JS convention: 0=Sunday, 1=Monday, 2=Tuesday, ... 6=Saturday.
// binNight.day from the DB uses this same convention (seed: day:2 = Tuesday).

function getMelbourneTimeInfo(now: Date): { minutesSinceMidnight: number; dayOfWeek: number } {
  const timeFormatter = new Intl.DateTimeFormat('en-AU', {
    timeZone: TZ,
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  });
  const parts = timeFormatter.formatToParts(now);
  const hour = parseInt(parts.find((p) => p.type === 'hour')?.value ?? '0', 10);
  const minute = parseInt(parts.find((p) => p.type === 'minute')?.value ?? '0', 10);

  // Derive Melbourne calendar date to get the local day-of-week
  const dateFormatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const dateStr = dateFormatter.format(now); // "YYYY-MM-DD"
  const [y, m, d] = dateStr.split('-').map(Number);
  const dayOfWeek = new Date(y, m - 1, d).getDay();

  return { minutesSinceMidnight: hour * 60 + minute, dayOfWeek };
}

export function formatCheckoutTime(hour: number, minute: number): string {
  const period = hour < 12 ? 'AM' : 'PM';
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  const displayMinute = minute.toString().padStart(2, '0');
  return `${displayHour}:${displayMinute} ${period}`;
}

// Time window bounds are inclusive on both ends.
// Checkout banner: 07:00 to (checkoutTime minus 60 minutes).
// Bin night banner: 17:00 to 22:00 on the configured day of week.
// Checkout is evaluated first — it takes priority over bin night.
export function getActiveBanner(
  config: Pick<PropertyConfig, 'binNight' | 'checkoutTime'>,
  now?: Date
): BannerSpec | null {
  const { minutesSinceMidnight, dayOfWeek } = getMelbourneTimeInfo(now ?? new Date());

  if (config.checkoutTime) {
    const { hour, minute } = config.checkoutTime;
    const windowStart = 7 * 60;
    const windowEnd = hour * 60 + minute - 60;
    if (minutesSinceMidnight >= windowStart && minutesSinceMidnight <= windowEnd) {
      return {
        type: 'checkout',
        message: 'Check-out today',
        detail: formatCheckoutTime(hour, minute),
        dismissKey: DISMISS_KEYS.checkout,
      };
    }
  }

  if (config.binNight) {
    const windowStart = 17 * 60;
    const windowEnd = 22 * 60;
    if (
      dayOfWeek === config.binNight.day &&
      minutesSinceMidnight >= windowStart &&
      minutesSinceMidnight <= windowEnd
    ) {
      return {
        type: 'bin_night',
        message: 'Bin night tonight',
        detail: config.binNight.type,
        dismissKey: DISMISS_KEYS.bin_night,
      };
    }
  }

  return null;
}
