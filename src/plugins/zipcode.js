const YubinBango = require('yubinbango-core2');

const Zipcode = {
  async getAddress(zip) {
    return await (() =>
      new Promise(resolve => {
        new YubinBango.Core(zip, (addr) => {
          resolve(addr)
        });
      })
    )();
  }
}


export default (_, inject) => inject('Zipcode', Zipcode)
