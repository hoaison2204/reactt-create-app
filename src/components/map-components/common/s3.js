/* eslint-disable init-declarations */
// import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';

// export async function getCategoryIcon() {
//   const creds = {
//     accessKeyId: "",
//     secretAccessKey: "",
//     //sessionToken: SessionToken
//   };

//   const s3 = new S3Client({
//     region: 'ap-northeast-1',
//     credentials: creds,
//   });

//   const bucket = '';
//   const objectKey = 's3/category-icon.txt';

//   const result = await s3.send(new GetObjectCommand({
//     Bucket: bucket,
//     Key: objectKey,
//   }));

//   const reader = result.Body.getReader();
//   const csvText = await readFromStream(reader);
//   reader.cancel();
//   const csvList = parseCsvText2List(csvText);
//   console.log(csvList)
//   return parseCategoryIcon(csvList);
// }

// export async function getIconDefinition() {
//   const creds = {
//     accessKeyId: "",
//     secretAccessKey: "",
//     //sessionToken: SessionToken
//   };

//   const s3 = new S3Client({
//     region: 'ap-northeast-1',
//     credentials: creds,
//   });

//   const bucket = '';
//   const objectKey = 's3/icon.txt';

//   const result = await s3.send(new GetObjectCommand({
//     Bucket: bucket,
//     Key: objectKey,
//   }));

//   const reader = result.Body.getReader();
//   const csvText = await readFromStream(reader);
//   reader.cancel();
//   const csvList = parseCsvText2List(csvText)
//   return parseIconDefinition(csvList);
// }

/**
 * StreamReaderからテキストを読み込む
 * @param {*} reader
 * @returns text
 */
// eslint-disable-next-line no-unused-vars
async function readFromStream(reader) {
  // eslint-disable-next-line no-unused-vars
  let charsReceived = 0
  let resultText = ''
  // read() returns a promise that resolves
  // when a value has been received
  const csvText = await reader.read().then(function processText({ done, value }) {
    // Result objects contain two properties:
    // done  - true if the stream has already given you all its data.
    // value - some data. Always undefined when done is true.
    if (done) {
      return resultText
    }
    // value for fetch streams is a Uint8Array
    charsReceived += value.length
    const chunk = value
    resultText += new TextDecoder().decode(chunk)

    // Read some more, and call this function again
    return reader.read().then(processText)
  })

  return csvText
}

/**
 * CSVテキストを配列形式に変換する
 * @param {*} csvText
 * @returns 配列形式に変換したCSV
 */
// eslint-disable-next-line no-unused-vars
function parseCsvText2List(csvText) {
  //改行コードで分割
  const rows = csvText.split('\r\n')
  return rows.map((row) => {
    return row.replaceAll('\'', '').replaceAll('"', '').split(',')
  })
}

/**
 * 配列形式のCategoryIcon配列をオブジェクト作成の配列に変換する
 * @param {*} list
 * @returns
 */
// eslint-disable-next-line no-unused-vars
function parseCategoryIcon(list) {
  if (!list || list.length <= 1) {
    return []
  }

  let catLrgClassCdColNo,
    catExtClassUrlColNo,
    iconNoColNo,
    selectedIconNoColNo

  const header = list[0]
  header.forEach((data, index) => {
    switch (data) {
    case 'catLrgClassCd':
      catLrgClassCdColNo = index
      break
    case 'catExtClassUrl':
      catExtClassUrlColNo = index
      break
    case 'iconNo':
      iconNoColNo = index
      break
    case 'selectedIconNo':
      selectedIconNoColNo = index
      break

    default:
      break
    }
  })

  const ret = []
  list.forEach((row, index) => {
    if (index === 0) {
      return
    }
    if (!row[catLrgClassCdColNo]
      || !row[catExtClassUrlColNo]
      || !row[iconNoColNo]
      || !row[selectedIconNoColNo]) {

      return
    }
    ret.push({
      catLrgClassCd: row[catLrgClassCdColNo],
      catExtClassUrl: row[catExtClassUrlColNo],
      iconNo: row[iconNoColNo],
      selectedIconNo: row[selectedIconNoColNo]
    })
  })
  return ret
}

/**
 * 配列形式のCategoryIcon配列をオブジェクト作成の配列に変換する
 * @param {*} list
 * @returns
 */
// eslint-disable-next-line no-unused-vars
function parseIconDefinition(list) {
  if (!list || list.length <= 1) {
    return []
  }

  let iconNoColNo,
    xlColNo,
    yColNo,
    urlColNo

  const header = list[0]
  header.forEach((data, index) => {
    switch (data) {
    case 'iconNo':
      iconNoColNo = index
      break
    case 'x':
      xlColNo = index
      break
    case 'y':
      yColNo = index
      break
    case 'url':
      urlColNo = index
      break

    default:
      break
    }
  })

  const ret = []
  list.forEach((row, index) => {
    if (index === 0) {
      return
    }
    if (!row[iconNoColNo]
      || !row[xlColNo]
      || !row[yColNo]
      || !row[urlColNo]) {

      return
    }
    ret.push({
      iconNo: row[iconNoColNo],
      x: row[xlColNo],
      y: row[yColNo],
      url: row[urlColNo]
    })
  })
  return ret
}
