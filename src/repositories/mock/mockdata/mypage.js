/**
 * マイページ mockデータ
 */
const mockData = {
  /**
   * マイページトップ取得
   */
  // getMypageTop() {
  //   const data = {
  //     subsidyData: {
  //       availableDataList: [
  //         {
  //           subsidyDetailId: "D000000589",
  //           dispSubsidyNm: "補助クーポンC",
  //           applicableDateTo: "2022-05-30"
  //         },
  //         {
  //           subsidyDetailId: "D000000599",
  //           dispSubsidyNm: "補助クーポンN",
  //           applicableDateTo: "2022-05-30"
  //         },
  //         {
  //           subsidyDetailId: "D000000628",
  //           dispSubsidyNm: "宿泊_任意_7",
  //           applicableDateTo: "2022-04-30"
  //         },
  //         {
  //           subsidyDetailId: "D000000632",
  //           dispSubsidyNm: "宿泊_強制_3",
  //           applicableDateTo: "2022-04-30"
  //         },
  //         {
  //           subsidyDetailId: "D000000823",
  //           dispSubsidyNm: "S8_強制/併用可/200円/4枚/預かり",
  //           applicableDateTo: "2023-03-31"
  //         }
  //       ],
  //       remainingCount: [28, 30, null, null, 4]
  //     },
  //     couponData: {
  //       couponDataList: [
  //         {
  //           menuNo: "0123456789",
  //           menuNm: "マイクーポン１",
  //           planNm:
  //             "【決済後即時受取】デジタルチケットでパスポート(ユネッサン＆森の湯) おとな 4100円⇒2500円ほか",
  //           expireTo: "2021-12-31 23:59:59",
  //           imageURL: "https://foo.com/image/0001.png",
  //           kind: 2
  //         },
  //         {
  //           menuNo: "0123456789",
  //           menuNm: "マイクーポン２",
  //           planNm:
  //             "【決済後即時受取】デジタルチケットでパスポート(ユネッサン＆森の湯) おとな 4100円⇒2500円ほか",
  //           expireTo: "2021-12-31 23:59:59",
  //           imageURL: "https://foo.com/image/0001.png",
  //           kind: 1
  //         },
  //         {
  //           menuNo: "0123456789",
  //           menuNm: "マイクーポン３",
  //           planNm:
  //             "【決済後即時受取】デジタルチケットでパスポート(ユネッサン＆森の湯) おとな 4100円⇒2500円ほか",
  //           expireTo: "2021-12-31 23:59:59",
  //           imageURL: "https://foo.com/image/0001.png",
  //           kind: 3
  //         },
  //         {
  //           menuNo: "0123456789",
  //           menuNm: "カラオケバンバン",
  //           planNm:
  //             "【マイクーポン】デジタルチケットでパスポート(ユネッサン＆森の湯) おとな 4100円⇒2500円ほか",
  //           expireTo: "2021-12-31 23:59:59",
  //           imageURL: "https://foo.com/image/0001.png",
  //           kind: 1
  //         }
  //       ]
  //     },
  //     favouriteData: {
  //       favouriteDataList: [
  //         {
  //           menuNo: "0123456789",
  //           menuNm: "お気に入り１",
  //           planNm:
  //             "【決済後即時受取】デジタルチケットでパスポート(ユネッサン＆森の湯) おとな 4100円⇒2500円ほか",
  //           expireTo: "2021-12-31 23:59:59",
  //           imageURL: "https://foo.com/image/0001.png",
  //           kind: 2
  //         },
  //         {
  //           menuNo: "0123456789",
  //           menuNm: "お気に入り２",
  //           planNm:
  //             "【決済後即時受取】デジタルチケットでパスポート(ユネッサン＆森の湯) おとな 4100円⇒2500円ほか",
  //           expireTo: "2021-12-31 23:59:59",
  //           imageURL: "https://foo.com/image/0001.png",
  //           kind: 1
  //         },
  //         {
  //           menuNo: "0123456789",
  //           menuNm: "お気に入り３",
  //           planNm:
  //             "【決済後即時受取】デジタルチケットでパスポート(ユネッサン＆森の湯) おとな 4100円⇒2500円ほか",
  //           expireTo: "2021-12-31 23:59:59",
  //           imageURL: "https://foo.com/image/0001.png",
  //           kind: 3
  //         },
  //         {
  //           menuNo: "0123456789",
  //           menuNm: "カラオケバンバン",
  //           planNm:
  //             "【お気に入り】デジタルチケットでパスポート(ユネッサン＆森の湯) おとな 4100円⇒2500円ほか",
  //           expireTo: "2021-12-31 23:59:59",
  //           imageURL: "https://foo.com/image/0001.png",
  //           kind: 1
  //         }
  //       ]
  //     },
  //     visitData: {
  //       visitDataList: [
  //         {
  //           menuNo: "0123456789",
  //           menuNm: "閲覧履歴１",
  //           planNm:
  //             "【決済後即時受取】デジタルチケットでパスポート(ユネッサン＆森の湯) おとな 4100円⇒2500円ほか",
  //           expireTo: "2021-12-31 23:59:59",
  //           imageURL: "https://foo.com/image/0001.png",
  //           kind: 2
  //         },
  //         {
  //           menuNo: "0123456789",
  //           menuNm: "閲覧履歴２",
  //           planNm:
  //             "【決済後即時受取】デジタルチケットでパスポート(ユネッサン＆森の湯) おとな 4100円⇒2500円ほか",
  //           expireTo: "2021-12-31 23:59:59",
  //           imageURL: "https://foo.com/image/0001.png",
  //           kind: 1
  //         },
  //         {
  //           menuNo: "0123456789",
  //           menuNm: "閲覧履歴３",
  //           planNm:
  //             "【決済後即時受取】デジタルチケットでパスポート(ユネッサン＆森の湯) おとな 4100円⇒2500円ほか",
  //           expireTo: "2021-12-31 23:59:59",
  //           imageURL: "https://foo.com/image/0001.png",
  //           kind: 3
  //         },
  //         {
  //           menuNo: "0123456789",
  //           menuNm: "カラオケバンバン",
  //           planNm:
  //             "【閲覧履歴】デジタルチケットでパスポート(ユネッサン＆森の湯) おとな 4100円⇒2500円ほか",
  //           expireTo: "2021-12-31 23:59:59",
  //           imageURL: "https://foo.com/image/0001.png",
  //           kind: 1
  //         }
  //       ]
  //     },
  //     orderData: {
  //       orderDataList: [
  //         {
  //           menuNo: "0123456789",
  //           menuNm: "お申込み履歴１",
  //           planNm:
  //             "【決済後即時受取】デジタルチケットでパスポート(ユネッサン＆森の湯) おとな 4100円⇒2500円ほか",
  //           expireTo: "2021-12-31 23:59:59",
  //           imageURL: "https://foo.com/image/0001.png",
  //           kind: 2
  //         },
  //         {
  //           menuNo: "0123456789",
  //           menuNm: "お申込み履歴２",
  //           planNm:
  //             "【決済後即時受取】デジタルチケットでパスポート(ユネッサン＆森の湯) おとな 4100円⇒2500円ほか",
  //           expireTo: "2021-12-31 23:59:59",
  //           imageURL: "https://foo.com/image/0001.png",
  //           kind: 1
  //         },
  //         {
  //           menuNo: "0123456789",
  //           menuNm: "お申込み履歴３",
  //           planNm:
  //             "【決済後即時受取】デジタルチケットでパスポート(ユネッサン＆森の湯) おとな 4100円⇒2500円ほか",
  //           expireTo: "2021-12-31 23:59:59",
  //           imageURL: "https://foo.com/image/0001.png",
  //           kind: 3
  //         },
  //         {
  //           menuNo: "0123456789",
  //           menuNm: "カラオケバンバン",
  //           planNm:
  //             "【お申込み履歴】デジタルチケットでパスポート(ユネッサン＆森の湯) おとな 4100円⇒2500円ほか",
  //           expireTo: "2021-12-31 23:59:59",
  //           imageURL: "https://foo.com/image/0001.png",
  //           kind: 1
  //         }
  //       ]
  //     }
  //   };
  //   return {
  //     data: data
  //   };
  // },
  getMypageTop() {
    const data = {
      torinoMembrNo: null,
      familyName: "営業２",
      firstName: "本会員A",
      subsidyData: {
        availableDataList: [
          {
            subsidyDetailId: "D000000002",
            dispSubsidyNm: "F_1_ライフ強制企業実費_500円X100枚_7-8月限定",
            applicableDateTo: "2022-08-31",
          },
          {
            subsidyDetailId: "D000000003",
            dispSubsidyNm: "F_2_ライフ任意BO負担300円x100枚7-8月限定",
            applicableDateTo: "2022-08-31",
          },
          {
            subsidyDetailId: "D000000004",
            dispSubsidyNm: "K_1_宿泊強制企業実費4000円x100枚7-8月限定",
            applicableDateTo: "2022-08-31",
          },
          {
            subsidyDetailId: "D000000005",
            dispSubsidyNm: "K_2_宿泊任意企業実費1000円x100枚7-8月限定",
            applicableDateTo: "2022-08-31",
          },
        ],
        remainingCount: [100, 100, 100, 100],
      },
      couponData: {
        couponDataList: [
          {
            menuNo: "10670314",
            menuNm: "【リハ２】東京ジョイポリス",
            planId: "0010914639",
            planNm:
              "【リハ２】【かすみ会様専用】小学生以上共通パスポート引換券（デジタルチケット）",
            expireTo: "2022-10-31 23:59:59",
            imageURL:
              "https://mn.tst.boimg.jp/img/plfe/image_file/000359/35953.jpg",
            kind: 2,
            acptNo: "220727000131",
          },
        ],
      },
      favouriteData: {
        favouriteDataList: [
          {
            menuNo: "10670314",
            menuNm: "【リハ２】東京ジョイポリス",
            planId: "0010914639",
            planNm:
              "【リハ２】【かすみ会様専用】小学生以上共通パスポート引換券（デジタルチケット）",
            expireTo: "2022-10-31 23:59:59",
            imageURL:
              "https://mn.tst.boimg.jp/img/plfe/image_file/000359/35953.jpg",
            kind: 2,
            acptNo: "220727000131",
          },
        ],
      },
      visitData: {
        visitDataList: [
          {
            menuNo: "10670314",
            menuNm: "【リハ２】東京ジョイポリス",
            planId: "0010914639",
            planNm:
              "【リハ２】【かすみ会様専用】小学生以上共通パスポート引換券（デジタルチケット）",
            expireTo: "2022-10-31 23:59:59",
            imageURL:
              "https://mn.tst.boimg.jp/img/plfe/image_file/000359/35953.jpg",
            kind: 2,
            acptNo: "220727000131",
          },
        ],
      },
      orderData: {
        orderDataList: [
          {
            menuNo: "10631221",
            menuNm: "【リハ２】書籍ダイジェスト配信サービス　SERENDIP",
            planId: null,
            planNm: null,
            expireTo: null,
            imageURL:
              "https://mn.tst.boimg.jp/img/plfe/image_file/0047/4737.jpg",
            kind: null,
            acptNo: null,
            srvicDiv: "B40",
          },
          {
            menuNo: "10631221",
            menuNm: "【リハ２】書籍ダイジェスト配信サービス　SERENDIP",
            planId: null,
            planNm: null,
            expireTo: null,
            imageURL: null,
            kind: null,
            acptNo: null,
            srvicDiv: "B40",
          },
          {
            menuNo: "10660095",
            menuNm: "【リハ２】東京ドーム天然温泉　スパ ラクーア（日帰り入浴）",
            planId: null,
            planNm: null,
            expireTo: null,
            imageURL:
              "https://mn.tst.boimg.jp/img/plfe/image_file/000297/29719.jpg",
            kind: null,
            acptNo: null,
            srvicDiv: "B40",
          },
          {
            menuNo: "10150112",
            menuNm: "The Guesthouse Brioso 館山",
            planId: null,
            planNm: null,
            expireTo: null,
            imageURL: "https://mn.tst.boimg.jp/img/NOIMAGE.jpg",
            kind: null,
            acptNo: null,
            srvicDiv: "A10",
          },
        ],
      },
    };
    return {
      data: data,
    };
  },
  getMyBenepo() {
    const data = {
      // totalPoint: 598354,
      // noUseLimitPoint: 598354,
      // useLimitPoint: 0,
      // grantedPoint: 500,
      // expiredPoint: 0,
      // totalCount: 53,
      // useLimitPointList: [],
      // historyDataList: [
      //   {
      //     pointCode: "2375178c37557e606ffe52f6c16f7b45",
      //     historyDate: "20220714T170811+0900",
      //     point: -100,
      //     reasonInternal: "サービス利用の為AAa",
      //     reasonCustomer:
      //       "7-2022サービス利用の為サービス利用の為サービス利用の為サービス利用の為サービス利用の為サービス利用の為サービス利用の為サービス利用の為",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "123456789",
      //     planId: "",
      //     payment: null,
      //     validFrom: "20220102T010101+0900",
      //     validTo: "20220701T010101+0900",
      //     commandType: 4,
      //     systemCode: "bsff",
      //     operatorCode: "449922000000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "2375178c37557e606ffe52f6c16f7b45",
      //     historyDate: "20190801T170811+0900",
      //     point: -100,
      //     reasonInternal: "サービス利用の為AAa",
      //     reasonCustomer:
      //       "1/8/2019サービス利用の為サービス利用の為サービス利用の為サービス利用の為サービス利用の為サービス利用の為サービス利用の為サービス利用の為",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "123456789",
      //     planId: "",
      //     payment: null,
      //     validFrom: "20220102T010101+0900",
      //     validTo: "20220701T010101+0900",
      //     commandType: 4,
      //     systemCode: "bsff",
      //     operatorCode: "449922000000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "2375178c37557e606ffe52f6c16f7b45",
      //     historyDate: "20220614T170811+0900",
      //     point: -100,
      //     reasonInternal: "サービス利用の為AAa",
      //     reasonCustomer:
      //       "サービス利用の為サービス利用の為サービス利用の為サービス利用の為サービス利用の為サの為サ為",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "123456789",
      //     planId: "",
      //     payment: null,
      //     validFrom: "20220102T010101+0900",
      //     validTo: "20220701T010101+0900",
      //     commandType: 4,
      //     systemCode: "bsff",
      //     operatorCode: "449922000000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "aa29cc47204ee5349cec6e248dbeff86",
      //     historyDate: "20220414T113205+0900",
      //     point: 15000,
      //     reasonInternal: "サービス利用の為",
      //     reasonCustomer:
      //       "サービス利用の為サービス利用の為サービス利用の為サービス利用の為サービス利用の為サ",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: "",
      //     validTo: "20220603T010101+0900",
      //     commandType: 4,
      //     systemCode: "sbwbsff",
      //     operatorCode: "449922000000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "187ba68ede881313990fed0be250fa90",
      //     historyDate: "20220413T191243+0900",
      //     point: -7000,
      //     reasonInternal: "サービス利用の為",
      //     reasonCustomer: "サービス利用の為",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: "20220103T010101+0900",
      //     validTo: "20220602T010101+0900",
      //     commandType: 4,
      //     systemCode: "bsff",
      //     operatorCode: "449922000000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "634e3c153ebda48d686cbd9bd3dd7571",
      //     historyDate: "20220413T162334+0900",
      //     point: -15246,
      //     reasonInternal: "サービス利用の為",
      //     reasonCustomer: "サービス利用の為",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: null,
      //     validTo: null,
      //     commandType: 2,
      //     systemCode: "bsff",
      //     operatorCode: "449922000000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "066ecf9e966513b25162e8f15ae16991",
      //     historyDate: "20220413T140101+0900",
      //     point: -8800,
      //     reasonInternal: "サービス利用の為",
      //     reasonCustomer: "サービス利用の為",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: null,
      //     validTo: null,
      //     commandType: 2,
      //     systemCode: "sbwbsff",
      //     operatorCode: "449922000000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "90ce0a110472f27443e72e591c429a74",
      //     historyDate: "20220411T195124+0900",
      //     point: -800,
      //     reasonInternal: "サービス利用の為",
      //     reasonCustomer: "サービス利用の為",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: null,
      //     validTo: null,
      //     commandType: 2,
      //     systemCode: "bsff",
      //     operatorCode: "449922000000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "fd48287197fd945534d7ae82ab9160b3",
      //     historyDate: "20220411T193904+0900",
      //     point: -100,
      //     reasonInternal: "サービス利用の為",
      //     reasonCustomer: "サービス利用の為",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: null,
      //     validTo: null,
      //     commandType: 2,
      //     systemCode: "bsff",
      //     operatorCode: "449922000000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "3635d9e3fe612b52bd59cef2bbd88791",
      //     historyDate: "20220411T192934+0900",
      //     point: -100,
      //     reasonInternal: "サービス利用の為",
      //     reasonCustomer: "サービス利用の為",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: null,
      //     validTo: null,
      //     commandType: 2,
      //     systemCode: "bsff",
      //     operatorCode: "449922000000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "cabee17a60fbd1aee45446979f8cbfeb",
      //     historyDate: "20220411T191858+0900",
      //     point: -800,
      //     reasonInternal: "サービス利用の為",
      //     reasonCustomer: "サービス利用の為",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: null,
      //     validTo: null,
      //     commandType: 2,
      //     systemCode: "bsff",
      //     operatorCode: "449922000000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "546aac378ca7ecda74c39fa46c12764b",
      //     historyDate: "20220411T174532+0900",
      //     point: -100,
      //     reasonInternal: "サービス利用の為",
      //     reasonCustomer: "サービス利用の為",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: null,
      //     validTo: null,
      //     commandType: 2,
      //     systemCode: "bsff",
      //     operatorCode: "449922000000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "30b38318903750d3926399515a0c154d",
      //     historyDate: "20220411T174351+0900",
      //     point: -100,
      //     reasonInternal: "サービス利用の為",
      //     reasonCustomer: "サービス利用の為",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: null,
      //     validTo: null,
      //     commandType: 2,
      //     systemCode: "bsff",
      //     operatorCode: "449922000000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "a1f8fcc82f210cb64373020d8f9598c6",
      //     historyDate: "20220411T172113+0900",
      //     point: -200,
      //     reasonInternal: "サービス利用の為",
      //     reasonCustomer: "サービス利用の為",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: null,
      //     validTo: null,
      //     commandType: 2,
      //     systemCode: "bsff",
      //     operatorCode: "449922000000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "84bf87003b263780c2a255d8a9c6ec22",
      //     historyDate: "20220411T165631+0900",
      //     point: -454,
      //     reasonInternal: "サービス利用の為",
      //     reasonCustomer: "サービス利用の為",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: null,
      //     validTo: null,
      //     commandType: 2,
      //     systemCode: "bsff",
      //     operatorCode: "449922000000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "ec797b9c25da84ce5d3e67b8d9ee9d42",
      //     historyDate: "20220411T100738+0900",
      //     point: -15246,
      //     reasonInternal: "サービス利用の為",
      //     reasonCustomer: "サービス利用の為",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: null,
      //     validTo: null,
      //     commandType: 2,
      //     systemCode: "bsff",
      //     operatorCode: "449922000000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "64a2ed6905e96c66caeda0184705a62f",
      //     historyDate: "20220411T093054+0900",
      //     point: -99,
      //     reasonInternal: "サービス利用の為",
      //     reasonCustomer: "サービス利用の為",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: null,
      //     validTo: null,
      //     commandType: 2,
      //     systemCode: "bsff",
      //     operatorCode: "449922000000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "f7a746e35e01455d9becccaf2df09363",
      //     historyDate: "20220408T201652+0900",
      //     point: -1,
      //     reasonInternal: "サービス利用の為",
      //     reasonCustomer: "サービス利用の為",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: null,
      //     validTo: null,
      //     commandType: 2,
      //     systemCode: "sbwbsff",
      //     operatorCode: "449922000000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "797c48f577414ee36bb5b21fdc2206bc",
      //     historyDate: "20220408T201351+0900",
      //     point: -999,
      //     reasonInternal: "サービス利用の為",
      //     reasonCustomer: "サービス利用の為",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: null,
      //     validTo: null,
      //     commandType: 2,
      //     systemCode: "bsff",
      //     operatorCode: "449922000000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "b621b32e9f2d85bd52d28b196b445600",
      //     historyDate: "20220408T201314+0900",
      //     point: -1,
      //     reasonInternal: "サービス利用の為",
      //     reasonCustomer: "サービス利用の為",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: null,
      //     validTo: null,
      //     commandType: 2,
      //     systemCode: "bsff",
      //     operatorCode: "449922000000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "8da171d762fd8b235036944d5f486f85",
      //     historyDate: "20220408T195053+0900",
      //     point: -4000,
      //     reasonInternal: "サービス利用の為",
      //     reasonCustomer: "サービス利用の為",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: null,
      //     validTo: null,
      //     commandType: 2,
      //     systemCode: "sbwbsff",
      //     operatorCode: "449922000000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "7ce035e9934273de157ae11743d7e41c",
      //     historyDate: "20220408T195009+0900",
      //     point: -891,
      //     reasonInternal: "サービス利用の為",
      //     reasonCustomer: "サービス利用の為",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: null,
      //     validTo: null,
      //     commandType: 2,
      //     systemCode: "sbwbsff",
      //     operatorCode: "449922000000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "edc8f9f01690e95e4606cdc3d0ec22c6",
      //     historyDate: "20220408T194904+0900",
      //     point: -800,
      //     reasonInternal: "サービス利用の為",
      //     reasonCustomer: "サービス利用の為",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: null,
      //     validTo: null,
      //     commandType: 2,
      //     systemCode: "sbwbsff",
      //     operatorCode: "449922000000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "47b386307b726c53d497e009016b3c92",
      //     historyDate: "20220408T181151+0900",
      //     point: -1,
      //     reasonInternal: "サービス利用の為",
      //     reasonCustomer: "サービス利用の為",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: null,
      //     validTo: null,
      //     commandType: 2,
      //     systemCode: "sbwbsff",
      //     operatorCode: "449922000000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "18dea9e8488d7323dda5520a9d3d9062",
      //     historyDate: "20220408T180726+0900",
      //     point: -100,
      //     reasonInternal: "サービス利用の為",
      //     reasonCustomer: "サービス利用の為",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: null,
      //     validTo: null,
      //     commandType: 2,
      //     systemCode: "sbwbsff",
      //     operatorCode: "449922000000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "a19f4c7280bbf23367d670c9234e2cf0",
      //     historyDate: "20220408T175710+0900",
      //     point: -15246,
      //     reasonInternal: "サービス利用キャンペーン",
      //     reasonCustomer: "サービス利用キャンペーン",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: null,
      //     validTo: null,
      //     commandType: 2,
      //     systemCode: "bsff",
      //     operatorCode: "449922000000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "c9657f14dd794bcdadd240ab6124bca3",
      //     historyDate: "20220408T165106+0900",
      //     point: -15246,
      //     reasonInternal: "サービス利用キャンペーン",
      //     reasonCustomer: "サービス利用キャンペーン",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: null,
      //     validTo: null,
      //     commandType: 2,
      //     systemCode: "bsff",
      //     operatorCode: "449922000000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "dee36a429c7767bf30e6b946d94463e0",
      //     historyDate: "20220408T164743+0900",
      //     point: -15246,
      //     reasonInternal: "サービス利用キャンペーン",
      //     reasonCustomer: "サービス利用キャンペーン",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: null,
      //     validTo: null,
      //     commandType: 2,
      //     systemCode: "bsff",
      //     operatorCode: "449922000000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "c0c7723ba83fa778ab7f2902614b1d88",
      //     historyDate: "20220408T154646+0900",
      //     point: -1223,
      //     reasonInternal: "サービス利用キャンペーン",
      //     reasonCustomer: "サービス利用キャンペーン",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: null,
      //     validTo: null,
      //     commandType: 2,
      //     systemCode: "bsff",
      //     operatorCode: "449922000000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "768ddc23ee09a3c208d2f3e977759af2",
      //     historyDate: "20220408T154321+0900",
      //     point: -2000,
      //     reasonInternal: "サービス利用キャンペーン",
      //     reasonCustomer: "サービス利用キャンペーン",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: null,
      //     validTo: null,
      //     commandType: 2,
      //     systemCode: "bsff",
      //     operatorCode: "449922000000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "ea0a92ea6185195e24aac96f417a7b37",
      //     historyDate: "20220408T154143+0900",
      //     point: -1000,
      //     reasonInternal: "サービス利用キャンペーン",
      //     reasonCustomer: "サービス利用キャンペーン",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: null,
      //     validTo: null,
      //     commandType: 2,
      //     systemCode: "bsff",
      //     operatorCode: "449922000000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "fd002299be36c753238eda8d6b7a7893",
      //     historyDate: "20220408T143032+0900",
      //     point: -15246,
      //     reasonInternal: "サービス利用キャンペーン",
      //     reasonCustomer: "サービス利用キャンペーン",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: null,
      //     validTo: null,
      //     commandType: 2,
      //     systemCode: "bsff",
      //     operatorCode: "449922000000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "6afbb0240e886a9cdba759b9dbe7ddd5",
      //     historyDate: "20220408T114034+0900",
      //     point: -1,
      //     reasonInternal: "サービス利用キャンペーン",
      //     reasonCustomer: "サービス利用キャンペーン",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: null,
      //     validTo: null,
      //     commandType: 2,
      //     systemCode: "sbwbsff",
      //     operatorCode: "449922000000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "5b144e45bf60fca614c00ddc689637f1",
      //     historyDate: "20220408T113913+0900",
      //     point: -410,
      //     reasonInternal: "サービス利用キャンペーン",
      //     reasonCustomer: "サービス利用キャンペーン",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: null,
      //     validTo: null,
      //     commandType: 2,
      //     systemCode: "sbwbsff",
      //     operatorCode: "449922000000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "10a56332835fae06cea4608130f84844",
      //     historyDate: "20220407T221901+0900",
      //     point: -10780,
      //     reasonInternal: "test",
      //     reasonCustomer: "test",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: null,
      //     validTo: null,
      //     commandType: 2,
      //     systemCode: "test",
      //     operatorCode: "00000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "527b22b3cd51a78c6c5f79438e63a837",
      //     historyDate: "20220407T221844+0900",
      //     point: -10780,
      //     reasonInternal: "test",
      //     reasonCustomer: "test",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: null,
      //     validTo: null,
      //     commandType: 2,
      //     systemCode: "test",
      //     operatorCode: "00000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "a34bb7b9fcfd9e0fa793b9a8c09680d5",
      //     historyDate: "20220407T221835+0900",
      //     point: -10780,
      //     reasonInternal: "test",
      //     reasonCustomer: "test",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: null,
      //     validTo: null,
      //     commandType: 2,
      //     systemCode: "test",
      //     operatorCode: "00000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "5fff86d6b05a4b8881aed55b217145bc",
      //     historyDate: "20220407T221816+0900",
      //     point: -10780,
      //     reasonInternal: "test",
      //     reasonCustomer: "test",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: null,
      //     validTo: null,
      //     commandType: 2,
      //     systemCode: "test",
      //     operatorCode: "00000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "72cddcb65e08d03c9e4a1bf3cb6ee50c",
      //     historyDate: "20220330T182243+0900",
      //     point: -20000,
      //     reasonInternal: "test",
      //     reasonCustomer: "test",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: null,
      //     validTo: null,
      //     commandType: 2,
      //     systemCode: "test",
      //     operatorCode: "00000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "bde5e1f6cf8d409b847f290aa7765660",
      //     historyDate: "20220324T111600+0900",
      //     point: -2000,
      //     reasonInternal: "test",
      //     reasonCustomer: "test",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: null,
      //     validTo: null,
      //     commandType: 2,
      //     systemCode: "test",
      //     operatorCode: "00000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "c48a478223baeb51a062561e45393fff",
      //     historyDate: "20220324T111254+0900",
      //     point: -3000,
      //     reasonInternal: "test",
      //     reasonCustomer: "test",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: null,
      //     validTo: null,
      //     commandType: 2,
      //     systemCode: "test",
      //     operatorCode: "00000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "abb09fdcc8992224b15e14e7bbb94b28",
      //     historyDate: "20220323T112617+0900",
      //     point: -6000,
      //     reasonInternal: "test",
      //     reasonCustomer: "test",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: null,
      //     validTo: null,
      //     commandType: 2,
      //     systemCode: "test",
      //     operatorCode: "00000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "280396b3140f0bd42277a246a1378c82",
      //     historyDate: "20220315T155254+0900",
      //     point: -100,
      //     reasonInternal: "test",
      //     reasonCustomer: "test",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: null,
      //     validTo: null,
      //     commandType: 2,
      //     systemCode: "test",
      //     operatorCode: "00000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "a123ea72062cc93a2964ea1e9bda8fba",
      //     historyDate: "20220310T134838+0900",
      //     point: -9200,
      //     reasonInternal: "test",
      //     reasonCustomer: "test",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: null,
      //     validTo: null,
      //     commandType: 2,
      //     systemCode: "test",
      //     operatorCode: "00000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "8a9f187d84046b4f4e2f7a7a95cf80d1",
      //     historyDate: "20220307T185722+0900",
      //     point: -12530,
      //     reasonInternal: "test",
      //     reasonCustomer: "test",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: null,
      //     validTo: null,
      //     commandType: 2,
      //     systemCode: "test",
      //     operatorCode: "00000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "11f9281351cf7e701b3da27fc02684c5",
      //     historyDate: "20220307T155254+0900",
      //     point: -41320,
      //     reasonInternal: "test",
      //     reasonCustomer: "test",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: null,
      //     validTo: null,
      //     commandType: 2,
      //     systemCode: "test",
      //     operatorCode: "00000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "2375178c37557e606ffe52f6c16f7b45",
      //     historyDate: "20220614T170811+0900",
      //     point: -100,
      //     reasonInternal: "サービス利用の為",
      //     reasonCustomer: "サービス利用の為",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: "20220102T010101+0900",
      //     validTo: "20220701T010101+0900",
      //     commandType: 4,
      //     systemCode: "bsff",
      //     operatorCode: "449922000000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "2375178c37557e606ffe52f6c16f7b45",
      //     historyDate: "20220614T170811+0900",
      //     point: -100,
      //     reasonInternal: "サービス利用の為",
      //     reasonCustomer: "サービス利用の為",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: "20220102T010101+0900",
      //     validTo: "20220701T010101+0900",
      //     commandType: 4,
      //     systemCode: "bsff",
      //     operatorCode: "449922000000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "2375178c37557e606ffe52f6c16f7b45",
      //     historyDate: "20220614T170811+0900",
      //     point: -100,
      //     reasonInternal: "サービス利用の為",
      //     reasonCustomer: "サービス利用の為",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: "20220102T010101+0900",
      //     validTo: "20220701T010101+0900",
      //     commandType: 4,
      //     systemCode: "bsff",
      //     operatorCode: "449922000000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "2375178c37557e606ffe52f6c16f7b45",
      //     historyDate: "20220614T170811+0900",
      //     point: -100,
      //     reasonInternal: "サービス利用の為",
      //     reasonCustomer: "サービス利用の為",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: "20220102T010101+0900",
      //     validTo: "20220701T010101+0900",
      //     commandType: 4,
      //     systemCode: "bsff",
      //     operatorCode: "449922000000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "2375178c37557e606ffe52f6c16f7b45",
      //     historyDate: "20220614T170811+0900",
      //     point: -100,
      //     reasonInternal: "サービス利用の為",
      //     reasonCustomer: "サービス利用の為",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: "20220102T010101+0900",
      //     validTo: "20220701T010101+0900",
      //     commandType: 4,
      //     systemCode: "bsff",
      //     operatorCode: "449922000000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "2375178c37557e606ffe52f6c16f7b45",
      //     historyDate: "20220614T170811+0900",
      //     point: -100,
      //     reasonInternal: "サービス利用の為",
      //     reasonCustomer: "サービス利用の為",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: "20220102T010101+0900",
      //     validTo: "20220701T010101+0900",
      //     commandType: 4,
      //     systemCode: "bsff",
      //     operatorCode: "449922000000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "2375178c37557e606ffe52f6c16f7b45",
      //     historyDate: "20220614T170811+0900",
      //     point: -100,
      //     reasonInternal: "サービス利用の為",
      //     reasonCustomer: "サービス利用の為",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: "20220102T010101+0900",
      //     validTo: "20220701T010101+0900",
      //     commandType: 4,
      //     systemCode: "bsff",
      //     operatorCode: "449922000000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "2375178c37557e606ffe52f6c16f7b45",
      //     historyDate: "20220614T170811+0900",
      //     point: -100,
      //     reasonInternal: "サービス利用の為",
      //     reasonCustomer: "サービス利用の為",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: "20220102T010101+0900",
      //     validTo: "20220701T010101+0900",
      //     commandType: 4,
      //     systemCode: "bsff",
      //     operatorCode: "449922000000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "2375178c37557e606ffe52f6c16f7b45",
      //     historyDate: "20220614T170811+0900",
      //     point: -100,
      //     reasonInternal: "サービス利用の為",
      //     reasonCustomer: "サービス利用の為",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: "20220102T010101+0900",
      //     validTo: "20220701T010101+0900",
      //     commandType: 4,
      //     systemCode: "bsff",
      //     operatorCode: "449922000000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "2375178c37557e606ffe52f6c16f7b45",
      //     historyDate: "20220614T170811+0900",
      //     point: -100,
      //     reasonInternal: "サービス利用の為",
      //     reasonCustomer: "サービス利用の為",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: "20220102T010101+0900",
      //     validTo: "20220701T010101+0900",
      //     commandType: 4,
      //     systemCode: "bsff",
      //     operatorCode: "449922000000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "2375178c37557e606ffe52f6c16f7b45",
      //     historyDate: "20220614T170811+0900",
      //     point: -100,
      //     reasonInternal: "サービス利用の為",
      //     reasonCustomer: "サービス利用の為",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: "20220102T010101+0900",
      //     validTo: "20220701T010101+0900",
      //     commandType: 4,
      //     systemCode: "bsff",
      //     operatorCode: "449922000000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "2375178c37557e606ffe52f6c16f7b45",
      //     historyDate: "20220614T170811+0900",
      //     point: -100,
      //     reasonInternal: "サービス利用の為",
      //     reasonCustomer: "サービス利用の為",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: "20220102T010101+0900",
      //     validTo: "20220701T010101+0900",
      //     commandType: 4,
      //     systemCode: "bsff",
      //     operatorCode: "449922000000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "1098cfb224b5efa9c8ae62e1bd09f77e",
      //     historyDate: "20220306T170342+0900",
      //     point: -34760,
      //     reasonInternal: "test",
      //     reasonCustomer: "test",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: null,
      //     validTo: null,
      //     commandType: 2,
      //     systemCode: "test",
      //     operatorCode: "00000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "f4d8165771d05598026dc09ad5501cff",
      //     historyDate: "20220306T164035+0900",
      //     point: -34760,
      //     reasonInternal: "test",
      //     reasonCustomer: "test",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: null,
      //     validTo: null,
      //     commandType: 2,
      //     systemCode: "test",
      //     operatorCode: "00000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "b90b37945f8b0ff250a5c63a917f1322",
      //     historyDate: "20220306T161646+0900",
      //     point: -10000,
      //     reasonInternal: "test",
      //     reasonCustomer: "test",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: null,
      //     validTo: null,
      //     commandType: 2,
      //     systemCode: "test",
      //     operatorCode: "00000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "c3d1d98456f9bd48c8845ac03cfbbb3b",
      //     historyDate: "20220303T123247+0900",
      //     point: -8800,
      //     reasonInternal: "test",
      //     reasonCustomer: "test",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: null,
      //     validTo: null,
      //     commandType: 2,
      //     systemCode: "test",
      //     operatorCode: "00000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "b703f68b9c70c8a7bceeeca3e9a2348a",
      //     historyDate: "20220303T100951+0900",
      //     point: -2000,
      //     reasonInternal: "test",
      //     reasonCustomer: "test",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: null,
      //     validTo: null,
      //     commandType: 2,
      //     systemCode: "test",
      //     operatorCode: "00000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "d2494423055903689a9f973d8c438798",
      //     historyDate: "20220228T150436+0900",
      //     point: -9200,
      //     reasonInternal: "test",
      //     reasonCustomer: "test",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: null,
      //     validTo: null,
      //     commandType: 2,
      //     systemCode: "test",
      //     operatorCode: "00000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "85722b6c42dcd5eb1e5a2ce58980ebf3",
      //     historyDate: "20220228T133327+0900",
      //     point: -10200,
      //     reasonInternal: "test",
      //     reasonCustomer: "test",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: null,
      //     validTo: null,
      //     commandType: 2,
      //     systemCode: "test",
      //     operatorCode: "00000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "075a473485e53886ff7d6c6d198a6aff",
      //     historyDate: "20220226T141735+0900",
      //     point: -21600,
      //     reasonInternal: "test",
      //     reasonCustomer: "test",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: null,
      //     validTo: null,
      //     commandType: 2,
      //     systemCode: "test",
      //     operatorCode: "00000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "6616fb68e5b6db833e8d4c26fc3bf0ca",
      //     historyDate: "20220101T010101+0900",
      //     point: 1000000,
      //     reasonInternal: "内部向け理由TEST",
      //     reasonCustomer: "お客様向け理由TEST",
      //     fundCode: "01",
      //     fundDepartmentCode: "10",
      //     menuNo: "10625152",
      //     planId: "0011217258",
      //     payment: 1500000,
      //     validFrom: "20220101T010101+0900",
      //     validTo: "20240101T010101+0900",
      //     commandType: 1,
      //     systemCode: "tool",
      //     operatorCode: "admin",
      //     businessTypeCode: "test",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   }
      // ]

      // -----------------------------------------
      // totalPoint: 9700,
      // noUseLimitPoint: 9700,
      // useLimitPoint: 0,
      // grantedPoint: 0,
      // expiredPoint: 0,
      // totalCount: 4,
      // useLimitPointList: [],
      // historyDataList: [
      //   {
      //     pointCode: "c6a37b4f843e6070195a51b9ca61f187",
      //     historyDate: "20190701T180255+0900",
      //     point: -100,
      //     reasonInternal: "test",
      //     reasonCustomer: "test",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: null,
      //     validTo: null,
      //     commandType: 2,
      //     systemCode: "test",
      //     operatorCode: "00000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "a3835335d146aa2cbb76d5b43dda5fa3",
      //     historyDate: "20190702T142000+0900",
      //     point: -100,
      //     reasonInternal: "test",
      //     reasonCustomer: "test",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: null,
      //     validTo: null,
      //     commandType: 2,
      //     systemCode: "test",
      //     operatorCode: "00000001",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "01704b7f05c6ab7622226ebceefbf2e5",
      //     historyDate: "20220731T142324+0900",
      //     point: -100,
      //     reasonInternal: "サービス利用の為",
      //     reasonCustomer: "サービス利用の為",
      //     fundCode: "",
      //     fundDepartmentCode: "",
      //     menuNo: "",
      //     planId: "",
      //     payment: null,
      //     validFrom: null,
      //     validTo: null,
      //     commandType: 2,
      //     systemCode: "bsff",
      //     operatorCode: "449902000000018",
      //     businessTypeCode: "",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   },
      //   {
      //     pointCode: "431e4c9a65160a632b0383963e5c428b",
      //     historyDate: "20220925T010101+0900",
      //     point: 10000,
      //     reasonInternal: "手動付与",
      //     reasonCustomer: "手動付与",
      //     fundCode: "01",
      //     fundDepartmentCode: "10",
      //     menuNo: "10625152",
      //     planId: "0011217258",
      //     payment: 100000,
      //     validFrom: "20220401T010101+0900",
      //     validTo: "20250331T010101+0900",
      //     commandType: 1,
      //     systemCode: "tool",
      //     operatorCode: "Admin",
      //     businessTypeCode: "test",
      //     useLimitCodeList: [
      //       {
      //         useLimitCode: ""
      //       }
      //     ]
      //   }
      // ]
      // ----------------------------------------
      totalPoint: 958275,
      noUseLimitPoint: 958275,
      useLimitPoint: 0,
      grantedPoint: 0,
      expiredPoint: 715,
      totalCount: 17,
      useLimitPointList: [],
      historyDataList: [
        {
          pointCode: "8a543e9161e8957c3e4a8405f25aefd3",
          historyDate: "20220627T191412+0900",
          point: -100,
          reasonInternal: "test",
          reasonCustomer: "test",
          fundCode: "",
          fundDepartmentCode: "",
          menuNo: "",
          planId: "",
          payment: null,
          validFrom: null,
          validTo: null,
          commandType: 2,
          systemCode: "test",
          operatorCode: "00000001",
          businessTypeCode: "",
          useLimitCodeList: [
            {
              useLimitCode: "",
            },
          ],
        },
        {
          pointCode: "0e1dae8adb7d4b46fcdbd5cf37dac35f",
          historyDate: "20220613T181909+0900",
          point: -665,
          reasonInternal: "サービス利用の為",
          reasonCustomer: "サービス利用の為",
          fundCode: "",
          fundDepartmentCode: "",
          menuNo: "",
          planId: "",
          payment: null,
          validFrom: null,
          validTo: null,
          commandType: 2,
          systemCode: "bsff",
          operatorCode: "449920000000001",
          businessTypeCode: "",
          useLimitCodeList: [
            {
              useLimitCode: "",
            },
          ],
        },
        {
          pointCode: "9c2398d2c9ebcfa0082d2648212023e5",
          historyDate: "20220613T172613+0900",
          point: -100,
          reasonInternal: "test",
          reasonCustomer: "test",
          fundCode: "",
          fundDepartmentCode: "",
          menuNo: "",
          planId: "",
          payment: null,
          validFrom: null,
          validTo: null,
          commandType: 2,
          systemCode: "test",
          operatorCode: "00000001",
          businessTypeCode: "",
          useLimitCodeList: [
            {
              useLimitCode: "",
            },
          ],
        },
        {
          pointCode: "4f0b6f24c7dd8e6c0352f44be36f8589",
          historyDate: "20220613T131048+0900",
          point: -1360,
          reasonInternal: "サービス利用の為",
          reasonCustomer: "サービス利用の為",
          fundCode: "",
          fundDepartmentCode: "",
          menuNo: "",
          planId: "",
          payment: null,
          validFrom: null,
          validTo: null,
          commandType: 2,
          systemCode: "bsff",
          operatorCode: "449920000000001",
          businessTypeCode: "",
          useLimitCodeList: [
            {
              useLimitCode: "",
            },
          ],
        },
        {
          pointCode: "922254c937cf4514de5fb769f890088a",
          historyDate: "20220610T162521+0900",
          point: -700,
          reasonInternal: "test",
          reasonCustomer: "test",
          fundCode: "",
          fundDepartmentCode: "",
          menuNo: "",
          planId: "",
          payment: null,
          validFrom: null,
          validTo: null,
          commandType: 2,
          systemCode: "test",
          operatorCode: "00000001",
          businessTypeCode: "",
          useLimitCodeList: [
            {
              useLimitCode: "",
            },
          ],
        },
        {
          pointCode: "7e76d12c625f44e0eb997d1fcf6d12b9",
          historyDate: "20220608T114952+0900",
          point: -15000,
          reasonInternal: "test",
          reasonCustomer: "test",
          fundCode: "",
          fundDepartmentCode: "",
          menuNo: "",
          planId: "",
          payment: null,
          validFrom: null,
          validTo: null,
          commandType: 2,
          systemCode: "test",
          operatorCode: "00000001",
          businessTypeCode: "",
          useLimitCodeList: [
            {
              useLimitCode: "",
            },
          ],
        },
        {
          pointCode: "0d82942db2a4e12bac6c70d47383b2e0",
          historyDate: "20220606T183059+0900",
          point: -100,
          reasonInternal: "test",
          reasonCustomer: "test",
          fundCode: "",
          fundDepartmentCode: "",
          menuNo: "",
          planId: "",
          payment: null,
          validFrom: null,
          validTo: null,
          commandType: 2,
          systemCode: "test",
          operatorCode: "00000001",
          businessTypeCode: "",
          useLimitCodeList: [
            {
              useLimitCode: "",
            },
          ],
        },
        {
          pointCode: "ed74c143456838f3cffc97277995015d",
          historyDate: "20220606T182659+0900",
          point: -100,
          reasonInternal: "test",
          reasonCustomer: "test",
          fundCode: "",
          fundDepartmentCode: "",
          menuNo: "",
          planId: "",
          payment: null,
          validFrom: null,
          validTo: null,
          commandType: 2,
          systemCode: "test",
          operatorCode: "00000001",
          businessTypeCode: "",
          useLimitCodeList: [
            {
              useLimitCode: "",
            },
          ],
        },
        {
          pointCode: "ff44807552ce5fa637af6c1e6efddb95",
          historyDate: "20220601T135759+0900",
          point: -1000,
          reasonInternal: "test",
          reasonCustomer: "test",
          fundCode: "",
          fundDepartmentCode: "",
          menuNo: "",
          planId: "",
          payment: null,
          validFrom: null,
          validTo: null,
          commandType: 2,
          systemCode: "test",
          operatorCode: "00000001",
          businessTypeCode: "",
          useLimitCodeList: [
            {
              useLimitCode: "",
            },
          ],
        },
        {
          pointCode: "8f03dae61b65ed1266ad2fd98e1b4a8c",
          historyDate: "20220530T155741+0900",
          point: -22500,
          reasonInternal: "test",
          reasonCustomer: "test",
          fundCode: "",
          fundDepartmentCode: "",
          menuNo: "",
          planId: "",
          payment: null,
          validFrom: null,
          validTo: null,
          commandType: 2,
          systemCode: "test",
          operatorCode: "00000001",
          businessTypeCode: "",
          useLimitCodeList: [
            {
              useLimitCode: "",
            },
          ],
        },
        {
          pointCode: "4c9031e48ff19f5a30b552b8668f6294",
          historyDate: "20220525T152440+0900",
          point: -100,
          reasonInternal: "test",
          reasonCustomer: "test",
          fundCode: "",
          fundDepartmentCode: "",
          menuNo: "",
          planId: "",
          payment: null,
          validFrom: null,
          validTo: null,
          commandType: 2,
          systemCode: "test",
          operatorCode: "00000001",
          businessTypeCode: "",
          useLimitCodeList: [
            {
              useLimitCode: "",
            },
          ],
        },
        {
          pointCode: "9299b5f724f87e83f63c23d79de62b7b",
          historyDate: "20220501T010101+0900",
          point: 1000000,
          reasonInternal: "手動付与",
          reasonCustomer: "手動付与",
          fundCode: "01",
          fundDepartmentCode: "10",
          menuNo: "10625152",
          planId: "0011217258",
          payment: 1000000,
          validFrom: "20220501T010101+0900",
          validTo: "20251231T010101+0900",
          commandType: 1,
          systemCode: "tool",
          operatorCode: "Admin",
          businessTypeCode: "test",
          useLimitCodeList: [
            {
              useLimitCode: "",
            },
          ],
        },
        {
          pointCode: "ba453d49a81860151f88d4bb37ee09bb",
          historyDate: "20220512T194316+0900",
          point: -515,
          reasonInternal: "test",
          reasonCustomer: "test",
          fundCode: "",
          fundDepartmentCode: "",
          menuNo: "",
          planId: "",
          payment: null,
          validFrom: null,
          validTo: null,
          commandType: 2,
          systemCode: "test",
          operatorCode: "00000001",
          businessTypeCode: "",
          useLimitCodeList: [
            {
              useLimitCode: "",
            },
          ],
        },
        {
          pointCode: "80287489fe1a651ccfaac70bb654565d",
          historyDate: "20220425T191316+0900",
          point: -100,
          reasonInternal: "test",
          reasonCustomer: "test",
          fundCode: "",
          fundDepartmentCode: "",
          menuNo: "",
          planId: "",
          payment: null,
          validFrom: null,
          validTo: null,
          commandType: 2,
          systemCode: "test",
          operatorCode: "00000001",
          businessTypeCode: "",
          useLimitCodeList: [
            {
              useLimitCode: "",
            },
          ],
        },
        {
          pointCode: "6b870588ef34917d3dd4843d022b4efe",
          historyDate: "20220425T191240+0900",
          point: -100,
          reasonInternal: "test",
          reasonCustomer: "test",
          fundCode: "",
          fundDepartmentCode: "",
          menuNo: "",
          planId: "",
          payment: null,
          validFrom: null,
          validTo: null,
          commandType: 2,
          systemCode: "test",
          operatorCode: "00000001",
          businessTypeCode: "",
          useLimitCodeList: [
            {
              useLimitCode: "",
            },
          ],
        },
        {
          pointCode: "ba85958131190c45a6f60f3993d1bb3c",
          historyDate: "20220801T011201+0900",
          point: 715,
          reasonInternal: "",
          reasonCustomer: "ポイント確定",
          fundCode: "???",
          fundDepartmentCode: "",
          menuNo: "10761010",
          planId: "0012011885",
          payment: 0,
          validFrom: "20220422T011201+0900",
          validTo: "20250430T235959+0900",
          commandType: 1,
          systemCode: "dcol",
          operatorCode: "DcolAdmin",
          businessTypeCode: "test",
          useLimitCodeList: [
            {
              useLimitCode: "",
            },
          ],
        },
        {
          pointCode: "6d5c6e45aae2926a8df9c1b72b93bd33",
          historyDate: "20220731T000000+0900",
          point: 715,
          reasonInternal: "",
          reasonCustomer: "ポイント確定",
          fundCode: "???",
          fundDepartmentCode: "",
          menuNo: "10761010",
          planId: "0012011885",
          payment: 0,
          validFrom: "19000101T000000+0900",
          validTo: "19030131T235959+0900",
          commandType: 1,
          systemCode: "dcol",
          operatorCode: "DcolAdmin",
          businessTypeCode: "test",
          useLimitCodeList: [
            {
              useLimitCode: "",
            },
          ],
        },
      ],
    };
    return {
      data: data,
    };
  },
  getMyexpiryPoints(){
    const data = {
      "ExpiryPointsList": [
        {
          memberCode: "400000000612991",
          validTo: "2023/09/25",
          validPoint: 300
        },
        {
          memberCode: "400000000612991",
          validTo: "2023/10/25",
          validPoint: 600
        }
      ]
    };
    return {data:data};
  },
  /**
   * 補助クーポン取得
   */
  getMyCoupons() {
    const data = {
      availableDataList: [
        {
          availableData: {
            subsidyDetailId: "D000000873",
            dispSubsidyNm: "【SHIFT専用】宿泊_企業補助金1",
            subsidyId: "B000000563",
            receptionDateFrom: "2022-05-13",
            receptionDateTo: "2022-07-13",
            applicableDateFrom: "2022-05-13",
            applicableDateTo: "2022-08-13",
            subsidyType: "01",
            settlementNo: null,
            requestType: "01",
            applicableDegreeCnt: 2,
            personAccompanyFlg: "0",
            minTgtAge: 12,
            usedFormDiv: "02",
            usedLimTerm: "01",
            usedLimUnit: "02",
            usedMaxCnt: 500,
            usedMaxTotalAmt: 20000,
            parsonalUsedMaxCnt: 100,
            parsonalUsedMaxTotalAmt: 15000,
            usedExpectedAmt: null,
            yearEndDatetime: "2022-08-31",
            useStopFlg: "0",
            subsidySts: "02",
            requestDate: "2022-05-26",
            requestUserId: "338",
            approvalDate: "2022-05-26",
            approvalUserId: "339",
            minChargeAmt: 1000,
            costUnderChargeableFlg: "0",
            priceList: [
              {
                subsidyPriceId: "P000000805",
                subsidyDetailId: "D000000873",
                priceType: "本人",
                limApplicableDateFrom: "2022-05-13",
                limApplicableDateTo: "2022-08-13",
                price: 500,
                ageType: "大人",
              },
              {
                subsidyPriceId: "P000000806",
                subsidyDetailId: "D000000873",
                priceType: "家族",
                limApplicableDateFrom: "2022-05-13",
                limApplicableDateTo: "2022-08-13",
                price: 400,
                ageType: "大人",
              },
              {
                subsidyPriceId: "P000000807",
                subsidyDetailId: "D000000873",
                priceType: "家族",
                limApplicableDateFrom: "2022-05-13",
                limApplicableDateTo: "2022-08-13",
                price: 300,
                ageType: "子供",
              },
            ],
            couponInfo: null,
            subsidyClass: "01",
            multipleUnusableFlg: "1",
          },
          remainingCount: 0,
          remainingAmount: 14500,
          scrennDisplayItem: null,
        },
        {
          availableData: {
            subsidyDetailId: "D000000874",
            dispSubsidyNm: "【SHIFT専用】宿泊_企業補助金2",
            subsidyId: "B000000564",
            receptionDateFrom: "2022-05-13",
            receptionDateTo: "2022-08-13",
            applicableDateFrom: "2022-05-13",
            applicableDateTo: "2022-08-13",
            subsidyType: "01",
            settlementNo: null,
            requestType: "01",
            applicableDegreeCnt: 2,
            personAccompanyFlg: "0",
            minTgtAge: 12,
            usedFormDiv: "02",
            usedLimTerm: "01",
            usedLimUnit: "02",
            usedMaxCnt: 100,
            usedMaxTotalAmt: null,
            parsonalUsedMaxCnt: 50,
            parsonalUsedMaxTotalAmt: null,
            usedExpectedAmt: null,
            yearEndDatetime: "2022-08-31",
            useStopFlg: "0",
            subsidySts: "02",
            requestDate: "2022-05-26",
            requestUserId: "338",
            approvalDate: "2022-05-26",
            approvalUserId: "339",
            minChargeAmt: null,
            costUnderChargeableFlg: "1",
            priceList: [
              {
                subsidyPriceId: "P000000808",
                subsidyDetailId: "D000000874",
                priceType: "本人",
                limApplicableDateFrom: "2022-05-13",
                limApplicableDateTo: "2022-08-13",
                price: 600,
                ageType: "大人",
              },
              {
                subsidyPriceId: "P000000809",
                subsidyDetailId: "D000000874",
                priceType: "家族",
                limApplicableDateFrom: "2022-05-13",
                limApplicableDateTo: "2022-08-13",
                price: 600,
                ageType: "大人",
              },
              {
                subsidyPriceId: "P000000810",
                subsidyDetailId: "D000000874",
                priceType: "家族",
                limApplicableDateFrom: "2022-05-13",
                limApplicableDateTo: "2022-08-13",
                price: 600,
                ageType: "子供",
              },
            ],
            couponInfo: null,
            subsidyClass: "01",
            multipleUnusableFlg: "0",
          },
          remainingCount: 29,
          remainingAmount: null,
          scrennDisplayItem: null,
        },
        {
          availableData: {
            subsidyDetailId: "D000000876",
            dispSubsidyNm: "【SHIFT専用】宿泊_企業補助金4",
            subsidyId: "B000000566",
            receptionDateFrom: "2022-05-31",
            receptionDateTo: "2022-11-13",
            applicableDateFrom: "2022-05-31",
            applicableDateTo: "2022-11-13",
            subsidyType: "01",
            settlementNo: null,
            requestType: "01",
            applicableDegreeCnt: 2,
            personAccompanyFlg: "0",
            minTgtAge: null,
            usedFormDiv: "02",
            usedLimTerm: "01",
            usedLimUnit: "02",
            usedMaxCnt: null,
            usedMaxTotalAmt: 100000,
            parsonalUsedMaxCnt: null,
            parsonalUsedMaxTotalAmt: 15000,
            usedExpectedAmt: null,
            yearEndDatetime: "2022-11-30",
            useStopFlg: "0",
            subsidySts: "02",
            requestDate: "2022-05-26",
            requestUserId: "338",
            approvalDate: "2022-05-26",
            approvalUserId: "339",
            minChargeAmt: null,
            costUnderChargeableFlg: "1",
            priceList: [
              {
                subsidyPriceId: "P000000814",
                subsidyDetailId: "D000000876",
                priceType: "本人",
                limApplicableDateFrom: "2022-05-31",
                limApplicableDateTo: "2022-11-13",
                price: 6000,
                ageType: "大人",
              },
              {
                subsidyPriceId: "P000000815",
                subsidyDetailId: "D000000876",
                priceType: "家族",
                limApplicableDateFrom: "2022-05-31",
                limApplicableDateTo: "2022-11-13",
                price: 5000,
                ageType: "大人",
              },
              {
                subsidyPriceId: "P000000816",
                subsidyDetailId: "D000000876",
                priceType: "家族",
                limApplicableDateFrom: "2022-05-31",
                limApplicableDateTo: "2022-11-13",
                price: 4000,
                ageType: "子供",
              },
            ],
            couponInfo: null,
            subsidyClass: "01",
            multipleUnusableFlg: "0",
          },
          remainingCount: null,
          remainingAmount: 0,
          scrennDisplayItem: null,
        },
        {
          availableData: {
            subsidyDetailId: "D000000877",
            dispSubsidyNm: "【SHIFT専用】宿泊_健保補助金1",
            subsidyId: "B000000567",
            receptionDateFrom: "2022-05-01",
            receptionDateTo: "2022-10-10",
            applicableDateFrom: "2022-05-01",
            applicableDateTo: "2022-10-10",
            subsidyType: "01",
            settlementNo: null,
            requestType: "02",
            applicableDegreeCnt: 1,
            personAccompanyFlg: "0",
            minTgtAge: null,
            usedFormDiv: "02",
            usedLimTerm: "01",
            usedLimUnit: "01",
            usedMaxCnt: null,
            usedMaxTotalAmt: null,
            parsonalUsedMaxCnt: null,
            parsonalUsedMaxTotalAmt: null,
            usedExpectedAmt: null,
            yearEndDatetime: "2022-10-31",
            useStopFlg: "0",
            subsidySts: "02",
            requestDate: "2022-05-26",
            requestUserId: "338",
            approvalDate: "2022-05-26",
            approvalUserId: "339",
            minChargeAmt: null,
            costUnderChargeableFlg: "0",
            priceList: [
              {
                subsidyPriceId: "P000000817",
                subsidyDetailId: "D000000877",
                priceType: "本人",
                limApplicableDateFrom: "2022-05-01",
                limApplicableDateTo: "2022-10-10",
                price: 2000,
                ageType: "大人",
              },
              {
                subsidyPriceId: "P000000818",
                subsidyDetailId: "D000000877",
                priceType: "家族",
                limApplicableDateFrom: "2022-05-01",
                limApplicableDateTo: "2022-10-10",
                price: 1500,
                ageType: "大人",
              },
              {
                subsidyPriceId: "P000000819",
                subsidyDetailId: "D000000877",
                priceType: "家族",
                limApplicableDateFrom: "2022-05-01",
                limApplicableDateTo: "2022-10-10",
                price: 1200,
                ageType: "子供",
              },
            ],
            couponInfo: null,
            subsidyClass: "01",
            multipleUnusableFlg: "0",
          },
          remainingCount: null,
          remainingAmount: null,
          scrennDisplayItem: null,
        },
        {
          availableData: {
            subsidyDetailId: "D000000888",
            dispSubsidyNm:
              "【SHIFT専用】ううううううううううううううううううううう",
            subsidyId: "B000000578",
            receptionDateFrom: "2022-05-13",
            receptionDateTo: "2022-08-13",
            applicableDateFrom: "2022-05-13",
            applicableDateTo: "2022-08-13",
            subsidyType: "01",
            settlementNo: null,
            requestType: "02",
            applicableDegreeCnt: null,
            personAccompanyFlg: "1",
            minTgtAge: null,
            usedFormDiv: "02",
            usedLimTerm: "01",
            usedLimUnit: "02",
            usedMaxCnt: null,
            usedMaxTotalAmt: 100000,
            parsonalUsedMaxCnt: 50,
            parsonalUsedMaxTotalAmt: 25000,
            usedExpectedAmt: null,
            yearEndDatetime: "2022-08-31",
            useStopFlg: "0",
            subsidySts: "02",
            requestDate: "2022-05-26",
            requestUserId: "338",
            approvalDate: "2022-05-26",
            approvalUserId: "339",
            minChargeAmt: 5000,
            costUnderChargeableFlg: "1",
            priceList: [
              {
                subsidyPriceId: "P000000845",
                subsidyDetailId: "D000000888",
                priceType: "本人",
                limApplicableDateFrom: "2022-05-13",
                limApplicableDateTo: "2022-08-13",
                price: 600,
                ageType: "大人",
              },
              {
                subsidyPriceId: "P000000846",
                subsidyDetailId: "D000000888",
                priceType: "家族",
                limApplicableDateFrom: "2022-05-13",
                limApplicableDateTo: "2022-08-13",
                price: 500,
                ageType: "大人",
              },
              {
                subsidyPriceId: "P000000847",
                subsidyDetailId: "D000000888",
                priceType: "家族",
                limApplicableDateFrom: "2022-05-13",
                limApplicableDateTo: "2022-08-13",
                price: 400,
                ageType: "子供",
              },
            ],
            couponInfo: null,
            subsidyClass: "01",
            multipleUnusableFlg: "0",
          },
          remainingCount: 50,
          remainingAmount: 25000,
          scrennDisplayItem: null,
        },
        {
          availableData: {
            subsidyDetailId: "D000000889",
            dispSubsidyNm:
              "【SHIFT専用】えええええええええええええええええええええ",
            subsidyId: "B000000579",
            receptionDateFrom: "2022-05-20",
            receptionDateTo: "2022-08-13",
            applicableDateFrom: "2022-05-20",
            applicableDateTo: "2022-08-13",
            subsidyType: "02",
            settlementNo: null,
            requestType: "01",
            applicableDegreeCnt: null,
            personAccompanyFlg: "0",
            minTgtAge: null,
            usedFormDiv: "02",
            usedLimTerm: "01",
            usedLimUnit: "01",
            usedMaxCnt: null,
            usedMaxTotalAmt: null,
            parsonalUsedMaxCnt: 50,
            parsonalUsedMaxTotalAmt: null,
            usedExpectedAmt: null,
            yearEndDatetime: "2022-08-31",
            useStopFlg: "0",
            subsidySts: "02",
            requestDate: "2022-05-26",
            requestUserId: "338",
            approvalDate: "2022-05-26",
            approvalUserId: "339",
            minChargeAmt: 1000,
            costUnderChargeableFlg: "1",
            priceList: [
              {
                subsidyPriceId: "P000000848",
                subsidyDetailId: "D000000889",
                priceType: "一律",
                limApplicableDateFrom: "2022-05-20",
                limApplicableDateTo: "2022-08-13",
                price: 600,
                ageType: "一律",
              },
            ],
            couponInfo: null,
            subsidyClass: "01",
            multipleUnusableFlg: "0",
          },
          remainingCount: 50,
          remainingAmount: null,
          scrennDisplayItem: null,
        },
        {
          availableData: {
            subsidyDetailId: "D000000890",
            dispSubsidyNm:
              "【SHIFT専用】おおおおおおおおおおおおおおおおおおおおお",
            subsidyId: "B000000580",
            receptionDateFrom: "2022-05-20",
            receptionDateTo: "2022-08-13",
            applicableDateFrom: "2022-05-20",
            applicableDateTo: "2022-08-13",
            subsidyType: "02",
            settlementNo: null,
            requestType: "01",
            applicableDegreeCnt: null,
            personAccompanyFlg: "0",
            minTgtAge: null,
            usedFormDiv: "02",
            usedLimTerm: "01",
            usedLimUnit: "02",
            usedMaxCnt: null,
            usedMaxTotalAmt: 27000,
            parsonalUsedMaxCnt: 20,
            parsonalUsedMaxTotalAmt: 25000,
            usedExpectedAmt: null,
            yearEndDatetime: "2022-08-31",
            useStopFlg: "0",
            subsidySts: "02",
            requestDate: "2022-05-26",
            requestUserId: "338",
            approvalDate: "2022-05-26",
            approvalUserId: "339",
            minChargeAmt: null,
            costUnderChargeableFlg: "0",
            priceList: [
              {
                subsidyPriceId: "P000000849",
                subsidyDetailId: "D000000890",
                priceType: "一律",
                limApplicableDateFrom: "2022-05-20",
                limApplicableDateTo: "2022-08-13",
                price: 1500,
                ageType: "一律",
              },
            ],
            couponInfo: null,
            subsidyClass: "01",
            multipleUnusableFlg: "0",
          },
          remainingCount: 20,
          remainingAmount: 25000,
          scrennDisplayItem: null,
        },
        {
          availableData: {
            subsidyDetailId: "D000000891",
            dispSubsidyNm: "【SHIFT専用】abcdefghijklmnopqrstu",
            subsidyId: "B000000581",
            receptionDateFrom: "2022-05-20",
            receptionDateTo: "2022-08-13",
            applicableDateFrom: "2022-05-20",
            applicableDateTo: "2022-08-13",
            subsidyType: "02",
            settlementNo: null,
            requestType: "01",
            applicableDegreeCnt: null,
            personAccompanyFlg: "0",
            minTgtAge: null,
            usedFormDiv: "02",
            usedLimTerm: "01",
            usedLimUnit: "02",
            usedMaxCnt: 30,
            usedMaxTotalAmt: 15000,
            parsonalUsedMaxCnt: 20,
            parsonalUsedMaxTotalAmt: 12000,
            usedExpectedAmt: null,
            yearEndDatetime: "2022-08-31",
            useStopFlg: "0",
            subsidySts: "02",
            requestDate: "2022-05-26",
            requestUserId: "338",
            approvalDate: "2022-05-26",
            approvalUserId: "339",
            minChargeAmt: null,
            costUnderChargeableFlg: "1",
            priceList: [
              {
                subsidyPriceId: "P000000850",
                subsidyDetailId: "D000000891",
                priceType: "一律",
                limApplicableDateFrom: "2022-05-20",
                limApplicableDateTo: "2022-08-13",
                price: 1000,
                ageType: "一律",
              },
            ],
            couponInfo: null,
            subsidyClass: "01",
            multipleUnusableFlg: "1",
          },
          remainingCount: 20,
          remainingAmount: 12000,
          scrennDisplayItem: null,
        },
        {
          availableData: {
            subsidyDetailId: "D000000892",
            dispSubsidyNm: "【SHIFT専用】123456789123456789123",
            subsidyId: "B000000582",
            receptionDateFrom: "2022-05-20",
            receptionDateTo: "2022-08-13",
            applicableDateFrom: "2022-05-20",
            applicableDateTo: "2022-08-13",
            subsidyType: "02",
            settlementNo: null,
            requestType: "01",
            applicableDegreeCnt: null,
            personAccompanyFlg: "0",
            minTgtAge: null,
            usedFormDiv: "02",
            usedLimTerm: "01",
            usedLimUnit: "02",
            usedMaxCnt: 30,
            usedMaxTotalAmt: null,
            parsonalUsedMaxCnt: 20,
            parsonalUsedMaxTotalAmt: null,
            usedExpectedAmt: null,
            yearEndDatetime: "2022-05-20",
            useStopFlg: "0",
            subsidySts: "02",
            requestDate: "2022-05-26",
            requestUserId: "338",
            approvalDate: "2022-05-26",
            approvalUserId: "339",
            minChargeAmt: null,
            costUnderChargeableFlg: "1",
            priceList: [
              {
                subsidyPriceId: "P000000851",
                subsidyDetailId: "D000000892",
                priceType: "一律",
                limApplicableDateFrom: "2022-05-20",
                limApplicableDateTo: "2022-08-13",
                price: 1100,
                ageType: "一律",
              },
            ],
            couponInfo: null,
            subsidyClass: "01",
            multipleUnusableFlg: "0",
          },
          remainingCount: 20,
          remainingAmount: null,
          scrennDisplayItem: null,
        },
      ],
    };
    return {
      data: data,
    };
  },

  /**
   * マイクーポンリスト取得
   */
  getMycoupon(params = {}) {
    const imageList = [
      "/cdn/images/sample/food_asia.jpg",
      "/cdn/images/sample/baguettes.jpg",
      "/cdn/images/sample/omelette_rice.jpg",
    ];
    const size = 10;
    const offset = ((Number.parseInt(params.page) || 1) - 1) * size;
    const sort = params.sortBy;
    let date = new Date();
    const today =
      date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
    const kind = params.tab;

    const all = [...Array(300).keys()].map((i) => ({
      menuNo: (Array(10).join("0") + i + 1).slice(-10),
      menuNm: "カラオケバンバン",
      planId: (Array(10).join("0") + i + 1).slice(-10),
      planNm:
        "【決済後即時受取】デジタルチケットでパスポート(ユネッサン＆森の湯) おとな 4100円⇒2500円ほか",
      acptNo:
        Math.floor(Math.random() * 3) > 0
          ? (Array(10).join("0") + i + 1).slice(-10)
          : null,
      imageURL: imageList[i % 3],
      // expireFrom: "2021-12-01 00:00:00",
      expireTo: today,
      // displayFrom: "2021-08-01 00:00:00",
      kind: i % 2,
      // deleteFlag: i % 3 === 0 ? false : true,
      // passwordFlag: 0,
      allUsedStatus: i % 3 ? true : false,
      allDisableStatus: true,
      expiredStatus: true,
      basicInformationCategory: {
        catlrgClassCd: "104",
        catLrgClassNm: "Lrg",
        catMidClassCd: "201",
        catMidClassNm: "Mid",
        catSmlClassCd: "301",
        catSmlClassNm: "Sml",
      },
      // latestUsedDateTime: "2021-12-01 00:00:00",
      // latestDisableDateTime: "2021-12-01 00:00:00",
    }));

    if (sort == "displayFrom") all.reverse();

    let list = all;
    if (kind == 1) {
      list = list.filter((x) => x.kind == 1);
    } else {
      list = list.filter((x) => x.kind != 1);
    }

    // kindはBFFに無いため削除
    list = list.map((object) => {
      delete object.kind;
      return object;
    });

    const items = list.slice(offset, offset + size);

    return {
      data: {
        couponDataList: items,
        totalCount: list.length,
      },
    };
  },

  /**
   * マイクーポン詳細（会員証提示）
   */
  getMyCouponDetail(params) {
    const menuNo = Number.parseInt(params.menuNo) || null;
    const planId = Number.parseInt(params.planId) || null;
    const type = Number.parseInt(params.type) || null;
    const devcount = Number.parseInt(params.count);

    let obj = {
      imageURL: "https://mn.tst.boimg.jp/img/000447/44717.jpg",
      menuNo: "10676023",
      menuNm: "横浜・八景島シーパラダイス",
      planNm:
        "クーポンでワンデーパス 水族館4施設＋アトラクション おとな･高校生 5500円⇒4700円ほか",
      expireTo: "2023-03-30T15:00:00.000+00:00",
      description:
        '{"description":{"custumItem":{},"memberBenefits":[{"memberBenefitsId":"878459","benefitHeading":"ﾜﾝﾃﾞｰﾊﾟｽ（水族館4施設＋ｱﾄﾗｸｼｮﾝ） おとな・高校生　5,500円（5,000円）⇒ ","benefitContent":"4,700円"},{"memberBenefitsId":"878460","benefitHeading":"ﾜﾝﾃﾞｰﾊﾟｽ（水族館4施設＋ｱﾄﾗｸｼｮﾝ） 小中学生　3,900円（3,600円）⇒ ","benefitContent":"3,300円"},{"memberBenefitsId":"878461","benefitHeading":"ﾜﾝﾃﾞｰﾊﾟｽ（水族館4施設＋ｱﾄﾗｸｼｮﾝ） 幼児(4歳以上) 　2,200円（2,000円）⇒ ","benefitContent":"1,900円"},{"memberBenefitsId":"878462","benefitHeading":"ﾜﾝﾃﾞｰﾊﾟｽ（水族館4施設＋ｱﾄﾗｸｼｮﾝ） ｼﾆｱ(65歳以上)　3,900円（3,600円）⇒ ","benefitContent":"3,300円"}]}}',
      userCount: 1,
      catLrgClassCd: "003",
      codeDataImage: "https://www.thechecker.net/hubfs/images/barcode.png",
      customer: {
        torinoMembrNo: "449901000000003",
        familyName: "複数団体２",
        lastName: "社員１",
        // 本当はfirstNameが正しいと思われるがどこにも使われていないのでSwaggerに合わせる
      },
      benefitImportantPoints: [
        {
          title: null,
          content:
            "●（）内は12月1日～2月28日の冬期料金となります。なお販売価格につきましては通年と同様になります。\n●Web整理券対象日においては、本クーポンを利用する際にWeb整理券の取得が必要です。取得に方法につきましてはサービス提供企業サイトをご確認ください。\n●クーポンに必要事項を記入の上、アクアミュージアム1Fチケット窓口にてご購入ください。\n●天候･点検により一部アトラクションを運休する場合がございます。\n●対象期間中に休園となった場合でも、期間の延長はございません。\n●転売・払戻・返金不可となります。\n●入島の際、検温及び消毒のご協力をお願いしております。検温の際、体温が37.5度以上の発熱が確認されたお客さまはご入島をお断りさせていただきます。\n●密集となる状態を防ぐため入館制限・利用制限・Web整理券配布を行う場合があります。\n●水族館等の施設をご利用の際は、マスクの着用が必須となります。(3才以下は任意)着用でないお客さまは、ご利用をお断りさせていただきます。",
          infoLev: "3",
          linkUrl: null,
          linkNm: null,
        },
      ],
    };

    return new Promise((resolve) => {
      return resolve({ data: obj });
    });
  },
  /**
   * マイクーポン詳細
   */
  getCouponDetail(params) {
    const acptNo = String(params.acptNo);
    let data = {
      couponDetail: {
        menuNo: acptNo.padStart(6, "0"), // メニューNO
        menuNm:
          "メニュー名メニュー名メニュー名メニュー名メニュー名メニュー名メニュー名メニュー名", // メニュー名
        planId: "11",
        planNm:
          "クーポンでワンデーパス 水族館4施設＋アトラクション おとな･高校生 5500円⇒4700円ほか", // プラン名
        acptNo: acptNo, // 受付番号
        // acptNo: "A001",
        catLrgClassCd: "002",
        imageURL: "/cdn/images/96x96.jpg", // サムネイル画像
        codeDataImage: "https://www.thechecker.net/hubfs/images/barcode.png",
        digiPonApplUrl: "digiPonApplUrl",
        ticketDate: "ticketDate",
        expireFrom: "expireFrom",
        expireTo: "expireTo", // 利用期限
        displayFrom: "displayFrom",
        userCount: 1,
        kind: 0, // kind:2 デジタルチケット（デジチケ） kind:3 デジタルクーポン（デジポン）
        digiPonDiv: 20,
        barcodeDiv: "barcodeDiv",
        barcodeTgtColumnCd: "barcodeTgtColumnCd", // バーコード生成用のコードアクセス用のkeyが入っている
        memberBenefitsId: "memberBenefitsId",
        description:
          '{"description":{"custumItem":{},"memberBenefits":[{"memberBenefitsId":"878459","benefitHeading":"ﾜﾝﾃﾞｰﾊﾟｽ（水族館4施設＋ｱﾄﾗｸｼｮﾝ） おとな・高校生　5,500円（5,000円）⇒ ","benefitContent":"4,700円"},{"memberBenefitsId":"878460","benefitHeading":"ﾜﾝﾃﾞｰﾊﾟｽ（水族館4施設＋ｱﾄﾗｸｼｮﾝ） 小中学生　3,900円（3,600円）⇒ ","benefitContent":"3,300円"},{"memberBenefitsId":"878461","benefitHeading":"ﾜﾝﾃﾞｰﾊﾟｽ（水族館4施設＋ｱﾄﾗｸｼｮﾝ） 幼児(4歳以上) 　2,200円（2,000円）⇒ ","benefitContent":"1,900円"},{"memberBenefitsId":"878462","benefitHeading":"ﾜﾝﾃﾞｰﾊﾟｽ（水族館4施設＋ｱﾄﾗｸｼｮﾝ） ｼﾆｱ(65歳以上)　3,900円（3,600円）⇒ ","benefitContent":"3,300円"}]}}',
        // description: JSON.stringify({
        //   couponDtl: "クーポン詳細",
        //   custumItem: {
        //     custumItemTitle: "カスタマイズタイトル",
        //     custumItemCont: "カスタマイズ内容",
        //   },
        //   couponUseFlow: "クーポン利用の流れ",
        //   usageNotes: "？",
        // }),
        deleteFlag: 0,
        passwordFlag: 0,
        digiPonCdMaskDiv: 1,
        digiPonCdMaskExtDay: 10,
        digiPonCdMaskStatus: 1,
        couponCodeList: [],
        basicInformationCategory: {
          catlrgclassCd: "104",
          catLrgclassNm: "Lrg",
          catMidClassCd: "201",
          catMidClassNm: "Mid ",
          catSmlClassCd: "301",
          catSmlClassNm: "Sml",
        },
      },
    };

    /**
     * 〇チケットの種別について
     * kind:2がデジチケ、kind:3がデジポン
     * デジチケは「もぎる」があり、デジポンは「もぎる」がない
     *
     * 〇グルメかどうか
     * catLrgClassCdで判別できます。
     * catLrgClassCdが"011"なのがグルメ
     *
     * 〇バーコードについて
     * バーコードをjsで出力するのはデジポンのみです。
     * デジチケはなんか返ってくるらしいです。
     */

    // 利用前デジポン（有効期限あり）
    if (
      acptNo == 9990 || // クーポン呈示（デジポン）（バーコード）
      acptNo == 9991 || // クーポン呈示（デジポン）（メインのコードとは別にコードが発行されるパターン）
      acptNo == 9992 || // クーポン呈示（デジポン）（ クーポン番号）
      acptNo == 9993 || // クーポン呈示（デジポン）（複数選択時）
      acptNo == 9994 || // クーポン呈示（デジポン）：コードが生成できない場合
      acptNo == 9995 // クーポン呈示（デジポン）：パスワード必須
    ) {
      data.couponDetail.kind = 3;
      data.couponDetail.codeDataImage = "";
      data.couponDetail.ticketDate = "2021/12/01";
      data.couponDetail.expireTo = "2021/11/31";
      data.couponDetail.digiPonCdMaskStatus = 1;
      data.couponDetail.deleteFlag = 0;
      data.couponDetail.couponCodeList = [...Array(4).keys()].map((i) => ({
        couponId: i,
        digiNo: `20211001-123456-${String(i + 1).padStart(10, "0")}`,
        codeData: "QMUtn3tnABMf",
        outputCodeDataColumn: "資産性コード出力カラム", // barcodeTgtColumnCdで指定されたものここの場合もある（デジポンコード名称）
        title: `券種${i + 1}`, // 券種名
        day: "day",
        timeframe: "timeframe",
        outputCodeColumn01: "", // barcodeTgtColumnCdで指定されたもの
        outputCodeColumn02: "",
        outputCodeColumn03: "",
        outputCodeColumn04: "",
        outputCodeColumn05: "",
        codeClmn1: "", // codeClmn1のタイトル
        codeClmn2: "",
        codeClmn3: "",
        codeClmn4: "",
        codeClmn5: "",
        usedFlag: 0, // もぎる
        disableFlag: 0,
        usedDateTime: "",
      }));
      // console.log('acptNo', acptNo);

      // クーポン呈示（デジポン）（メインのコードとは別にコードが発行されるパターン）
      if (acptNo == 9991) {
        for (let item of data.couponDetail.couponCodeList) {
          item.outputCodeColumn01 = "追加コード1";
          item.outputCodeColumn02 = "追加コード2";
          item.outputCodeColumn03 = "追加コード3";
          item.outputCodeColumn04 = "追加コード4";
          item.outputCodeColumn05 = "追加コード5";
          item.codeClmn1 = "20211001-999999-0001";
          item.codeClmn2 = "20211001-999999-0002";
          item.codeClmn3 = "20211001-999999-0003";
          item.codeClmn4 = "20211001-999999-0004";
          item.codeClmn5 = "20211001-999999-0005";
        }
        // console.log('data.couponDetail.couponCodeList', data.couponDetail.couponCodeList);

        // クーポン呈示（デジポン）（ クーポン番号
      } else if (acptNo == 9992) {
        data.couponDetail.digiPonDiv = 10;

        // クーポン呈示（デジポン）コードが生成できない場合
      } else if (acptNo == 9994) {
        data.couponDetail.couponCodeList = [...Array(4).keys()].map((i) => ({
          couponId: i,
          digiNo: `20211001-123456-${String(i + 1).padStart(10, "0")}`,
          codeData: "",
          outputCodeDataColumn: "資産性コード出力カラム", // barcodeTgtColumnCdで指定されたものここの場合もある（デジポンコード名称）
          title: `券種${i + 1}`, // 券種名
          day: "day",
          timeframe: "timeframe",
          outputCodeColumn01: "", // barcodeTgtColumnCdで指定されたもの
          outputCodeColumn02: "",
          outputCodeColumn03: "",
          outputCodeColumn04: "",
          outputCodeColumn05: "",
          codeClmn1: "", // codeClmn1のタイトル
          codeClmn2: "",
          codeClmn3: "",
          codeClmn4: "",
          codeClmn5: "",
          usedFlag: 1, // もぎる
          disableFlag: 0,
          usedDateTime: "",
        }));

        // クーポン呈示（デジポン）コードが生成できない場合
      } else if (acptNo == 9995) {
        data.couponDetail.passwordFlag = 1;
      }

      // 利用前デジチケ（有効期限あり）
    } else if (
      acptNo == 9980 || // デジチケもぎり
      acptNo == 9981 || // デジチケもぎり（グルメ）
      acptNo == 9982 || // デジチケもぎり（複数選択）
      acptNo == 9983 || // デジチケもぎり後
      acptNo == 9984 || // デジチケもぎり後（複数券種選択時）
      acptNo == 9985 // デジチケもぎり：パスワード必須
    ) {
      data.couponDetail.kind = 2;
      data.couponDetail.ticketDate = "2021/08/31 10:00";
      data.couponDetail.expireTo = "";
      data.couponDetail.digiPonCdMaskStatus = 1;
      data.couponDetail.deleteFlag = 0;
      data.couponDetail.couponCodeList = [...Array(1).keys()].map((i) => ({
        couponId: i,
        digiNo: `20211001-123456-${String(i + 1).padStart(10, "0")}`,
        codeData: "QMUtn3tnABMf",
        outputCodeDataColumn: "", // barcodeTgtColumnCdで指定されたものここの場合もある（デジポンコード名称）
        title: `券種${i + 1}`, // 券種名
        day: "day",
        timeframe: "timeframe",
        outputCodeColumn01: "", // barcodeTgtColumnCdで指定されたもの
        outputCodeColumn02: "",
        outputCodeColumn03: "",
        outputCodeColumn04: "",
        outputCodeColumn05: "",
        codeClmn1: "", // codeClmn1のタイトル
        codeClmn2: "",
        codeClmn3: "",
        codeClmn4: "",
        codeClmn5: "",
        usedFlag: 0, // もぎる
        disableFlag: 0,
        usedDateTime: "",
      }));

      // デジチケもぎり（グルメ）
      if (acptNo == 9981) {
        data.couponDetail.catLrgClassCd = "011";

        // デジチケもぎり（複数選択）
      } else if (acptNo == 9982) {
        data.couponDetail.couponCodeList = [...Array(2).keys()].map((i) => ({
          couponId: i,
          digiNo: `20211001-123456-${String(i + 1).padStart(10, "0")}`,
          codeData: "QMUtn3tnABMf",
          outputCodeDataColumn: "", // barcodeTgtColumnCdで指定されたものここの場合もある（デジポンコード名称）
          title: `券種${i + 1}`, // 券種名
          day: "day",
          timeframe: "timeframe",
          outputCodeColumn01: "", // barcodeTgtColumnCdで指定されたもの
          outputCodeColumn02: "",
          outputCodeColumn03: "",
          outputCodeColumn04: "",
          outputCodeColumn05: "",
          codeClmn1: "", // codeClmn1のタイトル
          codeClmn2: "",
          codeClmn3: "",
          codeClmn4: "",
          codeClmn5: "",
          usedFlag: 1, // もぎる
          disableFlag: 0,
          usedDateTime: "",
        }));

        // デジチケもぎり後
      } else if (acptNo == 9983) {
        for (let item of data.couponDetail.couponCodeList) {
          item.usedDateTime = "2021/12/01 10:00";
        }

        // 複数券種選択時
      } else if (acptNo == 9984) {
        data.couponDetail.couponCodeList = [...Array(4).keys()].map((i) => ({
          couponId: i,
          digiNo: `20211001-123456-${String(i + 1).padStart(10, "0")}`,
          codeData: "QMUtn3tnABMf",
          outputCodeDataColumn: "", // barcodeTgtColumnCdで指定されたものここの場合もある（デジポンコード名称）
          title: `券種${i + 1}`, // 券種名
          day: "day",
          timeframe: "timeframe",
          outputCodeColumn01: "", // barcodeTgtColumnCdで指定されたもの
          outputCodeColumn02: "",
          outputCodeColumn03: "",
          outputCodeColumn04: "",
          outputCodeColumn05: "",
          codeClmn1: "", // codeClmn1のタイトル
          codeClmn2: "",
          codeClmn3: "",
          codeClmn4: "",
          codeClmn5: "",
          usedFlag: 1, // もぎる
          disableFlag: 0,
          usedDateTime: "",
        }));

        // デジチケもぎり：パスワード必須
      } else if (acptNo == 9985) {
        data.couponDetail.passwordFlag = 1;
      }

      // 利用前デジポン・デジチケ（有効期限あり・券種が1つのみの場合)
    } else if (acptNo == 9970) {
      data.couponDetail.ticketDate = "";
      data.couponDetail.expireTo = "2022/08/31 10:00";
      data.couponDetail.digiPonCdMaskStatus = 1;
      data.couponDetail.deleteFlag = 0;
      data.couponDetail.couponCodeList = [...Array(1).keys()].map((i) => ({
        couponId: i,
        digiNo: `20211001-123456-${String(i + 1).padStart(10, "0")}`,
        codeData: "QMUtn3tnABMf",
        outputCodeDataColumn: "outputCodeDataColumn", // barcodeTgtColumnCdで指定されたものここの場合もある（デジポンコード名称）
        title: `券種${i + 1}`, // 券種名
        day: "day",
        timeframe: "timeframe",
        outputCodeColumn01: "", // barcodeTgtColumnCdで指定されたもの
        outputCodeColumn02: "",
        outputCodeColumn03: "",
        outputCodeColumn04: "",
        outputCodeColumn05: "",
        codeClmn1: "", // codeClmn1のタイトル
        codeClmn2: "",
        codeClmn3: "",
        codeClmn4: "",
        codeClmn5: "",
        usedFlag: 1, // もぎる
        disableFlag: 0,
        usedDateTime: "usedDateTime",
      }));

      // 利用前デジポン・デジチケ （日時指定）
    } else if (acptNo == 9960) {
      data.couponDetail.ticketDate = "2021/08/31 10:00";
      data.couponDetail.expireTo = "";
      data.couponDetail.digiPonCdMaskStatus = 1;
      data.couponDetail.deleteFlag = 0;
      data.couponDetail.couponCodeList = [...Array(4).keys()].map((i) => ({
        couponId: i,
        digiNo: `20211001-123456-${String(i + 1).padStart(10, "0")}`,
        codeData: "QMUtn3tnABMf",
        outputCodeDataColumn: "outputCodeDataColumn", // barcodeTgtColumnCdで指定されたものここの場合もある（デジポンコード名称）
        title: `券種${i + 1}`, // 券種名
        day: "day",
        timeframe: "timeframe",
        outputCodeColumn01: "", // barcodeTgtColumnCdで指定されたもの
        outputCodeColumn02: "",
        outputCodeColumn03: "",
        outputCodeColumn04: "",
        outputCodeColumn05: "",
        codeClmn1: "", // codeClmn1のタイトル
        codeClmn2: "",
        codeClmn3: "",
        codeClmn4: "",
        codeClmn5: "",
        usedFlag: 1, // もぎる
        disableFlag: i % 2,
        usedDateTime: "usedDateTime",
      }));

      // ================================
      // 10/26リリース スコープ外のため、コメントアウト
      // ================================
      // 利用前デジポン・デジチケ （利用済み）
      // } else if (acptNo == 9950) {
      //   data.couponDetail.ticketDate = "2022/08/31 10:00";
      //   data.couponDetail.expireTo = "";
      //   data.couponDetail.digiPonCdMaskStatus = 0;
      //   data.couponDetail.deleteFlag = 0;
      //   data.couponDetail.couponCodeList = [...Array(1).keys()].map((i) => ({
      //     couponId: i,
      //     digiNo: `20211001-123456-${String(i+1).padStart(10, "0")}`,
      //     codeData: "codeData",
      //     outputCodeDataColumn: "outputCodeDataColumn",// barcodeTgtColumnCdで指定されたものここの場合もある（デジポンコード名称）
      //     title: `券種${i+1}`,   // 券種名
      //     day: "day",
      //     timeframe: "timeframe",
      //     outputCodeColumn01: "",// barcodeTgtColumnCdで指定されたもの
      //     outputCodeColumn02: "",
      //     outputCodeColumn03: "",
      //     outputCodeColumn04: "",
      //     outputCodeColumn05: "",
      //     codeClmn1: "",// codeClmn1のタイトル
      //     codeClmn2: "",
      //     codeClmn3: "",
      //     codeClmn4: "",
      //     codeClmn5: "",
      //     usedFlag: 1,    // もぎる
      //     disableFlag: 1,
      //     usedDateTime: "usedDateTime"
      //   }));

      // ================================
      // 10/26リリース スコープ外のため、コメントアウト
      // ================================
      // // 利用前デジポン・デジチケ （有効期限切れ）
      // } else if (acptNo == 9940) {
      //   data.couponDetail.ticketDate = "2021/08/31 10:00";
      //   data.couponDetail.expireTo = "2021/01/02";
      //   data.couponDetail.digiPonCdMaskStatus = 1;
      //   data.couponDetail.deleteFlag = 0;
      //   data.couponDetail.couponCodeList = [...Array(1).keys()].map((i) => ({
      //     couponId: i,
      //     digiNo: `20211001-123456-${String(i+1).padStart(10, "0")}`,
      //     codeData: "codeData",
      //     outputCodeDataColumn: "outputCodeDataColumn",// barcodeTgtColumnCdで指定されたものここの場合もある（デジポンコード名称）
      //     title: `券種${i+1}`,   // 券種名
      //     day: "day",
      //     timeframe: "timeframe",
      //     outputCodeColumn01: "",// barcodeTgtColumnCdで指定されたもの
      //     outputCodeColumn02: "",
      //     outputCodeColumn03: "",
      //     outputCodeColumn04: "",
      //     outputCodeColumn05: "",
      //     codeClmn1: "",// codeClmn1のタイトル
      //     codeClmn2: "",
      //     codeClmn3: "",
      //     codeClmn4: "",
      //     codeClmn5: "",
      //     usedFlag: 0,    // もぎる
      //     disableFlag: 1,
      //     usedDateTime: "usedDateTime"
      //   }));

      // ================================
      // 10/26リリース スコープ外のため、コメントアウト
      // ================================
      // // 利用前デジポン・デジチケ （使用不可）
      // } else if (acptNo == 9930) {
      //   data.couponDetail.ticketDate = "2021/08/31 10:00";
      //   data.couponDetail.expireTo = "2124/11/02";
      //   data.couponDetail.digiPonCdMaskStatus = 1;
      //   data.couponDetail.deleteFlag = 1;
      //   data.couponDetail.couponCodeList = [...Array(1).keys()].map((i) => ({
      //     couponId: i,
      //     digiNo: `20211001-123456-${String(i+1).padStart(10, "0")}`,
      //     codeData: "codeData",
      //     outputCodeDataColumn: "outputCodeDataColumn",// barcodeTgtColumnCdで指定されたものここの場合もある（デジポンコード名称）
      //     title: `券種${i+1}`,   // 券種名
      //     day: "day",
      //     timeframe: "timeframe",
      //     outputCodeColumn01: "",// barcodeTgtColumnCdで指定されたもの
      //     outputCodeColumn02: "",
      //     outputCodeColumn03: "",
      //     outputCodeColumn04: "",
      //     outputCodeColumn05: "",
      //     codeClmn1: "",// codeClmn1のタイトル
      //     codeClmn2: "",
      //     codeClmn3: "",
      //     codeClmn4: "",
      //     codeClmn5: "",
      //     usedFlag: 0,    // もぎる
      //     disableFlag: 1,
      //     usedDateTime: "usedDateTime"
      //   }));

      // デジポン・デジチケ（パスワード入力）
    } else if (acptNo == 9920) {
      data.couponDetail.ticketDate = "2021/08/31 10:00";
      data.couponDetail.expireTo = "2124/11/02";
      data.couponDetail.digiPonCdMaskStatus = 1;
      data.couponDetail.deleteFlag = 0;
      data.couponDetail.passwordFlag = 1;
      data.couponDetail.couponCodeList = [...Array(1).keys()].map((i) => ({
        couponId: i,
        digiNo: `20211001-123456-${String(i + 1).padStart(10, "0")}`,
        codeData: "codeData",
        outputCodeDataColumn: "outputCodeDataColumn", // barcodeTgtColumnCdで指定されたものここの場合もある（デジポンコード名称）
        title: `券種${i + 1}`, // 券種名
        day: "day",
        timeframe: "timeframe",
        outputCodeColumn01: "", // barcodeTgtColumnCdで指定されたもの
        outputCodeColumn02: "",
        outputCodeColumn03: "",
        outputCodeColumn04: "",
        outputCodeColumn05: "",
        codeClmn1: "", // codeClmn1のタイトル
        codeClmn2: "",
        codeClmn3: "",
        codeClmn4: "",
        codeClmn5: "",
        usedFlag: 0, // もぎる
        disableFlag: 0,
        usedDateTime: "usedDateTime",
      }));
    } else {
      data.couponDetail.ticketDate = "";
      data.couponDetail.expireTo = "2024/06/30";
      data.couponDetail.digiPonCdMaskStatus = 1;
      data.couponDetail.deleteFlag = 0;
      data.couponDetail.couponCodeList = [...Array(4).keys()].map((i) => ({
        couponId: i,
        digiNo: `20211001-123456-${String(i + 1).padStart(10, "0")}`,
        codeData: "codeData",
        outputCodeDataColumn: "outputCodeDataColumn", // barcodeTgtColumnCdで指定されたものここの場合もある（デジポンコード名称）
        title: `券種${i + 1}`, // 券種名
        day: "day",
        timeframe: "timeframe",
        outputCodeColumn01: "", // barcodeTgtColumnCdで指定されたもの
        outputCodeColumn02: "",
        outputCodeColumn03: "",
        outputCodeColumn04: "",
        outputCodeColumn05: "",
        codeClmn1: "", // codeClmn1のタイトル
        codeClmn2: "",
        codeClmn3: "",
        codeClmn4: "",
        codeClmn5: "",
        usedFlag: 1, // もぎる
        disableFlag: 0,
        usedDateTime: "usedDateTime",
      }));
    }

    // stg環境のデータ構造
    // let data = {
    //   "couponDetail": {
    //     "menuNo": "10670209",
    //     "menuNm": "ＴＯＨＯシネマズ",
    //     "planId": "0011036917",
    //     "planNm": "【決済後12時間後に受取】デジタルクーポンコードでTCチケット1900円⇒1400円",
    //     "acptNo": "0012332111",
    //     "catLrgClassCd": "003",
    //     "imageURL": "https://mn.tst.boimg.jp/img/000482/48217.jpg",
    //     "codeDataImage": null,
    //     "digiPonApplUrl": null,
    //     "ticketDate": "2021-11-15 00:00:00",
    //     "expireFrom": "2021-11-16 00:00:00",
    //     "expireTo": "2021-11-23 23:59:59",
    //     "displayFrom": "2021-11-15 00:00:00",
    //     "userCount": 2,
    //     "kind": 3,
    //     "digiPonDiv": null,
    //     "barcodeDiv": null,
    //     "barcodeTgtColumnCd": null,
    //     "memberBenefitsId": "794115",
    //     "description": "{\"detail\":\"クーポン詳細\",\"flow\":\"利用の流れ\",\"etc\":\"その他情報\"}",
    //     "deleteFlag": 0,
    //     "passwordFlag": 0,
    //     "digiPonCdMaskDiv": 20,
    //     "digiPonCdMaskExtDay": 11,
    //     "digiPonCdMaskStatus": 1,
    //     "couponCodeList": [
    //       {
    //         "couponId": 7,
    //         "digiNo": "20211001-123456-9999999999",
    //         "codeData": "QMUtn3tnABMf",
    //         "outputCodeDataColumn": null,
    //         "title": "ＴＯＨＯシネマズ",
    //         "day": "2021年11月12日",
    //         "timeframe": "平日 10:00～17:00 / 祝祭日 9:00～18:00",
    //         "outputCodeColumn01": null,
    //         "outputCodeColumn02": null,
    //         "outputCodeColumn03": null,
    //         "outputCodeColumn04": null,
    //         "outputCodeColumn05": null,
    //         "codeClmn1": null,
    //         "codeClmn2": null,
    //         "codeClmn3": null,
    //         "codeClmn4": null,
    //         "codeClmn5": null,
    //         "usedFlag": 0,
    //         "disableFlag": 0,
    //         "usedDateTime": null
    //       }
    //     ]
    //   },
    //   "importantPoints": [
    //     {
    //       "title": null,
    //       "content": "●こちらのプランはチケットを電子メールでお届けいたします。\n\n【TCチケットに関する注意事項】\n●先行上映、特別興行、【特別料金】での上映など、一部作品でご利用いただけない場合がございます。\n●３D/IMAX/MX４D/Dolby Atmos上映等では、追加料金が必要です。\n●特別席利用の場合、追加料金が必要です。\n●本券記載のご鑑賞可能上映期間内に、ご鑑賞下さい。\n●本券１枚につき、お一人様１作品に限り有効（大人、学生、子供、シニア共通）\n●先行上映、特別興行など、一部作品でご利用頂けない場合がございます。\n●本券は、現金との交換、返金は出来ません。又、紛失しても再発行は出来ません。\n●紛失、盗難、改ざん、またはお客様の許可なく第三者に利用された場合であっても、返金、再発行は致しません。\n●本券の転売、複製は、固くお断り致します。\n●本券はご鑑賞終了まで大切に保管して下さい。",
    //       "infoLev": "3",
    //       "linkUrl": null,
    //       "linkNm": null
    //     },
    //     {
    //       "title": "テストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテ",
    //       "content": null,
    //       "infoLev": "1",
    //       "linkUrl": null,
    //       "linkNm": null
    //     },
    //     {
    //       "title": null,
    //       "content": "テストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテ",
    //       "infoLev": "3",
    //       "linkUrl": "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttestt",
    //       "linkNm": "テスト"
    //     }
    //   ]
    // }
    return { data: data };
  },
  /**
   * マイクーポン詳細（デジチケ・デジポン）もぎりパスコードを確認する。
   */
  postTicketCollectorPassword(params) {
    let res = {
      statusCode: 401,
      statusDetail: "detail",
    };
    if (params.password == "password") {
      res.statusCode = 200;
    }
    return { data: res };
  },
  /**
   * マイクーポン詳細（デジチケ・デジポン) もぎりボタン押下の動作API
   */
  putTicketCollector(params) {
    return {
      data: {
        requestId: "request-id-0000000000",
      },
    };
  },

  /**
   * お申し込み履歴
   */
  getOrderHistory(params) {
    const data = {
      cnts: 10,
      orderInfoList: [
        {
          acptNo: "16032023",
          customerNo: "666666",
          reservedId: "211013000009",
          travelAgencyBookingNoOption: "0",
          reservedSts: "3",
          checkInDate: "2023-03-20",
          checkOutDate: "2023-03-31",
          dtlStsChngDate: "2023-03-21",
          dtlStsChngTime: "11:54:15",
          dtlSts: "9",
          menuNo: "10162707",
          menuNm: "横浜・八景島シーパラダイス123",
          useDate: "2023-03-20",
          pointGrntNumAmt: 0,
          acptDatetime: "2023-03-21 18:54:28",
          useHeadCnt: 1,
          cancelDatetime: "",
          cancelNo: "",
          catLrgClassCd: "001",
          catMidClassCd: "001",
          catSmlClassCd: "001",
          acptRouteDiv: null,
          srvicDiv: "C10",
          usageDiv: "10",
          orderPatternDiv: "30",
          menuInfo: null,
        },
        {
          acptNo: "211013000002",
          customerNo: "666666",
          reservedId: "211013000008",
          travelAgencyBookingNoOption: null,
          reservedSts: "1",
          checkInDate: null,
          checkOutDate: null,
          dtlStsChngDate: "2021-10-13",
          dtlStsChngTime: "18:54:29",
          dtlSts: "8",
          menuNo: "77777",
          menuNm: "横浜・八景島シーパラダイス234",
          useDate: "1969-06-09",
          pointGrntNumAmt: 0,
          acptDatetime: "2021-10-13 18:54:28",
          useHeadCnt: 1,
          cancelDatetime: null,
          cancelNo: null,
          catLrgClassCd: "001",
          catMidClassCd: "001",
          catSmlClassCd: "001",
          acptRouteDiv: null,
          srvicDiv: "C10",
          usageDiv: "10",
          orderPatternDiv: "30",
          menuInfo: null,
        },
        {
          acptNo: "211013000003",
          customerNo: "1234567890123456",
          reservedId: "211013000010",
          travelAgencyBookingNoOption: null,
          reservedSts: "1",
          checkInDate: null,
          checkOutDate: null,
          dtlStsChngDate: "2021-10-13",
          dtlStsChngTime: "19:25:42",
          dtlSts: "8",
          menuNo: "12345678",
          menuNm: "横浜・八景島シーパラダイス",
          useDate: "1946-12-02",
          pointGrntNumAmt: 1111112,
          acptDatetime: "2021-10-13 19:25:42",
          useHeadCnt: 123,
          cancelDatetime: null,
          cancelNo: null,
          catLrgClassCd: "001",
          catMidClassCd: "001",
          catSmlClassCd: "001",
          acptRouteDiv: null,
          srvicDiv: "B30",
          usageDiv: "10",
          orderPatternDiv: "01",
          menuInfo: null,
        },
        {
          acptNo: "211015000009",
          customerNo: "1234567890123456",
          reservedId: "211015000014",
          travelAgencyBookingNoOption: null,
          reservedSts: "1",
          checkInDate: null,
          checkOutDate: null,
          dtlStsChngDate: "2021-10-15",
          dtlStsChngTime: "15:03:52",
          dtlSts: "8",
          menuNo: "12345678",
          menuNm: "横浜・八景島シーパラダイス",
          useDate: "1946-12-02",
          pointGrntNumAmt: 1111112,
          acptDatetime: "2021-10-15 15:03:52",
          useHeadCnt: 123,
          cancelDatetime: null,
          cancelNo: null,
          catLrgClassCd: "001",
          catMidClassCd: "001",
          catSmlClassCd: "001",
          acptRouteDiv: null,
          srvicDiv: "B30",
          usageDiv: "10",
          orderPatternDiv: "01",
          menuInfo: null,
        },
        {
          acptNo: "211019000010",
          customerNo: "1234567890123456",
          reservedId: "211019000016",
          travelAgencyBookingNoOption: null,
          reservedSts: "1",
          checkInDate: null,
          checkOutDate: null,
          dtlStsChngDate: "2021-10-19",
          dtlStsChngTime: "20:21:24",
          dtlSts: "8",
          menuNo: "12345678",
          menuNm: "横浜・八景島シーパラダイス",
          useDate: "1946-12-02",
          pointGrntNumAmt: 1111112,
          acptDatetime: "2021-10-19 20:21:23",
          useHeadCnt: 123,
          cancelDatetime: null,
          cancelNo: null,
          catLrgClassCd: "001",
          catMidClassCd: "001",
          catSmlClassCd: "001",
          acptRouteDiv: null,
          srvicDiv: "B30",
          usageDiv: "10",
          orderPatternDiv: "01",
          menuInfo: null,
        },
        {
          acptNo: "211025000013",
          customerNo: "1234567890123456",
          reservedId: "211025000018",
          travelAgencyBookingNoOption: null,
          reservedSts: "1",
          checkInDate: null,
          checkOutDate: null,
          dtlStsChngDate: "2021-10-25",
          dtlStsChngTime: "20:13:01",
          dtlSts: "8",
          menuNo: "12345678",
          menuNm: "横浜・八景島シーパラダイス",
          useDate: "2019-08-24",
          pointGrntNumAmt: 100001,
          acptDatetime: "2021-10-25 20:13:00",
          useHeadCnt: 12,
          cancelDatetime: null,
          cancelNo: null,
          catLrgClassCd: "001",
          catMidClassCd: "001",
          catSmlClassCd: "001",
          acptRouteDiv: null,
          srvicDiv: "B30",
          usageDiv: "10",
          orderPatternDiv: "10",
          menuInfo: null,
        },
        {
          acptNo: "211025000015",
          customerNo: "1234567890123456",
          reservedId: "211025000020",
          travelAgencyBookingNoOption: null,
          reservedSts: "1",
          checkInDate: null,
          checkOutDate: null,
          dtlStsChngDate: "2021-10-25",
          dtlStsChngTime: "20:25:40",
          dtlSts: "8",
          menuNo: "12345678",
          menuNm: "横浜・八景島シーパラダイス",
          useDate: "2019-08-24",
          pointGrntNumAmt: 100001,
          acptDatetime: "2021-10-25 20:25:40",
          useHeadCnt: 12,
          cancelDatetime: null,
          cancelNo: null,
          catLrgClassCd: "001",
          catMidClassCd: "001",
          catSmlClassCd: "001",
          acptRouteDiv: null,
          srvicDiv: "B30",
          usageDiv: "10",
          orderPatternDiv: "10",
          menuInfo: null,
        },
        {
          acptNo: "211104000021",
          customerNo: "32119201322002",
          reservedId: "211104000031",
          travelAgencyBookingNoOption: null,
          reservedSts: "3",
          checkInDate: null,
          checkOutDate: null,
          dtlStsChngDate: "2021-12-03",
          dtlStsChngTime: "10:50:45",
          dtlSts: "9",
          menuNo: "530001",
          menuNm: "横浜・八景島シーパラダイス",
          useDate: "2019-08-24",
          pointGrntNumAmt: 0,
          acptDatetime: "2021-11-04 17:56:59",
          useHeadCnt: 1,
          cancelDatetime: "2021-12-03 10:50:45",
          cancelNo: "211203000188",
          catLrgClassCd: "001",
          catMidClassCd: "001",
          catSmlClassCd: "001",
          acptRouteDiv: null,
          srvicDiv: "A10",
          usageDiv: "10",
          orderPatternDiv: "1",
          menuInfo: null,
        },
        {
          acptNo: "211105000022",
          customerNo: "1234567890123456",
          reservedId: "211105000032",
          travelAgencyBookingNoOption: null,
          reservedSts: "1",
          checkInDate: null,
          checkOutDate: null,
          dtlStsChngDate: "2021-11-05",
          dtlStsChngTime: "09:47:52",
          dtlSts: "8",
          menuNo: "12345678",
          menuNm: "横浜・八景島シーパラダイス",
          useDate: "2019-08-24",
          pointGrntNumAmt: 100001,
          acptDatetime: "2021-11-05 09:47:52",
          useHeadCnt: 12,
          cancelDatetime: null,
          cancelNo: null,
          catLrgClassCd: "001",
          catMidClassCd: "001",
          catSmlClassCd: "001",
          acptRouteDiv: null,
          srvicDiv: "B30",
          usageDiv: "10",
          orderPatternDiv: "10",
          menuInfo: null,
        },
        {
          acptNo: "211125000064",
          customerNo: "449920000000002",
          reservedId: "211125000193",
          travelAgencyBookingNoOption: null,
          reservedSts: "1",
          checkInDate: null,
          checkOutDate: null,
          dtlStsChngDate: "2021-11-25",
          dtlStsChngTime: "13:11:42",
          dtlSts: "8",
          menuNo: "10660132",
          menuNm: "てもみんグループ",
          useDate: "2021-11-24",
          pointGrntNumAmt: 0,
          acptDatetime: "2021-11-25 13:11:36",
          useHeadCnt: 1,
          cancelDatetime: null,
          cancelNo: null,
          catLrgClassCd: "005",
          catMidClassCd: "005",
          catSmlClassCd: "001",
          acptRouteDiv: null,
          srvicDiv: "B40",
          usageDiv: "60",
          orderPatternDiv: "51",
          menuInfo: {
            menuRcEndDt: "2999/03/31 23:59:00",
            menuNo: "10660132",
            targetMenuNo: null,
            menuImages: [
              {
                imageExplanation: null,
                imageUrl: "https://mn.boimg.jp/img/000365/36508.jpg",
              },
              {
                imageExplanation: null,
                imageUrl: "https://mn.boimg.jp/img/000377/37726.jpg",
              },
            ],
            leadCopy:
              "部分から全身ケアまでコース、時間をお選びいただけます。てもみんグループ全店・グローバル治療院でご利用いただけます。",
            areaInfomation: null,
            menuRcSttDt: "2004/03/31 00:00:00",
            shopAreaDiv: "0",
            catchCopy: "10分からご利用いただけるカジュアルリラクゼーション",
            extSystemMenuId: null,
            categoryInfomation: {
              catLrgClassCd: "106",
              catMidClassNm: "リラクサロン",
              catLrgClassNm: "リラク・ビューティー",
              catSmlClassCd: "301",
              catMidClassCd: "201",
              catSmlClassNm: "リラクサロン",
            },
            menuNmKana: "テモミングループ",
            menuNm: "てもみんグループ",
            extSystemCd: null,
            srvicDiv: "B40",
          },
        },
      ],
    };
    /*
    return new Promise((resolve) => {
      return resolve({ data: data });
    });
    */
    return data;
  },

  /**
   * お申し込み履歴
   */
  getNetflix() {
    const res = {
    data :{
      /** API実行結果 */
      "apiResult": "OK",
      /** アクティベート状態 廃止*/
      // "activationStatus": true,
      /** 連絡先有無フラグ */
      "contractAddressFlag": true,
      /** 契約プランID */
      "contractPlanId": 1,
      /** 契約プラン名 */
      "contractPlanName": "Netflixプラン",
      /** サブスクリプションプランID */
      "subscriptionPlanId": 1,
      /** サブスクリプションプラン名 */
      "subscriptionPlanName": "スタンダードコース",
      /** 利用料金 */
      "usageFee": 500,
      /** プラン状態 */
      "planStatus": "有効",
      /** アクティベーションプロキシURL */
      "activationProxyURL": "https://yahoo.com",
      /** 前々月支払額 */
      "paymentOfTwoMonthsAgo": 5000,
      /** 前々月返金額 */
      "refundAmountOfTwoMonthsAgo": 50,
      /** 前月支払額 */
      "paymentOfLastMonth": 500,
      /** 前月返金額 */
      "refundAmountOfLastMonth": null,
      /** 今月支払額 */
      "paymentOfThisMonth": 0,
      /** 選択可能プランリスト */
      "selectablePlanList": [
      {
      "subscriptionPlanName": "スタンダート",
      "subscriptionPlanId": 1,
      "bpfPlanId": "bpf-plan-id-001",
      "usageFee": 0,
      "selected": false
      },
      {
      "subscriptionPlanName": "べーシック",
      "subscriptionPlanId": 2,
      "bpfPlanId": "bpf-plan-id-001",
      "usageFee": 500,
      "selected": false
      },
      {
      "subscriptionPlanName": null,
      "subscriptionPlanId": 3,
      "bpfPlanId": "bpf-plan-id-001",
      "usageFee": 990,
      "selected": true
      }
      ],
      /** アカウントリカバリURL */
      "recoveryUrl": "https://google.com?",
      /** サブスクリプションサービスID */
      "subscriptionServiceId": 1,
      /** エラーコード */
      "errorCode": "E0000001"
    }
  }
  return res
  },

  /**
   * 抽選結果
   */
  getLotteryResult() {
    const data = {
      acpt: {
        acptNo: "string",
        linkAcptNo: "string",
        acptDatetime: "string",
        acptStaffId: "string",
        totalAmt: 0,
        billAmtTotal: 0,
        boneBillAmtTotal: 0,
        pstg: 0,
        billAmtTotalPstgIn: 0,
        boneBillAmtTotalPstgIn: 0,
        pointUseNumAmt: 0,
        pointGrntNumAmt: 0,
        aplySbsidAmt: 0,
        aplyCafePointAmt: 0,
        setlSts: "string",
        userAgent: "string",
        pointUseCd: "string",
        acptRouteDiv: "string",
        customer: {
          customerNo: "string",
          familyName: "string",
          firstName: "string",
          familyNameKana: "string",
          firstNameKana: "string",
          birthday: "string",
          sex: "string",
          prefectureCode: "string",
          postalCode: "string",
          address1: "string",
          address2: "string",
          addrNm: "string",
          company: "string",
          dept: "string",
          tel: "string",
          email: "string",
          courseId: "string",
          companyCd: "string",
          subscriptionId: "string",
          priceDiv: "string",
          addrDiv: "string",
          telDiv: "string",
          tel2: "string",
          telDiv2: "string",
          faxDiv: "string",
          fax: "string",
        },
        acptRomTotal: {
          romSchAmtTotal: 0,
          entryAmtTotal: 0,
          unproChrgPriceTotal: 0,
          romEndAmtTotal: 0,
          dmndFreq: 0,
          lastRomDate: "string",
          rciptReqrdFlag: "string",
          rciptAddrNm: "string",
          rciptNo: "string",
          acptRomDtlList: [
            {
              acptRomDtlKey: 0,
              romLno: 0,
              romSchDate: "string",
              romSchAmt: 0,
              payMethod: "string",
              creditCardExpirYm: "string",
              romSts: "string",
              romDate: "string",
              romAmt: 0,
              dmndType: "string",
              cancelDate: "string",
              setlAgentNm: "string",
              cancelSts: "string",
              cancelChngDatetime: "string",
              cancelChngUsrNo: "string",
              setlSystem: "string",
              setlTrnId: "string",
              cvsSetlFee: "string",
            },
          ],
        },
        acptDtlList: [
          {
            acptDtlNo: "string",
            linkAcptDtlNo: "string",
            dtlSts: "string",
            dtlStsChngDatetime: "string",
            menuNo: "string",
            planId: "string",
            srvicDiv: "string",
            usageDiv: "string",
            orderPatternDiv: "string",
            chngDatetime: "string",
            chngStaffId: "string",
            cancelDatetime: "string",
            cancelStaffId: "string",
            cancelNo: "string",
            linkCancelNo: "string",
            useDate: "string",
            useHeadCnt: 0,
            payeeDiv: "string",
            cafePointAplyFlag: "string",
            pointAplyFlag: "string",
            sbsidAplyFlag: "string",
            resrvReqstOutptFlag: "string",
            blshSysCd: "string",
            pointExchangeSts: "string",
            payMethod: "string",
            pyrlDedDiv: "string",
            rsvReqPaperAutoSendFlag: "string",
            ccOperatorHandleFlag: "string",
            shippingFlag: "string",
            usageLimitNotCountFlag: "string",
            judgeResult: "string",
            rsvReqPaperDestDiv: "string",
            menuBasicInfo: {
              menuNo: "string",
              menuNm: "string",
              menuNmKana: "string",
              menuStartDatetime: "string",
              menuEndDatetime: "string",
              srvicDiv: "string",
              shopAreaDiv: "string",
              catchPhrase: "string",
              leadCopy: "string",
              outsideSysCd: "string",
              areaLrgClassCd: "string",
              areaLrgClassNm: "string",
              areaMidClassCd: "string",
              areaMidClassNm: "string",
              areaSmlClassCd: "string",
              areaSmlClassNm: "string",
              catLrgClassCd: "string",
              catLrgClassNm: "string",
              catMidClassCd: "string",
              catMidClassNm: "string",
              catSmlClassCd: "string",
              catSmlClassNm: "string",
              partnerId: "string",
              partnerNm: "string",
            },
            planBasicInfo: {
              planId: "string",
              planNm: "string",
              planLeadCopy: "string",
              planStartDatetime: "string",
              planEndDatetime: "string",
            },
            custTransFee: {
              priceDiv: 0,
              custTransFeeDiv: "string",
              custTransFeeRate: 0,
              custTransFeePrice: 0,
              custTransFeeNote: "string",
              custTransFeeOneDiv: "string",
              custTransFeeOneRate: 0,
              custTransFeeOnePrice: 0,
            },
            lifePlanPrtic: {
              rndtnNm: "string",
              performer: "string",
              rndtnPrivRem: "string",
            },
            cautContList: [
              {
                title: "string",
                cont: "string",
              },
            ],
            pointGrnt: {
              pointGrntCd: "string",
              pointGrntDate: "2022-04-27",
              reasonCustomer: "string",
              reasonInternal: "string",
              pointResources: "string",
              pointResourceDept: "string",
              useLimitCd: "string",
              pointGrnt: "string",
              pointGrntDiv: "string",
              pointGrntRate: 0,
              pointFixAmt: 0,
            },
            digiMycoupon: {
              imageUrl: "string",
              displayFrom: "string",
              kind: "string",
              description: "string",
              passwordFlag: "string",
            },
            dtlChrgTotal: {
              gnrlChrgTotal: 0,
              tieupChrgTotal: 0,
              memberChrgTotal: 0,
              boneSbsidChrgTotal: 0,
              lifeSpSbsidChrgTotal: 0,
              pointUse: 0,
              addChrg: 0,
              dscntAmtTotal: 0,
              pstg: 0,
              escrtFee: 0,
              chngAmt: 0,
              oficeFee: 0,
              cancelAmtGross: 0,
              cancelAmtNet: 0,
              cancelAmt: 0,
              cafePointAmtTotal: 0,
              sbsidTotal: 0,
              totalAmt: 0,
              billAmtTotal: 0,
              approvalAmt: 0,
              approvalMemo: "string",
              tieupCancelAmt: 0,
              cancelSbsidTotal: 0,
              addChrgBrdwnPstg: 0,
              addChrgBrdwnChrg: 0,
            },
            agreementList: [
              {
                documentId: "string",
              },
            ],
            sbsidRsvList: [
              {
                subsidyRsvId: "string",
                subsidyDetailId: "string",
                customerNo: "string",
                relationship: "string",
                couponId: "string",
                amount: 0,
                familyName: "string",
                firstName: "string",
              },
            ],
            acptLifeAnswerList: [
              {
                acptCnfrmCnsdId: "string",
                acptCnfrmCnsdRem: "string",
                replyMthdDiv: "string",
                acptCnfrmCnsdrReply: "string",
              },
            ],
            privateInfoList: [
              {
                acptCnfrmCnsdId: "string",
                privateInfoUrl: "string",
              },
            ],
            acptDtlStsManageList: [
              {
                stsDiv: "string",
                sts: "string",
                stsChngDatetime: "string",
              },
            ],
            memoRemList: [
              {
                memoInputDatetime: "string",
                customerNo: "string",
                memoRem: "string",
                memoInputStaffId: "string",
                memoDataType: "string",
              },
            ],
            lotteryInfo: {
              lotteryId: "string",
              operationType: "string",
              lotteryType: "string",
              repeatType: "string",
              hopeAcptScope: "string",
              lotteryDate: "string",
              electNtceDate: "string",
              lotteryResult: "string",
            },
            acptPrticList: [
              {
                acptPrticNo: 0,
                gnrlChrg: 0,
                tieupChrg: 0,
                memberChrg: 0,
                boneSbsidChrg: 0,
                lifeSpSbsidChrg: 0,
                cnt: 0,
                dscntRatio: 0,
                dscntAmt: 0,
                escrtFee: 0,
                tieupChrgSubtl: 0,
                membrChrgSubtl: 0,
                boneSbsidChrgSubtl: 0,
                lifeSpSbsidChrgSubtl: 0,
                escrtFeeSubtl: 0,
                lifeBenefit: {
                  benefitId: 0,
                  benefitHeadline: "string",
                  rndtnDate: "string",
                  venue: "string",
                  prefecture: "string",
                  startTime: "string",
                  seatType: "string",
                  benefitContent: "string",
                  benefitDiv: "string",
                  applScreenDispDiv: "string",
                  digiPonFreeSaleFlag: "string",
                  bitesQty: 0,
                  stockKey: 0,
                  saleDivNm: "string",
                  lotteryResult: "1",
                },
                digiPonPrtic: {
                  payoutKey: 0,
                  digiPonId: "string",
                  digiPonPayoutExtTm: 0,
                  issueDate: "string",
                  prchNum: 0,
                  disableFlag: "string",
                },
                digiTxPrtic: {
                  payoutKey: 0,
                  digiTxNo: "string",
                  issueDate: "string",
                  prchNum: 0,
                  disableFlag: "string",
                  cponStartDatetime: "string",
                  cponEndDatetime: "string",
                },
                pointExcngPrtic: {
                  pointId: "string",
                  exchangeToCode: "string",
                  exchangeToUserId: "string",
                  usePoint: 0,
                  exchangeToPoint: 0,
                },
                famiPrtic: {
                  shopId: "string",
                  regonCd: "string",
                  tmnlId: "string",
                },
                lifeCompositPrtic: {
                  payoutKey: 0,
                  ticketInfo: "string",
                  typeId: "string",
                  typeName: "string",
                  invtTicktTypeId: "string",
                  invtTicktTypeName: "string",
                  lotExpirationFromDate: "string",
                  lotExpirationToDate: "string",
                },
                acptDlvryList: [
                  {
                    dlvryZipCd: "string",
                    dlvryAddr1: "string",
                    dlvryAddr2: "string",
                    dlvryAddrNm: "string",
                    dlvryTel: "string",
                    email: "string",
                    cnt: "string",
                    arngeList: [
                      {
                        orderTo: "string",
                        dlvryDatetime: "string",
                        dlvrySlipNo: "string",
                        arngeSts: "string",
                        arngeStsCancelRsn: "string",
                        ptDlvryDatetime: "string",
                        shipDatetime: "string",
                        shipCancelHndlDate: "string",
                        sendItemTypeDiv: "string",
                        sendWay: "string",
                        "sendWay - copy": "string",
                        txSendWay: "string",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    };
    return {
      data: data,
      status: 200,
    };
  },
  putOrderCancel(params) {
    const data = {
      params: params,
    };
    return {
      data: data,
    };
  },
  getSingleItemInfo(menuNo) {
    const data = {
      "id": 0,
      "itemType": null,
      "menuNo": "23A00671",
      "customerNo": null,
      "dateAdded": null,
      "menuDetailResponse": {
        "menuRcEndDt": "2999/12/31 23:59:00",
        "menuNo": "23A00671",
        "targetMenuNo": null,
        "menuImages": [
          {
            "imageUrl": "https://d3u3cps1l61p9b.cloudfront.net/img/ppsh/file/A3000402/23A00671/4.png",
            "imageExplanation": null
          }
        ],
        "leadCopy": "リードコピー（テスト）",
        "areaInfomation": null,
        "menuRcSttDt": "2023/02/20 10:00:00",
        "shopAreaDiv": null,
        "catchCopy": "キャッチコピー（テスト）",
        "extSystemMenuId": null,
        "categoryInfomation": {
          "catLrgClassCd": "115",
          "catLrgClassNm": "ベネ通販",
          "catMidClassCd": "203",
          "catMidClassNm": "ビューティー&コスメ",
          "catSmlClassCd": "311",
          "catSmlClassNm": "ビューティー&コスメ(その他)"
        },
        "menuNmKana": "リヨウセイゲン",
        "menuNm": "利用制限＃4更新①",
        "extSystemCd": null,
        "srvicDiv": "C10"
      },
      "favourite": null,
      "idFavourite": null,
      "serviceType": "shop"
    };
    return {
      data: data,
    };
  },
  getMenuNoPlandIdInfo(menuNo, planId) {
    const data = {
      "planBasicInfo": {
        "menuNo": "23A00671",
        "planId": "8000026795",
        "planNm": null,
        "planLeadCopy": null,
        "planRcSttDt": "2023/02/20 10:00:00",
        "planRcEndDt": "2999/12/31 23:59:00",
        "planImages": [
          {
            "imageUrl": "https://www.benefit.one.co.jp/shopMN/img/NOIMAGE.jpg",
            "imageExplanation": null
          }
        ]
      },
      "planIcons": null,
      "planUsage": {
        "usageDiv": "42",
        "usageLoginBfrDispFlag": "1",
        "applFlag": "1",
        "usageDetail": {
          "usageTxtGuidance": null,
          "optinFlag": "1",
          "ostiariesFlag": "0",
          "receivableFlag": "1",
          "ticketExclusionFlag": "1",
          "buppanExclusionFlag": "0",
          "famiExclusionFlag": "1"
        },
        "usageDetailLife": null
      },
      "ticketInfo": null,
      "benepoReturnInfo": {
        "benepoReturnDiv": "20",
        "benepoReturnRate": null,
        "benepoReturnFixed": null,
        "freeGrantFlag": "0",
        "qtyCntFlag": "0",
        "benepoGrantTypeDiv": null,
        "grantLimDay": null,
        "grantReasonDiv": null,
        "srcPtFlag": "0",
        "validSttDayDiv": null,
        "benepoExDdtDiv": null,
        "benepoExDdtValue": null,
        "exclIden": null,
        "uliCats": null,
        "uliUsages": null,
        "uliMenus": null,
        "uliPlans": null
      },
      "memberBenefits": [
        {
          "memberBenefitsId": "26795",
          "benefitHeading": "5814 500円 ⇒",
          "ticketHeading": null,
          "benefitContent": "349円",
          "benefitDiv": "1",
          "applWinDispDiv": "9",
          "pyrlDedPayeeDiv": "2",
          "generalPrice": 500,
          "alliancePrice": 349,
          "price": 349,
          "boneSubsidy": 0,
          "pyrlDedDiscount": 23,
          "digiPonFreeSaleFlag": null,
          "bitesQty": null,
          "saleStockTermFlag": "0",
          "stockKey": "723536",
          "stockTerms": null,
          "tixSendWay": null,
          "headlineBeneCont": null
        }
      ],
      "benefitImportantPoints": null,
      "planInfomation": null,
      "shoppingGuideInfo": {
        "shoppingGuideNote": null,
        "shoppingGuides": [
          {
            "linkUrl": null,
            "shoppingGuideValues": null,
            "shoppingGuideNm": "【物販】会員特典",
            "shoppingGuideCd": "000211",
            "shoppingGuideValue": "会員価格やベネポ欄をご確認ください。",
            "linkNm": null
          },
          {
            "linkUrl": null,
            "shoppingGuideValues": null,
            "shoppingGuideNm": "【物販】送料",
            "shoppingGuideCd": "000202",
            "shoppingGuideValue": "送料欄をご確認ください。\r\nお届け先によっては追加送料が発生する場合がございます。\r\n一部企業・団体の契約により異なる場合がございます。詳細はお申込画面にてご確認ください。",
            "linkNm": null
          },
          {
            "linkUrl": null,
            "shoppingGuideValues": null,
            "shoppingGuideNm": "【物販】特典・送料以外の費用",
            "shoppingGuideCd": "000214",
            "shoppingGuideValue": "商品によっては追加で費用が発生する場合がございます。\r\n一部企業・団体の契約により異なる場合がございます。詳細はお申込画面にてご確認ください。",
            "linkNm": null
          },
          {
            "linkUrl": null,
            "shoppingGuideValues": [
              "～2024年3月31日 23時59分"
            ],
            "shoppingGuideNm": "お申込み期間",
            "shoppingGuideCd": "000212",
            "shoppingGuideValue": null,
            "linkNm": null
          },
          {
            "linkUrl": null,
            "shoppingGuideValues": null,
            "shoppingGuideNm": "【物販】お申込み時の留意点",
            "shoppingGuideCd": "000210",
            "shoppingGuideValue": "■賞味期限(もしくは消費期限)について\r\n賞味期限（もしくは消費期限）は会員特典注意事項欄又は商品名、商品説明欄をご確認ください。\r\n■商品により、お申込み・ご入金期日の設定がある場合がございます。\r\n商品説明欄をご確認ください。\r\n■営利目的での商品転売はいかなる場合も固くお断りいたします。",
            "linkNm": null
          },
          {
            "linkUrl": null,
            "shoppingGuideValues": null,
            "shoppingGuideNm": "【物販】商品の引渡時期、サービスの提供時期",
            "shoppingGuideCd": "000204",
            "shoppingGuideValue": "商品説明をご確認ください。\r\n記載のない商品に関しては、商品のお届けはご入金確認後3～7日程度（土・日・祝日は除く）かかります。\\n",
            "linkNm": null
          },
          {
            "linkUrl": null,
            "shoppingGuideValues": null,
            "shoppingGuideNm": "【物販】ご利用方法",
            "shoppingGuideCd": "000209",
            "shoppingGuideValue": "ベネフィット・ステーションにお申し込みください。",
            "linkNm": null
          },
          {
            "linkUrl": null,
            "shoppingGuideValues": null,
            "shoppingGuideNm": "【物販】お支払い方法",
            "shoppingGuideCd": "000205",
            "shoppingGuideValue": "ベネフィット・ワンにお支払いください。支払方法は下記がご利用いただけます。\\nクレジット払い／コンビニ払い／銀行振込／\\n（メニューにより支払方法が限定される場合がございます）／",
            "linkNm": null
          },
          {
            "linkUrl": null,
            "shoppingGuideValues": null,
            "shoppingGuideNm": "【物販】キャンセル規定",
            "shoppingGuideCd": "000206",
            "shoppingGuideValue": "会員様のご都合によるお申込み後の返品・交換・キャンセルはお受けできません。",
            "linkNm": null
          }
        ]
      },
      "optins": null,
      "applLimits": [
        {
          "usageLimitCont": "当商品は利用制限がございます。2023/02/20～2024/03/31の期間に、Bアカウント毎に3個までのお申込みとなります。",
          "usageLimitId": "308",
          "usageLimitUserDiv": "1",
          "usageLimitTgtDiv": "3",
          "menuIdList": null,
          "planIdList": [
            {
              "menuNo": "23A00671",
              "planId": "8000026795"
            }
          ],
          "usageLimitTermDiv": "1",
          "usageLimitTermStt": "2023/02/20",
          "usageLimitTermEnd": "2024/03/31",
          "usageLimitSttMo": null,
          "usageLimitMaxCnt": null,
          "usageLimitMinCnt": null,
          "usageLimitTotDiv": "3",
          "usageLimitNumOfTimes": null,
          "usageLimitCnt": 3
        }
      ],
      "payMthdInfo": {
        "payeeDiv": "20",
        "payeeNote": null,
        "shipping": 500,
        "payMthdList": [
          {
            "payMthdDiv": "10",
            "useFlag": "1"
          },
          {
            "payMthdDiv": "20",
            "useFlag": "1"
          },
          {
            "payMthdDiv": "30",
            "useFlag": "1"
          },
          {
            "payMthdDiv": "50",
            "useFlag": "0"
          },
          {
            "payMthdDiv": "55",
            "useFlag": "0"
          },
          {
            "payMthdDiv": "60",
            "useFlag": "0"
          },
          {
            "payMthdDiv": "61",
            "useFlag": "0"
          },
          {
            "payMthdDiv": "70",
            "useFlag": "0"
          }
        ],
        "benepoUseFlag": "1",
        "reducedTaxRateFlag": "1"
      },
      "planShopInfo": {
        "sku1Nm": null,
        "sku1Selection": null,
        "sku2Nm": null,
        "sku2Selection": null,
        "giftSprtAvailDiv": "2",
        "giftSprtAvailNm": null,
        "deliveryMethodDiv": "1",
        "deliveryMethodNm": "宅配便",
        "taxDiv": "1",
        "taxDivNm": "通常税率",
        "taxRate": "10.0",
        "shippingFeeTaxDiv": "1",
        "shippingFeeTaxNm": "通常税率",
        "shippingFeeSale": "500",
        "shippingFeeTaxRate": "10.0",
        "webDispFlag": "1",
        "saleDayStt": "2023/02/20 10:00:00",
        "saleDayEnd": "2999/12/31 23:59:00"
      }
    };
    return {
      data: data,
    };
  },
};
export default mockData;
