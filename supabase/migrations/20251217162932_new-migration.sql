create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  entity_id uuid not null,          -- ID of the post, quiz, or poll
  entity_type text not null check (entity_type in ('post', 'quiz', 'poll')),
  user_id uuid references profiles(id) on delete cascade,
  content text not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);