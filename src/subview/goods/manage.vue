<template>
  <div style="background-color: #f6f8f9">
    <div
      style="padding-top: 1px; margin-bottom: 20px; background-color: #ffffff"
    >
      <Form :form="form" :form-type="formType" @changeSearch="handleQuery">
        <template #Form>
          <el-form-item label="品牌:">
            <el-input v-model="form.name" style="width: 215px" />
          </el-form-item>
          <el-form-item label="类别款式:">
            <el-input v-model="form.name" style="width: 215px" />
          </el-form-item>
          <el-form-item label="年份:">
            <el-date-picker v-model="form.date" type="year" />
          </el-form-item>
          <el-form-item label="季节:">
            <el-select v-model="form.region">
              <el-option label="春季" value="shanghai" />
              <el-option label="夏季" value="shanghai" />
              <el-option label="秋季" value="shanghai" />
              <el-option label="冬季" value="shanghai" />
            </el-select>
          </el-form-item>
          <el-form-item label="供应商:">
            <el-input v-model="form.name" style="width: 215px" />
          </el-form-item>
          <el-form-item label="状态:">
            <el-select v-model="form.region">
              <el-option label="在售" value="shanghai" />
              <el-option label="停售" value="shanghai" />
            </el-select>
          </el-form-item>
          <el-form-item label="类型:">
            <el-select v-model="form.region">
              <el-option label="整手" value="shanghai" />
              <el-option label="散码" value="shanghai" />
            </el-select>
          </el-form-item>
          <el-form-item label="商品搜索:">
            <el-input
              v-model="form.name"
              placeholder="请输入商品名称/类型/货号"
              style="width: 215px"
            />
          </el-form-item>
        </template>
      </Form>
    </div>
    <el-card shadow="never" style="border: 0">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="出售中 (3)" name="first" />
        <el-tab-pane label="仓库中 (129)" name="second" />
        <el-tab-pane label=" 已售罄 (18)" name="three" />
        <el-tab-pane label="库存预警 (2)" name="four" />
        <el-tab-pane label="待确认 (10)" name="five" />
        <el-tab-pane label="待收货 (30)" name="six" />
      </el-tabs>
      <el-form ref="form" :inline="true" @submit.native.prevent>
        <el-form-item>
          <el-button
            native-type="submit"
            size="small"
            type="primary"
            @click="handleQuery"
          >
            添加商品
          </el-button>
          <el-button
            native-type="submit"
            size="small"
            type="primary"
            @click="handleQuery"
          >
            批量分组
          </el-button>
          <el-button
            native-type="submit"
            size="small"
            type="primary"
            @click="handleQuery"
          >
            复制商品
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
        <!-- 表格组件具名插槽 自定义表头 -->
        <template #List>
          <el-table-column
            align="center"
            show-overflow-tooltip
            type="selection"
          />
          <el-table-column
            align="center"
            label="商品ID"
            prop="id"
            show-overflow-tooltip
            sortable
          />
          <el-table-column
            align="center"
            label="商品图"
            prop="img"
            show-overflow-tooltip
          >
            <template #default="{ row }">
              <img :src="row.img" style="width: 50px; height: 50px" />
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="商品名称"
            prop="name"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="款号"
            prop="type"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="供应商"
            prop="gongying"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="类别款式"
            prop="liebie"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="销售价"
            prop="xiaoshou"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="当前库存"
            prop="num"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="创建时间"
            prop="time"
            show-overflow-tooltip
            sortable
          />
          <el-table-column
            align="center"
            label="操作"
            show-overflow-tooltip
            width="85"
          >
            <template #default="{ row }">
              <el-button type="text" @click="handleDetail(row)">详情</el-button>
              <el-button type="text">编辑</el-button>
            </template>
          </el-table-column>
        </template>
      </List>
    </el-card>
    <el-drawer size="50%" :visible.sync="drawer" :with-header="false">
      <!-- 详情抽屉组件 -->
      <Drawer />
    </el-drawer>
  </div>
</template>

<script>
  import List from '@/subview/components/List'
  import Form from '@/subview/components/Form'
  import Drawer from './components/Drawer'
  export default {
    name: 'GoodsManage',
    components: { List, Form, Drawer },
    data() {
      return {
        activeName: 'first',
        drawer: false,
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
          // id img name type gongying liebie xiaoshou num time
          {
            id: 'pc12138',
            img: 'https://s-pro.crmeb.net/uploads/attach/2022/08/20220829/37f1bc531c111a41e1c038074e2ff649.jpg',
            time: '2018-05-15 08:01:41',
            name: '阿白',
            type: '款式一',
            gongying: '官方供应商',
            pay: '未收',
            num: 23,
            xiaoshou: 345,
            liebie: '青春版',
          },
          {
            id: 'pc12138',
            img: 'https://s-pro.crmeb.net/uploads/attach/2022/08/20220829/37f1bc531c111a41e1c038074e2ff649.jpg',
            time: '2018-05-15 08:01:41',
            name: '阿白',
            gongying: '私营供应商',
            type: '款式二',
            pay: '未收',
            num: 23,
            xiaoshou: 345,
            liebie: '老年版',
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
