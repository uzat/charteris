import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import OnboardingOverlay from '../../components/features/onboarding/OnboardingOverlay';

describe('OnboardingOverlay', () => {
  it('renders all 6 booking type options', () => {
    render(<OnboardingOverlay onComplete={vi.fn()} />);
    expect(screen.getByRole('button', { name: /family/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /couples/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /friends/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /corporate/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /hen/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /birthday/i })).toBeInTheDocument();
  });

  it('Continue button is disabled until a type is selected', () => {
    render(<OnboardingOverlay onComplete={vi.fn()} />);
    expect(screen.getByRole('button', { name: /continue/i })).toBeDisabled();
  });

  it('Continue button enables after selecting a type', () => {
    render(<OnboardingOverlay onComplete={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: /family/i }));
    expect(screen.getByRole('button', { name: /continue/i })).not.toBeDisabled();
  });

  it('calls onComplete with selected booking type on Continue', () => {
    const onComplete = vi.fn();
    render(<OnboardingOverlay onComplete={onComplete} />);
    fireEvent.click(screen.getByRole('button', { name: /couples/i }));
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));
    expect(onComplete).toHaveBeenCalledWith('couples');
  });

  it('calls onComplete with general on Skip', () => {
    const onComplete = vi.fn();
    render(<OnboardingOverlay onComplete={onComplete} />);
    fireEvent.click(screen.getByRole('button', { name: /skip/i }));
    expect(onComplete).toHaveBeenCalledWith('general');
  });

  it('renders as a dialog with correct aria attributes', () => {
    render(<OnboardingOverlay onComplete={vi.fn()} />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('marks selected option with aria-pressed', () => {
    render(<OnboardingOverlay onComplete={vi.fn()} />);
    const familyBtn = screen.getByRole('button', { name: /family/i });
    expect(familyBtn).toHaveAttribute('aria-pressed', 'false');
    fireEvent.click(familyBtn);
    expect(familyBtn).toHaveAttribute('aria-pressed', 'true');
  });
});
