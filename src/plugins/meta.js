export default async (context, inject) => {
  inject('meta', {
    
    isIcService(mypageDisplayCode = 'BS') {
      return mypageDisplayCode === 'IC';
    },
    get data() {
      return context.store.state.meta.data || [];
    },
    set data(value) {
      context.store.commit("meta/set", value);
    },
    get mypageDisplayCode(){
      return this.getMypageDisplayCode(location.origin);
    },
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

    get title() {
      if (this.isIcService(this.mypageDisplayCode)){
        return process.env.VUE_APP_IC_PAGE_TITLE;
      }
      return process.env.VUE_APP_PAGE_TITLE;
    },
    
    get description() {
      const metaDescription = this.getMetaData('description') ? this.getMetaData('description') : '';
      return metaDescription;
    },

    // metaデータをAPIで取得したときの処理
    setMetaDataList(value) {
      for(let key in value) {
        const label = key != 'imageUrl' ? key : 'thumbnail';
        const metaData = value[key];
        this.data.push({[label]: metaData});
      }
      this.createDocumentMetaData();
    },

    // 特定のメタkeyに対する値を取得
    getMetaData(key) {
      const target = this.data.filter((x) => {
        const obj = Object.entries(x)[0];
        return obj[0] == key;
      });

      const result = target.length > 0 ? target[0][key] : '';
      return result;
    },

    // document Titleの設定
    setDocumentTitle(value="") {
      let metaTitle = value ? value + ' | ' : '';
      metaTitle += this.title;
      
      if (!document.title) {
        const titleElement = document.createElement('title');
        document.head.appendChild(titleElement);
      }
      document.title = metaTitle;
    },

    // document Desctiptionの設定
    setDocumentDesctiption(value="") {
      const metaDescription = value ? value : process.env.VUE_APP_PAGE_DESCRIPTION;
      
      if (!document.querySelector('meta[name="description"]')) {
        const descriptionElement = document.createElement('meta');
        descriptionElement.setAttribute('name', 'description');
        descriptionElement.setAttribute('content', '');
        document.head.appendChild(descriptionElement);
      }
      document
        .querySelector('meta[name="description"]')
        .setAttribute('content', metaDescription);
    },

    // metaDataを追加する
    addMetaData(value) {
      // オブジェクト形式かどうかをチェック
      // オブジェクト形式ではない場合処理を中止する
      const objectType = Object.prototype.toString;
      if(objectType.call(value) != '[object Object]') return;
      this.data.push(value);
      this.createDocumentMetaData();
    },

    // 既存のmetaDataを修正する
    modifiedMedaData(key, value) {
      const modifiedData = this.data.map((x) => {
        const obj = Object.entries(x)[0];
        const label = obj[0];
        const metaData = obj[0] == key ? value : obj[1];
        return {[label]: metaData};
      });
      this.data = modifiedData;
    },

    // metaDataの動的な作成
    createDocumentMetaData() {
      for(let item of this.data) {
        const obj = Object.entries(item)[0];
        const key = obj[0];
        const meta = obj[1];
        // 既存のmetaは追加しない
        if (document.querySelector(`meta[name="${key}"]`)) continue;
        const metaElement = document.createElement('meta');
        metaElement.setAttribute('name', key);
        metaElement.setAttribute('content', meta);
        document.head.appendChild(metaElement);
      }
    },

    // 動的に追加されたmetaDataを削除する
    deleteDocumentMetaData() {
      for(let item of this.data) {
        const obj = Object.entries(item)[0];
        const key = obj[0];
        const metaElement = document.querySelector(`meta[name="${key}"]`);
        metaElement.remove();
      }
      this.data = [];
    }

  })
}
