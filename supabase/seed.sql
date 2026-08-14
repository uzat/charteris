insert into properties (
  slug, name, host_name, host_phone, agency_name, tier,
  quiet_hours_start_hour, quiet_hours_end_hour, quiet_hours_timezone, quiet_hours_message,
  checkout_time, bin_night
) values (
  'sorrento-ridge',
  'Sorrento Ridge Estate',
  'Sarah Collins',
  '0412 345 678',
  'Jellis Craig ShortStays',
  'luxury',
  22, 8,
  'Australia/Melbourne',
  'Mornington Peninsula Council requires quiet between 10pm and 8am. Music, outdoor noise, and gatherings must cease by 10pm.',
  '{"hour": 10, "minute": 0}',
  '{"day": 2, "type": "general waste and recycling"}'
);

insert into experiences (property_id, title, description, image_url, category, suitable_for, restrictions, availability, price_from, currency, operator, min_party_size, max_party_size, display_order)
select p.id, e.title, e.description, e.image_url, e.category, e.suitable_for, e.restrictions, e.availability, e.price_from, e.currency, e.operator, e.min_party_size, e.max_party_size, e.display_order
from properties p, (values
  ('Peninsula Helicopter Tour', 'Breathtaking aerial views of the Mornington Peninsula coastline, vineyards, and Port Phillip Bay.', '/images/experiences/helicopter.jpg', 'Adventure', '{}', '{}', 'available', 395, 'AUD', 'Peninsula Air Tours', 1, 4, 0),
  ('Private Chef — Estate Dinner', 'A Michelin-trained chef prepares a bespoke multi-course dinner using seasonal Peninsula produce, served in your estate.', '/images/experiences/private-chef.jpg', 'Dining', '{}', '{}', 'on_request', 220, 'AUD', 'Luxe Table Co.', 4, 16, 1),
  ('Peninsula Hot Springs — Private Bathing', 'Exclusive private bathing session at Peninsula Hot Springs, with geothermal mineral waters and panoramic views.', '/images/experiences/hot-springs.jpg', 'Wellness', '{}', '{"hen_party"}', 'available', 130, 'AUD', 'Peninsula Hot Springs', 2, 8, 2),
  ('Studio & Co — Ceramics Workshop', 'Hands-on wheel-throwing and hand-building session with Peninsula ceramicists, followed by wine and local cheese.', '/images/experiences/ceramics.jpg', 'Arts & Culture', '{}', '{"hen_party","birthday"}', 'booked_out', 95, 'AUD', 'Studio & Co Mornington', 2, 10, 3)
) as e(title, description, image_url, category, suitable_for, restrictions, availability, price_from, currency, operator, min_party_size, max_party_size, display_order)
where p.slug = 'sorrento-ridge';

insert into house_manual_sections (property_id, title, content, icon, display_order)
select p.id, s.title, s.content, s.icon, s.display_order
from properties p, (values
  ('Wi-Fi', 'Network: SorrentoRidge5G\nPassword: Sorrento2025\n\nA second network (SorrentoRidge2G) is available for older devices.', 'wifi', 0),
  ('Check-out', 'Check-out is by 10am. Please strip beds and leave linen in the laundry. Place all rubbish in the bins provided. Lock all doors and leave keys on the kitchen bench.', 'door-open', 1),
  ('Check-in', 'Check-in from 3pm. The key lockbox is beside the front door — your access code was sent with your booking confirmation. Help yourself to the welcome hamper in the fridge.', 'key', 2),
  ('Heating & Cooling', 'Ducted reverse-cycle air conditioning throughout. Main control panel is in the hallway. The fireplace in the living room is available — kindling and logs are in the basket beside it.', 'thermometer', 3),
  ('Appliances', 'The kitchen features a Miele induction cooktop, steam oven, and dishwasher. The Nespresso machine takes Vertuo pods — a starter pack is in the cupboard above.', 'zap', 4),
  ('Pool & Spa', 'Heated pool and spa are available year-round. Pool temperature is set to 28°C. Please shower before entering and do not use glassware in the pool area.', 'waves', 5),
  ('Parking', 'The electric gate opens with code 4821. Up to four cars can park in the driveway. Street parking is also available on Ridge Road.', 'car', 6),
  ('Bin Night', 'General waste (red lid) and recycling (yellow lid): Tuesday night. Green waste (green lid): every second Tuesday.', 'trash-2', 7),
  ('House Rules', 'No smoking indoors. No pets. Quiet hours 10pm–8am (Council requirement). Maximum occupancy 10 guests overnight.', 'clipboard-list', 8),
  ('Troubleshooting', 'Wi-Fi down: restart the modem in the study (30s). Dishwasher not starting: check the child lock button. For anything else, contact Sarah on 0412 345 678.', 'wrench', 9),
  ('Local Essentials', 'Nearest supermarket: Woolworths Sorrento (5 min drive). Nearest pharmacy: Sorrento Pharmacy on Ocean Beach Rd. Nearest hospital: Frankston Hospital (35 min).', 'map-pin', 10),
  ('Emergency Contacts', 'Emergency services: 000\nProperty manager: Sarah Collins — 0412 345 678\nMornington Peninsula Shire after-hours: 1300 850 600', 'phone', 11)
) as s(title, content, icon, display_order)
where p.slug = 'sorrento-ridge';
