const enums = {
  menu: {
    INDEX: 0,   // 基本情報
    PLAN: 1,    // プラン
    PHOTO: 2,   // フォトギャラリー
    COUPON: 3,  // クーポン一覧
    MENU: 4,    // メニュー
    REVIEW: 5,  // クチコミ
    FACILITY: 6 // 設備・サービス詳細
  }
};

export default (_, inject) => inject('enums', enums)
