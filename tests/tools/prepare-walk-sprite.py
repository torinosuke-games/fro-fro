#!/usr/bin/env python3
"""歩く絵（<名前>-w.png。2048×2048・4列×4行）を、ゲーム用の WebP にする（判断401）。小さなゴミ（150画素未満の孤立した点）を取り除く。
使い方：python3 tests/tools/prepare-walk-sprite.py img/adventure/travelers/e3-w.png img/adventure/travelers/e3-w.webp"""
import sys
from collections import deque
import numpy as np
from PIL import Image
src, dst = sys.argv[1], sys.argv[2]
a = np.array(Image.open(src).convert('RGBA'))
al = a[:, :, 3] > 8
H, W = al.shape
seen = np.zeros_like(al)
ys, xs = np.nonzero(al)
removed = 0
for y, x in zip(ys, xs):
    if seen[y, x]:
        continue
    q = deque([(y, x)]); seen[y, x] = True; comp = []
    while q:
        cy, cx = q.popleft(); comp.append((cy, cx))
        for dy in (-1, 0, 1):
            for dx in (-1, 0, 1):
                ny, nx = cy + dy, cx + dx
                if 0 <= ny < H and 0 <= nx < W and al[ny, nx] and not seen[ny, nx]:
                    seen[ny, nx] = True; q.append((ny, nx))
    if len(comp) < 150:
        for cy, cx in comp:
            a[cy, cx] = 0
        removed += 1
Image.fromarray(a).save(dst, quality=92, method=6)
print('removed specks:', removed)
