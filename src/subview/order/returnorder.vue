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
          <el-form-item label="退货类型:">
            <el-select v-model="form.return_type">
              <el-option label="全部" :value="0" />
              <el-option label="正常退货" :value="1" />
              <el-option label="次品退货" :value="2" />
            </el-select>
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
          @click="handleDownload(1)"
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
          <el-button
            size="small"
            style="margin-right: 10px"
            type="primary"
            @click="handleDownload(2)"
          >
            批量导出
          </el-button>
          <el-checkbox v-model="form.is_return">不显示已作废退货单</el-checkbox>
        </div>
        <div>
          排序
          <el-select v-model="form.region" style="width: 150px; margin: 0 10px">
            <el-option label="按退货时间" value="1" />
          </el-select>
          <el-radio-group v-model="form.sort">
            <el-radio-button label="asc">正序</el-radio-button>
            <el-radio-button label="desc">倒序</el-radio-button>
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
                    :src="row.goods_img"
                    style="width: 200px; height: 200px"
                  >
                    <div slot="error" class="el-image__error">暂无图片</div>
                  </el-image>
                  <el-image
                    :src="row.goods_img"
                    style="width: 80px; height: 80px"
                  >
                    <div slot="error" class="el-image__error">暂无图片</div>
                  </el-image>
                </el-tooltip>
                <div style="width: 280px; margin-left: 10px">
                  <div style="font-size: 14px; font-weight: 600">
                    批次号:{{ row.order_id }} |
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
                  >
                    <div slot="error" class="el-image__error">暂无图片</div>
                  </el-image>
                  <el-image
                    :src="row.goods_img"
                    style="
                      width: 30px;
                      height: 30px;
                      margin-top: 10px;
                      margin-right: 10px;
                    "
                  >
                    <div slot="error" class="el-image__error">暂无图片</div>
                  </el-image>
                </el-tooltip>
                <div style="margin-top: 15px">
                  {{ row.goods_name }}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作人" prop="action_name" />
          <el-table-column align="center" label="退至仓库" prop="order_type" />
          <el-table-column align="center" label="退货类型" prop="return_type" />
          <el-table-column align="center" label="退货原因" prop="remark">
            <template #default="{ row }">
              <div style="margin-top: 5px">
                <el-tag v-if="row.remark" type="danger">
                  {{ row.remark }}
                </el-tag>
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
    <!-- 导出类型弹窗 -->
    <el-dialog
      :before-close="handleClose"
      title="导出"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-radio-group v-model="radio">
        <el-radio :label="2">按颜色</el-radio>
        <el-radio :label="1">按款号</el-radio>
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleExport">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  // 日期组件和日期方法混入
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    mixins: [datajosn],
    data() {
      return {
        ids: [],
        radio: 2,
        // 导出类型弹窗
        dialogVisible: false,
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
        page: 1,
        pageSize: 20,
        form: {
          search_type: 'id', //搜索条件 sn订单号 goods_sn商品款号 id批次号
          keywords: '', //关键字
          page: 1,
          pageSize: 20,
          order_time: this.getPastTime(29),
          order_source: '0', //0 所有订单 1线下退货单 2线上退货单
          customer_name: '',
          is_return: false,
          sort: 'desc', //退货时间 asc 正序 desc倒序
          ids: [], //id
          region: '1',
          return_type: 0, //0全部 1正常 2次品
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
        handler: function () {
          this.page = 1
          this.pageSize = 20
          this.fetchData()
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
      // 导出弹窗关闭
      handleClose() {
        this.dialogVisible = false
      },
      // 导出
      async handleExport() {
        let temp = JSON.parse(JSON.stringify(this.form))
        temp.type = this.radio
        temp.ids = this.ids
        const { code, data } = await this.api.getReturnOrderExport(temp)
        if (code == 200) {
          window.open(data.url)
          this.$message.success('导出成功')
          this.dialogVisible = false
          this.fetchData()
        } else {
          this.$message.error('导出失败')
        }
      },
      // 导出判断数据，导出全部，导出选中，导出单条
      handleDownload(type, row) {
        let temp = []
        if (type == 1) {
          temp = []
        } else if (type == 2) {
          if (this.selectRows.length == 0) {
            this.$message.error('请选择要导出的数据')
            return
          } else {
            this.selectRows.forEach((item) => {
              temp.push(item.order_id)
            })
          }
        } else if (type == 3) {
          temp.push(row.order_id)
        }
        this.ids = temp
        this.dialogVisible = true
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
          order_time: this.getPastTime(29),
          order_source: '0', //0 所有订单 1线下退货单 2线上退货单
          customer_name: '',
          is_return: false,
          sort: 'desc', //退货时间 asc 正序 desc倒序
          ids: [], //id
          region: '1',
          return_type: 0, //0全部 1正常 2次品
        }
      },
      // tab 点击
      handleClick(tab) {
        this.order_source = tab.name
      },
      // 分页
      changeBtnPage(data) {
        this.page = data
        this.fetchData()
      },
      // 分页条数
      changeBtnPageSize(data) {
        this.pageSize = data
        this.page = 1
        this.fetchData()
      },
      fetchData() {
        this.$debounce(this.debounceFetchData, 500)
      },
      // 获取列表数据
      async debounceFetchData() {
        this.listLoading = true
        this.formTemp = JSON.parse(JSON.stringify(this.form))
        this.formTemp.page = this.page
        this.formTemp.pageSize = this.pageSize
        const { data } = await this.api.getReturnOrderList(this.formTemp)
        this.list = data.list
        this.total = data.count
        this.count_data = data.count_data
        this.listLoading = false
      },
    },
  }
</script>
