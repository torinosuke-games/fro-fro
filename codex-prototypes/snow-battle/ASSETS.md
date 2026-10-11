# 画像の出典と軽量化

## 新しく生成した画像

- `arena-source.png`：昼の雪山の峠、青緑の針葉樹、古い石のアーチ、空いた雪の前景。描画済みジオラマ風背景。画像生成ツールで作成。
- `party-source.png`：4人を透明背景の横一列で生成。既存の主人公 `img/adventure/travelers/e1.webp`、重装兵 `img/adventure/allies/juushouhei-el.webp`、白魔道士 `img/adventure/allies/shiromadoushi-el.webp`、剣士 `img/adventure/allies/kenshi-el.webp` を人物の髪色・衣装の参考に使用。服と役割が分かる戦闘姿勢を指定。

生成元は評価用に保存し、画面ではリサイズ・WebP化した `arena.webp` と4人の個別画像を使用します。ゲーム向けの切り出し・形式変換はsharpで実施しました。

## 既存画像の再利用

`enemy.webp` はリポジトリの `img/adventure/snow-enemies.webp` から氷の獣を切り出し、縮小したものです。原本を変更せず、このフォルダーに複製しました。フィールド試作の画像は参照していません。

## ランタイム

背景＋4人＋敵の6枚のWebPは合計417,400 bytes（約408 KiB）。外部フォント、常時アニメーション、生成元PNGの読み込みはありません。コード・HTML・CSSを含む容量は `qa/delivery.json` に記録します。PNGはZIP配布に含めません。

画像生成結果には細部の不整合があり得るため、正式採用時は既存キャラクターの設定との一致をClaude Code側で確認してください。
