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
      >
        <template #Form>
          <el-form-item v-show="form.fold" label="订单时间:">
            <el-date-picker
              v-model="form.date"
              align="right"
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
                v-model="form.date"
                align="right"
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
                v-model="form.search"
                placeholder="请输入供应商名称"
                size="small"
              />
            </el-form-item>
          </div>

          <el-form-item v-show="!form.fold" label="供应商类别:">
            <el-select v-model="form.region">
              <el-option label="成品采购" value="shanghai" />
              <el-option label="原料供应商" value="shanghai" />
              <el-option label="辅料供应商" value="shanghai" />
              <el-option label="外协加工厂" value="shanghai" />
              <el-option label="其它供应商" value="shanghai" />
            </el-select>
          </el-form-item>
          <el-form-item v-show="!form.fold" label="订单状态:">
            <el-select v-model="form.region">
              <el-option label="全部入库" value="shanghai" />
              <el-option label="部分入库" value="shanghai" />
              <el-option label="未入库" value="shanghai" />
            </el-select>
          </el-form-item>
          <el-form-item v-show="!form.fold" label="搜索:">
            <el-input
              v-model="form.input3"
              class="input-with-select"
              placeholder="请输入"
            >
              <el-select
                v-model="form.select"
                slot="prepend"
                placeholder="全部"
                style="width: 100px"
              >
                <el-option label="订单号" value="5" />
                <el-option label="商品名称" value="6" />
                <el-option label="商品编号" value="6" />
              </el-select>
            </el-input>
          </el-form-item>
        </template>
      </Form>
    </div>
    <el-card shadow="never" style="border: 0">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="所有订单 (3)" name="first" />
        <el-tab-pane label="全部入库 (129)" name="second" />
        <el-tab-pane label="部分入库 (18)" name="three" />
        <el-tab-pane label="未入库 (18)" name="four" />
        <el-tab-pane label="预警订单 (2)" name="five" />
        <el-tab-pane label="延期订单 (2)" name="six" />
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
          <el-table-column label="订单号" prop="orderno" sortable width="120" />
          <el-table-column label="采购日期" prop="data" />
          <el-table-column label="订单类型" prop="name" width="120" />
          <el-table-column label="供应商名称" prop="name" width="120" />
          <el-table-column label="商品信息" prop="inof" width="300">
            <template #default="{ row }">
              <div
                v-for="(item, index) in row.inof"
                :key="index"
                style="display: flex"
              >
                <img
                  :src="item.img"
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
                  {{ item.text }}
                </p>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="采购数量" prop="num" width="80" />
          <el-table-column label="入库数量" prop="num" width="80" />
          <el-table-column label="金额" prop="money" width="80" />
          <el-table-column label="预计交货时间" prop="end_time" />
          <el-table-column label="订单状态" prop="state" width="120">
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
                {{ row.state }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="完成状态" prop="state1" width="120">
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
                {{ row.state1 }}
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
              <el-button type="text" @click="handleDetail(row, 1)">
                详情
              </el-button>
              <el-button type="text">收货</el-button>
              <el-button type="text">退货</el-button>
            </template>
          </el-table-column>
        </template>
      </List>
    </el-card>
    <el-drawer size="50%" :visible.sync="drawer" :with-header="false">
      <!-- 详情抽屉组件 -->
      <Drawer :drawer-inof="drawerInof" :drawer-type="drawerType" />
    </el-drawer>
  </div>
</template>

<script>
  import List from '@/subview/components/List'
  import Form from '@/subview/components/Form'
  import Drawer from './components/OrderDrawer'
  import { mapActions } from 'vuex'
  import VabPrint from '@/extra/VabPrint'
  export default {
    name: 'SupplierProduct',
    components: { List, Form, Drawer },
    data() {
      return {
        drawer: false,
        drawerInof: {},
        drawerType: 2,
        filename: '成品采购订单',
        downloadLoading: false,
        exclList: [],
        pickerOptions: {
          cellClassName: (time) => {
            if (
              new Date().getDate() === time.getDate() &&
              new Date().getMonth() === time.getMonth() &&
              new Date().getFullYear() === time.getFullYear()
            ) {
              return 'dateArrClass' // 返回值设置的是我们添加的类名
            }
          },
          shortcuts: [
            {
              text: '今天',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                picker.$emit('pick', [start, end])
              },
            },
            {
              text: '昨天',
              onClick(picker) {
                const end = new Date()
                const start = new Date().getTime() - 3600 * 1000 * 24 * 1
                end.setTime(start)
                picker.$emit('pick', [start, end])
              },
            },
            {
              text: '最近7天',
              onClick(picker) {
                const end = new Date()
                const start = new Date().getTime() - 3600 * 1000 * 24 * 7
                picker.$emit('pick', [start, end])
              },
            },
            {
              text: '最近30天',
              onClick(picker) {
                const end = new Date()
                const start = new Date().getTime() - 3600 * 1000 * 24 * 30
                picker.$emit('pick', [start, end])
              },
            },
            {
              text: '本月',
              onClick(picker) {
                const end = new Date()
                const start =
                  new Date().getTime() -
                  3600 * 1000 * 24 * (new Date().getDate() - 1)
                picker.$emit('pick', [start, end])
              },
            },
            {
              text: '本年',
              onClick(picker) {
                const start = new Date(new Date().getFullYear(), 0, 1)
                const end = new Date()
                picker.$emit('pick', [start, end])
              },
            },
          ],
        },
        activeName: 'first',
        // 表单数据/列表参数
        form: {
          // 自定义参数
          fold: true,
          // 公共参数
          page: 1,
          pageSize: 10,
        },
        // 列表数据相关
        // 公共参数
        listType: 1,
        formType: 1,
        // orderno type name inof num money creat_time end_time state
        list: [
          {
            orderno: 'wx312009361683644416',
            creat_time: '2022-10-13 23:33:48',
            end_time: '2022-11-13 23:33:48',
            type: '计划生产',
            inof: [
              {
                text: 'BY FAR Miranda leather shoulder bag | 默认',
                img: 'https://s-pro.crmeb.net/uploads/attach/2022/08/20220829/37f1bc531c111a41e1c038074e2ff649.jpg',
              },
              {
                text: 'BY FAR Miranda leather shoulder bag | 默认',
                img: 'https://s-pro.crmeb.net/uploads/attach/2022/08/20220829/37f1bc531c111a41e1c038074e2ff649.jpg',
              },
            ],
            name: '阿白',
            num: 23,
            money: 345,
            state: '部分入库',
            state1: '延期一天',
            data: '2022-10-13 23:33:48',
          },
          {
            orderno: 'wx312009361683644416',
            creat_time: '2022-10-13 23:33:48',
            end_time: '2022-11-13 23:33:48',
            type: '成品采购',
            inof: [
              {
                text: 'BY FAR Miranda leather shoulder bag | 默认',
                img: 'https://s-pro.crmeb.net/uploads/attach/2022/08/20220829/37f1bc531c111a41e1c038074e2ff649.jpg',
              },
              {
                text: 'BY FAR Miranda leather shoulder bag | 默认',
                img: 'https://s-pro.crmeb.net/uploads/attach/2022/08/20220829/37f1bc531c111a41e1c038074e2ff649.jpg',
              },
            ],
            name: '阿白',
            num: 23,
            money: 345,
            state: '未入库',
            state1: '延期一天',
            data: '2022-10-13 23:33:48',
          },
        ],
        listLoading: false,
        total: 0,
      }
    },
    watch: {
      form: {
        //表单筛选条件变化实时刷新列表
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
      // 列表表单子组件展开闭合事件  公共部分
      changeBtnSta(data) {
        this.form.fold = data
      },
      handleQuery() {},
      // 列表数据封装函数

      // 列表数据改变页数   公共部分
      changeBtnPage(data) {
        this.form.page = data
      },
      // 列表数据改变每页条数  自定义部分
      changeBtnPageSize(data) {
        this.form.pageSize = data
      },
      // 列表数据表头切换监听 自定义部分
      handleClick(tab) {
        console.log(1111, tab.label)
        this.form.page = 1
      },
      // 列表数据请求函数 公共部分
      async fetchData() {
        // this.listLoading = true
        // const {
        //   data: { list, total },
        // } = await getList(this.form)
        // this.list = list
        // this.total = total
        // this.listLoading = false
        this.list.forEach((item) => {
          item.inofText = ''
          item.inof.forEach((item1) => {
            item.inofText = item.inofText + item1.text
          })
        })
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
        console.log(111, val)
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
          console.log(888, this.exclList)
          this.downloadLoading = true
          import('@/utils/excel').then((excel) => {
            const tHeader = [
              '订单号',
              '采购日期',
              '供应商名称',
              '商品信息',
              '数量',
              '金额',
              '预计交货时间',
              '订单状态',
              '完成状态',
            ]
            const filterVal = [
              'orderno',
              'data',
              'name',
              'inofText',
              'num',
              'money',
              'end_time',
              'state',
              'state1',
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
