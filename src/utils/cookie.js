export function createSetCookie(name, value, expires, domain) {
  const expires_ = expires ?
    'expires=' + (
      expires instanceof Date ?
        expires :
        new Date(Date.now() + Number.parseInt(expires))
    ).toUTCString() :
    '';
  var cookieDomain = domain || process.env.VUE_APP_COOKIE_DOMAIN;
  // userInfoの時はcookieがリクエストヘッダーに付くように属性を設定
  const addSameSite = (name === 'userInfo') ? 'domain=' + cookieDomain + '; SameSite=none; Secure': '';
  return [`${name}=${(value || '')}`, expires_, 'path=/', addSameSite].join('; ')
}

export function parseCookie(cookie) {
  return cookie ?
    cookie.split(';').reduce((acc, kv) => {
      const cookieArray = kv.split('=');
      // cookie key
      let [prefix] = cookieArray;
      let cookie = null;
      
      // back_uriで終わるかどうか
      if(prefix.match(/^.*back_uri$/)) {
        let params = '';
        // "=" が１つしか含まれていない場合はそのまま格納(例: back_uri=/menus/catExl)
        if(cookieArray.length==2) {
          cookie = cookieArray.map(x => x.trim());
        }else{
        // "=" を複数含むback_uriの処理を行う
          cookie = ['back_uri'];
          for(let item of cookieArray) {
            if(item != 'back_uri') {
              if(params) params += '=';
              params += item;
            }
          }
          cookie.push(params);
        }
      }else{
        cookie = cookieArray.map(x => x.trim());
      }
      acc[cookie[0]] = cookie[1];
      return acc;
    }, {}) :
    {}
}

export function getCookieValue(cookieName) {
  let cookie = {};
  document.cookie.split(';').forEach((el) => {
        let [key,value] = el.split('=');
        cookie[key.trim()] = value;
      })
      return cookie[cookieName];
}
