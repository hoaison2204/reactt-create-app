import Repository from "./repository";
const resource_tcf = "/v1/mypage/tcf";

export default {
  /**
   * TableCheckサイトURL取得
   */
  async getCheckReservations() {
    return new Promise((resolve, reject) => {
      Repository.post(
        `${resource_tcf}/check_reservations`
      ).then(
        (res) => {
          resolve(res.data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  },
};
