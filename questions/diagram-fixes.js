// SVG の図の見直し（判断495）：何の絵かわからない・答えを見せている・問題と合っていない図を外す。
// 問題の本文・答え・選択肢は変えない（図だけを外す）。外した理由は DECISIONS.md の判断495。
// 図を外した問題は、もとの図の依頼書・テストの数え方から外れるので、その数は tests/cases/diagram-review.js で固定する。
(function(root){
  'use strict';
  var bank=root.QUESTION_BANK=root.QUESTION_BANK||[];
  var REMOVE=[
    'math_g4_frontier_decimal_002',
    'math_g4_frontier_decimal_calc_005',
    'math_g4_frontier_position_003',
    'math_g4_frontier_position_004',
    'math_g4_frontier_ratio_003',
    'math_g5_hand_decdiv_006',
    'math_g5_hand_decdiv_009',
    'math_g5_hand_decdiv_029',
    'math_g5_hand_fracrel_010',
    'math_g5_hand_fracrel_014',
    'math_g5_hand_graph_004',
    'math_g5_hand_graph_013',
    'math_g5_hand_graph_022',
    'math_g5_hand_percent_004',
    'math_g5_hand_percent_007',
    'math_g5_hand_prism_004',
    'math_g5_hand_prism_008',
    'math_g8_probability_001',
    'science_g4_hand_air_026',
    'science_g4_hand_body_002',
    'science_g4_hand_body_010',
    'science_g4_hand_body_011',
    'science_g4_hand_body_013',
    'science_g4_hand_body_021',
    'science_g4_hand_body_023',
    'science_g4_hand_body_025',
    'science_g4_hand_electric_025',
    'science_g4_hand_heat_004',
    'science_g4_hand_heat_023',
    'science_g4_hand_heat_030',
    'science_g4_hand_heat_032',
    'science_g4_hand_moon_004',
    'science_g4_hand_moon_011',
    'science_g4_hand_moon_012',
    'science_g4_hand_moon_013',
    'science_g4_hand_moon_019',
    'science_g4_hand_moon_032',
    'science_g4_hand_rain_010',
    'science_g4_hand_rain_023',
    'science_g4_hand_rain_024',
    'science_g4_hand_season_027',
    'science_g4_hand_star_011',
    'science_g4_hand_star_012',
    'science_g4_hand_star_013',
    'science_g4_hand_star_029',
    'science_g4_hand_weather_019',
    'science_g5_hand_flower_001',
    'science_g5_hand_flower_002',
    'science_g5_hand_flower_003',
    'science_g5_hand_flower_007',
    'science_g5_hand_flower_019',
    'science_g5_hand_flower_023',
    'science_g5_hand_life_011',
    'science_g5_hand_life_012',
    'science_g5_hand_life_013',
    'science_g5_hand_life_014',
    'science_g5_hand_method_030',
    'science_g5_hand_pendulum_030',
    'science_g5_hand_plant_004',
    'science_g5_hand_river_009',
    'science_g5_hand_river_011',
    'science_g5_hand_river_019',
    'science_g5_hand_weather_011',
    'social_g4_hand_electric_021',
    'social_g4_hand_electric_028',
    'social_g4_hand_garbage_009',
    'social_g4_hand_garbage_010',
    'social_g4_hand_industry_013',
    'social_g4_hand_industry_025',
    'social_g4_hand_tradition_024',
    'social_g4_hand_water_003',
    'social_g5_hand_industry_006',
    'social_g5_hand_industry_011',
    'social_g5_hand_landlife_030',
    'social_g5_hand_position_014',
    'social_g5_hand_terrain_018',
    'social_g5_hand_terrain_022'
  ];
  var removeSet={};REMOVE.forEach(function(id){removeSet[id]=true;});
  bank.forEach(function(q){
    if(removeSet[q.id]&&q.diagram&&q.diagram.kind!=='image')delete q.diagram;
  });
  // 問題文と図が食いちがっていたものを直す
  var by={};bank.forEach(function(q){by[q.id]=q;});
  var q15=by['math_g4_hand_abacus_015'];
  if(q15){
    var from='図のそろばんは、持っているお金を表しています。1000円出して買いものをするとき、おつりはいくらですか。（図は買いものの代金です）';
    var to='図のそろばんは、買いものの代金を表しています。1000円出して買いものをするとき、おつりはいくらですか。';
    if(q15.question===from)q15.question=to;
    if(q15.inputForm&&q15.inputForm.question.indexOf(from)===0)q15.inputForm.question=q15.inputForm.question.replace(from,to);
  }
  // 点のラベルを問題文に合わせる（問題は地点Ｑを聞いている）
  if(by['math_g4_hand_position_001'])by['math_g4_hand_position_001'].diagram.label='Ｑ';
  // 星座の名前が図にないので付ける（北極星の位置は答えなので描かない）
  var st=by['science_g4_hand_star_018'];
  if(st&&st.diagram.labels&&st.diagram.labels.length===12){st.diagram.labels[5]='北斗七星';st.diagram.labels[7]='カシオペヤ座';}
})(window);
