<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="50%"
    @close="close"
  >
    <div style="padding: 0 20px; background-color: white; border-radius: 5px">
      <el-form
        ref="form"
        :inline="true"
        label-width="80px"
        :model="form"
        style="display: flex; justify-content: space-between"
        @submit.native.prevent
      >
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
  </el-dialog>
</template>

<script>
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    mixins: [datajosn],
    data() {
      return {
        // 欠货明细 表格数据
        listTotal: 0,
        listLoading: false,
        listType: 1,
        goodsOwedList: [],
        // 欠货明细 下拉框数据
        selectList: [],
        title: '',
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
        dialogFormVisible: false,
        // 查询，分页表格处理相关参数
        formTemp: null,
        page: 1,
        pageSize: 10,
        // 查询条件表单
        form: {
          goods_id: null,
          page: 1,
          pageSize: 10,
          name: null,
          create_time: '',
          level_id: null,
          type: null, // 统计类型 1=总数量 2=已发数量 3=现货库存 4=生产中库存 5=待发数量 默认订单创建时间
        },
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
    },
    methods: {
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
      // 欠货明细 查询表单 会员等级下拉框
      async getTypeList() {
        const { data } = await this.api.getCommonAllList({
          type: 'customer_grade',
        })
        this.selectList = data
      },
      showEdit(row) {
        this.title = '明细'
        this.form.goods_id = row.goods_id
        this.dialogFormVisible = true
      },
      close() {
        this.dialogFormVisible = false
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
    },
  }
</script>
