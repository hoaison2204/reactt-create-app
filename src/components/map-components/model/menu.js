import Facility from './facility'
import Plan from './plan'
import Icon from './icon'

export default class Menu {
  menuNo = null;
  menuNm = '';
  menuNmKana = '';
  catchCopy = '';
  leadCopy = '';
  menuImages = [];
  categoryInfomation = {
    catLrgClassCd: '',
    catLrgClassNm: '',
    catMidClassCd: '',
    catMidClassNm: '',
    catSmlClassCd: '',
    catSmlClassNm: ''
  };

  areaInfomation = {
    areaDtlClassCd: '',
    areaDtlClassNm: '',
    areatLrgClassCd: '',
    areaLrgClassNm: '',
    areaMidClassCd: '',
    areaMidClassNm: '',
    areaSmlClassCd: '',
    areaSmlClassNm: ''
  };

  /** 検索地点からの距離（施設が複数ある場合、最少距離を採用） */
  distance = null;
  facilityList = [];
  planList = [];
  iconList = [];

  // constructor(menuNo) {
  //   this.menuNo = menuNo;
  // }

  getPriorityImageUrl() {
    if (!this.menuImages || this.menuImages.length === 0) {
      return null
    }

    return this.menuImages[0].imageUrl
  }


  setFacilityList(facilityList) {
    if (!facilityList || !Array.isArray(facilityList) || facilityList.length === 0) {
      this.facilityList = []
      return
    }
    this.facilityList = facilityList.map(Facility.createFromResponse)
  }

  setPlanList(planList) {
    if (!planList || !Array.isArray(planList) || planList.length === 0) {
      this.planList = []
      return
    }
    this.planList = planList.map(Plan.createFromResponse)
  }

  setIconList(iconList) {
    if (!iconList || !Array.isArray(iconList) || iconList.length === 0) {
      this.iconList = []
      return
    }
    this.iconList = iconList.map(Icon.createFromResponse)
  }

  /**
   * 等価判定
   */
  static isEquals(menu1, menu2) {
    if (!menu1 || !menu2) {
      return false
    }
    return menu1.menuNo === menu2.menuNo
  }

  /** APIのレスポンス形式からモデルに変換する */
  static createFromResponse(response) {
    const menu = new Menu()
    menu.menuNo = response.menuNo
    menu.menuNm = response.menuNm
    menu.menuNmKana = response.menuNmKana
    menu.menuRcSttDt = response.menuRcSttDt
    menu.menuRcEndDt = response.menuRcEndDt
    menu.catchCopy = response.catchCopy
    menu.leadCopy = response.leadCopy
    menu.menuImages = response.menuImages

    if (response.categoryInfomation) {
      if ('catLrgClassCd' in response.categoryInfomation) {
        menu.categoryInfomation.catLrgClassCd = response.categoryInfomation.catLrgClassCd
      }
      if ('catLrgClassNm' in response.categoryInfomation) {
        menu.categoryInfomation.catLrgClassNm = response.categoryInfomation.catLrgClassNm
      }
      if ('catMidClassCd' in response.categoryInfomation) {
        menu.categoryInfomation.catMidClassCd = response.categoryInfomation.catMidClassCd
      }
      if ('catMidClassNm' in response.categoryInfomation) {
        menu.categoryInfomation.catMidClassNm = response.categoryInfomation.catMidClassNm
      }
      if ('catSmlClassCd' in response.categoryInfomation) {
        menu.categoryInfomation.catSmlClassCd = response.categoryInfomation.catSmlClassCd
      }
      if ('catSmlClassNm' in response.categoryInfomation) {
        menu.categoryInfomation.catSmlClassNm = response.categoryInfomation.catSmlClassNm
      }
    }

    if ('facilities' in response) {
      menu.setFacilityList(response.facilities)
    }
    if ('facilityList' in response) {
      menu.setFacilityList(response.facilityList)
    }

    if ('planList' in response) {
      menu.setPlanList(response.planList)
    }

    if ('iconList' in response) {
      menu.setIconList(response.iconList)
    }

    if ('areaInfomation' in response) {
      menu.areaInfomation = response.areaInfomation
    }
    return menu
  }

  /** PUREなオブジェクトからモデルに変換する */
  static createFromPureObject(object) {
    const menu = new Menu()
    menu.menuNo = object.menuNo
    menu.menuNm = object.menuNm
    menu.menuNmKana = object.menuNmKana
    menu.menuRcSttDt = object.menuRcSttDt
    menu.menuRcEndDt = object.menuRcEndDt
    menu.catchCopy = object.catchCopy
    menu.leadCopy = object.leadCopy
    menu.menuImages = object.menuImages

    if (object.categoryInfomation) {
      if ('catLrgClassCd' in object.categoryInfomation) {
        menu.categoryInfomation.catLrgClassCd = object.categoryInfomation.catLrgClassCd
      }
      if ('catLrgClassNm' in object.categoryInfomation) {
        menu.categoryInfomation.catLrgClassNm = object.categoryInfomation.catLrgClassNm
      }
      if ('catMidClassCd' in object.categoryInfomation) {
        menu.categoryInfomation.catMidClassCd = object.categoryInfomation.catMidClassCd
      }
      if ('catMidClassNm' in object.categoryInfomation) {
        menu.categoryInfomation.catMidClassNm = object.categoryInfomation.catMidClassNm
      }
      if ('catSmlClassCd' in object.categoryInfomation) {
        menu.categoryInfomation.catSmlClassCd = object.categoryInfomation.catSmlClassCd
      }
      if ('catSmlClassNm' in object.categoryInfomation) {
        menu.categoryInfomation.catSmlClassNm = object.categoryInfomation.catSmlClassNm
      }
    }

    if ('facilities' in object) {
      menu.setFacilityList(object.facilities)
    }
    if ('facilityList' in object) {
      menu.setFacilityList(object.facilityList)
    }
    if ('planList' in object) {
      menu.setPlanList(object.planList)
    }
    if ('iconList' in object) {
      menu.setIconList(object.iconList)
    }
    if ('areaInfomation' in object) {
      menu.areaInfomation = object.areaInfomation
    }
    return menu
  }

}
