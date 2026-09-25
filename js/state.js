// セーブデータの生成・移行・検証（SPEC 14.2）。純粋関数のみ。localStorage には触らない（storage.js が担当）。
(function (root) {
  'use strict';
  var FF = root.FF = root.FF || {};
  var util = FF.util;

  var FORMAT_ERROR = 'セーブデータの形式が正しくありません。';

  function mapIds(list, fn) {
    var out = {};
    list.forEach(function (item) { out[item.id] = fn(item); });
    return out;
  }

  // 探索の初期状態（v0.2）。地域は defs.js の REGIONS から作る
  function defaultRegionState() {
    return { position: 0, progress: 0, missedHere: false, openedChests: [], events: {}, completedAt: null };
  }
  function defaultExploration() {
    return {
      regions: mapIds(FF.defs.REGIONS, defaultRegionState),
      lastEventId: null,
      recentQuestionIds: [],
      stats: { answered: 0, correct: 0 }
    };
  }

  // 新規ゲームの状態
  function createDefaultState(now, b, cfg) {
    b = b || FF.balance;
    cfg = cfg || FF.config;
    var defs = FF.defs;
    return {
      saveVersion: cfg.SAVE_VERSION,
      createdAt: now,
      updatedAt: now,
      player: { name: cfg.DEFAULT_PLAYER_NAME },
      resources: mapIds(defs.RESOURCES, function (r) { return b.INITIAL_RESOURCES[r.id] || 0; }),
      buildings: mapIds(defs.BUILDINGS, function (d) {
        var level = (b.BUILDING_UNLOCK_FURNACE_LEVEL[d.id] || 1) > 1 ? 0 : 1;
        var bld = { level: level };
        if (d.produces) bld.lastCollectedAt = level > 0 ? now : null;
        return bld;
      }),
      tickets: { count: b.TICKET_MAX, lastRecoveredAt: now },
      learning: {
        unlocked: mapIds(defs.SUBJECTS, function () { return b.INITIAL_UNLOCKED_GRADE; }),
        examCooldownUntil: mapIds(defs.SUBJECTS, function () { return 0; }),
        examHistory: [],
        diagnosis: mapIds(defs.SUBJECTS, function () { return null; }),
        stats: {},
        streak: { current: 0, best: 0 },
        totalEarned: mapIds(defs.RESOURCES, function () { return 0; }),
        correctLog: {},
        history: []
      },
      exploration: defaultExploration(),
      settings: { furigana: true, furiganaAuto: true },
      flags: { introSeen: false, diagnosisOffered: false, unlockNoticesSeen: [] }
    };
  }

  // ---- データ移行：MIGRATIONS[v] は v 版のデータを v+1 版に変換する ----
  //
  // v0：saveVersion を持たない開発初期の平らな形式
  //   { playerName, resources, buildingLevels: {id: level}, ticketCount, lastRecoveredAt,
  //     unlockedGrades: {subject: grade}, furigana }
  var MIGRATIONS = {
    0: function (old, now) {
      var levels = old.buildingLevels || {};
      var buildings = {};
      for (var id in levels) {
        buildings[id] = { level: levels[id] };
        if (id !== 'furnace' && id !== 'housing') buildings[id].lastCollectedAt = levels[id] > 0 ? now : null;
      }
      var v1 = {
        saveVersion: 1,
        player: { name: old.playerName },
        resources: old.resources,
        buildings: buildings,
        tickets: { count: old.ticketCount, lastRecoveredAt: old.lastRecoveredAt },
        learning: { unlocked: old.unlockedGrades },
        settings: {}
      };
      if (typeof old.furigana === 'boolean') {
        v1.settings.furigana = old.furigana;
        v1.settings.furiganaAuto = false;
      }
      return v1;
    },
    // v1（v0.1）→ v2（v0.2）：探索の記録を空の状態で追加する
    1: function (old) {
      var v2 = Object.assign({}, old);
      if (!util.isPlainObject(v2.exploration)) v2.exploration = defaultExploration();
      return v2;
    }
  };

  // 既定値で不足している項目を補う。
  // - 既定値がオブジェクト：再帰。保存側にしかないキー（stats の学年など）は残す
  // - 既定値が null：保存側に値があればそのまま使う
  // - それ以外：型が違えば既定値にする
  function fillDefaults(saved, defaults) {
    if (defaults === null) return saved === undefined ? null : saved;
    if (Array.isArray(defaults)) return Array.isArray(saved) ? saved : util.clone(defaults);
    if (util.isPlainObject(defaults)) {
      var out = util.isPlainObject(saved) ? Object.assign({}, saved) : {};
      for (var k in defaults) out[k] = fillDefaults(out[k], defaults[k]);
      return out;
    }
    if (typeof saved === typeof defaults && !(typeof saved === 'number' && !isFinite(saved))) return saved;
    return defaults;
  }

  // 保存データ（オブジェクト）を最新版にする。{ ok, state, migratedFrom, error }
  function migrate(data, now, cfg) {
    cfg = cfg || FF.config;
    if (!util.isPlainObject(data)) return { ok: false, error: FORMAT_ERROR };
    var v = typeof data.saveVersion === 'number' ? data.saveVersion : 0;
    if (v > cfg.SAVE_VERSION) {
      return { ok: false, error: 'このセーブデータは新しいバージョンのゲームで作られています。' };
    }
    var from = v;
    var cur = util.clone(data);
    while (v < cfg.SAVE_VERSION) {
      if (!MIGRATIONS[v]) return { ok: false, error: 'セーブデータを変換できませんでした（版 ' + v + '）。' };
      cur = MIGRATIONS[v](cur, now);
      v++;
      cur.saveVersion = v;
    }
    var state = fillDefaults(cur, createDefaultState(now));
    state.saveVersion = cfg.SAVE_VERSION;
    // 建物のレベルの整合（中央炉を超えるレベル、解放済みなのに Lv0 など）
    if (FF.buildings && FF.buildings.normalizeBuildings) state = FF.buildings.normalizeBuildings(state, now);
    // 探索の整合（位置を順路の範囲に収める、定義にない宝箱・イベントを捨てる など）
    if (FF.exploration && FF.exploration.normalizeExploration) state = FF.exploration.normalizeExploration(state);
    state.player.name = util.normalizeName(state.player.name, cfg);
    return { ok: true, state: state, migratedFrom: from };
  }

  // 保存用の文字列（エクスポートにもそのまま使う）。
  // 本体から計算した指紋 integrity を末尾に付ける（SPEC_save_integrity.md）。
  function serialize(state) {
    var body = FF.integrity.withoutField(state);
    body[FF.integrity.FIELD] = FF.integrity.sign(body);
    return JSON.stringify(body);
  }

  // 保存用の文字列 → 最新版の状態。インポートでも同じ関数を使う。
  // integrity があるのに本体と合わない（書き換えられた疑い）ときは読み込まない。
  // integrity がない（この仕組みより前の v0.1・v0.2 のセーブ）ときは、そのまま読み込む。次の保存で付く。
  function parseSave(text, now, cfg) {
    var data;
    try {
      data = JSON.parse(String(text).trim());
    } catch (e) {
      return { ok: false, error: 'JSON として読み取れませんでした。コピーした内容をすべて貼り付けてください。' };
    }
    if (FF.integrity.hasField(data)) {
      // 表示は既存の「形式が正しくない」と同じにする（新しい文言は作らない）
      if (!FF.integrity.verify(data)) return { ok: false, error: FORMAT_ERROR, reason: 'integrity' };
      data = FF.integrity.withoutField(data);
    }
    return migrate(data, now, cfg);
  }

  function withUpdated(state, now) {
    var s = Object.assign({}, state);
    s.updatedAt = now;
    return s;
  }

  function setPlayerName(state, raw, cfg) {
    var s = Object.assign({}, state);
    s.player = Object.assign({}, state.player, { name: util.normalizeName(raw, cfg) });
    return s;
  }

  FF.state = {
    MIGRATIONS: MIGRATIONS,
    defaultRegionState: defaultRegionState,
    defaultExploration: defaultExploration,
    createDefaultState: createDefaultState,
    fillDefaults: fillDefaults,
    migrate: migrate,
    serialize: serialize,
    parseSave: parseSave,
    withUpdated: withUpdated,
    setPlayerName: setPlayerName
  };
})(this);
