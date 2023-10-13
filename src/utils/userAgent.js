// iphoneの判定はiphoneという文字列がユーザーエージェントに入ってるかどうか
export function isIphone(){
    var userAgent = window.navigator.userAgent.toLowerCase();
    if(userAgent.indexOf("iphone") != -1){
      return true
    }
    return false
  }

  // androidスマホの判定はandroidとmobileという文字列がユーザーエージェントに入ってるかどうか
  export function isAndroidSmartPhone(){
    var userAgent = window.navigator.userAgent.toLowerCase();
    if( ( userAgent.indexOf("android") != -1 ) && ( userAgent.indexOf("mobile") != -1 ) ){
      return true
    }
    return false
  }

  export function isMobile(){
    var userAgent = window.navigator.userAgent.toLowerCase();
    if (isIphone() || isAndroidSmartPhone()){
        return true
    }
    return false
  }
