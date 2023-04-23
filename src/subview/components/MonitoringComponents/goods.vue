<template>
  <div style="width: 100%">
    <!-- 卡片概览 -->
    <div style="padding: 20px; border-bottom: 20px solid #f6f8f9">
      <div style="display: flex; justify-content: space-between">
        <div style="font-size: 20px; font-weight: 600">商品概览</div>
        <div style="display: flex">
          <el-image
            src="https://oss.business.quanyu123.com//3fccb3d8cb3261a3e71895cd811a5798.png"
            style="width: 30px; height: 24px"
          />
          <div
            style="
              right: -20px;
              padding: 3px 10px 0 10px;
              font-weight: 600;
              color: white;
              background: -webkit-linear-gradient(left, #748fd1, #b5c1e5);
            "
          >
            商品监控中心
          </div>
        </div>
      </div>
      <div style="margin: 20px 0">我监控的商品 {{ total }}</div>
      <div style="display: flex; justify-content: space-between">
        <div>
          <QYPopover
            v-model="form.category_id"
            :list="selectList.category"
            :name="'款式类目'"
          />
          <QYPopover
            v-model="form.brand_id"
            :list="selectList.brand"
            :name="'品牌'"
          />
          <QYPopover
            v-model="form.year_id"
            :list="selectList.year"
            :name="'年份'"
          />
          <QYPopover
            v-model="form.season_id"
            :list="selectList.season"
            :name="'季节'"
          />
          <QYPopover
            v-model="form.band_id"
            :list="selectList.band"
            :name="'上市波段'"
          />
          <QYPopover
            v-model="form.type"
            :list="selectList.type"
            :name="'类型'"
          />
          <QYPopover
            v-model="form.gender"
            :list="selectList.gender"
            :name="'性别'"
          />
        </div>
        <el-button size="small" style="margin-left: 10px" type="primary">
          导出
        </el-button>
      </div>
    </div>
    <div style="padding: 20px">
      <el-form ref="form" label-width="80px" :model="form">
        <div
          style="
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
          "
        >
          <div style="display: flex">
            <el-select
              v-model="form.sort_field.key"
              size="small"
              style="width: 150px"
            >
              <el-option label="按销量" value="sale_num" />
              <el-option label="按销售额" value="sale_amount" />
              <el-option label="按拿货客户" value="sale_customer_count" />
              <el-option label="按价格" value="goods_price" />
              <el-option label="按上架时间" value="goods_upper_time" />
              <el-option label="按监控时间" value="monitor_time" />
            </el-select>
            <el-radio-group
              v-model="form.sort_field.sort"
              style="width: 120px; margin-left: 10px"
            >
              <el-radio-button label="asc">正序</el-radio-button>
              <el-radio-button label="desc">倒序</el-radio-button>
            </el-radio-group>
            <div style="margin-top: 10px">
              指标说明
              <el-popover placement="right" trigger="hover">
                <div style="font-size: 12px">测试</div>
                <vab-icon
                  slot="reference"
                  icon="question-line"
                  style="position: relative; top: -2px; font-size: 14px"
                />
              </el-popover>
            </div>
          </div>

          <div style="display: flex">
            <el-input
              v-model="form.keyword"
              placeholder="按关键词搜索"
              prefix-icon="el-icon-search"
              style="width: 150px; margin-right: 10px"
            />
            <el-date-picker
              v-model="form.order_time"
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
            <el-button
              size="small"
              style="margin-left: 10px"
              type="primary"
              @click="resetForm()"
            >
              重置
            </el-button>
          </div>
        </div>
      </el-form>
      <el-table v-loading="state" :data="tableData">
        <el-table-column label="信息" width="400">
          <template #default="{ row }">
            <div style="display: flex">
              <el-tooltip placement="top">
                <el-image
                  slot="content"
                  :src="row.goods_img"
                  style="width: 200px; height: 200px"
                >
                  <div slot="error" class="el-image__error">暂无图片</div>
                </el-image>
                <el-image
                  :src="row.goods_img"
                  style="width: 80px; height: 80px"
                >
                  <div slot="error" class="el-image__error">暂无图片</div>
                </el-image>
              </el-tooltip>
              <div style="width: 280px; margin-left: 10px">
                <div style="display: flex; justify-content: space-between">
                  <div
                    style="
                      width: 200px;
                      overflow: hidden;
                      font-size: 14px;
                      font-weight: 600;
                      text-align: left;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                    "
                  >
                    {{ row.goods_name }}
                  </div>
                </div>
                <div style="margin: 5px 0 0 0">{{ row.goods_sn }}</div>
                <div
                  style="
                    display: flex;
                    justify-content: space-between;
                    margin: 5px 0 0 0;
                  "
                >
                  <div>销售价：￥{{ row.goods_price }}</div>
                  <div>{{ row.monitor_time | formatTimeData }} 监控</div>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="总销量" prop="sale_num" />
        <el-table-column align="center" label="总销售额" prop="sale_amount">
          <template #default="{ row }">
            <el-tag>￥{{ row.sale_amount | moneyFormat }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="平均售价" prop="average_price">
          <template #default="{ row }">
            <el-tag>￥{{ row.average_price | moneyFormat }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="带货客户数"
          prop="sale_customer_count"
        />
        <el-table-column
          align="center"
          label="本期销量"
          prop="current_sale_num"
        />
        <el-table-column
          align="center"
          label="本期销售额"
          prop="current_sale_amount"
        >
          <template #default="{ row }">
            <el-tag>￥{{ row.current_sale_amount | moneyFormat }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="150">
          <template #default="{ row }">
            <el-button v-if="row" type="text" @click="handleDetail(row)">
              详情
            </el-button>
            <el-button v-if="row" type="text" @click="Monitor(row.goods_id)">
              取消监控
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        :current-page="form.page"
        :layout="'total, sizes, prev, pager, next, jumper'"
        :page-size="form.page_size"
        :page-sizes="[10, 20, 50, 100]"
        :total="total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>

<script>
  // 日期组件和日期方法混入
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    mixins: [datajosn],
    data() {
      return {
        // 下拉框数据
        selectList: {},
        form: {
          order_time: this.getPastTime(30),
          page: 1,
          page_size: 20,
          keyword: null,
          category_id: null, // 分类id
          band_id: null, // 波段id
          brand_id: null, // 品牌id
          type: null, // 类型 0=整首 1=散码
          gender: null, // 性别 1男2女3中
          season_id: null, // 季节id
          year_id: null, // 年份id
          start_date: this.getPastTime(30)[0],
          end_date: this.getPastTime(30)[1],
          sort_field: {
            key: 'sale_num', // 按销量 = sale_num 按销售额 = sale_amount 按拿货客户 = sale_customer_count 按价格 = goods_price 按上架时间 = goods_upper_time 按监控时间 = monitor_time
            sort: 'desc',
          },
        },

        // 列表
        tableData: [
          {
            time: '2020-01-01',
          },
        ],
        total: 0,
        state: false,
      }
    },
    watch: {
      form: {
        handler(newVal) {
          this.formTemp = JSON.parse(JSON.stringify(newVal))
          this.formTemp.start_date = this.formTemp.order_time[0]
          this.formTemp.end_date = this.formTemp.order_time[1]
          this.getList()
        },
        deep: true,
      },
    },
    created() {
      this.getTypeList()
      this.getList()
    },
    methods: {
      // 列表详情跳转商品分析
      handleDetail(row) {
        this.$router.push({
          path: '/report/reportGoods',
          query: {
            id: row.goods_id,
            type: 'reportGoods', // 从客户报表进入
          },
        })
      },
      // 监控商品
      async Monitor(id) {
        const { code } = await this.api.delCancellation({
          look_type: 2, // 监控类型 1=客户 2=商品
          look_id: id, // 客户id或者商品id
        })
        if (code == 200) {
          this.$baseMessage(
            '取消监控成功',
            'success',
            'vab-hey-message-success'
          )
          this.getList()
        }
      },
      resetForm() {
        this.form = {
          order_time: this.getPastTime(30),
          page: 1,
          page_size: 20,
          keyword: null,
          category_id: null, // 分类id
          band_id: null, // 波段id
          brand_id: null, // 品牌id
          type: null, // 类型 0=整首 1=散码
          gender: null, // 性别 1男2女3中
          season_id: null, // 季节id
          year_id: null, // 年份id
          start_date: this.getPastTime(30)[0],
          end_date: this.getPastTime(30)[1],
          sort_field: {
            key: 'sale_num', // 按销量 = sale_num 按销售额 = sale_amount 按拿货客户 = sale_customer_count 按价格 = goods_price 按上架时间 = goods_upper_time 按监控时间 = monitor_time
            sort: 'desc',
          },
        }
      },
      // 获取下拉框数据
      async getTypeList() {
        const { data } = await this.api.getCommonAllList({
          type: 'brand,season,year,band,category,agegroup,size',
        })
        this.selectList = data
        this.selectList.type = [
          {
            id: 0,
            name: '整首',
          },
          {
            id: 1,
            name: '散码',
          },
        ]
        this.selectList.gender = [
          {
            id: 1,
            name: '男',
          },
          {
            id: 2,
            name: '女',
          },
          {
            id: 3,
            name: '中',
          },
        ]
      },
      handleCurrentChange(val) {
        this.form.page = val
      },
      handleSizeChange(val) {
        this.form.page_size = val
      },
      async getList() {
        this.state = true
        const { data } = await this.api.getMonitorGoodsList(this.form)
        this.tableData = data.list
        this.total = data.total
        this.state = false
      },
    },
  }
</script>
