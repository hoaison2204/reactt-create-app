/**
 * メニューアイコン出し分け定義
 */
export default async (context, inject) => {
  inject("menuIcons", {
    /**
     * アイコンコードよりアイコン定義情報を取得する
     * @param {string} iconCd - アイコンコード
     * @returns アイコン定義オブジェクト
     */
    getIconDefine(iconCd) {
      const res = menuIconsMap.filter((x) => {
        return x.iconCd == iconCd
      });
      return res.length == 0 ? {} : res[0];
    },
    /**
     * アイコンの表示可否を返却する
     * @param {string} iconCd - アイコンコード
     * @param {boolean} isLogin - ログインしているかどうか
     * @param {boolean} device - PC or SP
     * @param {object} route - vueルートオブジェクト
     * @returns {boolean} - 表示可能かどうか返却 true: 表示可
     */
    isAvailable(iconCd, isLogin=false, device=false, route={}) {
      const iconDefine = this.getIconDefine(iconCd);
      if(!Object.keys(iconDefine).length) return false;
      // 現在のページがmenu or planList or plansのいずれかを判定する
      const page = route.params.planId
                      ? 'plan' : route.params.menuNo && route.path.includes('plans')
                      ? 'list' : 'menu';

      let checks = [];
      checks.push(isLogin ? iconDefine.show.login.before : iconDefine.show.login.after);
      checks.push(device ? iconDefine.show.device.pc : iconDefine.show.device.sp);
      checks.push(iconDefine.show[page]);
      return !checks.includes(false);
    }
  });
};

// カテゴリ定義（アイコンの整理_MN追記.xlsxより）
const menuIconsMap = [
  {
    iconNo: 2,
    iconNm: '補助金利用可',
    iconCd: '',
    show: {
      login: {
        before: true,
        after: true
      },
      device: {
        pc: true,
        sp: true
      },
      menu: true,
      plan: false,
      list: false
    }
  },
  {
    iconNo: 3,
    iconNm: 'カフェ',
    iconCd: '',
    show: {
      login: {
        before: false,
        after: true
      },
      device: {
        pc: true,
        sp: true
      },
      menu: true,
      plan: false,
      list: false
    }
  },
  {
    iconNo: 5,
    iconNm: 'すくすくえいど',
    iconCd: 'sukusuku_aid',
    show: {
      login: {
        before: true,
        after: true
      },
      device: {
        pc: true,
        sp: true
      },
      menu: true,
      plan: false,
      list: false
    }
  },
  {
    iconNo: 6,
    iconNm: 'すくすくmonthly',
    iconCd: 'sukusuku_monthly',
    show: {
      login: {
        before: true,
        after: true
      },
      device: {
        pc: true,
        sp: true
      },
      menu: true,
      plan: false,
      list: false
    }
  },
  {
    iconNo: 7,
    iconNm: '介護補助',
    iconCd: 'kaigo_hojo',
    show: {
      login: {
        before: true,
        after: true
      },
      device: {
        pc: true,
        sp: true
      },
      menu: true,
      plan: false,
      list: false
    }
  },
  {
    iconNo: 8,
    iconNm: 'ベネポ貯まる',
    iconCd: 'benepo_tamaru',
    show: {
      login: {
        before: true,
        after: true
      },
      device: {
        pc: true,
        sp: true
      },
      menu: false,
      plan: true,
      list: true
    }
  },
  {
    iconNo: 9,
    iconNm: 'ベネポ使える',
    iconCd: 'benepo_tsukaeru',
    show: {
      login: {
        before: true,
        after: true
      },
      device: {
        pc: true,
        sp: true
      },
      menu: false,
      plan: true,
      list: true
    }
  },
  // アイコン整理.xlsxではグレーアウト
  {
    iconNo: 13,
    iconNm: '教育訓練給付金',
    iconCd: 'kyouiku_kunren_kyufukin',
    show: {
      login: {
        before: true,
        after: true
      },
      device: {
        pc: true,
        sp: true
      },
      menu: true,
      plan: false,
      list: false
    }
  },
  {
    iconNo: 15,
    iconNm: '抽選',
    iconCd: 'lottery',
    show: {
      login: {
        before: true,
        after: true
      },
      device: {
        pc: true,
        sp: false
      },
      menu: false,
      plan: true,
      list: true
    }
  },
  {
    iconNo: 16,
    iconNm: '先着',
    iconCd: 'first_arrival',
    show: {
      login: {
        before: true,
        after: true
      },
      device: {
        pc: true,
        sp: false
      },
      menu: false,
      plan: true,
      list: true
    }
  },
  {
    iconNo: 24,
    iconNm: '時間帯',
    iconCd: 'morning',
    show: {
      login: {
        before: true,
        after: true
      },
      device: {
        pc: true,
        sp: true
      },
      menu: true,
      plan: true,
      list: true
    }
  },
  {
    iconNo: 24,
    iconNm: '時間帯',
    iconCd: 'lunch',
    show: {
      login: {
        before: true,
        after: true
      },
      device: {
        pc: true,
        sp: true
      },
      menu: true,
      plan: true,
      list: true
    }
  },
  {
    iconNo: 24,
    iconNm: '時間帯',
    iconCd: 'dinner',
    show: {
      login: {
        before: true,
        after: true
      },
      device: {
        pc: true,
        sp: true
      },
      menu: true,
      plan: true,
      list: true
    }
  },
  {
    iconNo: 25,
    iconNm: 'WEB予約',
    iconCd: 'web_rsv',
    show: {
      login: {
        before: true,
        after: true
      },
      device: {
        pc: true,
        sp: true
      },
      menu: true,
      plan: true,
      list: true
    }
  },
  {
    iconNo: 25,
    iconNm: 'リクエスト予約',
    iconCd: 'request_rsv',
    show: {
      login: {
        before: true,
        after: true
      },
      device: {
        pc: true,
        sp: true
      },
      menu: true,
      plan: true,
      list: true
    }
  },
  {
    iconNo: 26,
    iconNm: '現地決済予約',
    iconCd: 'local_payment_rsv',
    show: {
      login: {
        before: true,
        after: true
      },
      device: {
        pc: true,
        sp: true
      },
      menu: true,
      plan: true,
      list: true
    }
  },
  {
    iconNo: 28,
    iconNm: '事前決済予約',
    iconCd: 'pre_payment_rsv',
    show: {
      login: {
        before: true,
        after: true
      },
      device: {
        pc: true,
        sp: true
      },
      menu: true,
      plan: true,
      list: true
    }
  },
  {
    iconNo: 29,
    iconNm: '事業団割引',
    iconCd: '',
    show: {
      login: {
        before: false,
        after: true
      },
      device: {
        pc: true,
        sp: true
      },
      menu: true,
      plan: false,
      list: false
    }
  },
  {
    iconNo: 30,
    iconNm: '給与天引き（都度）',
    iconCd: 'pyrl_ded_tsudo',
    show: {
      login: {
        before: false,
        after: true
      },
      device: {
        pc: true,
        sp: true
      },
      menu: true,
      plan: true,
      list: true
    }
  },
  {
    iconNo: 31,
    iconNm: '給与天引き（継続）',
    iconCd: 'pyrl_ded_keizoku',
    show: {
      login: {
        before: false,
        after: true
      },
      device: {
        pc: true,
        sp: true
      },
      menu: true,
      plan: true,
      list: true
    }
  },
  {
    iconNo: 32,
    iconNm: '年齢制限',
    iconCd: 'age_limit',
    show: {
      login: {
        before: true,
        after: true
      },
      device: {
        pc: true,
        sp: true
      },
      menu: true,
      plan: true,
      list: true
    }
  },
  {
    iconNo: 33,
    iconNm: 'べネ・ステ公式オンラインショップ',
    iconCd: 'bene_sta_ofcl_online_shop',
    show: {
      login: {
        before: true,
        after: true
      },
      device: {
        pc: true,
        sp: true
      },
      menu: true,
      plan: true,
      list: true
    }
  },
  {
    iconNo: 34,
    iconNm: '配送日指定',
    iconCd: 'delivery_day',
    show: {
      login: {
        before: true,
        after: true
      },
      device: {
        pc: true,
        sp: true
      },
      menu: true,
      plan: true,
      list: true
    }
  },
  // アイコン整理.xlsxではグレーアウト
  {
    iconNo: 35,
    iconNm: 'テイクアウト',
    iconCd: 'take_out',
    show: {
      login: {
        before: true,
        after: true
      },
      device: {
        pc: true,
        sp: true
      },
      menu: true,
      plan: true,
      list: true
    }
  },
  // アイコン整理.xlsxではグレーアウト
  {
    iconNo: 37,
    iconNm: 'BS限定特典',
    iconCd: 'bs_excl_benefit',
    show: {
      login: {
        before: true,
        after: true
      },
      device: {
        pc: true,
        sp: true
      },
      menu: true,
      plan: true,
      list: true
    }
  }
]