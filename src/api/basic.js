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
// 商品同步聚水潭
export function saveGoodsSyncJuShuiTan(data) {
  return request({
    url: '/goods/goodsSyncJuShuiTan',
    method: 'post',
    data,
  })
}
// 仓库预警分析
export function getWarehouseAnalysisHeadData(data) {
  return request({
    url: '/warehouseAnalysis/headData',
    method: 'post',
    data,
  })
}
export function getWarehouseAnalysisList(data) {
  return request({
    url: '/warehouseAnalysis/list',
    method: 'post',
    data,
  })
}
export function getWarehouseAnalysisCustomerRank(data) {
  return request({
    url: '/warehouseAnalysis/customerRank',
    method: 'post',
    data,
  })
}
export function getWarehouseAnalysisGoodsRank(data) {
  return request({
    url: '/warehouseAnalysis/goodsRank',
    method: 'post',
    data,
  })
}

// 客户分析 客户排行
export function getHotStyleAnalysis(data) {
  return request({
    url: '/information/hotStyleAnalysis',
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
// 客户保证金

export function addCustomerEarnest(data) {
  return request({
    url: '/customerEarnest/add',
    method: 'post',
    data,
  })
}
export function getCustomerEarnestList(data) {
  return request({
    url: '/customerEarnest/getList',
    method: 'post',
    data,
  })
}
// 商城商品详情编辑
export function editGoodsDetailEdit(data) {
  return request({
    url: '/goods/goodsDetailEdit',
    method: 'post',
    data,
  })
}
// 商城商品分类
export function editShopCateGoryEdit(data) {
  return request({
    url: '/goods/shopCateGoryEdit',
    method: 'post',
    data,
  })
}
export function editBatchDisplayCateGory(data) {
  return request({
    url: '/goods/batchDisplayCateGory',
    method: 'post',
    data,
  })
}
export function getShopGoodsCategoryTree(data) {
  return request({
    url: '/goods/shopGoodsCategoryTree',
    method: 'post',
    data,
  })
}
// 客户跟进
export function getFollowList(data) {
  return request({
    url: '/externalFollow/getList',
    method: 'post',
    data,
  })
}
// 企微客户
export function getExternalList(data) {
  return request({
    url: '/external/getList',
    method: 'post',
    data,
  })
}

// 工艺管理
export function getCraftTypeList(data) {
  return request({
    url: '/archive/craftTypeList',
    method: 'post',
    data,
  })
}
export function editCraftTypeSave(data) {
  return request({
    url: '/archive/craftTypeSave',
    method: 'post',
    data,
  })
}
export function delCraftTypeDel(data) {
  return request({
    url: '/archive/craftTypeDel',
    method: 'post',
    data,
  })
}
// 工序管理
export function getProduceTypeList(data) {
  return request({
    url: '/archive/produceTypeList',
    method: 'post',
    data,
  })
}
export function editProduceTypeSave(data) {
  return request({
    url: '/archive/produceTypeSave',
    method: 'post',
    data,
  })
}
export function delProduceTypeDel(data) {
  return request({
    url: '/archive/produceTypeDel',
    method: 'post',
    data,
  })
}
// 部门管理

export function editEmployeeRoleSave(data) {
  return request({
    url: '/employeePosition/employeeRoleSave',
    method: 'post',
    data,
  })
}
export function getEmployeePosition(data) {
  return request({
    url: '/employeePosition/List',
    method: 'post',
    data,
  })
}
export function getEmployeeRoleList(data) {
  return request({
    url: '/employeePosition/employeeRoleList',
    method: 'post',
    data,
  })
}
// 新商城配置

export function getShopConfigWeChatAppletDetail(data) {
  return request({
    url: '/admin/shopConfig/WeChatAppletDetail',
    method: 'post',
    data,
  })
}
export function getShopConfigWeChatPayDetail(data) {
  return request({
    url: '/admin/shopConfig/WeChatPayDetail',
    method: 'post',
    data,
  })
}
export function editShopConfigWeChatApplet(data) {
  return request({
    url: '/admin/shopConfig/WeChatApplet',
    method: 'post',
    data,
  })
}
export function editShopConfigWeChatPay(data) {
  return request({
    url: '/admin/shopConfig/WeChatPay',
    method: 'post',
    data,
  })
}
export function getBaseConfigDetail(data) {
  return request({
    url: '/admin/baseConfigDetail',
    method: 'post',
    data,
  })
}
export function getRegisterDealDetail(data) {
  return request({
    url: '/admin/registerDealDetail',
    method: 'post',
    data,
  })
}
export function editBaseConfigSave(data) {
  return request({
    url: '/admin/baseConfigSave',
    method: 'post',
    data,
  })
}
export function editRegisterDealSave(data) {
  return request({
    url: '/admin/registerDealSave',
    method: 'post',
    data,
  })
}
// 客户等级申请
export function getApplyList(data) {
  return request({
    url: '/customerLevel/applyList',
    method: 'post',
    data,
  })
}
export function editApplyAgree(data) {
  return request({
    url: '/customerLevel/applyAgree',
    method: 'post',
    data,
  })
}
export function editApplyDisagree(data) {
  return request({
    url: '/customerLevel/applyDisagree',
    method: 'post',
    data,
  })
}
// 文章列表
export function getArticleList(data) {
  return request({
    url: '/archive/articleList',
    method: 'post',
    data,
  })
}
export function editArticleSave(data) {
  return request({
    url: '/archive/articleSave',
    method: 'post',
    data,
  })
}
export function delArticleDel(data) {
  return request({
    url: '/archive/articleDel',
    method: 'post',
    data,
  })
}
// 商品分组
export function getGoodsGroupList(data) {
  return request({
    url: '/goods/goodsGroupList',
    method: 'post',
    data,
  })
}
export function editGoodsGroupSave(data) {
  return request({
    url: '/goods/goodsGroupSave',
    method: 'post',
    data,
  })
}
export function addGroupGoodsAdd(data) {
  return request({
    url: '/goods/groupGoodsAdd',
    method: 'post',
    data,
  })
}
export function delGoodsGroupDel(data) {
  return request({
    url: '/goods/goodsGroupDel',
    method: 'post',
    data,
  })
}
export function getGoodsUnitList(data) {
  return request({
    url: '/goods/getGoodsList',
    method: 'post',
    data,
  })
}
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
//模板管理
export function getTemplateCopy(data) {
  return request({
    url: '/admin/templateCopy',
    method: 'post',
    data,
  })
}
export function getTemplateList(data) {
  return request({
    url: '/admin/templateList',
    method: 'post',
    data,
  })
}
export function delTemplateDel(data) {
  return request({
    url: '/admin/templateDel',
    method: 'post',
    data,
  })
}

export function addTemplateSave(data) {
  return request({
    url: '/admin/templateSave',
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
// 首页
export function getHomePageList(data) {
  return request({
    url: '/homePage/list',
    method: 'post',
    data,
  })
}
export function getHomeReportForms(data) {
  return request({
    url: '/homePage/homeReportForms',
    method: 'post',
    data,
  })
}
export function getHomeLatestCustomer(data) {
  return request({
    url: '/homePage/latestCustomer',
    method: 'post',
    data,
  })
}
export function getHomeLatestOrder(data) {
  return request({
    url: '/homePage/latestOrder',
    method: 'post',
    data,
  })
}
export function getHomeRightData(data) {
  return request({
    url: '/homePage/rightData',
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
// 客户管理

export function giteCustomerDetail(data) {
  return request({
    url: '/customer/customerDetail',
    method: 'post',
    data,
  })
}
export function editCustomerSave(data) {
  return request({
    url: '/customer/Save',
    method: 'post',
    data,
  })
}
export function getCustomerInfoList(data) {
  return request({
    url: '/customer/infoList',
    method: 'post',
    data,
  })
}
export function getCustomerList(data) {
  return request({
    url: '/customer/List',
    method: 'post',
    data,
  })
}
// 研发进度
export function getPlannedList(data) {
  return request({
    url: '/research/researchPace',
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
// 员工价值
export function getCategoryCostAnalysis(data) {
  return request({
    url: '/research/categoryCostAnalysis',
    method: 'post',
    data,
  })
}
// 成本分析
export function getEmployeeCostAnalysis(data) {
  return request({
    url: '/research/employeeCostAnalysis',
    method: 'post',
    data,
  })
}
export function getBandCostAnalysis(data) {
  return request({
    url: '/research/bandCostAnalysis',
    method: 'post',
    data,
  })
}
export function getPositionCostAnalysis(data) {
  return request({
    url: '/research/positionCostAnalysis',
    method: 'post',
    data,
  })
}
// 商品企划
export function getPlanList(data) {
  return request({
    url: '/research/planList',
    method: 'post',
    data,
  })
}
export function getPlanDetails(data) {
  return request({
    url: '/research/planDetails',
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
// 交易分析
export function getTradeList(data) {
  return request({
    url: '/information/TradeList',
    method: 'post',
    data,
  })
}
// 交易概况
export function getTradeBasic(data) {
  return request({
    url: '/information/TradeBasic',
    method: 'post',
    data,
  })
}
// 商品分析
export function getGoodsList(data) {
  return request({
    url: '/information/goodsList',
    method: 'post',
    data,
  })
}
export function getGoodsReportForms(data) {
  return request({
    url: '/information/goodsReportForms',
    method: 'post',
    data,
  })
}

export function getGoodsRank(data) {
  return request({
    url: '/information/goodsRank',
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

export function getCustomerReportForms(data) {
  return request({
    url: '/information/customerReportForms',
    method: 'post',
    data,
  })
}
export function getCustomerArea(data) {
  return request({
    url: '/information/getCustomerArea',
    method: 'post',
    data,
  })
}
export function getCustomerLevel(data) {
  return request({
    url: '/information/getCustomerLevel',
    method: 'post',
    data,
  })
}
export function getInformationCustomerList(data) {
  return request({
    url: '/information/customerList',
    method: 'post',
    data,
  })
}
//订单分析

export function getOrderSourceAssay(data) {
  return request({
    url: '/information/orderSourceAssay',
    method: 'post',
    data,
  })
}
export function getOrderReportForms(data) {
  return request({
    url: '/information/orderReportForms',
    method: 'post',
    data,
  })
}
export function getInformationOrderList(data) {
  return request({
    url: '/information/orderList',
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

export function getDeliveryOrderSpec(data) {
  return request({
    url: '/order/getDeliveryOrderSpec',
    method: 'post',
    data,
  })
}
export function getModifySpec(data) {
  return request({
    url: '/order/getModifySpec',
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

//商品父分类
export function getGoodsCategoryTree(data) {
  return request({
    url: '/goods/goodsCategoryTree',
    method: 'post',
    data,
  })
}
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

export function getShopGoodTabTotal(data) {
  return request({
    url: '/goods/shopGoodTabTotal',
    method: 'post',
    data,
  })
}
export function editChangeRecommend(data) {
  return request({
    url: '/goods/changeRecommend',
    method: 'post',
    data,
  })
}
export function editChangeIsShop(data) {
  return request({
    url: '/goods/changeIsShop',
    method: 'post',
    data,
  })
}
export function editSourceMaterialSave(data) {
  return request({
    url: '/goods/sourceMaterialSave',
    method: 'post',
    data,
  })
}
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

export function getSupplierEditDetail(data) {
  return request({
    url: '/supplier/supplierEditDetail',
    method: 'post',
    data,
  })
}
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
export function editSupplierSave(data) {
  return request({
    url: '/supplier/supplierSave',
    method: 'post',
    data,
  })
}
// 成品采购订单
export function getFinishGetCount(data) {
  return request({
    url: '/supplier/finishGetCount',
    method: 'post',
    data,
  })
}
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
export function getpurchaseGetCount(data) {
  return request({
    url: '/supplier/purchaseGetCount',
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
// 客户补货申请

export function getCustomerApplyAgree(data) {
  return request({
    url: '/customerReplenishment/applyAgree',
    method: 'post',
    data,
  })
}
export function getCustomerApplyList(data) {
  return request({
    url: '/customerReplenishment/applyList',
    method: 'post',
    data,
  })
}
// 客户标签

export function addTagToExternal(data) {
  return request({
    url: '/customer/addTagToExternal',
    method: 'post',
    data,
  })
}
export function getAllTag(data) {
  return request({
    url: '/customer/getAllTag',
    method: 'post',
    data,
  })
}
export function delCorpTag(data) {
  return request({
    url: '/customer/delCorpTag',
    method: 'post',
    data,
  })
}
export function editCorpTag(data) {
  return request({
    url: '/customer/editCorpTag',
    method: 'post',
    data,
  })
}
export function getTagGroupList(data) {
  return request({
    url: '/customer/getTagGroupList',
    method: 'post',
    data,
  })
}
export function getTagList(data) {
  return request({
    url: '/customer/getTagList',
    method: 'post',
    data,
  })
}

export function addCorpTagSync(data) {
  return request({
    url: '/customer/corpTagSync',
    method: 'post',
    data,
  })
}
export function addCorpTag(data) {
  return request({
    url: '/customer/addCorpTag',
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
