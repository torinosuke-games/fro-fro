// 小6算数：初回100問＋追加400問。固定問題。利用者レビュー待ち。
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
    "explanation": "辺の中点を結ぶ2本と対角線2本の、計4本です。\n\nほかの選択肢\n・「2」：縦と横の2本だけを数え、対角線を見落としています。\n・「1」：縦の軸1本だけを数えています。\n・「8」：1本の直線を中心から両側に分けて2回数えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "2",
        "reason": "縦と横の2本だけを数え、対角線を見落としています。"
      },
      {
        "answer": "1",
        "reason": "縦の軸1本だけを数えています。"
      },
      {
        "answer": "8",
        "reason": "1本の直線を中心から両側に分けて2回数えています。"
      }
    ]
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
      "点対称である",
      "点対称ではない",
      "正方形だけが点対称",
      "辺の長さだけでは決まらない"
    ],
    "hints": [
      "折り重なる線対称と、180°回して重なる点対称を区別しましょう。"
    ],
    "explanation": "対角線の交点のまわりに180°回すと、もとの図形と重なります。\n\nほかの選択肢\n・「点対称ではない」：折って重ねる線対称と、回して重ねる点対称を混同しています。\n・「正方形だけが点対称」：長方形も180°回すと重なります。\n・「辺の長さだけでは決まらない」：長方形という条件で、180°回すと重なると判断できます。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "点対称ではない",
        "reason": "折って重ねる線対称と、回して重ねる点対称を混同しています。"
      },
      {
        "answer": "正方形だけが点対称",
        "reason": "長方形も180°回すと重なります。"
      },
      {
        "answer": "辺の長さだけでは決まらない",
        "reason": "長方形という条件で、180°回すと重なると判断できます。"
      }
    ]
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
      "3",
      "1",
      "2",
      "6"
    ],
    "hints": [
      "折り重なる線対称と、180°回して重なる点対称を区別しましょう。"
    ],
    "explanation": "各頂点と向かいの辺の中点を結ぶ直線が軸となり、3本です。\n\nほかの選択肢\n・「1」：1つの頂点からの軸だけを数えています。\n・「2」：残りの頂点から引く軸を1本見落としています。\n・「6」：各軸を中心の両側に分けて2回数えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "1",
        "reason": "1つの頂点からの軸だけを数えています。"
      },
      {
        "answer": "2",
        "reason": "残りの頂点から引く軸を1本見落としています。"
      },
      {
        "answer": "6",
        "reason": "各軸を中心の両側に分けて2回数えています。"
      }
    ]
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
      "(7,2)",
      "(1,6)",
      "(4,2)",
      "(7,6)"
    ],
    "hints": [
      "折り重なる線対称と、180°回して重なる点対称を区別しましょう。"
    ],
    "explanation": "Aは軸から左へ3離れています。対応する点は軸から右へ3なので、(7,2)です。\n\nほかの選択肢\n・「(1,6)」：縦の軸なのに上下を反転しています。横の位置を変えましょう。\n・「(4,2)」：対応する点ではなく軸上へ移しています。\n・「(7,6)」：横の位置だけでなく縦の位置まで変えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/symmetry-4.svg",
      "alt": "右が第1の座標、上が第2の座標。1目盛りは1です。",
      "caption": "右が第1の座標、上が第2の座標。1目盛りは1です。"
    },
    "misconceptions": [
      {
        "answer": "(1,6)",
        "reason": "縦の軸なのに上下を反転しています。横の位置を変えましょう。"
      },
      {
        "answer": "(4,2)",
        "reason": "対応する点ではなく軸上へ移しています。"
      },
      {
        "answer": "(7,6)",
        "reason": "横の位置だけでなく縦の位置まで変えています。"
      }
    ]
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
    "explanation": "AはOから左へ3、下へ2。反対側の右へ3、上へ2にある(7,5)です。\n\nほかの選択肢\n・「(5,7)」：右へ進む量と上へ進む量を取り{違|ちが}えています。\n・「(3,2)」：中心からの距離ではなく、座標どうしの差だけを答えています。\n・「(7,1)」：左右だけを反転し、上下の反転を忘れています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/symmetry-5.svg",
      "alt": "右が第1の座標、上が第2の座標。1目盛りは1です。",
      "caption": "右が第1の座標、上が第2の座標。1目盛りは1です。"
    },
    "misconceptions": [
      {
        "answer": "(5,7)",
        "reason": "右へ進む量と上へ進む量を取り{違|ちが}えています。"
      },
      {
        "answer": "(3,2)",
        "reason": "中心からの距離ではなく、座標どうしの差だけを答えています。"
      },
      {
        "answer": "(7,1)",
        "reason": "左右だけを反転し、上下の反転を忘れています。"
      }
    ]
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
      "もとの図形と重なる",
      "1つの頂点だけ重なる",
      "辺だけ重なる",
      "重ならない"
    ],
    "hints": [
      "折り重なる線対称と、180°回して重なる点対称を区別しましょう。"
    ],
    "explanation": "向かい合う頂点どうしが対応し、すべての辺も重なります。正六角形は点対称です。\n\nほかの選択肢\n・「1つの頂点だけ重なる」：点対称では1点だけでなく図形全体が重なります。\n・「辺だけ重なる」：頂点も辺もすべて重なります。\n・「重ならない」：回転の中心を図形の中心に取ると重なります。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "1つの頂点だけ重なる",
        "reason": "点対称では1点だけでなく図形全体が重なります。"
      },
      {
        "answer": "辺だけ重なる",
        "reason": "頂点も辺もすべて重なります。"
      },
      {
        "answer": "重ならない",
        "reason": "回転の中心を図形の中心に取ると重なります。"
      }
    ]
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
      "長方形でもひし形でもない平行四辺形",
      "正方形",
      "長方形",
      "ひし形"
    ],
    "hints": [
      "折り重なる線対称と、180°回して重なる点対称を区別しましょう。"
    ],
    "explanation": "一般の平行四辺形は対角線の交点を中心に180°で重なりますが、折り重なる対称の軸はありません。\n\nほかの選択肢\n・「正方形」：正方形には対称の軸があり、線対称でもあります。\n・「長方形」：辺の中点を結ぶ2本の対称の軸があります。\n・「ひし形」：2本の対角線が対称の軸です。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "正方形",
        "reason": "正方形には対称の軸があり、線対称でもあります。"
      },
      {
        "answer": "長方形",
        "reason": "辺の中点を結ぶ2本の対称の軸があります。"
      },
      {
        "answer": "ひし形",
        "reason": "2本の対角線が対称の軸です。"
      }
    ]
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
      "どちらも線対称で、点対称なのは正六角形だけ",
      "どちらも点対称である",
      "線対称なのは正五角形だけ",
      "点対称なのは正五角形だけ"
    ],
    "hints": [
      "折り重なる線対称と、180°回して重なる点対称を区別しましょう。"
    ],
    "explanation": "正五角形には5本、正六角形には6本の対称の軸があります。180°で頂点が対応するのは正六角形です。\n\nほかの選択肢\n・「どちらも点対称である」：正五角形は180°回すと頂点が辺の側に来て重なりません。\n・「線対称なのは正五角形だけ」：正六角形にも対称の軸があります。\n・「点対称なのは正五角形だけ」：正五角形と正六角形の判定が逆です。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "どちらも点対称である",
        "reason": "正五角形は180°回すと頂点が辺の側に来て重なりません。"
      },
      {
        "answer": "線対称なのは正五角形だけ",
        "reason": "正六角形にも対称の軸があります。"
      },
      {
        "answer": "点対称なのは正五角形だけ",
        "reason": "正五角形と正六角形の判定が逆です。"
      }
    ]
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
    "explanation": "同じ値段の鉛筆5本なので、1本の値段×本数＝5×xです。\n\nほかの選択肢\n・「5＋x」：単価と個数を足しています。同じ単価を5回足すのでかけ算です。\n・「x÷5」：5本分ではなく1本の値段を5等分しています。\n・「5÷x」：値段と本数を逆に割っています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "5＋x",
        "reason": "単価と個数を足しています。同じ単価を5回足すのでかけ算です。"
      },
      {
        "answer": "x÷5",
        "reason": "5本分ではなく1本の値段を5等分しています。"
      },
      {
        "answer": "5÷x",
        "reason": "値段と本数を逆に割っています。"
      }
    ]
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
      "y＝8×x",
      "y＝8＋x",
      "y＝(8＋x)×2",
      "y＝8÷x"
    ],
    "hints": [
      "何を文字で表したか確かめ、数量の関係を式にしましょう。"
    ],
    "explanation": "長方形の面積＝縦×横なので、y＝8×xです。\n\nほかの選択肢\n・「y＝8＋x」：縦と横を足しています。面積はかけ算です。\n・「y＝(8＋x)×2」：面積ではなく周りの長さを求めています。\n・「y＝8÷x」：横を縦で割っています。面積の求め方ではありません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "y＝8＋x",
        "reason": "縦と横を足しています。面積はかけ算です。"
      },
      {
        "answer": "y＝(8＋x)×2",
        "reason": "面積ではなく周りの長さを求めています。"
      },
      {
        "answer": "y＝8÷x",
        "reason": "横を縦で割っています。面積の求め方ではありません。"
      }
    ]
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
      "14",
      "20",
      "12",
      "9"
    ],
    "hints": [
      "何を文字で表したか確かめ、数量の関係を式にしましょう。"
    ],
    "explanation": "かけ算を先にして、3×4＋2＝12＋2＝14です。\n\nほかの選択肢\n・「20」：先に4＋2を計算し、3×(4＋2)としています。\n・「12」：3×4だけを計算し、＋2を忘れています。\n・「9」：かけ算を足し算と取り{違|ちが}え、3＋4＋2としています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "20",
        "reason": "先に4＋2を計算し、3×(4＋2)としています。"
      },
      {
        "answer": "12",
        "reason": "3×4だけを計算し、＋2を忘れています。"
      },
      {
        "answer": "9",
        "reason": "かけ算を足し算と取り{違|ちが}え、3＋4＋2としています。"
      }
    ]
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
      "個数に関係なくかかる袋代80円",
      "パン1個の値段80円",
      "パン80個",
      "おつり80円"
    ],
    "hints": [
      "何を文字で表したか確かめ、数量の関係を式にしましょう。"
    ],
    "explanation": "120×xがパンの代金です。いつも加える80円は、個数に関係しない費用です。\n\nほかの選択肢\n・「パン1個の値段80円」：1個の値段はxにかける120のほうです。\n・「パン80個」：80は金額で、個数を表す文字はxです。\n・「おつり80円」：式は買うときの合計料金なので、おつりを表していません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "パン1個の値段80円",
        "reason": "1個の値段はxにかける120のほうです。"
      },
      {
        "answer": "パン80個",
        "reason": "80は金額で、個数を表す文字はxです。"
      },
      {
        "answer": "おつり80円",
        "reason": "式は買うときの合計料金なので、おつりを表していません。"
      }
    ]
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
    "explanation": "周りの長さは4×xです。28÷4＝7cmです。\n\nほかの選択肢\n・「14」：28を2辺分として割っています。正方形には同じ長さの辺が4本あります。\n・「4」：辺の本数を答えています。問われているのは1辺の長さです。\n・「24」：周の長さから辺の本数を引いています。4で割りましょう。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "14",
        "reason": "28を2辺分として割っています。正方形には同じ長さの辺が4本あります。"
      },
      {
        "answer": "4",
        "reason": "辺の本数を答えています。問われているのは1辺の長さです。"
      },
      {
        "answer": "24",
        "reason": "周の長さから辺の本数を引いています。4で割りましょう。"
      }
    ]
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
      "y＝1000－3×x",
      "y＝(1000－3)×x",
      "y＝3×x－1000",
      "y＝1000－x"
    ],
    "hints": [
      "何を文字で表したか確かめ、数量の関係を式にしましょう。"
    ],
    "explanation": "3冊の代金3×xを、出した1000円から引きます。\n\nほかの選択肢\n・「y＝(1000－3)×x」：冊数3を1000円から引いてしまっています。\n・「y＝3×x－1000」：{払|はら}ったお金と代金を引く順序が逆です。\n・「y＝1000－x」：ノート1冊分だけを引いています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "y＝(1000－3)×x",
        "reason": "冊数3を1000円から引いてしまっています。"
      },
      {
        "answer": "y＝3×x－1000",
        "reason": "{払|はら}ったお金と代金を引く順序が逆です。"
      },
      {
        "answer": "y＝1000－x",
        "reason": "ノート1冊分だけを引いています。"
      }
    ]
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
      "5",
      "4",
      "6",
      "8"
    ],
    "hints": [
      "何を文字で表したか確かめ、数量の関係を式にしましょう。"
    ],
    "explanation": "1個増えるごとにB店の代金はA店より40円多く増えます。送料差200円をうめるには200÷40＝5個です。\n\nほかの選択肢\n・「4」：4個ではA店680円、B店640円で同じになりません。\n・「6」：6個ではA店920円、B店960円で同じになりません。\n・「8」：8個ではA店1160円、B店1280円で同じになりません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "4",
        "reason": "4個ではA店680円、B店640円で同じになりません。"
      },
      {
        "answer": "6",
        "reason": "6個ではA店920円、B店960円で同じになりません。"
      },
      {
        "answer": "8",
        "reason": "8個ではA店1160円、B店1280円で同じになりません。"
      }
    ]
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
      "10",
      "9",
      "11",
      "8"
    ],
    "hints": [
      "何を文字で表したか確かめ、数量の関係を式にしましょう。"
    ],
    "explanation": "最初の4本のあと、正方形が1個増えるごとに棒は3本増えます。(31－4)÷3＋1＝10個です。\n\nほかの選択肢\n・「9」：増やした個数だけを求め、最初の正方形を数え忘れています。\n・「11」：共有する辺を1か所少なく数えています。\n・「8」：31÷4で、辺を共有することを無視して{概算|がいさん}しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "9",
        "reason": "増やした個数だけを求め、最初の正方形を数え忘れています。"
      },
      {
        "answer": "11",
        "reason": "共有する辺を1か所少なく数えています。"
      },
      {
        "answer": "8",
        "reason": "31÷4で、辺を共有することを無視して{概算|がいさん}しています。"
      }
    ]
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
    "explanation": "12と18を最大公約数6で割ると、2：3になります。\n\nほかの選択肢\n・「3：2」：比の順序を逆にしています。\n・「4：6」：同じ比ですが、さらに2で割れるので最も簡単ではありません。\n・「6：9」：同じ比ですが、さらに3で割れます。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "3：2",
        "reason": "比の順序を逆にしています。"
      },
      {
        "answer": "4：6",
        "reason": "同じ比ですが、さらに2で割れるので最も簡単ではありません。"
      },
      {
        "answer": "6：9",
        "reason": "同じ比ですが、さらに3で割れます。"
      }
    ]
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
      "3/5",
      "5/3",
      "2",
      "8"
    ],
    "hints": [
      "比の1つ分の大きさを求め、全体・部分・差のどれかを確かめましょう。"
    ],
    "explanation": "比a：bの比の値はa÷bです。3÷5＝3/5です。\n\nほかの選択肢\n・「5/3」：比の前と後を逆に割っています。\n・「2」：5－3という差を求めています。\n・「8」：3＋5という合計を求めています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "5/3",
        "reason": "比の前と後を逆に割っています。"
      },
      {
        "answer": "2",
        "reason": "5－3という差を求めています。"
      },
      {
        "answer": "8",
        "reason": "3＋5という合計を求めています。"
      }
    ]
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
      "12",
      "9",
      "6",
      "4"
    ],
    "hints": [
      "比の1つ分の大きさを求め、全体・部分・差のどれかを確かめましょう。"
    ],
    "explanation": "2を4倍して8にしているので、3も4倍して12にします。\n\nほかの選択肢\n・「9」：2から8への増加6を3にも足しています。同じ倍率をかけましょう。\n・「6」：3を2倍にしています。倍率は4倍です。\n・「4」：8÷2で倍率を求めただけで、後ろの3にかけていません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "9",
        "reason": "2から8への増加6を3にも足しています。同じ倍率をかけましょう。"
      },
      {
        "answer": "6",
        "reason": "3を2倍にしています。倍率は4倍です。"
      },
      {
        "answer": "4",
        "reason": "8÷2で倍率を求めただけで、後ろの3にかけていません。"
      }
    ]
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
      "16",
      "24",
      "20",
      "8"
    ],
    "hints": [
      "比の1つ分の大きさを求め、全体・部分・差のどれかを確かめましょう。"
    ],
    "explanation": "比の合計は5です。40÷5＝8個が1つ分なので、赤は8×2＝16個です。\n\nほかの選択肢\n・「24」：青の個数を答えています。赤は比の2つ分です。\n・「20」：赤と青を同じ個数として半分にしています。\n・「8」：比の1つ分で止めています。赤は2つ分です。",
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
    },
    "misconceptions": [
      {
        "answer": "24",
        "reason": "青の個数を答えています。赤は比の2つ分です。"
      },
      {
        "answer": "20",
        "reason": "赤と青を同じ個数として半分にしています。"
      },
      {
        "answer": "8",
        "reason": "比の1つ分で止めています。赤は2つ分です。"
      }
    ]
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
      "150"
    ],
    "hints": [
      "比の1つ分の大きさを求め、全体・部分・差のどれかを確かめましょう。"
    ],
    "explanation": "小麦粉の4つ分が300gなので、1つ分は300÷4＝75g。砂糖は1つ分です。\n\nほかの選択肢\n・「60」：300gを全体の5つ分と考えています。300gは小麦粉4つ分です。\n・「100」：小麦粉4つ分を、3つ分として300÷3にしています。\n・「150」：比の4つ分を2つ分と取り{違|ちが}えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "60",
        "reason": "300gを全体の5つ分と考えています。300gは小麦粉4つ分です。"
      },
      {
        "answer": "100",
        "reason": "小麦粉4つ分を、3つ分として300÷3にしています。"
      },
      {
        "answer": "150",
        "reason": "比の4つ分を2つ分と取り{違|ちが}えています。"
      }
    ]
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
      "2：5",
      "6：15",
      "5：2",
      "3：5"
    ],
    "hints": [
      "比の1つ分の大きさを求め、全体・部分・差のどれかを確かめましょう。"
    ],
    "explanation": "両方を10倍して6：15にし、さらに3で割って2：5にします。\n\nほかの選択肢\n・「6：15」：同じ比ですが、さらに3で割れます。\n・「5：2」：前後の順序を逆にしています。\n・「3：5」：0.6と1.5に{違|ちが}う倍率を使っています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "6：15",
        "reason": "同じ比ですが、さらに3で割れます。"
      },
      {
        "answer": "5：2",
        "reason": "前後の順序を逆にしています。"
      },
      {
        "answer": "3：5",
        "reason": "0.6と1.5に{違|ちが}う倍率を使っています。"
      }
    ]
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
      "3000",
      "1800",
      "1200",
      "2400"
    ],
    "hints": [
      "比の1つ分の大きさを求め、全体・部分・差のどれかを確かめましょう。"
    ],
    "explanation": "差の1つ分が600円です。合計は5つ分なので600×5＝3000円です。\n\nほかの選択肢\n・「1800」：Aの金額だけを答えています。\n・「1200」：Bの金額だけを答えています。\n・「2400」：2人ともBと同じ1200円だとして合計しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "1800",
        "reason": "Aの金額だけを答えています。"
      },
      {
        "answer": "1200",
        "reason": "Bの金額だけを答えています。"
      },
      {
        "answer": "2400",
        "reason": "2人ともBと同じ1200円だとして合計しています。"
      }
    ]
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
      "50",
      "40",
      "60",
      "30"
    ],
    "hints": [
      "比の1つ分の大きさを求め、全体・部分・差のどれかを確かめましょう。"
    ],
    "explanation": "青と赤の差は比の1つ分で10個です。合計は5つ分なので10×5＝50個です。\n\nほかの選択肢\n・「40」：増やした後に同数になる条件を初めにも当てはめ、比を2：2として10×4を求めています。\n・「60」：増やした後の合計を答えています。\n・「30」：もとの青の個数だけを答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "40",
        "reason": "増やした後に同数になる条件を初めにも当てはめ、比を2：2として10×4を求めています。"
      },
      {
        "answer": "60",
        "reason": "増やした後の合計を答えています。"
      },
      {
        "answer": "30",
        "reason": "もとの青の個数だけを答えています。"
      }
    ]
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
    "explanation": "拡大図では、対応する辺の長さをすべて同じ倍率にします。3×2＝6cmです。\n\nほかの選択肢\n・「5」：辺の長さに倍率2を足しています。\n・「9」：3倍として計算しています。\n・「1.5」：拡大ではなく2分の1に縮小しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "5",
        "reason": "辺の長さに倍率2を足しています。"
      },
      {
        "answer": "9",
        "reason": "3倍として計算しています。"
      },
      {
        "answer": "1.5",
        "reason": "拡大ではなく2分の1に縮小しています。"
      }
    ]
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
      "変わらない",
      "縮小率に比例して小さくなる",
      "半分になる",
      "必ず90°になる"
    ],
    "hints": [
      "対応する辺の倍率をそろえ、単位もそろえましょう。"
    ],
    "explanation": "拡大・縮小で変わるのは辺の長さです。対応する角の大きさは等しいままです。\n\nほかの選択肢\n・「縮小率に比例して小さくなる」：辺の長さの性質を角度にも当てはめています。\n・「半分になる」：2分の1の縮図でも角の大きさは変わりません。\n・「必ず90°になる」：もとの角が90°でないとき、その角は90°にはなりません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "縮小率に比例して小さくなる",
        "reason": "辺の長さの性質を角度にも当てはめています。"
      },
      {
        "answer": "半分になる",
        "reason": "2分の1の縮図でも角の大きさは変わりません。"
      },
      {
        "answer": "必ず90°になる",
        "reason": "もとの角が90°でないとき、その角は90°にはなりません。"
      }
    ]
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
      "10",
      "1",
      "100",
      "1000"
    ],
    "hints": [
      "対応する辺の倍率をそろえ、単位もそろえましょう。"
    ],
    "explanation": "1000cm＝10mなので、地図の1cmは実際の10mです。\n\nほかの選択肢\n・「1」：1000cmからmへの{換算|かんさん}で1000で割っています。\n・「100」：cmをmへ直すときに10でしか割っていません。\n・「1000」：cmでの長さを、そのままmとしています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "1",
        "reason": "1000cmからmへの{換算|かんさん}で1000で割っています。"
      },
      {
        "answer": "100",
        "reason": "cmをmへ直すときに10でしか割っていません。"
      },
      {
        "answer": "1000",
        "reason": "cmでの長さを、そのままmとしています。"
      }
    ]
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
      "1.5",
      "0.15",
      "15",
      "1500"
    ],
    "hints": [
      "対応する辺の倍率をそろえ、単位もそろえましょう。"
    ],
    "explanation": "6×25000＝150000cm。100000cm＝1kmなので、1.5kmです。\n\nほかの選択肢\n・「0.15」：cmからkmへ直すときに10倍余計に割っています。\n・「15」：cmからkmへの{換算|かんさん}で10倍大きくしています。\n・「1500」：mでの長さをkmとして答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "0.15",
        "reason": "cmからkmへ直すときに10倍余計に割っています。"
      },
      {
        "answer": "15",
        "reason": "cmからkmへの{換算|かんさん}で10倍大きくしています。"
      },
      {
        "answer": "1500",
        "reason": "mでの長さをkmとして答えています。"
      }
    ]
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
      "300",
      "0.3"
    ],
    "hints": [
      "対応する辺の倍率をそろえ、単位もそろえましょう。"
    ],
    "explanation": "60m＝6000cmです。6000÷200＝30cmです。\n\nほかの選択肢\n・「3」：mからcmへ直すときに10倍にしています。\n・「300」：縮尺を20分の1と取り{違|ちが}えています。\n・「0.3」：60mをcmに直さず、そのまま200で割っています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "3",
        "reason": "mからcmへ直すときに10倍にしています。"
      },
      {
        "answer": "300",
        "reason": "縮尺を20分の1と取り{違|ちが}えています。"
      },
      {
        "answer": "0.3",
        "reason": "60mをcmに直さず、そのまま200で割っています。"
      }
    ]
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
      "20",
      "14",
      "16",
      "24"
    ],
    "hints": [
      "対応する辺の倍率をそろえ、単位もそろえましょう。"
    ],
    "explanation": "拡大率は10÷4＝2.5倍です。8×2.5＝20cmです。\n\nほかの選択肢\n・「14」：対応する辺に同じ長さ6cmを足しています。同じ倍率を使います。\n・「16」：倍率を2倍としています。\n・「24」：倍率を3倍としています。倍率は2.5倍です。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "14",
        "reason": "対応する辺に同じ長さ6cmを足しています。同じ倍率を使います。"
      },
      {
        "answer": "16",
        "reason": "倍率を2倍としています。"
      },
      {
        "answer": "24",
        "reason": "倍率を3倍としています。倍率は2.5倍です。"
      }
    ]
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
      "600",
      "120",
      "1200",
      "24"
    ],
    "hints": [
      "対応する辺の倍率をそろえ、単位もそろえましょう。"
    ],
    "explanation": "実際の辺は20mと30mです。面積は20×30＝600m²。面積に長さの倍率を1回だけかけてはいけません。\n\nほかの選択肢\n・「120」：図の面積24に長さの倍率5を1回だけかけています。\n・「1200」：長方形の面積をさらに2倍しています。\n・「24」：図上の面積を、実際の面積として答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "120",
        "reason": "図の面積24に長さの倍率5を1回だけかけています。"
      },
      {
        "answer": "1200",
        "reason": "長方形の面積をさらに2倍しています。"
      },
      {
        "answer": "24",
        "reason": "図上の面積を、実際の面積として答えています。"
      }
    ]
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
      "12",
      "27",
      "9",
      "6"
    ],
    "hints": [
      "対応する辺の倍率をそろえ、単位もそろえましょう。"
    ],
    "explanation": "もとの辺は18÷3＝6cmです。Bでは6×2＝12cmになります。\n\nほかの選択肢\n・「27」：AからBへの倍率を3/2として逆にかけています。\n・「9」：Aの長さを2で割っています。\n・「6」：もとの図形の長さで止めています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "27",
        "reason": "AからBへの倍率を3/2として逆にかけています。"
      },
      {
        "answer": "9",
        "reason": "Aの長さを2で割っています。"
      },
      {
        "answer": "6",
        "reason": "もとの図形の長さで止めています。"
      }
    ]
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
    "explanation": "円の面積＝半径×半径×円周率。3×3×3.14＝28.26cm²です。\n\nほかの選択肢\n・「18.84」：円の面積ではなく円周2×3×3.14を求めています。\n・「9.42」：半径を1回しかかけていません。\n・「56.52」：求めた面積をさらに2倍しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/radius3.svg",
      "alt": "長さは図の表示を使いましょう。円周率は3.14です。",
      "caption": "長さは図の表示を使いましょう。円周率は3.14です。"
    },
    "misconceptions": [
      {
        "answer": "18.84",
        "reason": "円の面積ではなく円周2×3×3.14を求めています。"
      },
      {
        "answer": "9.42",
        "reason": "半径を1回しかかけていません。"
      },
      {
        "answer": "56.52",
        "reason": "求めた面積をさらに2倍しています。"
      }
    ]
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
      "78.5",
      "314",
      "31.4",
      "157"
    ],
    "hints": [
      "円の面積は半径×半径×円周率です。直径の半分が半径です。"
    ],
    "explanation": "半径は10÷2＝5cmです。5×5×3.14＝78.5cm²です。\n\nほかの選択肢\n・「314」：直径10cmを半径として計算しています。\n・「31.4」：円周を求めています。\n・「157」：正しい円の面積を2倍しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/diameter10.svg",
      "alt": "長さは図の表示を使いましょう。円周率は3.14です。",
      "caption": "長さは図の表示を使いましょう。円周率は3.14です。"
    },
    "misconceptions": [
      {
        "answer": "314",
        "reason": "直径10cmを半径として計算しています。"
      },
      {
        "answer": "31.4",
        "reason": "円周を求めています。"
      },
      {
        "answer": "157",
        "reason": "正しい円の面積を2倍しています。"
      }
    ]
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
      "600",
      "50",
      "1200",
      "300"
    ],
    "hints": [
      "複雑な形を、面積の求めやすい図形とみなします。"
    ],
    "explanation": "長方形とみて縦×横を計算し、20×30＝600m²と見積もります。実際の面積とぴったり一致するとは限りません。\n\nほかの選択肢\n・「50」：縦と横を足しています。\n・「1200」：長方形の面積をさらに2倍しています。\n・「300」：長方形を三角形のように2で割っています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/approx-area.svg",
      "caption": "池を破線の長方形とみなして面積を見積もります。",
      "alt": "池を破線の長方形とみなして面積を見積もります。"
    },
    "misconceptions": [
      {
        "answer": "50",
        "reason": "縦と横を足しています。"
      },
      {
        "answer": "1200",
        "reason": "長方形の面積をさらに2倍しています。"
      },
      {
        "answer": "300",
        "reason": "長方形を三角形のように2で割っています。"
      }
    ]
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
      "25.12",
      "50.24",
      "12.56",
      "16"
    ],
    "hints": [
      "円の面積は半径×半径×円周率です。直径の半分が半径です。"
    ],
    "explanation": "円全体の面積4×4×3.14＝50.24の半分で、25.12cm²です。\n\nほかの選択肢\n・「50.24」：円全体の面積のままで、半分にしていません。\n・「12.56」：半円をさらに半分にしています。\n・「16」：半径の2乗だけで、円周率と半分の操作を忘れています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/semicircle4.svg",
      "alt": "長さは図の表示を使いましょう。円周率は3.14です。",
      "caption": "長さは図の表示を使いましょう。円周率は3.14です。"
    },
    "misconceptions": [
      {
        "answer": "50.24",
        "reason": "円全体の面積のままで、半分にしていません。"
      },
      {
        "answer": "12.56",
        "reason": "半円をさらに半分にしています。"
      },
      {
        "answer": "16",
        "reason": "半径の2乗だけで、円周率と半分の操作を忘れています。"
      }
    ]
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
    "explanation": "円全体は6×6×3.14＝113.04。4分の1なので113.04÷4＝28.26cm²です。\n\nほかの選択肢\n・「113.04」：円全体の面積を答えています。\n・「56.52」：4分の1ではなく半分にしています。\n・「18.84」：円の面積ではなく半径×円周率を求めています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/quarter6.svg",
      "alt": "長さは図の表示を使いましょう。円周率は3.14です。",
      "caption": "長さは図の表示を使いましょう。円周率は3.14です。"
    },
    "misconceptions": [
      {
        "answer": "113.04",
        "reason": "円全体の面積を答えています。"
      },
      {
        "answer": "56.52",
        "reason": "4分の1ではなく半分にしています。"
      },
      {
        "answer": "18.84",
        "reason": "円の面積ではなく半径×円周率を求めています。"
      }
    ]
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
      "13.76",
      "50.24",
      "38.88",
      "25.12"
    ],
    "hints": [
      "円の面積は半径×半径×円周率です。直径の半分が半径です。"
    ],
    "explanation": "正方形は64cm²、円は4×4×3.14＝50.24cm²。64－50.24＝13.76cm²です。\n\nほかの選択肢\n・「50.24」：円の面積を答えています。求めるのは正方形から円を除いた部分です。\n・「38.88」：半円1個分しか正方形から引いていません。\n・「25.12」：半円の面積を答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/square-circle.svg",
      "alt": "正方形の内側で、円の外側を求める図",
      "caption": "正方形の内側で、円の外側を求める図"
    },
    "misconceptions": [
      {
        "answer": "50.24",
        "reason": "円の面積を答えています。求めるのは正方形から円を除いた部分です。"
      },
      {
        "answer": "38.88",
        "reason": "半円1個分しか正方形から引いていません。"
      },
      {
        "answer": "25.12",
        "reason": "半円の面積を答えています。"
      }
    ]
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
      "34.54",
      "3.14",
      "31.4",
      "113.04"
    ],
    "hints": [
      "円の面積は半径×半径×円周率です。直径の半分が半径です。"
    ],
    "explanation": "外側の半径は6mです。(6×6－5×5)×3.14＝11×3.14＝34.54m²です。\n\nほかの選択肢\n・「3.14」：道の{幅|はば}1mだけを半径として円の面積を求めています。\n・「31.4」：{花壇|かだん}の円周だけを求め、外側へ広がる分を無視しています。\n・「113.04」：外側の円全体の面積で、{花壇|かだん}を引いていません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/ring.svg",
      "alt": "内側が{花壇|かだん}、周囲の帯が道。中心は同じです。",
      "caption": "内側が{花壇|かだん}、周囲の帯が道。中心は同じです。"
    },
    "misconceptions": [
      {
        "answer": "3.14",
        "reason": "道の{幅|はば}1mだけを半径として円の面積を求めています。"
      },
      {
        "answer": "31.4",
        "reason": "{花壇|かだん}の円周だけを求め、外側へ広がる分を無視しています。"
      },
      {
        "answer": "113.04",
        "reason": "外側の円全体の面積で、{花壇|かだん}を引いていません。"
      }
    ]
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
      "2",
      "4",
      "1",
      "8"
    ],
    "hints": [
      "円の面積は半径×半径×円周率です。直径の半分が半径です。"
    ],
    "explanation": "半径が2倍なので大きい半円は小さい半円1個の4倍。2個分と比べると4÷2＝2倍です。\n\nほかの選択肢\n・「4」：大きい半円と小さい半円1個を比べています。\n・「1」：小さい半円2個の直径の合計が同じだから面積も同じと誤解しています。\n・「8」：面積比4倍に小さい半円の個数2をかけています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "4",
        "reason": "大きい半円と小さい半円1個を比べています。"
      },
      {
        "answer": "1",
        "reason": "小さい半円2個の直径の合計が同じだから面積も同じと誤解しています。"
      },
      {
        "answer": "8",
        "reason": "面積比4倍に小さい半円の個数2をかけています。"
      }
    ]
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
    "explanation": "角柱の体積＝底面積×高さ。底面積はすでに三角形の面積なので、12×5＝60cm³です。\n\nほかの選択肢\n・「30」：底面積が分かっているのに、さらに2で割っています。\n・「17」：底面積と高さを足しています。\n・「120」：三角柱の体積をさらに2倍しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "diagram": {
      "kind": "solid",
      "shape": "triangularPrism",
      "h": 5,
      "unit": "cm",
      "baseArea": 12,
      "caption": "底面積は12cm²、柱の高さは5cmです。"
    },
    "misconceptions": [
      {
        "answer": "30",
        "reason": "底面積が分かっているのに、さらに2で割っています。"
      },
      {
        "answer": "17",
        "reason": "底面積と高さを足しています。"
      },
      {
        "answer": "120",
        "reason": "三角柱の体積をさらに2倍しています。"
      }
    ]
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
      "62.8",
      "31.4",
      "125.6",
      "20"
    ],
    "hints": [
      "角柱・円柱の体積は底面積×高さです。"
    ],
    "explanation": "底面積は2×2×3.14＝12.56cm²。12.56×5＝62.8cm³です。\n\nほかの選択肢\n・「31.4」：底面を三角形のように2で割っています。\n・「125.6」：正しい体積をさらに2倍しています。\n・「20」：円周率をかけ忘れています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/cylinder.svg",
      "alt": "上と下の円が底面です。図は模式図です。",
      "caption": "上と下の円が底面です。図は模式図です。"
    },
    "misconceptions": [
      {
        "answer": "31.4",
        "reason": "底面を三角形のように2で割っています。"
      },
      {
        "answer": "125.6",
        "reason": "正しい体積をさらに2倍しています。"
      },
      {
        "answer": "20",
        "reason": "円周率をかけ忘れています。"
      }
    ]
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
      "3",
      "6",
      "9",
      "1"
    ],
    "hints": [
      "角柱・円柱の体積は底面積×高さです。"
    ],
    "explanation": "体積＝底面積×高さなので、高さだけが3倍なら体積も3倍です。\n\nほかの選択肢\n・「6」：高さの倍率に2をかけています。\n・「9」：底面積も3倍になると考えています。\n・「1」：高さが変わっても体積は変わらないと考えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "6",
        "reason": "高さの倍率に2をかけています。"
      },
      {
        "answer": "9",
        "reason": "底面積も3倍になると考えています。"
      },
      {
        "answer": "1",
        "reason": "高さが変わっても体積は変わらないと考えています。"
      }
    ]
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
      "120",
      "240",
      "60",
      "80"
    ],
    "hints": [
      "角柱・円柱の体積は底面積×高さです。"
    ],
    "explanation": "底面積は6×4÷2＝12cm²。12×10＝120cm³です。\n\nほかの選択肢\n・「240」：三角形の底面積を求めるとき、2で割り忘れています。\n・「60」：底面積を求めた後にもう1回2で割っています。\n・「80」：三角形の底辺6cmを使わずに計算しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "240",
        "reason": "三角形の底面積を求めるとき、2で割り忘れています。"
      },
      {
        "answer": "60",
        "reason": "底面積を求めた後にもう1回2で割っています。"
      },
      {
        "answer": "80",
        "reason": "三角形の底辺6cmを使わずに計算しています。"
      }
    ]
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
    "explanation": "底面積は12.56cm²。高さは体積÷底面積で、125.6÷12.56＝10cmです。\n\nほかの選択肢\n・「5」：底面積を2倍にしてから体積を割っています。\n・「20」：底面積を半円の面積として半分にしています。\n・「31.4」：底面積の円周率をかけず、125.6を4だけで割っています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "5",
        "reason": "底面積を2倍にしてから体積を割っています。"
      },
      {
        "answer": "20",
        "reason": "底面積を半円の面積として半分にしています。"
      },
      {
        "answer": "31.4",
        "reason": "底面積の円周率をかけず、125.6を4だけで割っています。"
      }
    ]
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
      "240",
      "360",
      "120",
      "34"
    ],
    "hints": [
      "角柱・円柱の体積は底面積×高さです。"
    ],
    "explanation": "水の体積には容器全体の高さではなく水の深さを使い、24×10＝240cm³です。\n\nほかの選択肢\n・「360」：容器の高さ15cmを使い、満水の体積を求めています。\n・「120」：水量をさらに2で割っています。\n・「34」：底面積と水の深さを足しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "360",
        "reason": "容器の高さ15cmを使い、満水の体積を求めています。"
      },
      {
        "answer": "120",
        "reason": "水量をさらに2で割っています。"
      },
      {
        "answer": "34",
        "reason": "底面積と水の深さを足しています。"
      }
    ]
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
      "5",
      "10",
      "20",
      "2.5"
    ],
    "hints": [
      "角柱・円柱の体積は底面積×高さです。"
    ],
    "explanation": "もとの合計体積は3×3×3.14×10×2。新しい底面積は6×6×3.14で4倍なので、高さは10×2÷4＝5cmです。\n\nほかの選択肢\n・「10」：半径が2倍になったため底面積が4倍になることを反映していません。\n・「20」：もとの円柱2個分の高さをそのまま足しています。\n・「2.5」：もとの円柱が2個あることを忘れています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "10",
        "reason": "半径が2倍になったため底面積が4倍になることを反映していません。"
      },
      {
        "answer": "20",
        "reason": "もとの円柱2個分の高さをそのまま足しています。"
      },
      {
        "answer": "2.5",
        "reason": "もとの円柱が2個あることを忘れています。"
      }
    ]
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
      "100",
      "400",
      "300",
      "14"
    ],
    "hints": [
      "角柱・円柱の体積は底面積×高さです。"
    ],
    "explanation": "水面の上昇2cm分が石の体積です。50×(8－6)＝100cm³です。\n\nほかの選択肢\n・「400」：石を沈めた後の高さ8cmの全体積を答えています。\n・「300」：もとの水の体積を答えています。\n・「14」：水面の前後の深さを足しています。上昇分の体積を求めましょう。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "400",
        "reason": "石を沈めた後の高さ8cmの全体積を答えています。"
      },
      {
        "answer": "300",
        "reason": "もとの水の体積を答えています。"
      },
      {
        "answer": "14",
        "reason": "水面の前後の深さを足しています。上昇分の体積を求めましょう。"
      }
    ]
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
    "explanation": "比例ではy÷xが一定です。6÷2＝3なので、y＝3×xです。\n\nほかの選択肢\n・「y＝x＋4」：1組の値が合うだけの足し算の式を選んでいます。比例はxの定数倍です。\n・「y＝6×x」：yの値6をそのまま比例定数にしています。\n・「y＝12÷x」：積が一定の反比例の式を選んでいます。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "y＝x＋4",
        "reason": "1組の値が合うだけの足し算の式を選んでいます。比例はxの定数倍です。"
      },
      {
        "answer": "y＝6×x",
        "reason": "yの値6をそのまま比例定数にしています。"
      },
      {
        "answer": "y＝12÷x",
        "reason": "積が一定の反比例の式を選んでいます。"
      }
    ]
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
      "20",
      "9",
      "1.25",
      "25"
    ],
    "hints": [
      "比例ではy÷xが一定で、y＝決まった数×xです。"
    ],
    "explanation": "式のxに5を入れると、y＝4×5＝20です。\n\nほかの選択肢\n・「9」：4と5を足しています。\n・「1.25」：5÷4としています。\n・「25」：xの5を2回かけています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "9",
        "reason": "4と5を足しています。"
      },
      {
        "answer": "1.25",
        "reason": "5÷4としています。"
      },
      {
        "answer": "25",
        "reason": "xの5を2回かけています。"
      }
    ]
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
      "3",
      "9",
      "1/3",
      "6"
    ],
    "hints": [
      "比例ではy÷xが一定で、y＝決まった数×xです。"
    ],
    "explanation": "比例する量は、一方が3倍になると他方も3倍になります。\n\nほかの選択肢\n・「9」：時間だけでなく比例定数も3倍にしています。\n・「1/3」：反比例の変わり方と混同しています。\n・「6」：もとの倍率3に2をかけています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "9",
        "reason": "時間だけでなく比例定数も3倍にしています。"
      },
      {
        "answer": "1/3",
        "reason": "反比例の変わり方と混同しています。"
      },
      {
        "answer": "6",
        "reason": "もとの倍率3に2をかけています。"
      }
    ]
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
      "270",
      "240",
      "360",
      "30"
    ],
    "hints": [
      "比例ではy÷xが一定で、y＝決まった数×xです。"
    ],
    "explanation": "1mの重さは120÷4＝30g。9mでは30×9＝270gです。\n\nほかの選択肢\n・「240」：4mから9mを2倍程度と見て計算しています。正しくは2.25倍です。\n・「360」：1mの重さを40gと誤って計算しています。\n・「30」：1mの重さだけを答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "240",
        "reason": "4mから9mを2倍程度と見て計算しています。正しくは2.25倍です。"
      },
      {
        "answer": "360",
        "reason": "1mの重さを40gと誤って計算しています。"
      },
      {
        "answer": "30",
        "reason": "1mの重さだけを答えています。"
      }
    ]
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
    "explanation": "x＝4を式に入れるとy＝10です。他の点はy＝2.5×xを満たしません。\n\nほかの選択肢\n・「(4,6.5)」：y＝x＋2.5という足し算にしています。\n・「(10,4)」：xとyの座標を逆にしています。\n・「(2,6)」：xに2.5をかけた値は5であり、6ではありません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-original-proportion-line.svg",
      "caption": "x（単位なし）は大目盛り1ごと、y（単位なし）は大目盛り2.5ごと。補助目盛りは横0.5、縦0.5です。",
      "alt": "x（単位なし）は大目盛り1ごと、y（単位なし）は大目盛り2.5ごと。補助目盛りは横0.5、縦0.5です。"
    },
    "misconceptions": [
      {
        "answer": "(4,6.5)",
        "reason": "y＝x＋2.5という足し算にしています。"
      },
      {
        "answer": "(10,4)",
        "reason": "xとyの座標を逆にしています。"
      },
      {
        "answer": "(2,6)",
        "reason": "xに2.5をかけた値は5であり、6ではありません。"
      }
    ]
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
      "24",
      "16",
      "18",
      "36"
    ],
    "hints": [
      "比例ではy÷xが一定で、y＝決まった数×xです。"
    ],
    "explanation": "水量÷時間＝3で一定です。8分では3×8＝24Lです。\n\nほかの選択肢\n・「16」：毎分2Lとして計算しています。\n・「18」：8分ではなく6分の水量を答えています。\n・「36」：4分から8分へ3倍になると考えています。",
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
    },
    "misconceptions": [
      {
        "answer": "16",
        "reason": "毎分2Lとして計算しています。"
      },
      {
        "answer": "18",
        "reason": "8分ではなく6分の水量を答えています。"
      },
      {
        "answer": "36",
        "reason": "4分から8分へ3倍になると考えています。"
      }
    ]
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
      "320",
      "335",
      "350",
      "300"
    ],
    "hints": [
      "比例ではy÷xが一定で、y＝決まった数×xです。"
    ],
    "explanation": "1枚は800÷200＝4g。紙だけの重さは1340－60＝1280gなので、1280÷4＝320枚です。\n\nほかの選択肢\n・「335」：袋の重さを引かずに1340gを4gで割っています。\n・「350」：袋の重さを引く代わりに足しています。\n・「300」：紙だけの重さ1280gを1200gに丸めています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "335",
        "reason": "袋の重さを引かずに1340gを4gで割っています。"
      },
      {
        "answer": "350",
        "reason": "袋の重さを引く代わりに足しています。"
      },
      {
        "answer": "300",
        "reason": "紙だけの重さ1280gを1200gに丸めています。"
      }
    ]
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
      "24",
      "120",
      "20",
      "30"
    ],
    "hints": [
      "比例ではy÷xが一定で、y＝決まった数×xです。"
    ],
    "explanation": "xの増加5に対するyの増加は20なので、比例定数は20÷5＝4。y＝4×xより、x＝6では24です。\n\nほかの選択肢\n・「120」：yの増加20を比例定数として、20×6を求めています。\n・「20」：yの増加量だけを答えています。\n・「30」：xの増加5を比例定数としてかけています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "120",
        "reason": "yの増加20を比例定数として、20×6を求めています。"
      },
      {
        "answer": "20",
        "reason": "yの増加量だけを答えています。"
      },
      {
        "answer": "30",
        "reason": "xの増加5を比例定数としてかけています。"
      }
    ]
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
    "explanation": "反比例では積x×yが一定です。3×12＝36です。\n\nほかの選択肢\n・「4」：y÷xという比例の定数を求めています。\n・「15」：xとyを足しています。\n・「9」：yからxを引いています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "4",
        "reason": "y÷xという比例の定数を求めています。"
      },
      {
        "answer": "15",
        "reason": "xとyを足しています。"
      },
      {
        "answer": "9",
        "reason": "yからxを引いています。"
      }
    ]
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
      "4",
      "18",
      "30",
      "144"
    ],
    "hints": [
      "反比例ではx×yが一定です。"
    ],
    "explanation": "xに6を入れて、24÷6＝4です。\n\nほかの選択肢\n・「18」：24から6を引いています。\n・「30」：24と6を足しています。\n・「144」：24に6をかけています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "18",
        "reason": "24から6を引いています。"
      },
      {
        "answer": "30",
        "reason": "24と6を足しています。"
      },
      {
        "answer": "144",
        "reason": "24に6をかけています。"
      }
    ]
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
      "1/2倍になる",
      "2倍になる",
      "4倍になる",
      "変わらない"
    ],
    "hints": [
      "反比例ではx×yが一定です。"
    ],
    "explanation": "積を一定にするため、一方が2倍ならもう一方は1/2倍になります。\n\nほかの選択肢\n・「2倍になる」：比例の変わり方と混同しています。\n・「4倍になる」：両方の量を2倍する面積のように考えています。\n・「変わらない」：積を一定にするための変化を見落としています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "2倍になる",
        "reason": "比例の変わり方と混同しています。"
      },
      {
        "answer": "4倍になる",
        "reason": "両方の量を2倍する面積のように考えています。"
      },
      {
        "answer": "変わらない",
        "reason": "積を一定にするための変化を見落としています。"
      }
    ]
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
      "8",
      "42",
      "288",
      "12"
    ],
    "hints": [
      "反比例ではx×yが一定です。"
    ],
    "explanation": "縦×横＝48なので、横は48÷6＝8cmです。\n\nほかの選択肢\n・「42」：48から6を引いています。\n・「288」：面積に縦の長さをかけています。\n・「12」：面積を縦6cmではなく4で割っています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "42",
        "reason": "48から6を引いています。"
      },
      {
        "answer": "288",
        "reason": "面積に縦の長さをかけています。"
      },
      {
        "answer": "12",
        "reason": "面積を縦6cmではなく4で割っています。"
      }
    ]
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
    "explanation": "人数×時間＝24で一定です。24÷8＝3時間です。\n\nほかの選択肢\n・「12」：人数が2倍になると時間も2倍になるとしています。\n・「2」：人数の増加4をそのまま時間から引いています。\n・「4」：仕事量24人時ではなく32人時として計算しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "12",
        "reason": "人数が2倍になると時間も2倍になるとしています。"
      },
      {
        "answer": "2",
        "reason": "人数の増加4をそのまま時間から引いています。"
      },
      {
        "answer": "4",
        "reason": "仕事量24人時ではなく32人時として計算しています。"
      }
    ]
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
      "一定の道のりを進む速さとかかる時間",
      "正方形の1辺と周の長さ",
      "買う個数と代金（単価一定）",
      "一定の速さで進む時間と道のり"
    ],
    "hints": [
      "反比例ではx×yが一定です。"
    ],
    "explanation": "道のりが一定なら、速さ×時間が一定です。他の3つは比例する関係です。\n\nほかの選択肢\n・「正方形の1辺と周の長さ」：周の長さは1辺の4倍で、比例です。\n・「買う個数と代金（単価一定）」：代金は単価×個数なので比例です。\n・「一定の速さで進む時間と道のり」：道のりは速さ×時間なので比例です。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "正方形の1辺と周の長さ",
        "reason": "周の長さは1辺の4倍で、比例です。"
      },
      {
        "answer": "買う個数と代金（単価一定）",
        "reason": "代金は単価×個数なので比例です。"
      },
      {
        "answer": "一定の速さで進む時間と道のり",
        "reason": "道のりは速さ×時間なので比例です。"
      }
    ]
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
      "4",
      "6",
      "3",
      "16/3"
    ],
    "hints": [
      "反比例ではx×yが一定です。"
    ],
    "explanation": "全体の仕事量は6×8＝48人時。終えたのは6×2＝12人時なので、残り36人時。36÷9＝4時間です。\n\nほかの選択肢\n・「6」：人数が変わっても残り時間が同じだと考えています。\n・「3」：すでに終えた仕事量を多く引き過ぎています。\n・「16/3」：最初の2時間に終えた仕事を引いていません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "6",
        "reason": "人数が変わっても残り時間が同じだと考えています。"
      },
      {
        "answer": "3",
        "reason": "すでに終えた仕事量を多く引き過ぎています。"
      },
      {
        "answer": "16/3",
        "reason": "最初の2時間に終えた仕事を引いていません。"
      }
    ]
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
      "48",
      "50",
      "60",
      "40"
    ],
    "hints": [
      "反比例ではx×yが一定です。"
    ],
    "explanation": "全道のり480kmを全時間10時間で割り、480÷10＝48km/時。速さの単純な平均50ではありません。\n\nほかの選択肢\n・「50」：60と40を単純に平均しています。\n・「60」：行きの速さだけを答えています。\n・「40」：帰りの速さだけを答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "50",
        "reason": "60と40を単純に平均しています。"
      },
      {
        "answer": "60",
        "reason": "行きの速さだけを答えています。"
      },
      {
        "answer": "40",
        "reason": "帰りの速さだけを答えています。"
      }
    ]
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
    "explanation": "小さい順に並べた5個の中央、3番目の値は5です。\n\nほかの選択肢\n・「6」：平均を求めています。\n・「7」：中央の位置を1つ右にずらしています。\n・「3」：最小値を選んでいます。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "6",
        "reason": "平均を求めています。"
      },
      {
        "answer": "7",
        "reason": "中央の位置を1つ右にずらしています。"
      },
      {
        "answer": "3",
        "reason": "最小値を選んでいます。"
      }
    ]
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
      "6",
      "4",
      "5",
      "2"
    ],
    "hints": [
      "記録を小さい順に整理し、平均・中央値・{最頻値|さいひんち}を区別しましょう。"
    ],
    "explanation": "最も多く現れる値が{最頻値|さいひんち}です。6が3回で最も多いです。\n\nほかの選択肢\n・「4」：2番目に多い値を選んでいます。\n・「5」：中央に近い値と{最頻値|さいひんち}を混同しています。\n・「2」：最小値を選んでいます。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "4",
        "reason": "2番目に多い値を選んでいます。"
      },
      {
        "answer": "5",
        "reason": "中央に近い値と{最頻値|さいひんち}を混同しています。"
      },
      {
        "answer": "2",
        "reason": "最小値を選んでいます。"
      }
    ]
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
      "16",
      "15",
      "20",
      "40"
    ],
    "hints": [
      "記録を小さい順に整理し、平均・中央値・{最頻値|さいひんち}を区別しましょう。"
    ],
    "explanation": "平均＝合計÷個数なので、80÷5＝16cmです。\n\nほかの選択肢\n・「15」：合計80を個数5で正しく割れていません。\n・「20」：人数を4人として割っています。\n・「40」：人数を2人として割っています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "15",
        "reason": "合計80を個数5で正しく割れていません。"
      },
      {
        "answer": "20",
        "reason": "人数を4人として割っています。"
      },
      {
        "answer": "40",
        "reason": "人数を2人として割っています。"
      }
    ]
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
      "7",
      "6",
      "8",
      "14"
    ],
    "hints": [
      "記録を小さい順に整理し、平均・中央値・{最頻値|さいひんち}を区別しましょう。"
    ],
    "explanation": "個数が偶数のときは中央の2つを平均します。(6＋8)÷2＝7です。\n\nほかの選択肢\n・「6」：中央の小さいほうの値だけを答えています。\n・「8」：中央の大きいほうの値だけを答えています。\n・「14」：中央の2つを足した後に2で割っていません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "6",
        "reason": "中央の小さいほうの値だけを答えています。"
      },
      {
        "answer": "8",
        "reason": "中央の大きいほうの値だけを答えています。"
      },
      {
        "answer": "14",
        "reason": "中央の2つを足した後に2で割っていません。"
      }
    ]
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
    "explanation": "10以上は10をふくみ、20未満は20をふくみません。\n\nほかの選択肢\n・「9」：下端10以上という条件を満たしません。\n・「20」：上端20は「未満」なので{含|ふく}みません。\n・「21」：20より大きく、階級の外です。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "9",
        "reason": "下端10以上という条件を満たしません。"
      },
      {
        "answer": "20",
        "reason": "上端20は「未満」なので{含|ふく}みません。"
      },
      {
        "answer": "21",
        "reason": "20より大きく、階級の外です。"
      }
    ]
  },
  {
    "id": "math_g6_course_data_006",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "data",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "次の柱状グラフは、記録を10点ずつの階級に分けたものです。記録が20点未満の人は何人ですか。",
    "answer": "7",
    "choices": [
      "7",
      "5",
      "8",
      "10"
    ],
    "hints": [
      "記録を小さい順に整理し、平均・中央値・{最頻値|さいひんち}を区別しましょう。"
    ],
    "explanation": "20未満の最初の2階級を合わせ、2＋5＝7人です。\n\nほかの選択肢\n・「5」：10以上20未満の階級だけを数えています。\n・「8」：0以上10未満ではなく20以上の3人を足しています。\n・「10」：20以上の人もふくめて全員を数えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-original-histogram.svg",
      "caption": "記録（点）は大目盛り10ごと、人数（人）は大目盛り1ごと。補助目盛りは横5、縦1です。 各階級は左端以上・右端未満です。",
      "alt": "記録（点）は大目盛り10ごと、人数（人）は大目盛り1ごと。補助目盛りは横5、縦1です。"
    },
    "misconceptions": [
      {
        "answer": "5",
        "reason": "10以上20未満の階級だけを数えています。"
      },
      {
        "answer": "8",
        "reason": "0以上10未満ではなく20以上の3人を足しています。"
      },
      {
        "answer": "10",
        "reason": "20以上の人もふくめて全員を数えています。"
      }
    ]
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
      "90",
      "78",
      "80",
      "100"
    ],
    "hints": [
      "記録を小さい順に整理し、平均・中央値・{最頻値|さいひんち}を区別しましょう。"
    ],
    "explanation": "5人の合計は78×5＝390点。もとの合計300点を引くと90点です。\n\nほかの選択肢\n・「78」：5人目の点数を全体の平均と同じにしています。\n・「80」：もとの記録の1つを選んでいます。\n・「100」：もとの平均75ではなく合計を小さく見積もっています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "78",
        "reason": "5人目の点数を全体の平均と同じにしています。"
      },
      {
        "answer": "80",
        "reason": "もとの記録の1つを選んでいます。"
      },
      {
        "answer": "100",
        "reason": "もとの平均75ではなく合計を小さく見積もっています。"
      }
    ]
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
      "平均も中央値も同じだが、B班の最大と最小の差が大きい",
      "平均はA班のほうが高い",
      "中央値はB班のほうが高い",
      "最大と最小の差は同じ"
    ],
    "hints": [
      "記録を小さい順に整理し、平均・中央値・{最頻値|さいひんち}を区別しましょう。"
    ],
    "explanation": "どちらも合計30、平均6、中央値6です。最大－最小はA班4、B班10で、B班の散らばりが大きいです。\n\nほかの選択肢\n・「平均はA班のほうが高い」：どちらも合計30、人数5で平均6です。\n・「中央値はB班のほうが高い」：どちらも中央の3番目は6です。\n・「最大と最小の差は同じ」：A班は8－4＝4、B班は11－1＝10です。",
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
    },
    "misconceptions": [
      {
        "answer": "平均はA班のほうが高い",
        "reason": "どちらも合計30、人数5で平均6です。"
      },
      {
        "answer": "中央値はB班のほうが高い",
        "reason": "どちらも中央の3番目は6です。"
      },
      {
        "answer": "最大と最小の差は同じ",
        "reason": "A班は8－4＝4、B班は11－1＝10です。"
      }
    ]
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
    "explanation": "AB、AC、BCの3組です。ABとBAは同じ組として数えます。\n\nほかの選択肢\n・「6」：ABとBAなど、同じ組を2回数えています。\n・「9」：同じ人を2回選ぶ場合まで数えています。\n・「2」：AをふくまないBCの組を見落としています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "6",
        "reason": "ABとBAなど、同じ組を2回数えています。"
      },
      {
        "answer": "9",
        "reason": "同じ人を2回選ぶ場合まで数えています。"
      },
      {
        "answer": "2",
        "reason": "AをふくまないBCの組を見落としています。"
      }
    ]
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
      "6",
      "5",
      "3",
      "9"
    ],
    "hints": [
      "順序を区別するか、同じものを重複して数えていないか確かめましょう。"
    ],
    "explanation": "上着1種類につきズボンが3種類なので、2×3＝6通りです。\n\nほかの選択肢\n・「5」：種類の数を足しています。組み合わせはかけ算です。\n・「3」：上着を1種類に固定しています。\n・「9」：上着も3種類あるとして計算しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "5",
        "reason": "種類の数を足しています。組み合わせはかけ算です。"
      },
      {
        "answer": "3",
        "reason": "上着を1種類に固定しています。"
      },
      {
        "answer": "9",
        "reason": "上着も3種類あるとして計算しています。"
      }
    ]
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
      "6",
      "3",
      "9",
      "12"
    ],
    "hints": [
      "順序を区別するか、同じものを重複して数えていないか確かめましょう。"
    ],
    "explanation": "先頭3通り、次は残り2通り、最後1通りなので、3×2×1＝6通りです。\n\nほかの選択肢\n・「3」：先頭の人だけを決めて数えています。\n・「9」：残った人ではなく毎回3人から選んでいます。\n・「12」：3人ではなく4人を並べる場合の一部と混同しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "3",
        "reason": "先頭の人だけを決めて数えています。"
      },
      {
        "answer": "9",
        "reason": "残った人ではなく毎回3人から選んでいます。"
      },
      {
        "answer": "12",
        "reason": "3人ではなく4人を並べる場合の一部と混同しています。"
      }
    ]
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
      "12",
      "16",
      "8",
      "6"
    ],
    "hints": [
      "順序を区別するか、同じものを重複して数えていないか確かめましょう。"
    ],
    "explanation": "十の位は4通り、一の位は使ったカードを除く3通りで、4×3＝12個です。\n\nほかの選択肢\n・「16」：同じカードを2回使う場合もふくめています。\n・「8」：一の位の選択肢を2通りにしてしまっています。\n・「6」：12と21など順序の{違|ちが}う数を同じものとして数えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "16",
        "reason": "同じカードを2回使う場合もふくめています。"
      },
      {
        "answer": "8",
        "reason": "一の位の選択肢を2通りにしてしまっています。"
      },
      {
        "answer": "6",
        "reason": "12と21など順序の{違|ちが}う数を同じものとして数えています。"
      }
    ]
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
    "explanation": "各チーム4試合で5×4＝20ですが、同じ試合を2回数えるので20÷2＝10試合です。\n\nほかの選択肢\n・「20」：1つの試合を両チームから2回数えています。\n・「15」：自分自身との試合も数えてから半分にしています。\n・「5」：各チームが1回だけ試合をすると考えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "20",
        "reason": "1つの試合を両チームから2回数えています。"
      },
      {
        "answer": "15",
        "reason": "自分自身との試合も数えてから半分にしています。"
      },
      {
        "answer": "5",
        "reason": "各チームが1回だけ試合をすると考えています。"
      }
    ]
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
      "4",
      "6",
      "9",
      "3"
    ],
    "hints": [
      "順序を区別するか、同じものを重複して数えていないか確かめましょう。"
    ],
    "explanation": "十の位は0にできず、1か2の2通り。一の位は残り2通りなので2×2＝4個です。\n\nほかの選択肢\n・「6」：十の位が0になる場合もふくめています。\n・「9」：十の位の0と同じカードの再使用を両方認めています。\n・「3」：使える一の位を1つ見落としています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "6",
        "reason": "十の位が0になる場合もふくめています。"
      },
      {
        "answer": "9",
        "reason": "十の位の0と同じカードの再使用を両方認めています。"
      },
      {
        "answer": "3",
        "reason": "使える一の位を1つ見落としています。"
      }
    ]
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
      "12",
      "24",
      "6",
      "8"
    ],
    "hints": [
      "順序を区別するか、同じものを重複して数えていないか確かめましょう。"
    ],
    "explanation": "AとBを1組とみると3つの並び方は6通り。組の中のAB、BAが2通りあり、6×2＝12通りです。\n\nほかの選択肢\n・「24」：AとBが離れる並び方までふくめています。\n・「6」：組の中のABとBAの{違|ちが}いを数え忘れています。\n・「8」：3つのまとまりを並べる6通りを4通りに減らしています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "24",
        "reason": "AとBが離れる並び方までふくめています。"
      },
      {
        "answer": "6",
        "reason": "組の中のABとBAの{違|ちが}いを数え忘れています。"
      },
      {
        "answer": "8",
        "reason": "3つのまとまりを並べる6通りを4通りに減らしています。"
      }
    ]
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
      "12",
      "24",
      "6",
      "8"
    ],
    "hints": [
      "順序を区別するか、同じものを重複して数えていないか確かめましょう。"
    ],
    "explanation": "一の位は2か4の2通り。百の位は残り3通り、十の位は2通りなので2×3×2＝12個です。\n\nほかの選択肢\n・「24」：一の位が奇数になる並び方もふくめています。\n・「6」：一の位を2だけに固定しています。\n・「8」：百の位の選び方を3通りではなく2通りとしています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "24",
        "reason": "一の位が奇数になる並び方もふくめています。"
      },
      {
        "answer": "6",
        "reason": "一の位を2だけに固定しています。"
      },
      {
        "answer": "8",
        "reason": "百の位の選び方を3通りではなく2通りとしています。"
      }
    ]
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
      "5/7",
      "8/9",
      "6/7"
    ],
    "hints": [
      "かけ算は分子どうし・分母どうし、割り算は割る数を逆数にします。"
    ],
    "explanation": "2×3/(3×4)＝6/12＝1/2です。\n\nほかの選択肢\n・「5/7」：分子どうし・分母どうしをかけずに足しています。\n・「8/9」：かけ算なのに、3/4を逆数4/3にしています。\n・「6/7」：分子はかけましたが、分母を3＋4と足しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "5/7",
        "reason": "分子どうし・分母どうしをかけずに足しています。"
      },
      {
        "answer": "8/9",
        "reason": "かけ算なのに、3/4を逆数4/3にしています。"
      },
      {
        "answer": "6/7",
        "reason": "分子はかけましたが、分母を3＋4と足しています。"
      }
    ]
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
      "6",
      "30",
      "3/50",
      "2"
    ],
    "hints": [
      "かけ算は分子どうし・分母どうし、割り算は割る数を逆数にします。"
    ],
    "explanation": "3×10/5＝30/5＝6です。\n\nほかの選択肢\n・「30」：分子に10をかけただけで、分母5で割っていません。\n・「3/50」：整数10を分母にかけています。\n・「2」：10÷5の値だけを答え、分子3をかけ忘れています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "30",
        "reason": "分子に10をかけただけで、分母5で割っていません。"
      },
      {
        "answer": "3/50",
        "reason": "整数10を分母にかけています。"
      },
      {
        "answer": "2",
        "reason": "10÷5の値だけを答え、分子3をかけ忘れています。"
      }
    ]
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
      "7/2",
      "－2/7",
      "2/7",
      "1/7"
    ],
    "hints": [
      "かけ算は分子どうし・分母どうし、割り算は割る数を逆数にします。"
    ],
    "explanation": "かけて1になる数が逆数です。2/7×7/2＝1です。\n\nほかの選択肢\n・「－2/7」：逆数を符号を変えることと混同しています。\n・「2/7」：もとの分数をそのまま答えています。\n・「1/7」：分子を1にすれば逆数になると考えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "－2/7",
        "reason": "逆数を符号を変えることと混同しています。"
      },
      {
        "answer": "2/7",
        "reason": "もとの分数をそのまま答えています。"
      },
      {
        "answer": "1/7",
        "reason": "分子を1にすれば逆数になると考えています。"
      }
    ]
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
      "3/8",
      "3/2",
      "8/3",
      "1/4"
    ],
    "hints": [
      "かけ算は分子どうし・分母どうし、割り算は割る数を逆数にします。"
    ],
    "explanation": "2で割るのは1/2をかけることです。3/4×1/2＝3/8です。\n\nほかの選択肢\n・「3/2」：2で割る代わりに2をかけています。\n・「8/3」：割る数ではなく全体の計算結果を逆数にしています。\n・「1/4」：分子から2を引いています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "3/2",
        "reason": "2で割る代わりに2をかけています。"
      },
      {
        "answer": "8/3",
        "reason": "割る数ではなく全体の計算結果を逆数にしています。"
      },
      {
        "answer": "1/4",
        "reason": "分子から2を引いています。"
      }
    ]
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
      "4/5"
    ],
    "hints": [
      "かけ算は分子どうし・分母どうし、割り算は割る数を逆数にします。"
    ],
    "explanation": "割る数4/5を逆数5/4にして、2/3×5/4＝10/12＝5/6です。\n\nほかの選択肢\n・「8/15」：割り算をそのままかけ算にしています。\n・「6/5」：割られる数2/3を逆数3/2にし、4/5をかけています。\n・「4/5」：割る数をそのまま答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "8/15",
        "reason": "割り算をそのままかけ算にしています。"
      },
      {
        "answer": "6/5",
        "reason": "割られる数2/3を逆数3/2にし、4/5をかけています。"
      },
      {
        "answer": "4/5",
        "reason": "割る数をそのまま答えています。"
      }
    ]
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
      "1",
      "1/3",
      "2",
      "4/3"
    ],
    "hints": [
      "かけ算は分子どうし・分母どうし、割り算は割る数を逆数にします。"
    ],
    "explanation": "1と1/2＝3/2なので、3/2×2/3＝1です。\n\nほかの選択肢\n・「1/3」：帯分数の整数部分1を落として計算しています。\n・「2」：帯分数を整数3として計算しています。\n・「4/3」：帯分数を2としてかけています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "1/3",
        "reason": "帯分数の整数部分1を落として計算しています。"
      },
      {
        "answer": "2",
        "reason": "帯分数を整数3として計算しています。"
      },
      {
        "answer": "4/3",
        "reason": "帯分数を2としてかけています。"
      }
    ]
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
      "1",
      "0",
      "25/36",
      "36/25"
    ],
    "hints": [
      "かけ算は分子どうし・分母どうし、割り算は割る数を逆数にします。"
    ],
    "explanation": "0でない数をその数自身で割ると1です。\n\nほかの選択肢\n・「0」：同じ数の引き算と混同しています。\n・「25/36」：割り算をかけ算としています。\n・「36/25」：両方を逆数にしてかけています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "0",
        "reason": "同じ数の引き算と混同しています。"
      },
      {
        "answer": "25/36",
        "reason": "割り算をかけ算としています。"
      },
      {
        "answer": "36/25",
        "reason": "両方を逆数にしてかけています。"
      }
    ]
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
      "1/6",
      "7/17",
      "4/3",
      "3/8"
    ],
    "hints": [
      "かけ算は分子どうし・分母どうし、割り算は割る数を逆数にします。"
    ],
    "explanation": "4と8、3と9を約分すると、1×1/(3×2)＝1/6です。\n\nほかの選択肢\n・「7/17」：分子どうし・分母どうしを足しています。\n・「4/3」：分子をかけた12だけを分母9で割り、分母8をかけ忘れています。\n・「3/8」：最初の4/9を1とみなして省いています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "7/17",
        "reason": "分子どうし・分母どうしを足しています。"
      },
      {
        "answer": "4/3",
        "reason": "分子をかけた12だけを分母9で割り、分母8をかけ忘れています。"
      },
      {
        "answer": "3/8",
        "reason": "最初の4/9を1とみなして省いています。"
      }
    ]
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
      "3/4"
    ],
    "hints": [
      "かけ算は分子どうし・分母どうし、割り算は割る数を逆数にします。"
    ],
    "explanation": "1mの重さ×長さより、3/4×2/3＝1/2kgです。\n\nほかの選択肢\n・「9/8」：2/3をかける代わりに割っています。\n・「2/3」：長さの数値をそのまま重さとして答えています。\n・「3/4」：長さが2/3mになったことを反映せず、1mの重さを答えています。",
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
    },
    "misconceptions": [
      {
        "answer": "9/8",
        "reason": "2/3をかける代わりに割っています。"
      },
      {
        "answer": "2/3",
        "reason": "長さの数値をそのまま重さとして答えています。"
      },
      {
        "answer": "3/4",
        "reason": "長さが2/3mになったことを反映せず、1mの重さを答えています。"
      }
    ]
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
      "6",
      "3",
      "5",
      "10"
    ],
    "hints": [
      "かけ算は分子どうし・分母どうし、割り算は割る数を逆数にします。"
    ],
    "explanation": "全体量÷1人分で、3/5÷1/10＝3/5×10＝6人です。\n\nほかの選択肢\n・「3」：1人分を1/5Lとしてしまっています。\n・「5」：1人分と全体の関係を使わず、分母だけを選んでいます。\n・「10」：全体を1Lと取り{違|ちが}えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "3",
        "reason": "1人分を1/5Lとしてしまっています。"
      },
      {
        "answer": "5",
        "reason": "1人分と全体の関係を使わず、分母だけを選んでいます。"
      },
      {
        "answer": "10",
        "reason": "全体を1Lと取り{違|ちが}えています。"
      }
    ]
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
      "4/15",
      "12/5",
      "4/8",
      "1/15"
    ],
    "hints": [
      "かけ算は分子どうし・分母どうし、割り算は割る数を逆数にします。"
    ],
    "explanation": "4/5÷3＝4/5×1/3＝4/15mです。\n\nほかの選択肢\n・「12/5」：3で割らずに3倍しています。\n・「4/8」：分母5に3を足しています。\n・「1/15」：分子4から3を引いてから3で割っています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "12/5",
        "reason": "3で割らずに3倍しています。"
      },
      {
        "answer": "4/8",
        "reason": "分母5に3を足しています。"
      },
      {
        "answer": "1/15",
        "reason": "分子4から3を引いてから3で割っています。"
      }
    ]
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
      "24",
      "13.5",
      "21",
      "18"
    ],
    "hints": [
      "かけ算は分子どうし・分母どうし、割り算は割る数を逆数にします。"
    ],
    "explanation": "もとの数×3/4＝18なので、18÷3/4＝18×4/3＝24です。\n\nほかの選択肢\n・「13.5」：18をもとの量として3/4をかけています。\n・「21」：比の分子3を18に足しています。\n・「18」：3/4に当たる量を、そのままもとの量としています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "13.5",
        "reason": "18をもとの量として3/4をかけています。"
      },
      {
        "answer": "21",
        "reason": "比の分子3を18に足しています。"
      },
      {
        "answer": "18",
        "reason": "3/4に当たる量を、そのままもとの量としています。"
      }
    ]
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
      "3/10",
      "5/13"
    ],
    "hints": [
      "かけ算は分子どうし・分母どうし、割り算は割る数を逆数にします。"
    ],
    "explanation": "かけ算を先にして3/10。2/3＋3/10＝20/30＋9/30＝29/30です。\n\nほかの選択肢\n・「7/10」：(2/3＋1/2)×3/5と、足し算を先にしています。\n・「3/10」：1/2×3/5だけを計算し、2/3を足していません。\n・「5/13」：2/3＋3/10を、分子と分母をそれぞれ足して計算しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "7/10",
        "reason": "(2/3＋1/2)×3/5と、足し算を先にしています。"
      },
      {
        "answer": "3/10",
        "reason": "1/2×3/5だけを計算し、2/3を足していません。"
      },
      {
        "answer": "5/13",
        "reason": "2/3＋3/10を、分子と分母をそれぞれ足して計算しています。"
      }
    ]
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
      "0.8",
      "0.45",
      "0.2",
      "2.4"
    ],
    "hints": [
      "かけ算は分子どうし・分母どうし、割り算は割る数を逆数にします。"
    ],
    "explanation": "0.6＝3/5です。3/5×4/3＝4/5＝0.8です。\n\nほかの選択肢\n・「0.45」：割り算をかけ算にしています。\n・「0.2」：0.6を分子3で割った後に、分母4をかけ忘れています。\n・「2.4」：0.6に分母4をかけただけで、分子3で割っていません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "0.45",
        "reason": "割り算をかけ算にしています。"
      },
      {
        "answer": "0.2",
        "reason": "0.6を分子3で割った後に、分母4をかけ忘れています。"
      },
      {
        "answer": "2.4",
        "reason": "0.6に分母4をかけただけで、分子3で割っていません。"
      }
    ]
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
      "5/4",
      "5/9",
      "4/5",
      "1/2"
    ],
    "hints": [
      "かけ算は分子どうし・分母どうし、割り算は割る数を逆数にします。"
    ],
    "explanation": "1mの重さは5/6÷2/3＝5/6×3/2＝5/4kgです。\n\nほかの選択肢\n・「5/9」：重さに長さ2/3をかけています。\n・「4/5」：1mの重さではなく、1kgに当たる長さを求めています。\n・「1/2」：2/3mより1mは長いのに重さを小さくしています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "5/9",
        "reason": "重さに長さ2/3をかけています。"
      },
      {
        "answer": "4/5",
        "reason": "1mの重さではなく、1kgに当たる長さを求めています。"
      },
      {
        "answer": "1/2",
        "reason": "2/3mより1mは長いのに重さを小さくしています。"
      }
    ]
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
      "2/3",
      "23/29",
      "7/8",
      "49/128"
    ],
    "hints": [
      "かけ算は分子どうし・分母どうし、割り算は割る数を逆数にします。"
    ],
    "explanation": "7と21を7で、16と8を8で約分すると、1×2/(1×3)＝2/3です。\n\nほかの選択肢\n・「23/29」：分子どうし・分母どうしを足しています。\n・「7/8」：後ろの16/21をかけていません。\n・「49/128」：かけ算なのに16/21を逆数にしています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "23/29",
        "reason": "分子どうし・分母どうしを足しています。"
      },
      {
        "answer": "7/8",
        "reason": "後ろの16/21をかけていません。"
      },
      {
        "answer": "49/128",
        "reason": "かけ算なのに16/21を逆数にしています。"
      }
    ]
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
    "explanation": "残るのは入っていた水の1/4です。2/3×1/4＝1/6が全体に対する残量です。\n\nほかの選択肢\n・「1/2」：使った水の割合を答えています。\n・「1/4」：残りを、入っていた水に対する割合で答えています。\n・「1/12」：{水槽|すいそう}の空いていた部分1/3に1/4をかけています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "1/2",
        "reason": "使った水の割合を答えています。"
      },
      {
        "answer": "1/4",
        "reason": "残りを、入っていた水に対する割合で答えています。"
      },
      {
        "answer": "1/12",
        "reason": "{水槽|すいそう}の空いていた部分1/3に1/4をかけています。"
      }
    ]
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
      "5",
      "6",
      "7",
      "4"
    ],
    "hints": [
      "かけ算は分子どうし・分母どうし、割り算は割る数を逆数にします。"
    ],
    "explanation": "できる本数は3/4÷1/8＝6本です。6本に分けるには切れ目が5つなので、5回切ります。\n\nほかの選択肢\n・「6」：できる棒の本数を、そのまま切る回数としています。\n・「7」：本数に1を足しています。\n・「4」：切れ目を1つ余計に減らしています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "6",
        "reason": "できる棒の本数を、そのまま切る回数としています。"
      },
      {
        "answer": "7",
        "reason": "本数に1を足しています。"
      },
      {
        "answer": "4",
        "reason": "切れ目を1つ余計に減らしています。"
      }
    ]
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
      "2",
      "3",
      "4.5",
      "9"
    ],
    "hints": [
      "かけ算は分子どうし・分母どうし、割り算は割る数を逆数にします。"
    ],
    "explanation": "1時間にできる仕事は1/6＋1/3＝1/2です。全体1を1/2で割り、2時間で終わります。\n\nほかの選択肢\n・「3」：速いBさん1人で働く時間だけを答えています。\n・「4.5」：2人の作業時間を単純に平均しています。\n・「9」：2人の作業時間を足しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "3",
        "reason": "速いBさん1人で働く時間だけを答えています。"
      },
      {
        "answer": "4.5",
        "reason": "2人の作業時間を単純に平均しています。"
      },
      {
        "answer": "9",
        "reason": "2人の作業時間を足しています。"
      }
    ]
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
      "10",
      "6",
      "20/3",
      "15"
    ],
    "hints": [
      "かけ算は分子どうし・分母どうし、割り算は割る数を逆数にします。"
    ],
    "explanation": "最後に残る割合は(1－2/5)×(1－1/3)＝3/5×2/3＝2/5です。4÷2/5＝10mです。\n\nほかの選択肢\n・「6」：最後に残る割合を2/3だけとし、最初に使った分を反映していません。\n・「20/3」：最初に残る3/5で4mを割り、2回目に使った分を反映していません。\n・「15」：使った割合2/5と1/3をどちらも最初の全体に対する割合として引いています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "6",
        "reason": "最後に残る割合を2/3だけとし、最初に使った分を反映していません。"
      },
      {
        "answer": "20/3",
        "reason": "最初に残る3/5で4mを割り、2回目に使った分を反映していません。"
      },
      {
        "answer": "15",
        "reason": "使った割合2/5と1/3をどちらも最初の全体に対する割合として引いています。"
      }
    ]
  },
  {
    "id": "math_g6_course_symmetry_009",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "symmetry",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "縦の直線x＝5を対称の軸にします。点A(2,3)に対応する点の、右への位置はいくつですか。",
    "answer": "8",
    "choices": [
      "3",
      "2",
      "5",
      "8"
    ],
    "hints": [
      "対称の軸までの横の距離を調べましょう。"
    ],
    "explanation": "軸の左へ3離れているので、対応点は右へ3。右への位置は5＋3＝8です。\n\nほかの選択肢\n・「3」：軸からの距離だけを答えています。軸の位置に足しましょう。\n・「2」：左右を反転せず、もとの位置を答えています。\n・「5」：対応点ではなく軸の位置を答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "3",
        "reason": "軸からの距離だけを答えています。軸の位置に足しましょう。"
      },
      {
        "answer": "2",
        "reason": "左右を反転せず、もとの位置を答えています。"
      },
      {
        "answer": "5",
        "reason": "対応点ではなく軸の位置を答えています。"
      }
    ],
    "authoring": {
      "family": "symmetry_0",
      "parameters": {
        "n": 1
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-symmetry_0-1.svg",
      "caption": "横・縦とも数値は位置です。対応点は描いていません。",
      "alt": "右への位置（1目盛り1）は大目盛り2ごと、上への位置（1目盛り1）は大目盛り2ごと。補助目盛りは横1、縦1です。"
    }
  },
  {
    "id": "math_g6_course_symmetry_010",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "symmetry",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "正七角形の対称の軸は何本ですか。",
    "answer": "7",
    "choices": [
      "6",
      "1",
      "7",
      "14"
    ],
    "hints": [
      "正多角形では、頂点や辺の中点を通る軸を順に調べます。"
    ],
    "explanation": "正七角形には、折り重なる軸が7本あります。正n角形の対称の軸はn本です。\n\nほかの選択肢\n・「14」：1本の軸を中心の両側に分けて、2回数えています。\n・「6」：頂点や辺に対応する軸を1本見落としています。\n・「1」：1本見つけたところで止めず、ほかの軸も調べましょう。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "14",
        "reason": "1本の軸を中心の両側に分けて、2回数えています。"
      },
      {
        "answer": "6",
        "reason": "頂点や辺に対応する軸を1本見落としています。"
      },
      {
        "answer": "1",
        "reason": "1本見つけたところで止めず、ほかの軸も調べましょう。"
      }
    ],
    "authoring": {
      "family": "symmetry_1",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_symmetry_011",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "symmetry",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "点O(6,7)を対称の中心にします。点A(2,3)に対応する点の、上への位置はいくつですか。",
    "answer": "11",
    "choices": [
      "7",
      "11",
      "3",
      "4"
    ],
    "hints": [
      "中心から上と下へ同じ距離にある点を考えます。"
    ],
    "explanation": "AはOから下へ4。対応点は上へ4なので、7＋4＝11です。\n\nほかの選択肢\n・「3」：上下の位置を変えていません。\n・「4」：中心までの距離で止めています。\n・「7」：対応点ではなく中心の位置を答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "3",
        "reason": "上下の位置を変えていません。"
      },
      {
        "answer": "4",
        "reason": "中心までの距離で止めています。"
      },
      {
        "answer": "7",
        "reason": "対応点ではなく中心の位置を答えています。"
      }
    ],
    "authoring": {
      "family": "symmetry_2",
      "parameters": {
        "n": 1
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-symmetry_2-1.svg",
      "caption": "横・縦とも数値は位置です。対応点は描いていません。",
      "alt": "右への位置（1目盛り1）は大目盛り4ごと、上への位置（1目盛り1）は大目盛り4ごと。補助目盛りは横1、縦1です。"
    }
  },
  {
    "id": "math_g6_course_symmetry_012",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "symmetry",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "正八角形の対称の軸は何本ですか。",
    "answer": "8",
    "choices": [
      "8",
      "16",
      "7",
      "1"
    ],
    "hints": [
      "正多角形では、頂点や辺の中点を通る軸を順に調べます。"
    ],
    "explanation": "正八角形には、折り重なる軸が8本あります。正n角形の対称の軸はn本です。\n\nほかの選択肢\n・「16」：1本の軸を中心の両側に分けて、2回数えています。\n・「7」：頂点や辺に対応する軸を1本見落としています。\n・「1」：1本見つけたところで止めず、ほかの軸も調べましょう。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "16",
        "reason": "1本の軸を中心の両側に分けて、2回数えています。"
      },
      {
        "answer": "7",
        "reason": "頂点や辺に対応する軸を1本見落としています。"
      },
      {
        "answer": "1",
        "reason": "1本見つけたところで止めず、ほかの軸も調べましょう。"
      }
    ],
    "authoring": {
      "family": "symmetry_1",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_symmetry_013",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "symmetry",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "縦の直線x＝7を対称の軸にします。点A(4,5)に対応する点の、右への位置はいくつですか。",
    "answer": "10",
    "choices": [
      "3",
      "4",
      "7",
      "10"
    ],
    "hints": [
      "対称の軸までの横の距離を調べましょう。"
    ],
    "explanation": "軸の左へ3離れているので、対応点は右へ3。右への位置は7＋3＝10です。\n\nほかの選択肢\n・「3」：軸からの距離だけを答えています。軸の位置に足しましょう。\n・「4」：左右を反転せず、もとの位置を答えています。\n・「7」：対応点ではなく軸の位置を答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "3",
        "reason": "軸からの距離だけを答えています。軸の位置に足しましょう。"
      },
      {
        "answer": "4",
        "reason": "左右を反転せず、もとの位置を答えています。"
      },
      {
        "answer": "7",
        "reason": "対応点ではなく軸の位置を答えています。"
      }
    ],
    "authoring": {
      "family": "symmetry_0",
      "parameters": {
        "n": 3
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-symmetry_0-3.svg",
      "caption": "横・縦とも数値は位置です。対応点は描いていません。",
      "alt": "右への位置（1目盛り1）は大目盛り4ごと、上への位置（1目盛り1）は大目盛り4ごと。補助目盛りは横1、縦1です。"
    }
  },
  {
    "id": "math_g6_course_symmetry_014",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "symmetry",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "正十角形の対称の軸は何本ですか。",
    "answer": "10",
    "choices": [
      "9",
      "1",
      "10",
      "20"
    ],
    "hints": [
      "正多角形では、頂点や辺の中点を通る軸を順に調べます。"
    ],
    "explanation": "正十角形には、折り重なる軸が10本あります。正n角形の対称の軸はn本です。\n\nほかの選択肢\n・「20」：1本の軸を中心の両側に分けて、2回数えています。\n・「9」：頂点や辺に対応する軸を1本見落としています。\n・「1」：1本見つけたところで止めず、ほかの軸も調べましょう。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "20",
        "reason": "1本の軸を中心の両側に分けて、2回数えています。"
      },
      {
        "answer": "9",
        "reason": "頂点や辺に対応する軸を1本見落としています。"
      },
      {
        "answer": "1",
        "reason": "1本見つけたところで止めず、ほかの軸も調べましょう。"
      }
    ],
    "authoring": {
      "family": "symmetry_1",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_symmetry_015",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "symmetry",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "点O(8,9)を対称の中心にします。点A(4,5)に対応する点の、上への位置はいくつですか。",
    "answer": "13",
    "choices": [
      "9",
      "13",
      "5",
      "4"
    ],
    "hints": [
      "中心から上と下へ同じ距離にある点を考えます。"
    ],
    "explanation": "AはOから下へ4。対応点は上へ4なので、9＋4＝13です。\n\nほかの選択肢\n・「5」：上下の位置を変えていません。\n・「4」：中心までの距離で止めています。\n・「9」：対応点ではなく中心の位置を答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "5",
        "reason": "上下の位置を変えていません。"
      },
      {
        "answer": "4",
        "reason": "中心までの距離で止めています。"
      },
      {
        "answer": "9",
        "reason": "対応点ではなく中心の位置を答えています。"
      }
    ],
    "authoring": {
      "family": "symmetry_2",
      "parameters": {
        "n": 3
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-symmetry_2-3.svg",
      "caption": "横・縦とも数値は位置です。対応点は描いていません。",
      "alt": "右への位置（1目盛り1）は大目盛り4ごと、上への位置（1目盛り1）は大目盛り4ごと。補助目盛りは横1、縦1です。"
    }
  },
  {
    "id": "math_g6_course_symmetry_016",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "symmetry",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "縦の直線x＝8を対称の軸にします。点A(5,6)に対応する点の、右への位置はいくつですか。",
    "answer": "11",
    "choices": [
      "11",
      "3",
      "5",
      "8"
    ],
    "hints": [
      "対称の軸までの横の距離を調べましょう。"
    ],
    "explanation": "軸の左へ3離れているので、対応点は右へ3。右への位置は8＋3＝11です。\n\nほかの選択肢\n・「3」：軸からの距離だけを答えています。軸の位置に足しましょう。\n・「5」：左右を反転せず、もとの位置を答えています。\n・「8」：対応点ではなく軸の位置を答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "3",
        "reason": "軸からの距離だけを答えています。軸の位置に足しましょう。"
      },
      {
        "answer": "5",
        "reason": "左右を反転せず、もとの位置を答えています。"
      },
      {
        "answer": "8",
        "reason": "対応点ではなく軸の位置を答えています。"
      }
    ],
    "authoring": {
      "family": "symmetry_0",
      "parameters": {
        "n": 4
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-symmetry_0-4.svg",
      "caption": "横・縦とも数値は位置です。対応点は描いていません。",
      "alt": "右への位置（1目盛り1）は大目盛り4ごと、上への位置（1目盛り1）は大目盛り4ごと。補助目盛りは横1、縦1です。"
    }
  },
  {
    "id": "math_g6_course_symmetry_017",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "symmetry",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "正十二角形の対称の軸は何本ですか。",
    "answer": "12",
    "choices": [
      "24",
      "11",
      "1",
      "12"
    ],
    "hints": [
      "正多角形では、頂点や辺の中点を通る軸を順に調べます。"
    ],
    "explanation": "正十二角形には、折り重なる軸が12本あります。正n角形の対称の軸はn本です。\n\nほかの選択肢\n・「24」：1本の軸を中心の両側に分けて、2回数えています。\n・「11」：頂点や辺に対応する軸を1本見落としています。\n・「1」：1本見つけたところで止めず、ほかの軸も調べましょう。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "24",
        "reason": "1本の軸を中心の両側に分けて、2回数えています。"
      },
      {
        "answer": "11",
        "reason": "頂点や辺に対応する軸を1本見落としています。"
      },
      {
        "answer": "1",
        "reason": "1本見つけたところで止めず、ほかの軸も調べましょう。"
      }
    ],
    "authoring": {
      "family": "symmetry_1",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_symmetry_018",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "symmetry",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "点O(9,10)を対称の中心にします。点A(5,6)に対応する点の、上への位置はいくつですか。",
    "answer": "14",
    "choices": [
      "4",
      "10",
      "14",
      "6"
    ],
    "hints": [
      "中心から上と下へ同じ距離にある点を考えます。"
    ],
    "explanation": "AはOから下へ4。対応点は上へ4なので、10＋4＝14です。\n\nほかの選択肢\n・「6」：上下の位置を変えていません。\n・「4」：中心までの距離で止めています。\n・「10」：対応点ではなく中心の位置を答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "6",
        "reason": "上下の位置を変えていません。"
      },
      {
        "answer": "4",
        "reason": "中心までの距離で止めています。"
      },
      {
        "answer": "10",
        "reason": "対応点ではなく中心の位置を答えています。"
      }
    ],
    "authoring": {
      "family": "symmetry_2",
      "parameters": {
        "n": 4
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-symmetry_2-4.svg",
      "caption": "横・縦とも数値は位置です。対応点は描いていません。",
      "alt": "右への位置（1目盛り1）は大目盛り4ごと、上への位置（1目盛り1）は大目盛り4ごと。補助目盛りは横1、縦1です。"
    }
  },
  {
    "id": "math_g6_course_symmetry_019",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "symmetry",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "縦の直線x＝9を対称の軸にします。点A(6,7)に対応する点の、右への位置はいくつですか。",
    "answer": "12",
    "choices": [
      "9",
      "12",
      "3",
      "6"
    ],
    "hints": [
      "対称の軸までの横の距離を調べましょう。"
    ],
    "explanation": "軸の左へ3離れているので、対応点は右へ3。右への位置は9＋3＝12です。\n\nほかの選択肢\n・「3」：軸からの距離だけを答えています。軸の位置に足しましょう。\n・「6」：左右を反転せず、もとの位置を答えています。\n・「9」：対応点ではなく軸の位置を答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "3",
        "reason": "軸からの距離だけを答えています。軸の位置に足しましょう。"
      },
      {
        "answer": "6",
        "reason": "左右を反転せず、もとの位置を答えています。"
      },
      {
        "answer": "9",
        "reason": "対応点ではなく軸の位置を答えています。"
      }
    ],
    "authoring": {
      "family": "symmetry_0",
      "parameters": {
        "n": 5
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-symmetry_0-5.svg",
      "caption": "横・縦とも数値は位置です。対応点は描いていません。",
      "alt": "右への位置（1目盛り1）は大目盛り4ごと、上への位置（1目盛り1）は大目盛り4ごと。補助目盛りは横1、縦1です。"
    }
  },
  {
    "id": "math_g6_course_symmetry_020",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "symmetry",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "正九角形の対称の軸は何本ですか。",
    "answer": "9",
    "choices": [
      "9",
      "18",
      "8",
      "1"
    ],
    "hints": [
      "正多角形では、頂点や辺の中点を通る軸を順に調べます。"
    ],
    "explanation": "正九角形には、折り重なる軸が9本あります。正n角形の対称の軸はn本です。\n\nほかの選択肢\n・「18」：1本の軸を中心の両側に分けて、2回数えています。\n・「8」：頂点や辺に対応する軸を1本見落としています。\n・「1」：1本見つけたところで止めず、ほかの軸も調べましょう。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "18",
        "reason": "1本の軸を中心の両側に分けて、2回数えています。"
      },
      {
        "answer": "8",
        "reason": "頂点や辺に対応する軸を1本見落としています。"
      },
      {
        "answer": "1",
        "reason": "1本見つけたところで止めず、ほかの軸も調べましょう。"
      }
    ],
    "authoring": {
      "family": "symmetry_1",
      "parameters": {
        "n": 5
      }
    }
  },
  {
    "id": "math_g6_course_symmetry_021",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "symmetry",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "線対称な2点A(3,3)とB(11,3)があります。対称の軸が縦の直線x＝□のとき、□はいくつですか。",
    "answer": "7",
    "choices": [
      "8",
      "4",
      "14",
      "7"
    ],
    "hints": [
      "対称の軸は2点のまん中を通ります。"
    ],
    "explanation": "横の位置の平均を求め、(3＋11)÷2＝7です。\n\nほかの選択肢\n・「8」：2点の間の距離を答えています。\n・「4」：距離の半分だけで、左の点の位置を足していません。\n・「14」：2つの位置を足した後に2で割っていません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "8",
        "reason": "2点の間の距離を答えています。"
      },
      {
        "answer": "4",
        "reason": "距離の半分だけで、左の点の位置を足していません。"
      },
      {
        "answer": "14",
        "reason": "2つの位置を足した後に2で割っていません。"
      }
    ],
    "authoring": {
      "family": "symmetry_3",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_symmetry_022",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "symmetry",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "点対称な2点A(2,3)とB(10,11)があります。対称の中心Oの、上への位置はいくつですか。",
    "answer": "7",
    "choices": [
      "4",
      "14",
      "7",
      "8"
    ],
    "hints": [
      "対称の中心は、対応する2点を結ぶ線分のまん中です。"
    ],
    "explanation": "上への位置は(3＋11)÷2＝7です。横の位置も同様に求められます。\n\nほかの選択肢\n・「8」：上下の位置の差を答えています。\n・「4」：差の半分だけで、Aの上への位置を足していません。\n・「14」：上下の位置の和を2で割っていません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "8",
        "reason": "上下の位置の差を答えています。"
      },
      {
        "answer": "4",
        "reason": "差の半分だけで、Aの上への位置を足していません。"
      },
      {
        "answer": "14",
        "reason": "上下の位置の和を2で割っていません。"
      }
    ],
    "authoring": {
      "family": "symmetry_4",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_symmetry_023",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "symmetry",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "対称の軸x＝11に関して、点A(4,4)とその対応点Bがあります。線分ABの長さは何目盛りですか。",
    "answer": "14",
    "choices": [
      "15",
      "14",
      "7",
      "18"
    ],
    "hints": [
      "Aから軸までと、軸からBまでの距離は等しいです。"
    ],
    "explanation": "Aから軸まで11－4＝7目盛り。その2倍で14目盛りです。\n\nほかの選択肢\n・「7」：軸までの片側の距離だけを答えています。\n・「18」：Bの位置を答え、Aからの距離を求めていません。\n・「15」：位置を足しています。軸までの差の2倍を求めましょう。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "7",
        "reason": "軸までの片側の距離だけを答えています。"
      },
      {
        "answer": "18",
        "reason": "Bの位置を答え、Aからの距離を求めていません。"
      },
      {
        "answer": "15",
        "reason": "位置を足しています。軸までの差の2倍を求めましょう。"
      }
    ],
    "authoring": {
      "family": "symmetry_5",
      "parameters": {
        "n": 2
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-symmetry_5-2.svg",
      "caption": "横・縦とも数値は位置です。対応点は描いていません。",
      "alt": "右への位置（1目盛り1）は大目盛り4ごと、上への位置（1目盛り1）は大目盛り4ごと。補助目盛りは横1、縦1です。"
    }
  },
  {
    "id": "math_g6_course_symmetry_024",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "symmetry",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "線対称な2点A(5,5)とB(13,5)があります。対称の軸が縦の直線x＝□のとき、□はいくつですか。",
    "answer": "9",
    "choices": [
      "9",
      "8",
      "4",
      "18"
    ],
    "hints": [
      "対称の軸は2点のまん中を通ります。"
    ],
    "explanation": "横の位置の平均を求め、(5＋13)÷2＝9です。\n\nほかの選択肢\n・「8」：2点の間の距離を答えています。\n・「4」：距離の半分だけで、左の点の位置を足していません。\n・「18」：2つの位置を足した後に2で割っていません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "8",
        "reason": "2点の間の距離を答えています。"
      },
      {
        "answer": "4",
        "reason": "距離の半分だけで、左の点の位置を足していません。"
      },
      {
        "answer": "18",
        "reason": "2つの位置を足した後に2で割っていません。"
      }
    ],
    "authoring": {
      "family": "symmetry_3",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_symmetry_025",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "symmetry",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "点対称な2点A(4,5)とB(12,13)があります。対称の中心Oの、上への位置はいくつですか。",
    "answer": "9",
    "choices": [
      "8",
      "4",
      "18",
      "9"
    ],
    "hints": [
      "対称の中心は、対応する2点を結ぶ線分のまん中です。"
    ],
    "explanation": "上への位置は(5＋13)÷2＝9です。横の位置も同様に求められます。\n\nほかの選択肢\n・「8」：上下の位置の差を答えています。\n・「4」：差の半分だけで、Aの上への位置を足していません。\n・「18」：上下の位置の和を2で割っていません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "8",
        "reason": "上下の位置の差を答えています。"
      },
      {
        "answer": "4",
        "reason": "差の半分だけで、Aの上への位置を足していません。"
      },
      {
        "answer": "18",
        "reason": "上下の位置の和を2で割っていません。"
      }
    ],
    "authoring": {
      "family": "symmetry_4",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_symmetry_026",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "symmetry",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "対称の軸x＝13に関して、点A(5,5)とその対応点Bがあります。線分ABの長さは何目盛りですか。",
    "answer": "16",
    "choices": [
      "21",
      "18",
      "16",
      "8"
    ],
    "hints": [
      "Aから軸までと、軸からBまでの距離は等しいです。"
    ],
    "explanation": "Aから軸まで13－5＝8目盛り。その2倍で16目盛りです。\n\nほかの選択肢\n・「8」：軸までの片側の距離だけを答えています。\n・「21」：Bの位置を答え、Aからの距離を求めていません。\n・「18」：位置を足しています。軸までの差の2倍を求めましょう。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "8",
        "reason": "軸までの片側の距離だけを答えています。"
      },
      {
        "answer": "21",
        "reason": "Bの位置を答え、Aからの距離を求めていません。"
      },
      {
        "answer": "18",
        "reason": "位置を足しています。軸までの差の2倍を求めましょう。"
      }
    ],
    "authoring": {
      "family": "symmetry_5",
      "parameters": {
        "n": 3
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-symmetry_5-3.svg",
      "caption": "横・縦とも数値は位置です。対応点は描いていません。",
      "alt": "右への位置（1目盛り1）は大目盛り4ごと、上への位置（1目盛り1）は大目盛り4ごと。補助目盛りは横1、縦1です。"
    }
  },
  {
    "id": "math_g6_course_symmetry_027",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "symmetry",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "線対称な2点A(6,6)とB(14,6)があります。対称の軸が縦の直線x＝□のとき、□はいくつですか。",
    "answer": "10",
    "choices": [
      "20",
      "10",
      "8",
      "4"
    ],
    "hints": [
      "対称の軸は2点のまん中を通ります。"
    ],
    "explanation": "横の位置の平均を求め、(6＋14)÷2＝10です。\n\nほかの選択肢\n・「8」：2点の間の距離を答えています。\n・「4」：距離の半分だけで、左の点の位置を足していません。\n・「20」：2つの位置を足した後に2で割っていません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "8",
        "reason": "2点の間の距離を答えています。"
      },
      {
        "answer": "4",
        "reason": "距離の半分だけで、左の点の位置を足していません。"
      },
      {
        "answer": "20",
        "reason": "2つの位置を足した後に2で割っていません。"
      }
    ],
    "authoring": {
      "family": "symmetry_3",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_symmetry_028",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "symmetry",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "点対称な2点A(5,6)とB(13,14)があります。対称の中心Oの、上への位置はいくつですか。",
    "answer": "10",
    "choices": [
      "10",
      "8",
      "4",
      "20"
    ],
    "hints": [
      "対称の中心は、対応する2点を結ぶ線分のまん中です。"
    ],
    "explanation": "上への位置は(6＋14)÷2＝10です。横の位置も同様に求められます。\n\nほかの選択肢\n・「8」：上下の位置の差を答えています。\n・「4」：差の半分だけで、Aの上への位置を足していません。\n・「20」：上下の位置の和を2で割っていません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "8",
        "reason": "上下の位置の差を答えています。"
      },
      {
        "answer": "4",
        "reason": "差の半分だけで、Aの上への位置を足していません。"
      },
      {
        "answer": "20",
        "reason": "上下の位置の和を2で割っていません。"
      }
    ],
    "authoring": {
      "family": "symmetry_4",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_symmetry_029",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "symmetry",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "対称の軸x＝15に関して、点A(6,6)とその対応点Bがあります。線分ABの長さは何目盛りですか。",
    "answer": "18",
    "choices": [
      "9",
      "24",
      "21",
      "18"
    ],
    "hints": [
      "Aから軸までと、軸からBまでの距離は等しいです。"
    ],
    "explanation": "Aから軸まで15－6＝9目盛り。その2倍で18目盛りです。\n\nほかの選択肢\n・「9」：軸までの片側の距離だけを答えています。\n・「24」：Bの位置を答え、Aからの距離を求めていません。\n・「21」：位置を足しています。軸までの差の2倍を求めましょう。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "9",
        "reason": "軸までの片側の距離だけを答えています。"
      },
      {
        "answer": "24",
        "reason": "Bの位置を答え、Aからの距離を求めていません。"
      },
      {
        "answer": "21",
        "reason": "位置を足しています。軸までの差の2倍を求めましょう。"
      }
    ],
    "authoring": {
      "family": "symmetry_5",
      "parameters": {
        "n": 4
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-symmetry_5-4.svg",
      "caption": "横・縦とも数値は位置です。対応点は描いていません。",
      "alt": "右への位置（1目盛り1）は大目盛り6ごと、上への位置（1目盛り1）は大目盛り6ごと。補助目盛りは横1、縦1です。"
    }
  },
  {
    "id": "math_g6_course_symmetry_030",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "symmetry",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "線対称な2点A(7,7)とB(15,7)があります。対称の軸が縦の直線x＝□のとき、□はいくつですか。",
    "answer": "11",
    "choices": [
      "4",
      "22",
      "11",
      "8"
    ],
    "hints": [
      "対称の軸は2点のまん中を通ります。"
    ],
    "explanation": "横の位置の平均を求め、(7＋15)÷2＝11です。\n\nほかの選択肢\n・「8」：2点の間の距離を答えています。\n・「4」：距離の半分だけで、左の点の位置を足していません。\n・「22」：2つの位置を足した後に2で割っていません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "8",
        "reason": "2点の間の距離を答えています。"
      },
      {
        "answer": "4",
        "reason": "距離の半分だけで、左の点の位置を足していません。"
      },
      {
        "answer": "22",
        "reason": "2つの位置を足した後に2で割っていません。"
      }
    ],
    "authoring": {
      "family": "symmetry_3",
      "parameters": {
        "n": 5
      }
    }
  },
  {
    "id": "math_g6_course_symmetry_031",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "symmetry",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "点対称な2点A(6,7)とB(14,15)があります。対称の中心Oの、上への位置はいくつですか。",
    "answer": "11",
    "choices": [
      "22",
      "11",
      "8",
      "4"
    ],
    "hints": [
      "対称の中心は、対応する2点を結ぶ線分のまん中です。"
    ],
    "explanation": "上への位置は(7＋15)÷2＝11です。横の位置も同様に求められます。\n\nほかの選択肢\n・「8」：上下の位置の差を答えています。\n・「4」：差の半分だけで、Aの上への位置を足していません。\n・「22」：上下の位置の和を2で割っていません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "8",
        "reason": "上下の位置の差を答えています。"
      },
      {
        "answer": "4",
        "reason": "差の半分だけで、Aの上への位置を足していません。"
      },
      {
        "answer": "22",
        "reason": "上下の位置の和を2で割っていません。"
      }
    ],
    "authoring": {
      "family": "symmetry_4",
      "parameters": {
        "n": 5
      }
    }
  },
  {
    "id": "math_g6_course_symmetry_032",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "symmetry",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "対称の軸x＝17に関して、点A(7,7)とその対応点Bがあります。線分ABの長さは何目盛りですか。",
    "answer": "20",
    "choices": [
      "20",
      "10",
      "27",
      "24"
    ],
    "hints": [
      "Aから軸までと、軸からBまでの距離は等しいです。"
    ],
    "explanation": "Aから軸まで17－7＝10目盛り。その2倍で20目盛りです。\n\nほかの選択肢\n・「10」：軸までの片側の距離だけを答えています。\n・「27」：Bの位置を答え、Aからの距離を求めていません。\n・「24」：位置を足しています。軸までの差の2倍を求めましょう。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "10",
        "reason": "軸までの片側の距離だけを答えています。"
      },
      {
        "answer": "27",
        "reason": "Bの位置を答え、Aからの距離を求めていません。"
      },
      {
        "answer": "24",
        "reason": "位置を足しています。軸までの差の2倍を求めましょう。"
      }
    ],
    "authoring": {
      "family": "symmetry_5",
      "parameters": {
        "n": 5
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-symmetry_5-5.svg",
      "caption": "横・縦とも数値は位置です。対応点は描いていません。",
      "alt": "右への位置（1目盛り1）は大目盛り6ごと、上への位置（1目盛り1）は大目盛り6ごと。補助目盛りは横1、縦1です。"
    }
  },
  {
    "id": "math_g6_course_symmetry_033",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "symmetry",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "線対称な2点A(8,8)とB(16,8)があります。対称の軸が縦の直線x＝□のとき、□はいくつですか。",
    "answer": "12",
    "choices": [
      "8",
      "4",
      "24",
      "12"
    ],
    "hints": [
      "対称の軸は2点のまん中を通ります。"
    ],
    "explanation": "横の位置の平均を求め、(8＋16)÷2＝12です。\n\nほかの選択肢\n・「8」：2点の間の距離を答えています。\n・「4」：距離の半分だけで、左の点の位置を足していません。\n・「24」：2つの位置を足した後に2で割っていません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "8",
        "reason": "2点の間の距離を答えています。"
      },
      {
        "answer": "4",
        "reason": "距離の半分だけで、左の点の位置を足していません。"
      },
      {
        "answer": "24",
        "reason": "2つの位置を足した後に2で割っていません。"
      }
    ],
    "authoring": {
      "family": "symmetry_3",
      "parameters": {
        "n": 6
      }
    }
  },
  {
    "id": "math_g6_course_symmetry_034",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "symmetry",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "点対称な2点A(7,8)とB(15,16)があります。対称の中心Oの、上への位置はいくつですか。",
    "answer": "12",
    "choices": [
      "4",
      "24",
      "12",
      "8"
    ],
    "hints": [
      "対称の中心は、対応する2点を結ぶ線分のまん中です。"
    ],
    "explanation": "上への位置は(8＋16)÷2＝12です。横の位置も同様に求められます。\n\nほかの選択肢\n・「8」：上下の位置の差を答えています。\n・「4」：差の半分だけで、Aの上への位置を足していません。\n・「24」：上下の位置の和を2で割っていません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "8",
        "reason": "上下の位置の差を答えています。"
      },
      {
        "answer": "4",
        "reason": "差の半分だけで、Aの上への位置を足していません。"
      },
      {
        "answer": "24",
        "reason": "上下の位置の和を2で割っていません。"
      }
    ],
    "authoring": {
      "family": "symmetry_4",
      "parameters": {
        "n": 6
      }
    }
  },
  {
    "id": "math_g6_course_symmetry_035",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "symmetry",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "対称の軸x＝19に関して、点A(8,8)とその対応点Bがあります。線分ABの長さは何目盛りですか。",
    "answer": "22",
    "choices": [
      "27",
      "22",
      "11",
      "30"
    ],
    "hints": [
      "Aから軸までと、軸からBまでの距離は等しいです。"
    ],
    "explanation": "Aから軸まで19－8＝11目盛り。その2倍で22目盛りです。\n\nほかの選択肢\n・「11」：軸までの片側の距離だけを答えています。\n・「30」：Bの位置を答え、Aからの距離を求めていません。\n・「27」：位置を足しています。軸までの差の2倍を求めましょう。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "11",
        "reason": "軸までの片側の距離だけを答えています。"
      },
      {
        "answer": "30",
        "reason": "Bの位置を答え、Aからの距離を求めていません。"
      },
      {
        "answer": "27",
        "reason": "位置を足しています。軸までの差の2倍を求めましょう。"
      }
    ],
    "authoring": {
      "family": "symmetry_5",
      "parameters": {
        "n": 6
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-symmetry_5-6.svg",
      "caption": "横・縦とも数値は位置です。対応点は描いていません。",
      "alt": "右への位置（1目盛り1）は大目盛り6ごと、上への位置（1目盛り1）は大目盛り6ごと。補助目盛りは横1、縦1です。"
    }
  },
  {
    "id": "math_g6_course_symmetry_036",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "symmetry",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "点A(3,4)をO(6,8)を中心に点対称に移し、その点を直線x＝10について線対称に移します。最後の点の右への位置はいくつですか。",
    "answer": "11",
    "choices": [
      "11",
      "9",
      "17",
      "1"
    ],
    "hints": [
      "点対称では中心をはさんで反対側へ移します。",
      "その後、横の位置を新しい軸について反転します。"
    ],
    "explanation": "点対称で(9,12)へ移ります。続いて横の位置は10＋(10－9)＝11です。\n\nほかの選択肢\n・「9」：点対称の操作だけで止めています。\n・「17」：点対称を行わず、最初の点を線対称に移しています。\n・「1」：最後の軸からの距離だけを答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "9",
        "reason": "点対称の操作だけで止めています。"
      },
      {
        "answer": "17",
        "reason": "点対称を行わず、最初の点を線対称に移しています。"
      },
      {
        "answer": "1",
        "reason": "最後の軸からの距離だけを答えています。"
      }
    ],
    "authoring": {
      "family": "symmetry_7",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_symmetry_037",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "symmetry",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "点A(4,5)をO(7,9)を中心に点対称に移し、その点を直線x＝11について線対称に移します。最後の点の右への位置はいくつですか。",
    "answer": "12",
    "choices": [
      "10",
      "18",
      "1",
      "12"
    ],
    "hints": [
      "点対称では中心をはさんで反対側へ移します。",
      "その後、横の位置を新しい軸について反転します。"
    ],
    "explanation": "点対称で(10,13)へ移ります。続いて横の位置は11＋(11－10)＝12です。\n\nほかの選択肢\n・「10」：点対称の操作だけで止めています。\n・「18」：点対称を行わず、最初の点を線対称に移しています。\n・「1」：最後の軸からの距離だけを答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "10",
        "reason": "点対称の操作だけで止めています。"
      },
      {
        "answer": "18",
        "reason": "点対称を行わず、最初の点を線対称に移しています。"
      },
      {
        "answer": "1",
        "reason": "最後の軸からの距離だけを答えています。"
      }
    ],
    "authoring": {
      "family": "symmetry_7",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_symmetry_038",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "symmetry",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "点A(5,6)をO(8,10)を中心に点対称に移し、その点を直線x＝12について線対称に移します。最後の点の右への位置はいくつですか。",
    "answer": "13",
    "choices": [
      "19",
      "1",
      "13",
      "11"
    ],
    "hints": [
      "点対称では中心をはさんで反対側へ移します。",
      "その後、横の位置を新しい軸について反転します。"
    ],
    "explanation": "点対称で(11,14)へ移ります。続いて横の位置は12＋(12－11)＝13です。\n\nほかの選択肢\n・「11」：点対称の操作だけで止めています。\n・「19」：点対称を行わず、最初の点を線対称に移しています。\n・「1」：最後の軸からの距離だけを答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "11",
        "reason": "点対称の操作だけで止めています。"
      },
      {
        "answer": "19",
        "reason": "点対称を行わず、最初の点を線対称に移しています。"
      },
      {
        "answer": "1",
        "reason": "最後の軸からの距離だけを答えています。"
      }
    ],
    "authoring": {
      "family": "symmetry_7",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_symmetry_039",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "symmetry",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "点A(6,7)をO(9,11)を中心に点対称に移し、その点を直線x＝13について線対称に移します。最後の点の右への位置はいくつですか。",
    "answer": "14",
    "choices": [
      "1",
      "14",
      "12",
      "20"
    ],
    "hints": [
      "点対称では中心をはさんで反対側へ移します。",
      "その後、横の位置を新しい軸について反転します。"
    ],
    "explanation": "点対称で(12,15)へ移ります。続いて横の位置は13＋(13－12)＝14です。\n\nほかの選択肢\n・「12」：点対称の操作だけで止めています。\n・「20」：点対称を行わず、最初の点を線対称に移しています。\n・「1」：最後の軸からの距離だけを答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "12",
        "reason": "点対称の操作だけで止めています。"
      },
      {
        "answer": "20",
        "reason": "点対称を行わず、最初の点を線対称に移しています。"
      },
      {
        "answer": "1",
        "reason": "最後の軸からの距離だけを答えています。"
      }
    ],
    "authoring": {
      "family": "symmetry_7",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_symmetry_040",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "symmetry",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "点A(7,8)をO(10,12)を中心に点対称に移し、その点を直線x＝14について線対称に移します。最後の点の右への位置はいくつですか。",
    "answer": "15",
    "choices": [
      "15",
      "13",
      "21",
      "1"
    ],
    "hints": [
      "点対称では中心をはさんで反対側へ移します。",
      "その後、横の位置を新しい軸について反転します。"
    ],
    "explanation": "点対称で(13,16)へ移ります。続いて横の位置は14＋(14－13)＝15です。\n\nほかの選択肢\n・「13」：点対称の操作だけで止めています。\n・「21」：点対称を行わず、最初の点を線対称に移しています。\n・「1」：最後の軸からの距離だけを答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "13",
        "reason": "点対称の操作だけで止めています。"
      },
      {
        "answer": "21",
        "reason": "点対称を行わず、最初の点を線対称に移しています。"
      },
      {
        "answer": "1",
        "reason": "最後の軸からの距離だけを答えています。"
      }
    ],
    "authoring": {
      "family": "symmetry_7",
      "parameters": {
        "n": 5
      }
    }
  },
  {
    "id": "math_g6_course_symmetry_041",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "symmetry",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "点A(8,9)をO(11,13)を中心に点対称に移し、その点を直線x＝15について線対称に移します。最後の点の右への位置はいくつですか。",
    "answer": "16",
    "choices": [
      "14",
      "22",
      "1",
      "16"
    ],
    "hints": [
      "点対称では中心をはさんで反対側へ移します。",
      "その後、横の位置を新しい軸について反転します。"
    ],
    "explanation": "点対称で(14,17)へ移ります。続いて横の位置は15＋(15－14)＝16です。\n\nほかの選択肢\n・「14」：点対称の操作だけで止めています。\n・「22」：点対称を行わず、最初の点を線対称に移しています。\n・「1」：最後の軸からの距離だけを答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "14",
        "reason": "点対称の操作だけで止めています。"
      },
      {
        "answer": "22",
        "reason": "点対称を行わず、最初の点を線対称に移しています。"
      },
      {
        "answer": "1",
        "reason": "最後の軸からの距離だけを答えています。"
      }
    ],
    "authoring": {
      "family": "symmetry_7",
      "parameters": {
        "n": 6
      }
    }
  },
  {
    "id": "math_g6_course_symmetry_042",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "symmetry",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "点A(9,10)をO(12,14)を中心に点対称に移し、その点を直線x＝16について線対称に移します。最後の点の右への位置はいくつですか。",
    "answer": "17",
    "choices": [
      "23",
      "1",
      "17",
      "15"
    ],
    "hints": [
      "点対称では中心をはさんで反対側へ移します。",
      "その後、横の位置を新しい軸について反転します。"
    ],
    "explanation": "点対称で(15,18)へ移ります。続いて横の位置は16＋(16－15)＝17です。\n\nほかの選択肢\n・「15」：点対称の操作だけで止めています。\n・「23」：点対称を行わず、最初の点を線対称に移しています。\n・「1」：最後の軸からの距離だけを答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "15",
        "reason": "点対称の操作だけで止めています。"
      },
      {
        "answer": "23",
        "reason": "点対称を行わず、最初の点を線対称に移しています。"
      },
      {
        "answer": "1",
        "reason": "最後の軸からの距離だけを答えています。"
      }
    ],
    "authoring": {
      "family": "symmetry_7",
      "parameters": {
        "n": 7
      }
    }
  },
  {
    "id": "math_g6_course_symmetry_043",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "symmetry",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "点A(10,11)をO(13,15)を中心に点対称に移し、その点を直線x＝17について線対称に移します。最後の点の右への位置はいくつですか。",
    "answer": "18",
    "choices": [
      "1",
      "18",
      "16",
      "24"
    ],
    "hints": [
      "点対称では中心をはさんで反対側へ移します。",
      "その後、横の位置を新しい軸について反転します。"
    ],
    "explanation": "点対称で(16,19)へ移ります。続いて横の位置は17＋(17－16)＝18です。\n\nほかの選択肢\n・「16」：点対称の操作だけで止めています。\n・「24」：点対称を行わず、最初の点を線対称に移しています。\n・「1」：最後の軸からの距離だけを答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "16",
        "reason": "点対称の操作だけで止めています。"
      },
      {
        "answer": "24",
        "reason": "点対称を行わず、最初の点を線対称に移しています。"
      },
      {
        "answer": "1",
        "reason": "最後の軸からの距離だけを答えています。"
      }
    ],
    "authoring": {
      "family": "symmetry_7",
      "parameters": {
        "n": 8
      }
    }
  },
  {
    "id": "math_g6_course_symmetry_044",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "symmetry",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "点A(11,12)をO(14,16)を中心に点対称に移し、その点を直線x＝18について線対称に移します。最後の点の右への位置はいくつですか。",
    "answer": "19",
    "choices": [
      "19",
      "17",
      "25",
      "1"
    ],
    "hints": [
      "点対称では中心をはさんで反対側へ移します。",
      "その後、横の位置を新しい軸について反転します。"
    ],
    "explanation": "点対称で(17,20)へ移ります。続いて横の位置は18＋(18－17)＝19です。\n\nほかの選択肢\n・「17」：点対称の操作だけで止めています。\n・「25」：点対称を行わず、最初の点を線対称に移しています。\n・「1」：最後の軸からの距離だけを答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "17",
        "reason": "点対称の操作だけで止めています。"
      },
      {
        "answer": "25",
        "reason": "点対称を行わず、最初の点を線対称に移しています。"
      },
      {
        "answer": "1",
        "reason": "最後の軸からの距離だけを答えています。"
      }
    ],
    "authoring": {
      "family": "symmetry_7",
      "parameters": {
        "n": 9
      }
    }
  },
  {
    "id": "math_g6_course_symmetry_045",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "symmetry",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "点A(12,13)をO(15,17)を中心に点対称に移し、その点を直線x＝19について線対称に移します。最後の点の右への位置はいくつですか。",
    "answer": "20",
    "choices": [
      "18",
      "26",
      "1",
      "20"
    ],
    "hints": [
      "点対称では中心をはさんで反対側へ移します。",
      "その後、横の位置を新しい軸について反転します。"
    ],
    "explanation": "点対称で(18,21)へ移ります。続いて横の位置は19＋(19－18)＝20です。\n\nほかの選択肢\n・「18」：点対称の操作だけで止めています。\n・「26」：点対称を行わず、最初の点を線対称に移しています。\n・「1」：最後の軸からの距離だけを答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "18",
        "reason": "点対称の操作だけで止めています。"
      },
      {
        "answer": "26",
        "reason": "点対称を行わず、最初の点を線対称に移しています。"
      },
      {
        "answer": "1",
        "reason": "最後の軸からの距離だけを答えています。"
      }
    ],
    "authoring": {
      "family": "symmetry_7",
      "parameters": {
        "n": 10
      }
    }
  },
  {
    "id": "math_g6_course_expression_009",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "expression",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "1個100円の品物をx個買い、箱代50円を加えると代金は100×x＋50円です。x＝4のとき、代金は何円ですか。",
    "answer": "450",
    "choices": [
      "400",
      "600",
      "154",
      "450"
    ],
    "hints": [
      "個数をxに入れ、かけ算を先にします。"
    ],
    "explanation": "100×4＋50＝450円です。\n\nほかの選択肢\n・「400」：箱代を加えていません。\n・「600」：箱代も個数分かかるとしてかけています。\n・「154」：単価と個数をかけずに足しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "400",
        "reason": "箱代を加えていません。"
      },
      {
        "answer": "600",
        "reason": "箱代も個数分かかるとしてかけています。"
      },
      {
        "answer": "154",
        "reason": "単価と個数をかけずに足しています。"
      }
    ],
    "authoring": {
      "family": "expression_0",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_expression_010",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "expression",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "y＝3×x＋6で、x＝5のとき、yはいくつですか。",
    "answer": "21",
    "choices": [
      "15",
      "14",
      "21",
      "33"
    ],
    "hints": [
      "文字を数に置き換え、かけ算を先に計算します。"
    ],
    "explanation": "3×5＋6＝15＋6＝21です。\n\nほかの選択肢\n・「33」：足し算を先にし、式にない{括弧|かっこ}を付けています。\n・「15」：最後の足し算を忘れています。\n・「14」：かけ算を足し算にしています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "33",
        "reason": "足し算を先にし、式にない{括弧|かっこ}を付けています。"
      },
      {
        "answer": "15",
        "reason": "最後の足し算を忘れています。"
      },
      {
        "answer": "14",
        "reason": "かけ算を足し算にしています。"
      }
    ],
    "authoring": {
      "family": "expression_1",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_expression_011",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "expression",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "1辺x cmの正方形の周りの長さが20cmです。xはいくつですか。",
    "answer": "5",
    "choices": [
      "20",
      "5",
      "10",
      "16"
    ],
    "hints": [
      "正方形には同じ長さの辺が4本あります。"
    ],
    "explanation": "4×x＝20なので、x＝20÷4＝5です。\n\nほかの選択肢\n・「10」：正方形の辺を2本分として割っています。\n・「16」：周の長さから辺の本数を引いています。\n・「20」：周の長さをそのまま1辺としています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "10",
        "reason": "正方形の辺を2本分として割っています。"
      },
      {
        "answer": "16",
        "reason": "周の長さから辺の本数を引いています。"
      },
      {
        "answer": "20",
        "reason": "周の長さをそのまま1辺としています。"
      }
    ],
    "authoring": {
      "family": "expression_2",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_expression_012",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "expression",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "1個120円の品物をx個買い、箱代60円を加えると代金は120×x＋60円です。x＝5のとき、代金は何円ですか。",
    "answer": "660",
    "choices": [
      "660",
      "600",
      "900",
      "185"
    ],
    "hints": [
      "個数をxに入れ、かけ算を先にします。"
    ],
    "explanation": "120×5＋60＝660円です。\n\nほかの選択肢\n・「600」：箱代を加えていません。\n・「900」：箱代も個数分かかるとしてかけています。\n・「185」：単価と個数をかけずに足しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "600",
        "reason": "箱代を加えていません。"
      },
      {
        "answer": "900",
        "reason": "箱代も個数分かかるとしてかけています。"
      },
      {
        "answer": "185",
        "reason": "単価と個数をかけずに足しています。"
      }
    ],
    "authoring": {
      "family": "expression_0",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_expression_013",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "expression",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "y＝4×x＋7で、x＝6のとき、yはいくつですか。",
    "answer": "31",
    "choices": [
      "52",
      "24",
      "17",
      "31"
    ],
    "hints": [
      "文字を数に置き換え、かけ算を先に計算します。"
    ],
    "explanation": "4×6＋7＝24＋7＝31です。\n\nほかの選択肢\n・「52」：足し算を先にし、式にない{括弧|かっこ}を付けています。\n・「24」：最後の足し算を忘れています。\n・「17」：かけ算を足し算にしています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "52",
        "reason": "足し算を先にし、式にない{括弧|かっこ}を付けています。"
      },
      {
        "answer": "24",
        "reason": "最後の足し算を忘れています。"
      },
      {
        "answer": "17",
        "reason": "かけ算を足し算にしています。"
      }
    ],
    "authoring": {
      "family": "expression_1",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_expression_014",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "expression",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "1辺x cmの正方形の周りの長さが24cmです。xはいくつですか。",
    "answer": "6",
    "choices": [
      "20",
      "24",
      "6",
      "12"
    ],
    "hints": [
      "正方形には同じ長さの辺が4本あります。"
    ],
    "explanation": "4×x＝24なので、x＝24÷4＝6です。\n\nほかの選択肢\n・「12」：正方形の辺を2本分として割っています。\n・「20」：周の長さから辺の本数を引いています。\n・「24」：周の長さをそのまま1辺としています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "12",
        "reason": "正方形の辺を2本分として割っています。"
      },
      {
        "answer": "20",
        "reason": "周の長さから辺の本数を引いています。"
      },
      {
        "answer": "24",
        "reason": "周の長さをそのまま1辺としています。"
      }
    ],
    "authoring": {
      "family": "expression_2",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_expression_015",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "expression",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "1個140円の品物をx個買い、箱代70円を加えると代金は140×x＋70円です。x＝6のとき、代金は何円ですか。",
    "answer": "910",
    "choices": [
      "216",
      "910",
      "840",
      "1260"
    ],
    "hints": [
      "個数をxに入れ、かけ算を先にします。"
    ],
    "explanation": "140×6＋70＝910円です。\n\nほかの選択肢\n・「840」：箱代を加えていません。\n・「1260」：箱代も個数分かかるとしてかけています。\n・「216」：単価と個数をかけずに足しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "840",
        "reason": "箱代を加えていません。"
      },
      {
        "answer": "1260",
        "reason": "箱代も個数分かかるとしてかけています。"
      },
      {
        "answer": "216",
        "reason": "単価と個数をかけずに足しています。"
      }
    ],
    "authoring": {
      "family": "expression_0",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_expression_016",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "expression",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "y＝5×x＋8で、x＝7のとき、yはいくつですか。",
    "answer": "43",
    "choices": [
      "43",
      "75",
      "35",
      "20"
    ],
    "hints": [
      "文字を数に置き換え、かけ算を先に計算します。"
    ],
    "explanation": "5×7＋8＝35＋8＝43です。\n\nほかの選択肢\n・「75」：足し算を先にし、式にない{括弧|かっこ}を付けています。\n・「35」：最後の足し算を忘れています。\n・「20」：かけ算を足し算にしています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "75",
        "reason": "足し算を先にし、式にない{括弧|かっこ}を付けています。"
      },
      {
        "answer": "35",
        "reason": "最後の足し算を忘れています。"
      },
      {
        "answer": "20",
        "reason": "かけ算を足し算にしています。"
      }
    ],
    "authoring": {
      "family": "expression_1",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_expression_017",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "expression",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "1辺x cmの正方形の周りの長さが28cmです。xはいくつですか。",
    "answer": "7",
    "choices": [
      "14",
      "24",
      "28",
      "7"
    ],
    "hints": [
      "正方形には同じ長さの辺が4本あります。"
    ],
    "explanation": "4×x＝28なので、x＝28÷4＝7です。\n\nほかの選択肢\n・「14」：正方形の辺を2本分として割っています。\n・「24」：周の長さから辺の本数を引いています。\n・「28」：周の長さをそのまま1辺としています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "14",
        "reason": "正方形の辺を2本分として割っています。"
      },
      {
        "answer": "24",
        "reason": "周の長さから辺の本数を引いています。"
      },
      {
        "answer": "28",
        "reason": "周の長さをそのまま1辺としています。"
      }
    ],
    "authoring": {
      "family": "expression_2",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_expression_018",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "expression",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "1個160円の品物をx個買い、箱代80円を加えると代金は160×x＋80円です。x＝7のとき、代金は何円ですか。",
    "answer": "1200",
    "choices": [
      "1680",
      "247",
      "1200",
      "1120"
    ],
    "hints": [
      "個数をxに入れ、かけ算を先にします。"
    ],
    "explanation": "160×7＋80＝1200円です。\n\nほかの選択肢\n・「1120」：箱代を加えていません。\n・「1680」：箱代も個数分かかるとしてかけています。\n・「247」：単価と個数をかけずに足しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "1120",
        "reason": "箱代を加えていません。"
      },
      {
        "answer": "1680",
        "reason": "箱代も個数分かかるとしてかけています。"
      },
      {
        "answer": "247",
        "reason": "単価と個数をかけずに足しています。"
      }
    ],
    "authoring": {
      "family": "expression_0",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_expression_019",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "expression",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "y＝6×x＋9で、x＝8のとき、yはいくつですか。",
    "answer": "57",
    "choices": [
      "23",
      "57",
      "102",
      "48"
    ],
    "hints": [
      "文字を数に置き換え、かけ算を先に計算します。"
    ],
    "explanation": "6×8＋9＝48＋9＝57です。\n\nほかの選択肢\n・「102」：足し算を先にし、式にない{括弧|かっこ}を付けています。\n・「48」：最後の足し算を忘れています。\n・「23」：かけ算を足し算にしています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "102",
        "reason": "足し算を先にし、式にない{括弧|かっこ}を付けています。"
      },
      {
        "answer": "48",
        "reason": "最後の足し算を忘れています。"
      },
      {
        "answer": "23",
        "reason": "かけ算を足し算にしています。"
      }
    ],
    "authoring": {
      "family": "expression_1",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_expression_020",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "expression",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "1辺x cmの正方形の周りの長さが32cmです。xはいくつですか。",
    "answer": "8",
    "choices": [
      "8",
      "16",
      "28",
      "32"
    ],
    "hints": [
      "正方形には同じ長さの辺が4本あります。"
    ],
    "explanation": "4×x＝32なので、x＝32÷4＝8です。\n\nほかの選択肢\n・「16」：正方形の辺を2本分として割っています。\n・「28」：周の長さから辺の本数を引いています。\n・「32」：周の長さをそのまま1辺としています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "16",
        "reason": "正方形の辺を2本分として割っています。"
      },
      {
        "answer": "28",
        "reason": "周の長さから辺の本数を引いています。"
      },
      {
        "answer": "32",
        "reason": "周の長さをそのまま1辺としています。"
      }
    ],
    "authoring": {
      "family": "expression_2",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_expression_021",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "expression",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "1500円を出し、1冊100円のノートを4冊と、袋代50円を{払|はら}います。おつりは何円ですか。",
    "answer": "1050",
    "choices": [
      "1100",
      "1350",
      "450",
      "1050"
    ],
    "hints": [
      "まずノート全部と袋の代金を合計します。",
      "出したお金から、その合計を引きましょう。"
    ],
    "explanation": "代金は100×4＋50＝450円。おつりは1500－450＝1050円です。\n\nほかの選択肢\n・「1100」：袋代を引いていません。\n・「1350」：ノート1冊分しか引いていません。\n・「450」：おつりではなく代金を答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "1100",
        "reason": "袋代を引いていません。"
      },
      {
        "answer": "1350",
        "reason": "ノート1冊分しか引いていません。"
      },
      {
        "answer": "450",
        "reason": "おつりではなく代金を答えています。"
      }
    ],
    "authoring": {
      "family": "expression_3",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_expression_022",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "expression",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "品物をx個買う代金y円は、y＝100×x＋200です。代金が600円のとき、個数xはいくつですか。",
    "answer": "4",
    "choices": [
      "8",
      "5",
      "4",
      "6"
    ],
    "hints": [
      "個数によらずかかる料金を先に除きます。"
    ],
    "explanation": "(600－200)÷100＝4個です。\n\nほかの選択肢\n・「6」：固定料金を引かずに単価で割っています。\n・「8」：固定料金を引く代わりに足しています。\n・「5」：固定料金を単価1個分だけ引いてから、単価で割っています。固定料金は2個分です。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "6",
        "reason": "固定料金を引かずに単価で割っています。"
      },
      {
        "answer": "8",
        "reason": "固定料金を引く代わりに足しています。"
      },
      {
        "answer": "5",
        "reason": "固定料金を単価1個分だけ引いてから、単価で割っています。固定料金は2個分です。"
      }
    ],
    "authoring": {
      "family": "expression_4",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_expression_023",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "expression",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "棒で正方形を横一列に5個つなぎます。となりどうしは1辺を共有します。必要な棒の本数は何本ですか。",
    "answer": "16",
    "choices": [
      "12",
      "16",
      "20",
      "15"
    ],
    "hints": [
      "1個には4本。2個目からは3本ずつ増えます。"
    ],
    "explanation": "4＋3×(5－1)＝16本です。\n\nほかの選択肢\n・「20」：共有する辺を2回数えています。\n・「15」：最初の正方形に必要な余分な1本を落としています。\n・「12」：増やした分だけを数え、最初の4本を加えていません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "20",
        "reason": "共有する辺を2回数えています。"
      },
      {
        "answer": "15",
        "reason": "最初の正方形に必要な余分な1本を落としています。"
      },
      {
        "answer": "12",
        "reason": "増やした分だけを数え、最初の4本を加えていません。"
      }
    ],
    "authoring": {
      "family": "expression_5",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_expression_024",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "expression",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "2000円を出し、1冊120円のノートを5冊と、袋代60円を{払|はら}います。おつりは何円ですか。",
    "answer": "1340",
    "choices": [
      "1340",
      "1400",
      "1820",
      "660"
    ],
    "hints": [
      "まずノート全部と袋の代金を合計します。",
      "出したお金から、その合計を引きましょう。"
    ],
    "explanation": "代金は120×5＋60＝660円。おつりは2000－660＝1340円です。\n\nほかの選択肢\n・「1400」：袋代を引いていません。\n・「1820」：ノート1冊分しか引いていません。\n・「660」：おつりではなく代金を答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "1400",
        "reason": "袋代を引いていません。"
      },
      {
        "answer": "1820",
        "reason": "ノート1冊分しか引いていません。"
      },
      {
        "answer": "660",
        "reason": "おつりではなく代金を答えています。"
      }
    ],
    "authoring": {
      "family": "expression_3",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_expression_025",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "expression",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "品物をx個買う代金y円は、y＝120×x＋240です。代金が840円のとき、個数xはいくつですか。",
    "answer": "5",
    "choices": [
      "7",
      "9",
      "6",
      "5"
    ],
    "hints": [
      "個数によらずかかる料金を先に除きます。"
    ],
    "explanation": "(840－240)÷120＝5個です。\n\nほかの選択肢\n・「7」：固定料金を引かずに単価で割っています。\n・「9」：固定料金を引く代わりに足しています。\n・「6」：固定料金を単価1個分だけ引いてから、単価で割っています。固定料金は2個分です。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "7",
        "reason": "固定料金を引かずに単価で割っています。"
      },
      {
        "answer": "9",
        "reason": "固定料金を引く代わりに足しています。"
      },
      {
        "answer": "6",
        "reason": "固定料金を単価1個分だけ引いてから、単価で割っています。固定料金は2個分です。"
      }
    ],
    "authoring": {
      "family": "expression_4",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_expression_026",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "expression",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "棒で正方形を横一列に6個つなぎます。となりどうしは1辺を共有します。必要な棒の本数は何本ですか。",
    "answer": "19",
    "choices": [
      "18",
      "15",
      "19",
      "24"
    ],
    "hints": [
      "1個には4本。2個目からは3本ずつ増えます。"
    ],
    "explanation": "4＋3×(6－1)＝19本です。\n\nほかの選択肢\n・「24」：共有する辺を2回数えています。\n・「18」：最初の正方形に必要な余分な1本を落としています。\n・「15」：増やした分だけを数え、最初の4本を加えていません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "24",
        "reason": "共有する辺を2回数えています。"
      },
      {
        "answer": "18",
        "reason": "最初の正方形に必要な余分な1本を落としています。"
      },
      {
        "answer": "15",
        "reason": "増やした分だけを数え、最初の4本を加えていません。"
      }
    ],
    "authoring": {
      "family": "expression_5",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_expression_027",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "expression",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "2500円を出し、1冊140円のノートを6冊と、袋代70円を{払|はら}います。おつりは何円ですか。",
    "answer": "1590",
    "choices": [
      "910",
      "1590",
      "1660",
      "2290"
    ],
    "hints": [
      "まずノート全部と袋の代金を合計します。",
      "出したお金から、その合計を引きましょう。"
    ],
    "explanation": "代金は140×6＋70＝910円。おつりは2500－910＝1590円です。\n\nほかの選択肢\n・「1660」：袋代を引いていません。\n・「2290」：ノート1冊分しか引いていません。\n・「910」：おつりではなく代金を答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "1660",
        "reason": "袋代を引いていません。"
      },
      {
        "answer": "2290",
        "reason": "ノート1冊分しか引いていません。"
      },
      {
        "answer": "910",
        "reason": "おつりではなく代金を答えています。"
      }
    ],
    "authoring": {
      "family": "expression_3",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_expression_028",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "expression",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "品物をx個買う代金y円は、y＝140×x＋280です。代金が1120円のとき、個数xはいくつですか。",
    "answer": "6",
    "choices": [
      "6",
      "8",
      "10",
      "7"
    ],
    "hints": [
      "個数によらずかかる料金を先に除きます。"
    ],
    "explanation": "(1120－280)÷140＝6個です。\n\nほかの選択肢\n・「8」：固定料金を引かずに単価で割っています。\n・「10」：固定料金を引く代わりに足しています。\n・「7」：固定料金を単価1個分だけ引いてから、単価で割っています。固定料金は2個分です。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "8",
        "reason": "固定料金を引かずに単価で割っています。"
      },
      {
        "answer": "10",
        "reason": "固定料金を引く代わりに足しています。"
      },
      {
        "answer": "7",
        "reason": "固定料金を単価1個分だけ引いてから、単価で割っています。固定料金は2個分です。"
      }
    ],
    "authoring": {
      "family": "expression_4",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_expression_029",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "expression",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "棒で正方形を横一列に7個つなぎます。となりどうしは1辺を共有します。必要な棒の本数は何本ですか。",
    "answer": "22",
    "choices": [
      "28",
      "21",
      "18",
      "22"
    ],
    "hints": [
      "1個には4本。2個目からは3本ずつ増えます。"
    ],
    "explanation": "4＋3×(7－1)＝22本です。\n\nほかの選択肢\n・「28」：共有する辺を2回数えています。\n・「21」：最初の正方形に必要な余分な1本を落としています。\n・「18」：増やした分だけを数え、最初の4本を加えていません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "28",
        "reason": "共有する辺を2回数えています。"
      },
      {
        "answer": "21",
        "reason": "最初の正方形に必要な余分な1本を落としています。"
      },
      {
        "answer": "18",
        "reason": "増やした分だけを数え、最初の4本を加えていません。"
      }
    ],
    "authoring": {
      "family": "expression_5",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_expression_030",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "expression",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "3000円を出し、1冊160円のノートを7冊と、袋代80円を{払|はら}います。おつりは何円ですか。",
    "answer": "1800",
    "choices": [
      "2760",
      "1200",
      "1800",
      "1880"
    ],
    "hints": [
      "まずノート全部と袋の代金を合計します。",
      "出したお金から、その合計を引きましょう。"
    ],
    "explanation": "代金は160×7＋80＝1200円。おつりは3000－1200＝1800円です。\n\nほかの選択肢\n・「1880」：袋代を引いていません。\n・「2760」：ノート1冊分しか引いていません。\n・「1200」：おつりではなく代金を答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "1880",
        "reason": "袋代を引いていません。"
      },
      {
        "answer": "2760",
        "reason": "ノート1冊分しか引いていません。"
      },
      {
        "answer": "1200",
        "reason": "おつりではなく代金を答えています。"
      }
    ],
    "authoring": {
      "family": "expression_3",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_expression_031",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "expression",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "品物をx個買う代金y円は、y＝160×x＋320です。代金が1440円のとき、個数xはいくつですか。",
    "answer": "7",
    "choices": [
      "8",
      "7",
      "9",
      "11"
    ],
    "hints": [
      "個数によらずかかる料金を先に除きます。"
    ],
    "explanation": "(1440－320)÷160＝7個です。\n\nほかの選択肢\n・「9」：固定料金を引かずに単価で割っています。\n・「11」：固定料金を引く代わりに足しています。\n・「8」：固定料金を単価1個分だけ引いてから、単価で割っています。固定料金は2個分です。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "9",
        "reason": "固定料金を引かずに単価で割っています。"
      },
      {
        "answer": "11",
        "reason": "固定料金を引く代わりに足しています。"
      },
      {
        "answer": "8",
        "reason": "固定料金を単価1個分だけ引いてから、単価で割っています。固定料金は2個分です。"
      }
    ],
    "authoring": {
      "family": "expression_4",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_expression_032",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "expression",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "棒で正方形を横一列に8個つなぎます。となりどうしは1辺を共有します。必要な棒の本数は何本ですか。",
    "answer": "25",
    "choices": [
      "25",
      "32",
      "24",
      "21"
    ],
    "hints": [
      "1個には4本。2個目からは3本ずつ増えます。"
    ],
    "explanation": "4＋3×(8－1)＝25本です。\n\nほかの選択肢\n・「32」：共有する辺を2回数えています。\n・「24」：最初の正方形に必要な余分な1本を落としています。\n・「21」：増やした分だけを数え、最初の4本を加えていません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "32",
        "reason": "共有する辺を2回数えています。"
      },
      {
        "answer": "24",
        "reason": "最初の正方形に必要な余分な1本を落としています。"
      },
      {
        "answer": "21",
        "reason": "増やした分だけを数え、最初の4本を加えていません。"
      }
    ],
    "authoring": {
      "family": "expression_5",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_expression_033",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "expression",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "3500円を出し、1冊180円のノートを8冊と、袋代90円を{払|はら}います。おつりは何円ですか。",
    "answer": "1970",
    "choices": [
      "2060",
      "3230",
      "1530",
      "1970"
    ],
    "hints": [
      "まずノート全部と袋の代金を合計します。",
      "出したお金から、その合計を引きましょう。"
    ],
    "explanation": "代金は180×8＋90＝1530円。おつりは3500－1530＝1970円です。\n\nほかの選択肢\n・「2060」：袋代を引いていません。\n・「3230」：ノート1冊分しか引いていません。\n・「1530」：おつりではなく代金を答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "2060",
        "reason": "袋代を引いていません。"
      },
      {
        "answer": "3230",
        "reason": "ノート1冊分しか引いていません。"
      },
      {
        "answer": "1530",
        "reason": "おつりではなく代金を答えています。"
      }
    ],
    "authoring": {
      "family": "expression_3",
      "parameters": {
        "n": 5
      }
    }
  },
  {
    "id": "math_g6_course_expression_034",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "expression",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "品物をx個買う代金y円は、y＝180×x＋360です。代金が1800円のとき、個数xはいくつですか。",
    "answer": "8",
    "choices": [
      "12",
      "9",
      "8",
      "10"
    ],
    "hints": [
      "個数によらずかかる料金を先に除きます。"
    ],
    "explanation": "(1800－360)÷180＝8個です。\n\nほかの選択肢\n・「10」：固定料金を引かずに単価で割っています。\n・「12」：固定料金を引く代わりに足しています。\n・「9」：固定料金を単価1個分だけ引いてから、単価で割っています。固定料金は2個分です。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "10",
        "reason": "固定料金を引かずに単価で割っています。"
      },
      {
        "answer": "12",
        "reason": "固定料金を引く代わりに足しています。"
      },
      {
        "answer": "9",
        "reason": "固定料金を単価1個分だけ引いてから、単価で割っています。固定料金は2個分です。"
      }
    ],
    "authoring": {
      "family": "expression_4",
      "parameters": {
        "n": 5
      }
    }
  },
  {
    "id": "math_g6_course_expression_035",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "expression",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "棒で正方形を横一列に9個つなぎます。となりどうしは1辺を共有します。必要な棒の本数は何本ですか。",
    "answer": "28",
    "choices": [
      "24",
      "28",
      "36",
      "27"
    ],
    "hints": [
      "1個には4本。2個目からは3本ずつ増えます。"
    ],
    "explanation": "4＋3×(9－1)＝28本です。\n\nほかの選択肢\n・「36」：共有する辺を2回数えています。\n・「27」：最初の正方形に必要な余分な1本を落としています。\n・「24」：増やした分だけを数え、最初の4本を加えていません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "36",
        "reason": "共有する辺を2回数えています。"
      },
      {
        "answer": "27",
        "reason": "最初の正方形に必要な余分な1本を落としています。"
      },
      {
        "answer": "24",
        "reason": "増やした分だけを数え、最初の4本を加えていません。"
      }
    ],
    "authoring": {
      "family": "expression_5",
      "parameters": {
        "n": 5
      }
    }
  },
  {
    "id": "math_g6_course_expression_036",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "expression",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "A店は1個110円で送料150円、B店は1個140円で送料無料です。同じ個数を買って代金が等しくなるのは何個のときですか。",
    "answer": "5",
    "choices": [
      "5",
      "10",
      "4",
      "6"
    ],
    "hints": [
      "1個買うごとに、2店の代金の差はどれだけ変わりますか。",
      "送料の差を、1個当たりの値段の差で割ります。"
    ],
    "explanation": "単価の差は30円。150÷30＝5個で送料の差が{埋|う}まります。\n\nほかの選択肢\n・「10」：単価の差を半分として計算し、必要な個数を2倍にしています。\n・「4」：1個少ないと、まだA店に送料分の差が残ります。\n・「6」：1個多いと、B店の代金がA店を上回ります。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "10",
        "reason": "単価の差を半分として計算し、必要な個数を2倍にしています。"
      },
      {
        "answer": "4",
        "reason": "1個少ないと、まだA店に送料分の差が残ります。"
      },
      {
        "answer": "6",
        "reason": "1個多いと、B店の代金がA店を上回ります。"
      }
    ],
    "authoring": {
      "family": "expression_6",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_expression_037",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "expression",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "入場料は子ども130円、大人260円です。大人と子ども合わせて9人で1820円{払|はら}いました。子どもは何人ですか。",
    "answer": "4",
    "choices": [
      "5",
      "3",
      "7",
      "4"
    ],
    "hints": [
      "全員大人だと仮定した代金と比べます。",
      "子ども1人につき、仮定した代金からいくら減りますか。"
    ],
    "explanation": "全員大人なら2340円。差520円を1人分の差130円で割り、4人です。\n\nほかの選択肢\n・「5」：大人の人数を答えています。\n・「3」：大人を子どもに{替|か}えた人数を1人少なく数えています。\n・「7」：全員大人の料金で割った商を、子どもの人数としています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "5",
        "reason": "大人の人数を答えています。"
      },
      {
        "answer": "3",
        "reason": "大人を子どもに{替|か}えた人数を1人少なく数えています。"
      },
      {
        "answer": "7",
        "reason": "全員大人の料金で割った商を、子どもの人数としています。"
      }
    ],
    "authoring": {
      "family": "expression_7",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_expression_038",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "expression",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "A店は1個120円で送料240円、B店は1個160円で送料無料です。同じ個数を買って代金が等しくなるのは何個のときですか。",
    "answer": "6",
    "choices": [
      "5",
      "7",
      "6",
      "12"
    ],
    "hints": [
      "1個買うごとに、2店の代金の差はどれだけ変わりますか。",
      "送料の差を、1個当たりの値段の差で割ります。"
    ],
    "explanation": "単価の差は40円。240÷40＝6個で送料の差が{埋|う}まります。\n\nほかの選択肢\n・「12」：単価の差を半分として計算し、必要な個数を2倍にしています。\n・「5」：1個少ないと、まだA店に送料分の差が残ります。\n・「7」：1個多いと、B店の代金がA店を上回ります。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "12",
        "reason": "単価の差を半分として計算し、必要な個数を2倍にしています。"
      },
      {
        "answer": "5",
        "reason": "1個少ないと、まだA店に送料分の差が残ります。"
      },
      {
        "answer": "7",
        "reason": "1個多いと、B店の代金がA店を上回ります。"
      }
    ],
    "authoring": {
      "family": "expression_6",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_expression_039",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "expression",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "A店は1個130円で送料350円、B店は1個180円で送料無料です。同じ個数を買って代金が等しくなるのは何個のときですか。",
    "answer": "7",
    "choices": [
      "8",
      "7",
      "14",
      "6"
    ],
    "hints": [
      "1個買うごとに、2店の代金の差はどれだけ変わりますか。",
      "送料の差を、1個当たりの値段の差で割ります。"
    ],
    "explanation": "単価の差は50円。350÷50＝7個で送料の差が{埋|う}まります。\n\nほかの選択肢\n・「14」：単価の差を半分として計算し、必要な個数を2倍にしています。\n・「6」：1個少ないと、まだA店に送料分の差が残ります。\n・「8」：1個多いと、B店の代金がA店を上回ります。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "14",
        "reason": "単価の差を半分として計算し、必要な個数を2倍にしています。"
      },
      {
        "answer": "6",
        "reason": "1個少ないと、まだA店に送料分の差が残ります。"
      },
      {
        "answer": "8",
        "reason": "1個多いと、B店の代金がA店を上回ります。"
      }
    ],
    "authoring": {
      "family": "expression_6",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_expression_040",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "expression",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "A店は1個140円で送料480円、B店は1個200円で送料無料です。同じ個数を買って代金が等しくなるのは何個のときですか。",
    "answer": "8",
    "choices": [
      "8",
      "16",
      "7",
      "9"
    ],
    "hints": [
      "1個買うごとに、2店の代金の差はどれだけ変わりますか。",
      "送料の差を、1個当たりの値段の差で割ります。"
    ],
    "explanation": "単価の差は60円。480÷60＝8個で送料の差が{埋|う}まります。\n\nほかの選択肢\n・「16」：単価の差を半分として計算し、必要な個数を2倍にしています。\n・「7」：1個少ないと、まだA店に送料分の差が残ります。\n・「9」：1個多いと、B店の代金がA店を上回ります。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "16",
        "reason": "単価の差を半分として計算し、必要な個数を2倍にしています。"
      },
      {
        "answer": "7",
        "reason": "1個少ないと、まだA店に送料分の差が残ります。"
      },
      {
        "answer": "9",
        "reason": "1個多いと、B店の代金がA店を上回ります。"
      }
    ],
    "authoring": {
      "family": "expression_6",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_expression_041",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "expression",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "入場料は子ども160円、大人320円です。大人と子ども合わせて12人で2720円{払|はら}いました。子どもは何人ですか。",
    "answer": "7",
    "choices": [
      "5",
      "6",
      "8",
      "7"
    ],
    "hints": [
      "全員大人だと仮定した代金と比べます。",
      "子ども1人につき、仮定した代金からいくら減りますか。"
    ],
    "explanation": "全員大人なら3840円。差1120円を1人分の差160円で割り、7人です。\n\nほかの選択肢\n・「5」：大人の人数を答えています。\n・「6」：大人を子どもに{替|か}えた人数を1人少なく数えています。\n・「8」：全員大人の料金で割った商を、子どもの人数としています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "5",
        "reason": "大人の人数を答えています。"
      },
      {
        "answer": "6",
        "reason": "大人を子どもに{替|か}えた人数を1人少なく数えています。"
      },
      {
        "answer": "8",
        "reason": "全員大人の料金で割った商を、子どもの人数としています。"
      }
    ],
    "authoring": {
      "family": "expression_7",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_expression_042",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "expression",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "A店は1個150円で送料630円、B店は1個220円で送料無料です。同じ個数を買って代金が等しくなるのは何個のときですか。",
    "answer": "9",
    "choices": [
      "8",
      "10",
      "9",
      "18"
    ],
    "hints": [
      "1個買うごとに、2店の代金の差はどれだけ変わりますか。",
      "送料の差を、1個当たりの値段の差で割ります。"
    ],
    "explanation": "単価の差は70円。630÷70＝9個で送料の差が{埋|う}まります。\n\nほかの選択肢\n・「18」：単価の差を半分として計算し、必要な個数を2倍にしています。\n・「8」：1個少ないと、まだA店に送料分の差が残ります。\n・「10」：1個多いと、B店の代金がA店を上回ります。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "18",
        "reason": "単価の差を半分として計算し、必要な個数を2倍にしています。"
      },
      {
        "answer": "8",
        "reason": "1個少ないと、まだA店に送料分の差が残ります。"
      },
      {
        "answer": "10",
        "reason": "1個多いと、B店の代金がA店を上回ります。"
      }
    ],
    "authoring": {
      "family": "expression_6",
      "parameters": {
        "n": 5
      }
    }
  },
  {
    "id": "math_g6_course_expression_043",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "expression",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "入場料は子ども170円、大人340円です。大人と子ども合わせて13人で3060円{払|はら}いました。子どもは何人ですか。",
    "answer": "8",
    "choices": [
      "9",
      "8",
      "5",
      "7"
    ],
    "hints": [
      "全員大人だと仮定した代金と比べます。",
      "子ども1人につき、仮定した代金からいくら減りますか。"
    ],
    "explanation": "全員大人なら4420円。差1360円を1人分の差170円で割り、8人です。\n\nほかの選択肢\n・「5」：大人の人数を答えています。\n・「7」：大人を子どもに{替|か}えた人数を1人少なく数えています。\n・「9」：全員大人の料金で割った商を、子どもの人数としています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "5",
        "reason": "大人の人数を答えています。"
      },
      {
        "answer": "7",
        "reason": "大人を子どもに{替|か}えた人数を1人少なく数えています。"
      },
      {
        "answer": "9",
        "reason": "全員大人の料金で割った商を、子どもの人数としています。"
      }
    ],
    "authoring": {
      "family": "expression_7",
      "parameters": {
        "n": 5
      }
    }
  },
  {
    "id": "math_g6_course_expression_044",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "expression",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "A店は1個160円で送料800円、B店は1個240円で送料無料です。同じ個数を買って代金が等しくなるのは何個のときですか。",
    "answer": "10",
    "choices": [
      "10",
      "20",
      "9",
      "11"
    ],
    "hints": [
      "1個買うごとに、2店の代金の差はどれだけ変わりますか。",
      "送料の差を、1個当たりの値段の差で割ります。"
    ],
    "explanation": "単価の差は80円。800÷80＝10個で送料の差が{埋|う}まります。\n\nほかの選択肢\n・「20」：単価の差を半分として計算し、必要な個数を2倍にしています。\n・「9」：1個少ないと、まだA店に送料分の差が残ります。\n・「11」：1個多いと、B店の代金がA店を上回ります。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "20",
        "reason": "単価の差を半分として計算し、必要な個数を2倍にしています。"
      },
      {
        "answer": "9",
        "reason": "1個少ないと、まだA店に送料分の差が残ります。"
      },
      {
        "answer": "11",
        "reason": "1個多いと、B店の代金がA店を上回ります。"
      }
    ],
    "authoring": {
      "family": "expression_6",
      "parameters": {
        "n": 6
      }
    }
  },
  {
    "id": "math_g6_course_expression_045",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "expression",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "A店は1個170円で送料990円、B店は1個260円で送料無料です。同じ個数を買って代金が等しくなるのは何個のときですか。",
    "answer": "11",
    "choices": [
      "22",
      "10",
      "12",
      "11"
    ],
    "hints": [
      "1個買うごとに、2店の代金の差はどれだけ変わりますか。",
      "送料の差を、1個当たりの値段の差で割ります。"
    ],
    "explanation": "単価の差は90円。990÷90＝11個で送料の差が{埋|う}まります。\n\nほかの選択肢\n・「22」：単価の差を半分として計算し、必要な個数を2倍にしています。\n・「10」：1個少ないと、まだA店に送料分の差が残ります。\n・「12」：1個多いと、B店の代金がA店を上回ります。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "22",
        "reason": "単価の差を半分として計算し、必要な個数を2倍にしています。"
      },
      {
        "answer": "10",
        "reason": "1個少ないと、まだA店に送料分の差が残ります。"
      },
      {
        "answer": "12",
        "reason": "1個多いと、B店の代金がA店を上回ります。"
      }
    ],
    "authoring": {
      "family": "expression_6",
      "parameters": {
        "n": 7
      }
    }
  },
  {
    "id": "math_g6_course_fraction_021",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "fraction",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "1/2×3/5を計算し、約分した答えを選びましょう。",
    "answer": "3/10",
    "choices": [
      "4/7",
      "5/6",
      "3/2",
      "3/10"
    ],
    "hints": [
      "分子どうし、分母どうしをかけます。",
      "分子と分母の共通の約数で約分します。"
    ],
    "explanation": "分子は1×3、分母は2×5。約分して3/10です。\n\nほかの選択肢\n・「4/7」：分子どうし・分母どうしを足しています。\n・「5/6」：かけ算なのに後ろの分数を逆数にしています。\n・「3/2」：分母どうしをかけず、前の分母だけを使っています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "4/7",
        "reason": "分子どうし・分母どうしを足しています。"
      },
      {
        "answer": "5/6",
        "reason": "かけ算なのに後ろの分数を逆数にしています。"
      },
      {
        "answer": "3/2",
        "reason": "分母どうしをかけず、前の分母だけを使っています。"
      }
    ],
    "authoring": {
      "family": "fraction_0",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_fraction_022",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "fraction",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "1/2÷3/5を計算し、約分した答えを選びましょう。",
    "answer": "5/6",
    "choices": [
      "6/5",
      "1/3",
      "5/6",
      "3/10"
    ],
    "hints": [
      "割る数を逆数にしてかけます。"
    ],
    "explanation": "1/2×5/3を計算して約分すると5/6です。\n\nほかの選択肢\n・「3/10」：割り算をそのままかけ算にしています。\n・「6/5」：割る数ではなく割られる数を逆数にしています。\n・「1/3」：分子どうしだけを割っています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "3/10",
        "reason": "割り算をそのままかけ算にしています。"
      },
      {
        "answer": "6/5",
        "reason": "割る数ではなく割られる数を逆数にしています。"
      },
      {
        "answer": "1/3",
        "reason": "分子どうしだけを割っています。"
      }
    ],
    "authoring": {
      "family": "fraction_1",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_fraction_023",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "fraction",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "3/5×2/3を計算し、約分した答えを選びましょう。",
    "answer": "2/5",
    "choices": [
      "6/5",
      "2/5",
      "5/8",
      "9/10"
    ],
    "hints": [
      "分子どうし、分母どうしをかけます。",
      "分子と分母の共通の約数で約分します。"
    ],
    "explanation": "分子は3×2、分母は5×3。約分して2/5です。\n\nほかの選択肢\n・「5/8」：分子どうし・分母どうしを足しています。\n・「9/10」：かけ算なのに後ろの分数を逆数にしています。\n・「6/5」：分母どうしをかけず、前の分母だけを使っています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "5/8",
        "reason": "分子どうし・分母どうしを足しています。"
      },
      {
        "answer": "9/10",
        "reason": "かけ算なのに後ろの分数を逆数にしています。"
      },
      {
        "answer": "6/5",
        "reason": "分母どうしをかけず、前の分母だけを使っています。"
      }
    ],
    "authoring": {
      "family": "fraction_0",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_fraction_024",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "fraction",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "3/5÷2/3を計算し、約分した答えを選びましょう。",
    "answer": "9/10",
    "choices": [
      "9/10",
      "2/5",
      "10/9",
      "3/2"
    ],
    "hints": [
      "割る数を逆数にしてかけます。"
    ],
    "explanation": "3/5×3/2を計算して約分すると9/10です。\n\nほかの選択肢\n・「2/5」：割り算をそのままかけ算にしています。\n・「10/9」：割る数ではなく割られる数を逆数にしています。\n・「3/2」：分子どうしだけを割っています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "2/5",
        "reason": "割り算をそのままかけ算にしています。"
      },
      {
        "answer": "10/9",
        "reason": "割る数ではなく割られる数を逆数にしています。"
      },
      {
        "answer": "3/2",
        "reason": "分子どうしだけを割っています。"
      }
    ],
    "authoring": {
      "family": "fraction_1",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_fraction_025",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "fraction",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "2/3×5/7を計算し、約分した答えを選びましょう。",
    "answer": "10/21",
    "choices": [
      "7/10",
      "14/15",
      "10/3",
      "10/21"
    ],
    "hints": [
      "分子どうし、分母どうしをかけます。",
      "分子と分母の共通の約数で約分します。"
    ],
    "explanation": "分子は2×5、分母は3×7。約分して10/21です。\n\nほかの選択肢\n・「7/10」：分子どうし・分母どうしを足しています。\n・「14/15」：かけ算なのに後ろの分数を逆数にしています。\n・「10/3」：分母どうしをかけず、前の分母だけを使っています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "7/10",
        "reason": "分子どうし・分母どうしを足しています。"
      },
      {
        "answer": "14/15",
        "reason": "かけ算なのに後ろの分数を逆数にしています。"
      },
      {
        "answer": "10/3",
        "reason": "分母どうしをかけず、前の分母だけを使っています。"
      }
    ],
    "authoring": {
      "family": "fraction_0",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_fraction_026",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "fraction",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "2/3÷5/7を計算し、約分した答えを選びましょう。",
    "answer": "14/15",
    "choices": [
      "15/14",
      "2/5",
      "14/15",
      "10/21"
    ],
    "hints": [
      "割る数を逆数にしてかけます。"
    ],
    "explanation": "2/3×7/5を計算して約分すると14/15です。\n\nほかの選択肢\n・「10/21」：割り算をそのままかけ算にしています。\n・「15/14」：割る数ではなく割られる数を逆数にしています。\n・「2/5」：分子どうしだけを割っています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "10/21",
        "reason": "割り算をそのままかけ算にしています。"
      },
      {
        "answer": "15/14",
        "reason": "割る数ではなく割られる数を逆数にしています。"
      },
      {
        "answer": "2/5",
        "reason": "分子どうしだけを割っています。"
      }
    ],
    "authoring": {
      "family": "fraction_1",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_fraction_027",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "fraction",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "5/7×3/4を計算し、約分した答えを選びましょう。",
    "answer": "15/28",
    "choices": [
      "15/7",
      "15/28",
      "8/11",
      "20/21"
    ],
    "hints": [
      "分子どうし、分母どうしをかけます。",
      "分子と分母の共通の約数で約分します。"
    ],
    "explanation": "分子は5×3、分母は7×4。約分して15/28です。\n\nほかの選択肢\n・「8/11」：分子どうし・分母どうしを足しています。\n・「20/21」：かけ算なのに後ろの分数を逆数にしています。\n・「15/7」：分母どうしをかけず、前の分母だけを使っています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "8/11",
        "reason": "分子どうし・分母どうしを足しています。"
      },
      {
        "answer": "20/21",
        "reason": "かけ算なのに後ろの分数を逆数にしています。"
      },
      {
        "answer": "15/7",
        "reason": "分母どうしをかけず、前の分母だけを使っています。"
      }
    ],
    "authoring": {
      "family": "fraction_0",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_fraction_028",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "fraction",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "5/7÷3/4を計算し、約分した答えを選びましょう。",
    "answer": "20/21",
    "choices": [
      "20/21",
      "15/28",
      "21/20",
      "5/3"
    ],
    "hints": [
      "割る数を逆数にしてかけます。"
    ],
    "explanation": "5/7×4/3を計算して約分すると20/21です。\n\nほかの選択肢\n・「15/28」：割り算をそのままかけ算にしています。\n・「21/20」：割る数ではなく割られる数を逆数にしています。\n・「5/3」：分子どうしだけを割っています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "15/28",
        "reason": "割り算をそのままかけ算にしています。"
      },
      {
        "answer": "21/20",
        "reason": "割る数ではなく割られる数を逆数にしています。"
      },
      {
        "answer": "5/3",
        "reason": "分子どうしだけを割っています。"
      }
    ],
    "authoring": {
      "family": "fraction_1",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_fraction_029",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "fraction",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "3/4×7/9を計算し、約分した答えを選びましょう。",
    "answer": "7/12",
    "choices": [
      "10/13",
      "27/28",
      "21/4",
      "7/12"
    ],
    "hints": [
      "分子どうし、分母どうしをかけます。",
      "分子と分母の共通の約数で約分します。"
    ],
    "explanation": "分子は3×7、分母は4×9。約分して7/12です。\n\nほかの選択肢\n・「10/13」：分子どうし・分母どうしを足しています。\n・「27/28」：かけ算なのに後ろの分数を逆数にしています。\n・「21/4」：分母どうしをかけず、前の分母だけを使っています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "10/13",
        "reason": "分子どうし・分母どうしを足しています。"
      },
      {
        "answer": "27/28",
        "reason": "かけ算なのに後ろの分数を逆数にしています。"
      },
      {
        "answer": "21/4",
        "reason": "分母どうしをかけず、前の分母だけを使っています。"
      }
    ],
    "authoring": {
      "family": "fraction_0",
      "parameters": {
        "n": 5
      }
    }
  },
  {
    "id": "math_g6_course_fraction_030",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "fraction",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "3/4÷7/9を計算し、約分した答えを選びましょう。",
    "answer": "27/28",
    "choices": [
      "28/27",
      "3/7",
      "27/28",
      "7/12"
    ],
    "hints": [
      "割る数を逆数にしてかけます。"
    ],
    "explanation": "3/4×9/7を計算して約分すると27/28です。\n\nほかの選択肢\n・「7/12」：割り算をそのままかけ算にしています。\n・「28/27」：割る数ではなく割られる数を逆数にしています。\n・「3/7」：分子どうしだけを割っています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "7/12",
        "reason": "割り算をそのままかけ算にしています。"
      },
      {
        "answer": "28/27",
        "reason": "割る数ではなく割られる数を逆数にしています。"
      },
      {
        "answer": "3/7",
        "reason": "分子どうしだけを割っています。"
      }
    ],
    "authoring": {
      "family": "fraction_1",
      "parameters": {
        "n": 5
      }
    }
  },
  {
    "id": "math_g6_course_fraction_031",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "fraction",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "4Lのジュースを、1人に1/3Lずつ配ります。何人に配れますか。",
    "answer": "12",
    "choices": [
      "4",
      "12",
      "7",
      "3"
    ],
    "hints": [
      "全体量÷1人分で人数を求めます。"
    ],
    "explanation": "4÷1/3＝12人です。\n\nほかの選択肢\n・「7」：全体量の数値と1人分の分母を足しています。\n・「3」：全体を1Lとしています。\n・「4」：全体量の数値を、そのまま人数として答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "7",
        "reason": "全体量の数値と1人分の分母を足しています。"
      },
      {
        "answer": "3",
        "reason": "全体を1Lとしています。"
      },
      {
        "answer": "4",
        "reason": "全体量の数値を、そのまま人数として答えています。"
      }
    ],
    "authoring": {
      "family": "fraction_2",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_fraction_032",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "fraction",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "5Lのジュースを、1人に1/4Lずつ配ります。何人に配れますか。",
    "answer": "20",
    "choices": [
      "20",
      "9",
      "4",
      "5"
    ],
    "hints": [
      "全体量÷1人分で人数を求めます。"
    ],
    "explanation": "5÷1/4＝20人です。\n\nほかの選択肢\n・「9」：全体量の数値と1人分の分母を足しています。\n・「4」：全体を1Lとしています。\n・「5」：全体量の数値を、そのまま人数として答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "9",
        "reason": "全体量の数値と1人分の分母を足しています。"
      },
      {
        "answer": "4",
        "reason": "全体を1Lとしています。"
      },
      {
        "answer": "5",
        "reason": "全体量の数値を、そのまま人数として答えています。"
      }
    ],
    "authoring": {
      "family": "fraction_2",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_fraction_033",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "fraction",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "ある数の3/5が18です。ある数はいくつですか。",
    "answer": "30",
    "choices": [
      "54/5",
      "18",
      "45",
      "30"
    ],
    "hints": [
      "もとの数×割合＝分かっている量と考えます。"
    ],
    "explanation": "18÷3/5＝30です。\n\nほかの選択肢\n・「54/5」：分かっている部分の量を、もとの量としてかけています。\n・「18」：部分の量をそのまま答えています。\n・「45」：示された割合ではなく残りの割合で割っています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "54/5",
        "reason": "分かっている部分の量を、もとの量としてかけています。"
      },
      {
        "answer": "18",
        "reason": "部分の量をそのまま答えています。"
      },
      {
        "answer": "45",
        "reason": "示された割合ではなく残りの割合で割っています。"
      }
    ],
    "authoring": {
      "family": "fraction_3",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_fraction_034",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "fraction",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "6Lのジュースを、1人に1/5Lずつ配ります。何人に配れますか。",
    "answer": "30",
    "choices": [
      "5",
      "6",
      "30",
      "11"
    ],
    "hints": [
      "全体量÷1人分で人数を求めます。"
    ],
    "explanation": "6÷1/5＝30人です。\n\nほかの選択肢\n・「11」：全体量の数値と1人分の分母を足しています。\n・「5」：全体を1Lとしています。\n・「6」：全体量の数値を、そのまま人数として答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "11",
        "reason": "全体量の数値と1人分の分母を足しています。"
      },
      {
        "answer": "5",
        "reason": "全体を1Lとしています。"
      },
      {
        "answer": "6",
        "reason": "全体量の数値を、そのまま人数として答えています。"
      }
    ],
    "authoring": {
      "family": "fraction_2",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_fraction_035",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "fraction",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "ある数の2/3が24です。ある数はいくつですか。",
    "answer": "36",
    "choices": [
      "72",
      "36",
      "16",
      "24"
    ],
    "hints": [
      "もとの数×割合＝分かっている量と考えます。"
    ],
    "explanation": "24÷2/3＝36です。\n\nほかの選択肢\n・「16」：分かっている部分の量を、もとの量としてかけています。\n・「24」：部分の量をそのまま答えています。\n・「72」：示された割合ではなく残りの割合で割っています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "16",
        "reason": "分かっている部分の量を、もとの量としてかけています。"
      },
      {
        "answer": "24",
        "reason": "部分の量をそのまま答えています。"
      },
      {
        "answer": "72",
        "reason": "示された割合ではなく残りの割合で割っています。"
      }
    ],
    "authoring": {
      "family": "fraction_3",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_fraction_036",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "fraction",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "7Lのジュースを、1人に1/6Lずつ配ります。何人に配れますか。",
    "answer": "42",
    "choices": [
      "42",
      "13",
      "6",
      "7"
    ],
    "hints": [
      "全体量÷1人分で人数を求めます。"
    ],
    "explanation": "7÷1/6＝42人です。\n\nほかの選択肢\n・「13」：全体量の数値と1人分の分母を足しています。\n・「6」：全体を1Lとしています。\n・「7」：全体量の数値を、そのまま人数として答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "13",
        "reason": "全体量の数値と1人分の分母を足しています。"
      },
      {
        "answer": "6",
        "reason": "全体を1Lとしています。"
      },
      {
        "answer": "7",
        "reason": "全体量の数値を、そのまま人数として答えています。"
      }
    ],
    "authoring": {
      "family": "fraction_2",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_fraction_037",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "fraction",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "ある数の5/7が30です。ある数はいくつですか。",
    "answer": "42",
    "choices": [
      "150/7",
      "30",
      "105",
      "42"
    ],
    "hints": [
      "もとの数×割合＝分かっている量と考えます。"
    ],
    "explanation": "30÷5/7＝42です。\n\nほかの選択肢\n・「150/7」：分かっている部分の量を、もとの量としてかけています。\n・「30」：部分の量をそのまま答えています。\n・「105」：示された割合ではなく残りの割合で割っています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "150/7",
        "reason": "分かっている部分の量を、もとの量としてかけています。"
      },
      {
        "answer": "30",
        "reason": "部分の量をそのまま答えています。"
      },
      {
        "answer": "105",
        "reason": "示された割合ではなく残りの割合で割っています。"
      }
    ],
    "authoring": {
      "family": "fraction_3",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_fraction_038",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "fraction",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "8Lのジュースを、1人に1/7Lずつ配ります。何人に配れますか。",
    "answer": "56",
    "choices": [
      "7",
      "8",
      "56",
      "15"
    ],
    "hints": [
      "全体量÷1人分で人数を求めます。"
    ],
    "explanation": "8÷1/7＝56人です。\n\nほかの選択肢\n・「15」：全体量の数値と1人分の分母を足しています。\n・「7」：全体を1Lとしています。\n・「8」：全体量の数値を、そのまま人数として答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "15",
        "reason": "全体量の数値と1人分の分母を足しています。"
      },
      {
        "answer": "7",
        "reason": "全体を1Lとしています。"
      },
      {
        "answer": "8",
        "reason": "全体量の数値を、そのまま人数として答えています。"
      }
    ],
    "authoring": {
      "family": "fraction_2",
      "parameters": {
        "n": 5
      }
    }
  },
  {
    "id": "math_g6_course_fraction_039",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "fraction",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "ある数の3/4が36です。ある数はいくつですか。",
    "answer": "48",
    "choices": [
      "144",
      "48",
      "27",
      "36"
    ],
    "hints": [
      "もとの数×割合＝分かっている量と考えます。"
    ],
    "explanation": "36÷3/4＝48です。\n\nほかの選択肢\n・「27」：分かっている部分の量を、もとの量としてかけています。\n・「36」：部分の量をそのまま答えています。\n・「144」：示された割合ではなく残りの割合で割っています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "27",
        "reason": "分かっている部分の量を、もとの量としてかけています。"
      },
      {
        "answer": "36",
        "reason": "部分の量をそのまま答えています。"
      },
      {
        "answer": "144",
        "reason": "示された割合ではなく残りの割合で割っています。"
      }
    ],
    "authoring": {
      "family": "fraction_3",
      "parameters": {
        "n": 5
      }
    }
  },
  {
    "id": "math_g6_course_fraction_040",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "fraction",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "9Lのジュースを、1人に1/8Lずつ配ります。何人に配れますか。",
    "answer": "72",
    "choices": [
      "72",
      "17",
      "8",
      "9"
    ],
    "hints": [
      "全体量÷1人分で人数を求めます。"
    ],
    "explanation": "9÷1/8＝72人です。\n\nほかの選択肢\n・「17」：全体量の数値と1人分の分母を足しています。\n・「8」：全体を1Lとしています。\n・「9」：全体量の数値を、そのまま人数として答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "17",
        "reason": "全体量の数値と1人分の分母を足しています。"
      },
      {
        "answer": "8",
        "reason": "全体を1Lとしています。"
      },
      {
        "answer": "9",
        "reason": "全体量の数値を、そのまま人数として答えています。"
      }
    ],
    "authoring": {
      "family": "fraction_2",
      "parameters": {
        "n": 6
      }
    }
  },
  {
    "id": "math_g6_course_fraction_041",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "fraction",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "ある数の7/9が42です。ある数はいくつですか。",
    "answer": "54",
    "choices": [
      "98/3",
      "42",
      "189",
      "54"
    ],
    "hints": [
      "もとの数×割合＝分かっている量と考えます。"
    ],
    "explanation": "42÷7/9＝54です。\n\nほかの選択肢\n・「98/3」：分かっている部分の量を、もとの量としてかけています。\n・「42」：部分の量をそのまま答えています。\n・「189」：示された割合ではなく残りの割合で割っています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "98/3",
        "reason": "分かっている部分の量を、もとの量としてかけています。"
      },
      {
        "answer": "42",
        "reason": "部分の量をそのまま答えています。"
      },
      {
        "answer": "189",
        "reason": "示された割合ではなく残りの割合で割っています。"
      }
    ],
    "authoring": {
      "family": "fraction_3",
      "parameters": {
        "n": 6
      }
    }
  },
  {
    "id": "math_g6_course_fraction_042",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "fraction",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "10Lのジュースを、1人に1/9Lずつ配ります。何人に配れますか。",
    "answer": "90",
    "choices": [
      "9",
      "10",
      "90",
      "19"
    ],
    "hints": [
      "全体量÷1人分で人数を求めます。"
    ],
    "explanation": "10÷1/9＝90人です。\n\nほかの選択肢\n・「19」：全体量の数値と1人分の分母を足しています。\n・「9」：全体を1Lとしています。\n・「10」：全体量の数値を、そのまま人数として答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "19",
        "reason": "全体量の数値と1人分の分母を足しています。"
      },
      {
        "answer": "9",
        "reason": "全体を1Lとしています。"
      },
      {
        "answer": "10",
        "reason": "全体量の数値を、そのまま人数として答えています。"
      }
    ],
    "authoring": {
      "family": "fraction_2",
      "parameters": {
        "n": 7
      }
    }
  },
  {
    "id": "math_g6_course_fraction_043",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "fraction",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "リボンの1/3を使い、残りの1/4をさらに使ったら36m残りました。初めは何mありましたか。",
    "answer": "72",
    "choices": [
      "54",
      "72",
      "432/5",
      "48"
    ],
    "hints": [
      "2回目の割合は、1回目に残った量をもとにしています。",
      "最後に残る割合をかけ算で求め、残量をその割合で割ります。"
    ],
    "explanation": "最後に残る割合は(1－1/3)×(1－1/4)＝1/2。36をこの割合で割ると72mです。\n\nほかの選択肢\n・「432/5」：2回目の割合も、最初の全体に対する割合として引いています。\n・「48」：最初に使った分を反映していません。\n・「54」：2回目に使った分を反映していません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "432/5",
        "reason": "2回目の割合も、最初の全体に対する割合として引いています。"
      },
      {
        "answer": "48",
        "reason": "最初に使った分を反映していません。"
      },
      {
        "answer": "54",
        "reason": "2回目に使った分を反映していません。"
      }
    ],
    "authoring": {
      "family": "fraction_4",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_fraction_044",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "fraction",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "Aさんはある仕事全体を5時間、Bさんは同じ仕事全体を10時間で終えます。一定の能率で2人が同時に働くと何時間かかりますか。",
    "answer": "10/3",
    "choices": [
      "10/3",
      "15/2",
      "15",
      "3/10"
    ],
    "hints": [
      "仕事全体を1として、1時間に終える割合をそれぞれ求めます。",
      "2人分の割合を足し、全体1をその割合で割ります。"
    ],
    "explanation": "1時間に1/5＋1/10＝3/10できます。1÷3/10＝10/3時間です。\n\nほかの選択肢\n・「15/2」：2人の作業時間を単純に平均しています。\n・「15」：同時に働くのに時間を足しています。\n・「3/10」：1時間当たりの仕事の割合を、時間として答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "15/2",
        "reason": "2人の作業時間を単純に平均しています。"
      },
      {
        "answer": "15",
        "reason": "同時に働くのに時間を足しています。"
      },
      {
        "answer": "3/10",
        "reason": "1時間当たりの仕事の割合を、時間として答えています。"
      }
    ],
    "authoring": {
      "family": "fraction_5",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_fraction_045",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "fraction",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "リボンの1/4を使い、残りの1/5をさらに使ったら72m残りました。初めは何mありましたか。",
    "answer": "120",
    "choices": [
      "1440/11",
      "90",
      "96",
      "120"
    ],
    "hints": [
      "2回目の割合は、1回目に残った量をもとにしています。",
      "最後に残る割合をかけ算で求め、残量をその割合で割ります。"
    ],
    "explanation": "最後に残る割合は(1－1/4)×(1－1/5)＝3/5。72をこの割合で割ると120mです。\n\nほかの選択肢\n・「1440/11」：2回目の割合も、最初の全体に対する割合として引いています。\n・「90」：最初に使った分を反映していません。\n・「96」：2回目に使った分を反映していません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "1440/11",
        "reason": "2回目の割合も、最初の全体に対する割合として引いています。"
      },
      {
        "answer": "90",
        "reason": "最初に使った分を反映していません。"
      },
      {
        "answer": "96",
        "reason": "2回目に使った分を反映していません。"
      }
    ],
    "authoring": {
      "family": "fraction_4",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_fraction_046",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "fraction",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "Aさんはある仕事全体を6時間、Bさんは同じ仕事全体を12時間で終えます。一定の能率で2人が同時に働くと何時間かかりますか。",
    "answer": "4",
    "choices": [
      "18",
      "1/4",
      "4",
      "9"
    ],
    "hints": [
      "仕事全体を1として、1時間に終える割合をそれぞれ求めます。",
      "2人分の割合を足し、全体1をその割合で割ります。"
    ],
    "explanation": "1時間に1/6＋1/12＝1/4できます。1÷1/4＝4時間です。\n\nほかの選択肢\n・「9」：2人の作業時間を単純に平均しています。\n・「18」：同時に働くのに時間を足しています。\n・「1/4」：1時間当たりの仕事の割合を、時間として答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "9",
        "reason": "2人の作業時間を単純に平均しています。"
      },
      {
        "answer": "18",
        "reason": "同時に働くのに時間を足しています。"
      },
      {
        "answer": "1/4",
        "reason": "1時間当たりの仕事の割合を、時間として答えています。"
      }
    ],
    "authoring": {
      "family": "fraction_5",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_fraction_047",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "fraction",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "リボンの1/5を使い、残りの1/6をさらに使ったら120m残りました。初めは何mありましたか。",
    "answer": "180",
    "choices": [
      "150",
      "180",
      "3600/19",
      "144"
    ],
    "hints": [
      "2回目の割合は、1回目に残った量をもとにしています。",
      "最後に残る割合をかけ算で求め、残量をその割合で割ります。"
    ],
    "explanation": "最後に残る割合は(1－1/5)×(1－1/6)＝2/3。120をこの割合で割ると180mです。\n\nほかの選択肢\n・「3600/19」：2回目の割合も、最初の全体に対する割合として引いています。\n・「144」：最初に使った分を反映していません。\n・「150」：2回目に使った分を反映していません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "3600/19",
        "reason": "2回目の割合も、最初の全体に対する割合として引いています。"
      },
      {
        "answer": "144",
        "reason": "最初に使った分を反映していません。"
      },
      {
        "answer": "150",
        "reason": "2回目に使った分を反映していません。"
      }
    ],
    "authoring": {
      "family": "fraction_4",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_fraction_048",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "fraction",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "Aさんはある仕事全体を7時間、Bさんは同じ仕事全体を14時間で終えます。一定の能率で2人が同時に働くと何時間かかりますか。",
    "answer": "14/3",
    "choices": [
      "14/3",
      "21/2",
      "21",
      "3/14"
    ],
    "hints": [
      "仕事全体を1として、1時間に終える割合をそれぞれ求めます。",
      "2人分の割合を足し、全体1をその割合で割ります。"
    ],
    "explanation": "1時間に1/7＋1/14＝3/14できます。1÷3/14＝14/3時間です。\n\nほかの選択肢\n・「21/2」：2人の作業時間を単純に平均しています。\n・「21」：同時に働くのに時間を足しています。\n・「3/14」：1時間当たりの仕事の割合を、時間として答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "21/2",
        "reason": "2人の作業時間を単純に平均しています。"
      },
      {
        "answer": "21",
        "reason": "同時に働くのに時間を足しています。"
      },
      {
        "answer": "3/14",
        "reason": "1時間当たりの仕事の割合を、時間として答えています。"
      }
    ],
    "authoring": {
      "family": "fraction_5",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_fraction_049",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "fraction",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "リボンの1/6を使い、残りの1/7をさらに使ったら180m残りました。初めは何mありましたか。",
    "answer": "252",
    "choices": [
      "7560/29",
      "210",
      "216",
      "252"
    ],
    "hints": [
      "2回目の割合は、1回目に残った量をもとにしています。",
      "最後に残る割合をかけ算で求め、残量をその割合で割ります。"
    ],
    "explanation": "最後に残る割合は(1－1/6)×(1－1/7)＝5/7。180をこの割合で割ると252mです。\n\nほかの選択肢\n・「7560/29」：2回目の割合も、最初の全体に対する割合として引いています。\n・「210」：最初に使った分を反映していません。\n・「216」：2回目に使った分を反映していません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "7560/29",
        "reason": "2回目の割合も、最初の全体に対する割合として引いています。"
      },
      {
        "answer": "210",
        "reason": "最初に使った分を反映していません。"
      },
      {
        "answer": "216",
        "reason": "2回目に使った分を反映していません。"
      }
    ],
    "authoring": {
      "family": "fraction_4",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_fraction_050",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "fraction",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "Aさんはある仕事全体を8時間、Bさんは同じ仕事全体を16時間で終えます。一定の能率で2人が同時に働くと何時間かかりますか。",
    "answer": "16/3",
    "choices": [
      "24",
      "3/16",
      "16/3",
      "12"
    ],
    "hints": [
      "仕事全体を1として、1時間に終える割合をそれぞれ求めます。",
      "2人分の割合を足し、全体1をその割合で割ります。"
    ],
    "explanation": "1時間に1/8＋1/16＝3/16できます。1÷3/16＝16/3時間です。\n\nほかの選択肢\n・「12」：2人の作業時間を単純に平均しています。\n・「24」：同時に働くのに時間を足しています。\n・「3/16」：1時間当たりの仕事の割合を、時間として答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "12",
        "reason": "2人の作業時間を単純に平均しています。"
      },
      {
        "answer": "24",
        "reason": "同時に働くのに時間を足しています。"
      },
      {
        "answer": "3/16",
        "reason": "1時間当たりの仕事の割合を、時間として答えています。"
      }
    ],
    "authoring": {
      "family": "fraction_5",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_ratio_009",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "ratio",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "比15：20を最も簡単な整数の比にするとどれですか。",
    "answer": "3：4",
    "choices": [
      "4：3",
      "6：8",
      "14：19",
      "3：4"
    ],
    "hints": [
      "前後の数を最大公約数で割ります。"
    ],
    "explanation": "両方を5で割り、3：4です。隣り合う整数なので、これ以上簡単にできません。\n\nほかの選択肢\n・「4：3」：前後の順序を逆にしています。\n・「6：8」：同じ比ですが、さらに2で割れます。\n・「14：19」：両方から1を引いています。同じ数で割りましょう。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "4：3",
        "reason": "前後の順序を逆にしています。"
      },
      {
        "answer": "6：8",
        "reason": "同じ比ですが、さらに2で割れます。"
      },
      {
        "answer": "14：19",
        "reason": "両方から1を引いています。同じ数で割りましょう。"
      }
    ],
    "authoring": {
      "family": "ratio_0",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_ratio_010",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "ratio",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "赤：青＝3：4です。赤が15個なら青は何個ですか。",
    "answer": "20",
    "choices": [
      "9",
      "5",
      "20",
      "15"
    ],
    "hints": [
      "赤が比の数の何倍かを調べます。"
    ],
    "explanation": "倍率は15÷3＝5。青は4×5＝20個です。\n\nほかの選択肢\n・「15」：赤と同じ個数にしています。\n・「9」：比の数に倍率を足しています。\n・「5」：比の1つ分だけを答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "15",
        "reason": "赤と同じ個数にしています。"
      },
      {
        "answer": "9",
        "reason": "比の数に倍率を足しています。"
      },
      {
        "answer": "5",
        "reason": "比の1つ分だけを答えています。"
      }
    ],
    "authoring": {
      "family": "ratio_1",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_ratio_011",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "ratio",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "比3：4の比の値を求め、約分した分数を選びましょう。",
    "answer": "3/4",
    "choices": [
      "1",
      "3/4",
      "4/3",
      "7"
    ],
    "hints": [
      "比a：bの比の値はa÷bです。"
    ],
    "explanation": "3÷4＝3/4です。\n\nほかの選択肢\n・「4/3」：前後を逆に割っています。\n・「7」：比の前後を足しています。\n・「1」：比の前後の差を求めています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "4/3",
        "reason": "前後を逆に割っています。"
      },
      {
        "answer": "7",
        "reason": "比の前後を足しています。"
      },
      {
        "answer": "1",
        "reason": "比の前後の差を求めています。"
      }
    ],
    "authoring": {
      "family": "ratio_2",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_ratio_012",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "ratio",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "比24：30を最も簡単な整数の比にするとどれですか。",
    "answer": "4：5",
    "choices": [
      "4：5",
      "5：4",
      "8：10",
      "23：29"
    ],
    "hints": [
      "前後の数を最大公約数で割ります。"
    ],
    "explanation": "両方を6で割り、4：5です。隣り合う整数なので、これ以上簡単にできません。\n\nほかの選択肢\n・「5：4」：前後の順序を逆にしています。\n・「8：10」：同じ比ですが、さらに2で割れます。\n・「23：29」：両方から1を引いています。同じ数で割りましょう。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "5：4",
        "reason": "前後の順序を逆にしています。"
      },
      {
        "answer": "8：10",
        "reason": "同じ比ですが、さらに2で割れます。"
      },
      {
        "answer": "23：29",
        "reason": "両方から1を引いています。同じ数で割りましょう。"
      }
    ],
    "authoring": {
      "family": "ratio_0",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_ratio_013",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "ratio",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "赤：青＝4：5です。赤が24個なら青は何個ですか。",
    "answer": "30",
    "choices": [
      "24",
      "11",
      "6",
      "30"
    ],
    "hints": [
      "赤が比の数の何倍かを調べます。"
    ],
    "explanation": "倍率は24÷4＝6。青は5×6＝30個です。\n\nほかの選択肢\n・「24」：赤と同じ個数にしています。\n・「11」：比の数に倍率を足しています。\n・「6」：比の1つ分だけを答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "24",
        "reason": "赤と同じ個数にしています。"
      },
      {
        "answer": "11",
        "reason": "比の数に倍率を足しています。"
      },
      {
        "answer": "6",
        "reason": "比の1つ分だけを答えています。"
      }
    ],
    "authoring": {
      "family": "ratio_1",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_ratio_014",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "ratio",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "比4：5の比の値を求め、約分した分数を選びましょう。",
    "answer": "4/5",
    "choices": [
      "9",
      "1",
      "4/5",
      "5/4"
    ],
    "hints": [
      "比a：bの比の値はa÷bです。"
    ],
    "explanation": "4÷5＝4/5です。\n\nほかの選択肢\n・「5/4」：前後を逆に割っています。\n・「9」：比の前後を足しています。\n・「1」：比の前後の差を求めています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "5/4",
        "reason": "前後を逆に割っています。"
      },
      {
        "answer": "9",
        "reason": "比の前後を足しています。"
      },
      {
        "answer": "1",
        "reason": "比の前後の差を求めています。"
      }
    ],
    "authoring": {
      "family": "ratio_2",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_ratio_015",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "ratio",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "比35：42を最も簡単な整数の比にするとどれですか。",
    "answer": "5：6",
    "choices": [
      "34：41",
      "5：6",
      "6：5",
      "10：12"
    ],
    "hints": [
      "前後の数を最大公約数で割ります。"
    ],
    "explanation": "両方を7で割り、5：6です。隣り合う整数なので、これ以上簡単にできません。\n\nほかの選択肢\n・「6：5」：前後の順序を逆にしています。\n・「10：12」：同じ比ですが、さらに2で割れます。\n・「34：41」：両方から1を引いています。同じ数で割りましょう。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "6：5",
        "reason": "前後の順序を逆にしています。"
      },
      {
        "answer": "10：12",
        "reason": "同じ比ですが、さらに2で割れます。"
      },
      {
        "answer": "34：41",
        "reason": "両方から1を引いています。同じ数で割りましょう。"
      }
    ],
    "authoring": {
      "family": "ratio_0",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_ratio_016",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "ratio",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "赤：青＝5：6です。赤が35個なら青は何個ですか。",
    "answer": "42",
    "choices": [
      "42",
      "35",
      "13",
      "7"
    ],
    "hints": [
      "赤が比の数の何倍かを調べます。"
    ],
    "explanation": "倍率は35÷5＝7。青は6×7＝42個です。\n\nほかの選択肢\n・「35」：赤と同じ個数にしています。\n・「13」：比の数に倍率を足しています。\n・「7」：比の1つ分だけを答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "35",
        "reason": "赤と同じ個数にしています。"
      },
      {
        "answer": "13",
        "reason": "比の数に倍率を足しています。"
      },
      {
        "answer": "7",
        "reason": "比の1つ分だけを答えています。"
      }
    ],
    "authoring": {
      "family": "ratio_1",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_ratio_017",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "ratio",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "比5：6の比の値を求め、約分した分数を選びましょう。",
    "answer": "5/6",
    "choices": [
      "6/5",
      "11",
      "1",
      "5/6"
    ],
    "hints": [
      "比a：bの比の値はa÷bです。"
    ],
    "explanation": "5÷6＝5/6です。\n\nほかの選択肢\n・「6/5」：前後を逆に割っています。\n・「11」：比の前後を足しています。\n・「1」：比の前後の差を求めています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "6/5",
        "reason": "前後を逆に割っています。"
      },
      {
        "answer": "11",
        "reason": "比の前後を足しています。"
      },
      {
        "answer": "1",
        "reason": "比の前後の差を求めています。"
      }
    ],
    "authoring": {
      "family": "ratio_2",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_ratio_018",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "ratio",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "比48：56を最も簡単な整数の比にするとどれですか。",
    "answer": "6：7",
    "choices": [
      "12：14",
      "47：55",
      "6：7",
      "7：6"
    ],
    "hints": [
      "前後の数を最大公約数で割ります。"
    ],
    "explanation": "両方を8で割り、6：7です。隣り合う整数なので、これ以上簡単にできません。\n\nほかの選択肢\n・「7：6」：前後の順序を逆にしています。\n・「12：14」：同じ比ですが、さらに2で割れます。\n・「47：55」：両方から1を引いています。同じ数で割りましょう。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "7：6",
        "reason": "前後の順序を逆にしています。"
      },
      {
        "answer": "12：14",
        "reason": "同じ比ですが、さらに2で割れます。"
      },
      {
        "answer": "47：55",
        "reason": "両方から1を引いています。同じ数で割りましょう。"
      }
    ],
    "authoring": {
      "family": "ratio_0",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_ratio_019",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "ratio",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "赤：青＝6：7です。赤が48個なら青は何個ですか。",
    "answer": "56",
    "choices": [
      "8",
      "56",
      "48",
      "15"
    ],
    "hints": [
      "赤が比の数の何倍かを調べます。"
    ],
    "explanation": "倍率は48÷6＝8。青は7×8＝56個です。\n\nほかの選択肢\n・「48」：赤と同じ個数にしています。\n・「15」：比の数に倍率を足しています。\n・「8」：比の1つ分だけを答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "48",
        "reason": "赤と同じ個数にしています。"
      },
      {
        "answer": "15",
        "reason": "比の数に倍率を足しています。"
      },
      {
        "answer": "8",
        "reason": "比の1つ分だけを答えています。"
      }
    ],
    "authoring": {
      "family": "ratio_1",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_ratio_020",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "ratio",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "比6：7の比の値を求め、約分した分数を選びましょう。",
    "answer": "6/7",
    "choices": [
      "6/7",
      "7/6",
      "13",
      "1"
    ],
    "hints": [
      "比a：bの比の値はa÷bです。"
    ],
    "explanation": "6÷7＝6/7です。\n\nほかの選択肢\n・「7/6」：前後を逆に割っています。\n・「13」：比の前後を足しています。\n・「1」：比の前後の差を求めています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "7/6",
        "reason": "前後を逆に割っています。"
      },
      {
        "answer": "13",
        "reason": "比の前後を足しています。"
      },
      {
        "answer": "1",
        "reason": "比の前後の差を求めています。"
      }
    ],
    "authoring": {
      "family": "ratio_2",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_ratio_021",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "ratio",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "米と麦の重さの比を3：4にして、合計35gにします。米は何gですか。",
    "answer": "15",
    "choices": [
      "20",
      "5",
      "105/4",
      "15"
    ],
    "hints": [
      "比の合計を求め、全体を同じ大きさに分けます。"
    ],
    "explanation": "1つ分は35÷(3＋4)＝5g。米は5×3＝15gです。\n\nほかの選択肢\n・「20」：麦の重さを答えています。\n・「5」：比の1つ分だけを答えています。\n・「105/4」：合計を麦の重さだと取り{違|ちが}えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "20",
        "reason": "麦の重さを答えています。"
      },
      {
        "answer": "5",
        "reason": "比の1つ分だけを答えています。"
      },
      {
        "answer": "105/4",
        "reason": "合計を麦の重さだと取り{違|ちが}えています。"
      }
    ],
    "authoring": {
      "family": "ratio_3",
      "parameters": {
        "n": 1
      }
    },
    "diagram": {
      "kind": "band",
      "parts": [
        3,
        4
      ],
      "labels": [
        "米：3",
        "麦：4"
      ],
      "known": [
        "？g",
        "？g"
      ],
      "totalLabel": "合計35g",
      "caption": "同じ1つ分のまとまりで比べます。"
    }
  },
  {
    "id": "math_g6_course_ratio_022",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "ratio",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "AとBの所持金の比は4：3で、Aのほうが5円多く持っています。合計は何円ですか。",
    "answer": "35",
    "choices": [
      "15",
      "5",
      "35",
      "20"
    ],
    "hints": [
      "比の差の何つ分が、金額の差に当たりますか。"
    ],
    "explanation": "比の差は1つ分なので、1つ分は5円。合計は(3＋4)×5＝35円です。\n\nほかの選択肢\n・「20」：Aの金額だけを答えています。\n・「15」：Bの金額だけを答えています。\n・「5」：2人の差だけを答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "20",
        "reason": "Aの金額だけを答えています。"
      },
      {
        "answer": "15",
        "reason": "Bの金額だけを答えています。"
      },
      {
        "answer": "5",
        "reason": "2人の差だけを答えています。"
      }
    ],
    "authoring": {
      "family": "ratio_4",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_ratio_023",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "ratio",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "比3/7：4/7を、最も簡単な整数の比にするとどれですか。",
    "answer": "3：4",
    "choices": [
      "6：8",
      "3：4",
      "4：3",
      "3：7"
    ],
    "hints": [
      "両方に同じ分母をかけます。"
    ],
    "explanation": "両方に7をかけると3：4です。隣り合う整数なのでこれ以上簡単にできません。\n\nほかの選択肢\n・「4：3」：前後を逆にしています。\n・「3：7」：2つ目の分子ではなく分母を使っています。\n・「6：8」：同じ比ですが、さらに2で割れます。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "4：3",
        "reason": "前後を逆にしています。"
      },
      {
        "answer": "3：7",
        "reason": "2つ目の分子ではなく分母を使っています。"
      },
      {
        "answer": "6：8",
        "reason": "同じ比ですが、さらに2で割れます。"
      }
    ],
    "authoring": {
      "family": "ratio_5",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_ratio_024",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "ratio",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "米と麦の重さの比を4：5にして、合計54gにします。米は何gですか。",
    "answer": "24",
    "choices": [
      "24",
      "30",
      "6",
      "216/5"
    ],
    "hints": [
      "比の合計を求め、全体を同じ大きさに分けます。"
    ],
    "explanation": "1つ分は54÷(4＋5)＝6g。米は6×4＝24gです。\n\nほかの選択肢\n・「30」：麦の重さを答えています。\n・「6」：比の1つ分だけを答えています。\n・「216/5」：合計を麦の重さだと取り{違|ちが}えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "30",
        "reason": "麦の重さを答えています。"
      },
      {
        "answer": "6",
        "reason": "比の1つ分だけを答えています。"
      },
      {
        "answer": "216/5",
        "reason": "合計を麦の重さだと取り{違|ちが}えています。"
      }
    ],
    "authoring": {
      "family": "ratio_3",
      "parameters": {
        "n": 2
      }
    },
    "diagram": {
      "kind": "band",
      "parts": [
        4,
        5
      ],
      "labels": [
        "米：4",
        "麦：5"
      ],
      "known": [
        "？g",
        "？g"
      ],
      "totalLabel": "合計54g",
      "caption": "同じ1つ分のまとまりで比べます。"
    }
  },
  {
    "id": "math_g6_course_ratio_025",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "ratio",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "AとBの所持金の比は5：4で、Aのほうが6円多く持っています。合計は何円ですか。",
    "answer": "54",
    "choices": [
      "30",
      "24",
      "6",
      "54"
    ],
    "hints": [
      "比の差の何つ分が、金額の差に当たりますか。"
    ],
    "explanation": "比の差は1つ分なので、1つ分は6円。合計は(4＋5)×6＝54円です。\n\nほかの選択肢\n・「30」：Aの金額だけを答えています。\n・「24」：Bの金額だけを答えています。\n・「6」：2人の差だけを答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "30",
        "reason": "Aの金額だけを答えています。"
      },
      {
        "answer": "24",
        "reason": "Bの金額だけを答えています。"
      },
      {
        "answer": "6",
        "reason": "2人の差だけを答えています。"
      }
    ],
    "authoring": {
      "family": "ratio_4",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_ratio_026",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "ratio",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "比4/9：5/9を、最も簡単な整数の比にするとどれですか。",
    "answer": "4：5",
    "choices": [
      "4：9",
      "8：10",
      "4：5",
      "5：4"
    ],
    "hints": [
      "両方に同じ分母をかけます。"
    ],
    "explanation": "両方に9をかけると4：5です。隣り合う整数なのでこれ以上簡単にできません。\n\nほかの選択肢\n・「5：4」：前後を逆にしています。\n・「4：9」：2つ目の分子ではなく分母を使っています。\n・「8：10」：同じ比ですが、さらに2で割れます。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "5：4",
        "reason": "前後を逆にしています。"
      },
      {
        "answer": "4：9",
        "reason": "2つ目の分子ではなく分母を使っています。"
      },
      {
        "answer": "8：10",
        "reason": "同じ比ですが、さらに2で割れます。"
      }
    ],
    "authoring": {
      "family": "ratio_5",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_ratio_027",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "ratio",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "米と麦の重さの比を5：6にして、合計77gにします。米は何gですか。",
    "answer": "35",
    "choices": [
      "385/6",
      "35",
      "42",
      "7"
    ],
    "hints": [
      "比の合計を求め、全体を同じ大きさに分けます。"
    ],
    "explanation": "1つ分は77÷(5＋6)＝7g。米は7×5＝35gです。\n\nほかの選択肢\n・「42」：麦の重さを答えています。\n・「7」：比の1つ分だけを答えています。\n・「385/6」：合計を麦の重さだと取り{違|ちが}えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "42",
        "reason": "麦の重さを答えています。"
      },
      {
        "answer": "7",
        "reason": "比の1つ分だけを答えています。"
      },
      {
        "answer": "385/6",
        "reason": "合計を麦の重さだと取り{違|ちが}えています。"
      }
    ],
    "authoring": {
      "family": "ratio_3",
      "parameters": {
        "n": 3
      }
    },
    "diagram": {
      "kind": "band",
      "parts": [
        5,
        6
      ],
      "labels": [
        "米：5",
        "麦：6"
      ],
      "known": [
        "？g",
        "？g"
      ],
      "totalLabel": "合計77g",
      "caption": "同じ1つ分のまとまりで比べます。"
    }
  },
  {
    "id": "math_g6_course_ratio_028",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "ratio",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "AとBの所持金の比は6：5で、Aのほうが7円多く持っています。合計は何円ですか。",
    "answer": "77",
    "choices": [
      "77",
      "42",
      "35",
      "7"
    ],
    "hints": [
      "比の差の何つ分が、金額の差に当たりますか。"
    ],
    "explanation": "比の差は1つ分なので、1つ分は7円。合計は(5＋6)×7＝77円です。\n\nほかの選択肢\n・「42」：Aの金額だけを答えています。\n・「35」：Bの金額だけを答えています。\n・「7」：2人の差だけを答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "42",
        "reason": "Aの金額だけを答えています。"
      },
      {
        "answer": "35",
        "reason": "Bの金額だけを答えています。"
      },
      {
        "answer": "7",
        "reason": "2人の差だけを答えています。"
      }
    ],
    "authoring": {
      "family": "ratio_4",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_ratio_029",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "ratio",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "比5/11：6/11を、最も簡単な整数の比にするとどれですか。",
    "answer": "5：6",
    "choices": [
      "6：5",
      "5：11",
      "10：12",
      "5：6"
    ],
    "hints": [
      "両方に同じ分母をかけます。"
    ],
    "explanation": "両方に11をかけると5：6です。隣り合う整数なのでこれ以上簡単にできません。\n\nほかの選択肢\n・「6：5」：前後を逆にしています。\n・「5：11」：2つ目の分子ではなく分母を使っています。\n・「10：12」：同じ比ですが、さらに2で割れます。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "6：5",
        "reason": "前後を逆にしています。"
      },
      {
        "answer": "5：11",
        "reason": "2つ目の分子ではなく分母を使っています。"
      },
      {
        "answer": "10：12",
        "reason": "同じ比ですが、さらに2で割れます。"
      }
    ],
    "authoring": {
      "family": "ratio_5",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_ratio_030",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "ratio",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "米と麦の重さの比を6：7にして、合計104gにします。米は何gですか。",
    "answer": "48",
    "choices": [
      "8",
      "624/7",
      "48",
      "56"
    ],
    "hints": [
      "比の合計を求め、全体を同じ大きさに分けます。"
    ],
    "explanation": "1つ分は104÷(6＋7)＝8g。米は8×6＝48gです。\n\nほかの選択肢\n・「56」：麦の重さを答えています。\n・「8」：比の1つ分だけを答えています。\n・「624/7」：合計を麦の重さだと取り{違|ちが}えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "56",
        "reason": "麦の重さを答えています。"
      },
      {
        "answer": "8",
        "reason": "比の1つ分だけを答えています。"
      },
      {
        "answer": "624/7",
        "reason": "合計を麦の重さだと取り{違|ちが}えています。"
      }
    ],
    "authoring": {
      "family": "ratio_3",
      "parameters": {
        "n": 4
      }
    },
    "diagram": {
      "kind": "band",
      "parts": [
        6,
        7
      ],
      "labels": [
        "米：6",
        "麦：7"
      ],
      "known": [
        "？g",
        "？g"
      ],
      "totalLabel": "合計104g",
      "caption": "同じ1つ分のまとまりで比べます。"
    }
  },
  {
    "id": "math_g6_course_ratio_031",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "ratio",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "AとBの所持金の比は7：6で、Aのほうが8円多く持っています。合計は何円ですか。",
    "answer": "104",
    "choices": [
      "8",
      "104",
      "56",
      "48"
    ],
    "hints": [
      "比の差の何つ分が、金額の差に当たりますか。"
    ],
    "explanation": "比の差は1つ分なので、1つ分は8円。合計は(6＋7)×8＝104円です。\n\nほかの選択肢\n・「56」：Aの金額だけを答えています。\n・「48」：Bの金額だけを答えています。\n・「8」：2人の差だけを答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "56",
        "reason": "Aの金額だけを答えています。"
      },
      {
        "answer": "48",
        "reason": "Bの金額だけを答えています。"
      },
      {
        "answer": "8",
        "reason": "2人の差だけを答えています。"
      }
    ],
    "authoring": {
      "family": "ratio_4",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_ratio_032",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "ratio",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "比6/13：7/13を、最も簡単な整数の比にするとどれですか。",
    "answer": "6：7",
    "choices": [
      "6：7",
      "7：6",
      "6：13",
      "12：14"
    ],
    "hints": [
      "両方に同じ分母をかけます。"
    ],
    "explanation": "両方に13をかけると6：7です。隣り合う整数なのでこれ以上簡単にできません。\n\nほかの選択肢\n・「7：6」：前後を逆にしています。\n・「6：13」：2つ目の分子ではなく分母を使っています。\n・「12：14」：同じ比ですが、さらに2で割れます。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "7：6",
        "reason": "前後を逆にしています。"
      },
      {
        "answer": "6：13",
        "reason": "2つ目の分子ではなく分母を使っています。"
      },
      {
        "answer": "12：14",
        "reason": "同じ比ですが、さらに2で割れます。"
      }
    ],
    "authoring": {
      "family": "ratio_5",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_ratio_033",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "ratio",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "米と麦の重さの比を7：8にして、合計135gにします。米は何gですか。",
    "answer": "63",
    "choices": [
      "72",
      "9",
      "945/8",
      "63"
    ],
    "hints": [
      "比の合計を求め、全体を同じ大きさに分けます。"
    ],
    "explanation": "1つ分は135÷(7＋8)＝9g。米は9×7＝63gです。\n\nほかの選択肢\n・「72」：麦の重さを答えています。\n・「9」：比の1つ分だけを答えています。\n・「945/8」：合計を麦の重さだと取り{違|ちが}えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "72",
        "reason": "麦の重さを答えています。"
      },
      {
        "answer": "9",
        "reason": "比の1つ分だけを答えています。"
      },
      {
        "answer": "945/8",
        "reason": "合計を麦の重さだと取り{違|ちが}えています。"
      }
    ],
    "authoring": {
      "family": "ratio_3",
      "parameters": {
        "n": 5
      }
    },
    "diagram": {
      "kind": "band",
      "parts": [
        7,
        8
      ],
      "labels": [
        "米：7",
        "麦：8"
      ],
      "known": [
        "？g",
        "？g"
      ],
      "totalLabel": "合計135g",
      "caption": "同じ1つ分のまとまりで比べます。"
    }
  },
  {
    "id": "math_g6_course_ratio_034",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "ratio",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "AとBの所持金の比は8：7で、Aのほうが9円多く持っています。合計は何円ですか。",
    "answer": "135",
    "choices": [
      "63",
      "9",
      "135",
      "72"
    ],
    "hints": [
      "比の差の何つ分が、金額の差に当たりますか。"
    ],
    "explanation": "比の差は1つ分なので、1つ分は9円。合計は(7＋8)×9＝135円です。\n\nほかの選択肢\n・「72」：Aの金額だけを答えています。\n・「63」：Bの金額だけを答えています。\n・「9」：2人の差だけを答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "72",
        "reason": "Aの金額だけを答えています。"
      },
      {
        "answer": "63",
        "reason": "Bの金額だけを答えています。"
      },
      {
        "answer": "9",
        "reason": "2人の差だけを答えています。"
      }
    ],
    "authoring": {
      "family": "ratio_4",
      "parameters": {
        "n": 5
      }
    }
  },
  {
    "id": "math_g6_course_ratio_035",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "ratio",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "比7/15：8/15を、最も簡単な整数の比にするとどれですか。",
    "answer": "7：8",
    "choices": [
      "14：16",
      "7：8",
      "8：7",
      "7：15"
    ],
    "hints": [
      "両方に同じ分母をかけます。"
    ],
    "explanation": "両方に15をかけると7：8です。隣り合う整数なのでこれ以上簡単にできません。\n\nほかの選択肢\n・「8：7」：前後を逆にしています。\n・「7：15」：2つ目の分子ではなく分母を使っています。\n・「14：16」：同じ比ですが、さらに2で割れます。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "8：7",
        "reason": "前後を逆にしています。"
      },
      {
        "answer": "7：15",
        "reason": "2つ目の分子ではなく分母を使っています。"
      },
      {
        "answer": "14：16",
        "reason": "同じ比ですが、さらに2で割れます。"
      }
    ],
    "authoring": {
      "family": "ratio_5",
      "parameters": {
        "n": 5
      }
    }
  },
  {
    "id": "math_g6_course_ratio_036",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "ratio",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "赤と白の玉の比が3：4です。赤を5個加えると同じ個数になりました。初めの玉は全部で何個ですか。",
    "answer": "35",
    "choices": [
      "35",
      "40",
      "20",
      "15"
    ],
    "hints": [
      "初めの白と赤の差は、比の差の1つ分です。",
      "増やした個数から1つ分を求め、初めの比の合計にかけます。"
    ],
    "explanation": "比の差1つ分が5個。初めの合計は(3＋4)×5＝35個です。\n\nほかの選択肢\n・「40」：増やした後の合計を答えています。\n・「20」：初めの白の数だけを答えています。\n・「15」：初めの赤の数だけを答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "40",
        "reason": "増やした後の合計を答えています。"
      },
      {
        "answer": "20",
        "reason": "初めの白の数だけを答えています。"
      },
      {
        "answer": "15",
        "reason": "初めの赤の数だけを答えています。"
      }
    ],
    "authoring": {
      "family": "ratio_6",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_ratio_037",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "ratio",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "AとBの重さの比は3：4、BとCの比は8：10です。AとCの比を最も簡単な整数の比で表すとどれですか。",
    "answer": "3：5",
    "choices": [
      "3：10",
      "5：3",
      "7：9",
      "3：5"
    ],
    "hints": [
      "2つの比で、Bが同じ大きさになるようにそろえます。",
      "A：Bの両方を2倍にするとBがそろいます。"
    ],
    "explanation": "A：B＝6：8なので、A：B：C＝6：8：10。A：Cを約分して3：5です。\n\nほかの選択肢\n・「3：10」：Bの大きさをそろえず、AとCの数だけを取り出しています。\n・「5：3」：AとCの順序を逆にしています。\n・「7：9」：隣り合う比の数を足しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "3：10",
        "reason": "Bの大きさをそろえず、AとCの数だけを取り出しています。"
      },
      {
        "answer": "5：3",
        "reason": "AとCの順序を逆にしています。"
      },
      {
        "answer": "7：9",
        "reason": "隣り合う比の数を足しています。"
      }
    ],
    "authoring": {
      "family": "ratio_7",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_ratio_038",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "ratio",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "赤と白の玉の比が4：5です。赤を6個加えると同じ個数になりました。初めの玉は全部で何個ですか。",
    "answer": "54",
    "choices": [
      "30",
      "24",
      "54",
      "60"
    ],
    "hints": [
      "初めの白と赤の差は、比の差の1つ分です。",
      "増やした個数から1つ分を求め、初めの比の合計にかけます。"
    ],
    "explanation": "比の差1つ分が6個。初めの合計は(4＋5)×6＝54個です。\n\nほかの選択肢\n・「60」：増やした後の合計を答えています。\n・「30」：初めの白の数だけを答えています。\n・「24」：初めの赤の数だけを答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "60",
        "reason": "増やした後の合計を答えています。"
      },
      {
        "answer": "30",
        "reason": "初めの白の数だけを答えています。"
      },
      {
        "answer": "24",
        "reason": "初めの赤の数だけを答えています。"
      }
    ],
    "authoring": {
      "family": "ratio_6",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_ratio_039",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "ratio",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "AとBの重さの比は4：5、BとCの比は10：12です。AとCの比を最も簡単な整数の比で表すとどれですか。",
    "answer": "2：3",
    "choices": [
      "9：11",
      "2：3",
      "4：12",
      "3：2"
    ],
    "hints": [
      "2つの比で、Bが同じ大きさになるようにそろえます。",
      "A：Bの両方を2倍にするとBがそろいます。"
    ],
    "explanation": "A：B＝8：10なので、A：B：C＝8：10：12。A：Cを約分して2：3です。\n\nほかの選択肢\n・「4：12」：Bの大きさをそろえず、AとCの数だけを取り出しています。\n・「3：2」：AとCの順序を逆にしています。\n・「9：11」：隣り合う比の数を足しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "4：12",
        "reason": "Bの大きさをそろえず、AとCの数だけを取り出しています。"
      },
      {
        "answer": "3：2",
        "reason": "AとCの順序を逆にしています。"
      },
      {
        "answer": "9：11",
        "reason": "隣り合う比の数を足しています。"
      }
    ],
    "authoring": {
      "family": "ratio_7",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_ratio_040",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "ratio",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "赤と白の玉の比が5：6です。赤を7個加えると同じ個数になりました。初めの玉は全部で何個ですか。",
    "answer": "77",
    "choices": [
      "77",
      "84",
      "42",
      "35"
    ],
    "hints": [
      "初めの白と赤の差は、比の差の1つ分です。",
      "増やした個数から1つ分を求め、初めの比の合計にかけます。"
    ],
    "explanation": "比の差1つ分が7個。初めの合計は(5＋6)×7＝77個です。\n\nほかの選択肢\n・「84」：増やした後の合計を答えています。\n・「42」：初めの白の数だけを答えています。\n・「35」：初めの赤の数だけを答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "84",
        "reason": "増やした後の合計を答えています。"
      },
      {
        "answer": "42",
        "reason": "初めの白の数だけを答えています。"
      },
      {
        "answer": "35",
        "reason": "初めの赤の数だけを答えています。"
      }
    ],
    "authoring": {
      "family": "ratio_6",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_ratio_041",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "ratio",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "AとBの重さの比は5：6、BとCの比は12：14です。AとCの比を最も簡単な整数の比で表すとどれですか。",
    "answer": "5：7",
    "choices": [
      "5：14",
      "7：5",
      "11：13",
      "5：7"
    ],
    "hints": [
      "2つの比で、Bが同じ大きさになるようにそろえます。",
      "A：Bの両方を2倍にするとBがそろいます。"
    ],
    "explanation": "A：B＝10：12なので、A：B：C＝10：12：14。A：Cを約分して5：7です。\n\nほかの選択肢\n・「5：14」：Bの大きさをそろえず、AとCの数だけを取り出しています。\n・「7：5」：AとCの順序を逆にしています。\n・「11：13」：隣り合う比の数を足しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "5：14",
        "reason": "Bの大きさをそろえず、AとCの数だけを取り出しています。"
      },
      {
        "answer": "7：5",
        "reason": "AとCの順序を逆にしています。"
      },
      {
        "answer": "11：13",
        "reason": "隣り合う比の数を足しています。"
      }
    ],
    "authoring": {
      "family": "ratio_7",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_ratio_042",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "ratio",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "赤と白の玉の比が6：7です。赤を8個加えると同じ個数になりました。初めの玉は全部で何個ですか。",
    "answer": "104",
    "choices": [
      "56",
      "48",
      "104",
      "112"
    ],
    "hints": [
      "初めの白と赤の差は、比の差の1つ分です。",
      "増やした個数から1つ分を求め、初めの比の合計にかけます。"
    ],
    "explanation": "比の差1つ分が8個。初めの合計は(6＋7)×8＝104個です。\n\nほかの選択肢\n・「112」：増やした後の合計を答えています。\n・「56」：初めの白の数だけを答えています。\n・「48」：初めの赤の数だけを答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "112",
        "reason": "増やした後の合計を答えています。"
      },
      {
        "answer": "56",
        "reason": "初めの白の数だけを答えています。"
      },
      {
        "answer": "48",
        "reason": "初めの赤の数だけを答えています。"
      }
    ],
    "authoring": {
      "family": "ratio_6",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_ratio_043",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "ratio",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "AとBの重さの比は6：7、BとCの比は14：16です。AとCの比を最も簡単な整数の比で表すとどれですか。",
    "answer": "3：4",
    "choices": [
      "13：15",
      "3：4",
      "6：16",
      "4：3"
    ],
    "hints": [
      "2つの比で、Bが同じ大きさになるようにそろえます。",
      "A：Bの両方を2倍にするとBがそろいます。"
    ],
    "explanation": "A：B＝12：14なので、A：B：C＝12：14：16。A：Cを約分して3：4です。\n\nほかの選択肢\n・「6：16」：Bの大きさをそろえず、AとCの数だけを取り出しています。\n・「4：3」：AとCの順序を逆にしています。\n・「13：15」：隣り合う比の数を足しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "6：16",
        "reason": "Bの大きさをそろえず、AとCの数だけを取り出しています。"
      },
      {
        "answer": "4：3",
        "reason": "AとCの順序を逆にしています。"
      },
      {
        "answer": "13：15",
        "reason": "隣り合う比の数を足しています。"
      }
    ],
    "authoring": {
      "family": "ratio_7",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_ratio_044",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "ratio",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "赤と白の玉の比が7：8です。赤を9個加えると同じ個数になりました。初めの玉は全部で何個ですか。",
    "answer": "135",
    "choices": [
      "135",
      "144",
      "72",
      "63"
    ],
    "hints": [
      "初めの白と赤の差は、比の差の1つ分です。",
      "増やした個数から1つ分を求め、初めの比の合計にかけます。"
    ],
    "explanation": "比の差1つ分が9個。初めの合計は(7＋8)×9＝135個です。\n\nほかの選択肢\n・「144」：増やした後の合計を答えています。\n・「72」：初めの白の数だけを答えています。\n・「63」：初めの赤の数だけを答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "144",
        "reason": "増やした後の合計を答えています。"
      },
      {
        "answer": "72",
        "reason": "初めの白の数だけを答えています。"
      },
      {
        "answer": "63",
        "reason": "初めの赤の数だけを答えています。"
      }
    ],
    "authoring": {
      "family": "ratio_6",
      "parameters": {
        "n": 5
      }
    }
  },
  {
    "id": "math_g6_course_ratio_045",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "ratio",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "AとBの重さの比は7：8、BとCの比は16：18です。AとCの比を最も簡単な整数の比で表すとどれですか。",
    "answer": "7：9",
    "choices": [
      "7：18",
      "9：7",
      "15：17",
      "7：9"
    ],
    "hints": [
      "2つの比で、Bが同じ大きさになるようにそろえます。",
      "A：Bの両方を2倍にするとBがそろいます。"
    ],
    "explanation": "A：B＝14：16なので、A：B：C＝14：16：18。A：Cを約分して7：9です。\n\nほかの選択肢\n・「7：18」：Bの大きさをそろえず、AとCの数だけを取り出しています。\n・「9：7」：AとCの順序を逆にしています。\n・「15：17」：隣り合う比の数を足しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "7：18",
        "reason": "Bの大きさをそろえず、AとCの数だけを取り出しています。"
      },
      {
        "answer": "9：7",
        "reason": "AとCの順序を逆にしています。"
      },
      {
        "answer": "15：17",
        "reason": "隣り合う比の数を足しています。"
      }
    ],
    "authoring": {
      "family": "ratio_7",
      "parameters": {
        "n": 5
      }
    }
  },
  {
    "id": "math_g6_course_scale_009",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "scale",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "辺の長さが4cmの図形を3倍に拡大します。対応する辺は何cmですか。",
    "answer": "12",
    "choices": [
      "7",
      "4/3",
      "4",
      "12"
    ],
    "hints": [
      "対応する辺はすべて同じ倍率になります。"
    ],
    "explanation": "4×3＝12cmです。\n\nほかの選択肢\n・「7」：倍率を足しています。\n・「4/3」：拡大ではなく縮小しています。\n・「4」：長さを変えていません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "7",
        "reason": "倍率を足しています。"
      },
      {
        "answer": "4/3",
        "reason": "拡大ではなく縮小しています。"
      },
      {
        "answer": "4",
        "reason": "長さを変えていません。"
      }
    ],
    "authoring": {
      "family": "scale_0",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_scale_010",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "scale",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "縮尺1：300の図で1cmは、実際には何mですか。",
    "answer": "3",
    "choices": [
      "30",
      "0.3",
      "3",
      "300"
    ],
    "hints": [
      "縮尺の長さの単位は、まずcmで考えます。"
    ],
    "explanation": "300cm＝3mです。\n\nほかの選択肢\n・「300」：cmの値をmとして答えています。\n・「30」：cmからmへ直すときに10でしか割っていません。\n・「0.3」：cmからmへ直すときに1000で割っています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "300",
        "reason": "cmの値をmとして答えています。"
      },
      {
        "answer": "30",
        "reason": "cmからmへ直すときに10でしか割っていません。"
      },
      {
        "answer": "0.3",
        "reason": "cmからmへ直すときに1000で割っています。"
      }
    ],
    "authoring": {
      "family": "scale_1",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_scale_011",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "scale",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "図形の12cmの辺を、もとの長さの1/3に縮小します。対応する辺は何cmですか。",
    "answer": "4",
    "choices": [
      "3",
      "4",
      "36",
      "9"
    ],
    "hints": [
      "1を何等分した倍率かを考えます。"
    ],
    "explanation": "12÷3＝4cmです。\n\nほかの選択肢\n・「36」：縮小なのに倍率の分母をかけています。\n・「9」：長さから分母を引いています。\n・「3」：縮小率の分母だけを答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "36",
        "reason": "縮小なのに倍率の分母をかけています。"
      },
      {
        "answer": "9",
        "reason": "長さから分母を引いています。"
      },
      {
        "answer": "3",
        "reason": "縮小率の分母だけを答えています。"
      }
    ],
    "authoring": {
      "family": "scale_2",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_scale_012",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "scale",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "辺の長さが5cmの図形を4倍に拡大します。対応する辺は何cmですか。",
    "answer": "20",
    "choices": [
      "20",
      "9",
      "5/4",
      "5"
    ],
    "hints": [
      "対応する辺はすべて同じ倍率になります。"
    ],
    "explanation": "5×4＝20cmです。\n\nほかの選択肢\n・「9」：倍率を足しています。\n・「5/4」：拡大ではなく縮小しています。\n・「5」：長さを変えていません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "9",
        "reason": "倍率を足しています。"
      },
      {
        "answer": "5/4",
        "reason": "拡大ではなく縮小しています。"
      },
      {
        "answer": "5",
        "reason": "長さを変えていません。"
      }
    ],
    "authoring": {
      "family": "scale_0",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_scale_013",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "scale",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "縮尺1：400の図で1cmは、実際には何mですか。",
    "answer": "4",
    "choices": [
      "400",
      "40",
      "0.4",
      "4"
    ],
    "hints": [
      "縮尺の長さの単位は、まずcmで考えます。"
    ],
    "explanation": "400cm＝4mです。\n\nほかの選択肢\n・「400」：cmの値をmとして答えています。\n・「40」：cmからmへ直すときに10でしか割っていません。\n・「0.4」：cmからmへ直すときに1000で割っています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "400",
        "reason": "cmの値をmとして答えています。"
      },
      {
        "answer": "40",
        "reason": "cmからmへ直すときに10でしか割っていません。"
      },
      {
        "answer": "0.4",
        "reason": "cmからmへ直すときに1000で割っています。"
      }
    ],
    "authoring": {
      "family": "scale_1",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_scale_014",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "scale",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "図形の20cmの辺を、もとの長さの1/4に縮小します。対応する辺は何cmですか。",
    "answer": "5",
    "choices": [
      "16",
      "4",
      "5",
      "80"
    ],
    "hints": [
      "1を何等分した倍率かを考えます。"
    ],
    "explanation": "20÷4＝5cmです。\n\nほかの選択肢\n・「80」：縮小なのに倍率の分母をかけています。\n・「16」：長さから分母を引いています。\n・「4」：縮小率の分母だけを答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "80",
        "reason": "縮小なのに倍率の分母をかけています。"
      },
      {
        "answer": "16",
        "reason": "長さから分母を引いています。"
      },
      {
        "answer": "4",
        "reason": "縮小率の分母だけを答えています。"
      }
    ],
    "authoring": {
      "family": "scale_2",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_scale_015",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "scale",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "辺の長さが6cmの図形を5倍に拡大します。対応する辺は何cmですか。",
    "answer": "30",
    "choices": [
      "6",
      "30",
      "11",
      "6/5"
    ],
    "hints": [
      "対応する辺はすべて同じ倍率になります。"
    ],
    "explanation": "6×5＝30cmです。\n\nほかの選択肢\n・「11」：倍率を足しています。\n・「6/5」：拡大ではなく縮小しています。\n・「6」：長さを変えていません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "11",
        "reason": "倍率を足しています。"
      },
      {
        "answer": "6/5",
        "reason": "拡大ではなく縮小しています。"
      },
      {
        "answer": "6",
        "reason": "長さを変えていません。"
      }
    ],
    "authoring": {
      "family": "scale_0",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_scale_016",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "scale",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "縮尺1：500の図で1cmは、実際には何mですか。",
    "answer": "5",
    "choices": [
      "5",
      "500",
      "50",
      "0.5"
    ],
    "hints": [
      "縮尺の長さの単位は、まずcmで考えます。"
    ],
    "explanation": "500cm＝5mです。\n\nほかの選択肢\n・「500」：cmの値をmとして答えています。\n・「50」：cmからmへ直すときに10でしか割っていません。\n・「0.5」：cmからmへ直すときに1000で割っています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "500",
        "reason": "cmの値をmとして答えています。"
      },
      {
        "answer": "50",
        "reason": "cmからmへ直すときに10でしか割っていません。"
      },
      {
        "answer": "0.5",
        "reason": "cmからmへ直すときに1000で割っています。"
      }
    ],
    "authoring": {
      "family": "scale_1",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_scale_017",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "scale",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "図形の30cmの辺を、もとの長さの1/5に縮小します。対応する辺は何cmですか。",
    "answer": "6",
    "choices": [
      "150",
      "25",
      "5",
      "6"
    ],
    "hints": [
      "1を何等分した倍率かを考えます。"
    ],
    "explanation": "30÷5＝6cmです。\n\nほかの選択肢\n・「150」：縮小なのに倍率の分母をかけています。\n・「25」：長さから分母を引いています。\n・「5」：縮小率の分母だけを答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "150",
        "reason": "縮小なのに倍率の分母をかけています。"
      },
      {
        "answer": "25",
        "reason": "長さから分母を引いています。"
      },
      {
        "answer": "5",
        "reason": "縮小率の分母だけを答えています。"
      }
    ],
    "authoring": {
      "family": "scale_2",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_scale_018",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "scale",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "辺の長さが7cmの図形を6倍に拡大します。対応する辺は何cmですか。",
    "answer": "42",
    "choices": [
      "7/6",
      "7",
      "42",
      "13"
    ],
    "hints": [
      "対応する辺はすべて同じ倍率になります。"
    ],
    "explanation": "7×6＝42cmです。\n\nほかの選択肢\n・「13」：倍率を足しています。\n・「7/6」：拡大ではなく縮小しています。\n・「7」：長さを変えていません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "13",
        "reason": "倍率を足しています。"
      },
      {
        "answer": "7/6",
        "reason": "拡大ではなく縮小しています。"
      },
      {
        "answer": "7",
        "reason": "長さを変えていません。"
      }
    ],
    "authoring": {
      "family": "scale_0",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_scale_019",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "scale",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "縮尺1：600の図で1cmは、実際には何mですか。",
    "answer": "6",
    "choices": [
      "0.6",
      "6",
      "600",
      "60"
    ],
    "hints": [
      "縮尺の長さの単位は、まずcmで考えます。"
    ],
    "explanation": "600cm＝6mです。\n\nほかの選択肢\n・「600」：cmの値をmとして答えています。\n・「60」：cmからmへ直すときに10でしか割っていません。\n・「0.6」：cmからmへ直すときに1000で割っています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "600",
        "reason": "cmの値をmとして答えています。"
      },
      {
        "answer": "60",
        "reason": "cmからmへ直すときに10でしか割っていません。"
      },
      {
        "answer": "0.6",
        "reason": "cmからmへ直すときに1000で割っています。"
      }
    ],
    "authoring": {
      "family": "scale_1",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_scale_020",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "scale",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "図形の42cmの辺を、もとの長さの1/6に縮小します。対応する辺は何cmですか。",
    "answer": "7",
    "choices": [
      "7",
      "252",
      "36",
      "6"
    ],
    "hints": [
      "1を何等分した倍率かを考えます。"
    ],
    "explanation": "42÷6＝7cmです。\n\nほかの選択肢\n・「252」：縮小なのに倍率の分母をかけています。\n・「36」：長さから分母を引いています。\n・「6」：縮小率の分母だけを答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "252",
        "reason": "縮小なのに倍率の分母をかけています。"
      },
      {
        "answer": "36",
        "reason": "長さから分母を引いています。"
      },
      {
        "answer": "6",
        "reason": "縮小率の分母だけを答えています。"
      }
    ],
    "authoring": {
      "family": "scale_2",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_scale_021",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "scale",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "縮尺1：20000の地図で、川沿いの道が3cmあります。実際には何kmですか。",
    "answer": "3/5",
    "choices": [
      "6",
      "3/50",
      "3",
      "3/5"
    ],
    "hints": [
      "まず実際の長さをcmで求めます。",
      "100000cm＝1kmです。"
    ],
    "explanation": "3×20000＝60000cm。100000で割り、3/5kmです。\n\nほかの選択肢\n・「6」：cmからkmへの{換算|かんさん}を10倍大きくしています。\n・「3/50」：cmからkmへの{換算|かんさん}を10倍小さくしています。\n・「3」：地図上のcmの値を、そのままkmとしています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "6",
        "reason": "cmからkmへの{換算|かんさん}を10倍大きくしています。"
      },
      {
        "answer": "3/50",
        "reason": "cmからkmへの{換算|かんさん}を10倍小さくしています。"
      },
      {
        "answer": "3",
        "reason": "地図上のcmの値を、そのままkmとしています。"
      }
    ],
    "authoring": {
      "family": "scale_3",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_scale_022",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "scale",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "三角形を拡大したら、5cmの辺が10cmになりました。もとの7cmの辺に対応する辺は何cmですか。",
    "answer": "14",
    "choices": [
      "7/2",
      "10",
      "14",
      "12"
    ],
    "hints": [
      "対応する辺どうしを割って拡大率を求めます。"
    ],
    "explanation": "拡大率は10÷5＝2倍。7×2＝14cmです。\n\nほかの選択肢\n・「12」：同じ長さを足しています。同じ倍率を使いましょう。\n・「7/2」：拡大率で割っています。\n・「10」：別の辺の長さをそのまま答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "12",
        "reason": "同じ長さを足しています。同じ倍率を使いましょう。"
      },
      {
        "answer": "7/2",
        "reason": "拡大率で割っています。"
      },
      {
        "answer": "10",
        "reason": "別の辺の長さをそのまま答えています。"
      }
    ],
    "authoring": {
      "family": "scale_4",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_scale_023",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "scale",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "実際の長さが40mの道を、縮尺1：200の図に表します。図では何cmになりますか。",
    "answer": "20",
    "choices": [
      "2",
      "20",
      "1/5",
      "200"
    ],
    "hints": [
      "実際の長さもcmにそろえてから縮小します。"
    ],
    "explanation": "40m＝4000cm。4000÷200＝20cmです。\n\nほかの選択肢\n・「1/5」：mをcmに直さずに縮尺で割っています。\n・「200」：mからcmへの{換算|かんさん}を10倍大きくしています。\n・「2」：mからcmへの{換算|かんさん}を10倍小さくしています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "1/5",
        "reason": "mをcmに直さずに縮尺で割っています。"
      },
      {
        "answer": "200",
        "reason": "mからcmへの{換算|かんさん}を10倍大きくしています。"
      },
      {
        "answer": "2",
        "reason": "mからcmへの{換算|かんさん}を10倍小さくしています。"
      }
    ],
    "authoring": {
      "family": "scale_5",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_scale_024",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "scale",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "縮尺1：30000の地図で、川沿いの道が4cmあります。実際には何kmですか。",
    "answer": "6/5",
    "choices": [
      "6/5",
      "12",
      "3/25",
      "4"
    ],
    "hints": [
      "まず実際の長さをcmで求めます。",
      "100000cm＝1kmです。"
    ],
    "explanation": "4×30000＝120000cm。100000で割り、6/5kmです。\n\nほかの選択肢\n・「12」：cmからkmへの{換算|かんさん}を10倍大きくしています。\n・「3/25」：cmからkmへの{換算|かんさん}を10倍小さくしています。\n・「4」：地図上のcmの値を、そのままkmとしています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "12",
        "reason": "cmからkmへの{換算|かんさん}を10倍大きくしています。"
      },
      {
        "answer": "3/25",
        "reason": "cmからkmへの{換算|かんさん}を10倍小さくしています。"
      },
      {
        "answer": "4",
        "reason": "地図上のcmの値を、そのままkmとしています。"
      }
    ],
    "authoring": {
      "family": "scale_3",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_scale_025",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "scale",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "三角形を拡大したら、6cmの辺が15cmになりました。もとの8cmの辺に対応する辺は何cmですか。",
    "answer": "20",
    "choices": [
      "17",
      "16/5",
      "15",
      "20"
    ],
    "hints": [
      "対応する辺どうしを割って拡大率を求めます。"
    ],
    "explanation": "拡大率は15÷6＝5/2倍。8×5/2＝20cmです。\n\nほかの選択肢\n・「17」：同じ長さを足しています。同じ倍率を使いましょう。\n・「16/5」：拡大率で割っています。\n・「15」：別の辺の長さをそのまま答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "17",
        "reason": "同じ長さを足しています。同じ倍率を使いましょう。"
      },
      {
        "answer": "16/5",
        "reason": "拡大率で割っています。"
      },
      {
        "answer": "15",
        "reason": "別の辺の長さをそのまま答えています。"
      }
    ],
    "authoring": {
      "family": "scale_4",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_scale_026",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "scale",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "実際の長さが50mの道を、縮尺1：300の図に表します。図では何cmになりますか。",
    "answer": "50/3",
    "choices": [
      "500/3",
      "5/3",
      "50/3",
      "1/6"
    ],
    "hints": [
      "実際の長さもcmにそろえてから縮小します。"
    ],
    "explanation": "50m＝5000cm。5000÷300＝50/3cmです。\n\nほかの選択肢\n・「1/6」：mをcmに直さずに縮尺で割っています。\n・「500/3」：mからcmへの{換算|かんさん}を10倍大きくしています。\n・「5/3」：mからcmへの{換算|かんさん}を10倍小さくしています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "1/6",
        "reason": "mをcmに直さずに縮尺で割っています。"
      },
      {
        "answer": "500/3",
        "reason": "mからcmへの{換算|かんさん}を10倍大きくしています。"
      },
      {
        "answer": "5/3",
        "reason": "mからcmへの{換算|かんさん}を10倍小さくしています。"
      }
    ],
    "authoring": {
      "family": "scale_5",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_scale_027",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "scale",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "縮尺1：40000の地図で、川沿いの道が5cmあります。実際には何kmですか。",
    "answer": "2",
    "choices": [
      "5",
      "2",
      "20",
      "1/5"
    ],
    "hints": [
      "まず実際の長さをcmで求めます。",
      "100000cm＝1kmです。"
    ],
    "explanation": "5×40000＝200000cm。100000で割り、2kmです。\n\nほかの選択肢\n・「20」：cmからkmへの{換算|かんさん}を10倍大きくしています。\n・「1/5」：cmからkmへの{換算|かんさん}を10倍小さくしています。\n・「5」：地図上のcmの値を、そのままkmとしています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "20",
        "reason": "cmからkmへの{換算|かんさん}を10倍大きくしています。"
      },
      {
        "answer": "1/5",
        "reason": "cmからkmへの{換算|かんさん}を10倍小さくしています。"
      },
      {
        "answer": "5",
        "reason": "地図上のcmの値を、そのままkmとしています。"
      }
    ],
    "authoring": {
      "family": "scale_3",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_scale_028",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "scale",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "三角形を拡大したら、7cmの辺が21cmになりました。もとの9cmの辺に対応する辺は何cmですか。",
    "answer": "27",
    "choices": [
      "27",
      "23",
      "3",
      "21"
    ],
    "hints": [
      "対応する辺どうしを割って拡大率を求めます。"
    ],
    "explanation": "拡大率は21÷7＝3倍。9×3＝27cmです。\n\nほかの選択肢\n・「23」：同じ長さを足しています。同じ倍率を使いましょう。\n・「3」：拡大率で割っています。\n・「21」：別の辺の長さをそのまま答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "23",
        "reason": "同じ長さを足しています。同じ倍率を使いましょう。"
      },
      {
        "answer": "3",
        "reason": "拡大率で割っています。"
      },
      {
        "answer": "21",
        "reason": "別の辺の長さをそのまま答えています。"
      }
    ],
    "authoring": {
      "family": "scale_4",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_scale_029",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "scale",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "実際の長さが60mの道を、縮尺1：400の図に表します。図では何cmになりますか。",
    "answer": "15",
    "choices": [
      "3/20",
      "150",
      "3/2",
      "15"
    ],
    "hints": [
      "実際の長さもcmにそろえてから縮小します。"
    ],
    "explanation": "60m＝6000cm。6000÷400＝15cmです。\n\nほかの選択肢\n・「3/20」：mをcmに直さずに縮尺で割っています。\n・「150」：mからcmへの{換算|かんさん}を10倍大きくしています。\n・「3/2」：mからcmへの{換算|かんさん}を10倍小さくしています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "3/20",
        "reason": "mをcmに直さずに縮尺で割っています。"
      },
      {
        "answer": "150",
        "reason": "mからcmへの{換算|かんさん}を10倍大きくしています。"
      },
      {
        "answer": "3/2",
        "reason": "mからcmへの{換算|かんさん}を10倍小さくしています。"
      }
    ],
    "authoring": {
      "family": "scale_5",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_scale_030",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "scale",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "縮尺1：50000の地図で、川沿いの道が6cmあります。実際には何kmですか。",
    "answer": "3",
    "choices": [
      "3/10",
      "6",
      "3",
      "30"
    ],
    "hints": [
      "まず実際の長さをcmで求めます。",
      "100000cm＝1kmです。"
    ],
    "explanation": "6×50000＝300000cm。100000で割り、3kmです。\n\nほかの選択肢\n・「30」：cmからkmへの{換算|かんさん}を10倍大きくしています。\n・「3/10」：cmからkmへの{換算|かんさん}を10倍小さくしています。\n・「6」：地図上のcmの値を、そのままkmとしています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "30",
        "reason": "cmからkmへの{換算|かんさん}を10倍大きくしています。"
      },
      {
        "answer": "3/10",
        "reason": "cmからkmへの{換算|かんさん}を10倍小さくしています。"
      },
      {
        "answer": "6",
        "reason": "地図上のcmの値を、そのままkmとしています。"
      }
    ],
    "authoring": {
      "family": "scale_3",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_scale_031",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "scale",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "三角形を拡大したら、8cmの辺が28cmになりました。もとの10cmの辺に対応する辺は何cmですか。",
    "answer": "35",
    "choices": [
      "28",
      "35",
      "30",
      "20/7"
    ],
    "hints": [
      "対応する辺どうしを割って拡大率を求めます。"
    ],
    "explanation": "拡大率は28÷8＝7/2倍。10×7/2＝35cmです。\n\nほかの選択肢\n・「30」：同じ長さを足しています。同じ倍率を使いましょう。\n・「20/7」：拡大率で割っています。\n・「28」：別の辺の長さをそのまま答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "30",
        "reason": "同じ長さを足しています。同じ倍率を使いましょう。"
      },
      {
        "answer": "20/7",
        "reason": "拡大率で割っています。"
      },
      {
        "answer": "28",
        "reason": "別の辺の長さをそのまま答えています。"
      }
    ],
    "authoring": {
      "family": "scale_4",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_scale_032",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "scale",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "実際の長さが70mの道を、縮尺1：500の図に表します。図では何cmになりますか。",
    "answer": "14",
    "choices": [
      "14",
      "7/50",
      "140",
      "7/5"
    ],
    "hints": [
      "実際の長さもcmにそろえてから縮小します。"
    ],
    "explanation": "70m＝7000cm。7000÷500＝14cmです。\n\nほかの選択肢\n・「7/50」：mをcmに直さずに縮尺で割っています。\n・「140」：mからcmへの{換算|かんさん}を10倍大きくしています。\n・「7/5」：mからcmへの{換算|かんさん}を10倍小さくしています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "7/50",
        "reason": "mをcmに直さずに縮尺で割っています。"
      },
      {
        "answer": "140",
        "reason": "mからcmへの{換算|かんさん}を10倍大きくしています。"
      },
      {
        "answer": "7/5",
        "reason": "mからcmへの{換算|かんさん}を10倍小さくしています。"
      }
    ],
    "authoring": {
      "family": "scale_5",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_scale_033",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "scale",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "縮尺1：60000の地図で、川沿いの道が7cmあります。実際には何kmですか。",
    "answer": "21/5",
    "choices": [
      "42",
      "21/50",
      "7",
      "21/5"
    ],
    "hints": [
      "まず実際の長さをcmで求めます。",
      "100000cm＝1kmです。"
    ],
    "explanation": "7×60000＝420000cm。100000で割り、21/5kmです。\n\nほかの選択肢\n・「42」：cmからkmへの{換算|かんさん}を10倍大きくしています。\n・「21/50」：cmからkmへの{換算|かんさん}を10倍小さくしています。\n・「7」：地図上のcmの値を、そのままkmとしています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "42",
        "reason": "cmからkmへの{換算|かんさん}を10倍大きくしています。"
      },
      {
        "answer": "21/50",
        "reason": "cmからkmへの{換算|かんさん}を10倍小さくしています。"
      },
      {
        "answer": "7",
        "reason": "地図上のcmの値を、そのままkmとしています。"
      }
    ],
    "authoring": {
      "family": "scale_3",
      "parameters": {
        "n": 5
      }
    }
  },
  {
    "id": "math_g6_course_scale_034",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "scale",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "三角形を拡大したら、9cmの辺が36cmになりました。もとの11cmの辺に対応する辺は何cmですか。",
    "answer": "44",
    "choices": [
      "11/4",
      "36",
      "44",
      "38"
    ],
    "hints": [
      "対応する辺どうしを割って拡大率を求めます。"
    ],
    "explanation": "拡大率は36÷9＝4倍。11×4＝44cmです。\n\nほかの選択肢\n・「38」：同じ長さを足しています。同じ倍率を使いましょう。\n・「11/4」：拡大率で割っています。\n・「36」：別の辺の長さをそのまま答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "38",
        "reason": "同じ長さを足しています。同じ倍率を使いましょう。"
      },
      {
        "answer": "11/4",
        "reason": "拡大率で割っています。"
      },
      {
        "answer": "36",
        "reason": "別の辺の長さをそのまま答えています。"
      }
    ],
    "authoring": {
      "family": "scale_4",
      "parameters": {
        "n": 5
      }
    }
  },
  {
    "id": "math_g6_course_scale_035",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "scale",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "実際の長さが80mの道を、縮尺1：600の図に表します。図では何cmになりますか。",
    "answer": "40/3",
    "choices": [
      "4/3",
      "40/3",
      "2/15",
      "400/3"
    ],
    "hints": [
      "実際の長さもcmにそろえてから縮小します。"
    ],
    "explanation": "80m＝8000cm。8000÷600＝40/3cmです。\n\nほかの選択肢\n・「2/15」：mをcmに直さずに縮尺で割っています。\n・「400/3」：mからcmへの{換算|かんさん}を10倍大きくしています。\n・「4/3」：mからcmへの{換算|かんさん}を10倍小さくしています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "2/15",
        "reason": "mをcmに直さずに縮尺で割っています。"
      },
      {
        "answer": "400/3",
        "reason": "mからcmへの{換算|かんさん}を10倍大きくしています。"
      },
      {
        "answer": "4/3",
        "reason": "mからcmへの{換算|かんさん}を10倍小さくしています。"
      }
    ],
    "authoring": {
      "family": "scale_5",
      "parameters": {
        "n": 5
      }
    }
  },
  {
    "id": "math_g6_course_scale_036",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "scale",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "縮尺1：200の図に、縦3cm、横5cmの長方形の庭があります。実際の面積は何m²ですか。",
    "answer": "60",
    "choices": [
      "60",
      "30",
      "15",
      "32"
    ],
    "hints": [
      "縦と横をそれぞれ実際のm単位の長さへ直します。",
      "実際の2辺をかけて面積を求めます。"
    ],
    "explanation": "実際の辺は6mと10m。かけると60m²です。\n\nほかの選択肢\n・「30」：面積に長さの倍率を1回しかかけていません。\n・「15」：図上の面積を実際の面積としています。\n・「32」：面積ではなく実際の周の長さを求めています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "30",
        "reason": "面積に長さの倍率を1回しかかけていません。"
      },
      {
        "answer": "15",
        "reason": "図上の面積を実際の面積としています。"
      },
      {
        "answer": "32",
        "reason": "面積ではなく実際の周の長さを求めています。"
      }
    ],
    "authoring": {
      "family": "scale_6",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_scale_037",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "scale",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "同じ図形をAさんは3倍、Bさんは4倍に拡大しました。Aさんの図で15cmの辺は、Bさんの図では何cmですか。",
    "answer": "20",
    "choices": [
      "45/4",
      "5",
      "60",
      "20"
    ],
    "hints": [
      "まずAさんの図から、もとの長さを求めます。",
      "もとの長さにBさんの拡大率をかけます。"
    ],
    "explanation": "もとの長さは15÷3＝5cm。Bさんの図では5×4＝20cmです。\n\nほかの選択肢\n・「45/4」：AとBの倍率の比を逆にかけています。\n・「5」：もとの図の長さで止めています。\n・「60」：Aさんの図の辺に、そのままBさんの倍率をかけています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "45/4",
        "reason": "AとBの倍率の比を逆にかけています。"
      },
      {
        "answer": "5",
        "reason": "もとの図の長さで止めています。"
      },
      {
        "answer": "60",
        "reason": "Aさんの図の辺に、そのままBさんの倍率をかけています。"
      }
    ],
    "authoring": {
      "family": "scale_7",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_scale_038",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "scale",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "縮尺1：300の図に、縦4cm、横6cmの長方形の庭があります。実際の面積は何m²ですか。",
    "answer": "216",
    "choices": [
      "24",
      "60",
      "216",
      "72"
    ],
    "hints": [
      "縦と横をそれぞれ実際のm単位の長さへ直します。",
      "実際の2辺をかけて面積を求めます。"
    ],
    "explanation": "実際の辺は12mと18m。かけると216m²です。\n\nほかの選択肢\n・「72」：面積に長さの倍率を1回しかかけていません。\n・「24」：図上の面積を実際の面積としています。\n・「60」：面積ではなく実際の周の長さを求めています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "72",
        "reason": "面積に長さの倍率を1回しかかけていません。"
      },
      {
        "answer": "24",
        "reason": "図上の面積を実際の面積としています。"
      },
      {
        "answer": "60",
        "reason": "面積ではなく実際の周の長さを求めています。"
      }
    ],
    "authoring": {
      "family": "scale_6",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_scale_039",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "scale",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "同じ図形をAさんは4倍、Bさんは5倍に拡大しました。Aさんの図で24cmの辺は、Bさんの図では何cmですか。",
    "answer": "30",
    "choices": [
      "120",
      "30",
      "96/5",
      "6"
    ],
    "hints": [
      "まずAさんの図から、もとの長さを求めます。",
      "もとの長さにBさんの拡大率をかけます。"
    ],
    "explanation": "もとの長さは24÷4＝6cm。Bさんの図では6×5＝30cmです。\n\nほかの選択肢\n・「96/5」：AとBの倍率の比を逆にかけています。\n・「6」：もとの図の長さで止めています。\n・「120」：Aさんの図の辺に、そのままBさんの倍率をかけています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "96/5",
        "reason": "AとBの倍率の比を逆にかけています。"
      },
      {
        "answer": "6",
        "reason": "もとの図の長さで止めています。"
      },
      {
        "answer": "120",
        "reason": "Aさんの図の辺に、そのままBさんの倍率をかけています。"
      }
    ],
    "authoring": {
      "family": "scale_7",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_scale_040",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "scale",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "縮尺1：400の図に、縦5cm、横7cmの長方形の庭があります。実際の面積は何m²ですか。",
    "answer": "560",
    "choices": [
      "560",
      "140",
      "35",
      "96"
    ],
    "hints": [
      "縦と横をそれぞれ実際のm単位の長さへ直します。",
      "実際の2辺をかけて面積を求めます。"
    ],
    "explanation": "実際の辺は20mと28m。かけると560m²です。\n\nほかの選択肢\n・「140」：面積に長さの倍率を1回しかかけていません。\n・「35」：図上の面積を実際の面積としています。\n・「96」：面積ではなく実際の周の長さを求めています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "140",
        "reason": "面積に長さの倍率を1回しかかけていません。"
      },
      {
        "answer": "35",
        "reason": "図上の面積を実際の面積としています。"
      },
      {
        "answer": "96",
        "reason": "面積ではなく実際の周の長さを求めています。"
      }
    ],
    "authoring": {
      "family": "scale_6",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_scale_041",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "scale",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "同じ図形をAさんは5倍、Bさんは6倍に拡大しました。Aさんの図で35cmの辺は、Bさんの図では何cmですか。",
    "answer": "42",
    "choices": [
      "175/6",
      "7",
      "210",
      "42"
    ],
    "hints": [
      "まずAさんの図から、もとの長さを求めます。",
      "もとの長さにBさんの拡大率をかけます。"
    ],
    "explanation": "もとの長さは35÷5＝7cm。Bさんの図では7×6＝42cmです。\n\nほかの選択肢\n・「175/6」：AとBの倍率の比を逆にかけています。\n・「7」：もとの図の長さで止めています。\n・「210」：Aさんの図の辺に、そのままBさんの倍率をかけています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "175/6",
        "reason": "AとBの倍率の比を逆にかけています。"
      },
      {
        "answer": "7",
        "reason": "もとの図の長さで止めています。"
      },
      {
        "answer": "210",
        "reason": "Aさんの図の辺に、そのままBさんの倍率をかけています。"
      }
    ],
    "authoring": {
      "family": "scale_7",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_scale_042",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "scale",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "縮尺1：500の図に、縦6cm、横8cmの長方形の庭があります。実際の面積は何m²ですか。",
    "answer": "1200",
    "choices": [
      "48",
      "140",
      "1200",
      "240"
    ],
    "hints": [
      "縦と横をそれぞれ実際のm単位の長さへ直します。",
      "実際の2辺をかけて面積を求めます。"
    ],
    "explanation": "実際の辺は30mと40m。かけると1200m²です。\n\nほかの選択肢\n・「240」：面積に長さの倍率を1回しかかけていません。\n・「48」：図上の面積を実際の面積としています。\n・「140」：面積ではなく実際の周の長さを求めています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "240",
        "reason": "面積に長さの倍率を1回しかかけていません。"
      },
      {
        "answer": "48",
        "reason": "図上の面積を実際の面積としています。"
      },
      {
        "answer": "140",
        "reason": "面積ではなく実際の周の長さを求めています。"
      }
    ],
    "authoring": {
      "family": "scale_6",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_scale_043",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "scale",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "同じ図形をAさんは6倍、Bさんは7倍に拡大しました。Aさんの図で48cmの辺は、Bさんの図では何cmですか。",
    "answer": "56",
    "choices": [
      "336",
      "56",
      "288/7",
      "8"
    ],
    "hints": [
      "まずAさんの図から、もとの長さを求めます。",
      "もとの長さにBさんの拡大率をかけます。"
    ],
    "explanation": "もとの長さは48÷6＝8cm。Bさんの図では8×7＝56cmです。\n\nほかの選択肢\n・「288/7」：AとBの倍率の比を逆にかけています。\n・「8」：もとの図の長さで止めています。\n・「336」：Aさんの図の辺に、そのままBさんの倍率をかけています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "288/7",
        "reason": "AとBの倍率の比を逆にかけています。"
      },
      {
        "answer": "8",
        "reason": "もとの図の長さで止めています。"
      },
      {
        "answer": "336",
        "reason": "Aさんの図の辺に、そのままBさんの倍率をかけています。"
      }
    ],
    "authoring": {
      "family": "scale_7",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_scale_044",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "scale",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "縮尺1：600の図に、縦7cm、横9cmの長方形の庭があります。実際の面積は何m²ですか。",
    "answer": "2268",
    "choices": [
      "2268",
      "378",
      "63",
      "192"
    ],
    "hints": [
      "縦と横をそれぞれ実際のm単位の長さへ直します。",
      "実際の2辺をかけて面積を求めます。"
    ],
    "explanation": "実際の辺は42mと54m。かけると2268m²です。\n\nほかの選択肢\n・「378」：面積に長さの倍率を1回しかかけていません。\n・「63」：図上の面積を実際の面積としています。\n・「192」：面積ではなく実際の周の長さを求めています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "378",
        "reason": "面積に長さの倍率を1回しかかけていません。"
      },
      {
        "answer": "63",
        "reason": "図上の面積を実際の面積としています。"
      },
      {
        "answer": "192",
        "reason": "面積ではなく実際の周の長さを求めています。"
      }
    ],
    "authoring": {
      "family": "scale_6",
      "parameters": {
        "n": 5
      }
    }
  },
  {
    "id": "math_g6_course_scale_045",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "scale",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "同じ図形をAさんは7倍、Bさんは8倍に拡大しました。Aさんの図で63cmの辺は、Bさんの図では何cmですか。",
    "answer": "72",
    "choices": [
      "441/8",
      "9",
      "504",
      "72"
    ],
    "hints": [
      "まずAさんの図から、もとの長さを求めます。",
      "もとの長さにBさんの拡大率をかけます。"
    ],
    "explanation": "もとの長さは63÷7＝9cm。Bさんの図では9×8＝72cmです。\n\nほかの選択肢\n・「441/8」：AとBの倍率の比を逆にかけています。\n・「9」：もとの図の長さで止めています。\n・「504」：Aさんの図の辺に、そのままBさんの倍率をかけています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "441/8",
        "reason": "AとBの倍率の比を逆にかけています。"
      },
      {
        "answer": "9",
        "reason": "もとの図の長さで止めています。"
      },
      {
        "answer": "504",
        "reason": "Aさんの図の辺に、そのままBさんの倍率をかけています。"
      }
    ],
    "authoring": {
      "family": "scale_7",
      "parameters": {
        "n": 5
      }
    }
  },
  {
    "id": "math_g6_course_circle_009",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "circle",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "直径6cmの円の面積は何cm²ですか。円周率は3.14です。",
    "answer": "28.26",
    "choices": [
      "113.04",
      "18.84",
      "9",
      "28.26"
    ],
    "hints": [
      "直径の半分が半径です。"
    ],
    "explanation": "半径は6÷2＝3cm。面積は3×3×3.14＝28.26cm²です。\n\nほかの選択肢\n・「113.04」：直径をそのまま半径の式に入れています。\n・「18.84」：円周を答えています。\n・「9」：円周率をかけ忘れています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "113.04",
        "reason": "直径をそのまま半径の式に入れています。"
      },
      {
        "answer": "18.84",
        "reason": "円周を答えています。"
      },
      {
        "answer": "9",
        "reason": "円周率をかけ忘れています。"
      }
    ],
    "authoring": {
      "family": "circle_1",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_circle_010",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "circle",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "不規則な形の公園を、縦およそ20m、横およそ30mの長方形とみなします。およその面積は何m²ですか。",
    "answer": "600",
    "choices": [
      "300",
      "100",
      "600",
      "50"
    ],
    "hints": [
      "面積を求めやすい形に置き換えて考えます。"
    ],
    "explanation": "長方形の面積として20×30＝600m²です。これは見積もりなので実際の面積と完全には一致しません。\n\nほかの選択肢\n・「50」：縦と横を足しています。\n・「300」：長方形なのに三角形のように2で割っています。\n・「100」：面積ではなく周の長さを求めています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "50",
        "reason": "縦と横を足しています。"
      },
      {
        "answer": "300",
        "reason": "長方形なのに三角形のように2で割っています。"
      },
      {
        "answer": "100",
        "reason": "面積ではなく周の長さを求めています。"
      }
    ],
    "authoring": {
      "family": "circle_2",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_circle_011",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "circle",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "半径4cmの円の面積は何cm²ですか。円周率は3.14です。",
    "answer": "50.24",
    "choices": [
      "200.96",
      "50.24",
      "25.12",
      "12.56"
    ],
    "hints": [
      "円の面積＝半径×半径×円周率です。"
    ],
    "explanation": "4×4×3.14＝50.24cm²です。\n\nほかの選択肢\n・「25.12」：面積ではなく円周を求めています。\n・「12.56」：半径を1回しかかけていません。\n・「200.96」：直径を半径として使っています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "25.12",
        "reason": "面積ではなく円周を求めています。"
      },
      {
        "answer": "12.56",
        "reason": "半径を1回しかかけていません。"
      },
      {
        "answer": "200.96",
        "reason": "直径を半径として使っています。"
      }
    ],
    "authoring": {
      "family": "circle_0",
      "parameters": {
        "n": 2
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-circle_0-2.svg",
      "caption": "半径と、求める部分を確認しましょう。円周率は3.14です。",
      "alt": "半径と、求める部分を確認しましょう。円周率は3.14です。"
    }
  },
  {
    "id": "math_g6_course_circle_012",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "circle",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "直径8cmの円の面積は何cm²ですか。円周率は3.14です。",
    "answer": "50.24",
    "choices": [
      "50.24",
      "200.96",
      "25.12",
      "16"
    ],
    "hints": [
      "直径の半分が半径です。"
    ],
    "explanation": "半径は8÷2＝4cm。面積は4×4×3.14＝50.24cm²です。\n\nほかの選択肢\n・「200.96」：直径をそのまま半径の式に入れています。\n・「25.12」：円周を答えています。\n・「16」：円周率をかけ忘れています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "200.96",
        "reason": "直径をそのまま半径の式に入れています。"
      },
      {
        "answer": "25.12",
        "reason": "円周を答えています。"
      },
      {
        "answer": "16",
        "reason": "円周率をかけ忘れています。"
      }
    ],
    "authoring": {
      "family": "circle_1",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_circle_013",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "circle",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "不規則な形の公園を、縦およそ30m、横およそ40mの長方形とみなします。およその面積は何m²ですか。",
    "answer": "1200",
    "choices": [
      "70",
      "600",
      "140",
      "1200"
    ],
    "hints": [
      "面積を求めやすい形に置き換えて考えます。"
    ],
    "explanation": "長方形の面積として30×40＝1200m²です。これは見積もりなので実際の面積と完全には一致しません。\n\nほかの選択肢\n・「70」：縦と横を足しています。\n・「600」：長方形なのに三角形のように2で割っています。\n・「140」：面積ではなく周の長さを求めています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "70",
        "reason": "縦と横を足しています。"
      },
      {
        "answer": "600",
        "reason": "長方形なのに三角形のように2で割っています。"
      },
      {
        "answer": "140",
        "reason": "面積ではなく周の長さを求めています。"
      }
    ],
    "authoring": {
      "family": "circle_2",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_circle_014",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "circle",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "半径5cmの円の面積は何cm²ですか。円周率は3.14です。",
    "answer": "78.5",
    "choices": [
      "15.7",
      "314",
      "78.5",
      "31.4"
    ],
    "hints": [
      "円の面積＝半径×半径×円周率です。"
    ],
    "explanation": "5×5×3.14＝78.5cm²です。\n\nほかの選択肢\n・「31.4」：面積ではなく円周を求めています。\n・「15.7」：半径を1回しかかけていません。\n・「314」：直径を半径として使っています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "31.4",
        "reason": "面積ではなく円周を求めています。"
      },
      {
        "answer": "15.7",
        "reason": "半径を1回しかかけていません。"
      },
      {
        "answer": "314",
        "reason": "直径を半径として使っています。"
      }
    ],
    "authoring": {
      "family": "circle_0",
      "parameters": {
        "n": 3
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-circle_0-3.svg",
      "caption": "半径と、求める部分を確認しましょう。円周率は3.14です。",
      "alt": "半径と、求める部分を確認しましょう。円周率は3.14です。"
    }
  },
  {
    "id": "math_g6_course_circle_015",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "circle",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "不規則な形の公園を、縦およそ40m、横およそ50mの長方形とみなします。およその面積は何m²ですか。",
    "answer": "2000",
    "choices": [
      "180",
      "2000",
      "90",
      "1000"
    ],
    "hints": [
      "面積を求めやすい形に置き換えて考えます。"
    ],
    "explanation": "長方形の面積として40×50＝2000m²です。これは見積もりなので実際の面積と完全には一致しません。\n\nほかの選択肢\n・「90」：縦と横を足しています。\n・「1000」：長方形なのに三角形のように2で割っています。\n・「180」：面積ではなく周の長さを求めています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "90",
        "reason": "縦と横を足しています。"
      },
      {
        "answer": "1000",
        "reason": "長方形なのに三角形のように2で割っています。"
      },
      {
        "answer": "180",
        "reason": "面積ではなく周の長さを求めています。"
      }
    ],
    "authoring": {
      "family": "circle_2",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_circle_016",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "circle",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "半径6cmの円の面積は何cm²ですか。円周率は3.14です。",
    "answer": "113.04",
    "choices": [
      "113.04",
      "37.68",
      "18.84",
      "452.16"
    ],
    "hints": [
      "円の面積＝半径×半径×円周率です。"
    ],
    "explanation": "6×6×3.14＝113.04cm²です。\n\nほかの選択肢\n・「37.68」：面積ではなく円周を求めています。\n・「18.84」：半径を1回しかかけていません。\n・「452.16」：直径を半径として使っています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "37.68",
        "reason": "面積ではなく円周を求めています。"
      },
      {
        "answer": "18.84",
        "reason": "半径を1回しかかけていません。"
      },
      {
        "answer": "452.16",
        "reason": "直径を半径として使っています。"
      }
    ],
    "authoring": {
      "family": "circle_0",
      "parameters": {
        "n": 4
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-circle_0-4.svg",
      "caption": "半径と、求める部分を確認しましょう。円周率は3.14です。",
      "alt": "半径と、求める部分を確認しましょう。円周率は3.14です。"
    }
  },
  {
    "id": "math_g6_course_circle_017",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "circle",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "直径12cmの円の面積は何cm²ですか。円周率は3.14です。",
    "answer": "113.04",
    "choices": [
      "452.16",
      "37.68",
      "36",
      "113.04"
    ],
    "hints": [
      "直径の半分が半径です。"
    ],
    "explanation": "半径は12÷2＝6cm。面積は6×6×3.14＝113.04cm²です。\n\nほかの選択肢\n・「452.16」：直径をそのまま半径の式に入れています。\n・「37.68」：円周を答えています。\n・「36」：円周率をかけ忘れています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "452.16",
        "reason": "直径をそのまま半径の式に入れています。"
      },
      {
        "answer": "37.68",
        "reason": "円周を答えています。"
      },
      {
        "answer": "36",
        "reason": "円周率をかけ忘れています。"
      }
    ],
    "authoring": {
      "family": "circle_1",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_circle_018",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "circle",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "不規則な形の公園を、縦およそ50m、横およそ60mの長方形とみなします。およその面積は何m²ですか。",
    "answer": "3000",
    "choices": [
      "1500",
      "220",
      "3000",
      "110"
    ],
    "hints": [
      "面積を求めやすい形に置き換えて考えます。"
    ],
    "explanation": "長方形の面積として50×60＝3000m²です。これは見積もりなので実際の面積と完全には一致しません。\n\nほかの選択肢\n・「110」：縦と横を足しています。\n・「1500」：長方形なのに三角形のように2で割っています。\n・「220」：面積ではなく周の長さを求めています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "110",
        "reason": "縦と横を足しています。"
      },
      {
        "answer": "1500",
        "reason": "長方形なのに三角形のように2で割っています。"
      },
      {
        "answer": "220",
        "reason": "面積ではなく周の長さを求めています。"
      }
    ],
    "authoring": {
      "family": "circle_2",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_circle_019",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "circle",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "半径7cmの円の面積は何cm²ですか。円周率は3.14です。",
    "answer": "153.86",
    "choices": [
      "615.44",
      "153.86",
      "43.96",
      "21.98"
    ],
    "hints": [
      "円の面積＝半径×半径×円周率です。"
    ],
    "explanation": "7×7×3.14＝153.86cm²です。\n\nほかの選択肢\n・「43.96」：面積ではなく円周を求めています。\n・「21.98」：半径を1回しかかけていません。\n・「615.44」：直径を半径として使っています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "43.96",
        "reason": "面積ではなく円周を求めています。"
      },
      {
        "answer": "21.98",
        "reason": "半径を1回しかかけていません。"
      },
      {
        "answer": "615.44",
        "reason": "直径を半径として使っています。"
      }
    ],
    "authoring": {
      "family": "circle_0",
      "parameters": {
        "n": 5
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-circle_0-5.svg",
      "caption": "半径と、求める部分を確認しましょう。円周率は3.14です。",
      "alt": "半径と、求める部分を確認しましょう。円周率は3.14です。"
    }
  },
  {
    "id": "math_g6_course_circle_020",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "circle",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "直径14cmの円の面積は何cm²ですか。円周率は3.14です。",
    "answer": "153.86",
    "choices": [
      "153.86",
      "615.44",
      "43.96",
      "49"
    ],
    "hints": [
      "直径の半分が半径です。"
    ],
    "explanation": "半径は14÷2＝7cm。面積は7×7×3.14＝153.86cm²です。\n\nほかの選択肢\n・「615.44」：直径をそのまま半径の式に入れています。\n・「43.96」：円周を答えています。\n・「49」：円周率をかけ忘れています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "615.44",
        "reason": "直径をそのまま半径の式に入れています。"
      },
      {
        "answer": "43.96",
        "reason": "円周を答えています。"
      },
      {
        "answer": "49",
        "reason": "円周率をかけ忘れています。"
      }
    ],
    "authoring": {
      "family": "circle_1",
      "parameters": {
        "n": 5
      }
    }
  },
  {
    "id": "math_g6_course_circle_021",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "circle",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "半径3cmの半円の面積は何cm²ですか。円周率は3.14です。",
    "answer": "14.13",
    "choices": [
      "28.26",
      "7.065",
      "9.42",
      "14.13"
    ],
    "hints": [
      "同じ半円2個で円全体になります。"
    ],
    "explanation": "円全体は28.26cm²。その半分で14.13cm²です。\n\nほかの選択肢\n・「28.26」：円全体のままで半分にしていません。\n・「7.065」：半円をさらに半分にしています。\n・「9.42」：半円の曲線部分の長さを求めています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "28.26",
        "reason": "円全体のままで半分にしていません。"
      },
      {
        "answer": "7.065",
        "reason": "半円をさらに半分にしています。"
      },
      {
        "answer": "9.42",
        "reason": "半円の曲線部分の長さを求めています。"
      }
    ],
    "authoring": {
      "family": "circle_3",
      "parameters": {
        "n": 1
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-circle_3-1.svg",
      "caption": "半径と、求める部分を確認しましょう。円周率は3.14です。",
      "alt": "半径と、求める部分を確認しましょう。円周率は3.14です。"
    }
  },
  {
    "id": "math_g6_course_circle_022",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "circle",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "半径3cmの円の4分の1の面積は何cm²ですか。円周率は3.14です。",
    "answer": "7.065",
    "choices": [
      "14.13",
      "9",
      "7.065",
      "28.26"
    ],
    "hints": [
      "まず円全体を求め、4等分します。"
    ],
    "explanation": "3×3×3.14÷4＝7.065cm²です。\n\nほかの選択肢\n・「28.26」：円全体の面積を答えています。\n・「14.13」：半円の面積を答えています。\n・「9」：円周率をかけず、4分の1にする操作もしていません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "28.26",
        "reason": "円全体の面積を答えています。"
      },
      {
        "answer": "14.13",
        "reason": "半円の面積を答えています。"
      },
      {
        "answer": "9",
        "reason": "円周率をかけず、4分の1にする操作もしていません。"
      }
    ],
    "authoring": {
      "family": "circle_4",
      "parameters": {
        "n": 1
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-circle_4-1.svg",
      "caption": "半径と、求める部分を確認しましょう。円周率は3.14です。",
      "alt": "半径と、求める部分を確認しましょう。円周率は3.14です。"
    }
  },
  {
    "id": "math_g6_course_circle_023",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "circle",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "1辺6cmの正方形の中に、直径6cmの円をぴったり入れます。正方形の内側で円の外側の面積は何cm²ですか。円周率は3.14です。",
    "answer": "7.74",
    "choices": [
      "36",
      "7.74",
      "28.26",
      "21.87"
    ],
    "hints": [
      "正方形の面積から円の面積を引きます。"
    ],
    "explanation": "6×6－3×3×3.14＝7.74cm²です。\n\nほかの選択肢\n・「28.26」：円の面積を答えています。\n・「21.87」：円全体ではなく半円だけを引いています。\n・「36」：円の面積を引いていません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "28.26",
        "reason": "円の面積を答えています。"
      },
      {
        "answer": "21.87",
        "reason": "円全体ではなく半円だけを引いています。"
      },
      {
        "answer": "36",
        "reason": "円の面積を引いていません。"
      }
    ],
    "authoring": {
      "family": "circle_5",
      "parameters": {
        "n": 1
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-circle_5-1.svg",
      "caption": "正方形の内側で、円の外側の部分を求めます。",
      "alt": "正方形の内側で、円の外側の部分を求めます。"
    }
  },
  {
    "id": "math_g6_course_circle_024",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "circle",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "半径4cmの円の4分の1の面積は何cm²ですか。円周率は3.14です。",
    "answer": "12.56",
    "choices": [
      "12.56",
      "50.24",
      "25.12",
      "16"
    ],
    "hints": [
      "まず円全体を求め、4等分します。"
    ],
    "explanation": "4×4×3.14÷4＝12.56cm²です。\n\nほかの選択肢\n・「50.24」：円全体の面積を答えています。\n・「25.12」：半円の面積を答えています。\n・「16」：円周率をかけず、4分の1にする操作もしていません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "50.24",
        "reason": "円全体の面積を答えています。"
      },
      {
        "answer": "25.12",
        "reason": "半円の面積を答えています。"
      },
      {
        "answer": "16",
        "reason": "円周率をかけず、4分の1にする操作もしていません。"
      }
    ],
    "authoring": {
      "family": "circle_4",
      "parameters": {
        "n": 2
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-circle_4-2.svg",
      "caption": "半径と、求める部分を確認しましょう。円周率は3.14です。",
      "alt": "半径と、求める部分を確認しましょう。円周率は3.14です。"
    }
  },
  {
    "id": "math_g6_course_circle_025",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "circle",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "1辺8cmの正方形の中に、直径8cmの円をぴったり入れます。正方形の内側で円の外側の面積は何cm²ですか。円周率は3.14です。",
    "answer": "13.76",
    "choices": [
      "50.24",
      "38.88",
      "64",
      "13.76"
    ],
    "hints": [
      "正方形の面積から円の面積を引きます。"
    ],
    "explanation": "8×8－4×4×3.14＝13.76cm²です。\n\nほかの選択肢\n・「50.24」：円の面積を答えています。\n・「38.88」：円全体ではなく半円だけを引いています。\n・「64」：円の面積を引いていません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "50.24",
        "reason": "円の面積を答えています。"
      },
      {
        "answer": "38.88",
        "reason": "円全体ではなく半円だけを引いています。"
      },
      {
        "answer": "64",
        "reason": "円の面積を引いていません。"
      }
    ],
    "authoring": {
      "family": "circle_5",
      "parameters": {
        "n": 2
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-circle_5-2.svg",
      "caption": "正方形の内側で、円の外側の部分を求めます。",
      "alt": "正方形の内側で、円の外側の部分を求めます。"
    }
  },
  {
    "id": "math_g6_course_circle_026",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "circle",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "半径5cmの半円の面積は何cm²ですか。円周率は3.14です。",
    "answer": "39.25",
    "choices": [
      "19.625",
      "15.7",
      "39.25",
      "78.5"
    ],
    "hints": [
      "同じ半円2個で円全体になります。"
    ],
    "explanation": "円全体は78.5cm²。その半分で39.25cm²です。\n\nほかの選択肢\n・「78.5」：円全体のままで半分にしていません。\n・「19.625」：半円をさらに半分にしています。\n・「15.7」：半円の曲線部分の長さを求めています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "78.5",
        "reason": "円全体のままで半分にしていません。"
      },
      {
        "answer": "19.625",
        "reason": "半円をさらに半分にしています。"
      },
      {
        "answer": "15.7",
        "reason": "半円の曲線部分の長さを求めています。"
      }
    ],
    "authoring": {
      "family": "circle_3",
      "parameters": {
        "n": 3
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-circle_3-3.svg",
      "caption": "半径と、求める部分を確認しましょう。円周率は3.14です。",
      "alt": "半径と、求める部分を確認しましょう。円周率は3.14です。"
    }
  },
  {
    "id": "math_g6_course_circle_027",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "circle",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "半径5cmの円の4分の1の面積は何cm²ですか。円周率は3.14です。",
    "answer": "19.625",
    "choices": [
      "25",
      "19.625",
      "78.5",
      "39.25"
    ],
    "hints": [
      "まず円全体を求め、4等分します。"
    ],
    "explanation": "5×5×3.14÷4＝19.625cm²です。\n\nほかの選択肢\n・「78.5」：円全体の面積を答えています。\n・「39.25」：半円の面積を答えています。\n・「25」：円周率をかけず、4分の1にする操作もしていません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "78.5",
        "reason": "円全体の面積を答えています。"
      },
      {
        "answer": "39.25",
        "reason": "半円の面積を答えています。"
      },
      {
        "answer": "25",
        "reason": "円周率をかけず、4分の1にする操作もしていません。"
      }
    ],
    "authoring": {
      "family": "circle_4",
      "parameters": {
        "n": 3
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-circle_4-3.svg",
      "caption": "半径と、求める部分を確認しましょう。円周率は3.14です。",
      "alt": "半径と、求める部分を確認しましょう。円周率は3.14です。"
    }
  },
  {
    "id": "math_g6_course_circle_028",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "circle",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "1辺10cmの正方形の中に、直径10cmの円をぴったり入れます。正方形の内側で円の外側の面積は何cm²ですか。円周率は3.14です。",
    "answer": "21.5",
    "choices": [
      "21.5",
      "78.5",
      "60.75",
      "100"
    ],
    "hints": [
      "正方形の面積から円の面積を引きます。"
    ],
    "explanation": "10×10－5×5×3.14＝21.5cm²です。\n\nほかの選択肢\n・「78.5」：円の面積を答えています。\n・「60.75」：円全体ではなく半円だけを引いています。\n・「100」：円の面積を引いていません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "78.5",
        "reason": "円の面積を答えています。"
      },
      {
        "answer": "60.75",
        "reason": "円全体ではなく半円だけを引いています。"
      },
      {
        "answer": "100",
        "reason": "円の面積を引いていません。"
      }
    ],
    "authoring": {
      "family": "circle_5",
      "parameters": {
        "n": 3
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-circle_5-3.svg",
      "caption": "正方形の内側で、円の外側の部分を求めます。",
      "alt": "正方形の内側で、円の外側の部分を求めます。"
    }
  },
  {
    "id": "math_g6_course_circle_029",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "circle",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "半径6cmの半円の面積は何cm²ですか。円周率は3.14です。",
    "answer": "56.52",
    "choices": [
      "113.04",
      "28.26",
      "18.84",
      "56.52"
    ],
    "hints": [
      "同じ半円2個で円全体になります。"
    ],
    "explanation": "円全体は113.04cm²。その半分で56.52cm²です。\n\nほかの選択肢\n・「113.04」：円全体のままで半分にしていません。\n・「28.26」：半円をさらに半分にしています。\n・「18.84」：半円の曲線部分の長さを求めています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "113.04",
        "reason": "円全体のままで半分にしていません。"
      },
      {
        "answer": "28.26",
        "reason": "半円をさらに半分にしています。"
      },
      {
        "answer": "18.84",
        "reason": "半円の曲線部分の長さを求めています。"
      }
    ],
    "authoring": {
      "family": "circle_3",
      "parameters": {
        "n": 4
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-circle_3-4.svg",
      "caption": "半径と、求める部分を確認しましょう。円周率は3.14です。",
      "alt": "半径と、求める部分を確認しましょう。円周率は3.14です。"
    }
  },
  {
    "id": "math_g6_course_circle_030",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "circle",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "1辺12cmの正方形の中に、直径12cmの円をぴったり入れます。正方形の内側で円の外側の面積は何cm²ですか。円周率は3.14です。",
    "answer": "30.96",
    "choices": [
      "87.48",
      "144",
      "30.96",
      "113.04"
    ],
    "hints": [
      "正方形の面積から円の面積を引きます。"
    ],
    "explanation": "12×12－6×6×3.14＝30.96cm²です。\n\nほかの選択肢\n・「113.04」：円の面積を答えています。\n・「87.48」：円全体ではなく半円だけを引いています。\n・「144」：円の面積を引いていません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "113.04",
        "reason": "円の面積を答えています。"
      },
      {
        "answer": "87.48",
        "reason": "円全体ではなく半円だけを引いています。"
      },
      {
        "answer": "144",
        "reason": "円の面積を引いていません。"
      }
    ],
    "authoring": {
      "family": "circle_5",
      "parameters": {
        "n": 4
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-circle_5-4.svg",
      "caption": "正方形の内側で、円の外側の部分を求めます。",
      "alt": "正方形の内側で、円の外側の部分を求めます。"
    }
  },
  {
    "id": "math_g6_course_circle_031",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "circle",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "半径7cmの半円の面積は何cm²ですか。円周率は3.14です。",
    "answer": "76.93",
    "choices": [
      "21.98",
      "76.93",
      "153.86",
      "38.465"
    ],
    "hints": [
      "同じ半円2個で円全体になります。"
    ],
    "explanation": "円全体は153.86cm²。その半分で76.93cm²です。\n\nほかの選択肢\n・「153.86」：円全体のままで半分にしていません。\n・「38.465」：半円をさらに半分にしています。\n・「21.98」：半円の曲線部分の長さを求めています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "153.86",
        "reason": "円全体のままで半分にしていません。"
      },
      {
        "answer": "38.465",
        "reason": "半円をさらに半分にしています。"
      },
      {
        "answer": "21.98",
        "reason": "半円の曲線部分の長さを求めています。"
      }
    ],
    "authoring": {
      "family": "circle_3",
      "parameters": {
        "n": 5
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-circle_3-5.svg",
      "caption": "半径と、求める部分を確認しましょう。円周率は3.14です。",
      "alt": "半径と、求める部分を確認しましょう。円周率は3.14です。"
    }
  },
  {
    "id": "math_g6_course_circle_032",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "circle",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "半径7cmの円の4分の1の面積は何cm²ですか。円周率は3.14です。",
    "answer": "38.465",
    "choices": [
      "38.465",
      "153.86",
      "76.93",
      "49"
    ],
    "hints": [
      "まず円全体を求め、4等分します。"
    ],
    "explanation": "7×7×3.14÷4＝38.465cm²です。\n\nほかの選択肢\n・「153.86」：円全体の面積を答えています。\n・「76.93」：半円の面積を答えています。\n・「49」：円周率をかけず、4分の1にする操作もしていません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "153.86",
        "reason": "円全体の面積を答えています。"
      },
      {
        "answer": "76.93",
        "reason": "半円の面積を答えています。"
      },
      {
        "answer": "49",
        "reason": "円周率をかけず、4分の1にする操作もしていません。"
      }
    ],
    "authoring": {
      "family": "circle_4",
      "parameters": {
        "n": 5
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-circle_4-5.svg",
      "caption": "半径と、求める部分を確認しましょう。円周率は3.14です。",
      "alt": "半径と、求める部分を確認しましょう。円周率は3.14です。"
    }
  },
  {
    "id": "math_g6_course_circle_033",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "circle",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "1辺14cmの正方形の中に、直径14cmの円をぴったり入れます。正方形の内側で円の外側の面積は何cm²ですか。円周率は3.14です。",
    "answer": "42.14",
    "choices": [
      "153.86",
      "119.07",
      "196",
      "42.14"
    ],
    "hints": [
      "正方形の面積から円の面積を引きます。"
    ],
    "explanation": "14×14－7×7×3.14＝42.14cm²です。\n\nほかの選択肢\n・「153.86」：円の面積を答えています。\n・「119.07」：円全体ではなく半円だけを引いています。\n・「196」：円の面積を引いていません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "153.86",
        "reason": "円の面積を答えています。"
      },
      {
        "answer": "119.07",
        "reason": "円全体ではなく半円だけを引いています。"
      },
      {
        "answer": "196",
        "reason": "円の面積を引いていません。"
      }
    ],
    "authoring": {
      "family": "circle_5",
      "parameters": {
        "n": 5
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-circle_5-5.svg",
      "caption": "正方形の内側で、円の外側の部分を求めます。",
      "alt": "正方形の内側で、円の外側の部分を求めます。"
    }
  },
  {
    "id": "math_g6_course_circle_034",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "circle",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "半径8cmの半円の面積は何cm²ですか。円周率は3.14です。",
    "answer": "100.48",
    "choices": [
      "50.24",
      "25.12",
      "100.48",
      "200.96"
    ],
    "hints": [
      "同じ半円2個で円全体になります。"
    ],
    "explanation": "円全体は200.96cm²。その半分で100.48cm²です。\n\nほかの選択肢\n・「200.96」：円全体のままで半分にしていません。\n・「50.24」：半円をさらに半分にしています。\n・「25.12」：半円の曲線部分の長さを求めています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "200.96",
        "reason": "円全体のままで半分にしていません。"
      },
      {
        "answer": "50.24",
        "reason": "半円をさらに半分にしています。"
      },
      {
        "answer": "25.12",
        "reason": "半円の曲線部分の長さを求めています。"
      }
    ],
    "authoring": {
      "family": "circle_3",
      "parameters": {
        "n": 6
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-circle_3-6.svg",
      "caption": "半径と、求める部分を確認しましょう。円周率は3.14です。",
      "alt": "半径と、求める部分を確認しましょう。円周率は3.14です。"
    }
  },
  {
    "id": "math_g6_course_circle_035",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "circle",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "半径8cmの円の4分の1の面積は何cm²ですか。円周率は3.14です。",
    "answer": "50.24",
    "choices": [
      "64",
      "50.24",
      "200.96",
      "100.48"
    ],
    "hints": [
      "まず円全体を求め、4等分します。"
    ],
    "explanation": "8×8×3.14÷4＝50.24cm²です。\n\nほかの選択肢\n・「200.96」：円全体の面積を答えています。\n・「100.48」：半円の面積を答えています。\n・「64」：円周率をかけず、4分の1にする操作もしていません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "200.96",
        "reason": "円全体の面積を答えています。"
      },
      {
        "answer": "100.48",
        "reason": "半円の面積を答えています。"
      },
      {
        "answer": "64",
        "reason": "円周率をかけず、4分の1にする操作もしていません。"
      }
    ],
    "authoring": {
      "family": "circle_4",
      "parameters": {
        "n": 6
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-circle_4-6.svg",
      "caption": "半径と、求める部分を確認しましょう。円周率は3.14です。",
      "alt": "半径と、求める部分を確認しましょう。円周率は3.14です。"
    }
  },
  {
    "id": "math_g6_course_circle_036",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "circle",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "半径3mの円形の池の外側に、{幅|はば}2mの道を1周作ります。道の面積は何m²ですか。円周率は3.14です。",
    "answer": "50.24",
    "choices": [
      "50.24",
      "78.5",
      "12.56",
      "37.68"
    ],
    "hints": [
      "外側の半径は、池の半径と道の{幅|はば}の和です。",
      "外側の円から内側の円を引きます。"
    ],
    "explanation": "外側の半径は5m。(5×5－3×3)×3.14＝50.24m²です。\n\nほかの選択肢\n・「78.5」：外側の円の面積から池を引いていません。\n・「12.56」：道の{幅|はば}だけを半径とする円を求めています。\n・「37.68」：内側の円周に道{幅|はば}をかけ、外側へ広がる分を無視しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "78.5",
        "reason": "外側の円の面積から池を引いていません。"
      },
      {
        "answer": "12.56",
        "reason": "道の{幅|はば}だけを半径とする円を求めています。"
      },
      {
        "answer": "37.68",
        "reason": "内側の円周に道{幅|はば}をかけ、外側へ広がる分を無視しています。"
      }
    ],
    "authoring": {
      "family": "circle_6",
      "parameters": {
        "n": 1
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-circle_6-1.svg",
      "caption": "単位はmです。内側が池、外側の帯が道です。",
      "alt": "半径と、求める部分を確認しましょう。円周率は3.14です。"
    }
  },
  {
    "id": "math_g6_course_circle_037",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "circle",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "直径を1辺とする長方形の外側に半円を1つ付けます。長方形のもう1辺は4cmです。半円と同じ半径の円の円周は18.84cmです。合わせた面積は何cm²ですか。円周率は3.14です。",
    "answer": "38.13",
    "choices": [
      "52.26",
      "14.13",
      "26.13",
      "38.13"
    ],
    "hints": [
      "円周÷3.14で直径を求めます。",
      "長方形と半円に分けて、それぞれの面積を足します。"
    ],
    "explanation": "直径は18.84÷3.14＝6cm、半径は3cm。長方形24と半円14.13を足し、38.13cm²です。\n\nほかの選択肢\n・「52.26」：半円ではなく円全体を足しています。\n・「14.13」：半円だけで長方形を足していません。\n・「26.13」：長方形の辺を直径ではなく半径としています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "52.26",
        "reason": "半円ではなく円全体を足しています。"
      },
      {
        "answer": "14.13",
        "reason": "半円だけで長方形を足していません。"
      },
      {
        "answer": "26.13",
        "reason": "長方形の辺を直径ではなく半径としています。"
      }
    ],
    "authoring": {
      "family": "circle_7",
      "parameters": {
        "n": 1
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-circle_7-1.svg",
      "caption": "半円の直径と長方形の1辺が重なっています。図は模式図です。",
      "alt": "半円の直径と長方形の1辺が重なっています。図は模式図です。"
    }
  },
  {
    "id": "math_g6_course_circle_038",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "circle",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "半径4mの円形の池の外側に、{幅|はば}3mの道を1周作ります。道の面積は何m²ですか。円周率は3.14です。",
    "answer": "103.62",
    "choices": [
      "28.26",
      "75.36",
      "103.62",
      "153.86"
    ],
    "hints": [
      "外側の半径は、池の半径と道の{幅|はば}の和です。",
      "外側の円から内側の円を引きます。"
    ],
    "explanation": "外側の半径は7m。(7×7－4×4)×3.14＝103.62m²です。\n\nほかの選択肢\n・「153.86」：外側の円の面積から池を引いていません。\n・「28.26」：道の{幅|はば}だけを半径とする円を求めています。\n・「75.36」：内側の円周に道{幅|はば}をかけ、外側へ広がる分を無視しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "153.86",
        "reason": "外側の円の面積から池を引いていません。"
      },
      {
        "answer": "28.26",
        "reason": "道の{幅|はば}だけを半径とする円を求めています。"
      },
      {
        "answer": "75.36",
        "reason": "内側の円周に道{幅|はば}をかけ、外側へ広がる分を無視しています。"
      }
    ],
    "authoring": {
      "family": "circle_6",
      "parameters": {
        "n": 2
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-circle_6-2.svg",
      "caption": "単位はmです。内側が池、外側の帯が道です。",
      "alt": "半径と、求める部分を確認しましょう。円周率は3.14です。"
    }
  },
  {
    "id": "math_g6_course_circle_039",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "circle",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "直径を1辺とする長方形の外側に半円を1つ付けます。長方形のもう1辺は5cmです。半円と同じ半径の円の円周は25.12cmです。合わせた面積は何cm²ですか。円周率は3.14です。",
    "answer": "65.12",
    "choices": [
      "45.12",
      "65.12",
      "90.24",
      "25.12"
    ],
    "hints": [
      "円周÷3.14で直径を求めます。",
      "長方形と半円に分けて、それぞれの面積を足します。"
    ],
    "explanation": "直径は25.12÷3.14＝8cm、半径は4cm。長方形40と半円25.12を足し、65.12cm²です。\n\nほかの選択肢\n・「90.24」：半円ではなく円全体を足しています。\n・「25.12」：半円だけで長方形を足していません。\n・「45.12」：長方形の辺を直径ではなく半径としています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "90.24",
        "reason": "半円ではなく円全体を足しています。"
      },
      {
        "answer": "25.12",
        "reason": "半円だけで長方形を足していません。"
      },
      {
        "answer": "45.12",
        "reason": "長方形の辺を直径ではなく半径としています。"
      }
    ],
    "authoring": {
      "family": "circle_7",
      "parameters": {
        "n": 2
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-circle_7-2.svg",
      "caption": "半円の直径と長方形の1辺が重なっています。図は模式図です。",
      "alt": "半円の直径と長方形の1辺が重なっています。図は模式図です。"
    }
  },
  {
    "id": "math_g6_course_circle_040",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "circle",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "半径5mの円形の池の外側に、{幅|はば}4mの道を1周作ります。道の面積は何m²ですか。円周率は3.14です。",
    "answer": "175.84",
    "choices": [
      "175.84",
      "254.34",
      "50.24",
      "125.6"
    ],
    "hints": [
      "外側の半径は、池の半径と道の{幅|はば}の和です。",
      "外側の円から内側の円を引きます。"
    ],
    "explanation": "外側の半径は9m。(9×9－5×5)×3.14＝175.84m²です。\n\nほかの選択肢\n・「254.34」：外側の円の面積から池を引いていません。\n・「50.24」：道の{幅|はば}だけを半径とする円を求めています。\n・「125.6」：内側の円周に道{幅|はば}をかけ、外側へ広がる分を無視しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "254.34",
        "reason": "外側の円の面積から池を引いていません。"
      },
      {
        "answer": "50.24",
        "reason": "道の{幅|はば}だけを半径とする円を求めています。"
      },
      {
        "answer": "125.6",
        "reason": "内側の円周に道{幅|はば}をかけ、外側へ広がる分を無視しています。"
      }
    ],
    "authoring": {
      "family": "circle_6",
      "parameters": {
        "n": 3
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-circle_6-3.svg",
      "caption": "単位はmです。内側が池、外側の帯が道です。",
      "alt": "半径と、求める部分を確認しましょう。円周率は3.14です。"
    }
  },
  {
    "id": "math_g6_course_circle_041",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "circle",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "直径を1辺とする長方形の外側に半円を1つ付けます。長方形のもう1辺は6cmです。半円と同じ半径の円の円周は31.4cmです。合わせた面積は何cm²ですか。円周率は3.14です。",
    "answer": "99.25",
    "choices": [
      "138.5",
      "39.25",
      "69.25",
      "99.25"
    ],
    "hints": [
      "円周÷3.14で直径を求めます。",
      "長方形と半円に分けて、それぞれの面積を足します。"
    ],
    "explanation": "直径は31.4÷3.14＝10cm、半径は5cm。長方形60と半円39.25を足し、99.25cm²です。\n\nほかの選択肢\n・「138.5」：半円ではなく円全体を足しています。\n・「39.25」：半円だけで長方形を足していません。\n・「69.25」：長方形の辺を直径ではなく半径としています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "138.5",
        "reason": "半円ではなく円全体を足しています。"
      },
      {
        "answer": "39.25",
        "reason": "半円だけで長方形を足していません。"
      },
      {
        "answer": "69.25",
        "reason": "長方形の辺を直径ではなく半径としています。"
      }
    ],
    "authoring": {
      "family": "circle_7",
      "parameters": {
        "n": 3
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-circle_7-3.svg",
      "caption": "半円の直径と長方形の1辺が重なっています。図は模式図です。",
      "alt": "半円の直径と長方形の1辺が重なっています。図は模式図です。"
    }
  },
  {
    "id": "math_g6_course_circle_042",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "circle",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "半径6mの円形の池の外側に、{幅|はば}5mの道を1周作ります。道の面積は何m²ですか。円周率は3.14です。",
    "answer": "266.9",
    "choices": [
      "78.5",
      "188.4",
      "266.9",
      "379.94"
    ],
    "hints": [
      "外側の半径は、池の半径と道の{幅|はば}の和です。",
      "外側の円から内側の円を引きます。"
    ],
    "explanation": "外側の半径は11m。(11×11－6×6)×3.14＝266.9m²です。\n\nほかの選択肢\n・「379.94」：外側の円の面積から池を引いていません。\n・「78.5」：道の{幅|はば}だけを半径とする円を求めています。\n・「188.4」：内側の円周に道{幅|はば}をかけ、外側へ広がる分を無視しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "379.94",
        "reason": "外側の円の面積から池を引いていません。"
      },
      {
        "answer": "78.5",
        "reason": "道の{幅|はば}だけを半径とする円を求めています。"
      },
      {
        "answer": "188.4",
        "reason": "内側の円周に道{幅|はば}をかけ、外側へ広がる分を無視しています。"
      }
    ],
    "authoring": {
      "family": "circle_6",
      "parameters": {
        "n": 4
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-circle_6-4.svg",
      "caption": "単位はmです。内側が池、外側の帯が道です。",
      "alt": "半径と、求める部分を確認しましょう。円周率は3.14です。"
    }
  },
  {
    "id": "math_g6_course_circle_043",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "circle",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "直径を1辺とする長方形の外側に半円を1つ付けます。長方形のもう1辺は7cmです。半円と同じ半径の円の円周は37.68cmです。合わせた面積は何cm²ですか。円周率は3.14です。",
    "answer": "140.52",
    "choices": [
      "98.52",
      "140.52",
      "197.04",
      "56.52"
    ],
    "hints": [
      "円周÷3.14で直径を求めます。",
      "長方形と半円に分けて、それぞれの面積を足します。"
    ],
    "explanation": "直径は37.68÷3.14＝12cm、半径は6cm。長方形84と半円56.52を足し、140.52cm²です。\n\nほかの選択肢\n・「197.04」：半円ではなく円全体を足しています。\n・「56.52」：半円だけで長方形を足していません。\n・「98.52」：長方形の辺を直径ではなく半径としています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "197.04",
        "reason": "半円ではなく円全体を足しています。"
      },
      {
        "answer": "56.52",
        "reason": "半円だけで長方形を足していません。"
      },
      {
        "answer": "98.52",
        "reason": "長方形の辺を直径ではなく半径としています。"
      }
    ],
    "authoring": {
      "family": "circle_7",
      "parameters": {
        "n": 4
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-circle_7-4.svg",
      "caption": "半円の直径と長方形の1辺が重なっています。図は模式図です。",
      "alt": "半円の直径と長方形の1辺が重なっています。図は模式図です。"
    }
  },
  {
    "id": "math_g6_course_circle_044",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "circle",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "半径7mの円形の池の外側に、{幅|はば}6mの道を1周作ります。道の面積は何m²ですか。円周率は3.14です。",
    "answer": "376.8",
    "choices": [
      "376.8",
      "530.66",
      "113.04",
      "263.76"
    ],
    "hints": [
      "外側の半径は、池の半径と道の{幅|はば}の和です。",
      "外側の円から内側の円を引きます。"
    ],
    "explanation": "外側の半径は13m。(13×13－7×7)×3.14＝376.8m²です。\n\nほかの選択肢\n・「530.66」：外側の円の面積から池を引いていません。\n・「113.04」：道の{幅|はば}だけを半径とする円を求めています。\n・「263.76」：内側の円周に道{幅|はば}をかけ、外側へ広がる分を無視しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "530.66",
        "reason": "外側の円の面積から池を引いていません。"
      },
      {
        "answer": "113.04",
        "reason": "道の{幅|はば}だけを半径とする円を求めています。"
      },
      {
        "answer": "263.76",
        "reason": "内側の円周に道{幅|はば}をかけ、外側へ広がる分を無視しています。"
      }
    ],
    "authoring": {
      "family": "circle_6",
      "parameters": {
        "n": 5
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-circle_6-5.svg",
      "caption": "単位はmです。内側が池、外側の帯が道です。",
      "alt": "半径と、求める部分を確認しましょう。円周率は3.14です。"
    }
  },
  {
    "id": "math_g6_course_circle_045",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "circle",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "直径を1辺とする長方形の外側に半円を1つ付けます。長方形のもう1辺は8cmです。半円と同じ半径の円の円周は43.96cmです。合わせた面積は何cm²ですか。円周率は3.14です。",
    "answer": "188.93",
    "choices": [
      "265.86",
      "76.93",
      "132.93",
      "188.93"
    ],
    "hints": [
      "円周÷3.14で直径を求めます。",
      "長方形と半円に分けて、それぞれの面積を足します。"
    ],
    "explanation": "直径は43.96÷3.14＝14cm、半径は7cm。長方形112と半円76.93を足し、188.93cm²です。\n\nほかの選択肢\n・「265.86」：半円ではなく円全体を足しています。\n・「76.93」：半円だけで長方形を足していません。\n・「132.93」：長方形の辺を直径ではなく半径としています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "265.86",
        "reason": "半円ではなく円全体を足しています。"
      },
      {
        "answer": "76.93",
        "reason": "半円だけで長方形を足していません。"
      },
      {
        "answer": "132.93",
        "reason": "長方形の辺を直径ではなく半径としています。"
      }
    ],
    "authoring": {
      "family": "circle_7",
      "parameters": {
        "n": 5
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-circle_7-5.svg",
      "caption": "半円の直径と長方形の1辺が重なっています。図は模式図です。",
      "alt": "半円の直径と長方形の1辺が重なっています。図は模式図です。"
    }
  },
  {
    "id": "math_g6_course_volume_009",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "volume",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "底面積15cm²、高さ5cmの三角柱の体積は何cm³ですか。",
    "answer": "75",
    "choices": [
      "37.5",
      "20",
      "150",
      "75"
    ],
    "hints": [
      "角柱の体積＝底面積×高さです。"
    ],
    "explanation": "15×5＝75cm³です。\n\nほかの選択肢\n・「37.5」：底面積が分かっているのに、もう一度2で割っています。\n・「20」：底面積と高さを足しています。\n・「150」：三角柱だからと体積を2倍しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "37.5",
        "reason": "底面積が分かっているのに、もう一度2で割っています。"
      },
      {
        "answer": "20",
        "reason": "底面積と高さを足しています。"
      },
      {
        "answer": "150",
        "reason": "三角柱だからと体積を2倍しています。"
      }
    ],
    "authoring": {
      "family": "volume_0",
      "parameters": {
        "n": 1
      }
    },
    "diagram": {
      "kind": "solid",
      "shape": "triangularPrism",
      "h": 5,
      "unit": "cm",
      "baseArea": 15,
      "caption": "底面積15cm²、柱の高さ5cmの三角柱です。"
    }
  },
  {
    "id": "math_g6_course_volume_010",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "volume",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "底面の半径3cm、高さ5cmの円柱の体積は何cm³ですか。円周率は3.14です。",
    "answer": "141.3",
    "choices": [
      "94.2",
      "565.2",
      "141.3",
      "28.26"
    ],
    "hints": [
      "円の底面積を求めてから、高さをかけます。"
    ],
    "explanation": "3×3×3.14×5＝141.3cm³です。\n\nほかの選択肢\n・「28.26」：底面積で止めて、高さをかけていません。\n・「94.2」：円の面積ではなく円周に高さをかけています。\n・「565.2」：直径を半径として計算しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "28.26",
        "reason": "底面積で止めて、高さをかけていません。"
      },
      {
        "answer": "94.2",
        "reason": "円の面積ではなく円周に高さをかけています。"
      },
      {
        "answer": "565.2",
        "reason": "直径を半径として計算しています。"
      }
    ],
    "authoring": {
      "family": "volume_1",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_volume_011",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "volume",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "底面積30cm²の柱状の容器に、水を深さ4cmまで入れました。水は何cm³ですか。",
    "answer": "120",
    "choices": [
      "15/2",
      "120",
      "34",
      "30"
    ],
    "hints": [
      "水を1つの柱とみて体積を求めます。"
    ],
    "explanation": "30×4＝120cm³です。\n\nほかの選択肢\n・「34」：底面積と深さを足しています。\n・「30」：底面積の数値だけを答えています。\n・「15/2」：底面積を深さで割っています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "34",
        "reason": "底面積と深さを足しています。"
      },
      {
        "answer": "30",
        "reason": "底面積の数値だけを答えています。"
      },
      {
        "answer": "15/2",
        "reason": "底面積を深さで割っています。"
      }
    ],
    "authoring": {
      "family": "volume_2",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_volume_012",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "volume",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "底面積20cm²、高さ6cmの三角柱の体積は何cm³ですか。",
    "answer": "120",
    "choices": [
      "120",
      "60",
      "26",
      "240"
    ],
    "hints": [
      "角柱の体積＝底面積×高さです。"
    ],
    "explanation": "20×6＝120cm³です。\n\nほかの選択肢\n・「60」：底面積が分かっているのに、もう一度2で割っています。\n・「26」：底面積と高さを足しています。\n・「240」：三角柱だからと体積を2倍しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "60",
        "reason": "底面積が分かっているのに、もう一度2で割っています。"
      },
      {
        "answer": "26",
        "reason": "底面積と高さを足しています。"
      },
      {
        "answer": "240",
        "reason": "三角柱だからと体積を2倍しています。"
      }
    ],
    "authoring": {
      "family": "volume_0",
      "parameters": {
        "n": 2
      }
    },
    "diagram": {
      "kind": "solid",
      "shape": "triangularPrism",
      "h": 6,
      "unit": "cm",
      "baseArea": 20,
      "caption": "底面積20cm²、柱の高さ6cmの三角柱です。"
    }
  },
  {
    "id": "math_g6_course_volume_013",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "volume",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "底面の半径4cm、高さ6cmの円柱の体積は何cm³ですか。円周率は3.14です。",
    "answer": "301.44",
    "choices": [
      "50.24",
      "150.72",
      "1205.76",
      "301.44"
    ],
    "hints": [
      "円の底面積を求めてから、高さをかけます。"
    ],
    "explanation": "4×4×3.14×6＝301.44cm³です。\n\nほかの選択肢\n・「50.24」：底面積で止めて、高さをかけていません。\n・「150.72」：円の面積ではなく円周に高さをかけています。\n・「1205.76」：直径を半径として計算しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "50.24",
        "reason": "底面積で止めて、高さをかけていません。"
      },
      {
        "answer": "150.72",
        "reason": "円の面積ではなく円周に高さをかけています。"
      },
      {
        "answer": "1205.76",
        "reason": "直径を半径として計算しています。"
      }
    ],
    "authoring": {
      "family": "volume_1",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_volume_014",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "volume",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "底面積40cm²の柱状の容器に、水を深さ5cmまで入れました。水は何cm³ですか。",
    "answer": "200",
    "choices": [
      "40",
      "8",
      "200",
      "45"
    ],
    "hints": [
      "水を1つの柱とみて体積を求めます。"
    ],
    "explanation": "40×5＝200cm³です。\n\nほかの選択肢\n・「45」：底面積と深さを足しています。\n・「40」：底面積の数値だけを答えています。\n・「8」：底面積を深さで割っています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "45",
        "reason": "底面積と深さを足しています。"
      },
      {
        "answer": "40",
        "reason": "底面積の数値だけを答えています。"
      },
      {
        "answer": "8",
        "reason": "底面積を深さで割っています。"
      }
    ],
    "authoring": {
      "family": "volume_2",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_volume_015",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "volume",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "底面積25cm²、高さ7cmの三角柱の体積は何cm³ですか。",
    "answer": "175",
    "choices": [
      "350",
      "175",
      "87.5",
      "32"
    ],
    "hints": [
      "角柱の体積＝底面積×高さです。"
    ],
    "explanation": "25×7＝175cm³です。\n\nほかの選択肢\n・「87.5」：底面積が分かっているのに、もう一度2で割っています。\n・「32」：底面積と高さを足しています。\n・「350」：三角柱だからと体積を2倍しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "87.5",
        "reason": "底面積が分かっているのに、もう一度2で割っています。"
      },
      {
        "answer": "32",
        "reason": "底面積と高さを足しています。"
      },
      {
        "answer": "350",
        "reason": "三角柱だからと体積を2倍しています。"
      }
    ],
    "authoring": {
      "family": "volume_0",
      "parameters": {
        "n": 3
      }
    },
    "diagram": {
      "kind": "solid",
      "shape": "triangularPrism",
      "h": 7,
      "unit": "cm",
      "baseArea": 25,
      "caption": "底面積25cm²、柱の高さ7cmの三角柱です。"
    }
  },
  {
    "id": "math_g6_course_volume_016",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "volume",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "底面の半径5cm、高さ7cmの円柱の体積は何cm³ですか。円周率は3.14です。",
    "answer": "549.5",
    "choices": [
      "549.5",
      "78.5",
      "219.8",
      "2198"
    ],
    "hints": [
      "円の底面積を求めてから、高さをかけます。"
    ],
    "explanation": "5×5×3.14×7＝549.5cm³です。\n\nほかの選択肢\n・「78.5」：底面積で止めて、高さをかけていません。\n・「219.8」：円の面積ではなく円周に高さをかけています。\n・「2198」：直径を半径として計算しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "78.5",
        "reason": "底面積で止めて、高さをかけていません。"
      },
      {
        "answer": "219.8",
        "reason": "円の面積ではなく円周に高さをかけています。"
      },
      {
        "answer": "2198",
        "reason": "直径を半径として計算しています。"
      }
    ],
    "authoring": {
      "family": "volume_1",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_volume_017",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "volume",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "底面積50cm²の柱状の容器に、水を深さ6cmまで入れました。水は何cm³ですか。",
    "answer": "300",
    "choices": [
      "56",
      "50",
      "25/3",
      "300"
    ],
    "hints": [
      "水を1つの柱とみて体積を求めます。"
    ],
    "explanation": "50×6＝300cm³です。\n\nほかの選択肢\n・「56」：底面積と深さを足しています。\n・「50」：底面積の数値だけを答えています。\n・「25/3」：底面積を深さで割っています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "56",
        "reason": "底面積と深さを足しています。"
      },
      {
        "answer": "50",
        "reason": "底面積の数値だけを答えています。"
      },
      {
        "answer": "25/3",
        "reason": "底面積を深さで割っています。"
      }
    ],
    "authoring": {
      "family": "volume_2",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_volume_018",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "volume",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "底面積30cm²、高さ8cmの三角柱の体積は何cm³ですか。",
    "answer": "240",
    "choices": [
      "38",
      "480",
      "240",
      "120"
    ],
    "hints": [
      "角柱の体積＝底面積×高さです。"
    ],
    "explanation": "30×8＝240cm³です。\n\nほかの選択肢\n・「120」：底面積が分かっているのに、もう一度2で割っています。\n・「38」：底面積と高さを足しています。\n・「480」：三角柱だからと体積を2倍しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "120",
        "reason": "底面積が分かっているのに、もう一度2で割っています。"
      },
      {
        "answer": "38",
        "reason": "底面積と高さを足しています。"
      },
      {
        "answer": "480",
        "reason": "三角柱だからと体積を2倍しています。"
      }
    ],
    "authoring": {
      "family": "volume_0",
      "parameters": {
        "n": 4
      }
    },
    "diagram": {
      "kind": "solid",
      "shape": "triangularPrism",
      "h": 8,
      "unit": "cm",
      "baseArea": 30,
      "caption": "底面積30cm²、柱の高さ8cmの三角柱です。"
    }
  },
  {
    "id": "math_g6_course_volume_019",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "volume",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "底面の半径6cm、高さ8cmの円柱の体積は何cm³ですか。円周率は3.14です。",
    "answer": "904.32",
    "choices": [
      "3617.28",
      "904.32",
      "113.04",
      "301.44"
    ],
    "hints": [
      "円の底面積を求めてから、高さをかけます。"
    ],
    "explanation": "6×6×3.14×8＝904.32cm³です。\n\nほかの選択肢\n・「113.04」：底面積で止めて、高さをかけていません。\n・「301.44」：円の面積ではなく円周に高さをかけています。\n・「3617.28」：直径を半径として計算しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "113.04",
        "reason": "底面積で止めて、高さをかけていません。"
      },
      {
        "answer": "301.44",
        "reason": "円の面積ではなく円周に高さをかけています。"
      },
      {
        "answer": "3617.28",
        "reason": "直径を半径として計算しています。"
      }
    ],
    "authoring": {
      "family": "volume_1",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_volume_020",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "volume",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "底面積60cm²の柱状の容器に、水を深さ7cmまで入れました。水は何cm³ですか。",
    "answer": "420",
    "choices": [
      "420",
      "67",
      "60",
      "60/7"
    ],
    "hints": [
      "水を1つの柱とみて体積を求めます。"
    ],
    "explanation": "60×7＝420cm³です。\n\nほかの選択肢\n・「67」：底面積と深さを足しています。\n・「60」：底面積の数値だけを答えています。\n・「60/7」：底面積を深さで割っています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "67",
        "reason": "底面積と深さを足しています。"
      },
      {
        "answer": "60",
        "reason": "底面積の数値だけを答えています。"
      },
      {
        "answer": "60/7",
        "reason": "底面積を深さで割っています。"
      }
    ],
    "authoring": {
      "family": "volume_2",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_volume_021",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "volume",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "底面が底辺5cm、高さ4cmの三角形で、柱の高さが8cmの三角柱です。体積は何cm³ですか。",
    "answer": "80",
    "choices": [
      "160",
      "10",
      "40",
      "80"
    ],
    "hints": [
      "三角形の高さと柱の高さを区別します。"
    ],
    "explanation": "底面積は5×4÷2＝10cm²。それに8をかけ、80cm³です。\n\nほかの選択肢\n・「160」：三角形の底面積を求めるときに2で割っていません。\n・「10」：底面積で止めています。\n・「40」：三角形の面積で2で割った後、もう一度2で割っています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "160",
        "reason": "三角形の底面積を求めるときに2で割っていません。"
      },
      {
        "answer": "10",
        "reason": "底面積で止めています。"
      },
      {
        "answer": "40",
        "reason": "三角形の面積で2で割った後、もう一度2で割っています。"
      }
    ],
    "authoring": {
      "family": "volume_3",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_volume_022",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "volume",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "底面の半径3cm、体積141.3cm³の円柱の高さは何cmですか。円周率は3.14です。",
    "answer": "5",
    "choices": [
      "5/4",
      "15.7",
      "5",
      "10"
    ],
    "hints": [
      "底面積を先に求め、体積÷底面積で高さを求めます。"
    ],
    "explanation": "底面積は28.26cm²。141.3÷28.26＝5cmです。\n\nほかの選択肢\n・「10」：底面積を半円として半分にしてから割っています。\n・「5/4」：半径の代わりに直径を使い、底面積が4倍になっています。\n・「15.7」：底面積の円周率をかけ忘れています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "10",
        "reason": "底面積を半円として半分にしてから割っています。"
      },
      {
        "answer": "5/4",
        "reason": "半径の代わりに直径を使い、底面積が4倍になっています。"
      },
      {
        "answer": "15.7",
        "reason": "底面積の円周率をかけ忘れています。"
      }
    ],
    "authoring": {
      "family": "volume_4",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_volume_023",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "volume",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "底面積30cm²の柱状容器に水が深さ5cmまであります。石を完全に沈めると水面が8cmになりました。水があふれないとき、石の体積は何cm³ですか。",
    "answer": "90",
    "choices": [
      "3",
      "90",
      "240",
      "150"
    ],
    "hints": [
      "石の体積は、水面が上がった部分の体積です。"
    ],
    "explanation": "上昇は8－5＝3cm。30×3＝90cm³です。\n\nほかの選択肢\n・「240」：石を沈めた後の水と石の合計体積です。\n・「150」：初めの水の体積を答えています。\n・「3」：水面が上がった深さだけを答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "240",
        "reason": "石を沈めた後の水と石の合計体積です。"
      },
      {
        "answer": "150",
        "reason": "初めの水の体積を答えています。"
      },
      {
        "answer": "3",
        "reason": "水面が上がった深さだけを答えています。"
      }
    ],
    "authoring": {
      "family": "volume_5",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_volume_024",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "volume",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "底面が底辺6cm、高さ5cmの三角形で、柱の高さが9cmの三角柱です。体積は何cm³ですか。",
    "answer": "135",
    "choices": [
      "135",
      "270",
      "15",
      "67.5"
    ],
    "hints": [
      "三角形の高さと柱の高さを区別します。"
    ],
    "explanation": "底面積は6×5÷2＝15cm²。それに9をかけ、135cm³です。\n\nほかの選択肢\n・「270」：三角形の底面積を求めるときに2で割っていません。\n・「15」：底面積で止めています。\n・「67.5」：三角形の面積で2で割った後、もう一度2で割っています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "270",
        "reason": "三角形の底面積を求めるときに2で割っていません。"
      },
      {
        "answer": "15",
        "reason": "底面積で止めています。"
      },
      {
        "answer": "67.5",
        "reason": "三角形の面積で2で割った後、もう一度2で割っています。"
      }
    ],
    "authoring": {
      "family": "volume_3",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_volume_025",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "volume",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "底面の半径4cm、体積301.44cm³の円柱の高さは何cmですか。円周率は3.14です。",
    "answer": "6",
    "choices": [
      "12",
      "3/2",
      "18.84",
      "6"
    ],
    "hints": [
      "底面積を先に求め、体積÷底面積で高さを求めます。"
    ],
    "explanation": "底面積は50.24cm²。301.44÷50.24＝6cmです。\n\nほかの選択肢\n・「12」：底面積を半円として半分にしてから割っています。\n・「3/2」：半径の代わりに直径を使い、底面積が4倍になっています。\n・「18.84」：底面積の円周率をかけ忘れています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "12",
        "reason": "底面積を半円として半分にしてから割っています。"
      },
      {
        "answer": "3/2",
        "reason": "半径の代わりに直径を使い、底面積が4倍になっています。"
      },
      {
        "answer": "18.84",
        "reason": "底面積の円周率をかけ忘れています。"
      }
    ],
    "authoring": {
      "family": "volume_4",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_volume_026",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "volume",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "底面積35cm²の柱状容器に水が深さ6cmまであります。石を完全に沈めると水面が10cmになりました。水があふれないとき、石の体積は何cm³ですか。",
    "answer": "140",
    "choices": [
      "210",
      "4",
      "140",
      "350"
    ],
    "hints": [
      "石の体積は、水面が上がった部分の体積です。"
    ],
    "explanation": "上昇は10－6＝4cm。35×4＝140cm³です。\n\nほかの選択肢\n・「350」：石を沈めた後の水と石の合計体積です。\n・「210」：初めの水の体積を答えています。\n・「4」：水面が上がった深さだけを答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "350",
        "reason": "石を沈めた後の水と石の合計体積です。"
      },
      {
        "answer": "210",
        "reason": "初めの水の体積を答えています。"
      },
      {
        "answer": "4",
        "reason": "水面が上がった深さだけを答えています。"
      }
    ],
    "authoring": {
      "family": "volume_5",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_volume_027",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "volume",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "底面が底辺7cm、高さ6cmの三角形で、柱の高さが10cmの三角柱です。体積は何cm³ですか。",
    "answer": "210",
    "choices": [
      "105",
      "210",
      "420",
      "21"
    ],
    "hints": [
      "三角形の高さと柱の高さを区別します。"
    ],
    "explanation": "底面積は7×6÷2＝21cm²。それに10をかけ、210cm³です。\n\nほかの選択肢\n・「420」：三角形の底面積を求めるときに2で割っていません。\n・「21」：底面積で止めています。\n・「105」：三角形の面積で2で割った後、もう一度2で割っています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "420",
        "reason": "三角形の底面積を求めるときに2で割っていません。"
      },
      {
        "answer": "21",
        "reason": "底面積で止めています。"
      },
      {
        "answer": "105",
        "reason": "三角形の面積で2で割った後、もう一度2で割っています。"
      }
    ],
    "authoring": {
      "family": "volume_3",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_volume_028",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "volume",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "底面の半径5cm、体積549.5cm³の円柱の高さは何cmですか。円周率は3.14です。",
    "answer": "7",
    "choices": [
      "7",
      "14",
      "7/4",
      "21.98"
    ],
    "hints": [
      "底面積を先に求め、体積÷底面積で高さを求めます。"
    ],
    "explanation": "底面積は78.5cm²。549.5÷78.5＝7cmです。\n\nほかの選択肢\n・「14」：底面積を半円として半分にしてから割っています。\n・「7/4」：半径の代わりに直径を使い、底面積が4倍になっています。\n・「21.98」：底面積の円周率をかけ忘れています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "14",
        "reason": "底面積を半円として半分にしてから割っています。"
      },
      {
        "answer": "7/4",
        "reason": "半径の代わりに直径を使い、底面積が4倍になっています。"
      },
      {
        "answer": "21.98",
        "reason": "底面積の円周率をかけ忘れています。"
      }
    ],
    "authoring": {
      "family": "volume_4",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_volume_029",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "volume",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "底面積40cm²の柱状容器に水が深さ7cmまであります。石を完全に沈めると水面が12cmになりました。水があふれないとき、石の体積は何cm³ですか。",
    "answer": "200",
    "choices": [
      "480",
      "280",
      "5",
      "200"
    ],
    "hints": [
      "石の体積は、水面が上がった部分の体積です。"
    ],
    "explanation": "上昇は12－7＝5cm。40×5＝200cm³です。\n\nほかの選択肢\n・「480」：石を沈めた後の水と石の合計体積です。\n・「280」：初めの水の体積を答えています。\n・「5」：水面が上がった深さだけを答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "480",
        "reason": "石を沈めた後の水と石の合計体積です。"
      },
      {
        "answer": "280",
        "reason": "初めの水の体積を答えています。"
      },
      {
        "answer": "5",
        "reason": "水面が上がった深さだけを答えています。"
      }
    ],
    "authoring": {
      "family": "volume_5",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_volume_030",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "volume",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "底面が底辺8cm、高さ7cmの三角形で、柱の高さが11cmの三角柱です。体積は何cm³ですか。",
    "answer": "308",
    "choices": [
      "28",
      "154",
      "308",
      "616"
    ],
    "hints": [
      "三角形の高さと柱の高さを区別します。"
    ],
    "explanation": "底面積は8×7÷2＝28cm²。それに11をかけ、308cm³です。\n\nほかの選択肢\n・「616」：三角形の底面積を求めるときに2で割っていません。\n・「28」：底面積で止めています。\n・「154」：三角形の面積で2で割った後、もう一度2で割っています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "616",
        "reason": "三角形の底面積を求めるときに2で割っていません。"
      },
      {
        "answer": "28",
        "reason": "底面積で止めています。"
      },
      {
        "answer": "154",
        "reason": "三角形の面積で2で割った後、もう一度2で割っています。"
      }
    ],
    "authoring": {
      "family": "volume_3",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_volume_031",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "volume",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "底面の半径6cm、体積904.32cm³の円柱の高さは何cmですか。円周率は3.14です。",
    "answer": "8",
    "choices": [
      "25.12",
      "8",
      "16",
      "2"
    ],
    "hints": [
      "底面積を先に求め、体積÷底面積で高さを求めます。"
    ],
    "explanation": "底面積は113.04cm²。904.32÷113.04＝8cmです。\n\nほかの選択肢\n・「16」：底面積を半円として半分にしてから割っています。\n・「2」：半径の代わりに直径を使い、底面積が4倍になっています。\n・「25.12」：底面積の円周率をかけ忘れています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "16",
        "reason": "底面積を半円として半分にしてから割っています。"
      },
      {
        "answer": "2",
        "reason": "半径の代わりに直径を使い、底面積が4倍になっています。"
      },
      {
        "answer": "25.12",
        "reason": "底面積の円周率をかけ忘れています。"
      }
    ],
    "authoring": {
      "family": "volume_4",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_volume_032",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "volume",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "底面積45cm²の柱状容器に水が深さ8cmまであります。石を完全に沈めると水面が14cmになりました。水があふれないとき、石の体積は何cm³ですか。",
    "answer": "270",
    "choices": [
      "270",
      "630",
      "360",
      "6"
    ],
    "hints": [
      "石の体積は、水面が上がった部分の体積です。"
    ],
    "explanation": "上昇は14－8＝6cm。45×6＝270cm³です。\n\nほかの選択肢\n・「630」：石を沈めた後の水と石の合計体積です。\n・「360」：初めの水の体積を答えています。\n・「6」：水面が上がった深さだけを答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "630",
        "reason": "石を沈めた後の水と石の合計体積です。"
      },
      {
        "answer": "360",
        "reason": "初めの水の体積を答えています。"
      },
      {
        "answer": "6",
        "reason": "水面が上がった深さだけを答えています。"
      }
    ],
    "authoring": {
      "family": "volume_5",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_volume_033",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "volume",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "底面が底辺9cm、高さ8cmの三角形で、柱の高さが12cmの三角柱です。体積は何cm³ですか。",
    "answer": "432",
    "choices": [
      "864",
      "36",
      "216",
      "432"
    ],
    "hints": [
      "三角形の高さと柱の高さを区別します。"
    ],
    "explanation": "底面積は9×8÷2＝36cm²。それに12をかけ、432cm³です。\n\nほかの選択肢\n・「864」：三角形の底面積を求めるときに2で割っていません。\n・「36」：底面積で止めています。\n・「216」：三角形の面積で2で割った後、もう一度2で割っています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "864",
        "reason": "三角形の底面積を求めるときに2で割っていません。"
      },
      {
        "answer": "36",
        "reason": "底面積で止めています。"
      },
      {
        "answer": "216",
        "reason": "三角形の面積で2で割った後、もう一度2で割っています。"
      }
    ],
    "authoring": {
      "family": "volume_3",
      "parameters": {
        "n": 5
      }
    }
  },
  {
    "id": "math_g6_course_volume_034",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "volume",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "底面の半径7cm、体積1384.74cm³の円柱の高さは何cmですか。円周率は3.14です。",
    "answer": "9",
    "choices": [
      "9/4",
      "28.26",
      "9",
      "18"
    ],
    "hints": [
      "底面積を先に求め、体積÷底面積で高さを求めます。"
    ],
    "explanation": "底面積は153.86cm²。1384.74÷153.86＝9cmです。\n\nほかの選択肢\n・「18」：底面積を半円として半分にしてから割っています。\n・「9/4」：半径の代わりに直径を使い、底面積が4倍になっています。\n・「28.26」：底面積の円周率をかけ忘れています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "18",
        "reason": "底面積を半円として半分にしてから割っています。"
      },
      {
        "answer": "9/4",
        "reason": "半径の代わりに直径を使い、底面積が4倍になっています。"
      },
      {
        "answer": "28.26",
        "reason": "底面積の円周率をかけ忘れています。"
      }
    ],
    "authoring": {
      "family": "volume_4",
      "parameters": {
        "n": 5
      }
    }
  },
  {
    "id": "math_g6_course_volume_035",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "volume",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "底面積50cm²の柱状容器に水が深さ9cmまであります。石を完全に沈めると水面が16cmになりました。水があふれないとき、石の体積は何cm³ですか。",
    "answer": "350",
    "choices": [
      "7",
      "350",
      "800",
      "450"
    ],
    "hints": [
      "石の体積は、水面が上がった部分の体積です。"
    ],
    "explanation": "上昇は16－9＝7cm。50×7＝350cm³です。\n\nほかの選択肢\n・「800」：石を沈めた後の水と石の合計体積です。\n・「450」：初めの水の体積を答えています。\n・「7」：水面が上がった深さだけを答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "800",
        "reason": "石を沈めた後の水と石の合計体積です。"
      },
      {
        "answer": "450",
        "reason": "初めの水の体積を答えています。"
      },
      {
        "answer": "7",
        "reason": "水面が上がった深さだけを答えています。"
      }
    ],
    "authoring": {
      "family": "volume_5",
      "parameters": {
        "n": 5
      }
    }
  },
  {
    "id": "math_g6_course_volume_036",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "volume",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "半径3cm、高さ5cmの円柱3個を溶かして、半径6cmの円柱1個にします。体積が変わらないとき、新しい高さは何cmですか。",
    "answer": "15/4",
    "choices": [
      "15/4",
      "15/2",
      "5/4",
      "15"
    ],
    "hints": [
      "もとの合計体積を求めます。",
      "新しい底面積はもとの4倍です。"
    ],
    "explanation": "新しい高さは、もとの高さ×個数÷底面積の倍率で、5×3÷4＝15/4cmです。\n\nほかの選択肢\n・「15/2」：半径が2倍なら底面積も2倍だとしています。底面積は4倍です。\n・「5/4」：もとの円柱が3個あることを忘れています。\n・「15」：もとの高さを足しただけで、底面積の変化を反映していません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "15/2",
        "reason": "半径が2倍なら底面積も2倍だとしています。底面積は4倍です。"
      },
      {
        "answer": "5/4",
        "reason": "もとの円柱が3個あることを忘れています。"
      },
      {
        "answer": "15",
        "reason": "もとの高さを足しただけで、底面積の変化を反映していません。"
      }
    ],
    "authoring": {
      "family": "volume_6",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_volume_037",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "volume",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "底面積50cm²の柱状容器に水が深さ7cmまであります。石を完全に沈めると水面が10cmになりました。そのまま水を100cm³取り出し、最後に石を取り出します。水の深さは何cmになりますか。水はあふれず、石に付く水は無視します。",
    "answer": "5",
    "choices": [
      "8",
      "7",
      "2",
      "5"
    ],
    "hints": [
      "最後に石はなくなるので、初めの水から取り出した水量を引けば求められます。",
      "取り出した水量÷底面積が、水だけで考えた深さの減少です。"
    ],
    "explanation": "取り出した水は深さ100÷50＝2cm分です。最後は水だけなので、7－2＝5cmです。\n\nほかの選択肢\n・「8」：水を取り出したところで止め、石を取り出した変化を反映していません。\n・「7」：水を取り出した分を無視しています。\n・「2」：最後に石の体積を、水の体積からも余分に引いています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "8",
        "reason": "水を取り出したところで止め、石を取り出した変化を反映していません。"
      },
      {
        "answer": "7",
        "reason": "水を取り出した分を無視しています。"
      },
      {
        "answer": "2",
        "reason": "最後に石の体積を、水の体積からも余分に引いています。"
      }
    ],
    "authoring": {
      "family": "volume_7",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_volume_038",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "volume",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "半径4cm、高さ6cmの円柱3個を溶かして、半径8cmの円柱1個にします。体積が変わらないとき、新しい高さは何cmですか。",
    "answer": "9/2",
    "choices": [
      "3/2",
      "18",
      "9/2",
      "9"
    ],
    "hints": [
      "もとの合計体積を求めます。",
      "新しい底面積はもとの4倍です。"
    ],
    "explanation": "新しい高さは、もとの高さ×個数÷底面積の倍率で、6×3÷4＝9/2cmです。\n\nほかの選択肢\n・「9」：半径が2倍なら底面積も2倍だとしています。底面積は4倍です。\n・「3/2」：もとの円柱が3個あることを忘れています。\n・「18」：もとの高さを足しただけで、底面積の変化を反映していません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "9",
        "reason": "半径が2倍なら底面積も2倍だとしています。底面積は4倍です。"
      },
      {
        "answer": "3/2",
        "reason": "もとの円柱が3個あることを忘れています。"
      },
      {
        "answer": "18",
        "reason": "もとの高さを足しただけで、底面積の変化を反映していません。"
      }
    ],
    "authoring": {
      "family": "volume_6",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_volume_039",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "volume",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "底面積60cm²の柱状容器に水が深さ9cmまであります。石を完全に沈めると水面が13cmになりました。そのまま水を180cm³取り出し、最後に石を取り出します。水の深さは何cmになりますか。水はあふれず、石に付く水は無視します。",
    "answer": "6",
    "choices": [
      "2",
      "6",
      "10",
      "9"
    ],
    "hints": [
      "最後に石はなくなるので、初めの水から取り出した水量を引けば求められます。",
      "取り出した水量÷底面積が、水だけで考えた深さの減少です。"
    ],
    "explanation": "取り出した水は深さ180÷60＝3cm分です。最後は水だけなので、9－3＝6cmです。\n\nほかの選択肢\n・「10」：水を取り出したところで止め、石を取り出した変化を反映していません。\n・「9」：水を取り出した分を無視しています。\n・「2」：最後に石の体積を、水の体積からも余分に引いています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "10",
        "reason": "水を取り出したところで止め、石を取り出した変化を反映していません。"
      },
      {
        "answer": "9",
        "reason": "水を取り出した分を無視しています。"
      },
      {
        "answer": "2",
        "reason": "最後に石の体積を、水の体積からも余分に引いています。"
      }
    ],
    "authoring": {
      "family": "volume_7",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_volume_040",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "volume",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "半径5cm、高さ7cmの円柱3個を溶かして、半径10cmの円柱1個にします。体積が変わらないとき、新しい高さは何cmですか。",
    "answer": "21/4",
    "choices": [
      "21/4",
      "21/2",
      "7/4",
      "21"
    ],
    "hints": [
      "もとの合計体積を求めます。",
      "新しい底面積はもとの4倍です。"
    ],
    "explanation": "新しい高さは、もとの高さ×個数÷底面積の倍率で、7×3÷4＝21/4cmです。\n\nほかの選択肢\n・「21/2」：半径が2倍なら底面積も2倍だとしています。底面積は4倍です。\n・「7/4」：もとの円柱が3個あることを忘れています。\n・「21」：もとの高さを足しただけで、底面積の変化を反映していません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "21/2",
        "reason": "半径が2倍なら底面積も2倍だとしています。底面積は4倍です。"
      },
      {
        "answer": "7/4",
        "reason": "もとの円柱が3個あることを忘れています。"
      },
      {
        "answer": "21",
        "reason": "もとの高さを足しただけで、底面積の変化を反映していません。"
      }
    ],
    "authoring": {
      "family": "volume_6",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_volume_041",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "volume",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "底面積70cm²の柱状容器に水が深さ11cmまであります。石を完全に沈めると水面が16cmになりました。そのまま水を280cm³取り出し、最後に石を取り出します。水の深さは何cmになりますか。水はあふれず、石に付く水は無視します。",
    "answer": "7",
    "choices": [
      "12",
      "11",
      "2",
      "7"
    ],
    "hints": [
      "最後に石はなくなるので、初めの水から取り出した水量を引けば求められます。",
      "取り出した水量÷底面積が、水だけで考えた深さの減少です。"
    ],
    "explanation": "取り出した水は深さ280÷70＝4cm分です。最後は水だけなので、11－4＝7cmです。\n\nほかの選択肢\n・「12」：水を取り出したところで止め、石を取り出した変化を反映していません。\n・「11」：水を取り出した分を無視しています。\n・「2」：最後に石の体積を、水の体積からも余分に引いています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "12",
        "reason": "水を取り出したところで止め、石を取り出した変化を反映していません。"
      },
      {
        "answer": "11",
        "reason": "水を取り出した分を無視しています。"
      },
      {
        "answer": "2",
        "reason": "最後に石の体積を、水の体積からも余分に引いています。"
      }
    ],
    "authoring": {
      "family": "volume_7",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_volume_042",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "volume",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "半径6cm、高さ8cmの円柱3個を溶かして、半径12cmの円柱1個にします。体積が変わらないとき、新しい高さは何cmですか。",
    "answer": "6",
    "choices": [
      "2",
      "24",
      "6",
      "12"
    ],
    "hints": [
      "もとの合計体積を求めます。",
      "新しい底面積はもとの4倍です。"
    ],
    "explanation": "新しい高さは、もとの高さ×個数÷底面積の倍率で、8×3÷4＝6cmです。\n\nほかの選択肢\n・「12」：半径が2倍なら底面積も2倍だとしています。底面積は4倍です。\n・「2」：もとの円柱が3個あることを忘れています。\n・「24」：もとの高さを足しただけで、底面積の変化を反映していません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "12",
        "reason": "半径が2倍なら底面積も2倍だとしています。底面積は4倍です。"
      },
      {
        "answer": "2",
        "reason": "もとの円柱が3個あることを忘れています。"
      },
      {
        "answer": "24",
        "reason": "もとの高さを足しただけで、底面積の変化を反映していません。"
      }
    ],
    "authoring": {
      "family": "volume_6",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_volume_043",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "volume",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "底面積80cm²の柱状容器に水が深さ13cmまであります。石を完全に沈めると水面が19cmになりました。そのまま水を400cm³取り出し、最後に石を取り出します。水の深さは何cmになりますか。水はあふれず、石に付く水は無視します。",
    "answer": "8",
    "choices": [
      "2",
      "8",
      "14",
      "13"
    ],
    "hints": [
      "最後に石はなくなるので、初めの水から取り出した水量を引けば求められます。",
      "取り出した水量÷底面積が、水だけで考えた深さの減少です。"
    ],
    "explanation": "取り出した水は深さ400÷80＝5cm分です。最後は水だけなので、13－5＝8cmです。\n\nほかの選択肢\n・「14」：水を取り出したところで止め、石を取り出した変化を反映していません。\n・「13」：水を取り出した分を無視しています。\n・「2」：最後に石の体積を、水の体積からも余分に引いています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "14",
        "reason": "水を取り出したところで止め、石を取り出した変化を反映していません。"
      },
      {
        "answer": "13",
        "reason": "水を取り出した分を無視しています。"
      },
      {
        "answer": "2",
        "reason": "最後に石の体積を、水の体積からも余分に引いています。"
      }
    ],
    "authoring": {
      "family": "volume_7",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_volume_044",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "volume",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "半径7cm、高さ9cmの円柱3個を溶かして、半径14cmの円柱1個にします。体積が変わらないとき、新しい高さは何cmですか。",
    "answer": "27/4",
    "choices": [
      "27/4",
      "27/2",
      "9/4",
      "27"
    ],
    "hints": [
      "もとの合計体積を求めます。",
      "新しい底面積はもとの4倍です。"
    ],
    "explanation": "新しい高さは、もとの高さ×個数÷底面積の倍率で、9×3÷4＝27/4cmです。\n\nほかの選択肢\n・「27/2」：半径が2倍なら底面積も2倍だとしています。底面積は4倍です。\n・「9/4」：もとの円柱が3個あることを忘れています。\n・「27」：もとの高さを足しただけで、底面積の変化を反映していません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "27/2",
        "reason": "半径が2倍なら底面積も2倍だとしています。底面積は4倍です。"
      },
      {
        "answer": "9/4",
        "reason": "もとの円柱が3個あることを忘れています。"
      },
      {
        "answer": "27",
        "reason": "もとの高さを足しただけで、底面積の変化を反映していません。"
      }
    ],
    "authoring": {
      "family": "volume_6",
      "parameters": {
        "n": 5
      }
    }
  },
  {
    "id": "math_g6_course_volume_045",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "volume",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "底面積90cm²の柱状容器に水が深さ15cmまであります。石を完全に沈めると水面が22cmになりました。そのまま水を540cm³取り出し、最後に石を取り出します。水の深さは何cmになりますか。水はあふれず、石に付く水は無視します。",
    "answer": "9",
    "choices": [
      "16",
      "15",
      "2",
      "9"
    ],
    "hints": [
      "最後に石はなくなるので、初めの水から取り出した水量を引けば求められます。",
      "取り出した水量÷底面積が、水だけで考えた深さの減少です。"
    ],
    "explanation": "取り出した水は深さ540÷90＝6cm分です。最後は水だけなので、15－6＝9cmです。\n\nほかの選択肢\n・「16」：水を取り出したところで止め、石を取り出した変化を反映していません。\n・「15」：水を取り出した分を無視しています。\n・「2」：最後に石の体積を、水の体積からも余分に引いています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "16",
        "reason": "水を取り出したところで止め、石を取り出した変化を反映していません。"
      },
      {
        "answer": "15",
        "reason": "水を取り出した分を無視しています。"
      },
      {
        "answer": "2",
        "reason": "最後に石の体積を、水の体積からも余分に引いています。"
      }
    ],
    "authoring": {
      "family": "volume_7",
      "parameters": {
        "n": 5
      }
    }
  },
  {
    "id": "math_g6_course_proportion_009",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "proportion",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "yはxに比例し、x＝2のときy＝6です。x＝4のとき、yはいくつですか。",
    "answer": "12",
    "choices": [
      "24",
      "8",
      "3",
      "12"
    ],
    "hints": [
      "y÷xで、決まった数を求めます。"
    ],
    "explanation": "比例定数は6÷2＝3。y＝3×4＝12です。\n\nほかの選択肢\n・「24」：x＝2でのyを、そのまま比例定数にしています。\n・「8」：差を足せばよいとして、比例の倍率を使っていません。\n・「3」：比例定数を答え、xをかけていません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "24",
        "reason": "x＝2でのyを、そのまま比例定数にしています。"
      },
      {
        "answer": "8",
        "reason": "差を足せばよいとして、比例の倍率を使っていません。"
      },
      {
        "answer": "3",
        "reason": "比例定数を答え、xをかけていません。"
      }
    ],
    "authoring": {
      "family": "proportion_0",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_proportion_010",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "proportion",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "毎分3Lずつ水を入れます。空の容器に入れ始めて4分後の水量は何Lですか。",
    "answer": "12",
    "choices": [
      "4/3",
      "3",
      "12",
      "7"
    ],
    "hints": [
      "水量＝毎分の水量×時間です。"
    ],
    "explanation": "3×4＝12Lです。\n\nほかの選択肢\n・「7」：1分の水量と時間を足しています。\n・「4/3」：時間を毎分の水量で割っています。\n・「3」：1分分の水量だけを答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "7",
        "reason": "1分の水量と時間を足しています。"
      },
      {
        "answer": "4/3",
        "reason": "時間を毎分の水量で割っています。"
      },
      {
        "answer": "3",
        "reason": "1分分の水量だけを答えています。"
      }
    ],
    "authoring": {
      "family": "proportion_1",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_proportion_011",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "proportion",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "同じ紙40枚の重さは120gです。枚数x枚と重さy gは比例します。1枚当たりの重さは何gですか。",
    "answer": "3",
    "choices": [
      "80",
      "3",
      "1/3",
      "120"
    ],
    "hints": [
      "重さを枚数で割ると1枚当たりになります。"
    ],
    "explanation": "120÷40＝3gです。\n\nほかの選択肢\n・「1/3」：枚数÷重さで、1g当たりの枚数を求めています。\n・「120」：紙の束全体の重さを答えています。\n・「80」：重さから枚数を引いています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "1/3",
        "reason": "枚数÷重さで、1g当たりの枚数を求めています。"
      },
      {
        "answer": "120",
        "reason": "紙の束全体の重さを答えています。"
      },
      {
        "answer": "80",
        "reason": "重さから枚数を引いています。"
      }
    ],
    "authoring": {
      "family": "proportion_2",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_proportion_012",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "proportion",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "yはxに比例し、x＝2のときy＝8です。x＝5のとき、yはいくつですか。",
    "answer": "20",
    "choices": [
      "20",
      "40",
      "11",
      "4"
    ],
    "hints": [
      "y÷xで、決まった数を求めます。"
    ],
    "explanation": "比例定数は8÷2＝4。y＝4×5＝20です。\n\nほかの選択肢\n・「40」：x＝2でのyを、そのまま比例定数にしています。\n・「11」：差を足せばよいとして、比例の倍率を使っていません。\n・「4」：比例定数を答え、xをかけていません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "40",
        "reason": "x＝2でのyを、そのまま比例定数にしています。"
      },
      {
        "answer": "11",
        "reason": "差を足せばよいとして、比例の倍率を使っていません。"
      },
      {
        "answer": "4",
        "reason": "比例定数を答え、xをかけていません。"
      }
    ],
    "authoring": {
      "family": "proportion_0",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_proportion_013",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "proportion",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "毎分4Lずつ水を入れます。空の容器に入れ始めて5分後の水量は何Lですか。",
    "answer": "20",
    "choices": [
      "9",
      "5/4",
      "4",
      "20"
    ],
    "hints": [
      "水量＝毎分の水量×時間です。"
    ],
    "explanation": "4×5＝20Lです。\n\nほかの選択肢\n・「9」：1分の水量と時間を足しています。\n・「5/4」：時間を毎分の水量で割っています。\n・「4」：1分分の水量だけを答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "9",
        "reason": "1分の水量と時間を足しています。"
      },
      {
        "answer": "5/4",
        "reason": "時間を毎分の水量で割っています。"
      },
      {
        "answer": "4",
        "reason": "1分分の水量だけを答えています。"
      }
    ],
    "authoring": {
      "family": "proportion_1",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_proportion_014",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "proportion",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "同じ紙60枚の重さは240gです。枚数x枚と重さy gは比例します。1枚当たりの重さは何gですか。",
    "answer": "4",
    "choices": [
      "240",
      "180",
      "4",
      "1/4"
    ],
    "hints": [
      "重さを枚数で割ると1枚当たりになります。"
    ],
    "explanation": "240÷60＝4gです。\n\nほかの選択肢\n・「1/4」：枚数÷重さで、1g当たりの枚数を求めています。\n・「240」：紙の束全体の重さを答えています。\n・「180」：重さから枚数を引いています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "1/4",
        "reason": "枚数÷重さで、1g当たりの枚数を求めています。"
      },
      {
        "answer": "240",
        "reason": "紙の束全体の重さを答えています。"
      },
      {
        "answer": "180",
        "reason": "重さから枚数を引いています。"
      }
    ],
    "authoring": {
      "family": "proportion_2",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_proportion_015",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "proportion",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "yはxに比例し、x＝2のときy＝10です。x＝6のとき、yはいくつですか。",
    "answer": "30",
    "choices": [
      "5",
      "30",
      "60",
      "14"
    ],
    "hints": [
      "y÷xで、決まった数を求めます。"
    ],
    "explanation": "比例定数は10÷2＝5。y＝5×6＝30です。\n\nほかの選択肢\n・「60」：x＝2でのyを、そのまま比例定数にしています。\n・「14」：差を足せばよいとして、比例の倍率を使っていません。\n・「5」：比例定数を答え、xをかけていません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "60",
        "reason": "x＝2でのyを、そのまま比例定数にしています。"
      },
      {
        "answer": "14",
        "reason": "差を足せばよいとして、比例の倍率を使っていません。"
      },
      {
        "answer": "5",
        "reason": "比例定数を答え、xをかけていません。"
      }
    ],
    "authoring": {
      "family": "proportion_0",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_proportion_016",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "proportion",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "毎分5Lずつ水を入れます。空の容器に入れ始めて6分後の水量は何Lですか。",
    "answer": "30",
    "choices": [
      "30",
      "11",
      "6/5",
      "5"
    ],
    "hints": [
      "水量＝毎分の水量×時間です。"
    ],
    "explanation": "5×6＝30Lです。\n\nほかの選択肢\n・「11」：1分の水量と時間を足しています。\n・「6/5」：時間を毎分の水量で割っています。\n・「5」：1分分の水量だけを答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "11",
        "reason": "1分の水量と時間を足しています。"
      },
      {
        "answer": "6/5",
        "reason": "時間を毎分の水量で割っています。"
      },
      {
        "answer": "5",
        "reason": "1分分の水量だけを答えています。"
      }
    ],
    "authoring": {
      "family": "proportion_1",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_proportion_017",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "proportion",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "同じ紙80枚の重さは400gです。枚数x枚と重さy gは比例します。1枚当たりの重さは何gですか。",
    "answer": "5",
    "choices": [
      "1/5",
      "400",
      "320",
      "5"
    ],
    "hints": [
      "重さを枚数で割ると1枚当たりになります。"
    ],
    "explanation": "400÷80＝5gです。\n\nほかの選択肢\n・「1/5」：枚数÷重さで、1g当たりの枚数を求めています。\n・「400」：紙の束全体の重さを答えています。\n・「320」：重さから枚数を引いています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "1/5",
        "reason": "枚数÷重さで、1g当たりの枚数を求めています。"
      },
      {
        "answer": "400",
        "reason": "紙の束全体の重さを答えています。"
      },
      {
        "answer": "320",
        "reason": "重さから枚数を引いています。"
      }
    ],
    "authoring": {
      "family": "proportion_2",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_proportion_018",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "proportion",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "yはxに比例し、x＝2のときy＝12です。x＝7のとき、yはいくつですか。",
    "answer": "42",
    "choices": [
      "17",
      "6",
      "42",
      "84"
    ],
    "hints": [
      "y÷xで、決まった数を求めます。"
    ],
    "explanation": "比例定数は12÷2＝6。y＝6×7＝42です。\n\nほかの選択肢\n・「84」：x＝2でのyを、そのまま比例定数にしています。\n・「17」：差を足せばよいとして、比例の倍率を使っていません。\n・「6」：比例定数を答え、xをかけていません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "84",
        "reason": "x＝2でのyを、そのまま比例定数にしています。"
      },
      {
        "answer": "17",
        "reason": "差を足せばよいとして、比例の倍率を使っていません。"
      },
      {
        "answer": "6",
        "reason": "比例定数を答え、xをかけていません。"
      }
    ],
    "authoring": {
      "family": "proportion_0",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_proportion_019",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "proportion",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "毎分6Lずつ水を入れます。空の容器に入れ始めて7分後の水量は何Lですか。",
    "answer": "42",
    "choices": [
      "6",
      "42",
      "13",
      "7/6"
    ],
    "hints": [
      "水量＝毎分の水量×時間です。"
    ],
    "explanation": "6×7＝42Lです。\n\nほかの選択肢\n・「13」：1分の水量と時間を足しています。\n・「7/6」：時間を毎分の水量で割っています。\n・「6」：1分分の水量だけを答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "13",
        "reason": "1分の水量と時間を足しています。"
      },
      {
        "answer": "7/6",
        "reason": "時間を毎分の水量で割っています。"
      },
      {
        "answer": "6",
        "reason": "1分分の水量だけを答えています。"
      }
    ],
    "authoring": {
      "family": "proportion_1",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_proportion_020",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "proportion",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "同じ紙100枚の重さは600gです。枚数x枚と重さy gは比例します。1枚当たりの重さは何gですか。",
    "answer": "6",
    "choices": [
      "6",
      "1/6",
      "600",
      "500"
    ],
    "hints": [
      "重さを枚数で割ると1枚当たりになります。"
    ],
    "explanation": "600÷100＝6gです。\n\nほかの選択肢\n・「1/6」：枚数÷重さで、1g当たりの枚数を求めています。\n・「600」：紙の束全体の重さを答えています。\n・「500」：重さから枚数を引いています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "1/6",
        "reason": "枚数÷重さで、1g当たりの枚数を求めています。"
      },
      {
        "answer": "600",
        "reason": "紙の束全体の重さを答えています。"
      },
      {
        "answer": "500",
        "reason": "重さから枚数を引いています。"
      }
    ],
    "authoring": {
      "family": "proportion_2",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_proportion_021",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "proportion",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "グラフのように、空の{水槽|すいそう}に一定の速さで水を入れます。3分後の水量は何Lですか。",
    "answer": "9",
    "choices": [
      "6",
      "12",
      "3",
      "9"
    ],
    "hints": [
      "横軸で指定された時間を見つけ、真上のグラフを読みます。"
    ],
    "explanation": "1分で3Lなので、3分では3×3＝9Lです。\n\nほかの選択肢\n・「6」：1つ左の時間の水量を読んでいます。\n・「12」：1つ右の時間の水量を読んでいます。\n・「3」：横軸の時間を水量として答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "6",
        "reason": "1つ左の時間の水量を読んでいます。"
      },
      {
        "answer": "12",
        "reason": "1つ右の時間の水量を読んでいます。"
      },
      {
        "answer": "3",
        "reason": "横軸の時間を水量として答えています。"
      }
    ],
    "authoring": {
      "family": "proportion_3",
      "parameters": {
        "n": 1
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-proportion_3-1.svg",
      "caption": "時間（分）は大目盛り1ごと、水量（L）は大目盛り3ごと。補助目盛りは横0.5、縦1です。",
      "alt": "時間（分）は大目盛り1ごと、水量（L）は大目盛り3ごと。補助目盛りは横0.5、縦1です。"
    }
  },
  {
    "id": "math_g6_course_proportion_022",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "proportion",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "同じ針金4mの重さが24gです。重さ36gの針金は何mですか。",
    "answer": "6",
    "choices": [
      "216",
      "4",
      "6",
      "3/2"
    ],
    "hints": [
      "1mの重さを求め、全体の重さをそれで割ります。"
    ],
    "explanation": "1mは24÷4＝6g。36÷6＝6mです。\n\nほかの選択肢\n・「3/2」：重さの倍率だけを答えています。\n・「216」：1mの重さで割る代わりにかけています。\n・「4」：もとの長さをそのまま答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "3/2",
        "reason": "重さの倍率だけを答えています。"
      },
      {
        "answer": "216",
        "reason": "1mの重さで割る代わりにかけています。"
      },
      {
        "answer": "4",
        "reason": "もとの長さをそのまま答えています。"
      }
    ],
    "authoring": {
      "family": "proportion_4",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_proportion_023",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "proportion",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "xとyは比例します。xが3から6になるとyが9増えました。x＝8のとき、yはいくつですか。",
    "answer": "24",
    "choices": [
      "15",
      "24",
      "72",
      "9"
    ],
    "hints": [
      "yの増加量÷xの増加量で比例定数を求めます。"
    ],
    "explanation": "比例定数は9÷3＝3。y＝3×8＝24です。\n\nほかの選択肢\n・「72」：yの増加量を比例定数としています。\n・「9」：yの増加量だけを答えています。\n・「15」：最初のxからの増加分だけを求めています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "72",
        "reason": "yの増加量を比例定数としています。"
      },
      {
        "answer": "9",
        "reason": "yの増加量だけを答えています。"
      },
      {
        "answer": "15",
        "reason": "最初のxからの増加分だけを求めています。"
      }
    ],
    "authoring": {
      "family": "proportion_5",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_proportion_024",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "proportion",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "グラフのように、空の{水槽|すいそう}に一定の速さで水を入れます。4分後の水量は何Lですか。",
    "answer": "16",
    "choices": [
      "16",
      "12",
      "20",
      "4"
    ],
    "hints": [
      "横軸で指定された時間を見つけ、真上のグラフを読みます。"
    ],
    "explanation": "1分で4Lなので、4分では4×4＝16Lです。\n\nほかの選択肢\n・「12」：1つ左の時間の水量を読んでいます。\n・「20」：1つ右の時間の水量を読んでいます。\n・「4」：横軸の時間を水量として答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "12",
        "reason": "1つ左の時間の水量を読んでいます。"
      },
      {
        "answer": "20",
        "reason": "1つ右の時間の水量を読んでいます。"
      },
      {
        "answer": "4",
        "reason": "横軸の時間を水量として答えています。"
      }
    ],
    "authoring": {
      "family": "proportion_3",
      "parameters": {
        "n": 2
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-proportion_3-2.svg",
      "caption": "時間（分）は大目盛り1ごと、水量（L）は大目盛り4ごと。補助目盛りは横0.5、縦1です。",
      "alt": "時間（分）は大目盛り1ごと、水量（L）は大目盛り4ごと。補助目盛りは横0.5、縦1です。"
    }
  },
  {
    "id": "math_g6_course_proportion_025",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "proportion",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "同じ針金5mの重さが35gです。重さ49gの針金は何mですか。",
    "answer": "7",
    "choices": [
      "7/5",
      "343",
      "5",
      "7"
    ],
    "hints": [
      "1mの重さを求め、全体の重さをそれで割ります。"
    ],
    "explanation": "1mは35÷5＝7g。49÷7＝7mです。\n\nほかの選択肢\n・「7/5」：重さの倍率だけを答えています。\n・「343」：1mの重さで割る代わりにかけています。\n・「5」：もとの長さをそのまま答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "7/5",
        "reason": "重さの倍率だけを答えています。"
      },
      {
        "answer": "343",
        "reason": "1mの重さで割る代わりにかけています。"
      },
      {
        "answer": "5",
        "reason": "もとの長さをそのまま答えています。"
      }
    ],
    "authoring": {
      "family": "proportion_4",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_proportion_026",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "proportion",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "xとyは比例します。xが4から7になるとyが12増えました。x＝9のとき、yはいくつですか。",
    "answer": "36",
    "choices": [
      "12",
      "20",
      "36",
      "108"
    ],
    "hints": [
      "yの増加量÷xの増加量で比例定数を求めます。"
    ],
    "explanation": "比例定数は12÷3＝4。y＝4×9＝36です。\n\nほかの選択肢\n・「108」：yの増加量を比例定数としています。\n・「12」：yの増加量だけを答えています。\n・「20」：最初のxからの増加分だけを求めています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "108",
        "reason": "yの増加量を比例定数としています。"
      },
      {
        "answer": "12",
        "reason": "yの増加量だけを答えています。"
      },
      {
        "answer": "20",
        "reason": "最初のxからの増加分だけを求めています。"
      }
    ],
    "authoring": {
      "family": "proportion_5",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_proportion_027",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "proportion",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "グラフのように、空の{水槽|すいそう}に一定の速さで水を入れます。5分後の水量は何Lですか。",
    "answer": "25",
    "choices": [
      "5",
      "25",
      "20",
      "30"
    ],
    "hints": [
      "横軸で指定された時間を見つけ、真上のグラフを読みます。"
    ],
    "explanation": "1分で5Lなので、5分では5×5＝25Lです。\n\nほかの選択肢\n・「20」：1つ左の時間の水量を読んでいます。\n・「30」：1つ右の時間の水量を読んでいます。\n・「5」：横軸の時間を水量として答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "20",
        "reason": "1つ左の時間の水量を読んでいます。"
      },
      {
        "answer": "30",
        "reason": "1つ右の時間の水量を読んでいます。"
      },
      {
        "answer": "5",
        "reason": "横軸の時間を水量として答えています。"
      }
    ],
    "authoring": {
      "family": "proportion_3",
      "parameters": {
        "n": 3
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-proportion_3-3.svg",
      "caption": "時間（分）は大目盛り1ごと、水量（L）は大目盛り5ごと。補助目盛りは横0.5、縦1です。",
      "alt": "時間（分）は大目盛り1ごと、水量（L）は大目盛り5ごと。補助目盛りは横0.5、縦1です。"
    }
  },
  {
    "id": "math_g6_course_proportion_028",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "proportion",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "同じ針金6mの重さが48gです。重さ64gの針金は何mですか。",
    "answer": "8",
    "choices": [
      "8",
      "4/3",
      "512",
      "6"
    ],
    "hints": [
      "1mの重さを求め、全体の重さをそれで割ります。"
    ],
    "explanation": "1mは48÷6＝8g。64÷8＝8mです。\n\nほかの選択肢\n・「4/3」：重さの倍率だけを答えています。\n・「512」：1mの重さで割る代わりにかけています。\n・「6」：もとの長さをそのまま答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "4/3",
        "reason": "重さの倍率だけを答えています。"
      },
      {
        "answer": "512",
        "reason": "1mの重さで割る代わりにかけています。"
      },
      {
        "answer": "6",
        "reason": "もとの長さをそのまま答えています。"
      }
    ],
    "authoring": {
      "family": "proportion_4",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_proportion_029",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "proportion",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "xとyは比例します。xが5から8になるとyが15増えました。x＝10のとき、yはいくつですか。",
    "answer": "50",
    "choices": [
      "150",
      "15",
      "25",
      "50"
    ],
    "hints": [
      "yの増加量÷xの増加量で比例定数を求めます。"
    ],
    "explanation": "比例定数は15÷3＝5。y＝5×10＝50です。\n\nほかの選択肢\n・「150」：yの増加量を比例定数としています。\n・「15」：yの増加量だけを答えています。\n・「25」：最初のxからの増加分だけを求めています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "150",
        "reason": "yの増加量を比例定数としています。"
      },
      {
        "answer": "15",
        "reason": "yの増加量だけを答えています。"
      },
      {
        "answer": "25",
        "reason": "最初のxからの増加分だけを求めています。"
      }
    ],
    "authoring": {
      "family": "proportion_5",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_proportion_030",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "proportion",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "グラフのように、空の{水槽|すいそう}に一定の速さで水を入れます。6分後の水量は何Lですか。",
    "answer": "36",
    "choices": [
      "42",
      "6",
      "36",
      "30"
    ],
    "hints": [
      "横軸で指定された時間を見つけ、真上のグラフを読みます。"
    ],
    "explanation": "1分で6Lなので、6分では6×6＝36Lです。\n\nほかの選択肢\n・「30」：1つ左の時間の水量を読んでいます。\n・「42」：1つ右の時間の水量を読んでいます。\n・「6」：横軸の時間を水量として答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "30",
        "reason": "1つ左の時間の水量を読んでいます。"
      },
      {
        "answer": "42",
        "reason": "1つ右の時間の水量を読んでいます。"
      },
      {
        "answer": "6",
        "reason": "横軸の時間を水量として答えています。"
      }
    ],
    "authoring": {
      "family": "proportion_3",
      "parameters": {
        "n": 4
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-proportion_3-4.svg",
      "caption": "時間（分）は大目盛り1ごと、水量（L）は大目盛り6ごと。補助目盛りは横0.5、縦1です。",
      "alt": "時間（分）は大目盛り1ごと、水量（L）は大目盛り6ごと。補助目盛りは横0.5、縦1です。"
    }
  },
  {
    "id": "math_g6_course_proportion_031",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "proportion",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "同じ針金7mの重さが63gです。重さ81gの針金は何mですか。",
    "answer": "9",
    "choices": [
      "7",
      "9",
      "9/7",
      "729"
    ],
    "hints": [
      "1mの重さを求め、全体の重さをそれで割ります。"
    ],
    "explanation": "1mは63÷7＝9g。81÷9＝9mです。\n\nほかの選択肢\n・「9/7」：重さの倍率だけを答えています。\n・「729」：1mの重さで割る代わりにかけています。\n・「7」：もとの長さをそのまま答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "9/7",
        "reason": "重さの倍率だけを答えています。"
      },
      {
        "answer": "729",
        "reason": "1mの重さで割る代わりにかけています。"
      },
      {
        "answer": "7",
        "reason": "もとの長さをそのまま答えています。"
      }
    ],
    "authoring": {
      "family": "proportion_4",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_proportion_032",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "proportion",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "xとyは比例します。xが6から9になるとyが18増えました。x＝11のとき、yはいくつですか。",
    "answer": "66",
    "choices": [
      "66",
      "198",
      "18",
      "30"
    ],
    "hints": [
      "yの増加量÷xの増加量で比例定数を求めます。"
    ],
    "explanation": "比例定数は18÷3＝6。y＝6×11＝66です。\n\nほかの選択肢\n・「198」：yの増加量を比例定数としています。\n・「18」：yの増加量だけを答えています。\n・「30」：最初のxからの増加分だけを求めています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "198",
        "reason": "yの増加量を比例定数としています。"
      },
      {
        "answer": "18",
        "reason": "yの増加量だけを答えています。"
      },
      {
        "answer": "30",
        "reason": "最初のxからの増加分だけを求めています。"
      }
    ],
    "authoring": {
      "family": "proportion_5",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_proportion_033",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "proportion",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "グラフのように、空の{水槽|すいそう}に一定の速さで水を入れます。7分後の水量は何Lですか。",
    "answer": "49",
    "choices": [
      "42",
      "56",
      "7",
      "49"
    ],
    "hints": [
      "横軸で指定された時間を見つけ、真上のグラフを読みます。"
    ],
    "explanation": "1分で7Lなので、7分では7×7＝49Lです。\n\nほかの選択肢\n・「42」：1つ左の時間の水量を読んでいます。\n・「56」：1つ右の時間の水量を読んでいます。\n・「7」：横軸の時間を水量として答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "42",
        "reason": "1つ左の時間の水量を読んでいます。"
      },
      {
        "answer": "56",
        "reason": "1つ右の時間の水量を読んでいます。"
      },
      {
        "answer": "7",
        "reason": "横軸の時間を水量として答えています。"
      }
    ],
    "authoring": {
      "family": "proportion_3",
      "parameters": {
        "n": 5
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-proportion_3-5.svg",
      "caption": "時間（分）は大目盛り1ごと、水量（L）は大目盛り7ごと。補助目盛りは横0.5、縦1です。",
      "alt": "時間（分）は大目盛り1ごと、水量（L）は大目盛り7ごと。補助目盛りは横0.5、縦1です。"
    }
  },
  {
    "id": "math_g6_course_proportion_034",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "proportion",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "同じ針金8mの重さが80gです。重さ100gの針金は何mですか。",
    "answer": "10",
    "choices": [
      "1000",
      "8",
      "10",
      "5/4"
    ],
    "hints": [
      "1mの重さを求め、全体の重さをそれで割ります。"
    ],
    "explanation": "1mは80÷8＝10g。100÷10＝10mです。\n\nほかの選択肢\n・「5/4」：重さの倍率だけを答えています。\n・「1000」：1mの重さで割る代わりにかけています。\n・「8」：もとの長さをそのまま答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "5/4",
        "reason": "重さの倍率だけを答えています。"
      },
      {
        "answer": "1000",
        "reason": "1mの重さで割る代わりにかけています。"
      },
      {
        "answer": "8",
        "reason": "もとの長さをそのまま答えています。"
      }
    ],
    "authoring": {
      "family": "proportion_4",
      "parameters": {
        "n": 5
      }
    }
  },
  {
    "id": "math_g6_course_proportion_035",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "proportion",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "xとyは比例します。xが7から10になるとyが21増えました。x＝12のとき、yはいくつですか。",
    "answer": "84",
    "choices": [
      "35",
      "84",
      "252",
      "21"
    ],
    "hints": [
      "yの増加量÷xの増加量で比例定数を求めます。"
    ],
    "explanation": "比例定数は21÷3＝7。y＝7×12＝84です。\n\nほかの選択肢\n・「252」：yの増加量を比例定数としています。\n・「21」：yの増加量だけを答えています。\n・「35」：最初のxからの増加分だけを求めています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "252",
        "reason": "yの増加量を比例定数としています。"
      },
      {
        "answer": "21",
        "reason": "yの増加量だけを答えています。"
      },
      {
        "answer": "35",
        "reason": "最初のxからの増加分だけを求めています。"
      }
    ],
    "authoring": {
      "family": "proportion_5",
      "parameters": {
        "n": 5
      }
    }
  },
  {
    "id": "math_g6_course_proportion_036",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "proportion",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "同じ紙70枚だけの重さは280gです。この紙を袋に入れると、袋こみで412gでした。袋は12gです。袋の中の紙は何枚ですか。",
    "answer": "100",
    "choices": [
      "100",
      "103",
      "106",
      "70"
    ],
    "hints": [
      "紙1枚の重さを求めます。",
      "袋を除いた紙だけの重さを、1枚の重さで割ります。"
    ],
    "explanation": "1枚は280÷70＝4g。(412－12)÷4＝100枚です。\n\nほかの選択肢\n・「103」：袋の重さを引いていません。\n・「106」：袋の重さを引く代わりに足しています。\n・「70」：初めに重さを調べた束の枚数を、そのまま答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "103",
        "reason": "袋の重さを引いていません。"
      },
      {
        "answer": "106",
        "reason": "袋の重さを引く代わりに足しています。"
      },
      {
        "answer": "70",
        "reason": "初めに重さを調べた束の枚数を、そのまま答えています。"
      }
    ],
    "authoring": {
      "family": "proportion_6",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_proportion_037",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "proportion",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "空の{水槽|すいそう}に、毎分3Lの管Aと毎分5Lの管Bから同時に水を入れます。120Lになるのは何分後ですか。",
    "answer": "15",
    "choices": [
      "40",
      "24",
      "64",
      "15"
    ],
    "hints": [
      "2本が1分間に入れる水量を合わせます。",
      "目標の水量を、2本合わせた毎分の量で割ります。"
    ],
    "explanation": "毎分8L入るので、120÷8＝15分です。\n\nほかの選択肢\n・「40」：管Aだけで入れる時間を求めています。\n・「24」：管Bだけで入れる時間を求めています。\n・「64」：別々にかかる時間を足しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "40",
        "reason": "管Aだけで入れる時間を求めています。"
      },
      {
        "answer": "24",
        "reason": "管Bだけで入れる時間を求めています。"
      },
      {
        "answer": "64",
        "reason": "別々にかかる時間を足しています。"
      }
    ],
    "authoring": {
      "family": "proportion_7",
      "parameters": {
        "n": 1
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-proportion_7-1.svg",
      "caption": "時間（分）は大目盛り4ごと、水量（L）は大目盛り32ごと。補助目盛りは横4、縦8です。",
      "alt": "時間（分）は大目盛り4ごと、水量（L）は大目盛り32ごと。補助目盛りは横4、縦8です。"
    }
  },
  {
    "id": "math_g6_course_proportion_038",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "proportion",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "同じ紙80枚だけの重さは400gです。この紙を袋に入れると、袋こみで570gでした。袋は20gです。袋の中の紙は何枚ですか。",
    "answer": "110",
    "choices": [
      "118",
      "80",
      "110",
      "114"
    ],
    "hints": [
      "紙1枚の重さを求めます。",
      "袋を除いた紙だけの重さを、1枚の重さで割ります。"
    ],
    "explanation": "1枚は400÷80＝5g。(570－20)÷5＝110枚です。\n\nほかの選択肢\n・「114」：袋の重さを引いていません。\n・「118」：袋の重さを引く代わりに足しています。\n・「80」：初めに重さを調べた束の枚数を、そのまま答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "114",
        "reason": "袋の重さを引いていません。"
      },
      {
        "answer": "118",
        "reason": "袋の重さを引く代わりに足しています。"
      },
      {
        "answer": "80",
        "reason": "初めに重さを調べた束の枚数を、そのまま答えています。"
      }
    ],
    "authoring": {
      "family": "proportion_6",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_proportion_039",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "proportion",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "空の{水槽|すいそう}に、毎分4Lの管Aと毎分6Lの管Bから同時に水を入れます。180Lになるのは何分後ですか。",
    "answer": "18",
    "choices": [
      "75",
      "18",
      "45",
      "30"
    ],
    "hints": [
      "2本が1分間に入れる水量を合わせます。",
      "目標の水量を、2本合わせた毎分の量で割ります。"
    ],
    "explanation": "毎分10L入るので、180÷10＝18分です。\n\nほかの選択肢\n・「45」：管Aだけで入れる時間を求めています。\n・「30」：管Bだけで入れる時間を求めています。\n・「75」：別々にかかる時間を足しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "45",
        "reason": "管Aだけで入れる時間を求めています。"
      },
      {
        "answer": "30",
        "reason": "管Bだけで入れる時間を求めています。"
      },
      {
        "answer": "75",
        "reason": "別々にかかる時間を足しています。"
      }
    ],
    "authoring": {
      "family": "proportion_7",
      "parameters": {
        "n": 2
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-proportion_7-2.svg",
      "caption": "時間（分）は大目盛り4ごと、水量（L）は大目盛り40ごと。補助目盛りは横4、縦10です。",
      "alt": "時間（分）は大目盛り4ごと、水量（L）は大目盛り40ごと。補助目盛りは横4、縦10です。"
    }
  },
  {
    "id": "math_g6_course_proportion_040",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "proportion",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "同じ紙90枚だけの重さは540gです。この紙を袋に入れると、袋こみで750gでした。袋は30gです。袋の中の紙は何枚ですか。",
    "answer": "120",
    "choices": [
      "120",
      "125",
      "130",
      "90"
    ],
    "hints": [
      "紙1枚の重さを求めます。",
      "袋を除いた紙だけの重さを、1枚の重さで割ります。"
    ],
    "explanation": "1枚は540÷90＝6g。(750－30)÷6＝120枚です。\n\nほかの選択肢\n・「125」：袋の重さを引いていません。\n・「130」：袋の重さを引く代わりに足しています。\n・「90」：初めに重さを調べた束の枚数を、そのまま答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "125",
        "reason": "袋の重さを引いていません。"
      },
      {
        "answer": "130",
        "reason": "袋の重さを引く代わりに足しています。"
      },
      {
        "answer": "90",
        "reason": "初めに重さを調べた束の枚数を、そのまま答えています。"
      }
    ],
    "authoring": {
      "family": "proportion_6",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_proportion_041",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "proportion",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "空の{水槽|すいそう}に、毎分5Lの管Aと毎分7Lの管Bから同時に水を入れます。240Lになるのは何分後ですか。",
    "answer": "20",
    "choices": [
      "48",
      "240/7",
      "576/7",
      "20"
    ],
    "hints": [
      "2本が1分間に入れる水量を合わせます。",
      "目標の水量を、2本合わせた毎分の量で割ります。"
    ],
    "explanation": "毎分12L入るので、240÷12＝20分です。\n\nほかの選択肢\n・「48」：管Aだけで入れる時間を求めています。\n・「240/7」：管Bだけで入れる時間を求めています。\n・「576/7」：別々にかかる時間を足しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "48",
        "reason": "管Aだけで入れる時間を求めています。"
      },
      {
        "answer": "240/7",
        "reason": "管Bだけで入れる時間を求めています。"
      },
      {
        "answer": "576/7",
        "reason": "別々にかかる時間を足しています。"
      }
    ],
    "authoring": {
      "family": "proportion_7",
      "parameters": {
        "n": 3
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-proportion_7-3.svg",
      "caption": "時間（分）は大目盛り4ごと、水量（L）は大目盛り48ごと。補助目盛りは横4、縦12です。",
      "alt": "時間（分）は大目盛り4ごと、水量（L）は大目盛り48ごと。補助目盛りは横4、縦12です。"
    }
  },
  {
    "id": "math_g6_course_proportion_042",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "proportion",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "同じ紙100枚だけの重さは700gです。この紙を袋に入れると、袋こみで952gでした。袋は42gです。袋の中の紙は何枚ですか。",
    "answer": "130",
    "choices": [
      "142",
      "100",
      "130",
      "136"
    ],
    "hints": [
      "紙1枚の重さを求めます。",
      "袋を除いた紙だけの重さを、1枚の重さで割ります。"
    ],
    "explanation": "1枚は700÷100＝7g。(952－42)÷7＝130枚です。\n\nほかの選択肢\n・「136」：袋の重さを引いていません。\n・「142」：袋の重さを引く代わりに足しています。\n・「100」：初めに重さを調べた束の枚数を、そのまま答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "136",
        "reason": "袋の重さを引いていません。"
      },
      {
        "answer": "142",
        "reason": "袋の重さを引く代わりに足しています。"
      },
      {
        "answer": "100",
        "reason": "初めに重さを調べた束の枚数を、そのまま答えています。"
      }
    ],
    "authoring": {
      "family": "proportion_6",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_proportion_043",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "proportion",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "空の{水槽|すいそう}に、毎分6Lの管Aと毎分8Lの管Bから同時に水を入れます。300Lになるのは何分後ですか。",
    "answer": "150/7",
    "choices": [
      "175/2",
      "150/7",
      "50",
      "75/2"
    ],
    "hints": [
      "2本が1分間に入れる水量を合わせます。",
      "目標の水量を、2本合わせた毎分の量で割ります。"
    ],
    "explanation": "毎分14L入るので、300÷14＝150/7分です。\n\nほかの選択肢\n・「50」：管Aだけで入れる時間を求めています。\n・「75/2」：管Bだけで入れる時間を求めています。\n・「175/2」：別々にかかる時間を足しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "50",
        "reason": "管Aだけで入れる時間を求めています。"
      },
      {
        "answer": "75/2",
        "reason": "管Bだけで入れる時間を求めています。"
      },
      {
        "answer": "175/2",
        "reason": "別々にかかる時間を足しています。"
      }
    ],
    "authoring": {
      "family": "proportion_7",
      "parameters": {
        "n": 4
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-proportion_7-4.svg",
      "caption": "時間（分）は大目盛り4ごと、水量（L）は大目盛り56ごと。補助目盛りは横4、縦14です。",
      "alt": "時間（分）は大目盛り4ごと、水量（L）は大目盛り56ごと。補助目盛りは横4、縦14です。"
    }
  },
  {
    "id": "math_g6_course_proportion_044",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "proportion",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "同じ紙110枚だけの重さは880gです。この紙を袋に入れると、袋こみで1176gでした。袋は56gです。袋の中の紙は何枚ですか。",
    "answer": "140",
    "choices": [
      "140",
      "147",
      "154",
      "110"
    ],
    "hints": [
      "紙1枚の重さを求めます。",
      "袋を除いた紙だけの重さを、1枚の重さで割ります。"
    ],
    "explanation": "1枚は880÷110＝8g。(1176－56)÷8＝140枚です。\n\nほかの選択肢\n・「147」：袋の重さを引いていません。\n・「154」：袋の重さを引く代わりに足しています。\n・「110」：初めに重さを調べた束の枚数を、そのまま答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "147",
        "reason": "袋の重さを引いていません。"
      },
      {
        "answer": "154",
        "reason": "袋の重さを引く代わりに足しています。"
      },
      {
        "answer": "110",
        "reason": "初めに重さを調べた束の枚数を、そのまま答えています。"
      }
    ],
    "authoring": {
      "family": "proportion_6",
      "parameters": {
        "n": 5
      }
    }
  },
  {
    "id": "math_g6_course_proportion_045",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "proportion",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "空の{水槽|すいそう}に、毎分7Lの管Aと毎分9Lの管Bから同時に水を入れます。360Lになるのは何分後ですか。",
    "answer": "45/2",
    "choices": [
      "360/7",
      "40",
      "640/7",
      "45/2"
    ],
    "hints": [
      "2本が1分間に入れる水量を合わせます。",
      "目標の水量を、2本合わせた毎分の量で割ります。"
    ],
    "explanation": "毎分16L入るので、360÷16＝45/2分です。\n\nほかの選択肢\n・「360/7」：管Aだけで入れる時間を求めています。\n・「40」：管Bだけで入れる時間を求めています。\n・「640/7」：別々にかかる時間を足しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "360/7",
        "reason": "管Aだけで入れる時間を求めています。"
      },
      {
        "answer": "40",
        "reason": "管Bだけで入れる時間を求めています。"
      },
      {
        "answer": "640/7",
        "reason": "別々にかかる時間を足しています。"
      }
    ],
    "authoring": {
      "family": "proportion_7",
      "parameters": {
        "n": 5
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-proportion_7-5.svg",
      "caption": "時間（分）は大目盛り4ごと、水量（L）は大目盛り64ごと。補助目盛りは横4、縦16です。",
      "alt": "時間（分）は大目盛り4ごと、水量（L）は大目盛り64ごと。補助目盛りは横4、縦16です。"
    }
  },
  {
    "id": "math_g6_course_inverse_009",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "inverse",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "yはxに反比例し、x＝3のときy＝12です。一定になる積x×yはいくつですか。",
    "answer": "36",
    "choices": [
      "4",
      "15",
      "12",
      "36"
    ],
    "hints": [
      "反比例では、対応するxとyの積が一定です。"
    ],
    "explanation": "3×12＝36です。\n\nほかの選択肢\n・「4」：yをxで割り、比例定数のように考えています。\n・「15」：xとyを足しています。\n・「12」：yの値をそのまま答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "4",
        "reason": "yをxで割り、比例定数のように考えています。"
      },
      {
        "answer": "15",
        "reason": "xとyを足しています。"
      },
      {
        "answer": "12",
        "reason": "yの値をそのまま答えています。"
      }
    ],
    "authoring": {
      "family": "inverse_0",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_inverse_010",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "inverse",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "y＝24÷xです。x＝3のとき、yはいくつですか。",
    "answer": "8",
    "choices": [
      "21",
      "27",
      "8",
      "72"
    ],
    "hints": [
      "式のxを指定の値に置き換えます。"
    ],
    "explanation": "24÷3＝8です。\n\nほかの選択肢\n・「72」：割る代わりにかけています。\n・「21」：割る代わりに引いています。\n・「27」：割る代わりに足しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "72",
        "reason": "割る代わりにかけています。"
      },
      {
        "answer": "21",
        "reason": "割る代わりに引いています。"
      },
      {
        "answer": "27",
        "reason": "割る代わりに足しています。"
      }
    ],
    "authoring": {
      "family": "inverse_1",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_inverse_011",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "inverse",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "xとyは反比例しています。xが3倍になるとyは何倍になりますか。分数は約分して答えます。",
    "answer": "1/3",
    "choices": [
      "1",
      "1/3",
      "3",
      "9"
    ],
    "hints": [
      "xとyの積が変わらないように考えます。"
    ],
    "explanation": "xが3倍ならyを3で割るので、1/3倍です。\n\nほかの選択肢\n・「3」：比例の変わり方と混同しています。\n・「9」：倍率を2回かけています。\n・「1」：積が一定になるための変化を反映していません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "3",
        "reason": "比例の変わり方と混同しています。"
      },
      {
        "answer": "9",
        "reason": "倍率を2回かけています。"
      },
      {
        "answer": "1",
        "reason": "積が一定になるための変化を反映していません。"
      }
    ],
    "authoring": {
      "family": "inverse_2",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_inverse_012",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "inverse",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "yはxに反比例し、x＝3のときy＝16です。一定になる積x×yはいくつですか。",
    "answer": "48",
    "choices": [
      "48",
      "16/3",
      "19",
      "16"
    ],
    "hints": [
      "反比例では、対応するxとyの積が一定です。"
    ],
    "explanation": "3×16＝48です。\n\nほかの選択肢\n・「16/3」：yをxで割り、比例定数のように考えています。\n・「19」：xとyを足しています。\n・「16」：yの値をそのまま答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "16/3",
        "reason": "yをxで割り、比例定数のように考えています。"
      },
      {
        "answer": "19",
        "reason": "xとyを足しています。"
      },
      {
        "answer": "16",
        "reason": "yの値をそのまま答えています。"
      }
    ],
    "authoring": {
      "family": "inverse_0",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_inverse_013",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "inverse",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "y＝30÷xです。x＝3のとき、yはいくつですか。",
    "answer": "10",
    "choices": [
      "90",
      "27",
      "33",
      "10"
    ],
    "hints": [
      "式のxを指定の値に置き換えます。"
    ],
    "explanation": "30÷3＝10です。\n\nほかの選択肢\n・「90」：割る代わりにかけています。\n・「27」：割る代わりに引いています。\n・「33」：割る代わりに足しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "90",
        "reason": "割る代わりにかけています。"
      },
      {
        "answer": "27",
        "reason": "割る代わりに引いています。"
      },
      {
        "answer": "33",
        "reason": "割る代わりに足しています。"
      }
    ],
    "authoring": {
      "family": "inverse_1",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_inverse_014",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "inverse",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "xとyは反比例しています。xが4倍になるとyは何倍になりますか。分数は約分して答えます。",
    "answer": "1/4",
    "choices": [
      "16",
      "1",
      "1/4",
      "4"
    ],
    "hints": [
      "xとyの積が変わらないように考えます。"
    ],
    "explanation": "xが4倍ならyを4で割るので、1/4倍です。\n\nほかの選択肢\n・「4」：比例の変わり方と混同しています。\n・「16」：倍率を2回かけています。\n・「1」：積が一定になるための変化を反映していません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "4",
        "reason": "比例の変わり方と混同しています。"
      },
      {
        "answer": "16",
        "reason": "倍率を2回かけています。"
      },
      {
        "answer": "1",
        "reason": "積が一定になるための変化を反映していません。"
      }
    ],
    "authoring": {
      "family": "inverse_2",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_inverse_015",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "inverse",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "yはxに反比例し、x＝3のときy＝20です。一定になる積x×yはいくつですか。",
    "answer": "60",
    "choices": [
      "20",
      "60",
      "20/3",
      "23"
    ],
    "hints": [
      "反比例では、対応するxとyの積が一定です。"
    ],
    "explanation": "3×20＝60です。\n\nほかの選択肢\n・「20/3」：yをxで割り、比例定数のように考えています。\n・「23」：xとyを足しています。\n・「20」：yの値をそのまま答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "20/3",
        "reason": "yをxで割り、比例定数のように考えています。"
      },
      {
        "answer": "23",
        "reason": "xとyを足しています。"
      },
      {
        "answer": "20",
        "reason": "yの値をそのまま答えています。"
      }
    ],
    "authoring": {
      "family": "inverse_0",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_inverse_016",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "inverse",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "y＝36÷xです。x＝3のとき、yはいくつですか。",
    "answer": "12",
    "choices": [
      "12",
      "108",
      "33",
      "39"
    ],
    "hints": [
      "式のxを指定の値に置き換えます。"
    ],
    "explanation": "36÷3＝12です。\n\nほかの選択肢\n・「108」：割る代わりにかけています。\n・「33」：割る代わりに引いています。\n・「39」：割る代わりに足しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "108",
        "reason": "割る代わりにかけています。"
      },
      {
        "answer": "33",
        "reason": "割る代わりに引いています。"
      },
      {
        "answer": "39",
        "reason": "割る代わりに足しています。"
      }
    ],
    "authoring": {
      "family": "inverse_1",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_inverse_017",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "inverse",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "xとyは反比例しています。xが5倍になるとyは何倍になりますか。分数は約分して答えます。",
    "answer": "1/5",
    "choices": [
      "5",
      "25",
      "1",
      "1/5"
    ],
    "hints": [
      "xとyの積が変わらないように考えます。"
    ],
    "explanation": "xが5倍ならyを5で割るので、1/5倍です。\n\nほかの選択肢\n・「5」：比例の変わり方と混同しています。\n・「25」：倍率を2回かけています。\n・「1」：積が一定になるための変化を反映していません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "5",
        "reason": "比例の変わり方と混同しています。"
      },
      {
        "answer": "25",
        "reason": "倍率を2回かけています。"
      },
      {
        "answer": "1",
        "reason": "積が一定になるための変化を反映していません。"
      }
    ],
    "authoring": {
      "family": "inverse_2",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_inverse_018",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "inverse",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "yはxに反比例し、x＝3のときy＝24です。一定になる積x×yはいくつですか。",
    "answer": "72",
    "choices": [
      "27",
      "24",
      "72",
      "8"
    ],
    "hints": [
      "反比例では、対応するxとyの積が一定です。"
    ],
    "explanation": "3×24＝72です。\n\nほかの選択肢\n・「8」：yをxで割り、比例定数のように考えています。\n・「27」：xとyを足しています。\n・「24」：yの値をそのまま答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "8",
        "reason": "yをxで割り、比例定数のように考えています。"
      },
      {
        "answer": "27",
        "reason": "xとyを足しています。"
      },
      {
        "answer": "24",
        "reason": "yの値をそのまま答えています。"
      }
    ],
    "authoring": {
      "family": "inverse_0",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_inverse_019",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "inverse",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "y＝42÷xです。x＝3のとき、yはいくつですか。",
    "answer": "14",
    "choices": [
      "45",
      "14",
      "126",
      "39"
    ],
    "hints": [
      "式のxを指定の値に置き換えます。"
    ],
    "explanation": "42÷3＝14です。\n\nほかの選択肢\n・「126」：割る代わりにかけています。\n・「39」：割る代わりに引いています。\n・「45」：割る代わりに足しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "126",
        "reason": "割る代わりにかけています。"
      },
      {
        "answer": "39",
        "reason": "割る代わりに引いています。"
      },
      {
        "answer": "45",
        "reason": "割る代わりに足しています。"
      }
    ],
    "authoring": {
      "family": "inverse_1",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_inverse_020",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "inverse",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "xとyは反比例しています。xが6倍になるとyは何倍になりますか。分数は約分して答えます。",
    "answer": "1/6",
    "choices": [
      "1/6",
      "6",
      "36",
      "1"
    ],
    "hints": [
      "xとyの積が変わらないように考えます。"
    ],
    "explanation": "xが6倍ならyを6で割るので、1/6倍です。\n\nほかの選択肢\n・「6」：比例の変わり方と混同しています。\n・「36」：倍率を2回かけています。\n・「1」：積が一定になるための変化を反映していません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "6",
        "reason": "比例の変わり方と混同しています。"
      },
      {
        "answer": "36",
        "reason": "倍率を2回かけています。"
      },
      {
        "answer": "1",
        "reason": "積が一定になるための変化を反映していません。"
      }
    ],
    "authoring": {
      "family": "inverse_2",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_inverse_021",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "inverse",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "同じ仕事を、同じ能率の人4人で行うと6時間かかります。8人では何時間ですか。",
    "answer": "3",
    "choices": [
      "3/2",
      "2",
      "9/2",
      "3"
    ],
    "hints": [
      "人数×時間が一定になります。"
    ],
    "explanation": "4×6÷8＝3時間です。\n\nほかの選択肢\n・「3/2」：人数が2倍になったので半分にし、さらにもう一度半分にしています。\n・「2」：人数が2倍ではなく3倍になったとして割っています。\n・「9/2」：減る時間を全体の1/4とし、6時間の3/4を答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "3/2",
        "reason": "人数が2倍になったので半分にし、さらにもう一度半分にしています。"
      },
      {
        "answer": "2",
        "reason": "人数が2倍ではなく3倍になったとして割っています。"
      },
      {
        "answer": "9/2",
        "reason": "減る時間を全体の1/4とし、6時間の3/4を答えています。"
      }
    ],
    "authoring": {
      "family": "inverse_3",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_inverse_022",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "inverse",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "グラフは面積が36cm²の長方形の縦と横の関係です。縦が3cmのとき、横は何cmですか。",
    "answer": "12",
    "choices": [
      "33",
      "3",
      "12",
      "108"
    ],
    "hints": [
      "縦×横が一定の面積になります。"
    ],
    "explanation": "36÷3＝12cmです。\n\nほかの選択肢\n・「108」：面積を縦で割らずにかけています。\n・「33」：面積から縦を引いています。\n・「3」：縦と横は常に同じだとしています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "108",
        "reason": "面積を縦で割らずにかけています。"
      },
      {
        "answer": "33",
        "reason": "面積から縦を引いています。"
      },
      {
        "answer": "3",
        "reason": "縦と横は常に同じだとしています。"
      }
    ],
    "authoring": {
      "family": "inverse_4",
      "parameters": {
        "n": 1
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-inverse_4-1.svg",
      "caption": "縦の長さ（cm）は大目盛り2ごと、横の長さ（cm）は大目盛り6ごと。補助目盛りは横1、縦3です。",
      "alt": "縦の長さ（cm）は大目盛り2ごと、横の長さ（cm）は大目盛り6ごと。補助目盛りは横1、縦3です。"
    }
  },
  {
    "id": "math_g6_course_inverse_023",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "inverse",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "180kmの道を一定の時速45kmで進みます。かかる時間は何時間ですか。",
    "answer": "4",
    "choices": [
      "135",
      "4",
      "8100",
      "1/4"
    ],
    "hints": [
      "時間＝道のり÷速さです。"
    ],
    "explanation": "180÷45＝4時間です。\n\nほかの選択肢\n・「8100」：道のりに速さをかけています。\n・「1/4」：速さ÷道のりにして、割る順序を逆にしています。\n・「135」：道のりから速さを引いています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "8100",
        "reason": "道のりに速さをかけています。"
      },
      {
        "answer": "1/4",
        "reason": "速さ÷道のりにして、割る順序を逆にしています。"
      },
      {
        "answer": "135",
        "reason": "道のりから速さを引いています。"
      }
    ],
    "authoring": {
      "family": "inverse_5",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_inverse_024",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "inverse",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "同じ仕事を、同じ能率の人5人で行うと6時間かかります。10人では何時間ですか。",
    "answer": "3",
    "choices": [
      "3",
      "3/2",
      "2",
      "9/2"
    ],
    "hints": [
      "人数×時間が一定になります。"
    ],
    "explanation": "5×6÷10＝3時間です。\n\nほかの選択肢\n・「3/2」：人数が2倍になったので半分にし、さらにもう一度半分にしています。\n・「2」：人数が2倍ではなく3倍になったとして割っています。\n・「9/2」：減る時間を全体の1/4とし、6時間の3/4を答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "3/2",
        "reason": "人数が2倍になったので半分にし、さらにもう一度半分にしています。"
      },
      {
        "answer": "2",
        "reason": "人数が2倍ではなく3倍になったとして割っています。"
      },
      {
        "answer": "9/2",
        "reason": "減る時間を全体の1/4とし、6時間の3/4を答えています。"
      }
    ],
    "authoring": {
      "family": "inverse_3",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_inverse_025",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "inverse",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "グラフは面積が48cm²の長方形の縦と横の関係です。縦が4cmのとき、横は何cmですか。",
    "answer": "12",
    "choices": [
      "192",
      "44",
      "4",
      "12"
    ],
    "hints": [
      "縦×横が一定の面積になります。"
    ],
    "explanation": "48÷4＝12cmです。\n\nほかの選択肢\n・「192」：面積を縦で割らずにかけています。\n・「44」：面積から縦を引いています。\n・「4」：縦と横は常に同じだとしています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "192",
        "reason": "面積を縦で割らずにかけています。"
      },
      {
        "answer": "44",
        "reason": "面積から縦を引いています。"
      },
      {
        "answer": "4",
        "reason": "縦と横は常に同じだとしています。"
      }
    ],
    "authoring": {
      "family": "inverse_4",
      "parameters": {
        "n": 2
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-inverse_4-2.svg",
      "caption": "縦の長さ（cm）は大目盛り2ごと、横の長さ（cm）は大目盛り8ごと。補助目盛りは横1、縦4です。",
      "alt": "縦の長さ（cm）は大目盛り2ごと、横の長さ（cm）は大目盛り8ごと。補助目盛りは横1、縦4です。"
    }
  },
  {
    "id": "math_g6_course_inverse_026",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "inverse",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "240kmの道を一定の時速60kmで進みます。かかる時間は何時間ですか。",
    "answer": "4",
    "choices": [
      "1/4",
      "180",
      "4",
      "14400"
    ],
    "hints": [
      "時間＝道のり÷速さです。"
    ],
    "explanation": "240÷60＝4時間です。\n\nほかの選択肢\n・「14400」：道のりに速さをかけています。\n・「1/4」：速さ÷道のりにして、割る順序を逆にしています。\n・「180」：道のりから速さを引いています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "14400",
        "reason": "道のりに速さをかけています。"
      },
      {
        "answer": "1/4",
        "reason": "速さ÷道のりにして、割る順序を逆にしています。"
      },
      {
        "answer": "180",
        "reason": "道のりから速さを引いています。"
      }
    ],
    "authoring": {
      "family": "inverse_5",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_inverse_027",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "inverse",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "同じ仕事を、同じ能率の人6人で行うと6時間かかります。12人では何時間ですか。",
    "answer": "3",
    "choices": [
      "9/2",
      "3",
      "3/2",
      "2"
    ],
    "hints": [
      "人数×時間が一定になります。"
    ],
    "explanation": "6×6÷12＝3時間です。\n\nほかの選択肢\n・「3/2」：人数が2倍になったので半分にし、さらにもう一度半分にしています。\n・「2」：人数が2倍ではなく3倍になったとして割っています。\n・「9/2」：減る時間を全体の1/4とし、6時間の3/4を答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "3/2",
        "reason": "人数が2倍になったので半分にし、さらにもう一度半分にしています。"
      },
      {
        "answer": "2",
        "reason": "人数が2倍ではなく3倍になったとして割っています。"
      },
      {
        "answer": "9/2",
        "reason": "減る時間を全体の1/4とし、6時間の3/4を答えています。"
      }
    ],
    "authoring": {
      "family": "inverse_3",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_inverse_028",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "inverse",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "グラフは面積が60cm²の長方形の縦と横の関係です。縦が5cmのとき、横は何cmですか。",
    "answer": "12",
    "choices": [
      "12",
      "300",
      "55",
      "5"
    ],
    "hints": [
      "縦×横が一定の面積になります。"
    ],
    "explanation": "60÷5＝12cmです。\n\nほかの選択肢\n・「300」：面積を縦で割らずにかけています。\n・「55」：面積から縦を引いています。\n・「5」：縦と横は常に同じだとしています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "300",
        "reason": "面積を縦で割らずにかけています。"
      },
      {
        "answer": "55",
        "reason": "面積から縦を引いています。"
      },
      {
        "answer": "5",
        "reason": "縦と横は常に同じだとしています。"
      }
    ],
    "authoring": {
      "family": "inverse_4",
      "parameters": {
        "n": 3
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-inverse_4-3.svg",
      "caption": "縦の長さ（cm）は大目盛り2ごと、横の長さ（cm）は大目盛り10ごと。補助目盛りは横1、縦5です。",
      "alt": "縦の長さ（cm）は大目盛り2ごと、横の長さ（cm）は大目盛り10ごと。補助目盛りは横1、縦5です。"
    }
  },
  {
    "id": "math_g6_course_inverse_029",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "inverse",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "300kmの道を一定の時速75kmで進みます。かかる時間は何時間ですか。",
    "answer": "4",
    "choices": [
      "22500",
      "1/4",
      "225",
      "4"
    ],
    "hints": [
      "時間＝道のり÷速さです。"
    ],
    "explanation": "300÷75＝4時間です。\n\nほかの選択肢\n・「22500」：道のりに速さをかけています。\n・「1/4」：速さ÷道のりにして、割る順序を逆にしています。\n・「225」：道のりから速さを引いています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "22500",
        "reason": "道のりに速さをかけています。"
      },
      {
        "answer": "1/4",
        "reason": "速さ÷道のりにして、割る順序を逆にしています。"
      },
      {
        "answer": "225",
        "reason": "道のりから速さを引いています。"
      }
    ],
    "authoring": {
      "family": "inverse_5",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_inverse_030",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "inverse",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "同じ仕事を、同じ能率の人7人で行うと6時間かかります。14人では何時間ですか。",
    "answer": "3",
    "choices": [
      "2",
      "9/2",
      "3",
      "3/2"
    ],
    "hints": [
      "人数×時間が一定になります。"
    ],
    "explanation": "7×6÷14＝3時間です。\n\nほかの選択肢\n・「3/2」：人数が2倍になったので半分にし、さらにもう一度半分にしています。\n・「2」：人数が2倍ではなく3倍になったとして割っています。\n・「9/2」：減る時間を全体の1/4とし、6時間の3/4を答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "3/2",
        "reason": "人数が2倍になったので半分にし、さらにもう一度半分にしています。"
      },
      {
        "answer": "2",
        "reason": "人数が2倍ではなく3倍になったとして割っています。"
      },
      {
        "answer": "9/2",
        "reason": "減る時間を全体の1/4とし、6時間の3/4を答えています。"
      }
    ],
    "authoring": {
      "family": "inverse_3",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_inverse_031",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "inverse",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "グラフは面積が72cm²の長方形の縦と横の関係です。縦が6cmのとき、横は何cmですか。",
    "answer": "12",
    "choices": [
      "6",
      "12",
      "432",
      "66"
    ],
    "hints": [
      "縦×横が一定の面積になります。"
    ],
    "explanation": "72÷6＝12cmです。\n\nほかの選択肢\n・「432」：面積を縦で割らずにかけています。\n・「66」：面積から縦を引いています。\n・「6」：縦と横は常に同じだとしています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "432",
        "reason": "面積を縦で割らずにかけています。"
      },
      {
        "answer": "66",
        "reason": "面積から縦を引いています。"
      },
      {
        "answer": "6",
        "reason": "縦と横は常に同じだとしています。"
      }
    ],
    "authoring": {
      "family": "inverse_4",
      "parameters": {
        "n": 4
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-inverse_4-4.svg",
      "caption": "縦の長さ（cm）は大目盛り2ごと、横の長さ（cm）は大目盛り12ごと。補助目盛りは横1、縦6です。",
      "alt": "縦の長さ（cm）は大目盛り2ごと、横の長さ（cm）は大目盛り12ごと。補助目盛りは横1、縦6です。"
    }
  },
  {
    "id": "math_g6_course_inverse_032",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "inverse",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "360kmの道を一定の時速90kmで進みます。かかる時間は何時間ですか。",
    "answer": "4",
    "choices": [
      "4",
      "32400",
      "1/4",
      "270"
    ],
    "hints": [
      "時間＝道のり÷速さです。"
    ],
    "explanation": "360÷90＝4時間です。\n\nほかの選択肢\n・「32400」：道のりに速さをかけています。\n・「1/4」：速さ÷道のりにして、割る順序を逆にしています。\n・「270」：道のりから速さを引いています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "32400",
        "reason": "道のりに速さをかけています。"
      },
      {
        "answer": "1/4",
        "reason": "速さ÷道のりにして、割る順序を逆にしています。"
      },
      {
        "answer": "270",
        "reason": "道のりから速さを引いています。"
      }
    ],
    "authoring": {
      "family": "inverse_5",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_inverse_033",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "inverse",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "同じ仕事を、同じ能率の人8人で行うと6時間かかります。16人では何時間ですか。",
    "answer": "3",
    "choices": [
      "3/2",
      "2",
      "9/2",
      "3"
    ],
    "hints": [
      "人数×時間が一定になります。"
    ],
    "explanation": "8×6÷16＝3時間です。\n\nほかの選択肢\n・「3/2」：人数が2倍になったので半分にし、さらにもう一度半分にしています。\n・「2」：人数が2倍ではなく3倍になったとして割っています。\n・「9/2」：減る時間を全体の1/4とし、6時間の3/4を答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "3/2",
        "reason": "人数が2倍になったので半分にし、さらにもう一度半分にしています。"
      },
      {
        "answer": "2",
        "reason": "人数が2倍ではなく3倍になったとして割っています。"
      },
      {
        "answer": "9/2",
        "reason": "減る時間を全体の1/4とし、6時間の3/4を答えています。"
      }
    ],
    "authoring": {
      "family": "inverse_3",
      "parameters": {
        "n": 5
      }
    }
  },
  {
    "id": "math_g6_course_inverse_034",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "inverse",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "グラフは面積が84cm²の長方形の縦と横の関係です。縦が7cmのとき、横は何cmですか。",
    "answer": "12",
    "choices": [
      "77",
      "7",
      "12",
      "588"
    ],
    "hints": [
      "縦×横が一定の面積になります。"
    ],
    "explanation": "84÷7＝12cmです。\n\nほかの選択肢\n・「588」：面積を縦で割らずにかけています。\n・「77」：面積から縦を引いています。\n・「7」：縦と横は常に同じだとしています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "588",
        "reason": "面積を縦で割らずにかけています。"
      },
      {
        "answer": "77",
        "reason": "面積から縦を引いています。"
      },
      {
        "answer": "7",
        "reason": "縦と横は常に同じだとしています。"
      }
    ],
    "authoring": {
      "family": "inverse_4",
      "parameters": {
        "n": 5
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-inverse_4-5.svg",
      "caption": "縦の長さ（cm）は大目盛り2ごと、横の長さ（cm）は大目盛り14ごと。補助目盛りは横1、縦7です。",
      "alt": "縦の長さ（cm）は大目盛り2ごと、横の長さ（cm）は大目盛り14ごと。補助目盛りは横1、縦7です。"
    }
  },
  {
    "id": "math_g6_course_inverse_035",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "inverse",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "420kmの道を一定の時速105kmで進みます。かかる時間は何時間ですか。",
    "answer": "4",
    "choices": [
      "315",
      "4",
      "44100",
      "1/4"
    ],
    "hints": [
      "時間＝道のり÷速さです。"
    ],
    "explanation": "420÷105＝4時間です。\n\nほかの選択肢\n・「44100」：道のりに速さをかけています。\n・「1/4」：速さ÷道のりにして、割る順序を逆にしています。\n・「315」：道のりから速さを引いています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "44100",
        "reason": "道のりに速さをかけています。"
      },
      {
        "answer": "1/4",
        "reason": "速さ÷道のりにして、割る順序を逆にしています。"
      },
      {
        "answer": "315",
        "reason": "道のりから速さを引いています。"
      }
    ],
    "authoring": {
      "family": "inverse_5",
      "parameters": {
        "n": 5
      }
    }
  },
  {
    "id": "math_g6_course_inverse_036",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "inverse",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "同じ能率の人5人で8時間かかる仕事を、まず5人で2時間しました。残りを7人で行うと、あと何時間かかりますか。",
    "answer": "30/7",
    "choices": [
      "30/7",
      "40/7",
      "6",
      "42/5"
    ],
    "hints": [
      "全体の仕事量から、初めの2時間にした分を引きます。",
      "残りの仕事量を新しい人数で割ります。"
    ],
    "explanation": "残りの仕事量は5×(8－2)＝30人時。これを7で割り、30/7時間です。\n\nほかの選択肢\n・「40/7」：すでに終わった仕事を引いていません。\n・「6」：人数が増えたのに残り時間を変えていません。\n・「42/5」：人数の比を逆にかけています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "40/7",
        "reason": "すでに終わった仕事を引いていません。"
      },
      {
        "answer": "6",
        "reason": "人数が増えたのに残り時間を変えていません。"
      },
      {
        "answer": "42/5",
        "reason": "人数の比を逆にかけています。"
      }
    ],
    "authoring": {
      "family": "inverse_6",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_inverse_037",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "inverse",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "120kmの道を往復します。行きは時速60km、帰りは時速40kmでした。休まないとき、往復全体の平均の速さは時速何kmですか。",
    "answer": "48",
    "choices": [
      "50",
      "60",
      "40",
      "48"
    ],
    "hints": [
      "行きと帰りにかかる時間を別々に求めます。",
      "往復の道のり÷往復の時間で平均の速さを求めます。"
    ],
    "explanation": "行きは120÷60＝2時間、帰りは120÷40＝3時間。240÷5＝48km/時です。\n\nほかの選択肢\n・「50」：速さを単純に平均しています。かかる時間が同じではありません。\n・「60」：行きの速さだけを答えています。\n・「40」：帰りの速さだけを答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "50",
        "reason": "速さを単純に平均しています。かかる時間が同じではありません。"
      },
      {
        "answer": "60",
        "reason": "行きの速さだけを答えています。"
      },
      {
        "answer": "40",
        "reason": "帰りの速さだけを答えています。"
      }
    ],
    "authoring": {
      "family": "inverse_7",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_inverse_038",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "inverse",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "180kmの道を往復します。行きは時速90km、帰りは時速60kmでした。休まないとき、往復全体の平均の速さは時速何kmですか。",
    "answer": "72",
    "choices": [
      "90",
      "60",
      "72",
      "75"
    ],
    "hints": [
      "行きと帰りにかかる時間を別々に求めます。",
      "往復の道のり÷往復の時間で平均の速さを求めます。"
    ],
    "explanation": "行きは180÷90＝2時間、帰りは180÷60＝3時間。360÷5＝72km/時です。\n\nほかの選択肢\n・「75」：速さを単純に平均しています。かかる時間が同じではありません。\n・「90」：行きの速さだけを答えています。\n・「60」：帰りの速さだけを答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "75",
        "reason": "速さを単純に平均しています。かかる時間が同じではありません。"
      },
      {
        "answer": "90",
        "reason": "行きの速さだけを答えています。"
      },
      {
        "answer": "60",
        "reason": "帰りの速さだけを答えています。"
      }
    ],
    "authoring": {
      "family": "inverse_7",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_inverse_039",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "inverse",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "同じ能率の人7人で8時間かかる仕事を、まず7人で2時間しました。残りを9人で行うと、あと何時間かかりますか。",
    "answer": "14/3",
    "choices": [
      "54/7",
      "14/3",
      "56/9",
      "6"
    ],
    "hints": [
      "全体の仕事量から、初めの2時間にした分を引きます。",
      "残りの仕事量を新しい人数で割ります。"
    ],
    "explanation": "残りの仕事量は7×(8－2)＝42人時。これを9で割り、14/3時間です。\n\nほかの選択肢\n・「56/9」：すでに終わった仕事を引いていません。\n・「6」：人数が増えたのに残り時間を変えていません。\n・「54/7」：人数の比を逆にかけています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "56/9",
        "reason": "すでに終わった仕事を引いていません。"
      },
      {
        "answer": "6",
        "reason": "人数が増えたのに残り時間を変えていません。"
      },
      {
        "answer": "54/7",
        "reason": "人数の比を逆にかけています。"
      }
    ],
    "authoring": {
      "family": "inverse_6",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_inverse_040",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "inverse",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "240kmの道を往復します。行きは時速120km、帰りは時速80kmでした。休まないとき、往復全体の平均の速さは時速何kmですか。",
    "answer": "96",
    "choices": [
      "96",
      "100",
      "120",
      "80"
    ],
    "hints": [
      "行きと帰りにかかる時間を別々に求めます。",
      "往復の道のり÷往復の時間で平均の速さを求めます。"
    ],
    "explanation": "行きは240÷120＝2時間、帰りは240÷80＝3時間。480÷5＝96km/時です。\n\nほかの選択肢\n・「100」：速さを単純に平均しています。かかる時間が同じではありません。\n・「120」：行きの速さだけを答えています。\n・「80」：帰りの速さだけを答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "100",
        "reason": "速さを単純に平均しています。かかる時間が同じではありません。"
      },
      {
        "answer": "120",
        "reason": "行きの速さだけを答えています。"
      },
      {
        "answer": "80",
        "reason": "帰りの速さだけを答えています。"
      }
    ],
    "authoring": {
      "family": "inverse_7",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_inverse_041",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "inverse",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "同じ能率の人8人で8時間かかる仕事を、まず8人で2時間しました。残りを10人で行うと、あと何時間かかりますか。",
    "answer": "24/5",
    "choices": [
      "32/5",
      "6",
      "15/2",
      "24/5"
    ],
    "hints": [
      "全体の仕事量から、初めの2時間にした分を引きます。",
      "残りの仕事量を新しい人数で割ります。"
    ],
    "explanation": "残りの仕事量は8×(8－2)＝48人時。これを10で割り、24/5時間です。\n\nほかの選択肢\n・「32/5」：すでに終わった仕事を引いていません。\n・「6」：人数が増えたのに残り時間を変えていません。\n・「15/2」：人数の比を逆にかけています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "32/5",
        "reason": "すでに終わった仕事を引いていません。"
      },
      {
        "answer": "6",
        "reason": "人数が増えたのに残り時間を変えていません。"
      },
      {
        "answer": "15/2",
        "reason": "人数の比を逆にかけています。"
      }
    ],
    "authoring": {
      "family": "inverse_6",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_inverse_042",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "inverse",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "300kmの道を往復します。行きは時速150km、帰りは時速100kmでした。休まないとき、往復全体の平均の速さは時速何kmですか。",
    "answer": "120",
    "choices": [
      "150",
      "100",
      "120",
      "125"
    ],
    "hints": [
      "行きと帰りにかかる時間を別々に求めます。",
      "往復の道のり÷往復の時間で平均の速さを求めます。"
    ],
    "explanation": "行きは300÷150＝2時間、帰りは300÷100＝3時間。600÷5＝120km/時です。\n\nほかの選択肢\n・「125」：速さを単純に平均しています。かかる時間が同じではありません。\n・「150」：行きの速さだけを答えています。\n・「100」：帰りの速さだけを答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "125",
        "reason": "速さを単純に平均しています。かかる時間が同じではありません。"
      },
      {
        "answer": "150",
        "reason": "行きの速さだけを答えています。"
      },
      {
        "answer": "100",
        "reason": "帰りの速さだけを答えています。"
      }
    ],
    "authoring": {
      "family": "inverse_7",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_inverse_043",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "inverse",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "同じ能率の人9人で8時間かかる仕事を、まず9人で2時間しました。残りを11人で行うと、あと何時間かかりますか。",
    "answer": "54/11",
    "choices": [
      "22/3",
      "54/11",
      "72/11",
      "6"
    ],
    "hints": [
      "全体の仕事量から、初めの2時間にした分を引きます。",
      "残りの仕事量を新しい人数で割ります。"
    ],
    "explanation": "残りの仕事量は9×(8－2)＝54人時。これを11で割り、54/11時間です。\n\nほかの選択肢\n・「72/11」：すでに終わった仕事を引いていません。\n・「6」：人数が増えたのに残り時間を変えていません。\n・「22/3」：人数の比を逆にかけています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "72/11",
        "reason": "すでに終わった仕事を引いていません。"
      },
      {
        "answer": "6",
        "reason": "人数が増えたのに残り時間を変えていません。"
      },
      {
        "answer": "22/3",
        "reason": "人数の比を逆にかけています。"
      }
    ],
    "authoring": {
      "family": "inverse_6",
      "parameters": {
        "n": 5
      }
    }
  },
  {
    "id": "math_g6_course_inverse_044",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "inverse",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "360kmの道を往復します。行きは時速180km、帰りは時速120kmでした。休まないとき、往復全体の平均の速さは時速何kmですか。",
    "answer": "144",
    "choices": [
      "144",
      "150",
      "180",
      "120"
    ],
    "hints": [
      "行きと帰りにかかる時間を別々に求めます。",
      "往復の道のり÷往復の時間で平均の速さを求めます。"
    ],
    "explanation": "行きは360÷180＝2時間、帰りは360÷120＝3時間。720÷5＝144km/時です。\n\nほかの選択肢\n・「150」：速さを単純に平均しています。かかる時間が同じではありません。\n・「180」：行きの速さだけを答えています。\n・「120」：帰りの速さだけを答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "150",
        "reason": "速さを単純に平均しています。かかる時間が同じではありません。"
      },
      {
        "answer": "180",
        "reason": "行きの速さだけを答えています。"
      },
      {
        "answer": "120",
        "reason": "帰りの速さだけを答えています。"
      }
    ],
    "authoring": {
      "family": "inverse_7",
      "parameters": {
        "n": 5
      }
    }
  },
  {
    "id": "math_g6_course_inverse_045",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "inverse",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "同じ能率の人10人で8時間かかる仕事を、まず10人で2時間しました。残りを12人で行うと、あと何時間かかりますか。",
    "answer": "5",
    "choices": [
      "20/3",
      "6",
      "36/5",
      "5"
    ],
    "hints": [
      "全体の仕事量から、初めの2時間にした分を引きます。",
      "残りの仕事量を新しい人数で割ります。"
    ],
    "explanation": "残りの仕事量は10×(8－2)＝60人時。これを12で割り、5時間です。\n\nほかの選択肢\n・「20/3」：すでに終わった仕事を引いていません。\n・「6」：人数が増えたのに残り時間を変えていません。\n・「36/5」：人数の比を逆にかけています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "20/3",
        "reason": "すでに終わった仕事を引いていません。"
      },
      {
        "answer": "6",
        "reason": "人数が増えたのに残り時間を変えていません。"
      },
      {
        "answer": "36/5",
        "reason": "人数の比を逆にかけています。"
      }
    ],
    "authoring": {
      "family": "inverse_6",
      "parameters": {
        "n": 6
      }
    }
  },
  {
    "id": "math_g6_course_data_009",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "data",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "記録は小さい順に3、5、6、8、11です。中央値はいくつですか。",
    "answer": "6",
    "choices": [
      "33/5",
      "5",
      "8",
      "6"
    ],
    "hints": [
      "小さい順で中央に来る記録を選びます。"
    ],
    "explanation": "5個の中央は3番目なので、中央値は6です。\n\nほかの選択肢\n・「33/5」：平均を求めています。中央値は中央の記録です。\n・「5」：中央の位置を1つ左にずらしています。\n・「8」：中央の位置を1つ右にずらしています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "33/5",
        "reason": "平均を求めています。中央値は中央の記録です。"
      },
      {
        "answer": "5",
        "reason": "中央の位置を1つ左にずらしています。"
      },
      {
        "answer": "8",
        "reason": "中央の位置を1つ右にずらしています。"
      }
    ],
    "authoring": {
      "family": "data_0",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_data_010",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "data",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "記録は1, 2, 2, 5, 5, 5, 7です。{最頻値|さいひんち}はいくつですか。",
    "answer": "5",
    "choices": [
      "7",
      "27/7",
      "5",
      "2"
    ],
    "hints": [
      "値ごとに何回現れるか数えます。"
    ],
    "explanation": "5が3回現れ、最も多いので、{最頻値|さいひんち}は5です。\n\nほかの選択肢\n・「2」：2回現れる値を選んでいます。もっと多く現れる値があります。\n・「7」：最大値を選んでいます。\n・「27/7」：平均を求めています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "2",
        "reason": "2回現れる値を選んでいます。もっと多く現れる値があります。"
      },
      {
        "answer": "7",
        "reason": "最大値を選んでいます。"
      },
      {
        "answer": "27/7",
        "reason": "平均を求めています。"
      }
    ],
    "authoring": {
      "family": "data_1",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_data_011",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "data",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "記録を「10以上20未満」の階級に分けます。この階級に入る値はどれですか。",
    "answer": "10",
    "choices": [
      "21",
      "10",
      "9",
      "20"
    ],
    "hints": [
      "以上はその値を{含|ふく}み、未満はその値を{含|ふく}みません。"
    ],
    "explanation": "10は下端なので{含|ふく}みます。20はふくまず、正しいのは10です。\n\nほかの選択肢\n・「9」：下端以上という条件を満たしません。\n・「20」：未満は上端の値を{含|ふく}みません。\n・「21」：上端を超えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "9",
        "reason": "下端以上という条件を満たしません。"
      },
      {
        "answer": "20",
        "reason": "未満は上端の値を{含|ふく}みません。"
      },
      {
        "answer": "21",
        "reason": "上端を超えています。"
      }
    ],
    "authoring": {
      "family": "data_2",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_data_012",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "data",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "記録は小さい順に4、6、7、9、12です。中央値はいくつですか。",
    "answer": "7",
    "choices": [
      "7",
      "38/5",
      "6",
      "9"
    ],
    "hints": [
      "小さい順で中央に来る記録を選びます。"
    ],
    "explanation": "5個の中央は3番目なので、中央値は7です。\n\nほかの選択肢\n・「38/5」：平均を求めています。中央値は中央の記録です。\n・「6」：中央の位置を1つ左にずらしています。\n・「9」：中央の位置を1つ右にずらしています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "38/5",
        "reason": "平均を求めています。中央値は中央の記録です。"
      },
      {
        "answer": "6",
        "reason": "中央の位置を1つ左にずらしています。"
      },
      {
        "answer": "9",
        "reason": "中央の位置を1つ右にずらしています。"
      }
    ],
    "authoring": {
      "family": "data_0",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_data_013",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "data",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "記録は2, 3, 3, 6, 6, 6, 8です。{最頻値|さいひんち}はいくつですか。",
    "answer": "6",
    "choices": [
      "3",
      "8",
      "34/7",
      "6"
    ],
    "hints": [
      "値ごとに何回現れるか数えます。"
    ],
    "explanation": "6が3回現れ、最も多いので、{最頻値|さいひんち}は6です。\n\nほかの選択肢\n・「3」：2回現れる値を選んでいます。もっと多く現れる値があります。\n・「8」：最大値を選んでいます。\n・「34/7」：平均を求めています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "3",
        "reason": "2回現れる値を選んでいます。もっと多く現れる値があります。"
      },
      {
        "answer": "8",
        "reason": "最大値を選んでいます。"
      },
      {
        "answer": "34/7",
        "reason": "平均を求めています。"
      }
    ],
    "authoring": {
      "family": "data_1",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_data_014",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "data",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "記録を「20以上30未満」の階級に分けます。この階級に入る値はどれですか。",
    "answer": "20",
    "choices": [
      "30",
      "31",
      "20",
      "19"
    ],
    "hints": [
      "以上はその値を{含|ふく}み、未満はその値を{含|ふく}みません。"
    ],
    "explanation": "20は下端なので{含|ふく}みます。30はふくまず、正しいのは20です。\n\nほかの選択肢\n・「19」：下端以上という条件を満たしません。\n・「30」：未満は上端の値を{含|ふく}みません。\n・「31」：上端を超えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "19",
        "reason": "下端以上という条件を満たしません。"
      },
      {
        "answer": "30",
        "reason": "未満は上端の値を{含|ふく}みません。"
      },
      {
        "answer": "31",
        "reason": "上端を超えています。"
      }
    ],
    "authoring": {
      "family": "data_2",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_data_015",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "data",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "記録は小さい順に5、7、8、10、13です。中央値はいくつですか。",
    "answer": "8",
    "choices": [
      "10",
      "8",
      "43/5",
      "7"
    ],
    "hints": [
      "小さい順で中央に来る記録を選びます。"
    ],
    "explanation": "5個の中央は3番目なので、中央値は8です。\n\nほかの選択肢\n・「43/5」：平均を求めています。中央値は中央の記録です。\n・「7」：中央の位置を1つ左にずらしています。\n・「10」：中央の位置を1つ右にずらしています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "43/5",
        "reason": "平均を求めています。中央値は中央の記録です。"
      },
      {
        "answer": "7",
        "reason": "中央の位置を1つ左にずらしています。"
      },
      {
        "answer": "10",
        "reason": "中央の位置を1つ右にずらしています。"
      }
    ],
    "authoring": {
      "family": "data_0",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_data_016",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "data",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "記録は3, 4, 4, 7, 7, 7, 9です。{最頻値|さいひんち}はいくつですか。",
    "answer": "7",
    "choices": [
      "7",
      "4",
      "9",
      "41/7"
    ],
    "hints": [
      "値ごとに何回現れるか数えます。"
    ],
    "explanation": "7が3回現れ、最も多いので、{最頻値|さいひんち}は7です。\n\nほかの選択肢\n・「4」：2回現れる値を選んでいます。もっと多く現れる値があります。\n・「9」：最大値を選んでいます。\n・「41/7」：平均を求めています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "4",
        "reason": "2回現れる値を選んでいます。もっと多く現れる値があります。"
      },
      {
        "answer": "9",
        "reason": "最大値を選んでいます。"
      },
      {
        "answer": "41/7",
        "reason": "平均を求めています。"
      }
    ],
    "authoring": {
      "family": "data_1",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_data_017",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "data",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "記録を「30以上40未満」の階級に分けます。この階級に入る値はどれですか。",
    "answer": "30",
    "choices": [
      "29",
      "40",
      "41",
      "30"
    ],
    "hints": [
      "以上はその値を{含|ふく}み、未満はその値を{含|ふく}みません。"
    ],
    "explanation": "30は下端なので{含|ふく}みます。40はふくまず、正しいのは30です。\n\nほかの選択肢\n・「29」：下端以上という条件を満たしません。\n・「40」：未満は上端の値を{含|ふく}みません。\n・「41」：上端を超えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "29",
        "reason": "下端以上という条件を満たしません。"
      },
      {
        "answer": "40",
        "reason": "未満は上端の値を{含|ふく}みません。"
      },
      {
        "answer": "41",
        "reason": "上端を超えています。"
      }
    ],
    "authoring": {
      "family": "data_2",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_data_018",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "data",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "記録は小さい順に6、8、9、11、14です。中央値はいくつですか。",
    "answer": "9",
    "choices": [
      "8",
      "11",
      "9",
      "48/5"
    ],
    "hints": [
      "小さい順で中央に来る記録を選びます。"
    ],
    "explanation": "5個の中央は3番目なので、中央値は9です。\n\nほかの選択肢\n・「48/5」：平均を求めています。中央値は中央の記録です。\n・「8」：中央の位置を1つ左にずらしています。\n・「11」：中央の位置を1つ右にずらしています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "48/5",
        "reason": "平均を求めています。中央値は中央の記録です。"
      },
      {
        "answer": "8",
        "reason": "中央の位置を1つ左にずらしています。"
      },
      {
        "answer": "11",
        "reason": "中央の位置を1つ右にずらしています。"
      }
    ],
    "authoring": {
      "family": "data_0",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_data_019",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "data",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "記録は4, 5, 5, 8, 8, 8, 10です。{最頻値|さいひんち}はいくつですか。",
    "answer": "8",
    "choices": [
      "48/7",
      "8",
      "5",
      "10"
    ],
    "hints": [
      "値ごとに何回現れるか数えます。"
    ],
    "explanation": "8が3回現れ、最も多いので、{最頻値|さいひんち}は8です。\n\nほかの選択肢\n・「5」：2回現れる値を選んでいます。もっと多く現れる値があります。\n・「10」：最大値を選んでいます。\n・「48/7」：平均を求めています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "5",
        "reason": "2回現れる値を選んでいます。もっと多く現れる値があります。"
      },
      {
        "answer": "10",
        "reason": "最大値を選んでいます。"
      },
      {
        "answer": "48/7",
        "reason": "平均を求めています。"
      }
    ],
    "authoring": {
      "family": "data_1",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_data_020",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "data",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "記録を「40以上50未満」の階級に分けます。この階級に入る値はどれですか。",
    "answer": "40",
    "choices": [
      "40",
      "39",
      "50",
      "51"
    ],
    "hints": [
      "以上はその値を{含|ふく}み、未満はその値を{含|ふく}みません。"
    ],
    "explanation": "40は下端なので{含|ふく}みます。50はふくまず、正しいのは40です。\n\nほかの選択肢\n・「39」：下端以上という条件を満たしません。\n・「50」：未満は上端の値を{含|ふく}みません。\n・「51」：上端を超えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "39",
        "reason": "下端以上という条件を満たしません。"
      },
      {
        "answer": "50",
        "reason": "未満は上端の値を{含|ふく}みません。"
      },
      {
        "answer": "51",
        "reason": "上端を超えています。"
      }
    ],
    "authoring": {
      "family": "data_2",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_data_021",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "data",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "次の14人のグラフは、ボールを投げた距離の記録を10mずつの階級に分けたものです。記録が20m未満の人は何人ですか。",
    "answer": "7",
    "choices": [
      "5",
      "10",
      "14",
      "7"
    ],
    "hints": [
      "20m未満に当たる柱をすべて選びます。"
    ],
    "explanation": "0以上10未満の2人と、10以上20未満の5人を足し、7人です。\n\nほかの選択肢\n・「5」：10以上20未満の階級だけを読んでいます。\n・「10」：20以上30未満の人までふくめています。\n・「14」：条件を付けず全員を数えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "5",
        "reason": "10以上20未満の階級だけを読んでいます。"
      },
      {
        "answer": "10",
        "reason": "20以上30未満の人までふくめています。"
      },
      {
        "answer": "14",
        "reason": "条件を付けず全員を数えています。"
      }
    ],
    "authoring": {
      "family": "data_3",
      "parameters": {
        "n": 1
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-data_3-1.svg",
      "caption": "ボールを投げた距離（m）は大目盛り10ごと、人数（人）は大目盛り2ごと。補助目盛りは横5、縦1です。 各階級は左端以上・右端未満です。",
      "alt": "ボールを投げた距離（m）は大目盛り10ごと、人数（人）は大目盛り2ごと。補助目盛りは横5、縦1です。"
    }
  },
  {
    "id": "math_g6_course_data_022",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "data",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "6人の記録が小さい順に3, 5, 8, 10, 11, 13です。中央値はいくつですか。",
    "answer": "9",
    "choices": [
      "10",
      "18",
      "9",
      "8"
    ],
    "hints": [
      "記録が偶数個なら、中央の2つの平均を求めます。"
    ],
    "explanation": "(8＋10)÷2＝9です。\n\nほかの選択肢\n・「8」：中央の小さいほうだけを答えています。\n・「10」：中央の大きいほうだけを答えています。\n・「18」：中央2つを足した後に2で割っていません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "8",
        "reason": "中央の小さいほうだけを答えています。"
      },
      {
        "answer": "10",
        "reason": "中央の大きいほうだけを答えています。"
      },
      {
        "answer": "18",
        "reason": "中央2つを足した後に2で割っていません。"
      }
    ],
    "authoring": {
      "family": "data_4",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_data_023",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "data",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "100点満点のテストで、4人の得点は43, 53, 63, 73点です。5人目を加えた平均が62点になりました。5人目は何点ですか。",
    "answer": "78",
    "choices": [
      "20",
      "78",
      "62",
      "58"
    ],
    "hints": [
      "5人の平均から5人の合計を求めます。"
    ],
    "explanation": "5人の合計は62×5＝310点。初めの合計232点を引き、78点です。\n\nほかの選択肢\n・「62」：全体の平均を5人目の点数としています。\n・「58」：初めの4人の平均を答えています。\n・「20」：初めの平均に5をかけて、初めの合計を大きく計算しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "62",
        "reason": "全体の平均を5人目の点数としています。"
      },
      {
        "answer": "58",
        "reason": "初めの4人の平均を答えています。"
      },
      {
        "answer": "20",
        "reason": "初めの平均に5をかけて、初めの合計を大きく計算しています。"
      }
    ],
    "authoring": {
      "family": "data_5",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_data_024",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "data",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "次の18人のグラフは、ボールを投げた距離の記録を10mずつの階級に分けたものです。記録が20m未満の人は何人ですか。",
    "answer": "9",
    "choices": [
      "9",
      "6",
      "13",
      "18"
    ],
    "hints": [
      "20m未満に当たる柱をすべて選びます。"
    ],
    "explanation": "0以上10未満の3人と、10以上20未満の6人を足し、9人です。\n\nほかの選択肢\n・「6」：10以上20未満の階級だけを読んでいます。\n・「13」：20以上30未満の人までふくめています。\n・「18」：条件を付けず全員を数えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "6",
        "reason": "10以上20未満の階級だけを読んでいます。"
      },
      {
        "answer": "13",
        "reason": "20以上30未満の人までふくめています。"
      },
      {
        "answer": "18",
        "reason": "条件を付けず全員を数えています。"
      }
    ],
    "authoring": {
      "family": "data_3",
      "parameters": {
        "n": 2
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-data_3-2.svg",
      "caption": "ボールを投げた距離（m）は大目盛り10ごと、人数（人）は大目盛り2ごと。補助目盛りは横5、縦1です。 各階級は左端以上・右端未満です。",
      "alt": "ボールを投げた距離（m）は大目盛り10ごと、人数（人）は大目盛り2ごと。補助目盛りは横5、縦1です。"
    }
  },
  {
    "id": "math_g6_course_data_025",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "data",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "6人の記録が小さい順に4, 6, 9, 11, 12, 14です。中央値はいくつですか。",
    "answer": "10",
    "choices": [
      "9",
      "11",
      "20",
      "10"
    ],
    "hints": [
      "記録が偶数個なら、中央の2つの平均を求めます。"
    ],
    "explanation": "(9＋11)÷2＝10です。\n\nほかの選択肢\n・「9」：中央の小さいほうだけを答えています。\n・「11」：中央の大きいほうだけを答えています。\n・「20」：中央2つを足した後に2で割っていません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "9",
        "reason": "中央の小さいほうだけを答えています。"
      },
      {
        "answer": "11",
        "reason": "中央の大きいほうだけを答えています。"
      },
      {
        "answer": "20",
        "reason": "中央2つを足した後に2で割っていません。"
      }
    ],
    "authoring": {
      "family": "data_4",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_data_026",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "data",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "100点満点のテストで、4人の得点は46, 56, 66, 76点です。5人目を加えた平均が65点になりました。5人目は何点ですか。",
    "answer": "81",
    "choices": [
      "61",
      "20",
      "81",
      "65"
    ],
    "hints": [
      "5人の平均から5人の合計を求めます。"
    ],
    "explanation": "5人の合計は65×5＝325点。初めの合計244点を引き、81点です。\n\nほかの選択肢\n・「65」：全体の平均を5人目の点数としています。\n・「61」：初めの4人の平均を答えています。\n・「20」：初めの平均に5をかけて、初めの合計を大きく計算しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "65",
        "reason": "全体の平均を5人目の点数としています。"
      },
      {
        "answer": "61",
        "reason": "初めの4人の平均を答えています。"
      },
      {
        "answer": "20",
        "reason": "初めの平均に5をかけて、初めの合計を大きく計算しています。"
      }
    ],
    "authoring": {
      "family": "data_5",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_data_027",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "data",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "次の22人のグラフは、ボールを投げた距離の記録を10mずつの階級に分けたものです。記録が20m未満の人は何人ですか。",
    "answer": "11",
    "choices": [
      "22",
      "11",
      "7",
      "16"
    ],
    "hints": [
      "20m未満に当たる柱をすべて選びます。"
    ],
    "explanation": "0以上10未満の4人と、10以上20未満の7人を足し、11人です。\n\nほかの選択肢\n・「7」：10以上20未満の階級だけを読んでいます。\n・「16」：20以上30未満の人までふくめています。\n・「22」：条件を付けず全員を数えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "7",
        "reason": "10以上20未満の階級だけを読んでいます。"
      },
      {
        "answer": "16",
        "reason": "20以上30未満の人までふくめています。"
      },
      {
        "answer": "22",
        "reason": "条件を付けず全員を数えています。"
      }
    ],
    "authoring": {
      "family": "data_3",
      "parameters": {
        "n": 3
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-data_3-3.svg",
      "caption": "ボールを投げた距離（m）は大目盛り10ごと、人数（人）は大目盛り2ごと。補助目盛りは横5、縦1です。 各階級は左端以上・右端未満です。",
      "alt": "ボールを投げた距離（m）は大目盛り10ごと、人数（人）は大目盛り2ごと。補助目盛りは横5、縦1です。"
    }
  },
  {
    "id": "math_g6_course_data_028",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "data",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "6人の記録が小さい順に5, 7, 10, 12, 13, 15です。中央値はいくつですか。",
    "answer": "11",
    "choices": [
      "11",
      "10",
      "12",
      "22"
    ],
    "hints": [
      "記録が偶数個なら、中央の2つの平均を求めます。"
    ],
    "explanation": "(10＋12)÷2＝11です。\n\nほかの選択肢\n・「10」：中央の小さいほうだけを答えています。\n・「12」：中央の大きいほうだけを答えています。\n・「22」：中央2つを足した後に2で割っていません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "10",
        "reason": "中央の小さいほうだけを答えています。"
      },
      {
        "answer": "12",
        "reason": "中央の大きいほうだけを答えています。"
      },
      {
        "answer": "22",
        "reason": "中央2つを足した後に2で割っていません。"
      }
    ],
    "authoring": {
      "family": "data_4",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_data_029",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "data",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "100点満点のテストで、4人の得点は49, 59, 69, 79点です。5人目を加えた平均が68点になりました。5人目は何点ですか。",
    "answer": "84",
    "choices": [
      "68",
      "64",
      "20",
      "84"
    ],
    "hints": [
      "5人の平均から5人の合計を求めます。"
    ],
    "explanation": "5人の合計は68×5＝340点。初めの合計256点を引き、84点です。\n\nほかの選択肢\n・「68」：全体の平均を5人目の点数としています。\n・「64」：初めの4人の平均を答えています。\n・「20」：初めの平均に5をかけて、初めの合計を大きく計算しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "68",
        "reason": "全体の平均を5人目の点数としています。"
      },
      {
        "answer": "64",
        "reason": "初めの4人の平均を答えています。"
      },
      {
        "answer": "20",
        "reason": "初めの平均に5をかけて、初めの合計を大きく計算しています。"
      }
    ],
    "authoring": {
      "family": "data_5",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_data_030",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "data",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "次の26人のグラフは、ボールを投げた距離の記録を10mずつの階級に分けたものです。記録が20m未満の人は何人ですか。",
    "answer": "13",
    "choices": [
      "19",
      "26",
      "13",
      "8"
    ],
    "hints": [
      "20m未満に当たる柱をすべて選びます。"
    ],
    "explanation": "0以上10未満の5人と、10以上20未満の8人を足し、13人です。\n\nほかの選択肢\n・「8」：10以上20未満の階級だけを読んでいます。\n・「19」：20以上30未満の人までふくめています。\n・「26」：条件を付けず全員を数えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "8",
        "reason": "10以上20未満の階級だけを読んでいます。"
      },
      {
        "answer": "19",
        "reason": "20以上30未満の人までふくめています。"
      },
      {
        "answer": "26",
        "reason": "条件を付けず全員を数えています。"
      }
    ],
    "authoring": {
      "family": "data_3",
      "parameters": {
        "n": 4
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-data_3-4.svg",
      "caption": "ボールを投げた距離（m）は大目盛り10ごと、人数（人）は大目盛り2ごと。補助目盛りは横5、縦1です。 各階級は左端以上・右端未満です。",
      "alt": "ボールを投げた距離（m）は大目盛り10ごと、人数（人）は大目盛り2ごと。補助目盛りは横5、縦1です。"
    }
  },
  {
    "id": "math_g6_course_data_031",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "data",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "6人の記録が小さい順に6, 8, 11, 13, 14, 16です。中央値はいくつですか。",
    "answer": "12",
    "choices": [
      "24",
      "12",
      "11",
      "13"
    ],
    "hints": [
      "記録が偶数個なら、中央の2つの平均を求めます。"
    ],
    "explanation": "(11＋13)÷2＝12です。\n\nほかの選択肢\n・「11」：中央の小さいほうだけを答えています。\n・「13」：中央の大きいほうだけを答えています。\n・「24」：中央2つを足した後に2で割っていません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "11",
        "reason": "中央の小さいほうだけを答えています。"
      },
      {
        "answer": "13",
        "reason": "中央の大きいほうだけを答えています。"
      },
      {
        "answer": "24",
        "reason": "中央2つを足した後に2で割っていません。"
      }
    ],
    "authoring": {
      "family": "data_4",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_data_032",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "data",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "100点満点のテストで、4人の得点は52, 62, 72, 82点です。5人目を加えた平均が71点になりました。5人目は何点ですか。",
    "answer": "87",
    "choices": [
      "87",
      "71",
      "67",
      "20"
    ],
    "hints": [
      "5人の平均から5人の合計を求めます。"
    ],
    "explanation": "5人の合計は71×5＝355点。初めの合計268点を引き、87点です。\n\nほかの選択肢\n・「71」：全体の平均を5人目の点数としています。\n・「67」：初めの4人の平均を答えています。\n・「20」：初めの平均に5をかけて、初めの合計を大きく計算しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "71",
        "reason": "全体の平均を5人目の点数としています。"
      },
      {
        "answer": "67",
        "reason": "初めの4人の平均を答えています。"
      },
      {
        "answer": "20",
        "reason": "初めの平均に5をかけて、初めの合計を大きく計算しています。"
      }
    ],
    "authoring": {
      "family": "data_5",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_data_033",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "data",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "次の30人のグラフは、ボールを投げた距離の記録を10mずつの階級に分けたものです。記録が20m未満の人は何人ですか。",
    "answer": "15",
    "choices": [
      "9",
      "22",
      "30",
      "15"
    ],
    "hints": [
      "20m未満に当たる柱をすべて選びます。"
    ],
    "explanation": "0以上10未満の6人と、10以上20未満の9人を足し、15人です。\n\nほかの選択肢\n・「9」：10以上20未満の階級だけを読んでいます。\n・「22」：20以上30未満の人までふくめています。\n・「30」：条件を付けず全員を数えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "9",
        "reason": "10以上20未満の階級だけを読んでいます。"
      },
      {
        "answer": "22",
        "reason": "20以上30未満の人までふくめています。"
      },
      {
        "answer": "30",
        "reason": "条件を付けず全員を数えています。"
      }
    ],
    "authoring": {
      "family": "data_3",
      "parameters": {
        "n": 5
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-data_3-5.svg",
      "caption": "ボールを投げた距離（m）は大目盛り10ごと、人数（人）は大目盛り2ごと。補助目盛りは横5、縦1です。 各階級は左端以上・右端未満です。",
      "alt": "ボールを投げた距離（m）は大目盛り10ごと、人数（人）は大目盛り2ごと。補助目盛りは横5、縦1です。"
    }
  },
  {
    "id": "math_g6_course_data_034",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "data",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "6人の記録が小さい順に7, 9, 12, 14, 15, 17です。中央値はいくつですか。",
    "answer": "13",
    "choices": [
      "14",
      "26",
      "13",
      "12"
    ],
    "hints": [
      "記録が偶数個なら、中央の2つの平均を求めます。"
    ],
    "explanation": "(12＋14)÷2＝13です。\n\nほかの選択肢\n・「12」：中央の小さいほうだけを答えています。\n・「14」：中央の大きいほうだけを答えています。\n・「26」：中央2つを足した後に2で割っていません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "12",
        "reason": "中央の小さいほうだけを答えています。"
      },
      {
        "answer": "14",
        "reason": "中央の大きいほうだけを答えています。"
      },
      {
        "answer": "26",
        "reason": "中央2つを足した後に2で割っていません。"
      }
    ],
    "authoring": {
      "family": "data_4",
      "parameters": {
        "n": 5
      }
    }
  },
  {
    "id": "math_g6_course_data_035",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "data",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "100点満点のテストで、4人の得点は55, 65, 75, 85点です。5人目を加えた平均が74点になりました。5人目は何点ですか。",
    "answer": "90",
    "choices": [
      "20",
      "90",
      "74",
      "70"
    ],
    "hints": [
      "5人の平均から5人の合計を求めます。"
    ],
    "explanation": "5人の合計は74×5＝370点。初めの合計280点を引き、90点です。\n\nほかの選択肢\n・「74」：全体の平均を5人目の点数としています。\n・「70」：初めの4人の平均を答えています。\n・「20」：初めの平均に5をかけて、初めの合計を大きく計算しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "74",
        "reason": "全体の平均を5人目の点数としています。"
      },
      {
        "answer": "70",
        "reason": "初めの4人の平均を答えています。"
      },
      {
        "answer": "20",
        "reason": "初めの平均に5をかけて、初めの合計を大きく計算しています。"
      }
    ],
    "authoring": {
      "family": "data_5",
      "parameters": {
        "n": 5
      }
    }
  },
  {
    "id": "math_g6_course_data_036",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "data",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "A組の記録は3, 5, 7, 9, 11、B組は1, 5, 7, 9, 15です。正しい説明はどれですか。",
    "answer": "中央値は同じで、平均はB組のほうが大きい",
    "choices": [
      "中央値は同じで、平均はB組のほうが大きい",
      "平均も中央値も同じ",
      "平均はA組のほうが大きい",
      "中央値はB組のほうが大きい"
    ],
    "hints": [
      "平均と中央値を別々に計算します。",
      "最大値だけで判断せず、合計と中央の位置を確かめましょう。"
    ],
    "explanation": "中央値はどちらも7。平均はA組7、B組37/5で、B組が大きいです。\n\nほかの選択肢\n・「平均も中央値も同じ」：中央値が同じでも、合計が{違|ちが}うので平均は{違|ちが}います。\n・「平均はA組のほうが大きい」：合計はB組のほうが大きく、人数は同じです。\n・「中央値はB組のほうが大きい」：どちらも中央の3番目は同じ値です。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "平均も中央値も同じ",
        "reason": "中央値が同じでも、合計が{違|ちが}うので平均は{違|ちが}います。"
      },
      {
        "answer": "平均はA組のほうが大きい",
        "reason": "合計はB組のほうが大きく、人数は同じです。"
      },
      {
        "answer": "中央値はB組のほうが大きい",
        "reason": "どちらも中央の3番目は同じ値です。"
      }
    ],
    "authoring": {
      "family": "data_6",
      "parameters": {
        "n": 1
      }
    },
    "diagram": {
      "kind": "table",
      "head": [
        "組",
        "小さい順の記録"
      ],
      "rows": [
        [
          "A",
          "3, 5, 7, 9, 11"
        ],
        [
          "B",
          "1, 5, 7, 9, 15"
        ]
      ],
      "caption": "1組5人の記録です。"
    }
  },
  {
    "id": "math_g6_course_data_037",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "data",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "グラフは14人のボールを投げた距離です。30m以上の人と10m未満の人を除くと、何人残りますか。",
    "answer": "9",
    "choices": [
      "12",
      "11",
      "5",
      "9"
    ],
    "hints": [
      "両端の階級の人数をそれぞれ読みます。",
      "全体から両端を引くか、残る中央2つを足します。"
    ],
    "explanation": "14－3－2＝9人。中央2つの4＋5でも同じです。\n\nほかの選択肢\n・「12」：30m以上だけを除き、10m未満を除いていません。\n・「11」：10m未満だけを除いています。\n・「5」：除く人を合計し、残る人と取り{違|ちが}えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "12",
        "reason": "30m以上だけを除き、10m未満を除いていません。"
      },
      {
        "answer": "11",
        "reason": "10m未満だけを除いています。"
      },
      {
        "answer": "5",
        "reason": "除く人を合計し、残る人と取り{違|ちが}えています。"
      }
    ],
    "authoring": {
      "family": "data_7",
      "parameters": {
        "n": 1
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-data_7-1.svg",
      "caption": "ボールを投げた距離（m）は大目盛り10ごと、人数（人）は大目盛り2ごと。補助目盛りは横5、縦1です。 各階級は左端以上・右端未満です。",
      "alt": "ボールを投げた距離（m）は大目盛り10ごと、人数（人）は大目盛り2ごと。補助目盛りは横5、縦1です。"
    }
  },
  {
    "id": "math_g6_course_data_038",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "data",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "A組の記録は4, 6, 8, 10, 12、B組は2, 6, 8, 10, 16です。正しい説明はどれですか。",
    "answer": "中央値は同じで、平均はB組のほうが大きい",
    "choices": [
      "平均はA組のほうが大きい",
      "中央値はB組のほうが大きい",
      "中央値は同じで、平均はB組のほうが大きい",
      "平均も中央値も同じ"
    ],
    "hints": [
      "平均と中央値を別々に計算します。",
      "最大値だけで判断せず、合計と中央の位置を確かめましょう。"
    ],
    "explanation": "中央値はどちらも8。平均はA組8、B組42/5で、B組が大きいです。\n\nほかの選択肢\n・「平均も中央値も同じ」：中央値が同じでも、合計が{違|ちが}うので平均は{違|ちが}います。\n・「平均はA組のほうが大きい」：合計はB組のほうが大きく、人数は同じです。\n・「中央値はB組のほうが大きい」：どちらも中央の3番目は同じ値です。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "平均も中央値も同じ",
        "reason": "中央値が同じでも、合計が{違|ちが}うので平均は{違|ちが}います。"
      },
      {
        "answer": "平均はA組のほうが大きい",
        "reason": "合計はB組のほうが大きく、人数は同じです。"
      },
      {
        "answer": "中央値はB組のほうが大きい",
        "reason": "どちらも中央の3番目は同じ値です。"
      }
    ],
    "authoring": {
      "family": "data_6",
      "parameters": {
        "n": 2
      }
    },
    "diagram": {
      "kind": "table",
      "head": [
        "組",
        "小さい順の記録"
      ],
      "rows": [
        [
          "A",
          "4, 6, 8, 10, 12"
        ],
        [
          "B",
          "2, 6, 8, 10, 16"
        ]
      ],
      "caption": "1組5人の記録です。"
    }
  },
  {
    "id": "math_g6_course_data_039",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "data",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "グラフは18人のボールを投げた距離です。30m以上の人と10m未満の人を除くと、何人残りますか。",
    "answer": "11",
    "choices": [
      "7",
      "11",
      "15",
      "14"
    ],
    "hints": [
      "両端の階級の人数をそれぞれ読みます。",
      "全体から両端を引くか、残る中央2つを足します。"
    ],
    "explanation": "18－4－3＝11人。中央2つの5＋6でも同じです。\n\nほかの選択肢\n・「15」：30m以上だけを除き、10m未満を除いていません。\n・「14」：10m未満だけを除いています。\n・「7」：除く人を合計し、残る人と取り{違|ちが}えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "15",
        "reason": "30m以上だけを除き、10m未満を除いていません。"
      },
      {
        "answer": "14",
        "reason": "10m未満だけを除いています。"
      },
      {
        "answer": "7",
        "reason": "除く人を合計し、残る人と取り{違|ちが}えています。"
      }
    ],
    "authoring": {
      "family": "data_7",
      "parameters": {
        "n": 2
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-data_7-2.svg",
      "caption": "ボールを投げた距離（m）は大目盛り10ごと、人数（人）は大目盛り2ごと。補助目盛りは横5、縦1です。 各階級は左端以上・右端未満です。",
      "alt": "ボールを投げた距離（m）は大目盛り10ごと、人数（人）は大目盛り2ごと。補助目盛りは横5、縦1です。"
    }
  },
  {
    "id": "math_g6_course_data_040",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "data",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "A組の記録は5, 7, 9, 11, 13、B組は3, 7, 9, 11, 17です。正しい説明はどれですか。",
    "answer": "中央値は同じで、平均はB組のほうが大きい",
    "choices": [
      "中央値は同じで、平均はB組のほうが大きい",
      "平均も中央値も同じ",
      "平均はA組のほうが大きい",
      "中央値はB組のほうが大きい"
    ],
    "hints": [
      "平均と中央値を別々に計算します。",
      "最大値だけで判断せず、合計と中央の位置を確かめましょう。"
    ],
    "explanation": "中央値はどちらも9。平均はA組9、B組47/5で、B組が大きいです。\n\nほかの選択肢\n・「平均も中央値も同じ」：中央値が同じでも、合計が{違|ちが}うので平均は{違|ちが}います。\n・「平均はA組のほうが大きい」：合計はB組のほうが大きく、人数は同じです。\n・「中央値はB組のほうが大きい」：どちらも中央の3番目は同じ値です。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "平均も中央値も同じ",
        "reason": "中央値が同じでも、合計が{違|ちが}うので平均は{違|ちが}います。"
      },
      {
        "answer": "平均はA組のほうが大きい",
        "reason": "合計はB組のほうが大きく、人数は同じです。"
      },
      {
        "answer": "中央値はB組のほうが大きい",
        "reason": "どちらも中央の3番目は同じ値です。"
      }
    ],
    "authoring": {
      "family": "data_6",
      "parameters": {
        "n": 3
      }
    },
    "diagram": {
      "kind": "table",
      "head": [
        "組",
        "小さい順の記録"
      ],
      "rows": [
        [
          "A",
          "5, 7, 9, 11, 13"
        ],
        [
          "B",
          "3, 7, 9, 11, 17"
        ]
      ],
      "caption": "1組5人の記録です。"
    }
  },
  {
    "id": "math_g6_course_data_041",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "data",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "グラフは22人のボールを投げた距離です。30m以上の人と10m未満の人を除くと、何人残りますか。",
    "answer": "13",
    "choices": [
      "18",
      "17",
      "9",
      "13"
    ],
    "hints": [
      "両端の階級の人数をそれぞれ読みます。",
      "全体から両端を引くか、残る中央2つを足します。"
    ],
    "explanation": "22－5－4＝13人。中央2つの6＋7でも同じです。\n\nほかの選択肢\n・「18」：30m以上だけを除き、10m未満を除いていません。\n・「17」：10m未満だけを除いています。\n・「9」：除く人を合計し、残る人と取り{違|ちが}えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "18",
        "reason": "30m以上だけを除き、10m未満を除いていません。"
      },
      {
        "answer": "17",
        "reason": "10m未満だけを除いています。"
      },
      {
        "answer": "9",
        "reason": "除く人を合計し、残る人と取り{違|ちが}えています。"
      }
    ],
    "authoring": {
      "family": "data_7",
      "parameters": {
        "n": 3
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-data_7-3.svg",
      "caption": "ボールを投げた距離（m）は大目盛り10ごと、人数（人）は大目盛り2ごと。補助目盛りは横5、縦1です。 各階級は左端以上・右端未満です。",
      "alt": "ボールを投げた距離（m）は大目盛り10ごと、人数（人）は大目盛り2ごと。補助目盛りは横5、縦1です。"
    }
  },
  {
    "id": "math_g6_course_data_042",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "data",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "A組の記録は6, 8, 10, 12, 14、B組は4, 8, 10, 12, 18です。正しい説明はどれですか。",
    "answer": "中央値は同じで、平均はB組のほうが大きい",
    "choices": [
      "平均はA組のほうが大きい",
      "中央値はB組のほうが大きい",
      "中央値は同じで、平均はB組のほうが大きい",
      "平均も中央値も同じ"
    ],
    "hints": [
      "平均と中央値を別々に計算します。",
      "最大値だけで判断せず、合計と中央の位置を確かめましょう。"
    ],
    "explanation": "中央値はどちらも10。平均はA組10、B組52/5で、B組が大きいです。\n\nほかの選択肢\n・「平均も中央値も同じ」：中央値が同じでも、合計が{違|ちが}うので平均は{違|ちが}います。\n・「平均はA組のほうが大きい」：合計はB組のほうが大きく、人数は同じです。\n・「中央値はB組のほうが大きい」：どちらも中央の3番目は同じ値です。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "平均も中央値も同じ",
        "reason": "中央値が同じでも、合計が{違|ちが}うので平均は{違|ちが}います。"
      },
      {
        "answer": "平均はA組のほうが大きい",
        "reason": "合計はB組のほうが大きく、人数は同じです。"
      },
      {
        "answer": "中央値はB組のほうが大きい",
        "reason": "どちらも中央の3番目は同じ値です。"
      }
    ],
    "authoring": {
      "family": "data_6",
      "parameters": {
        "n": 4
      }
    },
    "diagram": {
      "kind": "table",
      "head": [
        "組",
        "小さい順の記録"
      ],
      "rows": [
        [
          "A",
          "6, 8, 10, 12, 14"
        ],
        [
          "B",
          "4, 8, 10, 12, 18"
        ]
      ],
      "caption": "1組5人の記録です。"
    }
  },
  {
    "id": "math_g6_course_data_043",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "data",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "グラフは26人のボールを投げた距離です。30m以上の人と10m未満の人を除くと、何人残りますか。",
    "answer": "15",
    "choices": [
      "11",
      "15",
      "21",
      "20"
    ],
    "hints": [
      "両端の階級の人数をそれぞれ読みます。",
      "全体から両端を引くか、残る中央2つを足します。"
    ],
    "explanation": "26－6－5＝15人。中央2つの7＋8でも同じです。\n\nほかの選択肢\n・「21」：30m以上だけを除き、10m未満を除いていません。\n・「20」：10m未満だけを除いています。\n・「11」：除く人を合計し、残る人と取り{違|ちが}えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "21",
        "reason": "30m以上だけを除き、10m未満を除いていません。"
      },
      {
        "answer": "20",
        "reason": "10m未満だけを除いています。"
      },
      {
        "answer": "11",
        "reason": "除く人を合計し、残る人と取り{違|ちが}えています。"
      }
    ],
    "authoring": {
      "family": "data_7",
      "parameters": {
        "n": 4
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-data_7-4.svg",
      "caption": "ボールを投げた距離（m）は大目盛り10ごと、人数（人）は大目盛り2ごと。補助目盛りは横5、縦1です。 各階級は左端以上・右端未満です。",
      "alt": "ボールを投げた距離（m）は大目盛り10ごと、人数（人）は大目盛り2ごと。補助目盛りは横5、縦1です。"
    }
  },
  {
    "id": "math_g6_course_data_044",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "data",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "A組の記録は7, 9, 11, 13, 15、B組は5, 9, 11, 13, 19です。正しい説明はどれですか。",
    "answer": "中央値は同じで、平均はB組のほうが大きい",
    "choices": [
      "中央値は同じで、平均はB組のほうが大きい",
      "平均も中央値も同じ",
      "平均はA組のほうが大きい",
      "中央値はB組のほうが大きい"
    ],
    "hints": [
      "平均と中央値を別々に計算します。",
      "最大値だけで判断せず、合計と中央の位置を確かめましょう。"
    ],
    "explanation": "中央値はどちらも11。平均はA組11、B組57/5で、B組が大きいです。\n\nほかの選択肢\n・「平均も中央値も同じ」：中央値が同じでも、合計が{違|ちが}うので平均は{違|ちが}います。\n・「平均はA組のほうが大きい」：合計はB組のほうが大きく、人数は同じです。\n・「中央値はB組のほうが大きい」：どちらも中央の3番目は同じ値です。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "平均も中央値も同じ",
        "reason": "中央値が同じでも、合計が{違|ちが}うので平均は{違|ちが}います。"
      },
      {
        "answer": "平均はA組のほうが大きい",
        "reason": "合計はB組のほうが大きく、人数は同じです。"
      },
      {
        "answer": "中央値はB組のほうが大きい",
        "reason": "どちらも中央の3番目は同じ値です。"
      }
    ],
    "authoring": {
      "family": "data_6",
      "parameters": {
        "n": 5
      }
    },
    "diagram": {
      "kind": "table",
      "head": [
        "組",
        "小さい順の記録"
      ],
      "rows": [
        [
          "A",
          "7, 9, 11, 13, 15"
        ],
        [
          "B",
          "5, 9, 11, 13, 19"
        ]
      ],
      "caption": "1組5人の記録です。"
    }
  },
  {
    "id": "math_g6_course_data_045",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "data",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "グラフは30人のボールを投げた距離です。30m以上の人と10m未満の人を除くと、何人残りますか。",
    "answer": "17",
    "choices": [
      "24",
      "23",
      "13",
      "17"
    ],
    "hints": [
      "両端の階級の人数をそれぞれ読みます。",
      "全体から両端を引くか、残る中央2つを足します。"
    ],
    "explanation": "30－7－6＝17人。中央2つの8＋9でも同じです。\n\nほかの選択肢\n・「24」：30m以上だけを除き、10m未満を除いていません。\n・「23」：10m未満だけを除いています。\n・「13」：除く人を合計し、残る人と取り{違|ちが}えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "24",
        "reason": "30m以上だけを除き、10m未満を除いていません。"
      },
      {
        "answer": "23",
        "reason": "10m未満だけを除いています。"
      },
      {
        "answer": "13",
        "reason": "除く人を合計し、残る人と取り{違|ちが}えています。"
      }
    ],
    "authoring": {
      "family": "data_7",
      "parameters": {
        "n": 5
      }
    },
    "diagram": {
      "kind": "image",
      "src": "codex-prototypes/homepage/g6-figures/g6-data_7-5.svg",
      "caption": "ボールを投げた距離（m）は大目盛り10ごと、人数（人）は大目盛り2ごと。補助目盛りは横5、縦1です。 各階級は左端以上・右端未満です。",
      "alt": "ボールを投げた距離（m）は大目盛り10ごと、人数（人）は大目盛り2ごと。補助目盛りは横5、縦1です。"
    }
  },
  {
    "id": "math_g6_course_case_009",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "case",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "上着3種類とズボン4種類から1つずつ選びます。組み合わせは何通りですか。",
    "answer": "12",
    "choices": [
      "7",
      "4",
      "9",
      "12"
    ],
    "hints": [
      "上着1種類ごとにズボンが何通りあるか考えます。"
    ],
    "explanation": "3×4＝12通りです。\n\nほかの選択肢\n・「7」：種類の数を足しています。\n・「4」：上着を1種類に固定しています。\n・「9」：上着とズボンが同じ種類数だとしています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "7",
        "reason": "種類の数を足しています。"
      },
      {
        "answer": "4",
        "reason": "上着を1種類に固定しています。"
      },
      {
        "answer": "9",
        "reason": "上着とズボンが同じ種類数だとしています。"
      }
    ],
    "authoring": {
      "family": "case_0",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_case_010",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "case",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "4人から2人を選んで組を作ります。順序を区別しない組は何通りですか。",
    "answer": "6",
    "choices": [
      "16",
      "3",
      "6",
      "12"
    ],
    "hints": [
      "1人を選んだら、もう1人は残りから選びます。",
      "順序を区別しないので、2回数えた分を直します。"
    ],
    "explanation": "4×3÷2＝6通りです。\n\nほかの選択肢\n・「12」：ABとBAを別の組として2回数えています。\n・「16」：同じ人を2回選ぶ場合もふくめています。\n・「3」：1人を固定した組だけを数えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "12",
        "reason": "ABとBAを別の組として2回数えています。"
      },
      {
        "answer": "16",
        "reason": "同じ人を2回選ぶ場合もふくめています。"
      },
      {
        "answer": "3",
        "reason": "1人を固定した組だけを数えています。"
      }
    ],
    "authoring": {
      "family": "case_1",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_case_011",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "case",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "パン3種類、飲み物4種類、デザート2種類から1つずつ選びます。選び方は何通りですか。",
    "answer": "24",
    "choices": [
      "8",
      "24",
      "9",
      "12"
    ],
    "hints": [
      "選ぶ順に枝を分けると、各種類数をかけられます。"
    ],
    "explanation": "3×4×2＝24通りです。\n\nほかの選択肢\n・「9」：種類の数を足しています。\n・「12」：デザートの選び方をかけ忘れています。\n・「8」：パンを1種類に固定しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "9",
        "reason": "種類の数を足しています。"
      },
      {
        "answer": "12",
        "reason": "デザートの選び方をかけ忘れています。"
      },
      {
        "answer": "8",
        "reason": "パンを1種類に固定しています。"
      }
    ],
    "authoring": {
      "family": "case_2",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_case_012",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "case",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "上着4種類とズボン5種類から1つずつ選びます。組み合わせは何通りですか。",
    "answer": "20",
    "choices": [
      "20",
      "9",
      "5",
      "16"
    ],
    "hints": [
      "上着1種類ごとにズボンが何通りあるか考えます。"
    ],
    "explanation": "4×5＝20通りです。\n\nほかの選択肢\n・「9」：種類の数を足しています。\n・「5」：上着を1種類に固定しています。\n・「16」：上着とズボンが同じ種類数だとしています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "9",
        "reason": "種類の数を足しています。"
      },
      {
        "answer": "5",
        "reason": "上着を1種類に固定しています。"
      },
      {
        "answer": "16",
        "reason": "上着とズボンが同じ種類数だとしています。"
      }
    ],
    "authoring": {
      "family": "case_0",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_case_013",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "case",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "5人から2人を選んで組を作ります。順序を区別しない組は何通りですか。",
    "answer": "10",
    "choices": [
      "20",
      "25",
      "4",
      "10"
    ],
    "hints": [
      "1人を選んだら、もう1人は残りから選びます。",
      "順序を区別しないので、2回数えた分を直します。"
    ],
    "explanation": "5×4÷2＝10通りです。\n\nほかの選択肢\n・「20」：ABとBAを別の組として2回数えています。\n・「25」：同じ人を2回選ぶ場合もふくめています。\n・「4」：1人を固定した組だけを数えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "20",
        "reason": "ABとBAを別の組として2回数えています。"
      },
      {
        "answer": "25",
        "reason": "同じ人を2回選ぶ場合もふくめています。"
      },
      {
        "answer": "4",
        "reason": "1人を固定した組だけを数えています。"
      }
    ],
    "authoring": {
      "family": "case_1",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_case_014",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "case",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "パン4種類、飲み物5種類、デザート2種類から1つずつ選びます。選び方は何通りですか。",
    "answer": "40",
    "choices": [
      "20",
      "10",
      "40",
      "11"
    ],
    "hints": [
      "選ぶ順に枝を分けると、各種類数をかけられます。"
    ],
    "explanation": "4×5×2＝40通りです。\n\nほかの選択肢\n・「11」：種類の数を足しています。\n・「20」：デザートの選び方をかけ忘れています。\n・「10」：パンを1種類に固定しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "11",
        "reason": "種類の数を足しています。"
      },
      {
        "answer": "20",
        "reason": "デザートの選び方をかけ忘れています。"
      },
      {
        "answer": "10",
        "reason": "パンを1種類に固定しています。"
      }
    ],
    "authoring": {
      "family": "case_2",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_case_015",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "case",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "上着5種類とズボン6種類から1つずつ選びます。組み合わせは何通りですか。",
    "answer": "30",
    "choices": [
      "25",
      "30",
      "11",
      "6"
    ],
    "hints": [
      "上着1種類ごとにズボンが何通りあるか考えます。"
    ],
    "explanation": "5×6＝30通りです。\n\nほかの選択肢\n・「11」：種類の数を足しています。\n・「6」：上着を1種類に固定しています。\n・「25」：上着とズボンが同じ種類数だとしています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "11",
        "reason": "種類の数を足しています。"
      },
      {
        "answer": "6",
        "reason": "上着を1種類に固定しています。"
      },
      {
        "answer": "25",
        "reason": "上着とズボンが同じ種類数だとしています。"
      }
    ],
    "authoring": {
      "family": "case_0",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_case_016",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "case",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "6人から2人を選んで組を作ります。順序を区別しない組は何通りですか。",
    "answer": "15",
    "choices": [
      "15",
      "30",
      "36",
      "5"
    ],
    "hints": [
      "1人を選んだら、もう1人は残りから選びます。",
      "順序を区別しないので、2回数えた分を直します。"
    ],
    "explanation": "6×5÷2＝15通りです。\n\nほかの選択肢\n・「30」：ABとBAを別の組として2回数えています。\n・「36」：同じ人を2回選ぶ場合もふくめています。\n・「5」：1人を固定した組だけを数えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "30",
        "reason": "ABとBAを別の組として2回数えています。"
      },
      {
        "answer": "36",
        "reason": "同じ人を2回選ぶ場合もふくめています。"
      },
      {
        "answer": "5",
        "reason": "1人を固定した組だけを数えています。"
      }
    ],
    "authoring": {
      "family": "case_1",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_case_017",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "case",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "パン5種類、飲み物6種類、デザート2種類から1つずつ選びます。選び方は何通りですか。",
    "answer": "60",
    "choices": [
      "13",
      "30",
      "12",
      "60"
    ],
    "hints": [
      "選ぶ順に枝を分けると、各種類数をかけられます。"
    ],
    "explanation": "5×6×2＝60通りです。\n\nほかの選択肢\n・「13」：種類の数を足しています。\n・「30」：デザートの選び方をかけ忘れています。\n・「12」：パンを1種類に固定しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "13",
        "reason": "種類の数を足しています。"
      },
      {
        "answer": "30",
        "reason": "デザートの選び方をかけ忘れています。"
      },
      {
        "answer": "12",
        "reason": "パンを1種類に固定しています。"
      }
    ],
    "authoring": {
      "family": "case_2",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_case_018",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "case",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "上着6種類とズボン7種類から1つずつ選びます。組み合わせは何通りですか。",
    "answer": "42",
    "choices": [
      "7",
      "36",
      "42",
      "13"
    ],
    "hints": [
      "上着1種類ごとにズボンが何通りあるか考えます。"
    ],
    "explanation": "6×7＝42通りです。\n\nほかの選択肢\n・「13」：種類の数を足しています。\n・「7」：上着を1種類に固定しています。\n・「36」：上着とズボンが同じ種類数だとしています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "13",
        "reason": "種類の数を足しています。"
      },
      {
        "answer": "7",
        "reason": "上着を1種類に固定しています。"
      },
      {
        "answer": "36",
        "reason": "上着とズボンが同じ種類数だとしています。"
      }
    ],
    "authoring": {
      "family": "case_0",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_case_019",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "case",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "7人から2人を選んで組を作ります。順序を区別しない組は何通りですか。",
    "answer": "21",
    "choices": [
      "6",
      "21",
      "42",
      "49"
    ],
    "hints": [
      "1人を選んだら、もう1人は残りから選びます。",
      "順序を区別しないので、2回数えた分を直します。"
    ],
    "explanation": "7×6÷2＝21通りです。\n\nほかの選択肢\n・「42」：ABとBAを別の組として2回数えています。\n・「49」：同じ人を2回選ぶ場合もふくめています。\n・「6」：1人を固定した組だけを数えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "42",
        "reason": "ABとBAを別の組として2回数えています。"
      },
      {
        "answer": "49",
        "reason": "同じ人を2回選ぶ場合もふくめています。"
      },
      {
        "answer": "6",
        "reason": "1人を固定した組だけを数えています。"
      }
    ],
    "authoring": {
      "family": "case_1",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_case_020",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "case",
    "difficulty": "basic",
    "answerType": "choice",
    "question": "パン6種類、飲み物7種類、デザート2種類から1つずつ選びます。選び方は何通りですか。",
    "answer": "84",
    "choices": [
      "84",
      "15",
      "42",
      "14"
    ],
    "hints": [
      "選ぶ順に枝を分けると、各種類数をかけられます。"
    ],
    "explanation": "6×7×2＝84通りです。\n\nほかの選択肢\n・「15」：種類の数を足しています。\n・「42」：デザートの選び方をかけ忘れています。\n・「14」：パンを1種類に固定しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "15",
        "reason": "種類の数を足しています。"
      },
      {
        "answer": "42",
        "reason": "デザートの選び方をかけ忘れています。"
      },
      {
        "answer": "14",
        "reason": "パンを1種類に固定しています。"
      }
    ],
    "authoring": {
      "family": "case_2",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_case_021",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "case",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "5チームが、ほかのすべてのチームと1回ずつ試合をします。全部で何試合ですか。",
    "answer": "10",
    "choices": [
      "20",
      "15",
      "4",
      "10"
    ],
    "hints": [
      "対戦する2チームの組を、重複しないように数えます。"
    ],
    "explanation": "5×4÷2＝10試合です。\n\nほかの選択肢\n・「20」：同じ試合を両チームから2回数えています。\n・「15」：自分自身との組までふくめています。\n・「4」：1チームがする試合だけを答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "20",
        "reason": "同じ試合を両チームから2回数えています。"
      },
      {
        "answer": "15",
        "reason": "自分自身との組までふくめています。"
      },
      {
        "answer": "4",
        "reason": "1チームがする試合だけを答えています。"
      }
    ],
    "authoring": {
      "family": "case_3",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_case_022",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "case",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "1から4までの数字カードを1枚ずつ用意します。異なる2枚を使って2桁の整数を作ると、何個できますか。",
    "answer": "12",
    "choices": [
      "6",
      "3",
      "12",
      "16"
    ],
    "hints": [
      "十の位を選んだら、一の位は残りのカードから選びます。"
    ],
    "explanation": "十の位4通り、一の位3通りで、12個です。\n\nほかの選択肢\n・「16」：同じカードを2回使う場合をふくめています。\n・「6」：12と21など、順序の{違|ちが}う数を同じものとしています。\n・「3」：十の位を1つに固定しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "16",
        "reason": "同じカードを2回使う場合をふくめています。"
      },
      {
        "answer": "6",
        "reason": "12と21など、順序の{違|ちが}う数を同じものとしています。"
      },
      {
        "answer": "3",
        "reason": "十の位を1つに固定しています。"
      }
    ],
    "authoring": {
      "family": "case_4",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_case_023",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "case",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "0から3までの数字カードを1枚ずつ用意します。異なる2枚を使って2桁の整数を作ると、何個できますか。",
    "answer": "9",
    "choices": [
      "6",
      "9",
      "12",
      "16"
    ],
    "hints": [
      "十の位に0は置けませんが、一の位には置けます。"
    ],
    "explanation": "十の位は3通り。一の位は残りの3通りなので、9個です。\n\nほかの選択肢\n・「12」：十の位を0にする場合をふくめています。\n・「16」：十の位の0とカードの再使用を両方認めています。\n・「6」：一の位にも0を使えないと考えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "12",
        "reason": "十の位を0にする場合をふくめています。"
      },
      {
        "answer": "16",
        "reason": "十の位の0とカードの再使用を両方認めています。"
      },
      {
        "answer": "6",
        "reason": "一の位にも0を使えないと考えています。"
      }
    ],
    "authoring": {
      "family": "case_5",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_case_024",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "case",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "6チームが、ほかのすべてのチームと1回ずつ試合をします。全部で何試合ですか。",
    "answer": "15",
    "choices": [
      "15",
      "30",
      "21",
      "5"
    ],
    "hints": [
      "対戦する2チームの組を、重複しないように数えます。"
    ],
    "explanation": "6×5÷2＝15試合です。\n\nほかの選択肢\n・「30」：同じ試合を両チームから2回数えています。\n・「21」：自分自身との組までふくめています。\n・「5」：1チームがする試合だけを答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "30",
        "reason": "同じ試合を両チームから2回数えています。"
      },
      {
        "answer": "21",
        "reason": "自分自身との組までふくめています。"
      },
      {
        "answer": "5",
        "reason": "1チームがする試合だけを答えています。"
      }
    ],
    "authoring": {
      "family": "case_3",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_case_025",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "case",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "1から5までの数字カードを1枚ずつ用意します。異なる2枚を使って2桁の整数を作ると、何個できますか。",
    "answer": "20",
    "choices": [
      "25",
      "10",
      "4",
      "20"
    ],
    "hints": [
      "十の位を選んだら、一の位は残りのカードから選びます。"
    ],
    "explanation": "十の位5通り、一の位4通りで、20個です。\n\nほかの選択肢\n・「25」：同じカードを2回使う場合をふくめています。\n・「10」：12と21など、順序の{違|ちが}う数を同じものとしています。\n・「4」：十の位を1つに固定しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "25",
        "reason": "同じカードを2回使う場合をふくめています。"
      },
      {
        "answer": "10",
        "reason": "12と21など、順序の{違|ちが}う数を同じものとしています。"
      },
      {
        "answer": "4",
        "reason": "十の位を1つに固定しています。"
      }
    ],
    "authoring": {
      "family": "case_4",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_case_026",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "case",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "0から4までの数字カードを1枚ずつ用意します。異なる2枚を使って2桁の整数を作ると、何個できますか。",
    "answer": "16",
    "choices": [
      "25",
      "12",
      "16",
      "20"
    ],
    "hints": [
      "十の位に0は置けませんが、一の位には置けます。"
    ],
    "explanation": "十の位は4通り。一の位は残りの4通りなので、16個です。\n\nほかの選択肢\n・「20」：十の位を0にする場合をふくめています。\n・「25」：十の位の0とカードの再使用を両方認めています。\n・「12」：一の位にも0を使えないと考えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "20",
        "reason": "十の位を0にする場合をふくめています。"
      },
      {
        "answer": "25",
        "reason": "十の位の0とカードの再使用を両方認めています。"
      },
      {
        "answer": "12",
        "reason": "一の位にも0を使えないと考えています。"
      }
    ],
    "authoring": {
      "family": "case_5",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_case_027",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "case",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "7チームが、ほかのすべてのチームと1回ずつ試合をします。全部で何試合ですか。",
    "answer": "21",
    "choices": [
      "6",
      "21",
      "42",
      "28"
    ],
    "hints": [
      "対戦する2チームの組を、重複しないように数えます。"
    ],
    "explanation": "7×6÷2＝21試合です。\n\nほかの選択肢\n・「42」：同じ試合を両チームから2回数えています。\n・「28」：自分自身との組までふくめています。\n・「6」：1チームがする試合だけを答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "42",
        "reason": "同じ試合を両チームから2回数えています。"
      },
      {
        "answer": "28",
        "reason": "自分自身との組までふくめています。"
      },
      {
        "answer": "6",
        "reason": "1チームがする試合だけを答えています。"
      }
    ],
    "authoring": {
      "family": "case_3",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_case_028",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "case",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "1から6までの数字カードを1枚ずつ用意します。異なる2枚を使って2桁の整数を作ると、何個できますか。",
    "answer": "30",
    "choices": [
      "30",
      "36",
      "15",
      "5"
    ],
    "hints": [
      "十の位を選んだら、一の位は残りのカードから選びます。"
    ],
    "explanation": "十の位6通り、一の位5通りで、30個です。\n\nほかの選択肢\n・「36」：同じカードを2回使う場合をふくめています。\n・「15」：12と21など、順序の{違|ちが}う数を同じものとしています。\n・「5」：十の位を1つに固定しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "36",
        "reason": "同じカードを2回使う場合をふくめています。"
      },
      {
        "answer": "15",
        "reason": "12と21など、順序の{違|ちが}う数を同じものとしています。"
      },
      {
        "answer": "5",
        "reason": "十の位を1つに固定しています。"
      }
    ],
    "authoring": {
      "family": "case_4",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_case_029",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "case",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "0から5までの数字カードを1枚ずつ用意します。異なる2枚を使って2桁の整数を作ると、何個できますか。",
    "answer": "25",
    "choices": [
      "30",
      "36",
      "20",
      "25"
    ],
    "hints": [
      "十の位に0は置けませんが、一の位には置けます。"
    ],
    "explanation": "十の位は5通り。一の位は残りの5通りなので、25個です。\n\nほかの選択肢\n・「30」：十の位を0にする場合をふくめています。\n・「36」：十の位の0とカードの再使用を両方認めています。\n・「20」：一の位にも0を使えないと考えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "30",
        "reason": "十の位を0にする場合をふくめています。"
      },
      {
        "answer": "36",
        "reason": "十の位の0とカードの再使用を両方認めています。"
      },
      {
        "answer": "20",
        "reason": "一の位にも0を使えないと考えています。"
      }
    ],
    "authoring": {
      "family": "case_5",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_case_030",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "case",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "8チームが、ほかのすべてのチームと1回ずつ試合をします。全部で何試合ですか。",
    "answer": "28",
    "choices": [
      "36",
      "7",
      "28",
      "56"
    ],
    "hints": [
      "対戦する2チームの組を、重複しないように数えます。"
    ],
    "explanation": "8×7÷2＝28試合です。\n\nほかの選択肢\n・「56」：同じ試合を両チームから2回数えています。\n・「36」：自分自身との組までふくめています。\n・「7」：1チームがする試合だけを答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "56",
        "reason": "同じ試合を両チームから2回数えています。"
      },
      {
        "answer": "36",
        "reason": "自分自身との組までふくめています。"
      },
      {
        "answer": "7",
        "reason": "1チームがする試合だけを答えています。"
      }
    ],
    "authoring": {
      "family": "case_3",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_case_031",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "case",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "1から7までの数字カードを1枚ずつ用意します。異なる2枚を使って2桁の整数を作ると、何個できますか。",
    "answer": "42",
    "choices": [
      "6",
      "42",
      "49",
      "21"
    ],
    "hints": [
      "十の位を選んだら、一の位は残りのカードから選びます。"
    ],
    "explanation": "十の位7通り、一の位6通りで、42個です。\n\nほかの選択肢\n・「49」：同じカードを2回使う場合をふくめています。\n・「21」：12と21など、順序の{違|ちが}う数を同じものとしています。\n・「6」：十の位を1つに固定しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "49",
        "reason": "同じカードを2回使う場合をふくめています。"
      },
      {
        "answer": "21",
        "reason": "12と21など、順序の{違|ちが}う数を同じものとしています。"
      },
      {
        "answer": "6",
        "reason": "十の位を1つに固定しています。"
      }
    ],
    "authoring": {
      "family": "case_4",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_case_032",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "case",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "0から6までの数字カードを1枚ずつ用意します。異なる2枚を使って2桁の整数を作ると、何個できますか。",
    "answer": "36",
    "choices": [
      "36",
      "42",
      "49",
      "30"
    ],
    "hints": [
      "十の位に0は置けませんが、一の位には置けます。"
    ],
    "explanation": "十の位は6通り。一の位は残りの6通りなので、36個です。\n\nほかの選択肢\n・「42」：十の位を0にする場合をふくめています。\n・「49」：十の位の0とカードの再使用を両方認めています。\n・「30」：一の位にも0を使えないと考えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "42",
        "reason": "十の位を0にする場合をふくめています。"
      },
      {
        "answer": "49",
        "reason": "十の位の0とカードの再使用を両方認めています。"
      },
      {
        "answer": "30",
        "reason": "一の位にも0を使えないと考えています。"
      }
    ],
    "authoring": {
      "family": "case_5",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_case_033",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "case",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "9チームが、ほかのすべてのチームと1回ずつ試合をします。全部で何試合ですか。",
    "answer": "36",
    "choices": [
      "72",
      "45",
      "8",
      "36"
    ],
    "hints": [
      "対戦する2チームの組を、重複しないように数えます。"
    ],
    "explanation": "9×8÷2＝36試合です。\n\nほかの選択肢\n・「72」：同じ試合を両チームから2回数えています。\n・「45」：自分自身との組までふくめています。\n・「8」：1チームがする試合だけを答えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "72",
        "reason": "同じ試合を両チームから2回数えています。"
      },
      {
        "answer": "45",
        "reason": "自分自身との組までふくめています。"
      },
      {
        "answer": "8",
        "reason": "1チームがする試合だけを答えています。"
      }
    ],
    "authoring": {
      "family": "case_3",
      "parameters": {
        "n": 5
      }
    }
  },
  {
    "id": "math_g6_course_case_034",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "case",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "1から8までの数字カードを1枚ずつ用意します。異なる2枚を使って2桁の整数を作ると、何個できますか。",
    "answer": "56",
    "choices": [
      "28",
      "7",
      "56",
      "64"
    ],
    "hints": [
      "十の位を選んだら、一の位は残りのカードから選びます。"
    ],
    "explanation": "十の位8通り、一の位7通りで、56個です。\n\nほかの選択肢\n・「64」：同じカードを2回使う場合をふくめています。\n・「28」：12と21など、順序の{違|ちが}う数を同じものとしています。\n・「7」：十の位を1つに固定しています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "64",
        "reason": "同じカードを2回使う場合をふくめています。"
      },
      {
        "answer": "28",
        "reason": "12と21など、順序の{違|ちが}う数を同じものとしています。"
      },
      {
        "answer": "7",
        "reason": "十の位を1つに固定しています。"
      }
    ],
    "authoring": {
      "family": "case_4",
      "parameters": {
        "n": 5
      }
    }
  },
  {
    "id": "math_g6_course_case_035",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "case",
    "difficulty": "standard",
    "answerType": "choice",
    "question": "0から7までの数字カードを1枚ずつ用意します。異なる2枚を使って2桁の整数を作ると、何個できますか。",
    "answer": "49",
    "choices": [
      "42",
      "49",
      "56",
      "64"
    ],
    "hints": [
      "十の位に0は置けませんが、一の位には置けます。"
    ],
    "explanation": "十の位は7通り。一の位は残りの7通りなので、49個です。\n\nほかの選択肢\n・「56」：十の位を0にする場合をふくめています。\n・「64」：十の位の0とカードの再使用を両方認めています。\n・「42」：一の位にも0を使えないと考えています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "56",
        "reason": "十の位を0にする場合をふくめています。"
      },
      {
        "answer": "64",
        "reason": "十の位の0とカードの再使用を両方認めています。"
      },
      {
        "answer": "42",
        "reason": "一の位にも0を使えないと考えています。"
      }
    ],
    "authoring": {
      "family": "case_5",
      "parameters": {
        "n": 5
      }
    }
  },
  {
    "id": "math_g6_course_case_036",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "case",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "A、B、C、D、Eの5人を1列に並べます。AとBがとなり合う並び方は何通りですか。",
    "answer": "48",
    "choices": [
      "48",
      "120",
      "24",
      "12"
    ],
    "hints": [
      "となり合う2人を1つのまとまりにします。",
      "まとまりの中の2通りの順序も数えます。"
    ],
    "explanation": "まとまりをふくめて4つを並べると24通り。2人の中の順序2通りをかけ、48通りです。\n\nほかの選択肢\n・「120」：となり合わない並び方までふくめています。\n・「24」：2人の中の順序を1通りに固定しています。\n・「12」：2人の組の置き場所を十分に数えていません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "120",
        "reason": "となり合わない並び方までふくめています。"
      },
      {
        "answer": "24",
        "reason": "2人の中の順序を1通りに固定しています。"
      },
      {
        "answer": "12",
        "reason": "2人の組の置き場所を十分に数えていません。"
      }
    ],
    "authoring": {
      "family": "case_6",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_case_037",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "case",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "1から5までの数字カードを1枚ずつ用意し、異なる3枚で3桁の偶数を作ります。何個できますか。",
    "answer": "24",
    "choices": [
      "60",
      "12",
      "32",
      "24"
    ],
    "hints": [
      "偶数になるための条件を満たす一の位から決めます。",
      "残り2桁は、使ったカードを除いて順に選びます。"
    ],
    "explanation": "一の位は偶数2通り。百の位4通り、十の位3通りなので、24個です。\n\nほかの選択肢\n・「60」：一の位が奇数の数もふくめています。\n・「12」：一の位を1つの偶数に固定しています。\n・「32」：百の位に使ったカードを十の位でも使っています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "60",
        "reason": "一の位が奇数の数もふくめています。"
      },
      {
        "answer": "12",
        "reason": "一の位を1つの偶数に固定しています。"
      },
      {
        "answer": "32",
        "reason": "百の位に使ったカードを十の位でも使っています。"
      }
    ],
    "authoring": {
      "family": "case_7",
      "parameters": {
        "n": 1
      }
    }
  },
  {
    "id": "math_g6_course_case_038",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "case",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "A、B、C、Dの4人を1列に並べます。BとCがとなり合う並び方は何通りですか。",
    "answer": "12",
    "choices": [
      "6",
      "4",
      "12",
      "24"
    ],
    "hints": [
      "となり合う2人を1つのまとまりにします。",
      "まとまりの中の2通りの順序も数えます。"
    ],
    "explanation": "まとまりをふくめて3つを並べると6通り。2人の中の順序2通りをかけ、12通りです。\n\nほかの選択肢\n・「24」：となり合わない並び方までふくめています。\n・「6」：2人の中の順序を1通りに固定しています。\n・「4」：2人の組の置き場所を十分に数えていません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "24",
        "reason": "となり合わない並び方までふくめています。"
      },
      {
        "answer": "6",
        "reason": "2人の中の順序を1通りに固定しています。"
      },
      {
        "answer": "4",
        "reason": "2人の組の置き場所を十分に数えていません。"
      }
    ],
    "authoring": {
      "family": "case_6",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_case_039",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "case",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "1から6までの数字カードを1枚ずつ用意し、異なる3枚で3桁の偶数を作ります。何個できますか。",
    "answer": "60",
    "choices": [
      "75",
      "60",
      "120",
      "20"
    ],
    "hints": [
      "偶数になるための条件を満たす一の位から決めます。",
      "残り2桁は、使ったカードを除いて順に選びます。"
    ],
    "explanation": "一の位は偶数3通り。百の位5通り、十の位4通りなので、60個です。\n\nほかの選択肢\n・「120」：一の位が奇数の数もふくめています。\n・「20」：一の位を1つの偶数に固定しています。\n・「75」：百の位に使ったカードを十の位でも使っています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "120",
        "reason": "一の位が奇数の数もふくめています。"
      },
      {
        "answer": "20",
        "reason": "一の位を1つの偶数に固定しています。"
      },
      {
        "answer": "75",
        "reason": "百の位に使ったカードを十の位でも使っています。"
      }
    ],
    "authoring": {
      "family": "case_7",
      "parameters": {
        "n": 2
      }
    }
  },
  {
    "id": "math_g6_course_case_040",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "case",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "A、B、C、D、Eの5人を1列に並べます。CとDがとなり合う並び方は何通りですか。",
    "answer": "48",
    "choices": [
      "48",
      "120",
      "24",
      "12"
    ],
    "hints": [
      "となり合う2人を1つのまとまりにします。",
      "まとまりの中の2通りの順序も数えます。"
    ],
    "explanation": "まとまりをふくめて4つを並べると24通り。2人の中の順序2通りをかけ、48通りです。\n\nほかの選択肢\n・「120」：となり合わない並び方までふくめています。\n・「24」：2人の中の順序を1通りに固定しています。\n・「12」：2人の組の置き場所を十分に数えていません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "120",
        "reason": "となり合わない並び方までふくめています。"
      },
      {
        "answer": "24",
        "reason": "2人の中の順序を1通りに固定しています。"
      },
      {
        "answer": "12",
        "reason": "2人の組の置き場所を十分に数えていません。"
      }
    ],
    "authoring": {
      "family": "case_6",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_case_041",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "case",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "1から7までの数字カードを1枚ずつ用意し、異なる3枚で3桁の偶数を作ります。何個できますか。",
    "answer": "90",
    "choices": [
      "210",
      "30",
      "108",
      "90"
    ],
    "hints": [
      "偶数になるための条件を満たす一の位から決めます。",
      "残り2桁は、使ったカードを除いて順に選びます。"
    ],
    "explanation": "一の位は偶数3通り。百の位6通り、十の位5通りなので、90個です。\n\nほかの選択肢\n・「210」：一の位が奇数の数もふくめています。\n・「30」：一の位を1つの偶数に固定しています。\n・「108」：百の位に使ったカードを十の位でも使っています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "210",
        "reason": "一の位が奇数の数もふくめています。"
      },
      {
        "answer": "30",
        "reason": "一の位を1つの偶数に固定しています。"
      },
      {
        "answer": "108",
        "reason": "百の位に使ったカードを十の位でも使っています。"
      }
    ],
    "authoring": {
      "family": "case_7",
      "parameters": {
        "n": 3
      }
    }
  },
  {
    "id": "math_g6_course_case_042",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "case",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "A、B、C、Dの4人を1列に並べます。DとAがとなり合う並び方は何通りですか。",
    "answer": "12",
    "choices": [
      "6",
      "4",
      "12",
      "24"
    ],
    "hints": [
      "となり合う2人を1つのまとまりにします。",
      "まとまりの中の2通りの順序も数えます。"
    ],
    "explanation": "まとまりをふくめて3つを並べると6通り。2人の中の順序2通りをかけ、12通りです。\n\nほかの選択肢\n・「24」：となり合わない並び方までふくめています。\n・「6」：2人の中の順序を1通りに固定しています。\n・「4」：2人の組の置き場所を十分に数えていません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "24",
        "reason": "となり合わない並び方までふくめています。"
      },
      {
        "answer": "6",
        "reason": "2人の中の順序を1通りに固定しています。"
      },
      {
        "answer": "4",
        "reason": "2人の組の置き場所を十分に数えていません。"
      }
    ],
    "authoring": {
      "family": "case_6",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_case_043",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "case",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "1から8までの数字カードを1枚ずつ用意し、異なる3枚で3桁の偶数を作ります。何個できますか。",
    "answer": "168",
    "choices": [
      "196",
      "168",
      "336",
      "42"
    ],
    "hints": [
      "偶数になるための条件を満たす一の位から決めます。",
      "残り2桁は、使ったカードを除いて順に選びます。"
    ],
    "explanation": "一の位は偶数4通り。百の位7通り、十の位6通りなので、168個です。\n\nほかの選択肢\n・「336」：一の位が奇数の数もふくめています。\n・「42」：一の位を1つの偶数に固定しています。\n・「196」：百の位に使ったカードを十の位でも使っています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "336",
        "reason": "一の位が奇数の数もふくめています。"
      },
      {
        "answer": "42",
        "reason": "一の位を1つの偶数に固定しています。"
      },
      {
        "answer": "196",
        "reason": "百の位に使ったカードを十の位でも使っています。"
      }
    ],
    "authoring": {
      "family": "case_7",
      "parameters": {
        "n": 4
      }
    }
  },
  {
    "id": "math_g6_course_case_044",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "case",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "A、B、C、D、Eの5人を1列に並べます。EとAがとなり合う並び方は何通りですか。",
    "answer": "48",
    "choices": [
      "48",
      "120",
      "24",
      "12"
    ],
    "hints": [
      "となり合う2人を1つのまとまりにします。",
      "まとまりの中の2通りの順序も数えます。"
    ],
    "explanation": "まとまりをふくめて4つを並べると24通り。2人の中の順序2通りをかけ、48通りです。\n\nほかの選択肢\n・「120」：となり合わない並び方までふくめています。\n・「24」：2人の中の順序を1通りに固定しています。\n・「12」：2人の組の置き場所を十分に数えていません。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "120",
        "reason": "となり合わない並び方までふくめています。"
      },
      {
        "answer": "24",
        "reason": "2人の中の順序を1通りに固定しています。"
      },
      {
        "answer": "12",
        "reason": "2人の組の置き場所を十分に数えていません。"
      }
    ],
    "authoring": {
      "family": "case_6",
      "parameters": {
        "n": 5
      }
    }
  },
  {
    "id": "math_g6_course_case_045",
    "subject": "math",
    "gradeLevel": 6,
    "unit": "case",
    "difficulty": "advanced",
    "answerType": "choice",
    "question": "1から9までの数字カードを1枚ずつ用意し、異なる3枚で3桁の偶数を作ります。何個できますか。",
    "answer": "224",
    "choices": [
      "504",
      "56",
      "256",
      "224"
    ],
    "hints": [
      "偶数になるための条件を満たす一の位から決めます。",
      "残り2桁は、使ったカードを除いて順に選びます。"
    ],
    "explanation": "一の位は偶数4通り。百の位8通り、十の位7通りなので、224個です。\n\nほかの選択肢\n・「504」：一の位が奇数の数もふくめています。\n・「56」：一の位を1つの偶数に固定しています。\n・「256」：百の位に使ったカードを十の位でも使っています。",
    "reviewed": false,
    "collection": "course_g6_100",
    "misconceptions": [
      {
        "answer": "504",
        "reason": "一の位が奇数の数もふくめています。"
      },
      {
        "answer": "56",
        "reason": "一の位を1つの偶数に固定しています。"
      },
      {
        "answer": "256",
        "reason": "百の位に使ったカードを十の位でも使っています。"
      }
    ],
    "authoring": {
      "family": "case_7",
      "parameters": {
        "n": 5
      }
    }
  }
];
Array.prototype.push.apply(root.QUESTION_BANK=root.QUESTION_BANK||[],questions);
})(this);
