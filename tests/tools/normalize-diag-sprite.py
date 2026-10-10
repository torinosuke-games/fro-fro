#!/usr/bin/env python3
"""ななめ向きのスプライトのシート（2×2。<名前>-d.png）を、元のシート（前・後ろ・左・右）の大きさ・足の位置にそろえて、WebP にする（判断372）。
使い方：python3 tests/tools/normalize-diag-sprite.py img/adventure/travelers/e1-d.png img/adventure/travelers/e1.png img/adventure/travelers/e1-d.webp
元のシートの4方向の、人物の高さの平均と、足の裏の位置の平均に、ななめの4方向を合わせる（高さ・足の位置が違うと、向きが変わるたびに、キャラが跳ねて見える）。"""
import sys
import numpy as np
from PIL import Image

CELL = 627


def cells(im):
    return [im.crop((x, y, x + CELL, y + CELL)) for y in (0, CELL) for x in (0, CELL)]


def bbox(cell):
    a = np.array(cell)[:, :, 3] > 20
    ys, xs = np.where(a)
    return xs.min(), ys.min(), xs.max() + 1, ys.max() + 1


def main(diag_path, ref_path, out_path):
    ref = Image.open(ref_path).convert('RGBA')
    diag = Image.open(diag_path).convert('RGBA')
    assert ref.size == diag.size == (CELL * 2, CELL * 2), (ref.size, diag.size)
    rb = [bbox(c) for c in cells(ref)]
    target_h = sum(b[3] - b[1] for b in rb) / 4
    target_bottom = sum(b[3] for b in rb) / 4
    out = Image.new('RGBA', diag.size, (0, 0, 0, 0))
    for i, c in enumerate(cells(diag)):
        x0, y0, x1, y1 = bbox(c)
        crop = c.crop((x0, y0, x1, y1))
        s = target_h / (y1 - y0)
        crop = crop.resize((max(1, round((x1 - x0) * s)), round(target_h)), Image.LANCZOS)
        px = round(CELL / 2 - crop.width / 2)
        py = round(target_bottom - crop.height)
        cell = Image.new('RGBA', (CELL, CELL), (0, 0, 0, 0))
        cell.paste(crop, (px, py), crop)
        out.paste(cell, ((i % 2) * CELL, (i // 2) * CELL))
    out.save(out_path, 'WEBP', quality=82, method=6)
    print('height %.0f bottom %.0f -> %s (%d bytes)' % (target_h, target_bottom, out_path, len(open(out_path, 'rb').read())))


if __name__ == '__main__':
    main(*sys.argv[1:4])
