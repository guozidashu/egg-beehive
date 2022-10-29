<template>
  <div style="background-color: #f6f8f9">
    <div
      style="padding-top: 1px; margin-bottom: 20px; background-color: #ffffff"
    >
      <Form :form="form" :form-type="formType" @changeSearch="handleQuery">
        <template #Form>
          <el-form-item label="单据日期:">
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
          <el-form-item label="客户搜索:">
            <el-input
              v-model="form.name"
              placeholder="请输入手机号/姓名"
              style="width: 215px"
            />
          </el-form-item>
        </template>
      </Form>
    </div>
    <el-card shadow="never" style="border: 0">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="所有 (3)" name="first" />
        <el-tab-pane label="已收 (129)" name="second" />
        <el-tab-pane label=" 未收 (18)" name="three" />
      </el-tabs>
      <!-- 表格组件使用 -->
      <List
        :list="list"
        :list-type="listType"
        :state="listLoading"
        :total="total"
        @changePage="changeBtnPage"
        @changePageSize="changeBtnPageSize"
      >
        <!-- 表格组件具名插槽 自定义表头 -->
        <template #List>
          <el-table-column type="selection" />
          <el-table-column label="相关订单号" prop="orderno" width="200" />
          <el-table-column label="客户名称" prop="username" width="150" />
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
          <el-table-column label="数量" prop="num" width="80" />
          <el-table-column label="应收金额" prop="money" width="80" />
          <el-table-column label="订单状态" prop="state" width="120" />
          <el-table-column label="支付状态" prop="pay" width="120">
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
          <el-table-column
            align="center"
            label="操作"
            show-overflow-tooltip
            width="85"
          >
            <template #default="{ row }">
              <el-button type="text" @click="handleDetail(row)">详情</el-button>
              <el-button type="text">收款</el-button>
            </template>
          </el-table-column>
        </template>
      </List>
    </el-card>
  </div>
</template>

<script>
  import List from '@/subview/components/List'
  import Form from '@/subview/components/Form'
  // import Drawer from './components/Drawer'
  export default {
    name: 'FinancialCustomer',
    components: { List, Form },
    data() {
      return {
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
          orderSta: '全部',
          paySta: '全部',
          orderSource: 'ERP订单',
          fold: true,
          typeSelect: 'order',
          dataSelect: '0',
          data: '',
          orderId: '',
          // 公共参数
          pageNo: 1,
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
            pay: '未收',
            num: 23,
            money: 345,
            state: '代发货',
          },
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
            username: '阿蓝',
            pay: '已收',
            num: 23,
            money: 345,
            state: '全部发货',
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
      handleQuery() {},
      // 列表数据封装函数

      // 列表数据改变页数   公共部分
      changeBtnPage(data) {
        this.form.pageNo = data
      },
      // 列表数据改变每页条数  自定义部分
      changeBtnPageSize(data) {
        this.form.pageSize = data
      },
      // 列表数据表头切换监听 自定义部分
      handleClick(tab) {
        console.log(1111, tab.label)
        this.form.pageNo = 1
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
      },
      // 详情抽屉
      handleDetail() {
        this.drawer = true
      },
    },
  }
</script>
<style lang="scss" scoped></style>
