import type { BookingType } from '../types/property';

const VALID: BookingType[] = [
  'family', 'couples', 'friends', 'corporate', 'hen_party', 'birthday', 'general',
];

export function parseBookingType(value: string | string[] | undefined): BookingType {
  const str = Array.isArray(value) ? value[0] : value;
  return (VALID as string[]).includes(str ?? '') ? (str as BookingType) : 'general';
}
