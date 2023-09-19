<template>
  <div style="background-color: #f6f8f9">
    <div style="padding: 20px; background-color: white; border-radius: 5px">
      <div style="margin: 0 0 20px 0; font-size: 16px">
        <span style="margin: 10px; font-size: 18px; font-weight: 600">
          商品SKC
          <span style="font-size: 12px; font-weight: 400; color: #515a6e">
            更新时间：{{ time }}(因为数据量巨大,所以每天零点更新)
          </span>
        </span>
      </div>
      <el-form ref="form" label-width="80px" :model="goodsForm">
        <el-form-item label="订单时间">
          <el-radio-group v-model="time">
            <el-radio-button label="今日" />
            <el-radio-button label="昨日" />
            <el-radio-button label="近7天" />
            <el-radio-button label="近15天" />
            <el-radio-button label="近30天" />
          </el-radio-group>
          <el-date-picker
            v-model="goodsForm.time"
            align="right"
            :clearable="false"
            :default-time="['00:00:00', '23:59:59']"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            style="margin-left: 10px"
            type="daterange"
            unlink-panels
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>
        <el-form-item label="商品特征">
          <QYPopover
            v-model="goodsForm.brand_id"
            :list="selectList.brand"
            :name="'品牌'"
          />
          <QYPopover
            v-model="goodsForm.year_id"
            :list="selectList.year"
            :name="'年份'"
          />
          <QYPopover
            v-model="goodsForm.season_id"
            :list="selectList.season"
            :name="'季节'"
          />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <el-checkbox v-model="goodsForm.not_jst">不含聚水潭</el-checkbox>
          <el-checkbox v-model="goodsForm.not_zsc">不含在生产库存</el-checkbox>
        </el-form-item>
      </el-form>
    </div>
    <div
      style="
        padding: 20px;
        margin: 20px 0;
        background-color: white;
        border-radius: 5px;
      "
    >
      <el-form ref="form" label-width="80px" :model="goodsForm">
        <div
          style="
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
          "
        >
          <div style="display: flex">
            <el-select
              v-model="goodsForm.sort"
              size="small"
              style="width: 150px"
            >
              <el-option label="按销量" value="xl" />
              <el-option label="按总销量" value="xl_total" />
            </el-select>
            <el-radio-group
              v-model="goodsForm.sortType"
              style="width: 120px; margin-left: 10px"
            >
              <el-radio-button label="asc">正序</el-radio-button>
              <el-radio-button label="desc">倒序</el-radio-button>
            </el-radio-group>
          </div>
          <el-button
            size="small"
            style="margin-left: 10px"
            type="primary"
            @click="resetForm('form')"
          >
            重置
          </el-button>
        </div>
      </el-form>
      <QYList
        :list="goosList"
        :list-type="listType"
        :page-no="page"
        :page-size="pageSize"
        :state="listLoading"
        :total="total"
        @changePage="changeBtnPage"
        @changePageSize="changeBtnPageSize"
      >
        <template #List>
          <el-table-column align="center" type="selection" width="40" />
          <el-table-column align="center" label="排行" type="index" width="60">
            <template slot-scope="scope">
              <QYRanking
                :index="scope.$index"
                :page="page"
                :page-size="pageSize"
                :type="2"
              />
            </template>
          </el-table-column>
          <el-table-column align="center" label="款号" prop="goods_sn" />
          <el-table-column align="center" label="颜色" prop="color_name" />
          <el-table-column align="center" label="销量" prop="xl" />
          <el-table-column
            align="center"
            label="当前库存"
            prop="reality_stock"
          />
          <el-table-column
            align="center"
            label="可售库存"
            prop="available_stock"
          />
          <el-table-column align="center" label="总销量" prop="xl_total" />
        </template>
      </QYList>
    </div>
  </div>
</template>

<script>
  // 日期组件和日期方法混入
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    name: 'GoodsStatistical',
    mixins: [datajosn],
    data() {
      return {
        time: '近30天',
        // 列表加载状态、列表组件的类型、列表数据、列表总数、表单查询条件、页数、条数
        listLoading: false,
        listType: 1,
        goosList: [],
        total: 0,
        page: 1,
        pageSize: 50,
        goodsForm: {
          time: this.getPastTime(29),
          page: 1,
          pageSize: 50,
          year_id: null,
          brand_id: null,
          season_id: null,
          sort: 'xl',
          sortType: 'desc',
          not_jst: true, // 不包含聚水潭 true=包含 false=不包含
          not_zsc: true, // 不包含再生产 true=包含 false=不包含
        },
        // 下拉框数据
        selectList: [],
      }
    },
    watch: {
      goodsForm: {
        handler: function () {
          this.page = 1
          this.pageSize = 50
          this.getTableList()
        },
        deep: true,
      },
      // 监听时间切换
      time: {
        handler: function (newVal) {
          // 按钮时间切换
          if (newVal == '今日') {
            this.goodsForm.time = this.getTodayTime()
          } else if (newVal == '昨日') {
            this.goodsForm.time = this.getYesterdayTime()
          } else if (newVal == '近7天') {
            this.goodsForm.time = this.getWeenTime()
          } else if (newVal == '近15天') {
            this.goodsForm.time = this.getPastTime(14)
          } else if (newVal == '近30天') {
            this.goodsForm.time = this.getPastTime(29)
          }
        },
        deep: true,
      },
    },
    created() {
      this.getTypeList()
      this.getTableList()
    },
    methods: {
      resetForm() {
        this.goodsForm = {
          time: this.getPastTime(29),
          page: 1,
          pageSize: 50,
          year_id: null,
          brand_id: null,
          season_id: null,
          sort: 'xl',
          sortType: 'desc',
          not_jst: true, // 不包含聚水潭 true=包含 false=不包含
          not_zsc: true, // 不包含再生产 true=包含 false=不包含
        }
      },
      // 分页
      changeBtnPage(data) {
        this.page = data
        this.getTableList()
      },
      // 分页条数
      changeBtnPageSize(data) {
        this.pageSize = data
        this.page = 1
        this.getTableList()
      },
      // 获取下拉框数据
      async getTypeList() {
        const { data } = await this.api.getCommonAllList({
          type: 'brand,season,year',
        })
        this.selectList = data
      },
      getTableList() {
        this.$debounce(this.debounceFetchData1, 500)
      },
      // 获取列表数据
      async debounceFetchData1() {
        this.listLoading = true
        this.formTemp = JSON.parse(JSON.stringify(this.goodsForm))
        this.formTemp.page = this.page
        this.formTemp.pageSize = this.pageSize
        this.formTemp.start_date = this.formTemp.time[0]
        this.formTemp.end_date = this.formTemp.time[1]
        const { data } = await this.api.getGoodsSkcRankList(this.formTemp)
        this.goosList = data.list
        this.total = data.count
        this.listLoading = false
      },
    },
  }
</script>
