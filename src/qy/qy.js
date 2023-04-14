import QyColorSelect from '@/qy/QYComponents/QyColorSelect'
import QySizeSelect from '@/qy/QYComponents/QySizeSelect'
import QYSelectLink from '@/qy/QYComponents/QYSelectLink'
import QYForm from '@/qy/QYComponents/QYForm'
import QYList from '@/qy/QYComponents/QYList'
import QYAddress from '@/qy/QYComponents/QYAddress'
import QYKeFu from '@/qy/QYComponents/QYKeFu'
import QYBranch from '@/qy/QYComponents/QYBranch'
import QYChinaMap from '@/qy/QYComponents/QYChinaMap'
import QYStroeMap from '@/qy/QYComponents/QYStroeMap'
import QYTextLabels from '@/qy/QYComponents/QYTextLabels'
import QYBranchTooltip from '@/qy/QYComponents/QYBranchTooltip'
import QYPopover from '@/qy/QYComponents/QYPopover'
import QYPopoverPrice from '@/qy/QYComponents/QYPopoverPrice'

export default {
  install(Vue) {
    Vue.component('QyColorSelect', QyColorSelect)
    Vue.component('QySizeSelect', QySizeSelect)
    Vue.component('QYSelectLink', QYSelectLink)
    Vue.component('QYForm', QYForm)
    Vue.component('QYList', QYList)
    Vue.component('QYAddress', QYAddress)
    Vue.component('QYKeFu', QYKeFu)
    Vue.component('QYBranch', QYBranch)
    Vue.component('QYChinaMap', QYChinaMap)
    Vue.component('QYStroeMap', QYStroeMap)
    Vue.component('QYTextLabels', QYTextLabels)
    Vue.component('QYBranchTooltip', QYBranchTooltip)
    Vue.component('QYPopover', QYPopover)
    Vue.component('QYPopoverPrice', QYPopoverPrice)
  },
}
