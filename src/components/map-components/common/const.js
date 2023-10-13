/**
 * 定数クラス
 */
export default class Const {

  /** エラー時トーストの表示時間（ミリ秒） */
  static TOAST_ERROR_DURATION_MILLISECOND = 3000;

  /** 施設距離外のトーストの表示時間（ミリ秒） */
  static TOAST_OUTOF_DISTANCE_WARN_DURATION_MILLISECOND = 10000;

  /** デフォルトのリクエストタイムアウト（ミリ秒） */
  static REQUEST_DEFAULT_TIMEOUT_MILLISECOND = 30000;

  /** 地図のデフォルト初期ズームレベル */
  static MAP_DEFAULT_ZOOM = process.env.VUE_APP_MAP_DEFAULT_ZOOM ? process.env.VUE_APP_MAP_DEFAULT_ZOOM : 15;

  /** 地図のジオコーディング失敗時の緯度経度 */
  static MAP_ERROR_CENTER_LAT = process.env.VUE_APP_MAP_DEFAULT_CENTER_LAT ? process.env.VUE_APP_MAP_DEFAULT_CENTER_LAT : 35.6848086;
  static MAP_ERROR_CENTER_LNG = process.env.VUE_APP_MAP_DEFAULT_CENTER_LNG ? process.env.VUE_APP_MAP_DEFAULT_CENTER_LNG : 139.7690417;

  /** 新サービスコード */
  static BO_CODE = process.env.VUE_APP_MAP_BO_CODE ? process.env.VUE_APP_MAP_BO_CODE : 'BS';

  /** デフォルト契約ID */
  static SSO_SUBSCRIPTION_ID_DEFAULT = process.env.VUE_APP_MAP_SSO_SUBSCRIPTION_ID_DEFAULT ? process.env.VUE_APP_MAP_SSO_SUBSCRIPTION_ID_DEFAULT : '00000000';

  /** デフォルトのpriceDiv */
  //static PRICE_DIV_DEFAULT = "10";

  /** デフォルトのcrmFlag */
  //static PRICE_CRM_FLAG_DEFAULT = "0";

  /** デフォルトの取得する最大メニュー件数 */
  static GET_MENU_COUNT_MAX = 20;

}
