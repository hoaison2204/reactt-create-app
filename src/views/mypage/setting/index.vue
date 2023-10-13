<template>
  <section class="p-mypage-member-info">
    <!-- PC画面 -->
    <div
      v-if="is_pcWindowsShow"
      class="p-mypage-member-info__inner flow-full p-2"
    >
      <!-- 基本情報 -->
      <MemberInfoSectionContentTitle
        class="font-bold"
        :lineType="lineType.vertical"
        :titleContent="titleContent[0]"
      />
      <div class="p-mypage-member__item flex">
        <div class="p-mypage-member__item--title">
          <p>会員ID</p>
          <p>店頭番号</p>
          <p>所属団体名</p>
          <p>会員種別</p>
        </div>
        <div class="p-mypage-member__item--text">
          <p v-if="userData.ssoCustomerNo" wovn-ignore>{{ userData.ssoCustomerNo }}</p>
          <p v-else  wovn-ignore>未登録</p>
          <p v-if="userData.ssoMembrNo" wovn-ignore>{{ userData.ssoMembrNo }}</p>
          <p v-else wovn-ignore>未登録</p>
          <p v-if="profileInfo.companyName" wovn-ignore>{{ profileInfo.companyName }}</p>
          <p v-else wovn-ignore>未登録</p>
          <p
            v-if="userData.ssoPrincipalFlg == 1"
            class="p-mypage-member__item--text-me"
          >
            本人
          </p>
          <p
            v-if="userData.ssoPrincipalFlg == 0"
            class="p-mypage-member__item--text-family"
          >
            家族
          </p>
        </div>
      </div>
      <MemberInfoSectionContentTitle
        class="font-bold"
        :lineType="lineType.vertical"
        :titleContent="titleContent[1]"
        :showButton="true"
        buttonText="会員情報詳細の変更"
        :domainSettingProfile="domainSettingProfile"
      />
      <div class="p-mypage-member__item flex">
        <div class="p-mypage-member__item--title">
          <p>氏名</p>
          <p>氏名（フリガナ）</p>
          <p>生年月日</p>
          <p>性別</p>
          <p
            :class="
              myPostalCode && address1
                ? 'p-mypage-member__item--title-address'
                : ''
            "
          >
            住所
          </p>
        </div>
        <div class="p-mypage-member__item--text">
          <p v-if="fullName" wovn-ignore>{{ fullName }}</p>
          <p v-else wovn-ignore>未登録</p>
          <p v-if="fullNameKana" wovn-ignore>{{ fullNameKana }}</p>
          <p v-else wovn-ignore>未登録</p>
          <p v-if="birthday">{{ birthday }}</p>
          <p v-else>未登録</p>
          <p v-if="gender">{{ gender }}</p>
          <p v-else>未登録</p>
          <div v-if="address1" class="mt-4" wovn-ignore>
            <p v-if="myPostalCode" class="mb-0">〒{{ myPostalCode }}</p>
            <p class="my-0">{{ myAddress }}</p>
          </div>
          <p v-else wovn-ignore>未登録</p>
        </div>
      </div>
      <MemberInfoSectionContentTitle
        class="font-bold"
        :lineType="lineType.vertical"
        :titleContent="titleContent[2]"
        :showButton="true"
        :buttonText="'確認・編集する'"
        :parentMethodName="'gotoPaymentGate'"
        @gotoPaymentGate="gotoPaymentGate"
        v-if="creditCardEnabled"
      />
      <div class="p-mypage-member__item flex" v-if="!isIcService(mypageDisplayCode) && !isGCService(mypageDisplayCode)">
        <div class="p-mypage-member__item--title">
          <p>登録状況</p>
        </div>
        <div class="p-mypage-member__item--text">
          <p class="p-mypage-member__item--text-credit">*********</p>
        </div>
      </div>
      <MemberInfoSectionContentTitle
        class="font-bold"
        :lineType="lineType.vertical"
        :titleContent="titleContent[3]"
        :showButton="true"
        :buttonText="'確認・編集する'"
        :domainSettingProfile="domainSettingProfile"
      />
      <div class="p-mypage-member__item flex">
        <div class="p-mypage-member__item--title">
          <p>ログインID</p>
          <p>パスワード</p>
          <p>メールアドレス</p>
          <p>携帯電話番号</p>
          <!-- SSOログイン時は非表示 -->
          <div class="flex pt-4" v-if="ssoHiddenFlag">
            <p class="mr-1">パスワードレス認証設定</p>
            <div>
              <div
                @mouseenter="showBalloon('passwordLess')"
                @mouseleave="hiddenBalloon('passwordLess')"
                class="leading-tight"
              >
                <Icon
                  name="information_initial"
                  color="#e60021"
                  @click="showBalloon('passwordLess')"
                />
                <Balloon
                  text="パスワードレス認証とは・・・<br />指紋認証や顔認証などを利用して簡単かつ安全にログインいただける機能です。"
                  :class="
                    showBalloonFlg.passwordLess
                      ? 'opacity-100 block'
                      : 'opacity-0 hidden'
                  "
                  class="absolute mt-1 mr-4"
                />
              </div>
            </div>
          </div>

          <!-- SSOログイン時は非表示 -->
          <div class="flex pt-4" v-if="ssoHiddenFlag">
            <p class="mr-1">二要素認証設定</p>
            <div>
              <div
                @mouseenter="showBalloon('twoWayCertification')"
                @mouseleave="hiddenBalloon('twoWayCertification')"
                class="leading-tight"
              >
                <Icon
                  name="information_initial"
                  color="#e60021"
                  @click="showBalloon('twoWayCertification')"
                />
              </div>
              <Balloon
                text="二段階認証設定とは・・・<br /> 二要素認証を設定すると、ID・パスワードに加え、SMSへのコード通知による認証等、もう一つの認証が加わりますので、万が一ID・パスワードが漏えいしたとしても、本人以外ログインすることができなくなります。より高いセキュリティを確保するために設定をおすすめします。"
                class="absolute mt-1 mr-4"
                :class="showBalloonFlg.twoWayCertification ? '' : 'hidden'"
                innerStyle="w-1/3"
              />
            </div>
          </div>
        </div>
        <div class="p-mypage-member__item--text">
          <p>※「確認・編集する」ボタンから設定ください。</p>
          <p>*********</p>
          <p v-if="profileInfo.email" wovn-ignore>{{ profileInfo.email }}</p>
          <p v-else wovn-ignore>未登録</p>
          <p v-if="profileInfo.tel" wovn-ignore>{{ profileInfo.tel }}</p>
          <p v-else wovn-ignore>未登録</p>
          <!-- SSOログイン時は非表示 -->
          <p v-if="ssoHiddenFlag">※「確認・編集する」ボタンから設定ください。</p>
          <p v-if="ssoHiddenFlag">※「確認・編集する」ボタンから設定ください。</p>
        </div>
      </div>
      <!-- SSOログイン時は非表示 -->
      <MemberInfoSectionContentTitle
        class="font-bold"
        :lineType="lineType.vertical"
        :titleContent="titleContent[4]"
        :showExclamation="true"
        exclamationText="パスワードリマインダー / 二要素認証解除設定とは・・・ <br />以下の設定①、②のいずれかを設定することでパスワードを忘れた際の救済と二要素認証設定の解除が可能です。<br /> アカウント情報で設定済のメールアドレスと携帯電話番号は第二メールアドレスおよび第二電話番号に設定できないためご注意ください。"
        :showButton="true"
        :buttonText="'確認・編集する'"
        :domainSettingProfile="domainSettingProfile"
        :hasBalloon="true"
        v-if="ssoHiddenFlag"
      />
      <!-- SSOログイン時は非表示 -->
      <div class="p-mypage-member__item flex" v-if="ssoHiddenFlag">
        <div class="p-mypage-member__item--title">
          <p>
            設定①第二メールアドレス<br /><span
              class="p-mypage-member__item--title--secret"
              >秘密の質問</span
            >
          </p>
          <p>設定②第二電話番号</p>
        </div>
        <div class="p-mypage-member__item--text">
          <p class="p-mypage-member__item--text-first-config">
            ※「確認・編集する」ボタンから設定ください。
          </p>
          <p>※「確認・編集する」ボタンから設定ください。</p>
        </div>
      </div>
      <MemberInfoSectionContentTitle
        v-show="!isCrm(mypageBoCode) && !isGCService(mypageDisplayCode)"
        class="font-bold"
        :lineType="lineType.vertical"
        :titleContent="titleContent[5]"
        :showExclamation="true"
        exclamationText="外部サイト連携設定とは・・・ <br />外部サイトと連携設定を行うことで簡単にログインできます。"
        :showButton="true"
        buttonText="確認・編集する"
        :domainSettingProfile="domainSettingProfile"
        :hasBalloon="true"
      />
      <div class="p-mypage-member__item flex" v-show="!isCrm(mypageBoCode) && !isGCService(mypageDisplayCode)">
        <div class="p-mypage-member__item--title">
          <p>
            <img
              src="@/assets/images/icon/yahoo-icon.svg"
              alt="yahoo-icon"
              width="121"
              height="39"
            />
          </p>
          <p>
            <img
              src="@/assets/images/icon/google-icon.svg"
              alt="google-icon"
              width="98"
              height="42"
            />
          </p>
          <p>
            <img
              src="@/assets/images/icon/daccount-icon.svg"
              alt="account-icon"
              width="120"
              height="38"
            />
          </p>
        </div>
        <p
          class="
            p-mypage-member__item--text p-mypage-member__item--text-external-pc
          "
        >
          ※「確認・編集する」ボタン押下後の「外部サイト連携設定」<br />
          <span>から設定ください。</span>
        </p>
      </div>
    </div>

    <!-- SP画面 -->
    <div v-else>
      <MemberInfoSectionContentTitle
        class="font-bold"
        :lineType="lineType.vertical"
        :titleContent="titleContent[0]"
      />
      <div class="p-mypage-member__item">
        <div class="p-mypage-member__item--unit">
          <p>会員ID</p>
          <p v-if="userData.ssoCustomerNo" wovn-ignore>{{ userData.ssoCustomerNo }}</p>
          <p v-else wovn-ignore>未登録</p>
        </div>
        <div class="p-mypage-member__item--unit">
          <p>店頭番号</p>
          <p v-if="userData.ssoMembrNo" wovn-ignore>{{ userData.ssoMembrNo }}</p>
          <p v-else wovn-ignore>未登録</p>
        </div>
        <div class="p-mypage-member__item--unit">
          <p>所属団体名</p>
          <p v-if="profileInfo.companyName" wovn-ignore>{{ profileInfo.companyName }}</p>
          <p v-else wovn-ignore>未登録</p>
        </div>
        <div class="p-mypage-member__item--unit">
          <p>会員種別</p>
          <p
            v-if="userData.ssoPrincipalFlg == 1"
            class="p-mypage-member__item--text-me"
          >
            本人
          </p>
          <p
            v-if="userData.ssoPrincipalFlg == 0"
            class="p-mypage-member__item--text-family"
          >
            家族
          </p>
        </div>
      </div>
      <MemberInfoSectionContentTitle
        class="font-bold"
        :lineType="lineType.vertical"
        :titleContent="titleContent[1]"
        :showButton="true"
        :buttonText="'会員情報詳細の変更'"
        :domainSettingProfile="domainSettingProfile"
      />
      <div class="p-mypage-member__item">
        <div class="p-mypage-member__item--unit">
          <p>氏名</p>
          <p v-if="fullName" wovn-ignore>{{ fullName }}</p>
          <p v-else wovn-ignore>未登録</p>
        </div>
        <div class="p-mypage-member__item--unit">
          <p>氏名 ( フリガナ )</p>
          <p v-if="fullNameKana" wovn-ignore>{{ fullNameKana }}</p>
          <p v-else wovn-ignore>未登録</p>
        </div>
        <div class="p-mypage-member__item--unit">
          <p>生年月日</p>
          <p v-if="birthday">{{ birthday }}</p>
          <p v-else>未登録</p>
        </div>
        <div class="p-mypage-member__item--unit">
          <p>性別</p>
          <p v-if="gender">{{ gender }}</p>
          <p v-else>未登録</p>
        </div>
        <div class="p-mypage-member__item--unit">
          <p>住所</p>
          <p v-if="myPostalCode" wovn-ignore>〒{{ myPostalCode }}</p>
          <p v-if="address1" class="font-color" wovn-ignore>{{ myAddress }}</p>
          <p v-else wovn-ignore>未登録</p>
        </div>
      </div>
      <!-- クレジットカード情報 -->
      <MemberInfoSectionContentTitle
        class="font-bold"
        :lineType="lineType.vertical"
        :titleContent="titleContent[2]"
        :showButton="true"
        :buttonText="'確認・編集する'"
        :parentMethodName="'gotoPaymentGate'"
        @gotoPaymentGate="gotoPaymentGate"
        v-if="creditCardEnabled"
      />
      <div class="p-mypage-member__item--unit" v-if="!isIcService(mypageDisplayCode) && !isGCService(mypageDisplayCode)">
        <div class="p-mypage-member__item">
          <p>登録状況</p>
          <p>*********</p>
        </div>
      </div>
      <!-- アカウント情報 -->
      <MemberInfoSectionContentTitle
        class="font-bold"
        :lineType="lineType.vertical"
        :titleContent="titleContent[3]"
        :showButton="true"
        :buttonText="'確認・編集する'"
        :domainSettingProfile="domainSettingProfile"
      />
      <div class="p-mypage-member__item">
        <div
          class="p-mypage-member__item--unit flex justify-between items-center"
        >
          <div>
            <p>ログインID</p>
            <p>※「確認・編集する」ボタンから設定ください。</p>
          </div>
        </div>
        <div
          class="p-mypage-member__item--unit flex justify-between items-center"
        >
          <div>
            <p>パスワード</p>
            <p>*********</p>
          </div>
        </div>
        <div
          class="
            p-mypage-member__item--unit
            flex
            justify-between
            items-center
            mt-3
          "
        >
          <div>
            <p>メールアドレス</p>
            <p v-if="profileInfo.email" wovn-ignore>{{ profileInfo.email }}</p>
            <p v-else wovn-ignore>未登録</p>
          </div>
        </div>
        <div
          class="
            p-mypage-member__item--unit
            flex
            justify-between
            items-center
            mt-3
          "
        >
          <div>
            <p>携帯電話番号</p>
            <p v-if="profileInfo.tel" wovn-ignore>{{ profileInfo.tel }}</p>
            <p v-else wovn-ignore>未登録</p>
          </div>
        </div>
        <!-- SSOログイン時は非表示 -->
        <div
          class="
            p-mypage-member__item--unit
            flex
            justify-between
            items-center
            mt-3
          "
          v-if="ssoHiddenFlag"
        >
          <div>
            <div class="flex">
              <p>パスワードレス認証設定</p>
              <div class="ml-1">
                <div
                  @mouseenter="showBalloon('passwordLess')"
                  @mouseleave="hiddenBalloon('passwordLess')"
                  class="leading-4"
                >
                  <Icon
                    name="information_initial"
                    color="#e60021"
                    @click="showBalloon('passwordLess')"
                  />
                </div>
              </div>
            </div>
            <Balloon
              text="パスワードレス認証とは・・・<br />指紋認証や顔認証などを利用して簡単かつ安全にログインいただける機能です。"
              :class="showBalloonFlg.passwordLess ? '' : 'hidden'"
              class="absolute mt-1 mr-4"
            />
            <p class="p-mypage-member__item--unit--two-factor">
              ※「確認・編集する」ボタンから設定ください。
            </p>
          </div>
        </div>
        <!-- SSOログイン時は非表示 -->
        <div
          class="
            p-mypage-member__item--unit
            flex
            justify-between
            items-center
            mt-3
          "
          v-if="ssoHiddenFlag"
        >
          <div>
            <div class="flex">
              <p>二要素認証設定</p>
              <div class="ml-1">
                <div
                  @mouseenter="showBalloon('twoWayCertification')"
                  @mouseleave="hiddenBalloon('twoWayCertification')"
                  class="leading-4"
                >
                  <Icon
                    name="information_initial"
                    color="#e60021"
                    @click="showBalloon('twoWayCertification')"
                  />
                </div>
              </div>
            </div>
            <Balloon
              text="二段階認証設定とは・・・<br /> 二要素認証を設定すると、ID・パスワードに加え、SMSへのコード通知による認証等、もう一つの認証が加わりますので、万が一ID・パスワードが漏えいしたとしても、本人以外ログインすることができなくなります。より高いセキュリティを確保するために設定をおすすめします。"
              class="absolute mt-1 mr-4"
              :class="showBalloonFlg.twoWayCertification ? '' : 'hidden'"
            />
          </div>
        </div>
        <!-- SSOログイン時は非表示 -->
        <p class="p-mypage-member__item--unit--two-factor" v-if="ssoHiddenFlag">
          ※「確認・編集する」ボタンから設定ください。
        </p>
      </div>
      <!-- パスワードリマインダー・二要素認証解除設定 -->
      <!-- SSOログイン時は非表示 -->
      <MemberInfoSectionContentTitle
        class="font-bold"
        :lineType="lineType.vertical"
        :titleContent="titleContent[4]"
        :showExclamation="true"
        exclamationText="パスワードリマインダー / 二要素認証解除設定とは・・・ <br />以下の設定①、②のいずれかを設定することでパスワードを忘れた際の救済と二要素認証設定の解除が可能です。<br /> アカウント情報で設定済のメールアドレスと携帯電話番号は第二メールアドレスおよび第二電話番号に設定できないためご注意ください。"
        :showButton="true"
        :buttonText="'確認・編集する'"
        :domainSettingProfile="domainSettingProfile"
        :hasBalloon="true"
        v-if="ssoHiddenFlag"
      />
      <!-- SSOログイン時は非表示 -->
      <div class="p-mypage-member__item flex justify-between mt-4" v-if="ssoHiddenFlag">
        <div class="p-mypage-member__item--unit">
          <p>設定①第二メールアドレス・秘密の質問</p>
          <p>※「確認・編集する」ボタンから設定ください。</p>
          <p class="mt-2">設定②第二電話番号</p>
          <p>※「確認・編集する」ボタンから設定ください。</p>
        </div>
      </div>
      <MemberInfoSectionContentTitle
        class="font-bold"
        v-show="!isCrm(mypageBoCode) && !isGCService(mypageDisplayCode)"
        :lineType="lineType.vertical"
        :titleContent="titleContent[5]"
        :showExclamation="true"
        exclamationText="外部サイト連携設定とは・・・ <br />外部サイトと連携設定を行うことで簡単にログインできます。"
        :showButton="true"
        buttonText="確認・編集する"
        :domainSettingProfile="domainSettingProfile"
        :hasBalloon="true"
      />
      <div class="p-mypage-member__item flex" v-show="!isCrm(mypageBoCode) && !isGCService(mypageDisplayCode)">
        <div class="p-mypage-member__item--icon-img">
          <div
            class="
              p-mypage-member__item--unit--external
              flex
              justify-between
              items-center
            "
          >
            <div
              class="
                p-mypage-member__item--unit--external-img
                flex
                items-center
              "
            >
              <img
                src="@/assets/images/icon/yahoo-icon.svg"
                alt="yahoo-icon"
                width="93.08"
                height="30"
                class="w-28"
              />
            </div>
          </div>
          <div
            class="
              p-mypage-member__item--unit--external
              flex
              justify-between
              items-center
              mt-3
            "
          >
            <div
              class="
                p-mypage-member__item--unit--external-img
                flex
                items-center
              "
            >
              <img
                src="@/assets/images/icon/google-icon.svg"
                alt="google-icon"
                width="73.92"
                height="32"
              />
            </div>
          </div>
          <div
            class="
              p-mypage-member__item--unit--external
              flex
              justify-between
              items-center
              mt-3
            "
          >
            <div
              class="
                p-mypage-member__item--unit--external-img
                flex
                items-center
              "
            >
              <img
                src="@/assets/images/icon/daccount-icon.svg"
                alt="account-icon"
                width="94.74"
                height="30"
              />
            </div>
          </div>
        </div>
        <div class="p-mypage-member__item--icon-text">
          <p>
            ※「確認・編集する」ボタン押下後の<br />
            <span class="p-mypage-member__item--icon-text-indent"
              >「外部サイト連携設定」から設定く</span
            ><br />
            <span class="p-mypage-member__item--icon-text-indent-second"
              >ださい。</span
            >
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import func_utils from "@/mixins/func_utils";
import { Core as YubinBangoCore } from "yubinbango-core2";
export default {
  props: {
    mypageBoCode: {
      type: String,
    },
  },
  mixins: [func_utils],
  data() {
    return {
      isEditInfomation: false,
      isEditNotification: false,
      breadcrumb_data: ["トップ", "マイページ", "公開プロフィール"],
      titleContent: [
        "基本情報",
        "会員情報詳細",
        "クレジットカード情報",
        "アカウント情報",
        "パスワードリマインダー・二要素認証解除設定",
        "外部サイト連携設定",
      ],
      lineType: { horizontal: "h-line", vertical: "v-line" },
      fullName: "",
      fullNameKana: "",
      birthday: "",
      gender: "",
      anounce_email: [
        {
          status: false,
          email: "月次配信月次配信",
          content:
            "メールアドレスを入力してくださいメールアドレスを入力してくださいメールアドレスを入力してください",
        },
        {
          status: false,
          email: "新着情報新着情報",
          content:
            "メールアドレスを入力してくださいメールアドレスを入力してくださいメールアドレスを入力してください",
        },
        {
          status: false,
          email: "あなたへのお知らせあなたへのお知らせ",
          content:
            "メールアドレスを入力してくださいメールアドレスを入力してくださいメールアドレスを入力してください",
        },
      ],
      profileInfo: {
        familyName: "",
        firstName: "",
        tel: "",
        email: "",
        addresses: [
          {
            address1: "",
            address2: "",
          },
        ],
      },
      anounceEmails: [],
      hasError: false,
      error_message: "メールアドレスを入力してください",
      errorMessageEmail: null,
      errorMessagePhone: null,
      errorMessageName: null,
      errorMessageAddress1: null,
      errorMessageAddress2: null,
      address1: null,
      address2: null,
      defaultDestination: 1,
      prefectureCode: "",
      postalCode: "",

      // value pop up favorite
      visiblePopupFavorite: false,
      favoriteAreas: [],
      favoriteArea: null,
      // pop up interest
      visiblePopupInterest: false,
      interestList: [],
      interesetLists: [],
      customStyle_panel: "background-color: #ffffff",
      districtFavorite: null,
      errorMessageFavorite: "",
      zipCode1: "",
      zipCode2: "",
      apartmentNumber: "",
      prefectures: "",
      cityAddress: "",
      errorMessageZipcode: "",
      errorMessagePrepecture: "",
      errorMessageCityAddress: "",
      isForeign: false,
      zipcodeError: false,
      // windowの横幅
      windowWidth: null,
      is_pcWindowsShow: true,
      // myAddress: null,
      myPostalCode: null,
      addressUser: null,
      /**
       * データチップの表示フラグ
       */
      showBalloonFlg: {
        passwordLess: false,
        twoWayCertification: false,
      },
      /**
       * SSO非表示フラグ
       */
      ssoHiddenFlag: true,

      icSelfPayEnabled: false,
    };
  },
  created() {
    this.getProfileInfo();
  },
  async mounted() {
    // this.$page.showSideMenu = true;
    this.setBreadcrumb();
    this.getUserSessionInfo();
    // this.getProfileInfo();
    this.getWindowWidth();
    this.resizeWindowWidth();

    this.selfPayEnabled().then((res) => {
      console.log("selfPayEnabled: ", res.self_pay_enabled);
      this.icSelfPayEnabled = res.self_pay_enabled;
    });
  },
  beforeDestroy: function () {
    window.removeEventListener("resize", this.handleResize);
  },
  watch: {
    $route() {
      this.setBreadcrumb();
    },
    windowWidth: function (newVal) {
      if (newVal > 1022) {
        this.is_pcWindowsShow = true;
      } else {
        this.is_pcWindowsShow = false;
      }
    },
  },
  computed: {
    mypageDisplayCode(){
      return this.getMypageDisplayCode(location.origin);
    },
    mypageApiUrl() {
      return this.getMypageApiUrl(this.mypageDisplayCode);
    },
    myAddress() {
      return `${this.prefectures}${this.address1}${this.address2}`;
    },
    domainSettingProfile() {
      return process.env.VUE_APP_DOMAIN_SETTING_PROFILE;
    },
    // ログイン中のユーザーデータ取得 会員IDと会員種別の情報取得
    userData() {
      if (!this.$auth || !this.$auth.user) return "";
      return this.$auth.user;
    },
    creditCardEnabled() {
      let res = false;
      if (!this.isGCService(this.mypageDisplayCode)) {
        res = true;
      }
      if (this.isIcService(this.mypageDisplayCode) && !this.icSelfPayEnabled) {
        res = false;
      }
      console.log("creditCardEnabled: ", res);
      return res;
    },
  },
  methods: {
    selectedMyAddress(addresses, defaultDestination) {
      let arrayNum = defaultDestination;
      // ユーザーが通常使うお届け先を未設定にしている場合、defaultDestination = -1
      Number(arrayNum);
      if (arrayNum === "-1" || !arrayNum) arrayNum = 0;
      this.address1 = _.get(addresses[arrayNum], `address1`, "");
      this.address2 = _.get(addresses[arrayNum], `address2`, "");
      this.prefectureCode = _.get(addresses[arrayNum], `prefectureCode`, "");
      this.postalCode = _.get(addresses[arrayNum], `postalCode`, "");
      if (this.postalCode.match(/-/)) {
        this.postalCode = this.postalCode.replace(/-/g, "");
      }
      if (this.postalCode) {
        this.zipCode1 = this.postalCode.substring(0, 3);
        this.zipCode2 = this.postalCode.substring(3, 7);
        this.loadZipcode();
      }
    },
    // 誕生日を生年月日に整形
    birthdayShaping(birthday) {
      if (birthday) {
        let dt = new Date(birthday);
        let y = dt.getFullYear();
        let m = ("00" + (dt.getMonth() + 1)).slice(-2);
        let d = ("00" + dt.getDate()).slice(-2);
        const result = y + "年" + m + "月" + d + "日";
        return result;
      }
      return null;
    },
    // 郵便番号にハイフン追加
    postalCodeShaping(postalCode) {
      if (postalCode && !postalCode.match(/-/)) {
        let zipCode1 = postalCode.substring(0, 3);
        let zipCode2 = postalCode.substring(3, 7);
        return zipCode1 + "-" + zipCode2;
      } else {
        return postalCode;
      }
    },
    callCollapse(item) {
      this.favoriteList.forEach((ele, index) => {
        if (ele.item === item.item) {
          item.selected = !item.selected;
        }
      });
    },
    async getProfileInfo() {
      await this.$repositories("orders")
        .getProfileInfo()
        .then((data) => {
          if (data) {
            this.profileInfo = data;
            this.fullName = `${this.profileInfo.familyName} ${this.profileInfo.firstName}`;
            this.fullNameKana = `${this.profileInfo.familyNameKana} ${this.profileInfo.firstNameKana}`;
            this.birthday = this.birthdayShaping(this.profileInfo.birthday);
            this.gender = this.profileInfo.sex === 0 ? "男性" : this.profileInfo.sex === 1 ? '女性' : '未登録';
            this.selectedMyAddress(
              this.profileInfo.addresses,
              this.profileInfo.defaultDestination
            );
            this.myPostalCode = this.postalCodeShaping(this.postalCode);
          }
        });
    },
    loadZipcode() {
      const zipCode = `${this.zipCode1}${this.zipCode2}`;
      if (this.zipCode1 && this.zipCode2) {
        new YubinBangoCore(zipCode, (data) => {
          this.prefectures = data.region ? data.region : "";
        });
      }
    },
    loadLocation() {
      this.isForeign = false;
      if (this.zipCode1 && this.zipCode2) {
        if (this.zipCode1 === "000" && this.zipCode2 === "0000") {
          this.isForeign = true;
          this.hasError = false;
          this.errorMessageZipcode = "";
          return;
        }
        if (this.zipCode1.length < 3 || this.zipCode2.length < 4) {
          this.zipcodeError = true;
          this.hasError = true;
          this.prefectures = "";
          this.cityAddress = "";
          this.errorMessageZipcode = "郵便番号の形式が正しくありません。";
        }
        const zipCode = `${this.zipCode1}-${this.zipCode2}`;
        if (zipCode.length > 7) {
          this.$repositories("orders")
            .getZipCode(zipCode)
            .then(
              (data) => {
                if (data) {
                  console.log("---------->loadLocation:", data);
                  if (data.id) {
                    this.zipcodeError = false;
                    this.errorMessageZipcode = "";
                    this.hasError = false;
                  } else {
                    this.zipcodeError = true;
                    this.hasError = true;
                    if (zipCode.length > 7) {
                      this.errorMessageZipcode =
                        "郵便番号が存在しません。有効な郵便番号を入力してください";
                    }
                  }
                  this.prefectures = data.kenName ? data.kenName : "";
                  this.cityAddress =
                    _.get(data, "cityName", "") +
                    _.get(data, "townName", "") +
                    _.get(data, "blockName", "");
                  this.apartmentNumber = "";
                }
                this.checkMessageZipcode();
              },
              // eslint-disable-next-line no-unused-vars
              (error) => {
                this.hasError = true;
                this.prefectures = "";
                this.cityAddress = "";
                this.apartmentNumber = "";
                this.errorMessageZipcode =
                  "郵便番号が存在しません。有効な郵便番号を入力してください";
              }
            );
        }
      } else {
        this.checkMessageZipcode();
        this.prefectures = "";
        this.cityAddress = "";
      }
    },
    editInfomation() {
      window.open(
        `${process.env.VUE_APP_DOMAIN_SETTING_PROFILE}/account/portal/AccountManagementPortal`
      );
    },
    saveInfomation() {
      const hasError =
        this.checkMessageError() || this.hasError || this.checkMessageZipcode();
      if (!hasError) {
        const fullName = this.fullName.trim();
        const index = fullName.indexOf(" ");
        const email = this.profileInfo.email.trim();
        const profileInfo = {
          familyName: fullName.substring(0, index),
          firstName: fullName.substring(index + 1, fullName.length),
          familyNameKana: "タナカ",
          firstNameKana: "ハナコ",
          birthday: "2000-08-24",
          sex: 1,
          email,
          tel: this.profileInfo.tel,
          secondEmail: "dung.dinh@amela.vn",
          secondTel: "0344059539",
          loginIdType: 0,
          addressUser: {
            defaultDestination: this.defaultDestination,
            addresses: [
              {
                postalCode: this.getZipcode,
                prefectureCode: this.prefectureCode,
                address1: this.prefectures,
                address2: this.cityAddress,
              },
              {
                postalCode: this.getZipcode,
                prefectureCode: this.prefectureCode,
                address1: this.prefectures,
                address2: this.cityAddress,
              },
            ],
          },
          addresses: [],
        };
        this.$repositories("orders")
          .updateProfile(profileInfo)
          .then(() => {
            this.isEditInfomation = false;
            this.fullName = fullName;
            this.profileInfo.email = email;
          });
      }
    },
    chooseFavorite() {
      if (this.districtFavorite === null) {
        this.errorMessageFavorite = "お気に入りエリアを入力してください";
      } else {
        this.errorMessageFavorite = "";
        const location = this.favoriteAreas.filter(
          (item) => item.cityName === this.districtFavorite
        );
        const idLocation = location ? location[0].id : "";
        this.$repositories("mypage")
          .addFavoriteArea({ interestLocationIds: [idLocation] })
          .then(() => {
            this.hideModal("showPopupFavorite");
            this.favoriteArea = this.districtFavorite;
          });
      }
    },
    chooseEmailNoti() {
      const anounceEmails = this.anounce_email.filter((item) => item.status);
      this.anounceEmails = anounceEmails;
      this.hideModal("showPopupEmailNoti");
    },
    editNotification() {
      this.showModal("showPopupEmailNoti");
    },
    checkMessageError() {
      const email = this.profileInfo.email ? this.profileInfo.email.trim() : "";
      let hasError = false;
      if (!this.fullName) {
        hasError = true;
        this.errorMessageName = "氏名を入力してください";
      } else {
        this.errorMessageName = "";
      }
      if (this.profileInfo.tel === "") {
        hasError = true;
        this.errorMessagePhone = "電話番号を入力してください";
      } else if (
        !this.validPhone(this.profileInfo.tel) ||
        (this.profileInfo.tel[0] !== "0" && this.profileInfo.tel[0] !== "０")
      ) {
        hasError = true;
        this.errorMessagePhone = "有効な電話番号を入力してください";
      } else {
        this.errorMessagePhone = "";
      }

      if (email === "") {
        hasError = true;
        this.errorMessageEmail = "メールアドレスを入力してください";
      } else if (!this.validEmail(email)) {
        hasError = true;
        this.errorMessageEmail = "有効なメールアドレスを入力してください";
      } else {
        this.errorMessageEmail = "";
      }
      return hasError;
    },

    checkMessageZipcode() {
      let hasError = false;
      if (!this.zipcodeError) {
        if (this.zipCode1 === "" || this.zipCode2 === "") {
          hasError = true;
          this.errorMessageZipcode = "郵便番号を入力してください";
        } else {
          this.errorMessageZipcode = "";
        }
      }

      if (!this.isForeign) {
        if (this.prefectures === "") {
          hasError = true;
          this.errorMessagePrepecture = "都道府県を入力してください";
        } else {
          this.errorMessagePrepecture = "";
        }

        if (!this.cityAddress) {
          hasError = true;
          this.errorMessageCityAddress = "市区町村・番地を入力してください";
        } else {
          this.errorMessageCityAddress = "";
        }
      }
      return hasError;
    },
    showPopupFavorite() {
      this.visiblePopupFavorite = true;
    },
    showPopupInterest() {
      this.visiblePopupInterest = true;
    },
    onChangeFullName(e) {
      const input = e.target.value;
      this.fullName = this.onReplaceSpecialCharNumber(input);
    },
    onChangeCityAddress(e) {
      const input = e.target.value;
      this.cityAddress = this.onReplaceSpecialChar(input);
    },

    chooseInterestList() {
      let data = [];
      this.interesetLists.forEach((ele, index) => {
        ele.option.filter((item) => item.choice);
        data = [...data, ...ele.option.filter((item) => item.choice)];
      });
      const interestList = data.map((item) => item.value);
      const interestListId = data.map((item) => item.id);
      this.$repositories("mypage")
        .addInterestList({ interestIds: interestListId })
        .then(() => {
          this.hideModal("showPopupInterest");
          this.interestList = interestList;
        });
    },
    closePopupInterest() {
      this.getInterestList();
    },
    changeColor(option_item) {
      if (option_item.choice === true) {
        option_item.choice = false;
        return;
      }
      option_item.choice = true;
    },
    trimSpace() {
      this.fullName = this.fullName ? this.fullName.trim() : "";
    },
    trimSpaceAddress() {
      this.cityAddress = this.cityAddress ? this.cityAddress.trim() : "";
    },
    setBreadcrumb() {
      this.$page.setBreadcrumb(
        this.$page.formatBreadcrumb("マイページ", "/mypage")
      );
      this.$page.setBreadcrumb(this.$page.formatBreadcrumb("会員情報"));
    },
    chooseAnnounce() {
      this.hideModal("showPopupAnnounce");
    },
    showModal(name) {
      this.$refs[name].show();
    },
    hideModal(name) {
      this.$refs[name].hide();
    },
    gotoPaymentGate() {
      /**
       * SSOで遷移した場合の決裁画面へ遷移する処理にエラー画面に遷移を追加
       */
      this.$repositories("mypage")
        .cardRegistration()
        .then((res) => {
          if (res.status === 200) {
            window.location.href = res.data.redirectCardRegistrationUrl;
          } else {
            this.$router.push({ name: "noMailAddress" });
          }
        })
        .catch((error) => {
          this.$router.push({ name: "noMailAddress" });
        })
    },
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
    getWindowWidth() {
      this.windowWidth = window.innerWidth;
    },
    watchWindowWidth() {
      window.addEventListener("resize", this.handleResize);
    },
    resizeWindowWidth() {
      window.addEventListener("resize", this.handleResize);
    },
    showBalloon(type) {
      if (type === "passwordLess") {
        this.showBalloonFlg.passwordLess = !this.showBalloonFlg.passwordLess;
      } else if (type === "twoWayCertification") {
        this.showBalloonFlg.twoWayCertification =
          !this.showBalloonFlg.twoWayCertification;
      }
    },
    hiddenBalloon(type) {
      if (type === "passwordLess" && this.showBalloonFlg.passwordLess) {
        this.showBalloonFlg.passwordLess = !this.showBalloonFlg.passwordLess;
      } else if (
        type === "twoWayCertification" &&
        this.showBalloonFlg.twoWayCertification
      ) {
        this.showBalloonFlg.twoWayCertification =
          !this.showBalloonFlg.twoWayCertification;
      }
    },
    // ログインユーザセッション情報を取得
    async getUserSessionInfo() {
      let res = await this.$repositories("user").userSession();
      if (res.data.ssoFlg == true) {
        this.ssoHiddenFlag = false;
      }
    },
    selfPayEnabled() {
      return this.$repositories("user").icUserSession()
        .then((res) => {
            return {
              self_pay_enabled: res.data.selfPayEnabled
            }
        })
        .catch(() => {
            return {
              self_pay_enabled: false
            }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.p-mypage-member__item {
  padding: 20px;
  @include mq() {
    padding: 16px 16px 24px;
    border-bottom: 1px solid #cacccf;
  }
  &--title {
    border-right: 1px solid #cacccf;
    min-width: 221px;
    p {
      font-size: 15px;
      color: #73767a;
      padding-top: 16px;
      &:first-of-type {
        padding-top: 0;
      }
    }
    &--secret {
      display: block;
      text-indent: 3em;
    }

    &-address {
      display: flex;
      align-items: center;
      min-height: 61px;
    }
  }
  &--icon-img {
    width: 100px;
  }
  &--icon-text {
    display: flex;
    align-items: center;
    padding-left: 12px;
    width: 237px;
    font-size: 13px;
    @media screen and (max-width: 376px) {
      font-size: 12px;
    }

    &-indent {
      display: inline-block;
      text-indent: 1em;

      &-second {
        display: inline-block;
        text-indent: 1.5em;
      }
    }
  }

  &--text {
    padding-left: 24px;
    p:not(:first-of-type, :last-of-type) {
      font-size: 15px;
      margin-top: 16px;
    }
    p:first-of-type {
      font-size: 15px;
      margin-bottom: 16px;
    }
    p:last-of-type {
      margin-top: 16px;
      font-size: 15px;
    }
    &-me {
      height: 22px;
      width: 40px;
      padding: 3px 8px 2px;
      margin-top: 16px;
      font-size: 12px !important;
      color: white;
      background-color: #e60021;
      border-radius: 2px;

      @include mq() {
        height: 2px;
        width: 36px;
        padding: 2px 8px;
        margin-top: 4px;
        font-size: 10px !important;
        color: white;
        background-color: #e60021;
        border-radius: 2px;
      }
    }
    &-family {
      height: 22px;
      width: 40px;
      padding: 3px 8px 2px;
      margin-top: 16px;
      font-size: 12px !important;
      color: white;
      background-color: $Blue;
      border-radius: 2px;
      @include mq() {
        height: 2px;
        width: 36px;
        padding: 2px 8px;
        margin-top: 4px;
        font-size: 10px !important;
        color: white;
        background-color: $Blue;
        border-radius: 2px;
      }
    }
    &-credit {
      margin: 0 !important;
    }
    &-first-config {
      height: 45px;
    }
    &-external {
      display: flex;
      align-items: center;
      font-size: calc(15rem / 16);

      &-pc {
        width: auto;
        margin-top: auto;
        margin-bottom: auto;
        font-size: 14.5px;
        span {
          display: inline-block;
          text-indent: 1em;
        }
      }
    }

    &-address {
      margin-top: 16px;
    }
  }
  &--button {
    p {
      button {
        height: 24px;
        width: 50px;
        border: 1px solid #a8aaad;
        border-radius: 3px;
        background: #ffff;
        font-size: 12px !important;
        margin-top: 14px;
      }
    }
    &-first-config {
      height: 45px;
    }
  }
  &--unit {
    &:not(:first-of-type) {
      margin-top: 8px;
    }
    p {
      min-height: 19px;
      font-size: 13px;
    }
    p:nth-of-type(odd) {
      color: #73767a;
    }
    span {
      font-size: 10px;
    }
    &--text {
      display: block;
      margin-top: 5px;
    }
    &--two-factor {
      color: #1f2021 !important;
      font-size: 13px;
    }

    &-config-indent {
      text-indent: 1.5em;
    }
  }
  &--external {
    display: flex;
  }
}

.p-mypage-member__item--uni-credit {
  @include mq() {
    font-size: 13px;
  }
}

@mixin text-title {
  font-size: 0.8rem;
  font-weight: 700;
  font-style: normal;
  line-height: 2rem;
  color: #73767a;
}

@mixin text-content {
  font-size: 1rem;
  font-weight: 400;
  font-style: normal;
  color: #1f2021;
  line-height: 2rem;
}

@mixin text-epip {
  line-height: 21px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.top-title {
  h3 {
    font-size: 1.75rem;
    font-weight: 700;
  }
}

.title-modal {
  font-style: normal;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
  //@apply text-center;
}
.description-modal {
  width: 100%;
  font-weight: 400;
  font-size: 1rem;
  color: #1f2021;
  text-align: center;
  margin-bottom: 1.5rem;
  //@apply sm:px-6;
}
.btn-cms-modal {
  margin: 2rem 0;
  //@apply my-4;
  text-align: center;
}
.mw-select-modal {
  text-align: center;
  min-width: 200px;
}
.c-btn-modal {
  min-width: 250px;
}

.submit-btn {
  background-color: #1f2021;
  box-shadow: 0 2px 8px 0 #1f202152;
  border-radius: 8px;
  //@apply sm:w-full w-1/3 left-1/3 mt-8;
  .title-btn {
    font-size: 1rem;
    font-weight: 700;
    color: #ffffff;
  }
}

@mixin option_title {
  font-size: 1rem;
  font-weight: 700;
  font-style: normal;
  color: #1f2021;
}

.item-collapse {
  overflow-y: scroll;
  max-height: 350px;
  margin-bottom: 4rem;
  //@apply mb-8;
  //:deep() .n-collapse-item__header-main{
  //  @apply w-full flex justify-between px-6;
  //}
  ::v-deep .ant-collapse-header {
    @include option_title();
  }
  ::v-deep .ant-collapse-content > .ant-collapse-content-box {
    background-color: #f4f5f6;
    //@apply my-0 py-4 px-0;
  }
}

.option-list {
  //@apply px-6 flex flex-wrap gap-2;
}

.option-btn {
  background-color: #ffffff;
  border: 1px solid #a8aaad;
  span {
    font-size: 0.75rem;
    color: #1f2021;
  }
  border-radius: 5px;
  padding: 7px;
  margin-right: 7px;
}
.option_btn_active {
  background-color: #63666a;
  span {
    color: #ffffff;
  }
}

.item-collapse::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
::v-deep .item-collapse {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
@media (max-width: 639px) and (min-width: 320px) {
  ///deep/ .ant-modal {
  //  margin: 0;
  //  position: fixed;
  //  bottom: 0;
  //  left: 50%;
  //  transform: translateX(-50%);
  //  height: 90vh;
  //
  //}
  .item-collapse {
    max-height: 450px;
  }
}

@mixin text-title {
  font-size: 0.8rem;
  font-weight: 700;
  font-style: normal;
  line-height: 2rem;
  color: #73767a;
}

@mixin text-content {
  font-size: 1rem;
  font-weight: 400;
  font-style: normal;
  color: #1f2021;
  line-height: 2rem;
}

@mixin text-epip {
  line-height: 21px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.confirm-info {
  @media only screen and (max-width: 768px) {
    @apply w-full;
  }
  .main-content {
    @apply flex gap-6;
    @media only screen and (max-width: 768px) {
      @apply flex flex-col flex-col-reverse;
    }
    .left-content {
      @apply w-1/4;
      @media only screen and (max-width: 768px) {
        @apply w-auto mr-4;
      }
    }
    .right-content {
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0px 1px 8px 0px #1f202114;

      @apply w-3/4 p-6 mb-4;
      @media only screen and (max-width: 768px) {
        @apply w-full mr-4;
      }
    }
  }
}

.block-one-inform-title {
  @apply w-full flex justify-between;
}
.inform-line {
  @apply w-4/5 flex justify-between px-6 py-2 sm:block sm:w-full;
  .inform-line-title {
    @include text-title();
    @apply text-left;
    width: 160px;
  }
  .inform-line-content {
    @include text-content();
    @apply text-left sm:w-full pl-4 sm:pl-0;
    width: calc(100% - 160px);
    @media only screen and (max-width: 768px) {
      @apply w-full;
      @include text-epip();
    }
    .input-setting {
      border: 1px solid #a8aaad;
      height: 32px;
      border-radius: 3px;
      width: 100%;
      padding: 5px;
    }
  }
}
.block-two-content-line {
  @apply flex w-full justify-between py-2;
  .block-two-content-right {
    @apply flex px-6 w-2/3 justify-between sm:block sm:w-full;
    .block-two-content-title {
      @include text-title();
      @apply text-left;
    }
    .block-two-content-content {
      @include text-content();
      @apply text-left w-7/12;
    }
  }
}
.block-three-anounce-title {
  @apply w-full flex justify-between;
}
.block-three-anounce-content {
  @apply flex w-2/3 justify-between px-6 sm:block sm:w-full;
  .block-three-anounce-content-title {
    @include text-title();
  }
  .block-three-anounce-content-content {
    display: grid;
    @include text-content();
    @apply gap-y-3 w-7/12 text-left sm:w-full;
  }
}
.top-title {
  h3 {
    font-size: 1.75rem;
    font-weight: 700;
  }
}

.title-modal {
  font-style: normal;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  @apply text-center;
}
.description-modal {
  width: 100%;
  font-weight: 400;
  font-size: 1rem;
  color: #1f2021;
  text-align: center;
  margin-bottom: 1.5rem;
  @apply sm:px-6;
}
.btn-cms-modal {
  @apply my-4;
  text-align: center;
}
.mw-select-modal {
  text-align: center;
  min-width: 200px;
}
.c-btn-modal {
  min-width: 250px;
}

.submit-btn {
  background-color: #1f2021;
  box-shadow: 0px 2px 8px 0px #1f202152;
  border-radius: 8px;
  @apply sm:w-full w-1/3 left-1/3 mt-8;
  .title-btn {
    font-size: 1rem;
    font-weight: 700;
    color: #ffffff;
  }
}

@mixin option_title {
  font-size: 1rem;
  font-weight: 700;
  font-style: normal;
  color: #1f2021;
}

.item-collapse {
  overflow-y: scroll;
  max-height: 350px;
  @apply mb-8;
  :deep() .n-collapse-item__header-main {
    @apply w-full flex justify-between px-6;
  }
  ::v-deep .ant-collapse-header {
    @include option_title();
  }
  ::v-deep .ant-collapse-content > .ant-collapse-content-box {
    background-color: #f4f5f6;
    @apply my-0 py-4 px-0;
  }
}

.option-list {
  @apply px-6 flex flex-wrap gap-2;
}

.option-btn {
  background-color: #ffffff;
  border: 1px solid #a8aaad;
  span {
    font-size: 0.75rem;
    color: #1f2021;
  }
}
.option_btn_active {
  background-color: #63666a;
  span {
    color: #ffffff;
  }
}

.item-collapse::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
::v-deep .item-collapse {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
//

.collapsible {
  background-color: #777;
  color: white;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
}

.active,
.collapsible:hover {
  background-color: #555;
}

.content {
  width: 500px;
  padding: 0 18px;
  overflow: hidden;
  background-color: #f1f1f1;
}

.border-accor {
  border-top: 1px solid gray !important;
  // height: 50px
}
::v-deep .c-accordion__button {
  width: 100% !important;
  text-align-last: left !important;
  font-size: 14px;
}
::v-deep .c-accordion {
  @apply pt-4;
}
::v-deep .c-modal__content {
  width: 700px;
}
::v-deep .mw-select-modal {
  @apply w-1/3;
  margin: auto;
}
.black-hole {
  background-color: black;
  color: white;
}
.point-event {
  cursor: pointer;
}

.font-color {
  color: #1f2021 !important;
}
</style>
