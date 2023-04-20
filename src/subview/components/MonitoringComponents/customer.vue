<template>
  <div style="width: 100%">
    <!-- 卡片概览 -->
    <div style="padding: 20px; border-bottom: 20px solid #f6f8f9">
      <div style="display: flex; justify-content: space-between">
        <div style="font-size: 20px; font-weight: 600">客户概览</div>
        <div style="">客户监控中心</div>
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
            v-model="form.customer_grade"
            :list="selectList.customer_grade"
            :name="'客户等级'"
          />
          <QYPopover
            v-model="form.brand1"
            :list="selectList.brand1"
            :name="'带货方式'"
          />
        </div>
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
              <el-option label="按拿货金额" value="sum_num" />
              <el-option label="按拿货件数" value="sum_total" />
              <el-option label="按拿货次数" value="count_customer" />
              <el-option label="按动销商品数" value="sum_profit" />
              <el-option label="按监控时间" value="upper_time" />
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
              @click="resetForm1('form')"
            >
              重置
            </el-button>
          </div>
        </div>
      </el-form>
      <el-table v-loading="state" :data="tableData">
        <el-table-column label="客户信息" width="400">
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
                <el-image
                  :src="row.img"
                  style="width: 80px; height: 80px; border-radius: 50%"
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
                    商品名称
                  </div>
                </div>
                <div style="margin: 5px 0 0 0">2019-12-12 12:12:12</div>
                <div style="display: flex; margin: 5px 0 0 0">
                  <el-tag type="info">会员等级</el-tag>
                  <el-tag type="info">客户分类</el-tag>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="排名变化" prop="goods_price" />
        <el-table-column align="center" label="拿货次数" prop="sale_num" />
        <el-table-column align="center" label="动销商品数" prop="stock" />
        <el-table-column align="center" label="拿货件数" prop="zsc_num" />
        <el-table-column align="center" label="拿货金额" prop="stock" />
        <el-table-column align="center" fixed="right" label="操作" width="150">
          <template #default="{ row }">
            <el-button v-if="row" type="text">取消监控</el-button>
            <el-button v-if="row" type="text">监控</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        :current-page="form.page"
        :layout="'total, sizes, prev, pager, next, jumper'"
        :page-size="form.page_size"
        :page-sizes="[10, 20, 30, 40, 100]"
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
          type: 'brand,customer_grade',
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
