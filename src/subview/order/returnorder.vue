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
          <el-form-item label="客户名称:">
            <el-input
              v-model="form.customer_name"
              placeholder="请输入客户名称"
              style="width: 215px"
            />
          </el-form-item>
          <el-form-item label="退货搜索:">
            <el-input
              v-model="form.keywords"
              class="input-with-select"
              placeholder="请输入内容"
            >
              <el-select
                v-model="form.search_type"
                slot="prepend"
                style="width: 100px"
              >
                <el-option label="批次号" value="id" />
                <el-option label="商品款号" value="goods_sn" />
                <el-option label="订单号" value="sn" />
              </el-select>
            </el-input>
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
          @click="handleDownload()"
        >
          全部导出
        </el-button>
      </div>
    </div>
    <el-card shadow="never" style="border: 0; border-radius: 5px">
      <el-tabs v-model="form.order_source" @tab-click="handleClick">
        <el-tab-pane :label="'所有退货单（' + count_data.all + '）'" name="0" />
        <el-tab-pane
          :label="'线下退货单（' + count_data.offline + '）'"
          name="1"
        />
        <el-tab-pane
          :label="'线上退货单（' + count_data.online + '）'"
          name="2"
        />
      </el-tabs>
      <QYList
        :list="list"
        :list-type="listType"
        :state="listLoading"
        :total="total"
        @changePage="changeBtnPage"
        @changePageSize="changeBtnPageSize"
      >
        <template #List>
          <el-table-column align="center" type="selection" />
          <el-table-column align="center" label="批次号" prop="order_id" />
          <el-table-column align="center" label="订单编号" prop="order_sn" />
          <el-table-column align="right" label="总金额" prop="final_amount">
            <template #default="{ row }">
              <el-tag>￥{{ row.final_amount | moneyFormat }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="客户名称"
            prop="customer_name"
          />
          <el-table-column align="center" label="商品信息">
            <template #default="{ row }">
              <div style="display: flex">
                <el-tooltip placement="top">
                  <el-image
                    slot="content"
                    :src="row.goods_img"
                    style="width: 200px; height: 200px"
                  />
                  <el-image
                    :src="row.goods_img"
                    style="
                      width: 30px;
                      height: 30px;
                      margin-top: 10px;
                      margin-right: 10px;
                    "
                  />
                </el-tooltip>
                <div style="margin-top: 15px">
                  {{ row.goods_name }}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="总数量" prop="num" />
          <el-table-column align="center" label="退货来源" prop="order_source">
            <template #default="{ row }">
              <el-tag v-if="row.order_source == 1">线下</el-tag>
              <el-tag v-if="row.order_source == 2">线上</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="创建日期" prop="ctime" />
        </template>
      </QYList>
    </el-card>
    <edit ref="edit" @fetch-data="fetchData" />
  </div>
</template>
<script>
  import Edit from '@/subview/components/Edit/BandEdit'
  import datajosn from '@/assets/assets_josn/datajosn'
  import { getReturnOrderList, getReturnOrderExport } from '@/api/basic'
  export default {
    components: { Edit },
    mixins: [datajosn],
    data() {
      return {
        count_data: {
          all: 0,
          offline: 0,
          online: 0,
        },
        order_source: '0',

        form: {
          search_type: 'id', //搜索条件 sn订单号 goods_sn商品款号 id批次号
          keywords: '', //搜索关键字
          page: 1,
          pageSize: 20,
          order_time: this.getPastTime(30),
          order_source: '0', //0 所有订单 1线下退货单 2线上退货单
          customer_name: '', //客户名称
        },
        formType: 4,

        selectRows: [],
        listType: 1,
        list: [],
        listLoading: false,
        total: 0,
      }
    },
    watch: {
      form: {
        handler: function () {
          this.fetchData()
        },
        deep: true,
      },
    },
    created() {
      this.fetchData()
    },
    methods: {
      async handleDownload() {
        const { code, data } = await getReturnOrderExport(this.form)
        if (code == 200) {
          window.open(data.url)
          this.$message.success('导出成功')
          this.dialogVisible = false
          this.fetchData()
        } else {
          this.$message.error('导出失败')
        }
      },
      handleQuery() {
        this.fetchData()
      },
      resetForm() {
        this.form = {
          search_type: 'id', //搜索条件 sn订单号 goods_sn商品款号 id批次号
          keywords: '', //搜索关键字
          page: 1,
          pageSize: 20,
          order_time: this.getPastTime(30),
          order_source: '0', //0 所有订单 1线下退货单 2线上退货单
          customer_name: '', //客户名称
        }
      },
      handleClick(tab) {
        this.order_source = tab.name
      },
      changeBtnPage(data) {
        this.form.page = data
      },
      changeBtnPageSize(data) {
        this.form.pageSize = data
      },
      async fetchData() {
        this.listLoading = true
        const { data } = await getReturnOrderList(this.form)
        this.list = data.list
        this.total = data.count
        this.count_data = data.count_data
        this.listLoading = false
      },
    },
  }
</script>
<style lang="scss" scoped></style>
