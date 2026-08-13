import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import QuietHoursBanner from '../../components/features/quiet-hours/QuietHoursBanner';
import type { QuietHoursConfig } from '../../lib/types/property';

const config: QuietHoursConfig = {
  startHour: 22,
  endHour: 8,
  timezone: 'Australia/Melbourne',
  message: 'Please keep noise to a minimum.',
};

describe('QuietHoursBanner', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders nothing during inactive hours', () => {
    // 12:00 AEDT = 01:00 UTC
    vi.setSystemTime(new Date('2024-01-15T01:00:00Z'));
    const { container } = render(<QuietHoursBanner config={config} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders active banner during quiet hours', () => {
    // 22:00 AEDT = 11:00 UTC
    vi.setSystemTime(new Date('2024-01-15T11:00:00Z'));
    render(<QuietHoursBanner config={config} />);
    expect(screen.getByText('Active Now')).toBeInTheDocument();
    expect(screen.getByText('Quiet Hours')).toBeInTheDocument();
    expect(screen.getByText(config.message)).toBeInTheDocument();
  });

  it('renders upcoming banner 30 minutes before quiet hours', () => {
    // 21:30 AEDT = 10:30 UTC
    vi.setSystemTime(new Date('2024-01-15T10:30:00Z'));
    render(<QuietHoursBanner config={config} />);
    expect(screen.getByText(/quiet hours starting soon/i)).toBeInTheDocument();
    expect(screen.getByText(/30 minute/i)).toBeInTheDocument();
  });

  it('active banner has alert role', () => {
    vi.setSystemTime(new Date('2024-01-15T11:00:00Z'));
    render(<QuietHoursBanner config={config} />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('upcoming banner has status role', () => {
    vi.setSystemTime(new Date('2024-01-15T10:30:00Z'));
    render(<QuietHoursBanner config={config} />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
