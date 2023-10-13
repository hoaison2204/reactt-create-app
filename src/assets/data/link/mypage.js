/**
 * マイページ
 */
export default {
  $comment: "マイページ",
  "banner": {
    $comment: "マイページトップ > 家族会員施策キャンペーンバナー",
    title: "家族会員施策キャンペーンバナー",
    PC: "https://bs.benefit-one.co.jp/bs/pages/bo/template.faces?ih=/contents/special/bene_account_registration/&bspr=lightbox",
    SP: "https://bnft.jp/smp/m/b/t.faces?ih=/special/bene_account_registration/&bspr=lightbox",
    SSO: false,
    target_brank: true
  },
  "coupon": {
    $comment: "マイページトップ > マイクーポン",
    title: "マイクーポン",
    PC: "",
    SP: "",
    SSO: false,
    target_brank: true
  },
  "settings": {
    $comment: "マイページトップ > 会員設定",
    title: "会員設定",
    PC: "https://tst-auth.benefit-test.jp/account/portal/AccountManagementPortal?return_url=https%3A%2F%2Fbs.tst.benefit-one.inc%2Fmypage%2F&host_flg=false&subscription_id=12345&bo_service_code=BS",
    SP: "https://tst-auth.benefit-test.jp/account/portal/AccountManagementPortal?return_url=https%3A%2F%2Fbs.tst.benefit-one.inc%2Fmypage%2F&host_flg=false&subscription_id=12345&bo_service_code=BS",
    SSO: false,
    target_brank: true
  },
  "usageHistory": {
    $comment: "マイページトップ > 利用履歴・ベネポ",
    title: "利用履歴・ベネポ",
    PC: "https://bs.benefit-one.co.jp/bs/pages/bs/myPage/myPageTop.faces",
    SP: "https://bnft.jp/smp/pages/bs/mypage/myPageTop.faces",
    SSO: true,
    target_brank: true
  }
}
