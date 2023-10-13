// eslint-disable-next-line no-unused-vars
import Cookies from 'js-cookie'

export default class Store {

  static AUTH = {
    accessToken: null,
    refleshToken: null,
    idToken: null,
    authenticationLevel: null,
    xBeneUser: null
  };

  static USER = {
    familyName: null,
    firstName: null,
    loginFlag: null,
    priceDiv: null,
    crmFlag: null,
    ssoCustomerNo: null,
    ssoIss: null,
    ssoMembrNo: null,
    ssoPrincipalFlg: null,
    ssoSub: null,
    ssoSubscriptionId: null,
    totalpoint: null
  };

  static setAuthAndUser(object) {
    this.USER.familyName = object.familyName
    this.USER.firstName = object.firstName
    this.USER.loginFlag = object.loginFlag
    this.USER.priceDiv = object.priceDiv
    this.USER.crmFlag = object.crmFlag
    this.USER.ssoCustomerNo = object.ssoCustomerNo
    this.USER.ssoIss = object.ssoIss
    this.USER.ssoMembrNo = object.ssoMembrNo
    this.USER.ssoPrincipalFlg = object.ssoPrincipalFlg
    this.USER.ssoSub = object.ssoSub
    this.USER.ssoSubscriptionId = object.ssoSubscriptionId
    this.USER.totalpoint = object.totalpoint

    this.AUTH.accessToken = object.accessToken
    this.AUTH.refleshToken = object.refleshToken
    this.AUTH.idToken = object.idToken
    this.AUTH.authenticationLevel = object.authenticationLevel
    this.AUTH.xBeneUser = object.xBeneUser
  }

}
