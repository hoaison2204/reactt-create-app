import Facility from './facility'
import Menu from './menu'

export default class FacilityMenu {
  facility = null;
  menu = null;

  /**
   * 等価判定
   */
  static isEquals(facilityMenu1, facilityMenu2) {
    return ((facilityMenu1.menu.menuNo === facilityMenu2.menu.menuNo)
        && (facilityMenu1.facility.facilityNm === facilityMenu2.facility.facilityNm))
  }

  /** Menuから配列形式のモデルに変換する（複数Facilityが有れば複数lengthの配列となる） */
  static createListFromMenu(menu) {
    if (!menu.facilityList || menu.facilityList.length === 0) {
      return []
    }

    return menu.facilityList.map((facility) => {
      const facilityMenu = new FacilityMenu()
      facilityMenu.menu = Menu.createFromPureObject({ ...menu })
      facilityMenu.facility = Facility.createFromPureObject({ ...facility })
      facilityMenu.menu.facilityList = []
      return facilityMenu
    })
  }
}
