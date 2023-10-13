import Repository from "../repository";
const resource = "/v1/mypage/cafe";

export default {
    
    /**
     * マイページ
     * カフェ契約有無チェック
     */
    checkCafeAvailable() {
        return Repository.get(`${resource}/check`);
    }

};