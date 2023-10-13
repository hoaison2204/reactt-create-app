<template>
  <div>
    <div class="mb-2.5">
      <a
        @click="handleBack"
        class="c-text-button"
      >
      <Icon name="arrow_left" :color="$colors.brand.red" />
        <span class="ml-5 text-sm" >お申込み内容詳細に戻る</span>
      </a>
    </div>
    <div class="c-card">
      <div class="c-card__inner">
        <div class="c-box">
          <div class="text-center">
            <div class="mb-2 sm:mb-1.5">
              <span class="font-bold text-xl sm:text-base">お申し込みをキャンセルしました。</span>
            </div>
            <div class="pb-6 sm:pb-5">
              <span v-if="getCancelNo" class="mr-8 text-xs text-gray-500 text_cancelNo">(キャンセルNo.{{ getCancelNo }})</span>
            </div>
          </div>
          <div class="text_content">
            ご登録のメールアドレスへキャンセル手続き完了メールをお送りしております。
            <br class="sm:hidden">
            ご確認くださいませ。
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'BS_MYP_05_043',
  components: {
  },
  data() {
    return {
    }
  },
  watch: {
    $route() {
      this.setBreadcrumb();
    }
  },

  methods: {
    handleBack() {
      // お申込み内容詳細画面に遷移
      const { menuNo, acptNo , isPublicStay, srvicDiv, boCode } = this.$route.query
      this.$router.push({path: `/mypage/orders/${menuNo}?acptNo=${acptNo}&srvicDiv=${srvicDiv}&isPublicStay=${isPublicStay}&boCode=${boCode}`})
    },
    setBreadcrumb() {
      const { menuNo, acptNo , isPublicStay, srvicDiv, boCode } = this.$route.query
      this.$page.setBreadcrumb(
        this.$page.formatBreadcrumb("マイページ", "/mypage")
      );
      this.$page.setBreadcrumb(
        this.$page.formatBreadcrumb("申込履歴", "/mypage/orders")
      )
      this.$page.setBreadcrumb(
        this.$page.formatBreadcrumb("申込内容詳細", `/mypage/orders/${menuNo}?acptNo=${acptNo}&srvicDiv=${srvicDiv}&isPublicStay=${isPublicStay}&boCode=${boCode}`)
      );
      this.$page.setBreadcrumb(
        this.$page.formatBreadcrumb("キャンセル完了")
      )
    },
    handleResize() {
      this.$router.go({path: this.$router.currentRoute.path, force: true})
    }
  },
  computed: {
    getCancelNo() {
      return this.$store.state.orders.cancelNo
    },
    getAcptNo(){
      const query = this.$route.query
      const acptNo = query.acptNo
      return acptNo
    },
  },
  mounted() {
    this.$meta.setDocumentTitle("キャンセル内容確認");

    if(window.innerWidth > 1023) {
      this.$page.showSideMenu = true;
    } else {
      this.$page.showSideMenu = false;
    }

    this.setBreadcrumb();
    window.addEventListener('resize', this.handleResize)
  }
}
</script>

<style lang="scss" scoped>
.text_content {
  font-size: 15px;
  padding: 0 64px;
}

@media only screen and (max-width: $contentWidthMd) {
  .text_content {
    padding-left: 100px;
  }
}

@media only screen and (max-width: $contentWidthS) {
  .text_content {
    font-size: 13px;
    padding: 0 4px;
  }

  .text_cancelNo {
    font-size: 10px;
  }
}
</style>
