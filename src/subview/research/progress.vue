<template>
  <div style="background-color: #f6f8f9">
    <div
      style="padding-top: 1px; margin-bottom: 20px; background-color: #ffffff"
    >
      <Form
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
      </Form>
    </div>
    <el-card shadow="never" style="border: 0">
      <List
        :list="list"
        :list-type="listType"
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
            show-overflow-tooltip
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
      </List>
    </el-card>
  </div>
</template>
<script>
  import List from '@/subview/components/List'
  import Form from '@/subview/components/Form'
  import { getPlannedList, getCommonAllList } from '@/api/basic'
  export default {
    name: 'ProjectBandlist',
    components: { List, Form },
    data() {
      return {
        form: {
          page: 1,
          pageSize: 10,
          design_type: '', //1头版 2复色
          brand_id: '', //1品牌id
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
      form: {
        handler: function () {
          this.fetchData()
        },
        deep: true,
      },
    },
    created() {
      this.getTypeList()
      this.fetchData()
    },
    methods: {
      handleQuery() {
        this.fetchData()
      },
      resetForm() {
        this.form = this.$options.data().form
      },
      // 列表数据改变页数   公共部分
      changeBtnPage(data) {
        this.form.page = data
      },
      // 列表数据改变每页条数  公共部分
      changeBtnPageSize(data) {
        this.form.pageSize = data
      },
      async getTypeList() {
        const { data } = await getCommonAllList({
          type: 'brand',
        })
        this.selectList = data
      },
      // 列表数据请求函数 公共部分
      async fetchData() {
        this.listLoading = true
        const { data } = await getPlannedList(this.form)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
    },
  }
</script>
<style lang="scss" scoped></style>
