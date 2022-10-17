<template>
  <div style="background-color: #f6f8f9">
    <div
      style="padding-top: 1px; margin-bottom: 20px; background-color: #ffffff"
    >
      <Form :form="form" :form-type="formType" @changeSearch="handleQuery">
        <template #Form>
          <el-form-item label="供应商名称" prop="region">
            <el-input v-model="form.name" size="small" />
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
            添加
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
          <el-table-column
            align="center"
            show-overflow-tooltip
            type="selection"
          />
          <el-table-column
            align="center"
            label="供应商ID"
            prop="id"
            show-overflow-tooltip
            sortable
          />
          <el-table-column
            align="center"
            label="供应商名称"
            prop="name"
            show-overflow-tooltip
          />
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
  import Edit from './components/SubjectEdit'
  import Form from '@/subview/components/Form'
  // import { getSubjectList, editSubject, deleteSubject } from '@/api/basic'
  export default {
    name: 'ArchivesSupplier',
    components: { List, Form, Edit },
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
        listType: 1,
        list: [],
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
      // async handleEdit(row) {
      //   if (row === 'add') {
      //     this.$refs['edit'].showEdit()
      //   } else {
      //     if (row.id) {
      //       const { code, data } = await editSubject({ id: row.id })
      //       if (code === 200) {
      //         this.$refs['edit'].showEdit(data)
      //       }
      //     } else {
      //       this.$refs['edit'].showEdit()
      //     }
      //   }
      // },
      // 查询
      handleQuery() {
        this.form.pageNo = 1
      },
      // 删除
      // handleDelete(row) {
      //   if (row.id) {
      //     this.$baseConfirm('你确定要删除当前项吗', null, async () => {
      //       const { code } = await deleteSubject({ id: row.id })
      //       if (code != 200) {
      //         return
      //       }
      //       this.$baseMessage('删除成功', 'success', 'vab-hey-message-success')
      //       this.fetchData()
      //     })
      //   } else {
      //     if (this.selectRows.length > 0) {
      //       const ids = this.selectRows.map((item) => item.id).join()
      //       this.$baseConfirm('你确定要删除选中项吗', null, async () => {
      //         const { code } = await deleteSubject(ids)
      //         if (code != 200) {
      //           return
      //         }
      //         this.fetchData()
      //       })
      //     } else {
      //       this.$baseMessage('未选中任何行', 'error', 'vab-hey-message-error')
      //     }
      //   }
      // },
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
        // } = await getSubjectList(this.form)
        // this.list = list
        // this.total = total
        // this.listLoading = false
      },
    },
  }
</script>
<style lang="scss" scoped></style>
