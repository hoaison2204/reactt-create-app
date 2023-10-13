// import { REGEX } from '@/mixins/global'
import { REGEX } from "../mixins/global";

export default {
  methods: {
    randomIntFromInterval(min, max) {
      // min and max included
      // eslint-disable-next-line no-mixed-operators
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    generateNumber(len = 8) {
      let s = "";
      for (let i = 0; i < len; i++) {
        if (i > 0) {
          s += this.randomIntFromInterval(0, 9);
        } else {
          s += this.randomIntFromInterval(1, 9);
        }
      }
      return s;
    },
    getNumberOptions(len) {
      const options = [];
      for (let i = 0; i <= len; i++) {
        options.push({
          label: String(i),
          value: i
        });
      }
      return options;
    },
    validEmail(email) {
      const errorChar = [
        "._-",
        ".-_",
        "_.-",
        "_-.",
        "-._",
        "._-",
        ".-",
        "._",
        "_-",
        "_.",
        "-.",
        "-_",
        "_@",
        ".@",
        "-@",
        "@_",
        "@.",
        "@-",
        "--",
        "__"
      ];
      if (errorChar.some((item) => email.includes(item))) return false;
      const re = /^[a-z0-9](\.?[a-z0-9_-])+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    validPhone(phone) {
      const re = /^[0-9]+$/;
      return re.test(phone) && phone.length > 9;
    },
    formatPhone(phone) {
      phone = phone.replace(/(\d\d\d)(\d\d\d\d)(\d\d\d\d)/, "$1-$2-$3");
      return phone;
    },
    validateNumber($event) {
      const regex = /^[0-9]+$/;
      const value = $event.key;
      if (!regex.test(value)) {
        $event.preventDefault();
        return false;
      }
      return true;
    },
    validateTextKana($event) {
      const regex = /^[ぁ-んァ-ン|ｧ-ﾝﾞﾟ]+$/;
      if (!regex.test($event)) {
        return false;
      }
      return true;
    },
    validateTextKanaRomaji($event) {
      const regex = /^[ぁ-んァ-ン|ｧ-ﾝﾞﾟ]+$/;
      if (!regex.test($event)) {
        return false;
      }
      return true;
    },
    validateTextKanji($event) {
      const regex = /^[一-龥|a-zA-Z ]+$/;
      if (!regex.test($event)) {
        return false;
      }
      return true;
    },
    validateTextKanjiRomaji($event) {
      const regex = /^[一-龥|a-zA-Z ]+$/;
      if (!regex.test($event)) {
        return false;
      }
      return true;
    },
    validateTextInput($event) {
      const regex = /^[a-zA-Z ]+$/;
      const value = $event;
      if (!regex.test(value)) {
        return false;
      }
      return true;
    },
    validateName(e) {
      const regex = /^[ぁ-んァ-ン|ｧ-ﾝﾞﾟ|一-龥|a-zA-Z ]+$/;
      if (!regex.test(e.key)) {
        e.preventDefault();
      }
    },
    validateURL($event) {
      const regex = /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([a-zA-Z0-9@:%_+.~#?&//=]*)/;
      const format = /^[ｧ-ﾝﾞﾟ`~!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?a-zA-Z0-9ｧ-ﾝﾞﾟ]+$/;
      const value = $event;
      if (regex.test(value) && format.test(value)) {
        return false;
      }
      return true;
    },
    containsWhitespace($event) {
      return /^\s+|\s+$/g.test($event);
    },
    inputInterger($event) {
      const regex = /^[0-9]+$/;
      const value = $event.key;
      if (!regex.test(value)) {
        $event.preventDefault();
        return false;
      }
      return true;
    },

    validateSpecialChar($event) {
      const format = /[`~!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
      const value = $event.key;
      if (format.test(value)) {
        $event.preventDefault();
        return false;
      }
    },

    onReplaceSpecialCharNumber(input) {
      const regex = REGEX.NOT_SPECIALCHAR_NUMBER;
      if (!regex.test(input) && !!input) {
        let result = "";
        for (const element of input) {
          if (regex.test(element)) result += element;
        }
        return result;
      }
      return input;
    },

    onReplaceSpecialChar(input) {
      const regex = REGEX.NOT_SPECIALCHAR;
      if (!regex.test(input) && !!input) {
        let result = "";
        for (const element of input) {
          if (regex.test(element)) result += element;
        }
        return result;
      }
      return input;
    },

    toFullWidth(str) {
      return str.replace(/[\uff01-\uff5e]/g, (ch) =>
        String.fromCharCode(ch.charCodeAt(0) - 0xfee0)
      );
    },

    validateNumberHalfFullWidth(input) {
      const regex = /^[0-9]+$/;
      if (!regex.test(input) && !!input) {
        let result = "";
        for (const element of input) {
          if (regex.test(element)) result += element;
        }
        return result;
      }
      return input;
    },

    onReplaceKana(input) {
      const regex = REGEX.KATAKANA;
      if (!regex.test(input) && !!input) {
        let result = "";
        for (const element of input) {
          if (regex.test(element)) result += element;
        }
        return result;
      }
      return input;
    },

    onReplaceKanaRomaji(input) {
      const regex = REGEX.KATAKANA_ROMAJI;
      if (!regex.test(input) && !!input) {
        let result = "";
        for (const element of input) {
          if (regex.test(element)) result += element;
        }
        return result;
      }
      return input;
    },

    onReplaceKanji(input) {
      const regex = REGEX.KANJI;
      if (!regex.test(input) && !!input) {
        let result = "";
        for (const element of input) {
          if (regex.test(element)) result += element;
        }
        return result;
      }
      return input;
    },

    onReplaceKanjiRomaji(input) {
      const regex = REGEX.KANJI_ROMAJI;
      if (!regex.test(input) && !!input) {
        let result = "";
        for (const element of input) {
          if (regex.test(element)) result += element;
        }
        return result;
      }
      return input;
    },

    formatCurrency(amount, suffix = "円") {
      amount = amount !== null && amount !== undefined ? String(amount) : "";
      // remove all character without number
      let cleanedNum = amount.replace(/[^0-9+.]/g, "").replace(/\.{2,}/g, ".");

      if (cleanedNum.match(/^\./g)) {
        cleanedNum = cleanedNum.slice(1);
      }
      if (cleanedNum.match(/\.$/g)) {
        cleanedNum = cleanedNum.slice(0, -1);
      }

      let firstPath = cleanedNum;
      let secondPath = null;
      if (cleanedNum.indexOf('.') >= 0) {
        firstPath = cleanedNum.substring(0, cleanedNum.indexOf('.'));
        secondPath = cleanedNum.substring(cleanedNum.indexOf('.'));
        secondPath = secondPath.slice(0, secondPath.lastIndexOf('.') + 4);
      }
      // remove commas, points
      firstPath = firstPath.replace(/,/g, '');
      firstPath = firstPath ? String(firstPath) : '';
      // add thousand separator
      firstPath = firstPath.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return `${firstPath}${secondPath ? String(secondPath) : ''}${
        suffix ? suffix : ''
      }`;
    },
    setCurrentHref() {
      const currentHref = location.href;
      console.log("setCurrentHref: currentHref - ", currentHref);
      localStorage.setItem('currentHref', currentHref);
    },
    getCurrentHref() {
      return decodeURIComponent(localStorage.getItem('currentHref')).replace(
        /\/\?back_uri=/,
        ''
      );
    },
    removeCurrentHref() {
      localStorage.removeItem('currentHref');
    },
    gotoBackURI(backUri) {
      this.removeCurrentHref();
      location.href = backUri && backUri != 'null' ? backUri : '/mypage';
    },
    urlStringToLink(urlString) {
      const urlRegex = /(\b(https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|](?:\(.*\))?)/gi;
      //URL文字列の末尾にカッコが出現した場合は、それを除いた形でリンク化
      return urlString.replace(urlRegex, function(url) {
        const bracketIndex = url.indexOf(')');
        if (bracketIndex !== -1) {
          url = url.substring(0, bracketIndex);
        }
        return `<a href=${url} style="color:#0d76bf">${url}</a>`;
      });
    },
  },
};
