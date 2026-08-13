import type { PropertyConfig } from '../types/property';

export const demoProperty: PropertyConfig = {
  slug: 'sorrento-ridge',
  tier: 'luxury',
  branding: {
    propertyName: 'Sorrento Ridge Estate',
    agencyName: 'Jellis Craig ShortStays',
    attribution: 'co-branded',
  },
  quietHours: {
    startHour: 22,
    endHour: 8,
    timezone: 'Australia/Melbourne',
    message:
      'Mornington Peninsula Council requires quiet between 10pm and 8am. Music, outdoor noise, and gatherings must cease by 10pm.',
  },
  hostName: 'Sarah Collins',
  hostPhone: '0412 345 678',
  experiences: [
    {
      id: 'exp-helicopter',
      title: 'Peninsula Helicopter Tour',
      description:
        'Breathtaking aerial views of the Mornington Peninsula coastline, vineyards, and Port Phillip Bay.',
      imageUrl: '/images/experiences/helicopter.jpg',
      category: 'Adventure',
      priceFrom: 395,
      currency: 'AUD',
      availability: 'available',
      suitableFor: 'all',
      restrictions: [],
      minPartySize: 1,
      maxPartySize: 4,
      operator: 'Peninsula Air Tours',
    },
    {
      id: 'exp-private-chef',
      title: 'Private Chef — Estate Dinner',
      description:
        'A Michelin-trained chef prepares a bespoke multi-course dinner using seasonal Peninsula produce, served in your estate.',
      imageUrl: '/images/experiences/private-chef.jpg',
      category: 'Dining',
      priceFrom: 220,
      currency: 'AUD',
      availability: 'on_request',
      suitableFor: 'all',
      restrictions: [],
      minNoticeHours: 72,
      minPartySize: 4,
      maxPartySize: 16,
      operator: 'Luxe Table Co.',
    },
    {
      id: 'exp-hot-springs',
      title: 'Peninsula Hot Springs — Private Bathing',
      description:
        'Exclusive private bathing session at Peninsula Hot Springs, with geothermal mineral waters and panoramic views.',
      imageUrl: '/images/experiences/hot-springs.jpg',
      category: 'Wellness',
      priceFrom: 130,
      currency: 'AUD',
      availability: 'available',
      suitableFor: 'all',
      restrictions: ['hen_party'],
      minPartySize: 2,
      maxPartySize: 8,
      operator: 'Peninsula Hot Springs',
    },
    {
      id: 'exp-studio-co',
      title: 'Studio & Co — Ceramics Workshop',
      description:
        'Hands-on wheel-throwing and hand-building session with Peninsula ceramicists, followed by wine and local cheese.',
      imageUrl: '/images/experiences/ceramics.jpg',
      category: 'Arts & Culture',
      priceFrom: 95,
      currency: 'AUD',
      availability: 'booked_out',
      suitableFor: 'all',
      restrictions: ['hen_party', 'birthday'],
      minPartySize: 2,
      maxPartySize: 10,
      operator: 'Studio & Co Mornington',
    },
  ],
  houseManual: [
    {
      id: 'wifi',
      title: 'Wi-Fi',
      icon: 'wifi',
      content: 'Network: SorrentoRidge5G\nPassword: Sorrento2025\n\nA second network (SorrentoRidge2G) is available for older devices.',
    },
    {
      id: 'checkout',
      title: 'Check-out',
      icon: 'door-open',
      content:
        'Check-out is by 10am. Please strip beds and leave linen in the laundry. Place all rubbish in the bins provided. Lock all doors and leave keys on the kitchen bench.',
    },
    {
      id: 'checkin',
      title: 'Check-in',
      icon: 'key',
      content:
        'Check-in from 3pm. The key lockbox is beside the front door — your access code was sent with your booking confirmation. Help yourself to the welcome hamper in the fridge.',
    },
    {
      id: 'heating-cooling',
      title: 'Heating & Cooling',
      icon: 'thermometer',
      content:
        'Ducted reverse-cycle air conditioning throughout. Main control panel is in the hallway. The fireplace in the living room is available — kindling and logs are in the basket beside it.',
    },
    {
      id: 'appliances',
      title: 'Appliances',
      icon: 'zap',
      content:
        'The kitchen features a Miele induction cooktop, steam oven, and dishwasher. The Nespresso machine takes Vertuo pods — a starter pack is in the cupboard above. Washing machine and dryer are in the laundry off the back hallway.',
    },
    {
      id: 'pool-spa',
      title: 'Pool & Spa',
      icon: 'waves',
      content:
        'Heated pool and spa are available year-round. Pool temperature is set to 28°C. Please shower before entering and do not use glassware in the pool area. Pool towels are in the pool house.',
    },
    {
      id: 'parking',
      title: 'Parking',
      icon: 'car',
      content:
        'The electric gate opens with code 4821. Up to four cars can park in the driveway. Street parking is also available on Ridge Road.',
    },
    {
      id: 'bin-night',
      title: 'Bin Night',
      icon: 'trash-2',
      content:
        'General waste (red lid) and recycling (yellow lid): Tuesday night. Green waste (green lid): every second Tuesday. Bins are in the side passage — please return them after collection.',
    },
    {
      id: 'house-rules',
      title: 'House Rules',
      icon: 'clipboard-list',
      content:
        'No smoking indoors. No pets. Quiet hours 10pm–8am (Council requirement). Maximum occupancy 10 guests overnight. No events, functions, or parties beyond the registered booking group.',
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      icon: 'wrench',
      content:
        'Wi-Fi down: restart the modem in the study (30s). Dishwasher not starting: check the child lock button. Hot water: the system takes 60s to warm after a period of inactivity. For anything else, contact Sarah on 0412 345 678.',
    },
    {
      id: 'local-essentials',
      title: 'Local Essentials',
      icon: 'map-pin',
      content:
        'Nearest supermarket: Woolworths Sorrento (5 min drive). Nearest pharmacy: Sorrento Pharmacy on Ocean Beach Rd. Nearest hospital: Frankston Hospital (35 min). Petrol: BP Sorrento on Melbourne Rd.',
    },
    {
      id: 'emergency-contacts',
      title: 'Emergency Contacts',
      icon: 'phone',
      content:
        'Emergency services: 000\nProperty manager: Sarah Collins — 0412 345 678\nMornington Peninsula Shire after-hours: 1300 850 600\n\nFor genuine emergencies, please call 000 first.',
    },
  ],
};

export function getPropertyConfig(slug: string): PropertyConfig | null {
  if (slug === demoProperty.slug) return demoProperty;
  return null;
}
