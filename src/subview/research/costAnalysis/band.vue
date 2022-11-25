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
          <el-form-item label="年份分类:">
            <el-select
              v-model="form.year_id"
              collapse-tags
              multiple
              size="small"
            >
              <el-option
                v-for="(item, index) in selectList.year"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="季节分类:">
            <el-select
              v-model="form.season_id"
              collapse-tags
              multiple
              size="small"
            >
              <el-option
                v-for="(item, index) in selectList.season"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="品牌分类:">
            <el-select
              v-model="form.brand_id"
              collapse-tags
              multiple
              size="small"
            >
              <el-option
                v-for="(item, index) in selectList.brand"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="日期筛选:">
            <el-date-picker
              v-model="form.date"
              align="left"
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
      </Form>
    </div>
    <el-card shadow="never" style="border: 0">
      <List :list="list" :list-type="listType" :state="listLoading">
        <template #List>
          <el-table-column
            align="center"
            label="波段名称"
            prop="band_name"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="波段成本"
            prop="band_cost"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="波段占比"
            prop="proportion"
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
  import { getBandCostAnalysis, getCommonAllList } from '@/api/basic'
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    name: 'CostAnalysisBand',
    components: { List, Form },
    mixins: [datajosn],
    data() {
      return {
        selectList: [],
        form: {
          date: ['', ''],
          brand_id: null, // 品牌id
          year_id: null, // 年份id
          season_id: null, // 季节id
        },
        formType: 4,
        listType: 2,
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
      async getTypeList() {
        const { data } = await getCommonAllList({
          type: 'brand,year,season',
        })
        this.selectList = data
      },
      async fetchData() {
        this.listLoading = true
        const { data } = await getBandCostAnalysis({
          start_date: this.form.date[0], // 开始时间
          end_date: this.form.date[1], // 结束时间
          brand_id: this.form.brand_id, // 品牌id
          year_id: this.form.year_id, // 年份id
          season_id: this.form.season_id, // 季节id
        })
        this.list = data
        this.listLoading = false
      },
    },
  }
</script>
<style lang="scss" scoped></style>
