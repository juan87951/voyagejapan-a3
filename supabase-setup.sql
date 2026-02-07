-- Run this in Supabase SQL Editor (https://supabase.com/dashboard → your project → SQL Editor)

create table inquiries (
  id bigint generated always as identity primary key,
  created_at timestamptz default now(),
  name text not null,
  email text not null,
  passport text not null,
  phone text,
  country text not null,
  preferred_cruise text,
  cabin_class text,
  guest_count text,
  message text
);

-- Allow inserts from the anonymous key (public form submissions)
alter table inquiries enable row level security;

create policy "Allow public inserts" on inquiries
  for insert
  with check (true);

-- Only authenticated users (you via dashboard) can read
create policy "Allow authenticated reads" on inquiries
  for select
  using (auth.role() = 'authenticated');
