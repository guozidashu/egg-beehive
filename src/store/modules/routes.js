/**
 * @description 路由拦截状态管理，目前两种模式：all模式与intelligence模式，其中partialRoutes是菜单暂未使用
 */
import Vue from 'vue'
import { asyncRoutes, resetRouter } from '@/router'
import { convertRouter, filterRoutes } from '@/utils/routes'
import { authentication } from '@/config'
import { isArray } from '@/utils/validate'

const state = () => ({
  routes: [],
  activeName: '',
  roleBtnList: [],
})
const getters = {
  routes: (state) => state.routes,
  activeName: (state) => state.activeName,
  roleBtnList: (state) => state.roleBtnList,
}
const mutations = {
  /**
   * @description 多模式设置路由
   * @param {*} state
   * @param {*} routes
   */
  setRoutes(state, routes) {
    state.routes = routes
  },
  /**
   * @description 修改Meta
   * @param {*} state
   * @param options
   */
  changeMenuMeta(state, options) {
    function handleRoutes(routes) {
      return routes.map((route) => {
        if (route.name === options.name) Object.assign(route.meta, options.meta)
        if (route.children && route.children.length)
          route.children = handleRoutes(route.children)
        return route
      })
    }
    state.routes = handleRoutes(state.routes)
  },
  /**
   * @description 修改 activeName
   * @param {*} state
   * @param activeName 当前激活菜单
   */
  changeActiveName(state, activeName) {
    state.activeName = activeName
  },
  /**
   * @description 存储 权限按钮组
   * @param {*} state
   * @param roleBtnList
   */
  roleBtnList(state, roleBtnList) {
    state.roleBtnList = roleBtnList
  },
}
const actions = {
  /**
   * @description 多模式设置路由
   * @param {*} { commit }
   * @param mode
   * @returns
   */
  async setRoutes({ commit, rootState }) {
    // 默认前端路由
    let routes = [...asyncRoutes]
    // 设置后端路由(不需要可以删除)
    if (authentication === 'all') {
      let arr = rootState['user'].userRouteList
      console.log(222, arr)
      let list = []
      for (let i in arr) {
        list.push(arr[i]) //
      }
      let newlist = []
      list.forEach((item) => {
        if (item.guard.length != 0) {
          let temp = {}
          temp.name = item.name
          temp.guard = item.guard
          newlist.push(temp)
        }
        if (item.children.length != 0) {
          item.children.forEach((item1) => {
            if (item1.guard.length != 0) {
              let temp = {}
              temp.name = item1.name
              temp.guard = item1.guard
              newlist.push(temp)
            }
            if (item1.children.length != 0) {
              item1.children.forEach((item2) => {
                if (item2.guard.length != 0) {
                  let temp = {}
                  temp.name = item2.name
                  temp.guard = item2.guard
                  newlist.push(temp)
                }
              })
            }
          })
        }
      })
      console.log(123456, newlist)
      commit('roleBtnList', newlist)
      if (!isArray(list))
        Vue.prototype.$baseMessage(
          '路由格式返回有误！',
          'error',
          'vab-hey-message-error'
        )
      if (list[list.length - 1].path !== '*')
        list.push({ path: '*', redirect: '/404', meta: { hidden: true } })
      routes = convertRouter(list)
    }
    // 根据权限和rolesControl过滤路由
    const accessRoutes = filterRoutes(routes)
    // 设置菜单所需路由
    commit('setRoutes', JSON.parse(JSON.stringify(accessRoutes)))
    // 根据可访问路由重置Vue Router
    await resetRouter(accessRoutes)
  },
  /**
   * @description 修改Route Meta
   * @param {*} { commit }
   * @param options
   */
  changeMenuMeta({ commit }, options = {}) {
    commit('changeMenuMeta', options)
  },
  /**
   * @description 修改 activeName
   * @param {*} { commit }
   * @param activeName 当前激活菜单
   */
  changeActiveName({ commit }, activeName) {
    commit('changeActiveName', activeName)
  },
}
export default { state, getters, mutations, actions }
