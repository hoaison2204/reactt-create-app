/* eslint-disable no-unused-vars */
import Vue from 'vue'
import moment from 'moment'

/**
 * support input format:
 * 1200 (12:00)
 */
Vue.filter('formatTimeOnly', (value) => {
  if (!value) {
    return ''
  }
  return `${value.substring(0, 2)}:${value.substring(2)}`
})


/**
 * support input format:
 * 20211201 (2021/12/01)
 */
Vue.filter('formatDate', (value, outFormat = 'YYYY/MM/DD', inputFormat = null) => {
  if (!value) {
    return ''
  }
  if (!moment.isMoment(value)) {
    if (inputFormat) {
      value = moment(value, inputFormat)
    } else {
      value = moment(value)
    }
  }
  return value.format(outFormat)
  // const year = value.substring(0, 4)
  // const month = value.substring(4, 6)
  // const day = value.substring(6)
  // return moment(new Date(year, month - 1, day)).local().format(outFormat)
})
