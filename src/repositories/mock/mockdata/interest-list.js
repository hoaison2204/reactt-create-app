const interesetLists =
{
  'category': [
    {
      name: '旅',
      option: [
        {
          id: 1,
          value: '旅レジャー',
          choice: true
        },
        {
          id: 2,
          value: '旅エンタメ',
          choice: false
        },
        {
          id: 3,
          value: '旅スポーツ',
          choice: false
        }
      ]
    },
    {
      name: '遊ぶ',
      option: [
        {
          id: 4,
          value: '遊ぶレジャー',
          choice: false
        },
        {
          id: 5,
          value: '遊ぶエンタメ',
          choice: true
        },
        {
          id: 6,
          value: '遊ぶスポーツ',
          choice: false
        }
      ]
    },
    {
      name: '食べる',
      option: [
        {
          id: 7,
          value: '食べるレジャー',
          choice: false
        },
        {
          id: 8,
          value: '食べるエンタメ',
          choice: false
        },
        {
          id: 9,
          value: '食べるスポーツ',
          choice: false
        }
      ]
    }, {
      name: '買い物',
      option: [
        {
          id: 10,
          value: '買い物レジャー',
          choice: false
        },
        {
          id: 11,
          value: '買い物エンタメ',
          choice: false
        },
        {
          id: 12,
          value: '買い物スポーツ',
          choice: false
        }
      ]
    },
    {
      name: '育児・介護・健康',
      option: [
        {
          id: 13,
          value: '育児・介護・健康レジャー',
          choice: false
        },
        {
          id: 14,
          value: '育児・介護・健康エンタメ',
          choice: false
        },
        {
          id: 15,
          value: '育児・介護・健康スポーツ',
          choice: false
        }
      ]
    },
    {
      name: 'その他',
      option: [
        {
          id: 16,
          value: 'その他レジャー',
          choice: false
        },
        {
          id: 17,
          value: 'その他エンタメ',
          choice: false
        },
        {
          id: 18,
          value: 'その他スポーツ',
          choice: false
        }
      ]
    }
  ]
},

  anounce_email = [
    {
      status: false,
      email: '月次配信'
    },
    {
      status: false,
      email: '新着情報'
    },
    {
      status: false,
      email: 'あなたへのお知らせ'
    }
  ],
  favorite_area =
  [
    {
      'id': 1,
      'cityName': '北海道1'
    },
    {
      'id': 2,
      'cityName': '北海道2'
    }
  ]


export {
  interesetLists,
  anounce_email,
  favorite_area
}
