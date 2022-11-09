import Vue from 'vue'

// 人民币过滤器
Vue.filter('moneyFormat', (value) => {
  return '¥' + Number(value).toFixed(2)
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
    let hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
    let minute =
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    let second =
      date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
  } else {
    return ''
  }
})
