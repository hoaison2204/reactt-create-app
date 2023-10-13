/* eslint-disable no-use-before-define */
/**
 * 共通関数に関する機能を提供する
 */

import { Loader } from 'google-maps'
// eslint-disable-next-line no-unused-vars
import Facility from '../model/facility'
import Menu from '../model/menu'
import FacilityMenu from '../model/facilityMenu'

/**
 * GoogleMaps JavaScript APIのgoogleオブジェクト
 */
// eslint-disable-next-line init-declarations
let google

initGoogle()

export async function initGoogle(mapOption = {}) {
  const language = process.env.VUE_APP_MAP_BASEGOOGLE_LANGUAGE ? process.env.VUE_APP_MAP_BASEGOOGLE_LANGUAGE : 'ja'
  const region = process.env.VUE_APP_MAP_BASEGOOGLE_REGION ? process.env.VUE_APP_MAP_BASEGOOGLE_REGION : 'JP'
  const version = process.env.VUE_APP_MAP_BASEGOOGLE_VERSION ? process.env.VUE_APP_MAP_BASEGOOGLE_VERSION : 3
  const googleMapsLoaderOptions = Object.assign({
    language,
    region,
    version
  }, mapOption)
  const googleMapsLoader = new Loader(
    process.env.VUE_APP_MAP_GOOGLE_API_KEY,
    googleMapsLoaderOptions
  )

  // eslint-disable-next-line no-unused-vars
  return new Promise(function (resolve, reject) {
    googleMapsLoader.load().then(function (g) {
      google = g
      resolve(g)
    })
  })
}

function hasGoogle() {
  if (google && google.maps) {
    return true
  }
  return false
}

/**
 * GoogleMaps JavaScript APIのgoogleオブジェクトを解決するPromiseを返す
 */
export async function getGoogle() {
  return new Promise(function (resolve) {
    if (hasGoogle()) {
      resolve(google)
      return
    }
    const timer = setInterval(function () {
      if (google && google.maps) {
        clearInterval(timer)
        resolve(google)
      }
    }, 100)
  })
}

/**
 * ジオコーディングを実行する
 * @param google googleオブジェクト
 * @param address 住所
 */
export async function geocode(google, address) {
  const geocoder = new google.maps.Geocoder()
  const region = process.env.VUE_APP_BASEGOOGLE_REGION

  // eslint-disable-next-line no-unused-vars
  return new Promise(function (resolve, reject) {
    geocoder.geocode(
      {
        address,
        region
      },
      function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          const latLng = results[0].geometry.location
          resolve({
            success: true,
            lat: latLng.lat(),
            lng: latLng.lng()
          })
        } else {
          resolve({
            success: false,
            error: getGeocodeErrorMsgFail(status)
          })
        }
      })
  })
}

function getGeocodeErrorMsgFail(status) {
  let errMsg = ''
  switch (status) {
  case 'ZERO_RESULTS':
    errMsg = '正しい住所や施設名を入力してください。'
    break
  case 'OVER_QUERY_LIMIT':
    errMsg = 'ジオコーディングの利用上限を超えています。'
    break
  case 'REQUEST_DENIED':
    errMsg = 'ジオコーディングの利用が許可されていません。'
    break
  case 'INVALID_REQUEST':
    errMsg = 'パラメータが不正です。'
    break
  case 'UNKNOWN_ERROR':
    errMsg = '不明なエラーが発生しました。'
    break
  case 'ERROR':
    errMsg = 'タイムアウトもしくはGoogleサーバーのエラーです。'
    break
  }
  return errMsg
}

/**
 * MenuのリストからFacilityMenuのリストを生成して返す
 */
export function menuList2FacilityMenuList(menuList) {
  return menuList.map((menu) => {
    return FacilityMenu.createListFromMenu(menu)
  }).flat()
}

/**
 * 中間データからメニューリストを作成する
 */
export function createMenuListFromIntermediate(menuBasicList, storeList, planList, iconList) {
  const menuList = []
  menuBasicList.forEach((menuBasic) => {
    const menu = Menu.createFromResponse(menuBasic)
    //店舗一覧あてこみ
    storeList.forEach((store) => {
      const menuNo = store.menuNo
      if (Menu.isEquals({ menuNo }, menu)) {
        menu.setFacilityList(store.data)
      }
    })

    //プラン一覧あてこみ
    planList.forEach((plan) => {
      const menuNo = plan.menuNo
      if (Menu.isEquals({ menuNo }, menu)) {
        menu.setPlanList(plan.data)
      }
    })

    //アイコン一覧あてこみ
    iconList.forEach((icon) => {
      const menuNo = icon.menuNo
      if (Menu.isEquals({ menuNo }, menu)) {
        menu.setIconList(icon.data)
      }
    })

    menuList.push(menu)
  })
  return menuList
}
