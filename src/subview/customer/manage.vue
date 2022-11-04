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
          <el-form-item v-show="form.fold" label="用户搜索:">
            <el-input
              v-model="form.name"
              class="input-with-select"
              placeholder="请输入"
            >
              <el-select
                v-model="form.select"
                slot="prepend"
                style="width: 100px"
              >
                <el-option label="全部" value="0" />
                <el-option label="手机号" value="1" />
                <el-option label="用户昵称" value="2" />
                <el-option label="客户名称" value="3" />
              </el-select>
            </el-input>
          </el-form-item>
          <el-form-item
            v-show="!form.fold"
            label="用户搜索:"
            style="display: block"
          >
            <el-input
              v-model="form.name"
              class="input-with-select"
              placeholder="请输入"
            >
              <el-select
                v-model="form.select"
                slot="prepend"
                style="width: 100px"
              >
                <el-option label="全部" value="0" />
                <el-option label="手机号" value="1" />
                <el-option label="用户昵称" value="2" />
                <el-option label="客户昵称" value="3" />
              </el-select>
            </el-input>
          </el-form-item>
          <el-form-item v-show="!form.fold" label="客户等级:">
            <el-select v-model="form.select1" style="width: 300px">
              <el-option label="全部" value="0" />
              <el-option label="黄金" value="shanghai" />
              <el-option label="白银" value="shanghai" />
              <el-option label="钻石" value="shanghai" />
              <el-option label="青铜" value="shanghai" />
            </el-select>
          </el-form-item>
          <el-form-item v-show="!form.fold" label="客户分类:">
            <el-select v-model="form.select2" style="width: 300px">
              <el-option label="全部" value="0" />
              <el-option label="分类一" value="shanghai" />
              <el-option label="分类二" value="shanghai" />
            </el-select>
          </el-form-item>
          <el-form-item v-show="!form.fold" label="客户标签:">
            <el-cascader
              v-model="form.value"
              :options="options"
              style="width: 300px"
              @change="handleChange"
            />
          </el-form-item>
          <el-form-item v-show="!form.fold" label="客户来源:">
            <el-select v-model="form.select4" style="width: 300px">
              <el-option label="全部" value="0" />
              <el-option label="来源一" value="shanghai" />
              <el-option label="来源二" value="shanghai" />
            </el-select>
          </el-form-item>
          <el-form-item v-show="!form.fold" label="加入时间:">
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
        </template>
      </Form>
    </div>
    <el-card shadow="never" style="border: 0">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部" name="first" />
        <el-tab-pane label="ERP平台 (100)" name="second" />
        <el-tab-pane label=" 微信公众号 (10)" name="three" />
        <el-tab-pane label="微信小程序 (100)" name="four" />
        <el-tab-pane label="移动App (10)" name="five" />
        <el-tab-pane label="第三方平台 (100)" name="six" />
        <el-tab-pane label="企业微信 (10)" name="seven" />
      </el-tabs>
      <el-form ref="form" :inline="true" @submit.native.prevent>
        <el-form-item>
          <el-button
            native-type="submit"
            size="small"
            type="primary"
            @click="handleDetail('add', 2)"
          >
            添加客户
          </el-button>
          <el-button
            native-type="submit"
            size="small"
            type="primary"
            @click="addCoupons()"
          >
            发送优惠券
          </el-button>
          <el-button
            native-type="submit"
            size="small"
            type="primary"
            @click="handleDownload"
          >
            批量导出
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
          <el-table-column label="ID" prop="id" width="80" />
          <el-table-column label="头像/昵称" prop="img" width="120">
            <template #default="{ row }">
              <div style="display: flex">
                <img :src="row.img" style="width: 50px; height: 50px" />
                <div style="margin: 15px 0 0 10px">
                  {{ row.name }}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="客户名称" prop="name" width="120" />
          <el-table-column label="客户等级" prop="level" width="120" />
          <el-table-column label="客户分类" prop="type" width="120" />
          <el-table-column label="客户来源" prop="yuantou" />
          <el-table-column label="成交额" prop="money" width="120" />
          <el-table-column label="余额/欠款" prop="money" width="200" />
          <el-table-column label="加入时间" prop="time" />
          <el-table-column
            align="center"
            fixed="right"
            label="操作"
            width="100"
          >
            <template #default="{ row }">
              <el-button type="text" @click="handleDetail(row, 2)">
                编辑
              </el-button>
              <el-button type="text" @click="handleDetail(row, 1)">
                详情
              </el-button>
              <!-- <el-button type="text">发货</el-button> -->
            </template>
          </el-table-column>
        </template>
      </List>
    </el-card>
    <edit ref="edit" @fetch-data="fetchData" />
    <el-drawer size="50%" :visible.sync="drawer" :with-header="false">
      <!-- 详情抽屉组件 -->
      <Drawer :drawer-inof="drawerInof" />
    </el-drawer>
  </div>
</template>

<script>
  import List from '@/subview/components/List'
  import Form from '@/subview/components/Form'
  import Edit from './components/ManageEdit'
  import Drawer from './components/ManageDrawer'
  import { getCommonAllList } from '@/api/basic'
  export default {
    name: 'CustomerManage',
    components: { Form, List, Edit, Drawer },
    data() {
      return {
        filename: '客户列表',
        downloadLoading: false,
        exclList: [],
        drawer: false,
        drawerInof: {},
        options: [
          {
            value: 'zhinan',
            label: '指南',
            children: [
              {
                value: 'shejiyuanze',
                label: '设计原则',
              },
              {
                value: 'daohang',
                label: '导航',
              },
            ],
          },
          {
            value: 'zujian',
            label: '组件',
            children: [
              {
                value: 'basic',
                label: 'Basic',
              },
              {
                value: 'form',
                label: 'Form',
              },
              {
                value: 'data',
                label: 'Data',
              },
              {
                value: 'notice',
                label: 'Notice',
              },
              {
                value: 'navigation',
                label: 'Navigation',
              },
              {
                value: 'others',
                label: 'Others',
              },
            ],
          },
          {
            value: 'ziyuan',
            label: '资源',
            children: [
              {
                value: 'axure',
                label: 'Axure Components',
              },
              {
                value: 'sketch',
                label: 'Sketch Templates',
              },
              {
                value: 'jiaohu',
                label: '组件交互文档',
              },
            ],
          },
        ],
        activeName: 'first',
        // 表单数据/列表参数
        form: {
          // 自定义参数
          select: '0',
          select1: '0',
          select2: '0',
          select3: '0',
          select4: '0',
          fold: true,
          // 公共参数
          page: 1,
          pageSize: 10,
        },
        // 列表数据相关

        // 公共参数
        listType: 1,
        formType: 1,
        list: [
          {
            id: 1,
            img: 'https://img.yzcdn.cn/vant/cat.jpeg',
            name: '张三',
            level: '普通客户',
            type: '普通客户',
            yuantou: '微信公众号',
            money: '1000',
            time: '2020-10-10 10:10:10',
          },
        ],
        listLoading: false,
        total: 0,
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
      this.selectData()
    },
    methods: {
      handleChange(value) {
        console.log(value)
      },
      // 新增优化圈
      async addCoupons() {
        this.$refs['edit'].showEdit()
      },
      // 查询
      handleQuery() {
        this.form.page = 1
      },

      // 列表表单子组件展开闭合事件  公共部分
      changeBtnSta(data) {
        this.form.fold = data
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
        // } = await getManagementList(this.form)
        // this.list = list
        // this.total = total
        // this.listLoading = false
      },
      // 下拉框数据请求
      async selectData() {
        const {
          data: { list, total },
        } = await getCommonAllList({
          type: 'customer_grade,customer_grade,customer_type,customer_source,customer_tag',
        })
        console.log(898989, list, total)
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
      // 导出
      handleSelectionChange(val) {
        console.log(111, val)
        this.exclList = val
      },
      handleDownload() {
        if (this.exclList.length) {
          console.log(888, this.exclList)
          this.downloadLoading = true
          import('@/utils/excel').then((excel) => {
            const tHeader = [
              'ID',
              '头像',
              '昵称',
              '客户名称',
              '客户等级',
              '客户分类',
              '客户来源',
              '成交额',
              '余额/欠款',
              '加入时间',
            ]
            const filterVal = [
              'id',
              'des',
              'name',
              'name',
              'level',
              'des',
              'des',
              'money',
              'money',
              'des',
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
