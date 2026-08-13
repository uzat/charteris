import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from '../../components/layout/Footer';

describe('Footer', () => {
  it('renders the powered-by attribution', () => {
    render(<Footer />);
    expect(screen.getByText(/powered by charteris/i)).toBeInTheDocument();
  });

  it('renders as a footer landmark', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
