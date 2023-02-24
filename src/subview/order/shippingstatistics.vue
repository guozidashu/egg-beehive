<template>
  <div style="background-color: #f6f8f9">
    <div
      style="
        display: flex;
        justify-content: space-between;
        padding-top: 1px;
        margin-bottom: 20px;
        background-color: #ffffff;
        border-radius: 5px;
      "
    >
      <QYForm
        :form="form"
        :form-type="formType"
        @changeSearch="handleQuery"
        @resetForm="resetForm"
      >
        <template #Form>
          <el-form-item label="发货搜索:">
            <el-input
              v-model="form.sn"
              placeholder="请输入商品款号"
              style="width: 215px"
            />
          </el-form-item>
          <el-form-item label="剔除退货:">
            <el-select v-model="form.status">
              <el-option label="减去退货数量" :value="1" />
              <el-option label="不减去退货数量" :value="0" />
            </el-select>
          </el-form-item>
          <el-form-item label="订单时间:">
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
          </el-form-item>
        </template>
      </QYForm>
      <div>
        <el-button
          size="small"
          style="margin-top: 20px; margin-right: 20px"
          type="primary"
          @click="handleDownload"
        >
          导出所有订单
        </el-button>
      </div>
    </div>
    <el-card shadow="never" style="border: 0; border-radius: 5px">
      <el-tabs v-model="form.type" @tab-click="handleClick">
        <el-tab-pane :label="'按颜色'" name="1" />
        <el-tab-pane :label="'按颜色及尺码'" name="2" />
        <el-tab-pane :label="'按款号'" name="3" />
      </el-tabs>
      <QYList
        :list="list"
        :list-type="listType"
        :page-no="page"
        :page-size="pageSize"
        :state="listLoading"
        :total="total"
        @changePage="changeBtnPage"
        @changePageSize="changeBtnPageSize"
      >
        <template #List>
          <el-table-column align="center" type="selection" />
          <el-table-column align="center" label="款号" prop="goods_sn" />
          <el-table-column
            v-if="order_source != 3"
            align="center"
            label="颜色"
            prop="color_name"
          />
          <el-table-column
            v-if="order_source == 2"
            align="center"
            label="尺码"
            prop="size_name"
          />
          <el-table-column align="center" label="品牌" prop="brand_name" />
          <el-table-column align="center" label="发货数量" prop="num" />
          <el-table-column align="right" label="出库金额" prop="total">
            <template #default="{ row }">
              <el-tag>￥{{ row.total | moneyFormat }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="right"
            label="平均出库价"
            prop="discount_price"
          >
            <template #default="{ row }">
              <el-tag>￥{{ row.discount_price | moneyFormat }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="right" label="平均出库成本" prop="cost_price">
            <template #default="{ row }">
              <el-tag>￥{{ row.cost_price | moneyFormat }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="right"
            label="出库成本金额"
            prop="issue_cost_amount"
          >
            <template #default="{ row }">
              <el-tag>￥{{ row.issue_cost_amount | moneyFormat }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="right" label="毛利额" prop="gross_profit">
            <template #default="{ row }">
              <el-tag>￥{{ row.gross_profit | moneyFormat }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="平均折扣"
            prop="average_discount"
          />
        </template>
      </QYList>
    </el-card>
    <edit ref="edit" @fetch-data="fetchData" />
  </div>
</template>
<script>
  import Edit from '@/subview/components/Edit/BandEdit'
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    components: { Edit },
    mixins: [datajosn],
    data() {
      return {
        // tab页签
        order_source: '0',
        formTemp: null,
        page: 1,
        pageSize: 10,
        form: {
          sn: '',
          type: '1', //导出数据格式  1颜色  2颜色+尺码 3 按款号
          status: 1, //是否减去退货数量  1：减去 0：不减
          page: 1,
          pageSize: 10,
          order_time: this.getPastTime(30),
        },
        formType: 4,
        listType: 1,
        list: [],
        listLoading: false,
        total: 0,
      }
    },
    watch: {
      form: {
        handler: function (newVal) {
          this.formTemp = JSON.parse(JSON.stringify(newVal))
          if (this.pageState) {
            this.page = newVal.page
            this.pageSize = newVal.pageSize
          } else {
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
      this.fetchData()
    },
    methods: {
      // 导出
      async handleDownload() {
        const { code, data } = await this.api.getDeliveryStatisticsExport({
          start_date: this.form.order_time[0],
          end_date: this.form.order_time[1],
          type: Number(this.form.type),
          status: this.form.status,
          sn: this.form.sn,
          page: this.page,
          pageSize: this.pageSize,
        })
        if (code == 200) {
          window.open(data.url)
          this.$message.success('导出成功')
        } else {
          this.$message.error('导出失败')
        }
      },

      handleQuery() {
        this.fetchData()
      },
      resetForm() {
        this.form = {
          sn: '',
          type: '1', //导出数据格式  1颜色  2颜色+尺码 3 按款号
          status: 1, //是否减去退货数量  1：减去 0：不减
          page: 1,
          pageSize: 10,
          order_time: this.getPastTime(30),
        }
      },
      handleClick(tab) {
        this.order_source = tab.name
      },
      changeBtnPage(data) {
        this.pageState = true
        this.form.page = data
      },
      changeBtnPageSize(data) {
        this.pageState = true
        this.form.pageSize = data
      },
      async fetchData() {
        this.listLoading = true
        const { data } = await this.api.getDeliveryStatisticsList({
          start_date: this.form.order_time[0],
          end_date: this.form.order_time[1],
          type: Number(this.form.type),
          status: this.form.status,
          sn: this.form.sn,
          page: this.page,
          pageSize: this.pageSize,
        })
        this.list = data.list
        this.total = data.count
        this.listLoading = false
      },
    },
  }
</script>
