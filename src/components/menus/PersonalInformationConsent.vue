<template>
  <div class="p-menu-personal-information-consent">
    <Modal
      ref="personal-infomation"
      width-size="LL"
      title="ログインした状態で、提携サイトへ遷移いたします。"
    >
      <div class="p-menu-personal-information-consent__inner">
        <h3 class="c-title2">ご注意事項</h3>
        <ul class="p-menu-personal-information-consent__notice-list">
          <li>
            サービス提供企業ホームページへ遷移後はその他のホームページを閲覧しないでください。
          </li>
          <li>
            遷移後その他のホームページなどを閲覧されたり、別のブラウザでホームページを閲覧されると特典対象外となる可能性がございます。
          </li>
          <li>
            また通信障害が発生すると特典対象外となりますので、通信環境がよい環境下でのご購入をお願いいたします。
          </li>
          <li>
            クッキーが削除されてしまうと特典対象外となりますので、クッキーの有効期限内で、またはクッキーが削除されない環境下にての購入等を完了してください。
          </li>
          <li>
            ベネポが特典のメニュー・プランにおいて、ベネポの付与は最大で3ヶ月程度お時間いただく場合がございます。
          </li>
          <li>
            またメニュー・プランにより付与時期が異なる場合がございます。詳細はメニュー・プランの詳細をご確認ください。
          </li>
          <li>
            ご予約内容の確認、ご予約をキャンセルされる場合、宿泊施設に関する質問、予約方法、領収書発行については各予約サイトへお問い合わせください。
          </li>
        </ul>

        <p class="p-menu-personal-information-consent__description">
          下記の個人情報の取扱について、同意の上お申し込みください。
        </p>

        <h3 class="c-title2">個人情報の第三者提供等に関するご同意について</h3>
        <p class="p-menu-personal-information-consent__description">
          今回の会員様による本件メニューのお申込み（以下「本申込み」といいます）にあたり、下記①に記載の会員様の個人情報（以下「個人情報」といいます）を、株式会社ベネフィット・ワン（以下「弊社」といいます）が下記②に記載の第三者に対し提供し、下記③の利用目的の範囲内で当該第三者が個人情報を利用することにつき、会員様のご同意をお願いいたします。
        </p>
        <div>
          <p class="p-menu-personal-information-consent__paragraph">記</p>
          <ul class="p-menu-personal-information-consent__contents">
            <li class="p-menu-personal-information-consent__contents__list">
              <h4 class="p-menu-personal-information-consent__contents__title">
                <span>&#9312;</span>弊社が第三者に提供する個人情報の内容
              </h4>
              <p>
                本申込み及びこの後お申込み画面にて会員様にご入力いただく本申込みに係るすべての情報。
              </p>
            </li>
            <li class="p-menu-personal-information-consent__contents__list">
              <h4 class="p-menu-personal-information-consent__contents__title">
                <span>&#9313;</span>弊社が個人情報を提供する第三者
              </h4>
              <p>
                メニューの提供において弊社と業務提携関係にあるアフィリエイト・サービス・プロバイダの繋ぎ込みを行っているサービスや宿泊施設等のサービス提供企業（以下、単に「サービス提供企業」といいます）。
              </p>
            </li>
            <li class="p-menu-personal-information-consent__contents__list">
              <h4 class="p-menu-personal-information-consent__contents__title">
                <span>&#9314;</span>個人情報の提供を受けた第三者における利用目的
              </h4>
              <p>
                サービス提供企業において、本申込みをいただいた会員様等に対し、本件メニューの履行、及びサービスの提供を行うため。
              </p>
            </li>
            <li class="p-menu-personal-information-consent__contents__list">
              <p>
                弊社は、サービス提供企業との間に、個人情報の保護に関する契約を締結しております。
              </p>
              <p>
                詳しくは、<a class="c-text-button2"
                  >個人情報の取り扱いについて</a
                >をご覧ください。
              </p>
            </li>
          </ul>
        </div>
        <div class="p-menus-no-plan-detail__application__button">
          <div class="c-buttonWrap3">
            <a
              @click="hideModal"
              class="c-button c-button__primary c-button__primary--color4"
              >キャンセル</a
            >
            <a
              class="c-button c-button__primary
            c-button__primary--color2"
              @click="clickAgreeBtn"
              >上記内容に同意して提携サイトへ</a
            >
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      isVisible: false
    };
  },
  computed: {},
  methods: {
    showModal(name) {
      this.$refs[name].show();
    },
    clickAgreeBtn() {
      this.$emit("agree");
    },
    hideModal() {
      this.$refs["personal-infomation"].hideModal();
    }
  }
};
</script>

<style lang="scss" scoped></style>
