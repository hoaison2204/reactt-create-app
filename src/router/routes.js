import DefaultLayout from "@/layouts/default";
import CONST_DATA from "@/mixins/const/constData";

// モード：mockかどうか
const mode =
  process.env.VUE_APP_DEV_MODE === CONST_DATA.ENV.LOCAL ||
  process.env.VUE_APP_DEV_MODE === CONST_DATA.ENV.DEVELOPMENT
    ? "mock"
    : "";

/**
 * auth
 */
const auth = {
  path: "/auth",
  name: "Login",
  component: () => import("@/views/auth"),
};

/**
 * contents
 */
const contents = {
  path: "/",
  component: DefaultLayout,
  children: [
    {
      path: "/",
      name: "Top",
      // route level code-splitting
      // this generates a separate chunk (top.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // beforeEnter() {
      //   console.log('TOP sending logic??');
      //   window.location = process.env.VUE_APP_TOP_DOMAIN;
      // },
    },
    // ================================
    // マイページ
    // ================================
    {
      path: "/mypage",
      component: () => import("@/views/mypage"),
      meta: {
        isAuthenticate: true,
      },
      children: [
        {
          path: "",
          name: "MyPageTop",
          component: () => import("@/views/mypage/index"),
          meta: {
            page: {
              title: "マイページ",
              name: "マイページ",
            },
          },
        },
        // ================================
        // クーポン
        // ================================
        {
          path: "benepo",
          name: "MyPageBenepo",
          component: () => import("@/views/mypage/benepo/index"),
          meta: {
            page: {
              title: "ベネポ",
              name: "ベネポ",
            },
            isAuthenticate: true,
          },
        },
        {
          path: "benepo/collect",
          name: "MyPageBenepoCollect",
          component: () => import("@/views/mypage/benepo/collect"),
          meta: {
            page: {
              title: "獲得予定ベネポ詳細",
              name: "獲得予定ベネポ詳細",
            },
            isAuthenticate: true,
          },
        },
        {
          path: "benepo/history",
          name: "MyPageBenepoHistory",
          component: () => import("@/views/mypage/benepo/history"),
          meta: {
            page: {
              title: "ベネポ獲得・利用履歴",
              name: "ベネポ獲得・利用履歴",
            },
            isAuthenticate: true,
          },
        },
        {
          path: "coupons",
          name: "MyPageCoupons",
          component: () => import("@/views/mypage/coupons"),
          meta: {
            page: {
              title: "補助クーポン",
              name: "補助クーポン",
            },
            isAuthenticate: true,
          },
        },
        {
          path: "coupon",
          name: "MyPageCoupons",
          component: () => import("@/views/mypage/coupon/index"),
          meta: {
            page: {
              title: "マイクーポン",
              name: "マイクーポン",
            },
            isAuthenticate: true,
          },
        },
        {
          path: "coupon/member",
          name: "MyPageCouponsMember",
          component: () => import("@/views/mypage/coupon/index"),
          meta: {
            page: {
              title: "マイクーポン",
              name: "マイクーポン",
            },
            isAuthenticate: true,
          },
        },
        {
          path: "coupon/past",
          name: "MyPageCouponsOld",
          component: () => import("@/views/mypage/coupon/past/index"),
          meta: {
            page: {
              title: "使用済み／有効期限切れのクーポン",
              name: "使用済み／有効期限切れのクーポン",
            },
            isAuthenticate: true,
          },
        },
        {
          path: "coupon/past/:id",
          name: "MyPageCouponsOld",
          component: () => import("@/views/mypage/coupon/past/_no/index"),
          meta: {
            page: {
              title: "過去のクーポン",
              name: "過去のクーポン",
            },
            isAuthenticate: true,
          },
        },
        {
          path: "coupon/show/digi",
          name: "MyPageCouponShow",
          component: () => import("@/views/mypage/coupon/digi/index"),
          meta: {
            page: {
              title: "クーポン利用",
              name: "クーポン利用",
            },
            isAuthenticate: true,
            isShowHeaderContent: true,
          },
        },
        {
          path: "coupon/show/member",
          name: "MyPageMemberCouponShow",
          component: () => import("@/views/mypage/coupon/member/index"),
          meta: {
            page: {
              title: "クーポン利用",
              name: "クーポン利用",
            },
            isAuthenticate: true,
            isShowHeaderContent: true,
          },
        },
        {
          path: "coupon/:id",
          name: "MyPageCoupon",
          component: () => import("@/views/mypage/coupon/_id"),
          meta: {
            page: {
              title: "クーポン詳細",
              name: "クーポン詳細",
            },
            isAuthenticate: true,
          },
        },
        {
          path: "visits",
          name: "MyPageVisits",
          component: () => import("@/views/mypage/visits/index"),
          meta: {
            page: {
              title: "閲覧履歴",
              name: "閲覧履歴",
            },
            isAuthenticate: true,
          },
        },
        {
          path: "favorites",
          name: "MyPageFavorites",
          component: () => import("@/views/mypage/favorites/index"),
          meta: {
            page: {
              title: "お気に入り",
              name: "お気に入り",
            },
            isAuthenticate: true,
          },
        },
        {
          path: "setting",
          name: "MyPageSetting",
          component: () => import("@/views/mypage/setting/index"),
          meta: {
            page: {
              title: "会員情報",
              name: "会員情報",
            },
            isAuthenticate: true,
          },
        },
        {
          path: "family",
          name: "MyPageFamily",
          component: () => import("@/views/mypage/family/index"),
          meta: {
            page: {
              title: "家族アカウント管理",
              name: "家族アカウント管理",
            },
            isAuthenticate: true,
          },
        },
        {
          path: "orders",
          name: "申込履歴一覧",
          component: () => import("@/views/mypage/orders/index"),
          meta: {
            page: {
              title: "申込履歴",
              name: "申込履歴",
            },
            isAuthenticate: true,
          },
        },
        {
          path: "cancel-confirmation",
          name: "（宿泊のみ）お申し込みキャンセル（内容確認）",
          component: () => import("@/views/mypage/cancel-confirmation"),
          meta: {
            page: {
              title: "キャンセル内容確認",
              name: "キャンセル内容確認",
            },
            isAuthenticate: true,
          },
        },
        {
          path: "cancel-confirmation-payment",
          name: "（宿泊のみ）お申し込みキャンセル（内容確認）",
          component: () =>
            import("@/views/mypage/cancel-confirmation-payment/index"),
          meta: {
            page: {
              title: "お申し込みキャンセル（内容確認）",
              name: "お申し込みキャンセル（内容確認）",
            },
            isAuthenticate: true,
          },
        },
        {
          path: "cancel-confirmation-payment/loading",
          name: "（宿泊のみ）お申し込み内容のご確認",
          component: () =>
            import("@/views/mypage/cancel-confirmation-payment/loading"),
          meta: {
            page: {
              title: "お申し込みキャンセル（内容確認）",
              name: "お申し込みキャンセル（内容確認）",
            },
            isAuthenticate: true,
          },
        },
        {
          path: "cancel-complete",
          name: "（宿泊のみ）お申し込み内容のご確認",
          component: () => import("@/views/mypage/cancel-complete"),
          meta: {
            page: {
              title: "キャンセル内容確認",
              name: "キャンセル内容確認",
            },
            isAuthenticate: true,
          },
        },
        {
          path: "cancel-confirmation-gourmet",
          name: "（グルメのみ）お申し込みキャンセル（内容確認）",
          component: () => import("@/views/mypage/cancel-confirmation-gourmet"),
          meta: {
            page: {
              title: "キャンセル内容確認",
              name: "キャンセル内容確認",
            },
            isAuthenticate: true,
          },
        },
        {
          path: "cancel-complete-gourmet",
          name: "（グルメのみ）お申し込みキャンセル（完了）",
          component: () => import("@/views/mypage/cancel-complete-gourmet"),
          meta: {
            page: {
              title: "お申し込みキャンセル（完了）",
              name: "お申し込みキャンセル（完了）",
            },
            isAuthenticate: true,
          },
        },
        {
          path: "orders/:id",
          name: "MyPageOrder",
          component: () => import("@/views/mypage/orders/_no/index"),
          meta: {
            page: {
              title: "申込内容",
              name: "申込内容",
            },
            isAuthenticate: true,
          },
        },
        {
          path: "receipt",
          name: "BS_MYP_05_020_領収書表示画面",
          component: () => import("@/views/mypage/receipt"),
          meta: {
            page: {
              title: "領収書",
              name: "領収書",
            },
            isAuthenticate: true,
          },
        },
        {
          path: 'receipt/shop',
          name: 'BS_MYP_05_020_領収書表示画面',
          component: () => import('@/views/mypage/receipt/shop'),
          meta: {
            page: {
              title: '領収書',
              name: '領収書',
            },
            isAuthenticate: true,
          },
        },
        // ================================
        // Netflix
        // ================================
        {
          path: "netflix",
          name: "Netflix",
          component: () => import("@/views/mypage/subscription/netflix_bandle/index"),
          meta: {
            page: {
              title: "Netflix",
              name: "Netflix",
            },
            isAuthenticate: true,
          },
        },
        {
          path: "netflix/recovery",
          name: "Netflix",
          component: () => import("@/views/mypage/subscription/netflix_bandle/recovery"),
          meta: {
            page: {
              title: "Netflix",
              name: "Netflix",
            },
            isAuthenticate: true,
          },
        },
        {
          path: 'receipt/shop',
          name: 'BS_MYP_05_020_領収書表示画面',
          component: () => import('@/views/mypage/receipt/shop'),
          meta: {
            page: {
              title: '領収書',
              name: '領収書',
            },
            isAuthenticate: true,
          },
        },
        {
          path: "netflix/changeplan",
          name: "Netflix",
          component: () => import("@/views/mypage/subscription/netflix_bandle/changePlan"),
          meta: {
            page: {
              title: "Netflix",
              name: "Netflix",
            },
            isAuthenticate: true,
            noCache: true
          },
        },
        // ================================
        // Netflix 給トク
        // ================================
        {
          path: "payroll/netflix",
          name: "Netflix",
          component: () => import("@/views/mypage/subscription/nexflix_kyutoku/index"),
          meta: {
            page: {
              title: "Netflix",
              name: "Netflix",
            },
            isAuthenticate: true,
          },
        },
        {
          path: "payroll/netflix/changeplan",
          name: "Netflix",
          component: () => import("@/views/mypage/subscription/nexflix_kyutoku/changePlan"),
          meta: {
            page: {
              title: "Netflix",
              name: "Netflix",
            },
            isAuthenticate: true,
            noCache: true
          },
        },
        {
          path: "payroll/netflix/recovery",
          name: "Netflix",
          component: () => import("@/views/mypage/subscription/nexflix_kyutoku/recovery"),
          meta: {
            page: {
              title: "Netflix",
              name: "Netflix",
            },
            isAuthenticate: true,
            noCache: true
          },
        },
        {
          path: "payroll/netflix/cancel",
          name: "Netflix",
          component: () => import("@/views/mypage/subscription/nexflix_kyutoku/cancel"),
          meta: {
            page: {
              title: "Netflix",
              name: "Netflix",
            },
            isAuthenticate: true,
            noCache: true
          },
        },
        {
          path: "payroll/netflix/changemail",
          name: "Netflix",
          component: () => import("@/views/mypage/subscription/nexflix_kyutoku/changeMail"),
          meta: {
            page: {
              title: "Netflix",
              name: "Netflix",
            },
            isAuthenticate: true,
            noCache: true
          },
        },
        {
          path: "payroll/netflix/changeopt",
          name: "Netflix",
          component: () => import("@/views/mypage/subscription/nexflix_kyutoku/changeOptFlag"),
          meta: {
            page: {
              title: "Netflix",
              name: "Netflix",
            },
            isAuthenticate: true,
            noCache: true
          },
        },
        {
          path: "payroll/netflix/success",
          name: "Netflix",
          component: () => import("@/views/mypage/subscription/nexflix_kyutoku/success"),
          meta: {
            page: {
              title: "Netflix",
              name: "Netflix",
            },
            isAuthenticate: true,
            noCache: true
          },
        },
      ],
    },
    // ================================
    // map
    // ================================
    {
      path: "/map",
      name: "map",
      component: () => import("@/views/map"),
    },

    // ================================
    // callback
    // ================================
    {
      path: "/authorization/cb",
      name: "callback",
      component: () => import("@/views/authorization/cb"),
      meta: {
        isCallback: true
      }
    },

    // ================================
    // error
    // ================================
    {
      path: "/*maintenance",
      name: "maintenance",
      component: () => import("@/layouts/maintenance.vue"),
      meta: {
        page: {
          title: "maintenance",
          name: "maintenance",
        },
        isShowHeaderContent: false,
      },
    },
    {
      path: "/access-error",
      name: "accessError",
      component: () => import("@/layouts/accessError.vue"),
    },
    {
      path: "/not-member",
      name: "CrthCrlyNotMemberError",
      component: () => import("@/views/CRM/templates/CrthCrlyError.vue"),
      props: {
        errorType: "notMember"
      }
    },
    {
      path: "/line-busy-error",
      name: "CrthCrlyLineBusyError",
      component: () => import("@/views/CRM/templates/CrthCrlyError.vue"),
      props: {
        errorType: "lineBusy"
      }
    },     
    {
      path: "/404",
      name: "404Error",
      component: () => import("@/layouts/error_404.vue"),
      meta: {
        page: {
          title: "404Error",
          name: "404Error",
        },
      },
    },
    {
      path: "/*error",
      name: "error",
      component: () => import("@/layouts/error.vue"),
      meta: {
        page: {
          title: "errorDefault",
          name: "errorDefault",
        },
        isShowHeaderContent: false,
      },
    },
    {
      path: "/*session-time-out",
      name: "sessionTimeOut",
      component: () => import("@/layouts/error_session.vue"),
      meta: {
        page: {
          title: "sessionTimeOut",
          name: "sessionTimeOut",
        },
        isShowHeaderContent: false,
      },
    },
    {
      path: "/no-mail-address",
      name: "noMailAddress",
      component: () => import("@/layouts/no_mail_address.vue"),
      meta: {
        page: {
          title: "noMailAddress",
          name: "noMailAddress",
        },
      },
    },
    {
      path: "/tokuhodai-login",
      name: "tokuhodaiLogin",
      component: () => import("@/views/CRM/templates/CrthLogin.vue"),
    },
    {
      path: "/not-available",
      name: "notAvailable",
      component: () => import("@/layouts/error_auth.vue"),
      meta: {
        page: {
          title: "notAvailable",
          name: "notAvailable"
        },
        isShowHeaderContent: false,
        isAuthenticate: false
      }
    },
    {
      path: "/*",
      // redirect: '/404',
      beforeEnter() {
        window.location = "/404";
      },
    },
  ],
};

// 開発モード(local, development)用ルーティング
let devRoutes = [auth];
if (mode !== "mock") devRoutes = [];

// ルーティングリスト
let routes = [contents];
routes = devRoutes.concat(routes);

export default routes;
