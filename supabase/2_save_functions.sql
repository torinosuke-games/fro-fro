-- FROZEN FRONTIER のデータ保存（SPEC_sync.md・判断299）。2/4：利用者の作成・セーブの読み書き
-- Supabase の SQL Editor で、1→2→3→4 の順に、1つずつ貼って Run する（何度実行してもよい）。

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

