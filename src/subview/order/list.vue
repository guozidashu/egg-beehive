<template>
  <div style="background-color: #f6f8f9">
    <div
      style="padding-top: 1px; margin-bottom: 20px; background-color: #ffffff"
    >
      <Form
        :form="form"
        :form-type="formType"
        @changeSearch="handleQuery"
        @resetForm="resetForm"
      >
        <template #Form>
          <el-form-item label="订单状态:">
            <el-select v-model="form.region">
              <el-option label="全部" value="1" />
              <el-option label="待收款" value="2" />
              <el-option label="待发货" value="3" />
              <el-option label="退货单" value="4" />
              <el-option label="待确认" value="5" />
            </el-select>
          </el-form-item>
          <el-form-item label="配送方式:">
            <el-select v-model="form.region1">
              <el-option label="全部" value="1" />
              <el-option label="普通快递" value="2" />
              <el-option label="门店自提" value="3" />
              <el-option label="送货上门" value="4" />
            </el-select>
          </el-form-item>
          <el-form-item label="付款状态:">
            <el-select v-model="form.region2">
              <el-option label="全部" value="1" />
              <el-option label="未付款" value="2" />
              <el-option label="部分付款" value="3" />
              <el-option label="已付款" value="4" />
            </el-select>
          </el-form-item>
          <el-form-item label="发货状态:">
            <el-select v-model="form.region3">
              <el-option label="全部" value="1" />
              <el-option label="未发货" value="2" />
              <el-option label="部分发货" value="3" />
              <el-option label="发货完成" value="4" />
            </el-select>
          </el-form-item>
          <el-form-item label="订单时间:">
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
          <el-form-item label="订单搜索:">
            <el-input
              v-model="form.input3"
              class="input-with-select"
              placeholder="请输入内容"
            >
              <el-select
                v-model="form.select"
                slot="prepend"
                style="width: 100px"
              >
                <el-option label="客户名称" value="1" />
                <el-option label="客户电话" value="2" />
                <el-option label="订单号" value="3" />
              </el-select>
            </el-input>
          </el-form-item>
        </template>
      </Form>
    </div>

    <el-card shadow="never" style="border: 0">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="所有订单" name="first" />
        <el-tab-pane label="ERP平台 (100)" name="second" />
        <el-tab-pane label=" 私有商城 (10)" name="three" />
        <el-tab-pane label="第三方订单 (100)" name="four" />
        <el-tab-pane label="门店订单 (10)" name="five" />
      </el-tabs>
      <el-form ref="form" :inline="true" @submit.native.prevent>
        <el-form-item>
          <el-button
            native-type="submit"
            size="small"
            type="primary"
            @click="print('multipleTable')"
          >
            打印配发单
          </el-button>
          <el-button
            native-type="submit"
            size="small"
            type="primary"
            @click="handleDownload"
          >
            导出订单
          </el-button>
        </el-form-item>
      </el-form>
      <!-- 表格组件使用 -->
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
          <el-table-column label="订单号" prop="orderno" width="120" />
          <el-table-column label="订单日期" prop="date" sortable width="200" />
          <el-table-column label="订单类型" prop="type" width="120" />
          <el-table-column label="客户名称" prop="username" width="120">
            <template #default="{ row }">
              <span>{{ row.address }}</span>
              |
              <span>{{ row.username }}</span>
            </template>
          </el-table-column>
          <el-table-column label="商品信息" prop="inof">
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
          <el-table-column label="总数量" prop="num" width="80" />
          <el-table-column label="总金额" prop="money" width="80" />
          <el-table-column label="配送方式" prop="pay" width="120" />
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
          <el-table-column label="操作" width="100">
            <template #default="{ row }">
              <el-button
                v-if="row.state === '待收款'"
                type="text"
                @click="handleEdit(row)"
              >
                发送货
              </el-button>
              <span v-if="row.state === '待收款'">|</span>
              <el-button type="text" @click="handleDetail(row)">详情</el-button>
            </template>
          </el-table-column>
        </template>
      </List>
    </el-card>
    <el-drawer size="50%" :visible.sync="drawer" :with-header="false">
      <!-- 详情抽屉组件 -->
      <Drawer @drawerPrint="print" @drawerhandleEdit="handleEdit" />
    </el-drawer>
    <edit ref="edit" @fetch-data="fetchData" />
  </div>
</template>

<script>
  import List from '@/subview/components/List'
  import Form from '@/subview/components/Form'
  import Drawer from './components/Drawer'
  import Edit from './components/ListEdit'
  // import { getList } from '@/api/userManagement'
  // 打印
  import { mapActions } from 'vuex'
  import VabPrint from '@/extra/VabPrint'
  export default {
    name: 'OrderList',
    components: { Form, List, Drawer, Edit },
    data() {
      return {
        filename: '订单列表',
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
        drawer: false,
        // 表单数据/列表参数
        form: {
          // 自定义参数
          fold: true,
          data: '',
          select: '1',
          region: '1',
          region2: '1',
          region3: '1',
          region1: '1',
          // 公共参数
          page: 1,
          pageSize: 10,
        },
        // 列表数据相关

        // 公共参数
        listType: 1,
        formType: 4,
        list: [
          {
            orderno: 'wx312009361683644416',
            date: '2022-10-13 23:33:48',
            type: '普通订单',
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
            username: '阿白',
            address: '北京市',
            pay: '普通快递',
            num: 23,
            money: 345,
            state: '已完成',
          },
          {
            orderno: 'wx312009361683644416',
            date: '2022-10-13 23:33:48',
            type: '普通订单',
            address: '北京市',
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
            username: '阿蓝',
            pay: '全国配送',
            num: 23,
            money: 345,
            state: '待收款',
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
        console.log(2323233, data)
        this.form.fold = data
      },
      // 列表表单子组件查询事件   公共部分
      handleQuery(data) {
        console.log(6666, data)
        this.form.page = 1
      },
      // 列表表单单选标签监听  自定义部分
      changeHandler(data) {
        console.log(888, data)
        this.form.page = 1
      },
      // 列表数据表头切换监听 自定义部分
      handleClick(tab) {
        console.log(1111, tab.label)
        this.form.page = 1
      },
      resetForm() {
        this.form = this.$options.data().form
      },
      // 列表数据封装函数

      // 列表数据改变页数   公共部分
      changeBtnPage(data) {
        console.log(9090909, data)
        this.form.page = data
      },
      // 列表数据改变每页条数  自定义部分
      changeBtnPageSize(data) {
        console.log(8080080, data)
        this.form.pageSize = data
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
      handleDetail() {
        this.drawer = true
      },
      // 新增修改
      async handleEdit(row) {
        console.log(222, row)
        if (row === 'add') {
          this.$refs['edit'].showEdit()
        } else {
          if (row.id) {
            this.$refs['edit'].showEdit(row)
          } else {
            this.$refs['edit'].showEdit()
          }
        }
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
              '单据日期',
              '订单类型',
              '客户名称',
              '商品信息',
              '数量',
              '实际金额',
              '支付方式',
              '订单状态',
            ]
            const filterVal = [
              'orderno',
              'date',
              'type',
              'username',
              'inofText',
              'num',
              'money',
              'pay',
              'state',
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
<style>
  .dateArrClass > div ::after {
    position: absolute;
    top: 0px;
    right: 0px;
    width: 5px;
    height: 5px;
    content: '';
    background-color: #1890ff;
    border-radius: 50%;
  }
</style>
