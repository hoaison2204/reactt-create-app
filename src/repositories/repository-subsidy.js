/**
 * 補助金向けAPI
 */
import Repository from "./repository";
const resource_available_login = "/v1/life/sbsd/available_login";
const resource_Available_check = "/v1/life/sbsd/available/check";

export default {
   /**
   * 利用可能補助金取得API
   */
  getSubsidyAvailableLogin() {
    return Repository.get(`${resource_available_login}`);
  },
  /**
   * 利用可能チェックAPI
   */
  postSubsidyAvailableCheck(params) {
    return Repository.post(`${resource_Available_check}`, params);
  },
};
