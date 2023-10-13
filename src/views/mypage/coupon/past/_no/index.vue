<template>
  <div class="p-mypage-order-detail-l-container">
    <div class="p-mypage-order-detail">
      <div class="right-container">
        <div class="box-right">
          <header class="p-mypage-order-detail-title">
            <h1>クーポン詳細</h1>
            <div class="divider divider-title" />
            <div class="flex justify-between ">
              <div class="back" @click="goBack">
                <Icon class="arrow_left" name="arrow_left" />
                <a class="text-black">マイクーポンに戻る</a>
              </div>
              <div class="back">
                <img class="size-img" src="./img/qa.png" />
                <a class="text-black ml-1">クーポンの利用方法</a>
              </div>
            </div>
          </header>
          <div>
            <div class="c-card__header c-card__header">
              <div class="c-card__inner4">
                <CouponDetailTop :item="couponDetail" />
              </div>
            </div>
          </div>

          <div class="text-center" v-if="couponDetail && couponDetail.expireTo">
            <span>{{ descriptionCoupon }}</span>
            <div class="bg-gray mt-6 p-2">
              <span class="font-bold"
                >有効期限：{{
                  $moment(couponDetail.expireTo).format("YYYY年MM月DD日")
                }}</span
              >
            </div>
          </div>
          <div v-for="(item, index) in couponCodeList" :key="`status-${index}`">
            <div class="bg-gray mt-2 p-8 text-center">
              <div
                class="img-center mb-4"
                v-if="item.usedFlag === CONST.MY_COUPON_USED_FLAG.UNUSED && item.disableFlag === CONST.MY_COUPON_DISABLE_FLAG.ENABLED"
              >
                <img src="./img/expried.png" />
              </div>
              <div
                class="img-center mb-4"
                v-if="item.usedFlag === CONST.MY_COUPON_USED_FLAG.UNUSED && item.disableFlag === CONST.MY_COUPON_DISABLE_FLAG.DISABLED"
              >
                <img src="./img/notused.png" />
              </div>
              <div
                class="img-center mb-4"
                v-if="item.usedFlag === CONST.MY_COUPON_USED_FLAG.USED && item.disableFlag === CONST.MY_COUPON_DISABLE_FLAG.ENABLED"
              >
                <img src="./img/used.png" />
              </div>
              <span
                >デジポンコードID
                <span class="font-bold">{{ item.digiNo }}</span></span
              >
            </div>
          </div>

          <div class="back" @click="showModalDelete">
            <img class="size-img" src="./img/delete.png" />
            <a class="ml-2 text-black">削除する</a>
          </div>
          <div class="mt-4" v-if="description">
            <h3 class="c-title2">クーポン詳細</h3>
            <div>
              {{ description.description.couponDtl }}
            </div>
          </div>
          <div class="mt-4" v-if="description">
            <h3 class="c-title2">ご利用の流れ</h3>
            <div>
              {{ description.description.couponUseFlow }}
            </div>
          </div>
          <div
            v-if="importantPoints && importantPoints.length > 0"
            class="mt-4"
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
          <div class="mt-4">
            <h3 class="c-title2">お申込み情報</h3>
            <ul>
              <li v-if="userData.ssoCustomerNo">
                会員ID：<span wovn-ignore>{{ userData.ssoCustomerNo }}</span>
              </li>
              <li v-if="userData.familyName || userData.firstName">
                会員氏名：<span wovn-ignore>{{ userName }}</span>
              </li>
              <li v-if="couponDetail && couponDetail.acptNo">
                受付番号：{{ couponDetail.acptNo }}
              </li>
            </ul>
          </div>
          <div class="mt-4">
            <h3 class="c-title2">カスタマイズ項目枠</h3>
            <div>
              自由に設定できる項目です
            </div>
          </div>
          <div class="p-mypage-coupon__footer">
            <div class="p-mypage-coupon__footer__prev">
              <div
                class="p-mypage-content__buttons p-mypage-content__buttons--mb2"
              >
                <div class="c-buttonWrap">
                  <ButtonLink
                    @click.native="goBackMyCoupon"
                    style-type="primary"
                    color="color3"
                    >マイクーポンに戻る</ButtonLink
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Modal ref="delete-coupons" width-size="M" :closeBtn="true">
      <div class="c-modal__sp-contain c-modal__sp-contain--isVisible-Title">
        <div>
          <h4 class="c-title3 c-modal__sp-contain__fixedText">
            クーポンを削除します。 <br />よろしいですか？
          </h4>
        </div>
        <div class="c-buttons">
          <div class="c-buttons__inner">
            <div class="c-buttonWrap4">
              <Button
                style-type="primary"
                color="color4"
                @click.native="hideModal('delete-coupons')"
              >
                キャンセル
              </Button>
            </div>
          </div>
          <div class="c-buttons__inner">
            <div class="c-buttonWrap4">
              <Button
                style-type="primary"
                color="color2"
                @click.native="deleteItems()"
              >
                削除する
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  data() {
    return {
      couponDetail: null,
      importantPoints: null,
      description: null,
      couponCodeList: [],
      mypageDisplayCode: "",
    };
  },
  mounted() {
    this.setBreadcrumb();
    this.getCouponDetail();
    this.$page.isTitle = false;
  },
  computed: {
    mypageDisplayCode() {
      return this.getMypageDisplayCode(location.origin);
    },
    domainMypage() {
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
    descriptionCoupon() {
      let descriptionCouponExpried = "";
      let descriptionCouponNotUsed = "";
      let descriptionCouponUsed = "";
      const couponCodeList = this.couponCodeList;
      couponCodeList.forEach((item) => {
        if (item.usedFlag === this.CONST.MY_COUPON_USED_FLAG.UNUSED && item.disableFlag === this.CONST.MY_COUPON_DISABLE_FLAG.ENABLED) {
          descriptionCouponExpried = "対象期間前のためご利用できません";
        }
        if (item.usedFlag === this.CONST.MY_COUPON_USED_FLAG.UNUSED && item.disableFlag === this.CONST.MY_COUPON_DISABLE_FLAG.DISABLED) {
          descriptionCouponNotUsed = "このクーポンは有効期限が終了しました";
        }
        if (item.usedFlag === this.CONST.MY_COUPON_USED_FLAG.USED && item.disableFlag === this.CONST.MY_COUPON_DISABLE_FLAG.ENABLED) {
          descriptionCouponUsed = "ご利用ありがとうございました";
        }
      });
      return (
        descriptionCouponUsed ||
        descriptionCouponNotUsed ||
        descriptionCouponExpried
      );
    }
  },
  methods: {
    async getCouponDetail() {
      const { id } = this.$route.params;
      let param = {
        acptNo: id
      };
      await this.$mypage.getCouponDetail(param);
      this.couponDetail = this.$mypage.couponDetail;
      this.importantPoints = this.$mypage.importantPoints || [];
      this.description = JSON.parse(this.couponDetail.description);
      this.couponCodeList = this.couponDetail.couponCodeList;
      const menuNm = this.couponDetail?.menuNm || "";
      this.$page.setBreadcrumb(this.$page.formatBreadcrumb(menuNm));
    },
    showModal(name) {
      this.$refs[name].show();
    },
    hideModal(name) {
      this.$refs[name].hide();
    },
    showModalDelete() {
      this.showModal("delete-coupons");
    },
    async deleteItems() {
      this.$loading.startProcessing();
      try {
        let params = {
          acptNoList: this.couponDetail.acptNo ? [this.couponDetail.acptNo] : [],
          deleteFlag: 1,
          menuPlanList: this.couponDetail.acptNo ? [] : [
            {
              menuNo: this.couponDetail.menuNo,
              planId: this.couponDetail.planId
            }
          ]
        };
        const res = await this.$repositories("mypage").deleteMycoupon(params);
        console.log("-------->deleteItems: ", res);
        this.goBack();
      } catch (e) {
        console.error(e);
      } finally {
        this.hideModal("delete-coupons");
        this.$loading.finishProcessing();
      }
    },
    goBack() {
      this.$router.push("/mypage/coupon/past/?sort=getCouponDatetime");
    },
    goBackMyCoupon() {
      this.$router.push("/mypage/coupon/?sort=getCouponDatetime");
    },
    setBreadcrumb() {
      this.$page.setBreadcrumb(
        this.$page.formatBreadcrumb("マイページ", "/mypage")
      );
      this.$page.setBreadcrumb(this.$page.formatBreadcrumb("マイクーポン"));
    }
  }
};
</script>

<style lang="scss" scoped>
.bg-gray {
  background-color: #f2f2f2;
}

.img-center {
  text-align: -webkit-center;
}

ul.number {
  @apply ml-4;
  list-style-type: number;
}

ul.circle {
  @apply ml-4;
  list-style-type: circle;
}

.size-img {
  width: 15px;
  height: 15px;
}
</style>
