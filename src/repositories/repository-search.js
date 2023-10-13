import Repository from "./repository";
const resource = "/v1/search";

export default {
  /**
   * 初期表示に必要な情報を取得する
   */
  getLargeCategories() {
    return Repository.get(`${resource}/largeCategories`);

    // モックデータを返す処理
    // return {data}
  },
  getSearchInit() {
    return Repository.get(`${resource}`);
  },
};
