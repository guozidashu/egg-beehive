<template>
  <div style="background-color: #f6f8f9">
    <div
      style="
        padding-top: 1px;
        margin-bottom: 20px;
        background-color: #ffffff;
        border-radius: 5px;
      "
    >
      <!-- 查询条件 -->
      <QYForm
        :form="form"
        :form-type="formType"
        @changeSearch="handleQuery"
        @resetForm="resetForm"
      >
        <template #Form>
          <el-form-item label="年份搜索：" prop="region">
            <el-input
              v-model="form.name"
              placeholder="请输入年份名称"
              size="small"
            />
          </el-form-item>
        </template>
      </QYForm>
    </div>
    <el-card shadow="never" style="border: 0; border-radius: 5px">
      <el-form ref="form" :inline="true" @submit.native.prevent>
        <el-form-item>
          <el-button
            v-has-permi="['btn:ArchivesYear:add']"
            size="small"
            type="primary"
            @click="handleEdit('add')"
          >
            添加年份
          </el-button>
        </el-form-item>
      </el-form>
      <!-- 列表 -->
      <QYList
        :list="list"
        :list-type="listType"
        :page-no="page"
        :page-size="pageSize"
        :state="listLoading"
        :total="total"
        @changePage="changeBtnPage"
        @changePageSize="changeBtnPageSize"
      >
        <template #List>
          <el-table-column type="selection" width="55" />
          <el-table-column label="ID" prop="id" width="80" />
          <el-table-column label="年份名称" prop="name" width="120" />
          <el-table-column label="使用商品" prop="count" />
          <el-table-column label="状态" prop="status" width="150">
            <template #default="{ row }">
              <el-tag v-if="row.status == 1">开启</el-tag>
              <el-tag v-else type="danger">关闭</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="排序" prop="sort" width="80" />
          <el-table-column label="创建时间" prop="create_time" />
          <el-table-column align="center" label="操作" width="85">
            <template #default="{ row }">
              <el-button
                v-has-permi="['btn:ArchivesYear:edit']"
                type="text"
                @click="handleEdit(row)"
              >
                编辑
              </el-button>
              <el-button
                v-has-permi="['btn:ArchivesYear:del']"
                type="text"
                @click="handleDelete(row)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </template>
      </QYList>
    </el-card>
    <!-- 新增编辑弹窗 -->
    <edit ref="edit" @fetch-data="fetchData" />
  </div>
</template>

<script>
  import Edit from '@/subview/components/Edit/YearEdit'
  export default {
    components: { Edit },
    data() {
      return {
        // 页数，条数，表单查询条件 ，表单组件和列表组件的类型，列表数据，列表加载状态，列表总数

        formTemp: null,
        pageState: 0,
        page: 1,
        pageSize: 20,
        form: {
          name: '',
          page: 1,
          pageSize: 20,
        },
        formType: 4,
        listType: 1,
        list: [],
        listLoading: false,
        total: 0,
      }
    },
    watch: {
      // 表单监听
      form: {
        handler: function (newVal) {
          this.formTemp = JSON.parse(JSON.stringify(newVal))
          if (this.pageState == 1) {
            this.formTemp.page = newVal.page
            this.formTemp.pageSize = newVal.pageSize
            this.page = newVal.page
            this.pageSize = newVal.pageSize
          } else if (this.pageState == 2) {
            this.formTemp.page = 1
            this.formTemp.pageSize = newVal.pageSize
            this.page = 1
            this.pageSize = newVal.pageSize
          } else if (this.pageState == 0) {
            this.formTemp.page = 1
            this.formTemp.pageSize = 20
            this.page = 1
            this.pageSize = 20
          }
          this.fetchData()
          this.pageState = 0
        },
        deep: true,
      },
    },
    created() {
      this.fetchData()
    },
    methods: {
      // 新增编辑弹窗
      handleEdit(row) {
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
      // 查询表单
      handleQuery() {
        this.fetchData()
      },
      // 重置表单
      resetForm() {
        this.form = this.$options.data().form
      },
      // 删除操作
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm(
            '你确定要删除当前年份吗?</br>删除后将无法恢复，请谨慎操作！',
            null,
            async () => {
              const { code } = await this.api.delYearDel({ id: row.id })
              if (code != 200) {
                return
              }
              this.$baseMessage(
                '删除成功',
                'success',
                'vab-hey-message-success'
              )
              this.fetchData()
            }
          )
        }
      },
      // 分页
      changeBtnPage(data) {
        this.pageState = 1
        this.form.page = data
      },
      // 分页条数
      changeBtnPageSize(data) {
        this.pageState = 2
        this.form.pageSize = data
      },
      fetchData() {
        this.$debounce(this.debounceFetchData, 500)
      },
      async debounceFetchData() {
        this.listLoading = true
        if (this.formTemp == null) {
          this.formTemp = JSON.parse(JSON.stringify(this.form))
        }
        const { data } = await this.api.getYearList(this.formTemp)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
    },
  }
</script>
