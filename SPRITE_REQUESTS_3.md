# 依頼（スプライト第3弾）：主人公の「ななめ向きの歩く絵」（4方向×4コマ）（ChatGPT 向け）

**【依頼前】2026-10-12** 依頼元：Claude（判断400）。第2弾（上下左右の歩く絵。`SPRITE_REQUESTS_2.md`）で、e1 は歩くようになった。**ななめに歩くときだけ、ほんものの歩く絵がない**ので、いまは前向き・後ろ向きの行を反転して使っている。すべての方向で、歩く姿を完成させたい。

## 背景

- ななめ向きの**立ち姿**は、すでにある（`img/adventure/travelers/<名前>-d.png`。1254×1254・透明・2×2。左上＝左前、右上＝右前、左下＝左後ろ、右下＝右後ろ）。**これを、向きの参考にする。**
- 上下左右の歩く絵は、`img/adventure/travelers/e1-w.png`（2048×2048。4列×4行。列＝歩きの4コマ、行＝前・後ろ・左・右）。**この歩きの形（足の出し方・腕の振り・通過のコマ・大きさ・足の裏の線）と、そろえる。**
- 見た目は14種類（`e1`〜`e12`・`j4`・`j6`）。

## 作るもの（1人につき1枚のシート）

**4列×4行（16コマ）。1コマ 512×512 px、シート全体 2048×2048 px、背景は透明（アルファ付き PNG）。**（`<名前>-w.png` と同じ形）

- **行（上から）**：1行目＝**左前**（画面の左下へ歩く。顔・体が、手前の左を向く）／2行目＝**右前**（右下へ歩く）／3行目＝**左後ろ**（左上へ歩く。奥の左へ。顔はほぼ見えない）／4行目＝**右後ろ**（右上へ歩く）。（`<名前>-d.png` の、左上・右上・左下・右下と同じ順）
- **列（左から）＝歩きの4コマ**（`<名前>-w.png` と同じ）：1. 右足が前（接地）／2. 通過（片足で立ち、もう片方の足が体の下を通る。体が少し高い）／3. 左足が前（接地）／4. 逆の足の通過。
- 腕は足と逆に、小さく振る。マフラー・髪は、歩く向きと反対へ、わずかになびく。
- 歩幅は、**接地のコマで、足を前後にはっきり開く**（人物高の約25%）。**通過のコマは、足を閉じて、片足を持ち上げる。接地と通過の差を、はっきり**つける（第2弾の e1 の左向きの行は、4コマとも足の幅が同じで、足が動いて見えなかった。**ななめ4方向すべてで、足が動いて見える**こと）。
- 向きは、真横と真正面・真後ろの**ちょうど中間（45度）**。4行で、角度が同じ。

## 絵のきまり（第2弾と同じ）

1. **同じ人物**：髪型・髪色・服・マフラー・靴・持ち物は、参考のシートと同じ。16コマで、ぶれない。
2. **画風**：参考と同じ（ちびキャラ調の、あたたかいアニメ風。線のあるイラスト）。影・床・地面・背景・文字・透かしは入れない。
3. **大きさと位置（いちばん大事）**：頭の先から、立っているほうの足の裏までの高さは、**16コマで同じ**（約400px）。足の裏の線は、**16コマで同じ高さ**（枠の下から約40px）。体の中心は枠の中心。頭の上下は最大8px。**第2弾の `<名前>-w.png` の 16コマと、高さ・足の線・横幅の見え方が、同じ**になること（向きが変わるたびに、キャラが大きくなったり跳ねたりしない）。
4. 足・腕・マフラーが、512×512 の枠の外へ出ない。隣のコマにかぶらない。
5. ゲーム内では、1コマが約70〜80px。小さくしても、足の出し方がはっきり見えること。

## ファイル名と置き場所

- `img/adventure/travelers/<名前>-wd.png`（例：`e1-wd.png`。**2048×2048・透明**）。14枚。
- **最初に `e1-wd.png` を1枚だけ作る**。Claude が確認して、OKが出てから、残りを作る。
- 参考画像：`e1.png`（上下左右の立ち姿）、`e1-d.png`（ななめの立ち姿）、`e1-w.png`（上下左右の歩く絵）の3枚を渡す。
- 1枚でぶれるときは、**1行（4コマ。2048×512）ずつ4回**に分けて、並べてもよい。

## プロンプトの例（e1。ほかの人は、見た目の説明を差しかえる）

> Using the attached references — (1) e1.png: standing views, (2) e1-d.png: standing views at 45° diagonals (top-left = front-left, top-right = front-right, bottom-left = back-left, bottom-right = back-right), (3) e1-w.png: the walk-cycle sheet for the four cardinal directions — draw the SAME character as a diagonal walk-cycle sprite sheet: one 2048×2048 transparent PNG, 4 columns × 4 rows, each cell 512×512. Rows top to bottom: walking toward the camera and to the viewer's left (front-left, 45°), front-right, walking away to the left (back-left), back-right. Columns left to right: (1) contact pose, right foot forward; (2) passing pose, one foot lifted passing under the body, body slightly higher; (3) contact pose, left foot forward; (4) passing pose with the other foot. Arms swing opposite to the legs. In the contact poses the feet are clearly apart front-to-back (about 25% of body height); in the passing poses the feet are together and one boot is lifted — the difference between contact and passing frames must be clearly visible in all four rows. Keep the identical hairstyle, colors, outfit, scarf, boots and gear in all 16 frames, the same art style and proportions, and exactly the same head-to-sole height (about 400px), ground-contact line (about 40px above each cell's bottom), and horizontal centering as e1-w.png. Transparent background, no ground, no shadow, no text, no watermark, nothing crossing the cell borders.

## 受け取ったあと（Claude）

1. `<名前>-wd.webp` にして置く。`FF.adventureScene.travelerWalkDiag(avatar)` と先読みに足す。
2. Canvas（`drawHero`）：ななめに歩くとき、`<名前>-wd.webp` の、向き（`face`）に合う行を使う（いまの、前向き・後ろ向きの反転は、やめる）。歩調・大きさは、上下左右と同じ。
3. `tests/ui-canvas-field.cjs` に、確認を足す。使ったプロンプトを `HAND_SPRITES.md` に残す。

## 順番（全体）

1. 第2弾：e1（取り込み済み）→ 横向きの足の開閉を直した上で、残り13人。
2. 第3弾（この依頼）：e1 を1枚 → OKなら、残り13人。
3. 2つがそろった人から、順に、歩く絵に切りかわる。そろっていない人は、これまでどおり。
