# bo-bsff-frontend-mypage


## Project setup
```
yarn install
```


### Compiles and hot-reloads for development
```
yarn serve
```


### Compiles and minifies for production
```
yarn build
```


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## デバッグコマンド

- F2 押下でモーダルが表示される
- デバッグに必要な情報が閲覧されている
- デバッグに必要な処理が実行できる


## Swagger JSON を出力する

現在のモックから BFF 連携用の Swagger JSON を出力します。
※出力先: public/swagger/swagger.json

```sh
yarn swagger
```

## Swagger UIを表示する
URL: /swagger/dist

# FRONT
ポリシー動作確認
codecommit操作権限確認
操作手順書作成のための更新


# swagger API連携
既存の仮データを取得するAPIはページの確認などもあるためそのままにしています。
swaggerに連携するタイミングでこちらのRepository Factoryを使用してください。

### 1: ファイル作成 or 既存のrepository-exampleをコピー
`/repositories/repository-${resource}.js`

### 2: 中のコードをAPIに合わせて記述
参考程度に `repository-example.js`にいくつか記述しています

### 3: 作成したファイルを追加
repository-factory.js内にimportなどの記述を追加

### 4: 使いたいvueファイルで読み込み
injectしているので、あとは下記のような書き方でAPIを取得。

@example
this.$repositories('hoge').get()
this.$repositories('hoge').post()

補足: hogeに値する部分が上記3の`const repositories = {}` 内で定義した変数名になります。


# パンくずリストについて
パンくずリストは下記に格納されています。
```
this.$page.routes
```
パンくずリストの子は下記オブジェクトになっています。
```
{name: 'パンくずリスト名', path: '遷移先パス'}
※pathが存在しない場合は自動的に/に遷移されます。
```
パンくずリスト設定用のフォーマット関数を作成しました。
```
formatBreadcrumb(name, path)
name: パンくずリスト名
path: 遷移先パス
```

パンくずの自動生成処理を削除しました。
※パンくず指定のルールが統一されていないため。

基本的には指定をしない場合、パンくずは表示されません。
パンくずが必要とするvueテンプレートで下記記述を追記してください。

例）
```
this.$page.setBreadcrumb(this.$page.formatBreadcrumb('テスト１'));
this.$page.setBreadcrumb(this.$page.formatBreadcrumb('テスト２', '/test2'));
this.$page.setBreadcrumb(this.$page.formatBreadcrumb('テスト３', '/test3'));
```
※遷移先パス（第二引数）が指定されていない場合、リンクの設定はされません。
