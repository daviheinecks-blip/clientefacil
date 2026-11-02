-- Execute no SQL Editor do seu projeto Supabase.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  plan text not null default 'free' check (plan in ('free','pro','premium')),
  subscription_status text not null default 'free',
  created_at timestamptz not null default now()
);

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  name text not null,
  email text,
  phone text,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.reminders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  customer_id uuid references public.customers(id) on delete set null,
  title text not null,
  due_at timestamptz not null,
  completed boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.sales (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  customer_id uuid references public.customers(id) on delete set null,
  description text,
  amount numeric(12,2) not null check (amount >= 0),
  created_at timestamptz not null default now()
);

create index if not exists customers_user_id_idx on public.customers(user_id);
create index if not exists reminders_user_due_idx on public.reminders(user_id,due_at);
create index if not exists sales_user_created_idx on public.sales(user_id,created_at);

alter table public.profiles enable row level security;
alter table public.customers enable row level security;
alter table public.reminders enable row level security;
alter table public.sales enable row level security;

create policy "profiles_select_own" on public.profiles for select using (auth.uid()=id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid()=id) with check (auth.uid()=id);
create policy "customers_select_own" on public.customers for select using (auth.uid()=user_id);
create policy "customers_insert_own" on public.customers for insert with check (auth.uid()=user_id);
create policy "customers_update_own" on public.customers for update using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "customers_delete_own" on public.customers for delete using (auth.uid()=user_id);
create policy "reminders_select_own" on public.reminders for select using (auth.uid()=user_id);
create policy "reminders_insert_own" on public.reminders for insert with check (auth.uid()=user_id);
create policy "reminders_update_own" on public.reminders for update using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "reminders_delete_own" on public.reminders for delete using (auth.uid()=user_id);
create policy "sales_select_own" on public.sales for select using (auth.uid()=user_id);
create policy "sales_insert_own" on public.sales for insert with check (auth.uid()=user_id);
create policy "sales_update_own" on public.sales for update using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "sales_delete_own" on public.sales for delete using (auth.uid()=user_id);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path=public as $$
begin
  insert into public.profiles(id,full_name) values(new.id,new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute procedure public.handle_new_user();
