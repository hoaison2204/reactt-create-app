<template>
  <div>
    <LoadingContent v-if="isLoading" />
    <div
      v-if="!isLoading"
      class="p-mypage-content p-mypageContent--lg p-mypage-coupon p-mypage-coupon--show"
    >
      <!-- <template v-if="!isStatePasswordHidden"> -->
      <template>
        <div class="p-mypage-coupon__header">
          <div class="p-mypage-content__navigation">
            <TextButton
              :to="`/mypage/coupon/${acptNo}`"
              size="sm"
              position="left"
            >
              クーポン詳細に戻る
              <Icon name="arrow_left" :color="$colors.brand.red" />
            </TextButton>
          </div>

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
                <div
                  class="p-mypage-coupon-detail__code p-mypage-coupon-detail__code--show"
                >
                  <div class="p-mypage-coupon-detail__code__title">
                    <h3
                      v-if="codeTitle"
                      v-html="codeTitle"
                      class="c-title5 sm:text-sm"
                    />
                    <div
                      v-if="errorText"
                      class="p-mypage-coupon-detail__code__error"
                    >
                      <Icon name="alert" color="#CC0621" />
                      <p>
                        コードを表示できません。
                      </p>
                      <p>
                        お手数ですが、ページを読み込み直してください。
                      </p>
                    </div>
                    <div class="inline-block">
                      <p
                        v-if="detail.expireTo || detail.expireFrom"
                        class="c-title7 inline-block px-28 py-3 sm:px-12 sm:text-xs"
                      >
                        {{ dateLabel }}
                        {{ dateValue }}
                      </p>
                      <div class="p-mypage-coupon-detail__code__expiration">
                        <p>{{ currentTime }}</p>
                      </div>
                    </div>
                  </div>
                  <!-- /.p-mypage-coupon-detail__code__title -->

                  <!-- =============================================
                    ここから デジチケもぎり
                  ============================================== -->
                  <div v-if="isTicket">
                    <div
                      class="p-mypage-coupon-detail__code__imgWrap--ticket p-mypage-coupon-detail__code__card"
                    >
                      <div
                        v-if="detail.codeDataImage"
                        class="c-card"
                        :class="isUsed ? 'c-card--gray' : 'c-card--lightYellow'"
                      >
                        <div
                          class="p-mypage-coupon-detail__code__img p-mypage-coupon-detail__code__img--ticket c-card__inner center"
                          :class="{
                            'p-mypage-coupon-detail__code__img--disabled': isUsed,
                          }"
                        >
                          <img
                            id="coupon_barcode"
                            :src="detail.codeDataImage"
                            alt=""
                          />
                        </div>
                      </div>
                      <!-- /.p-mypage-coupon-detail__code__img -->
                    </div>

                    <div
                      class="p-mypage-coupon-detail__code__card p-mypage-coupon-detail__code__card--ticket"
                    >
                      <div
                        class="c-card"
                        :class="
                          isUsed ? 'c-card--mogiri-gray' : getLightBgClass()
                        "
                      >
                        <div
                          v-if="isUsed"
                          class="p-mypage-coupon-detail__code__shadow"
                          :class="{
                            'p-mypage-coupon-detail__code__shadow--multiple':
                              selectedCouponList.length > 1,
                          }"
                        ></div>
                        <div
                          class="c-card__inner"
                          :class="{
                            'p-mypage-coupon-detail__code__inner--multiple':
                              isUsed && selectedCouponList.length > 1,
                          }"
                        >
                          <div class="p-mypage-coupon-detail__code__usedIc">
                            <Icon v-if="isUsed" name="coupon_used" />
                          </div>
                          <div class="p-mypage-coupon-detail__code__title2">
                            <div
                              class="p-mypage-coupon-detail__code__list"
                              v-for="(item, i) in selectedCouponList"
                              :key="i"
                            >
                              <h4 class="c-title8 mt-5">
                                {{ item.title }}
                              </h4>

                              <div
                                class="p-mypage-coupon-detail__code__textCode"
                              >
                                <p>
                                  チケット番号 :
                                  <span
                                    class="p-mypage-coupon-detail__nowrap"
                                    >{{ item.digiNo }}</span
                                  >
                                </p>
                              </div>
                            </div>
                            <!-- /.p-mypage-coupon-detail__code__textCode -->
                          </div>
                          <!-- /.p-mypage-coupon-detail__code__title2 -->

                          <p
                            class="p-mypage-coupon-detail__code__note mb-0 mt-5"
                            :class="{
                              'p-mypage-coupon-detail__code__note--multiple':
                                isUsed && selectedCouponList.length > 1,
                            }"
                          >
                            <span v-if="!isUsed">
                              チケットを利用すると、以降このチケットは無効になります。
                            </span>
                          </p>

                          <div
                            v-if="!isUsed"
                            class="p-mypage-coupon-detail__code__used p-mypage-coupon-detail__code__used--mb"
                          >
                            <div
                              class="c-buttonWrap4 mt-1 w-9/12 sm:w-full m-auto mb-5"
                            >
                              <Button
                                style-type="primary"
                                color="color1"
                                @click.native="showModal('ticket-mogiri')"
                                >{{
                                  selectedCouponList.length > 1
                                    ? 'チケットを一括で利用する'
                                    : 'チケットを利用する'
                                }}</Button
                              >
                            </div>
                          </div>
                          <!-- /.p-mypage-coupon-detail__code__used -->
                        </div>
                        <!-- /.c-card__inner -->
                      </div>
                      <!-- /.c-card -->
                    </div>
                  </div>

                  <!-- =============================================
                    ここから デジポン（バーコード, クーポン番号）リスト
                  ============================================== -->
                  <div v-if="isImageCode || isTextcode">
                    <ul class="c-card p-mypage-coupon-detail__code__card">
                      <li
                        v-for="(item, i) in selectedCouponList"
                        :key="i"
                        class="c-card c-card--lightYellow"
                      >
                        <div class="c-card__inner">
                          <div class="p-mypage-coupon-detail__code__title2">
                            <h4 class="c-title6">
                              {{ item.title }}
                            </h4>
                            <!-- <p v-if="barcode_dataList[i]">
                              {{ barcode_dataList[i].outputCodeDataColumn }}
                            </p> -->

                            <template v-if="isTextcode">
                              <p v-if="barcode_dataList[i]">
                                {{ barcode_dataList[i].outputCodeDataColumn }}
                              </p>
                              <div
                                class="p-mypage-coupon-detail__code__textCode"
                              >
                                <div class="c-input c-input--transparent">
                                  <p ref="couponCode" class="coupon-code">{{ item.codeData }}</p>
                                </div>
                              </div>
                            </template>
                          </div>

                          <template v-if="!isUsed && isTextcode">
                            <div class="p-mypage-coupon-detail__code__copy">
                              <div class="c-buttonWrap">
                                <Button
                                  class="py-4 px-16 text-sm"
                                  style-type="tertiary"
                                  color="color1"
                                  @click.native="copy(i)"
                                  >コピーする</Button
                                >
                              </div>
                            </div>

                            <div
                              class="p-mypage-coupon-detail__code__send"
                              v-if="detail && detail.digiPonApplUrl"
                            >
                              <div class="c-buttonWrap3">
                                <Button
                                  style-type="primary"
                                  color="color2"
                                  @click.native="send()"
                                  >お申し込みはこちらから<span
                                    ><Icon
                                      name="action_link"
                                      color="#fff"/></span
                                ></Button>
                              </div>

                              <div>
                                <p>お申し込みは外部サイトになります。</p>
                              </div>
                            </div>
                          </template>

                          <template v-if="isImageCode && item.barcode_src">
                            <div class="p-mypage-coupon-detail__code__imgWrap">
                              <div
                                class="p-mypage-coupon-detail__code__img p-mypage-coupon-detail__code__img--digipon center"
                                :class="{
                                  'p-mypage-coupon-detail__code__img--disabled':
                                    item.usedFlag,
                                }"
                              >
                                <VueQRCodeComponent
                                  v-if="isQRCode && !errorText"
                                  :text="item.qrcode"
                                  :size="280"
                                  class="qr-code"
                                />

                                <img
                                  v-else-if="!errorText"
                                  id="coupon_barcode"
                                  :src="item.barcode_src"
                                  class="coupon-barcode"
                                  alt=""
                                />
                              </div>
                            </div>
                          </template>

                          <div
                            class="p-mypage-coupon-detail__code__sub-code"
                            v-if="
                              isValidSubCoupon(item) &&
                                barcode_dataList[i].outputCodeColumn
                            "
                          >
                            <!-- {{item}} -->
                            <p
                              v-if="
                                isImageCode &&
                                  item.barcode_src &&
                                  barcode_dataList[i].codeData
                              "
                            >
                              <template v-if="barcode_dataList[i].codeData">
                                <span
                                  v-if="
                                    barcode_dataList[i].outputCodeDataColumn
                                  "
                                  >{{
                                    barcode_dataList[i].outputCodeDataColumn
                                  }}
                                  ：</span
                                >
                                <span>{{ barcode_dataList[i].codeData }}</span>
                              </template>
                            </p>
                            <p
                              v-for="(list, index) in barcode_dataList[i]
                                .outputCodeColumn"
                              :key="index"
                              class="text-center"
                            >
                              <template
                                v-if="
                                  list && barcode_dataList[i].codeColumn[index]
                                "
                              >
                                {{ list }} ：
                                <span>{{
                                  barcode_dataList[i].codeColumn[index]
                                }}</span>
                              </template>
                            </p>
                          </div>

                          <div
                            class="p-mypage-coupon-detail__code__main-code"
                            v-if="item.digiNo"
                          >
                            <p>
                              ベネフィット・ステーション管理番号<br />
                              {{ item.digiNo }}
                            </p>
                          </div>
                        </div>
                        <!-- /.c-card__inner -->
                      </li>
                      <!-- /.c-card -->
                    </ul>
                  </div>
                </div>
                <!-- /.p-mypage-coupon-detail__code -->

                <!-- =============== クーポンリスト ここまで ================ -->

                <div class="p-mypage-content__buttons">
                  <div class="c-buttons4 block">
                    <div v-if="isImageCode" class="c-buttons4__inner">
                      <div
                        class="c-buttonWrap4 inline-block w-9/12 m-auto sm:w-full"
                      >
                        <Button
                          style-type="primary"
                          color="color2"
                          @click.native="print()"
                          >印刷する</Button
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <!-- /.p-mypage-content__buttons -->
              </div>
              <!-- /.c-card__inner4 -->
            </div>
            <!-- /.c-card__content -->

            <div class="p-mypage-coupon-detail__info c-card__content">
              <div v-if="couponDescription.couponDtl" class="c-card__inner4">
                <h3 class="c-title2">クーポン詳細</h3>
                <p
                  class="p-mypage-coupon__description"
                  v-html="urlStringToLink(couponDescription.couponDtl)"
                />
              </div>
              <!-- /.c-card__inner4 -->

              <div
                v-if="couponDescription.couponUseFlow"
                class="c-card__inner4"
              >
                <h3 class="c-title2">ご利用の流れ</h3>
                <p
                  class="p-mypage-coupon__description"
                  v-html="urlStringToLink(couponDescription.couponUseFlow)"
                />
              </div>
              <!-- /.c-card__inner4 -->

              <div v-if="importantPoints.length > 0" class="c-card__inner4">
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
                    会員ID：{{ userData.ssoCustomerNo }}
                  </li>
                  <li
                    v-if="userData.familyName || userData.firstName"
                    wovn-ignore
                  >
                    会員氏名：{{ userName }}
                  </li>
                  <li v-else wovn-ignore>会員氏名：氏名未設定</li>
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
          <div class="p-mypage-coupon__footer__prev">
            <div class="p-mypage-content__navigation">
              <TextButton
                :to="`/mypage/coupon/${acptNo}`"
                size="sm"
                position="left"
              >
                クーポン詳細に戻る
                <Icon name="arrow_left" :color="$colors.brand.red" />
              </TextButton>
            </div>
          </div>
        </div>
      </template>

      <Modal
        class="p-mypage-coupon-detail__modal"
        ref="ticket-mogiri"
        width-size="M"
      >
        <div class="c-modal__sp-contain">
          <div class="c-modal__body__inner">
            <div class="p-mypage-coupon-detail__modal__lead">
              <p class="text-xs">
                <b>【現地スタッフ用操作画面】</b>
              </p>
              <p class="c-lead text-xs">
                <b>チケットを利用すると、以降このチケットは無効になります。</b>
              </p>
            </div>
          </div>
          <div class="c-buttons">
            <div class="c-buttons__inner">
              <div class="c-buttonWrap4">
                <Button
                  @click.native="$refs['ticket-mogiri'].hide()"
                  style-type="primary"
                  color="color4"
                >
                  キャンセル
                </Button>
              </div>
            </div>
            <div class="c-buttons__inner">
              <div class="c-buttonWrap4">
                <Button
                  style-type="primary"
                  @click.native="useCoupon()"
                  color="color2"
                >
                  利用する
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <!-- パスワード入力モーダル -->
      <CouponPassword
        ref="coupon-detail-password"
        type="show"
        :closeBtn="true"
        :isHideValid="true"
        :rejectPassword="rejectPassword"
        @submit="submit"
        @closePopup="closePopup"
      />
      <!-- 通知モーダル -->
      <Notify ref="notify" />
    </div>
  </div>
</template>

<script>
import func_utils from '@/mixins/func_utils';
import bwipjs from 'bwip-js';

export default {
  mixins: [func_utils],
  data: () => ({
    isLoading: true,
    acptNo: '',
    selected_id: '',
    detail: {},
    importantPoints: [],
    barcode_dataList: [],
    barcode_data: [],
    barcode_src: [],
    errorText: false,
    password: '',
    rejectPassword: false,
    currentTime: '2020/11/24 12:34:56',
    timer: null,
    memberBenefits: {}
    // isStatePasswordHidden: true,
  }),

  computed: {
    userData() {
      if (!this.$auth || !this.$auth.user) return '';
      return this.$auth.user;
    },
    userName() {
      if (!this.userData) {
        return '';
      } else if (this.userData.familyName && this.userData.firstName) {
        return this.userData.familyName + ' ' + this.userData.firstName;
      } else {
        return this.userData.familyName || this.userData.firstName;
      }
    },
    isQRCode() {
      return (
        this.isImageCode &&
        this.detail.barcodeDiv == this.CONST.BARCODE_DIV.QR_CODE
      );
    },
    // デジポン（バーコード単数, メインのコードとは別にコードが発行されるパターン, 複数選択, コードが生成できない場合）
    isImageCode() {
      return (
        this.detail.kind == this.CONST.MY_COUPON_KIND.DIGITAL_COUPON &&
        this.detail.digiPonDiv == this.CONST.DIGI_PON_DIV.DIGITAL_COUPON_BARCODE
      );
    },
    // デジポン（クーポン番号）
    isTextcode() {
      return (
        this.detail.kind == this.CONST.MY_COUPON_KIND.DIGITAL_COUPON &&
        this.detail.digiPonDiv == this.CONST.DIGI_PON_DIV.DIGITAL_COUPON
      );
    },
    // デジチケもぎり
    isTicket() {
      return this.detail.kind == this.CONST.MY_COUPON_KIND.DIGITAL_TICKET;
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
    codeTitle() {
      let value = '';
      if (this.isUsed) {
        value = `ご利用ありがとうございました`;
      } else if (this.isTicket) {
        value = `この画面を現地スタッフに提示してください`;
      }
      return value;
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
    selectedCouponList() {
      if (!this.detail || !this.detail.couponCodeList) return [];
      let res = this.detail.couponCodeList.filter((x) =>
        this.selected_id.includes(String(x.couponId))
      );
      // 出力するバーコードを一度まとめる
      // barcodeTgtColumnCdはバーコード生成に必要なカラムの為、
      // 暗証番号などの出力判定には不要なため、条件分岐を削除
      // 動作が正常と確認されている処理を使用する
      // const barcodeTgt = this.detail.barcodeTgtColumnCd;
      // if (!barcodeTgt || barcodeTgt === 'codeData') {
        this.barcode_data = {
          outputCodeDataColumn: res[0].outputCodeDataColumn,
          outputCodeColumn: [],
          codeColumn: [],
        };
        res.forEach((element, index) => {
          let barcode_data = {
            outputCodeDataColumn: res[index].outputCodeDataColumn,
            codeData: res[index].codeData,
            outputCodeColumn: [],
            codeColumn: [],
          };
          Object.keys(res[index]).filter((key) => {
            if (key.includes('outputCodeColumn'))
              barcode_data['outputCodeColumn'].push(res[index][key]);
            if (key.includes('codeClmn'))
              barcode_data['codeColumn'].push(res[index][key]);
          });
          this.barcode_dataList.push(barcode_data);
        });
      // } else {
      //   const barcodeClm = 'outputCodeColumn0' + barcodeTgt.slice(-1);
      //   this.barcode_data = {
      //     outputCodeDataColumn: res[0][barcodeClm],
      //     outputCodeColumn: [res[0].outputCodeDataColumn],
      //     codeColumn: [res[0].codeData],
      //   };
      //   res.forEach((element, index) => {
      //     let barcode_data = {
      //       outputCodeDataColumn: res[index][barcodeClm],
      //       codeData: res[index].codeData,
      //       outputCodeColumn: [],
      //       codeColumn: [],
      //     };
      //     Object.keys(res[index]).filter((key) => {
      //       if (key.includes('outputCodeColumn') && key != barcodeClm)
      //         barcode_data['outputCodeColumn'].push(res[index][key]);
      //       if (key.includes('codeClmn') && key != barcodeTgt)
      //         this.barcode_data['codeColumn'].push(res[index][key]);
      //     });
      //     this.barcode_dataList.push(barcode_data);
      //   });
      // }
      return res || [];
    },
    isUsed() {
      const isUsed = this.selectedCouponList.some((couponList) => {
        return (
          couponList.usedFlag == this.CONST.MY_COUPON_USED_FLAG.USED ||
          couponList.disableFlag == this.CONST.MY_COUPON_DISABLE_FLAG.DISABLED
        );
      });
      return isUsed;
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

  async created() {
    this.acptNo = this.$route.query.acptNo;
    try {
      this.selected_id = this.$route.query.couponId.split(',') || [];
    } catch (e) {
      // TODO:トースト表示にして、3秒後遷移とかにする？
      alert('不正なアクセスです');
      this.$router.push('/');
    }
    await this.getList();
    await this.createBarCode();
  },

  async mounted() {
    this.$meta.setDocumentTitle('クーポン利用');
    this.setBreadcrumb();
    this.$page.isTitle = true;
    this.$page.isPageTop = true;
    this.$page.isPageHeader = true;
    this.$page.isSubHeader = true;
    this.$page.showFooterMenu = true;
    this.$page.showSideMenu = true;
    this.timeCounter();
  },

  beforeDestroy() {
    this.$page.isTitle = true;
    this.$page.isPageHeader = true;
    this.$page.isSubHeader = true;
    this.$page.showFooterMenu = true;
    this.$page.showSideMenu = true;
    this.timeCounterStop;
    this.$mypage.removeCouponDetail();
  },

  watch: {
    $route() {
      this.setBreadcrumb();
      this.$meta.setDocumentTitle('クーポン利用');
      this.$page.isTitle = true;
      this.$page.isPageHeader = true;
      this.$page.isSubHeader = true;
      this.$page.showFooterMenu = true;
      this.$page.showSideMenu = true;
      if (!!this.$route.query.isValid) {
        this.changeUseStateCoupon();
      }
    },
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
      this.detail = this.$mypage.couponDetail;
      this.memberBenefits = this.$mypage.memberBenefits;

      this.isLoading = false;

      // パスワード認証
      // this.isStatePasswordHidden =
      //   this.detail.passwordFlag && !this.detail.isPasswordAuthenticated;
      // パスワード入力必須 かつ パスワード未認証 の場合
      // if (this.isStatePasswordHidden) {
      //   this.isInitLogin = true;
      //   this.$nextTick(() => {
      //     this.$refs["coupon-detail-password"].showModal(
      //       "coupon-detail-password"
      //     );
      //   });
      // } else {
      //   this.isStatePasswordHidden = false;
      // }

      // 注意事項
      this.importantPoints = this.$mypage.importantPoints || [];
    },

    /**
     * バーコード出力
     * ※バーコードをjsで出力するのはデジポンのみ
     * kind=2: デジチケ
     * kind=3: デジポン
     */
    async createBarCode() {
      if (!this.isImageCode) return;
      for (let item of this.selectedCouponList) {
        // クーポン1枚に対してバーコードが一つのとき
        // バーコード形式もBFFから送られてくることを想定
        const barcodeTgt = this.detail.barcodeTgtColumnCd;
        let code;
        !barcodeTgt || barcodeTgt === 'codeData'
          ? (code = item.codeData)
          : (code = item[barcodeTgt]);
        let canvas = await document.createElement('canvas');
        try {
          bwipjs.toCanvas(canvas, {
            bcid: 'code128',
            text: code,
            scale: 3,
            height: 15,
            textalign: 'center',
            // includeText: true,
          });
          this.$set(item, 'barcode_src', canvas.toDataURL());
          this.$set(item, 'qrcode', code);
        } catch (e) {
          console.error(e);
          this.errorText = true;
          return;
        }
      }
    },
    isValidSubCoupon(item) {
      return (
        (item.codeClmn1 != '' ||
          item.codeClmn2 != '' ||
          item.codeClmn3 != '' ||
          item.codeClmn4 != '' ||
          item.codeClmn5 != '') &&
        (item.outputCodeColumn01 != '' ||
          item.outputCodeColumn02 != '' ||
          item.outputCodeColumn03 != '' ||
          item.outputCodeColumn04 != '' ||
          item.outputCodeColumn05 != '')
      );
    },
    /**
     * デジチケもぎり確認モーダルで利用を選択した時
     * passwordFlag == 0: そのままもぎる
     * passwordFlag == 1 : パスワード入力モーダルを表示
     */
    async useCoupon() {
      this.$refs['ticket-mogiri'].hide();
      // パスワード入力必須以外の場合
      if (this.detail.passwordFlag == 0) {
        this.$loading.startProcessing();
        this.putTicketCollector();
        this.$loading.finishProcessing();
        return;
      }
      this.$refs['coupon-detail-password'].showModal('coupon-detail-password');
    },
    /**
     * パスワード入力モーダル入力後
     */
    async submit(e) {
      // パスワード確認APIを叩く
      this.$loading.startProcessing();
      let params = {
        password: e.value,
        menuNo: this.detail.menuNo,
        planId: this.detail.planId,
      };
      const res = await this.$repositories(
        'mypage'
      ).postTicketCollectorPassword(params);
      if (res.isError) {
        this.rejectPassword = true;
      } else {
        this.putTicketCollector();
        this.$mypage.passwordAuthenticated();
        this.$refs['coupon-detail-password'].hideModal(
          'coupon-detail-password'
        );
        // this.isStatePasswordHidden = false;
      }
      // もぎり時のパスワード入力ではクーポン使用のAPIを叩く
      this.$loading.finishProcessing();
    },
    /**
     * 選択されているクーポンを使用済みにするAPIを叩く
     */
    async putTicketCollector() {
      let params = {
        flag: 1,
        menuNo: this.detail.menuNo,
        planId: this.detail.planId,
        couponIdList: this.selectedCouponList.map((x) => x.couponId),
      };
      const res = await this.$repositories('mypage').putTicketCollector(params);
      if (res.isError) {
        this.$notifyToast.show({
          title: res.data.message || 'エラーが発生しました',
          text: res.data.detail || 'エラーが発生しました',
          duration: 5000,
        });
      } else {
        this.changeUseStateCoupon();
      }
    },
    /**
     * 選択されているクーポンのフラグを使用済みにする
     */
    changeUseStateCoupon() {
      this.selectedCouponList.forEach((selectedCoupon) => {
        selectedCoupon.usedFlag = this.CONST.MY_COUPON_USED_FLAG.USED;
      });
    },
    closePopup() {
      this.rejectPassword = false;
    },
    copy(index) {
      const textArea = document.createElement('textarea')
      textArea.setAttribute('display','none')
      textArea.textContent = this.$refs.couponCode[index]?.innerText
      document.body.append(textArea)
      textArea.select()

      document.execCommand('copy')
      this.$refs.couponCode[index].blur()
      document.getSelection().removeAllRanges()
      textArea.remove()
    },
    send() {
      if (this.detail?.digiPonApplUrl) {
        window.location.href = this.detail?.digiPonApplUrl;
      }
    },
    print() {
      let style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = '@page {size: auto; margin-top: 20px; }';
      window.document.body.appendChild(style);
      window.print();
      window.document.body.removeChild(style);
    },
    showModal(name) {
      this.$refs[name].show();
    },
    timeCounter() {
      let renewTime = () => {
        let now = this.$moment();
        this.currentTime = now.format('YYYY/MM/DD HH:mm:ss');
      };
      this.timer = setInterval(renewTime, 1000);
    },
    timeCounterStop() {
      clearInterval(this.timer);
    },
    getLightBgClass() {
      return this.selectedCouponList.length > 1
        ? 'c-card--lightYellow c-card--lightYellow--hasShadow'
        : 'c-card--lightYellow';
    },
    /**
     * パンくずリスト作成
     */
    setBreadcrumb(menuName = 'メニュー名（未設定）') {
      this.$page.setBreadcrumb(
        this.$page.formatBreadcrumb('マイページ', '/mypage')
      );
      this.$page.setBreadcrumb(
        this.$page.formatBreadcrumb(
          'マイクーポン',
          '/mypage/coupon?sort=getCouponDatetime'
        )
      );
      this.$page.setBreadcrumb(
        this.$page.formatBreadcrumb(
          'クーポン詳細',
          `/mypage/coupon/${this.acptNo}`
        )
      );
      this.$page.setBreadcrumb(this.$page.formatBreadcrumb('クーポン利用'));
    },
  },
};
</script>
<style scoped>
.center {
  display: flex;
  justify-content: center;
}

.c-title7 {
  color: #dd0000;
}
.coupon-code {
  padding: 0.25rem;
  font-size: 1.75rem;
  line-height: 1.5;
  font-weight: bold;
  text-align: center;
  width: 100%;
  word-break: break-word;
}
</style>
