<template>
  <div style="background-color: #f6f8f9">
    <div
      style="
        padding-top: 1px;
        padding-bottom: 10px;
        padding-left: 20px;
        margin-bottom: 20px;
        background-color: #ffffff;
        border-radius: 5px;
      "
    >
      <!-- 顶部查询条件 -->
      <el-form
        ref="form"
        :inline="true"
        label-width="80px"
        :model="goodsForm"
        style="
          position: relative;
          top: 20px;
          display: flex;
          justify-content: space-between;
        "
        @submit.native.prevent
      >
        <el-form-item>
          <div style="font-size: 16px">客户分析</div>
        </el-form-item>
        <el-form-item>
          <el-form-item
            label="时间筛选:"
            style="margin-right: 0; font-size: 12px"
          >
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
    </div>
    <!-- 顶部卡片 -->
    <el-row :gutter="20" style="padding: 0 10px 0 10px">
      <TextTags :list="textTagList" />
    </el-row>
    <!-- 地图 / rfm ,等级 饼图 -->
    <el-row :gutter="20" style="padding: 0 10px 0 10px">
      <el-col :span="10" style="padding-left: 0">
        <div style="padding: 20px; background-color: white; border-radius: 5px">
          <QYChinaMap
            :list="chainList"
            :map-type="mapType"
            style="width: 100%%"
            :title="mapTitle"
          />
        </div>
      </el-col>
      <el-col :span="7">
        <div style="padding: 20px; background-color: white; border-radius: 5px">
          <QYBranchTooltip
            :list="branchList1"
            :style-chart="styleObj1"
            :title="branchTitle1"
          />
        </div>
      </el-col>
      <el-col :span="7" style="padding-right: 0">
        <div style="padding: 20px; background-color: white; border-radius: 5px">
          <QYBranch
            :list="branchList"
            :style-chart="styleObj"
            :title="branchTitle"
          />
        </div>
      </el-col>
    </el-row>
    <!-- 客户销售查询条件/排行列表 -->
    <el-row :gutter="20" style="padding: 0 10px 0 10px">
      <div
        style="
          padding: 20px;
          margin-top: 20px;
          background-color: white;
          border-radius: 5px;
        "
      >
        <div style="margin: 0 0 20px 0; font-size: 16px">客户销售排行</div>
        <el-form ref="form" label-width="80px" :model="goodsForm1">
          <el-form-item label="统计时间">
            <el-radio-group v-model="time">
              <el-radio-button label="昨日" />
              <el-radio-button label="近3天" />
              <el-radio-button label="近7天" />
              <el-radio-button label="近15天" />
              <el-radio-button label="近30天" />
            </el-radio-group>
            <el-date-picker
              v-model="goodsForm1.time"
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
          <el-form-item label="客户等级">
            <el-radio-group v-model="goodsForm1.level" size="mini">
              <el-radio-button
                v-for="(item, index) in selectList.customer_grade"
                :key="index"
                :label="item.id"
              >
                {{ item.name }}
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="客户分类">
            <el-radio-group v-model="goodsForm1.customer_type" size="mini">
              <el-radio-button
                v-for="(item, index) in selectList.customer_type"
                :key="index"
                :label="item.id"
              >
                {{ item.name }}
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="更多筛选">
            <div style="display: flex">
              <QYPopover
                v-model="goodsForm1.customer_source"
                :list="selectList.customer_source"
                :name="'客户来源'"
              />
              <QYPopover
                v-model="goodsForm1.employee"
                :list="employeeList"
                :name="'服务人员'"
              />
              <QYPopoverPrice
                v-model="goodsForm1.price"
                :list="selectList.price"
                :name="'销售额区间'"
              />
              <QYPopover
                v-model="goodsForm1.online"
                :list="selectList.online"
                :name="'销售渠道'"
              />
              <el-checkbox
                v-model="goodsForm1.is_return"
                style="margin: 0 10px"
              >
                不看终止合作的
              </el-checkbox>
              <div>
                | &nbsp; 指标说明
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
        <el-form ref="form" label-width="80px" :model="goodsForm1">
          <div
            style="
              display: flex;
              justify-content: space-between;
              margin-bottom: 20px;
            "
          >
            <div style="display: flex">
              <el-select
                v-model="goodsForm1.order"
                size="small"
                style="width: 150px"
              >
                <el-option label="按拿货金额" value="sum_final_amount" />
                <el-option label="按拿货次数" value="sale_count" />
                <el-option label="按拿货件数" value="sale_num" />
                <el-option label="按商品成本" value="cost_price" />
                <el-option label="按预计毛利额" value="gross_profit" />
                <el-option label="按客户回款" value="voucher_amount" />
                <el-option label="按期末余额" value="sale_arrears" />
                <el-option label="按动销商品数" value="goods_style_num" />
                <el-option label="按动销售额占比" value="final_rate" />
              </el-select>
              <el-radio-group
                v-model="goodsForm1.sort"
                style="width: 120px; margin-left: 10px"
              >
                <el-radio-button label="asc">正序</el-radio-button>
                <el-radio-button label="desc">倒序</el-radio-button>
              </el-radio-group>
            </div>
            <div style="display: flex">
              <el-input
                v-model="goodsForm1.customer_name"
                placeholder="按客户名称搜索"
                prefix-icon="el-icon-search"
                style="width: 150px; margin-right: 10px"
              />
              <el-button
                size="small"
                style="margin-left: 10px"
                type="primary"
                @click="handleDerive()"
              >
                导出
              </el-button>
              <el-button
                size="small"
                style="margin-left: 10px"
                type="primary"
                @click="resetForm1()"
              >
                重置
              </el-button>
            </div>
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
          @selectRows="handleSelectionChange"
        >
          <template #List>
            <el-table-column align="center" type="selection" width="40" />
            <el-table-column
              align="center"
              label="排行"
              type="index"
              width="60"
            >
              <template slot-scope="scope">
                <span
                  v-if="page == 1"
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
                <span v-else class="index_more index_common">
                  {{ 10 * (page - 1) + scope.$index + 1 }}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="客户信息" width="280">
              <template #default="{ row }">
                <div style="display: flex">
                  <el-tooltip placement="top">
                    <el-image
                      slot="content"
                      :src="row.avatar"
                      style="width: 200px; height: 200px"
                    />
                    <el-image
                      :src="row.avatar"
                      style="width: 105px; height: 105px"
                    />
                  </el-tooltip>
                  <div style="margin-left: 10px">
                    <div
                      style="
                        width: 150px;
                        overflow: hidden;
                        font-weight: 600;
                        text-align: left;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                      "
                    >
                      {{ row.customer_name }}
                    </div>
                    <div style="margin: 5px 0 0 0; text-align: left">
                      {{ row.mobile }}
                    </div>
                    <div style="width: 100%; margin: 5px 0 0 0">
                      <el-tag type="info">
                        {{ row.level_name }}
                      </el-tag>

                      <el-tag type="info">{{ row.type_name }}</el-tag>
                    </div>
                    <div style="margin: 5px 0 0 0; text-align: left">
                      {{ row.create_time }}
                    </div>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="拿货次数"
              prop="sale_count"
            />
            <el-table-column align="center" label="拿货件数" prop="sale_num" />
            <el-table-column
              align="center"
              label="拿货金额"
              prop="sum_final_amount"
            >
              <template #default="{ row }">
                <el-tag>￥{{ row.sum_final_amount | moneyFormat }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              v-if="$permissionFiltering('ReportCustomer', 'cost')"
              align="center"
              label="商品成本"
              prop="cost_price"
            >
              <template #default="{ row }">
                <el-tag>￥{{ row.cost_price | moneyFormat }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              v-if="$permissionFiltering('ReportCustomer', 'profit')"
              align="center"
              label="预计毛利额"
              prop="gross_profit"
            >
              <template #default="{ row }">
                <el-tag>￥{{ row.gross_profit | moneyFormat }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              v-if="$permissionFiltering('ReportCustomer', 'payment')"
              align="center"
              label="客户回款"
              prop="voucher_amount"
            >
              <template #default="{ row }">
                <el-tag>￥{{ row.voucher_amount | moneyFormat }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              v-if="$permissionFiltering('ReportCustomer', 'arrears')"
              align="center"
              label="期末余额/欠款"
            >
              <template #default="{ row }">
                <el-tag v-if="row.sale_arrears >= 0">
                  ￥{{ row.sale_arrears | moneyFormat }}
                </el-tag>
                <el-tag v-else type="danger">
                  -￥{{ row.sale_arrears | moneyFormat }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="动销商品数"
              prop="goods_style_num"
            />
            <el-table-column
              align="center"
              label="销售额占比"
              prop="final_rate"
            >
              <template #default="{ row }">{{ row.final_rate }}%</template>
            </el-table-column>
            <el-table-column
              align="center"
              label="最近一次消费时间"
              prop="last_order_time"
              width="180"
            />
            <el-table-column
              align="center"
              fixed="right"
              label="操作"
              width="100"
            >
              <template #default="{ row }">
                <el-button type="text" @click="handleDetail(row)">
                  客户分析
                </el-button>
                <!-- <el-button type="text" @click="handleDetail(row)">
                  监控客户
                </el-button> -->
              </template>
            </el-table-column>
          </template>
        </QYList>
      </div>
    </el-row>
  </div>
</template>

<script>
  import TextTags from '@/subview/components/Text/TextTags'
  // 日期组件和日期方法混入
  import datajosn from '@/assets/assets_josn/datajosn'
  // 地图数据混入
  import mapjson from '@/assets/assets_josn/mapjson'
  export default {
    name: 'CustomerStatistical',
    components: { TextTags },
    mixins: [datajosn, mapjson],
    data() {
      return {
        // 选中的行
        selectRowsId: [],
        time: '近30天',
        // 列表 查询表单
        goodsForm1: {
          // price: null,
          online: null,
          brand: null, //品牌
          level: 0, //客户等级
          customer_type: 0, //客户分类
          customer_source: null, //客户来源
          employee: null, //服务人员
          is_return: true, //不看终止合作
          customer_name: null, //客户名称搜索
          order: 'sum_final_amount', //排序 count_order订单数sale_count拿货次数 sale_num拿货件数 sum_final_amount拿货金额 gross_profit毛利润 cost_price 商品成本 gross_profit 毛利额 voucher_amount客户回款 sale_arrears期末余额 final_rate 占比
          sort: 'desc', //asc正序 desc倒序
          page: 1,
          pageSize: 20,
          time: this.getPastTime(30),
        },
        // 列表条数 ，分页加载状态，列表类型，列表数据
        total: 0,
        formTemp: null,
        page: 1,
        pageSize: 10,
        listLoading: false,
        listType: 1,
        goosList: [],
        // 顶部卡片，地图,饼图 查询条件
        goodsForm: {
          // source: null,
          time: this.getPastTime(30),
        },
        // 员工下拉框
        employeeList: [],
        // 等级下拉框数据
        selectList: [],
        // 顶部卡片列表
        textTagList: [
          {
            title: '新增客户数',
            content: '累计创建的客户数据，不受选定时间控制',
            num: 10,
            oldNum: 5,
            number: '10',
            type: 1,
            allNum: 180,
          },
          {
            title: '动销客户数',
            allNum: 180,
            num: 47,
            number: '27',
            type: 2,
            content: '在选定条件下，新创建的客户数量',
          },
          {
            title: '欠款客户',
            num: 20,
            money: '20000',
            number: '27',
            allNum: 180,
            type: 3,
            content: '在选定条件下，成功提交订单的客户的数量',
          },
          {
            title: '回款客户',
            num: 20,
            money: '20000',
            number: '27',
            allNum: 180,
            type: 4,
            content: '在选定条件下，期末余额有欠款的客户数量合计',
          },
        ],
        // 地图数据，标题，悬停数据
        mapTitle: '客户区域分布',
        mapType: {
          trigger: 'item',
          formatter(params) {
            let res = ` <ul>
    <li><span>城市分布:</span> <span> ${params.data.name}</span></li>
    <li><span>累计用户数:</span> <span> ${params.data.value}</span></li>
    <li><span>新增用户数:</span> <span> ${params.data.add_count}</span></li>
    <li><span>贡献销售额:</span> <span> ${params.data.sale}</span></li>
    <li><span>贡献值:</span> <span> ${params.data.all_sale}</span></li>
  </ul>`
            return res
          },
        },
        // 饼图数据，rfm客户数据列表，标题，饼图样式
        branchList1: [
          {
            name: '活跃客户',
            value: 0,
            title: 'active_customer',
            content: '最近【30】天内有提交订单的客户数据',
          },
          {
            name: '沉默客户',
            value: 0,
            title: 'sleep_customer',
            content: '最近【30-90】天未提交过订单的客户数据',
          },
          {
            name: '流失客户',
            value: 0,
            title: 'off_customer',
            content: '超出【90】天未提交过订单的客户数据',
          },

          {
            name: '即将流失客户',
            value: 0,
            title: 'be_off_customer',
            content: '最近【30】天内未提交订单的客户数据',
          },
          {
            name: '潜在客户',
            value: 0,
            title: 'latent_customer',
            content: '最近【30】天内未提交订单的客户数据',
          },
        ],
        branchTitle1: '客户RFM分析',
        styleObj1: {
          width: '400px',
          height: '500px',
          legendx: 0,
          legendy: 450,
          center: ['50%', '50%'],
          tooltip: {
            trigger: 'item',
            formatter(params) {
              let res = ` <ul>
    <li><span>${params.data.name}:</span> <span> ${params.data.value}</span></li>
    <li><span> ${params.data.content}</span></li>
  </ul>`
              return res
            },
          },
        },
        // 饼图数据，客户等级数据列表，标题，饼图样式
        branchList: [],
        branchTitle: '客户等级分析',
        styleObj: {
          width: '400px',
          height: '500px',
          legendx: 0,
          legendy: 450,
          center: ['50%', '50%'],
        },
      }
    },
    watch: {
      // 监听 顶部卡片，地图,饼图 查询条件
      goodsForm: {
        handler: function () {
          this.branchList = []
          this.branchList1 = [
            {
              name: '活跃客户',
              value: 0,
              title: 'active_customer',
              content: '最近【30】天内有提交订单的客户数据',
            },
            {
              name: '沉默客户',
              value: 0,
              title: 'sleep_customer',
              content: '最近【30-90】天未提交过订单的客户数据',
            },
            {
              name: '流失客户',
              value: 0,
              title: 'off_customer',
              content: '超出【90】天未提交过订单的客户数据',
            },

            {
              name: '即将流失客户',
              value: 0,
              title: 'be_off_customer',
              content: '最近【30】天内未提交订单的客户数据',
            },
            {
              name: '潜在客户',
              value: 0,
              title: 'latent_customer',
              content: '最近【30】天内未提交订单的客户数据',
            },
          ]
          this.fetchData()
        },
        deep: true,
      },
      // 监听 客户分析表格 查询条件
      goodsForm1: {
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
          this.getTableList()
          this.pageState = false
        },
        deep: true,
      },
      // 监听时间切换
      time: {
        handler: function (newVal) {
          // 按钮时间切换
          if (newVal == '昨日') {
            this.goodsForm1.time = this.getYesterdayTime()
          } else if (newVal == '近3天') {
            this.goodsForm1.time = this.getPastTime(3)
          } else if (newVal == '近7天') {
            this.goodsForm1.time = this.getWeenTime()
          } else if (newVal == '近15天') {
            this.goodsForm1.time = this.getPastTime(15)
          } else if (newVal == '近30天') {
            this.goodsForm1.time = this.getPastTime(30)
          }
        },
        deep: true,
      },
    },
    created() {
      this.getTypeList()
      this.selectData()
      this.fetchData()
      this.getTableList()
    },
    methods: {
      // 分页
      changeBtnPage(data) {
        this.pageState = true
        this.goodsForm1.page = data
      },
      // 分页条数
      changeBtnPageSize(data) {
        this.pageState = true
        this.goodsForm1.pageSize = data
      },
      // 获取服务人员下拉框数据
      async selectData() {
        const { data } = await this.api.getEmployeeList({
          name: '',
          page: -1,
          pageSize: 10,
          department_id: '', //部门id
          role: null, //岗位id
          status: 1, // 状态 1=在职 0=停职 默认传1
        })
        this.employeeList = data
      },
      // 列表选中数据
      handleSelectionChange(val) {
        this.selectRowsId = val
      },
      // 列表导出
      async handleDerive() {
        let temp = JSON.parse(JSON.stringify(this.goodsForm1))
        let ids = this.selectRowsId.map((item) => item.id)
        temp.ids = ids
        const { code, data } = await this.api.getHotStyleAnalysisExport(temp)
        if (code == 200) {
          window.open(data.url)
          this.$message.success('导出成功')
          this.fetchData()
        } else {
          this.$message.error('导出失败')
        }
      },
      // 列表详情跳转客户
      handleDetail(row) {
        this.$router.push({
          path: '/customer/customerManage',
          query: {
            id: row.id,
            type: 'reportCustomer', // 从客户报表进入
          },
        })
      },
      // 重置列表表单数据
      resetForm1() {
        this.goodsForm1 = {
          // price: null,
          online: null,
          brand: null, //品牌
          level: 0, //客户等级
          customer_type: 0, //客户分类
          customer_source: null, //客户来源
          employee: null, //服务人员
          is_return: true, //不看终止合作
          customer_name: null, //客户名称搜索
          order: 'sum_final_amount', //排序 count_order订单数sale_count拿货次数 sale_num拿货件数 sum_final_amount拿货金额 gross_profit毛利润 cost_price 商品成本 gross_profit 毛利额 voucher_amount客户回款 sale_arrears期末余额 final_rate 占比
          sort: 'desc', //asc正序 desc倒序
          page: 1,
          pageSize: 20,
          time: this.getPastTime(30),
        }
      },
      // 重置顶部卡片，地图,饼图 查询条件
      resetForm() {
        this.goodsForm = {
          // source: null,
          time: this.getPastTime(30),
        }
      },
      // 获取下拉框数据
      async getTypeList() {
        const { data } = await this.api.getCommonAllList({
          type: 'customer_source,customer_grade,customer_type',
        })
        data.customer_type.unshift({ id: 0, name: '全部' })
        data.customer_grade.unshift({ id: 0, name: '全部' })
        this.selectList = data
        this.selectList.online = [
          {
            name: '小程序订货商城',
            id: 1,
          },
          {
            name: '线下开单',
            id: 0,
          },
        ]
        this.selectList.price = [
          {
            name: '不限',
            start: 0,
            end: 0,
          },
          {
            name: '￥0-10000',
            start: 0,
            end: 10000,
          },
          {
            name: '￥10000-100000',
            start: 10000,
            end: 100000,
          },
          {
            name: '￥100000-1000000',
            start: 100000,
            end: 1000000,
          },
          {
            name: '￥1000000-10000000',
            start: 1000000,
            end: 10000000,
          },
          {
            name: '￥10000000以上',
            start: 10000000,
            end: 0,
          },
        ]
      },
      // 获取 卡片，地图，饼图数据
      async fetchData() {
        const { data } = await this.api.getInformationCustomerList(
          this.goodsForm
        )
        this.textTagList[0].num = data.add_customer
        this.textTagList[0].allNum = data.all_customer
        this.textTagList[0].oldNum = data.previous_period
        this.textTagList[0].number =
          (
            (data.add_customer - data.previous_period) /
            data.previous_period
          ).toFixed(2) * 100
        this.textTagList[1].num = data.sale_customer
        this.textTagList[1].number = data.sale_customer_proportion
        this.textTagList[1].allNum = data.all_customer
        this.textTagList[2].num = data.sale_arrears
        this.textTagList[2].number = data.arrears_customers_proportion
        this.textTagList[2].money = data.sale_arrears_amount
        this.textTagList[2].allNum = data.all_customer
        this.textTagList[3].num = data.return_arrears
        this.textTagList[3].number = data.return_customers_proportion
        this.textTagList[3].money = data.return_arrears_amount
        this.textTagList[3].allNum = data.all_customer
        this.branchList1.forEach((item) => {
          for (let i in data) {
            if (item.title == i) {
              if (data[i] == null) {
                data[i] = 0
                item.value = data[i]
              } else {
                item.value = data[i]
              }
            }
          }
        })
        this.api.getCustomerArea(this.goodsForm).then((res) => {
          let chainList = JSON.parse(JSON.stringify(this.chainList))
          chainList.forEach((item, index) => {
            res.data.forEach((item1) => {
              if (
                item1.province != '' &&
                item1.province.indexOf(item.name) != -1
              ) {
                let obj = {}
                obj.value = item1.count
                obj.add_count = item1.add_count
                obj.sale = item1.sale
                obj.all_sale = item1.all_sale
                chainList[index] = Object.assign({}, item, obj)
              }
            })
          })
          chainList.forEach((item) => {
            if (item.add_count == undefined) {
              item.value = 0
              item.add_count = 0
              item.sale = 0
              item.all_sale = 0
            }
          })
          chainList.sort((a, b) => {
            return b.value - a.value
          })
          this.chainList = chainList
        })
        this.api.getCustomerLevel().then((res) => {
          let temp1 = {}
          res.data.forEach((item) => {
            temp1.name = item.name
            temp1.value = item.count
            this.branchList.push(temp1)
            temp1 = {}
          })
        })
      },
      // 获取列表数据
      async getTableList() {
        this.listLoading = true
        if (this.formTemp == null) {
          this.formTemp = JSON.parse(JSON.stringify(this.goodsForm1))
        }
        let temp = JSON.parse(JSON.stringify(this.formTemp))
        const { data } = await this.api.getHotStyleAnalysis(temp)
        this.goosList = data.list.data
        this.total = data.list.total
        this.listLoading = false
      },
    },
  }
</script>
