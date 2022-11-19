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
          <el-form-item v-show="form.fold" label="用户搜索:">
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
                <el-option label="手机号" value="mobile" />
                <el-option label="用户昵称" value="nick_name" />
                <el-option label="客户名称" value="name" />
                <el-option label="客户账号" value="account" />
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
            <el-select v-model="form.level" style="width: 300px">
              <el-option
                v-for="(item, index) in selectDataList.customer_grade"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item v-show="!form.fold" label="客户分类:">
            <el-select v-model="form.type" style="width: 300px">
              <el-option
                v-for="(item, index) in selectDataList.customer_type"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item v-show="!form.fold" label="客户标签:">
            <el-cascader
              v-model="form.tag"
              :options="selectDataList.customer_tag"
              style="width: 300px"
            />
          </el-form-item>
          <el-form-item v-show="!form.fold" label="客户来源:">
            <el-select v-model="form.source" style="width: 300px">
              <el-option
                v-for="(item, index) in selectDataList.customer_source"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item v-show="!form.fold" label="加入时间:">
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
            @click="handleDetail('add', 3)"
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
          <el-table-column label="头像/昵称" width="120">
            <template #default="{ row }">
              <div style="display: flex">
                <img :src="row.avatar" style="width: 50px; height: 50px" />
                <div style="margin: 15px 0 0 10px">
                  {{ row.nick_name }}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="客户名称" prop="name" width="120" />
          <el-table-column label="客户等级" prop="grade_name" width="120" />
          <el-table-column label="客户分类" prop="type_name" width="120" />
          <el-table-column label="客户来源" prop="source_name" />
          <el-table-column label="成交额" prop="money" width="120" />
          <el-table-column label="余额/欠款" prop="final_count" width="200" />
          <el-table-column label="加入时间" prop="create_time" />
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
    <el-drawer
      :before-close="handleClose"
      size="50%"
      :title="title"
      :visible.sync="drawer"
      :wrapper-closable="false"
    >
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
  import { getCommonAllList, getCustomerList } from '@/api/basic'
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    name: 'CustomerManage',
    components: { Form, List, Edit, Drawer },
    mixins: [datajosn],
    data() {
      return {
        title: '',
        selectDataList: [],
        filename: '客户列表',
        downloadLoading: false,
        exclList: [],
        drawer: false,
        drawerInof: {},
        activeName: 'first',
        form: {
          search_type: 'mobile', //搜索条件 mobile nick_name name account
          keywords: null, //搜索内容
          level: null, //等级id
          type: null, //客户分类
          source: null, //客户来源
          tag: null, //标签id
          create_time: [], //加入时间区间搜索
          page: 1,
          page_size: 10,
        },
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
      // 新增优化圈
      async addCoupons() {
        this.$refs['edit'].showEdit()
      },
      resetForm() {
        this.form = this.$options.data().form
      },
      handleClose() {
        this.drawer = false
      },
      handleQuery() {
        this.form.page = 1
      },
      changeBtnSta(data) {
        this.form.fold = data
      },
      handleClick(tab) {
        console.log(1111, tab.label)
        this.form.page = 1
      },
      changeBtnPage(data) {
        this.form.page = data
      },
      changeBtnPageSize(data) {
        this.form.pageSize = data
      },
      async fetchData() {
        this.listLoading = true
        const { data } = await getCustomerList(this.form)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
      // 下拉框数据请求
      async selectData() {
        const { data } = await getCommonAllList({
          type: 'customer_grade,customer_type,customer_source,customer_tag',
        })
        data.customer_tag.forEach((item) => {
          item.value = item.id
          item.label = item.name
          if (item.child.length > 0) {
            item.child.forEach((item1) => {
              item1.value = item1.id
              item1.label = item1.name
            })
            item.children = item.child
          }
        })
        this.selectDataList = data
      },
      // 详情抽屉
      handleDetail(row, type) {
        if (type === 1) {
          this.title = '客户详情'
        } else if (type === 2) {
          this.title = '客户供应商'
        } else {
          this.title = '客户供应商'
        }
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
              'nick_name',
              'name',
              'grade_name',
              'type_name',
              'source_name',
              'money',
              'final_count',
              'create_time',
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
