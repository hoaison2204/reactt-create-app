export default ({router}, inject) => {
  inject("dynamicJs", {
    /**
     * String型のjsコードの成形、トリム
     */
    createScript(scripts='') {
      scripts = scripts.trim();
      scripts = scripts.replace('\r\n', '');
      return scripts;
    },
    /**
     * jsコードをheadに追加する
     */
    addExternalScript(scripts, locationCode) {
      const bodyElement = document.querySelector('body');
      const scriptElement = document.createElement('script');
      scriptElement.text = scripts;
      scriptElement.dataset.scriptName = locationCode;
      bodyElement.appendChild(scriptElement);
    },
    /**
     * jsコードをheadから削除する
     */
    removeExternalScript() {
      // CSS Element 削除
      const externalCss = document.getElementById('externalCss');
      if(externalCss) document.getElementById('externalCss').remove();
      // JS script 削除
      const scriptTagList = document.getElementsByTagName('script');
      for(let elm of scriptTagList) {
        if(!elm.dataset.scriptName) continue;
        elm.remove();
      }
    }
  });
}
