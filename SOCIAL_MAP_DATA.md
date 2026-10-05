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

## 第11弾：地方の境界と地域図の拡大

- 原海岸線328輪郭・2957頂点は変更しない。能登半島の色は、本州の輪郭の連続した32頂点と閉点から作る。西岸136.7606,36.8706から東岸136.9877,36.871まで半島の先端側を取り出し、付け根はこの2点を直線で結ぶ。土地のclipPathも同じ海岸線から作るので、海を塗らない。
- 地方の境界の原データは [Natural Earth 1:10m Admin 1 – States, Provinces](https://www.naturalearthdata.com/downloads/10m-cultural-vectors/10m-admin-1-states-provinces/)（[public domain](https://www.naturalearthdata.com/about/terms-of-use/)）。[GeoJSONの固定revision ca96624a56bd078437bca8184e78163e5039ad19](https://github.com/nvkelso/natural-earth-vector/blob/ca96624a56bd078437bca8184e78163e5039ad19/geojson/ne_10m_admin_1_states_provinces.geojson)、blob SHA 4a8438f98ac7dfec7dc1739b1eaf91398ad33f22。
- 日本の47都道府県（iso_3166_2 JP-01〜47）を、北海道／東北（02〜07）／関東（08〜14）／中部（15〜23）／近畿（24〜30）／中国・四国（31〜39）／九州（40〜47）に分類。7地方の区分は [札幌市教育委員会の教材](https://www.city.sapporo.jp/kyoiku/shido/documents/1_6_2_31.pdf) と同じ。ゲームには地方名・県名を描かない。
- 原境界の端点を小数6桁で比較し、両側の県が別の地方に属する共有辺476本だけを選ぶ。端点をつないで5本の境界線に整理し、Ramer–Douglas–Peucker法の許容0.005度で簡略化、小数4桁へ丸めた199頂点をregionBoundariesへ静的に同梱。県内・同地方内の県境や、海を横断する架空の境界は足さない。海岸線と同じ投影・土地のclipPathを使い、細い線で描く。
- prefecture_004だけ本図を520×570のviewBoxへ広げ、boundsを128.6,30,146.3,45.7へ絞る。南西の島々は122.7,24,130,30の別枠。縮尺・位置関係が本図とは別であることをcaptionに記す。ほかの全図・地域図は従来の投影を維持する。
- 富士山の図は山の印だけ。静岡・千葉の漁港の問題は県の海岸まで拡大するが、印は従来の県の位置だけで、答えの港を打たない。
- tests/ui-social-map-geography.cjsは変更後の地域図を含む17枚に参照座標の十字を重ねる。能登の色の端には原海岸頂点5点の青い十字も重ねる。これは検証画像だけで、問題画面には出さない。社会70問と折れ線グラフの選択・入力形式を合わせた72形式×4幅も検査する。
