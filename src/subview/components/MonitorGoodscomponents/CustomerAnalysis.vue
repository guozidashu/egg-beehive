<template>
  <div style="width: 100%">
    <div style="padding: 20px; font-size: 26px">
      <span>合作客户</span>
      <span style="margin-left: 20px">合作渠道</span>
    </div>
    <div style="padding: 20px; border-bottom: 20px solid #f6f8f9">
      <el-row :gutter="20">
        <el-col :span="6">
          <div style="margin-top: 10px">
            合作客户数
            <el-popover placement="right" trigger="hover">
              <div style="font-size: 12px">测试</div>
              <vab-icon
                slot="reference"
                icon="question-line"
                style="position: relative; top: -2px; font-size: 14px"
              />
            </el-popover>
          </div>
          <div style="display: flex; margin-top: 50px">
            <div style="font-size: 32px">{{ cooperate_customer_num }}</div>
            <div style="margin-top: 15px; margin-left: 10px">位</div>
          </div>
        </el-col>
        <el-col :span="18">
          <div style="margin-top: 10px">监控热销客户</div>
          <div style="display: flex; margin-top: 20px">
            <div
              v-for="(item, index) in recommended_monitoring_customer"
              :key="index"
              style="display: flex; width: 33%"
            >
              <el-image
                :src="item.customer_avatar"
                style="width: 80px; height: 80px"
              >
                <div slot="error" class="el-image__error">暂无图片</div>
              </el-image>
              <div style="margin-left: 10px">
                <div style="margin: 5px 0 0 0">{{ item.customer_name }}</div>
                <div style="margin: 10px 0 0 0; color: gray">
                  {{ item.level_name }}&nbsp;|&nbsp;{{ item.type_name }}
                </div>
                <div style="margin: 10px 0 0 0; color: gray">
                  加入时间&nbsp;{{ item.customer_monitor_time }}
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div
      style="
        display: flex;
        justify-content: space-between;
        padding: 10px 20px;
        border: 1px solid #f6f8f9;
      "
    >
      <div style="margin-top: 10px">合作客户列表</div>
      <el-date-picker
        v-model="form.time"
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
    </div>
    <div
      style="
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        margin-left: 20px;
      "
    >
      <div style="display: flex">
        <QYPopover
          v-model="form.customer_grade"
          :list="selectList.customer_grade"
          :name="'客户等级'"
        />
        <QYPopover
          v-model="form.customer_type"
          :list="selectList.customer_type"
          :name="'客户分类'"
        />
      </div>
      <div>
        <el-input
          v-model="form.keyword"
          placeholder="请输入商品款号/客户名称/客户手机号"
          style="width: 215px"
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
    <div style="padding: 0 20px 20px 20px">
      <el-table v-loading="state" :data="tableData" @sort-change="sortChange">
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
                  style="width: 80px; height: 80px"
                >
                  <div slot="error" class="el-image__error">暂无图片</div>
                </el-image>
              </el-tooltip>
              <div style="width: 280px; margin-left: 10px">
                <div style="margin: 10px 0 0 0">{{ row.customer_name }}</div>
                <div style="margin: 10px 0 0 0; color: gray">
                  {{ row.customer_level_name }}
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="拿货次数"
          prop="sale_order_num"
        />
        <el-table-column
          align="center"
          label="拿货件数"
          prop="sale_num"
          sortable="true"
        />
        <el-table-column align="center" label="拿货金额" prop="sale_amount" />
        <el-table-column
          align="center"
          label="加入时间"
          prop="customer_create_time"
          sortable="true"
        >
          <template #default="{ row }">
            {{ row.customer_create_time | formatTime }}
          </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="150">
          <template #default="{ row }">
            <el-button
              v-if="row.monitor_status == 0"
              type="text"
              @click="Monitor(row.customer_id, 1)"
            >
              监控客户
            </el-button>
            <el-button
              v-if="row.monitor_status == 1"
              type="text"
              @click="Monitor(row.customer_id, 2)"
            >
              取消监控
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        :current-page="page"
        :layout="'total, sizes, prev, pager, next, jumper'"
        :page-size="page_size"
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
    props: {
      goodsId: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return {
        // 推荐监控客户
        recommended_monitoring_customer: [],
        // 合作客户数
        cooperate_customer_num: 0,
        selectList: [],
        // 列表查询条件
        page: 1,
        page_size: 20,
        form: {
          time: this.getPastTime(29), // 开始日期
          page: 1,
          page_size: 20,
          goods_id: this.goodsId, // 商品id
          customer_grade: null, // 客户等级
          customer_type: null, // 客户分类
          start_date: this.getPastTime(29)[0], // 开始日期
          end_date: this.getPastTime(29)[1], // 结束日期
          keyword: '', // 关键字搜索
          sort_field: {
            key: 'sale_num', // 拿货数量 = sale_num 最新合作 = customer_create_time
            sort: 'asc',
          },
        },
        tableData: [],
        total: 0,
        state: false,
      }
    },
    watch: {
      form: {
        handler: function () {
          this.page = 1
          this.page_size = 20
          this.getList()
        },
        deep: true,
      },
    },
    created() {
      this.getTypeList()
      this.get_recommended_monitoring_customer()
      this.getHead()
      this.getList()
    },
    methods: {
      // 获取监控客户
      async get_recommended_monitoring_customer() {
        const { data } = await this.api.getHomeRecommendMonitorCustomer()
        this.recommended_monitoring_customer = data.slice(0, 3)
      },
      // 获取头部数据
      async getHead() {
        const { data } = await this.api.getMonitorCooperateCustomerHead({
          goods_id: this.goodsId, // 商品id
        })
        this.cooperate_customer_num = data.cooperate_customer_num
      },
      // 获取下拉框数据 假数据
      async getTypeList() {
        const { data } = await this.api.getCommonAllList({
          type: 'customer_grade,customer_type',
        })
        this.selectList = data
      },
      handleCurrentChange(val) {
        this.page = val
        this.getList()
      },
      handleSizeChange(val) {
        this.page_size = val
        this.page = 1
        this.getList()
      },
      resetForm() {
        this.form = {
          page: 1,
          page_size: 20,
          goods_id: 710, // 商品id
          customer_grade: null, // 客户等级
          customer_type: null, // 客户分类
          start_date: this.getPastTime(29)[0], // 开始日期
          end_date: this.getPastTime(29)[1], // 结束日期
          time: this.getPastTime(29), // 开始日期
          keyword: '', // 关键字搜索
          sort_field: {
            key: 'sale_num', // 拿货数量 = sale_num 最新合作 = customer_create_time
            sort: 'asc',
          },
        }
      },
      // 排序类型
      sortChange(column) {
        if (column) {
          if (column.order === 'ascending') {
            this.form.sort_field.key = column.prop
            this.form.sort_field.sort = 'asc'
          } else if (column.order === 'descending') {
            this.form.sort_field.key = column.prop
            this.form.sort_field.sort = 'desc'
          }
          this.getList()
        }
      },
      getList() {
        this.$debounce(this.debounceFetchData, 500)
      },
      // 获取列表数据
      async debounceFetchData() {
        this.state = true
        this.formTemp = JSON.parse(JSON.stringify(this.form))
        this.formTemp.page = this.page
        this.formTemp.page_size = this.page_size
        this.formTemp.start_date = this.formTemp.time[0]
        this.formTemp.end_date = this.formTemp.time[1]
        const { data } = await this.api.getMonitorCooperateCustomerList(
          this.formTemp
        )
        this.total = data.total
        this.tableData = data.list
        this.state = false
      },
      // 监控客户
      async Monitor(id, type) {
        if (type == 1) {
          const { code } = await this.api.editMonitorAdd({
            look_type: 1, // 监控类型 1=客户 2=商品
            look_id: id, // 客户id或者商品id
          })
          if (code == 200) {
            this.$baseMessage('监控成功', 'success', 'vab-hey-message-success')
            this.getList()
          }
        } else if (type == 2) {
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
        }
      },
    },
  }
</script>
