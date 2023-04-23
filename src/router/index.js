/**
 * @description router全局配置，如有必要可分文件抽离，其中asyncRoutes只有在intelligence模式下才会用到，pro版只支持remixIcon图标，具体配置请查看vip群文档
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/vab/layouts'
import { publicPath, routerMode } from '@/config'

Vue.use(VueRouter)
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login'),
    meta: {
      hidden: true,
    },
  },
  {
    path: '/design',
    component: () => import('@/subview/design'),
    meta: {
      hidden: true,
    },
  },
]
export const asyncRoutes = [
  {
    path: '/',
    name: 'Root',
    component: Layout,
    meta: {
      title: '首页',
      icon: 'home-2-line',
      breadcrumbHidden: true,
    },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/subview/index/index'),
        meta: {
          title: '首页',
          noClosable: true,
          icon: 'archive-line',
        },
      },
      {
        path: 'monitoring',
        name: 'Monitoring',
        component: () => import('@/subview/index/monitoring'),
        meta: {
          title: '监控中心',
          noClosable: true,
          icon: 'archive-line',
        },
      },

      {
        path: 'board',
        name: 'Board',
        component: () => import('@/subview/index/board'),
        meta: {
          title: '仓库预警分析',
          icon: 'truck-line',
        },
      },
      {
        path: 'jststock',
        name: 'Jststock',
        component: () => import('@/subview/index/jststock'),
        meta: {
          title: '聚水潭库存统计',
          icon: 'archive-line',
        },
      },
      {
        path: 'presaleanalysis',
        name: 'Presaleanalysis',
        component: () => import('@/subview/index/presaleanalysis'),
        meta: {
          title: '大数据预售分析',
          icon: 'archive-line',
        },
      },
    ],
  },
  {
    path: '/research',
    name: 'Research',
    component: Layout,
    meta: {
      title: '研发',
      icon: 'bubble-chart-line',
      breadcrumbHidden: true,
    },
    children: [
      {
        path: 'progress',
        name: 'Progress',
        component: () => import('@/subview/research/progress'),
        meta: {
          title: '研发进度',
          icon: 'archive-line',
        },
      },
      {
        path: 'integral',
        name: 'Integral',
        meta: {
          title: '积分管理',
          icon: 'archive-line',
        },
        children: [
          {
            path: 'integralGoods',
            name: 'IntegralGoods',
            component: () => import('@/subview/research/integral/goods'),
            meta: {
              title: '积分商品管理',
            },
          },
          {
            path: 'integralOrder',
            name: 'IntegralOrder',
            component: () => import('@/subview/research/integral/order'),
            meta: {
              title: '积分订单管理',
            },
          },
          {
            path: 'integralRecord',
            name: 'IntegralRecord',
            component: () => import('@/subview/research/integral/record'),
            meta: {
              title: '员工积分记录',
            },
          },
          {
            path: 'integralRanking',
            name: 'IntegralRanking',
            component: () => import('@/subview/research/integral/ranking'),
            meta: {
              title: '员工积分排行',
            },
          },
          {
            path: 'integralRules',
            name: 'IntegralRules',
            component: () => import('@/subview/research/integral/rules'),
            meta: {
              title: '积分规则',
            },
          },
        ],
      },
      {
        path: 'employeeValue',
        name: 'EmployeeValue',
        component: () => import('@/subview/research/employeeValue'),
        meta: {
          title: '员工价值',
          icon: 'archive-line',
        },
      },
      {
        path: 'productPlanning',
        name: 'ProductPlanning',
        component: () => import('@/subview/research/productPlanning'),
        meta: {
          title: '商品企划',
          icon: 'archive-line',
        },
      },
      {
        path: 'costAnalysis',
        name: 'CostAnalysis',
        meta: {
          title: '成本分析',
          icon: 'archive-line',
        },
        children: [
          {
            path: 'costAnalysisStyle',
            name: 'CostAnalysisStyle',
            component: () => import('@/subview/research/costAnalysis/style'),
            meta: {
              title: '款式分析',
            },
          },
          {
            path: 'costAnalysisBand',
            name: 'CostAnalysisBand',
            component: () => import('@/subview/research/costAnalysis/band'),
            meta: {
              title: '波段分析',
            },
          },
          {
            path: 'costAnalysisJobs',
            name: 'CostAnalysisJobs',
            component: () => import('@/subview/research/costAnalysis/jobs'),
            meta: {
              title: '岗位分析',
            },
          },
        ],
      },
    ],
  },
  {
    path: '/supplier',
    name: 'Supplier',
    component: Layout,
    meta: {
      title: '供应商',
      icon: 'folder-user-line',
      breadcrumbHidden: true,
    },
    children: [
      {
        path: 'supplierManagement',
        name: 'SupplierManagement',
        component: () => import('@/subview/supplier/management'),
        meta: {
          title: '供应商管理',
          icon: 'user-search-line',
        },
      },
      {
        path: 'supplierCutbedsheet',
        name: 'SupplierCutbedsheet',
        component: () => import('@/subview/supplier/cutbedsheet'),
        meta: {
          title: '裁床单列表',
          icon: 'archive-line',
        },
      },
      {
        path: 'supplierWarehousereceipt',
        name: 'SupplierWarehousereceipt',
        component: () => import('@/subview/supplier/warehousereceipt'),
        meta: {
          title: '入库单列表',
          icon: 'archive-line',
        },
      },
      {
        path: 'supplierSupplyanalysis',
        name: 'SupplierSupplyanalysis',
        component: () => import('@/subview/supplier/supplyanalysis'),
        meta: {
          title: '供应链分析',
          icon: 'archive-line',
        },
      },
      {
        path: 'supplierSchedule',
        name: 'SupplierSchedule',
        component: () => import('@/subview/supplier/schedule'),
        meta: {
          title: '生产排期表',
          icon: 'archive-line',
        },
      },
    ],
  },
  {
    path: '/goods',
    name: 'Goods',
    component: Layout,
    meta: {
      title: '商品',
      icon: 'shopping-bag-3-line',
      breadcrumbHidden: true,
    },
    children: [
      {
        path: 'goodsManage',
        name: 'GoodsManage',
        component: () => import('@/subview/goods/manage'),
        meta: {
          title: '商品管理',
          icon: 'file-list-line',
        },
      },
      {
        path: 'goodsClassified',
        name: 'GoodsClassified',
        component: () => import('@/subview/goods/classified'),
        meta: {
          title: '商品分类',
          icon: 'archive-line',
        },
      },
      {
        path: 'goodsSpecification',
        name: 'GoodsSpecification',
        component: () => import('@/subview/goods/specification'),
        meta: {
          title: '商品规格',
          icon: 'file-list-line',
        },
      },
    ],
  },
  {
    path: '/order',
    name: 'Order',
    component: Layout,
    meta: {
      title: '订单',
      icon: 'shopping-cart-line',
      breadcrumbHidden: true,
    },
    children: [
      {
        path: 'orderList',
        name: 'OrderList',
        component: () => import('@/subview/order/list'),
        meta: {
          title: '订单列表',
          icon: 'file-list-line',
        },
      },
      {
        path: 'orderShippingStatistics',
        name: 'OrderShippingStatistics',
        component: () => import('@/subview/order/shippingstatistics'),
        meta: {
          title: '发货统计列表',
          icon: 'archive-line',
        },
      },
      {
        path: 'orderCustomerDelivery',
        name: 'OrderCustomerDelivery',
        component: () => import('@/subview/order/customerdelivery'),
        meta: {
          title: '客户发货列表',
          icon: 'archive-line',
        },
      },
      {
        path: 'orderReturnOrder',
        name: 'OrderReturnOrder',
        component: () => import('@/subview/order/returnorder'),
        meta: {
          title: '退货单列表',
          icon: 'archive-line',
        },
      },
      {
        path: 'orderPurchasesalestockr',
        name: 'OrderPurchasesalestockr',
        component: () => import('@/subview/order/purchasesalestock'),
        meta: {
          title: '进销存综合列表',
          icon: 'archive-line',
        },
      },
    ],
  },
  {
    path: '/customer',
    name: 'Customer',
    component: Layout,
    guard: ['Admin'],
    meta: {
      title: '客户',
      icon: 'user-line',
      breadcrumbHidden: true,
    },
    children: [
      {
        path: 'customerManage',
        name: 'CustomerManage',
        component: () => import('@/subview/customer/manage'),
        meta: {
          title: '客户管理',
          icon: 'user-search-line',
        },
      },
      {
        path: 'customerLevel',
        name: 'CustomerLevel',
        component: () => import('@/subview/customer/level'),
        meta: {
          title: '客户等级',
          icon: 'vip-crown-2-line',
        },
      },
      {
        path: 'customerClassify',
        name: 'CustomerClassify',
        component: () => import('@/subview/customer/classify'),
        meta: {
          title: '客户分类',
          icon: 'vip-diamond-line',
        },
      },
      {
        path: 'customerTags',
        name: 'CustomerTags',
        component: () => import('@/subview/customer/tags'),
        meta: {
          title: '客户标签',
          icon: 'user-star-line',
        },
      },
      {
        path: 'customerApplication',
        name: 'CustomerApplication',
        component: () => import('@/subview/customer/application'),
        meta: {
          title: '客户等级申请',
          icon: 'user-add-line',
        },
      },
      {
        path: 'customerReplenishment',
        name: 'CustomerReplenishment',
        component: () => import('@/subview/customer/replenishment'),
        meta: {
          title: '客户补货申请',
          icon: 'archive-line',
        },
      },
      {
        path: 'customerEnterprise',
        name: 'CustomerEnterprise',
        component: () => import('@/subview/customer/enterprise'),
        meta: {
          title: '企微客户列表',
          icon: 'archive-line',
        },
      },
    ],
  },

  {
    path: '/report',
    name: 'Report',
    component: Layout,
    meta: {
      title: '数据',
      icon: 'line-chart-line',
      breadcrumbHidden: true,
    },
    children: [
      {
        path: 'reportDataoverview',
        name: 'ReportDataoverview',
        component: () => import('@/subview/report/dataoverview'),
        meta: {
          title: '数据概览',
          icon: 'bar-chart-2-line',
        },
      },
      {
        path: 'reportOrder',
        name: 'ReportOrder',
        component: () => import('@/subview/report/order'),
        meta: {
          title: '订单分析',
          icon: 'bar-chart-2-line',
        },
      },
      {
        path: 'reportCustomer',
        name: 'ReportCustomer',
        component: () => import('@/subview/report/customer'),
        meta: {
          title: '客户分析',
          icon: 'bar-chart-2-line',
        },
      },
      {
        path: 'reportGoods',
        name: 'ReportGoods',
        component: () => import('@/subview/report/goods'),
        meta: {
          title: '商品分析',
          icon: 'bar-chart-2-line',
        },
      },
      {
        path: 'reportTransaction',
        name: 'ReportTransaction',
        component: () => import('@/subview/report/transaction'),
        meta: {
          title: '交易分析',
          icon: 'bar-chart-2-line',
        },
      },
      {
        path: 'reportFinance',
        name: 'ReportFinance',
        component: () => import('@/subview/report/finance'),
        meta: {
          title: '财务分析',
          icon: 'bar-chart-2-line',
        },
      },
      {
        path: 'salesTarget',
        name: 'SalesTarget',
        component: () => import('@/subview/report/salesTarget'),
        meta: {
          title: '销售目标',
          icon: 'bar-chart-2-line',
        },
      },
      {
        path: 'reportStock',
        name: 'ReportStock',
        component: () => import('@/subview/report/stock'),
        meta: {
          title: '库存统计',
          icon: 'archive-line',
        },
      },
      {
        path: 'reportDeposit',
        name: 'ReportDeposit',
        component: () => import('@/subview/report/deposit'),
        meta: {
          title: '保证金统计',
          icon: 'archive-line',
        },
      },
    ],
  },
  {
    path: '/financial',
    name: 'Financial',
    component: Layout,
    meta: {
      title: '财务',
      icon: 'money-cny-box-line',
      breadcrumbHidden: true,
    },
    children: [
      {
        path: 'financialSubject',
        name: 'FinancialSubject',
        component: () => import('@/subview/financial/subject'),
        meta: {
          title: '费用科目',
          icon: 'money-dollar-box-line',
        },
      },
      {
        path: 'financialCustomerVoucher',
        name: 'FinancialCustomerVoucher',
        component: () => import('@/subview/financial/customerVoucher'),
        meta: {
          title: '客户收款单',
          icon: 'money-dollar-box-line',
        },
      },
      {
        path: 'financialSupplierReceipt',
        name: 'FinancialSupplierReceipt',
        component: () => import('@/subview/financial/supplierReceipt'),
        meta: {
          title: '供应商收款单',
          icon: 'money-dollar-box-line',
        },
      },
      {
        path: 'financialBillList',
        name: 'FinancialBillList',
        component: () => import('@/subview/financial/billList'),
        meta: {
          title: '费用单',
          icon: 'money-dollar-box-line',
        },
      },
      {
        path: 'financialCorporateAccount',
        name: 'FinancialCorporateAccount',
        component: () => import('@/subview/financial/corporateAccount'),
        meta: {
          title: '结算账户',
          icon: 'money-dollar-box-line',
        },
      },
      {
        path: 'financialCategory',
        name: 'FinancialCategory',
        component: () => import('@/subview/financial/category'),
        meta: {
          title: '收支分类',
          icon: 'money-dollar-box-line',
        },
      },
    ],
  },
  {
    path: '/archives',
    name: 'Archives',
    component: Layout,
    meta: {
      title: '档案',
      icon: 'price-tag-3-line',
      breadcrumbHidden: true,
    },
    children: [
      {
        path: 'archivesBrand',
        name: 'ArchivesBrand',
        component: () => import('@/subview/archives/brand'),
        meta: {
          title: '品牌管理',
          icon: 'file-settings-line',
        },
      },
      {
        path: 'archivesBanner',
        name: 'ArchivesBanner',
        component: () => import('@/subview/archives/banner'),
        meta: {
          title: '轮播管理',
          icon: 'file-settings-line',
        },
      },
      {
        path: 'archivesYear',
        name: 'ArchivesYear',
        component: () => import('@/subview/archives/year'),
        meta: {
          title: '年份管理',
          icon: 'file-settings-line',
        },
      },
      {
        path: 'archivesSeasonal',
        name: 'ArchivesSeasonal',
        component: () => import('@/subview/archives/seasonal'),
        meta: {
          title: '季节管理',
          icon: 'file-settings-line',
        },
      },
      {
        path: 'archivesBandlist',
        name: 'ArchivesBandlist',
        component: () => import('@/subview/archives/bandlist'),
        meta: {
          title: '波段管理',
          icon: 'file-settings-line',
        },
      },
      {
        path: 'archivesColor',
        name: 'ArchivesColor',
        component: () => import('@/subview/archives/color'),
        meta: {
          title: '颜色管理',
          icon: 'file-settings-line',
        },
      },
      {
        path: 'archivesSize',
        name: 'ArchivesSize',
        component: () => import('@/subview/archives/size'),
        meta: {
          title: '尺码管理',
          icon: 'file-settings-line',
        },
      },
      {
        path: 'archivesWarehouse',
        name: 'ArchivesWarehouse',
        component: () => import('@/subview/archives/warehouse'),
        meta: {
          title: '仓库管理',
          icon: 'home-6-line',
        },
      },
      {
        path: 'archivesBom',
        name: 'ArchivesBom',
        component: () => import('@/subview/archives/bom'),
        meta: {
          title: '物料列表',
          icon: 'file-settings-line',
        },
      },
      {
        path: 'archivesPrint',
        name: 'ArchivesPrint',
        component: () => import('@/subview/archives/print'),
        meta: {
          title: '吊牌打印',
          icon: 'printer-cloud-line',
        },
      },
      {
        path: 'archivesProcess',
        name: 'ArchivesProcess',
        component: () => import('@/subview/archives/process'),
        meta: {
          title: '工艺管理',
          icon: 'file-settings-line',
        },
      },
      {
        path: 'archivesProcedure',
        name: 'ArchivesProcedure',
        component: () => import('@/subview/archives/procedure'),
        meta: {
          title: '工序管理',
          icon: 'file-settings-line',
        },
      },
      {
        path: 'archivesNode',
        name: 'ArchivesNode',
        component: () => import('@/subview/archives/node'),
        meta: {
          title: '节点管理',
          icon: 'file-settings-line',
        },
      },
    ],
  },
  {
    path: '/setting',
    name: 'Setting',
    component: Layout,
    meta: {
      title: '设置',
      icon: 'settings-6-line',
      breadcrumbHidden: true,
    },
    children: [
      {
        path: 'account',
        name: 'Account',
        component: () => import('@/subview/setting/account'),
        meta: {
          title: '账户信息',
          icon: 'account-circle-line',
        },
      },
      {
        path: 'system',
        name: 'System',
        meta: {
          title: '系统设置',
          icon: 'settings-line',
        },
        children: [
          {
            path: 'systemCoderule',
            name: 'SystemCoderule',
            component: () => import('@/subview/setting/system/coderule'),
            meta: {
              title: '编码规则',
              // icon: 'home-2-line',
            },
          },
          {
            path: 'systemPresell',
            name: 'SystemPresell',
            component: () => import('@/subview/setting/system/presell'),
            meta: {
              title: '预售设置',
              // icon: 'home-2-line',
            },
          },
          {
            path: 'systemmodule',
            name: 'SystemModule',
            component: () => import('@/subview/setting/system/module'),
            meta: {
              title: '模块配置',
              // icon: 'home-2-line',
            },
          },
          {
            path: 'systemInterface',
            name: 'SystemInterface',
            component: () => import('@/subview/setting/system/interface'),
            meta: {
              title: '开放接口',
              // icon: 'home-2-line',
            },
          },
        ],
      },
      {
        path: 'platform',
        name: 'Platform',
        meta: {
          title: '销售渠道',
          icon: 'bubble-chart-line',
        },
        children: [
          {
            path: 'platformwxgong',
            name: 'PlatformWxgong',
            component: () => import('@/subview/setting/platform/wxgong'),
            meta: {
              title: '微信公众号',
            },
          },
          {
            path: 'platformwxxiao',
            name: 'PlatformWxxiao',
            component: () => import('@/subview/setting/platform/wxxiao'),
            meta: {
              title: '微信小程序',
            },
          },
          {
            path: 'platformvideo',
            name: 'PlatformVideo',
            component: () => import('@/subview/setting/platform/video'),
            meta: {
              title: '视频号矩阵',
            },
          },
          {
            path: 'platformzfbxiao',
            name: 'PlatformZfbxiao',
            component: () => import('@/subview/setting/platform/zfbxiao'),
            meta: {
              title: '支付宝小程序',
            },
          },
          {
            path: 'platformapp',
            name: 'PlatformApp',
            component: () => import('@/subview/setting/platform/app'),
            meta: {
              title: '视频号直播带货',
            },
          },
          // {
          //   path: 'platformpinduoduoktt',
          //   name: 'PlatformPinduoduoktt',
          //   component: () => import('@/subview/setting/platform/pinduoduoktt'),
          //   meta: {
          //     title: '社群快团团',
          //   },
          // },
          {
            path: 'platformttxiao',
            name: 'PlatformTtxiao',
            component: () => import('@/subview/setting/platform/ttxiao'),
            meta: {
              title: '头条小程序',
            },
          },
        ],
      },
      {
        path: 'stores',
        name: 'Stores',
        component: () => import('@/subview/setting/stores'),
        meta: {
          title: '门店管理',
          icon: 'store-2-line',
        },
      },
      {
        path: 'logs',
        name: 'Logs',
        component: () => import('@/subview/setting/logs'),
        meta: {
          title: '操作日志',
          icon: 'chat-settings-line',
        },
      },
      {
        path: 'jstStore',
        name: 'JstStore',
        component: () => import('@/subview/setting/jststore'),
        meta: {
          title: 'JST店铺',
          icon: 'chat-settings-line',
        },
      },
      {
        path: 'quanYu',
        name: 'QuanYu',
        meta: {
          title: '中台管理',
          icon: 'microsoft-line',
        },
        children: [
          {
            path: 'quanYuUser',
            name: 'QuanYuUser',
            component: () => import('@/subview/setting/quanYu/user'),
            meta: {
              title: '角色管理',
            },
          },
          {
            path: 'quanYuAdministrator',
            name: 'QuanYuAdministrator',
            component: () => import('@/subview/setting/quanYu/administrator'),
            meta: {
              title: '用户管理',
            },
          },
          {
            path: 'quanYuMenu',
            name: 'QuanYuMenu',
            component: () => import('@/subview/setting/quanYu/menu'),
            meta: {
              title: '菜单管理',
            },
          },
        ],
      },
      {
        path: 'company',
        name: 'Company',
        meta: {
          title: '员工管理',
          icon: 'user-settings-line',
        },
        children: [
          {
            path: 'companyEmployees',
            name: 'CompanyEmployees',
            component: () => import('@/subview/setting/company/employees'),
            meta: {
              title: '员工管理',
            },
          },
          {
            path: 'companyDepartment',
            name: 'CompanyDepartment',
            component: () => import('@/subview/setting/company/department'),
            meta: {
              title: '部门管理',
            },
          },
        ],
      },
      // Message template
      {
        path: 'messagetemplate',
        name: 'Messagetemplate',
        component: () => import('@/subview/setting/messagetemplate'),
        meta: {
          title: '消息推送',
          icon: 'chat-settings-line',
        },
      },
    ],
  },
  {
    path: '/mall',
    name: 'Mall',
    component: Layout,
    meta: {
      title: '商城',
      icon: 'store-2-line',
      breadcrumbHidden: true,
    },
    children: [
      {
        path: 'mallManage',
        name: 'MallManage',
        component: () => import('@/subview/mall/manage'),
        meta: {
          title: '商品管理',
          icon: 'shopping-bag-3-line',
        },
      },
      {
        path: 'mallCommodityunit',
        name: 'MallCommodityunit',
        component: () => import('@/subview/mall/commodityunit'),
        meta: {
          title: '商品分组',
          icon: 'group-2-line',
        },
      },
      {
        path: 'mallClassification',
        name: 'MallClassification',
        component: () => import('@/subview/mall/classification'),
        meta: {
          title: '商品分类',
          icon: 'archive-line',
        },
      },
      {
        path: 'mallArticle',
        name: 'MallArticle',
        component: () => import('@/subview/mall/article'),
        meta: {
          title: '文章列表',
          icon: 'article-line',
        },
      },
      {
        path: 'mallShopping',
        name: 'Mallhopping',
        component: () => import('@/subview/mall/shopping'),
        meta: {
          title: '商城设置',
          icon: 'archive-line',
        },
      },
      {
        path: 'decorate',
        name: 'decorate',
        meta: {
          title: '商城装修',
          icon: 'camera-lens-line',
        },
        children: [
          {
            path: 'decorateDesign',
            name: 'DecorateDesign',
            component: () => import('@/subview/mall/decorate/design'),
            meta: {
              title: '页面设计',
            },
          },
          {
            path: 'decorateTheme',
            name: 'DecorateTheme',
            component: () => import('@/subview/mall/decorate/theme'),
            meta: {
              title: '主题风格',
            },
          },
          {
            path: 'decorateDepartment',
            name: 'DecorateDepartment',
            component: () => import('@/subview/mall/decorate/configuration'),
            meta: {
              title: '数据配置',
            },
          },
        ],
      },
    ],
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/subview/403'),
    meta: {
      hidden: true,
    },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/subview/404'),
    meta: {
      hidden: true,
    },
  },
]
const router = createRouter()

function fatteningRoutes(routes) {
  return routes.flatMap((route) => {
    return route.children ? fatteningRoutes(route.children) : route
  })
}

export function resetRouter(routes = constantRoutes) {
  routes.map((route) => {
    if (route.children) {
      route.children = fatteningRoutes(route.children)
    }
  })
  router.matcher = createRouter(routes).matcher
}

function createRouter(routes = constantRoutes) {
  return new VueRouter({
    base: publicPath,
    mode: routerMode,
    scrollBehavior: () => ({
      y: 0,
    }),
    routes: routes,
  })
}

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

export default router
