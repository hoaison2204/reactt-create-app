/**
 * ファイルアップロードAPI
 */

export default {
  /**
   * ファイルアップロードAPI
   */
  upload(params) {
    const data = {
      fileList: [
        {
          folderName: params.fileList[0].folderName,
          fileName: params.fileList[0].fileName
        }
      ]
    };
    return new Promise((resolve) => {
      return resolve({ data: data });
    });
  },
};
