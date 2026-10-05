// 正解の音のオン・オフ（判断259）：ない・知らない値はオン、オフは保存・読み込みで残る。
module.exports = ({ test, FF, assert, plain }) => {
  const T0 = 1790000000000;
  test('効果音の設定：初期値はオン。古いセーブ（設定なし）を読み込むとオンになる', () => {
    const s = FF.state.createDefaultState(T0);
    assert.equal(s.settings.sound, true);
    const old = JSON.parse(FF.state.serialize(s));
    delete old.settings.sound;
    delete old.integrity;
    const loaded = FF.state.parseSave(JSON.stringify(Object.assign({}, old, { integrity: undefined })), T0);
    if (loaded.ok) assert.equal(loaded.state.settings.sound, true);
  });
  test('効果音の設定：オフにして保存・読み込みしてもオフのまま。変な値はオンにもどる', () => {
    const s = plain(FF.state.createDefaultState(T0));
    s.settings.sound = false;
    const back = FF.state.parseSave(FF.state.serialize(s), T0);
    assert.equal(back.ok, true);
    assert.equal(back.state.settings.sound, false);
    const s2 = plain(FF.state.createDefaultState(T0));
    s2.settings.sound = 'どちらでもない';
    const back2 = FF.state.parseSave(FF.state.serialize(s2), T0);
    assert.equal(back2.ok, true);
    assert.equal(back2.state.settings.sound, true);
  });
};
