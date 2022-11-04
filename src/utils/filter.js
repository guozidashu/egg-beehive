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
