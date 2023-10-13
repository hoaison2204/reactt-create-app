// mock
import mock from '@/plugins/api/mock/index';

export async function api(path, params={}) {
  let data = mock.get(path, params);

  return await (() =>
    new Promise(resolve => {
      data.then((res) => {
        resolve(res)
      });
    })
  )();
}
