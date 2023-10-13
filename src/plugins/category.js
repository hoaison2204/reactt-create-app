export default async (_, inject) => {
  inject('category', {
    list: [
      {
        id: 1,
        name: '旅',
        isVisible: false,
        list: [
          {
            id: 1,
            name: '国内ホテル'
          },
          {
            id: 2,
            name: '海外ホテル'
          },
          {
            id: 3,
            name: 'ツアー'
          }
        ]
      },
      {
        id: 2,
        name: '遊ぶ',
        isVisible: false,
        list: [
          {
            id: 4,
            name: '劇場鑑賞券'
          },
          {
            id: 5,
            name: '映画作品'
          },
          {
            id: 6,
            name: '演劇・舞台'
          },
          {
            id: 7,
            name: 'コンサート'
          },
          {
            id: 8,
            name: 'その他チケット'
          },
          {
            id: 9,
            name: 'レジャー'
          },
          {
            id: 10,
            name: 'アウトドアレジャー'
          },
          {
            id: 11,
            name: 'イベント'
          },
          {
            id: 12,
            name: 'ボウリング'
          },
          {
            id: 13,
            name: 'カラオケ'
          },
          {
            id: 14,
            name: 'インターネットカフェ'
          },
          {
            id: 15,
            name: 'その他エンターテインメント'
          },
          {
            id: 16,
            name: '野球サッカー'
          },
          {
            id: 17,
            name: 'その他スポーツ観戦'
          }
        ]
      },
      {
        id: 3,
        name: '食べる',
        isVisible: false,
        list: [
          {
            id: 18,
            name: '居酒屋'
          },
          {
            id: 19,
            name: 'ダイニングバーＢＡＲ'
          },
          {
            id: 20,
            name: 'ビアガーデン'
          },
          {
            id: 21,
            name: '和食'
          },
          {
            id: 22,
            name: '焼肉'
          },
          {
            id: 23,
            name: 'ホルモン鍋'
          },
          {
            id: 24,
            name: 'そば'
          },
          {
            id: 25,
            name: 'うどん'
          },
          {
            id: 26,
            name: '定食'
          },
          {
            id: 27,
            name: '食堂'
          },
          {
            id: 28,
            name: '軽食'
          },
          {
            id: 29,
            name: '洋食'
          },
          {
            id: 30,
            name: '欧風料理'
          },
          {
            id: 31,
            name: 'カレー'
          },
          {
            id: 32,
            name: 'イタリア料理'
          },
          {
            id: 33,
            name: 'フランス料理'
          },
          {
            id: 34,
            name: 'スペイン料理'
          },
          {
            id: 35,
            name: '西洋料理'
          },
          {
            id: 36,
            name: '中国料理'
          },
          {
            id: 37,
            name: '韓国料理'
          },
          {
            id: 38,
            name: 'アジア'
          },
          {
            id: 39,
            name: 'エスニックブッフェ'
          },
          {
            id: 40,
            name: 'バイキング'
          },
          {
            id: 41,
            name: 'ラーメン'
          },
          {
            id: 42,
            name: 'つけ麺'
          },
          {
            id: 43,
            name: 'ちゃんぽん'
          },
          {
            id: 44,
            name: 'カフェ'
          },
          {
            id: 45,
            name: 'スイーツ'
          },
          {
            id: 46,
            name: 'ファミレス'
          },
          {
            id: 47,
            name: 'ファーストフード'
          },
          {
            id: 48,
            name: 'デリバリー'
          },
          {
            id: 49,
            name: 'テイクアウト'
          },
          {
            id: 50,
            name: 'エンターテインメント'
          },
          {
            id: 51,
            name: 'その他'
          },
          {
            id: 52,
            name: '情報サービス'
          },
          {
            id: 53,
            name: '食事券'
          }
        ]
      },
      {
        id: 4,
        name: '買い物',
        isVisible: false,
        list: [
          {
            id: 54,
            name: '新聞'
          },
          {
            id: 55,
            name: '書籍'
          },
          {
            id: 56,
            name: '雑誌'
          },
          {
            id: 57,
            name: 'ビジネス誌'
          },
          {
            id: 58,
            name: '一般誌'
          },
          {
            id: 59,
            name: 'スポーツ誌'
          },
          {
            id: 60,
            name: 'スポーツ用品'
          },
          {
            id: 61,
            name: '家具'
          },
          {
            id: 62,
            name: '家電'
          },
          {
            id: 63,
            name: 'ビジネススーツ'
          },
          {
            id: 64,
            name: 'ファッション'
          },
          {
            id: 65,
            name: '美容'
          },
          {
            id: 66,
            name: 'コスメ'
          },
          {
            id: 67,
            name: '百貨店'
          },
          {
            id: 68,
            name: '雑貨食料'
          },
          {
            id: 69,
            name: '飲料'
          },
          {
            id: 70,
            name: 'ブランド品'
          },
          {
            id: 71,
            name: 'ペット用品'
          },
          {
            id: 72,
            name: 'ベネポ交換'
          },
          {
            id: 73,
            name: 'その他'
          }
        ]
      },
      {
        id: 5,
        name: '育児・介護・健康',
        isVisible: false,
        list: [
          {
            id: 74,
            name: '在宅介護'
          },
          {
            id: 75,
            name: '介護施設'
          },
          {
            id: 76,
            name: '介護用品'
          },
          {
            id: 77,
            name: 'その他(介護)'
          }
        ]
      },
      {
        id: 99,
        name: 'その他',
        isVisible: false,
        list: [
          {
            id: 78,
            name: '誕生日'
          },
          {
            id: 79,
            name: '出会い'
          },
          {
            id: 80,
            name: '結婚'
          },
          {
            id: 81,
            name: '育児'
          },
          {
            id: 82,
            name: 'こども'
          },
          {
            id: 83,
            name: '仕事'
          },
          {
            id: 84,
            name: '資格'
          },
          {
            id: 85,
            name: 'くらし'
          }
        ]
      }
    ]
  })
}
