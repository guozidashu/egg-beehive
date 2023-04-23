<template>
  <div style="width: 100%">
    <!-- 卡片概览 -->
    <div style="padding: 20px; border-bottom: 20px solid #f6f8f9">
      <div style="display: flex; justify-content: space-between">
        <div style="font-size: 20px; font-weight: 600">客户概览</div>
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
            客户监控中心
          </div>
        </div>
      </div>
      <div style="margin: 20px 0">我监控的商品 &nbsp; {{ total }}</div>
      <div style="display: flex; justify-content: space-between">
        <div>
          <QYPopover
            v-model="form.level_id"
            :list="selectList.customer_grade"
            :name="'客户等级'"
          />
          <QYPopover
            v-model="form.type_id"
            :list="selectList.customer_type"
            :name="'客户类型'"
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
            <el-select
              v-model="form.sort_field.key"
              size="small"
              style="width: 150px"
            >
              <el-option label="按拿货金额" value="sale_amount" />
              <el-option label="按拿货件数" value="sale_num" />
              <el-option label="按拿货次数" value="sale_count" />
              <el-option label="按动销商品数" value="moving_goods_count" />
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
        <el-table-column label="客户信息" width="400">
          <template #default="{ row }">
            <div style="display: flex">
              <el-tooltip placement="top">
                <el-image
                  slot="content"
                  :src="row.customer_avatar"
                  style="width: 200px; height: 200px"
                >
                  <div slot="error" class="el-image__error">暂无图片</div>
                </el-image>
                <el-image
                  :src="row.customer_avatar"
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
                    {{ row.customer_name }}
                  </div>
                </div>
                <div style="margin: 5px 0 0 0">
                  {{ row.monitor_time | formatTimeData }}
                </div>
                <div style="display: flex; margin: 5px 0 0 0">
                  <el-tag type="info">{{ row.level_name }}</el-tag>
                  <el-tag type="info">{{ row.type_name }}</el-tag>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="排名变化" prop="goods_price">
          <template #default="{ row }">
            <el-tag>上期：{{ row.last_rank }}</el-tag>
            <el-tag>本期：{{ row.current_rank }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="动销商品数"
          prop="moving_goods_count"
        />
        <el-table-column align="center" label="拿货次数" prop="sale_count" />
        <el-table-column align="center" label="拿货件数" prop="sale_num" />
        <el-table-column align="center" label="拿货金额" prop="sale_amount">
          <template #default="{ row }">
            <el-tag>￥{{ row.sale_amount | moneyFormat }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="150">
          <template #default="{ row }">
            <el-button type="text" @click="Monitor(row.customer_id)">
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
          type_id: null, // 类型id
          level_id: null, // 等级id
          start_date: this.getPastTime(30)[0],
          end_date: this.getPastTime(30)[1],
          sort_field: {
            key: 'sale_num', // 按拿货金额 = sale_amount 按拿货件数 = sale_num 按拿货次数 = sale_count 按动销商品数 = moving_goods_count 按监控时间 = monitor_time
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
      // 监控客户
      async Monitor(id) {
        const { code } = await this.api.delCancellation({
          look_type: 1, // 监控类型 1=客户 2=商品
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
          type_id: null, // 类型id
          level_id: null, // 等级id
          start_date: this.getPastTime(30)[0],
          end_date: this.getPastTime(30)[1],
          sort_field: {
            key: 'sale_num', // 按拿货金额 = sale_amount 按拿货件数 = sale_num 按拿货次数 = sale_count 按动销商品数 = moving_goods_count 按监控时间 = monitor_time
            sort: 'desc',
          },
        }
      },
      // 获取下拉框数据
      async getTypeList() {
        const { data } = await this.api.getCommonAllList({
          type: 'customer_type,customer_grade',
        })
        this.selectList = data
      },
      handleCurrentChange(val) {
        this.form.page = val
      },
      handleSizeChange(val) {
        this.form.page_size = val
      },
      async getList() {
        this.state = true
        const { data } = await this.api.getMonitorCustomerList(this.form)
        this.tableData = data.list
        this.total = data.total
        this.state = false
      },
    },
  }
</script>
