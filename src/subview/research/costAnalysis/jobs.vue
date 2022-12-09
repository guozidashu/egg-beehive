<template>
  <div style="background-color: #f6f8f9">
    <div
      style="padding-top: 1px; margin-bottom: 20px; background-color: #ffffff"
    >
      <QYForm
        :form="form"
        :form-type="formType"
        @changeSearch="handleQuery"
        @resetForm="resetForm"
      >
        <template #Form>
          <el-form-item label="日期筛选:">
            <el-date-picker
              v-model="form.date"
              align="left"
              :clearable="false"
              :default-time="['00:00:00', '23:59:59']"
              end-placeholder="结束日期"
              format="yyyy-MM-dd"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              type="daterange"
              unlink-panels
            />
          </el-form-item>
        </template>
      </QYForm>
    </div>
    <el-card shadow="never" style="border: 0">
      <QYList :list="list" :list-type="listType" :state="listLoading">
        <template #List>
          <el-table-column
            align="center"
            label="岗位名称"
            prop="user_name"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="用户数量"
            prop="user_total"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="用户成本"
            prop="user_cost"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="用户占比"
            prop="proportion"
            show-overflow-tooltip
          />
        </template>
      </QYList>
    </el-card>
  </div>
</template>
<script>
  import { getPositionCostAnalysis, getCommonAllList } from '@/api/basic'
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    name: 'CostAnalysisJobs',
    mixins: [datajosn],
    data() {
      return {
        selectList: [],
        form: {
          date: ['', ''],
        },
        formType: 4,
        listType: 2,
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
      async getTypeList() {
        const { data } = await getCommonAllList({
          type: 'brand,year,season',
        })
        this.selectList = data
      },
      async fetchData() {
        this.listLoading = true
        const { data } = await getPositionCostAnalysis({
          start_date: this.form.date[0], // 开始时间
          end_date: this.form.date[1], // 结束时间
        })
        this.list = data
        this.listLoading = false
      },
    },
  }
</script>
<style lang="scss" scoped></style>
