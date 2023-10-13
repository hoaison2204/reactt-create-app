//地図基盤アイコンと大カテゴリのマッピング
export default async (context, inject) => {
  inject("mapIcons", {
    // アイコン定義（地図基盤定義ファイルより）
    iconList: [
      {
        iconNo: 1,
        description: 'スキルアップ',
        categories: ['004']
      },
      {
        iconNo: 3,
        description: '育児・介護・健康',
        categories: ['024','025','014']
      },
      {
        iconNo: 5,
        description: 'その他',
        categories: ['012','028','002','027','005','023','026','007','006']
      },
      {
        iconNo: 7,
        description: '食べる',
        categories: ['011']
      },
      {
        iconNo: 9,
        description: '遊ぶ',
        categories: ['003']
      }
    ],
    // 大カテゴリより地図基盤のアイコン定義書にあるiconNoを取得する
    getIconCode(catLrgClassCd) {
      let res = this.iconList.filter((x) => {
        let target = x.categories.filter((code) => code == catLrgClassCd);
        return target.length > 0;
      });
      if(res.length == 0) return {}
      return res[0];
    }
  });
};