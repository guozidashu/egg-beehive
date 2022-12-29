//用来获取权限数据
import store from '@/store'
const hasPermi = {}
hasPermi.install = (Vue) => {
  Vue.directive('hasPermi', {
    inserted(el, binding) {
      //获取绑定值
      const { value } = binding
      //获取用户权限数据并修正
      let arr = store.getters['routes/roleBtnList']
      let arr1 = []
      arr.forEach((item) => {
        if (item.guard) {
          item.guard.forEach((item1) => {
            arr1.push('btn:' + item.name + ':' + item1)
          })
        }
      })
      if (value && value instanceof Array && value.length > 0) {
        //权限标志
        const permissionFlag = value

        const hasPermissions = arr1.some((role) => {
          return permissionFlag[0] === role
        })

        // 没有权限-移除页面上的控件
        if (!hasPermissions) {
          {
            if (el.className.indexOf('el-button') > -1) {
              //  清除点击事件
              el.onclick = null
              //  按钮样式禁用
              el.className += ' is-disabled'
              el.disabled = true
            }
          }
        }
      }
    },
  })
}
export default hasPermi
