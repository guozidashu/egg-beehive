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
              :clearable="false"
              :default-time="['00:00:00', '23:59:59']"
              end-placeholder="结束日期"
              format="yyyy-MM-dd"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              type="daterange"
              unlink-panels
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
        </template>
      </QYForm>
    </div>
    <!-- 列表 -->
    <el-card shadow="never" style="border: 0; border-radius: 5px">
      <QYList :list="list" :list-type="listType" :state="listLoading">
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
      </QYList>
    </el-card>
  </div>
</template>
<script>
  // 日期组件和方法混入
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    mixins: [datajosn],
    data() {
      return {
        // 下拉框数据 查询条件 表单类型，列表类型，列表数据，列表加载状态，列表总数
        selectList: [],
        form: {
          date: ['', ''],
          brand_id: null,
          year_id: null,
          season_id: null,
        },
        formType: 4,
        listType: 2,
        list: [],
        listLoading: false,
        total: 0,
      }
    },
    watch: {
      // 监听查询条件
      form: {
        handler: function () {
          this.fetchData()
        },
        deep: true,
      },
    },
    created() {
      this.getTypeList()
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
      // 获取下拉框数据
      async getTypeList() {
        const { data } = await this.api.getCommonAllList({
          type: 'brand,year,season',
        })
        this.selectList = data
      },
      fetchData() {
        this.$debounce(this.debounceFetchData, 500)
      },
      // 获取列表数据
      async debounceFetchData() {
        this.listLoading = true
        const { data } = await this.api.getBandCostAnalysis({
          start_date: this.form.date[0],
          end_date: this.form.date[1],
          brand_id: this.form.brand_id,
          year_id: this.form.year_id,
          season_id: this.form.season_id,
        })
        this.list = data
        this.listLoading = false
      },
    },
  }
</script>
