# 依頼（スプライト第2弾）：主人公の「歩く絵」（4方向×4コマ）（ChatGPT 向け）

**【依頼前】2026-10-12** 依頼元：Claude（判断397）。フィールドを歩く主人公が、立ち姿の1枚の絵を、跳ねさせたりかたむけたりしているだけで、**直立不動のまま滑っているように見える**。動きでごまかすのではなく、**ほんとうに足を出して歩く絵**に差しかえたい。

## 背景

- 主人公は、前・後ろ・左・右の4方向の立ち姿（`img/adventure/travelers/<名前>.png`。1254×1254・透明・2×2。左上＝前、右上＝後ろ、左下＝左、右下＝右）で出ている。参考画像として渡す。
- 見た目は14種類（小学生用12人＝`e1`〜`e12`、中学生用の姿のちがう2人＝`j4`・`j6`）。
- 今回は、**上下左右の4方向**の歩く絵を作る。ななめ向きの歩く絵は、この絵がOKになってから、別に頼む（第3弾）。

## 作るもの（1人につき1枚のシート）

**4列×4行（16コマ）。1コマ 512×512 px、シート全体 2048×2048 px、背景は透明（アルファ付き PNG）。**

- **行（上から）**：1行目＝前向き（画面の下へ歩く）／2行目＝後ろ向き（上へ歩く）／3行目＝左向き（左へ歩く）／4行目＝右向き（右へ歩く）。
- **列（左から）＝歩きの4コマ**（1歩＝2コマ、左右で4コマ。くり返して、歩きの輪になる）：
  1. **右足が前**（右足が前に出て、かかとが着く。左足は後ろ）
  2. **通過**（片足で立ち、もう片方の足が、体の下を通る。体が少し高くなる）
  3. **左足が前**（左足が前に出る。右足は後ろ）
  4. **通過**（2とは、逆の足が通る）
- 腕は、足と逆に振る（右足が前なら、左腕が前）。ただし、ゆれを小さく。マフラー・髪・マントは、歩く向きと反対へ、なびいてもよいが、わずか。
- 左向きと右向きは、足の前後・腕の振りが、正しく見えること（左向きの「右足が前」は、画面の左側が前）。
- 歩き方は、元気に歩く（走らない）。**足の開きは、体の高さの約25%まで**（開きすぎない）。

## 追記（2026-10-12。e1 を実機で見て）

- **横向き（左・右）の足を、はっきり開閉する**。e1 の左向きの行は、4コマとも足の幅がほぼ同じで、足が動いて見えなかった。右向きの行のように、接地のコマは足を前後に開き（人物高の約25%）、通過のコマは足を閉じて片足を持ち上げる、という差を、**左向きの行でも、はっきり**つける。
- 前向き・後ろ向きの行も、通過のコマと接地のコマで、足の見え方（上下のずれ）に、はっきり差をつける。

## 絵のきまり

1. **同じ人物**：髪型・髪色・服・マフラー・靴・持ち物は、参考のシートと、まったく同じ。16コマで、顔や服がぶれないこと。ぶれたら、再生成。
2. **画風**：参考のシートと同じ（ちびキャラ調の、あたたかいアニメ風。線のあるイラスト）。影・床・地面・背景・文字・透かしは入れない。
3. **大きさと位置（いちばん大事）**：
   - 頭の先から、**立っているほうの足の裏**までの高さは、**16コマすべてで同じ**（約400px。512pxの枠の中）。
   - **足の裏の位置（地面の高さ）は、16コマすべてで同じ**（枠の下から約40pxの線）。通過のコマでも、地面の足は、その線に着く。
   - 体の中心（左右）は、各コマの、枠の中心の線に合わせる。足の出しで体が前後に動かないこと（歩きの動きは、足と腕だけ）。
   - 頭の高さは、歩きで、上下に、**最大8px**だけ動かしてよい（通過のコマが、いちばん高い）。
4. **枠からはみ出さない**：足・腕・マフラーが、512×512の枠の外へ出ない。隣のコマに、かぶらない。
5. **ゲーム内の大きさ**：画面では、1コマが約70〜80pxで出る。**小さくしても、足の出し方が、はっきり見える**こと（足の幅は、広めに、太めの線で）。

## ファイル名と置き場所

- `img/adventure/travelers/<名前>-w.png`（例：`e1-w.png`、`j4-w.png`。**2048×2048・透明**）。14枚＝ `e1`〜`e12`・`j4`・`j6`。
- **最初に `e1-w.png` を1枚だけ作る**。Claude が、人物のぶれ・足の位置・歩きの見え方を確認して、OKが出てから、残りの13枚を作る。
- 1枚で16コマがぶれるときは、**1行（4コマ。2048×512）ずつ4回に分けて作って、並べてもよい**（その場合も、同じ人物・同じ大きさ・同じ足の裏の高さ）。

## プロンプトの例（e1。ほかの人は、見た目の説明を差しかえる）

> Using the attached character sheet (front / back / left / right standing views of the same chibi adventurer) as the exact reference, draw the SAME character as a walk-cycle sprite sheet: one 2048×2048 transparent PNG, 4 columns × 4 rows, each cell 512×512. Rows top to bottom: walking toward the camera (front view), walking away (back view), walking to the viewer's left (side view), walking to the viewer's right (side view). Columns left to right: (1) contact pose, right foot forward; (2) passing pose, one foot lifted passing under the body, body slightly higher; (3) contact pose, left foot forward; (4) passing pose with the other foot. Arms swing opposite to the legs, small swing. Keep the identical hairstyle, colors, outfit, scarf, boots and gear in all 16 frames. Same art style, line weight and proportions as the reference. Head-to-sole height is identical in every frame (about 400px), and the ground-contact line of the standing foot is at the same height in every cell (about 40px above the cell bottom); character centered horizontally in each cell; nothing crosses the cell borders. Transparent background, no ground, no shadow, no text, no watermark. Energetic but calm walking, stride not wider than 25% of body height.

## 受け取ったあと（Claude）

1. `tests/tools/normalize-diag-sprite.py` と同じ要領で、足の裏の線・高さ・中心を自動で整える（判断372）。WebP に変換し、`img/adventure/travelers/<名前>-w.webp` に置く。
2. Canvas（`js/ui/adventure-canvas.js` の `drawHero`）：歩くとき、歩いた道のり（1マス＝歩き1周＝4コマ）で、列を選んで描く。止まったら、2コマ目（通過）か、立ち姿の絵。跳ね・かたむきの動きは、歩く絵があるときはやめる。CSS の表示（HD-2D・平面）も、同じ列の選び方に。
3. 先読み（`js/svg/adventure-world.js` の `preload`）に足す。歩く絵が届いていない人は、これまでどおり。
4. `tests/ui-canvas-field.cjs` に、歩く絵が出ることの確認を足す。
5. 使ったプロンプトを `HAND_SPRITES.md` に残す。
