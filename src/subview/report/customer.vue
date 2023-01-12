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
          <!-- <el-form-item label="客户渠道:">
            <el-select v-model="goodsForm.source">
              <el-option
                v-for="item in selectList.customer_source"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item> -->
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
            <!-- <el-button
              size="small"
              style="margin-left: 10px"
              type="primary"
              @click="handleDownload"
            >
              导出
            </el-button> -->
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

    <el-row :gutter="20" style="padding: 0 10px 0 10px">
      <TextTags :list="textTagList" />
    </el-row>
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
    <el-row :gutter="20" style="padding: 0 10px 0 10px">
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
          :model="goodsForm1"
          style="display: flex; justify-content: space-between"
          @submit.native.prevent
        >
          <span style="margin-top: 10px; font-size: 16px">客户销售排行</span>
          <el-form-item style="margin-right: 0">
            <el-form-item label="统计类型:" prop="type">
              <el-select
                v-model="goodsForm1.order"
                size="small"
                style="width: 150px"
              >
                <el-option
                  v-for="(item, index) in orderList"
                  :key="index"
                  :label="item.name"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="品牌:" prop="brand">
              <el-select
                v-model="goodsForm1.brand"
                placeholder="请选择品牌"
                style="width: 150px"
              >
                <el-option
                  v-for="(item, index) in selectList.brand"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="客户等级:" prop="level">
              <el-select
                v-model="goodsForm1.level"
                placeholder="请选择客户等级"
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
            <el-form-item label="时间筛选:" prop="time">
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
                type="daterange"
                unlink-panels
                value-format="yyyy-MM-dd HH:mm:ss"
              />
              <el-button
                size="small"
                style="margin-left: 10px"
                type="primary"
                @click="resetForm1()"
              >
                重置
              </el-button>
            </el-form-item>
          </el-form-item>
        </el-form>
        <QYList :list="goosList" :list-type="listType" :state="listLoading">
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
            <!-- "cost_price": "1136.00", //商成成本价
				"gross_profit": "408.80",//毛利润
				
				"arrears_type": 0,// 0 开单扣款 1 发货扣款
				"voucher_amount": 110,//客户回款
				"last_order_time": "2022-12-23 16:53:28",//拿货时间
				"last_order_day": 7//拿货天数 -->
            <el-table-column
              label="客户名称"
              prop="customer_name"
              width="150"
            />
            <el-table-column label="订单数" prop="count_order" width="100" />
            <el-table-column label="拿货件数" prop="sum_num" width="100" />
            <el-table-column
              align="right"
              label="拿货金额"
              prop="sum_final_amount"
              width="150"
            >
              <template #default="{ row }">
                <el-tag>￥{{ row.sum_final_amount | moneyFormat }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              align="right"
              label="商品成本价"
              prop="cost_price"
              width="150"
            >
              <template #default="{ row }">
                <el-tag>￥{{ row.cost_price | moneyFormat }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              align="right"
              label="预计毛利润"
              prop="gross_profit"
              width="100"
            >
              <template #default="{ row }">
                <el-tag>￥{{ row.gross_profit | moneyFormat }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              align="right"
              label="客户回款"
              prop="voucher_amount"
              width="150"
            >
              <template #default="{ row }">
                <el-tag>￥{{ row.voucher_amount | moneyFormat }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="right" label="期末余额/欠款" width="150">
              <template #default="{ row }">
                <div v-if="(orderList[4].value = 'sale_arrears')">
                  <el-tag v-if="row.sale_arrears >= 0">
                    ￥{{ row.sale_arrears | moneyFormat }}
                  </el-tag>
                  <el-tag v-else type="danger">
                    -￥{{ row.sale_arrears | moneyFormat }}
                  </el-tag>
                </div>
                <div v-else>
                  <el-tag v-if="row.delivery_arrears >= 0">
                    ￥{{ row.delivery_arrears | moneyFormat }}
                  </el-tag>
                  <el-tag v-else type="danger">
                    -￥{{ row.delivery_arrears | moneyFormat }}
                  </el-tag>
                </div>

                <!-- <el-tag v-if="(orderList[4].value = 'sale_arrears')">
                  ￥{{ row.sale_arrears | moneyFormat }}
                </el-tag>
                <el-tag v-if="(orderList[4].value = 'delivery_arrears')">
                  ￥{{ row.delivery_arrears | moneyFormat }}
                </el-tag> -->
              </template>
            </el-table-column>
            <el-table-column
              label="最近拿货天数"
              prop="last_order_day"
              width="120"
            />
            <el-table-column label="销售占比" prop="final_rate" width="120" />
            <el-table-column label="最近拿货时间" prop="last_order_time" />
            <el-table-column
              align="center"
              fixed="right"
              label="操作"
              width="100"
            >
              <template #default="{ row }">
                <el-button type="text" @click="handleDetail(row)">
                  详情
                </el-button>
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
  import {
    getCommonAllList,
    getInformationCustomerList,
    getCustomerArea,
    getCustomerLevel,
    getHotStyleAnalysis,
  } from '@/api/basic'
  import datajosn from '@/assets/assets_josn/datajosn'
  import mapjson from '@/assets/assets_josn/mapjson'
  export default {
    name: 'CustomerStatistical',
    components: { TextTags },
    mixins: [datajosn, mapjson],
    data() {
      return {
        orderList: [
          {
            name: '订单数',
            value: 'count_order',
          },
          {
            name: '拿货件数',
            value: 'sum_num',
          },
          {
            name: '拿货金额',
            value: 'sum_final_amount',
          },
          {
            name: '预计毛利润',
            value: 'gross_profit',
          },
          {
            name: '期初欠款/余额',
            value: 'sale_arrears',
          },
        ],
        goodsForm1: {
          page: 1,
          pageSize: 20,
          brand: null,
          level: null,
          order: 'sum_num',
          time: this.getPastTime(30),
        },
        listLoading: false,
        listType: 2,
        goosList: [],
        goodsForm: {
          // source: null,
          time: this.getPastTime(30),
        },
        selectList: [],
        textTagList: [
          {
            title: '全部客户',
            content: '累计创建的客户数据，不受选定时间控制',
            number: 0,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'all_customer',
            numType: 2,
          },
          {
            title: '新增客户数',
            number: 0,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'add_customer',
            numType: 2,
            content: '在选定条件下，新创建的客户数量',
          },
          {
            title: '下单客户数',
            number: 0,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'sale_customer',
            numType: 2,
            content: '在选定条件下，成功提交订单的客户的数量',
          },
          {
            title: '欠款客户',
            number: 0,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'sale_arrears',
            numType: 2,
            content: '在选定条件下，期末余额有欠款的客户数量合计',
          },
        ],
        goodsStaList: [],
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
      goodsForm1: {
        handler: function () {
          this.getTableList()
        },
        deep: true,
      },
    },
    created() {
      this.getTypeList()
      this.fetchData()
      this.getTableList()
    },
    methods: {
      handleDetail(row) {
        this.$router.push({
          path: '/customer/customerManage',
          query: {
            id: row.customer_id,
          },
        })
      },
      resetForm1() {
        this.goodsForm1 = {
          page: 1,
          pageSize: 20,
          order: null,
          brand: null,
          level: null,
          time: this.getPastTime(30),
        }
      },
      resetForm() {
        this.goodsForm = {
          // source: null,
          time: this.getPastTime(30),
        }
      },
      async getTypeList() {
        const { data } = await getCommonAllList({
          type: 'customer_source,brand,customer_grade',
        })
        this.selectList = data
      },
      async fetchData() {
        const { data } = await getInformationCustomerList(this.goodsForm)
        this.textTagList.forEach((item) => {
          for (let i in data) {
            if (item.name == i) {
              if (data[i] == null) {
                data[i] = 0
                item.num = data[i]
              } else {
                item.num = data[i]
              }
            }
          }
        })
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
        getCustomerArea(this.goodsForm).then((res) => {
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
        getCustomerLevel().then((res) => {
          let temp1 = {}
          res.data.forEach((item) => {
            temp1.name = item.name
            temp1.value = item.count
            this.branchList.push(temp1)
            temp1 = {}
          })
        })
      },
      async getTableList() {
        this.listLoading = true
        const { data } = await getHotStyleAnalysis(this.goodsForm1)
        if (data.arrears_type == 0) {
          this.orderList[4].value = 'sale_arrears'
        } else {
          this.orderList[4].value = 'delivery_arrears'
        }
        this.goosList = data.list.data
        this.listLoading = false
      },
      // 导出
      handleDownload() {
        import('@/utils/excel').then((excel) => {
          const tHeader = ['名称', '数量', '较昨日数量']
          const filterVal = ['title', 'num', 'number']
          const list = this.goodsStaList
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: this.filename,
          })
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map((v) => filterVal.map((j) => v[j]))
      },
    },
  }
</script>

<style lang="scss" scoped></style>
