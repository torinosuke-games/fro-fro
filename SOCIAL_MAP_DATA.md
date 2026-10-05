# 社会図の地理データ

PR #38のコメント5987134861・5987146967・5987165836への対応。

- 海岸線と琵琶湖は [Natural Earth 1:10m physical land / lakes](https://www.naturalearthdata.com/downloads/10m-physical-vectors/10m-land/) の静的データ。行政境界や領有権を表す図ではない。[利用条件はpublic domain](https://www.naturalearthdata.com/about/terms-of-use/)。
- 原データは [natural-earth-vector](https://github.com/nvkelso/natural-earth-vector/tree/ca96624a56bd078437bca8184e78163e5039ad19/geojson) のrevision ca96624a56bd078437bca8184e78163e5039ad19、ne_10m_land.geojson / ne_10m_lakes.geojson。
- 外周の全頂点が経度122〜150・緯度23〜46に入るPolygonを選び、経度128未満・緯度30超の島（朝鮮半島側）は除く。Ramer–Douglas–Peucker法を許容0.015度で適用し、経緯度を小数4桁に丸めた。小島で4頂点未満になる場合は原周の3点と閉点を残す。328輪郭・2957頂点。元の全頂点から簡略化した線分まで測った最大距離は約0.020317度。琵琶湖は元の64頂点を維持。
- 本州・北海道・四国・九州に加え、佐渡・淡路・対馬・五島・隠岐・伊豆大島・種子島・屋久島・奄美大島・宮古島・石垣島・国後島・択捉島などを含む。島名はゲームには表示しない。
- js/japan-map.jsをconfig.jsの直後に読み込む。通信・fetch・ES Modules・外部ライブラリをゲームに追加せず、file://でも動く。
- 地域の切り出しでは陸の塗りをなくし、元の海岸線だけを線分クリップして描く。切断端を海岸線や白い四角にしない。湖は別輪郭、川は幅5、海岸線は幅1.5。

## 位置の確認

独立した参照は [国土地理院 地名集日本2021](https://www.gsi.go.jp/common/000238259.pdf)。度・分を経度・緯度へ変換した33点をtests/fixtures/social-map-landmarks.jsonに記録した。PDFのページと参照座標を残し、地名はQA画像にだけ出す。地名集の位置は地名の注記位置で、測量による海岸頂点そのものではない。

- 岬14点は海岸線から0.1度以内（実測最大約0.014167度）。
- 都市4点と国東半島は陸上。13島は別々の輪郭に対応し、注記位置が海側になる対馬も最寄り海岸が0.1度以内。湖の参照位置は琵琶湖内。関門海峡を海として残す。
- 問題の印は中心が陸上にあることを検査する。prefecture_022の北海道の印は札幌付近141.35,43.06へ直し、海側へのずれを修正。
- tests/ui-social-map-geography.cjsは全図1枚と地域図13枚に参照座標の十字を重ねる。これは検証専用で、実際の問題の図には十字・名前・座標を加えない。
- tests/ui-hand-diagrams-soc4.cjsは70問×360・390・768・1024px、文字・図形の見切れと横はみ出しを検査。川の実SVG、港の分離、山の数、屋根や段々畑を描かないこと、地域図の塗りなしも保護する。
