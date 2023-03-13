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
import {
  permissionFiltering,
  moneyFormatInput,
  numFormatInput,
} from '@/utils/filter' //引入全局过滤器
import * as echarts from 'echarts' //引入echart
const Event = new Vue() // 全局事件总线声明
Vue.prototype.$echarts = echarts // echarts 全局注册
Vue.prototype.$permissionFiltering = permissionFiltering // 非按钮权限过滤
Vue.prototype.$event = Event // 全局事件总线
Vue.prototype.api = API // 全局api
Vue.prototype.$moneyFormatInput = moneyFormatInput // 全局金额格式化函数输入框
Vue.prototype.$numFormatInput = numFormatInput // 正整数格式化函数输入框
Vue.use(QyComponent) // 圈域全局组件
Vue.use(hasPermi) // 权限自定义指令

// 字体引入
// import './assets/font/index.scss'

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
