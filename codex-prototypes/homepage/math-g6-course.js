// 小6算数 新作100問。固定問題・図版付き。利用者レビュー待ち。
(function(root){
"use strict";
root.FF.units.DEFS.math[6]=[
  {
    "id": "symmetry",
    "name": "対称な図形",
    "description": "折り重なる線対称と、180°回して重なる点対称を区別しましょう。",
    "icon": "↔"
  },
  {
    "id": "expression",
    "name": "文字と式",
    "description": "何を文字で表したか確かめ、数量の関係を式にしましょう。",
    "icon": "x"
  },
  {
    "id": "fraction",
    "name": "分数のかけ算・わり算",
    "description": "かけ算は分子どうし・分母どうし、割り算は割る数を逆数にします。",
    "icon": "½"
  },
  {
    "id": "ratio",
    "name": "比",
    "description": "比の1つ分の大きさを求め、全体・部分・差のどれかを確かめましょう。",
    "icon": "比"
  },
  {
    "id": "scale",
    "name": "拡大図と縮図",
    "description": "対応する辺の倍率をそろえ、単位もそろえましょう。",
    "icon": "△"
  },
  {
    "id": "circle",
    "name": "円の面積・およその面積",
    "description": "円の面積は半径×半径×円周率です。直径の半分が半径です。",
    "icon": "○"
  },
  {
    "id": "volume",
    "name": "角柱と円柱の体積",
    "description": "角柱・円柱の体積は底面積×高さです。",
    "icon": "㎥"
  },
  {
    "id": "proportion",
    "name": "比例",
    "description": "比例ではy÷xが一定で、y＝決まった数×xです。",
    "icon": "↗"
  },
  {
    "id": "inverse",
    "name": "反比例",
    "description": "反比例ではx×yが一定です。",
    "icon": "↘"
  },
  {
    "id": "data",
    "name": "資料の調べ方",
    "description": "記録を小さい順に整理し、平均・中央値・{最頻値|さいひんち}を区別しましょう。",
    "icon": "▥"
  },
  {
    "id": "case",
    "name": "場合の数",
    "description": "順序を区別するか、同じものを重複して数えていないか確かめましょう。",
    "icon": "樹"
  }
];
var questions=[
  {
    "id": "math_g6_course_symmetry_001",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "symmetry",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "正方形の対称の軸は何本ありますか。",
    "answer": "4",
    "choices": [
      "4",
      "2",
      "1",
      "8"
    ],
    "hints": [
      "折り重なる線対称と、180°回して重なる点対称を区別しましょう。"
    ],
    "explanation": "辺の中点を結ぶ2本と対角線2本の、計4本です。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_symmetry_002",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "symmetry",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "正方形ではない長方形は、点対称な図形ですか。",
    "answer": "点対称である",
    "choices": [
      "点対称ではない",
      "正方形だけが点対称",
      "辺の長さだけでは決まらない",
      "点対称である"
    ],
    "hints": [
      "折り重なる線対称と、180°回して重なる点対称を区別しましょう。"
    ],
    "explanation": "対角線の交点のまわりに180°回すと、もとの図形と重なります。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_symmetry_003",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "symmetry",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "正三角形の対称の軸は何本ありますか。",
    "answer": "3",
    "choices": [
      "2",
      "6",
      "3",
      "1"
    ],
    "hints": [
      "折り重なる線対称と、180°回して重なる点対称を区別しましょう。"
    ],
    "explanation": "各頂点と向かいの辺の中点を結ぶ直線が軸となり、3本です。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_symmetry_004",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "symmetry",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "対称の軸が縦の直線x＝4です。点Aが(1,2)のとき、線対称な点はどこですか。座標は(右への位置,上への位置)です。",
    "answer": "(7,2)",
    "choices": [
      "(7,6)",
      "(7,2)",
      "(1,6)",
      "(4,2)"
    ],
    "hints": [
      "折り重なる線対称と、180°回して重なる点対称を区別しましょう。"
    ],
    "explanation": "Aは軸から左へ3離れています。対応する点は軸から右へ3なので、(7,2)です。",
    "reviewed": false,
    "collection": "course_g6_100",
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/symmetry-4.svg",
      "alt": "右が第1の座標、上が第2の座標。1目盛りは1です。",
      "caption": "右が第1の座標、上が第2の座標。1目盛りは1です。"
    }
  },
  {
    "id": "math_g6_course_symmetry_005",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "symmetry",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "点Oが(4,3)、点Aが(1,1)です。Oを中心に点対称なAの対応点はどこですか。",
    "answer": "(7,5)",
    "choices": [
      "(7,5)",
      "(5,7)",
      "(3,2)",
      "(7,1)"
    ],
    "hints": [
      "折り重なる線対称と、180°回して重なる点対称を区別しましょう。"
    ],
    "explanation": "AはOから左へ3、下へ2。反対側の右へ3、上へ2にある(7,5)です。",
    "reviewed": false,
    "collection": "course_g6_100",
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/symmetry-5.svg",
      "alt": "右が第1の座標、上が第2の座標。1目盛りは1です。",
      "caption": "右が第1の座標、上が第2の座標。1目盛りは1です。"
    }
  },
  {
    "id": "math_g6_course_symmetry_006",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "symmetry",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "正六角形を中心のまわりに180°回すとどうなりますか。",
    "answer": "もとの図形と重なる",
    "choices": [
      "1つの頂点だけ重なる",
      "辺だけ重なる",
      "重ならない",
      "もとの図形と重なる"
    ],
    "hints": [
      "折り重なる線対称と、180°回して重なる点対称を区別しましょう。"
    ],
    "explanation": "向かい合う頂点どうしが対応し、すべての辺も重なります。正六角形は点対称です。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_symmetry_007",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "symmetry",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "四角形の中から、線対称ではないが点対称な図形を選びます。どれがあてはまりますか。",
    "answer": "長方形でもひし形でもない平行四辺形",
    "choices": [
      "長方形",
      "ひし形",
      "長方形でもひし形でもない平行四辺形",
      "正方形"
    ],
    "hints": [
      "折り重なる線対称と、180°回して重なる点対称を区別しましょう。"
    ],
    "explanation": "一般の平行四辺形は対角線の交点を中心に180°で重なりますが、折り重なる対称の軸はありません。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_symmetry_008",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "symmetry",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "正五角形と正六角形について正しい説明はどれですか。",
    "answer": "どちらも線対称で、点対称なのは正六角形だけ",
    "choices": [
      "点対称なのは正五角形だけ",
      "どちらも線対称で、点対称なのは正六角形だけ",
      "どちらも点対称である",
      "線対称なのは正五角形だけ"
    ],
    "hints": [
      "折り重なる線対称と、180°回して重なる点対称を区別しましょう。"
    ],
    "explanation": "正五角形には5本、正六角形には6本の対称の軸があります。180°で頂点が対応するのは正六角形です。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_expression_001",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "expression",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "1本x円の鉛筆を5本買う代金を式で表すとどれですか。",
    "answer": "5×x",
    "choices": [
      "5×x",
      "5＋x",
      "x÷5",
      "5÷x"
    ],
    "hints": [
      "何を文字で表したか確かめ、数量の関係を式にしましょう。"
    ],
    "explanation": "同じ値段の鉛筆5本なので、1本の値段×本数＝5×xです。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_expression_002",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "expression",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "縦がx cm、横が8cmの長方形の面積をy cm²とします。関係を表す式はどれですか。",
    "answer": "y＝8×x",
    "choices": [
      "y＝8＋x",
      "y＝(8＋x)×2",
      "y＝8÷x",
      "y＝8×x"
    ],
    "hints": [
      "何を文字で表したか確かめ、数量の関係を式にしましょう。"
    ],
    "explanation": "長方形の面積＝縦×横なので、y＝8×xです。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_expression_003",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "expression",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "y＝3×x＋2で、x＝4のときのyはいくつですか。",
    "answer": "14",
    "choices": [
      "18",
      "12",
      "14",
      "20"
    ],
    "hints": [
      "何を文字で表したか確かめ、数量の関係を式にしましょう。"
    ],
    "explanation": "かけ算を先にして、3×4＋2＝12＋2＝14です。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_expression_004",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "expression",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "代金y円をy＝120×x＋80と表しました。120円のパンをx個買う場面で、80は何を表しますか。",
    "answer": "個数に関係なくかかる袋代80円",
    "choices": [
      "おつり80円",
      "個数に関係なくかかる袋代80円",
      "パン1個の値段80円",
      "パン80個"
    ],
    "hints": [
      "何を文字で表したか確かめ、数量の関係を式にしましょう。"
    ],
    "explanation": "120×xがパンの代金です。いつも加える80円は、個数に関係しない費用です。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_expression_005",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "expression",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "1辺がx cmの正方形の周りの長さは28cmです。xはいくつですか。",
    "answer": "7",
    "choices": [
      "7",
      "14",
      "4",
      "24"
    ],
    "hints": [
      "何を文字で表したか確かめ、数量の関係を式にしましょう。"
    ],
    "explanation": "周りの長さは4×xです。28÷4＝7cmです。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_expression_006",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "expression",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "1000円出して、1冊x円のノートを3冊買いました。おつりy円を表す式はどれですか。",
    "answer": "y＝1000－3×x",
    "choices": [
      "y＝(1000－3)×x",
      "y＝3×x－1000",
      "y＝1000－x",
      "y＝1000－3×x"
    ],
    "hints": [
      "何を文字で表したか確かめ、数量の関係を式にしましょう。"
    ],
    "explanation": "3冊の代金3×xを、出した1000円から引きます。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_expression_007",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "expression",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "A店の配達料金は品物1個につき120円と送料200円、B店は1個につき160円で送料無料です。料金が同じになる個数は何個ですか。",
    "answer": "5",
    "choices": [
      "6",
      "8",
      "5",
      "4"
    ],
    "hints": [
      "何を文字で表したか確かめ、数量の関係を式にしましょう。"
    ],
    "explanation": "1個増えるごとにB店の代金はA店より40円多く増えます。送料差200円をうめるには200÷40＝5個です。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_expression_008",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "expression",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "正方形を横一列につなぎ、となりどうしの1辺を共有するように棒で作ります。1個には4本、2個には7本使います。棒31本では正方形を何個作れますか。",
    "answer": "10",
    "choices": [
      "8",
      "10",
      "9",
      "11"
    ],
    "hints": [
      "何を文字で表したか確かめ、数量の関係を式にしましょう。"
    ],
    "explanation": "最初の4本のあと、正方形が1個増えるごとに棒は3本増えます。(31－4)÷3＋1＝10個です。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_ratio_001",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "ratio",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "比12：18を最も簡単な整数の比にするとどれですか。",
    "answer": "2：3",
    "choices": [
      "2：3",
      "3：2",
      "4：6",
      "6：9"
    ],
    "hints": [
      "比の1つ分の大きさを求め、全体・部分・差のどれかを確かめましょう。"
    ],
    "explanation": "12と18を最大公約数6で割ると、2：3になります。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_ratio_002",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "ratio",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "比3：5の比の値はどれですか。",
    "answer": "3/5",
    "choices": [
      "5/3",
      "2",
      "8",
      "3/5"
    ],
    "hints": [
      "比の1つ分の大きさを求め、全体・部分・差のどれかを確かめましょう。"
    ],
    "explanation": "比a：bの比の値はa÷bです。3÷5＝3/5です。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_ratio_003",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "ratio",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "2：3＝8：□です。□に入る数はいくつですか。",
    "answer": "12",
    "choices": [
      "6",
      "10",
      "12",
      "9"
    ],
    "hints": [
      "比の1つ分の大きさを求め、全体・部分・差のどれかを確かめましょう。"
    ],
    "explanation": "2を4倍して8にしているので、3も4倍して12にします。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_ratio_004",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "ratio",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "赤と青の玉の個数の比は2：3で、全部で40個です。赤は何個ですか。",
    "answer": "16",
    "choices": [
      "8",
      "16",
      "24",
      "20"
    ],
    "hints": [
      "比の1つ分の大きさを求め、全体・部分・差のどれかを確かめましょう。"
    ],
    "explanation": "比の合計は5です。40÷5＝8個が1つ分なので、赤は8×2＝16個です。",
    "reviewed": false,
    "collection": "course_g6_100",
    "diagram": {
      "kind": "band",
      "parts": [
        2,
        3
      ],
      "labels": [
        "赤：2",
        "青：3"
      ],
      "known": [
        "？個",
        "？個"
      ],
      "totalLabel": "合計40個",
      "caption": "同じ1つ分を5つ集めると全体です。"
    }
  },
  {
    "id": "math_g6_course_ratio_005",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "ratio",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "砂糖と小麦粉の重さの比を1：4にします。小麦粉300gに対し砂糖は何gですか。",
    "answer": "75",
    "choices": [
      "75",
      "60",
      "100",
      "120"
    ],
    "hints": [
      "比の1つ分の大きさを求め、全体・部分・差のどれかを確かめましょう。"
    ],
    "explanation": "小麦粉の4つ分が300gなので、1つ分は300÷4＝75g。砂糖は1つ分です。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_ratio_006",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "ratio",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "0.6：1.5を最も簡単な整数の比にするとどれですか。",
    "answer": "2：5",
    "choices": [
      "6：15",
      "5：2",
      "3：5",
      "2：5"
    ],
    "hints": [
      "比の1つ分の大きさを求め、全体・部分・差のどれかを確かめましょう。"
    ],
    "explanation": "両方を10倍して6：15にし、さらに3で割って2：5にします。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_ratio_007",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "ratio",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "AとBの所持金の比は3：2で、AはBより600円多く持っています。2人の合計は何円ですか。",
    "answer": "3000",
    "choices": [
      "2400",
      "3600",
      "3000",
      "1800"
    ],
    "hints": [
      "比の1つ分の大きさを求め、全体・部分・差のどれかを確かめましょう。"
    ],
    "explanation": "差の1つ分が600円です。合計は5つ分なので600×5＝3000円です。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_ratio_008",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "ratio",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "赤と青の玉の比は2：3でした。赤だけ10個増やすと赤と青が同じ個数になりました。はじめの合計は何個ですか。",
    "answer": "50",
    "choices": [
      "30",
      "50",
      "40",
      "60"
    ],
    "hints": [
      "比の1つ分の大きさを求め、全体・部分・差のどれかを確かめましょう。"
    ],
    "explanation": "青と赤の差は比の1つ分で10個です。合計は5つ分なので10×5＝50個です。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_scale_001",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "scale",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "三角形を2倍に拡大します。もとの辺が3cmのとき、対応する辺は何cmですか。",
    "answer": "6",
    "choices": [
      "6",
      "5",
      "9",
      "1.5"
    ],
    "hints": [
      "対応する辺の倍率をそろえ、単位もそろえましょう。"
    ],
    "explanation": "拡大図では、対応する辺の長さをすべて同じ倍率にします。3×2＝6cmです。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_scale_002",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "scale",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "図形を縮小するとき、対応する角の大きさはどうなりますか。",
    "answer": "変わらない",
    "choices": [
      "縮小率に比例して小さくなる",
      "半分になる",
      "必ず90°になる",
      "変わらない"
    ],
    "hints": [
      "対応する辺の倍率をそろえ、単位もそろえましょう。"
    ],
    "explanation": "拡大・縮小で変わるのは辺の長さです。対応する角の大きさは等しいままです。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_scale_003",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "scale",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "縮尺1：1000の地図で、1cmは実際には何mですか。",
    "answer": "10",
    "choices": [
      "100",
      "1000",
      "10",
      "1"
    ],
    "hints": [
      "対応する辺の倍率をそろえ、単位もそろえましょう。"
    ],
    "explanation": "1000cm＝10mなので、地図の1cmは実際の10mです。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_scale_004",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "scale",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "縮尺1：25000の地図で、道の長さが6cmです。実際の長さは何kmですか。",
    "answer": "1.5",
    "choices": [
      "0.6",
      "1.5",
      "0.15",
      "15"
    ],
    "hints": [
      "対応する辺の倍率をそろえ、単位もそろえましょう。"
    ],
    "explanation": "6×25000＝150000cm。100000cm＝1kmなので、1.5kmです。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_scale_005",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "scale",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "実際に60mある建物を縮尺1：200でかきます。図では高さ何cmになりますか。",
    "answer": "30",
    "choices": [
      "30",
      "3",
      "12",
      "120"
    ],
    "hints": [
      "対応する辺の倍率をそろえ、単位もそろえましょう。"
    ],
    "explanation": "60m＝6000cmです。6000÷200＝30cmです。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_scale_006",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "scale",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "ある三角形の辺は4cm、6cm、8cmです。相似な三角形で4cmに対応する辺が10cmなら、8cmに対応する辺は何cmですか。",
    "answer": "20",
    "choices": [
      "14",
      "16",
      "24",
      "20"
    ],
    "hints": [
      "対応する辺の倍率をそろえ、単位もそろえましょう。"
    ],
    "explanation": "拡大率は10÷4＝2.5倍です。8×2.5＝20cmです。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_scale_007",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "scale",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "縮尺1：500の地図に縦4cm、横6cmの長方形の公園があります。実際の面積は何m²ですか。",
    "answer": "600",
    "choices": [
      "1200",
      "240",
      "600",
      "120"
    ],
    "hints": [
      "対応する辺の倍率をそろえ、単位もそろえましょう。"
    ],
    "explanation": "実際の辺は20mと30mです。面積は20×30＝600m²。面積に長さの倍率を1回だけかけてはいけません。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_scale_008",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "scale",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "同じ図形をAは3倍、Bは2倍に拡大しました。Aのある辺が18cmのとき、Bの対応する辺は何cmですか。",
    "answer": "12",
    "choices": [
      "15",
      "12",
      "27",
      "9"
    ],
    "hints": [
      "対応する辺の倍率をそろえ、単位もそろえましょう。"
    ],
    "explanation": "もとの辺は18÷3＝6cmです。Bでは6×2＝12cmになります。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_circle_001",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "circle",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "半径3cmの円の面積は何cm²ですか。円周率は3.14です。",
    "answer": "28.26",
    "choices": [
      "28.26",
      "18.84",
      "9.42",
      "56.52"
    ],
    "hints": [
      "円の面積は半径×半径×円周率です。直径の半分が半径です。"
    ],
    "explanation": "円の面積＝半径×半径×円周率。3×3×3.14＝28.26cm²です。",
    "reviewed": false,
    "collection": "course_g6_100",
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/radius3.svg",
      "alt": "長さは図の表示を使いましょう。円周率は3.14です。",
      "caption": "長さは図の表示を使いましょう。円周率は3.14です。"
    }
  },
  {
    "id": "math_g6_course_circle_002",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "circle",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "直径10cmの円の面積は何cm²ですか。円周率は3.14です。",
    "answer": "78.5",
    "choices": [
      "314",
      "31.4",
      "157",
      "78.5"
    ],
    "hints": [
      "円の面積は半径×半径×円周率です。直径の半分が半径です。"
    ],
    "explanation": "半径は10÷2＝5cmです。5×5×3.14＝78.5cm²です。",
    "reviewed": false,
    "collection": "course_g6_100",
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/diameter10.svg",
      "alt": "長さは図の表示を使いましょう。円周率は3.14です。",
      "caption": "長さは図の表示を使いましょう。円周率は3.14です。"
    }
  },
  {
    "id": "math_g6_course_circle_003",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "circle",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "池の形を長方形とみると、縦がおよそ20m、横がおよそ30mです。池の面積はおよそ何m²ですか。",
    "answer": "600",
    "choices": [
      "50",
      "100",
      "600",
      "1200"
    ],
    "hints": [
      "複雑な形を、面積の求めやすい図形とみなします。"
    ],
    "explanation": "長方形とみて縦×横を計算し、20×30＝600m²と見積もります。実際の面積とぴったり一致するとは限りません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/approx-area.svg",
      "caption": "池を破線の長方形とみなして面積を見積もります。",
      "alt": "池を破線の長方形とみなして面積を見積もります。"
    }
  },
  {
    "id": "math_g6_course_circle_004",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "circle",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "半径4cmの半円の面積は何cm²ですか。円周率は3.14です。",
    "answer": "25.12",
    "choices": [
      "16",
      "25.12",
      "50.24",
      "12.56"
    ],
    "hints": [
      "円の面積は半径×半径×円周率です。直径の半分が半径です。"
    ],
    "explanation": "円全体の面積4×4×3.14＝50.24の半分で、25.12cm²です。",
    "reviewed": false,
    "collection": "course_g6_100",
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/semicircle4.svg",
      "alt": "長さは図の表示を使いましょう。円周率は3.14です。",
      "caption": "長さは図の表示を使いましょう。円周率は3.14です。"
    }
  },
  {
    "id": "math_g6_course_circle_005",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "circle",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "半径6cmの円の4分の1の面積は何cm²ですか。円周率は3.14です。",
    "answer": "28.26",
    "choices": [
      "28.26",
      "113.04",
      "56.52",
      "18.84"
    ],
    "hints": [
      "円の面積は半径×半径×円周率です。直径の半分が半径です。"
    ],
    "explanation": "円全体は6×6×3.14＝113.04。4分の1なので113.04÷4＝28.26cm²です。",
    "reviewed": false,
    "collection": "course_g6_100",
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/quarter6.svg",
      "alt": "長さは図の表示を使いましょう。円周率は3.14です。",
      "caption": "長さは図の表示を使いましょう。円周率は3.14です。"
    }
  },
  {
    "id": "math_g6_course_circle_006",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "circle",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "直径8cmの円を、1辺8cmの正方形の内側にぴったり入れます。正方形の内側で円の外側の面積は何cm²ですか。円周率は3.14です。",
    "answer": "13.76",
    "choices": [
      "50.24",
      "38.88",
      "25.12",
      "13.76"
    ],
    "hints": [
      "円の面積は半径×半径×円周率です。直径の半分が半径です。"
    ],
    "explanation": "正方形は64cm²、円は4×4×3.14＝50.24cm²。64－50.24＝13.76cm²です。",
    "reviewed": false,
    "collection": "course_g6_100",
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/square-circle.svg",
      "alt": "正方形の内側で、円の外側を求める図",
      "caption": "正方形の内側で、円の外側を求める図"
    }
  },
  {
    "id": "math_g6_course_circle_007",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "circle",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "半径5mの円形{花壇|かだん}の外側に、{幅|はば}1mの道を一周つけます。道の面積は何m²ですか。円周率は3.14です。",
    "answer": "34.54",
    "choices": [
      "31.4",
      "113.04",
      "34.54",
      "3.14"
    ],
    "hints": [
      "円の面積は半径×半径×円周率です。直径の半分が半径です。"
    ],
    "explanation": "外側の半径は6mです。(6×6－5×5)×3.14＝11×3.14＝34.54m²です。",
    "reviewed": false,
    "collection": "course_g6_100",
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/ring.svg",
      "alt": "内側が{花壇|かだん}、周囲の帯が道。中心は同じです。",
      "caption": "内側が{花壇|かだん}、周囲の帯が道。中心は同じです。"
    }
  },
  {
    "id": "math_g6_course_circle_008",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "circle",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "直径10cmの半円2個と、直径20cmの半円1個があります。大きい半円の面積は、小さい半円2個の面積の合計の何倍ですか。",
    "answer": "2",
    "choices": [
      "8",
      "2",
      "4",
      "1"
    ],
    "hints": [
      "円の面積は半径×半径×円周率です。直径の半分が半径です。"
    ],
    "explanation": "半径が2倍なので大きい半円は小さい半円1個の4倍。2個分と比べると4÷2＝2倍です。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_volume_001",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "volume",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "底面積12cm²、高さ5cmの三角柱の体積は何cm³ですか。",
    "answer": "60",
    "choices": [
      "60",
      "30",
      "17",
      "120"
    ],
    "hints": [
      "角柱・円柱の体積は底面積×高さです。"
    ],
    "explanation": "角柱の体積＝底面積×高さ。底面積はすでに三角形の面積なので、12×5＝60cm³です。",
    "reviewed": false,
    "collection": "course_g6_100",
    "diagram": {
      "kind": "solid",
      "shape": "triangularPrism",
      "h": 5,
      "unit": "cm",
      "baseArea": 12,
      "caption": "底面積は12cm²、柱の高さは5cmです。"
    }
  },
  {
    "id": "math_g6_course_volume_002",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "volume",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "底面の半径2cm、高さ5cmの円柱の体積は何cm³ですか。円周率は3.14です。",
    "answer": "62.8",
    "choices": [
      "31.4",
      "125.6",
      "20",
      "62.8"
    ],
    "hints": [
      "角柱・円柱の体積は底面積×高さです。"
    ],
    "explanation": "底面積は2×2×3.14＝12.56cm²。12.56×5＝62.8cm³です。",
    "reviewed": false,
    "collection": "course_g6_100",
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/cylinder.svg",
      "alt": "上と下の円が底面です。図は模式図です。",
      "caption": "上と下の円が底面です。図は模式図です。"
    }
  },
  {
    "id": "math_g6_course_volume_003",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "volume",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "角柱の底面積が同じで高さが3倍になると、体積は何倍ですか。",
    "answer": "3",
    "choices": [
      "9",
      "1",
      "3",
      "6"
    ],
    "hints": [
      "角柱・円柱の体積は底面積×高さです。"
    ],
    "explanation": "体積＝底面積×高さなので、高さだけが3倍なら体積も3倍です。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_volume_004",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "volume",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "底面が底辺6cm、高さ4cmの三角形で、柱の高さが10cmの三角柱です。体積は何cm³ですか。",
    "answer": "120",
    "choices": [
      "80",
      "120",
      "240",
      "60"
    ],
    "hints": [
      "角柱・円柱の体積は底面積×高さです。"
    ],
    "explanation": "底面積は6×4÷2＝12cm²。12×10＝120cm³です。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_volume_005",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "volume",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "体積が125.6cm³、底面の半径が2cmの円柱です。高さは何cmですか。円周率は3.14です。",
    "answer": "10",
    "choices": [
      "10",
      "5",
      "20",
      "31.4"
    ],
    "hints": [
      "角柱・円柱の体積は底面積×高さです。"
    ],
    "explanation": "底面積は12.56cm²。高さは体積÷底面積で、125.6÷12.56＝10cmです。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_volume_006",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "volume",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "底面積24cm²、高さ15cmの柱状の容器に、水を高さ10cmまで入れました。水は何cm³ですか。",
    "answer": "240",
    "choices": [
      "360",
      "120",
      "34",
      "240"
    ],
    "hints": [
      "角柱・円柱の体積は底面積×高さです。"
    ],
    "explanation": "水の体積には容器全体の高さではなく水の深さを使い、24×10＝240cm³です。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_volume_007",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "volume",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "半径3cm、高さ10cmの円柱を2個溶かし、半径6cmの円柱1個に作り直します。体積が変わらないとき、新しい円柱の高さは何cmですか。",
    "answer": "5",
    "choices": [
      "20",
      "2.5",
      "5",
      "10"
    ],
    "hints": [
      "角柱・円柱の体積は底面積×高さです。"
    ],
    "explanation": "もとの合計体積は3×3×3.14×10×2。新しい底面積は6×6×3.14で4倍なので、高さは10×2÷4＝5cmです。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_volume_008",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "volume",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "底面積50cm²の柱状容器に水が深さ6cmまであります。完全に沈めた石のため、水面が8cmになりました。水があふれないとき、石の体積は何cm³ですか。",
    "answer": "100",
    "choices": [
      "14",
      "100",
      "400",
      "300"
    ],
    "hints": [
      "角柱・円柱の体積は底面積×高さです。"
    ],
    "explanation": "水面の上昇2cm分が石の体積です。50×(8－6)＝100cm³です。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_proportion_001",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "proportion",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "yがxに比例し、x＝2のときy＝6です。関係を表す式はどれですか。",
    "answer": "y＝3×x",
    "choices": [
      "y＝3×x",
      "y＝x＋4",
      "y＝6×x",
      "y＝12÷x"
    ],
    "hints": [
      "比例ではy÷xが一定で、y＝決まった数×xです。"
    ],
    "explanation": "比例ではy÷xが一定です。6÷2＝3なので、y＝3×xです。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_proportion_002",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "proportion",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "y＝4×xのとき、x＝5に対応するyはいくつですか。",
    "answer": "20",
    "choices": [
      "9",
      "1.25",
      "25",
      "20"
    ],
    "hints": [
      "比例ではy÷xが一定で、y＝決まった数×xです。"
    ],
    "explanation": "式のxに5を入れると、y＝4×5＝20です。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_proportion_003",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "proportion",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "一定の速さで水を入れると、水量が時間に比例します。時間が3倍になると水量は何倍ですか。",
    "answer": "3",
    "choices": [
      "1/3",
      "6",
      "3",
      "9"
    ],
    "hints": [
      "比例ではy÷xが一定で、y＝決まった数×xです。"
    ],
    "explanation": "比例する量は、一方が3倍になると他方も3倍になります。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_proportion_004",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "proportion",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "針金4mの重さが120gです。同じ針金9mは何gですか。",
    "answer": "270",
    "choices": [
      "30",
      "270",
      "240",
      "360"
    ],
    "hints": [
      "比例ではy÷xが一定で、y＝決まった数×xです。"
    ],
    "explanation": "1mの重さは120÷4＝30g。9mでは30×9＝270gです。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_proportion_005",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "proportion",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "y＝2.5×xの比例のグラフ上にある点はどれですか。座標は(x,y)です。",
    "answer": "(4,10)",
    "choices": [
      "(4,10)",
      "(4,6.5)",
      "(10,4)",
      "(2,6)"
    ],
    "hints": [
      "比例ではy÷xが一定で、y＝決まった数×xです。"
    ],
    "explanation": "x＝4を式に入れるとy＝10です。他の点はy＝2.5×xを満たしません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/proportion-line.svg",
      "caption": "横軸xは1目盛り1、縦軸yは1目盛り2.5。比例のグラフです。",
      "alt": "横軸xは1目盛り1、縦軸yは1目盛り2.5。比例のグラフです。"
    }
  },
  {
    "id": "math_g6_course_proportion_006",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "proportion",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "{水槽|すいそう}に水を入れ始めてからの時間と水量は、1分で3L、2分で6L、4分で12Lです。同じ割合で8分入れると何Lですか。",
    "answer": "24",
    "choices": [
      "16",
      "18",
      "36",
      "24"
    ],
    "hints": [
      "比例ではy÷xが一定で、y＝決まった数×xです。"
    ],
    "explanation": "水量÷時間＝3で一定です。8分では3×8＝24Lです。",
    "reviewed": false,
    "collection": "course_g6_100",
    "diagram": {
      "kind": "table",
      "head": [
        "時間（分）",
        "1",
        "2",
        "4",
        "8"
      ],
      "rows": [
        [
          "水量（L）",
          "3",
          "6",
          "12",
          "？"
        ]
      ],
      "caption": "同じ速さで水を入れます。"
    }
  },
  {
    "id": "math_g6_course_proportion_007",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "proportion",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "紙200枚の重さは800gです。同じ紙の束が袋こみで1340gあり、袋の重さは60gです。紙は何枚ですか。",
    "answer": "320",
    "choices": [
      "350",
      "300",
      "320",
      "335"
    ],
    "hints": [
      "比例ではy÷xが一定で、y＝決まった数×xです。"
    ],
    "explanation": "1枚は800÷200＝4g。紙だけの重さは1340－60＝1280gなので、1280÷4＝320枚です。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_proportion_008",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "proportion",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "比例するxとyがあります。xが3から8になると、yは20増えました。x＝6のときyはいくつですか。",
    "answer": "24",
    "choices": [
      "40",
      "24",
      "12",
      "30"
    ],
    "hints": [
      "比例ではy÷xが一定で、y＝決まった数×xです。"
    ],
    "explanation": "xの増加5に対するyの増加は20なので、比例定数は20÷5＝4。y＝4×xより、x＝6では24です。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_inverse_001",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "inverse",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "yがxに反比例し、x＝3のときy＝12です。x×yの値はいくつですか。",
    "answer": "36",
    "choices": [
      "36",
      "4",
      "15",
      "9"
    ],
    "hints": [
      "反比例ではx×yが一定です。"
    ],
    "explanation": "反比例では積x×yが一定です。3×12＝36です。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_inverse_002",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "inverse",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "y＝24÷xのとき、x＝6に対応するyはいくつですか。",
    "answer": "4",
    "choices": [
      "18",
      "30",
      "144",
      "4"
    ],
    "hints": [
      "反比例ではx×yが一定です。"
    ],
    "explanation": "xに6を入れて、24÷6＝4です。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_inverse_003",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "inverse",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "xとyが反比例しています。xを2倍にするとyはどうなりますか。",
    "answer": "1/2倍になる",
    "choices": [
      "4倍になる",
      "変わらない",
      "1/2倍になる",
      "2倍になる"
    ],
    "hints": [
      "反比例ではx×yが一定です。"
    ],
    "explanation": "積を一定にするため、一方が2倍ならもう一方は1/2倍になります。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_inverse_004",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "inverse",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "面積48cm²の長方形で、縦をx cm、横をy cmとします。縦が6cmなら横は何cmですか。",
    "answer": "8",
    "choices": [
      "12",
      "8",
      "42",
      "288"
    ],
    "hints": [
      "反比例ではx×yが一定です。"
    ],
    "explanation": "縦×横＝48なので、横は48÷6＝8cmです。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_inverse_005",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "inverse",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "同じ仕事を同じ能率の人がすると、4人で6時間かかります。8人なら何時間かかりますか。",
    "answer": "3",
    "choices": [
      "3",
      "12",
      "2",
      "4"
    ],
    "hints": [
      "反比例ではx×yが一定です。"
    ],
    "explanation": "人数×時間＝24で一定です。24÷8＝3時間です。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_inverse_006",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "inverse",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "反比例する組はどれですか。",
    "answer": "一定の道のりを進む速さとかかる時間",
    "choices": [
      "正方形の1辺と周の長さ",
      "買う個数と代金（単価一定）",
      "一定の速さで進む時間と道のり",
      "一定の道のりを進む速さとかかる時間"
    ],
    "hints": [
      "反比例ではx×yが一定です。"
    ],
    "explanation": "道のりが一定なら、速さ×時間が一定です。他の3つは比例する関係です。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_inverse_007",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "inverse",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "ある仕事は同じ能率の人6人で8時間かかります。6人で2時間作業した後、残りを9人で行います。残りは何時間かかりますか。",
    "answer": "4",
    "choices": [
      "3",
      "16/3",
      "4",
      "6"
    ],
    "hints": [
      "反比例ではx×yが一定です。"
    ],
    "explanation": "全体の仕事量は6×8＝48人時。終えたのは6×2＝12人時なので、残り36人時。36÷9＝4時間です。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_inverse_008",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "inverse",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "240kmを往復します。行きは時速60kmで4時間、帰りは時速40kmで6時間でした。往復全体の平均の速さは時速何kmですか。",
    "answer": "48",
    "choices": [
      "52",
      "48",
      "50",
      "45"
    ],
    "hints": [
      "反比例ではx×yが一定です。"
    ],
    "explanation": "全道のり480kmを全時間10時間で割り、480÷10＝48km/時。速さの単純な平均50ではありません。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_data_001",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "data",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "記録3、5、5、7、10の中央値はいくつですか。",
    "answer": "5",
    "choices": [
      "5",
      "6",
      "7",
      "3"
    ],
    "hints": [
      "記録を小さい順に整理し、平均・中央値・{最頻値|さいひんち}を区別しましょう。"
    ],
    "explanation": "小さい順に並べた5個の中央、3番目の値は5です。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_data_002",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "data",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "記録2、4、4、5、6、6、6の{最頻値|さいひんち}はいくつですか。",
    "answer": "6",
    "choices": [
      "4",
      "5",
      "2",
      "6"
    ],
    "hints": [
      "記録を小さい順に整理し、平均・中央値・{最頻値|さいひんち}を区別しましょう。"
    ],
    "explanation": "最も多く現れる値が{最頻値|さいひんち}です。6が3回で最も多いです。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_data_003",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "data",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "5人の記録の合計が80cmです。平均は何cmですか。",
    "answer": "16",
    "choices": [
      "20",
      "40",
      "16",
      "15"
    ],
    "hints": [
      "記録を小さい順に整理し、平均・中央値・{最頻値|さいひんち}を区別しましょう。"
    ],
    "explanation": "平均＝合計÷個数なので、80÷5＝16cmです。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_data_004",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "data",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "記録4、6、8、10の中央値はいくつですか。",
    "answer": "7",
    "choices": [
      "14",
      "7",
      "6",
      "8"
    ],
    "hints": [
      "記録を小さい順に整理し、平均・中央値・{最頻値|さいひんち}を区別しましょう。"
    ],
    "explanation": "個数が偶数のときは中央の2つを平均します。(6＋8)÷2＝7です。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_data_005",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "data",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "「10以上20未満」の階級に入る値はどれですか。",
    "answer": "10",
    "choices": [
      "10",
      "9",
      "20",
      "21"
    ],
    "hints": [
      "記録を小さい順に整理し、平均・中央値・{最頻値|さいひんち}を区別しましょう。"
    ],
    "explanation": "10以上は10をふくみ、20未満は20をふくみません。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_data_006",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "data",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "次の柱状グラフは、記録を10ずつの階級に分けたものです。記録が20未満の人は何人ですか。",
    "answer": "7",
    "choices": [
      "5",
      "8",
      "10",
      "7"
    ],
    "hints": [
      "記録を小さい順に整理し、平均・中央値・{最頻値|さいひんち}を区別しましょう。"
    ],
    "explanation": "20未満の最初の2階級を合わせ、2＋5＝7人です。",
    "reviewed": false,
    "collection": "course_g6_100",
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/histogram.svg",
      "caption": "柱の高さは人数です。0以上10未満が2人、10以上20未満が5人、20以上30未満が3人です。",
      "alt": "柱の高さは人数です。0以上10未満が2人、10以上20未満が5人、20以上30未満が3人です。"
    }
  },
  {
    "id": "math_g6_course_data_007",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "data",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "4人の得点は60、70、80、90点でした。5人目が加わると平均は78点になりました。5人目は何点ですか。",
    "answer": "90",
    "choices": [
      "80",
      "100",
      "90",
      "78"
    ],
    "hints": [
      "記録を小さい順に整理し、平均・中央値・{最頻値|さいひんち}を区別しましょう。"
    ],
    "explanation": "5人の合計は78×5＝390点。もとの合計300点を引くと90点です。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_data_008",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "data",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "A班の記録は4、5、6、7、8、B班は1、5、6、7、11でした。正しい説明はどれですか。",
    "answer": "平均も中央値も同じだが、B班の最大と最小の差が大きい",
    "choices": [
      "最大と最小の差は同じ",
      "平均も中央値も同じだが、B班の最大と最小の差が大きい",
      "平均はA班のほうが高い",
      "中央値はB班のほうが高い"
    ],
    "hints": [
      "記録を小さい順に整理し、平均・中央値・{最頻値|さいひんち}を区別しましょう。"
    ],
    "explanation": "どちらも合計30、平均6、中央値6です。最大－最小はA班4、B班10で、B班の散らばりが大きいです。",
    "reviewed": false,
    "collection": "course_g6_100",
    "diagram": {
      "kind": "table",
      "head": [
        "班",
        "5人の記録"
      ],
      "rows": [
        [
          "A",
          "4、5、6、7、8"
        ],
        [
          "B",
          "1、5、6、7、11"
        ]
      ],
      "caption": "同じ人数の2つの班の記録です。"
    }
  },
  {
    "id": "math_g6_course_case_001",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "case",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "A、B、Cの3人から2人を選んで組にします。順序を区別しない組は何通りですか。",
    "answer": "3",
    "choices": [
      "3",
      "6",
      "9",
      "2"
    ],
    "hints": [
      "順序を区別するか、同じものを重複して数えていないか確かめましょう。"
    ],
    "explanation": "AB、AC、BCの3組です。ABとBAは同じ組として数えます。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_case_002",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "case",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "上着2種類とズボン3種類から1つずつ選びます。組み合わせは何通りですか。",
    "answer": "6",
    "choices": [
      "5",
      "3",
      "9",
      "6"
    ],
    "hints": [
      "順序を区別するか、同じものを重複して数えていないか確かめましょう。"
    ],
    "explanation": "上着1種類につきズボンが3種類なので、2×3＝6通りです。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_case_003",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "case",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "A、B、Cの3人を1列に並べます。並び方は何通りですか。",
    "answer": "6",
    "choices": [
      "9",
      "12",
      "6",
      "3"
    ],
    "hints": [
      "順序を区別するか、同じものを重複して数えていないか確かめましょう。"
    ],
    "explanation": "先頭3通り、次は残り2通り、最後1通りなので、3×2×1＝6通りです。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_case_004",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "case",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "1、2、3、4のカードを1回ずつまで使って2桁の整数を作ります。何個できますか。",
    "answer": "12",
    "choices": [
      "6",
      "12",
      "16",
      "8"
    ],
    "hints": [
      "順序を区別するか、同じものを重複して数えていないか確かめましょう。"
    ],
    "explanation": "十の位は4通り、一の位は使ったカードを除く3通りで、4×3＝12個です。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_case_005",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "case",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "5チームがどの相手とも1回ずつ試合をします。全部で何試合ですか。",
    "answer": "10",
    "choices": [
      "10",
      "20",
      "15",
      "5"
    ],
    "hints": [
      "順序を区別するか、同じものを重複して数えていないか確かめましょう。"
    ],
    "explanation": "各チーム4試合で5×4＝20ですが、同じ試合を2回数えるので20÷2＝10試合です。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_case_006",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "case",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "0、1、2のカードを1回ずつまで使って2桁の整数を作ります。何個できますか。",
    "answer": "4",
    "choices": [
      "6",
      "9",
      "3",
      "4"
    ],
    "hints": [
      "順序を区別するか、同じものを重複して数えていないか確かめましょう。"
    ],
    "explanation": "十の位は0にできず、1か2の2通り。一の位は残り2通りなので2×2＝4個です。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_case_007",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "case",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "A、B、C、Dの4人を1列に並べます。AとBがとなり合う並び方は何通りですか。",
    "answer": "12",
    "choices": [
      "6",
      "8",
      "12",
      "24"
    ],
    "hints": [
      "順序を区別するか、同じものを重複して数えていないか確かめましょう。"
    ],
    "explanation": "AとBを1組とみると3つの並び方は6通り。組の中のAB、BAが2通りあり、6×2＝12通りです。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_case_008",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "case",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "1、2、3、4のカードから3枚を使って3桁の偶数を作ります。同じカードは使えません。何個できますか。",
    "answer": "12",
    "choices": [
      "8",
      "12",
      "24",
      "6"
    ],
    "hints": [
      "順序を区別するか、同じものを重複して数えていないか確かめましょう。"
    ],
    "explanation": "一の位は2か4の2通り。百の位は残り3通り、十の位は2通りなので2×3×2＝12個です。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_fraction_001",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "fraction",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "2/3×3/4を計算し、約分した答えを選びましょう。",
    "answer": "1/2",
    "choices": [
      "1/2",
      "2/7",
      "3/2",
      "1/3"
    ],
    "hints": [
      "かけ算は分子どうし・分母どうし、割り算は割る数を逆数にします。"
    ],
    "explanation": "2×3/(3×4)＝6/12＝1/2です。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_fraction_002",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "fraction",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "3/5×10を計算しましょう。",
    "answer": "6",
    "choices": [
      "30",
      "3/50",
      "2",
      "6"
    ],
    "hints": [
      "かけ算は分子どうし・分母どうし、割り算は割る数を逆数にします。"
    ],
    "explanation": "3×10/5＝30/5＝6です。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_fraction_003",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "fraction",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "2/7の逆数はどれですか。",
    "answer": "7/2",
    "choices": [
      "2/7",
      "1/7",
      "7/2",
      "－2/7"
    ],
    "hints": [
      "かけ算は分子どうし・分母どうし、割り算は割る数を逆数にします。"
    ],
    "explanation": "かけて1になる数が逆数です。2/7×7/2＝1です。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_fraction_004",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "fraction",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "3/4÷2を計算し、約分した答えを選びましょう。",
    "answer": "3/8",
    "choices": [
      "1/4",
      "3/8",
      "3/2",
      "8/3"
    ],
    "hints": [
      "かけ算は分子どうし・分母どうし、割り算は割る数を逆数にします。"
    ],
    "explanation": "2で割るのは1/2をかけることです。3/4×1/2＝3/8です。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_fraction_005",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "fraction",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "2/3÷4/5を計算し、約分した答えを選びましょう。",
    "answer": "5/6",
    "choices": [
      "5/6",
      "8/15",
      "6/5",
      "3/10"
    ],
    "hints": [
      "かけ算は分子どうし・分母どうし、割り算は割る数を逆数にします。"
    ],
    "explanation": "割る数4/5を逆数5/4にして、2/3×5/4＝10/12＝5/6です。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_fraction_006",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "fraction",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "1と1/2を仮分数にして2/3をかけます。答えはいくつですか。",
    "answer": "1",
    "choices": [
      "1/3",
      "2",
      "4/3",
      "1"
    ],
    "hints": [
      "かけ算は分子どうし・分母どうし、割り算は割る数を逆数にします。"
    ],
    "explanation": "1と1/2＝3/2なので、3/2×2/3＝1です。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_fraction_007",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "fraction",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "5/6÷5/6はいくつですか。",
    "answer": "1",
    "choices": [
      "25/36",
      "36/25",
      "1",
      "0"
    ],
    "hints": [
      "かけ算は分子どうし・分母どうし、割り算は割る数を逆数にします。"
    ],
    "explanation": "0でない数をその数自身で割ると1です。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_fraction_008",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "fraction",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "4/9×3/8を計算し、約分した答えを選びましょう。",
    "answer": "1/6",
    "choices": [
      "3/17",
      "1/6",
      "1/3",
      "2/3"
    ],
    "hints": [
      "かけ算は分子どうし・分母どうし、割り算は割る数を逆数にします。"
    ],
    "explanation": "4と8、3と9を約分すると、1×1/(3×2)＝1/6です。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_fraction_009",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "fraction",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "1mで3/4kgのロープがあります。2/3mの重さは何kgですか。",
    "answer": "1/2",
    "choices": [
      "1/2",
      "9/8",
      "2/3",
      "3/8"
    ],
    "hints": [
      "かけ算は分子どうし・分母どうし、割り算は割る数を逆数にします。"
    ],
    "explanation": "1mの重さ×長さより、3/4×2/3＝1/2kgです。",
    "reviewed": false,
    "collection": "course_g6_100",
    "diagram": {
      "kind": "tape",
      "values": [
        1,
        0.6666666666666666
      ],
      "labels": [
        "1m",
        "2/3m"
      ],
      "caption": "1mの重さは3/4kgです。短いロープの重さを考えます。"
    }
  },
  {
    "id": "math_g6_course_fraction_010",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "fraction",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "3/5Lのジュースを、1人に1/10Lずつ配ります。何人に配れますか。",
    "answer": "6",
    "choices": [
      "3",
      "5",
      "10",
      "6"
    ],
    "hints": [
      "かけ算は分子どうし・分母どうし、割り算は割る数を逆数にします。"
    ],
    "explanation": "全体量÷1人分で、3/5÷1/10＝3/5×10＝6人です。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_fraction_011",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "fraction",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "4/5mのリボンを3人で等分します。1人分は何mですか。",
    "answer": "4/15",
    "choices": [
      "3/4",
      "4/8",
      "4/15",
      "12/5"
    ],
    "hints": [
      "かけ算は分子どうし・分母どうし、割り算は割る数を逆数にします。"
    ],
    "explanation": "4/5÷3＝4/5×1/3＝4/15mです。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_fraction_012",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "fraction",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "ある数の3/4が18です。ある数はいくつですか。",
    "answer": "24",
    "choices": [
      "18",
      "24",
      "13.5",
      "21"
    ],
    "hints": [
      "かけ算は分子どうし・分母どうし、割り算は割る数を逆数にします。"
    ],
    "explanation": "もとの数×3/4＝18なので、18÷3/4＝18×4/3＝24です。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_fraction_013",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "fraction",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "2/3＋1/2×3/5を計算し、約分した答えを選びましょう。",
    "answer": "29/30",
    "choices": [
      "29/30",
      "7/10",
      "1/2",
      "19/30"
    ],
    "hints": [
      "かけ算は分子どうし・分母どうし、割り算は割る数を逆数にします。"
    ],
    "explanation": "かけ算を先にして3/10。2/3＋3/10＝20/30＋9/30＝29/30です。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_fraction_014",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "fraction",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "0.6÷3/4を計算しましょう。",
    "answer": "0.8",
    "choices": [
      "0.45",
      "1.25",
      "0.2",
      "0.8"
    ],
    "hints": [
      "かけ算は分子どうし・分母どうし、割り算は割る数を逆数にします。"
    ],
    "explanation": "0.6＝3/5です。3/5×4/3＝4/5＝0.8です。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_fraction_015",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "fraction",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "5/6kgで2/3mある針金です。同じ針金1mは何kgですか。",
    "answer": "5/4",
    "choices": [
      "4/5",
      "1/2",
      "5/4",
      "5/9"
    ],
    "hints": [
      "かけ算は分子どうし・分母どうし、割り算は割る数を逆数にします。"
    ],
    "explanation": "1mの重さは5/6÷2/3＝5/6×3/2＝5/4kgです。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_fraction_016",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "fraction",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "7/8×16/21を計算し、約分した答えを選びましょう。",
    "answer": "2/3",
    "choices": [
      "7/12",
      "2/3",
      "1/3",
      "3/2"
    ],
    "hints": [
      "かけ算は分子どうし・分母どうし、割り算は割る数を逆数にします。"
    ],
    "explanation": "7と21を7で、16と8を8で約分すると、1×2/(1×3)＝2/3です。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_fraction_017",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "fraction",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "{水槽|すいそう}に水を全体の2/3まで入れ、その水の3/4を使いました。残った水は{水槽|すいそう}全体の何分のいくつですか。",
    "answer": "1/6",
    "choices": [
      "1/6",
      "1/2",
      "1/4",
      "1/12"
    ],
    "hints": [
      "かけ算は分子どうし・分母どうし、割り算は割る数を逆数にします。"
    ],
    "explanation": "残るのは入っていた水の1/4です。2/3×1/4＝1/6が全体に対する残量です。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_fraction_018",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "fraction",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "長さ3/4mの棒を、1本1/8mずつに切ります。切るたびに長さは減らないものとすると、切る回数は何回ですか。",
    "answer": "5",
    "choices": [
      "6",
      "7",
      "4",
      "5"
    ],
    "hints": [
      "かけ算は分子どうし・分母どうし、割り算は割る数を逆数にします。"
    ],
    "explanation": "できる本数は3/4÷1/8＝6本です。6本に分けるには切れ目が5つなので、5回切ります。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_fraction_019",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "fraction",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "Aさんは仕事全体を6時間、Bさんは同じ仕事全体を3時間で終えます。2人が一定の速さで同時に働くと、何時間で終わりますか。",
    "answer": "2",
    "choices": [
      "4.5",
      "9",
      "2",
      "3"
    ],
    "hints": [
      "かけ算は分子どうし・分母どうし、割り算は割る数を逆数にします。"
    ],
    "explanation": "1時間にできる仕事は1/6＋1/3＝1/2です。全体1を1/2で割り、2時間で終わります。",
    "reviewed": false,
    "collection": "course_g6_100"
  },
  {
    "id": "math_g6_course_fraction_020",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "fraction",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "リボンの2/5を使い、残りの1/3をさらに使うと、手元に4m残りました。最初は何mありましたか。",
    "answer": "10",
    "choices": [
      "8",
      "10",
      "12",
      "15"
    ],
    "hints": [
      "かけ算は分子どうし・分母どうし、割り算は割る数を逆数にします。"
    ],
    "explanation": "最後に残る割合は(1－2/5)×(1－1/3)＝3/5×2/3＝2/5です。4÷2/5＝10mです。",
    "reviewed": false,
    "collection": "course_g6_100"
  }
];
Array.prototype.push.apply(root.QUESTION_BANK=root.QUESTION_BANK||[],questions);
})(this);
