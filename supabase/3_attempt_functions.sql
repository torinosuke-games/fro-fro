-- FROZEN FRONTIER のデータ保存（SPEC_sync.md・判断299）。3/4：学習の履歴・削除
-- Supabase の SQL Editor で、1→2→3→4 の順に、1つずつ貼って Run する（何度実行してもよい）。

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

