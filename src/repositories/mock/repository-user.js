
export default {
  /**
   * ユーザー個人情報を取得する
   */
  postUser(boCode) {
    const data = {
      data: {
        ssoIss: "473814310128",
        ssoSub: "http://test",
        ssoSubscriptionId: "ssoSubscriptionId",
        ssoPrincipalFlg: 0,
        ssoCustomerNo: "400000001113436",
        ssoMembrNo: "ssoMembrNo",
        accessToken: "accessToken",
        refreshToken: "refreshToken",
        idToken: "idToken",
        loginFlag: 1,
        priceDiv: 0,
        crmFlag: 0,
        familyName: "ベネフィット",
        firstName: "太郎",
        totalpoint: 0,
        authenticationLevel: 0,
        xbeneUser: "string"
      }
    };
    return new Promise((resolve) => {
      return resolve(data);
    });
  },
  /**
   * ユーザー情報更新
   */
  updateUser() {
    const data = {
      data: {
        userInfo: "dummy",
        isCompleteFirstLogin: false
      }
    };
    return new Promise((resolve) => {
      return resolve(data);
    });
  },

  contractInfo(boCode) {
    const data = {
      data: {
        contractInfo: [
          {
            companyCd: "",
            customerNo: "",
            companyName: "",
            subscriptions: [
              {
                boServiceCode: "BS",
                torinoMembrNo: "xxxx"
              },
              {
                boServiceCode: "SD",
                torinoMembrNo: "xxxx"
              }
            ]
          }
        ]
      }
    };
    return new Promise((resolve) => {
      return resolve(data);
    });
  },

  /**
   * ログインユーザセッション情報を取得する
   */
  userSession() {
    const data = {
      clientId: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      clientSecret: "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
      sub: "e77d4",
      iss: "https://xxxxxxx",
      idToken: "eya",
      refreshToken: "a353",
      expiresIn: "3600",
      authTime: 1650117599,
      subscriptionCustomers: {
        personalId: "wA0dUa",
        employeeId: "3732f0",
        companyCd: "1234567890",
        companyName: "営業確認用（世田谷区）",
        customerNo: 123456789012345,
        familySerialNumber: "0",
        subscriptions: [
          {
            "subscriptionId": 123456,
            "boServiceCode": "BS",
            "torinoMemberNo": 449922000000000,
            "family": []
          }
        ]
      },
      courseId: "A",
      divideCode: null,
      familyName: "金子",
      familyNameKana: "タナカ",
      firstName: "仁",
      firstNameKana: "ハナコ",
      birthday: "2000-08-24T00:00:00.000Z",
      email: "xxxxxxxxxx@t.s.t",
      tel: 1234567890,
      subsidyId: [
        "B000000000",
        "B000000000"
      ],
      priceDiv: 10,
      sex: 1,
      crmFlag: 0,
      userId: "現状 0 固定",
      mypageDisplayCode: "BS",
      mypageBoCode: "BS",
    }
    return new Promise((resolve) => {
      return resolve({data: data});
    });
  },
};
