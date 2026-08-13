import { describe, it, expect } from 'vitest';
import { filterExperiences } from '../../../../lib/utils/experienceFilter';
import type { Experience } from '../../../../lib/types/property';

const base: Omit<Experience, 'id' | 'suitableFor' | 'restrictions'> = {
  title: 'Test',
  description: '',
  imageUrl: '',
  category: 'Test',
  priceFrom: 100,
  currency: 'AUD',
  availability: 'available',
};

describe('filterExperiences', () => {
  it('includes suitableFor=all for any booking type', () => {
    const exp: Experience = { ...base, id: '1', suitableFor: 'all', restrictions: [] };
    expect(filterExperiences([exp], 'family')).toHaveLength(1);
    expect(filterExperiences([exp], 'hen_party')).toHaveLength(1);
  });

  it('excludes when booking type is in restrictions', () => {
    const exp: Experience = { ...base, id: '2', suitableFor: 'all', restrictions: ['hen_party'] };
    expect(filterExperiences([exp], 'hen_party')).toHaveLength(0);
    expect(filterExperiences([exp], 'family')).toHaveLength(1);
  });

  it('includes when booking type matches suitableFor array', () => {
    const exp: Experience = { ...base, id: '3', suitableFor: ['family', 'couples'], restrictions: [] };
    expect(filterExperiences([exp], 'family')).toHaveLength(1);
    expect(filterExperiences([exp], 'couples')).toHaveLength(1);
  });

  it('excludes when booking type not in suitableFor array', () => {
    const exp: Experience = { ...base, id: '4', suitableFor: ['family'], restrictions: [] };
    expect(filterExperiences([exp], 'corporate')).toHaveLength(0);
  });

  it('restrictions take priority over suitableFor all', () => {
    const exp: Experience = { ...base, id: '5', suitableFor: 'all', restrictions: ['birthday', 'hen_party'] };
    expect(filterExperiences([exp], 'birthday')).toHaveLength(0);
    expect(filterExperiences([exp], 'hen_party')).toHaveLength(0);
    expect(filterExperiences([exp], 'family')).toHaveLength(1);
  });

  it('handles empty experience array', () => {
    expect(filterExperiences([], 'family')).toHaveLength(0);
  });
});
