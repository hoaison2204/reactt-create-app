/**
 * 補助金向け mockデータ
 */
const mockData = {
  getSubsidyAvailableData1() {
    return {
      availableDataList: [
        {
          availableData: {
            subsidyDetailId: "ddd",
            dispSubsidyNm: "string",
            subsidyId: "2222",
            receptionDateFrom: "2022/3/31",
            receptionDateTo: "2022/4/31",
            applicableDateFrom: "0000-00-00",
            applicableDateTo: "0000-00-00",
            subsidyType: "string",
            settlementNo: 0,
            requestType: "string",
            applicableDegreeCnt: 0,
            personAccompanyFlg: "1",
            minTgtAge: 18,
            usedFormDiv: "02",
            usedLimTerm: "string",
            usedLimUnit: "string",
            usedMaxCnt: 3,
            usedMaxTotalAmt: 1,
            parsonalUsedMaxCnt: 5,
            parsonalUsedMaxTotalAmt: 0,
            usedExpectedAmt: 0,
            yearEndDatetime: "0000-00-00",
            useStopFlg: "string",
            subsidySts: "string",
            requestDate: "0000-00-00",
            requestUserId: "string",
            approvalDate: "0000-00-00",
            approvalUserId: "string",
            minChargeAmt: 1000,
            costUnderChargeableFlg: 1,
            priceList: [
              {
                subsidyPriceId: "string",
                subsidyDetailId: "string",
                priceType: "string",
                limApplicableDateFrom: "2022-03-01 00:00:00",
                limApplicableDateTo: "2022-12-31 00:00:00",
                price: "5000円",
                ageType: "string"
              }
            ],
            couponInfo: {
              subsidyDetailId: "string",
              couponId: "string",
              customerNo: "string",
              getDate: "0000/00/00T00:00:00.000",
              usedFlag: "string"
            },
            subsidyClass: "string",
            multipleUnusableFlg: 1
          },
          remainingCount: 5,
          remainingAmount: 0,
          scrennDisplayItemList: [
            {
              nameLabel: {
                value: "string",
                isVisiable: "string"
              },
              seiInput: {
                isVIsiable: "string"
              },
              meiInput: {
                isVisiable: "string"
              },
              relationshipLabel: {
                value: "string",
                isVisiable: "string"
              },
              relationshipPd: {
                valueList: ["string"],
                isVisable: "string"
              },
              ageLabel: {
                value: "string",
                isVisiable: "string"
              },
              ageInput: {
                isVisiable: "string"
              },
              pricetypeLabel: {
                value: "string",
                isVisable: "string"
              },
              pricetypePd: {
                valueList: ["string"],
                isVisable: "string"
              },
              agetypeLabel: {
                value: "string",
                isVisable: "string"
              },
              agetypePd: {
                valueList: ["string"],
                isVisiable: "string"
              },
              subsidyNameLabel: {
                value: "string"
              },
              applicableDateFromLabel: {
                value: "string"
              },
              applicableDateToLabel: {
                value: "string"
              },
              receptionDateFromLabel: {
                value: "string"
              },
              receptionDateToLabel: {
                value: "string"
              },
              priceList: [
                {
                  priceType: "string",
                  ageType: "string",
                  value: "string"
                }
              ],
              remainingCountLabel: {
                value: "string"
              },
              remainingAmountLabel: {
                value: "string"
              },
              applicableDegreeCntLabel: {
                value: "string"
              },
              personAccompanyNecessityLabel: {
                value: "string"
              },
              tgtAgeLabel: {
                value: "string"
              },
              costUnderChargeableNecessityLabel: {
                value: "string"
              },
              multipleUnusableNecessityLabel: {
                value: "string"
              }
            }
          ]
        },
        {
          availableData: {
            subsidyDetailId: "ddd",
            dispSubsidyNm: "string",
            subsidyId: "string",
            receptionDateFrom: "2022/3/31",
            receptionDateTo: "2022/4/31",
            applicableDateFrom: "0000-00-00",
            applicableDateTo: "0000-00-00",
            subsidyType: "string",
            settlementNo: 0,
            requestType: "string",
            applicableDegreeCnt: 0,
            personAccompanyFlg: "0",
            minTgtAge: 18,
            usedFormDiv: "01",
            usedLimTerm: "string",
            usedLimUnit: "string",
            usedMaxCnt: 3,
            usedMaxTotalAmt: 5,
            parsonalUsedMaxCnt: 10,
            parsonalUsedMaxTotalAmt: 0,
            usedExpectedAmt: 0,
            yearEndDatetime: "0000-00-00",
            useStopFlg: "string",
            subsidySts: "string",
            requestDate: "0000-00-00",
            requestUserId: "string",
            approvalDate: "0000-00-00",
            approvalUserId: "string",
            minChargeAmt: 2000,
            costUnderChargeableFlg: 0,
            priceList: [
              {
                subsidyPriceId: "aaa",
                subsidyDetailId: "string",
                priceType: "string",
                limApplicableDateFrom: "2021-03-01",
                limApplicableDateTo: "2021-06-01 00:00:00",
                price: "3000円",
                ageType: "string"
              }
            ],
            couponInfo: {
              subsidyDetailId: "string",
              couponId: "string",
              customerNo: "string",
              getDate: "0000/00/00T00:00:00.000",
              usedFlag: "string"
            },
            subsidyClass: "string",
            multipleUnusableFlg: 0
          },
          remainingCount: 3,
          remainingAmount: 0,
          screenDisplayItemList: [
            {
              nameLabel: {
                value: "string",
                isVisible: "string"
              },
              seiInput: {
                isVisible: "string"
              },
              meiInput: {
                isVisible: "string"
              },
              relationshipLabel: {
                value: "string",
                isVisible: "string"
              },
              relationshipPd: {
                valueList: ["string"],
                isVisable: "string"
              },
              ageLabel: {
                value: "string",
                isVisible: "string"
              },
              ageInput: {
                isVisible: "string"
              },
              pricetypeLabel: {
                value: "string",
                isVisable: "string"
              },
              pricetypePd: {
                valueList: ["string"],
                isVisable: "string"
              },
              agetypeLabel: {
                value: "string",
                isVisable: "string"
              },
              agetypePd: {
                valueList: ["string"],
                isVisible: "string"
              },
              subsidyNameLabel: {
                value: "string"
              },
              applicableDateFromLabel: {
                value: "string"
              },
              applicableDateToLabel: {
                value: "string"
              },
              receptionDateFromLabel: {
                value: "string"
              },
              receptionDateToLabel: {
                value: "string"
              },
              priceList: [
                {
                  priceType: "string",
                  ageType: "string",
                  value: "string"
                }
              ],
              remainingCountLabel: {
                value: "string"
              },
              remainingAmountLabel: {
                value: "string"
              },
              applicableDegreeCntLabel: {
                value: "string"
              },
              personAccompanyNecessityLabel: {
                value: "string"
              },
              tgtAgeLabel: {
                value: "string"
              },
              costUnderChargeableNecessityLabel: {
                value: "string"
              },
              multipleUnusableNecessityLabel: {
                value: "string"
              }
            }
          ]
        },
        {
          availableData: {
            subsidyDetailId: "string",
            dispSubsidyNm: "string",
            subsidyId: "1111",
            receptionDateFrom: "0000-00-00",
            receptionDateTo: "0000-00-00",
            applicableDateFrom: "0000-00-00",
            applicableDateTo: "0000-00-00",
            subsidyType: "string",
            settlementNo: 0,
            requestType: "string",
            applicableDegreeCnt: 0,
            personAccompanyFlg: "string",
            minTgtAge: 0,
            usedFormDiv: "string",
            usedLimTerm: "string",
            usedLimUnit: "string",
            usedMaxCnt: 0,
            usedMaxTotalAmt: 0,
            parsonalUsedMaxCnt: 0,
            parsonalUsedMaxTotalAmt: 0,
            usedExpectedAmt: 0,
            yearEndDatetime: "0000-00-00",
            useStopFlg: "string",
            subsidySts: "string",
            requestDate: "0000-00-00",
            requestUserId: "string",
            approvalDate: "0000-00-00",
            approvalUserId: "string",
            minChargeAmt: 0,
            costUnderChargeableFlg: "string",
            priceList: [
              {
                subsidyPriceId: "string",
                subsidyDetailId: "string",
                priceType: "string",
                limApplicableDateFrom: "0000-00-00 00:00:00",
                limApplicableDateTo: "0000-00-00 00:00:00",
                price: 5000,
                ageType: "string"
              }
            ],
            couponInfo: {
              subsidyDetailId: "string",
              couponId: "string",
              customerNo: "string",
              getDate: "0000/00/00T00:00:00.000",
              usedFlag: "string"
            },
            subsidyClass: "string",
            multipleUnusableFlg: "string"
          },
          remainingCount: 0,
          remainingAmount: 0,
          screenDisplayItemList: [
            {
              nameLabel: {
                value: "string",
                isVisible: "string"
              },
              seiInput: {
                isVisible: "string"
              },
              meiInput: {
                isVisible: "string"
              },
              relationshipLabel: {
                value: "string",
                isVisible: "string"
              },
              relationshipPd: {
                valueList: ["string"],
                isVisable: "string"
              },
              ageLabel: {
                value: "string",
                isVisible: "string"
              },
              ageInput: {
                isVisible: "string"
              },
              pricetypeLabel: {
                value: "string",
                isVisable: "string"
              },
              pricetypePd: {
                valueList: ["string"],
                isVisable: "string"
              },
              agetypeLabel: {
                value: "string",
                isVisable: "string"
              },
              agetypePd: {
                valueList: ["string"],
                isVisible: "string"
              },
              subsidyNameLabel: {
                value: "string"
              },
              applicableDateFromLabel: {
                value: "string"
              },
              applicableDateToLabel: {
                value: "string"
              },
              receptionDateFromLabel: {
                value: "string"
              },
              receptionDateToLabel: {
                value: "string"
              },
              priceList: [
                {
                  priceType: "string",
                  ageType: "string",
                  value: "string"
                }
              ],
              remainingCountLabel: {
                value: "string"
              },
              remainingAmountLabel: {
                value: "string"
              },
              applicableDegreeCntLabel: {
                value: "string"
              },
              personAccompanyNecessityLabel: {
                value: "string"
              },
              tgtAgeLabel: {
                value: "string"
              },
              costUnderChargeableNecessityLabel: {
                value: "string"
              },
              multipleUnusableNecessityLabel: {
                value: "string"
              }
            }
          ]
        },
        {
          availableData: {
            subsidyDetailId: "string",
            dispSubsidyNm: "string",
            subsidyId: "3333",
            receptionDateFrom: "0000-00-00",
            receptionDateTo: "0000-00-00",
            applicableDateFrom: "0000-00-00",
            applicableDateTo: "0000-00-00",
            subsidyType: "string",
            settlementNo: 0,
            requestType: "string",
            applicableDegreeCnt: 0,
            personAccompanyFlg: "string",
            minTgtAge: 0,
            usedFormDiv: "string",
            usedLimTerm: "string",
            usedLimUnit: "string",
            usedMaxCnt: 0,
            usedMaxTotalAmt: 0,
            parsonalUsedMaxCnt: 0,
            parsonalUsedMaxTotalAmt: 0,
            usedExpectedAmt: 0,
            yearEndDatetime: "0000-00-00",
            useStopFlg: "string",
            subsidySts: "string",
            requestDate: "0000-00-00",
            requestUserId: "string",
            approvalDate: "0000-00-00",
            approvalUserId: "string",
            minChargeAmt: 0,
            costUnderChargeableFlg: "string",
            priceList: [
              {
                subsidyPriceId: "string",
                subsidyDetailId: "string",
                priceType: "string",
                limApplicableDateFrom: "0000-00-00 00:00:00",
                limApplicableDateTo: "0000-00-00 00:00:00",
                price: 10000,
                ageType: "string"
              }
            ],
            couponInfo: {
              subsidyDetailId: "string",
              couponId: "string",
              customerNo: "string",
              getDate: "0000/00/00T00:00:00.000",
              usedFlag: "string"
            },
            subsidyClass: "string",
            multipleUnusableFlg: "string"
          },
          remainingCount: 0,
          remainingAmount: 0,
          screenDisplayItemList: [
            {
              nameLabel: {
                value: "string",
                isVisible: "string"
              },
              seiInput: {
                isVisible: "string"
              },
              meiInput: {
                isVisible: "string"
              },
              relationshipLabel: {
                value: "string",
                isVisible: "string"
              },
              relationshipPd: {
                valueList: ["string"],
                isVisable: "string"
              },
              ageLabel: {
                value: "string",
                isVisible: "string"
              },
              ageInput: {
                isVisible: "string"
              },
              pricetypeLabel: {
                value: "string",
                isVisable: "string"
              },
              pricetypePd: {
                valueList: ["string"],
                isVisable: "string"
              },
              agetypeLabel: {
                value: "string",
                isVisable: "string"
              },
              agetypePd: {
                valueList: ["string"],
                isVisible: "string"
              },
              subsidyNameLabel: {
                value: "string"
              },
              applicableDateFromLabel: {
                value: "string"
              },
              applicableDateToLabel: {
                value: "string"
              },
              receptionDateFromLabel: {
                value: "string"
              },
              receptionDateToLabel: {
                value: "string"
              },
              priceList: [
                {
                  priceType: "string",
                  ageType: "string",
                  value: "string"
                }
              ],
              remainingCountLabel: {
                value: "string"
              },
              remainingAmountLabel: {
                value: "string"
              },
              applicableDegreeCntLabel: {
                value: "string"
              },
              personAccompanyNecessityLabel: {
                value: "string"
              },
              tgtAgeLabel: {
                value: "string"
              },
              costUnderChargeableNecessityLabel: {
                value: "string"
              },
              multipleUnusableNecessityLabel: {
                value: "string"
              }
            }
          ]
        }
      ]
    };
  },

  getSubsidyAvailableData2() {
    return {
      availableDataList: [
        {
          availableData: {
            subsidyId: "2222",
            subsidyDetailId: "D000000301",
            dispSubsidyNm: "補助金名テスト1",
            receptionDateFrom: "2022-01-28",
            receptionDateTo: "2022-03-31",
            priceList: [
              {
                price: 100,
                subsidyDetailId: "D000000301",
                subsidyPriceId: "P000000311",
                ageType: '一律/大人',
              }
            ],
            couponInfo: {
              subsidyDetailId: "string",
              couponId: "string",
            },
            useStopFlg: "0",
            usedFormDiv: "01",
            remainingCount: 2,
            costUnderChargeableFlg: "0",
            personAccompanyFlg: "01",
            multipleUnusableFlg: "0",
            minChargeAmt: 1234,
            minTgtAge: 23,
            usedMaxCnt: 50,
            usedMaxTotalAmt: 5000
          },
          remainingCount: 5,
        },
        {
          availableData: {
            subsidyId: "3333",
            subsidyDetailId: "D000000301",
            dispSubsidyNm: "補助金名テスト2",
            receptionDateFrom: "2022-01-28",
            receptionDateTo: "2022-03-31",
            priceList: [
              {
                price: 200,
                subsidyDetailId: "D000000301",
                subsidyPriceId: "P000000311",
                ageType: '本人/大人',
              }
            ],
            useStopFlg: "0",
            usedFormDiv: "02",
            costUnderChargeableFlg: "1",
            personAccompanyFlg: "01",
            multipleUnusableFlg: "0",
            minChargeAmt: 1234,
            minTgtAge: 23,
            usedMaxCnt: 50,
            usedMaxTotalAmt: 5000
          },
          remainingCount: 5,
        },
        {
          availableData: {
            subsidyId: "1111",
            subsidyDetailId: "D000000301",
            dispSubsidyNm: "補助金名テスト3",
            receptionDateFrom: "2022-01-28",
            receptionDateTo: "2022-03-31",
            priceList: [
              {
                price: 300,
                subsidyDetailId: "D000000301",
                subsidyPriceId: "P000000311",
                ageType: '本人/大人',
              }
            ],
            useStopFlg: "0",
            usedFormDiv: "02",
            costUnderChargeableFlg: "1",
            personAccompanyFlg: "01",
            multipleUnusableFlg: "0",
            minChargeAmt: 1234,
            minTgtAge: 23,
            usedMaxCnt: 50,
            usedMaxTotalAmt: 5000
          },
          remainingCount: 5,
        },
        {
          availableData: {
            subsidyId: "4444",
            subsidyDetailId: "D000000301",
            dispSubsidyNm: "補助金名テスト4",
            receptionDateFrom: "2022-01-28",
            receptionDateTo: "2022-03-31",
            priceList: [
              {
                price: 100,
                subsidyDetailId: "D000000301",
                subsidyPriceId: "P000000311",
                ageType: '一律/大人',
              }
            ],
            useStopFlg: "0",
            usedFormDiv: "01",
            remainingCount: 2,
            costUnderChargeableFlg: "0",
            personAccompanyFlg: "01",
            multipleUnusableFlg: "0",
            minChargeAmt: 1234,
            minTgtAge: 23,
            usedMaxCnt: 50,
            usedMaxTotalAmt: 5000
          },
          remainingCount: 5,
        },
        {
          availableData: {
            subsidyId: "5555",
            subsidyDetailId: "D000000301",
            dispSubsidyNm: "補助金名テスト5",
            receptionDateFrom: "2022-01-28",
            receptionDateTo: "2022-03-31",
            priceList: [
              {
                price: 200,
                subsidyDetailId: "D000000301",
                subsidyPriceId: "P000000311",
                ageType: '本人/大人',
              }
            ],
            useStopFlg: "0",
            usedFormDiv: "02",
            costUnderChargeableFlg: "1",
            personAccompanyFlg: "01",
            multipleUnusableFlg: "0",
            minChargeAmt: 1234,
            minTgtAge: 23,
            usedMaxCnt: 50,
            usedMaxTotalAmt: 5000
          },
          remainingCount: 5,
        },
        {
          availableData: {
            subsidyId: "6666",
            subsidyDetailId: "D000000301",
            dispSubsidyNm: "補助金名テスト6",
            receptionDateFrom: "2022-01-28",
            receptionDateTo: "2022-03-31",
            priceList: [
              {
                price: 300,
                subsidyDetailId: "D000000301",
                subsidyPriceId: "P000000311",
                ageType: '本人/大人',
              }
            ],
            useStopFlg: "0",
            usedFormDiv: "02",
            costUnderChargeableFlg: "1",
            personAccompanyFlg: "01",
            multipleUnusableFlg: "0",
            minChargeAmt: 1234,
            minTgtAge: 23,
            usedMaxCnt: 50,
            usedMaxTotalAmt: 5000
          },
          remainingCount: 5,
        },
        {
          availableData: {
            subsidyId: "7777",
            subsidyDetailId: "D000000301",
            dispSubsidyNm: "補助金名テスト7",
            receptionDateFrom: "2022-01-28",
            receptionDateTo: "2022-03-31",
            priceList: [
              {
                price: 100,
                subsidyDetailId: "D000000301",
                subsidyPriceId: "P000000311",
                ageType: '一律/大人',
              }
            ],
            useStopFlg: "0",
            usedFormDiv: "01",
            remainingCount: 2,
            costUnderChargeableFlg: "0",
            personAccompanyFlg: "01",
            multipleUnusableFlg: "0",
            minChargeAmt: 1234,
            minTgtAge: 23,
            usedMaxCnt: 50,
            usedMaxTotalAmt: 5000
          },
          remainingCount: 5,
        },
        {
          availableData: {
            subsidyId: "8888",
            subsidyDetailId: "D000000301",
            dispSubsidyNm: "補助金名テスト8",
            receptionDateFrom: "2022-01-28",
            receptionDateTo: "2022-03-31",
            priceList: [
              {
                price: 200,
                subsidyDetailId: "D000000301",
                subsidyPriceId: "P000000311",
                ageType: '本人/大人',
              }
            ],
            useStopFlg: "0",
            usedFormDiv: "02",
            costUnderChargeableFlg: "1",
            personAccompanyFlg: "01",
            multipleUnusableFlg: "0",
            minChargeAmt: 1234,
            minTgtAge: 23,
            usedMaxCnt: 50,
            usedMaxTotalAmt: 5000
          },
          remainingCount: 5,
        },
        {
          availableData: {
            subsidyId: "9999",
            subsidyDetailId: "D000000301",
            dispSubsidyNm: "補助金名テスト9",
            receptionDateFrom: "2022-01-28",
            receptionDateTo: "2022-03-31",
            priceList: [
              {
                price: 300,
                subsidyDetailId: "D000000301",
                subsidyPriceId: "P000000311",
                ageType: '本人/大人',
              }
            ],
            useStopFlg: "0",
            usedFormDiv: "02",
            costUnderChargeableFlg: "1",
            personAccompanyFlg: "01",
            multipleUnusableFlg: "0",
            minChargeAmt: 1234,
            minTgtAge: 23,
            usedMaxCnt: 50,
            usedMaxTotalAmt: 5000
          },
          remainingCount: 5,
        },
        {
          availableData: {
            subsidyId: "0010",
            subsidyDetailId: "D000000301",
            dispSubsidyNm: "補助金名テスト10",
            receptionDateFrom: "2022-01-28",
            receptionDateTo: "2022-03-31",
            priceList: [
              {
                price: 300,
                subsidyDetailId: "D000000301",
                subsidyPriceId: "P000000311",
                ageType: '本人/大人',
              }
            ],
            useStopFlg: "0",
            usedFormDiv: "02",
            costUnderChargeableFlg: "1",
            personAccompanyFlg: "01",
            multipleUnusableFlg: "0",
            minChargeAmt: 1234,
            minTgtAge: 23,
            usedMaxCnt: 50,
            usedMaxTotalAmt: 5000
          },
          remainingCount: 5,
        },
        {
          availableData: {
            subsidyId: "0011",
            subsidyDetailId: "D000000301",
            dispSubsidyNm: "補助金名テスト11",
            receptionDateFrom: "2022-01-28",
            receptionDateTo: "2022-03-31",
            priceList: [
              {
                price: 200,
                subsidyDetailId: "D000000301",
                subsidyPriceId: "P000000311",
                ageType: '本人/大人',
              }
            ],
            useStopFlg: "0",
            usedFormDiv: "02",
            costUnderChargeableFlg: "1",
            personAccompanyFlg: "01",
            multipleUnusableFlg: "0",
            minChargeAmt: 1234,
            minTgtAge: 23,
            usedMaxCnt: 50,
            usedMaxTotalAmt: 5000
          },
          remainingCount: 5,
        },
        {
          availableData: {
            subsidyId: "0012",
            subsidyDetailId: "D000000301",
            dispSubsidyNm: "補助金名テスト12",
            receptionDateFrom: "2022-01-28",
            receptionDateTo: "2022-03-31",
            priceList: [
              {
                price: 3000,
                subsidyDetailId: "D000000301",
                subsidyPriceId: "P000000311",
                ageType: '本人/大人',
              }
            ],
            useStopFlg: "0",
            usedFormDiv: "02",
            costUnderChargeableFlg: "1",
            personAccompanyFlg: "01",
            multipleUnusableFlg: "0",
            minChargeAmt: 1234,
            minTgtAge: 23,
            usedMaxCnt: 50,
            usedMaxTotalAmt: 5000
          },
          remainingCount: 5,
        },
      ]
    };
  },

  getSubsidyAvailableData3() {
    return {
      availableDataList: [
        {
          availableData: {
            subsidyDetailId: "1111",
            dispSubsidyNm: "補助クーポンE",
            subsidyId: "1111",
            receptionDateFrom: "2022-02-01",
            receptionDateTo: "2022-03-31",
            applicableDateFrom: "2022-03-01",
            applicableDateTo: "2022-03-31",
            subsidyType: "02",
            settlementNo: null,
            requestType: "01",
            applicableDegreeCnt: null,
            personAccompanyFlg: "0",
            minTgtAge: null,
            usedLimTerm: "01",
            usedLimUnit: "01",
            usedMaxCnt: null,
            usedMaxTotalAmt: null,
            parsonalUsedMaxCnt: 30,
            parsonalUsedMaxTotalAmt: null,
            usedExpectedAmt: null,
            yearEndDatetime: "2022-03-31",
            useStopFlg: "0",
            subsidySts: "02",
            requestDate: "2022-02-07",
            requestUserId: "307",
            approvalDate: "2022-02-07",
            approvalUserId: "339",
            minChargeAmt: null,
            usedFormDiv: "02",
            costUnderChargeableFlg: "1",
            multipleUnusableFlg: "0",
            priceList: [
              {
                subsidyPriceId: "P000000561",
                subsidyDetailId: "D000000591",
                priceType: "一律",
                limApplicableDateFrom: "2022-02-07",
                limApplicableDateTo: "2022-03-31",
                price: 6500,
                ageType: "一律"
              }
            ],
            couponInfo: null,
            subsidyClass: "01",
          },
          remainingCount: 30,
          remainingAmount: null,
          scrennDisplayItemList: null
        },
        {
          availableData: {
            subsidyDetailId: "1111",
            dispSubsidyNm: "補助クーポンE",
            subsidyId: "2222",
            receptionDateFrom: "2022-02-01",
            receptionDateTo: "2022-03-31",
            applicableDateFrom: "2022-03-01",
            applicableDateTo: "2022-03-31",
            subsidyType: "02",
            settlementNo: null,
            requestType: "01",
            applicableDegreeCnt: null,
            personAccompanyFlg: "0",
            minTgtAge: null,
            usedLimTerm: "01",
            usedLimUnit: "01",
            usedMaxCnt: null,
            usedMaxTotalAmt: null,
            parsonalUsedMaxCnt: 30,
            parsonalUsedMaxTotalAmt: null,
            usedExpectedAmt: null,
            yearEndDatetime: "2022-03-31",
            useStopFlg: "0",
            subsidySts: "02",
            requestDate: "2022-02-07",
            requestUserId: "307",
            approvalDate: "2022-02-07",
            approvalUserId: "339",
            minChargeAmt: null,
            usedFormDiv: "02",
            costUnderChargeableFlg: "1",
            multipleUnusableFlg: "0",
            priceList: [
              {
                subsidyPriceId: "P000000561",
                subsidyDetailId: "D000000591",
                priceType: "一律",
                limApplicableDateFrom: "2022-02-07",
                limApplicableDateTo: "2022-03-31",
                price: 5300,
                ageType: "一律"
              }
            ],
            couponInfo: null,
            subsidyClass: "01",
          },
          remainingCount: 30,
          remainingAmount: null,
          scrennDisplayItemList: null
        },
        {
          availableData: {
            subsidyDetailId: "1111",
            dispSubsidyNm: "補助クーポンE",
            subsidyId: "3333",
            receptionDateFrom: "2022-02-01",
            receptionDateTo: "2022-03-31",
            applicableDateFrom: "2022-03-01",
            applicableDateTo: "2022-03-31",
            subsidyType: "02",
            settlementNo: null,
            requestType: "01",
            applicableDegreeCnt: null,
            personAccompanyFlg: "0",
            minTgtAge: null,
            usedLimTerm: "01",
            usedLimUnit: "01",
            usedMaxCnt: null,
            usedMaxTotalAmt: null,
            parsonalUsedMaxCnt: 30,
            parsonalUsedMaxTotalAmt: null,
            usedExpectedAmt: null,
            yearEndDatetime: "2022-03-31",
            useStopFlg: "0",
            subsidySts: "02",
            requestDate: "2022-02-07",
            requestUserId: "307",
            approvalDate: "2022-02-07",
            approvalUserId: "339",
            minChargeAmt: null,
            usedFormDiv: "02",
            costUnderChargeableFlg: "1",
            multipleUnusableFlg: "0",
            priceList: [
              {
                subsidyPriceId: "P000000561",
                subsidyDetailId: "D000000591",
                priceType: "一律",
                limApplicableDateFrom: "2022-02-07",
                limApplicableDateTo: "2022-03-31",
                price: 5000,
                ageType: "一律"
              }
            ],
            couponInfo: null,
            subsidyClass: "01",
          },
          remainingCount: 30,
          remainingAmount: null,
          scrennDisplayItemList: null
        },
        {
          availableData: {
            subsidyDetailId: "4444",
            dispSubsidyNm: "補助クーポンE",
            subsidyId: "4444",
            receptionDateFrom: "2022-02-01",
            receptionDateTo: "2022-03-31",
            applicableDateFrom: "2022-03-01",
            applicableDateTo: "2022-03-31",
            subsidyType: "02",
            settlementNo: null,
            requestType: "01",
            applicableDegreeCnt: null,
            personAccompanyFlg: "0",
            minTgtAge: null,
            usedLimTerm: "01",
            usedLimUnit: "01",
            usedMaxCnt: null,
            usedMaxTotalAmt: null,
            parsonalUsedMaxCnt: 30,
            parsonalUsedMaxTotalAmt: null,
            usedExpectedAmt: null,
            yearEndDatetime: "2022-03-31",
            useStopFlg: "0",
            subsidySts: "02",
            requestDate: "2022-02-07",
            requestUserId: "307",
            approvalDate: "2022-02-07",
            approvalUserId: "339",
            minChargeAmt: null,
            usedFormDiv: "02",
            costUnderChargeableFlg: "1",
            multipleUnusableFlg: "0",
            priceList: [
              {
                subsidyPriceId: "P000000561",
                subsidyDetailId: "D000000591",
                priceType: "一律",
                limApplicableDateFrom: "2022-02-07",
                limApplicableDateTo: "2022-03-31",
                price: 5000,
                ageType: "一律"
              }
            ],
            couponInfo: null,
            subsidyClass: "01",
          },
          remainingCount: 30,
          remainingAmount: null,
          scrennDisplayItemList: null
        },
      ]
    }
  }
};
export default mockData;
