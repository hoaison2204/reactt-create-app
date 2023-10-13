import Repository from "./repository-bff-top";
import RepositoryMyPage from "./repository";
const resource = "/v1/cms";

const resource_mypage = "/v1/mypage";
/**
 * CMS取得コントローラ
 */
export default {
  /**
   * TopPage CMSを取得する
   */
  postTopPage(params = {}) {
    return Repository.post(`${resource}/top_page`, params);
  },
  /**
   * ブロックコンテンツを取得する
   */
  getBlockContents(params, appApiDomain) {
    return RepositoryMyPage.get(
      `${resource_mypage}/block_contents?locationCode=${params.locationCode}`
    );
  },
  /**
   * 特集ページを取得する
   */
  getSpecialPage(params) {
    return Repository.get(
      `${resource}/special_page?page_limit=${params.pageLimit}`
    );
  },
  /**
   * お知らせ左メニュー情報（CMS）を取得する
   */
  getNewsMenu() {
    return Repository.get(`${resource}/news/menu`);
  },
  /**
   * HeaderFooter CMSを取得する
   */
  getHeaderFooter(params) {
    return RepositoryMyPage.get(
      `${resource_mypage}/header_footer?bsCode=${params.bsCode}`
    );
  }
};
