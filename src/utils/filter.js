import Vue from 'vue'
import store from '@/store'
/**
 * @description 非按钮权限过滤器
 * @param path {string} 路径名称}
 * @param role {string} 权限名称}
 * @returns {boolean}
 */
export function permissionFiltering(path, role) {
  let arr = store.getters['routes/roleBtnList']
  let temp = false
  arr.forEach((item) => {
    if (item.name == path) {
      if (item.guard) {
        item.guard.forEach((item1) => {
          if (item1 == role) {
            temp = true
          }
        })
      }
    }
  })
  // console.log('权限状态', temp)
  return temp
}

// 人民币过滤器
Vue.filter('moneyFormat', (value) => {
  // 金额分割符
  const separator = ','
  // 金额小数点
  const decimal = '.'
  // 金额小数点位数
  const decimalDigits = 2
  // 金额正则
  const moneyReg = new RegExp(
    `\\d(?=(\\d{3})+${decimalDigits > 0 ? '\\D' : '$'})`,
    'g'
  )
  // 金额格式化
  const moneyFormat = (value) => {
    value = Math.abs(value)
    value = value.toFixed(decimalDigits)
    value = value.replace(moneyReg, `$&${separator}`)
    value = value.replace('.', decimal)
    return value
  }
  // 金额格式化
  return moneyFormat(value)
})
// 三位数姓名脱敏，中间一位隐藏
Vue.filter('threeName', (value) => {
  return value
    .toString()
    .replace(/(?<=[\u4e00-\u9fa5]).*(?=[\u4e00-\u9fa5])/, '*')
})
//身份证脱敏展示
Vue.filter('peridcardtm', (value) => {
  return value.toString().replace(/^(.{3})(?:\d+)(.{4})$/, '$1**********$2')
})
//手机号码脱敏展示
Vue.filter('phoneteltm', (value) => {
  return value.toString().replace(/^(.{3})(?:\d+)(.{4})$/, '$1****$2')
})
// 两位数姓名脱敏，最后一位隐藏
Vue.filter('twoName', (value) => {
  return value.toString().replace(/.*(?=[\u4e00-\u9fa5])/, '*')
})
Vue.filter('threeName', (value) => {
  return value
})
Vue.filter('formatTime', (value) => {
  if (value) {
    let date = new Date(value * 1000) // 时间戳为秒：10位数
    //let date = new Date(value)    // 时间戳为毫秒：13位数
    let year = date.getFullYear()
    let month =
      date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    // let hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
    // let minute =
    //   date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    // let second =
    //   date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
    return `${year}-${month}-${day} `
    // return `${year}-${month}-${day} ${hour}:${minute}:${second}`
  } else {
    return ''
  }
})
