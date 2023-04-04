<template>
  <div style="background-color: #f6f8f9">
    <!-- 顶部卡片 -->
    <el-row :gutter="20">
      <el-col :span="6">
        <div
          style="
            padding: 20px 20px 16px 20px;
            background-color: white;
            border-radius: 5px;
          "
        >
          <div
            style="
              position: relative;
              display: flex;
              justify-content: space-between;
              padding: 20px;
              font-weight: 600;
              color: white;
              background-color: #f79a29;
              border-radius: 5px;
            "
          >
            <div style="margin-top: 15px; font-size: 18px">未发货</div>
            <div style="margin-top: 15px">
              <div style="margin-bottom: 10px; font-size: 20px">
                {{ not_deliver_data[0].total }}
                <span style="font-size: 14px">单</span>
                {{ not_deliver_data[0].count }}
                <span style="font-size: 14px">件</span>
              </div>
            </div>
            <vab-icon
              icon="error-warning-line"
              style="position: absolute; top: 10px; right: 10px"
            />
          </div>
          <div
            style="display: flex; justify-content: space-between; margin: 12px"
          >
            <div>下单后>12h</div>
            <div v-if="not_deliver_data[0].h12total == 0">--</div>
            <div v-else>
              {{ not_deliver_data[0].h12total }}单{{
                not_deliver_data[0].h12count
              }}件
            </div>
          </div>
          <div
            style="display: flex; justify-content: space-between; margin: 12px"
          >
            <div>下单后>24h</div>
            <div v-if="not_deliver_data[0].h24total == 0">--</div>
            <div v-else>
              {{ not_deliver_data[0].h24total }}单{{
                not_deliver_data[0].h24count
              }}件
            </div>
          </div>
          <div
            style="display: flex; justify-content: space-between; margin: 12px"
          >
            <div>下单后>36h</div>
            <div v-if="not_deliver_data[0].h36total == 0">--</div>
            <div v-else>
              {{ not_deliver_data[0].h36total }}单{{
                not_deliver_data[0].h36count
              }}件
            </div>
          </div>
          <div
            style="display: flex; justify-content: space-between; margin: 12px"
          >
            <div>下单后>48h</div>
            <div v-if="not_deliver_data[0].h48total == 0">--</div>
            <div v-else>
              {{ not_deliver_data[0].h48total }}单{{
                not_deliver_data[0].h48count
              }}件
            </div>
          </div>
          <div
            style="display: flex; justify-content: space-between; margin: 12px"
          >
            <div>下单后>72h</div>
            <div v-if="not_deliver_data[0].h72total == 0">--</div>
            <div v-else>
              {{ not_deliver_data[0].h72total }}单{{
                not_deliver_data[0].h72count
              }}件
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="18">
        <el-row
          :gutter="20"
          style="
            padding: 20px 10px 20px 10px;
            margin-right: 1px;
            margin-left: 1px;
            background-color: white;
          "
        >
          <el-col v-for="(item, index) in cardList" :key="index" :span="8">
            <div style="border-radius: 5px">
              <div
                :style="{
                  position: 'relative',
                  padding: '20px',
                  fontWeight: '600',
                  color: '#6f2024',
                  backgroundColor: item.bgColor,
                  borderRadius: '5px',
                }"
              >
                <div style="font-size: 18px">
                  {{ item.name }}
                </div>
                <vab-icon
                  icon="error-warning-line"
                  style="position: absolute; top: 10px; right: 10px"
                />
              </div>
              <div style="margin: 22px; font-size: 14px">
                {{ item.content1 }} {{ item.total }}
              </div>
              <div style="margin: 22px; font-size: 14px">
                {{ item.content2 }} {{ item.count }}
              </div>
              <div style="margin: 22px; font-size: 14px">
                较昨日
                {{ item.yesterday_count }}&nbsp;
                <span
                  v-if="
                    item.count - item.yesterday_count >= 0 ||
                    item.count == 0 ||
                    item.yesterday_count == 0
                  "
                >
                  增长
                </span>
                <span v-else>减少</span>
                <span v-if="item.count == 0" style="color: red">0%</span>
                <span v-else-if="item.yesterday_count == 0" style="color: red">
                  100%
                </span>
                <span v-else>
                  <span
                    v-if="item.count - item.yesterday_count >= 0"
                    style="color: red"
                  >
                    {{
                      (((item.count - item.yesterday_count) /
                        item.yesterday_count) *
                        100)
                        | moneyFormat
                    }}%
                  </span>
                  <span v-else style="color: green">
                    -{{
                      (((item.count - item.yesterday_count) /
                        item.yesterday_count) *
                        100)
                        | moneyFormat
                    }}%
                  </span>
                </span>
              </div>
              <div style="margin: 22px; font-size: 14px">
                本月 {{ item.month_count }}&nbsp;较上月
                {{ item.yesterday_month_count }}&nbsp;
                <span
                  v-if="
                    item.month_count - item.yesterday_month_count >= 0 ||
                    item.month_count == 0 ||
                    item.yesterday_month_count == 0
                  "
                >
                  增长
                </span>
                <span v-else>减少</span>
                <span v-if="item.month_count == 0" style="color: red">0%</span>
                <span
                  v-else-if="item.yesterday_month_count == 0"
                  style="color: red"
                >
                  100%
                </span>
                <span v-else>
                  <span
                    v-if="item.month_count - item.yesterday_month_count >= 0"
                    style="color: red"
                  >
                    {{
                      (((item.month_count - item.yesterday_month_count) /
                        item.yesterday_month_count) *
                        100)
                        | moneyFormat
                    }}%
                  </span>
                  <span v-else style="color: green">
                    -{{
                      (((item.month_count - item.yesterday_month_count) /
                        item.yesterday_month_count) *
                        100)
                        | moneyFormat
                    }}%
                  </span>
                </span>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!-- 商品客户欠货排行 -->
    <div
      style="
        padding: 20px;
        margin-top: 20px;
        background-color: white;
        border-radius: 5px;
      "
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <div>
            <div style="margin-bottom: 20px; font-size: 16px">
              按商品欠货排行
            </div>
            <QYList
              :list="goodsDebtList"
              :list-type="2"
              :state="goodsDebtListLoading"
              style="height: 450px; overflow: auto"
            >
              <template #List>
                <el-table-column
                  align="center"
                  label="排行"
                  type="index"
                  width="50"
                >
                  <template slot-scope="scope">
                    <span
                      class="index_common"
                      :class="[
                        scope.$index + 1 == '1'
                          ? 'index_one'
                          : scope.$index + 1 == '2'
                          ? 'index_two'
                          : scope.$index + 1 == '3'
                          ? 'index_three'
                          : 'index_more',
                      ]"
                    >
                      {{ scope.$index + 1 }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column label="商品名称" prop="goods_name" />
                <el-table-column
                  align="center"
                  label="商品图片"
                  prop="goods_img"
                >
                  <template #default="{ row }">
                    <el-tooltip placement="top">
                      <el-image
                        slot="content"
                        :src="row.goods_img"
                        style="width: 200px; height: 200px"
                      />
                      <el-image
                        :src="row.goods_img"
                        style="width: 50px; height: 50px"
                      />
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column label="商品款号" prop="goods_sn" />
                <el-table-column align="center" label="订货件数" prop="num" />
                <el-table-column
                  align="center"
                  label="欠货件数"
                  prop="not_delivery_num"
                />
                <el-table-column
                  align="center"
                  label="欠货率"
                  prop="outage_rate"
                />
                <el-table-column align="center" label="操作" width="80">
                  <template #default="{ row }">
                    <el-button type="text" @click="handleInof(row)">
                      明细
                    </el-button>
                  </template>
                </el-table-column>
              </template>
            </QYList>
          </div>
        </el-col>
        <el-col :span="12">
          <div>
            <div style="margin-bottom: 20px; font-size: 16px">
              按客户欠货排行
            </div>
            <QYList
              :list="customerDebtList"
              :list-type="2"
              :state="customerDebListLoading"
              style="height: 450px; overflow: auto"
            >
              <template #List>
                <el-table-column
                  align="center"
                  label="排行"
                  type="index"
                  width="50"
                >
                  <template slot-scope="scope">
                    <span
                      class="index_common"
                      :class="[
                        scope.$index + 1 == '1'
                          ? 'index_one'
                          : scope.$index + 1 == '2'
                          ? 'index_two'
                          : scope.$index + 1 == '3'
                          ? 'index_three'
                          : 'index_more',
                      ]"
                    >
                      {{ scope.$index + 1 }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column label="客户名称" prop="customer_name" />
                <el-table-column label="订货件数" prop="num" />
                <el-table-column label="欠货件数" prop="not_delivery_num" />
                <el-table-column label="欠货率" prop="outage_rate" />
              </template>
            </QYList>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 欠货订单明细 -->
    <div
      style="
        padding: 20px;
        margin-top: 20px;
        background-color: white;
        border-radius: 5px;
      "
    >
      <el-form
        ref="form"
        :inline="true"
        label-width="80px"
        :model="form"
        style="display: flex; justify-content: space-between"
        @submit.native.prevent
      >
        <span style="margin-top: 10px; font-size: 16px">欠货订单明细</span>
        <el-form-item style="margin-right: 0">
          <el-form-item label="统计类型:" prop="type">
            <el-select v-model="form.type" size="small" style="width: 150px">
              <el-option
                v-for="(item, index) in statisticalTypeList"
                :key="index"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="会员等级:" prop="level_id">
            <el-select
              v-model="form.level_id"
              placeholder="请选择会员等级"
              style="width: 150px"
            >
              <el-option
                v-for="(item, index) in selectList.customer_grade"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="客户名称" prop="name">
            <el-input v-model="form.name" size="small" />
          </el-form-item>
          <el-form-item label="时间筛选:" prop="create_time">
            <el-date-picker
              v-model="form.create_time"
              align="right"
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
          </el-form-item>
        </el-form-item>
      </el-form>
      <QYList
        :list="goodsOwedList"
        :list-type="listType"
        :page-no="page"
        :page-size="pageSize"
        :state="listLoading"
        :total="listTotal"
        @changePage="changeBtnPage"
        @changePageSize="changeBtnPageSize"
      >
        <template #List>
          <el-table-column align="center" label="排行" type="index" width="50">
            <template slot-scope="scope">
              <span
                class="index_common"
                :class="[
                  scope.$index + 1 == '1'
                    ? 'index_one'
                    : scope.$index + 1 == '2'
                    ? 'index_two'
                    : scope.$index + 1 == '3'
                    ? 'index_three'
                    : 'index_more',
                ]"
              >
                {{ scope.$index + 1 }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="批次" prop="id" width="50" />
          <el-table-column label="客户名称" prop="name" />

          <el-table-column
            align="center"
            label="订货件数"
            prop="num"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="已发货"
            prop="delivery_num"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="待发货"
            prop="not_delivery_num"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="现货库存"
            prop="xh_total"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="生产中库存"
            prop="zsc_total"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="状态"
            prop="status_text"
            show-overflow-tooltip
          >
            <template #default="{ row }">
              <el-tag v-if="row.status_text == '部分发货'">
                {{ row.status_text }}
              </el-tag>
              <el-tag v-else type="danger">
                {{ row.status_text }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="欠货率"
            prop="outage_rate"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="欠货天数"
            prop="outage_day"
            show-overflow-tooltip
          />

          <el-table-column
            align="center"
            label="订单创建时间"
            prop="ctime"
            show-overflow-tooltip
          />
        </template>
      </QYList>
    </div>
    <edit ref="edit" @fetch-data="fetchData" />
  </div>
</template>

<script>
  import Edit from '@/subview/components/Edit/BoardEidt'
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    components: { Edit },
    mixins: [datajosn],
    data() {
      return {
        // 欠货明细 查询条件 统计类型
        statisticalTypeList: [
          {
            name: '总数量',
            value: 1,
          },
          {
            name: '已发数量',
            value: 2,
          },
          {
            name: '现货库存',
            value: 3,
          },
          {
            name: '生产中库存',
            value: 4,
          },
          {
            name: '待发数量',
            value: 5,
          },
        ],
        // 头部卡片 未发货数据
        not_deliver_data: [
          {
            total: null,
            count: null,
            h12total: null,
            h12count: null,
            h24total: null,
            h24count: null,
            h36total: null,
            h36count: null,
            h48total: null,
            h48count: null,
            h72total: null,
            h72count: null,
          },
        ],
        // 头部卡片 其余数据
        cardList: [
          {
            name: '已发货',
            content1: '发货单数',
            content2: '发货件数',
            total: 0,
            count: 0,
            yesterday_count: 0,
            month_count: 0,
            yesterday_month_count: 0,
            bgColor: '#FFF4F6',
          },
          {
            name: '入库',
            content1: '入库单数',
            content2: '入库件数',
            total: 0,
            count: 0,
            yesterday_count: 0,
            month_count: 0,
            yesterday_month_count: 0,
            bgColor: '#EEF5FE',
          },
          {
            name: '销售单',
            content1: '订单数',
            content2: '订单件数',
            total: 0,
            count: 0,
            yesterday_count: 0,
            month_count: 0,
            yesterday_month_count: 0,
            bgColor: '#D8EFE5',
          },
        ],
        // 查询，分页表格处理相关参数
        formTemp: null,
        page: 1,
        pageSize: 10,
        // 查询条件表单
        form: {
          page: 1,
          pageSize: 20,
          name: null,
          create_time: this.getPastTime(30),
          level_id: null,
          type: null, // 统计类型 1=总数量 2=已发数量 3=现货库存 4=生产中库存 5=待发数量 默认订单创建时间
        },
        // 欠货明细 下拉框数据
        selectList: [],
        // 欠货明细 表格数据
        listTotal: 0,
        listLoading: false,
        listType: 1,
        goodsOwedList: [],
        // 商品欠货 表格数据
        goodsDebtListLoading: false,
        goodsDebtList: [],
        // 客户欠货 表格数据
        customerDebListLoading: false,
        customerDebtList: [],
      }
    },
    watch: {
      // 欠货查询表单监听
      form: {
        handler: function (newVal) {
          this.formTemp = JSON.parse(JSON.stringify(newVal))
          if (this.pageState) {
            this.formTemp.page = newVal.page
            this.formTemp.pageSize = newVal.pageSize
            this.page = newVal.page
            this.pageSize = newVal.pageSize
          } else {
            this.formTemp.page = 1
            this.formTemp.pageSize = 10
            this.page = 1
            this.pageSize = 10
          }
          this.getGoodsOwedTableList()
          this.pageState = false
        },
        deep: true,
      },
    },
    created() {
      this.getTypeList()
      this.getGoodsOwedTableList()
      this.getGoodsDebTableList()
      this.getCustomerDebTableList()
      this.fetchData()
    },
    methods: {
      handleInof(row) {
        this.$refs['edit'].showEdit(row)
      },
      // 欠货明细表格切换页数
      changeBtnPage(data) {
        this.pageState = true
        this.form.page = data
      },
      // 欠货明细表格切换条数
      changeBtnPageSize(data) {
        this.pageState = true
        this.form.pageSize = data
      },
      // 欠货明细 查询表单重置
      resetForm() {
        this.form = {
          page: 1,
          pageSize: 20,
          name: null,
          create_time: this.getPastTime(30),
          level_id: null,
          type: null, // 统计类型 1=总数量 2=已发数量 3=现货库存 4=生产中库存 5=待发数量 默认订单创建时间
        }
      },
      // 欠货明细 查询表单 会员等级下拉框
      async getTypeList() {
        const { data } = await this.api.getCommonAllList({
          type: 'customer_grade',
        })
        this.selectList = data
      },
      // 获取欠货明细表格
      async getGoodsOwedTableList() {
        this.listLoading = true
        if (this.formTemp == null) {
          this.formTemp = JSON.parse(JSON.stringify(this.form))
        }
        const { data } = await this.api.getWarehouseAnalysisList(this.formTemp)
        this.goodsOwedList = data.data
        this.listTotal = data.total
        this.listLoading = false
      },
      // 获取商品欠货表格
      async getGoodsDebTableList() {
        this.goodsDebtListLoading = true
        const { data } = await this.api.getWarehouseAnalysisGoodsRank(this.form)
        this.goodsDebtList = data
        this.goodsDebtListLoading = false
      },
      // 获取客户欠货表格
      async getCustomerDebTableList() {
        this.customerDebListLoading = true
        const { data } = await this.api.getWarehouseAnalysisCustomerRank(
          this.form
        )
        this.customerDebtList = data
        this.customerDebListLoading = false
      },
      // 获取头部数据
      async fetchData() {
        const { data } = await this.api.getWarehouseAnalysisHeadData()
        let arr = data
        arr.already_deliver_data.name = '已发货'
        arr.already_deliver_data.content1 = '发货单数'
        arr.already_deliver_data.content2 = '发货件数'
        arr.inbound_data.name = '入库'
        arr.inbound_data.content1 = '入库单数'
        arr.inbound_data.content2 = '入库件数'
        arr.sale_data.name = '销售单'
        arr.sale_data.content1 = '订单数'
        arr.sale_data.content2 = '订单件数'
        arr.already_deliver_data.bgColor = '#FFF4F6'
        arr.inbound_data.bgColor = '#EEF5FE'
        arr.sale_data.bgColor = '#D8EFE5'
        this.not_deliver_data[0] = data.not_deliver_data
        this.cardList[0] = data.already_deliver_data
        this.cardList[1] = data.inbound_data
        this.cardList[2] = data.sale_data
      },
    },
  }
</script>
