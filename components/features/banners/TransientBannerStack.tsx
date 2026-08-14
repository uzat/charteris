'use client';

import { useState, useEffect } from 'react';
import type { PropertyConfig } from '../../../lib/types/property';
import { getActiveBanner } from '../../../lib/utils/transientBanners';
import type { BannerSpec } from '../../../lib/utils/transientBanners';
import TransientBanner from './TransientBanner';

interface TransientBannerStackProps {
  config: Pick<PropertyConfig, 'binNight' | 'checkoutTime'>;
  _mockDate?: Date;
}

export default function TransientBannerStack({ config, _mockDate }: TransientBannerStackProps) {
  const [banner, setBanner] = useState<BannerSpec | null>(null);

  useEffect(() => {
    const active = getActiveBanner(config, _mockDate);
    if (!active) return;

    try {
      if (sessionStorage.getItem(active.dismissKey)) return;
    } catch {
      // sessionStorage unavailable — show banner anyway
    }

    setBanner(active);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!banner) return null;

  const handleDismiss = () => {
    try {
      sessionStorage.setItem(banner.dismissKey, '1');
    } catch {
      // sessionStorage unavailable — dismiss works in-memory only
    }
    setBanner(null);
  };

  return (
    <TransientBanner
      message={banner.message}
      detail={banner.detail}
      onDismiss={handleDismiss}
    />
  );
}
