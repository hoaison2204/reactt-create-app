import moment from "moment";

/**
 * 検索関連 mockデータ
 */
const mockData = {
  /**
   * Google検索を行う
   */
  getSearchGoogle(params) {
    const size = 10;
    const offset = ((Number.parseInt(params.page) || 1) - 1) * size;
    const keyword = String(params.keyword);
    const sort = params.sort;
    const moreLargeCategoryId = params.moreLargeCategoryId;

    const all = [...Array(256).keys()].map((i) => ({
      link: `http://localhost:8080/menus/catExl=skillup/catLrg=002/catMid=014/catSml=001/menuNo=7`,
      pagemap: {
        metatags: [
          {
            imageurl: "/cdn/images/menus/menu_sample.png",
            menuno: String(100000 + i + 1),
            menunm: `カテゴリ1のメニュー名 (ID: ${i + 1})`,
            catchcopy:
              "キャッチコピーが入ります。キャッチコピーが入ります。キャッチコピーが入ります。キャッチコピーが入ります。",
            leadcopy:
              "常識を覆すラーメンを提供し続ける。「野菜を食べるつけ麺」がコンセプト。野菜をたっぷり使用する事で栄養を多くとっていただき、麺の量を少なめにする事で余分なエネルギーを抑えてあります。また、鶏と野菜と煮干しを使用した『ベジニボスープ』は、濃厚な鶏ダシで野菜のでんぷん質を多く取り入れ濃厚に仕上げてありますので、余分な油の摂取を心配せずにお召し上がりいただけます。"
          }
        ]
      }
    }));

    if ((sort || "-desc").endsWith("-desc")) all.reverse();

    let list = all;

    // キーワード検索絞り込み
    // if (keyword) {
    //   console.log('キーワード検索', keyword, list);
    // }

    // カテゴリ絞り込み
    if (moreLargeCategoryId && moreLargeCategoryId == 1) {
      list = list.filter((x) => x.moreLargeCategoryId == 1);
    } else if (moreLargeCategoryId && moreLargeCategoryId == 2) {
      list = list.filter((x) => x.moreLargeCategoryId == 2);
    } else if (moreLargeCategoryId && moreLargeCategoryId == 3) {
      list = list.filter((x) => x.moreLargeCategoryId == 3);
    } else if (moreLargeCategoryId && moreLargeCategoryId == 4) {
      list = list.filter((x) => x.moreLargeCategoryId == 4);
    } else if (moreLargeCategoryId && moreLargeCategoryId == 5) {
      list = list.filter((x) => x.moreLargeCategoryId == 5);
    }

    const items = list.slice(offset, offset + size);
    return {
      data: {
        searchInformation: {
          totalResults: list.length
        },
        items: items
      }
    };
  },
  /**
   * 初期表示に必要な情報を取得する
   */
  getSearchInit() {
    return {
      data: {
        moreLargeCategoryList: [
          {
            id: 1,
            name: "食べる"
          },
          {
            id: 2,
            name: "遊ぶ"
          },
          {
            id: 3,
            name: "スキルアップ"
          },
          {
            id: 4,
            name: "育児・介護・健康"
          },
          {
            id: 6,
            name: "買い物"
          },
          {
            id: 5,
            name: "その他"
          }
        ]
      }
    };
  }
};
export default mockData;
