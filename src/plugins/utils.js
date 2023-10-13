import sanitizeHTML from 'sanitize-html'

export default async ({ store }, inject) => {
  inject('utils', {
    addComma(val='') {
      if(!val) return val;
      return String(val).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    },
    notImplemented() {
      window.alert('Not implemanted')
    },
    isSmartPhone() {
      if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) return true;
      return false;
    },
    /**
     * 改行コードをbrに変換しサニタイズしたHTMLテキストを返却する
     * @param {string} str - 改行コードが含まれたテキスト
     * @return {string} - 改行コードをbrに変換しサニタイズしたHTMLテキスト
     */
    htmlText(str='') {
      if(!str) return str;
      let res = str.replace(/\r?\n/g, '<br>');
      return sanitizeHTML(res);
    },
    /**
     * 郵便番号形式の文字列にフォーマットし返却する
     * @param {string} code - zipcode(ハイフンなし)
     * @returns {string} - zipcode(ハイフンあり)
     */
    formatZipcode(code) {
      code = code.replace(/[^\d]+/g, '');
      return code.slice(0, 3) + '-' + code.slice(3, code.length);
    },
    /**
     * プラン名をフォーマットし返却する
     * @param {string} str - プラン名
     * @returns {string} - プラン名
     * @description 不要な「:」を削除し、規格が2個以上含まれる場合、改行する
     */
    formatPlanNm(str = "") {
      if (!str) return "";
      let arr = str.split(":");
      let result = "";

      arr.map((a, i) => {
        if (a) {
          result += i % 2 === 1 ? a + " \n " : a + ":";
        }
      });
      return result;
    }
  })
}
