import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TypingIndicator from '../../components/features/concierge/TypingIndicator';

describe('TypingIndicator', () => {
  it('renders with correct status role', () => {
    render(<TypingIndicator />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('has accessible label for screen readers', () => {
    render(<TypingIndicator />);
    expect(screen.getByLabelText(/concierge is typing/i)).toBeInTheDocument();
  });

  it('renders three animated dots', () => {
    const { container } = render(<TypingIndicator />);
    const dots = container.querySelectorAll('.animate-bounce');
    expect(dots).toHaveLength(3);
  });
});
