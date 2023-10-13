import mockData from './mockdata/subsidy.js';

/**
 * 補助金向けAPI
 */
export default {
  /**
   * 利用可能補助金取得API
   */
  getSubsidyAvailableLogin(params) {
    const data = mockData.getSubsidyAvailableData3();
    return new Promise((resolve) => {
      return resolve({ data: data });
    });
  },
  /**
   * 利用可能チェックAPI
   */
  postSubsidyAvailableCheck(params) {
    const data = {
      result: 'ok',
      errorCode: '',
      errorMessage: 'AvailableCheckCountLeft',
    };
    return new Promise((resolve) => {
      return resolve({ data: data });
    });
  },
};
