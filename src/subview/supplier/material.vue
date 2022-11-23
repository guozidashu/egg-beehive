<template>
  <div style="background-color: #f6f8f9">
    <div
      style="padding-top: 1px; margin-bottom: 20px; background-color: #ffffff"
    >
      <Form
        :form="form"
        :form-type="formType"
        @changeSearch="handleQuery"
        @changeSta="changeBtnSta"
        @resetForm="resetForm"
      >
        <template #Form>
          <el-form-item v-show="form.fold" label="订单时间:">
            <el-date-picker
              v-model="form.date"
              align="left"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              type="daterange"
              unlink-panels
            />
          </el-form-item>
          <div v-show="!form.fold">
            <el-form-item label="订单时间:">
              <el-date-picker
                v-model="form.create_time"
                align="left"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                type="daterange"
                unlink-panels
              />
            </el-form-item>
            <el-form-item label="供应商:">
              <el-input
                v-model="form.name"
                placeholder="请输入供应商名称"
                size="small"
              />
            </el-form-item>
          </div>

          <el-form-item v-show="!form.fold" label="供应商类别:">
            <el-select v-model="form.type">
              <el-option
                v-for="item in supplier_type"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item v-show="!form.fold" label="订单状态:">
            <el-select v-model="form.order_type">
              <el-option label="全部" value="0" />
              <el-option label="全部入库" value="1" />
              <el-option label="部分入库" value="2" />
              <el-option label="未入库" value="3" />
              <el-option label="预警订单" value="4" />
              <el-option label="延期订单" value="5" />
            </el-select>
          </el-form-item>
          <el-form-item v-show="!form.fold" label="搜索:">
            <el-input
              v-model="form.keywords"
              class="input-with-select"
              placeholder="请输入"
            >
              <el-select
                v-model="form.search_type"
                slot="prepend"
                placeholder="全部"
                style="width: 100px"
              >
                <el-option label="订单号" value="sn" />
                <el-option label="商品名称" value="material_sn" />
                <el-option label="商品编号" value="material_name" />
              </el-select>
            </el-input>
          </el-form-item>
        </template>
      </Form>
    </div>
    <el-card shadow="never" style="border: 0">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane
          :label="'所有订单 (' + tatleData.all_order + ')'"
          name="0"
        />
        <el-tab-pane
          :label="'全部入库 (' + tatleData.all_warehouse + ')'"
          name="1"
        />
        <el-tab-pane
          :label="'部分入库 (' + tatleData.part_warehouse + ')'"
          name="2"
        />
        <el-tab-pane
          :label="'未入库 (' + tatleData.no_warehouse + ')'"
          name="3"
        />
        <el-tab-pane
          :label="'预警订单 (' + tatleData.warning_order + ')'"
          name="4"
        />
        <el-tab-pane
          :label="'延期订单 (' + tatleData.delay_order + ')'"
          name="5"
        />
      </el-tabs>
      <el-form ref="form" :inline="true" @submit.native.prevent>
        <el-form-item>
          <el-button
            native-type="submit"
            size="small"
            type="primary"
            @click="handleDownload"
          >
            导出订单
          </el-button>
          <el-button
            native-type="submit"
            size="small"
            type="primary"
            @click="print('multipleTable')"
          >
            打印入库单
          </el-button>
        </el-form-item>
      </el-form>
      <List
        ref="multipleTable"
        :list="list"
        :list-type="listType"
        :state="listLoading"
        :total="total"
        @changePage="changeBtnPage"
        @changePageSize="changeBtnPageSize"
        @selectRows="handleSelectionChange"
      >
        <template #List>
          <el-table-column type="selection" />
          <el-table-column label="订单号" prop="sn" sortable width="120" />
          <el-table-column label="采购日期" prop="add_date" />
          <el-table-column label="供应商名称" prop="su_name" width="120" />
          <el-table-column label="物料信息" prop="info" width="300">
            <template #default="{ row }">
              <div style="display: flex">
                <img
                  :src="row.info.material_pic"
                  style="
                    width: 30px;
                    height: 30px;
                    margin-top: 10px;
                    margin-right: 10px;
                  "
                />
                <p
                  style="
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  "
                >
                  {{ row.info.material_name }}
                </p>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="采购数量" prop="num" width="80" />
          <el-table-column label="入库数量" prop="receipt_num" width="80" />
          <el-table-column label="金额" prop="total" width="80" />
          <el-table-column label="预计交货时间" prop="expected_date" />
          <el-table-column label="订单状态" prop="order_status" width="120">
            <template #default="{ row }">
              <div
                style="
                  width: 80px;
                  line-height: 22px;
                  color: #ffa39e;
                  text-align: center;
                  background: #fff1f0;
                  border-color: #ffa39e;
                "
              >
                {{ row.order_status }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="超期状态" prop="delay" width="120">
            <template #default="{ row }">
              <div
                style="
                  width: 80px;
                  line-height: 22px;
                  color: #ffa39e;
                  text-align: center;
                  background: #fff1f0;
                  border-color: #ffa39e;
                "
              >
                {{ row.delay }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            fixed="right"
            label="操作"
            show-overflow-tooltip
            width="150"
          >
            <template #default="{ row }">
              <el-button
                v-has-permi="['btn:SupplierMaterial:view']"
                type="text"
                @click="handleDetail(row, 1)"
              >
                详情
              </el-button>
              <!-- <el-button type="text" @click="handleEdit(row, 1)">
                收货
              </el-button>
              <el-button type="text" @click="handleEdit(row, 2)">
                退货
              </el-button> -->
            </template>
          </el-table-column>
        </template>
      </List>
    </el-card>
    <el-drawer size="50%" :visible.sync="drawer" :with-header="false">
      <!-- 详情抽屉组件 -->
      <Drawer :drawer-inof="drawerInof" :drawer-type="drawerType" />
    </el-drawer>
    <edit ref="edit" @fetch-data="fetchData" />
  </div>
</template>

<script>
  import List from '@/subview/components/List'
  import Form from '@/subview/components/Form'
  import Drawer from './components/OrderDrawer'
  import edit from './components/MaterialEdit'
  import { mapActions } from 'vuex'
  import VabPrint from '@/extra/VabPrint'
  import {
    getPurchaseList,
    getCommonAllList,
    getpurchaseGetCount,
  } from '@/api/basic'
  import datajosn from '@/assets/assets_josn/datajosn'
  import publicjosn from '@/assets/assets_josn/publicjosn'
  export default {
    name: 'SupplierMaterial',
    components: { List, Form, Drawer, edit },
    mixins: [datajosn, publicjosn],
    data() {
      return {
        drawer: false,
        drawerInof: {},
        drawerType: 1,
        filename: '物料采购订单',
        downloadLoading: false,
        exclList: [],
        supplier_type: [],
        activeName: '0',
        // 表单数据/列表参数
        form: {
          fold: true,
          page: 1,
          pageSize: 10,
          name: '',
          type: '',
          create_time: [],
          search_type: 'sn',
          keywords: '',
          order_type: '0',
        },
        listType: 1,
        formType: 1,
        list: [],
        listLoading: false,
        total: 0,
        tatleData: {
          all_order: null, // 全部
          all_warehouse: null, // 仓库中
          part_warehouse: null, // 已售完
          no_warehouse: null, // 预警
          warning_order: null, // 待确认
          delay_order: null, // 自营
        },
      }
    },
    watch: {
      form: {
        //表单筛选条件变化实时刷新列表
        handler: function () {
          this.fetchData()
          this.getTatleAll()
        },
        deep: true,
      },
    },
    created() {
      this.getSelectData()
      this.getTatleAll()
      this.fetchData()
    },
    methods: {
      changeBtnSta(data) {
        this.form.fold = data
      },
      handleQuery() {
        this.form.page = 1
      },
      handleClick(tab) {
        this.form.order_type = tab.name
      },
      resetForm() {
        this.form = this.$options.data().form
      },
      async getTatleAll() {
        const { data } = await getpurchaseGetCount(this.form)
        this.tatleData = data
      },
      async fetchData() {
        this.listLoading = true
        const { data } = await getPurchaseList(this.form)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
        this.list.forEach((item) => {
          if (item.info.material_name == undefined) {
            item.info.material_name = ''
          }
          item.inofText = item.info.material_name
        })
      },
      async getSelectData() {
        const { data } = await getCommonAllList({ type: 'supplier_type' })
        this.supplier_type = data.supplier_type
      },
      handleEdit(row, type) {
        if (row === 'add') {
          this.$refs['edit'].showEdit(row, type)
        } else {
          if (row.id) {
            this.$refs['edit'].showEdit(row, type)
          } else {
            this.$refs['edit'].showEdit(row, type)
          }
        }
      },
      // 详情抽屉
      handleDetail(row, type) {
        if (row == 'add') {
          this.drawerInof = {}
          this.drawerInof.drawerType = type
        } else {
          this.drawerInof = JSON.parse(JSON.stringify(row))
          this.drawerInof.drawerType = type
        }
        this.drawer = true
      },
      // 打印
      ...mapActions({
        openSideBar: 'settings/openSideBar',
        foldSideBar: 'settings/foldSideBar',
      }),
      async print(val) {
        await this.foldSideBar()
        await VabPrint(this.$refs[val], { noPrintParent: true })
        await this.openSideBar()
      },
      // 导出
      handleSelectionChange(val) {
        this.exclList = val
      },
      handleDownload() {
        if (this.exclList.length) {
          this.downloadLoading = true
          import('@/utils/excel').then((excel) => {
            const tHeader = [
              '订单号',
              '采购日期',
              '供应商名称',
              '商品信息',
              '采购数量',
              '入库数量',
              '金额',
              '预计交货时间',
              '订单状态',
              '完成状态',
            ]
            const filterVal = [
              'sn',
              'add_date',
              'su_name',
              'inofText',
              'num',
              'receipt_num',
              'total',
              'expected_date',
              'order_status',
              'delay',
            ]
            const list = this.exclList
            const data = this.formatJson(filterVal, list)
            excel.export_json_to_excel({
              header: tHeader,
              data,
              filename: this.filename,
            })
            this.$refs.multipleTable.$children[0].clearSelection()
            this.downloadLoading = false
          })
        } else {
          this.$baseMessage('请至少选择一行', 'error', 'vab-hey-message-error')
        }
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map((v) => filterVal.map((j) => v[j]))
      },
    },
  }
</script>
<style lang="scss" scoped></style>
