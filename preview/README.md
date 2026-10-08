# スマートフォン向けの試作用入口

`preview/index.html` はリポジトリ直下のゲームを読み込み、`preview/config.js` だけで試作用の設定を適用します。

- 保存キーは `frozenFrontier.preview.snowfield.v1`。公開版の保存キーと旧セーブの読み込み先を使いません。
- サーバー同期は無効。公開版のプレイヤーコードやサーバーの記録を使いません。
- `<base href="../">` により、問題・画像・CSSを同じリビジョンのリポジトリ直下から読み込みます。
- 公開リポジトリの任意リビジョンをHTMLとして配信するraw.githack.comを利用できます。URL形式は `https://raw.githack.com/torinosuke-games/fro-fro/<commit>/preview/index.html` です。
- `index.html` の読み込み構成を変更した場合は、この入口にも反映します。

ローカル検証：

```sh
python3 -m http.server 8765 --bind 127.0.0.1
FF_TEST_URL=http://127.0.0.1:8765/preview/index.html node tests/ui-adventure.cjs
```

試作用入口でも、編成・敵3体の撃破・戦闘途中の再読み込み・次の集落への到着のブラウザーテストに成功しています。外部配信サービスへのHTTP応答確認は、クラウド環境の通信制限により未実施です。
