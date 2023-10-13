<template>
  <section
    v-if="!apiIsLoading"
    class="
      p-mypage-content
      p-mypageContent--lg
      p-mypage-coupon p-mypage-coupon--show
    "
  >
    <div class="p-mypage-coupon__header">
      <div class="p-mypage-content__navigation">
        <TextButton
          :to="{
            path: '/mypage/coupon',
            query: { sort: 'getCouponDatetime' },
          }"
          size="sm"
          position="left"
        >
          マイクーポンに戻る
          <Icon name="arrow_left" :color="$colors.brand.red" />
        </TextButton>
      </div>

      <div class="c-card">
        <div class="c-card__header c-card__header--bordered">
          <div class="c-card__inner--member">
            <CouponMemberDetailTop :item="detail" />
          </div>
        </div>

        <div class="c-card__content">
          <div class="c-card__inner-member">
            <div
              class="
                p-mypage-coupon-detail__code p-mypage-coupon-detail__code--show
              "
            >
              <div class="p-mypage-coupon-detail__code__title">
                <h3 v-html="codeTitle" />
                <div
                  v-if="errorText"
                  class="p-mypage-coupon-detail__code__error"
                >
                  <Icon name="alert" color="#CC0621" />
                  <p>コードを表示できません。</p>
                  <p>お手数ですが、ページを読み込み直してください。</p>
                </div>
              </div>
              <!-- ===========================================
                  ここから 会員証クーポンリスト(couponId=3,4)
              ============================================ -->

              <div class="p-mypage-coupon-membership">
                <div v-if="detail.codeDataImage" class="p-mypage-coupon-membership__coupon-image">
                  <img :src="detail.codeDataImage"/>
                </div>
                <div class="c-card c-card--gray">
                  <div class="p-mypage-coupon-membership__user c-card__inner">
                    <div
                      class="
                        p-mypage-coupon-membership__user__icon
                        flex
                        justify-center
                        items-center
                      "
                    >
                      <!-- <Icon name="other_memberId" /> -->
                      <div class="member-card-icon"></div>
                      <h2 class="p-mypage-coupon-membership__user__title">
                        会員証クーポン
                      </h2>
                    </div>
                    <div class="p-mypage-coupon-membership__user__number">
                      <p>会員ID:</p>
                      <p
                        class="p-mypage-coupon-membership__user__info__value"
                        wovn-ignore
                      >
                        {{ userData.ssoCustomerNo }}
                      </p>
                    </div>
                    <div class="p-mypage-coupon-membership__user__name">
                      <p>会員氏名:</p>
                      <p
                        v-if="userData.familyName || userData.firstName"
                        class="p-mypage-coupon-membership__user__info__value"
                        wovn-ignore
                      >
                        {{ userName }} 様
                      </p>
                      <p
                        v-else
                        class="p-mypage-coupon-membership__user__info__value"
                      >
                        氏名未設定
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <ul class="p-mypage-coupon-membership__menu__coupon-list">
                    <li
                      v-for="(benefit, index) in couponMemberBenefits"
                      :key="benefit.memberBenefitsId"
                      class="c-card c-card--lightYellow"
                    >
                      <div class="c-card__inner flex-col items-center">
                        <div
                          class="
                            p-mypage-coupon-membership__menu__coupon-list-icon
                          "
                        >
                          <Icon name="mycoupon" />
                          <p>特典{{ index + 1 }}</p>
                        </div>
                        <p>
                          <span class="menu__coupon__benefits">
                            {{ benefit.benefitHeading
                            }}{{ benefit.benefitContent }}
                          </span>
                        </p>
                      </div>
                    </li>
                  </ul>

                  <div class="p-mypage-coupon-detail__code__expiration">
                    <p>現在時刻:{{ currentTime }}</p>
                  </div>
                  <div class="p-mypage-coupon-detail__text">
                    <div class="p-mypage-coupon-detail__info c-card__content">
                      <div v-if="couponDescription.couponDtl">
                        <h3 class="c-title2 text-xl sm:text-base">クーポン詳細</h3>
                        <p class="p-mypage-coupon__description">
                          {{ couponDescription.couponDtl }}
                        </p>
                      </div>
                      <div v-if="couponDescription.couponUseFlow">
                        <h3 class="c-title2 text-xl sm:text-base">ご利用の流れ</h3>
                        <p class="p-mypage-coupon__description">
                          {{ couponDescription.couponUseFlow }}
                        </p>
                      </div>
                      <!-- <div class="c-card__inner4">
                        <h3 class="c-title2">注意事項</h3>
                        <p>
                          {{ couponDescription.usageNotes }}
                        </p>
                      </div> -->
                    </div>
                  </div>
                  <div class="p-mypage-coupon-membership__menu__usages">
                    <div class="p-mypage-coupon-membership__menu__usage">
                      <p>
                        ご利用人数
                        <span
                          class="p-mypage-coupon-membership__menu__usage__label"
                          >{{ detail.userCount }}名</span
                        >
                      </p>
                    </div>
                  </div>
                  <div class="p-mypage-coupon-membership__menu__published">
                    <p>発行元： 株式会社ベネフィット・ワン</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="c-card__inner--member c-card__inner--member--last-card">
            <div class="c-title2 text-xl sm:text-base">
              <h2>お申込み情報</h2>
            </div>
            <p v-if="userData.ssoCustomerNo" wovn-ignore>会員ID：{{ userData.ssoCustomerNo }}</p>
            <p v-if="userData.familyName || userData.firstName" wovn-ignore>会員氏名：{{ userName }}</p>
            <p v-else wovn-ignore>会員氏名：氏名未設定</p>
            <p v-if="detail.acptNo">受付番号：{{ detail.acptNo }}</p>
          </div>
        </div>
      </div>
      <div>
        <TextButton
          :to="{
            path: '/mypage/coupon',
            query: { sort: 'getCouponDatetime' },
          }"
          size="sm"
          position="left"
        >
          マイクーポンに戻る
          <Icon name="arrow_left" :color="$colors.brand.red" />
        </TextButton>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    menuNo: "",
    planId: "",
    apiIsLoading: "",
    detail: {
      isValid: 1,
      contents: {
        usage: "",
        notice: "",
        info: "",
        customize: "",
        image: "",
      },
    },
    barcode_src: [],
    mogiri: false,
    errorText: false,
    currentTime: "2020/11/24 12:34:56",
    timer: null,
    callApi: {},
    debugCallTime: 5, // 一旦繰り返し処理するAPIの回数
  }),

  computed: {
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
    isDisabled() {
      return Number(this.$route.query.isValid) === 0 ? true : false;
    },
    codeTitle() {
      let value = "";
      if (this.isDisabled) {
        value = `ご利用ありがとうございました`;
      } else {
        value = `マイクーポンからいつでもご利用いただけます`;
      }
      return value;
    },
    couponDescription() {
      if (!this.detail || !this.detail.description) return {};
      let json_decode = JSON.parse(this.detail.description);
      return json_decode.description || json_decode;
    },
    // couponcustomer() {
    //   if (!this.detail || !this.detail.customer) return {};
    //   return this.detail.customer;
    // },
    couponCustumItem() {
      if (!this.couponDescription || !this.couponDescription.custumItem)
        return {};
      return this.couponDescription.custumItem;
    },
    couponMemberBenefits() {
      if (!this.couponDescription || !this.couponDescription.memberBenefits)
        return {};
      return this.couponDescription.memberBenefits;
    },
  },

  async created() {
    this.checkQueryParamExists();
    this.apiIsLoading = true;
    this.getList();
    if (this.detail.error) {
      this.errorText = true;
    }
    // console.log('this.apiStatus >>> ', this.apiStatus);
    // setTimeout(() => {this.apiStatus = ''}, 2000);
  },

  async mounted() {
    this.setBreadcrumb();
    if (!!this.$route.query.isValid) {
      this.mogiri = true;
    }
    this.timeCounter();
  },

  beforeDestroy() {
    this.$page.isPageHeader = true;
    this.$page.isSubHeader = false;
    this.$page.showFooterMenu = true;
    this.$page.showSideMenu = true;
    this.timeCounterStop;
  },

  watch: {
    $route() {
      this.$page.isPageHeader = false;
      this.$page.isSubHeader = true;
      this.$page.showFooterMenu = true;
      this.$page.showSideMenu = false;
      if (!!this.$route.query.isValid) {
        this.mogiri = true;
      }
    },
  },

  methods: {
    getList() {
      let myCouponDetail = async () => {
        let params = {
          menuNo: this.menuNo,
          planId: this.planId,
          // type: (this.menuNo % 9) + 1 // デバッグ用
          // count: count,
        };
        const res = await this.$repositories("mypage").getMyCouponDetail(
          params
        );
        if (res.isError) {
          clearInterval(this.callApi);
          this.$router.push("/error");
          return;
        }
        this.detail = res.data;

        this.debugCallTime--;
        // 会員証データが存在するかどうかの検証
        let data = Object.keys(this.detail) || [];
        let isMemberDataExits = data.length > 0;

        // TODO：判定出来た後の処理
        if (isMemberDataExits) {
          this.detail.isValid = Number(this.$route.query.isValid) === 0 ? 0 : 1;
          this.apiIsLoading = false;
          clearInterval(this.callApi);
          // 判定された後にmetaを設定する
          //this.$meta.setDocumentTitle("クーポン利用（会員証クーポン）");
          return;

          // 規定時間を経過（現状は debugCallTime 秒）
        } else if (this.debugCallTime == -1) {
          console.log("会員証データの取得に失敗しました");
          clearInterval(this.callApi);
          this.$router.push("/error");
          return;
        }
      };
      this.callApi = setInterval(myCouponDetail, 1000);
    },
    print() {
      window.print();
    },
    timeCounter() {
      let renewTime = () => {
        let now = this.$moment();
        this.currentTime = now.format("YYYY/MM/DD HH:mm:ss");
      };
      this.timer = setInterval(renewTime, 1000);
    },
    timeCounterStop() {
      clearInterval(this.timer);
    },
    checkQueryParamExists() {
      this.menuNo = this.$route.query.menuNo;
      this.planId = this.$route.query.planId;
      if (!this.menuNo || !this.planId) {
        // 当ページはクエリパラメータ必須のため、存在しない場合は404 not foundへ遷移する
        this.$router.push("/404");
      }
    },
    // パンくずリストの取得
    setBreadcrumb() {
      this.$page.setBreadcrumb(
        this.$page.formatBreadcrumb("マイページ", "/mypage")
      );
      this.$page.setBreadcrumb(
        this.$page.formatBreadcrumb("マイクーポン", "/mypage/coupon")
      );
      this.$page.setBreadcrumb(this.$page.formatBreadcrumb("クーポン利用"));
    },
  },
};
</script>

<style lang="scss" scoped>
#coupon_barcode {
  width: 156px;
  margin: auto;
}

.p-mypage {
  &-coupon {
    &-detail {

      &__code__title {
        > h3 {
          font-size: 15px;

          @include mq() {
            font-size: 13px;
          }
        }
      }

      &__text {
        margin-right: 40px;
        margin-left: 40px;
        text-align: left;
        font-size: 12px;
        li {
          margin-bottom: 0 !important;
        }

        @include mq() {
          margin-right: 12px;
          margin-left: 12px;
          font-size: 10px;
        }
      }
    }

    &-membership {
      border-bottom: 1px solid #CACCCF;
      &__user {
        &__title {
          margin-left: 12px;
        }

        &__number {
          p:first-of-type {
            font-size: 15px;

            @include mq() {
              font-size: 13px;
            }
          }

          p:nth-of-type(2) {
            font-size: 20px;

            @include mq() {
              font-size: 16px;
            }
          }
        }

        &__name {
          p:first-of-type {
            font-size: 15px;

            @include mq() {
              font-size: 13px;
            }
          }

          p:nth-of-type(2) {
            font-size: 20px;

            @include mq() {
              font-size: 16px;
            }
          }
        }
      }

      &__menu {
        &__usage {
          margin-top: 20px;
          margin-left: 40px;
          font-size: 15px;
          
          @include mq() {
            margin-left: 12px;
            font-size: 13px;
          }
        }

        &__coupon-list {
          width: 100%;

          &-icon {
            .c-icon {
              width: 5rem;
              height: 5rem;

              @include mq() {
                width: 48px;
                height: 48px;
              }
            }

            p {
              font-size: 15px;
            }
          }
        }

        &__published {
          width: 400px;
          text-align: center;
          margin: 24px auto 32px;
          padding: 0;

          > p {
            height: 48px;
            line-height: 48px;
            font-size: 15px;
          }

          @include mq() {
            width: 93%;

            > p {
              height: 37px;
              line-height: 37px;
              font-size: 13px;
            }
          }
        }
      }
    }

    &-detail__code__expiration {
      width: 55%;
      margin-right: auto;
      margin-left: auto;

      @include mq() {
        margin-top: -10px;
        width: 93%;
      }
    }
  }
}

.menu__coupon__benefits {
  font-size: 20px;
  font-weight: bold;
  color: #dd0000;

    @include mq() {
      font-size: 16px;
    }

}

.c-card {
  margin-bottom: 16px;

  &__inner {
    padding: 40px;

    @include mq() {
      padding: 24px;
    }

    &--member {
      padding: 32px 40px;
      border-bottom: 1px solid #CACCCF;

      @include mq() {
        padding: 20px 13px 24px;
      }

      &--last-card {
        padding-top: 0px;
        padding-bottom: 32px;
        font-size: 12px;
        
        @include mq() {
          font-size: 10px;
        }
      }
    }   
  }

  &--gray {
    box-sizing: border-box;
    width: 55%;
    min-height: 262px;
    margin-right: auto;
    margin-left: auto;
    background-color: #e7e7e7;
    box-shadow: 0px 0px 6px #00000029;
    border-radius: 8px;

    @include mq() {
      width: 93%;
      min-height: 0;
    }
  }

  &--lightYellow {
    width: 55%;
    min-height: 262px;
    margin-right: auto;
    margin-left: auto;
    box-shadow: 0px 0px 6px #00000029;
    border-radius: 8px;

    @include mq() {
      width: 93%;
      min-height: 0;
    }
  }
}

.title-box {
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    h2 {
      font-size: 20px;
      font-weight: bold;
      @media only screen and (max-width: 639px) {
        font-size: 16px;
      }
    }
    &.v-line:before {
      background-color: #E60021;
      margin-right: 11px;
      content: '';
      width: 16px;
      height: 7px;
      --tw-bg-opacity: 1;

      @include mq() {
        width: 10px;
        height: 4px;
      }
    }
  }

  .member-card-icon {
    width: 40px;
    height: 38px;
    border-radius: 3px;
    background-color: #FFAFAF;

    @include mq() {
      width: 36px;
      height: 23px;
    }
  }
</style>
