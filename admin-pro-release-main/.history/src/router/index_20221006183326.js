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
    path: '/register',
    component: () => import('@/views/register'),
    meta: {
      hidden: true,
    },
  },
  {
    path: '/callback',
    component: () => import('@/views/callback'),
    meta: {
      hidden: true,
    },
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/403'),
    meta: {
      hidden: true,
    },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
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
      // icon: 'home-2-line',
      breadcrumbHidden: true,
    },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/subview/index/index'),
        meta: {
          title: '基础报表',
          noClosable: true,
          // icon: 'home-2-line',
        },
      },
      {
        path: 'authorization',
        name: 'Authorization',
        component: () => import('@/subview/index/authorization'),
        meta: {
          title: '授权信息',
          // icon: 'home-2-line',
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
      // icon: 'error-warning-line',
      breadcrumbHidden: true,
    },
    children: [
      {
        path: 'account',
        name: 'Account',
        component: () => import('@/subview/setting/account/index'),
        meta: {
          title: '账户信息',
          // icon: 'home-2-line',
        },
      },
      {
        path: 'system',
        name: 'System',
        component: () => import('@/subview/setting/system/index'),
        meta: {
          title: '系统参数',
          // icon: 'home-2-line',
        },
      },
      {
        path: 'basis',
        name: 'Basis',
        component: () => import('@/subview/setting/basis/index'),
        meta: {
          title: '基础信息',
          // icon: 'home-2-line',
        },
      },
      {
        path: 'employees',
        name: 'Employees',
        component: () => import('@/subview/setting/employees/index'),
        meta: {
          title: '员工管理',
          // icon: 'home-2-line',
        },
      },
      {
        path: 'menu',
        name: 'Menu',
        component: () => import('@/subview/setting/menu/index'),
        meta: {
          title: '菜单管理',
          // icon: 'home-2-line',
        },
      },
      {
        path: 'logs',
        name: 'Logs',
        component: () => import('@/subview/setting/logs/index'),
        meta: {
          title: '操作日志',
          // icon: 'home-2-line',
        },
      },
    ],
  },
  {
    path: '/customer',
    name: 'Customer',
    component: Layout,
    meta: {
      title: '客户',
      // icon: 'error-warning-line',
      breadcrumbHidden: true,
    },
    children: [
      {
        path: 'CustomerStatistical',
        name: 'CustomerStatistical',
        component: () => import('@/subview/customer/statistical/index'),
        meta: {
          title: '统计',
          // icon: 'home-2-line',
        },
      },
      {
        path: 'classify',
        name: 'Classify',
        component: () => import('@/subview/customer/classify/index'),
        meta: {
          title: '客户分类',
          // icon: 'home-2-line',
        },
      },
      {
        path: 'level',
        name: 'Level',
        component: () => import('@/subview/customer/level/index'),
        meta: {
          title: '客户等级',
          // icon: 'home-2-line',
        },
      },
      {
        path: 'CustomerList',
        name: 'CustomerList',
        component: () => import('@/subview/customer/list/index'),
        meta: {
          title: '客户列表',
          // icon: 'home-2-line',
        },
      },
    ],
  },
  {
    path: '/supplier',
    name: 'Supplier',
    component: Layout,
    meta: {
      title: '供应商',
      // icon: 'error-warning-line',
      breadcrumbHidden: true,
    },
    children: [
      {
        path: 'SupplierStatistical',
        name: 'SupplierStatistical',
        component: () => import('@/subview/supplier/statistical/index'),
        meta: {
          title: '统计',
          // icon: 'home-2-line',
        },
      },
      {
        path: 'SupplierList',
        name: 'SupplierList',
        component: () => import('@/subview/supplier/list/index'),
        meta: {
          title: '供应商列表',
          // icon: 'home-2-line',
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
      // icon: 'error-warning-line',
      levelHidden: true,
    },
    children: [
      {
        path: 'OrderList',
        name: 'OrderList',
        component: () => import('@/subview/order/list/index'),
        meta: {
          title: '订单列表',
          // icon: 'home-2-line',
        },
      },
      {
        path: 'OrderBasis',
        name: 'OrderBasis',
        component: () => import('@/subview/order/basis/index'),
        meta: {
          title: '基础信息统计',
          // icon: 'home-2-line',
        },
      },
    ],
  },
  {
    path: '/digital',
    name: 'Digital',
    component: Layout,
    meta: {
      title: '数据化大屏',
      // icon: 'error-warning-line',
      levelHidden: true,
    },
    children: [
      {
        path: 'president',
        name: 'President',
        component: () => import('@/subview/digital/president/index'),
        meta: {
          title: '总统',
          // icon: 'home-2-line',
        },
      },
      {
        path: 'boss',
        name: 'Boss',
        component: () => import('@/subview/digital/boss/index'),
        meta: {
          title: '老板',
          // icon: 'home-2-line',
        },
      },
      {
        path: 'sales',
        name: 'Sales',
        component: () => import('@/subview/digital/sales/index'),
        meta: {
          title: '销售',
          // icon: 'home-2-line',
        },
      },
      {
        path: 'technology',
        name: 'Technology',
        component: () => import('@/subview/digital/technology/index'),
        meta: {
          title: '研发',
          // icon: 'home-2-line',
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
      // icon: 'error-warning-line',
      levelHidden: true,
    },
    children: [
      {
        path: 'report',
        name: 'Report',
        component: () => import('@/subview/financial/report/index'),
        meta: {
          title: '报表',
          // icon: 'home-2-line',
        },
      },
      {
        path: 'cost',
        name: 'Cost',
        component: () => import('@/subview/financial/cost/index'),
        meta: {
          title: '成本',
          // icon: 'home-2-line',
        },
      },
      {
        path: 'profits',
        name: 'Profits',
        component: () => import('@/subview/financial/profits/index'),
        meta: {
          title: '利润',
          // icon: 'home-2-line',
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
      // icon: 'error-warning-line',
      levelHidden: true,
    },
    children: [
      {
        path: 'statistical',
        name: 'Statistical',
        component: () => import('@/subview/goods/statistical/index'),
        meta: {
          title: '统计',
          // icon: 'home-2-line',
        },
      },
      {
        path: 'list',
        name: 'List',
        component: () => import('@/subview/goods/list/index'),
        meta: {
          title: '商品列表',
          // icon: 'home-2-line',
        },
      },
    ],
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
