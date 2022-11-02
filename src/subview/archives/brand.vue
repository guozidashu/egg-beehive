<template>
  <div style="background-color: #f6f8f9">
    <div
      style="padding-top: 1px; margin-bottom: 20px; background-color: #ffffff"
    >
      <Form :form="form" :form-type="formType" @changeSearch="handleQuery">
        <template #Form>
          <el-form-item label="品牌名称" prop="region">
            <el-input
              v-model="form.name"
              placeholder="请输入品牌名称"
              size="small"
            />
          </el-form-item>
        </template>
      </Form>
    </div>
    <el-card shadow="never" style="border: 0">
      <el-form ref="form" :inline="true" @submit.native.prevent>
        <el-form-item>
          <el-button
            native-type="submit"
            size="small"
            type="primary"
            @click="handleEdit('add')"
          >
            添加品牌
          </el-button>
        </el-form-item>
      </el-form>
      <List
        :list="list"
        :list-type="listType"
        :state="listLoading"
        :total="total"
        @changePage="changeBtnPage"
        @changePageSize="changeBtnPageSize"
        @selectRows="selectBtnRows"
      >
        <!-- 表格组件具名插槽 自定义表头 -->
        <template #List>
          <el-table-column type="selection" width="50" />
          <el-table-column label="ID" prop="id" width="80" />
          <el-table-column label="品牌名称" prop="name" width="120" />
          <el-table-column label="使用商品" prop="num" width="120" />
          <el-table-column label="状态" prop="state" width="150">
            <template #default="{ row }">
              <el-switch
                v-model="row.state"
                active-color="#41B584"
                active-text="开启"
                :active-value="1"
                class="switch"
                inactive-color="#D2D2D2"
                inactive-text="关闭"
                :inactive-value="0"
                style="margin: 0 10px"
              />
            </template>
          </el-table-column>
          <el-table-column label="排序" prop="name" width="80" />
          <el-table-column label="创建时间" prop="tiem" />
          <el-table-column
            align="center"
            label="操作"
            show-overflow-tooltip
            width="85"
          >
            <template #default="{ row }">
              <el-button type="text" @click="handleEdit(row)">编辑</el-button>
              <el-button type="text" @click="handleDelete(row)">删除</el-button>
            </template>
          </el-table-column>
        </template>
      </List>
    </el-card>
    <edit ref="edit" @fetch-data="fetchData" />
  </div>
</template>
<script>
  import List from '@/subview/components/List'
  import Edit from './components/BrandEdit'
  import Form from '@/subview/components/Form'
  // import { editBrand, deleteBrand } from '@/api/basic'
  export default {
    name: 'ArchivesBrand',
    components: { List, Edit, Form },
    data() {
      return {
        // 表单数据/列表参数
        form: {
          id: 0,
          name: '',
          pageNo: 1,
          pageSize: 10,
        },
        formType: 4,
        // 列表数据相关
        selectRows: [],
        listType: 2,
        list: [
          {
            id: 1,
            name: '品牌名称',
            num: 0,
            state: 1,
            sort: 0,
            time: '2020-01-01 00:00:00',
          },
        ],
        listLoading: false,
        total: 0,
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
      // 新增修改
      async handleEdit(row) {
        if (row === 'add') {
          this.$refs['edit'].showEdit()
        } else {
          if (row.id) {
            // const { code, data } = await editBrand({ id: row.id })
            // if (code === 200) {
            //   this.$refs['edit'].showEdit(data)
            // }
            this.$refs['edit'].showEdit(row)
          } else {
            this.$refs['edit'].showEdit()
          }
        }
      },
      // 查询
      handleQuery() {
        this.form.pageNo = 1
      },
      // 删除
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm('你确定要删除当前项吗', null, async () => {
            // const { code } = await deleteBrand({ id: row.id })
            // if (code != 200) {
            //   return
            // }
            this.$baseMessage('删除成功', 'success', 'vab-hey-message-success')
            this.fetchData()
          })
        } else {
          if (this.selectRows.length > 0) {
            // const ids = this.selectRows.map((item) => item.id).join()
            this.$baseConfirm('你确定要删除选中项吗', null, async () => {
              // const { code } = await deleteBrand(ids)
              // if (code != 200) {
              //   return
              // }
              this.fetchData()
            })
          } else {
            this.$baseMessage('未选中任何行', 'error', 'vab-hey-message-error')
          }
        }
      },
      // 列表数据封装函数

      // 列表数据改变页数   公共部分
      changeBtnPage(data) {
        this.form.pageNo = data
      },
      // 多选获取数据   公共部分
      selectBtnRows(data) {
        this.selectRows = data
      },

      // 列表数据改变每页条数  公共部分
      changeBtnPageSize(data) {
        this.form.pageSize = data
        console.log(data)
      },
      // 列表数据请求函数 公共部分
      async fetchData() {
        // this.listLoading = true
        // const {
        //   data: { list, total },
        // } = await getBrandList(this.form)
        // this.list = list
        // this.total = total
        // this.listLoading = false
      },
    },
  }
</script>
<style lang="scss" scoped></style>
