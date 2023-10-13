<template>
  <div class="l-container confirm-info mx-auto">
    <!-- Breadcrumb -->
    <div class="top-title ml-2 font-bold">
      <h3>公開プロフィール</h3>
    </div>
    <a-divider />

    <!-- MAIN -->
    <div class="main-content flex">
      <!-- SIDEBAR -->
      <div class="left-content">
        <LeftMenuBar :navBars="navBars" />
      </div>
    </div>

  </div>
</template>

<script>
import LeftMenuBar from "@/components/componentsList/LeftMenuBar.vue"
export default {
    components: {
        LeftMenuBar,
    },
    data() {
        return {
        isEditInfomation: false,
        isEditNotification: false,
        breadcrumb_data: [
            'トップ',
            'マイページ',
            '公開プロフィール'
        ],
        titleContent: ['基本情報', 'お気に入りエリア・興味のあるカテゴリ', 'メール受信・通知', 'クレジットカード'],
        lineType: { horizontal: 'h-line', vertical: 'v-line' },
        fullName: '',
        profileInfo: {
            familyName: '',
            firstName: '',
            tel: '',
            email: '',
            addresses: [
            {
                address1: '',
                address2: ''
            }
            ]
        },
        anounce_email,
        anounceEmails: [],
        hasError: false,
        error_message: 'メールアドレスを入力してください',
        errorMessageEmail: null,
        errorMessagePhone: null,
        errorMessageName: null,
        errorMessageAddress1: null,
        errorMessageAddress2: null,
        address1: null,
        address2: null,

        // value pop up favorite
        visiblePopupFavorite: false,
        favoriteAreas: [],
        favoriteArea: null,
        // pop up interest
        visiblePopupInterest: false,
        interestList: [],
        interesetLists: [],
        customStyle_panel: 'background-color: #ffffff',
        districtFavorite: null,
        errorMessageFavorite: '',
        navBars: [
            { path: '/mypage', name: 'マイページトップ' },
            { type: 'divider' },
            { path: '/mypage/benepo-history', name: '総保有ベネポ・ベネポ履歴' },
            { path: '/mypage/benepo-collect', name: '獲得予定のベネポ' },
            { type: 'divider' },
            { path: '/mypage/coupons', name: '専用ポイント・補助クーポン' },
            { type: 'divider' },
            { path: 'bs-myp-02-001', name: 'マイクーポン' },
            { path: 'bs-myp-02-010', name: '過去のクーポン' },
            { type: 'divider' },
            { path: '/mypage/orders', name: 'お申し込み履歴' },
            { path: '', name: '給トク払いご利用履歴', icon: 'icon-bor-copy' },
            { type: 'divider' },
            { path: '/mypage/visits', name: '閲覧履歴' },
            { type: 'divider' },
            { path: '/mypage/favorites', name: 'お気に入りメニュー' },
            { type: 'divider' },
            { path: '/mypage/setting', name: '会員プロフィール', icon: 'icon-bor-copy' },
            { path: '', name: 'メール受信・通知', icon: 'icon-bor-copy' },
            { path: '', name: 'クレジットカード', icon: 'icon-bor-copy' },
            { type: 'divider' },
            { path: '', name: '家族アカウント管理', icon: 'icon-bor-copy' }
        ]
    }
  },
  computed: {},
  methods: {},
  mounted() {
    // ページヘッダー非表示（決済エラーの時のみ）
    if (this.$route.query.planId) {
      this.$page.isPageHeader = false;
    }
    // パンくずリスト非表示
    this.$page.isBreadcrumb = false;
    // フッターメニュー非表示
    this.$page.showFooterMenu = false;
  },
  watch: {
    $route() {
      // ページヘッダー非表示
      if (this.$route.query.planId) {
        this.$page.isPageHeader = false;
      }
      // パンくずリスト非表示
      this.$page.isBreadcrumb = false;
      // フッターメニュー非表示
      this.$page.showFooterMenu = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
