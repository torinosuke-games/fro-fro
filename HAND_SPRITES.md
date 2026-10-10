# ななめ向きスプライトの制作記録

2026-10-10：依頼の第1枚、e1 のみ制作。残り13枚とゲームへの組み込みは行わない。

- 依頼：`claude/diag-sprite-request` の `SPRITE_REQUESTS_1.md`（302701e90b4403c2e502aef3f1e091466733ccf1）。「絵のきまり」「足の位置」を確認。
- 作業ブランチ：`codex/diag-sprites`。基点は main の dbf393f12703707e323c945a6dfbc0eff812351e。
- 参考画像：`img/adventure/travelers/e1.png`。4回ともこの元絵を画像生成ツールに渡した。修正時は直前の生成画像も渡した。
- 出力：`img/adventure/travelers/e1-d.png`。左上＝左前、右上＝右前、左下＝左後ろ、右下＝右後ろ。
- 変更はこの記録と出力PNGのみ。既存の絵・コード・依頼書・ほかの文書は変更しない。WebPへの変換はClaude側で行う。

## 大きさ・位置についての判断

元絵の実測では、各枠の足下の余白は3 / 8 / 19 / 18px（左上・右上・左下・右下。アルファ32超で計測）で、依頼書の「枠の下から約10%」＝約63pxとは一致しない。元絵の人物の高さは607 / 602 / 598 / 598px。

今回は依頼書の約10%の余白を優先した。最終画像は全4方向とも頭の上端が枠内y=30、足先の下端がy=563、人物の高さ534px、足下余白63px。元絵より人物が約11〜12%小さい。元絵と同じ見かけの大きさを厳密に優先する場合は、この余白指定との調整が必要。

生成だけでは上段と下段の位置が正確にそろわなかったため、最終の生成絵をSharpで各627×627枠に分け、人物全体を等比拡縮・平行移動して配置を正規化した（人物の描き替え・左右反転なし）。アルファ32超の外接矩形に2pxの縁を加え、538pxの高さへLanczos3で等比拡縮。最下部40pxにある靴の左右端の中点を枠のx=313へ合わせ、枠内y=28に配置。1254×1254の完全透明キャンバスに4枠を合成し、RGBA PNGを可逆圧縮で保存した。

## 検証・気になる点

- 1254×1254、アルファ付きPNG。各627×627枠の四辺はすべてアルファ0で、透明な余白を確認。床・落ち影・文字・区切り線なし。
- 全4方向の上端・足先・高さを数値で確認。靴は枠の下約30%に収まり、中央線の両側に見える。
- ファイルは1,350,272bytes（約1.35MB）。色数を減らす圧縮はしていない。
- 人物の黒髪・茶色の目・紫のマフラーとマント・革装備・靴を維持。ポーチと紫の髪の差し色が反対側に複製されていた初期生成を修正した。
- 元絵との細かな差：髪の束、服のしわ、マントの広がり、革の縫い目や金具は新規描画なので完全一致ではない。輪郭の一部にごく薄い色にじみがある。人物の大きさの差は上記の余白指定によるもの。
- ゲームへの組み込み・歩行アニメーションの動作検証は未実施。画像の目視とPNG・アルファ・配置の検査のみ。ゲームコードのテストは、この画像だけの変更では実行しない。

## 実際に使ったプロンプト

### 1. 初回生成（参考：元絵 e1.png）

初回は前向き2方向の左右が逆で、足下の余白も不足したため不採用。

```text
Create ONE precise production sprite sheet for the game FROZEN FRONTIER, using the attached e1.png four-view sheet as the exact character identity and illustration-style reference. This is the SAME young chibi adventurer, not a new design. Output a transparent RGBA PNG sheet, square 1254 x 1254 pixels, consisting of four equal 627 x 627 cells, without drawing any grid lines.

Required layout and orientations, exactly:
TOP LEFT: front-left / southwest, character faces toward the viewer AND toward screen-left, exactly halfway (45 degrees) between the reference front and left profile.
TOP RIGHT: front-right / southeast, character faces toward the viewer AND toward screen-right, exactly halfway (45 degrees) between front and right profile.
BOTTOM LEFT: back-left / northwest, character faces AWAY from the viewer AND toward screen-left, exactly halfway (45 degrees) between the reference back and left profile.
BOTTOM RIGHT: back-right / northeast, character faces AWAY from the viewer AND toward screen-right, exactly halfway (45 degrees) between back and right profile.
The bottom two are genuinely rear three-quarter views: see the back of the head, back of the vest and flowing purple cape, with almost no face visible. Do not reuse front three-quarter faces in the bottom row. Rotate the whole body, head and feet consistently in the indicated direction. Do NOT merely tilt the front or back drawing sideways. Keep every figure upright.

Identity details copied faithfully from reference: tousled short spiky black hair with soft gray highlights and a small purple tuft at the temple; warm brown eyes and friendly young face; sleeveless dark brown leather vest over a cream cloth wrap; diagonal leather chest straps with metal buckles; purple scarf wrapping the neck and its long slightly ragged cape/scarf tails falling behind; black upper-arm bands; dark leather wrist bracers and fingerless gloves; brown belt with silver buckles and small brown hip pouch in the same anatomical location as in reference (character's RIGHT hip), not randomly mirrored; charcoal baggy trousers; torn cream cloth strips at the waist; dark brown mid-calf boots with the same two buckled straps. Preserve the same colors, clothing construction, proportions, line weight, warm detailed anime/chibi shading and material rendering. No new accessories, no redesign, no hat or sword. Rear cape and asymmetrical gear must follow the actual body rotation, not arbitrary mirroring.

All four poses are neutral STANDING poses, ready to move, NOT mid-stride. Knees relaxed, arms comfortably lowered; both boots clearly visible and naturally a little separated, with the left boot and right boot on opposite sides of each cell's vertical centerline so they can be animated separately. Do not overlap the boots or spread the legs into a walking step. The feet point with the body. Boots stay in the lowest 30 percent of the cell, below local y=439, with the soles at local y approximately 564 (about 63 pixels / 10 percent of the cell kept clear below the boots). Top of hair around local y=24, full head-to-sole height about 540 pixels. These coordinates apply independently within each of the four 627 x 627 cells. Keep all four figures precisely the same head size, overall height, centered body at local x=313, and aligned sole height. The source sheet has less bottom margin than the written request; intentionally follow the request's 10 percent bottom margin while preserving identical character proportions. Cape ends should stop above the sole and leave both boots unobscured. Keep each figure entirely inside its own cell. No fragments or shapes crossing between cells.

Background must be genuinely TRANSPARENT, including the spaces between the figures and below their feet. Character internal painted shading is fine, but NO cast shadows, ground shadows, oval base, floor, environment, background color, fake checkerboard, glow, lettering, labels, arrows, frames, grid lines, text, logo or watermark. Four clean isolated characters only.
```

### 2. 向きと余白の修正（参考：初回生成＋元絵）

方向は修正できたが、上段と下段で高さ・足位置が違ったため再調整。

```text
Revise the attached diagonal sheet (first image), keeping the same boy as the original cardinal sheet (second image). Correct the TOP ROW directions: the TOP-LEFT figure MUST face screen LEFT and toward the viewer: nose and boot toes point down-left / southwest. Currently its nose points right; that is wrong. The TOP-RIGHT figure MUST face screen RIGHT and toward the viewer: nose and toes point down-right / southeast. Currently its nose points left; that is wrong. Swap the two front three-quarter poses into their proper left/right cells, preserving the character's anatomical right-hip pouch and asymmetric hair, not simply mirroring the accessories. Bottom-left must continue facing screen LEFT and away (northwest); bottom-right must continue facing screen RIGHT and away (northeast). Four real upright 45-degree body rotations, not tilted frontal bodies. Keep the same spiky black hair with purple tuft, brown eyes, purple scarf and ragged cape, brown sleeveless leather vest, straps, right-hip pouch, dark gloves and trousers, cream waist cloth, buckled brown boots as the original. Both boots visible, standing relaxed, each foot on its own side of the cell's vertical centerline; no mid-stride gait. NO floor, NO cast shadow, NO text, NO grid, truly transparent alpha PNG. Exactly one 2x2 square sheet. ALL four figures must have a consistent smaller size with sufficient clear margins: within EACH square cell, top of hair at about 4% of cell height, boot soles at 90% (leave 10% clear below the feet). Height from hair to sole about 86% of each cell, centered body at 50% width, boots entirely in lower 30% of cell. Previous output did NOT respect that bottom margin: add the required 10% TRANSPARENT empty space under the feet in EVERY cell, not only the lower row. Target output 1254x1254 pixels, each cell 627x627. Preserve the exact reference linework and warm detailed chibi/anime style.
```

### 3. 大きさと配置の調整（参考：2回目の生成＋元絵）

この生成絵を等比拡縮・平行移動して各枠の足位置を正規化し、次の細部修正の参考画像にした。

```text
Edit the attached diagonal sprite sheet only to correct inconsistent sizing and cell placement; use the second image, original e1.png, for unchanged character details. Keep the four correct view directions: top-left faces southwest (left and toward viewer), top-right southeast (right and toward viewer), bottom-left northwest (left and away), bottom-right northeast (right and away). Keep the same recognizable black-haired chibi boy and all his clothes. The bottom row is already at the correct scale and vertical position. The top row is TOO LARGE and its boots touch the dividing line. FIX THIS: make each TOP ROW boy the same height as each BOTTOM ROW boy, about 534 pixels from hair to sole; translate them UP so that within each 627x627 quadrant the hair begins at local y=28 and the lowest boot sole ends at local y=561. Both row pairs should have identical relative positions. Leave the BOTTOM ROW height and sole position unchanged (local hair y=28, soles y=561). Leave about 65 fully transparent pixels under the boots in EVERY quadrant; particularly the top row must have 65 transparent pixels BEFORE the halfway line at sheet y=627. Do not crop boots. Center the TORSO and the midpoint BETWEEN BOTH BOOTS on local x=313 in each quadrant; do not center the total cape silhouette. Both boots should remain naturally separated to opposite sides of the centerline, entirely in the lowest 30 percent. Neutral standing stance, not walking. Keep the reference brown RIGHT-hip pouch on the character's same anatomical right side across all rotations (do not create a duplicate pouch on the opposite hip); keep asymmetrical hair details corresponding to the reference. Return a single 1254x1254 RGBA PNG sheet, transparent background, no shadow/ground/text/frame/grid. Preserve fine anime linework and colors. These are sizing/placement corrections, do not redesign the character.
```

### 4. 片側の装備・髪の差し色を修正（参考：正規化した3回目の生成＋元絵）

最終採用。生成後、上記と同じ配置の正規化を行って納品PNGにした。

```text
Make a very small fidelity correction to the FIRST attached finished diagonal sheet, using the SECOND attached original e1.png as the character reference. Do not redesign the boy. Preserve the correct 2x2 direction order and transparent background. The original boy has ONE hip pouch on his anatomical RIGHT hip and purple accent hair on his RIGHT temple. These are not mirrored accessories. The current TOP-RIGHT and BOTTOM-RIGHT poses already show the correct near-side pouch and purple hair accent; leave those right-column drawings unchanged. The LEFT COLUMN currently incorrectly mirrors these details onto the boy's left side. In TOP-LEFT, remove the prominent pouch at the viewer-right side of his waist; the actual right-hip pouch is mostly hidden on the far side from this southwest three-quarter angle. Remove the purple accent at the visible viewer-right temple; that is the wrong anatomical side, keep visible near-side hair black. In BOTTOM-LEFT, remove the prominent pouch on the viewer-left side of his waist; the right-hip pouch is obscured on the other side by his cape at this northwest rear three-quarter angle. Remove the purple hair patch on the visible viewer-left side of the rear head; the right-temple accent is mostly hidden on the far side. These are tiny removals of incorrectly mirrored details, not adding a second pouch. Leave all other clothing, brown vest and straps, gloves, dark trousers, cream waist strips, purple scarf/cape and boots as they are. All four neutral standing bodies keep the same sizes and centering: each cell 627x627, hair top about y=30, lowest boot sole y=564, both feet separated across x=313, transparent bottom margin ~62 pixels. Full sheet exactly 1254x1254 RGBA PNG. No background, ground, cast shadows, lettering, labels, grid or watermark.
```
