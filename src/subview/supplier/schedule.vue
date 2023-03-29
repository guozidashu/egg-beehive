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
      <QYForm
        :form="form"
        :form-type="formType"
        @changeSearch="handleQuery"
        @resetForm="resetForm"
      >
        <template #Form>
          <el-form-item label="订单类型:">
            <el-select v-model="form.type2">
              <el-option label="期货" :value="1" />
              <el-option label="首单" :value="2" />
              <el-option label="补单" :value="3" />
              <el-option label="预售" :value="4" />
            </el-select>
          </el-form-item>
          <el-form-item label="供应商类别:">
            <el-select v-model="form.supplier_type">
              <el-option
                v-for="item in supplier_type"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="裁剪状态:">
            <el-select v-model="form.type">
              <el-option label="未裁剪" :value="1" />
              <el-option label="部分裁剪" :value="2" />
              <el-option label="全部裁剪" :value="3" />
            </el-select>
          </el-form-item>
          <el-form-item label="入库状态:">
            <el-select v-model="form.type3">
              <el-option label="部分入库" :value="1" />
              <el-option label="全部入库" :value="2" />
              <el-option label="未入库" :value="3" />
            </el-select>
          </el-form-item>
          <el-form-item label="订单状态:">
            <el-select v-model="form.ordertype">
              <el-option label="全部订单" :value="0" />
              <el-option label="正常订单" :value="1" />
              <el-option label="预警订单" :value="2" />
              <el-option label="超期订单" :value="1" />
              <el-option label="延期订单" :value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="优先度:">
            <el-select v-model="form.type5">
              <el-option label="紧急" :value="1" />
              <el-option label="加急" :value="2" />
              <el-option label="正常" :value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="生产进度:">
            <el-select v-model="form.type6">
              <el-option label="暂未确认" :value="1" />
            </el-select>
          </el-form-item>
          <el-form-item label="款式类型:">
            <el-select v-model="form.type1">
              <el-option label="整手" :value="1" />
              <el-option label="散码" :value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="排序:">
            <el-select v-model="form.rand">
              <el-option label="下单日期(从远到近)" :value="1" />
              <el-option label="下单日期(从近到远)" :value="2" />
              <el-option label="交货日期(从远到近)" :value="3" />
              <el-option label="交货日期(从近到远)" :value="4" />
              <el-option label="进度完工率(从远到近)" :value="5" />
              <el-option label="进度完工率(从近到远)" :value="6" />
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-select
              v-model="form.dateType"
              style="width: 100px; margin-right: 10px"
            >
              <el-option label="交货日期" :value="1" />
              <el-option label="订单日期" :value="2" />
            </el-select>
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
          <el-form-item label="搜索：">
            <el-input
              v-model="form.keywords"
              placeholder="请输入供应商名称/客户名称/款号/批次"
              size="small"
              style="width: 300px"
            />
          </el-form-item>
        </template>
      </QYForm>
    </div>
    <el-card shadow="never" style="border: 0; border-radius: 5px">
      <el-tabs v-model="form.list_type" @tab-click="handleClick">
        <el-tab-pane :label="'全部商品 (0)'" name="0" />
        <el-tab-pane :label="'正常订单 (0)'" name="2" />
        <el-tab-pane :label="'预警订单 (0)'" name="3" />
        <el-tab-pane :label="'超期订单 (0)'" name="7" />
        <el-tab-pane :label="'延期订单（异常） (0)'" name="8" />
      </el-tabs>
      <el-form ref="form" :inline="true" @submit.native.prevent>
        <el-form-item>
          <el-button size="small" type="primary" @click="handleAdd()">
            新增排期
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary">批量导出</el-button>
        </el-form-item>
      </el-form>
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
          <el-table-column align="center" label="生产批次" prop="id" />
          <el-table-column align="center" label="供应商名称" prop="name" />
          <el-table-column
            align="center"
            label="商品信息"
            prop="goods"
            width="300"
          >
            <template #default="{ row }">
              <div style="display: flex">
                <el-image
                  :src="row.goods.img"
                  style="width: 100px; height: 100px"
                />
                <div style="margin-left: 10px">
                  <div
                    style="
                      width: 150px;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                    "
                  >
                    {{ row.goods.name }}
                  </div>
                  <div style="margin: 15px 0">{{ row.goods.sn }}</div>
                  <div v-if="row.goods_num == 1">{{ row.goods_num }}件</div>
                  <div v-else>等{{ row.goods_num }}件</div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="订单数量" prop="num" />
          <el-table-column align="center" label="裁剪数量" prop="num" />
          <el-table-column align="center" label="实裁比率" prop="num" />
          <el-table-column align="center" label="入库数量" prop="num" />
          <el-table-column align="center" label="完工率" prop="num" />
          <el-table-column align="center" label="下单时间" prop="create_time" />
          <el-table-column align="center" label="交货时间" prop="create_time" />
          <el-table-column align="center" label="操作" width="120">
            <template #default="{ row }">
              <div><el-button type="text">进度跟单</el-button></div>
              <div style="display: flex">
                <el-button type="text" @click="handleDelete(row)">
                  作废
                </el-button>
                <el-button type="text">裁剪完成</el-button>
              </div>
            </template>
          </el-table-column>
        </template>
      </QYList>
    </el-card>
    <edit ref="edit" @fetch-data="fetchData" />
    <el-drawer
      :before-close="handleClose"
      size="50%"
      title="新增排期"
      :visible.sync="drawer"
      :wrapper-closable="false"
    >
      <Drawer :drawer-inof="drawerInof" @handle-close="handleClose" />
    </el-drawer>
  </div>
</template>
<script>
  import Edit from '@/subview/components/Edit/BandEdit'
  import datajosn from '@/assets/assets_josn/datajosn'
  import Drawer from '@/subview/components/Drawer/ScheduleDrawer'
  export default {
    components: { Edit, Drawer },
    mixins: [datajosn],
    data() {
      return {
        drawerInof: {},
        drawer: false,
        formTemp: null,
        page: 1,
        pageSize: 10,
        form: {
          list_type: '0',
          ordertype: 0,
          dateType: 1,
          rand: 1,
          supplier_type: '',
          keywords: '',
          time: [],
          page: 1,
          pageSize: 10,
        },
        supplier_type: [],
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
          // 这里做排序改变日期类型判断 if(newVal.rand)
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
      this.fetchData()
      this.getSelectData()
    },
    methods: {
      handleClose() {
        this.drawer = false
      },
      handleAdd() {
        this.drawerInof = {
          title: '新增',
          type: 1,
          id: '',
        }
        this.drawer = true
      },
      handleClick(tab) {
        this.form.list_type = tab.name
      },
      async getSelectData() {
        const { data } = await this.api.getCommonAllList({
          type: 'supplier_type',
        })
        this.supplier_type = data.supplier_type
      },
      handleQuery() {
        this.fetchData()
      },
      resetForm() {
        this.form = this.$options.data().form
      },
      handleDelete(row) {
        // if (row.id) {
        //   this.$baseConfirm('你确定要作废当前项吗', null, async () => {
        //     const { code } = await this.api.delBandDel({ id: row.id })
        //     if (code != 200) {
        //       return
        //     }
        //     this.$baseMessage('作废成功', 'success', 'vab-hey-message-success')
        //     this.fetchData()
        //   })
        // }
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
        if (this.formTemp == null) {
          this.formTemp = JSON.parse(JSON.stringify(this.form))
        }
        const { data } = await this.api.getCuttingOrder(this.formTemp)
        this.list = data.list.data
        this.total = data.list.total
        this.listLoading = false
      },
    },
  }
</script>
<style lang="scss" scoped></style>
