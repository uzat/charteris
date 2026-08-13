import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import HouseManual from '../../components/features/house-manual/HouseManual';
import type { HouseManualSection } from '../../lib/types/property';

const sections: HouseManualSection[] = [
  { id: 'wifi', title: 'Wi-Fi', content: 'Password: abc' },
  { id: 'parking', title: 'Parking', content: 'Two spaces available.' },
  { id: 'checkout', title: 'Check-out', content: 'By 10am.' },
];

describe('HouseManual', () => {
  it('renders all section titles', () => {
    render(<HouseManual sections={sections} />);
    expect(screen.getByText('Wi-Fi')).toBeInTheDocument();
    expect(screen.getByText('Parking')).toBeInTheDocument();
    expect(screen.getByText('Check-out')).toBeInTheDocument();
  });

  it('renders the House Manual heading', () => {
    render(<HouseManual sections={sections} />);
    expect(screen.getByText(/house manual/i)).toBeInTheDocument();
  });

  it('clicking a panel opens it', () => {
    render(<HouseManual sections={sections} />);
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]);
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
  });

  it('only one panel is open at a time (single-open accordion)', () => {
    render(<HouseManual sections={sections} />);
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]);
    fireEvent.click(buttons[1]);
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'false');
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'true');
  });

  it('clicking the open panel closes it', () => {
    render(<HouseManual sections={sections} />);
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]);
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(buttons[0]);
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'false');
  });
});
