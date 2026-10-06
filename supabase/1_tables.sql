-- FROZEN FRONTIER のデータ保存（SPEC_sync.md・判断299）。1/4：テーブルと権限、内部の部品
-- Supabase の SQL Editor で、1→2→3→4 の順に、1つずつ貼って Run する（何度実行してもよい）。

create table if not exists public.profiles (
  profile_id   uuid primary key default gen_random_uuid(),
  key_hash     text not null unique,
  created_at   timestamptz not null default now(),
  last_seen_at timestamptz not null default now()
);

create table if not exists public.saves (
  profile_id uuid primary key references public.profiles(profile_id) on delete cascade,
  rev        integer not null default 0,
  save_json  jsonb not null,
  updated_at timestamptz not null default now(),
  device_id  text
);

create table if not exists public.attempts (
  profile_id uuid not null references public.profiles(profile_id) on delete cascade,
  attempt_id text not null,
  at         bigint not null,
  qid        text not null,
  subject    text,
  grade      integer,
  difficulty integer,
  type       text,
  correct    boolean not null,
  attempts   integer,
  hints      integer,
  resource   text,
  reward     integer,
  points     integer,
  device_id  text,
  primary key (profile_id, attempt_id)
);
create index if not exists attempts_profile_at on public.attempts (profile_id, at);

-- 直接の読み書きを禁止（RLS を有効にし、ポリシーは作らない。権限も外す）
alter table public.profiles enable row level security;
alter table public.saves    enable row level security;
alter table public.attempts enable row level security;
revoke all on public.profiles, public.saves, public.attempts from anon, authenticated;

-- ---- 内部の部品 ----
-- key の形（16進 64 文字）を確かめて、利用者の ID を返す。なければ null。
create or replace function public.ff_profile_id(p_key text) returns uuid
language plpgsql security definer set search_path = public as $fn$
declare v uuid;
begin
  if p_key is null or p_key !~ '^[0-9a-f]{64}$' then return null; end if;
  select profile_id into v from profiles
    where key_hash = encode(sha256(convert_to(p_key, 'utf8')), 'hex');
  return v;
end $fn$;

