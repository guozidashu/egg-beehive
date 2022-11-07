<template>
  <div class="menu-management-container">
    <el-row :gutter="20">
      <el-col :lg="24" :md="24" :sm="24" :xl="24" :xs="24">
        <el-card shadow="hover">
          <vab-query-form>
            <vab-query-form-top-panel :span="12">
              <el-button
                icon="el-icon-plus"
                type="primary"
                @click="handleEdit($event)"
              >
                添加
              </el-button>
            </vab-query-form-top-panel>
          </vab-query-form>
          <el-table
            v-loading="listLoading"
            border
            :data="list"
            default-expand-all
            row-key="path"
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          >
            <el-table-column
              label="标题"
              prop="meta.title"
              show-overflow-tooltip
            />
            <el-table-column label="name" prop="name" show-overflow-tooltip />
            <el-table-column label="路径" prop="path" show-overflow-tooltip />
            <el-table-column label="是否隐藏" show-overflow-tooltip>
              <template #default="{ row }">
                {{ row.meta.hidden ? '是' : '否' }}
              </template>
            </el-table-column>
            <el-table-column
              label="是否隐藏当前节点"
              show-overflow-tooltip
              width="100"
            >
              <template #default="{ row }">
                {{ row.meta.levelHidden ? '是' : '否' }}
              </template>
            </el-table-column>
            <el-table-column
              label="vue文件路径"
              prop="component"
              show-overflow-tooltip
            />
            <el-table-column label="重定向" show-overflow-tooltip>
              <template #default="{ row }">
                {{ row.redirect ? row.redirect : '无' }}
              </template>
            </el-table-column>
            <el-table-column label="图标" show-overflow-tooltip>
              <template #default="{ row }">
                <vab-icon
                  v-if="row.meta && row.meta.icon"
                  :icon="row.meta.icon"
                />
              </template>
            </el-table-column>
            <el-table-column label="是否固定" show-overflow-tooltip>
              <template #default="{ row }">
                {{ row.meta && row.meta.noClosable ? '是' : '否' }}
              </template>
            </el-table-column>
            <el-table-column
              label="是否无缓存"
              show-overflow-tooltip
              width="120"
            >
              <template #default="{ row }">
                {{ row.meta && row.meta.noKeepAlive ? '是' : '否' }}
              </template>
            </el-table-column>
            <el-table-column label="badge" show-overflow-tooltip>
              <template #default="{ row }">
                <el-tag
                  v-if="row.meta && row.meta.badge"
                  effect="dark"
                  type="danger"
                >
                  {{ row.meta.badge }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="dot" show-overflow-tooltip>
              <template #default="{ row }">
                {{ row.meta && row.meta.dot ? '是' : '否' }}
              </template>
            </el-table-column>
            <el-table-column label="操作" show-overflow-tooltip width="185">
              <template #default="{ row }">
                <el-button type="primary" @click="handleEdit(row)">
                  <vab-icon icon="edit-2-line" />
                  编辑
                </el-button>
                <el-button type="danger" @click="handleDelete(row)">
                  <vab-icon icon="delete-bin-6-line" />
                  删除
                </el-button>
              </template>
            </el-table-column>
            <template #empty>
              <el-image
                class="vab-data-empty"
                :src="require('@/assets/empty_images/data_empty.png')"
              />
            </template>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <edit ref="edit" @fetch-data="fetchData" />
  </div>
</template>

<script>
  import Edit from './components/MenuManagementEdit'
  export default {
    name: 'MenuManagement',
    components: { Edit },
    data() {
      return {
        data: [],
        defaultProps: {
          children: 'children',
          label: 'label',
        },
        list: [
          {
            path: '/',
            name: 'Root',
            component: 'Layout',
            meta: {
              title: '首页',
              icon: 'home-2-line',
              breadcrumbHidden: true,
            },
            children: [
              {
                path: 'index',
                name: 'Index',
                component: '@subview/index/index',
                meta: {
                  title: '首页',
                  icon: 'home-2-line',
                  noClosable: true,
                },
              },
              {
                path: 'dashboard',
                name: 'Dashboard',
                component: '@subview/index/board',
                meta: {
                  title: '看板',
                  icon: 'dashboard-line',
                },
              },
            ],
          },
          {
            path: '/customer',
            name: 'Customer',
            component: 'Layout',
            guard: ['Admin'],
            meta: {
              title: '客户',
              icon: 'archive-line',
              breadcrumbHidden: true,
            },
            children: [
              {
                path: 'customerManage',
                name: 'CustomerManage',
                component: '@subview/customer/manage',
                meta: {
                  title: '客户管理',
                  icon: 'archive-line',
                },
              },
              {
                path: 'customerLevel',
                name: 'CustomerLevel',
                component: '@subview/customer/level',
                meta: {
                  title: '客户等级',
                  icon: 'archive-line',
                },
              },
              {
                path: 'customerClassify',
                name: 'CustomerClassify',
                component: '@subview/customer/classify',
                meta: {
                  title: '客户分类',
                  icon: 'archive-line',
                },
              },
              {
                path: 'customerTags',
                name: 'CustomerTags',
                component: '@subview/customer/tags',
                meta: {
                  title: '客户标签',
                  icon: 'archive-line',
                },
              },
              {
                path: 'customerStatistical',
                name: 'CustomerStatistical',
                component: '@subview/customer/statistical',
                meta: {
                  title: '客户统计',
                  icon: 'archive-line',
                },
              },
            ],
          },
        ],
        listLoading: false,
      }
    },
    async created() {
      // const {
      //   data: { list },
      // } = await getTree()
      // this.data = list
      // await this.fetchData()
    },
    methods: {
      handleEdit(row) {
        if (row.path && row.component) {
          this.$refs['edit'].showEdit(row)
        } else {
          this.$refs['edit'].showEdit()
        }
      },
      handleDelete(row) {
        if (row.path) {
          this.$baseConfirm('你确定要删除当前项吗', null, async () => {
            // const { msg } = await doDelete({ paths: row.path })
            // this.$baseMessage(msg, 'success', 'vab-hey-message-success')
            await this.fetchData()
          })
        }
      },
      // async fetchData(role) {
      //   this.listLoading = true
      //   const {
      //     data: { list },
      //   } = await getList({ role })
      //   this.list = list
      //   this.listLoading = false
      // },
      handleNodeClick({ role }) {
        this.fetchData(role)
      },
    },
  }
</script>

<style lang="scss" scoped>
  $base: '.menu-management';
  #{$base}-container {
    padding: 0 !important;
    background: $base-color-background !important;
  }
</style>
