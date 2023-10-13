<template>
  <main class="l-main">
    <div class="p-toppage l-main__content">
      <div class="p-toppage__bg" />
      <div class="p-toppage__inner">
        <div
          v-if="getValidCmsArray(cmsContents(CMS_DATA, 'm_news_top')).length"
          class="p-toppage__important-notice"
          :class="{ 'p-toppage__important-notice-login': $auth.loggedIn }"
        >
          <div class="p-toppage__important-notice__wrap">
            <Icon
              width="28"
              height="24"
              name="information_important"
              class="p-toppage__important-notice__icon"
            />
            <ul class="p-toppage__important-notice__list">
              <li
                v-for="(item, i) in getValidCmsArray(
                  cmsContents(CMS_DATA, 'm_news_top')
                )"
                :key="i"
                class="p-toppage__important-notice__item"
              >
                <a
                  :href="`/information/detail/${cmsDeepData(item, 'id')}`"
                  class="p-toppage__important-notice__text"
                >
                  {{ cmsDeepData(item, "display_title") }}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <template v-if="$auth.loggedIn">
          <nav class="p-toppage__main-nav c-card">
            <section class="c-card__content">
              <div class="p-toppage__main-nav__wrap c-card__inner3">
                <div class="p-toppage__main-nav__user-info">
                  <div
                    class="
                      p-toppage__main-nav__menu p-toppage__main-nav__menu--name
                    "
                    @click="openMobileMenu"
                  >
                    <h2
                      v-if="userData.familyName || userData.firstName"
                      class="
                        p-toppage__main-nav__name
                        p-toppage__main-nav__name--large
                      "
                      wovn-ignore
                    >
                      {{ userName }} 様
                    </h2>
                    <h2
                      v-else
                      class="
                        p-toppage__main-nav__name
                        p-toppage__main-nav__name--large
                      "
                      wovn-ignore
                    >
                      氏名未設定
                    </h2>
                    <Icon
                      class="c-displaySp p-toppage__main-nav__name--icon"
                      :class="
                        isUserInfoMenus
                          ? 'p-toppage__main-nav__icon-open'
                          : 'p-toppage__main-nav__icon-close'
                      "
                      name="arrow_pull_up"
                      width="1.4rem"
                      height="1.4rem"
                    />
                    <span class="p-toppage__main-nav__id" wovn-ignore
                      >会員ID: {{ userData.ssoCustomerNo }}</span
                    >
                    <UserMenus
                      class="c-displaySp"
                      :isShow="isUserInfoMenus"
                      :mypageDisplayCode="mypageDisplayCode"
                      @hide="isUserInfoMenus = false"
                    />
                  </div>
                </div>
                <div
                  class="
                    p-toppage__main-nav__menu p-toppage__main-nav__menu--items
                  "
                >
                  <ul class="p-toppage__main-nav__items">
                    <li class="p-toppage__main-nav__item">
                      <a
                        :href="domainMypage + '/mypage/coupon?sort=getCouponDatetime'"
                      >
                        <Icon
                          name="contents_ticket"
                          class="p-toppage__main-nav__item__icon"
                        />
                        <span>マイクーポン</span></a
                      >
                    </li>
                    <li
                      class="
                        p-toppage__main-nav__item p-toppage__main-nav__item--sp
                      "
                    >
                      <a
                        :href="domainMypage + '/mypage/benepo?currentID=1'"
                        target="_blank"
                      >
                        <Icon
                          name="user_history"
                          class="
                            p-toppage__main-nav__item__icon
                            p-toppage__main-nav__item__icon--benepo
                          "
                        />
                        <div class="p-toppage__main-nav__item__flex">
                          <span>利用履歴・ベネポ</span
                          ><Icon
                            name="action_link"
                            class="p-toppage__search__link__icon-small"
                          />
                        </div>
                      </a>
                    </li>
                    <li
                      class="
                        p-toppage__main-nav__item p-toppage__main-nav__item--sp
                      "
                    >
                      <a
                        :href="domainMypage + '/mypage/setting'"
                        target="_blank"
                      >
                        <Icon
                          name="action_setting"
                          class="p-toppage__main-nav__item__icon"/>
                        <div class="p-toppage__main-nav__item__flex">
                          <span>会員設定</span
                          ><Icon
                            name="action_link"
                            class="p-toppage__search__link__icon-small"
                          /></div
                      ></a>
                    </li>
                    <li
                      class="
                        p-toppage__main-nav__item p-toppage__main-nav__item--sp
                      "
                    >
                      <a :href="domainMypage + '/mypage'">
                        <Icon
                          name="user_default"
                          class="p-toppage__main-nav__item__icon"
                        />
                        <span>マイページ</span>
                      </a>
                    </li>
                    <li
                      class="
                        p-toppage__main-nav__item p-toppage__main-nav__item--sp
                      "
                    >
                      <router-link to="/" @click.native="$auth.remove">
                        <Icon
                          width="20"
                          height="20"
                          name="action_sign_out"
                          class="p-toppage__main-nav__item__icon"
                        />
                        <span> ログアウト </span>
                      </router-link>
                    </li>
                  </ul>
                  <!-- .p-toppage__main-nav__items -->
                </div>
              </div>
              <!-- .p-toppage__main-nav__wrap -->
            </section>
          </nav>
        </template>

        <section class="p-toppage__cassette">
          <div class="p-toppage__cassette__wrap">
            <div
              class="p-toppage__cassette__title"
              :class="{ 'is-active': currentId === 0 }"
              @click="switchTab(0)"
            >
              ライフサービス
            </div>
            <div class="spacer"></div>
            <div
              class="p-toppage__cassette__title"
              :class="{ 'is-active': currentId === 1 }"
              @click="switchTab(1)"
            >
              旅行・宿泊
            </div>
            <div class="spacer"></div>
            <div class="p-toppage__cassette__title">
              <a :href="shopUrlSso" target="_blank"
                >ベネ通販<i
                  ><img
                    src="@/assets/images/icon/arrow-up-right-from-square-solid.svg"
                    alt=""/></i
              ></a>
            </div>
          </div>
        </section>
        <section class="p-toppage__search">
          <div class="p-toppage__search__wrap">
            <!-- /.p-toppage__search__head -->

            <div class="p-toppage__search__main">
              <div class="p-toppage__search__main__nav c-card">
                <template v-if="currentId === 0">
                  <div class="c-card__content">
                    <div class="p-toppage__search__main__input__nav">
                      <div
                        class="list__item"
                        v-on:click="lifeNavChange(1)"
                        :class="{ 'is-active': lifeIsActive === 1 }"
                      >
                        すべて（グルメ以外）
                      </div>
                      <div
                        class="list__item"
                        v-on:click="lifeNavChange(2)"
                        :class="{ 'is-active': lifeIsActive === 2 }"
                      >
                        グルメ
                      </div>
                    </div>
                    <div class="p-toppage__search__main__input c-card__inner">
                      <div class="p-toppage__search__main__row">
                        <div class="p-toppage__search__main__areaSelector">
                          <div class="c-select">
                            <select
                              class="c-select__control"
                              v-model="area_lrg_class_nm"
                              @change="onChangeLargeArea($event)"
                            >
                              <option disabled selected value="" class="default"
                                >大エリア</option
                              >
                              <option
                                v-for="(large, i) in largeAreaList"
                                :key="`large-${i}`"
                                :value="large.area_lrg_class_nm"
                              >
                                {{ large.area_lrg_class_nm }}
                              </option>
                            </select>
                          </div>
                          <div class="c-select">
                            <select
                              class="c-select__control"
                              v-model="area_mid_class_nm"
                              @change="onChangeMidArea($event)"
                              :disabled="area_lrg_class_nm === ''"
                            >
                              <option disabled selected value="" class="default"
                                >中エリア</option
                              >
                              <option
                                v-for="(middle, i) in middleAreaList"
                                :key="`middle-${i}`"
                                :value="middle.area_mid_class_nm"
                              >
                                {{ middle.area_mid_class_nm }}
                              </option>
                            </select>
                          </div>
                          <div class="c-select">
                            <select
                              class="c-select__control"
                              v-model="area_sml_class_nm"
                              :disabled="area_mid_class_nm === ''"
                            >
                              <option disabled selected value="" class="default"
                                >小エリア</option
                              >
                              <option
                                v-for="(small, i) in smallAreaList"
                                :key="`small-${i}`"
                                :value="small.area_sml_class_nm"
                              >
                                {{ small.area_sml_class_nm }}
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="p-toppage__search__main__row">
                        <div class="p-toppage__search__main__genreSelect">
                          <div class="c-select">
                            <select
                              class="c-select__control"
                              @change="lifeGenreChanged"
                            >
                              <option class="default" value="">ジャンル</option>
                              <option
                                v-if="!lifeGenreTags.includes('寿司')"
                                value="寿司"
                                >寿司</option
                              >
                              <option
                                v-if="!lifeGenreTags.includes('懐石')"
                                value="懐石"
                                >懐石</option
                              >
                              <option
                                v-if="!lifeGenreTags.includes('焼肉')"
                                value="焼肉"
                                >焼肉</option
                              >
                            </select>
                          </div>
                          <div
                            v-for="(item, index) in lifeGenreTags"
                            class="p-toppage__search__main__genreTags"
                          >
                            <span>{{ item }}</span
                            ><button v-on:click="deleteLifeGenreTags(index)">
                              ×
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="p-toppage__search__main__row">
                        <div class="p-toppage__search__main__keyword">
                          <FormsKeywordSearch
                            :placeholder="
                              !$utils.isSmartPhone()
                                ? 'F'
                                : 'キーワード、店名、地名など'
                            "
                            @input="input"
                            @onSearch="onSearch()"
                            :background="true"
                            :error="formKeywordError != ''"
                          />
                          <div
                            v-if="formKeywordError"
                            class="p-toppage__search__main__input--error"
                          >
                            <span><Icon name="alert" color="#CC0621"/></span
                            >{{ formKeywordError }}
                          </div>
                        </div>
                        <!-- 初期実装段階では非表示のためコメントアウト -->
                        <!-- <div class="p-toppage__search__main__map">
                          <TextButton
                            to="/map"
                            position="left"
                            class="p-toppage__search__main__map-search"
                          >
                            地図検索<Icon name="status_map" />
                          </TextButton>
                        </div> -->
                      </div>
                    </div>
                  </div>
                </template>
                <template v-if="currentId === 1">
                  <StaySearch />
                </template>
              </div>
              <!-- /.p-toppage__search__main__nav c-card -->
            </div>
            <!-- /.p-toppage__search__main -->
          </div>
        </section>
        <!-- .p-toppage__search -->

        <section>
          <template v-if="currentId === 0">
            <!-- 特大バナー -->
            <CMS
                contents_type="block_contents"
                location_code="BS_TOP_01_001-TOP_dekabanner"
            />

            <CMS
                contents_type="special_page"
                view_type="carousel"
                page_limit="15"
                view_area="top"
            />

            <!-- リステットコースエリア01 〜 リステットコースエリア03 -->
            <CMS
                contents_type="block_contents"
                location_code="BS_TOP_01_001-TOP_LC01"
            />
            <CMS
                contents_type="block_contents"
                location_code="BS_TOP_01_001-TOP_LC02"
            />
            <CMS
                contents_type="block_contents"
                location_code="BS_TOP_01_001-TOP_LC03"
            />

            <!-- 企業専用エリア（営業）01　〜 企業専用エリア（営業）05 -->
            <CMS
                contents_type="block_contents"
                location_code="BS_TOP_01_001-TOP-01"
            />
            <CMS
                contents_type="block_contents"
                location_code="BS_TOP_01_001-TOP-02"
            />
            <CMS
                contents_type="block_contents"
                location_code="BS_TOP_01_001-TOP-03"
            />
            <CMS
                contents_type="block_contents"
                location_code="BS_TOP_01_001-TOP-04"
            />
            <CMS
                contents_type="block_contents"
                location_code="BS_TOP_01_001-TOP-05"
            />

            <!-- 企業専用エリア（PM）01 〜 企業専用エリア（PM）05 -->
            <CMS
                contents_type="block_contents"
                location_code="BS_TOP_01_001-TOP-PM01"
            />
            <CMS
                contents_type="block_contents"
                location_code="BS_TOP_01_001-TOP-PM02"
            />
            <CMS
                contents_type="block_contents"
                location_code="BS_TOP_01_001-TOP-PM03"
            />
            <CMS
                contents_type="block_contents"
                location_code="BS_TOP_01_001-TOP-PM04"
            />
            <CMS
                contents_type="block_contents"
                location_code="BS_TOP_01_001-TOP-PM05"
            />

            <!-- 仕事に役立つメニュー -->
            <CMS
                contents_type="block_contents"
                location_code="BS_TOP_01_002-TOP_menu"
            />
            <!-- 仕事に役立つメニューもっと見るボタン -->
            <CMS
                contents_type="block_contents"
                location_code="BS_TOP_01_003-TOP_menu_more"
            />

            <!-- おすすめメニュー -->
            <CMS
                contents_type="block_contents"
                location_code="BS_TOP_01_004-TOP_menu2"
            />
            <!-- おすすめメニューもっと見るボタン -->
            <CMS
                contents_type="block_contents"
                location_code="BS_TOP_01_005-TOP_menu2_more"
            />

            <!-- アクセスランキング（中身） -->
            <CMS
                contents_type="block_contents"
                location_code="BS_TOP_01_006-TOP_ranking"
            />

            <!-- 制度バナー -->
            <CMS
                contents_type="block_contents"
                location_code="BS_TOP_01_007-TOP_seido"
            />
            <!-- 制度バナーもっと見るボタン -->
            <CMS
                contents_type="block_contents"
                location_code="BS_TOP_01_008-TOP_seido_more"
            />
          </template>
        </section>

        <section>
          <template v-if="currentId === 1">
            <!-- 宿泊01 〜 宿泊16 -->
            <CMS
                contents_type="block_contents"
                location_code="BS_STAY_TOP_01_001"
            />
            <CMS
                contents_type="block_contents"
                location_code="BS_STAY_TOP_01_002"
            />
            <CMS
                contents_type="block_contents"
                location_code="BS_STAY_TOP_01_003"
            />
            <CMS
                contents_type="block_contents"
                location_code="BS_STAY_TOP_01_004"
            />
            <CMS
                contents_type="block_contents"
                location_code="BS_STAY_TOP_01_005"
            />
            <CMS
                contents_type="block_contents"
                location_code="BS_STAY_TOP_01_006"
            />
            <CMS
                contents_type="block_contents"
                location_code="BS_STAY_TOP_01_007"
            />
            <CMS
                contents_type="block_contents"
                location_code="BS_STAY_TOP_01_008"
            />
            <CMS
                contents_type="block_contents"
                location_code="BS_STAY_TOP_01_009"
            />
            <CMS
                contents_type="block_contents"
                location_code="BS_STAY_TOP_01_010"
            />
            <CMS
                contents_type="block_contents"
                location_code="BS_STAY_TOP_01_011"
            />
            <CMS
                contents_type="block_contents"
                location_code="BS_STAY_TOP_01_012"
            />
            <CMS
                contents_type="block_contents"
                location_code="BS_STAY_TOP_01_013"
            />
            <CMS
                contents_type="block_contents"
                location_code="BS_STAY_TOP_01_014"
            />
            <CMS
                contents_type="block_contents"
                location_code="BS_STAY_TOP_01_015"
            />
            <CMS
                contents_type="block_contents"
                location_code="BS_STAY_TOP_01_016"
            />
          </template>
        </section>

        <section class="p-toppage__sns">
          <div class="p-toppage__sns__wrap">
            <div>
              <div class="p-toppage__sns__title">
                <div class="c-title">
                  <h2>ベネフィット・ステーションのSNS公式アカウント</h2>
                  <span
                    >会員の皆様にベネフィット・ステーションの最新情報やおすすめの特典情報をお届けします！</span
                  >
                </div>
              </div>
              <ul class="p-toppage__sns__lists">
                <li
                  v-for="item in snsGroup"
                  :key="item.id"
                  class="p-toppage__sns__list"
                >
                  <a
                    :href="$postingLink(item.linkpath).url"
                    :target="$postingLink(item.linkpath).target"
                  >
                    <div class="c-card">
                      <div class="c-card__content">
                        <div class="p-toppage__sns__list__inner c-card__inner3">
                          <div class="p-toppage__sns__list__image">
                            <Thumbnail
                              :thumb_src="item.image"
                              :thumb_alt="item.alt"
                              :thumb_ratio="1"
                            />
                          </div>
                          <div class="p-toppage__sns__list__content">
                            <h3 class="p-toppage__sns__list__title">
                              {{ $postingLink(item.linkpath).title }}
                            </h3>
                            <p class="p-toppage__sns__list__text">
                              {{ item.text }}
                            </p>
                          </div>
                        </div>
                        <!-- /.c-card__inner4 -->
                      </div>
                      <!-- /.c-card__content -->
                    </div>
                    <!-- /.c-card -->
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- .p-toppage__sns__wrap -->
        </section>
        <!-- /.p-toppage__sns -->

        <template v-if="currentId === 0">
          <CMS
              contents_type="block_contents"
              location_code="BS_TOP_01_009-TOP_digicat"
          />
          <!-- FOCUSバナー -->
          <CMS
              contents_type="block_contents"
              location_code="BS_TOP_01_010-TOP_focus"
          />

          <section class="p-toppage__info">
            <div class="p-toppage__info__wrap">
              <div>
                <h2 class="c-title">お知らせ</h2>
                <div class="c-card">
                  <div class="c-card__content">
                    <div class="c-card__inner">
                      <template v-if="isLoading.newsTop">
                        <LoadingContent />
                      </template>
                      <template
                        v-else-if="
                          getValidCmsArray(cmsContents(CMS_DATA, 'news_top'))
                            .length > 0
                        "
                      >
                        <router-link
                          v-for="(item, i) in getValidCmsArray(
                            cmsContents(CMS_DATA, 'news_top')
                          )"
                          class="p-toppage__info__content"
                          :key="i"
                          :to="`/information/detail/${cmsDeepData(item, 'id')}`"
                        >
                          <div class="p-toppage__info__title">
                            <div
                              v-if="
                                $moment(cmsDeepData(item, 'pub_date')).format(
                                  'YYYY年MM月DD日'
                                ) != 'Invalid date'
                              "
                              class="p-toppage__info__date"
                            >
                              {{
                                $moment(cmsDeepData(item, "pub_date")).format(
                                  "YYYY年MM月DD日"
                                )
                              }}
                              <span
                                v-if="cmsDeepData(item, 'news_type_name')"
                                class="c-label c-label--common"
                                >{{ cmsDeepData(item, "news_type_name") }}</span
                              >
                            </div>
                            <p>{{ cmsDeepData(item, "display_title") }}</p>
                          </div>
                        </router-link>
                      </template>
                      <template v-else>
                        お知らせを取得できませんでした
                      </template>
                    </div>
                  </div>
                </div>
                <!-- /.c-card -->
                <div class="p-toppage__info__detail">
                  <TextButton to="/information" position="right"
                    >お知らせ一覧を見る<Icon
                      name="arrow_right"
                      :color="$colors.brand.red"
                    />
                  </TextButton>
                </div>
              </div>
            </div>
          </section>

          <section class="p-toppage__banner">
            <CMS
                contents_type="block_contents"
                location_code="BS_TOP_01_011-TOP_banner"
            />
          </section>
        </template>
      </div>
    </div>
  </main>
</template>

<script>
import uniqBy from "lodash/uniqBy";
import filter from "lodash/filter";

export default {
  components: {},
  props: {},
  data() {
    return {
      CMS_DATA: [],
      cmsDataList: [],
      isUserInfoMenus: false,
      lifeIsActive: 1,
      lifeGenreSelect: "",
      lifeGenreTags: [],
      form: {
        keyword: ""
      },
      formKeywordError: "",
      isLoading: {
        newsTop: true
      },
      // ダミーのデータ（後でmockを作成すること！） ここから
      currentId: 0,
      cartsNumber: "3",
      categoryList: [],
      categories: [
        { id: 0, icon: "top_all" },
        { id: 1, icon: "top_gourmet" },
        { id: 2, icon: "top_entertainment" },
        { id: 3, icon: "top_study" },
        { id: 4, icon: "top_care" },
        { id: 5, icon: "top_other" }
      ],
      uses: [
        { id: 1, label: "給与天引きで支払可", value: 0 },
        { id: 2, label: "会員証・クーポン提示利用可", value: 0 },
        { id: 3, label: "ベネポが使えるプラン", value: 0 },
        { id: 4, label: "ベネポが貯まるプラン", value: 0 }
      ],
      keywordList: [
        // カテゴリタブを切り替えることでこの値が切り替わる
        { id: 1, keyword: "遊園地" },
        { id: 2, keyword: "ディズニー" },
        { id: 3, keyword: "出張" },
        { id: 4, keyword: "映画" },
        { id: 5, keyword: "クリスマス" }
      ],
      genreList:
        // カテゴリタブを切り替えることでこの値が切り替わる
        [
          { id: 1, genre: ["すべて", "すべて", "すべて", "すべて", "すべて"] },
          { id: 2, genre: ["食べる", "食べる", "食べる", "食べる", "食べる"] },
          { id: 3, genre: ["遊ぶ", "遊ぶ", "遊ぶ", "遊ぶ", "遊ぶ"] },
          {
            id: 4,
            genre: [
              "スキルアップ",
              "スキルアップ",
              "スキルアップ",
              "スキルアップ",
              "スキルアップ"
            ]
          },
          { id: 5, genre: ["育児", "育児", "育児", "育児", "育児"] },
          { id: 6, genre: ["その他", "その他", "その他", "その他", "その他"] }
        ],
      snsGroup: [
        {
          id: 1,
          image: "/logo_twitter01.png",
          alt: "Twitter",
          linkpath: "top/sns_twitter",
          text: "人気公演のチケット情報等をタイムリーにお届け"
        },
        {
          id: 2,
          image: "/logo_facebook01.png",
          alt: "Facebook",
          linkpath: "top/sns_facebook",
          text: "無料セミナー情報など、社会人に嬉しい情報をご紹介"
        },
        {
          id: 3,
          image: "/logo_instagram01.png",
          alt: "Instagram",
          linkpath: "top/sns_instagram",
          text: "社会人に役立つライフハック術を配信中"
        },
        {
          id: 4,
          image: "/logo_tiktok01.png",
          alt: "Tiktok",
          linkpath: "top/sns_tiktok",
          text: "お得な情報やサービスなどをショート動画でご紹介"
        },
        {
          id: 5,
          image: "/logo_youtube01.png",
          alt: "YouTube",
          linkpath: "top/sns_youtube",
          text: "キャンペーンや利用方法などを動画でご案内"
        }
      ],
      information: [
        {
          id: 1,
          date: "2021年04月21日",
          subtitle: "サービスについて",
          title: "システムメンテナンスに伴うサービス停止のご案内",
          href: ""
        },
        {
          id: 2,
          date: "2021年04月14日",
          subtitle: "サービスについて",
          title: "掲載店舗の営業時間について",
          href: ""
        },
        {
          id: 3,
          date: "2021年04月07日",
          subtitle: "サービスについて",
          title:
            "Famiポートシステムメンテナンスに伴うシステムサービス停止のお知らせ",
          href: ""
        }
      ],
      // ダミーのデータ（後でmockを作成すること！） ここまで
      area_lrg_class_nm: "",
      area_mid_class_nm: "",
      area_sml_class_nm: ""
    };
  },

  computed: {
    domainMypage() {
      return this.getMypageDomain(this.mypageDisplayCode);
    },
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
    isLogin() {
      if (this.$auth.loggedIn) return true;
      return false;
    },
    largeAreaList() {
      return uniqBy(this.$repositories("areaMock"), "area_lrg_class_nm");
    },

    middleAreaList() {
      const listFilter = filter(
        this.$repositories("areaMock"),
        (item) => item.area_lrg_class_nm === this.area_lrg_class_nm
      );

      return uniqBy(listFilter, "area_mid_class_nm");
    },

    smallAreaList() {
      const listFilter = filter(
        this.$repositories("areaMock"),
        (item) => item.area_mid_class_nm === this.area_mid_class_nm
      );

      return uniqBy(listFilter, "area_sml_class_nm");
    },
    shopUrlSso() {
      return this.getShopSSOURL();
    },
  },
  async mounted() {
    console.log("現在の開発モード", process.env.VUE_APP_DEV_MODE);
    this.isLoading.newsTop = true;
    this.$page.isTitle = false;
    this.$page.isPageHeader = false;
    await this.setCategory();
    this.switchTab(this.currentId);

    // 下記paramsは現状仮の値
    let params = {
      convenientService: "string",
      etcBanner: "string"
    };
    // CMSData取得
    this.CMS_DATA = await this.$repositories("cms").postTopPage(params);
    this.isLoading.newsTop = false;
  },
  methods: {
    lifeNavChange(num) {
      this.lifeIsActive = num;
    },
    lifeGenreChanged(e) {
      this.lifeGenreTags.push(e.target.value);
    },
    deleteLifeGenreTags(index) {
      this.$delete(this.lifeGenreTags, index);
    },
    async setCategory() {
      this.categoryList = [];
      // ログイン済み時はAPIからメニューを取得する
      // 2022-01-09: Remove below comments after coding v1/search
      //   if (this.isLogin) {
      //     const res = await this.$repositories("search").getSearchInit();
      //     if (res) {
      //       const filterList = res.data.moreLargeCategoryList.filter((x) => {
      //         return this.categories.some((c) => c.id == x.id);
      //       });
      //       this.categoryList = filterList.map((x) => {
      //         const target = this.categories.filter((y) => y.id == x.id);
      //         return {
      //           ...target[0],
      //           ...x
      //         };
      //       });
      //       this.categoryList.unshift({
      //         id: 0,
      //         name: "すべて",
      //         icon: "top_all"
      //       });
      //     }
      //   }
      if (this.categoryList.length == 0) {
        // 未ログイン時は静的なメニューを設定する
        const res = [
          { id: 0, name: "ライフサービス" },
          { id: 1, name: "旅行宿泊" }
          // { id: 2, name: "グルメ" }
        ];
        const filterList = res.filter((x) => {
          return this.categories.some((c) => c.id == x.id);
        });
        this.categoryList = filterList.map((x) => {
          const target = this.categories.filter((y) => y.id == x.id);
          return {
            ...target[0],
            ...x
          };
        });
      }
    },
    convertCategoryToString(num) {
      let category_name;
      switch (num) {
        case 0:
          category_name = "";
          break;
        case 1:
          category_name = "gourmet";
          break;
        case 2:
          category_name = "leisure";
          break;
        case 3:
          category_name = "skillup";
          break;
        case 4:
          category_name = "care";
          break;
        case 5:
          category_name = "others";
          break;
        default:
          category_name = "";
      }
      return category_name;
    },
    switchTab(id) {
      this.currentId = id;
    },
    input(args) {
      this.form.keyword = args;
    },
    getQueryString(categoryId = "") {
      let list = this.uses.filter((x) => x.value == 1);
      let usageMap = { "useage[]": list.map((x) => x.id) };
      this.$page.isPageHeader = false;
      const query = {};
      if (this.area_mid_class_nm) {
        query.area_mid_class_nm = this.area_mid_class_nm;
      }
      if (this.area_sml_class_nm) {
        query.area_sml_class_nm = this.area_sml_class_nm;
      }
      if (this.area_lrg_class_nm) {
        query.area_lrg_class_nm = this.area_lrg_class_nm;
      }
      if (!categoryId && !this.form.keyword) {
        return {
          ...usageMap,
          ...query
        };
      }
      if (categoryId) {
        var category = {
          category: categoryId
        };
      }
      if (this.form.keyword) {
        var keyword = {
          keyword: this.form.keyword
        };
      }
      if (!this.form.keyword) {
        return {
          ...category,
          ...usageMap,
          ...query
        };
      }
      if (!categoryId) {
        return {
          ...keyword,
          ...usageMap,
          ...query
        };
      }

      return {
        ...category,
        ...keyword,
        ...usageMap,
        ...query
      };
    },
    onSearch(currentId) {
      this.formKeywordError = "";
      if (!this.form.keyword) {
        this.formKeywordError = "検索キーワードを入力してください。";
        return;
      }
      // this.$router.push({
      //   path: process.env.VUE_APP_LIFE_DOMAIN + "/menus",
      //   query: this.getQueryString(currentId)
      // });
      const lifeDomain = this.getLifeDomain(this.mypageDisplayCode);
      window.location.href = lifeDomain + `/menus?keyword=${this.form.keyword}`;

      // const url = process.env.VUE_APP_SEARCH_DOMAIN + this.form.keyword;
      // console.log("search url", url);
      // window.open(url, "_self");
    },
    //================================
    // SP用メニュー表示切替処理
    //================================
    openMobileMenu() {
      if (window.innerWidth > this.$config.responsiveWidth) return false;
      this.isUserInfoMenus = true;
    },
    //================================
    // CMSデータ取得
    //================================
    cmsContents(obj, contentId) {
      if (!obj || !obj.data || !obj.data.objects) return [];
      if (obj.data.objects.length == 0) return [];

      let res = obj.data.objects.filter((x) => x.contentId == contentId);
      if (!res.length) return [];
      return res[0].data;
    },
    //================================
    // CMSデータ ネストされた値を取得
    //================================
    cmsDeepData(obj, key) {
      if (!obj) return "";
      let res = obj;
      let keys = key.split("/");
      for (let path of keys) {
        res = res[path];
      }
      return res;
    },
    //================================
    // 取得したCMSデータにて、不正なデータをフィルターする
    // 不正の定義が曖昧だが、現状は"display_title"が存在しないものをフィルターする
    //================================
    getValidCmsArray(ary) {
      if (!ary.length) return [];
      return ary.filter((x) => x.display_title);
    },
    onChangeLargeArea(event) {
      this.area_lrg_class_nm = event.target.value;
      this.area_mid_class_nm = "";
      this.area_sml_class_nm = "";
    },
    onChangeMidArea(event) {
      this.area_mid_class_nm = event.target.value;
      this.area_sml_class_nm = "";
    }
  },
  watch: {
    isLogin() {
      this.setCategory();
    },
    $route() {
      this.$page.isTitle = false;
      this.$page.isPageHeader = false;
    }
  }
};
</script>

<style scoped>
.l-main {
  margin-top: 0;
}
.cookieTest {
  padding: 4px;
  cursor: pointer;
}
</style>
