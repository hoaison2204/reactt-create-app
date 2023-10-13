import Vue from 'vue'

Vue.filter('formatInteger', (variable, withThousandSeparator = true) => {
  // variable = variable !== null && variable !== undefined ? String(variable) : ''
  // // remove all character without number
  // let cleanedNum = variable.replace(/[^0-9+,]/g, '')
  // // remove commas, points
  // cleanedNum = cleanedNum.replace(/,/g, '')
  // cleanedNum = String(cleanedNum)
  // cleanedNum = cleanedNum.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  // return cleanedNum

  variable = variable !== null && variable !== undefined ? String(variable) : ''
  // remove all character without number
  let cleanedNum = variable.replace(/[^0-9+,]/g, '')
  // remove commas, points
  cleanedNum = cleanedNum.replace(/,/g, '')
  cleanedNum = String(cleanedNum)
  if (withThousandSeparator) {
    // add thousand separator
    cleanedNum = cleanedNum.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  return cleanedNum
})

Vue.filter('formatDecimal', (variable) => {
  variable = variable !== null && variable !== undefined ? String(variable) : ''
  // remove all character without number
  let cleanedNum = variable.replace(/[^0-9+.]/g, '').replace(/\.{2,}/g, '.')
  
  if (cleanedNum.match(/^\./g)) {
    cleanedNum = cleanedNum.slice(1)
  }
  if (cleanedNum.match(/\.$/g)) {
    cleanedNum = cleanedNum.slice(0, -1)
  }

  let firstPath = cleanedNum
  let secondPath = null
  if (cleanedNum.indexOf('.') >= 0) {
    firstPath = cleanedNum.substring(0, cleanedNum.indexOf('.'))
    secondPath = cleanedNum.substring(cleanedNum.indexOf('.'))
    secondPath = secondPath.slice(0, secondPath.lastIndexOf('.') + 4)
  }
  // remove commas, points
  firstPath = firstPath.replace(/,/g, '')
  firstPath = firstPath ? String(firstPath) : ''
  // add thousand separator
  firstPath = firstPath.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return `${firstPath}${secondPath ? String(secondPath) : ''}`
})

Vue.filter('formatCurrency', (variable, postFix = '円') => {
  variable = variable !== null && variable !== undefined ? String(variable) : ''
  // remove all character without number
  let cleanedNum = variable.replace(/[^0-9+.]/g, '').replace(/\.{2,}/g, '.')
  
  if (cleanedNum.match(/^\./g)) {
    cleanedNum = cleanedNum.slice(1)
  }
  if (cleanedNum.match(/\.$/g)) {
    cleanedNum = cleanedNum.slice(0, -1)
  }

  let firstPath = cleanedNum
  let secondPath = null
  if (cleanedNum.indexOf('.') >= 0) {
    firstPath = cleanedNum.substring(0, cleanedNum.indexOf('.'))
    secondPath = cleanedNum.substring(cleanedNum.indexOf('.'))
    secondPath = secondPath.slice(0, secondPath.lastIndexOf('.') + 4)
  }
  // remove commas, points
  firstPath = firstPath.replace(/,/g, '')
  firstPath = firstPath ? String(firstPath) : ''
  // add thousand separator
  firstPath = firstPath.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return `${firstPath}${secondPath ? String(secondPath) : ''}${postFix ? postFix : ''}`
})
