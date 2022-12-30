<template>
  <div style="background-color: #f6f8f9">
    <div
      style="
        padding: 20px 20px 20px 20px;
        margin-bottom: 20px;
        background-color: white;
        border-radius: 5px;
      "
    >
      <el-form
        ref="form"
        :inline="true"
        label-width="80px"
        :model="goodsForm"
        style="display: flex; justify-content: space-between"
        @submit.native.prevent
      >
        <span style="margin-top: 10px; font-size: 16px">整体分析</span>

        <el-form-item style="float: right; margin-right: 0; font-size: 12px">
          <el-form-item label="类型:" prop="type">
            <el-select
              v-model="goodsForm.type"
              size="small"
              style="width: 120px"
            >
              <el-option label="整手" :value="0" />
              <el-option label="散码" :value="1" />
            </el-select>
          </el-form-item>
          <el-form-item label="品牌:" prop="brand">
            <el-select
              v-model="goodsForm.brand"
              placeholder="请选择品牌"
              style="width: 120px"
            >
              <el-option
                v-for="(item, index) in selectList.brand"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="时间筛选:" prop="time">
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
              style="width: 330px"
              type="daterange"
              unlink-panels
              value-format="yyyy-MM-dd HH:mm:ss"
            />
            <el-button
              size="small"
              style="margin: 0 0 0 10px"
              type="primary"
              @click="handleDownload"
            >
              导出
            </el-button>
            <el-button size="small" type="primary" @click="resetForm()">
              重置
            </el-button>
          </el-form-item>
        </el-form-item>
      </el-form>
      <div style="display: flex; flex-wrap: wrap; margin: 0 0 10px 0">
        <QYTextLabels ref="multipleTable" :list="goodsStaList" />
      </div>
      <vab-chart
        :init-options="initOptions"
        :option="option"
        style="width: 100%; height: 400px"
      />
    </div>
    <div style="padding: 20px; background-color: white; border-radius: 5px">
      <el-form
        ref="form"
        :inline="true"
        label-width="80px"
        :model="goodsForm1"
        style="display: flex; justify-content: space-between"
        @submit.native.prevent
      >
        <span style="margin-top: 10px; font-size: 16px">爆款分析</span>
        <el-form-item style="margin-right: 0">
          <el-form-item label="统计类型:" prop="type">
            <el-select
              v-model="goodsForm1.type"
              size="small"
              style="width: 150px"
            >
              <el-option label="本期销量" :value="-1" />
              <el-option label="本期销售额" value="sum_total" />
              <el-option label="上架时间" value="g.upper_time" />
              <el-option label="整手" :value="0" />
              <el-option label="散码" :value="1" />
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
          <el-table-column label="商品图片" prop="image" width="75">
            <template #default="{ row }">
              <el-tooltip placement="top">
                <el-image
                  slot="content"
                  :src="row.img"
                  style="width: 200px; height: 200px"
                />
                <el-image :src="row.img" />
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="商品名称" prop="name" />
          <el-table-column label="商品款号" prop="sn" width="100" />
          <el-table-column
            align="right"
            label="吊牌价"
            prop="sale_price"
            width="150"
          >
            <template #default="{ row }">
              <el-tag>￥{{ row.sale_price | moneyFormat }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="right"
            label="销售价"
            prop="price"
            width="150"
          >
            <template #default="{ row }">
              <el-tag>￥{{ row.price | moneyFormat }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="right"
            label="本期销售额"
            prop="sum_total"
            width="150"
          >
            <template #default="{ row }">
              <el-tag>￥{{ row.sum_total | moneyFormat }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="本期销量" prop="sum_num" width="120">
            <template #default="{ row }">
              <span v-if="row.sum_num == null">0</span>
              <span v-else>{{ row.sum_num }}</span>
            </template>
          </el-table-column>
          <el-table-column label="预计售完天数" prop="expect_day" width="120" />
          <el-table-column label="上架天数" prop="upper_day" width="80" />
          <el-table-column label="上架时间" prop="upper_time" width="150">
            <template #default="{ row }">
              {{ row.upper_time | formatTime }}
            </template>
          </el-table-column>
          <!-- v-if="$permissionFiltering('ReportGoods', 'sales')" -->
          <!-- <el-table-column label="毛利率(%)" prop="profit">
            <template #default="{ row }">{{ row.profit * 100 }}%</template>
          </el-table-column> -->
          <el-table-column
            align="center"
            fixed="right"
            label="操作"
            width="100"
          >
            <template #default="{ row }">
              <el-button type="text" @click="handleDetail(row)">
                单品分析
              </el-button>
            </template>
          </el-table-column>
        </template>
      </QYList>
      <el-drawer
        :before-close="handleClose"
        size="50%"
        :title="title"
        :visible.sync="drawer"
      >
        <Drawer :drawer-inof="drawerInof" />
      </el-drawer>
    </div>
  </div>
</template>

<script>
  import Drawer from '@/subview/components/Drawer/ReportGoodsDrawer'
  import VabChart from '@/extra/VabChart'
  import {
    getCommonAllList,
    getGoodsList,
    getGoodsRank,
    getGoodsReportForms,
  } from '@/api/basic'
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    name: 'GoodsStatistical',
    components: { VabChart, Drawer },
    mixins: [datajosn],
    data() {
      return {
        drawerInof: {},
        drawer: false,
        title: '单品分析',
        filename: '商品数据分析',
        listLoading: false,
        listType: 2,
        goosList: [],
        goodsForm: {
          type: null,
          brand: null,
          time: this.getPastTime(1),
        },
        goodsForm1: {
          page: 1,
          pageSize: 20,
          type: -1,
          brand: null,
          order: null,
          time: this.getPastTime(1),
        },
        selectList: [],
        dateList: [],
        dataAllList: {
          sale_num: [],
          sale_total: [],
          return_num: [],
          return_total: [],
        },
        goodsStaList: [
          {
            title: '今日上新',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'today_new',
            numType: 2,
            content: '今日创建商品款数量',
          },
          {
            title: '商品数',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'goods_num',
            numType: 2,
            content: '在选定条件下，累计创建的商品总数量（不包含停售商品）',
          },
          {
            title: '商品sku数',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'goods_sku',
            numType: 2,
            content:
              '在选定条件下，累计创建的商品 SKU 总数量（不含停售商品）例如：001款有3个颜色5个尺码，那么该款的商品 SKU 数量为 15',
          },
          {
            title: '动销商品数',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'goods_style_num',
            numType: 2,
            content: '在选定条件下，有过销售的商品数',
          },
          {
            title: '商品动销率',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'price_one',
            numType: 2,
            content:
              '在选定条件下，商品动销率=（动销商品数 ÷ 商品数）* 100% ,比如说， 平台里面有一共有 100 个款，有 50 个款最近多少天之内都有成交的，那么这个动销率就是 50%。',
          },
          {
            title: '销售件数',
            number: 400,
            num: 0,
            type: 2,
            typeSta: false,
            name: 'sale_num',
            numType: 2,
            content: '在选定条件下，所有成功提交订单的商品总件数',
          },
          {
            title: '销售金额',
            number: 400,
            num: 0,
            type: 2,
            typeSta: false,
            name: 'sale_total',
            numType: 1,
            content:
              '在选定条件下，所有支付成功订单实际应付总金额（不含订单优惠金额）',
          },
          {
            title: '退货件数',
            number: 400,
            num: 0,
            type: 2,
            typeSta: false,
            numType: 2,
            content: '在选定条件下，所有成功提交退货单的商品件数',
            name: 'return_num',
          },
          {
            title: '退货金额',
            number: 400,
            num: 0,
            type: 2,
            typeSta: false,
            name: 'return_total',
            numType: 1,
            content: '在选定条件下，所有成功提交退货单的订单金额',
          },
          {
            title: '实际交易金额',
            number: 400,
            num: 0,
            type: 2,
            typeSta: false,
            name: 'real_total',
            numType: 1,
            content: '在选定条件下，所有成功提交订单的销售金额 - 退货金额',
          },
        ],
        initOptions: {
          renderer: 'svg',
        },
        option: {},
      }
    },
    watch: {
      goodsForm: {
        handler: function () {
          this.tableData = []
          this.branchList = []
          this.dateList = []
          this.dataAllList = {
            sale_num: [],
            sale_total: [],
            return_num: [],
            return_total: [],
          }
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
        this.drawerInof = JSON.parse(JSON.stringify(row))
        this.drawer = true
      },
      resetForm() {
        this.goodsForm = {
          type: null,
          brand: null,
          time: this.getPastTime(1),
        }
      },
      resetForm1() {
        this.goodsForm1 = {
          page: 1,
          pageSize: 20,
          type: null,
          brand: null,
          time: this.getPastTime(1),
        }
      },
      async getTypeList() {
        const { data } = await getCommonAllList({
          type: 'brand',
        })
        this.selectList = data
      },
      async getTableList() {
        this.listLoading = true
        let temp = JSON.parse(JSON.stringify(this.goodsForm1))
        if (temp.type != 0 && temp.type != 1 && temp.type != -1) {
          temp.order = temp.type
          temp.type = null
        } else if (temp.type == -1) {
          temp.order = null
          temp.type = null
        } else {
          temp.order = null
        }
        const { data } = await getGoodsRank(temp)
        this.goosList = data.data
        this.listLoading = false
      },
      async fetchData() {
        const { data } = await getGoodsList(this.goodsForm)
        this.goodsStaList.forEach((item) => {
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
        if (this.goodsStaList[1].num != 0) {
          this.goodsStaList[4].num =
            (this.goodsStaList[3].num / this.goodsStaList[1].num) * 100
          this.goodsStaList[4].num = this.goodsStaList[4].num.toFixed(2) + '%'
        } else {
          this.goodsStaList[4].num = '0.00%'
        }

        getGoodsReportForms(this.goodsForm).then((res) => {
          let arr = []
          res.data.forEach((item) => {
            for (let i in item) {
              this.dateList.push(i)
              arr.push(item[i])
            }
          })
          arr.forEach((item) => {
            for (let i in item) {
              if (i != 'time_range' && this.dataAllList[i] !== undefined) {
                if (item[i] == null) {
                  item[i] = 0
                  this.dataAllList[i].push(item[i])
                } else {
                  this.dataAllList[i].push(item[i])
                }
              }
            }
          })
          this.option = {
            tooltip: {
              trigger: 'axis', //触发类型；轴触发，axis则鼠标hover到一条柱状图显示全部数据，item则鼠标hover到折线点显示相应数据，
              axisPointer: {
                type: 'cross', // 十字准星指示器
              },
            },
            legend: {
              data: ['销售数量', '销售金额', '退货数量', '退货金额'],
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true,
            },
            toolbox: {
              feature: {
                saveAsImage: {},
              },
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: this.dateList,
            },
            yAxis: [
              {
                type: 'value',
                name: '金额',
              },
              {
                type: 'value',
                name: '数量',
              },
            ],
            series: [
              {
                name: '销售数量',
                type: 'line',
                smooth: true,
                data: this.dataAllList.sale_num,
                yAxisIndex: 1,
                itemStyle: {
                  color: '#FFC833',
                },
              },
              {
                name: '销售金额',
                type: 'bar',
                data: this.dataAllList.sale_total,
                itemStyle: {
                  color: '#FF6C87',
                },
              },
              {
                name: '退货数量',
                type: 'line',
                yAxisIndex: 1,
                data: this.dataAllList.return_num,
                itemStyle: {
                  color: '#55DF7E',
                },
              },
              {
                name: '退货金额',
                type: 'bar',
                data: this.dataAllList.return_total,
                itemStyle: {
                  color: '#1890FF',
                },
              },
            ],
          }
        })
      },
      // 导出
      handleDownload() {
        import('@/utils/excel').then((excel) => {
          const tHeader = ['名称', '数量']
          const filterVal = ['title', 'num']
          const list = this.goodsStaList
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: this.filename,
          })
        })
      },
      handleClose() {
        this.drawer = false
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map((v) => filterVal.map((j) => v[j]))
      },
    },
  }
</script>

<style lang="scss" scoped>
  .workbench-container {
    padding: 0 !important;
    background: $base-color-background !important;
  }
</style>
