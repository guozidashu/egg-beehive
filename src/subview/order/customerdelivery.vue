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
          <el-form-item label="发货搜索:">
            <el-input
              v-model="form.sn"
              placeholder="请输入商品款号"
              style="width: 215px"
            />
          </el-form-item>
          <el-form-item label="用户搜索:">
            <el-input
              v-model="form.keywords"
              class="input-with-select"
              placeholder="请输入"
            >
              <el-select
                v-model="form.search_type"
                slot="prepend"
                style="width: 100px"
              >
                <el-option label="批次号" value="id" />
                <el-option label="手机号" value="mobile" />
                <el-option label="用户昵称" value="nick_name" />
                <el-option label="客户名称" value="name" />
                <el-option label="客户账号" value="account" />
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
          @click="handleDownload(2)"
        >
          批量导出
        </el-button>
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
    <!-- 列表 -->
    <el-card shadow="never" style="border: 0; border-radius: 5px">
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
          <el-table-column align="center" type="selection" />
          <el-table-column label="批次" prop="id" width="80" />
          <el-table-column label="客户名称" prop="customer_name" />
          <el-table-column label="订单编号" prop="sn" />
          <el-table-column label="订单状态" prop="status_text" width="150" />
          <el-table-column label="商品信息" prop="info">
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
                <div v-if="row.style_num == 1" style="margin-top: 15px">
                  {{ row.goods_name }}&nbsp;{{ row.style_num }}件
                </div>
                <div v-else style="margin-top: 15px">
                  {{ row.goods_name }}...等 &nbsp; {{ row.style_num }}款
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="总数量" prop="num" width="100" />
          <el-table-column align="right" label="总金额" prop="final_amount">
            <template #default="{ row }">
              <el-tag>￥{{ row.final_amount | moneyFormat }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="订单日期" prop="ctime" />
          <el-table-column align="center" fixed="right" label="操作" width="80">
            <template #default="{ row }">
              <el-button type="text" @click="handleDownload(3, row)">
                导出
              </el-button>
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
        // 导出弹窗状态, 导出Ids , 导出类型
        dialogVisible: false,
        ids: [],
        radio: 2,
        // 页数，条数，表单查询条件 ，表单组件和列表组件的类型，选中数据,列表数据，列表加载状态，列表总数
        page: 1,
        pageSize: 10,
        form: {
          sn: '',
          search_type: 'mobile', //搜索条件 mobile nick_name name account
          keywords: null, //关键字
          page: 1,
          pageSize: 10,
          order_time: this.getPastTime(30),
        },
        formType: 4,
        listType: 1,
        selectRows: [],
        list: [],
        listLoading: false,
        total: 0,
      }
    },
    watch: {
      // 监听表单变化
      form: {
        handler: function (newVal) {
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
      // 导出弹窗关闭
      handleClose() {
        this.dialogVisible = false
      },
      // 导出
      async handleExport() {
        const { code, data } = await this.api.getCustomerDeliveryOrderExport({
          start_date: this.form.order_time[0],
          end_date: this.form.order_time[1],
          sn: this.form.sn,
          search_type: this.form.search_type,
          keywords: this.form.keywords,
          type: this.radio,
          ids: this.ids,
        })
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
              temp.push(item.id)
            })
          }
        } else if (type == 3) {
          temp.push(row.id)
        }
        this.ids = temp
        this.dialogVisible = true
      },
      // 查询
      handleQuery() {
        this.fetchData()
      },
      // 重置
      resetForm() {
        this.form = {
          sn: '',
          search_type: 'mobile', //搜索条件 mobile nick_name name account
          keywords: null, //关键字
          page: 1,
          pageSize: 10,
          order_time: this.getPastTime(30),
        }
      },
      // 页数改变
      changeBtnPage(data) {
        this.pageState = true
        this.form.page = data
      },
      // 选中数据
      selectBtnRows(data) {
        this.selectRows = data
      },
      // 条数改变
      changeBtnPageSize(data) {
        this.pageState = true
        this.form.pageSize = data
      },
      // 获取数据
      async fetchData() {
        this.listLoading = true
        const { data } = await this.api.getCustomerDeliveryOrderList({
          start_date: this.form.order_time[0],
          end_date: this.form.order_time[1],
          search_type: this.form.search_type, //搜索条件 mobile nick_name name account
          keywords: this.form.keywords, //关键字
          sn: this.form.sn,
          page: this.page,
          pageSize: this.pageSize,
        })
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
    },
  }
</script>
