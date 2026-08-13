import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import GuestSessionProvider from '../../components/features/onboarding/GuestSessionProvider';

describe('GuestSessionProvider', () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows onboarding overlay when no booking type is stored', async () => {
    render(
      <GuestSessionProvider>{() => <div>Guest content</div>}</GuestSessionProvider>
    );
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
    expect(screen.queryByText('Guest content')).not.toBeInTheDocument();
  });

  it('renders children with stored booking type, skipping overlay', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('family');
    render(
      <GuestSessionProvider>
        {(bookingType) => <div>Type: {bookingType}</div>}
      </GuestSessionProvider>
    );
    await waitFor(() => {
      expect(screen.getByText('Type: family')).toBeInTheDocument();
    });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('passes bookingType from render prop after overlay completion', async () => {
    render(
      <GuestSessionProvider>
        {(bookingType) => <div>Selected: {bookingType}</div>}
      </GuestSessionProvider>
    );
    // Overlay shown — select Couples then click Continue
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByRole('button', { name: /couples/i }));
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));
    await waitFor(() => {
      expect(screen.getByText('Selected: couples')).toBeInTheDocument();
    });
  });
});
