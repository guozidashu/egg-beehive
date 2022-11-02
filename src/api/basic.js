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
// 客户等级
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
