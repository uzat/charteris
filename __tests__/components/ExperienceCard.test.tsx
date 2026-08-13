import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ExperienceCard from '../../components/features/experiences/ExperienceCard';
import type { Experience } from '../../lib/types/property';

const base: Experience = {
  id: '1',
  title: 'Helicopter Tour',
  description: 'Scenic coastal flight.',
  imageUrl: '',
  category: 'Adventure',
  priceFrom: 450,
  currency: 'AUD',
  availability: 'available',
  suitableFor: 'all',
  restrictions: [],
};

describe('ExperienceCard', () => {
  it('renders experience title and price', () => {
    render(<ExperienceCard experience={base} />);
    expect(screen.getByText('Helicopter Tour')).toBeInTheDocument();
    expect(screen.getByText(/\$450/)).toBeInTheDocument();
  });

  it('renders Book Now CTA for available state', () => {
    render(<ExperienceCard experience={base} />);
    expect(screen.getByRole('link', { name: /book now/i })).toBeInTheDocument();
  });

  it('renders Limited Availability badge for limited state', () => {
    render(<ExperienceCard experience={{ ...base, availability: 'limited' }} />);
    expect(screen.getByText('Limited Availability')).toBeInTheDocument();
  });

  it('renders On Request badge and Request to Book CTA', () => {
    render(<ExperienceCard experience={{ ...base, availability: 'on_request' }} />);
    expect(screen.getByText('On Request')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /request to book/i })).toBeInTheDocument();
  });

  it('renders Fully Booked badge and aria-disabled link for booked_out state', () => {
    render(<ExperienceCard experience={{ ...base, availability: 'booked_out' }} />);
    // Both badge and CTA say "Fully Booked" — find the link specifically
    const cta = screen.getByRole('link', { name: /fully booked/i });
    expect(cta).toHaveAttribute('aria-disabled', 'true');
    expect(cta).toHaveAttribute('tabindex', '-1');
    // Confirm badge is also present (two elements total)
    expect(screen.getAllByText('Fully Booked')).toHaveLength(2);
  });

  it('renders Seasonal badge for seasonal state', () => {
    render(<ExperienceCard experience={{ ...base, availability: 'seasonal' }} />);
    expect(screen.getByText('Seasonal')).toBeInTheDocument();
  });

  it('renders Check Availability CTA for check_availability state', () => {
    render(<ExperienceCard experience={{ ...base, availability: 'check_availability' }} />);
    expect(screen.getByRole('link', { name: /check availability/i })).toBeInTheDocument();
  });

  it('shows minNoticeHours badge when present', () => {
    render(<ExperienceCard experience={{ ...base, minNoticeHours: 72 }} />);
    expect(screen.getByText(/72hr notice/i)).toBeInTheDocument();
  });
});
