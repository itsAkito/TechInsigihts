-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role VARCHAR(20) DEFAULT 'user', -- 'user' or 'admin'
  created_at TIMESTAMP DEFAULT NOW()
);

-- Example: enforce only 'user' or 'admin'
ALTER TABLE users
  ADD CONSTRAINT role_check CHECK (role IN ('user', 'admin'));

-- Profiles table
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default now()
);

-- Posts table (needed for polls)
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text,
  created_by uuid references profiles(id),
  created_at timestamp with time zone default now()
);

-- Quizzes table (needed for quiz_comments)
create table if not exists public.quizzes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  created_by uuid references profiles(id),
  created_at timestamp with time zone default now()
);

-- Generic comments table
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  entity_id uuid not null,          -- ID of the post, quiz, or poll
  entity_type text not null check (entity_type in ('post', 'quiz', 'poll')),
  user_id uuid references profiles(id) on delete cascade,
  content text not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Polls
create table if not exists public.polls (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references posts(id) on delete cascade,
  question text not null,
  created_by uuid references profiles(id),
  created_at timestamp with time zone default now()
);

-- Poll options
create table if not exists public.poll_options (
  id uuid primary key default gen_random_uuid(),
  poll_id uuid references polls(id) on delete cascade,
  option_text text not null
);

-- Poll votes
create table if not exists public.poll_votes (
  id uuid primary key default gen_random_uuid(),
  poll_id uuid references polls(id) on delete cascade,
  option_id uuid references poll_options(id),
  user_id uuid references profiles(id),
  created_at timestamp with time zone default now(),
  unique (poll_id, user_id) -- one vote per user per poll
);

-- Quiz comments
create table if not exists public.quiz_comments (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid references quizzes(id) on delete cascade,
  user_id uuid references profiles(id),
  content text not null,
  created_at timestamp with time zone default now()
);

-- Poll comments
create table if not exists public.poll_comments (
  id uuid primary key default gen_random_uuid(),
  poll_id uuid references polls(id) on delete cascade,
  user_id uuid references profiles(id),
  content text not null,
  created_at timestamp with time zone default now()
);