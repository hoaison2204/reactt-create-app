const areaMock = [
    {
      area_lrg_class_cd: 'region-1',
      area_lrg_class_nm: '北海道',
      area_mid_class_cd: 'hokkaido',
      area_mid_class_nm: '北海道',
      area_sml_class_cd: 'asahikawa',
      area_sml_class_nm: '旭川'
    },
    {
      area_lrg_class_cd: 'region-1',
      area_lrg_class_nm: '北海道',
      area_mid_class_cd: 'hokkaido',
      area_mid_class_nm: '北海道',
      area_sml_class_cd: 'obihiro',
      area_sml_class_nm: '帯広'
    },
    {
      area_lrg_class_cd: 'region-1',
      area_lrg_class_nm: '北海道',
      area_mid_class_cd: 'hokkaido',
      area_mid_class_nm: '北海道',
      area_sml_class_cd: 'furano',
      area_sml_class_nm: '富良野'
    },
    {
      area_lrg_class_cd: 'region-1',
      area_lrg_class_nm: '北海道',
      area_mid_class_cd: 'hokkaido',
      area_mid_class_nm: '北海道',
      area_sml_class_cd: 'sapporo',
      area_sml_class_nm: '札幌'
    },
    {
      area_lrg_class_cd: 'region-1',
      area_lrg_class_nm: '北海道',
      area_mid_class_cd: 'hokkaido',
      area_mid_class_nm: '北海道',
      area_sml_class_cd: 'kushiro',
      area_sml_class_nm: '釧路'
    },
    {
      area_lrg_class_cd: 'region-1',
      area_lrg_class_nm: '北海道',
      area_mid_class_cd: 'hokkaido',
      area_mid_class_nm: '北海道',
      area_sml_class_cd: 'wakkanai',
      area_sml_class_nm: '稚内'
    },
    {
      area_lrg_class_cd: 'region-1',
      area_lrg_class_nm: '北海道',
      area_mid_class_cd: 'hokkaido',
      area_mid_class_nm: '北海道',
      area_sml_class_cd: 'chitose',
      area_sml_class_nm: '千歳'
    },
    {
      area_lrg_class_cd: 'region-2',
      area_lrg_class_nm: '東北',
      area_mid_class_cd: 'akita',
      area_mid_class_nm: '秋田県',
      area_sml_class_cd: 'akita',
      area_sml_class_nm: '秋田'
    },
    {
      area_lrg_class_cd: 'region-2',
      area_lrg_class_nm: '東北',
      area_mid_class_cd: 'akita',
      area_mid_class_nm: '秋田県',
      area_sml_class_cd: 'tazawa',
      area_sml_class_nm: '田沢湖'
    },
    {
      area_lrg_class_cd: 'region-2',
      area_lrg_class_nm: '東北',
      area_mid_class_cd: 'akita',
      area_mid_class_nm: '秋田県',
      area_sml_class_cd: 'odate',
      area_sml_class_nm: '大館'
    },
    {
      area_lrg_class_cd: 'region-2',
      area_lrg_class_nm: '東北',
      area_mid_class_cd: 'akita',
      area_mid_class_nm: '秋田県',
      area_sml_class_cd: 'yuzawa',
      area_sml_class_nm: '湯沢'
    },
    {
      area_lrg_class_cd: 'region-2',
      area_lrg_class_nm: '東北',
      area_mid_class_cd: 'akita',
      area_mid_class_nm: '秋田県',
      area_sml_class_cd: 'honjo',
      area_sml_class_nm: '本荘'
    },
    {
      area_lrg_class_cd: 'region-2',
      area_lrg_class_nm: '東北',
      area_mid_class_cd: 'aomori',
      area_mid_class_nm: '青森県',
      area_sml_class_cd: 'tsugaru',
      area_sml_class_nm: '津軽'
    },
    {
      area_lrg_class_cd: 'region-2',
      area_lrg_class_nm: '東北',
      area_mid_class_cd: 'aomori',
      area_mid_class_nm: '青森県',
      area_sml_class_cd: 'hachinohe',
      area_sml_class_nm: '八戸'
    },
    {
      area_lrg_class_cd: 'region-2',
      area_lrg_class_nm: '東北',
      area_mid_class_cd: 'aomori',
      area_mid_class_nm: '青森県',
      area_sml_class_cd: 'hirosaki',
      area_sml_class_nm: '弘前'
    },
    {
      area_lrg_class_cd: 'region-2',
      area_lrg_class_nm: '東北',
      area_mid_class_cd: 'aomori',
      area_mid_class_nm: '青森県',
      area_sml_class_cd: 'ntsugaru',
      area_sml_class_nm: '津軽'
    },
    {
      area_lrg_class_cd: 'region-2',
      area_lrg_class_nm: '東北',
      area_mid_class_cd: 'aomori',
      area_mid_class_nm: '青森県',
      area_sml_class_cd: 'aomori',
      area_sml_class_nm: '青森'
    },
    {
      area_lrg_class_cd: 'region-2',
      area_lrg_class_nm: '東北',
      area_mid_class_cd: 'hukushima',
      area_mid_class_nm: '福島県',
      area_sml_class_cd: 'aizu',
      area_sml_class_nm: '会津'
    },
    {
      area_lrg_class_cd: 'region-2',
      area_lrg_class_nm: '東北',
      area_mid_class_cd: 'hukushima',
      area_mid_class_nm: '福島県',
      area_sml_class_cd: 'hamadori',
      area_sml_class_nm: '浜通り'
    },
    {
      area_lrg_class_cd: 'region-2',
      area_lrg_class_nm: '東北',
      area_mid_class_cd: 'hukushima',
      area_mid_class_nm: '福島県',
      area_sml_class_cd: 'bandai',
      area_sml_class_nm: '磐梯'
    },
    {
      area_lrg_class_cd: 'region-2',
      area_lrg_class_nm: '東北',
      area_mid_class_cd: 'hukushima',
      area_mid_class_nm: '福島県',
      area_sml_class_cd: 'koriyama',
      area_sml_class_nm: '郡山'
    },
    {
      area_lrg_class_cd: 'region-2',
      area_lrg_class_nm: '東北',
      area_mid_class_cd: 'hukushima',
      area_mid_class_nm: '福島県',
      area_sml_class_cd: 'fukushima',
      area_sml_class_nm: '福島'
    },
    {
      area_lrg_class_cd: 'region-2',
      area_lrg_class_nm: '東北',
      area_mid_class_cd: 'hukushima',
      area_mid_class_nm: '福島県',
      area_sml_class_cd: 'nakadori',
      area_sml_class_nm: '中通り'
    },
    {
      area_lrg_class_cd: 'region-2',
      area_lrg_class_nm: '東北',
      area_mid_class_cd: 'hukushima',
      area_mid_class_nm: '福島県',
      area_sml_class_cd: 'urabandai',
      area_sml_class_nm: '裏磐梯'
    },
    {
      area_lrg_class_cd: 'region-2',
      area_lrg_class_nm: '東北',
      area_mid_class_cd: 'iwate',
      area_mid_class_nm: '岩手県',
      area_sml_class_cd: 'ichinoseki',
      area_sml_class_nm: '一関'
    },
    {
      area_lrg_class_cd: 'region-2',
      area_lrg_class_nm: '東北',
      area_mid_class_cd: 'iwate',
      area_mid_class_nm: '岩手県',
      area_sml_class_cd: 'morioka',
      area_sml_class_nm: '盛岡'
    },
    {
      area_lrg_class_cd: 'region-2',
      area_lrg_class_nm: '東北',
      area_mid_class_cd: 'iwate',
      area_mid_class_nm: '岩手県',
      area_sml_class_cd: 'appi',
      area_sml_class_nm: '安比'
    },
    {
      area_lrg_class_cd: 'region-2',
      area_lrg_class_nm: '東北',
      area_mid_class_cd: 'iwate',
      area_mid_class_nm: '岩手県',
      area_sml_class_cd: 'kitakami',
      area_sml_class_nm: '北上'
    },
    {
      area_lrg_class_cd: 'region-2',
      area_lrg_class_nm: '東北',
      area_mid_class_cd: 'miyagi',
      area_mid_class_nm: '宮城県',
      area_sml_class_cd: 'matsushima',
      area_sml_class_nm: '松島'
    },
    {
      area_lrg_class_cd: 'region-2',
      area_lrg_class_nm: '東北',
      area_mid_class_cd: 'miyagi',
      area_mid_class_nm: '宮城県',
      area_sml_class_cd: 'akiu',
      area_sml_class_nm: '秋保'
    },
    {
      area_lrg_class_cd: 'region-2',
      area_lrg_class_nm: '東北',
      area_mid_class_cd: 'miyagi',
      area_mid_class_nm: '宮城県',
      area_sml_class_cd: 'sendai',
      area_sml_class_nm: '仙台'
    },
    {
      area_lrg_class_cd: 'region-2',
      area_lrg_class_nm: '東北',
      area_mid_class_cd: 'miyagi',
      area_mid_class_nm: '宮城県',
      area_sml_class_cd: 'shiroishi',
      area_sml_class_nm: '白石'
    },
    {
      area_lrg_class_cd: 'region-2',
      area_lrg_class_nm: '東北',
      area_mid_class_cd: 'miyagi',
      area_mid_class_nm: '宮城県',
      area_sml_class_cd: 'naruko',
      area_sml_class_nm: '鳴子'
    },
    {
      area_lrg_class_cd: 'region-2',
      area_lrg_class_nm: '東北',
      area_mid_class_cd: 'yamagata',
      area_mid_class_nm: '山形県',
      area_sml_class_cd: 'yamagata',
      area_sml_class_nm: '山形'
    },
    {
      area_lrg_class_cd: 'region-2',
      area_lrg_class_nm: '東北',
      area_mid_class_cd: 'yamagata',
      area_mid_class_nm: '山形県',
      area_sml_class_cd: 'shonai',
      area_sml_class_nm: '庄内'
    },
    {
      area_lrg_class_cd: 'region-2',
      area_lrg_class_nm: '東北',
      area_mid_class_cd: 'yamagata',
      area_mid_class_nm: '山形県',
      area_sml_class_cd: 'yonezawa',
      area_sml_class_nm: '米沢'
    },
    {
      area_lrg_class_cd: 'region-3',
      area_lrg_class_nm: '北関東',
      area_mid_class_cd: 'gunma',
      area_mid_class_nm: '群馬県',
      area_sml_class_cd: 'numata',
      area_sml_class_nm: '沼田'
    },
    {
      area_lrg_class_cd: 'region-3',
      area_lrg_class_nm: '北関東',
      area_mid_class_cd: 'gunma',
      area_mid_class_nm: '群馬県',
      area_sml_class_cd: 'oze',
      area_sml_class_nm: '尾瀬'
    },
    {
      area_lrg_class_cd: 'region-3',
      area_lrg_class_nm: '北関東',
      area_mid_class_cd: 'gunma',
      area_mid_class_nm: '群馬県',
      area_sml_class_cd: 'kusatsu',
      area_sml_class_nm: '草津'
    },
    {
      area_lrg_class_cd: 'region-3',
      area_lrg_class_nm: '北関東',
      area_mid_class_cd: 'gunma',
      area_mid_class_nm: '群馬県',
      area_sml_class_cd: 'ikaho',
      area_sml_class_nm: '伊香保'
    },
    {
      area_lrg_class_cd: 'region-3',
      area_lrg_class_nm: '北関東',
      area_mid_class_cd: 'gunma',
      area_mid_class_nm: '群馬県',
      area_sml_class_cd: 'kiryu',
      area_sml_class_nm: '桐生'
    },
    {
      area_lrg_class_cd: 'region-3',
      area_lrg_class_nm: '北関東',
      area_mid_class_cd: 'gunma',
      area_mid_class_nm: '群馬県',
      area_sml_class_cd: 'manza',
      area_sml_class_nm: '万座'
    },
    {
      area_lrg_class_cd: 'region-3',
      area_lrg_class_nm: '北関東',
      area_mid_class_cd: 'ibaragi',
      area_mid_class_nm: '茨城県',
      area_sml_class_cd: 'kashima',
      area_sml_class_nm: '鹿島'
    },
    {
      area_lrg_class_cd: 'region-3',
      area_lrg_class_nm: '北関東',
      area_mid_class_cd: 'ibaragi',
      area_mid_class_nm: '茨城県',
      area_sml_class_cd: 'hitachi',
      area_sml_class_nm: '日立'
    },
    {
      area_lrg_class_cd: 'region-3',
      area_lrg_class_nm: '北関東',
      area_mid_class_cd: 'ibaragi',
      area_mid_class_nm: '茨城県',
      area_sml_class_cd: 'tsukuba',
      area_sml_class_nm: 'つくば'
    },
    {
      area_lrg_class_cd: 'region-3',
      area_lrg_class_nm: '北関東',
      area_mid_class_cd: 'ibaragi',
      area_mid_class_nm: '茨城県',
      area_sml_class_cd: 'mito',
      area_sml_class_nm: '水戸'
    },
    {
      area_lrg_class_cd: 'region-3',
      area_lrg_class_nm: '北関東',
      area_mid_class_cd: 'ibaragi',
      area_mid_class_nm: '茨城県',
      area_sml_class_cd: 'oarai',
      area_sml_class_nm: '大洗'
    },
    {
      area_lrg_class_cd: 'region-3',
      area_lrg_class_nm: '北関東',
      area_mid_class_cd: 'tochigi',
      area_mid_class_nm: '栃木県',
      area_sml_class_cd: 'shiobara',
      area_sml_class_nm: '塩原'
    },
    {
      area_lrg_class_cd: 'region-3',
      area_lrg_class_nm: '北関東',
      area_mid_class_cd: 'tochigi',
      area_mid_class_nm: '栃木県',
      area_sml_class_cd: 'nasu',
      area_sml_class_nm: '那須'
    },
    {
      area_lrg_class_cd: 'region-3',
      area_lrg_class_nm: '北関東',
      area_mid_class_cd: 'tochigi',
      area_mid_class_nm: '栃木県',
      area_sml_class_cd: 'koyama',
      area_sml_class_nm: '小山'
    },
    {
      area_lrg_class_cd: 'region-3',
      area_lrg_class_nm: '北関東',
      area_mid_class_cd: 'tochigi',
      area_mid_class_nm: '栃木県',
      area_sml_class_cd: 'utsunomiya',
      area_sml_class_nm: '宇都宮'
    },
    {
      area_lrg_class_cd: 'region-3',
      area_lrg_class_nm: '北関東',
      area_mid_class_cd: 'tochigi',
      area_mid_class_nm: '栃木県',
      area_sml_class_cd: 'nikko',
      area_sml_class_nm: '日光'
    },
    {
      area_lrg_class_cd: 'region-4',
      area_lrg_class_nm: '首都圏',
      area_mid_class_cd: 'kanagawa',
      area_mid_class_nm: '神奈川県',
      area_sml_class_cd: 'hakone',
      area_sml_class_nm: '箱根'
    },
    {
      area_lrg_class_cd: 'region-4',
      area_lrg_class_nm: '首都圏',
      area_mid_class_cd: 'kanagawa',
      area_mid_class_nm: '神奈川県',
      area_sml_class_cd: 'kawasaki',
      area_sml_class_nm: '川崎'
    },
    {
      area_lrg_class_cd: 'region-4',
      area_lrg_class_nm: '首都圏',
      area_mid_class_cd: 'kanagawa',
      area_mid_class_nm: '神奈川県',
      area_sml_class_cd: 'yugawara',
      area_sml_class_nm: '湯河原'
    },
    {
      area_lrg_class_cd: 'region-4',
      area_lrg_class_nm: '首都圏',
      area_mid_class_cd: 'kanagawa',
      area_mid_class_nm: '神奈川県',
      area_sml_class_cd: 'yokohama',
      area_sml_class_nm: '横浜'
    },
    {
      area_lrg_class_cd: 'region-4',
      area_lrg_class_nm: '首都圏',
      area_mid_class_cd: 'kanagawa',
      area_mid_class_nm: '神奈川県',
      area_sml_class_cd: 'miura',
      area_sml_class_nm: '三浦'
    },
    {
      area_lrg_class_cd: 'region-4',
      area_lrg_class_nm: '首都圏',
      area_mid_class_cd: 'kanagawa',
      area_mid_class_nm: '神奈川県',
      area_sml_class_cd: 'sagamihara',
      area_sml_class_nm: '相模原'
    },
    {
      area_lrg_class_cd: 'region-4',
      area_lrg_class_nm: '首都圏',
      area_mid_class_cd: 'kanagawa',
      area_mid_class_nm: '神奈川県',
      area_sml_class_cd: 'odawara',
      area_sml_class_nm: '小田原'
    },
    {
      area_lrg_class_cd: 'region-4',
      area_lrg_class_nm: '首都圏',
      area_mid_class_cd: 'saitama',
      area_mid_class_nm: '埼玉県',
      area_sml_class_cd: 'kumagaya',
      area_sml_class_nm: '熊谷'
    },
    {
      area_lrg_class_cd: 'region-4',
      area_lrg_class_nm: '首都圏',
      area_mid_class_cd: 'saitama',
      area_mid_class_nm: '埼玉県',
      area_sml_class_cd: 'tokorozawa',
      area_sml_class_nm: '所沢'
    },
    {
      area_lrg_class_cd: 'region-4',
      area_lrg_class_nm: '首都圏',
      area_mid_class_cd: 'saitama',
      area_mid_class_nm: '埼玉県',
      area_sml_class_cd: 'saitama',
      area_sml_class_nm: 'さいたま'
    },
    {
      area_lrg_class_cd: 'region-4',
      area_lrg_class_nm: '首都圏',
      area_mid_class_cd: 'saitama',
      area_mid_class_nm: '埼玉県',
      area_sml_class_cd: 'chichibu',
      area_sml_class_nm: '秩父'
    },
    {
      area_lrg_class_cd: 'region-4',
      area_lrg_class_nm: '首都圏',
      area_mid_class_cd: 'saitama',
      area_mid_class_nm: '埼玉県',
      area_sml_class_cd: 'kawagoe',
      area_sml_class_nm: '川越'
    },
    {
      area_lrg_class_cd: 'region-4',
      area_lrg_class_nm: '首都圏',
      area_mid_class_cd: 'saitama',
      area_mid_class_nm: '埼玉県',
      area_sml_class_cd: 'kasukabe',
      area_sml_class_nm: '春日部'
    },
    {
      area_lrg_class_cd: 'region-4',
      area_lrg_class_nm: '首都圏',
      area_mid_class_cd: 'tiba',
      area_mid_class_nm: '千葉県',
      area_sml_class_cd: 'keiyo',
      area_sml_class_nm: '京葉'
    },
    {
      area_lrg_class_cd: 'region-4',
      area_lrg_class_nm: '首都圏',
      area_mid_class_cd: 'tiba',
      area_mid_class_nm: '千葉県',
      area_sml_class_cd: 'tateyama',
      area_sml_class_nm: '館山'
    },
    {
      area_lrg_class_cd: 'region-4',
      area_lrg_class_nm: '首都圏',
      area_mid_class_cd: 'tiba',
      area_mid_class_nm: '千葉県',
      area_sml_class_cd: 'sotobo',
      area_sml_class_nm: '外房'
    },
    {
      area_lrg_class_cd: 'region-4',
      area_lrg_class_nm: '首都圏',
      area_mid_class_cd: 'tiba',
      area_mid_class_nm: '千葉県',
      area_sml_class_cd: 'choshi',
      area_sml_class_nm: '銚子'
    },
    {
      area_lrg_class_cd: 'region-4',
      area_lrg_class_nm: '首都圏',
      area_mid_class_cd: 'tiba',
      area_mid_class_nm: '千葉県',
      area_sml_class_cd: 'chiba',
      area_sml_class_nm: '千葉'
    },
    {
      area_lrg_class_cd: 'region-4',
      area_lrg_class_nm: '首都圏',
      area_mid_class_cd: 'tiba',
      area_mid_class_nm: '千葉県',
      area_sml_class_cd: 'narita',
      area_sml_class_nm: '成田'
    },
    {
      area_lrg_class_cd: 'region-4',
      area_lrg_class_nm: '首都圏',
      area_mid_class_cd: 'tokyo',
      area_mid_class_nm: '東京都',
      area_sml_class_cd: 'tokyo',
      area_sml_class_nm: '東京'
    },
    {
      area_lrg_class_cd: 'region-4',
      area_lrg_class_nm: '首都圏',
      area_mid_class_cd: 'tokyo',
      area_mid_class_nm: '東京都',
      area_sml_class_cd: 'nishi',
      area_sml_class_nm: '西東京'
    },
    {
      area_lrg_class_cd: 'region-6',
      area_lrg_class_nm: '甲信越',
      area_mid_class_cd: 'nagano',
      area_mid_class_nm: '長野県',
      area_sml_class_cd: 'nagano',
      area_sml_class_nm: '長野'
    },
    {
      area_lrg_class_cd: 'region-6',
      area_lrg_class_nm: '甲信越',
      area_mid_class_cd: 'nagano',
      area_mid_class_nm: '長野県',
      area_sml_class_cd: 'hakuba',
      area_sml_class_nm: '白馬'
    },
    {
      area_lrg_class_cd: 'region-6',
      area_lrg_class_nm: '甲信越',
      area_mid_class_cd: 'nagano',
      area_mid_class_nm: '長野県',
      area_sml_class_cd: 'kamiko',
      area_sml_class_nm: '上小'
    },
    {
      area_lrg_class_cd: 'region-6',
      area_lrg_class_nm: '甲信越',
      area_mid_class_cd: 'nagano',
      area_mid_class_nm: '長野県',
      area_sml_class_cd: 'shiga',
      area_sml_class_nm: '志賀'
    },
    {
      area_lrg_class_cd: 'region-6',
      area_lrg_class_nm: '甲信越',
      area_mid_class_cd: 'nagano',
      area_mid_class_nm: '長野県',
      area_sml_class_cd: 'kirigamine',
      area_sml_class_nm: '霧ヶ峰'
    },
    {
      area_lrg_class_cd: 'region-6',
      area_lrg_class_nm: '甲信越',
      area_mid_class_cd: 'nagano',
      area_mid_class_nm: '長野県',
      area_sml_class_cd: 'karui',
      area_sml_class_nm: '軽井沢'
    },
    {
      area_lrg_class_cd: 'region-6',
      area_lrg_class_nm: '甲信越',
      area_mid_class_cd: 'nagano',
      area_mid_class_nm: '長野県',
      area_sml_class_cd: 'yatsu',
      area_sml_class_nm: '八ヶ岳'
    },
    {
      area_lrg_class_cd: 'region-6',
      area_lrg_class_nm: '甲信越',
      area_mid_class_cd: 'nagano',
      area_mid_class_nm: '長野県',
      area_sml_class_cd: 'matsumo',
      area_sml_class_nm: '松本'
    },
    {
      area_lrg_class_cd: 'region-6',
      area_lrg_class_nm: '甲信越',
      area_mid_class_cd: 'nagano',
      area_mid_class_nm: '長野県',
      area_sml_class_cd: 'madara',
      area_sml_class_nm: '斑尾'
    },
    {
      area_lrg_class_cd: 'region-6',
      area_lrg_class_nm: '甲信越',
      area_mid_class_cd: 'niigata',
      area_mid_class_nm: '新潟県',
      area_sml_class_cd: 'kaetsu',
      area_sml_class_nm: '下越'
    },
    {
      area_lrg_class_cd: 'region-6',
      area_lrg_class_nm: '甲信越',
      area_mid_class_cd: 'niigata',
      area_mid_class_nm: '新潟県',
      area_sml_class_cd: 'niigata',
      area_sml_class_nm: '新潟'
    },
    {
      area_lrg_class_cd: 'region-6',
      area_lrg_class_nm: '甲信越',
      area_mid_class_cd: 'niigata',
      area_mid_class_nm: '新潟県',
      area_sml_class_cd: 'yuzawa',
      area_sml_class_nm: '湯沢'
    },
    {
      area_lrg_class_cd: 'region-6',
      area_lrg_class_nm: '甲信越',
      area_mid_class_cd: 'niigata',
      area_mid_class_nm: '新潟県',
      area_sml_class_cd: 'minami',
      area_sml_class_nm: '南'
    },
    {
      area_lrg_class_cd: 'region-6',
      area_lrg_class_nm: '甲信越',
      area_mid_class_cd: 'niigata',
      area_mid_class_nm: '新潟県',
      area_sml_class_cd: 'joetsu',
      area_sml_class_nm: '上越'
    },
    {
      area_lrg_class_cd: 'region-6',
      area_lrg_class_nm: '甲信越',
      area_mid_class_cd: 'niigata',
      area_mid_class_nm: '新潟県',
      area_sml_class_cd: 'kita',
      area_sml_class_nm: '北'
    },
    {
      area_lrg_class_cd: 'region-6',
      area_lrg_class_nm: '甲信越',
      area_mid_class_cd: 'yamanasi',
      area_mid_class_nm: '山梨県',
      area_sml_class_cd: 'kawaguchiko',
      area_sml_class_nm: '河口湖'
    },
    {
      area_lrg_class_cd: 'region-6',
      area_lrg_class_nm: '甲信越',
      area_mid_class_cd: 'yamanasi',
      area_mid_class_nm: '山梨県',
      area_sml_class_cd: 'yamanakako',
      area_sml_class_nm: '山中湖'
    },
    {
      area_lrg_class_cd: 'region-6',
      area_lrg_class_nm: '甲信越',
      area_mid_class_cd: 'yamanasi',
      area_mid_class_nm: '山梨県',
      area_sml_class_cd: 'kofu',
      area_sml_class_nm: '甲府'
    },
    {
      area_lrg_class_cd: 'region-6',
      area_lrg_class_nm: '甲信越',
      area_mid_class_cd: 'yamanasi',
      area_mid_class_nm: '山梨県',
      area_sml_class_cd: 'kiyosato',
      area_sml_class_nm: '清里'
    },
    {
      area_lrg_class_cd: 'region-6',
      area_lrg_class_nm: '甲信越',
      area_mid_class_cd: 'yamanasi',
      area_mid_class_nm: '山梨県',
      area_sml_class_cd: 'yamanashi',
      area_sml_class_nm: '山梨'
    },
    {
      area_lrg_class_cd: 'region-7',
      area_lrg_class_nm: '北陸',
      area_mid_class_cd: 'hukui',
      area_mid_class_nm: '福井県',
      area_sml_class_cd: 'tsuruga',
      area_sml_class_nm: '敦賀'
    },
    {
      area_lrg_class_cd: 'region-7',
      area_lrg_class_nm: '北陸',
      area_mid_class_cd: 'hukui',
      area_mid_class_nm: '福井県',
      area_sml_class_cd: 'hukui',
      area_sml_class_nm: '福井'
    },
    {
      area_lrg_class_cd: 'region-7',
      area_lrg_class_nm: '北陸',
      area_mid_class_cd: 'hukui',
      area_mid_class_nm: '福井県',
      area_sml_class_cd: 'awara',
      area_sml_class_nm: 'あわら'
    },
    {
      area_lrg_class_cd: 'region-7',
      area_lrg_class_nm: '北陸',
      area_mid_class_cd: 'hukui',
      area_mid_class_nm: '福井県',
      area_sml_class_cd: 'obama',
      area_sml_class_nm: '小浜'
    },
    {
      area_lrg_class_cd: 'region-7',
      area_lrg_class_nm: '北陸',
      area_mid_class_cd: 'ishikawa',
      area_mid_class_nm: '石川県',
      area_sml_class_cd: 'kaga',
      area_sml_class_nm: '加賀'
    },
    {
      area_lrg_class_cd: 'region-7',
      area_lrg_class_nm: '北陸',
      area_mid_class_cd: 'ishikawa',
      area_mid_class_nm: '石川県',
      area_sml_class_cd: 'nanao',
      area_sml_class_nm: '七尾'
    },
    {
      area_lrg_class_cd: 'region-7',
      area_lrg_class_nm: '北陸',
      area_mid_class_cd: 'ishikawa',
      area_mid_class_nm: '石川県',
      area_sml_class_cd: 'kanazawa',
      area_sml_class_nm: '金沢'
    },
    {
      area_lrg_class_cd: 'region-7',
      area_lrg_class_nm: '北陸',
      area_mid_class_cd: 'toyama',
      area_mid_class_nm: '富山県',
      area_sml_class_cd: 'toyama',
      area_sml_class_nm: '富山'
    },
    {
      area_lrg_class_cd: 'region-7',
      area_lrg_class_nm: '北陸',
      area_mid_class_cd: 'toyama',
      area_mid_class_nm: '富山県',
      area_sml_class_cd: 'gosei',
      area_sml_class_nm: '呉西'
    },
    {
      area_lrg_class_cd: 'region-7',
      area_lrg_class_nm: '北陸',
      area_mid_class_cd: 'toyama',
      area_mid_class_nm: '富山県',
      area_sml_class_cd: 'goto',
      area_sml_class_nm: '呉東'
    },
    {
      area_lrg_class_cd: 'region-8',
      area_lrg_class_nm: '東海',
      area_mid_class_cd: 'aichi',
      area_mid_class_nm: '愛知県',
      area_sml_class_cd: 'owari',
      area_sml_class_nm: '尾張'
    },
    {
      area_lrg_class_cd: 'region-8',
      area_lrg_class_nm: '東海',
      area_mid_class_cd: 'aichi',
      area_mid_class_nm: '愛知県',
      area_sml_class_cd: 'nagoyashi',
      area_sml_class_nm: '名古屋'
    },
    {
      area_lrg_class_cd: 'region-8',
      area_lrg_class_nm: '東海',
      area_mid_class_cd: 'aichi',
      area_mid_class_nm: '愛知県',
      area_sml_class_cd: 'mikawawan',
      area_sml_class_nm: '三河湾'
    },
    {
      area_lrg_class_cd: 'region-8',
      area_lrg_class_nm: '東海',
      area_mid_class_cd: 'aichi',
      area_mid_class_nm: '愛知県',
      area_sml_class_cd: 'minamichita',
      area_sml_class_nm: '南知多'
    },
    {
      area_lrg_class_cd: 'region-8',
      area_lrg_class_nm: '東海',
      area_mid_class_cd: 'gihu',
      area_mid_class_nm: '岐阜県',
      area_sml_class_cd: 'tajimi',
      area_sml_class_nm: '多治見'
    },
    {
      area_lrg_class_cd: 'region-8',
      area_lrg_class_nm: '東海',
      area_mid_class_cd: 'gihu',
      area_mid_class_nm: '岐阜県',
      area_sml_class_cd: 'gifu',
      area_sml_class_nm: '岐阜'
    },
    {
      area_lrg_class_cd: 'region-8',
      area_lrg_class_nm: '東海',
      area_mid_class_cd: 'gihu',
      area_mid_class_nm: '岐阜県',
      area_sml_class_cd: 'kamitakara',
      area_sml_class_nm: '上宝'
    },
    {
      area_lrg_class_cd: 'region-8',
      area_lrg_class_nm: '東海',
      area_mid_class_cd: 'gihu',
      area_mid_class_nm: '岐阜県',
      area_sml_class_cd: 'ogaki',
      area_sml_class_nm: '大垣'
    },
    {
      area_lrg_class_cd: 'region-8',
      area_lrg_class_nm: '東海',
      area_mid_class_cd: 'gihu',
      area_mid_class_nm: '岐阜県',
      area_sml_class_cd: 'gero',
      area_sml_class_nm: '下呂'
    },
    {
      area_lrg_class_cd: 'region-8',
      area_lrg_class_nm: '東海',
      area_mid_class_cd: 'gihu',
      area_mid_class_nm: '岐阜県',
      area_sml_class_cd: 'takayama',
      area_sml_class_nm: '高山'
    },
    {
      area_lrg_class_cd: 'region-8',
      area_lrg_class_nm: '東海',
      area_mid_class_cd: 'gihu',
      area_mid_class_nm: '岐阜県',
      area_sml_class_cd: 'gujo',
      area_sml_class_nm: '郡上'
    },
    {
      area_lrg_class_cd: 'region-8',
      area_lrg_class_nm: '東海',
      area_mid_class_cd: 'mie',
      area_mid_class_nm: '三重県',
      area_sml_class_cd: 'shima',
      area_sml_class_nm: '志摩'
    },
    {
      area_lrg_class_cd: 'region-8',
      area_lrg_class_nm: '東海',
      area_mid_class_cd: 'mie',
      area_mid_class_nm: '三重県',
      area_sml_class_cd: 'toba',
      area_sml_class_nm: '鳥羽'
    },
    {
      area_lrg_class_cd: 'region-8',
      area_lrg_class_nm: '東海',
      area_mid_class_cd: 'mie',
      area_mid_class_nm: '三重県',
      area_sml_class_cd: 'iga',
      area_sml_class_nm: '伊賀'
    },
    {
      area_lrg_class_cd: 'region-8',
      area_lrg_class_nm: '東海',
      area_mid_class_cd: 'mie',
      area_mid_class_nm: '三重県',
      area_sml_class_cd: 'matsusaka',
      area_sml_class_nm: '松阪'
    },
    {
      area_lrg_class_cd: 'region-8',
      area_lrg_class_nm: '東海',
      area_mid_class_cd: 'mie',
      area_mid_class_nm: '三重県',
      area_sml_class_cd: 'kumano',
      area_sml_class_nm: '熊野'
    },
    {
      area_lrg_class_cd: 'region-8',
      area_lrg_class_nm: '東海',
      area_mid_class_cd: 'mie',
      area_mid_class_nm: '三重県',
      area_sml_class_cd: 'yunoyama',
      area_sml_class_nm: '湯の山'
    },
    {
      area_lrg_class_cd: 'region-8',
      area_lrg_class_nm: '東海',
      area_mid_class_cd: 'mie',
      area_mid_class_nm: '三重県',
      area_sml_class_cd: 'tsu',
      area_sml_class_nm: '津'
    },
    {
      area_lrg_class_cd: 'region-8',
      area_lrg_class_nm: '東海',
      area_mid_class_cd: 'shizuoka',
      area_mid_class_nm: '静岡県',
      area_sml_class_cd: 'kikugawa',
      area_sml_class_nm: '菊川'
    },
    {
      area_lrg_class_cd: 'region-8',
      area_lrg_class_nm: '東海',
      area_mid_class_cd: 'shizuoka',
      area_mid_class_nm: '静岡県',
      area_sml_class_cd: 'naka',
      area_sml_class_nm: '中'
    },
    {
      area_lrg_class_cd: 'region-8',
      area_lrg_class_nm: '東海',
      area_mid_class_cd: 'shizuoka',
      area_mid_class_nm: '静岡県',
      area_sml_class_cd: 'ito',
      area_sml_class_nm: '伊藤'
    },
    {
      area_lrg_class_cd: 'region-8',
      area_lrg_class_nm: '東海',
      area_mid_class_cd: 'shizuoka',
      area_mid_class_nm: '静岡県',
      area_sml_class_cd: 'hamamatsu',
      area_sml_class_nm: '浜松'
    },
    {
      area_lrg_class_cd: 'region-8',
      area_lrg_class_nm: '東海',
      area_mid_class_cd: 'shizuoka',
      area_mid_class_nm: '静岡県',
      area_sml_class_cd: 'izukogen',
      area_sml_class_nm: '伊豆高原'
    },
    {
      area_lrg_class_cd: 'region-8',
      area_lrg_class_nm: '東海',
      area_mid_class_cd: 'shizuoka',
      area_mid_class_nm: '静岡県',
      area_sml_class_cd: 'numazu',
      area_sml_class_nm: '沼津'
    },
    {
      area_lrg_class_cd: 'region-8',
      area_lrg_class_nm: '東海',
      area_mid_class_cd: 'shizuoka',
      area_mid_class_nm: '静岡県',
      area_sml_class_cd: 'shimoda',
      area_sml_class_nm: '下田'
    },
    {
      area_lrg_class_cd: 'region-8',
      area_lrg_class_nm: '東海',
      area_mid_class_cd: 'shizuoka',
      area_mid_class_nm: '静岡県',
      area_sml_class_cd: 'atami',
      area_sml_class_nm: '熱海'
    },
    {
      area_lrg_class_cd: 'region-9',
      area_lrg_class_nm: '近畿',
      area_mid_class_cd: 'hyogo',
      area_mid_class_nm: '兵庫県',
      area_sml_class_cd: 'nantou',
      area_sml_class_nm: '南都'
    },
    {
      area_lrg_class_cd: 'region-9',
      area_lrg_class_nm: '近畿',
      area_mid_class_cd: 'hyogo',
      area_mid_class_nm: '兵庫県',
      area_sml_class_cd: 'kobe',
      area_sml_class_nm: '神戸'
    },
    {
      area_lrg_class_cd: 'region-9',
      area_lrg_class_nm: '近畿',
      area_mid_class_cd: 'hyogo',
      area_mid_class_nm: '兵庫県',
      area_sml_class_cd: 'kita',
      area_sml_class_nm: '北'
    },
    {
      area_lrg_class_cd: 'region-9',
      area_lrg_class_nm: '近畿',
      area_mid_class_cd: 'hyogo',
      area_mid_class_nm: '兵庫県',
      area_sml_class_cd: 'nannansei',
      area_sml_class_nm: '南南西'
    },
    {
      area_lrg_class_cd: 'region-9',
      area_lrg_class_nm: '近畿',
      area_mid_class_cd: 'hyogo',
      area_mid_class_nm: '兵庫県',
      area_sml_class_cd: 'chubu',
      area_sml_class_nm: '中部'
    },
    {
      area_lrg_class_cd: 'region-9',
      area_lrg_class_nm: '近畿',
      area_mid_class_cd: 'kyoto',
      area_mid_class_nm: '京都府',
      area_sml_class_cd: 'hokubu',
      area_sml_class_nm: '北部'
    },
    {
      area_lrg_class_cd: 'region-9',
      area_lrg_class_nm: '近畿',
      area_mid_class_cd: 'kyoto',
      area_mid_class_nm: '京都府',
      area_sml_class_cd: 'shi',
      area_sml_class_nm: '京都'
    },
    {
      area_lrg_class_cd: 'region-9',
      area_lrg_class_nm: '近畿',
      area_mid_class_cd: 'kyoto',
      area_mid_class_nm: '京都府',
      area_sml_class_cd: 'yunohana',
      area_sml_class_nm: '湯の花'
    },
    {
      area_lrg_class_cd: 'region-9',
      area_lrg_class_nm: '近畿',
      area_mid_class_cd: 'kyoto',
      area_mid_class_nm: '京都府',
      area_sml_class_cd: 'miyazu',
      area_sml_class_nm: '宮津'
    },
    {
      area_lrg_class_cd: 'region-9',
      area_lrg_class_nm: '近畿',
      area_mid_class_cd: 'nara',
      area_mid_class_nm: '奈良県',
      area_sml_class_cd: 'nara',
      area_sml_class_nm: '奈良'
    },
    {
      area_lrg_class_cd: 'region-9',
      area_lrg_class_nm: '近畿',
      area_mid_class_cd: 'nara',
      area_mid_class_nm: '奈良県',
      area_sml_class_cd: 'hokubu',
      area_sml_class_nm: '北部'
    },
    {
      area_lrg_class_cd: 'region-9',
      area_lrg_class_nm: '近畿',
      area_mid_class_cd: 'nara',
      area_mid_class_nm: '奈良県',
      area_sml_class_cd: 'nanbu',
      area_sml_class_nm: '南部'
    },
    {
      area_lrg_class_cd: 'region-9',
      area_lrg_class_nm: '近畿',
      area_mid_class_cd: 'osaka',
      area_mid_class_nm: '大阪府',
      area_sml_class_cd: 'toubu',
      area_sml_class_nm: '東部'
    },
    {
      area_lrg_class_cd: 'region-9',
      area_lrg_class_nm: '近畿',
      area_mid_class_cd: 'osaka',
      area_mid_class_nm: '大阪府',
      area_sml_class_cd: 'nanbu',
      area_sml_class_nm: '南部'
    },
    {
      area_lrg_class_cd: 'region-9',
      area_lrg_class_nm: '近畿',
      area_mid_class_cd: 'osaka',
      area_mid_class_nm: '大阪府',
      area_sml_class_cd: 'hokubu',
      area_sml_class_nm: '北部'
    },
    {
      area_lrg_class_cd: 'region-9',
      area_lrg_class_nm: '近畿',
      area_mid_class_cd: 'osaka',
      area_mid_class_nm: '大阪府',
      area_sml_class_cd: 'shi',
      area_sml_class_nm: '大阪'
    },
    {
      area_lrg_class_cd: 'region-9',
      area_lrg_class_nm: '近畿',
      area_mid_class_cd: 'shiga',
      area_mid_class_nm: '滋賀県',
      area_sml_class_cd: 'kohoku',
      area_sml_class_nm: '湖北'
    },
    {
      area_lrg_class_cd: 'region-9',
      area_lrg_class_nm: '近畿',
      area_mid_class_cd: 'shiga',
      area_mid_class_nm: '滋賀県',
      area_sml_class_cd: 'ootsu',
      area_sml_class_nm: '大津'
    },
    {
      area_lrg_class_cd: 'region-9',
      area_lrg_class_nm: '近畿',
      area_mid_class_cd: 'shiga',
      area_mid_class_nm: '滋賀県',
      area_sml_class_cd: 'kotou',
      area_sml_class_nm: '湖東'
    },
    {
      area_lrg_class_cd: 'region-9',
      area_lrg_class_nm: '近畿',
      area_mid_class_cd: 'wakayama',
      area_mid_class_nm: '和歌山県',
      area_sml_class_cd: 'wakayama',
      area_sml_class_nm: '和歌山'
    },
    {
      area_lrg_class_cd: 'region-9',
      area_lrg_class_nm: '近畿',
      area_mid_class_cd: 'wakayama',
      area_mid_class_nm: '和歌山県',
      area_sml_class_cd: 'gobo',
      area_sml_class_nm: '御坊'
    },
    {
      area_lrg_class_cd: 'region-9',
      area_lrg_class_nm: '近畿',
      area_mid_class_cd: 'wakayama',
      area_mid_class_nm: '和歌山県',
      area_sml_class_cd: 'shirahama',
      area_sml_class_nm: '白浜'
    },
    {
      area_lrg_class_cd: 'region-9',
      area_lrg_class_nm: '近畿',
      area_mid_class_cd: 'wakayama',
      area_mid_class_nm: '和歌山県',
      area_sml_class_cd: 'Kihoku',
      area_sml_class_nm: '紀北'
    },
    {
      area_lrg_class_cd: 'region-9',
      area_lrg_class_nm: '近畿',
      area_mid_class_cd: 'wakayama',
      area_mid_class_nm: '和歌山県',
      area_sml_class_cd: 'hongu',
      area_sml_class_nm: '本宮'
    },
    {
      area_lrg_class_cd: 'region-10',
      area_lrg_class_nm: '山陽・山陰',
      area_mid_class_cd: 'hiroshima',
      area_mid_class_nm: '広島県',
      area_sml_class_cd: 'higashihiroshima',
      area_sml_class_nm: '東広島'
    },
    {
      area_lrg_class_cd: 'region-10',
      area_lrg_class_nm: '山陽・山陰',
      area_mid_class_cd: 'hiroshima',
      area_mid_class_nm: '広島県',
      area_sml_class_cd: 'hiroshima',
      area_sml_class_nm: '広島'
    },
    {
      area_lrg_class_cd: 'region-10',
      area_lrg_class_nm: '山陽・山陰',
      area_mid_class_cd: 'hiroshima',
      area_mid_class_nm: '広島県',
      area_sml_class_cd: 'kure',
      area_sml_class_nm: '呉'
    },
    {
      area_lrg_class_cd: 'region-10',
      area_lrg_class_nm: '山陽・山陰',
      area_mid_class_cd: 'okayama',
      area_mid_class_nm: '岡山県',
      area_sml_class_cd: 'niimi',
      area_sml_class_nm: '新見'
    },
    {
      area_lrg_class_cd: 'region-10',
      area_lrg_class_nm: '山陽・山陰',
      area_mid_class_cd: 'okayama',
      area_mid_class_nm: '岡山県',
      area_sml_class_cd: 'okayama',
      area_sml_class_nm: '岡山'
    },
    {
      area_lrg_class_cd: 'region-10',
      area_lrg_class_nm: '山陽・山陰',
      area_mid_class_cd: 'okayama',
      area_mid_class_nm: '岡山県',
      area_sml_class_cd: 'tsuyama',
      area_sml_class_nm: '津山'
    },
    {
      area_lrg_class_cd: 'region-10',
      area_lrg_class_nm: '山陽・山陰',
      area_mid_class_cd: 'okayama',
      area_mid_class_nm: '岡山県',
      area_sml_class_cd: 'kurashiki',
      area_sml_class_nm: '倉敷'
    },
    {
      area_lrg_class_cd: 'region-10',
      area_lrg_class_nm: '山陽・山陰',
      area_mid_class_cd: 'simane',
      area_mid_class_nm: '島根県',
      area_sml_class_cd: 'toubu',
      area_sml_class_nm: '東部'
    },
    {
      area_lrg_class_cd: 'region-10',
      area_lrg_class_nm: '山陽・山陰',
      area_mid_class_cd: 'simane',
      area_mid_class_nm: '島根県',
      area_sml_class_cd: 'matsue',
      area_sml_class_nm: '松江'
    },
    {
      area_lrg_class_cd: 'region-10',
      area_lrg_class_nm: '山陽・山陰',
      area_mid_class_cd: 'simane',
      area_mid_class_nm: '島根県',
      area_sml_class_cd: 'masuda',
      area_sml_class_nm: '益田'
    },
    {
      area_lrg_class_cd: 'region-10',
      area_lrg_class_nm: '山陽・山陰',
      area_mid_class_cd: 'tottori',
      area_mid_class_nm: '鳥取県',
      area_sml_class_cd: 'seibu',
      area_sml_class_nm: '西部'
    },
    {
      area_lrg_class_cd: 'region-10',
      area_lrg_class_nm: '山陽・山陰',
      area_mid_class_cd: 'tottori',
      area_mid_class_nm: '鳥取県',
      area_sml_class_cd: 'tottori',
      area_sml_class_nm: '鳥取'
    },
    {
      area_lrg_class_cd: 'region-10',
      area_lrg_class_nm: '山陽・山陰',
      area_mid_class_cd: 'tottori',
      area_mid_class_nm: '鳥取県',
      area_sml_class_cd: 'chubu',
      area_sml_class_nm: '中部'
    },
    {
      area_lrg_class_cd: 'region-10',
      area_lrg_class_nm: '山陽・山陰',
      area_mid_class_cd: 'yamaguchi',
      area_mid_class_nm: '山口県',
      area_sml_class_cd: 'iwakuni',
      area_sml_class_nm: '岩国'
    },
    {
      area_lrg_class_cd: 'region-10',
      area_lrg_class_nm: '山陽・山陰',
      area_mid_class_cd: 'yamaguchi',
      area_mid_class_nm: '山口県',
      area_sml_class_cd: 'hagi',
      area_sml_class_nm: '萩'
    },
    {
      area_lrg_class_cd: 'region-10',
      area_lrg_class_nm: '山陽・山陰',
      area_mid_class_cd: 'yamaguchi',
      area_mid_class_nm: '山口県',
      area_sml_class_cd: 'shimonoseki',
      area_sml_class_nm: '下関'
    },
    {
      area_lrg_class_cd: 'region-10',
      area_lrg_class_nm: '山陽・山陰',
      area_mid_class_cd: 'yamaguchi',
      area_mid_class_nm: '山口県',
      area_sml_class_cd: 'yamaguchi',
      area_sml_class_nm: '山口'
    },
    {
      area_lrg_class_cd: 'region-11',
      area_lrg_class_nm: '四国',
      area_mid_class_cd: 'ehime',
      area_mid_class_nm: '愛媛県',
      area_sml_class_cd: 'nanyo',
      area_sml_class_nm: '南予'
    },
    {
      area_lrg_class_cd: 'region-11',
      area_lrg_class_nm: '四国',
      area_mid_class_cd: 'ehime',
      area_mid_class_nm: '愛媛県',
      area_sml_class_cd: 'touyo',
      area_sml_class_nm: '東予'
    },
    {
      area_lrg_class_cd: 'region-11',
      area_lrg_class_nm: '四国',
      area_mid_class_cd: 'ehime',
      area_mid_class_nm: '愛媛県',
      area_sml_class_cd: 'chuuyo',
      area_sml_class_nm: '中予'
    },
    {
      area_lrg_class_cd: 'region-11',
      area_lrg_class_nm: '四国',
      area_mid_class_cd: 'ehime',
      area_mid_class_nm: '愛媛県',
      area_sml_class_cd: 'saijo',
      area_sml_class_nm: '西条'
    },
    {
      area_lrg_class_cd: 'region-11',
      area_lrg_class_nm: '四国',
      area_mid_class_cd: 'kagawa',
      area_mid_class_nm: '香川県',
      area_sml_class_cd: 'takamatsu',
      area_sml_class_nm: '高松'
    },
    {
      area_lrg_class_cd: 'region-11',
      area_lrg_class_nm: '四国',
      area_mid_class_cd: 'kagawa',
      area_mid_class_nm: '香川県',
      area_sml_class_cd: 'ritou',
      area_sml_class_nm: '離島'
    },
    {
      area_lrg_class_cd: 'region-11',
      area_lrg_class_nm: '四国',
      area_mid_class_cd: 'kagawa',
      area_mid_class_nm: '香川県',
      area_sml_class_cd: 'sakaide',
      area_sml_class_nm: '坂出'
    },
    {
      area_lrg_class_cd: 'region-11',
      area_lrg_class_nm: '四国',
      area_mid_class_cd: 'kagawa',
      area_mid_class_nm: '香川県',
      area_sml_class_cd: 'kotohira',
      area_sml_class_nm: '琴平'
    },
    {
      area_lrg_class_cd: 'region-11',
      area_lrg_class_nm: '四国',
      area_mid_class_cd: 'kouchi',
      area_mid_class_nm: '高知県',
      area_sml_class_cd: 'kouchi',
      area_sml_class_nm: '高知'
    },
    {
      area_lrg_class_cd: 'region-11',
      area_lrg_class_nm: '四国',
      area_mid_class_cd: 'kouchi',
      area_mid_class_nm: '高知県',
      area_sml_class_cd: 'toubu',
      area_sml_class_nm: '東部'
    },
    {
      area_lrg_class_cd: 'region-11',
      area_lrg_class_nm: '四国',
      area_mid_class_cd: 'kouchi',
      area_mid_class_nm: '高知県',
      area_sml_class_cd: 'seibu',
      area_sml_class_nm: '西部'
    },
    {
      area_lrg_class_cd: 'region-11',
      area_lrg_class_nm: '四国',
      area_mid_class_cd: 'tokushima',
      area_mid_class_nm: '徳島県',
      area_sml_class_cd: 'tokushima',
      area_sml_class_nm: '徳島'
    },
    {
      area_lrg_class_cd: 'region-11',
      area_lrg_class_nm: '四国',
      area_mid_class_cd: 'tokushima',
      area_mid_class_nm: '徳島県',
      area_sml_class_cd: 'hokubu',
      area_sml_class_nm: '北部'
    },
    {
      area_lrg_class_cd: 'region-11',
      area_lrg_class_nm: '四国',
      area_mid_class_cd: 'tokushima',
      area_mid_class_nm: '徳島県',
      area_sml_class_cd: 'nanbu',
      area_sml_class_nm: '南部'
    },
    {
      area_lrg_class_cd: 'region-12',
      area_lrg_class_nm: '九州',
      area_mid_class_cd: 'hukuoka',
      area_mid_class_nm: '福岡県',
      area_sml_class_cd: 'fukuoka',
      area_sml_class_nm: '福岡'
    },
    {
      area_lrg_class_cd: 'region-12',
      area_lrg_class_nm: '九州',
      area_mid_class_cd: 'hukuoka',
      area_mid_class_nm: '福岡県',
      area_sml_class_cd: 'kurume',
      area_sml_class_nm: '久留米'
    },
    {
      area_lrg_class_cd: 'region-12',
      area_lrg_class_nm: '九州',
      area_mid_class_cd: 'hukuoka',
      area_mid_class_nm: '福岡県',
      area_sml_class_cd: 'chikuzen',
      area_sml_class_nm: '筑前'
    },
    {
      area_lrg_class_cd: 'region-12',
      area_lrg_class_nm: '九州',
      area_mid_class_cd: 'hukuoka',
      area_mid_class_nm: '福岡県',
      area_sml_class_cd: 'chikugo',
      area_sml_class_nm: '筑後'
    },
    {
      area_lrg_class_cd: 'region-12',
      area_lrg_class_nm: '九州',
      area_mid_class_cd: 'hukuoka',
      area_mid_class_nm: '福岡県',
      area_sml_class_cd: 'kitakyusyu',
      area_sml_class_nm: '北九州'
    },
    {
      area_lrg_class_cd: 'region-12',
      area_lrg_class_nm: '九州',
      area_mid_class_cd: 'hukuoka',
      area_mid_class_nm: '福岡県',
      area_sml_class_cd: 'seibu',
      area_sml_class_nm: '西部'
    },
    {
      area_lrg_class_cd: 'region-12',
      area_lrg_class_nm: '九州',
      area_mid_class_cd: 'kagoshima',
      area_mid_class_nm: '鹿児島県',
      area_sml_class_cd: 'hokusatsu',
      area_sml_class_nm: '北薩'
    },
    {
      area_lrg_class_cd: 'region-12',
      area_lrg_class_nm: '九州',
      area_mid_class_cd: 'kagoshima',
      area_mid_class_nm: '鹿児島県',
      area_sml_class_cd: 'yakushima',
      area_sml_class_nm: '屋久島'
    },
    {
      area_lrg_class_cd: 'region-12',
      area_lrg_class_nm: '九州',
      area_mid_class_cd: 'kagoshima',
      area_mid_class_nm: '鹿児島県',
      area_sml_class_cd: 'kagoshima',
      area_sml_class_nm: '鹿児島'
    },
    {
      area_lrg_class_cd: 'region-12',
      area_lrg_class_nm: '九州',
      area_mid_class_cd: 'kagoshima',
      area_mid_class_nm: '鹿児島県',
      area_sml_class_cd: 'okinoerabu',
      area_sml_class_nm: '沖永良部'
    },
    {
      area_lrg_class_cd: 'region-12',
      area_lrg_class_nm: '九州',
      area_mid_class_cd: 'kagoshima',
      area_mid_class_nm: '鹿児島県',
      area_sml_class_cd: 'kanoya',
      area_sml_class_nm: '鹿屋'
    },
    {
      area_lrg_class_cd: 'region-12',
      area_lrg_class_nm: '九州',
      area_mid_class_cd: 'kagoshima',
      area_mid_class_nm: '鹿児島県',
      area_sml_class_cd: 'oosumi',
      area_sml_class_nm: '大隅'
    },
    {
      area_lrg_class_cd: 'region-12',
      area_lrg_class_nm: '九州',
      area_mid_class_cd: 'kumamoto',
      area_mid_class_nm: '熊本県',
      area_sml_class_cd: 'kumamoto',
      area_sml_class_nm: '熊本'
    },
    {
      area_lrg_class_cd: 'region-12',
      area_lrg_class_nm: '九州',
      area_mid_class_cd: 'kumamoto',
      area_mid_class_nm: '熊本県',
      area_sml_class_cd: 'kikuchi',
      area_sml_class_nm: '菊池'
    },
    {
      area_lrg_class_cd: 'region-12',
      area_lrg_class_nm: '九州',
      area_mid_class_cd: 'kumamoto',
      area_mid_class_nm: '熊本県',
      area_sml_class_cd: 'amakusa',
      area_sml_class_nm: '天草'
    },
    {
      area_lrg_class_cd: 'region-12',
      area_lrg_class_nm: '九州',
      area_mid_class_cd: 'kumamoto',
      area_mid_class_nm: '熊本県',
      area_sml_class_cd: 'yatsushiro',
      area_sml_class_nm: '八代'
    },
    {
      area_lrg_class_cd: 'region-12',
      area_lrg_class_nm: '九州',
      area_mid_class_cd: 'kumamoto',
      area_mid_class_nm: '熊本県',
      area_sml_class_cd: 'aso',
      area_sml_class_nm: '阿蘇'
    },
    {
      area_lrg_class_cd: 'region-12',
      area_lrg_class_nm: '九州',
      area_mid_class_cd: 'miyazaki',
      area_mid_class_nm: '宮崎県',
      area_sml_class_cd: 'hokubu',
      area_sml_class_nm: '北部'
    },
    {
      area_lrg_class_cd: 'region-12',
      area_lrg_class_nm: '九州',
      area_mid_class_cd: 'miyazaki',
      area_mid_class_nm: '宮崎県',
      area_sml_class_cd: 'miyazaki',
      area_sml_class_nm: '宮崎'
    },
    {
      area_lrg_class_cd: 'region-12',
      area_lrg_class_nm: '九州',
      area_mid_class_cd: 'nagasaki',
      area_mid_class_nm: '長崎県',
      area_sml_class_cd: 'nagasaki',
      area_sml_class_nm: '長崎'
    },
    {
      area_lrg_class_cd: 'region-12',
      area_lrg_class_nm: '九州',
      area_mid_class_cd: 'nagasaki',
      area_mid_class_nm: '長崎県',
      area_sml_class_cd: 'ritou',
      area_sml_class_nm: '離島'
    },
    {
      area_lrg_class_cd: 'region-12',
      area_lrg_class_nm: '九州',
      area_mid_class_cd: 'nagasaki',
      area_mid_class_nm: '長崎県',
      area_sml_class_cd: 'unzen',
      area_sml_class_nm: '雲仙'
    },
    {
      area_lrg_class_cd: 'region-12',
      area_lrg_class_nm: '九州',
      area_mid_class_cd: 'nagasaki',
      area_mid_class_nm: '長崎県',
      area_sml_class_cd: 'sasebo',
      area_sml_class_nm: '佐世保'
    },
    {
      area_lrg_class_cd: 'region-12',
      area_lrg_class_nm: '九州',
      area_mid_class_cd: 'nagasaki',
      area_mid_class_nm: '長崎県',
      area_sml_class_cd: 'iki',
      area_sml_class_nm: '壱岐'
    },
    {
      area_lrg_class_cd: 'region-12',
      area_lrg_class_nm: '九州',
      area_mid_class_cd: 'nagasaki',
      area_mid_class_nm: '長崎県',
      area_sml_class_cd: 'airport',
      area_sml_class_nm: 'エアポート'
    },
    {
      area_lrg_class_cd: 'region-12',
      area_lrg_class_nm: '九州',
      area_mid_class_cd: 'ooita',
      area_mid_class_nm: '大分県',
      area_sml_class_cd: 'hita',
      area_sml_class_nm: '日田'
    },
    {
      area_lrg_class_cd: 'region-12',
      area_lrg_class_nm: '九州',
      area_mid_class_cd: 'ooita',
      area_mid_class_nm: '大分県',
      area_sml_class_cd: 'yufuin',
      area_sml_class_nm: '由布院'
    },
    {
      area_lrg_class_cd: 'region-12',
      area_lrg_class_nm: '九州',
      area_mid_class_cd: 'ooita',
      area_mid_class_nm: '大分県',
      area_sml_class_cd: 'kunisaki',
      area_sml_class_nm: '国東'
    },
    {
      area_lrg_class_cd: 'region-12',
      area_lrg_class_nm: '九州',
      area_mid_class_cd: 'ooita',
      area_mid_class_nm: '大分県',
      area_sml_class_cd: 'beppu',
      area_sml_class_nm: '別府'
    },
    {
      area_lrg_class_cd: 'region-12',
      area_lrg_class_nm: '九州',
      area_mid_class_cd: 'ooita',
      area_mid_class_nm: '大分県',
      area_sml_class_cd: 'taketa',
      area_sml_class_nm: '竹田'
    },
    {
      area_lrg_class_cd: 'region-12',
      area_lrg_class_nm: '九州',
      area_mid_class_cd: 'ooita',
      area_mid_class_nm: '大分県',
      area_sml_class_cd: 'oita',
      area_sml_class_nm: '大分'
    },
    {
      area_lrg_class_cd: 'region-12',
      area_lrg_class_nm: '九州',
      area_mid_class_cd: 'saga',
      area_mid_class_nm: '佐賀県',
      area_sml_class_cd: 'tosu',
      area_sml_class_nm: '鳥栖'
    },
    {
      area_lrg_class_cd: 'region-12',
      area_lrg_class_nm: '九州',
      area_mid_class_cd: 'saga',
      area_mid_class_nm: '佐賀県',
      area_sml_class_cd: 'karatsu',
      area_sml_class_nm: '唐津'
    },
    {
      area_lrg_class_cd: 'region-12',
      area_lrg_class_nm: '九州',
      area_mid_class_cd: 'saga',
      area_mid_class_nm: '佐賀県',
      area_sml_class_cd: 'saga',
      area_sml_class_nm: '佐賀'
    },
    {
      area_lrg_class_cd: 'region-13',
      area_lrg_class_nm: '沖縄',
      area_mid_class_cd: 'okinawa',
      area_mid_class_nm: '沖縄県',
      area_sml_class_cd: 'kerama',
      area_sml_class_nm: '慶良間'
    },
    {
      area_lrg_class_cd: 'region-13',
      area_lrg_class_nm: '沖縄',
      area_mid_class_cd: 'okinawa',
      area_mid_class_nm: '沖縄県',
      area_sml_class_cd: 'ritou',
      area_sml_class_nm: '離島'
    },
    {
      area_lrg_class_cd: 'region-13',
      area_lrg_class_nm: '沖縄',
      area_mid_class_cd: 'okinawa',
      area_mid_class_nm: '沖縄県',
      area_sml_class_cd: 'chubu',
      area_sml_class_nm: '中部'
    },
    {
      area_lrg_class_cd: 'region-13',
      area_lrg_class_nm: '沖縄',
      area_mid_class_cd: 'okinawa',
      area_mid_class_nm: '沖縄県',
      area_sml_class_cd: 'hokubu',
      area_sml_class_nm: '北部'
    },
    {
      area_lrg_class_cd: 'region-13',
      area_lrg_class_nm: '沖縄',
      area_mid_class_cd: 'okinawa',
      area_mid_class_nm: '沖縄県',
      area_sml_class_cd: 'nahashi',
      area_sml_class_nm: '那覇'
    },
    {
      area_lrg_class_cd: 'region-13',
      area_lrg_class_nm: '沖縄',
      area_mid_class_cd: 'okinawa',
      area_mid_class_nm: '沖縄県',
      area_sml_class_cd: 'yonaguni',
      area_sml_class_nm: '与那国'
    }
  ]
  
  export default areaMock
  