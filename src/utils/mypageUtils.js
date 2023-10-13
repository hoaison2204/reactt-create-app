export function findMypageBoCode(mypageDomain) {
    const urlandCodeMapping = process.env.VUE_APP_MYPAGE_DOMAIN_AND_CODE_MAPPING;
  
    if (!urlandCodeMapping) {
        throw new Error(`env variable is not setted`);
    }
  
    const mappingArr = urlandCodeMapping.split(";").map(map => {
        const arr = map.split(",");
        if (arr.length != 2) {
            return {
                mypageDisplayCode: null,
                url: null
            }
        }
        return {
            mypageDisplayCode: arr[1],
            url: arr[0],
        }
    });
  
    const selected = mappingArr.find(map => map.url === mypageDomain);
    return selected ? selected.mypageDisplayCode : "BS";
  }