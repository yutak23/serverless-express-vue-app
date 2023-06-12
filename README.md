## serverless-express-vue-app

## config

- dynamodb.session.cookie.maxAge: 7 days(24h × 60m × 60s × 1000ms)

## 開発

### Vite の dev サーバー × nodemon で Express

最も基本形の開発

- yarn dev
- yarn express
- `.env`に以下の定数の設定が必要
  - CLIENT_ID
  - CLIENT_SECRET
  - REDIRECT_URI
  - COOKIE_SECRET

### ビルド済みの Vue × nodemon で Express

バックエンドのみ開発する場合

- yarn build:dev
- yarn express
- `.env`に以下の定数の設定が必要
  - CLIENT_ID
  - CLIENT_SECRET
  - REDIRECT_URI
  - COOKIE_SECRET

### ビルド済みの Vue × Express

Cypress での認証突破後に、自動テストの API テストを流す場合

- yarn build:dev
- yarn express:run:test
- `.env`に以下の定数の設定が必要
  - CLIENT_ID
  - CLIENT_SECRET
  - REDIRECT_URI
  - COOKIE_SECRET

### ビルド済みの Vue × serverless の Express

- yarn build:localdev
- yarn sls:dev
- `yarn sls:dev`のコマンドオプションに以下が必要
  - --param=ipaddress1
  - --param=CLIENT_ID
  - --param=CLIENT_SECRET
  - --param=REDIRECT_URI
  - --param=COOKIE_SECRET

## テスト

### ローカル環境でテストをする時の注意

- Google のクライアント情報の`承認済みの JavaScript 生成元`と`承認済みのリダイレクト URI`にそれぞれ以下を設定
  - 承認済みの JavaScript 生成元：https://localhost
  - 承認済みのリダイレクト URI：https://localhost/auth/callback
- `.env`の以下の値を以下のようにする
  - REDIRECT_URI=https://localhost/auth/callback

### CI での自動テスト

- docker compose でアプリ、その他（Nginx, MySQL, DynamoDB(Localstack)）を立ち上げ、docker のネットワークと疎通する事でテストを実行できるようにする
  - 環境変数 NGINX_DIR を`./config/for_ci_nginx`に設定する

## 課題

- redirect_uris に登録する uri が API Gateway を Deploy してからでないと判明しない
  - 暫定対応：PoC 環境なので雑に 2 回 Deploy する（1 回目の Deploy 時には適当な redirect_uri を指定して、2 回目の Deploy でそれを上書きする）
