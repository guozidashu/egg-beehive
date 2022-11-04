import request from '@/utils/request'
// 新接口

// 下拉框数据获取 common/getBasicInfo
export function getCommonAllList(data) {
  return request({
    url: '/common/getBasicInfo',
    method: 'post',
    data,
  })
}
// 尺码管理
export function delSizeDel(data) {
  return request({
    url: '/archive/sizeDel',
    method: 'post',
    data,
  })
}
export function addSizeSave(data) {
  return request({
    url: '/archive/sizeSave',
    method: 'post',
    data,
  })
}
export function getSizeList(data) {
  return request({
    url: '/archive/sizeList',
    method: 'post',
    data,
  })
}
// 尺码组管理
export function delSizeGroupDel(data) {
  return request({
    url: '/archive/sizeGroupDel',
    method: 'post',
    data,
  })
}
export function addSizeGroupSave(data) {
  return request({
    url: '/archive/sizeGroupSave',
    method: 'post',
    data,
  })
}
export function getSizeGroupList(data) {
  return request({
    url: '/archive/sizeGroupList',
    method: 'post',
    data,
  })
}
// 颜色管理
export function delColorDel(data) {
  return request({
    url: '/archive/colorDel',
    method: 'post',
    data,
  })
}
export function addColorSave(data) {
  return request({
    url: '/archive/colorSave',
    method: 'post',
    data,
  })
}
export function getColorList(data) {
  return request({
    url: '/archive/colorList',
    method: 'post',
    data,
  })
}
// 颜色组管理
export function delColorGroupDel(data) {
  return request({
    url: '/archive/colorGroupDel',
    method: 'post',
    data,
  })
}
export function addColorGroupSave(data) {
  return request({
    url: '/archive/colorGroupSave',
    method: 'post',
    data,
  })
}
export function getColorGroupList(data) {
  return request({
    url: '/archive/colorGroupList',
    method: 'post',
    data,
  })
}
// 季节管理
export function delSeasonDel(data) {
  return request({
    url: '/archive/seasonDel',
    method: 'post',
    data,
  })
}
export function addSeasonSave(data) {
  return request({
    url: '/archive/seasonSave',
    method: 'post',
    data,
  })
}
export function getSeasonList(data) {
  return request({
    url: '/archive/seasonList',
    method: 'post',
    data,
  })
}
// 年份管理
export function delYearDel(data) {
  return request({
    url: '/archive/yearDel',
    method: 'post',
    data,
  })
}
export function addYearSave(data) {
  return request({
    url: '/archive/yearSave',
    method: 'post',
    data,
  })
}
export function getYearList(data) {
  return request({
    url: '/archive/yearList',
    method: 'post',
    data,
  })
}
// 品牌管理
export function delBrandDel(data) {
  return request({
    url: '/archive/brandDel',
    method: 'post',
    data,
  })
}
export function addBrandSave(data) {
  return request({
    url: '/archive/brandSave',
    method: 'post',
    data,
  })
}
export function getBrandList(data) {
  return request({
    url: '/archive/brandList',
    method: 'post',
    data,
  })
}

//库位管理
export function delDepotPositionSaveList(data) {
  return request({
    url: '/archive/depotPositionDel',
    method: 'post',
    data,
  })
}
export function addDepotPositionSaveList(data) {
  return request({
    url: '/archive/depotPositionSave',
    method: 'post',
    data,
  })
}
export function getDepotPositionSaveList(data) {
  return request({
    url: '/archive/depotPositionList',
    method: 'post',
    data,
  })
}
// 仓库管理

export function getArchiveList(data) {
  return request({
    url: '/archive/depotList',
    method: 'post',
    data,
  })
}
export function delArchiveList(data) {
  return request({
    url: '/archive/depotDel',
    method: 'post',
    data,
  })
}
export function editArchiveList(data) {
  return request({
    url: '/archive/depotSave',
    method: 'post',
    data,
  })
}
// 客户等级
export function getGradeListList(data) {
  return request({
    url: '/customer/gradeList',
    method: 'post',
    data,
  })
}
export function editGradeListList(data) {
  return request({
    url: '/customer/gradeSave',
    method: 'post',
    data,
  })
}
export function delGradeListList(data) {
  return request({
    url: '/customer/gradeDel',
    method: 'post',
    data,
  })
}
export function getInfoGradeListList(data) {
  return request({
    url: '/customer/gradeInfo',
    method: 'post',
    data,
  })
}
// 客户分类
export function getCustomerList(data) {
  return request({
    url: '/customer/typeList',
    method: 'post',
    data,
  })
}
export function editCustomerList(data) {
  return request({
    url: '/customer/typeSave',
    method: 'post',
    data,
  })
}
export function delCustomerList(data) {
  return request({
    url: '/customer/typeDel',
    method: 'post',
    data,
  })
}
// 客户标签
export function getParentTagList(data) {
  return request({
    url: '/customer/getParentTag',
    method: 'post',
    data,
  })
}
export function getTagListList(data) {
  return request({
    url: '/customer/tagList',
    method: 'post',
    data,
  })
}
export function editTagSaveList(data) {
  return request({
    url: '/customer/tagSave',
    method: 'post',
    data,
  })
}
export function delTagDelList(data) {
  return request({
    url: '/customer/tagDel',
    method: 'post',
    data,
  })
}
