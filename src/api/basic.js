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

// 基础档案模块  增删改查接口

// 客户管理
export function getManagementList(data) {
  return request({
    url: '/management_list',
    method: 'post',
    data,
  })
}
export function addManagementList(data) {
  return request({
    url: '/management_add',
    method: 'post',
    data,
  })
}

// 商品管理
export function getGoodsManagementList(data) {
  return request({
    url: '/goods_management',
    method: 'post',
    data,
  })
}
export function addGoodsList(data) {
  return request({
    url: '/goods_add',
    method: 'post',
    data,
  })
}
export function getGoodsTypeList(data) {
  return request({
    url: '/goods_type',
    method: 'post',
    data,
  })
}
// 供应商管理
export function getSupplierManagementList(data) {
  return request({
    url: '/supplier_management',
    method: 'post',
    data,
  })
}
// 物料分类
export function getBomList(data) {
  return request({
    url: '/Bomcategory_index',
    method: 'post',
    data,
  })
}
export function addBom(data) {
  return request({
    url: '/Bomcategory_save',
    method: 'post',
    data,
  })
}
export function editBom(data) {
  return request({
    url: '/Bomcategory_edit',
    method: 'post',
    data,
  })
}
export function updateBom(data) {
  return request({
    url: '/Bomcategory_update',
    method: 'post',
    data,
  })
}
export function deleteBom(data) {
  return request({
    url: '/Bomcategory_delete',
    method: 'post',
    data,
  })
}

// 尺码
export function getSizeList(data) {
  return request({
    url: '/size_index',
    method: 'post',
    data,
  })
}
export function addSize(data) {
  return request({
    url: '/size_save',
    method: 'post',
    data,
  })
}
export function editSize(data) {
  return request({
    url: '/size_edit',
    method: 'post',
    data,
  })
}
export function updateSize(data) {
  return request({
    url: '/size_update',
    method: 'post',
    data,
  })
}
export function deleteSize(data) {
  return request({
    url: '/size_delete',
    method: 'post',
    data,
  })
}

// 颜色组
export function getColorGroupList(data) {
  return request({
    url: '/color_index',
    method: 'post',
    data,
  })
}
export function editColorGroupList(data) {
  return request({
    url: '/color_edit_group',
    method: 'post',
    data,
  })
}
export function addColorGroupList(data) {
  return request({
    url: '/color_group',
    method: 'post',
    data,
  })
}
export function deleteColorGroupList(data) {
  return request({
    url: '/color_delete_group',
    method: 'post',
    data,
  })
}
// 颜色
export function getColorList(data) {
  return request({
    url: '/color_color',
    method: 'post',
    data,
  })
}
export function editColorList(data) {
  return request({
    url: '/color_update',
    method: 'post',
    data,
  })
}
export function addColorList(data) {
  return request({
    url: '/color_save',
    method: 'post',
    data,
  })
}
export function deleteColorList(data) {
  return request({
    url: '/color_delete',
    method: 'post',
    data,
  })
}
// 客户等级
export function getGradeList(data) {
  return request({
    url: '/grade_index',
    method: 'post',
    data,
  })
}
export function addGrade(data) {
  return request({
    url: '/grade_save',
    method: 'post',
    data,
  })
}
export function editGrade(data) {
  return request({
    url: '/grade_edit',
    method: 'post',
    data,
  })
}
export function updateGrade(data) {
  return request({
    url: '/grade_update',
    method: 'post',
    data,
  })
}
export function deleteGrade(data) {
  return request({
    url: '/grade_delete',
    method: 'post',
    data,
  })
}
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
    url: '/wave_srve',
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
