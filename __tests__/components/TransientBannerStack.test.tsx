import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import TransientBannerStack from '../../components/features/banners/TransientBannerStack';
import type { PropertyConfig } from '../../lib/types/property';

// Tuesday 2024-01-16 17:00 AEDT = 2024-01-16T06:00:00Z (bin night window)
const BIN_NIGHT_DATE = new Date('2024-01-16T06:00:00Z');
// Tuesday 2024-01-16 07:00 AEDT = 2024-01-15T20:00:00Z (checkout window)
const CHECKOUT_DATE = new Date('2024-01-15T20:00:00Z');
// Wednesday 2024-01-17 14:00 AEDT = 2024-01-17T03:00:00Z (no window active)
const INACTIVE_DATE = new Date('2024-01-17T03:00:00Z');

const config: Pick<PropertyConfig, 'binNight' | 'checkoutTime'> = {
  binNight: { day: 2, type: 'general waste and recycling' },
  checkoutTime: { hour: 10, minute: 0 },
};

describe('TransientBannerStack', () => {
  beforeEach(() => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders bin night banner when conditions are met and not dismissed', () => {
    render(<TransientBannerStack config={config} _mockDate={BIN_NIGHT_DATE} />);
    expect(screen.getByText('Bin night tonight')).toBeInTheDocument();
    expect(screen.getByText('general waste and recycling')).toBeInTheDocument();
  });

  it('renders checkout banner when conditions are met and not dismissed', () => {
    render(<TransientBannerStack config={config} _mockDate={CHECKOUT_DATE} />);
    expect(screen.getByText('Check-out today')).toBeInTheDocument();
    expect(screen.getByText('10:00 AM')).toBeInTheDocument();
  });

  it('renders nothing when no time conditions are met', () => {
    const { container } = render(<TransientBannerStack config={config} _mockDate={INACTIVE_DATE} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when config fields are undefined', () => {
    const { container } = render(
      <TransientBannerStack config={{ binNight: undefined, checkoutTime: undefined }} _mockDate={BIN_NIGHT_DATE} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when banner was already dismissed this session', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('1');
    const { container } = render(<TransientBannerStack config={config} _mockDate={BIN_NIGHT_DATE} />);
    expect(container.firstChild).toBeNull();
  });

  it('removes banner from DOM and writes dismissal key on dismiss', async () => {
    const setItem = vi.spyOn(Storage.prototype, 'setItem');
    const user = userEvent.setup();
    render(<TransientBannerStack config={config} _mockDate={BIN_NIGHT_DATE} />);
    expect(screen.getByText('Bin night tonight')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(screen.queryByText('Bin night tonight')).not.toBeInTheDocument();
    expect(setItem).toHaveBeenCalledWith('banner_dismissed_bin_night', '1');
  });

  it('banner remains hidden after re-render following dismissal', async () => {
    const user = userEvent.setup();
    const { rerender } = render(<TransientBannerStack config={config} _mockDate={BIN_NIGHT_DATE} />);
    await user.click(screen.getByRole('button', { name: 'Dismiss' }));
    rerender(<TransientBannerStack config={config} _mockDate={BIN_NIGHT_DATE} />);
    expect(screen.queryByText('Bin night tonight')).not.toBeInTheDocument();
  });

  it('still shows banner when sessionStorage throws (graceful degradation)', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('storage unavailable');
    });
    render(<TransientBannerStack config={config} _mockDate={BIN_NIGHT_DATE} />);
    expect(screen.getByText('Bin night tonight')).toBeInTheDocument();
  });

  it('dismiss works in-memory when sessionStorage throws on setItem', async () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('storage unavailable');
    });
    const user = userEvent.setup();
    render(<TransientBannerStack config={config} _mockDate={BIN_NIGHT_DATE} />);
    await user.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(screen.queryByText('Bin night tonight')).not.toBeInTheDocument();
  });
});
