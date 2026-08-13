import type { BookingType, Experience } from '../types/property';

export function filterExperiences(
  experiences: Experience[],
  bookingType: BookingType
): Experience[] {
  return experiences.filter((exp) => {
    if (exp.restrictions.includes(bookingType)) return false;
    if (exp.suitableFor === 'all') return true;
    return exp.suitableFor.includes(bookingType);
  });
}
