export default async (context, inject) => {
  inject("mypage", {
    /**
     * マイクーポン
     */
    get couponDetail() {
      return context.store.state.mypage.couponDetail;
    },
    set couponDetail(value) {
      context.store.commit("mypage/couponDetail", value);
    },
    /**
     * マイクーポン：注意事項
     */
    get importantPoints() {
      return context.store.state.mypage.importantPoints;
    },
    set importantPoints(value) {
      context.store.commit("mypage/importantPoints", value);
    },
    /**
     * マイクーポン：memberBenefits
     */
    get memberBenefits() {
      return context.store.state.mypage.memberBenefits;
    },
    set memberBenefits(value) {
      context.store.commit("mypage/memberBenefits", value);
    },
    // クーポン詳細情報取得
    async getCouponDetail(param) {
      const res = await context.$repositories("mypage").getCouponDetail(param);

      // API実行エラーの場合
      if(res.isError) {
        context.router.push('/404');
        return;
      }
      this.couponDetail = res.data.couponDetail;
      this.importantPoints = res.data.importantPoints;
      this.memberBenefits = res.data.memberBenefits;

      // クーポンリスト取得時配列が1つしか無い場合はチェック済みにする
      let selectedValue =
        this.couponDetail.couponCodeList.length == 1 ? true : false;
      // クーポン選択用変数をセット
      for (let item of this.couponDetail.couponCodeList) {
        // 「使用済み」か「使用不可」のフラグがtrueの場合は選択させない
        if(item.usedFlag) {
          item["selectedValue"] = false;
        } else if(item.disableFlag) {
          item["selectedValue"] = false;
        } else {
          item["selectedValue"] = selectedValue;
        }
      }
      // パスワード認証チェック(初期値false)
      this.couponDetail["isPasswordAuthenticated"] = false;
    },
    CouponDetailExists() {
      return this.couponDetail != null;
    },
    removeCouponDetail() {
      context.store.commit("mypage/couponDetail", null);
    },
    passwordAuthenticated() {
      this.couponDetail["isPasswordAuthenticated"] = true;
    },
  });
};
