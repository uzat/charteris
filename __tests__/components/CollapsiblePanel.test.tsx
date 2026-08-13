import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CollapsiblePanel from '../../components/features/house-manual/CollapsiblePanel';
import type { HouseManualSection } from '../../lib/types/property';

const section: HouseManualSection = {
  id: 'wifi',
  title: 'Wi-Fi & Internet',
  content: 'Network: CharterisGuest\nPassword: welcome2024',
};

const emergency: HouseManualSection = {
  id: 'emergency-contacts',
  title: 'Emergency Contacts',
  content: 'Call 000 for emergencies.',
};

describe('CollapsiblePanel', () => {
  it('renders the section title', () => {
    render(<CollapsiblePanel section={section} isOpen={false} onToggle={vi.fn()} />);
    expect(screen.getByText('Wi-Fi & Internet')).toBeInTheDocument();
  });

  it('content is hidden when closed', () => {
    render(<CollapsiblePanel section={section} isOpen={false} onToggle={vi.fn()} />);
    const content = screen.getByText(/CharterisGuest/);
    expect(content.closest('[aria-hidden]')).toHaveAttribute('aria-hidden', 'true');
  });

  it('content is visible when open', () => {
    render(<CollapsiblePanel section={section} isOpen={true} onToggle={vi.fn()} />);
    expect(screen.getByText(/CharterisGuest/)).toBeVisible();
  });

  it('calls onToggle when header button is clicked', () => {
    const onToggle = vi.fn();
    render(<CollapsiblePanel section={section} isOpen={false} onToggle={onToggle} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onToggle).toHaveBeenCalledOnce();
  });

  it('button has correct aria-expanded attribute', () => {
    const { rerender } = render(
      <CollapsiblePanel section={section} isOpen={false} onToggle={vi.fn()} />
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
    rerender(<CollapsiblePanel section={section} isOpen={true} onToggle={vi.fn()} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
  });

  it('emergency section shows 000 callout prominently', () => {
    render(<CollapsiblePanel section={emergency} isOpen={true} onToggle={vi.fn()} />);
    expect(screen.getByText(/000.*emergency services/i)).toBeInTheDocument();
  });
});
