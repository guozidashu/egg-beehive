import Vue from 'vue'
import App from './App'
import i18n from './i18n'
import store from './store'
import router from './router'
import '@/vab'
import '@/utils/filter'
import * as API from '@/api/basic.js' //引入api
import hasPermi from '@/utils/hasPermi' //引入权限自定义指令
import QyComponent from '@/qy/qy.js' //引入圈域全局组件
import * as print from '@/utils/print.js' //引入自定义打印文件
import {
  permissionFiltering,
  moneyFormatInput,
  numFormatInput,
  WhitespaceRemoval,
} from '@/utils/filter' //引入全局过滤器
import * as echarts from 'echarts' //引入echart

const Event = new Vue() // 全局事件总线声明
Vue.prototype.$echarts = echarts // echarts 全局注册
Vue.prototype.$permissionFiltering = permissionFiltering // 非按钮权限过滤
Vue.prototype.$event = Event // 全局事件总线
Vue.prototype.api = API // 全局api
Vue.prototype.$moneyFormatInput = moneyFormatInput // 全局金额格式化函数输入框
Vue.prototype.$numFormatInput = numFormatInput // 正整数格式化函数输入框
Vue.prototype.$WhitespaceRemoval = WhitespaceRemoval // 输入框去除空格
Vue.use(QyComponent) // 圈域全局组件
Vue.use(hasPermi) // 权限自定义指令
Vue.prototype.print = print // 自定义打印文件挂载
// 导出为pdf
import htmlToPdf from '@/utils/pdf.js' //注意，这里的路径是我本地的路径，需要自行应用，请不要随便复制进去导致报错
Vue.use(htmlToPdf)
import { debounce, throttle } from '@/utils/throttle' // 引入防抖节流函数
Vue.prototype.$debounce = debounce // 防抖
Vue.prototype.$throttle = throttle // 节流
// 防抖处理-立即执行 -- 按钮点击事件 查询，导出，同步等
const on = Vue.prototype.$on
Vue.prototype.$on = function (event, func) {
  let timer
  let flag = true
  let newFunc = func
  if (event == 'click') {
    newFunc = function () {
      if (flag) {
        func.apply(this, arguments)
        flag = false
      }
      clearTimeout(timer)
      timer = setTimeout(function () {
        flag = true
      }, 500)
    }
  }
  on.call(this, event, newFunc)
}
/**
 * @description 正式环境默认使用mock，正式项目记得注释后再打包
 */
import { baseURL, pwa } from './config'

import { isExternal } from '@/utils/validate'

if (pwa) require('./registerServiceWorker')
Vue.config.productionTip = false
new Vue({
  el: '#app',
  i18n,
  store,
  router,
  render: (h) => h(App),
})
