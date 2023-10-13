// eslint-disable-next-line no-unused-vars
import Facility from './facility'
// eslint-disable-next-line no-unused-vars
import Menu from './menu'


export default class Plan {
  planBasicInfo = {
    menuNo: null,
    planId: '',
    planNm: '',
    planLeadCopy: '',
    planRcSttDt: '',
    planRcEndDt: '',
    planImages: []
  };

  benefitHeadlines = null;

  /** APIのレスポンス形式からモデルに変換する */
  static createFromResponse(response) {
    const plan = new Plan()
    plan.benefitHeadlines = response.benefitHeadlines
    if (response.planBasicInfo) {
      if ('menuNo' in response.planBasicInfo) {
        plan.planBasicInfo.menuNo = response.planBasicInfo.menuNo
      }
      if ('planId' in response.planBasicInfo) {
        plan.planBasicInfo.planId = response.planBasicInfo.planId
      }
      if ('planNm' in response.planBasicInfo) {
        plan.planBasicInfo.planNm = response.planBasicInfo.planNm
      }
      if ('planLeadCopy' in response.planBasicInfo) {
        plan.planBasicInfo.planLeadCopy = response.planBasicInfo.planLeadCopy
      }
      if ('planRcSttDt' in response.planBasicInfo) {
        plan.planBasicInfo.planRcSttDt = response.planBasicInfo.planRcSttDt
      }
      if ('planRcEndDt' in response.planBasicInfo) {
        plan.planBasicInfo.planRcEndDt = response.planBasicInfo.planRcEndDt
      }
      if ('planImages' in response.planBasicInfo) {
        plan.planBasicInfo.planImages = response.planBasicInfo.planImages
      }
    }
    return plan
  }

}
