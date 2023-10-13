export default {
    data() {
        return {
            crmMypageDisplayCodeList: ['CR', 'PG', 'TH', 'LY'],
            icList: ['IC'],
            fromSiteUnsupportedList: {
                kyutoku: ['CR', 'PG', 'TH', 'LY'],
                // TODO: 対象の取引先コードを要確認
                beneRakuten: [
                    'G00118213', // 団体: ライフエール
                    'G00109240', // 団体: とく放題(M)
                    'G00108762', // 団体: とく放題(B),
                    'G00124287', // 団体: BBライフホームドクタ
                ],
                family: ['CR', 'PG', 'TH', 'LY'],
                mailMagazine: ['CR', 'PG', 'TH', 'LY'],
                hitaikou: ['IC'], // TODO: IC非対応機能を追加する
                cardMenuShareBtn: ['CR', 'IC', 'TH', 'LY'],
                rakutenLogo: ['TH', 'LY']
            }
        }
    },
    methods: {
        /**
         * 遷移元のサイトを判断するコードの取得
         * @returns {object} companyCd:取引先コード(団体ID), mypageBoCode:BOコード, mypageDisplayCode: サイトごとのDisplayCode
         */
        getFromSiteCode() {
            this.$loading.startProcessing();
            console.log('userSession - src/mixins/fromSite.js');
            return this.$repositories("user").userSession()
            .then((res) => {
                this.$loading.finishProcessing();
                var userData = res.data;

                return {
                    companyCd: userData.subscriptionCustomers.companyCd,
                    mypageBoCode: userData.mypageBoCode,
                    mypageDisplayCode: userData.mypageDisplayCode,
                    familySerialNumber: userData.subscriptionCustomers.familySerialNumber,
                    subscriptions: userData.subscriptionCustomers.subscriptions
                }
            })
            .catch(() => {
                this.$loading.finishProcessing();
                // TODO: エラー時の処理
            });
        },
        /**
         * 非対応リストを元に結果を判定する
         * @param {string} code fromSiteUnsupportedList内で検索する値
         * @param {string} listName fromSiteUnsupportedListのパラメータ名
         * @returns {boolean} true:非対応, false:対応
         */
        // 非対応リストを元に結果を判定するtrue
        fromSiteUnsupported(code, listName) {
            const list = this.fromSiteUnsupportedList[listName];
            if (list && list.indexOf(code) != -1) {
                return true;
            }
            return false;
        },

        /**
         * mypageBoCodeに該当するserviceは 新BSかどうか
         * @param {string} mypageBoCode
         * @returns {boolean} true: 新BS, false:新BSではない
         */
        isNewBsService(mypageBoCode = 'BS') {
            return mypageBoCode === 'BS';
        },

        /**
         * mypageBoCodeに該当するserviceは ICかどうか
         * @param {string} mypageBoCode
         * @returns {boolean} true: IC, false:ICではない
         */
        isIcService(mypageDisplayCode = 'BS') {
            return mypageDisplayCode === 'IC';
        },

        /**
         * mypageDisplayCodeに該当するserviceは 新BSかどうか
         * @param {string} mypageDisplayCode
         * @returns {boolean} true: CRM系のサービス
         */
        isCrm(mypageDisplayCode = 'BS') {
            return this.crmMypageDisplayCodeList.includes(mypageDisplayCode);
        },

        /**
         * mypageDisplayCodeに該当するserviceは とく放題かどうか
         * @param {string} mypageDisplayCode
         * @returns {boolean} true: とく放題
         */
        isTokuhodai(mypageDisplayCode = 'BS') {
            return mypageDisplayCode == 'TH';
        },

        /**
         * mypageDisplayCodeに該当するserviceは ライフエールかどうか
         * @param {string} mypageDisplayCode
         * @returns {boolean} true: ライフエール
         */
        isLifeWell(mypageDisplayCode = 'BS') {
            return mypageDisplayCode == 'LY';
        },
        /**
         * mypageBoCodeに該当するserviceは GCかどうか
         * @param {string} mypageBoCode
         * @returns {boolean} true: GC, false:GCではない
         */
        isGCService(mypageDisplayCode = 'BS') {
            return mypageDisplayCode === 'GC';
        },

        /**
         * mypageDisplayCodeに該当するurlを取得
         * @param {string} mypageDisplayCode
         * @param {string} urlandCodeMapping
         * @param {string} defaultValue
         * @returns {string} 該当のURL
         */
        getURLByDisplayCode(mypageDisplayCode, urlandCodeMapping, defaultValue) {
            if (!urlandCodeMapping) {
                throw new Error(`env variable is not setted`);
            }

            const mappingArr = urlandCodeMapping.split(";").map(map => {
                const arr = map.split(",");
                if (arr.length != 2) {
                    return {
                        mypageDisplayCode: null,
                        url: null
                    }
                }
                return {
                    mypageDisplayCode: arr[1],
                    url: arr[0],
                }
            });

            const selected = mappingArr.find(map => map.mypageDisplayCode === mypageDisplayCode);
            return selected ? selected.url : defaultValue;
        },

        /**
         * mypageDisplayCodeに該当するTopドメインを判定する
         * @param {string} mypageBoCode
         * @returns {string} 該当のTop ドメイン
         */
        getTopDomain(mypageDisplayCode) {
            return this.getURLByDisplayCode(mypageDisplayCode,
                process.env.VUE_APP_TOP_DOMAIN_AND_CODE_MAPPING,
                process.env.VUE_APP_TOP_DOMAIN);
        },

        /**
         * mypageDisplayCodeに該当するlifeドメインを判定する
         * @param {string} mypageDisplayCode
         * @returns {string} 該当のLife ドメイン
         */
        getLifeDomain(mypageDisplayCode) {
            return this.getURLByDisplayCode(mypageDisplayCode,
                process.env.VUE_APP_LIFE_DOMAIN_AND_CODE_MAPPING,
                process.env.VUE_APP_LIFE_DOMAIN);
        },

        /**
         * mypageDisplayCodeに該当するstayドメインを判定する
         * @param {string} mypageDisplayCode
         * @returns {string} 該当のStay ドメイン
         */
        getStayDomain(mypageDisplayCode) {
            return this.getURLByDisplayCode(mypageDisplayCode,
                process.env.VUE_APP_STAY_DOMAIN_AND_CODE_MAPPING,
                process.env.VUE_APP_STAY_DOMAIN);
        },

        /**
         * mypageDisplayCodeに該当するstay urlを判定する
         * @param {string} mypageDisplayCode
         * @returns {string} 該当のStay url
         */
        getStayUrl(mypageDisplayCode) {
            return this.getURLByDisplayCode(mypageDisplayCode,
                process.env.VUE_APP_STAY_URL_AND_CODE_MAPPING,
                process.env.VUE_APP_STAY_URL);
        },

        /**
         * mypageDisplayCodeに該当するlife reorder domainを判定する
         * @param {string} mypageDisplayCode
         * @returns {string} 該当のlife reorder domain
         */
        getLifeReorderDomain(mypageDisplayCode) {
            return this.getURLByDisplayCode(mypageDisplayCode,
                process.env.VUE_APP_DOMAIN_LIFE_REORDER_AND_CODE_MAPPING,
                process.env.VUE_APP_DOMAIN_LIFE_REORDER);
        },

        /**
         * mypageDisplayCodeに該当するstay reorder domainを判定する
         * @param {string} mypageDisplayCode
         * @returns {string} 該当のstay reorder domain
         */
        getStayReorderDomain(mypageDisplayCode) {
            return this.getURLByDisplayCode(mypageDisplayCode,
                process.env.VUE_APP_DOMAIN_STAY_REORDER_AND_CODE_MAPPING,
                process.env.VUE_APP_DOMAIN_STAY_REORDER);
        },

        /**
         * mypageDisplayCodeに該当するshop reorder domainを判定する
         * @param {string} mypageDisplayCode
         * @returns {string} 該当のshop reorder domain
         */
        getShopReorderDomain(mypageDisplayCode) {
            return this.getURLByDisplayCode(mypageDisplayCode,
                process.env.VUE_APP_DOMAIN_SHOP_REORDER_AND_CODE_MAPPING,
                process.env.VUE_APP_DOMAIN_SHOP_REORDER);
        },

        /**
         * mypageDisplayCodeに該当するmypageドメインを判定する
         * @param {string} mypageDisplayCode
         * @returns {string} 該当のmypage ドメイン
         */
        getMypageDomain(mypageDisplayCode) {
            return this.getURLByDisplayCode(mypageDisplayCode,
                process.env.VUE_APP_MYPAGE_DOMAIN_AND_CODE_MAPPING,
                process.env.VUE_APP_MYPAGE_DOMAIN);
        },

        /**
         * mypageDisplayCodeに該当するbff top domainを判定する
         * @param {string} mypageDisplayCode
         * @returns {string} 該当のbff top domain
         */

        getBffTopDomain(mypageDisplayCode) {
            return this.getURLByDisplayCode(mypageDisplayCode,
                process.env.VUE_APP_BFF_TOP_DOMAIN_AND_CODE_MAPPING,
                process.env.VUE_APP_BFF_TOP_DOMAIN);
        },

        /**
         * mypageDisplayCodeに該当するapp api domainを判定する
         * @param {string} mypageDisplayCode
         * @returns {string} 該当のapp api domain
         */
        getAppApiDomain(mypageDisplayCode) {
            return this.getURLByDisplayCode(mypageDisplayCode,
                process.env.VUE_APP_API_DOMAIN_AND_CODE_MAPPING,
                process.env.VUE_APP_API_DOMAIN);
        },

        /**
         * mypageDisplayCodeに該当するmypage API URLを判定する
         * @param {string} mypageDisplayCode
         * @returns {string} 該当のmypage API URL
         */
        getMypageApiUrl(mypageDisplayCode) {
            return this.getURLByDisplayCode(mypageDisplayCode,
                process.env.VUE_APP_MYPAGE_API_URL_AND_CODE_MAPPING,
                process.env.VUE_APP_MYPAGE_API_URL);
        },

        /**
         * mypageDisplayCodeに該当するcookie domainを判定する
         * @param {string} mypageDisplayCode
         * @returns {string} 該当のcookie domain
         */
        getCookieDomain(mypageDisplayCode) {
            return this.getURLByDisplayCode(mypageDisplayCode,
                process.env.VUE_APP_COOKIE_DOMAIN_AND_CODE_MAPPING,
                process.env.VUE_APP_COOKIE_DOMAIN);
        },

        /**
         * mypageDisplayCodeに該当するAuthorization urlを判定する
         * @param {string} mypageDisplayCode
         * @returns {string} 該当のAuthorization urlドメイン
         */
        getApiAuthorizationUrl(mypageDisplayCode) {
            return this.getURLByDisplayCode(mypageDisplayCode,
                process.env.VUE_APP_AUTHORIZATION_URL_AND_CODE_MAPPING,
                process.env.VUE_APP_AUTHORIZATION);
        },

        /**
         * mypageDisplayCodeに該当するorder stay urlを判定する
         * @param {string} mypageDisplayCode
         * @returns {string} order stay urlドメイン
         */
        getOrderStayURL(mypageDisplayCode) {
            const code = mypageDisplayCode.toUpperCase();

            return process.env.VUE_APP_INTERNAL_OTHER_STAY_URL_SSO;
        },

        /**
         * mypageDisplayCodeに該当するshop sso urlを判定する
         * @param {string} mypageDisplayCode
         * @returns {string} shop sso urlドメイン
         */
        getShopSSOURL(mypageDisplayCode) {
            const code = mypageDisplayCode.toUpperCase();

            return process.env.VUE_APP_SHOP_URL_SSO;
        },

        /**
         * mypageDisplayCodeに該当するapp url sso familyを判定する
         * @param {string} mypageDisplayCode
         * @returns {string} app url sso family
         */
        getAppUrlSsoFamily(mypageDisplayCode) {
            return process.env.VUE_APP_URL_SSO_FAMILY;
        },

        /**
         * mypageDisplayCodeに該当するapp login api fqdnを判定する
         * @param {string} mypageDisplayCode
         * @returns {string} app login api fqdn
         */
        getAppLoginApiFqdn(mypageDisplayCode) {
            return this.getURLByDisplayCode(mypageDisplayCode,
                process.env.VUE_APP_LOGIN_API_FQDN_AND_CODE_MAPPING,
                process.env.VUE_APP_LOGIN_API_FQDN);
        },

        /**
         * mypageDisplayCodeに該当するauth facadeを判定する
         * @param {string} mypageDisplayCode
         * @returns {string} auth facade
         */
        getAuthFacade(mypageDisplayCode) {
            return this.getURLByDisplayCode(mypageDisplayCode,
                process.env.VUE_APP_AUTH_FACADE_AND_CODE_MAPPING,
                process.env.VUE_APP_AUTH_FACADE);
        },

        /**
         * mypageDisplayCodeに該当するmap bo Codeを判定する
         * @param {string} mypageDisplayCode
         * @returns {string} mapBCodeドメイン
         */
        getMapBoCode(mypageDisplayCode) {
            const code = mypageDisplayCode.toUpperCase();
            const mapBoCodeList = process.env.VUE_APP_MAP_BO_CODE_LIST;

            if (!mapBoCodeList || !mapBoCodeList.includes(code)) return process.env.VUE_APP_MAP_BO_CODE;

            return code;
        },

        /**
         * mypageDomainに該当するdisplay codeを判定する
         * @param {string} mypageDomain
         * @returns {string} mypageDisplayCodeドメイン
         */
        getMypageDisplayCode(mypageDomain) {
            const urlandCodeMapping = process.env.VUE_APP_MYPAGE_DOMAIN_AND_CODE_MAPPING;

            if (!urlandCodeMapping) {
                throw new Error(`env variable is not setted`);
            }

            const mappingArr = urlandCodeMapping.split(";").map(map => {
                const arr = map.split(",");
                if (arr.length != 2) {
                    return {
                        mypageDisplayCode: null,
                        url: null
                    }
                }
                return {
                    mypageDisplayCode: arr[1],
                    url: arr[0],
                }
            });

            const selected = mappingArr.find(map => map.url === mypageDomain);
            return selected ? selected.mypageDisplayCode : "BS";
        },
    }
  }
