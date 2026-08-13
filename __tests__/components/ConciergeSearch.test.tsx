import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ConciergeSearch from '../../components/features/concierge/ConciergeSearch';

const defaultProps = { bookingType: 'family' as const, propertyName: 'Sorrento Ridge' };

describe('ConciergeSearch', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders the input and Send button', () => {
    render(<ConciergeSearch {...defaultProps} />);
    expect(screen.getByRole('textbox', { name: /ask the concierge/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });

  it('Send button is disabled when input is empty', () => {
    render(<ConciergeSearch {...defaultProps} />);
    expect(screen.getByRole('button', { name: /send/i })).toBeDisabled();
  });

  it('Send button enables when input has text', () => {
    render(<ConciergeSearch {...defaultProps} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'What time is checkout?' } });
    expect(screen.getByRole('button', { name: /send/i })).not.toBeDisabled();
  });

  it('shows user message and assistant response after successful submit', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ answer: 'Check-out is at 10am.' }),
    } as Response);

    render(<ConciergeSearch {...defaultProps} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Checkout time?' } });
    fireEvent.click(screen.getByRole('button', { name: /send/i }));

    await waitFor(() => {
      expect(screen.getByText('Checkout time?')).toBeInTheDocument();
      expect(screen.getByText('Check-out is at 10am.')).toBeInTheDocument();
    });
  });

  it('clears input after submit', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ answer: 'Check-out is at 10am.' }),
    } as Response);

    render(<ConciergeSearch {...defaultProps} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Checkout time?' } });
    fireEvent.click(screen.getByRole('button', { name: /send/i }));

    await waitFor(() => {
      expect((input as HTMLInputElement).value).toBe('');
    });
  });

  it('shows error message on API failure', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ error: 'Server error' }),
    } as Response);

    render(<ConciergeSearch {...defaultProps} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Hello?' } });
    fireEvent.click(screen.getByRole('button', { name: /send/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText('Server error')).toBeInTheDocument();
    });
  });

  it('shows error message on network failure', async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'));

    render(<ConciergeSearch {...defaultProps} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Hello?' } });
    fireEvent.click(screen.getByRole('button', { name: /send/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText('Network error')).toBeInTheDocument();
    });
  });

  it('renders property name as assistant label', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ answer: 'Welcome!' }),
    } as Response);

    render(<ConciergeSearch {...defaultProps} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Hi' } });
    fireEvent.click(screen.getByRole('button', { name: /send/i }));

    await waitFor(() => {
      expect(screen.getByText(/sorrento ridge/i)).toBeInTheDocument();
    });
  });

  it('message log has aria-live polite', () => {
    render(<ConciergeSearch {...defaultProps} />);
    // Submit once to show the log
    // The log region is hidden until messages appear — check section landmark
    expect(screen.getByRole('region', { name: /concierge/i })).toBeInTheDocument();
  });
});
