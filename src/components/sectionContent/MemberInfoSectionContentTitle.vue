<template>
  <div class="member-info-title flex justify-between" :class="lineType">
    <div class="flex items-center">
      <div v-if="titleContent == 'パスワードリマインダー・二要素認証解除設定'">
        <p class="member-info-title-text">
          {{ titleContent }}
          <span class="inline-block">
            <div v-if="hasBalloon">
              <div @mouseenter="showBalloon" @mouseleave="hiddenBalloon">
              <Icon
                name="information_initial"
                color="#e60021"
                class="Tooltip-icon"
                @click="showBalloon"
              />
              </div>
            </div>
          </span>
        </p>
        <!-- バルーン表示 -->
        <Balloon
          :text="exclamationText"
          innerStyle="w-1/3 sm:w-auto"
          class="balloon balloon-responsive"
          :class="showBalloonFlg ? 'opacity-100 block' : 'opacity-0 hidden'"
        >
      </Balloon>
      </div>
      <div v-else>
        <p class="member-info-title-text">
          {{ titleContent }}
          <span class="inline-block">
            <div v-if="hasBalloon">
              <div @mouseenter="showBalloon" @mouseleave="hiddenBalloon">
                <!-- バルーン表示 -->
                <Balloon
                  :text="exclamationText"
                  innerStyle=""
                  class="balloon mt-7"
                  :class="showBalloonFlg ? 'opacity-100 block' : 'opacity-0 hidden'"
                >
              </Balloon>
              <Icon
                name="information_initial"
                color="#e60021"
                class="Tooltip-icon"
                @click="showBalloon"
              />
              </div>
            </div>
          </span>
        </p>

      </div>
    </div>
    <p
      v-if="
        (showButton && titleContent === '会員情報詳細') ||
        titleContent === '外部サイト連携設定'
      "
    >
      <button v-if="!(status === 'CC' && isGCService(boCode))">
        <a
          @click="gotoAccountManagementPortalPage()"
          rel="noreferrer"
          target="_blank"
          ><span data-v-b320a3ee="">{{ buttonText }}</span></a
        >
      </button>
    </p>
    <p v-else-if="showButton && titleContent == 'クレジットカード情報'">
      <button v-if="!(status === 'CC' && isGCService(boCode))" @click="ignitionParentMethod(parentMethodName)">
        <a rel="noreferrer"
          ><span data-v-b320a3ee="">{{ buttonText }}</span></a
        >
      </button>
    </p>
    <p v-else-if="titleContent == 'パスワードリマインダー・二要素認証解除設定'">
      <button v-if="!(status === 'CC' && isGCService(boCode))">
        <a
          @click="gotoPasswordReminderPage()"
          rel="noreferrer"
          target="_blank"
          ><span data-v-b320a3ee="">{{ buttonText }}</span></a
        >
      </button>
    </p>
    <p v-else-if="showButton && titleContent == 'アカウント情報'">
      <button v-if="!(status === 'CC' && isGCService(boCode))">
        <a
          @click="gotoLoginSecurityPage()"
          rel="noreferrer"
          target="_blank"
          ><span data-v-b320a3ee="">{{ buttonText }}</span></a
        >
      </button>
    </p>
  </div>
</template>

<script>
import { getCookieValue } from '@/utils/cookie';
import { findMypageBoCode } from "@/utils/mypageUtils";

export default {
  name: "section-content-title",
  data() {
    return {
      showBalloonFlg: false,
      accountManamagementPortalEndPoint: "",
      loginSecurityEndpoint: "",
      passwordReminderEndpoint: "",
      status: "",
      boCode: "",
    };
  },
  props: {
    titleContent: String,
    lineType: String,
    showButton: Boolean,
    buttonText: String,
    parentMethodName: String,
    showExclamation: Boolean,
    domainSettingProfile: String,
    exclamationText: String,
    hasBalloon: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    mypageDisplayCode() {
      return this.getMypageDisplayCode(location.origin);
    },
    appApiDomain() {
      return this.getAppApiDomain(this.mypageDisplayCode);
    },
  },
  mounted() {
    const bsjsessionid = getCookieValue('BSJSESSIONID');
    this.status = bsjsessionid.slice(0, 2);
    this.boCode = this.getMapBoCode(this.getMypageDisplayCode(location.origin));
  },
  methods: {
    gotoAccountManagementPortalPage() {
      const defaultEndpoint = `${this.appApiDomain}/v1/mypage/account-management-portal`;
      window.location.href = this.accountManamagementPortalEndPoint || defaultEndpoint;
    },
    gotoLoginSecurityPage() {
      const defaultEndpoint = `${this.appApiDomain}/v1/mypage/login-security-settings`;
      window.location.href = this.loginSecurityEndpoint || defaultEndpoint;
    },
    gotoPasswordReminderPage() {
      const defaultEndpoint = `${this.appApiDomain}/v1/mypage/password-reminder`;
      window.location.href = this.passwordReminderEndpoint || defaultEndpoint;
    },
    ignitionParentMethod(parentMethodName) {
      this.$emit(parentMethodName);
    },
    showBalloon() {
        this.showBalloonFlg = !this.showBalloonFlg
    },
    hiddenBalloon() {
      if (this.showBalloonFlg) {
        this.showBalloonFlg = !this.showBalloonFlg
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.member-info-title {
  height: 60px;
  padding: 16px 20px 15px 20px;
  background-color: #e7e7e7;
  @include mq() {
    height: 24px;
    padding: 0;
    background-color: white;
    &:not(:first-of-type) {
      margin-top: 24px;
    }
  }
  > p {
    font-size: 18px;
    @include mq() {
      font-size: 15px;
    }
  }
  a {
    text-decoration: none;
    color: #1f2021;
    &:active {
      color: #1f2021;
    }
    &:focus {
      outline: none;
    }
  }
  button {
    height: 26px;
    border: 1px solid #a8aaad;
    padding: 3px 12px 4px;
    border-radius: 3px;
    background: #ffff;
    font-size: 12px;
    @include mq() {
      height: 37px;
      padding: 9px 10px;
    }
  }

  &--exclamation {
    display: inline;
    width: 25px;
    height: 25px;
    margin-bottom: 5px;
    @include mq() {
      width: 22px;
      height: 22px;
    }
  }
}
.Tooltip-inline {
  display: inline !important;
}

.Tooltip-icon {
  width: 21px;
  height: 21px;
  margin-left: 5px;
  margin-bottom: 4px;

  @include mq() {
    width: 16px;
    height: 16px;
  }
}

.balloon {
  position: absolute;
  margin-right: 16px;
}

.balloon-responsive {
  left: 50%;
  @media only screen and (max-width: 1025px) {
    left: 20%;
  }
}
// md:left-2 
@media only screen and (max-width: 639px) {
  .balloon {
    width: calc(100vw - 43px);
    left: 12px;
  }
  .member-info-title-text {
    width: 200px;
  }
}
</style>
