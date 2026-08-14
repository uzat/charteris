import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import TransientBanner from '../../components/features/banners/TransientBanner';

describe('TransientBanner', () => {
  it('renders the message', () => {
    render(<TransientBanner message="Bin night tonight" detail="general waste" onDismiss={() => {}} />);
    expect(screen.getByText('Bin night tonight')).toBeInTheDocument();
  });

  it('renders the detail', () => {
    render(<TransientBanner message="Bin night tonight" detail="general waste and recycling" onDismiss={() => {}} />);
    expect(screen.getByText('general waste and recycling')).toBeInTheDocument();
  });

  it('has role="alert"', () => {
    render(<TransientBanner message="Check-out today" detail="10:00 AM" onDismiss={() => {}} />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('has a dismiss button with aria-label', () => {
    render(<TransientBanner message="Check-out today" detail="10:00 AM" onDismiss={() => {}} />);
    expect(screen.getByRole('button', { name: 'Dismiss' })).toBeInTheDocument();
  });

  it('calls onDismiss when dismiss button is clicked', async () => {
    const onDismiss = vi.fn();
    const user = userEvent.setup();
    render(<TransientBanner message="Check-out today" detail="10:00 AM" onDismiss={onDismiss} />);
    await user.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(onDismiss).toHaveBeenCalledOnce();
  });
});
