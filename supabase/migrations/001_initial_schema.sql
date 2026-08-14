create extension if not exists "pgcrypto";

create table properties (
  id                      uuid primary key default gen_random_uuid(),
  slug                    text not null unique,
  name                    text not null,
  host_name               text,
  host_phone              text,
  agency_name             text,
  accent_color            text,
  tier                    text not null default 'standard',
  quiet_hours_start_hour  smallint not null,
  quiet_hours_end_hour    smallint not null,
  quiet_hours_timezone    text not null default 'Australia/Melbourne',
  quiet_hours_message     text,
  checkout_time           jsonb,
  bin_night               jsonb,
  created_at              timestamptz not null default now()
);

create table experiences (
  id               uuid primary key default gen_random_uuid(),
  property_id      uuid not null references properties(id) on delete cascade,
  title            text not null,
  description      text,
  image_url        text,
  category         text not null,
  suitable_for     text[] not null default '{}',
  restrictions     text[] not null default '{}',
  availability     text not null default 'available',
  price_from       numeric,
  currency         text,
  booking_url      text,
  operator         text,
  min_notice_hours integer,
  min_party_size   integer,
  max_party_size   integer,
  operating_days   integer[],
  display_order    integer not null default 0
);

create table house_manual_sections (
  id            uuid primary key default gen_random_uuid(),
  property_id   uuid not null references properties(id) on delete cascade,
  title         text not null,
  content       text not null,
  icon          text,
  display_order integer not null default 0
);

create table agencies (
  id                 uuid primary key default gen_random_uuid(),
  name               text not null,
  stripe_customer_id text,
  created_at         timestamptz not null default now()
);

create table sms_logs (
  id          uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties(id) on delete cascade,
  guest_phone text not null,
  message     text not null,
  sent_at     timestamptz not null default now()
);

create index on experiences(property_id, display_order);
create index on house_manual_sections(property_id, display_order);

alter table properties enable row level security;
alter table experiences enable row level security;
alter table house_manual_sections enable row level security;
alter table agencies enable row level security;
alter table sms_logs enable row level security;

create policy "anon read properties"
  on properties for select to anon using (true);

create policy "anon read experiences"
  on experiences for select to anon using (true);

create policy "anon read house_manual_sections"
  on house_manual_sections for select to anon using (true);
