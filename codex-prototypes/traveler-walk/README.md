# e1 歩行シート・確認用の1枚

`SPRITE_REQUESTS_2.md`（依頼書確認コミット `3fc83d2531b89d7f5c8e13a9f114324dc03e9344`）に基づくe1だけの候補です。残りの13人は未作成です。ゲームへの組込み、WebP化、Canvas/CSSの変更、先読み変更はしていません。

- 画像：`img/adventure/travelers/e1-w.png`
- 参考：`img/adventure/travelers/e1.png`（blob `8ec220727dbed75ec299f2a00b93036eb592181c`）
- 2048×2048、RGBA透明PNG、4列×4行。1コマ512×512。
- 行：前／後ろ／左／右。列：右足接地／通過／左足接地／逆足通過。
- 生成した4方向の行を切り出し・サイズ調整・位置合わせして1枚へ組み立てました。1コマの不透明領域の高さ400px、最下部の足の基準472px（下から40px）。腰付近の色領域を使って左右位置を合わせています。
- `qa/results.json` はalpha>20で測った枠内範囲・高さ・接地位置の確認結果です。骨格・左右の足・腕の連動・人物の一致は目視で確認してください。

`review.html` は160px／80pxでの4方向のループと、停止・コマ送りの確認用ページです。チェック柄やラベルは確認ページだけに表示し、画像本体には含みません。

## 生成の指示と修正

画像生成ツールに原本e1.pngを渡し、同じ髪、色、衣装、斜めの肩ベルト、腰のポーチ、紫のマフラー、靴、輪郭線を維持するよう指示しました。最初の16コマ一括生成では通過姿勢が弱かったため、依頼書で許可された1行4コマを4方向分生成する方法に変更しました。

使用指示の要旨：

> Exactly four whole-body sprites in one horizontal transparent walk strip. Same e1 as the reference, no redesigned costume, shadow, floor, labels or grid. Four chronological poses: anatomical RIGHT foot contact, passing on RIGHT support, anatomical LEFT foot contact, passing on LEFT support. In passing poses the lifted boot passes underneath the upright centered torso. Arms swing gently opposite the legs. Keep scale and supporting-foot ground line stable. Generate front, back, left profile and right profile as separate strips. Front view buckle begins at viewer-left shoulder and pouch is on viewer-left hip; maintain each reference view's outfit and asymmetry.

横向きの行はさらに、接地コマの足首間を人物高の20〜25%以下にする短い歩幅へ修正するよう画像生成ツールに依頼しました。絵の内容の生成・修正は画像生成ツールで行い、その後にシート形式の切り出し・リサイズ・配置を整えています。

## Claude Codeの確認

人物の一致、足の出し方、通過コマ、4コマを繰り返したときの自然さを確認してください。承認前に残り13人や本編へ展開しないでください。承認後の変換・組込みは依頼書の「受け取ったあと（Claude）」に従って進める想定です。
