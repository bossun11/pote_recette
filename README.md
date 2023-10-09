## サービス概要

芋のお菓子専門店を探したい人に
手軽に検索・シェアできる情報を提供する
芋のお菓子専門店検索＆シェア Web サービスです。

## ユーザーが抱える課題

- 芋のお菓子専門店を探す際に、情報が散らばっていて見つけにくい。
- お気に入りのお店や商品を記録・管理する方法がない。

## 課題に対する仮説

- 芋のお菓子専門店に関する情報が一元化されていないため、検索エンジンや SNS での情報収集が困難である。
- 芋菓子専門店以外でも、美味しい芋のお菓子を提供しているお店があるため、情報が散らばっている。
- 芋に特化したサービスがないため、お気に入りのお店や商品を管理しづらい。

## 解決方法

- 専門店の情報を一元化し、検索機能を使って簡単にお店を探せるようにする。
- シェア機能を導入し、ユーザー同士が情報をシェア・SNS などで簡単にお店の情報を共有できるようにする。
- ランキング機能を提供し、人気のお店や商品を一覧で確認できるようにする。
- ブックマーク機能を提供し、ユーザーがお気に入りの芋のお菓子専門店のみを簡単に記録・管理できるようにする。

## メインのターゲットユーザー

- 芋のお菓子が好きで新しいお店や商品を探している方
- お気に入りのお店を簡単に記録・管理したい方
- 人気のお店や商品に関心がある方

## 実装予定の機能

【MVP リリース】

- ログイン機能
  - Google アカウントを使った認証ログイン
- 店舗検索機能
  - 現在地や住所検索に基づく近隣のお店を見つける
- ブックマーク機能
  - お気に入りのお店を登録して管理する
  - 登録したお店を簡単に閲覧できる

【本リリース】

- ランキング機能 (優先度: 高)
  - 人気のお店や商品をランキング形式で表示する
  - ユーザーのブックマーク数や評価をもとにランキングを作成する
- シェア機能 (優先度: 高)
  - Twitter や LINE などの SNS でシェアできる
- 星レビュー機能 (優先度: 中)
  - 店舗詳細ページにてレビュー数と平均評価を表示する
- 口コミ機能 (優先度: 中)
  - 口コミを一覧表示する
- 投稿機能 (優先度: 低)
  - ユーザーがお店や商品に関する情報を投稿できる
- コメント機能 (優先度: 低)
  - ユーザーが投稿に対してコメントできる
- タグ付け機能 (優先度: 低)
  - タグを活用して、興味のあるお店や商品を見つけやすくする

## なぜこのサービスを作りたいのか？

自分は甘いもの全般が好きで、特に芋を使ったお菓子に魅力を感じています。
しかし、芋のお菓子専門店を探す方法は限られており、芋に特化したサービスが見つからなかったため、情報を入手するのが難しいのが現状です。
気軽に芋のお菓子専門店を検索できるサービスを提供することで、芋好きファンが新しい発見を楽しめると思いました。

## スケジュール

企画〜技術調査：4/15 〆切
README〜ER 図作成：5/14 〆切
メイン機能実装：6/27 ~ 8/17
本番リリース：9/19

## 技術選定

- RailsAPI
- React
- Tailwind CSS
- MySQL
- Heroku

## 画面遷移図

https://www.figma.com/file/voTP9upZY37cFH3V5dfnRT/%E7%94%BB%E9%9D%A2%E9%81%B7%E7%A7%BB%E5%9B%B3?type=design&node-id=0%3A1&t=dLJk7tWaREOLhyfw-1

## ER 図

https://drive.google.com/file/d/1vmb4MlE6AX-ra8Jxzp9AzS13l_EUgNiW/view?usp=sharing
