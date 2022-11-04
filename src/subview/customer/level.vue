<template>
  <div style="background-color: #f6f8f9">
    <div
      style="padding-top: 1px; margin-bottom: 20px; background-color: #ffffff"
    >
      <Form :form="form" :form-type="formType" @changeSearch="handleQuery">
        <template #Form>
          <el-form-item label="等级名称" prop="region">
            <el-input
              v-model="form.name"
              placeholder="请输入等级名称"
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
            添加会员等级
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
      >
        <!-- 表格组件具名插槽 自定义表头 -->
        <template #List>
          <el-table-column type="selection" width="50px" />
          <el-table-column label="等级图标" prop="banner" width="150px">
            <template #default="{ row }">
              <img :src="row.icon" style="width: 100px; height: 100px" />
            </template>
          </el-table-column>
          <el-table-column label="等级名称" prop="name" width="150px" />
          <el-table-column label="客户数" prop="count" width="80px" />
          <el-table-column label="整手折扣" prop="discount" width="100px" />
          <el-table-column
            label="散码折扣"
            prop="discount_single"
            width="100px"
          />
          <el-table-column label="是否允许散批" prop="single_buy" width="150px">
            <template #default="{ row }">
              <el-switch
                v-model="row.single_buy"
                active-color="#41B584"
                active-text="开启"
                :active-value="1"
                class="switch"
                inactive-color="#D2D2D2"
                inactive-text="关闭"
                :inactive-value="0"
              />
            </template>
          </el-table-column>
          <el-table-column label="备注" prop="remark" />
          <el-table-column align="center" fixed="right" label="操作" width="85">
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
  import Edit from './components/LevelEdit'
  import Form from '@/subview/components/Form'
  import { getGradeList } from '@/api/basic'
  export default {
    name: 'ArchivesBand',
    components: { List, Edit, Form },
    data() {
      return {
        // 表单数据/列表参数
        form: {
          name: '',
          page: 1,
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
      async handleEdit(row) {
        if (row === 'add') {
          this.$refs['edit'].showEdit()
        } else {
          if (row.id) {
            this.$refs['edit'].showEdit(row)
          } else {
            this.$refs['edit'].showEdit()
          }
        }
      },
      // 查询
      handleQuery() {
        this.form.page = 1
      },
      // 删除
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm('你确定要删除当前项吗', null, async () => {
            // const { code } = await deleteGrade({ id: row.id })
            // if (code != 200) {
            //   return
            // }
            this.$baseMessage('删除成功', 'success', 'vab-hey-message-success')
            this.fetchData()
          })
        }
      },
      // 列表数据封装函数

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
        const { data } = await getGradeList(this.form)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
    },
  }
</script>
<style lang="scss" scoped></style>
