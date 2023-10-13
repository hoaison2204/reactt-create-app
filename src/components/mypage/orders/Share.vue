<template>
  <div>
    <div :class="['b-share', size ? size : '']">
      <div class="b-share_inner">
        <p :class="{ link: isHidden }">{{ label }}</p>
      </div>
      <div class="b-share_inner">
        <a
          class="b-share-item"
          :class="{ link: isHidden }"
          target="_blank"
          :href="shareFacebook"
          v-if="facebook"
        >
          <Icon
            :width="24"
            :height="24"
            :color="'#3b5998'"
            name="sns_facebook"
          />
        </a>
        <a
          class="b-share-item"
          :class="{ link: isHidden }"
          target="_blank"
          :href="shareTwitter"
          v-if="twitter"
        >
          <Icon
            :width="24"
            :height="24"
            :color="'#00acee'"
            name="sns_twitter"
          />
        </a>
        <a
          class="b-share-item"
          :class="{ link: isHidden }"
          target="_blank"
          :href="shareLine"
          v-if="line"
          @click="triggerBtnClick"
        >
          <Icon class="w-12 h-12 md:w-7 md:h-7" :color="'#00B900'" name="sns_line" />
        </a>
        <a
          class="b-share-item cursor-pointer"
          :class="{ link: isHidden }"
          @click="showModal('showPopupAnnounce'), (errCode = '')"
          tabindex="0"
          @keydown.enter="showModal('showPopupAnnounce'), (errCode = '')"
          v-if="mail"
        >
          <Icon class="w-12 h-12 md:w-7 md:h-7" :color="'#E60021'" name="sns_mail" />
        </a>
        <!-- <PopUpSendMail  :visible="popupMail" @show="showPopup" @sendMail="sendMailToAddress($event)" :errCode="errCode" /> -->
        <!-- <div class="divider-v mt-6"  :class="{'link': !isHidden }"></div> -->
        <div class="item-action" :class="{ link: isHidden }" v-if="copy">
          <button
            class="c-btn btn-white btn-copy py-3 md:py-1 px-8 md:px-2"
            v-clipboard:copy="handleCopyContent"
            v-clipboard:success="copySuccess"
            v-clipboard:error="copyError"
            @click="triggerBtnClick"
          >
            内容をコピー
          </button>
        </div>
      </div>
      <div class="item-action" v-if="favorite">
        <a @click="handleFavorite">
          <i class="icon icon-bor-heart-solid" v-if="isFavorite" />
          <i class="icon icon-bor-heart-plus" v-else />
        </a>
      </div>
    </div>
    <Modal ref="showPopupAnnounce" @close="closeModal()">
      <div class="modalAnnounce">
        <div class="card">
          <div class="title ">メールで送る</div>
          <div class="description1 py-3">
            ご指定のメールアドレスへ、情報をお送りします。
          </div>
          <div class="description1">
            ※下記「送信する」ボタンを押すと、即時メールが返信されます
          </div>
          <input
            type="text sm:hidden"
            maxLength="255"
            class="input1"
            @input="changeEmail"
            v-model="email"
            placeholder="メールアドレスをご入力ください。"
          />
          <div class="description2">ご指定のメールアドレスへ、</div>
          <div class="description4">情報をお送りします。</div>

          <div class="description2">※下記「送信する」ボタンを押すと、即時</div>
          <div class="description5">メールが返信されます。</div>

          <div class="description2">※メール本文記載のURLは、PCホームペー</div>
          <div class="description5">ジ用のURLとなります。</div>

          <input
            type="text"
            class="input2 w-full py-2 pl-1"
            maxlength="255"
            v-model="email"
            placeholder="メールアドレスをご入力ください。"
          />

          <div class="description6" v-if="errCode === '1'">
            メールアドレスを入力してください。
          </div>

          <div class="description6" v-if="errCode === '2'">
            メールアドレスの形式が不正です
          </div>

          <div class="description6" v-if="emailLength >= 255">
            「255文字以内で入力をお願い致します」
          </div>
          <!-- <a-button size="large" class="submit-btn" @click="sendMail()"><span class="title-btn">送信する</span></a-button> -->
          <!-- Old -->
          <!-- <div class="description-modal">お気に入り一覧に削除してよろしいでしょうか？</div>
            <div class="btn-cms-modal">
              <div
                  v-for="(item, index) in anounce_email"
                  :key="`anounce_email-${index}`"
                  class="block-three-anounce-content-line1 c-checkbox"
              >
                <label class="c-checkbox__inner">
                  <input type="checkbox" v-model="item.status">
                  <span class="c-checkbox__box" />
                  <span class="c-checkbox__label">{{ item.email }}</span>
                </label>
              </div>
            </div> -->
          <div class="flex justify-around">
            <!-- <div class="btn-cms-modal ml-5">
                <button @click="handleCancel()" class="c-btn c-btn-modal btn-grey btn-left">
                  <span class="">キャンセル</span>
                </button>
              </div> -->
            <div class="btn-cms-modal btn-right mr-5">
              <button @click="handleOk()" class="c-btn c-btn-modal">
                <span class="mr-0">送信する</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: "Share",
  components: {},
  props: {
    label: {
      type: String,
      default: "シェア"
    },
    url: {
      type: String
    },
    success: {
      type: Function
    },
    error: {
      type: Function
    },
    facebook: {
      type: Boolean,
      default: true
    },
    twitter: {
      type: Boolean,
      default: true
    },
    line: {
      type: Boolean,
      default: true
    },

    copy: {
      type: Boolean,
      default: true
    },
    face: {
      type: Boolean,
      default: true
    },
    mail: {
      type: Boolean,
      default: true
    },
    isHidden: {
      type: Boolean,
      default: false
    },
    favorite: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: "normal"
    },
    dataMail: {
      type: Object,
      default: () => ({})
    },
    applicationDetail: {
      type: Object,
      default: () => ({})
    },
    cardObj: {
      type: Object,
      default: () => ({})
    },
    mypageDisplayCode: {
      type: String,
    },
  },
  data() {
    return {
      menuNo: null,
      isFavorite: false,
      favoriteId: null,
      popupLogin: false,
      popupMail: false,
      errCode: "0",
      emailLength: 0,
      email: "",
    };
  },
  watch: {
    email(val) {
      this.emailLength = val.length;
    }
  },
  mounted() {},
  watch: {
    menuNo() {
      this.isFavorite = false;
    }
  },
  computed: {
    mypageApiUrl() {
      return this.getMypageApiUrl(this.mypageDisplayCode);
    },
    stayDomain() {
      return this.getStayDomain(this.mypageDisplayCode);
    },
    stayReorderDomain() {
      return this.getStayReorderDomain(this.mypageDisplayCode);
    },
    urlPath() {
      const srvicDiv = this.$route.query.srvicDiv;
      const {
        menuNo,
        planId,
        roomId,
        catExlClassCd,
        catLrgClassCd,
        catMidClassCd,
        catSmlClassCd
      } = this.dataMail;

      if (srvicDiv === this.CONST.SRVIC_DIV.DOMESTIC_STAY) {
        return `${this.stayReorderDomain}/menu/${menuNo}/plans/${planId}/rooms/${roomId}`;
      }
      if (srvicDiv.startsWith("A") && srvicDiv !== this.CONST.SRVIC_DIV.DOMESTIC_STAY) {
        return `${this.stayReorderDomain}/public-stay/menus/${menuNo}`;
      }
      if (srvicDiv.startsWith("B")) {
        return `${location.origin}/menus/${catExlClassCd}/${catLrgClassCd}/${catMidClassCd}/${catSmlClassCd}/menuNo=${menuNo}/plans/planId=${planId}`;
      }
    },
    shareLine() {
      if (this.urlPath) {
        return `https://social-plugins.line.me/lineit/share?url=${this.urlPath}`;
      }
      return `https://social-plugins.line.me/lineit/share?url=${this.url}`;
    },
    shareFacebook() {
      if (this.url) {
        return `https://www.facebook.com/sharer/sharer.php?u=${this.url}`;
      }
      const url = encodeURIComponent(location.href);
      return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    },
    shareTwitter() {
      if (this.url) {
        return `https://twitter.com/intent/tweet?text=${this.url}`;
      }
      const url = encodeURIComponent(location.href);
      return `https://twitter.com/intent/tweet?text=${url}`;
    },
    shareEmail() {
      if (this.url) {
        return `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&body=+${this.url}+&ui=2&tf=1&pli=1'`;
      }
      // eslint-disable-next-line quotes
      return `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&body=+${location.href}+&ui=2&tf=1&pli=1'`;
    },
    domainTop() {
      return this.getTopDomain(this.mypageDisplayCode);
    }
  },
  methods: {
    closeModal() {
      this.email = "";
    },
    changeEmail() {
      this.emailLength = this.email.length;
    },
    validEmail(email) {
      const errorChar = [
        "._-",
        ".-_",
        "_.-",
        "_-.",
        "-._",
        "._-",
        ".-",
        "._",
        "_-",
        "_.",
        "-.",
        "-_",
        "_@",
        ".@",
        "-@",
        "@_",
        "@.",
        "@-",
        "--",
        "__"
      ];
      if (errorChar.some((item) => email.includes(item))) return false;
      const re = /^[a-z0-9](\.?[a-z0-9_-])+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    sendMail() {
      const data = this.dataMail;
      data.emailTo = this.email;
      if (!this.email) {
        this.errCode = "1";
      } else {
        let myEmail = null;
        myEmail = this.email.trim();
        if (this.validEmail(myEmail.trim())) {
          this.$repositories("orders")
            .sendMailToAddress(data)
            .then(() => {
              this.hideModal("showPopupAnnounce");
              this.triggerBtnClick();
              this.$toasted.success('メールを送信しました');
            })
        } else {
          this.errCode = "2";
        }
      }
      // if(!$event) {
      //   this.errCode = '1'
      // } else {
      //   let myEmail = null
      //   myEmail = $event.trim()
      //   if(this.validEmail(myEmail.trim())) {
      //     const data = {
      //       menuNo,
      //       email: $event
      //     }
      //     this.$repositories('orders').sendMailToAddress(data).then(
      //       () => {
      //         this.popupMail = false
      //       },
      //       (error) => {
      //         this.popupMail = false
      //         this.$toasted.error(error?.message)
      //       }
      //     )
      //   } else {
      //     this.errCode = '2'
      //   }
      // }
    },
    showModal(name) {
      this.$refs[name].show();
    },
    hideModal(name) {
      this.$refs[name].hide();
    },
    showModalDelete($event) {
      this.itemDelete = $event;
      this.visiblePopupDelete = true;
    },
    handleOk() {
      this.sendMail();

      this.email = "";
    },
    handleCancel() {
      this.visiblePopupDelete = false;
      this.hideModal("showPopupAnnounce");
    },
    handleCopyContent() {
      const { menuNm, menuNo, planId, planNm, roomId, catExlClassCd, catLrgClassCd, catMidClassCd, catSmlClassCd } = this.dataMail
      const { nightCnt, roomCnt, totalAdult, totalPeople } = this.applicationDetail
      const { checkInDate, srvicDiv } = this.cardObj

      const label = [menuNm, planNm].filter(Boolean).join('\n')
      let url = ''
      let copyData = ''
      if(this.isGCService(this.mypageDisplayCode)) {
        url = `${this.domainTop}/menus/catExl=${catExlClassCd}/catLrg=${catLrgClassCd}/catMid=${catMidClassCd}/catSml=${catSmlClassCd}/menuNo=${menuNo}/plans/planId=${planId}`
      } else {
        if(srvicDiv.startsWith('A')) {
          const formatCheckInDate = checkInDate.replaceAll('/','-')
          url = `${this.stayDomain}/menus/${menuNo}/plans/${planId}/rooms/${roomId}?category=stay&rooms=${roomCnt}&roomCnt=${roomCnt}&numPeople=${totalPeople}&stayNights=${nightCnt}&adultHeadCnt=${totalAdult}&checkInDate=${formatCheckInDate}`
        }else if(srvicDiv.startsWith('B')){
          url = `${this.stayDomain}/menus/catExl=${catExlClassCd}/catLrg=${catLrgClassCd}/catMid=${catMidClassCd}/catSml=${catSmlClassCd}/menuNo=${menuNo}/plans/planId=${planId}`
        }
      }
      copyData = [label, url].filter(Boolean).join('\n')

      return copyData
    },
    copySuccess() {
      this.$toasted.success("コピーしました");
    },
    copyError() {
      this.$toasted.error("コピーできません");
    },
    handleFavorite() {
      if (!this.isFavorite) {
        this.addFavorite(this.menuNo).then(
          (result) => {
            this.isFavorite = true;
            this.favoriteId = _.get(result, "id", null);
          },
          (error) => {
            this.$toasted.error(error?.message);
          }
        );
      } else {
        this.removeFavorite(this.favoriteId).then(
          () => {
            this.favoriteId = null;
            this.isFavorite = false;
          },
          (error) => {
            this.$toasted.error(error?.message);
          }
        );
      }
    },
    sendMailToAddress($event) {
      const menuNo = this.$route.params;
      if (!$event) {
        this.errCode = "1";
      } else {
        let myEmail = null;
        myEmail = $event.trim();
        if (this.validEmail(myEmail.trim())) {
          const data = {
            menuNo,
            email: $event
          };
          this.$repositories("plan")
            .sendMailToAddress(data)
            .then(
              () => {
                this.popupMail = false;
              },
              (error) => {
                this.popupMail = false;
                this.$toasted.error(error?.message);
              }
            );
        } else {
          this.errCode = "2";
        }
      }
    },
    showPopup($event) {
      this.popupMail = $event;
    },
    triggerSuccess(type, data) {
      this.$emit("success", {
        type,
        data
      });
    },
    triggerError(type, data) {
      this.$emit("error", {
        type,
        data
      });
    },
    triggerBtnClick(event) {
      this.$emit('btn-click', event)
    }
  }
};
</script>

<style lang="scss" scoped>
.title-modal {
  font-style: normal;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
}
.description-modal {
  width: 100%;
  font-weight: 400;
  font-size: 1rem;
  color: #1f2021;
  text-align: center;
  margin-bottom: 1.5rem;
}
.btn-cms-modal {
  margin: 2rem 0;
  text-align: center;
}
.mw-select-modal {
  text-align: center;
  min-width: 200px;
}
.c-btn-modal {
  min-width: 140px;
  height: 37px;
}
.btn-right {
  background-color: black;
  color: white;
  border: 1px solid;
  border-radius: 5px;
}
.btn-left {
  border: 1px solid;
  border-radius: 5px;
}

.title {
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  color: #1f2021;
  @apply pb-8;
}
.description1,
.description2,
.description3 {
  display: block;
  width: 100%;
  font-size: 1rem;
  color: #1f2021;
  text-align: center;
}
.description2 {
  text-align: center;
  display: none;
  @screen sm {
    display: block;
    font-size: 16px;
    font-weight: 400;
  }
}
.description3 {
  display: block;
  @apply pb-5 sm:flex;
}
.description1 {
  display: block;
  @apply sm:hidden pb-5;
  font-size: 16px;
}
.icon-bor-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
}
.input1 {
  margin: 0 auto;
  @apply block sm:hidden mt-2;
  width: 87%;
  border: 1px solid #00000038;
  border-radius: 5px;
}
.input2 {
  @apply hidden sm:block mt-2;
  border: 1px solid #00000038;
  border-radius: 5px;
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
::v-deep .ant-modal {
  width: unset !important;
  max-width: 600px !important;
  @screen sm {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100% !important;
    height: 93vh;
    margin: 0 !important;
  }
}
::v-deep .ant-modal-content {
  @apply sm:h-full md:h-full;
}
::v-deep .ant-card-body {
  padding: 0 !important;
}
::v-deep .ant-modal-body {
  padding: 2rem;
  @apply sm:px-4;
}

@screen sm {
  .submit-btn {
    position: fixed;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
  }
}

.description5 {
  text-align: left pt-5;
  display: none;
  @screen sm {
    @apply pb-3;
    padding-left: 40px;
    display: block;
    font-size: 16px;
    font-weight: 400;
  }
}

.description4 {
  text-align: center;
  display: none;
  @screen sm {
    @apply pb-3;
    display: block;
    font-size: 16px;
    font-weight: 400;
  }
}

.description6 {
  @apply pt-3;
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  color: red;
}
</style>
