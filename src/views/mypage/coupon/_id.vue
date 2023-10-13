<template>
  <div>
    <LoadingContent v-if="isLoading" />
    <div
      v-if="!isLoading"
      class="p-mypage-content p-mypage-coupon p-mypage-coupon--detail"
    >
      <div class="p-mypage-coupon__header">
        <ul class="p-mypage-content__navigation">
          <li>
            <TextButton
              :to="{
                path: '/mypage/coupon',
                query: { sort: 'getCouponDatetime' }
              }"
              size="sm"
              position="left"
            >
              マイクーポンに戻る<Icon
                name="arrow_left"
                :color="$colors.brand.red"
              />
            </TextButton>
          </li>
        </ul>

        <div class="c-card">
          <div class="c-card__header c-card__header--bordered">
            <div class="c-card__inner4">
              <CouponDetailTop :item="detail" />
            </div>
            <!-- /.c-card__inner4 -->
          </div>
          <!-- /.c-card__header -->

          <div class="c-card__content">
            <div class="c-card__inner4">
              <div class="p-mypage-coupon-detail__coupons">
                <h3
                  v-if="detail.expireTo || detail.expireFrom"
                  class="c-title7"
                >
                  {{ dateLabel }}
                  <strong>
                    {{ dateValue }}
                  </strong>
                </h3>

                <ul ref="couponsList" class="p-mypage-content__list">
                  <li
                    v-for="(item, i) in detail.couponCodeList"
                    :key="i"
                    :class="getCouponStateClass(item)"
                  >
                    <div
                      class="p-mypage-coupon-detail__coupon__checkbox flex justify-center"
                    >
                      <FormsCheckbox
                        v-model="item.selectedValue"
                        :label="item.title"
                        :disabled="
                          item.disableFlag ==
                            CONST.MY_COUPON_DISABLE_FLAG.DISABLED ||
                            item.usedFlag == CONST.MY_COUPON_USED_FLAG.USED
                        "
                      />
                    </div>
                    <div
                      v-if="item.usedFlag"
                      class="p-mypage-coupon-detail__coupon__state"
                    >
                      <span>利用済</span>
                    </div>
                    <div
                      v-if="item.disableFlag"
                      class="p-mypage-coupon-detail__coupon__state"
                    >
                      <span>利用不可</span>
                    </div>
                  </li>
                </ul>

                <div
                  class="p-mypage-coupon-detail__alert"
                  v-if="error.isSelected"
                >
                  <h3>
                    <span>
                      <Icon
                        name="alert"
                        color="#CC0621"
                        width="20"
                        height="20"
                        class="p-mypage-coupon-detail__alert__icon"
                      ></Icon
                      >クーポン・チケットが選択されていません
                    </span>
                  </h3>
                </div>

                <div class="p-mypage-content__buttons">
                  <div class="c-buttonWrap3">
                    <Button
                      style-type="primary"
                      color="color1"
                      @click.native="selectedUsedCoupon"
                      >選択したクーポンを利用する</Button
                    >
                  </div>
                </div>
                <!-- /.p-mypage-content__buttons -->
              </div>
              <!-- /.p-mypage-coupon-detail__coupons -->
            </div>
            <!-- /.c-card__inner4 -->
          </div>
          <!-- /.c-card__content -->

          <div class="c-card__content">
            <div v-if="couponDescription.couponDtl" class="c-card__inner4">
              <h3 class="c-title2">クーポン詳細</h3>
              <p
                class="p-mypage-coupon__description"
                v-html="urlStringToLink(couponDescription.couponDtl)"
              />
            </div>
            <!-- /.c-card__inner4 -->

            <div v-if="couponDescription.couponUseFlow" class="c-card__inner4">
              <h3 class="c-title2">ご利用の流れ</h3>
              <p
                class="p-mypage-coupon__description"
                v-html="urlStringToLink(couponDescription.couponUseFlow)"
              />
            </div>
            <!-- /.c-card__inner4 -->

            <div
              v-if="importantPoints && importantPoints.length > 0"
              class="c-card__inner4"
            >
              <h3 class="c-title2">注意事項</h3>
              <div v-for="(importantPoint, i) in importantPoints" :key="i">
                <p
                  v-if="importantPoint.title"
                  v-html="$utils.htmlText(importantPoint.title)"
                  class="p-mypage-coupon__description"
                ></p>
                <p
                  v-if="importantPoint.content"
                  v-html="$utils.htmlText(importantPoint.content)"
                  class="p-mypage-coupon__description"
                ></p>
                <p
                  v-if="importantPoint.linkUrl && importantPoint.linkNm"
                  class="p-mypage-coupon__description"
                >
                  <a :href="importantPoint.linkUrl">
                    {{ importantPoint.linkNm }}
                  </a>
                </p>
              </div>
            </div>
            <!-- /.c-card__inner4 -->

            <div class="c-card__inner4">
              <h3 class="c-title2">お申込み情報</h3>
              <ul>
                <li v-if="userData.ssoCustomerNo" wovn-ignore>
                  会員ID：<span>{{ userData.ssoCustomerNo }}</span>
                </li>
                <li
                  v-if="userData.familyName || userData.firstName"
                  wovn-ignore
                >
                  会員氏名：{{ userName }}
                </li>
                <li v-else wovn-ignore>
                  会員氏名：氏名未設定
                </li>
                <li v-if="detail.acptNo">受付番号：{{ detail.acptNo }}</li>
              </ul>
            </div>
            <!-- /.c-card__inner4 -->

            <div
              v-if="
                Object.keys(couponCustumItem).length != 0 &&
                  (couponCustumItem.custumItemTitle ||
                    couponCustumItem.custumItemCont)
              "
              class="c-card__inner4"
            >
              <h3 v-if="couponCustumItem.custumItemTitle" class="c-title2">
                {{ couponCustumItem.custumItemTitle }}
              </h3>
              <p
                class="p-mypage-coupon__description"
                v-if="couponCustumItem.custumItemCont"
              >
                {{ couponCustumItem.custumItemCont }}
              </p>
              <!-- <p>
              {{ detail.contents.customize }}
            </p> -->
            </div>
            <!-- /.c-card__inner4 -->
          </div>
          <!-- /.c-card__content -->
        </div>
        <!-- /.c-card -->
      </div>
      <!-- /.p-mypage-coupon__header -->

      <div class="p-mypage-coupon__footer">
        <div class="p-mypage-content__navigation">
          <TextButton
            :to="{
              path: '/mypage/coupon',
              query: { sort: 'getCouponDatetime' }
            }"
            size="sm"
            position="left"
          >
            マイクーポンに戻る<Icon
              name="arrow_left"
              :color="$colors.brand.red"
            />
          </TextButton>
        </div>
        <!-- /.p-mypage-coupon__footer__prev -->
      </div>
      <!-- /.p-mypage-coupon__footer -->

      <!-- <CouponPassword
        ref="coupon-detail-password"
        :rejectPassword="rejectPassword"
        @submit="submit"
      /> -->
    </div>
  </div>
</template>

<script>
import func_utils from '@/mixins/func_utils';
export default {
  mixins: [func_utils],
  data: () => ({
    isLoading: true,
    acptNo: "",
    detail: {
      contents: {
        usage: "",
        notice: "",
        info: "",
        customize: "",
        image: ""
      }
    },
    importantPoints: [],
    memberBenefits: [],
    paymentTypeList: [
      { value: 1, name: "購入済み" },
      { value: 2, name: "当日払い" },
      { value: 3, name: "過去のクーポン" }
    ],
    rejectPassword: false,
    error: {
      isSelected: false
    }
  }),
  computed: {
    mypageDisplayCode() {
      return this.getMypageDisplayCode(location.origin);
    },
    mypageDomain() {
      return this.getMypageDomain(this.mypageDisplayCode);
    },
    userData() {
      if (!this.$auth || !this.$auth.user) return "";
      return this.$auth.user;
    },
    userName() {
      if (!this.userData) {
        return "";
      } else if (this.userData.familyName && this.userData.firstName) {
        return this.userData.familyName + " " + this.userData.firstName;
      } else {
        return this.userData.familyName || this.userData.firstName;
      }
    },
    /**
     * 期限終了日が存在しないか、クーポンがデジタルチケットかつ、販売在庫期間指定が指定有りの場合"利用日 :"を返す
     * 期限終了日が存在する場合は"有効期限 :"を返す
     * @returns { string }
     */
    dateLabel() {
      return (this.isTicketAndSaleStock || !this.detail.expireTo)
        ? "利用日 :"
        : "有効期限 :";
    },
    /**
     * クーポンがデジタルチケットかつ、販売在庫期間指定が指定有りの場合、期限終了日（利用日）をYYYY年MM月DD日で返す
     * 期限終了日が存在する場合、期限終了日をYYYY年MM月DD日で返す
     * 期限終了日が存在しない場合、期限開始日をYYYY年MM月DD日〜で返す
     * @returns { string }
     */
    dateValue() {
      const { expireTo, expireFrom } = this.detail

      // クーポンがデジタルチケットかつ、販売在庫期間指定が指定有り
      if (this.isTicketAndSaleStock) {
        // 販売在庫期間指定が指定有りの場合、有効期限開始が選択日の00:00:00,有効期限終了が同日の23:59:59となる。
        // 表示はYYYY年MM月DD日の形式であるため、expireTo、expireFromどちらを使用しても問題ない。
        return this.$moment(expireTo).format("YYYY年MM月DD日")
      }

      // 期限終了日が存在する
      if (expireTo) {
        return this.$moment(expireTo).format("YYYY年MM月DD日")
      }

      // 期限終了日が存在しないかつ、期限開始日が存在する
      if (!expireTo && expireFrom) {
        return this.$moment(expireFrom).format("YYYY年MM月DD日") + "〜"
      }

      return ""
    },
    couponDescription() {
      if (!this.detail || !this.detail.description) return {};
      let json_decode = JSON.parse(this.detail.description);
      return json_decode.description || json_decode;
    },
    couponCustumItem() {
      if (!this.couponDescription || !this.couponDescription.custumItem)
        return {};
      return this.couponDescription.custumItem;
    },
    selectedCoupon() {
      const count = this.detail.couponCodeList.filter((x) => x.selectedValue);
      return count.length;
    },
    /**
     * クーポンがデジタルチケットかつ、販売在庫期間指定が指定有りの場合trueを返す。
     * @returns { boolean }
     */
    isTicketAndSaleStock() {
      let isDigitalTicket = false;
      let isSaleStockTerm = false;

      // クーポンがデジタルチケットかどうか
      if (this.detail.kind === this.CONST.MY_COUPON_KIND.DIGITAL_TICKET) {
        isDigitalTicket = true;
      }

      // 販売在庫期間が指定有りかどうか（"0": 期間指定なし "1": 期間指定あり）
      if (this.memberBenefits?.saleStockTermFlag === "1") {
        isSaleStockTerm = true
      }

      return isDigitalTicket && isSaleStockTerm;
    }
  },
  created() {
    this.acptNo = this.$route.params.id;
    this.$mypage.removeCouponDetail();
  },
  async mounted() {
    this.$page.showSideMenu = true;
    this.$page.isTitle = true;
    await this.getList();
    this.isLoading = false;
    // this.$meta.setDocumentTitle(
    //   "マイクーポン | " + this.detail.menuNm + "（" + this.detail.planNm + "）"
    // );
    this.setBreadcrumb(this.detail.menuNm);
  },
  methods: {
    async getList() {
      // マイクーポン詳細情報を取得していない場合はAPI通信を行い取得する
      if (!this.$mypage.CouponDetailExists()) {
        let param = {
          acptNo: this.acptNo,
        };
        await this.$mypage.getCouponDetail(param);
      }
      // クーポン情報を取得できなかった場合
      if (!this.$mypage.CouponDetailExists()) return;

      this.detail = this.$mypage.couponDetail;

      // 注意事項
      this.importantPoints = this.$mypage.importantPoints;

      this.memberBenefits = this.$mypage.memberBenefits;
    },
    getPaymentTypeName(type) {
      if (!paymentType) return "";
      let res = this.paymentTypeList.find((x) => x.value === type);
      return res.name;
    },
    // showModal(name) {
    //   this.error.isSelected = false;
    //   let selected = this.selectedCouponList();
    //   // 未選択時エラー
    //   if (selected.length == 0) {
    //     this.error.isSelected = true;
    //     return;
    //   }
    //   this.$refs[name].showModal(name);
    // },
    // async submit(e) {
    //   this.$loading.startProcessing();
    //   let params = {
    //     password: e.value,
    //     menuNo: this.detail.menuNo,
    //     planId: this.detail.planId
    //   };
    //   const res = await this.$repositories(
    //     "mypage"
    //   ).postTicketCollectorPassword(params);

    //   if (res.isError) {
    //     this.rejectPassword = true;
    //   } else {
    //     this.$mypage.passwordAuthenticated();
    //     this.useCoupon();
    //   }
    //   this.$loading.finishProcessing();
    // },
    /**
     * クーポン描画css指定
     */
    getCouponStateClass(couponDetail) {
      return [
        "p-mypage-coupon-detail__coupon",
        {
          "p-mypage-coupon-detail__coupon--used":
            couponDetail.disableFlag == this.CONST.MY_COUPON_DISABLE_FLAG.DISABLED || couponDetail.usedFlag == this.CONST.MY_COUPON_USED_FLAG.USED
        }
      ];
    },
    /**
     * 選択したクーポンを利用するボタン押下時
     */
    selectedUsedCoupon() {
      this.error.isSelected = false;
      let selected = this.selectedCouponList();
      // 未選択時エラー
      if (selected.length == 0) {
        this.error.isSelected = true;
        return;
      }
      let couponIds = selected.join(",");
      // this.$router.push({
      //   path: "/mypage/coupon/show/digi",
      //   query: { acptNo: this.acptNo, couponId: couponIds }
      // });
      window.location.href = `${this.mypageDomain}/mypage/coupon/show/digi?acptNo=${this.acptNo}&couponId=${couponIds}`;
    },
    /**
     * パンくずリスト作成
     */
    setBreadcrumb(menuName = "メニュー名（未設定）") {
      this.$page.setBreadcrumb(
        this.$page.formatBreadcrumb("マイページ", "/mypage")
      );
      this.$page.setBreadcrumb(
        this.$page.formatBreadcrumb(
          "マイクーポン",
          "/mypage/coupon?sort=getCouponDatetime"
        )
      );
      this.$page.setBreadcrumb(this.$page.formatBreadcrumb("クーポン詳細"));
    },

    /**
     * 選択済みクーポンリスト
     */
    selectedCouponList() {
      let selected = [];
      for (let item of this.detail.couponCodeList) {
        if (item.selectedValue) {
          selected.push(item.couponId);
        }
      }

      return selected;
    }
  },
  watch: {
    $route() {
      this.$meta.setDocumentTitle(
        "マイクーポン | " +
          this.detail.menuNm +
          "（" +
          this.detail.planNm +
          "）"
      );
      // パンくずリスト作成
      this.setBreadcrumb(this.detail.menuNm);
    }
  }
};
</script>

<style lang="scss" scoped>
.c-title7 {
  color: #dd0000;
}
</style>
