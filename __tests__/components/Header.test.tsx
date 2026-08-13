import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Header from '../../components/layout/Header';

describe('Header', () => {
  it('renders the Charteris brand name', () => {
    render(<Header propertyName="Sorrento Ridge Estate" />);
    expect(screen.getByText('Charteris')).toBeInTheDocument();
  });

  it('renders the property name', () => {
    render(<Header propertyName="Sorrento Ridge Estate" />);
    expect(screen.getByText('Sorrento Ridge Estate')).toBeInTheDocument();
  });

  it('renders as a sticky header landmark', () => {
    render(<Header propertyName="Test Property" />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});
