<template>
  <div style="background-color: #f6f8f9">
    <div
      style="padding-top: 1px; margin-bottom: 20px; background-color: #ffffff"
    >
      <!-- 表单组件使用 -->
      <Form
        :form="form"
        :form-type="formType"
        @changeSearch="handleQuery"
        @changeSta="changeBtnSta"
      >
        <template #Form>
          <el-form-item v-show="!form.fold" label="状态:">
            <el-select v-model="form.region">
              <el-option label="请选择" value="shanghai" />
              <el-option label="显示" value="shanghai1" />
              <el-option label="不显示" value="shanghai2" />
            </el-select>
          </el-form-item>
          <el-form-item label="搜索:">
            <el-input
              v-model="form.name"
              placeholder="请输入单号"
              style="width: 215px"
            />
          </el-form-item>
        </template>
      </Form>
    </div>
    <el-card shadow="never" style="border: 0">
      <el-form ref="form" :inline="true" @submit.native.prevent>
        <el-form-item>
          <el-button
            native-type="submit"
            size="small"
            type="primary"
            @click="handleQuery"
          >
            添加
          </el-button>
        </el-form-item>
      </el-form>
      <!-- 表格组件使用 -->
      <List
        :list="list"
        :list-type="listType"
        :state="listLoading"
        :total="total"
        @changePage="changeBtnPage"
        @changePageSize="changeBtnPageSize"
      >
        <template #List>
          <el-table-column
            align="center"
            show-overflow-tooltip
            type="selection"
          />
          <el-table-column
            align="center"
            label="ID"
            prop="orderno"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="名称"
            prop="data"
            show-overflow-tooltip
            sortable
          />
          <el-table-column
            align="center"
            label="商品数"
            prop="type"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="备注"
            prop="username"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="操作"
            show-overflow-tooltip
            width="100"
          >
            <template #default="{ row }">
              <el-button type="text">编辑</el-button>
              <el-button type="text" @click="handleDetail(row)">删除</el-button>
              <!-- <el-button type="text">发货</el-button> -->
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
  // import { getList } from '@/api/userManagement'
  export default {
    name: 'FinancialAccounting',
    components: { Form, List },
    data() {
      return {
        activeName: 'first',
        // 表单数据/列表参数
        form: {
          // 自定义参数
          orderSta: '全部',
          paySta: '全部',
          orderSource: 'ERP订单',
          fold: true,
          typeSelect: 'order',
          dataSelect: 'xiadan',
          data: '',
          orderId: '',
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
            orderno: '1234522',
            username: '叶良辰',
            data: '2020.10.08',
            type: '商城',
            inof: '吊牌洗衣液',
            pay: '微信支付',
            num: 23,
            money: 345,
            state: '已完成',
          },
          {
            orderno: '1234522',
            username: '叶良辰',
            data: '2020.10.08',
            type: '商城',
            inof: '吊牌洗衣液',
            pay: '微信支付',
            num: 23,
            money: 345,
            state: '已完成',
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
      // 列表表单子组件查询事件   公共部分
      handleQuery() {
        this.form.page = 1
      },
      // 列表表单单选标签监听  自定义部分
      changeHandler() {
        this.form.page = 1
      },
      // 列表数据表头切换监听 自定义部分
      handleClick() {
        this.form.page = 1
      },

      // 列表数据封装函数

      // 列表数据改变页数   公共部分
      changeBtnPage(data) {
        this.form.page = data
      },
      // 列表数据改变每页条数  自定义部分
      changeBtnPageSize(data) {
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
      },
      // 详情抽屉
      handleDetail() {
        this.drawer = true
      },
    },
  }
</script>
<style lang="scss" scoped></style>
