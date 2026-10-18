-- FROZEN FRONTIER のデータ保存（判断477）。5/5：一時停止の対策の「書き込み」の合図（1〜4 のあとに）
-- Supabase の SQL Editor で、そのまま貼って Run する（何度実行してもよい）。
-- 背景：読むだけの呼び出し（ff_pull）を3日に1回行っていたが、プロジェクトが一時停止した（2026-10）。
--       Supabase の人の説明では、データベースへの書き込み（INSERT・UPDATE）が、使われている印になる。そこで、1行だけの表に、時刻を書きこむ関数を、毎日呼ぶ。

create table if not exists public.ff_heartbeat (
  id      integer primary key default 1 check (id = 1),   -- 行は1つだけ
  beat_at timestamptz not null default now(),
  beats   bigint not null default 0
);
alter table public.ff_heartbeat enable row level security;   -- 方針（policy）は作らない：表には、直接さわれない。下の関数だけが書く

create or replace function public.ff_keepalive() returns jsonb
language plpgsql security definer set search_path = public as $fn$
begin
  insert into ff_heartbeat (id, beat_at, beats) values (1, now(), 1)
  on conflict (id) do update set beat_at = now(), beats = ff_heartbeat.beats + 1;
  return jsonb_build_object('ok', true, 'at', now());
end $fn$;

revoke all on function public.ff_keepalive() from public;
grant execute on function public.ff_keepalive() to anon;
