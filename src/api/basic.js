import request from '@/utils/request'
// 基础档案模块  增删改查接口

// 会计科目
export function getSubjectList(data) {
  return request({
    url: '/subject_index',
    method: 'post',
    data,
  })
}
export function addSubject(data) {
  return request({
    url: '/subject_save',
    method: 'post',
    data,
  })
}
export function editSubject(data) {
  return request({
    url: '/subject_edit',
    method: 'post',
    data,
  })
}
export function updateSubject(data) {
  return request({
    url: '/subject_update',
    method: 'post',
    data,
  })
}
export function deleteSubject(data) {
  return request({
    url: '/subject_delete',
    method: 'post',
    data,
  })
}
// 库房
export function getWarehouseList(data) {
  return request({
    url: '/warehouse_index',
    method: 'post',
    data,
  })
}
export function addWarehouse(data) {
  return request({
    url: '/warehouse_save',
    method: 'post',
    data,
  })
}
export function editWarehouse(data) {
  return request({
    url: '/warehouse_edit',
    method: 'post',
    data,
  })
}
export function updateWarehouse(data) {
  return request({
    url: '/warehouse_update',
    method: 'post',
    data,
  })
}
export function deleteWarehouse(data) {
  return request({
    url: '/warehouse_delete',
    method: 'post',
    data,
  })
}

// 品牌
export function getBrandList(data) {
  return request({
    url: '/band_index',
    method: 'post',
    data,
  })
}
export function addBrand(data) {
  return request({
    url: '/band_save',
    method: 'post',
    data,
  })
}
export function editBrand(data) {
  return request({
    url: '/band_edit',
    method: 'post',
    data,
  })
}
export function updateBrand(data) {
  return request({
    url: '/band_update',
    method: 'post',
    data,
  })
}
export function deleteBrand(data) {
  return request({
    url: '/band_delete',
    method: 'post',
    data,
  })
}

// 订货会
export function getMeetingList(data) {
  return request({
    url: '/meeting_index',
    method: 'post',
    data,
  })
}
export function addMeeting(data) {
  return request({
    url: '/meeting_save',
    method: 'post',
    data,
  })
}
export function editMeeting(data) {
  return request({
    url: '/meeting_edit',
    method: 'post',
    data,
  })
}
export function updateMeeting(data) {
  return request({
    url: '/meeting_update',
    method: 'post',
    data,
  })
}
export function deleteMeeting(data) {
  return request({
    url: '/meeting_delete',
    method: 'post',
    data,
  })
}
// 款式分类
export function getCategoryList(data) {
  return request({
    url: '/category_index',
    method: 'post',
    data,
  })
}
export function addCategory(data) {
  return request({
    url: '/category_save',
    method: 'post',
    data,
  })
}
export function editCategory(data) {
  return request({
    url: '/category_edit',
    method: 'post',
    data,
  })
}
export function updateCategory(data) {
  return request({
    url: '/category_update',
    method: 'post',
    data,
  })
}
export function deleteCategory(data) {
  return request({
    url: '/category_delete',
    method: 'post',
    data,
  })
}
// 波段
export function getWaveList(data) {
  return request({
    url: '/wave_index',
    method: 'post',
    data,
  })
}
export function addWave(data) {
  return request({
    url: '/wave_save',
    method: 'post',
    data,
  })
}
export function editWave(data) {
  return request({
    url: '/wave_edit',
    method: 'post',
    data,
  })
}
export function updateWave(data) {
  return request({
    url: '/wave_update',
    method: 'post',
    data,
  })
}
export function deleteWave(data) {
  return request({
    url: '/wave_delete',
    method: 'post',
    data,
  })
}

// 员工
export function getStaffList(data) {
  return request({
    url: '/staff_index',
    method: 'post',
    data,
  })
}
