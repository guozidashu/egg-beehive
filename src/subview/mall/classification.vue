<template>
  <div style="background-color: #f6f8f9">
    <div style="padding: 20px; margin-bottom: 20px; background-color: #ffffff">
      <el-button size="small" type="primary" @click="handleBatch(1)">
        批量显示
      </el-button>
      <el-button size="small" type="primary" @click="handleBatch(2)">
        批量隐藏
      </el-button>
    </div>
    <el-card shadow="never" style="border: 0">
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
  import {
    getShopGoodsCategoryTree,
    editBatchDisplayCateGory,
  } from '@/api/basic'
  export default {
    name: 'EmployeeValue',
    components: { Edit },
    data() {
      return {
        form: {
          page: 1,
          pageSize: 10,
        },
        editForm: {
          status: 0, //0批量隐藏 1批量显示
          ids: [], //批量操作id
        },
        selectRowsId: [],
        selectList: [],
        formType: 4,
        listType: 7,
        list: [],
        listLoading: false,
      }
    },
    watch: {
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
            const { code } = await editBatchDisplayCateGory(this.editForm)
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
            const { code } = await editBatchDisplayCateGory(this.editForm)
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
      handleSelectionChange(val) {
        this.selectRowsId = val
      },
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
      // 列表数据改变页数   公共部分
      changeBtnPage(data) {
        this.form.page = data
      },
      // 列表数据改变每页条数  公共部分
      changeBtnPageSize(data) {
        this.form.pageSize = data
      },
      // 列表数据请求函数 公共部分
      async fetchData() {
        this.listLoading = true
        const { data } = await getShopGoodsCategoryTree(this.form)
        this.list = data
        this.listLoading = false
      },
    },
  }
</script>
<style lang="scss" scoped></style>
