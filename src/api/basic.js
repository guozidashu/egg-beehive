import request from '@/utils/request'

// 没有用到的接口
export function editPurchaseShipment(data) {
  return request({
    url: '/supplier/purchaseShipment',
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
export function getOrderSourceAssay(data) {
  return request({
    url: '/information/orderSourceAssay',
    method: 'post',
    data,
  })
}
export function getInformationOrderSaleRank(data) {
  return request({
    url: '/information/orderSaleRank',
    method: 'post',
    data,
  })
}

// 模板新增 跳转 商品树形分类
export function getGoodsCategoryTree(data) {
  return request({
    url: '/goods/goodsCategoryTree',
    method: 'post',
    data,
  })
}

// 上边全是基础数据接口
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
//获取设计师
export function getgetDesignerList(data) {
  return request({
    url: '/common/getDesignerList',
    method: 'post',
    data,
  })
}
// 下拉框数据获取
export function getCommonAllList(data) {
  return request({
    url: '/common/getBasicInfo',
    method: 'post',
    data,
  })
}
//获取系统基础配置
export function getConfig(data) {
  return request({
    url: '/common/getConfig',
    method: 'post',
    data,
  })
}
// 修改密码
export function editChangePassword(data) {
  return request({
    url: '/common/changePassword',
    method: 'post',
    data,
  })
}
// 上边全是基础数据接口

// 下边是业务数据接口
// 首页模块接口
// 首页-聚水潭
// 首页-聚水潭 库存预警
export function getInformationStockWarning(data) {
  return request({
    url: '/information/jst/stockWarning',
    method: 'post',
    data,
  })
}
// 首页-聚水潭 商品分析
export function getInformationGoodsAnalysis(data) {
  return request({
    url: '/information/jst/goodsAnalysis',
    method: 'post',
    data,
  })
}
// 首页-聚水潭 渠道分析
export function getInformationJstChannel(data) {
  return request({
    url: '/information/jstChannel',
    method: 'post',
    data,
  })
}

// 首页-聚水潭 渠道分析 排行
export function getInformationJstSaleRank(data) {
  return request({
    url: '/information/jstSaleRank',
    method: 'post',
    data,
  })
}
// 首页-聚水潭 折线图
export function getInformationJstLineChart(data) {
  return request({
    url: '/information/jstLineChart',
    method: 'post',
    data,
  })
}
// 首页-聚水潭 头部卡片
export function getInformationJstList(data) {
  return request({
    url: '/information/jstList',
    method: 'post',
    data,
  })
}
// 首页-仓库预警分析
// 仓库预警分析 - 头部卡片
export function getWarehouseAnalysisHeadData(data) {
  return request({
    url: '/warehouseAnalysis/headData',
    method: 'post',
    data,
  })
}
// 仓库预警分析 - 欠货订单明细
export function getWarehouseAnalysisList(data) {
  return request({
    url: '/warehouseAnalysis/list',
    method: 'post',
    data,
  })
}
// 仓库预警分析 - 欠货客户排行
export function getWarehouseAnalysisCustomerRank(data) {
  return request({
    url: '/warehouseAnalysis/customerRank',
    method: 'post',
    data,
  })
}
// 仓库预警分析 - 欠货商品排行
export function getWarehouseAnalysisGoodsRank(data) {
  return request({
    url: '/warehouseAnalysis/goodsRank',
    method: 'post',
    data,
  })
}
// 首页 -首页
// 首页 - 头部数据
export function getHomePageList(data) {
  return request({
    url: '/homePage/list',
    method: 'post',
    data,
  })
}
// 首页 - 图表数据
export function getHomeReportForms(data) {
  return request({
    url: '/homePage/homeReportForms',
    method: 'post',
    data,
  })
}
// 首页- 会员
export function getHomeLatestCustomer(data) {
  return request({
    url: '/homePage/latestCustomer',
    method: 'post',
    data,
  })
}
// 首页- 订单
export function getHomeLatestOrder(data) {
  return request({
    url: '/homePage/latestOrder',
    method: 'post',
    data,
  })
}
// 首页- 右侧数据
export function getHomeRightData(data) {
  return request({
    url: '/homePage/rightData',
    method: 'post',
    data,
  })
}
// 研发模块接口
// 研发 - 商品企划
// 商品企划列表
export function getPlanList(data) {
  return request({
    url: '/research/planList',
    method: 'post',
    data,
  })
}
// 商品企划详情
export function getPlanDetails(data) {
  return request({
    url: '/research/planDetails',
    method: 'post',
    data,
  })
}
// 研发 - 成本分析
// 成本分析 - 款式分析
export function getCategoryCostAnalysis(data) {
  return request({
    url: '/research/categoryCostAnalysis',
    method: 'post',
    data,
  })
}
// 成本分析 - 波段分析
export function getBandCostAnalysis(data) {
  return request({
    url: '/research/bandCostAnalysis',
    method: 'post',
    data,
  })
}
// 成本分析 - 岗位分析
export function getPositionCostAnalysis(data) {
  return request({
    url: '/research/positionCostAnalysis',
    method: 'post',
    data,
  })
}
//  研发 -研发进度
export function getPlannedList(data) {
  return request({
    url: '/research/researchPace',
    method: 'post',
    data,
  })
}
// 积分管理 - 积分商品
// 积分商品 - 积分商品管理列表
export function getIntegralGoodsList(data) {
  return request({
    url: '/research/integralGoodsList',
    method: 'post',
    data,
  })
}
// 积分商品 - 积分商品管理新增
export function editIntegralGoodsSave(data) {
  return request({
    url: '/research/integralGoodsSave',
    method: 'post',
    data,
  })
}
// 积分商品 - 积分商品管理删除
export function delIntegralGoodsDel(data) {
  return request({
    url: '/research/integralGoodsDel',
    method: 'post',
    data,
  })
}
// 积分管理 - 积分订单
// 积分订单-积分订单管理列表
export function getIntegralOrderList(data) {
  return request({
    url: '/research/integralOrderList',
    method: 'post',
    data,
  })
}
// 积分订单-积分订单核销
export function editIntegralOrderVerification(data) {
  return request({
    url: '/research/integralOrderVerification',
    method: 'post',
    data,
  })
}
// 积分管理 - 员工积分记录
export function getEmployeeIntegralList(data) {
  return request({
    url: '/research/EmployeeIntegralList',
    method: 'post',
    data,
  })
}
// 积分管理 - 员工积分排行
export function getEmployeeIntegralRank(data) {
  return request({
    url: '/research/EmployeeIntegralRank',
    method: 'post',
    data,
  })
}
// 积分管理 - 积分规则列表
export function getIntegralRule(data) {
  return request({
    url: '/research/IntegralRule',
    method: 'post',
    data,
  })
}
// 积分管理 - 积分规则保存
export function editIntegralRuleSave(data) {
  return request({
    url: '/research/IntegralRuleSave',
    method: 'post',
    data,
  })
}
// 研发 - 员工价值
export function getEmployeeCostAnalysis(data) {
  return request({
    url: '/research/employeeCostAnalysis',
    method: 'post',
    data,
  })
}
// 供应链模块接口
// 供应链 - 供应商管理
// 供应商列表
export function getSupplierList(data) {
  return request({
    url: '/supplier/supplierList',
    method: 'post',
    data,
  })
}
// 供应商详情
export function getSupplierEditDetail(data) {
  return request({
    url: '/supplier/supplierEditDetail',
    method: 'post',
    data,
  })
}
// 供应商 tab 详情
export function editSupplierDetail(data) {
  return request({
    url: '/supplier/supplierDetail',
    method: 'post',
    data,
  })
}
// 供应商新增编辑
export function editSupplierSave(data) {
  return request({
    url: '/supplier/supplierSave',
    method: 'post',
    data,
  })
}
// 供应链 - 供应商分析
export function getDissectList(data) {
  return request({
    url: '/supplier/dissectList',
    method: 'post',
    data,
  })
}
// 供应链 - 成品采购订单
// 成品采购订单列表
export function getFinishList(data) {
  return request({
    url: '/supplier/finishList',
    method: 'post',
    data,
  })
}
// 成品采购订单列表tab
export function getFinishGetCount(data) {
  return request({
    url: '/supplier/finishGetCount',
    method: 'post',
    data,
  })
}
// 成品采购订单 tab 详情
export function getFinishDetail(data) {
  return request({
    url: '/supplier/finishDetail',
    method: 'post',
    data,
  })
}
// 成品采购订单作废
export function editFinishCancellation(data) {
  return request({
    url: '/supplier/finishCancellation',
    method: 'post',
    data,
  })
}
// 供应链 -物料采购订单
//物料采购订单列表
export function getPurchaseList(data) {
  return request({
    url: '/supplier/purchaseList',
    method: 'post',
    data,
  })
}
// 物料采购订单列表tab
export function getpurchaseGetCount(data) {
  return request({
    url: '/supplier/purchaseGetCount',
    method: 'post',
    data,
  })
}
// 物料采购订单 tab 详情
export function getPurchaseDetail(data) {
  return request({
    url: '/supplier/purchaseDetail',
    method: 'post',
    data,
  })
}
// 物料采购订单作废
export function editPurchaseCancellation(data) {
  return request({
    url: '/supplier/purchaseCancellation',
    method: 'post',
    data,
  })
}
// 供应链 - 成品采购统计
// 成品采购统计 - 图表
export function getFinishCountList(data) {
  return request({
    url: '/supplier/finishCountList',
    method: 'post',
    data,
  })
}
// 成品采购统计 - 排行
export function getFinishCountRank(data) {
  return request({
    url: '/supplier/finishCountRank',
    method: 'post',
    data,
  })
}
// 成品采购统计 - 详情
export function getFinishGoodDetail(data) {
  return request({
    url: '/supplier/finishGoodDetail',
    method: 'post',
    data,
  })
}
// 供应链 - 物料采购统计
// 物料采购统计 - 图表
export function getMaterialCountListt(data) {
  return request({
    url: '/supplier/materialCountList',
    method: 'post',
    data,
  })
}
// 物料采购统计 - 排行
export function getMaterialCountRank(data) {
  return request({
    url: '/supplier/materialCountRank',
    method: 'post',
    data,
  })
}
// 物料采购统计 - 详情
export function getMaterialMaterialDetail(data) {
  return request({
    url: '/supplier/materialMaterialDetail',
    method: 'post',
    data,
  })
}
// 商品模块接口
// 商品 - 商品管理
// 商品管理列表
export function getGoodList(data) {
  return request({
    url: '/goods/goodList',
    method: 'post',
    data,
  })
}
// 商品管理列表 tab
export function getGoodTabTotal(data) {
  return request({
    url: '/goods/goodTabTotal',
    method: 'post',
    data,
  })
}
// 商品管理列表 停售 在售 批量停售 批量在售
export function editGoodBatchLower(data) {
  return request({
    url: '/goods/goodBatchLower',
    method: 'post',
    data,
  })
}
// 商品管理列表设置推荐
export function editChangeRecommend(data) {
  return request({
    url: '/goods/changeRecommend',
    method: 'post',
    data,
  })
}
// 商品管理 详情tab 数据
export function getGoodTotalDetails(data) {
  return request({
    url: '/goods/goodTotalDetails',
    method: 'post',
    data,
  })
}
// 商品管理 详情tab 切换
export function getGoodOrderDetails(data) {
  return request({
    url: '/goods/goodOrderDetails',
    method: 'post',
    data,
  })
}
// 商品管理 详情
export function getGoodBasicsDetails(data) {
  return request({
    url: '/goods/goodBasicsDetails',
    method: 'post',
    data,
  })
}
// 商品管理 新增编辑
export function editGoodSave(data) {
  return request({
    url: '/goods/goodSave',
    method: 'post',
    data,
  })
}
// 商品管理导出
export function getGoodsExport(data) {
  return request({
    url: '/goods/export',
    method: 'post',
    data,
  })
}
// 商品管理同步聚水潭
export function saveGoodsSyncJuShuiTan(data) {
  return request({
    url: '/goods/goodsSyncJuShuiTan',
    method: 'post',
    data,
  })
}
// 商品 - 商品分类
//商品分类 父级 列表
export function getCategoryMainList(data) {
  return request({
    url: '/goods/categoryMainList',
    method: 'post',
    data,
  })
}
//商品分类 父级 新增编辑
export function editCategoryMainSave(data) {
  return request({
    url: '/goods/categoryMainSave',
    method: 'post',
    data,
  })
}
//商品分类 父级 删除
export function delCategoryMainDel(data) {
  return request({
    url: '/goods/categoryMainDel',
    method: 'post',
    data,
  })
}
//商品分类 子级 列表
export function getCategorySonList(data) {
  return request({
    url: '/goods/categorySonList',
    method: 'post',
    data,
  })
}
//商品分类 子级 新增编辑
export function editCategorySonSave(data) {
  return request({
    url: '/goods/categorySonSave',
    method: 'post',
    data,
  })
}
//商品分类 子级 删除
export function delCategorySonDel(data) {
  return request({
    url: '/goods/categorySonDel',
    method: 'post',
    data,
  })
}
// 商品分类同步到聚水潭
export function getCategoryUpload(data) {
  return request({
    url: '/goods/category/jstUpload',
    method: 'post',
    data,
  })
}
// 订单模块接口
// 订单 -订单列表
export function getOrderList(data) {
  return request({
    url: '/order/List',
    method: 'post',
    data,
  })
}
// 订单 -订单列表tab
export function getOrderCount(data) {
  return request({
    url: '/order/getOrderCount',
    method: 'post',
    data,
  })
}
// 订单 -订单列表详情 tab 切换
export function getOrderDetail(data) {
  return request({
    url: '/order/Detail',
    method: 'post',
    data,
  })
}
// 订单 -订单列表详情 tab发货记录 详情
export function getDeliveryOrderSpec(data) {
  return request({
    url: '/order/getDeliveryOrderSpec',
    method: 'post',
    data,
  })
}
// 订单 -订单列表详情 tab操作记录 详情
export function getModifySpec(data) {
  return request({
    url: '/order/getModifySpec',
    method: 'post',
    data,
  })
}
// 订单 - 客户发货列表
// 客户发货列表
export function getCustomerDeliveryOrderList(data) {
  return request({
    url: '/customerDeliveryOrder/list',
    method: 'post',
    data,
  })
}
// 客户发货列表导出
export function getCustomerDeliveryOrderExport(data) {
  return request({
    url: '/customerDeliveryOrder/export',
    method: 'post',
    data,
  })
}
// 订单 - 退货订单列表
//退货订单列表
export function getReturnOrderList(data) {
  return request({
    url: '/returnOrder/List',
    method: 'post',
    data,
  })
}
// 订单 - 发货统计列表
// 发货统计列表
export function getDeliveryStatisticsList(data) {
  return request({
    url: '/order/DeliveryStatisticsList',
    method: 'post',
    data,
  })
}
// 订单 - 发货统计列表
// 发货统计列表导出
export function getDeliveryStatisticsExport(data) {
  return request({
    url: '/order/DeliveryStatisticsExport',
    method: 'post',
    data,
  })
}
// 客户模块接口
// 客户 - 客户管理
// 客户管理 详情
export function giteCustomerDetail(data) {
  return request({
    url: '/customer/customerDetail',
    method: 'post',
    data,
  })
}
// 客户管理 新增编辑
export function editCustomerSave(data) {
  return request({
    url: '/customer/Save',
    method: 'post',
    data,
  })
}
// 客户管理 详情 tab切换
export function getCustomerInfoList(data) {
  return request({
    url: '/customer/infoList',
    method: 'post',
    data,
  })
}
// 客户管理 列表
export function getCustomerList(data) {
  return request({
    url: '/customer/List',
    method: 'post',
    data,
  })
}
// 客户管理导出
export function getCustomerExport(data) {
  return request({
    url: '/customer/export',
    method: 'post',
    data,
  })
}
// 客户管理  - 客户对账单导出
export function getCustomerExportBill(data) {
  return request({
    url: '/customer/exportBill',
    method: 'post',
    data,
  })
}
// 客户管理 - 新增客户保证金
export function addCustomerEarnest(data) {
  return request({
    url: '/customerEarnest/add',
    method: 'post',
    data,
  })
}
// 客户管理 - 获取客户保证金列表
export function getCustomerEarnestList(data) {
  return request({
    url: '/customerEarnest/getList',
    method: 'post',
    data,
  })
}
// 客户 - 客户等级
// 客户等级 - 列表
export function getGradeList(data) {
  return request({
    url: '/customer/gradeList',
    method: 'post',
    data,
  })
}
// 客户等级 - 新增编辑
export function editGradeList(data) {
  return request({
    url: '/customer/gradeSave',
    method: 'post',
    data,
  })
}
// 客户等级 - 删除
export function delGradeList(data) {
  return request({
    url: '/customer/gradeDel',
    method: 'post',
    data,
  })
}
// 客户等级 - 详情
export function getInfoGradeList(data) {
  return request({
    url: '/customer/gradeInfo',
    method: 'post',
    data,
  })
}
// 客户 - 客户分类
// 客户等级 - 列表
export function getCustomer(data) {
  return request({
    url: '/customer/typeList',
    method: 'post',
    data,
  })
}
// 客户等级 - 新增编辑
export function editCustomer(data) {
  return request({
    url: '/customer/typeSave',
    method: 'post',
    data,
  })
}
// 客户等级 - 删除
export function delCustomer(data) {
  return request({
    url: '/customer/typeDel',
    method: 'post',
    data,
  })
}
// 客户 - 客户标签
// 客户标签 - 父级 列表
export function getTagGroupList(data) {
  return request({
    url: '/customer/getTagGroupList',
    method: 'post',
    data,
  })
}
// 客户标签 - 子级 列表
export function getTagList(data) {
  return request({
    url: '/customer/getTagList',
    method: 'post',
    data,
  })
}
// 客户标签 - 子级 删除
export function delCorpTag(data) {
  return request({
    url: '/customer/delCorpTag',
    method: 'post',
    data,
  })
}
// 客户标签 - 父级 子级 新增
export function addCorpTag(data) {
  return request({
    url: '/customer/addCorpTag',
    method: 'post',
    data,
  })
}
// 客户标签 - 父级 子级 编辑
export function editCorpTag(data) {
  return request({
    url: '/customer/editCorpTag',
    method: 'post',
    data,
  })
}
// 客户标签 - 同步
export function addCorpTagSync(data) {
  return request({
    url: '/customer/corpTagSync',
    method: 'post',
    data,
  })
}
// 客户 - 客户等级申请
// 客户等级申请 - 列表
export function getApplyList(data) {
  return request({
    url: '/customerLevel/applyList',
    method: 'post',
    data,
  })
}
// 客户等级申请 - 同意
export function editApplyAgree(data) {
  return request({
    url: '/customerLevel/applyAgree',
    method: 'post',
    data,
  })
}
// 客户等级申请 - 拒绝
export function editApplyDisagree(data) {
  return request({
    url: '/customerLevel/applyDisagree',
    method: 'post',
    data,
  })
}
// 客户 - 客户补货申请
// 客户补货申请 - 操作
export function getCustomerApplyAgree(data) {
  return request({
    url: '/customerReplenishment/applyAgree',
    method: 'post',
    data,
  })
}
// 客户补货申请 - 列表
export function getCustomerApplyList(data) {
  return request({
    url: '/customerReplenishment/applyList',
    method: 'post',
    data,
  })
}
// 客户 - 企微客户列表
// 企微客户列表 - 企业微信同步客户
export function getExternalSyncExternal(data) {
  return request({
    url: '/external/syncExternal',
    method: 'post',
    data,
  })
}
// 企微客户列表 - 企微客户客户跟进
export function getFollowList(data) {
  return request({
    url: '/externalFollow/getList',
    method: 'post',
    data,
  })
}
// 企微客户列表 - 企微客户列表
export function getExternalList(data) {
  return request({
    url: '/external/getList',
    method: 'post',
    data,
  })
}
// 企微客户列表 - 打标签
export function addTagToExternal(data) {
  return request({
    url: '/customer/addTagToExternal',
    method: 'post',
    data,
  })
}
// 企微客户列表 - 客户跟进 - 获取所有客户标签
export function getAllTag(data) {
  return request({
    url: '/customer/getAllTag',
    method: 'post',
    data,
  })
}
// 数据模块接口
//数据 - 销售统计
// 销售统计 - 折线图
export function getOrderReportForms(data) {
  return request({
    url: '/information/orderReportForms',
    method: 'post',
    data,
  })
}
// 销售统计 - 头部卡片
export function getInformationOrderList(data) {
  return request({
    url: '/information/orderList',
    method: 'post',
    data,
  })
}
// 数据 - 库存统计
// 库存统计 - 头部卡片
export function getStockStatistics(data) {
  return request({
    url: '/goods/stockStatistics',
    method: 'post',
    data,
  })
}
// 库存统计 - 饼图数据
export function getStockCircular(data) {
  return request({
    url: '/goods/stockCircular',
    method: 'post',
    data,
  })
}
// 库存统计 - 排行列表
export function getStockRank(data) {
  return request({
    url: '/goods/stockRank',
    method: 'post',
    data,
  })
}
// 库存统计 - 饼图数据 - 子级
export function getStockCircularSonCate(data) {
  return request({
    url: '/goods/circularSonCate',
    method: 'post',
    data,
  })
}
//数据 -  商品分析
// 商品分析 - 头部卡片
export function getGoodsList(data) {
  return request({
    url: '/information/goodsList',
    method: 'post',
    data,
  })
}
// 商品分析 - 图表
export function getGoodsReportForms(data) {
  return request({
    url: '/information/goodsReportForms',
    method: 'post',
    data,
  })
}
// 商品分析 - 排行列表
export function getGoodsRank(data) {
  return request({
    url: '/information/goodsRank',
    method: 'post',
    data,
  })
}
// 商品分析 单品分析
export function getGoodsDetailAnalysis(data) {
  return request({
    url: '/information/goodsDetailAnalysis',
    method: 'post',
    data,
  })
}
//数据- 客户分析
//客户分析- 图表
export function getCustomerReportForms(data) {
  return request({
    url: '/information/customerReportForms',
    method: 'post',
    data,
  })
}
//客户分析- 地图分布
export function getCustomerArea(data) {
  return request({
    url: '/information/getCustomerArea',
    method: 'post',
    data,
  })
}
//客户分析- 饼图等级
export function getCustomerLevel(data) {
  return request({
    url: '/information/getCustomerLevel',
    method: 'post',
    data,
  })
}
//客户分析- 头部卡片 和客户RFM 分析
export function getInformationCustomerList(data) {
  return request({
    url: '/information/customerList',
    method: 'post',
    data,
  })
}
// 客户分析 客户排行导出
export function getHotStyleAnalysis(data) {
  return request({
    url: '/information/hotStyleAnalysis',
    method: 'post',
    data,
  })
}
// 客户分析 客户排行
export function getHotStyleAnalysisExport(data) {
  return request({
    url: '/information/hotStyleAnalysisExport',
    method: 'post',
    data,
  })
}
// 数据-交易分析
// 交易分析 - 卡片数据
export function getTradeList(data) {
  return request({
    url: '/information/TradeList',
    method: 'post',
    data,
  })
}
// 交易分析 - 图表数据
export function getTradeBasic(data) {
  return request({
    url: '/information/TradeBasic',
    method: 'post',
    data,
  })
}
// 数据 - 销售目标
// 销售目标 - 头部卡片
export function getInformationHeadData(data) {
  return request({
    url: '/information/headData',
    method: 'post',
    data,
  })
}
// 销售目标 - 客户销售排行
export function getInformationCustomerSaleRank(data) {
  return request({
    url: '/information/customerSaleRank',
    method: 'post',
    data,
  })
}
// 销售目标 - 客户回款排行
export function getInformationCustomerCollectionRank(data) {
  return request({
    url: '/information/customerCollectionRank',
    method: 'post',
    data,
  })
}
// 销售目标 - 回款率
export function getInformationCollectionRatio(data) {
  return request({
    url: '/information/collectionRatio',
    method: 'post',
    data,
  })
}
// 销售目标 - 编辑销售目标
export function editSaveSaleTarget(data) {
  return request({
    url: '/information/saveSaleTarget',
    method: 'post',
    data,
  })
}
// 销售目标 - 获取销售目标详情
export function editDetailsSaleTarget(data) {
  return request({
    url: '/information/detailsSaleTarget',
    method: 'post',
    data,
  })
}
// 销售目标 - 获取销售目标完成数据
export function getCompleteSaleTarget(data) {
  return request({
    url: '/information/completeSaleTarget',
    method: 'post',
    data,
  })
}
// 销售目标 - 折线图
export function getlineChartSaleTarget(data) {
  return request({
    url: '/information/lineChartSaleTarget',
    method: 'post',
    data,
  })
}
// 数据 - 财务分析
// 财务分析 -今日支出项
export function getTodayExpenditureList(data) {
  return request({
    url: '/information/todayExpenditure',
    method: 'post',
    data,
  })
}
// 财务分析 -今日收款项
export function getTodayCollectionList(data) {
  return request({
    url: '/information/todayCollection',
    method: 'post',
    data,
  })
}
// 财务分析 -今日营业额
export function getTodayTurnoverList(data) {
  return request({
    url: '/information/todayTurnover',
    method: 'post',
    data,
  })
}
// 财务分析 -业务收入
export function getBusinessIncomeList(data) {
  return request({
    url: '/information/businessIncome',
    method: 'post',
    data,
  })
}
// 财务分析 -卡片数据
export function getFinanceList(data) {
  return request({
    url: '/information/financeList',
    method: 'post',
    data,
  })
}
// 财务分析 -费用支出 父类
export function getExpensesList(data) {
  return request({
    url: '/information/expenses',
    method: 'post',
    data,
  })
}
// 财务分析 -费用支出 子类
export function getexpensesSonList(data) {
  return request({
    url: '/information/expensesSon',
    method: 'post',
    data,
  })
}
// 财务模块接口
// 财务-客户收款单
// 客户收款单列表
export function getCustomerVoucherList(data) {
  return request({
    url: '/finance/customerVoucherList',
    method: 'post',
    data,
  })
}
// 客户收款单导出
export function getFinanceCustomerVoucherExport(data) {
  return request({
    url: '/finance/customerVoucherExport',
    method: 'post',
    data,
  })
}
// 财务-供应商收款单
// 供应商收款单列表
export function getSupplierVoucherList(data) {
  return request({
    url: '/finance/supplierVoucherList',
    method: 'post',
    data,
  })
}
// 财务-日常收支
// 日常收支(收支分类下拉框)
export function getCategoryList(data) {
  return request({
    url: '/finance/categoryList',
    method: 'post',
    data,
  })
}
// 日常收支 - 列表
export function getBillList(data) {
  return request({
    url: '/finance/billList',
    method: 'post',
    data,
  })
}
// 日常收支 -新增编辑时界面 收支类别下拉框
export function getFinanceCategory(data) {
  return request({
    url: '/finance/getFinanceCategory',
    method: 'post',
    data,
  })
}
// 日常收支 -新增编辑时界面 结算账户下拉框
export function getDefaultCorporateAccount(data) {
  return request({
    url: '/finance/getDefaultCorporateAccount',
    method: 'post',
    data,
  })
}
// 日常收支 - 新增编辑保存
export function editBillSave(data) {
  return request({
    url: '/finance/billSave',
    method: 'post',
    data,
  })
}
// 日常收支 - 作废
export function delBillOut(data) {
  return request({
    url: '/finance/billOut',
    method: 'post',
    data,
  })
}
// 财务-会计科目
// 会计科目 - 父级 子级列表
export function getAccountList(data) {
  return request({
    url: '/finance/accountList',
    method: 'post',
    data,
  })
}
// 会计科目 - 父级 子级新增编辑
export function editAccountSave(data) {
  return request({
    url: '/finance/accountSave',
    method: 'post',
    data,
  })
}
// 会计科目 - 父级 子级删除
export function delAccountDel(data) {
  return request({
    url: '/finance/accountDel',
    method: 'post',
    data,
  })
}
// 财务-收支分类
// 收支分类 - 父级 子级列表
export function getFinanceAccountList(data) {
  return request({
    url: '/finance/getFinanceAccount',
    method: 'post',
    data,
  })
}
// 收支分类 - 父级 子级保存
export function editCategorySave(data) {
  return request({
    url: '/finance/categorySave',
    method: 'post',
    data,
  })
}
// 收支分类 - 父级 子级删除
export function delCategoryDel(data) {
  return request({
    url: '/finance/categoryDel',
    method: 'post',
    data,
  })
}
// 财务-结算账户
// 结算账户 - 列表
export function getCorporateAccountList(data) {
  return request({
    url: '/finance/corporateAccountList',
    method: 'post',
    data,
  })
}
// 结算账户 - 新增编辑
export function editCorporateAccountSavee(data) {
  return request({
    url: '/finance/corporateAccountSave',
    method: 'post',
    data,
  })
}
// 结算账户 - 删除
export function delCorporateAccountDel(data) {
  return request({
    url: '/finance/corporateAccountDel',
    method: 'post',
    data,
  })
}
// 档案模块接口
// 档案-品牌管理
// 品牌管理 - 删除
export function delBrandDel(data) {
  return request({
    url: '/archive/brandDel',
    method: 'post',
    data,
  })
}
// 品牌管理 - 新增编辑
export function addBrandSave(data) {
  return request({
    url: '/archive/brandSave',
    method: 'post',
    data,
  })
}
// 品牌管理 - 列表
export function getBrandList(data) {
  return request({
    url: '/archive/brandList',
    method: 'post',
    data,
  })
}
// 物料管理
export function getMaterialInfoList(data) {
  return request({
    url: '/archive/materialInfoList',
    method: 'post',
    data,
  })
}
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
// 设置模块接口
// 设置-聚水潭店铺
// 同步聚水潭店铺
export function jstShopSync(data) {
  return request({
    url: '/setting/jstShopSync',
    method: 'post',
    data,
  })
}
// 获取聚水潭店铺
export function getjstShopList(data) {
  return request({
    url: '/setting/jstShopList',
    method: 'post',
    data,
  })
}
// 商城模块
// 商城 - 商品管理
// 商品管理 - 商品详情编辑
export function editGoodsDetailEdit(data) {
  return request({
    url: '/goods/goodsDetailEdit',
    method: 'post',
    data,
  })
}
// 商品管理 新商城获取tab栏商品总数
export function getShopGoodTabTotal(data) {
  return request({
    url: '/goods/shopGoodTabTotal',
    method: 'post',
    data,
  })
}
// 商品管理 新商城商品上下架
export function editChangeIsShop(data) {
  return request({
    url: '/goods/changeIsShop',
    method: 'post',
    data,
  })
}
// 商品管理 商品素材保存
export function editSourceMaterialSave(data) {
  return request({
    url: '/goods/sourceMaterialSave',
    method: 'post',
    data,
  })
}
// 商城 - 商品分类
// 商品分类 - 编辑
export function editShopCateGoryEdit(data) {
  return request({
    url: '/goods/shopCateGoryEdit',
    method: 'post',
    data,
  })
}
// 商品分类 - 批量隐藏和显示
export function editBatchDisplayCateGory(data) {
  return request({
    url: '/goods/batchDisplayCateGory',
    method: 'post',
    data,
  })
}
// 商品分类 - 树状返回
export function getShopGoodsCategoryTree(data) {
  return request({
    url: '/goods/shopGoodsCategoryTree',
    method: 'post',
    data,
  })
}
// 商城 - 商城配置
// 商城配置 - 获取小程序配置信息
export function getShopConfigWeChatAppletDetail(data) {
  return request({
    url: '/admin/shopConfig/WeChatAppletDetail',
    method: 'post',
    data,
  })
}
// 商城配置 - 获取小程序支付配置信息
export function getShopConfigWeChatPayDetail(data) {
  return request({
    url: '/admin/shopConfig/WeChatPayDetail',
    method: 'post',
    data,
  })
}
// 商城配置 - 小程序配置信息保存
export function editShopConfigWeChatApplet(data) {
  return request({
    url: '/admin/shopConfig/WeChatApplet',
    method: 'post',
    data,
  })
}
// 商城配置 - 小程序支付配置信息保存
export function editShopConfigWeChatPay(data) {
  return request({
    url: '/admin/shopConfig/WeChatPay',
    method: 'post',
    data,
  })
}
// 商城配置 - 获取基础配置详情
export function getBaseConfigDetail(data) {
  return request({
    url: '/admin/baseConfigDetail',
    method: 'post',
    data,
  })
}
// 商城配置 - 获取注册协议详情
export function getRegisterDealDetail(data) {
  return request({
    url: '/admin/registerDealDetail',
    method: 'post',
    data,
  })
}
// 商城配置 - 基础配置详情保存
export function editBaseConfigSave(data) {
  return request({
    url: '/admin/baseConfigSave',
    method: 'post',
    data,
  })
}
// 商城配置 - 注册协议详情保存
export function editRegisterDealSave(data) {
  return request({
    url: '/admin/registerDealSave',
    method: 'post',
    data,
  })
}
// 商城 - 商品分组
// 商品分组 - 列表
export function getGoodsGroupList(data) {
  return request({
    url: '/goods/goodsGroupList',
    method: 'post',
    data,
  })
}
// 商品分组 - 编辑
export function editGoodsGroupSave(data) {
  return request({
    url: '/goods/goodsGroupSave',
    method: 'post',
    data,
  })
}
// 商品分组 - 删除
export function delGoodsGroupDel(data) {
  return request({
    url: '/goods/goodsGroupDel',
    method: 'post',
    data,
  })
}
// 商品分组 - 新增商品到商品组
export function addGroupGoodsAdd(data) {
  return request({
    url: '/goods/groupGoodsAdd',
    method: 'post',
    data,
  })
}
// 商品分组 - 新增商品到商品组获取商品列表
export function getGoodsUnitList(data) {
  return request({
    url: '/goods/getGoodsList',
    method: 'post',
    data,
  })
}
// 商品分组 - 获取当前分组下的商品
export function getGoodsGroupDetail(data) {
  return request({
    url: '/goods/goodsGroupDetail',
    method: 'post',
    data,
  })
}
// 模板组件配置
export function getTemplateMenuDetail(data) {
  return request({
    url: '/admin/templateMenuDetail',
    method: 'post',
    data,
  })
}
export function getTemplateAssemblyInfo(data) {
  return request({
    url: '/admin/templateAssemblyInfo',
    method: 'post',
    data,
  })
}
export function editTemplateAssemblyLayout(data) {
  return request({
    url: '/admin/templateAssemblyLayout',
    method: 'post',
    data,
  })
}
// 商城 - 商城装修 - 页面设计
//模板复制
export function getTemplateCopy(data) {
  return request({
    url: '/admin/templateCopy',
    method: 'post',
    data,
  })
}
//模板列表
export function getTemplateList(data) {
  return request({
    url: '/admin/templateList',
    method: 'post',
    data,
  })
}
//模板删除
export function delTemplateDel(data) {
  return request({
    url: '/admin/templateDel',
    method: 'post',
    data,
  })
}
//模板保存
export function addTemplateSave(data) {
  return request({
    url: '/admin/templateSave',
    method: 'post',
    data,
  })
}
// 档案模块
// 档案 - 工艺管理
// 工艺管理 - 工艺列表
export function getCraftTypeList(data) {
  return request({
    url: '/archive/craftTypeList',
    method: 'post',
    data,
  })
}
// 工艺管理  - 编辑
export function editCraftTypeSave(data) {
  return request({
    url: '/archive/craftTypeSave',
    method: 'post',
    data,
  })
}
// 工艺管理 - 删除
export function delCraftTypeDel(data) {
  return request({
    url: '/archive/craftTypeDel',
    method: 'post',
    data,
  })
}
// 档案 - 工序管理
// 工序管理 - 工序列表
export function getProduceTypeList(data) {
  return request({
    url: '/archive/produceTypeList',
    method: 'post',
    data,
  })
}
// 工序管理 - 编辑
export function editProduceTypeSave(data) {
  return request({
    url: '/archive/produceTypeSave',
    method: 'post',
    data,
  })
}
// 工序管理 - 删除
export function delProduceTypeDel(data) {
  return request({
    url: '/archive/produceTypeDel',
    method: 'post',
    data,
  })
}
// 档案-文章管理
// 文章管理  - 列表
export function getArticleList(data) {
  return request({
    url: '/archive/articleList',
    method: 'post',
    data,
  })
}
// 文章管理  - 编辑
export function editArticleSave(data) {
  return request({
    url: '/archive/articleSave',
    method: 'post',
    data,
  })
}
// 文章管理  - 删除
export function delArticleDel(data) {
  return request({
    url: '/archive/articleDel',
    method: 'post',
    data,
  })
}
// 设置模块接口
// 设置 - 部门管理
// 部门管理 - 权限保存
export function editEmployeeRoleSave(data) {
  return request({
    url: '/employeePosition/employeeRoleSave',
    method: 'post',
    data,
  })
}
// 部门管理 - 部门列表
export function getEmployeePosition(data) {
  return request({
    url: '/employeePosition/List',
    method: 'post',
    data,
  })
}
// 部门管理 - 权限列表
export function getEmployeeRoleList(data) {
  return request({
    url: '/employeePosition/employeeRoleList',
    method: 'post',
    data,
  })
}
// 账户信息

export function getAccountDetail(data) {
  return request({
    url: '/admin/accountDetail',
    method: 'post',
    data,
  })
}
export function editAdminAccountSave(data) {
  return request({
    url: '/admin/accountSave',
    method: 'post',
    data,
  })
}
// 吊牌打印
export function getPrintSn(data) {
  return request({
    url: '/archive/printSn',
    method: 'post',
    data,
  })
}
export function getPrintList(data) {
  return request({
    url: '/archive/printList',
    method: 'post',
    data,
  })
}
export function getGoodBarcode(data) {
  return request({
    url: '/archive/getGoodBarcode',
    method: 'post',
    data,
  })
}
export function getStockPrint(data) {
  return request({
    url: '/archive/stockPrint',
    method: 'post',
    data,
  })
}
// 财务分析

export function getFinanceReportForms(data) {
  return request({
    url: '/information/financeReportForms',
    method: 'post',
    data,
  })
}
export function getFinanceCostCount(data) {
  return request({
    url: '/information/financeCostCount',
    method: 'post',
    data,
  })
}
export function getFinanceListd(data) {
  return request({
    url: '/information/financeList',
    method: 'post',
    data,
  })
}

// 看板

export function getBoardReportForms(data) {
  return request({
    url: '/homePage/boardReportForms',
    method: 'post',
    data,
  })
}
export function getCustomerRanch(data) {
  return request({
    url: '/homePage/customerRanch',
    method: 'post',
    data,
  })
}
export function getGoodsRanch(data) {
  return request({
    url: '/homePage/goodsRanch',
    method: 'post',
    data,
  })
}
export function getShipmentWarning(data) {
  return request({
    url: '/homePage/shipmentWarning',
    method: 'post',
    data,
  })
}
export function getCustomerSource(data) {
  return request({
    url: '/homePage/customerSource',
    method: 'post',
    data,
  })
}
export function getHomePageBoard(data) {
  return request({
    url: '/homePage/board',
    method: 'post',
    data,
  })
}
// 客户统计
export function getCountList(data) {
  return request({
    url: '/customer/countList',
    method: 'post',
    data,
  })
}

// 波段管理
export function getBandList(data) {
  return request({
    url: '/archive/bandList',
    method: 'post',
    data,
  })
}
export function editBandSave(data) {
  return request({
    url: '/archive/bandSave',
    method: 'post',
    data,
  })
}
export function delBandDel(data) {
  return request({
    url: '/archive/bandDel',
    method: 'post',
    data,
  })
}

// 门店列表
export function getStoreList(data) {
  return request({
    url: '/setting/storeList',
    method: 'post',
    data,
  })
}
export function editStoreSave(data) {
  return request({
    url: '/setting/storeSave',
    method: 'post',
    data,
  })
}
export function editChangeStatus(data) {
  return request({
    url: '/setting/changeStatus',
    method: 'post',
    data,
  })
}

// 商城配置
export function editShopConfig(data) {
  return request({
    url: '/setting/shopConfig',
    method: 'post',
    data,
  })
}
export function getShopConfigInfo(data) {
  return request({
    url: '/setting/shopConfigInfo',
    method: 'post',
    data,
  })
}
// 模块设置
export function editScrmConfig(data) {
  return request({
    url: '/setting/scrmConfig',
    method: 'post',
    data,
  })
}
export function editProduceConfig(data) {
  return request({
    url: '/setting/produceConfig',
    method: 'post',
    data,
  })
}
export function editWeComeConfig(data) {
  return request({
    url: '/setting/weComeConfig',
    method: 'post',
    data,
  })
}
export function getWeComeConfigInfo(data) {
  return request({
    url: '/setting/getWeComeConfigInfo',
    method: 'post',
    data,
  })
}
export function editDesignConfig(data) {
  return request({
    url: '/setting/designConfig',
    method: 'post',
    data,
  })
}
export function getDesignConfigInfo(data) {
  return request({
    url: '/setting/getDesignConfigInfo',
    method: 'post',
    data,
  })
}
export function editAgentErpConfig(data) {
  return request({
    url: '/setting/agentErpConfig',
    method: 'post',
    data,
  })
}
export function getAgentErpInfo(data) {
  return request({
    url: '/setting/getAgentErpInfo',
    method: 'post',
    data,
  })
}
export function editErpConfig(data) {
  return request({
    url: '/setting/erpConfig',
    method: 'post',
    data,
  })
}
export function getErpInfo(data) {
  return request({
    url: '/setting/getErpInfo',
    method: 'post',
    data,
  })
}
// 存储设置
export function editLocalStore(data) {
  return request({
    url: '/setting/localStore',
    method: 'post',
    data,
  })
}
export function editALiYunOss(data) {
  return request({
    url: '/setting/aLiYunOss',
    method: 'post',
    data,
  })
}
export function editTencentOss(data) {
  return request({
    url: '/setting/tencentOss',
    method: 'post',
    data,
  })
}
export function editQiNiuOss(data) {
  return request({
    url: '/setting/qiNiuOss',
    method: 'post',
    data,
  })
}
// 开放接口
export function gitJuShuiTanInfo(data) {
  return request({
    url: '/setting/juShuiTanInfo',
    method: 'post',
    data,
  })
}

export function editJuShuiTan(data) {
  return request({
    url: '/setting/juShuiTan',
    method: 'post',
    data,
  })
}
export function editWangDianTong(data) {
  return request({
    url: '/setting/wangDianTong',
    method: 'post',
    data,
  })
}
export function editBoJun(data) {
  return request({
    url: '/setting/boJun',
    method: 'post',
    data,
  })
}
export function editBaiSheng(data) {
  return request({
    url: '/setting/baiSheng',
    method: 'post',
    data,
  })
}
export function editZiRi(data) {
  return request({
    url: '/setting/ziRi',
    method: 'post',
    data,
  })
}
// 销售渠道
export function editWeChatOfficialAccounts(data) {
  return request({
    url: '/admin/weChatOfficialAccounts',
    method: 'post',
    data,
  })
}
export function editWeChatApplet(data) {
  return request({
    url: '/admin/WeChatApplet',
    method: 'post',
    data,
  })
}
export function editWechatVideo(data) {
  return request({
    url: '/admin/wechatVideo',
    method: 'post',
    data,
  })
}
export function editAliPay(data) {
  return request({
    url: '/admin/aliPay',
    method: 'post',
    data,
  })
}
export function editMoveApp(data) {
  return request({
    url: '/admin/moveApp',
    method: 'post',
    data,
  })
}
export function editQuickly(data) {
  return request({
    url: '/admin/quickly',
    method: 'post',
    data,
  })
}
export function editTopLine(data) {
  return request({
    url: '/admin/topLine',
    method: 'post',
    data,
  })
}
export function editTiktokShop(data) {
  return request({
    url: '/admin/tiktokShop',
    method: 'post',
    data,
  })
}
export function editLittleRedBook(data) {
  return request({
    url: '/admin/littleRedBook',
    method: 'post',
    data,
  })
}
// 日志列表
export function getLogList(data) {
  return request({
    url: '/admin/LogList',
    method: 'post',
    data,
  })
}
// 员工列表
export function getEmployeeList(data) {
  return request({
    url: '/employee/employeeList',
    method: 'post',
    data,
  })
}
export function editEmployeeSave(data) {
  return request({
    url: '/employee/employeeSave',
    method: 'post',
    data,
  })
}
export function delEmployeeSync(data) {
  return request({
    url: '/employee/employeeSync',
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
// 菜单管理
export function editButtonSave(data) {
  return request({
    url: '/menu/buttonSave',
    method: 'post',
    data,
  })
}
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

// 权限管理

export function addRoleGroupSave(data) {
  return request({
    url: '/admin/roleGroupSave',
    method: 'post',
    data,
  })
}
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
// export function getParentTag(data) {
//   return request({
//     url: '/customer/getParentTag',
//     method: 'post',
//     data,
//   })
// }
// export function getTagList(data) {
//   return request({
//     url: '/customer/tagList',
//     method: 'post',
//     data,
//   })
// }
// export function editTagSave(data) {
//   return request({
//     url: '/customer/tagSave',
//     method: 'post',
//     data,
//   })
// }
// export function delTagDel(data) {
//   return request({
//     url: '/customer/tagDel',
//     method: 'post',
//     data,
//   })
// }
