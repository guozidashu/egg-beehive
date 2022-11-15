import request from '@/utils/request'
// 新接口

//获取仓库
export function getWarehouseList(data) {
  return request({
    url: '/common/getWarehouseList',
    method: 'post',
    data,
  })
}
//获取库位
export function getWarehousePositionList(data) {
  return request({
    url: '/common/getWarehousePositionList',
    method: 'post',
    data,
  })
}
// 下拉框数据获取 common/getBasicInfo
export function getCommonAllList(data) {
  return request({
    url: '/common/getBasicInfo',
    method: 'post',
    data,
  })
}
// 收支类别
export function getCategoryList(data) {
  return request({
    url: '/finance/categoryList',
    method: 'post',
    data,
  })
}
export function editCategorySave(data) {
  return request({
    url: '/finance/categorySave',
    method: 'post',
    data,
  })
}
export function delCategoryDel(data) {
  return request({
    url: '/finance/categoryDel',
    method: 'post',
    data,
  })
}
// 会计科目
export function getAccountList(data) {
  return request({
    url: '/finance/accountList',
    method: 'post',
    data,
  })
}
export function editAccountSave(data) {
  return request({
    url: '/finance/accountSave',
    method: 'post',
    data,
  })
}
export function delAccountDel(data) {
  return request({
    url: '/finance/accountDel',
    method: 'post',
    data,
  })
}
// 结算账户
export function getCorporateAccountList(data) {
  return request({
    url: '/finance/corporateAccountList',
    method: 'post',
    data,
  })
}
export function editCorporateAccountSavee(data) {
  return request({
    url: '/finance/corporateAccountSave',
    method: 'post',
    data,
  })
}
export function delCorporateAccountDel(data) {
  return request({
    url: '/finance/corporateAccountDel',
    method: 'post',
    data,
  })
}
// 费用单
export function getBillList(data) {
  return request({
    url: '/finance/billList',
    method: 'post',
    data,
  })
}
export function editBillSave(data) {
  return request({
    url: '/finance/billSave',
    method: 'post',
    data,
  })
}
export function delBillOut(data) {
  return request({
    url: '/finance/billOut',
    method: 'post',
    data,
  })
}
// 供应商收款单
export function getSupplierVoucherList(data) {
  return request({
    url: '/finance/supplierVoucherList',
    method: 'post',
    data,
  })
}
// 客户收款单
export function getCustomerVoucherList(data) {
  return request({
    url: '/finance/customerVoucherList',
    method: 'post',
    data,
  })
}
//客户分析
export function getInformationCustomerList(data) {
  return request({
    url: '/information/customerList',
    method: 'post',
    data,
  })
}
//订单分析
export function getInformationOrderList(data) {
  return request({
    url: '/information/orderList',
    method: 'post',
    data,
  })
}
// 订单列表
export function getOrderList(data) {
  return request({
    url: '/order/List',
    method: 'post',
    data,
  })
}
export function getOrderCount(data) {
  return request({
    url: '/order/getOrderCount',
    method: 'post',
    data,
  })
}
export function getOrderDetail(data) {
  return request({
    url: '/order/Detail',
    method: 'post',
    data,
  })
}
// 订单统计
export function getOrderCountList(data) {
  return request({
    url: '/order/CountList',
    method: 'post',
    data,
  })
}
export function getOrderCountDetail(data) {
  return request({
    url: '/order/CountDetail',
    method: 'post',
    data,
  })
}
// 商品统计
export function getGoodStatistics(data) {
  return request({
    url: '/goods/goodStatistics',
    method: 'post',
    data,
  })
}
export function getGoodLineChart(data) {
  return request({
    url: '/goods/goodLineChart',
    method: 'post',
    data,
  })
}
export function getGoodRank(data) {
  return request({
    url: '/goods/goodRank',
    method: 'post',
    data,
  })
}
// 库存统计
export function getStockStatistics(data) {
  return request({
    url: '/goods/stockStatistics',
    method: 'post',
    data,
  })
}
export function getStockCircular(data) {
  return request({
    url: '/goods/stockCircular',
    method: 'post',
    data,
  })
}
export function getStockRank(data) {
  return request({
    url: '/goods/stockRank',
    method: 'post',
    data,
  })
}
// 积分订单管理
export function getIntegralOrderList(data) {
  return request({
    url: '/research/integralOrderList',
    method: 'post',
    data,
  })
}
export function editIntegralOrderVerification(data) {
  return request({
    url: '/research/integralOrderVerification',
    method: 'post',
    data,
  })
}
// 员工积分记录
export function getEmployeeIntegralList(data) {
  return request({
    url: '/research/EmployeeIntegralList',
    method: 'post',
    data,
  })
}
// 员工积分排行
export function getEmployeeIntegralRank(data) {
  return request({
    url: '/research/EmployeeIntegralRank',
    method: 'post',
    data,
  })
}
// 积分规则
export function getIntegralRule(data) {
  return request({
    url: '/research/IntegralRule',
    method: 'post',
    data,
  })
}
export function editIntegralRuleSave(data) {
  return request({
    url: '/research/IntegralRuleSave',
    method: 'post',
    data,
  })
}
// 积分管理
export function getIntegralGoodsList(data) {
  return request({
    url: '/research/integralGoodsList',
    method: 'post',
    data,
  })
}
export function editIntegralGoodsSave(data) {
  return request({
    url: '/research/integralGoodsSave',
    method: 'post',
    data,
  })
}
export function delIntegralGoodsDel(data) {
  return request({
    url: '/research/integralGoodsDel',
    method: 'post',
    data,
  })
}
// 成品采购统计
export function getFinishCountList(data) {
  return request({
    url: '/supplier/finishCountList',
    method: 'post',
    data,
  })
}
export function getFinishCountRank(data) {
  return request({
    url: '/supplier/finishCountRank',
    method: 'post',
    data,
  })
}
export function getFinishGoodDetail(data) {
  return request({
    url: '/supplier/finishGoodDetail',
    method: 'post',
    data,
  })
}
// 物料采购统计
export function getMaterialCountListt(data) {
  return request({
    url: '/supplier/materialCountList',
    method: 'post',
    data,
  })
}
export function getMaterialCountRank(data) {
  return request({
    url: '/supplier/materialCountRank',
    method: 'post',
    data,
  })
}
export function getMaterialMaterialDetail(data) {
  return request({
    url: '/supplier/materialMaterialDetail',
    method: 'post',
    data,
  })
}
// 菜单管理
export function getMenuList(data) {
  return request({
    url: '/menu/menuList',
    method: 'post',
    data,
  })
}
export function editMenuSave(data) {
  return request({
    url: '/menu/menuSave',
    method: 'post',
    data,
  })
}
export function delMenuDel(data) {
  return request({
    url: '/menu/menuDel',
    method: 'post',
    data,
  })
}

//商品父分类
export function getCategoryMainList(data) {
  return request({
    url: '/goods/categoryMainList',
    method: 'post',
    data,
  })
}
export function editCategoryMainSave(data) {
  return request({
    url: '/goods/categoryMainSave',
    method: 'post',
    data,
  })
}
export function delCategoryMainDel(data) {
  return request({
    url: '/goods/categoryMainDel',
    method: 'post',
    data,
  })
}
//商品子分类
export function getCategorySonList(data) {
  return request({
    url: '/goods/categorySonList',
    method: 'post',
    data,
  })
}
export function editCategorySonSave(data) {
  return request({
    url: '/goods/categorySonSave',
    method: 'post',
    data,
  })
}
export function delCategorySonDel(data) {
  return request({
    url: '/goods/categorySonDel',
    method: 'post',
    data,
  })
}
export function editCategorySonStatus(data) {
  return request({
    url: '/goods/categorySonStatus',
    method: 'post',
    data,
  })
}
//商品管理
export function getGoodTabTotal(data) {
  return request({
    url: '/goods/goodTabTotal',
    method: 'post',
    data,
  })
}
export function getGoodList(data) {
  return request({
    url: '/goods/goodList',
    method: 'post',
    data,
  })
}
export function editGoodSave(data) {
  return request({
    url: '/goods/goodSave',
    method: 'post',
    data,
  })
}

export function getGoodTotalDetails(data) {
  return request({
    url: '/goods/goodTotalDetails',
    method: 'post',
    data,
  })
}
export function getGoodBasicsDetails(data) {
  return request({
    url: '/goods/goodBasicsDetails',
    method: 'post',
    data,
  })
}
export function getGoodOrderDetails(data) {
  return request({
    url: '/goods/goodOrderDetails',
    method: 'post',
    data,
  })
}

export function editGoodBatchLower(data) {
  return request({
    url: '/goods/goodBatchLower',
    method: 'post',
    data,
  })
}

// 供应商分析
export function getDissectList(data) {
  return request({
    url: '/supplier/dissectList',
    method: 'post',
    data,
  })
}
// 供应商管理
export function getSupplierList(data) {
  return request({
    url: '/supplier/supplierList',
    method: 'post',
    data,
  })
}
export function editSupplierDetail(data) {
  return request({
    url: '/supplier/supplierDetail',
    method: 'post',
    data,
  })
}

// 成品采购订单
export function getFinishDetail(data) {
  return request({
    url: '/supplier/finishDetail',
    method: 'post',
    data,
  })
}
export function editFinishCancellation(data) {
  return request({
    url: '/supplier/finishCancellation',
    method: 'post',
    data,
  })
}
export function getFinishList(data) {
  return request({
    url: '/supplier/finishList',
    method: 'post',
    data,
  })
}
// 物料采购订单
export function getPurchaseDetail(data) {
  return request({
    url: '/supplier/purchaseDetail',
    method: 'post',
    data,
  })
}
export function editPurchaseCancellation(data) {
  return request({
    url: '/supplier/purchaseCancellation',
    method: 'post',
    data,
  })
}
export function editPurchaseShipment(data) {
  return request({
    url: '/supplier/purchaseShipment',
    method: 'post',
    data,
  })
}
export function getPurchaseList(data) {
  return request({
    url: '/supplier/purchaseList',
    method: 'post',
    data,
  })
}
// 权限管理
export function getRoleInfo(data) {
  return request({
    url: '/admin/roleInfo',
    method: 'post',
    data,
  })
}
export function addRoleSave(data) {
  return request({
    url: '/admin/roleSave',
    method: 'post',
    data,
  })
}
export function getRoleList(data) {
  return request({
    url: '/admin/roleList',
    method: 'post',
    data,
  })
}
// 用户管理
export function getAdminInfo(data) {
  return request({
    url: '/admin/adminInfo',
    method: 'post',
    data,
  })
}
export function addAdminSave(data) {
  return request({
    url: '/admin/adminSave',
    method: 'post',
    data,
  })
}
export function getAdminList(data) {
  return request({
    url: '/admin/adminList',
    method: 'post',
    data,
  })
}
// 物料管理
export function delMaterialDel(data) {
  return request({
    url: '/archive/materialDel',
    method: 'post',
    data,
  })
}
export function addMaterialSave(data) {
  return request({
    url: '/archive/materialSave',
    method: 'post',
    data,
  })
}
export function getMaterialList(data) {
  return request({
    url: '/archive/materialList',
    method: 'post',
    data,
  })
}
export function getMaterialInfo(data) {
  return request({
    url: '/archive/materialInfo',
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
export function delDepotPositionSave(data) {
  return request({
    url: '/archive/depotPositionDel',
    method: 'post',
    data,
  })
}
export function addDepotPositionSave(data) {
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

export function getArchive(data) {
  return request({
    url: '/archive/depotList',
    method: 'post',
    data,
  })
}
export function delArchive(data) {
  return request({
    url: '/archive/depotDel',
    method: 'post',
    data,
  })
}
export function editArchive(data) {
  return request({
    url: '/archive/depotSave',
    method: 'post',
    data,
  })
}
// 客户等级
export function getGradeList(data) {
  return request({
    url: '/customer/gradeList',
    method: 'post',
    data,
  })
}
export function editGradeList(data) {
  return request({
    url: '/customer/gradeSave',
    method: 'post',
    data,
  })
}
export function delGradeList(data) {
  return request({
    url: '/customer/gradeDel',
    method: 'post',
    data,
  })
}
export function getInfoGradeList(data) {
  return request({
    url: '/customer/gradeInfo',
    method: 'post',
    data,
  })
}
// 客户分类
export function getCustomer(data) {
  return request({
    url: '/customer/typeList',
    method: 'post',
    data,
  })
}
export function editCustomer(data) {
  return request({
    url: '/customer/typeSave',
    method: 'post',
    data,
  })
}
export function delCustomer(data) {
  return request({
    url: '/customer/typeDel',
    method: 'post',
    data,
  })
}
// 客户标签
export function getParentTag(data) {
  return request({
    url: '/customer/getParentTag',
    method: 'post',
    data,
  })
}
export function getTagList(data) {
  return request({
    url: '/customer/tagList',
    method: 'post',
    data,
  })
}
export function editTagSave(data) {
  return request({
    url: '/customer/tagSave',
    method: 'post',
    data,
  })
}
export function delTagDel(data) {
  return request({
    url: '/customer/tagDel',
    method: 'post',
    data,
  })
}
