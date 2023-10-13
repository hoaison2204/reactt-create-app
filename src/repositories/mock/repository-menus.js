import Repository from "./../repository";

import planDetails from "./mockdata/plan-detail.json";
import lifePlan from "./mockdata/life-plan.json";
import gcPlan from "./mockdata/gc-plan.json";
import gcPaymentInfo from "./mockdata/gc-payment.json";
import menuInfo from "./mockdata/menu-info.json";
import gcMenuImages from "./mockdata/gourmet-images.json";
const resource_plan_detail = "/v1/mypage/menus/life_plan";
const resource_plan_detail_shop = "/v1/shop/menu/shop_plan";

export default {
  /**
   * メニュー詳細情報取得
   */
  getMenuDetail(params) {
    const data = {
      // =================================================================
      // 新mockデータ（BFFから返ってきたそのままのデータ）
      // =================================================================
      headerData: {
        title: "ベネフィット・ステーション/マダム・タッソー東京",
        catLrgClassCd: "003",
        catMidClassCd: "015",
        catSmlClassCd: "001",
        iconCd: ["kyu_toku_barai"],
        usageDiv: ["55"],
        imageUrl: "https://mn.tst.boimg.jp/img/000536/53635.jpg",
        menuNo: "10677721",
        menuNm: "マダム・タッソー東京",
        catchCopy:
          "本人そっくり！人気セレブの等身大フィギュアが勢ぞろい！250年の歴史を誇るロンドン発の体験型　アトラクション",
        leadCopy:
          "70人以上のハリウッドスターやスポーツ選手など世界のセレブの等身大のフィギュアがいっぱい！海外セレブだけでなく、日本の人気タレントや著名人のフィギュアも展示。 ロープなどの仕切りはなく、写真撮影はもちろん、直接肩を組んだり、同じポーズを決めたりと、最高のセレブ体験が楽しめます。",
        menuRcSttDt: "20130220",
        description:
          "70人以上のハリウッドスターやスポーツ選手など世界のセレブの等身大のフィギュアがいっぱい！海外セレブだけでなく、日本の人気タレントや著名人のフィギュアも展示。 ロープなどの仕切りはなく、写真撮影はもちろん、直接肩を組んだり、同じポーズを決めたりと、最高のセレブ体験が楽しめます。本人そっくり！人気セレブの等身大フィギュアが勢ぞろい！250年の歴史を誇るロンドン発の体験型　アトラクション"
      },
      menuBasicInfo: {
        menuNo: "10677721",
        menuNm: "マダム・タッソー東京",
        srvicDiv: "B50",
        catchCopy:
          "本人そっくり！人気セレブの等身大フィギュアが勢ぞろい！250年の歴史を誇るロンドン発の体験型　アトラクション",
        leadCopy:
          "70人以上のハリウッドスターやスポーツ選手など世界のセレブの等身大のフィギュアがいっぱい！海外セレブだけでなく、日本の人気タレントや著名人のフィギュアも展示。 ロープなどの仕切りはなく、写真撮影はもちろん、直接肩を組んだり、同じポーズを決めたりと、最高のセレブ体験が楽しめます。",
        menuImages: [
          {
            imageUrl: "https://mn.tst.boimg.jp/img/000511/51130.jpg",
            imageExplanation: null
          },
          {
            imageUrl: "https://mn.tst.boimg.jp/img/000566/56666.jpg",
            imageExplanation: null
          },
          {
            imageUrl: "https://mn.tst.boimg.jp/img/000534/53473.jpg",
            imageExplanation: null
          },
          {
            imageUrl: "https://mn.tst.boimg.jp/img/000560/56090.jpg",
            imageExplanation: null
          },
          {
            imageUrl: "https://mn.tst.boimg.jp/img/000568/56811.jpg",
            imageExplanation: null
          }
        ],
        areaInfomation: {
          areaLrgClassNm: "首都圏",
          areaMidClassNm: "東京都",
          areaSmlClassNm: "東京２３区内"
        },
        categoryInfomation: {
          catLrgClassCd: "003",
          catLrgClassNm: "レジャー・エンタメ"
        }
      },
      menuIcons: [
        {
          iconCd: "kaigo_hojo",
          iconNm: "介護補助"
        },
        {
          iconCd: "benepo_tsukaeru",
          iconNm: "ベネポ使える"
        }
      ],
      menuHashtags: [],
      menuInfomation: [
        {
          title: "■お申込み制限について",
          content: null,
          infoLev: "1",
          linkUrl: null,
          linkNm: null
        },
        {
          title: null,
          content:
            "当メニューは、会員IDひとつにつき毎月10枚までのお申込みとなります。\n過去にお申込みいただいている場合お申込みを進むと「※申込み制限枚数を超えています。」というエラーメッセージが表示されます。",
          infoLev: "3",
          linkUrl: null,
          linkNm: null
        },
        {
          title: "【デジタルチケットお問い合わせ先】",
          content: null,
          infoLev: "1",
          linkUrl: null,
          linkNm: null
        },
        {
          title: null,
          content:
            "デジタルチケットについてのお問い合わせはベネフィット・ステーションカスタマーセンターまでお願いいたします。\n電話番号：0800-9192-919（平日・土日祝10:00～18:00）",
          infoLev: "3",
          linkUrl: null,
          linkNm: null
        },
        {
          title: "【お申込み者情報 ≪住所≫のご登録について】",
          content: null,
          infoLev: "1",
          linkUrl: null,
          linkNm: null
        },
        {
          title: null,
          content:
            "ご入力いただく住所情報に関しては、最新の情報にてご登録をお願いいたします。\nチケット、利用券のお届けに関しては公演日、利用対象日の1週間前程度のお届けになるものもございます。\n住所転居などにより、変更となってしまった場合はチケットがお手元にお届けできない場合がございます。\nあらかじめご購入の際に登録情報を確認の上、お手続きいただけますようよろしくお願いいたします。\nなお、転居される場合は、各市区町村の役所へ転出、転居届けをご提出いただいた上で新住所でのお申込みをお願いいたします。\nまた、お申込み後に転居が決定された場合は、大変お手数ですが、ベネフィット・ステーションカスタマーセンターまで住所変更のご連絡をお願い申し上げます。",
          infoLev: "3",
          linkUrl: null,
          linkNm: null
        }
      ],
      photoGallery: [
        {
          imageId: "58002",
          imageCatchCopy: " ",
          imageUrl: "https://mn.tst.boimg.jp/img/000580/58002.jpg",
          imageHeading: null,
          imageExplanation: null,
          imageCategoryNm: "画像",
          imageCategoryCd: null,
          imageBenefitCont: null
        },
        {
          imageId: "50964",
          imageCatchCopy: " ",
          imageUrl: "https://mn.tst.boimg.jp/img/000509/50964.jpg",
          imageHeading: null,
          imageExplanation: null,
          imageCategoryNm: "画像",
          imageCategoryCd: null,
          imageBenefitCont: null
        },
        {
          imageId: "59009",
          imageCatchCopy: " ",
          imageUrl: "https://mn.tst.boimg.jp/img/000590/59009.jpg",
          imageHeading: null,
          imageExplanation: null,
          imageCategoryNm: "画像",
          imageCategoryCd: null,
          imageBenefitCont: null
        },
        {
          imageId: "53635",
          imageCatchCopy: " ",
          imageUrl: "https://mn.tst.boimg.jp/img/000536/53635.jpg",
          imageHeading: null,
          imageExplanation: null,
          imageCategoryNm: "画像",
          imageCategoryCd: null,
          imageBenefitCont: null
        },
        {
          imageId: "56515",
          imageCatchCopy: " ",
          imageUrl: "https://mn.tst.boimg.jp/img/000565/56515.jpg",
          imageHeading: null,
          imageExplanation: null,
          imageCategoryNm: "画像",
          imageCategoryCd: null,
          imageBenefitCont: null
        },
        {
          imageId: "51562",
          imageCatchCopy: " ",
          imageUrl: "https://mn.tst.boimg.jp/img/000515/51562.jpg",
          imageHeading: null,
          imageExplanation: null,
          imageCategoryNm: "画像",
          imageCategoryCd: null,
          imageBenefitCont: null
        },
        {
          imageId: "57708",
          imageCatchCopy: " ",
          imageUrl: "https://mn.tst.boimg.jp/img/000577/57708.jpg",
          imageHeading: null,
          imageExplanation: null,
          imageCategoryNm: "画像",
          imageCategoryCd: null,
          imageBenefitCont: null
        },
        {
          imageId: "51863",
          imageCatchCopy: " ",
          imageUrl: "https://mn.tst.boimg.jp/img/000518/51863.jpg",
          imageHeading: null,
          imageExplanation: null,
          imageCategoryNm: "画像",
          imageCategoryCd: null,
          imageBenefitCont: null
        },
        {
          imageId: "56811",
          imageCatchCopy: " ",
          imageUrl: "https://mn.tst.boimg.jp/img/000568/56811.jpg",
          imageHeading: null,
          imageExplanation: null,
          imageCategoryNm: "画像",
          imageCategoryCd: null,
          imageBenefitCont: null
        },
        {
          imageId: "56090",
          imageCatchCopy: " ",
          imageUrl: "https://mn.tst.boimg.jp/img/000560/56090.jpg",
          imageHeading: null,
          imageExplanation: null,
          imageCategoryNm: "画像",
          imageCategoryCd: null,
          imageBenefitCont: null
        },
        {
          imageId: "53473",
          imageCatchCopy: " ",
          imageUrl: "https://mn.tst.boimg.jp/img/000534/53473.jpg",
          imageHeading: null,
          imageExplanation: null,
          imageCategoryNm: "画像",
          imageCategoryCd: null,
          imageBenefitCont: null
        },
        {
          imageId: "56666",
          imageCatchCopy: " ",
          imageUrl: "https://mn.tst.boimg.jp/img/000566/56666.jpg",
          imageHeading: null,
          imageExplanation: null,
          imageCategoryNm: "画像",
          imageCategoryCd: null,
          imageBenefitCont: null
        },
        {
          imageId: "51130",
          imageCatchCopy: " ",
          imageUrl: "https://mn.tst.boimg.jp/img/000511/51130.jpg",
          imageHeading: null,
          imageExplanation: null,
          imageCategoryNm: "画像",
          imageCategoryCd: null,
          imageBenefitCont: null
        }
      ],
      plans: [
        {
          planBasicInfo: {
            planId: "11",
            planNm:
              "【決済後即時受取】デジタルチケットで入場券 おとな 2600円⇒1600円ほか",
            planRcSttDt: "2021/08/01 00:00:00",
            planRcEndDt: "2023/03/31 23:59:59",
            planImages: [
              {
                imageUrl: "https://mn.tst.boimg.jp/img/000518/51863.jpg",
                imageExplanation: null
              },
              {
                imageUrl: "https://mn.tst.boimg.jp/img/000568/56811.jpg",
                imageExplanation: null
              }
            ]
          },
          ticketInfo: {
            performanceNm: "公演名",
            performer: "出演者",
            genres: [
              {
                genreCd: "ジャンルコード",
                genreNm: "ジャンル名称"
              }
            ],
            perfBenefitContent: "ベネポプレゼント！"
          },
          planIcons: [{ iconNm: "ベネポ使える" }, { iconNm: "ベネポ使える" }],
          ticketPerfHeading: {
            performanceTerm: "2021/07/06～2021/07/27",
            venue:
              "東京都／大同生命ミュージカルシアター 電通四季劇場[海]（汐留）",
            saleTerm: "2021/04/01～2021/06/16"
          },
          benefitHeadlines: [
            {
              benefitHeading:
                "【デジタルチケット】入場券 おとな（13歳以上） 2,600円 ⇒",
              benefitContent: "1,600円"
            },
            {
              benefitHeading:
                "【デジタルチケット】入場券 こども（3歳～12歳） 1,800円 ⇒",
              benefitContent: "1,500円"
            }
          ]
        }
      ],
      facilities: {
        facilities: []
      },
      equipServices: [],
      serviceAreas: {
        areaDiv: null,
        areaDivNm: null,
        serviceTrgetAreas: []
      }
    };

    if (params % 7 === 0) {
      // ライフ（単一店舗）
      data.facilities.counts = 1;
      data.facilities.facilities = facility1;
    } else if (params % 13 === 0) {
      // ライフ（複数店舗）
      data.facilities.counts = 5;
      data.facilities.facilities = facility2;
    } else if (params % 23 === 0) {
      // ライフ（店舗無し）
      data.facilities.counts = 0;
    } else if (params % 29 === 0) {
      // ライフ（単一店舗）(プラン一覧0)
      data.facilities.counts = 1;
      data.facilities.facilities = facility1;
    }

    return {
      data: data
    };
  },

  getGcMenuImage(menuNo) {
    return new Promise((resolve, reject) => {
      resolve(gcMenuImages);
    });
  },
  /**
   * プラン詳細情報取得
   */
  getMenuPlanDetail(params) {
    return new Promise((resolve, reject) => {
      Repository.get(
        `${resource_plan_detail}?menuNo=${params.menuNo}&planId=${params.planId}`
      ).then(
        (response) => {
          resolve(response.data);
        },
        (error) => {
          resolve(error);
        }
      );
    });
  },
  /**
   * プラン詳細情報取得
   */
  getPlanDetailGC(queryParams = {}) {
    return new Promise((resolve, reject) => {
        resolve(gcPlan)
    })
  },
  /**
   * 支払先口座情報取得
   */
  getPaymentInfoGC(menuNo) {
    return new Promise((resolve, reject) => {
      resolve(gcPaymentInfo)
    })
  },
  /**
   * プラン詳細情報取得(物販)
   */
  getPlanDetailShop(params, shopUrl) {
    return Repository.get(
      `${shopUrl}${resource_plan_detail_shop}?menuNo=${params.menuNo}&planId=${params.planId}`
    );
  },  
  async getPlanDetail(menuNo, planId, roomId, queryParams = {}) {
    const supportQueryParams = [
      "priceDiv",
      "crmFlag",
      "loginFlag",
      "roomCnt",
      "adultHeadCnt",
      "exUpperGradesHeadCnt",
      "exLowerGradesHeadCnt",
      ,
      "youjiAHeadCnt",
      "youjiBHeadCnt",
      "youjiCHeadCnt",
      "youjiDHeadCnt",
      "designatedMo",
      "checkInDay",
      "checkOutDay"
    ];
    const params = {};
    Object.keys(queryParams).forEach((key) => {
      if (
        supportQueryParams.includes(key) &&
        queryParams[key] !== undefined &&
        queryParams[key] !== null
      ) {
        params[key] = queryParams[key];
      }
    });
    return new Promise((resolve, reject) => {
      // api/menus/1/plans/1/rooms/1?companyCd=1
      Repository.get(
        `/v1/mypage/menus/${menuNo}/plans/${planId}/rooms/${roomId}`,
        {
          params,
          loading: false
        }
      ).then(
        (response) => {
          resolve(response.data);
        },
        (error) => {
          resolve(error);
        }
      );
    });
  },
  /**
   * 店舗一覧エリア情報取得
   */
  async getInfoMenuDetail(param) {
    return new Promise((resolve) => {
      resolve(menuInfo.menuInformation);
    });
  }
};

const facility1 = [
  {
    facilityNm: "マダム・タッソー東京",
    zipCode: "1350091",
    facilityAddress: "港区台場1-6-1 デックス東京ビーチ アイランドモール3F",
    latitude: 35.628977,
    longitude: 139.776273,
    facilityTelNo: "0800-100-5346",
    facilityFax: null,
    facilityEmail: null,
    facilityInqForm: null,
    facilityUrl: null,
    access: "ゆりかもめ線お台場海浜公園駅より徒歩約2分",
    openingHours: null,
    regularlyCloseds: null,
    lastUpdateDate: "2020/12/01 16:27:58",
    note:
      "【営業時間】2020年9月1日～\n（平日）10：00～16：00\n（土日祝）10：00～17：00\n\n●お問い合わせ先\nTEL：0800-100-5346\n（平日10：00～14：00）\n\n【その他アクセス】\nりんかい線東京テレポート駅から徒歩約5分\n\n【施設情報】\n小学生以下のお子様には保護者の同伴でのご入場をお願いします。",
    equipServices: []
  }
];

const facility2 = [
  {
    facilityNm: "てもみんコクーンシティ さいたま新都心店",
    zipCode: "3300843",
    facilityAddress: "さいたま市大宮区吉敷町4-267-2 コクーン新都心1F",
    latitude: 35.89487437,
    longitude: 139.6360899,
    facilityTelNo: "048-600-0901",
    facilityFax: null,
    facilityEmail: null,
    facilityInqForm: null,
    facilityUrl: null,
    access: null,
    openingHours: null,
    regularlyCloseds: null,
    note: null,
    equipServices: null
  },
  {
    facilityNm: "てもみんFKD宇都宮店",
    zipCode: "3210962",
    facilityAddress: "宇都宮市今泉町237 FKD宇都宮店2F",
    latitude: 36.574263,
    longitude: 139.899606,
    facilityTelNo: "028-600-0251",
    facilityFax: null,
    facilityEmail: null,
    facilityInqForm: null,
    facilityUrl: null,
    access: null,
    openingHours: null,
    regularlyCloseds: null,
    note: null,
    equipServices: null
  },
  {
    facilityNm: "てもみん秋田アルス店",
    zipCode: "0100001",
    facilityAddress: "秋田市中通7-2-1 おしゃれかんアルス2F",
    latitude: 39.71789192,
    longitude: 140.128673,
    facilityTelNo: "018-884-1221",
    facilityFax: null,
    facilityEmail: null,
    facilityInqForm: null,
    facilityUrl: null,
    access: null,
    openingHours: null,
    regularlyCloseds: null,
    note: "【営業時間補足】平日の最終受付は21:00",
    equipServices: null
  },
  {
    facilityNm: "てもみん仙台ロフト店",
    zipCode: "9800021",
    facilityAddress: "仙台市青葉区中央1-10-10 仙台ロフト8F",
    latitude: 38.26014897,
    longitude: 140.8804517,
    facilityTelNo: "022-726-6521",
    facilityFax: null,
    facilityEmail: null,
    facilityInqForm: null,
    facilityUrl: null,
    access: null,
    openingHours: null,
    regularlyCloseds: null,
    note: null,
    equipServices: null
  },
  {
    facilityNm: "てもみん仙台定禅寺通店",
    zipCode: "9800811",
    facilityAddress: "仙台市青葉区一番町4-10-17 大林ビル1F（受付）・4F",
    latitude: 38.26564802,
    longitude: 140.8701108,
    facilityTelNo: "022-212-3741",
    facilityFax: null,
    facilityEmail: null,
    facilityInqForm: null,
    facilityUrl: null,
    access: null,
    openingHours: null,
    regularlyCloseds: null,
    note: null,
    equipServices: null
  },
  {
    facilityNm: "てもみん仙台セルバ店",
    zipCode: "9813133",
    facilityAddress: "仙台市泉区泉中央1-4-1 セルバ5F",
    latitude: 38.32356087,
    longitude: 140.8822088,
    facilityTelNo: "022-772-5026",
    facilityFax: null,
    facilityEmail: null,
    facilityInqForm: null,
    facilityUrl: null,
    access: null,
    openingHours: null,
    regularlyCloseds: null,
    note: null,
    equipServices: null
  },
  {
    facilityNm: "てもみん盛岡駅ビルフェザン店",
    zipCode: "0200034",
    facilityAddress: "盛岡市盛岡駅前通1-44 盛岡駅ビルフェザン2FL",
    latitude: 39.70260787,
    longitude: 141.1356437,
    facilityTelNo: "019-621-2081",
    facilityFax: null,
    facilityEmail: null,
    facilityInqForm: null,
    facilityUrl: null,
    access: null,
    openingHours: null,
    regularlyCloseds: null,
    note: "【営業時間補足】平日の最終受付は21:00",
    equipServices: null
  },
  {
    facilityNm: "てもみん函館空港店",
    zipCode: "0420952",
    facilityAddress: "函館市高松町511 函館空港内2F",
    latitude: 41.77564601,
    longitude: 140.8157431,
    facilityTelNo: "0138-57-8505",
    facilityFax: null,
    facilityEmail: null,
    facilityInqForm: null,
    facilityUrl: null,
    access: null,
    openingHours: null,
    regularlyCloseds: null,
    note: null,
    equipServices: null
  },
  {
    facilityNm: "てもみんＪＲ旭川駅店",
    zipCode: "0700030",
    facilityAddress: "旭川市宮下通8-4153-1 ＪＲ旭川駅構内1Ｆ",
    latitude: 43.762838,
    longitude: 142.358592,
    facilityTelNo: "0166-29-5180",
    facilityFax: null,
    facilityEmail: null,
    facilityInqForm: null,
    facilityUrl: null,
    access: null,
    openingHours: null,
    regularlyCloseds: null,
    note: null,
    equipServices: null
  },
  {
    facilityNm: "てもみんサッポロファクトリー店",
    zipCode: "0600032",
    facilityAddress: "札幌市中央区北２条東４丁目１-２ ",
    latitude: 43.06506402,
    longitude: 141.3629674,
    facilityTelNo: "011-218-7751",
    facilityFax: null,
    facilityEmail: null,
    facilityInqForm: null,
    facilityUrl: null,
    access: null,
    openingHours: null,
    regularlyCloseds: null,
    note: null,
    equipServices: null
  },
  {
    facilityNm: "てもみん大丸札幌店",
    zipCode: "0600005",
    facilityAddress: "札幌市中央区北5条西4-7 大丸札幌店6F",
    latitude: 43.06764998,
    longitude: 141.3494011,
    facilityTelNo: "011-252-3151",
    facilityFax: null,
    facilityEmail: null,
    facilityInqForm: null,
    facilityUrl: null,
    access: null,
    openingHours: null,
    regularlyCloseds: null,
    note: "【営業時間補足】平日の最終受付は21:00",
    equipServices: null
  },
  {
    facilityNm: "てもみん札幌地下街ポールタウン店",
    zipCode: "0640804",
    facilityAddress: "札幌市中央区南4条西3 札幌地下街ポールタウン",
    latitude: 43.05573484,
    longitude: 141.3544292,
    facilityTelNo: "011-200-2720",
    facilityFax: null,
    facilityEmail: null,
    facilityInqForm: null,
    facilityUrl: null,
    access: null,
    openingHours: null,
    regularlyCloseds: null,
    note: null,
    equipServices: null
  },
  {
    facilityNm: "グローバル治療院 札幌駅前",
    zipCode: "0600003",
    facilityAddress:
      "札幌市中央区北3条西3-1-41 Ｎ・北３西３ビル2F（旧小野瀬ビル）",
    latitude: 43.065585,
    longitude: 141.352224,
    facilityTelNo: "011-223-5772",
    facilityFax: null,
    facilityEmail: null,
    facilityInqForm: null,
    facilityUrl: null,
    access: null,
    openingHours: null,
    regularlyCloseds: null,
    note: null,
    equipServices: null
  },
  {
    facilityNm: "グローバル治療院サッポロファクトリー",
    zipCode: "0600032",
    facilityAddress: "札幌市中央区北２条東４丁目１-２ ",
    latitude: 43.06506402,
    longitude: 141.3629674,
    facilityTelNo: "011-281-5179",
    facilityFax: null,
    facilityEmail: null,
    facilityInqForm: null,
    facilityUrl: null,
    access: null,
    openingHours: null,
    regularlyCloseds: null,
    note: null,
    equipServices: null
  },
  {
    facilityNm: "てもみんステーションJR手稲駅店",
    zipCode: "0060021",
    facilityAddress: "札幌市手稲区手稲本町1条4-2000-1 ",
    latitude: 43.12016,
    longitude: 141.243787,
    facilityTelNo: "011-685-8550",
    facilityFax: null,
    facilityEmail: null,
    facilityInqForm: null,
    facilityUrl: null,
    access: null,
    openingHours: null,
    regularlyCloseds: null,
    note: null,
    equipServices: null
  },
  {
    facilityNm: "てもみん札幌パルコ店",
    zipCode: "0600061",
    facilityAddress: "札幌市中央区南1条西3-3 地札幌パルコ7F",
    latitude: 43.05877335,
    longitude: 141.3532125,
    facilityTelNo: "011-350-3758",
    facilityFax: null,
    facilityEmail: null,
    facilityInqForm: null,
    facilityUrl: null,
    access: null,
    openingHours: null,
    regularlyCloseds: null,
    note: null,
    equipServices: null
  },
  {
    facilityNm: "てもみんプラーレ松戸店",
    zipCode: "2710092",
    facilityAddress: "松戸市松戸1149-1 プラーレ松戸4F",
    latitude: 35.78401527,
    longitude: 139.9024907,
    facilityTelNo: "047-703-5110",
    facilityFax: null,
    facilityEmail: null,
    facilityInqForm: null,
    facilityUrl: null,
    access: null,
    openingHours: null,
    regularlyCloseds: null,
    note: null,
    equipServices: null
  },
  {
    facilityNm: "てもみんニッケコルトンプラザ店",
    zipCode: "2720015",
    facilityAddress: "市川市鬼高1-1-1 本館3F",
    latitude: 35.71678686,
    longitude: 139.9342122,
    facilityTelNo: "047-393-6551",
    facilityFax: null,
    facilityEmail: null,
    facilityInqForm: null,
    facilityUrl: null,
    access: null,
    openingHours: null,
    regularlyCloseds: null,
    note: null,
    equipServices: null
  },
  {
    facilityNm: "てもみんイクスピアリ店",
    zipCode: "2790031",
    facilityAddress: "浦安市舞浜1-4 イクスピアリ1Fガーデンサイト内",
    latitude: 35.63468473,
    longitude: 139.8851609,
    facilityTelNo: "047-305-5751",
    facilityFax: null,
    facilityEmail: null,
    facilityInqForm: null,
    facilityUrl: null,
    access: null,
    openingHours: null,
    regularlyCloseds: null,
    note: null,
    equipServices: null
  },
  {
    facilityNm: "てもみんシャポー市川店",
    zipCode: "2720034",
    facilityAddress: "市川市市川1-1-1 シャポー市川B1F",
    latitude: 35.72935725,
    longitude: 139.9076359,
    facilityTelNo: "047-329-3522",
    facilityFax: null,
    facilityEmail: null,
    facilityInqForm: null,
    facilityUrl: null,
    access: null,
    openingHours: null,
    regularlyCloseds: null,
    note: null,
    equipServices: null
  },
  {
    facilityNm: "てもみんそごう千葉店",
    zipCode: "2600028",
    facilityAddress: "千葉市中央区新町1000 そごう千葉本館9F",
    latitude: 35.61146897,
    longitude: 140.1133061,
    facilityTelNo: "043-245-7587",
    facilityFax: null,
    facilityEmail: null,
    facilityInqForm: null,
    facilityUrl: null,
    access: null,
    openingHours: null,
    regularlyCloseds: null,
    note: null,
    equipServices: null
  },
  {
    facilityNm: "てもみんプライム西武所沢店",
    zipCode: "3591123",
    facilityAddress: "所沢市日吉町12-1 西武所沢S.C. 7F",
    latitude: 35.78646216,
    longitude: 139.471946,
    facilityTelNo: "04-2927-3039",
    facilityFax: null,
    facilityEmail: null,
    facilityInqForm: null,
    facilityUrl: null,
    access: null,
    openingHours: null,
    regularlyCloseds: null,
    note: "【営業時間補足】＜最終受付＞平日　21:00　土・日・祝　20:00",
    equipServices: null
  },
  {
    facilityNm: "てもみん草加ヴァリエ店",
    zipCode: "3400015",
    facilityAddress: "草加市高砂468-1 草加ヴァリエフードセラー内",
    latitude: 35.827036,
    longitude: 139.803458,
    facilityTelNo: "048-922-8051",
    facilityFax: null,
    facilityEmail: null,
    facilityInqForm: null,
    facilityUrl: null,
    access: null,
    openingHours: null,
    regularlyCloseds: null,
    note: null,
    equipServices: null
  },
  {
    facilityNm: "てもみん八潮駅店",
    zipCode: "3400822",
    facilityAddress: "八潮市大瀬稗田788-1 TXアベニュ-八潮",
    latitude: 35.80717,
    longitude: 139.844106,
    facilityTelNo: "048-994-4571",
    facilityFax: null,
    facilityEmail: null,
    facilityInqForm: null,
    facilityUrl: null,
    access: null,
    openingHours: null,
    regularlyCloseds: null,
    note: "【営業時間補足】平日の最終受付は21:00",
    equipServices: null
  },
  {
    facilityNm: "てもみんららぽーと新三郷",
    zipCode: "3410009",
    facilityAddress: "三郷市新三郷ららシティ3-1-1 ららぽーと新三郷2F",
    latitude: 35.8601474,
    longitude: 139.8653821,
    facilityTelNo: "048-950-1569",
    facilityFax: null,
    facilityEmail: null,
    facilityInqForm: null,
    facilityUrl: null,
    access: null,
    openingHours: null,
    regularlyCloseds: null,
    note: null,
    equipServices: null
  },
  {
    facilityNm: "てもみんララガーデン春日部店",
    zipCode: "3440064",
    facilityAddress: "春日部市南1-1-1 ララガーデン春日部3F",
    latitude: 35.97713684,
    longitude: 139.7554198,
    facilityTelNo: "048-731-6767",
    facilityFax: null,
    facilityEmail: null,
    facilityInqForm: null,
    facilityUrl: null,
    access: null,
    openingHours: null,
    regularlyCloseds: null,
    note: null,
    equipServices: null
  },
  {
    facilityNm: "てもみん川口駅店",
    zipCode: "3320017",
    facilityAddress: "川口市栄町3-1-24 JR川口駅構内",
    latitude: 35.80197927,
    longitude: 139.7177218,
    facilityTelNo: "048-250-3951",
    facilityFax: null,
    facilityEmail: null,
    facilityInqForm: null,
    facilityUrl: null,
    access: null,
    openingHours: null,
    regularlyCloseds: null,
    note: null,
    equipServices: null
  },
  {
    facilityNm: "てもみん浦和コルソ店",
    zipCode: "3300063",
    facilityAddress: "さいたま市浦和区高砂1-12-1 浦和コルソ4F",
    latitude: 35.85837447,
    longitude: 139.6557398,
    facilityTelNo: "048-814-0112",
    facilityFax: null,
    facilityEmail: null,
    facilityInqForm: null,
    facilityUrl: null,
    access: null,
    openingHours: null,
    regularlyCloseds: null,
    note: null,
    equipServices: null
  },
  {
    facilityNm: "てもみんステラタウン店",
    zipCode: "3310812",
    facilityAddress: "さいたま市北区宮原町1-854-1 ステラタウン2F",
    latitude: 35.93320143,
    longitude: 139.6229485,
    facilityTelNo: "048-662-6881",
    facilityFax: null,
    facilityEmail: null,
    facilityInqForm: null,
    facilityUrl: null,
    access: null,
    openingHours: null,
    regularlyCloseds: null,
    note: null,
    equipServices: null
  },
  {
    facilityNm: "てもみんイオン与野店",
    zipCode: "3380004",
    facilityAddress: "さいたま市中央区本町西5-2-9 イオンモール与野3F",
    latitude: 35.89138277,
    longitude: 139.6146305,
    facilityTelNo: "048-856-7162",
    facilityFax: null,
    facilityEmail: null,
    facilityInqForm: null,
    facilityUrl: null,
    access: null,
    openingHours: null,
    regularlyCloseds: null,
    note: null,
    equipServices: null
  }
];
