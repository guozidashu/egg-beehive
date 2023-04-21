<template>
  <div style="width: 100%">
    <!-- 卡片概览 -->
    <div style="padding: 20px; border-bottom: 20px solid #f6f8f9">
      <div style="display: flex; justify-content: space-between">
        <div style="font-size: 20px; font-weight: 600">库存概览</div>
        <div style="">库存监控中心</div>
      </div>
      <div style="margin: 20px 0">
        我监控的商品 &nbsp; 12 &nbsp; 团队监控的商品 &nbsp; 61/100&nbsp;
        <el-button type="text">分组管理</el-button>
      </div>
      <div style="display: flex; justify-content: space-between">
        <div>
          <QYPopover
            v-model="form.brand1"
            :list="selectList.brand1"
            :name="'我的监控'"
          />
          <QYPopover
            v-model="form.category"
            :list="selectList.category"
            :name="'款式类目'"
          />
          <QYPopover
            v-model="form.brand"
            :list="selectList.brand"
            :name="'品牌'"
          />
          <QYPopover
            v-model="form.year"
            :list="selectList.year"
            :name="'年份'"
          />
          <QYPopover
            v-model="form.season"
            :list="selectList.season"
            :name="'季节'"
          />
          <QYPopover
            v-model="form.band"
            :list="selectList.band"
            :name="'上市波段'"
          />
          <QYPopover
            v-model="form.brand1"
            :list="selectList.brand1"
            :name="'更多筛选'"
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
            <el-select v-model="form.order" size="small" style="width: 150px">
              <el-option label="按库存数量" value="sum_num" />
              <el-option label="按生产中数量" value="sum_total" />
              <el-option label="按发货件数" value="count_customer" />
              <el-option label="按价格" value="sum_profit" />
              <el-option label="按上架时间" value="upper_time" />
            </el-select>
            <el-radio-group
              v-model="form.sort"
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
              v-model="form.sn"
              placeholder="按商品/客户名称搜索"
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
              @click="resetForm1('form')"
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
                  :src="row.img"
                  style="width: 200px; height: 200px"
                >
                  <div slot="error" class="el-image__error">暂无图片</div>
                </el-image>
                <el-image :src="row.img" style="width: 80px; height: 80px">
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
                    商品名称
                  </div>
                </div>
                <div style="margin: 5px 0 0 0">商品款号</div>
                <div
                  style="
                    display: flex;
                    justify-content: space-between;
                    margin: 5px 0 0 0;
                  "
                >
                  <div>销售价：￥30</div>
                  <div>2019-12-12 12:12:12 上架</div>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="总库存" prop="goods_price" />
        <el-table-column align="center" label="自有仓库存" prop="sale_num" />
        <el-table-column align="center" label="聚水潭实际库存" prop="stock" />
        <el-table-column align="center" label="代发货件数" prop="zsc_num" />
        <el-table-column align="center" label="生产中" prop="stock" />
        <el-table-column align="center" label="总销量" prop="zsc_num" />
        <el-table-column align="center" fixed="right" label="操作" width="150">
          <template #default="{ row }">
            <el-button v-if="row" type="text">详情</el-button>
            <el-button v-if="row" type="text">取消监控</el-button>
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
          year: null,
          type: null,
          brand: null,
          band: null,
          page: 1,
          page_size: 10,
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
    watch: {},
    created() {
      this.getTypeList()
    },
    methods: {
      // 获取下拉框数据
      async getTypeList() {
        const { data } = await this.api.getCommonAllList({
          type: 'brand,season,year,band,category,agegroup,size',
        })
        this.selectList = data
      },
      handleCurrentChange(val) {
        this.form.page = val
      },
      handleSizeChange(val) {
        this.form.page_size = val
      },
    },
  }
</script>
