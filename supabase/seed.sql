-- supabase/seed.sql

-- 🔹 Таблиця користувачів
create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  email text unique,
  created_at timestamptz default now()
);

-- 🔹 Профілі
create table if not exists public.profiles (
  user_id uuid references public.users(id) on delete cascade,
  username text,
  avatar_url text,
  bio text,
  primary key (user_id)
);

-- 🔹 Обʼєкти
create table if not exists public.objects (
  id uuid primary key default gen_random_uuid(),
  slug text unique,
  title text,
  description text,
  created_at timestamptz default now()
);

-- 🔹 Категорії
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique,
  label text,
  color text,
  icon text
);

-- 🔹 Теги
create table if not exists public.tags (
  id uuid primary key default gen_random_uuid(),
  name text,
  color text
);

-- 🔹 Звʼязки між обʼєктами
create table if not exists public.links (
  id uuid primary key default gen_random_uuid(),
  from_object uuid references public.objects(id),
  to_object uuid references public.objects(id),
  type text,
  created_at timestamptz default now()
);

-- 🔹 Таблиці звʼязків
create table if not exists public.object_category (
  object_id uuid references public.objects(id),
  category_id uuid references public.categories(id),
  primary key (object_id, category_id)
);

create table if not exists public.object_tag (
  object_id uuid references public.objects(id),
  tag_id uuid references public.tags(id),
  primary key (object_id, tag_id)
);

-- 🔹 Event лог (історія взаємодій)
create table if not exists public.event_log (
  id uuid primary key default gen_random_uuid(),
  object_id uuid references public.objects(id),
  event_type text,
  payload jsonb,
  created_at timestamptz default now()
);