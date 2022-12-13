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
                @click="handleEdit('add', 1)"
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
            <el-table-column label="标题" prop="title" show-overflow-tooltip />
            <el-table-column label="name" prop="name" show-overflow-tooltip />
            <el-table-column label="路径" prop="path" show-overflow-tooltip />
            <el-table-column
              label="vue文件路径"
              prop="component"
              show-overflow-tooltip
            />
            <el-table-column label="图标" show-overflow-tooltip>
              <template #default="{ row }">
                <vab-icon v-if="row.icon" :icon="row.icon" />
              </template>
            </el-table-column>
            <el-table-column label="页面按钮" show-overflow-tooltip>
              <template #default="{ row }">
                <div v-if="row.guard.length != 0">
                  <el-tag v-for="(item, index) in row.guard" :key="index">
                    {{ item.title }}
                  </el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" show-overflow-tooltip width="300">
              <template #default="{ row }">
                <el-button
                  v-if="row.children == undefined"
                  type="primary"
                  @click="handleEdit(row, 2)"
                >
                  <vab-icon icon="edit-2-line" />
                  按钮
                </el-button>
                <el-button type="primary" @click="handleEdit(row, 1)">
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
  import Edit from '../components/MenuManagementEdit'
  import { getMenuList, delMenuDel } from '@/api/basic'
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
        list: [],
        listLoading: false,
      }
    },
    async created() {
      // const {
      //   data: { list },
      // } = await getTree()
      // this.data = list
      this.fetchData()
    },
    methods: {
      handleEdit(row, type) {
        if (type == 1) {
          if (row.path) {
            row.isState = 1
            // row.
            this.$refs['edit'].showEdit(row, 1)
          } else {
            this.$refs['edit'].showEdit(null, 1)
          }
        } else {
          if (row.path) {
            row.isState = 1
            if (row.guard.length == 0) {
              row.guard = []
            }
            this.$refs['edit'].showEdit(row, 2)
          }
        }
      },
      handleDelete(row) {
        if (row.path) {
          this.$baseConfirm('你确定要删除当前项吗', null, async () => {
            const { msg } = await delMenuDel({ id: row.id })
            this.$baseMessage(msg, 'success', 'vab-hey-message-success')
            await this.fetchData()
          })
        }
      },
      async fetchData(role) {
        this.listLoading = true
        const { data } = await getMenuList({ role })
        this.list = data
        this.listLoading = false
      },
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
