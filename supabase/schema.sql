-- FROZEN FRONTIER のデータ保存（SPEC_sync.md・判断299）
-- Supabase の SQL Editor に、このファイル全体を貼って Run する。何度実行してもよい（作り直しではなく補う形）。
-- テーブルは anon から直接は読み書きできない。公開するのは、引き継ぎキー（key）を確かめる関数（ff_*）だけ。
-- key は端末で SHA-256(引き継ぎコード) を16進にした 64 文字。サーバーはさらにその指紋（key_hash）だけを持つ。

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

-- ---- 公開する関数 ----

-- 新しい利用者を作る。同じ key があれば失敗。
create or replace function public.ff_create_profile(p_key text) returns jsonb
language plpgsql security definer set search_path = public as $fn$
begin
  if p_key is null or p_key !~ '^[0-9a-f]{64}$' then
    return jsonb_build_object('ok', false, 'error', 'bad_key');
  end if;
  insert into profiles (key_hash) values (encode(sha256(convert_to(p_key, 'utf8')), 'hex'));
  return jsonb_build_object('ok', true);
exception when unique_violation then
  return jsonb_build_object('ok', false, 'error', 'exists');
end $fn$;

-- セーブを読む。まだ保存がなければ rev 0・save_json null。
create or replace function public.ff_pull(p_key text) returns jsonb
language plpgsql security definer set search_path = public as $fn$
declare pid uuid; s saves;
begin
  pid := ff_profile_id(p_key);
  if pid is null then return jsonb_build_object('ok', false, 'error', 'not_found'); end if;
  update profiles set last_seen_at = now() where profile_id = pid;
  select * into s from saves where profile_id = pid;
  if not found then
    return jsonb_build_object('ok', true, 'rev', 0, 'save_json', null);
  end if;
  return jsonb_build_object('ok', true, 'rev', s.rev, 'save_json', s.save_json,
                            'updated_at', s.updated_at, 'device_id', s.device_id);
end $fn$;

-- セーブを書く。p_base_rev がサーバーの rev と同じときだけ更新（rev+1）。違えば conflict で、サーバーの内容を返す。
create or replace function public.ff_push_save(p_key text, p_base_rev integer, p_save jsonb, p_device text)
returns jsonb
language plpgsql security definer set search_path = public as $fn$
declare pid uuid; s saves;
begin
  pid := ff_profile_id(p_key);
  if pid is null then return jsonb_build_object('ok', false, 'error', 'not_found'); end if;
  if p_save is null or jsonb_typeof(p_save) <> 'object' or length(p_save::text) > 2000000 then
    return jsonb_build_object('ok', false, 'error', 'bad_save');
  end if;
  select * into s from saves where profile_id = pid for update;
  if not found then
    if coalesce(p_base_rev, 0) <> 0 then
      return jsonb_build_object('ok', false, 'error', 'conflict', 'rev', 0, 'save_json', null);
    end if;
    insert into saves (profile_id, rev, save_json, device_id) values (pid, 1, p_save, left(p_device, 64));
    return jsonb_build_object('ok', true, 'rev', 1);
  end if;
  if s.rev <> coalesce(p_base_rev, -1) then
    return jsonb_build_object('ok', false, 'error', 'conflict', 'rev', s.rev, 'save_json', s.save_json,
                              'updated_at', s.updated_at, 'device_id', s.device_id);
  end if;
  update saves set rev = s.rev + 1, save_json = p_save, updated_at = now(), device_id = left(p_device, 64)
    where profile_id = pid;
  update profiles set last_seen_at = now() where profile_id = pid;
  return jsonb_build_object('ok', true, 'rev', s.rev + 1);
end $fn$;

-- 学習の履歴をまとめて追加（1回 200 件まで）。同じ attempt_id は無視（再送しても二重にならない）。
create or replace function public.ff_push_attempts(p_key text, p_rows jsonb) returns jsonb
language plpgsql security definer set search_path = public as $fn$
declare pid uuid; n integer;
begin
  pid := ff_profile_id(p_key);
  if pid is null then return jsonb_build_object('ok', false, 'error', 'not_found'); end if;
  if p_rows is null or jsonb_typeof(p_rows) <> 'array' or jsonb_array_length(p_rows) > 200 then
    return jsonb_build_object('ok', false, 'error', 'bad_rows');
  end if;
  insert into attempts (profile_id, attempt_id, at, qid, subject, grade, difficulty, type, correct,
                        attempts, hints, resource, reward, points, device_id)
  select pid, r.attempt_id, r.at, r.qid, r.subject, r.grade, r.difficulty, r.type, r.correct,
         r.attempts, r.hints, r.resource, r.reward, r.points, left(r.device_id, 64)
  from jsonb_to_recordset(p_rows) as r(
    attempt_id text, at bigint, qid text, subject text, grade integer, difficulty integer, type text,
    correct boolean, attempts integer, hints integer, resource text, reward integer, points integer,
    device_id text)
  where r.attempt_id is not null and r.qid is not null and r.at is not null and r.correct is not null
  on conflict (profile_id, attempt_id) do nothing;
  get diagnostics n = row_count;
  update profiles set last_seen_at = now() where profile_id = pid;
  return jsonb_build_object('ok', true, 'inserted', n);
exception when others then
  return jsonb_build_object('ok', false, 'error', 'bad_rows');
end $fn$;

-- 履歴を読む（保護者の記録画面用）。p_since より後（at > p_since）を古い順に、最大 p_limit（上限 1000）件。
create or replace function public.ff_read_attempts(p_key text, p_since bigint, p_limit integer) returns jsonb
language plpgsql security definer set search_path = public as $fn$
declare pid uuid; v_rows jsonb;
begin
  pid := ff_profile_id(p_key);
  if pid is null then return jsonb_build_object('ok', false, 'error', 'not_found'); end if;
  select coalesce(jsonb_agg(to_jsonb(t) order by t.at, t.attempt_id), '[]'::jsonb) into v_rows from (
    select attempt_id, at, qid, subject, grade, difficulty, type, correct, attempts, hints,
           resource, reward, points, device_id
    from attempts
    where profile_id = pid and at > coalesce(p_since, 0)
    order by at, attempt_id
    limit least(greatest(coalesce(p_limit, 500), 1), 1000)
  ) t;
  return jsonb_build_object('ok', true, 'rows', v_rows);
end $fn$;

-- その利用者のデータをすべて消す
create or replace function public.ff_delete_profile(p_key text) returns jsonb
language plpgsql security definer set search_path = public as $fn$
declare pid uuid;
begin
  pid := ff_profile_id(p_key);
  if pid is null then return jsonb_build_object('ok', false, 'error', 'not_found'); end if;
  delete from profiles where profile_id = pid;   -- saves・attempts は on delete cascade
  return jsonb_build_object('ok', true);
end $fn$;

-- 実行権限：関数だけを anon に公開する（内部の ff_profile_id は公開しない）
revoke all on function public.ff_profile_id(text) from public, anon, authenticated;
revoke all on function public.ff_create_profile(text)                         from public;
revoke all on function public.ff_pull(text)                                   from public;
revoke all on function public.ff_push_save(text, integer, jsonb, text)        from public;
revoke all on function public.ff_push_attempts(text, jsonb)                   from public;
revoke all on function public.ff_read_attempts(text, bigint, integer)         from public;
revoke all on function public.ff_delete_profile(text)                         from public;
grant execute on function public.ff_create_profile(text)                      to anon;
grant execute on function public.ff_pull(text)                                to anon;
grant execute on function public.ff_push_save(text, integer, jsonb, text)     to anon;
grant execute on function public.ff_push_attempts(text, jsonb)                to anon;
grant execute on function public.ff_read_attempts(text, bigint, integer)      to anon;
grant execute on function public.ff_delete_profile(text)                      to anon;
