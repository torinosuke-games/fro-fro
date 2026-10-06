-- FROZEN FRONTIER のデータ保存（SPEC_sync.md・判断299）。4/4：関数の実行権限（かならず 1〜3 のあとに）
-- Supabase の SQL Editor で、1→2→3→4 の順に、1つずつ貼って Run する（何度実行してもよい）。

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
