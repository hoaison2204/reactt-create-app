/**
 * ファイルアップロードAPI
 */
import Repository from "./repository";
const resource = "/v1/life/file/upload";

export default {
  /**
   * ファイルアップロードAPI
   */
  upload(params) {
    return Repository.post(`${resource}`, params);
  },
};
