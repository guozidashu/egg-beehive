import QyQy from '@/qy/components/QyQy'
import QyColorSelect from '@/qy/components/QyColorSelect'
import QySizeSelect from '@/qy/components/QySizeSelect'
export default {
  install(Vue) {
    Vue.component('QyQy', QyQy)
    Vue.component('QyColorSelect', QyColorSelect)
    Vue.component('QySizeSelect', QySizeSelect)
  },
}
