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
          <el-form-item label="季节搜索：" prop="region">
            <el-input
              v-model="form.name"
              placeholder="请输入季节搜索"
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
            v-has-permi="['btn:ArchivesSeasonal:add']"
            size="small"
            type="primary"
            @click="handleEdit('add')"
          >
            添加季节
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
          <el-table-column label="季节名称" prop="name" width="120" />
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
                v-has-permi="['btn:ArchivesSeasonal:edit']"
                type="text"
                @click="handleEdit(row)"
              >
                编辑
              </el-button>
              <el-button
                v-has-permi="['btn:ArchivesSeasonal:del']"
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
  import Edit from '@/subview/components/Edit/SeasonalEdit'
  export default {
    components: { Edit },
    data() {
      return {
        // 页数，条数，表单查询条件 ，表单组件和列表组件的类型，列表数据，列表加载状态，列表总数
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
        handler: function () {
          this.page = 1
          this.pageSize = 20
          this.fetchData()
        },
        deep: true,
      },
    },
    created() {
      this.fetchData()
    },
    methods: {
      // 新增编辑弹窗
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
            '你确定要删除当前季节吗?</br>删除后将无法恢复，请谨慎操作！',
            null,
            async () => {
              const { code } = await this.api.delSeasonDel({ id: row.id })
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
        this.page = data
        this.fetchData()
      },
      // 分页条数
      changeBtnPageSize(data) {
        this.pageSize = data
        this.page = 1
        this.fetchData()
      },
      fetchData() {
        this.$debounce(this.debounceFetchData, 500)
      },
      // 获取列表数据
      async debounceFetchData() {
        this.listLoading = true
        this.formTemp = JSON.parse(JSON.stringify(this.form))
        this.formTemp.page = this.page
        this.formTemp.pageSize = this.pageSize
        const { data } = await this.api.getSeasonList(this.formTemp)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
    },
  }
</script>
