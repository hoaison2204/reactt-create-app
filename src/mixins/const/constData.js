import BO_CODE from "./framework/common/codes/boCode"
import CATEGORY from "./framework/common/codes/category"
import APPL_WIN_DISP_DIV from "./framework/common/menus/applWinDispDiv"
import BARCODE_DIV from "./framework/common/menus/barcodeDiv"
import BENEPO_RETURN_DIV from "./framework/common/menus/benepoReturnDiv"
import DIGI_PON_DIV from "./framework/common/menus/digiPonDiv"
import LOTTERY_TYPE from "./framework/common/menus/lotteryType"
import PAY_MTHD_DIV from "./framework/common/menus/payMthdDiv"
import PAY_MTHD_LIST_USE_FLG from "./framework/common/menus/payMthdListUseFlg"
import PAYEE_DIV from "./framework/common/menus/payeeDiv"
import POINT_TYPE from "./framework/common/menus/pointType"
import PYRL_DED_PAYEE_DIV from "./framework/common/menus/pyrlDedPayeeDiv"
import REPLY_IDPSB_FLG from "./framework/common/menus/replyIdpsbFlg"
import SRVIC_DIV from "./framework/common/menus/srvicDiv"
import TERMINAL_DIV from "./framework/common/menus/terminalDiv"
import USAGE_DIV from "./framework/common/menus/usageDiv"
import PRICE_DIV from "./framework/common/orders/priceDiv"
import RESERVE_STS from "./framework/common/orders/reserveSts"
import CANCEL_CHARGE_DIV from "./framework/common/orders/cancelChargeDiv"
import CANCEL_AVAIL_DIV from "./framework/common/orders/cancelAvailDiv"
import REISSUE_FLAG from "./framework/common/orders/reissueFlag"
import LOTTERY_RESULT from "./framework/common/orders/lotteryResult"
import EXT_SYSTEMCD from "./framework/common/orders/extSystemCd"

import COST_UNDER_CHARGEABLE_FLG from "./framework/common/subsidy/costUnderChargeableFlg"
import DISPLAY_DIV from "./framework/common/subsidy/displayDiv"
import MULTIPLE_UNUSABLE_FLG from "./framework/common/subsidy/multipleUnusableFlg"
import USED_FORM_DIV from "./framework/common/subsidy/usedFormDiv"
import SUBSIDY_TYPE from "./framework/common/subsidy/subsidyType"
import SUBSIDY_REQUEST_TYPE from "./framework/common/subsidy/requestType"
import USED_LIM_UNIT from "./framework/common/subsidy/usedLimUnit"
import PERSON_ACCOMPANY_FLG from "./framework/common/subsidy/personAccompanyFlg"
import RELATIONSHIP_ID from "./framework/common/subsidy/relationshipId"
import ENV from "./framework/common/env"

import MENU_ITEM_INFO_SERVICE_TYPE from "./framework/mypage/menuItemInfoServiceType"
import COMMAND_TYPE from "./framework/mypage/member/commandType"
import MY_COUPON_KIND from "./framework/mypage/myCoupon/myCouponKind"
import MY_COUPON_USED_FLAG from "./framework/mypage/myCoupon/myCouponUsedFlag"
import MY_COUPON_DISABLE_FLAG from "./framework/mypage/myCoupon/myCouponDisableFlag"
import TAX from "./framework/mypage/order/orderTax"
import CATEGORIES from "./framework/common/menus/category";

export default {
  BO_CODE, // BOコード
  CATEGORY, // カテゴリーコード
  APPL_WIN_DISP_DIV, // 申込画面表示区分
  BARCODE_DIV, // バーコード区分
  BENEPO_RETURN_DIV, // ベネポ付与区分
  DIGI_PON_DIV, // デジタルクーポン区分
  LOTTERY_TYPE, // 抽選タイプ
  PAY_MTHD_DIV, // 支払方法情報
  PAY_MTHD_LIST_USE_FLG, // 支払方法リスト　利用可不可
  PAYEE_DIV, // 支払先区分
  POINT_TYPE, // ポイント種別
  PYRL_DED_PAYEE_DIV, // 給トク支払区分
  REPLY_IDPSB_FLG, // 回答必須フラグ
  SRVIC_DIV, // サービス区分
  TERMINAL_DIV, // 端末区分
  USAGE_DIV, //利用方法
  PRICE_DIV, // 料金区分
  RESERVE_STS, // 予約ステータス
  CANCEL_CHARGE_DIV, // キャンセル料区分
  REISSUE_FLAG, // 再発行フラグ
  LOTTERY_RESULT, // 抽選結果
  COST_UNDER_CHARGEABLE_FLG, // 実費未満投入可否
  DISPLAY_DIV, // 呼び出し画面区分
  MULTIPLE_UNUSABLE_FLG, // 複数使用不可フラグ
  USED_FORM_DIV, // 利用形態区分
  SUBSIDY_TYPE, // 補助金種別
  SUBSIDY_REQUEST_TYPE, // 申請方式
  USED_LIM_UNIT, // 利用制限単位
  PERSON_ACCOMPANY_FLG, // 本人同行要否フラグ
  RELATIONSHIP_ID, // プルダウン項目_続柄のID
  ENV, // 環境
  MENU_ITEM_INFO_SERVICE_TYPE, // どこからお気に入り登録されたかを区別する値
  COMMAND_TYPE, // 操作タイプ
  MY_COUPON_KIND, // クーポン種別
  MY_COUPON_USED_FLAG, // 使用済みフラグ
  MY_COUPON_DISABLE_FLAG, // 利用不可フラグ
  CANCEL_AVAIL_DIV,
  EXT_SYSTEMCD,
  TAX, // Order Tax
  CATEGORIES
  
}
