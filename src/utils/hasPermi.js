//用来获取权限数据
import store from '@/store'
const hasPermi = {}
hasPermi.install = (Vue) => {
  Vue.directive('hasPermi', {
    inserted(el, binding) {
      //获取绑定值
      console.log(98989898989, el, binding)
      const { value } = binding
      // TODO 匹配规则，在页面写的要对应这个匹配规则
      const all_permission = '*:*:*'
      //获取用户权限数据
      const permissions = store.getters['routes/roleBtnList']
      console.log('权限数组', permissions)
      if (value && value instanceof Array && value.length > 0) {
        //权限标志
        const permissionFlag = value
        //判断用户是否有此权限
        const hasPermissions = permissions.some((permission) => {
          console.log('permission', permission)
          return (
            all_permission === permission || permissionFlag.includes(permission)
          )
        })
        //没有权限-移除页面上的控件
        if (!hasPermissions) {
          {
            //  清除点击事件
            el.onclick = null
            //  按钮样式禁用
            el.className += ' is-disabled'
            el.disabled = true
          }
        } else {
          el.parentNode && el.parentNode.removeChild(el)
          throw new Error(`请设置数组操作权限`)
        }
      }
    },
  })
}
export default hasPermi
