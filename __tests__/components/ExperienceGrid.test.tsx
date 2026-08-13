import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ExperienceGrid from '../../components/features/experiences/ExperienceGrid';
import type { Experience } from '../../lib/types/property';

const experiences: Experience[] = [
  {
    id: '1',
    title: 'Family Tour',
    description: '',
    imageUrl: '',
    category: 'Adventure',
    priceFrom: 100,
    currency: 'AUD',
    availability: 'available',
    suitableFor: ['family'],
    restrictions: [],
  },
  {
    id: '2',
    title: 'Adults Only Spa',
    description: '',
    imageUrl: '',
    category: 'Wellness',
    priceFrom: 200,
    currency: 'AUD',
    availability: 'available',
    suitableFor: ['couples'],
    restrictions: ['family'],
  },
];

describe('ExperienceGrid', () => {
  it('renders filtered experiences for family booking type', () => {
    render(<ExperienceGrid experiences={experiences} bookingType="family" />);
    expect(screen.getByText('Family Tour')).toBeInTheDocument();
    expect(screen.queryByText('Adults Only Spa')).not.toBeInTheDocument();
  });

  it('renders filtered experiences for couples booking type', () => {
    render(<ExperienceGrid experiences={experiences} bookingType="couples" />);
    expect(screen.getByText('Adults Only Spa')).toBeInTheDocument();
    expect(screen.queryByText('Family Tour')).not.toBeInTheDocument();
  });

  it('shows empty state when no experiences match booking type', () => {
    render(<ExperienceGrid experiences={experiences} bookingType="corporate" />);
    expect(screen.getByText(/no experiences available/i)).toBeInTheDocument();
  });

  it('shows count of available experiences', () => {
    render(<ExperienceGrid experiences={experiences} bookingType="family" />);
    expect(screen.getByText('1 available')).toBeInTheDocument();
  });

  it('renders the section heading', () => {
    render(<ExperienceGrid experiences={experiences} bookingType="family" />);
    expect(screen.getByText(/curated local experiences/i)).toBeInTheDocument();
  });
});
