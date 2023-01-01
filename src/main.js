import Vue from 'vue'
import App from './App'
import i18n from './i18n'
import store from './store'
import router from './router'
import '@/vab'
import '@/utils/filter'
import hasPermi from '@/utils/hasPermi'
import QyComponent from '@/qy/qy.js'
import { permissionFiltering } from '@/utils/filter'
// import { GlobalConfig } from '@/public/config/config.js'
// 非按钮权限过滤
// GlobalConfig
Vue.prototype.$permissionFiltering = permissionFiltering
// Vue.prototype.$GlobalConfig = GlobalConfig
// 圈域全局组件
Vue.use(QyComponent)
// 权限自定义指令
Vue.use(hasPermi)
// 全局事件总线
const Event = new Vue()
Vue.prototype.$event = Event
// 字体引入
// import './assets/font/index.scss'

/**
 * @description 正式环境默认使用mock，正式项目记得注释后再打包
 */
import { baseURL, pwa } from './config'

import { isExternal } from '@/utils/validate'

if (process.env.NODE_ENV === 'production' && !isExternal(baseURL)) {
  const { mockXHR } = require('@/utils/static')
  mockXHR()
}

if (pwa) require('./registerServiceWorker')

Vue.config.productionTip = false
new Vue({
  el: '#app',
  i18n,
  store,
  router,
  render: (h) => h(App),
})
