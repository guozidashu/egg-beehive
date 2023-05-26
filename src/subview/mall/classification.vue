<template>
  <div style="background-color: #f6f8f9">
    <div
      style="
        padding: 20px;
        margin-bottom: 20px;
        background-color: #ffffff;
        border-radius: 5px;
      "
    >
      <el-button size="small" type="primary" @click="handleBatch(1)">
        批量显示
      </el-button>
      <el-button size="small" type="primary" @click="handleBatch(2)">
        批量隐藏
      </el-button>
    </div>
    <el-card shadow="never" style="border: 0; border-radius: 5px">
      <QYList
        :list="list"
        :list-type="listType"
        :state="listLoading"
        @changePage="changeBtnPage"
        @changePageSize="changeBtnPageSize"
        @selectRows="handleSelectionChange"
      >
        <template #List>
          <el-table-column type="selection" />
          <el-table-column label="款式名称" prop="name" />
          <el-table-column label="商城是否显示" prop="shop_is_display">
            <template #default="{ row }">
              <el-tag v-if="row.shop_is_display == 1">显示</el-tag>
              <el-tag v-else type="danger">隐藏</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" fixed="right" label="操作" width="85">
            <template #default="{ row }">
              <el-button type="text" @click="handleEdit(row, 1)">
                编辑
              </el-button>
            </template>
          </el-table-column>
        </template>
      </QYList>
    </el-card>
    <edit ref="edit" @fetch-data="fetchData" />
  </div>
</template>
<script>
  import Edit from '@/subview/components/Edit/MallClassifiedEdit'
  export default {
    name: 'EmployeeValue',
    components: { Edit },
    data() {
      return {
        editForm: {
          status: 0, //0批量隐藏 1批量显示
          ids: [], //批量操作id
        },
        // 页数，条数，表单查询条件 ，选中数据，表单组件和列表组件的类型，列表数据，列表加载状态
        form: {
          page: 1,
          pageSize: 20,
        },
        selectRowsId: [],
        formType: 4,
        listType: 7,
        list: [],
        listLoading: false,
      }
    },
    watch: {
      // 监听表单变化，如果表单变化则重新获取数据
      form: {
        handler: function () {
          this.fetchData()
        },
        deep: true,
      },
    },
    created() {
      this.fetchData()
    },
    methods: {
      // 批量操作
      async handleBatch(type) {
        if (this.selectRowsId.length === 0) {
          this.$message({
            type: 'warning',
            message: '请选择要操作的数据',
          })
          return
        } else {
          if (type == 1) {
            let temp = false
            this.selectRowsId.forEach((item) => {
              if (item.shop_is_display == 1) {
                this.$message({
                  type: 'warning',
                  message: '已经是显示状态',
                })
                temp = true
                return
              }
            })
            if (temp) {
              return
            }
            this.editForm.status = 1
            this.selectRowsId.forEach((item) => {
              this.editForm.ids.push(item.id)
            })
            const { code } = await this.api.editBatchDisplayCateGory(
              this.editForm
            )
            if (code == 200) {
              this.$message({
                type: 'success',
                message: '操作成功',
              })
              this.fetchData()
              this.editForm.ids = []
            }
          } else {
            let temp = false
            this.selectRowsId.forEach((item) => {
              if (item.shop_is_display == 0) {
                this.$message({
                  type: 'warning',
                  message: '已经是隐藏状态',
                })
                temp = true
                return
              }
            })
            if (temp) {
              return
            }
            this.editForm.status = 0
            this.selectRowsId.forEach((item) => {
              this.editForm.ids.push(item.id)
            })
            const { code } = await this.api.editBatchDisplayCateGory(
              this.editForm
            )
            if (code == 200) {
              this.$message({
                type: 'success',
                message: '操作成功',
              })
              this.fetchData()
              this.editForm.ids = []
            }
          }
        }
      },
      // 选中数据
      handleSelectionChange(val) {
        this.selectRowsId = val
      },
      // 编辑
      handleEdit(row, type) {
        if (row === 'add') {
          this.$refs['edit'].showEdit(row, type)
        } else {
          if (row.id) {
            this.$refs['edit'].showEdit(row, type)
          } else {
            this.$refs['edit'].showEdit(row, type)
          }
        }
      },
      // 分页
      changeBtnPage(data) {
        this.form.page = data
      },
      // 分页条数
      changeBtnPageSize(data) {
        this.form.pageSize = data
      },
      // 获取数据
      async fetchData() {
        this.listLoading = true
        const { data } = await this.api.getShopGoodsCategoryTree(this.form)
        this.list = data
        this.listLoading = false
      },
    },
  }
</script>
