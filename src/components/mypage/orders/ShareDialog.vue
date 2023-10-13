<template>
  <!-- 共有ボタン押下後ダイアログ -->
  <dialog
    ref="orderCardMenuShareDialog"
    class="order-card-menu-share-dialog"
    @cancel.prevent="closeModal"
  >
    <div class="order-card-menu-share-dialog-body">
      <!-- 閉じるボタン -->
      <button
        class="cursor-pointer ml-auto mb-3"
        @click="closeModal"
      >
        <Icon name="action_close" width="30" height="30" :color="'#ffff'" />
      </button>

      <div class="bg-white rounded-lg">
        <!-- ヘッダー -->
        <div class="border-b border-red-500 text-center py-7 md:py-5">
          <span class="text-2xl md:text-lg font-bold">共有</span>
        </div>

        <!-- コンテンツ -->
        <div class="flex justify-center items-center md:flex-col my-16 md:my-6">

          <div class="flex justify-center md:invisible">
            <!-- lineアイコン -->
            <Share
              v-bind="onlyShareIconProps('line')"
              :mypageDisplayCode="mypageDisplayCode"
              @btn-click="closeModal"
              class="md:visible md:inline-block mr-7 md:mr-3"
            />

            <!-- emailアイコン -->
            <Share
              :mypageDisplayCode="mypageDisplayCode"
              v-bind="onlyShareIconProps('mail')"
              @btn-click="closeModal"
              class="md:visible md:inline-block mr-7 md:mr-0 md:mb-3"
            />
          </div>

          <!-- copyアイコン -->
          <Share
            v-bind="onlyShareIconProps('copy')"
            :mypageDisplayCode="mypageDisplayCode"
            @btn-click="closeModal"
          />
        </div>
      </div>
    </div>
  </dialog>
</template>

<script>
export default {
  props: ['menuNo', 'dataMail', 'applicationDetail', 'cardObj', 'mypageDisplayCode'],
  data() {
    return {
      menuNum: null,
      urlPath: null
    }
  },
  mounted() {
    this.urlPath = `${location.protocol}//${location.host}/public-stay/menus/${this.menuNo}`
  },
  methods: {
    gotoPath() {
      const query = this.$route.query
      this.$router.push({path: 'bs-men-02-040', query})
    },

    /**
     * 親コンポーネントでこのメソッドを実行することで、ダイアログが表示される。
     * ダイアログ開閉に関しては標準のdialogタグの機能を使用する。
     * また、デフォルトではスクロール可能であるため、スクロール防止のクラスを付与する。
     * @example
        <button
          @click="() => { $refs['shareDialog'].showModal() }"
        >
          共有
        </button>

        <ShareDialog
          ref="shareDialog"
        />
     */
    showModal() {
      document.body.classList.add('order-card-menu-share-dialog-is-open');
      this.$refs['orderCardMenuShareDialog'].showModal();
    },

    /** スクロール防止クラスを削除した後、ダイアログを閉じる */
    closeModal() {
      document.body.classList.remove('order-card-menu-share-dialog-is-open');
      this.$refs['orderCardMenuShareDialog'].close();
    },

    /**
     * Shareコンポーネントがデフォルトで全てのアイコンを表示するため、単体のみ表示するためのオブジェクトを返す
     * @param { 'facebook' | 'twitter' |  'favorite' | 'mail' | 'copy' | 'line' } icon
     */
    onlyShareIconProps(icon) {
      const iconProps = {
        facebook: false,
        twitter: false,
        favorite: false,
        mail: false,
        copy: false,
        line: false,
        label: "",
        url: this.urlPath,
        dataMail: this.dataMail,
        applicationDetail: this.applicationDetail,
        cardObj: this.cardObj
      }
      iconProps[icon] = true
      return iconProps
    }
  }
}
</script>

<style lang="scss">
  // スクロール防止用クラス
  .order-card-menu-share-dialog-is-open {
    overflow: hidden;
  }
</style>

<style scoped lang="scss">
.order-card-menu-share-dialog {
  background-color: rgba(0, 0, 0, 0);
  margin: 30vh auto 0;

  &::backdrop {
    background-color: #000000B3;
  }

  .order-card-menu-share-dialog-body {
    @apply flex flex-col;
    width: 60vw;

    @include mq() {
      width: 90vw;
    }

    // 共有ボタンのgapを消すよう上書き
    ::v-deep .b-share {
      column-gap: 0;
    }
  }
}
</style>
