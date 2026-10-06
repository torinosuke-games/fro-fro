#!/usr/bin/env bash
# Supabase の無料プランは、しばらく使われないと一時停止する。定期的にデータベースを1回呼んで、止まらないようにする（判断309）。
# 呼ぶのは、公開してある関数 ff_pull を、存在しない（でたらめな）鍵で呼ぶだけ：データの読み書きはしない（not_found が返る）。
# 接続先と公開用（anon）キーは js/config.js から読む（環境変数 FF_SUPABASE_URL・FF_SUPABASE_ANON_KEY で上書きできる＝テスト用）。
set -euo pipefail
cd "$(dirname "$0")/../.."

pick() { sed -n "s/^[[:space:]]*$1: '\\([^']*\\)'.*/\\1/p" js/config.js | head -n 1; }
URL="${FF_SUPABASE_URL:-$(pick URL)}"
KEY="${FF_SUPABASE_ANON_KEY:-$(pick ANON_KEY)}"
if [ -z "$URL" ] || [ -z "$KEY" ]; then echo "接続先か anon キーを js/config.js から読めませんでした" >&2; exit 2; fi

OUT="$(mktemp)"
trap 'rm -f "$OUT"' EXIT
DUMMY="$(printf '0%.0s' $(seq 1 64))"   # 形だけ正しい（16進64文字）、存在しない鍵
for attempt in 1 2 3; do
  code=0
  : > "$OUT"   # 前の回の返事を残さない
  body="$(curl -sS -m 30 -o "$OUT" -w '%{http_code}' -X POST "${URL%/}/rest/v1/rpc/ff_pull" \
    -H "apikey: $KEY" -H "Authorization: Bearer $KEY" -H 'Content-Type: application/json' \
    -d "{\"p_key\":\"$DUMMY\"}")" || code=$?
  if [ "$code" = 0 ] && [ "$body" = 200 ] && grep -q '"ok"' "$OUT"; then
    echo "OK：Supabase に届きました（HTTP $body）。$(date -u +%Y-%m-%dT%H:%M:%SZ)"
    exit 0
  fi
  echo "失敗（$attempt 回目）：curl=$code HTTP=${body:-なし}" >&2
  [ -s "$OUT" ] && head -c 300 "$OUT" >&2 && echo >&2
  sleep $((attempt * 5))
done
echo "Supabase に届きませんでした。プロジェクトが一時停止している可能性があります（ダッシュボードで Restore してください）。" >&2
exit 1
