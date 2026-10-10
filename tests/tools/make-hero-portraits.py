#!/usr/bin/env python3
"""主人公の顔の絵（img/art/avatar-<id>.jpg）から、仲間の絵と同じくらいの顔の大きさの、正方形の切り取り（img/art/portrait-<id>.webp）を作る（判断378）。
表の値は、(顔の中心の横位置, 髪・帽子の上の端, あごの位置)。どれも、画像全体を 1 とした割合。切り取りの高さ ＝ 頭の高さ ÷ 0.66（頭が、絵の高さの約3分の2）。"""
from PIL import Image
import os
HEADS = {
    'e1': (.50, .02, .40), 'e10': (.48, .02, .38), 'e11': (.50, .03, .42), 'e12': (.50, .02, .45), 'e2': (.50, .03, .45), 'e3': (.50, .03, .49),
    'e4': (.50, .02, .47), 'e5': (.50, .03, .45), 'e6': (.48, .03, .50), 'e7': (.50, .03, .48), 'e8': (.50, .03, .47), 'e9': (.45, .09, .42),
    'j1': (.50, .02, .40), 'j10': (.50, .02, .38), 'j11': (.50, .02, .42), 'j12': (.45, .02, .42), 'j2': (.52, .02, .45), 'j3': (.50, .02, .45),
    'j4': (.50, .07, .47), 'j5': (.47, .02, .43), 'j6': (.47, .02, .48), 'j7': (.47, .03, .45), 'j8': (.45, .07, .47), 'j9': (.47, .02, .50),
}
RATIO = 0.66
SRC = os.path.join(os.path.dirname(__file__), '..', '..', 'img', 'art')
for name, (cx, top, chin) in HEADS.items():
    im = Image.open(os.path.join(SRC, 'avatar-%s.jpg' % name)).convert('RGB')
    w = im.width
    s = min(1.0, (chin - top) / RATIO)
    x0 = min(max(0, cx - s / 2), 1 - s)
    y0 = min(max(0, top - 0.07 * s), 1 - s)
    box = tuple(round(v * w) for v in (x0, y0, x0 + s, y0 + s))
    out = im.crop(box).resize((300, 300), Image.LANCZOS)
    path = os.path.join(SRC, 'portrait-%s.webp' % name)
    out.save(path, 'WEBP', quality=84, method=6)
    print(name, box, os.path.getsize(path))
