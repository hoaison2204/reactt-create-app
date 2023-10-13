export default class Facility {
  latitude = null;
  longitude = null;
  facilityNm = '';
  facilityNo = '';
  access = '';
  areaLrgClassCd = '';
  areaLrgClassNm = '';
  areaMidClassCd = '';
  areaMidClassNm = '';
  areaSmlClassCd = '';
  areaSmlClassNm = '';

  /** APIのレスポンス形式からモデルに変換する */
  static createFromResponse(response) {
    const facility = new Facility()
    facility.latitude = parseFloat(response.latitude)
    facility.longitude = parseFloat(response.longitude)
    facility.facilityNm = response.facilityNm
    facility.facilityNo = response.facilityNo
    facility.access = response.access
    facility.areaLrgClassCd = response.areaLrgClassCd
    facility.areaLrgClassNm = response.areaLrgClassNm
    facility.areaMidClassCd = response.areaMidClassCd
    facility.areaMidClassNm = response.areaMidClassNm
    facility.areaSmlClassCd = response.areaSmlClassCd
    facility.areaSmlClassNm = response.areaSmlClassNm

    return facility
  }

  /** PUREオブジェクト形式からモデルに変換する */
  static createFromPureObject(object) {
    const facility = new Facility()
    facility.latitude = parseFloat(object.latitude)
    facility.longitude = parseFloat(object.longitude)
    facility.facilityNm = object.facilityNm
    facility.facilityNo = object.facilityNo
    facility.access = object.access
    facility.areaLrgClassCd = object.areaLrgClassCd
    facility.areaLrgClassNm = object.areaLrgClassNm
    facility.areaMidClassCd = object.areaMidClassCd
    facility.areaMidClassNm = object.areaMidClassNm
    facility.areaSmlClassCd = object.areaSmlClassCd
    facility.areaSmlClassNm = object.areaSmlClassNm

    return facility
  }
}
