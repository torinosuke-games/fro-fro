// プレイヤー名とテンプレート（SPEC 3.2）
module.exports = ({ test, FF, assert, plain }) => {
  const { normalizeName, parseRichText, plainText } = FF.util;

  test('空欄なら「プレイヤー」', () => {
    assert.strictEqual(normalizeName(''), 'プレイヤー');
    assert.strictEqual(normalizeName('   '), 'プレイヤー');
    assert.strictEqual(normalizeName('　　'), 'プレイヤー');
    assert.strictEqual(normalizeName(null), 'プレイヤー');
  });

  test('前後の空白（全角を含む）を取り除く', () => {
    assert.strictEqual(normalizeName('  ねこ  '), 'ねこ');
    assert.strictEqual(normalizeName('　ねこ　'), 'ねこ');
    assert.strictEqual(normalizeName('ゆき ねこ'), 'ゆき ねこ');
  });

  test('最大12文字', () => {
    assert.strictEqual(normalizeName('あいうえおかきくけこさしす'), 'あいうえおかきくけこさし');
    assert.strictEqual(normalizeName('123456789012'), '123456789012');
  });

  test('絵文字は1文字として数える', () => {
    const name = '🐱'.repeat(13);
    assert.strictEqual(Array.from(normalizeName(name)).length, 12);
  });

  test('HTMLタグは文字のまま保持する（表示は textContent で行う）', () => {
    assert.strictEqual(normalizeName('<b>test</b>'), '<b>test</b>');
  });

  test('名前の変更が状態に反映される', () => {
    let s = FF.state.createDefaultState(0);
    assert.strictEqual(s.player.name, 'プレイヤー');
    s = FF.state.setPlayerName(s, '  ユキ ');
    assert.strictEqual(s.player.name, 'ユキ');
  });

  test('テンプレートの {name} を置き換える', () => {
    assert.strictEqual(plainText('{name}、この吹雪では長くは持たない。', { name: 'ユキ' }), 'ユキ、この吹雪では長くは持たない。');
    assert.strictEqual(plainText('{name}隊長、中央炉の修理が完了しました。', { name: 'ユキ' }), 'ユキ隊長、中央炉の修理が完了しました。');
  });

  test('名前の中の記号はふりがな記法として解釈しない', () => {
    const tokens = plain(parseRichText('{name}です', { name: '{猫|ねこ}<b>' }));
    assert.deepStrictEqual(tokens, [{ text: '{猫|ねこ}<b>です' }]);
  });

  test('ふりがな記法を分解する', () => {
    const tokens = plain(parseRichText('{中央炉|ちゅうおうろ}を{強化|きょうか}する', {}));
    assert.deepStrictEqual(tokens, [
      { ruby: '中央炉', rt: 'ちゅうおうろ' },
      { text: 'を' },
      { ruby: '強化', rt: 'きょうか' },
      { text: 'する' }
    ]);
    assert.strictEqual(plainText('{中央炉|ちゅうおうろ}を強化', {}), '中央炉を強化');
  });

  test('未定義の変数はそのまま残す', () => {
    assert.strictEqual(plainText('{foo}と{name}', { name: 'A' }), '{foo}とA');
  });
};
