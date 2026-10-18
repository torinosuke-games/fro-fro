#!/usr/bin/env python3
"""ふりがなの辞書（js/furigana-words.js）と漢字の学年表（js/kanji-grades.js）を作る（判断482）。

使い方（ゲームの動作には要らない。辞書を作り直したいときだけ）：
  python3 -m venv /tmp/kv && /tmp/kv/bin/pip install fugashi unidic-lite jamdict-data
  /tmp/kv/bin/python tests/tools/build-furigana.py

- 漢字の学年：KANJIDIC2（jamdict-data）の grade。1〜6＝小学校、8＝常用漢字のうち中学校で習う分（学年表では 7 にする）。
- 読み：MeCab（unidic-lite）で、ゲームの中の文字列を単語に切り、単語ごとに読みを付ける（同じ単語は、いちばん多い読み）。
  すでに js/texts.js などの辞書にある語は、読み込み順で先に入るので、そちらが優先される。
"""
import re, sys, glob, json, sqlite3, collections, os

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
KANJI = re.compile(r'[一-鿿々]')

# ---- 漢字の学年表 ----
def build_grades():
    db = glob.glob(sys.prefix + '/lib/python3*/site-packages/jamdict_data/jamdict.db')[0]
    c = sqlite3.connect(db)
    g = collections.defaultdict(list)
    for lit, gr in c.execute('select literal, cast(grade as integer) from character where grade is not null'):
        if gr in (1, 2, 3, 4, 5, 6): g[gr].append(lit)
        elif gr == 8: g[7].append(lit)
    lines = ['// 漢字の学年表（判断482。tests/tools/build-furigana.py で作る。1〜6＝小学校で習う学年、7＝常用漢字のうち中学校で習う分）',
             '(function (root) {', '  root.FF = root.FF || {};', '  root.FF.KANJI_GRADES = {']
    for k in sorted(g): lines.append("    %d: '%s'%s" % (k, ''.join(sorted(g[k])), ',' if k < max(g) else ''))
    lines += ['  };', '})(this);', '']
    open(os.path.join(ROOT, 'js/kanji-grades.js'), 'w').write('\n'.join(lines))
    print('grades', {k: len(v) for k, v in g.items()})

# ---- ふりがなの辞書 ----
def literals():
    files = glob.glob(ROOT + '/js/**/*.js', recursive=True) + glob.glob(ROOT + '/questions/*.js')
    rx = re.compile(r"'((?:[^'\\\n]|\\.)*)'|\"((?:[^\"\\\n]|\\.)*)\"|`((?:[^`\\]|\\.)*)`")
    for f in files:
        if f.endswith('furigana-words.js') or f.endswith('kanji-grades.js') or 'japan-map' in f: continue
        for m in rx.finditer(open(f, encoding='utf-8').read()):
            s = m.group(1) or m.group(2) or m.group(3) or ''
            if KANJI.search(s): yield s

def kata2hira(s): return ''.join(chr(ord(ch) - 0x60) if 'ァ' <= ch <= 'ヶ' else ch for ch in s)

def align(surface, reading):
    """surface（漢字かな交じり）と読み（ひらがな）を合わせて、漢字の連なりごとに読みを返す"""
    parts = re.findall(r'[一-鿿々]+|[^一-鿿々]+', surface)
    rx = '^' + ''.join('(.+?)' if KANJI.match(p) else re.escape(kata2hira(p)) for p in parts) + '$'
    m = re.match(rx, reading)
    if not m: return None
    it = iter(m.groups()); out = ''
    for p in parts:
        out += '{%s|%s}' % (p, next(it)) if KANJI.match(p) else p
    return out

def build_words():
    import fugashi
    tg = fugashi.Tagger()
    votes = collections.defaultdict(collections.Counter)
    for s in literals():
        s = s.replace('\\n', ' ')
        s = re.sub(r'\{([^{}|]*)\|[^{}]*\}', r'\1', s)       # {漢字|よみ} は漢字だけにする
        s = re.sub(r'\{[^{}]*\}', ' ', s)                       # {name} などの変数は消す
        for w in tg(s):
            if not KANJI.search(w.surface): continue
            kana = w.feature.kana
            if not kana or kana == '*': continue
            a = align(w.surface, kata2hira(kana))
            if a: votes[w.surface][a] += 1
    words = {k: v.most_common(1)[0][0] for k, v in votes.items()}
    # 学校の勉強でふつうの読みに直す（MeCab は「にっぽん」にする）
    words['日本'] = '{日本|にほん}'
    lines = ['// ふりがなの辞書の追加分（判断482。tests/tools/build-furigana.py で作る。MeCab の読み）。',
             '// 読み込み順は js/texts.js などの後。すでにある語は上書きしない（手で直した読みが優先）。',
             '(function (root) {', '  var add = {']
    items = sorted(words.items())
    for i, (k, v) in enumerate(items):
        lines.append('    %s: %s%s' % (json.dumps(k, ensure_ascii=False), json.dumps(v, ensure_ascii=False), ',' if i < len(items) - 1 else ''))
    lines += ['  };', '  root.FF = root.FF || {};', '  root.FF.FURIGANA = root.FF.FURIGANA || {};',
              '  Object.keys(add).forEach(function (k) { if (!root.FF.FURIGANA[k]) root.FF.FURIGANA[k] = add[k]; });', '})(this);', '']
    open(os.path.join(ROOT, 'js/furigana-words.js'), 'w').write('\n'.join(lines))
    print('words', len(words))

if __name__ == '__main__':
    build_grades(); build_words()
