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
          <el-form-item label="品牌分类:">
            <el-select v-model="form.brand_id" size="small">
              <el-option
                v-for="(item, index) in selectList.brand"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="设计种类:">
            <el-select v-model="form.design_type" size="small">
              <el-option label="头版" :value="1" />
              <el-option label="复色" :value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="支付类型:">
            <el-select v-model="form.paytype" size="small">
              <el-option label="签单" :value="1" />
              <el-option label="现金" :value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="订单类型:">
            <el-select v-model="form.order_type" size="small">
              <el-option label="设计中" :value="1" />
              <el-option label="设计完成" :value="2" />
              <el-option label="制版中" :value="3" />
              <el-option label="制版完成" :value="4" />
              <el-option label="剪板中" :value="5" />
              <el-option label="剪板完成" :value="6" />
              <el-option label="样衣中" :value="7" />
              <el-option label="样衣完成" :value="8" />
              <el-option label="审核完成" :value="9" />
            </el-select>
          </el-form-item>
        </template>
      </QYForm>
    </div>
    <!-- 表格 -->
    <el-card shadow="never" style="border: 0; border-radius: 5px">
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
          <el-table-column
            align="center"
            label="名称"
            prop="designer_name"
            show-overflow-tooltip
            sortable
          />
          <el-table-column
            align="center"
            label="编号"
            prop="design_sn"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="创建时间"
            prop="designer_end_time"
            width="180"
          >
            <template #default="{ row }">
              {{ row.designer_end_time | formatTime }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="备注"
            prop="designer_remark"
            show-overflow-tooltip
          />
        </template>
      </QYList>
    </el-card>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        // 页数，条数，表单查询条件 ，下拉框数据，表单组件和列表组件的类型，列表数据，列表加载状态，列表总数
        formTemp: null,
        page: 1,
        pageSize: 10,
        form: {
          page: 1,
          pageSize: 10,
          design_type: '', //1头版 2复色
          brand_id: '',
          paytype: '', //1签单 2现金
          order_type: '', //1设计中 2设计完成 3制版中 4制版完成 5剪板中 6剪板完成 7样衣中 8样衣完成 9审核完成
        },
        selectList: [],
        formType: 4,
        listType: 1,
        list: [],
        listLoading: false,
        total: 0,
      }
    },
    watch: {
      // 监听表单变化
      form: {
        handler: function (newVal) {
          this.formTemp = JSON.parse(JSON.stringify(newVal))
          if (this.pageState) {
            this.formTemp.page = newVal.page
            this.formTemp.pageSize = newVal.pageSize
            this.page = newVal.page
            this.pageSize = newVal.pageSize
          } else {
            this.formTemp.page = 1
            this.formTemp.pageSize = 10
            this.page = 1
            this.pageSize = 10
          }
          this.fetchData()
          this.pageState = false
        },
        deep: true,
      },
    },
    created() {
      this.getTypeList()
      this.fetchData()
    },
    methods: {
      // 查询
      handleQuery() {
        this.fetchData()
      },
      // 重置
      resetForm() {
        this.form = this.$options.data().form
      },
      // 分页
      changeBtnPage(data) {
        this.pageState = true
        this.form.page = data
      },
      // 分页条数
      changeBtnPageSize(data) {
        this.pageState = true
        this.form.pageSize = data
      },
      // 获取下拉框数据
      async getTypeList() {
        const { data } = await this.api.getCommonAllList({
          type: 'brand',
        })
        this.selectList = data
      },
      // 获取列表数据
      async fetchData() {
        this.listLoading = true
        if (this.formTemp == null) {
          this.formTemp = JSON.parse(JSON.stringify(this.form))
        }
        const { data } = await this.api.getPlannedList(this.formTemp)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
    },
  }
</script>
