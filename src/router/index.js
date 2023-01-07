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
        path: 'board',
        name: 'Board',
        component: () => import('@/subview/index/board'),
        meta: {
          title: '仓库预警分析',
          icon: 'truck-line',
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
        path: 'supplierProduct',
        name: 'SupplierProduct',
        component: () => import('@/subview/supplier/product'),
        meta: {
          title: '成品采购订单',
          icon: 'file-list-line',
        },
      },
      {
        path: 'supplierMaterial',
        name: 'SupplierMaterial',
        component: () => import('@/subview/supplier/material'),
        meta: {
          title: '物料采购订单',
          icon: 'file-list-line',
        },
      },
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
        path: 'supplierProductStatistical',
        name: 'SupplierProductStatistical',
        component: () => import('@/subview/supplier/productstatistical'),
        meta: {
          title: '成品采购统计',
          icon: 'bar-chart-box-line',
        },
      },
      {
        path: 'supplierMaterialStatistical',
        name: 'SupplierMaterialStatistical',
        component: () => import('@/subview/supplier/materialstatistical'),
        meta: {
          title: '物料采购统计',
          icon: 'bar-chart-box-line',
        },
      },
      {
        path: 'supplierAnalysis',
        name: 'SupplierAnalysis',
        component: () => import('@/subview/supplier/analysis'),
        meta: {
          title: '供应商分析',
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
        path: 'goodsCommodityunit',
        name: 'GoodsCommodityunit',
        component: () => import('@/subview/goods/commodityunit'),
        meta: {
          title: '商品分组',
          icon: 'archive-line',
        },
      },
      {
        path: 'goodsStatistical',
        name: 'GoodsStatistical',
        component: () => import('@/subview/goods/statistical'),
        meta: {
          title: '商品统计',
          icon: 'archive-line',
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
        path: 'orderBasis',
        name: 'OrderBasis',
        component: () => import('@/subview/order/basis'),
        meta: {
          title: '订单统计',
          icon: 'archive-line',
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
      {
        path: 'customerFollow',
        name: 'CustomerFollow',
        component: () => import('@/subview/customer/follow'),
        meta: {
          title: '客户跟进列表',
          icon: 'archive-line',
        },
      },
      {
        path: 'customerDeposit',
        name: 'CustomerDeposit',
        component: () => import('@/subview/customer/deposit'),
        meta: {
          title: '客户保证金',
          icon: 'archive-line',
        },
      },

      {
        path: 'customerStatistical',
        name: 'CustomerStatistical',
        component: () => import('@/subview/customer/statistical'),
        meta: {
          title: '客户统计',
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
            path: 'systemmodule',
            name: 'SystemModule',
            component: () => import('@/subview/setting/system/module'),
            meta: {
              title: '模块配置',
              // icon: 'home-2-line',
            },
          },
          {
            path: 'systemStorage',
            name: 'SystemStorage',
            component: () => import('@/subview/setting/system/storage'),
            meta: {
              title: '存储配置',
              // icon: 'home-2-line',
            },
          },
          {
            path: 'systemNotice',
            name: 'SystemNotice',
            component: () => import('@/subview/setting/system/notice'),
            meta: {
              title: '通知配置',
              // icon: 'home-2-line',
            },
          },
          {
            path: 'systemPay',
            name: 'SystemPay',
            component: () => import('@/subview/setting/system/pay'),
            meta: {
              title: '支付配置',
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
          {
            path: 'systemStore',
            name: 'SystemStore',
            component: () => import('@/subview/setting/system/store'),
            meta: {
              title: '旧商城配置',
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
              title: '移动App',
            },
          },
          {
            path: 'platformpinduoduoktt',
            name: 'PlatformPinduoduoktt',
            component: () => import('@/subview/setting/platform/pinduoduoktt'),
            meta: {
              title: '社群快团团',
            },
          },
          {
            path: 'platformttxiao',
            name: 'PlatformTtxiao',
            component: () => import('@/subview/setting/platform/ttxiao'),
            meta: {
              title: '头条小程序',
            },
          },
          {
            path: 'platformdoudin',
            name: 'PlatformDoudin',
            component: () => import('@/subview/setting/platform/doudin'),
            meta: {
              title: '抖店接入',
            },
          },
          {
            path: 'platformredbook',
            name: 'PlatformRedbook',
            component: () => import('@/subview/setting/platform/redbook'),
            meta: {
              title: '小红书',
            },
          },
        ],
      },
      {
        path: 'personal',
        name: 'Personal',
        component: () => import('@/subview/setting/personal'),
        meta: {
          title: '个人中心',
          icon: 'archive-line',
        },
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
        path: 'distribution',
        name: 'Distribution',
        component: () => import('@/subview/setting/distribution'),
        meta: {
          title: '配送方式',
          icon: 'archive-line',
        },
      },
      {
        path: 'print',
        name: 'Print',
        component: () => import('@/subview/setting/print'),
        meta: {
          title: '云打印机',
          icon: 'archive-line',
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
        path: 'mall',
        name: 'Mall',
        meta: {
          title: '商城配置',
          icon: 'archive-line',
        },
        children: [
          {
            path: 'mallConfiguration',
            name: 'MallConfiguration',
            component: () => import('@/subview/setting/mall/configuration'),
            meta: {
              title: '基础配置',
            },
          },
          {
            path: 'mallDesign',
            name: 'MallDesign',
            component: () => import('@/subview/setting/mall/design'),
            meta: {
              title: '页面装修',
            },
          },
        ],
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
/* export const asyncRoutes = [
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
        component: () => import('@/views/index'),
        meta: {
          title: '首页',
          icon: 'home-2-line',
          noClosable: true,
        },
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/index/dashboard'),
        meta: {
          title: '看板',
          icon: 'dashboard-line',
        },
      },
      {
        path: 'workbench',
        name: 'Workbench',
        component: () => import('@/views/index/workbench'),
        meta: {
          title: '工作台',
          icon: 'settings-6-line',
          dot: true,
        },
      },
    ],
  },
  {
    path: '*',
    redirect: '/404',
    meta: {
      hidden: true,
    },
  },
  {
    path: '/vab',
    name: 'Vab',
    component: Layout,
    meta: {
      title: '组件',
      icon: 'code-box-line',
    },
    children: [
      {
        path: 'icon',
        name: 'Icon',
        meta: {
          title: '图标',
          icon: 'remixicon-line',
        },
        children: [
          {
            path: 'remixIcon',
            name: 'RemixIcon',
            component: () => import('@/views/vab/icon/remixIcon'),
            meta: {
              title: '小清新图标',
            },
          },
          {
            path: 'iconSelector',
            name: 'IconSelector',
            component: () => import('@/views/vab/icon/iconSelector'),
            meta: {
              title: '图标选择器',
            },
          },
        ],
      },
      {
        path: 'permission',
        name: 'Permission',
        component: () => import('@/views/vab/permission'),
        meta: {
          title: '角色权限',
          icon: 'user-3-line',
          badge: 'Pro',
        },
      },
      {
        path: 'table',
        name: 'Table',
        meta: {
          title: '表格',
          // 非editor角色的用户可见
          guard: {
            role: ['Editor'],
            mode: 'except',
          },
          icon: 'table-2',
        },
        children: [
          {
            path: 'comprehensiveTable',
            name: 'ComprehensiveTable',
            component: () => import('@/views/vab/table/comprehensiveTable'),
            meta: {
              title: '综合表格',
            },
          },
          {
            path: 'detail',
            name: 'Detail',
            component: () => import('@/views/vab/table/detail'),
            meta: {
              hidden: true,
              title: '详情页',
              activeMenu: '/vab/table/comprehensiveTable',
              dynamicNewTab: true, //详情页根据id传参不同可打开多个
            },
          },
          {
            path: 'inlineEditTable',
            name: 'InlineEditTable',
            component: () => import('@/views/vab/table/inlineEditTable'),
            meta: {
              title: '行内编辑表格',
              noKeepAlive: true,
            },
          },
          {
            path: 'customTable',
            name: 'CustomTable',
            component: () => import('@/views/vab/table/customTable'),
            meta: {
              title: '自定义表格',
            },
          },
        ],
      },
      {
        path: 'card',
        name: 'Card',
        component: () => import('@/views/vab/card'),
        meta: {
          title: '卡片',
          guard: ['Admin'],
          icon: 'inbox-line',
        },
      },
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/vab/list'),
        meta: {
          title: '列表',
          guard: ['Admin'],
          icon: 'list-check-2',
        },
      },
      {
        path: 'form',
        name: 'Form',
        meta: {
          title: '表单',
          guard: ['Admin'],
          icon: 'file-list-2-line',
        },
        children: [
          {
            path: 'comprehensiveForm',
            name: 'ComprehensiveForm',
            component: () => import('@/views/vab/form/comprehensiveForm'),
            meta: {
              title: '综合表单',
            },
          },
          {
            path: 'stepForm',
            name: 'StepForm',
            component: () => import('@/views/vab/form/stepForm'),
            meta: {
              title: '分步表单',
            },
          },
          {
            path: 'button',
            name: 'Button',
            component: () => import('@/views/vab/form/button'),
            meta: {
              title: '按钮',
            },
          },
          {
            path: 'link',
            name: 'Link',
            component: () => import('@/views/vab/form/link'),
            meta: {
              title: '文字链接',
            },
          },
          {
            path: 'radio',
            name: 'Radio',
            component: () => import('@/views/vab/form/radio'),
            meta: {
              title: '单选框',
            },
          },
          {
            path: 'checkbox',
            name: 'Checkbox',
            component: () => import('@/views/vab/form/checkbox'),
            meta: {
              title: '多选框',
            },
          },
          {
            path: 'input',
            name: 'Input',
            component: () => import('@/views/vab/form/input'),
            meta: {
              title: '输入框',
            },
          },
          {
            path: 'inputNumber',
            name: 'InputNumber',
            component: () => import('@/views/vab/form/inputNumber'),
            meta: {
              title: '计数器',
            },
          },
          {
            path: 'select',
            name: 'Select',
            component: () => import('@/views/vab/form/select'),
            meta: {
              title: '选择器',
            },
          },
          {
            path: 'switch',
            name: 'Switch',
            component: () => import('@/views/vab/form/switch'),
            meta: {
              title: '开关',
            },
          },
          {
            path: 'slider',
            name: 'Slider',
            component: () => import('@/views/vab/form/slider'),
            meta: {
              title: '滑块',
            },
          },
          {
            path: 'timePicker',
            name: 'TimePicker',
            component: () => import('@/views/vab/form/timePicker'),
            meta: {
              title: '时间选择器',
            },
          },
          {
            path: 'datePicker',
            name: 'DatePicker',
            component: () => import('@/views/vab/form/datePicker'),
            meta: {
              title: '日期选择器',
            },
          },
          {
            path: 'dateTimePicker',
            name: 'DateTimePicker',
            component: () => import('@/views/vab/form/dateTimePicker'),
            meta: {
              title: '日期时间选择器',
            },
          },
          {
            path: 'rate',
            name: 'Rate',
            component: () => import('@/views/vab/form/rate'),
            meta: {
              title: '评分',
            },
          },
        ],
      },
      {
        path: 'editor',
        name: 'Editor',
        meta: {
          title: '编辑器',
          guard: ['Admin'],
          icon: 'edit-2-line',
        },
        children: [
          {
            path: 'richTextEditor',
            name: 'RichTextEditor',
            component: () => import('@/views/vab/editor/richTextEditor'),
            meta: {
              title: '富文本编辑器',
              guard: ['Admin'],
            },
          },
          {
            path: 'markdownEditor',
            name: 'MarkdownEditor',
            component: () => import('@/views/vab/editor/markdownEditor'),
            meta: {
              title: 'Markdown编辑器',
              guard: ['Admin'],
            },
          },
        ],
      },
    ],
  },
  {
    path: '/other',
    name: 'Other',
    component: Layout,
    meta: {
      title: '其他',
      icon: 'archive-line',
      guard: ['Admin'],
    },
    children: [
      {
        path: 'workflow',
        name: 'Workflow',
        component: () => import('@/views/other/workflow'),
        meta: {
          title: '工作流',
          guard: ['Admin'],
          icon: 'flow-chart',
        },
      },
      {
        path: 'echarts',
        name: 'Echarts',
        component: () => import('@/views/other/echarts'),
        meta: {
          title: '图表',
          guard: ['Admin'],
          icon: 'bubble-chart-line',
        },
      },
      {
        path: 'print',
        name: 'Print',
        component: () => import('@/views/other/print'),
        meta: {
          title: '打印',
          guard: ['Admin'],
          icon: 'printer-line',
        },
      },
      {
        path: 'cropper',
        name: 'Cropper',
        component: () => import('@/views/other/cropper'),
        meta: {
          title: '头像裁剪',
          guard: ['Admin'],
          icon: 'crop-line',
        },
      },
      {
        path: 'notice',
        name: 'Notice',
        component: () => import('@/views/other/notice'),
        meta: {
          title: '通知',
          guard: ['Admin'],
          icon: 'message-2-line',
        },
      },
      {
        path: 'timeline',
        name: 'Timeline',
        component: () => import('@/views/other/timeline'),
        meta: {
          title: '时间线',
          guard: ['Admin'],
          icon: 'time-line',
        },
      },
      {
        path: 'count',
        name: 'Count',
        component: () => import('@/views/other/count'),
        meta: {
          title: '数字自增长',
          guard: ['Admin'],
          icon: 'number-9',
        },
      },
      {
        path: 'tabs',
        name: 'Tabs',
        component: () => import('@/views/other/tabs'),
        meta: {
          title: '多标签',
          guard: ['Admin'],
          icon: 'bank-card-line',
        },
      },
      {
        path: 'dynamicMeta',
        name: 'DynamicMeta',
        component: () => import('@/views/other/dynamicMeta'),
        meta: {
          title: '动态Meta',
          guard: ['Admin'],
          icon: 'notification-badge-line',
          badge: '0',
        },
      },
      {
        path: 'dynamicSegment',
        name: 'DynamicSegment',
        redirect: '/other/dynamicSegment/test1/1',
        meta: {
          title: '动态路径参数',
          guard: ['Admin'],
          icon: 'arrow-left-right-line',
        },
        children: [
          {
            path: 'test1/:id',
            name: 'Test1',
            component: () => import('@/views/other/dynamicSegment/test1'),
            meta: {
              hidden: true,
              title: 'Params',
              dynamicNewTab: true,
            },
          },
          {
            path: 'test1/1',
            name: 'test1/1',
            component: () => import('@/views/other/dynamicSegment/test1'),
            meta: { title: 'Params id=1' },
          },
          {
            path: 'test2',
            name: 'Test2',
            component: () => import('@/views/other/dynamicSegment/test2'),
            meta: {
              hidden: true,
              title: 'Query',
              dynamicNewTab: true,
            },
          },
          {
            path: 'test2?id=1',
            name: 'test2?id=1',
            component: () => import('@/views/other/dynamicSegment/test2'),
            meta: { title: 'Query id=1' },
          },
        ],
      },
      {
        path: 'drag',
        name: 'Drag',
        meta: {
          title: '拖拽',
          guard: ['Admin'],
          icon: 'drag-drop-line',
        },
        children: [
          {
            path: 'dialogDrag',
            name: 'DialogDrag',
            component: () => import('@/views/other/drag/dialogDrag'),
            meta: {
              title: '弹窗拖拽',
            },
          },
          {
            path: 'cardDrag',
            name: 'CardDrag',
            component: () => import('@/views/other/drag/cardDrag'),
            meta: {
              title: '卡片拖拽',
            },
          },
          {
            path: 'flowSheetDrag',
            name: 'FlowSheetDrag',
            component: () => import('@/views/other/drag/flowSheetDrag'),
            meta: {
              title: '流程图拖拽',
              noKeepAlive: true,
            },
          },
        ],
      },
      {
        path: 'contextmenu',
        name: 'Contextmenu',
        component: () => import('@/views/other/contextmenu'),
        meta: {
          title: '右键菜单',
          guard: ['Admin'],
          icon: 'menu-2-fill',
        },
      },
      {
        path: 'loading',
        name: 'Loading',
        component: () => import('@/views/other/loading'),
        meta: {
          title: '加载',
          guard: ['Admin'],
          icon: 'loader-line',
        },
      },
      {
        path: 'player',
        name: 'Player',
        component: () => import('@/views/other/player'),
        meta: {
          title: '视频播放器',
          guard: ['Admin'],
          icon: 'video-line',
          noKeepAlive: true,
        },
      },
      {
        path: 'upload',
        name: 'Upload',
        component: () => import('@/views/other/upload'),
        meta: {
          title: '上传',
          guard: ['Admin'],
          icon: 'chat-upload-line',
        },
      },
      {
        path: 'menu1',
        name: 'Menu1',
        meta: {
          title: '多级路由缓存',
          guard: ['Admin'],
          icon: 'route-line',
        },
        children: [
          {
            path: 'menu1-1',
            name: 'Menu11',
            meta: {
              title: '多级路由1-1',
            },
            children: [
              {
                path: 'menu1-1-1',
                name: 'Menu111',
                meta: {
                  title: '多级路由1-1-1',
                },
                children: [
                  {
                    path: 'menu1-1-1-1',
                    name: 'Menu1111',
                    meta: {
                      title: '多级路由1-1-1-1',
                    },
                    component: () =>
                      import(
                        '@/views/other/nested/menu1/menu1-1/menu1-1-1/menu1-1-1-1'
                      ),
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: 'log',
        name: 'Log',
        component: () => import('@/views/other/errorLog'),
        meta: {
          title: '错误日志模拟',
          guard: ['Admin'],
          icon: 'error-warning-line',
        },
      },
      {
        path: 'cssfx',
        name: 'Cssfx',
        component: () => import('@/views/other/cssfx'),
        meta: {
          title: 'Css动画',
          guard: ['Admin'],
          icon: 'css3-line',
        },
      },
      {
        path: 'social',
        name: 'Social',
        component: () => import('@/views/other/social'),
        meta: {
          title: '第三方登录',
          guard: ['Admin'],
          icon: 'github-fill',
        },
      },
      // {
      //   path: 'mobilePreview',
      //   name: 'MobilePreview',
      //   component: () => import('@/views/vab/mobilePreview'),
      //   meta: {
      //     title: '手机预览',
      //     guard: ['Admin'],
      //     icon: 'smartphone-line',
      //   },
      // },
      {
        path: '//github.com/chuzhixin/vue-admin-beautiful?utm_source=gold_browser_extension',
        name: 'ExternalLink',
        meta: {
          title: '外链',
          target: '_blank',
          // 等价guard: ['Admin', 'Editor'],
          guard: {
            role: ['Admin', 'Editor'],
            mode: 'oneOf',
          },
          icon: 'external-link-line',
        },
      },
      {
        path: 'iframe',
        name: 'Iframe',
        redirect: '/other/iframe/search',
        meta: {
          title: 'Iframe',
          guard: ['Admin'],
          icon: 'window-line',
        },
        children: [
          {
            path: 'view',
            name: 'IframeView',
            component: () => import('@/views/other/iframe/view'),
            meta: {
              hidden: true,
              title: 'Iframe',
              icon: 'window-line',
              dynamicNewTab: true,
            },
          },
          {
            path: 'view?url=https%3A%2Fwww.baidu.com&title=%E7%99%BE%E5%BA%A6',
            name: 'baiduIframe',
            component: () => import('@/views/other/iframe/view'),
            meta: { title: '百度', icon: 'baidu-fill' },
          },
          {
            path: 'view?url=https%3A%2Fgitee.com%2Fchu1204505056%2Fvue-admin-beautiful&title=Gitee',
            name: 'githubIframe',
            component: () => import('@/views/other/iframe/view'),
            meta: { title: 'Gitee', icon: 'github-fill' },
          },
          {
            path: 'search',
            name: 'IframeSearch',
            component: () => import('@/views/other/iframe/search'),
            meta: {
              title: '自定义Iframe',
              icon: 'search-2-line',
            },
          },
        ],
      },
      {
        path: 'excel',
        name: 'Excel',
        meta: {
          title: 'Excel',
          guard: ['Admin'],
          icon: 'file-excel-2-line',
        },
        children: [
          {
            path: 'exportExcel',
            name: 'ExportExcel',
            component: () => import('@/views/other/excel/exportExcel'),
            meta: {
              title: '导出Excel',
            },
          },
          {
            path: 'exportSelectedExcel',
            name: 'SelectExcel',
            component: () => import('@/views/other/excel/exportSelectExcel'),
            meta: {
              title: '导出选中行Excel',
            },
          },
          {
            path: 'exportMergeHeaderExcel',
            name: 'MergeHeaderExcel',
            component: () =>
              import('@/views/other/excel/exportMergeHeaderExcel'),
            meta: {
              title: '导出合并Excel',
            },
          },
        ],
      },
    ],
  },
  {
    path: '/mall',
    name: 'Mall',
    component: Layout,
    meta: {
      title: '物料源',
      icon: 'apps-line',
      levelHidden: true,
      guard: ['Admin'],
    },
    children: [
      {
        path: 'goods',
        name: 'Goods',
        component: () => import('@/views/mall/goods'),
        meta: {
          title: '物料市场',
          icon: 'shopping-cart-line',
          badge: 'Hot',
        },
      },
    ],
  },
  {
    path: '/noColumn',
    name: 'NoColumn',
    component: Layout,
    meta: {
      title: '无分栏',
      icon: 'delete-column',
      guard: ['Admin'],
      breadcrumbHidden: true,
    },
    children: [
      {
        path: 'deleteColumn',
        name: 'DeleteColumn',
        component: () => import('@/views/noColumn/deleteColumn'),
        meta: {
          title: '无分栏',
          icon: 'delete-column',
          noColumn: true,
        },
      },
    ],
  },
  {
    path: '/setting',
    name: 'PersonnelManagement',
    component: Layout,
    meta: {
      title: '配置',
      icon: 'user-settings-line',
      guard: ['Admin'],
    },
    children: [
      {
        path: 'personalCenter',
        name: 'PersonalCenter',
        component: () => import('@/views/setting/personalCenter'),
        meta: {
          title: '个人中心',
          icon: 'map-pin-user-line',
        },
      },
      {
        path: 'userManagement',
        name: 'UserManagement',
        component: () => import('@/views/setting/userManagement'),
        meta: {
          title: '用户管理',
          icon: 'user-3-line',
        },
      },
      {
        path: 'roleManagement',
        name: 'RoleManagement',
        component: () => import('@/views/setting/roleManagement'),
        meta: {
          title: '角色管理',
          icon: 'admin-line',
        },
      },
      {
        path: 'departmentManagement',
        name: 'DepartmentManagement',
        component: () => import('@/views/setting/departmentManagement'),
        meta: {
          title: '部门管理',
          icon: 'group-line',
        },
      },
      {
        path: 'menuManagement',
        name: 'MenuManagement',
        component: () => import('@/views/setting/menuManagement'),
        meta: {
          title: '菜单管理',
          icon: 'menu-2-fill',
        },
      },
      {
        path: 'systemLog',
        name: 'SystemLog',
        component: () => import('@/views/setting/systemLog'),
        meta: {
          title: '系统日志',
          icon: 'file-shield-2-line',
        },
      },
    ],
  },
  {
    path: '/error',
    name: 'Error',
    component: Layout,
    meta: {
      title: '错误页',
      icon: 'error-warning-line',
      levelHidden: true,
    },
    children: [
      {
        path: '403',
        name: 'Error403',
        component: () => import('@/views/403'),
        meta: {
          title: '403',
          icon: 'error-warning-line',
          // tabHidden: true,
        },
      },
      {
        path: '404',
        name: 'Error404',
        component: () => import('@/views/404'),
        meta: {
          title: '404',
          icon: 'error-warning-line',
          // tabHidden: true,
        },
      },
    ],
  },
  {
    path: '*',
    redirect: '/404',
    meta: {
      hidden: true,
    },
  },
] */

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
