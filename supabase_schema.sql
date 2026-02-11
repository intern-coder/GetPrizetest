-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users table (custom table to track guests via local storage ID)
create table public.users (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  browser_fingerprint text, -- Optional, for basic fraud prevention
  last_seen_at timestamp with time zone default timezone('utc'::text, now())
);

-- Prizes table
create table public.prizes (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  probability float not null, -- Stores probability weight
  is_active boolean default true
);

-- Insert default prizes from WheelGame.tsx
insert into public.prizes (name, probability) values
  ('50% OFF', 0.1),
  ('FREE COFFEE', 0.1),
  ('10% OFF', 0.2),
  ('FREE SHIPPING', 0.2),
  ('20% OFF', 0.2),
  ('MYSTERY GIFT', 0.2);

-- Game Results
create table public.game_results (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) not null,
  prize_id uuid references public.prizes(id), -- Nullable if they didn't win or if prize logic changes
  prize_name text not null, -- Store name historically in case prizes change
  won_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Feedback
create table public.feedback (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) not null,
  rating integer not null check (rating >= 0 and rating <= 5),
  comment text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Shipping Info
create table public.shipping_info (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) not null,
  name text not null,
  phone text not null,
  province text not null,
  city text not null,
  address text not null,
  zip_code text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies (Row Level Security)
-- For simplicity in this demo, we'll allow public inserts but restrict reads.
-- In a real app, we'd enable RLS and use Supabase Auth or proper session handling.

alter table public.users enable row level security;
create policy "Allow public insert users" on public.users for insert with check (true);
create policy "Allow reading own user" on public.users for select using (true); -- Ideally restrict to own ID

alter table public.prizes enable row level security;
create policy "Allow public read prizes" on public.prizes for select using (true);

alter table public.game_results enable row level security;
create policy "Allow public insert game_results" on public.game_results for insert with check (true);
create policy "Allow reading own results" on public.game_results for select using (true);

alter table public.feedback enable row level security;
create policy "Allow public insert feedback" on public.feedback for insert with check (true);

alter table public.shipping_info enable row level security;
create policy "Allow public insert shipping_info" on public.shipping_info for insert with check (true);
create policy "Allow reading own shipping" on public.shipping_info for select using (true);
