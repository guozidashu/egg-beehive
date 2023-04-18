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
      <!-- 查询条件/操作按钮 -->
      <QYForm
        :form="form"
        :form-type="formType"
        @changeSearch="handleQuery"
        @resetForm="resetForm"
      >
        <template #Form>
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
          <el-form-item label="退货时间:">
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
          <el-form-item label="客户名称:">
            <el-input
              v-model="form.customer_name"
              placeholder="请输入客户名称"
              style="width: 215px"
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
    <!-- tabs/列表 -->
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
      <div
        style="
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        "
      >
        <div>
          <el-button :disabled="printSelect" size="small" type="primary">
            打印退货单
          </el-button>
          <el-button size="small" style="margin-right: 10px" type="primary">
            批量导出
          </el-button>
          <el-checkbox v-model="form.is_return">不显示已作废退货单</el-checkbox>
        </div>
        <div>
          排序
          <el-select v-model="form.region" style="width: 150px; margin: 0 10px">
            <el-option label="按退货时间" value="1" />
          </el-select>
          <el-radio-group v-model="form.order_sort">
            <el-radio-button :label="1">正序</el-radio-button>
            <el-radio-button :label="2">倒序</el-radio-button>
          </el-radio-group>
        </div>
      </div>
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
          <el-table-column label="发货信息" width="400">
            <template #default="{ row }">
              <div style="display: flex">
                <el-tooltip placement="top">
                  <el-image
                    slot="content"
                    src="row.info.img"
                    style="width: 200px; height: 200px"
                  />
                  <el-image
                    src="row.info.img"
                    style="width: 80px; height: 80px"
                  />
                </el-tooltip>
                <div style="width: 280px; margin-left: 10px">
                  <div style="font-size: 14px; font-weight: 600">
                    批次号:{{ row.id }} |
                    <el-tag type="danger">已退货</el-tag>
                  </div>
                  <div style="margin: 5px 0">
                    {{ row.customer_name }}
                  </div>
                  <div style="margin: 5px 0 0 0">退货时间:{{ row.ctime }}</div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="right" label="退货金额" prop="final_amount">
            <template #default="{ row }">
              <el-tag>￥{{ row.final_amount | moneyFormat }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="退货件数" prop="num" />
          <el-table-column label="商品信息" width="250">
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
          <el-table-column align="center" label="操作人" prop="ctime1" />
          <el-table-column align="center" label="处理人" prop="ctime1" />
          <el-table-column align="center" label="退至仓库" prop="ctime1" />
          <el-table-column align="center" label="退货原因" prop="ctime1">
            <template #default="{ row }">
              <div>
                <el-tag v-if="row.order_source" type="warning">次品退货</el-tag>
              </div>
              <div style="margin-top: 5px">
                <el-tag v-if="row.order_source" type="danger">政策换货</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            fixed="right"
            label="操作"
            width="100"
          >
            <template #default="{ row }">
              <el-button type="text" @click="handleDownload(3, row)">
                导出
              </el-button>
              &nbsp;
              <el-dropdown>
                <el-button class="el-dropdown-link" type="text">
                  <span>更多</span>
                  <vab-icon
                    class="vab-dropdown-active"
                    icon="arrow-up-s-line"
                  />
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <el-button type="text">打印退货单</el-button>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
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
  export default {
    mixins: [datajosn],
    data() {
      return {
        // 打印按钮是否可用
        printSelect: true,
        // 选中的行
        selectRows: [],
        // tab 数据
        count_data: {
          all: 0,
          offline: 0,
          online: 0,
        },
        // tab 页签
        order_source: '0',
        // 页数，条数，表单查询条件 ，表单组件和列表组件的类型,列表数据，列表加载状态，列表总数
        formTemp: null,
        page: 1,
        pageSize: 10,
        form: {
          search_type: 'id', //搜索条件 sn订单号 goods_sn商品款号 id批次号
          keywords: '', //关键字
          page: 1,
          pageSize: 10,
          order_time: this.getPastTime(30),
          order_source: '0', //0 所有订单 1线下退货单 2线上退货单
          customer_name: '',
          is_return: false,
        },
        formType: 4,
        listType: 1,
        list: [],
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
      // 监听列表选中数据，改变打印配货单按钮状态
      selectRows: {
        handler: function (newVal) {
          if (newVal.length > 0) {
            this.printSelect = false
          } else {
            this.printSelect = true
          }
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
        const { code, data } = await this.api.getReturnOrderExport(this.form)
        if (code == 200) {
          window.open(data.url)
          this.$message.success('导出成功')
          this.dialogVisible = false
          this.fetchData()
        } else {
          this.$message.error('导出失败')
        }
      },
      // 选中数据
      selectBtnRows(data) {
        this.selectRows = data
      },
      // 查询
      handleQuery() {
        this.fetchData()
      },
      // 重置
      resetForm() {
        this.form = {
          search_type: 'id', //搜索条件 sn订单号 goods_sn商品款号 id批次号
          keywords: '', //关键字
          page: 1,
          pageSize: 20,
          order_time: this.getPastTime(30),
          order_source: '0', //0 所有订单 1线下退货单 2线上退货单
          customer_name: '',
        }
      },
      // tab 点击
      handleClick(tab) {
        this.order_source = tab.name
      },
      // 页数改变
      changeBtnPage(data) {
        this.pageState = true
        this.form.page = data
      },
      // 条数改变
      changeBtnPageSize(data) {
        this.pageState = true
        this.form.pageSize = data
      },
      // 获取列表数据
      async fetchData() {
        this.listLoading = true
        if (this.formTemp == null) {
          this.formTemp = JSON.parse(JSON.stringify(this.form))
        }
        const { data } = await this.api.getReturnOrderList(this.formTemp)
        this.list = data.list
        this.total = data.count
        this.count_data = data.count_data
        this.listLoading = false
      },
    },
  }
</script>
