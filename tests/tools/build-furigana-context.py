#!/usr/bin/env python3
"""文脈でふりがなの読みを直す表（js/furigana-context.js）を作る（判断484）。

辞書は1文字ずつ読みを決めるので、「体の温度」の「体」が「たい」になるなど、文脈で読みが変わる語を誤る。
そこで、全文を MeCab で読み、辞書の読みとちがう1文字の語のうち、MeCab の読みが正しいと確かめた組（APPROVED）だけ、
その文字列に限って読みを差しかえた「文字列→ふりがな付きの文字列」の表を作る（実行時は、この表にある文字列を先に使う）。

使い方：
  node tests/tools/dump-markups.cjs /tmp/markups.json
  /tmp/kv/bin/python tests/tools/build-furigana-context.py /tmp/markups.json
（/tmp/kv は build-furigana.py と同じ venv。fugashi・unidic-lite が要る）
"""
import json, re, sys, os, fugashi
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
K = re.compile(r'[一-鿿々]')
# (漢字, 辞書の読み, MeCab の読み)：人が確かめて、MeCab の読みが正しい組
APPROVED = {('方','ほう','かた'),('体','たい','からだ'),('二','に','ふた'),('言','ゆ','い'),('車','しゃ','くるま'),('底','てい','そこ'),
  ('星','ほし','せい'),('三','みっ','さん'),('所','しょ','ところ'),('歩','ある','ほ'),('池','ち','いけ'),('水','みず','すい'),
  ('薬','やく','くすり'),('者','しゃ','もの'),('帯','おび','たい'),('場','じょう','ば'),('湖','みずうみ','こ'),('紙','かみ','し'),
  ('手','て','しゅ'),('月','つき','がつ')}
def k2h(s): return ''.join(chr(ord(c)-0x60) if 'ァ'<=c<='ヶ' else c for c in s)
def align(surface, reading):
    parts = re.findall(r'[一-鿿々]+|[^一-鿿々]+', surface)
    m = re.match('^' + ''.join('(.+?)' if K.match(p) else re.escape(k2h(p)) for p in parts) + '$', reading)
    if not m: return None
    it = iter(m.groups()); res = []; pos = 0
    for p in parts:
        if K.match(p): res.append((pos, pos+len(p), next(it)))
        pos += len(p)
    return res
tg = fugashi.Tagger(); out = {}
for tpl, mk in json.load(open(sys.argv[1] if len(sys.argv) > 1 else '/tmp/markups.json')):
    parts = re.split(r'(\{[^{}]*\})', mk); plain = ''; groups = []
    for idx, part in enumerate(parts):
        mm = re.fullmatch(r'\{([^{}|]*)\|([^{}]*)\}', part)
        if mm: groups.append((len(plain), len(plain)+len(mm.group(1)), mm.group(1), mm.group(2), idx)); plain += mm.group(1)
        elif part.startswith('{'): plain += ' ' * len(part)
        else: plain += part
    spans = []; pos = 0
    for w in tg(plain):
        s = plain.find(w.surface, pos)
        if s < 0: continue
        pos = s + len(w.surface)
        if K.search(w.surface) and w.feature.kana and w.feature.kana != '*':
            a = align(w.surface, k2h(w.feature.kana))
            if a: spans += [(s+x, s+y, r) for (x, y, r) in a]
    changed = False
    for (gs, ge, base, rd, idx) in groups:
        if len(base) != 1 or not rd: continue
        hit = [sp for sp in spans if sp[0] == gs and sp[1] == ge]
        if hit and (base, rd, hit[0][2]) in APPROVED:
            parts[idx] = '{%s|%s}' % (base, hit[0][2]); changed = True
    if changed: out[tpl] = ''.join(parts)
lines = ['// 文脈でふりがなの読みを直した文字列の表（判断484。tests/tools/build-furigana-context.py で作る）。',
         '// 辞書引きの結果（autoRubyMarkup）より先に、この表の文字列を使う。',
         '(function (root) {', '  root.FF = root.FF || {};', '  root.FF.FURIGANA_CONTEXT = {']
items = sorted(out.items())
for i, (k, v) in enumerate(items):
    lines.append('    %s: %s%s' % (json.dumps(k, ensure_ascii=False), json.dumps(v, ensure_ascii=False), ',' if i < len(items)-1 else ''))
lines += ['  };', '})(this);', '']
open(os.path.join(ROOT, 'js/furigana-context.js'), 'w').write('\n'.join(lines))
print('context strings', len(out))
