<template>
  <div style="background-color: #f6f8f9">
    <div
      style="
        padding-top: 1px;
        margin-bottom: 20px;
        background-color: #ffffff;
        border-radius: 5px;
      "
    >
      <!-- 查询条件/操作按钮 -->
      <QYForm
        :form="form"
        :form-type="formType"
        @changeSearch="handleQuery"
        @resetForm="resetForm"
      >
        <template #Form>
          <el-form-item label="品牌:">
            <el-select v-model="form.brand" placeholder="请选择品牌">
              <el-option
                v-for="(item, index) in selectList.brand"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="年份:">
            <el-select v-model="form.year" placeholder="请选择年份">
              <el-option
                v-for="(item, index) in selectList.year"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="季节:">
            <el-select v-model="form.season" placeholder="请选择季节">
              <el-option
                v-for="(item, index) in selectList.season"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="订单时间:">
            <el-date-picker
              v-model="form.time"
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
          </el-form-item>
          <el-form-item label="商品款号:">
            <el-input
              v-model="form.sn"
              placeholder="请输入商品款号"
              style="width: 215px"
            />
          </el-form-item>
          <el-button size="small" type="primary" @click="handleDownload()">
            全部导出
          </el-button>
        </template>
      </QYForm>
    </div>
    <el-card shadow="never" style="border: 0; border-radius: 5px">
      <el-tabs v-model="form.type">
        <el-tab-pane :label="'按款号/货号'" name="1" />
        <el-tab-pane :label="'按颜色'" name="2" />
        <el-tab-pane :label="'按颜色尺码'" name="3" />
      </el-tabs>
      <div
        style="
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        "
      >
        <div style="display: flex">
          <el-button
            size="small"
            style="margin-right: 10px"
            type="primary"
            @click="handleDownload(2)"
          >
            批量导出
          </el-button>
          <div style="display: flex; margin-top: 5px">
            <el-checkbox v-model="form.not_stop_goods">
              不统计停售商品
            </el-checkbox>
            <el-checkbox v-model="form.not_is_void">不统计作废数据</el-checkbox>
            <div>
              &nbsp; &nbsp; | &nbsp; 指标说明
              <el-popover placement="right" trigger="hover">
                <div style="font-size: 12px">
                  <p>发货数量：所选日期范围内的发货件数总和</p>
                  <p>发货金额：所选日期范围内的发货件数金额总和</p>
                  <p>平均出库价：所选日期范围的发货件数金额/发货件数</p>
                  <p>平均发货折扣：所选日期范围的发货金额/吊牌金额*100%</p>
                  <p>发货出库成本金额：所选日期范围商品的发货数量*商品成本价</p>
                  <p>退货数量：所选日期范围内的退货件数总和</p>
                  <p>退货金额：所选日期范围内的退货金额总和</p>
                  <p>平均退货价：所选日期范围的退货件数金额/退货件数</p>
                  <p>平均退货价：所选日期范围的退货件数金额/退货件数</p>
                  <p>平均退货折扣：所选日期范围的退货金额/吊牌金额*100%</p>
                  <p>平均退货成本：指此商品的成本价</p>
                  <p>退货入库成本金额：所选日期范围商品的退货数量*商品成本价</p>
                  <p>
                    毛利额：所选日期范围的【（商品总发货金额-商品发货成本金额）-（商品退货金额-商品退货成本金额）】
                  </p>
                </div>
                <vab-icon
                  slot="reference"
                  icon="question-line"
                  style="position: relative; top: -2px; font-size: 14px"
                />
              </el-popover>
            </div>
          </div>
        </div>
        <div>
          排序
          <el-select v-model="form.order" style="width: 150px; margin: 0 10px">
            <el-option label="按创建时间" value="create_time" />
            <el-option label="按上市时间" value="upper_time" />
            <el-option label="按商品款号" value="sn" />
          </el-select>
          <el-radio-group v-model="form.sort">
            <el-radio-button label="asc">正序</el-radio-button>
            <el-radio-button label="desc">倒序</el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <!-- 列表 -->
      <QYList
        :list="list"
        :list-type="listType"
        :page-no="page"
        :page-size="pageSize"
        :state="listLoading"
        :total="total"
        @changePage="changeBtnPage"
        @changePageSize="changeBtnPageSize"
        @selectRows="selectBtnRows"
      >
        <template #List>
          <el-table-column align="center" type="selection" width="50" />
          <el-table-column label="商品信息" width="400">
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
                    style="width: 105px; height: 105px"
                  >
                    <div slot="error" class="el-image__error">暂无图片</div>
                  </el-image>
                </el-tooltip>
                <div style="width: 280px; margin-left: 10px">
                  <div style="display: flex; justify-content: space-between">
                    <div style="font-size: 14px; font-weight: 600">
                      {{ row.goods_sn }}
                      {{ row.color_name }}
                      {{ row.size_name }}
                    </div>
                    <el-tag v-if="row.status == 1" type="success">在售</el-tag>
                    <el-tag v-if="row.status == 2" type="danger">停售</el-tag>
                  </div>
                  <div style="display: flex; margin: 5px 0 0 0">
                    <div
                      style="
                        width: 200px;
                        overflow: hidden;
                        text-align: left;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                      "
                    >
                      {{ row.goods_name }}
                    </div>
                  </div>

                  <div style="display: flex; width: 100%; margin: 5px 0">
                    <el-tag type="info">{{ row.category_name }}</el-tag>
                    &nbsp;
                    <el-tag type="info">{{ row.year_name }}</el-tag>
                    &nbsp;
                    <el-tag type="info">{{ row.season_name }}</el-tag>
                    &nbsp;
                    <el-tag type="info">{{ row.brand_name }}</el-tag>
                  </div>
                  <div
                    style="
                      display: flex;
                      justify-content: space-between;
                      margin: 5px 0 0 0;
                    "
                  >
                    <div style="color: red">￥{{ row.sale_price }}</div>
                    <div>{{ row.upper_time | formatTimeData }}</div>
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="发货数量(出库)"
            prop="sum_deliver_num"
          />
          <el-table-column
            align="center"
            label="发货金额(出库)"
            prop="sum_deliver_total"
          >
            <template #default="{ row }">
              <el-tag>￥{{ row.sum_deliver_total | moneyFormat }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="平均出库价"
            prop="avg_deliver_price"
          >
            <template #default="{ row }">
              <el-tag>￥{{ row.avg_deliver_price | moneyFormat }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="平均发货折扣"
            prop="deliver_rate"
          />
          <el-table-column
            align="center"
            label="平均出库成本"
            prop="cost_price"
          >
            <template #default="{ row }">
              <el-tag>￥{{ row.cost_price | moneyFormat }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="出库成本金额"
            prop="deliver_cost_price"
          >
            <template #default="{ row }">
              <el-tag>￥{{ row.deliver_cost_price | moneyFormat }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="退货数量(入库)"
            prop="sum_return_num"
          />
          <el-table-column
            align="center"
            label="退货金额(入库)"
            prop="sum_return_total"
          >
            <template #default="{ row }">
              <el-tag>￥{{ row.sum_return_total | moneyFormat }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="平均退货价"
            prop="avg_return_price"
          >
            <template #default="{ row }">
              <el-tag>￥{{ row.avg_return_price | moneyFormat }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="平均退货折扣"
            prop="return_rate"
          />
          <el-table-column
            align="center"
            label="平均退货成本"
            prop="cost_price"
          >
            <template #default="{ row }">
              <el-tag>￥{{ row.cost_price | moneyFormat }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="退货成本金额"
            prop="return_cost_price"
          >
            <template #default="{ row }">
              <el-tag>￥{{ row.return_cost_price | moneyFormat }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="毛利额" prop="sum_profit">
            <template #default="{ row }">
              <el-tag>￥{{ row.sum_profit | moneyFormat }}</el-tag>
            </template>
          </el-table-column>
        </template>
      </QYList>
    </el-card>
  </div>
</template>
<script>
  // 日期组件和日期方法混入
  import datajosn from '@/assets/assets_josn/datajosn'
  // 表格导出插件
  import table2excel from 'js-table2excel'
  export default {
    mixins: [datajosn],
    data() {
      return {
        // 选中的行
        selectRows: [],
        // 下拉框数据
        selectList: [],
        // 页数，条数，表单查询条件 ，表单组件和列表组件的类型，列表数据，列表加载状态，列表总数
        formTemp: null,
        page: 1,
        pageSize: 10,
        form: {
          page: 1,
          pageSize: 10,
          sn: '', //订单号
          time: [], //时间
          ids: [],
          year: '',
          season: '',
          brand: '',
          type: '1', // 数据格式  1款号 2颜色  3颜色+尺码
          not_stop_goods: true, //不统计停售商品
          not_is_void: true, //不统计作废数据
          order: 'create_time', //排序 create_time创建时间 upper_time上市时间 sn款号
          sort: 'desc', //
        },
        formType: 5,
        listType: 1,
        list: [
          {
            time: '2020-01-01',
          },
        ],
        listLoading: false,
        total: 0,
      }
    },
    watch: {
      // 监听表单变化
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
          this.fetchData()
          this.pageState = false
        },
        deep: true,
      },
    },
    created() {
      this.getGoodsTypeList()
      this.fetchData()
    },
    methods: {
      // 列表选中
      selectBtnRows(data) {
        this.selectRows = data
      },
      // 获取下拉框数据
      async getGoodsTypeList() {
        const { data } = await this.api.getCommonAllList({
          type: 'brand,season,year',
        })
        this.selectList = data
      },
      // 导出
      async handleDownload(type) {
        if (type == 2 && this.selectRows.length == 0) {
          this.$message.error('请选择要导出的规格')
          return
        }
        let stock_id = []
        if (this.selectRows.length != 0) {
          this.selectRows.forEach((item) => {
            if (this.form.type == 1) {
              stock_id.push(item.goods_id)
            } else {
              stock_id.push(item.stock_id)
            }
          })
        }
        let temp = JSON.parse(JSON.stringify(this.formTemp))
        temp.ids = stock_id
        const { code, data } = await this.api.getDeliveryStatisticsExport(temp)
        let columnSn = [
          {
            title: '图片',
            type: 'image',
            width: 100,
            height: 100,
            key: 'img',
          },
          {
            title: '商品名称',
            type: 'text',
            key: 'name',
          },
          {
            title: '商品款号',
            type: 'text',
            key: 'sn',
          },
          {
            title: '市场价',
            type: 'text',
            key: 'sale_price',
          },
          {
            title: '销售价',
            type: 'text',
            key: 'price',
          },

          {
            title: '发货数量',
            type: 'text',
            key: 'sum_deliver_num',
          },
          {
            title: '发货金额',
            type: 'text',
            key: 'sum_deliver_total',
          },
          {
            title: '平均出库价',
            type: 'text',
            key: 'avg_deliver_price',
          },
          {
            title: '平均发货折扣',
            type: 'text',
            key: 'deliver_rate',
          },
          {
            title: '平均出库成本',
            type: 'text',
            key: 'cost_price',
          },
          {
            title: '出库成本金额',
            type: 'text',
            key: 'deliver_cost_price',
          },
          {
            title: '退货数量',
            type: 'text',
            key: 'sum_return_num',
          },
          {
            title: '退货金额',
            type: 'text',
            key: 'sum_return_total',
          },
          {
            title: '平均退货价',
            type: 'text',
            key: 'avg_return_price',
          },
          {
            title: '平均退货折扣',
            type: 'text',
            key: 'return_rate',
          },
          {
            title: '平均退货成本',
            type: 'text',
            key: 'cost_prices',
          },
          {
            title: '退货成本金额',
            type: 'text',
            key: 'return_cost_price',
          },
          {
            title: '毛利额',
            type: 'text',
            key: 'sum_profit',
          },
          {
            title: '品牌',
            type: 'text',
            key: 'brand_name',
          },
          {
            title: '上市年份',
            type: 'text',
            key: 'year_name',
          },
          {
            title: '上市季节',
            type: 'text',
            key: 'season_name',
          },
          {
            title: '商品状态',
            type: 'text',
            key: 'goods_status',
          },
          {
            title: '上市时间',
            type: 'text',
            key: 'upper_time',
          },
          {
            title: '创建时间',
            type: 'text',
            key: 'create_time',
          },
        ]
        let columnColor = [
          {
            title: '图片',
            type: 'image',
            width: 100,
            height: 100,
            key: 'img',
          },
          {
            title: '商品名称',
            type: 'text',
            key: 'name',
          },
          {
            title: '商品款号',
            type: 'text',
            key: 'sn',
          },
          {
            title: '颜色',
            type: 'text',
            key: 'color_name',
          },
          {
            title: '市场价',
            type: 'text',
            key: 'sale_price',
          },
          {
            title: '销售价',
            type: 'text',
            key: 'price',
          },

          {
            title: '发货数量',
            type: 'text',
            key: 'sum_deliver_num',
          },
          {
            title: '发货金额',
            type: 'text',
            key: 'sum_deliver_total',
          },
          {
            title: '平均出库价',
            type: 'text',
            key: 'avg_deliver_price',
          },
          {
            title: '平均发货折扣',
            type: 'text',
            key: 'deliver_rate',
          },
          {
            title: '平均出库成本',
            type: 'text',
            key: 'cost_price',
          },
          {
            title: '出库成本金额',
            type: 'text',
            key: 'deliver_cost_price',
          },
          {
            title: '退货数量',
            type: 'text',
            key: 'sum_return_num',
          },
          {
            title: '退货金额',
            type: 'text',
            key: 'sum_return_total',
          },
          {
            title: '平均退货价',
            type: 'text',
            key: 'avg_return_price',
          },
          {
            title: '平均退货折扣',
            type: 'text',
            key: 'return_rate',
          },
          {
            title: '平均退货成本',
            type: 'text',
            key: 'cost_prices',
          },
          {
            title: '退货成本金额',
            type: 'text',
            key: 'return_cost_price',
          },
          {
            title: '毛利额',
            type: 'text',
            key: 'sum_profit',
          },
          {
            title: '品牌',
            type: 'text',
            key: 'brand_name',
          },
          {
            title: '上市年份',
            type: 'text',
            key: 'year_name',
          },
          {
            title: '上市季节',
            type: 'text',
            key: 'season_name',
          },
          {
            title: '商品状态',
            type: 'text',
            key: 'goods_status',
          },
          {
            title: '上市时间',
            type: 'text',
            key: 'upper_time',
          },
          {
            title: '创建时间',
            type: 'text',
            key: 'create_time',
          },
        ]
        let columnSize = [
          {
            title: '图片',
            type: 'image',
            width: 100,
            height: 100,
            key: 'img',
          },
          {
            title: '商品名称',
            type: 'text',
            key: 'name',
          },
          {
            title: '商品款号',
            type: 'text',
            key: 'sn',
          },
          {
            title: '颜色',
            type: 'text',
            key: 'color_name',
          },
          {
            title: '尺码',
            type: 'text',
            key: 'size_name',
          },
          {
            title: '市场价',
            type: 'text',
            key: 'sale_price',
          },
          {
            title: '销售价',
            type: 'text',
            key: 'price',
          },

          {
            title: '发货数量',
            type: 'text',
            key: 'sum_deliver_num',
          },
          {
            title: '发货金额',
            type: 'text',
            key: 'sum_deliver_total',
          },
          {
            title: '平均出库价',
            type: 'text',
            key: 'avg_deliver_price',
          },
          {
            title: '平均发货折扣',
            type: 'text',
            key: 'deliver_rate',
          },
          {
            title: '平均出库成本',
            type: 'text',
            key: 'cost_price',
          },
          {
            title: '出库成本金额',
            type: 'text',
            key: 'deliver_cost_price',
          },
          {
            title: '退货数量',
            type: 'text',
            key: 'sum_return_num',
          },
          {
            title: '退货金额',
            type: 'text',
            key: 'sum_return_total',
          },
          {
            title: '平均退货价',
            type: 'text',
            key: 'avg_return_price',
          },
          {
            title: '平均退货折扣',
            type: 'text',
            key: 'return_rate',
          },
          {
            title: '平均退货成本',
            type: 'text',
            key: 'cost_prices',
          },
          {
            title: '退货成本金额',
            type: 'text',
            key: 'return_cost_price',
          },
          {
            title: '毛利额',
            type: 'text',
            key: 'sum_profit',
          },
          {
            title: '品牌',
            type: 'text',
            key: 'brand_name',
          },
          {
            title: '上市年份',
            type: 'text',
            key: 'year_name',
          },
          {
            title: '上市季节',
            type: 'text',
            key: 'season_name',
          },
          {
            title: '商品状态',
            type: 'text',
            key: 'goods_status',
          },
          {
            title: '上市时间',
            type: 'text',
            key: 'upper_time',
          },
          {
            title: '创建时间',
            type: 'text',
            key: 'create_time',
          },
        ]
        const excelData = data
        const date = new Date()
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const hour = date.getHours()
        const minute = date.getMinutes()
        const second = date.getSeconds()
        // 拼接年月日时分秒
        const time =
          year +
          '-' +
          month +
          '-' +
          day +
          ' ' +
          hour +
          '-' +
          minute +
          '-' +
          second
        // 拼接文件名称
        const excelName = '商品出入库汇总列表-' + time
        if (code == 200) {
          if (this.form.type == 1) {
            table2excel(columnSn, excelData, excelName) //生成Excel表格，自动下载
          } else if (this.form.type == 2) {
            table2excel(columnColor, excelData, excelName) //生成Excel表格，自动下载
          } else {
            table2excel(columnSize, excelData, excelName) //生成Excel表格，自动下载
          }
          this.$message.success('导出成功')
          this.dialogVisible = false
          this.fetchData()
        } else {
          this.$message.error('导出失败')
        }
      },
      // 查询
      handleQuery() {
        this.fetchData()
      },
      // 重置
      resetForm() {
        this.form = {
          page: 1,
          pageSize: 10,
          sn: '', //订单号
          time: [], //时间
          ids: [],
          year: '',
          season: '',
          brand: '',
          type: '1', // 数据格式  1款号 2颜色  3颜色+尺码
          not_stop_goods: true, //不统计停售商品
          not_is_void: true, //不统计作废数据
          order: 'create_time', //排序 create_time创建时间 upper_time上市时间 sn款号
          sort: 'desc', //
        }
      },
      // 分页
      changeBtnPage(data) {
        this.pageState = true
        this.form.page = data
      },
      // 每页条数
      changeBtnPageSize(data) {
        this.pageState = true
        this.form.pageSize = data
      },
      fetchData() {
        this.$debounce(this.debounceFetchData, 500)
      },
      // 获取列表数据
      async debounceFetchData() {
        this.listLoading = true
        if (this.formTemp == null) {
          this.formTemp = JSON.parse(JSON.stringify(this.form))
        }
        const { data } = await this.api.getDeliveryStatisticsList(this.formTemp)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
    },
  }
</script>
