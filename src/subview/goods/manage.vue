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
          <el-form-item label="品牌:">
            <el-select v-model="form.brand" placeholder="请选择品牌">
              <el-option
                v-for="(item, index) in typeData.brand"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="类别款式:">
            <el-select v-model="form.kuanshi" placeholder="请选择类别款式">
              <el-option
                v-for="(item, index) in typeData.goods_category"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="年份:">
            <el-date-picker
              v-model="form.nianfen"
              style="width: 215px"
              type="year"
              value-format="yyyy"
            />
          </el-form-item>
          <el-form-item label="季节:">
            <el-select v-model="form.jijie" placeholder="请选择季节">
              <el-option
                v-for="(item, index) in typeData.schedule_record"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="供应商:">
            <el-input v-model="form.name1" style="width: 215px" />
          </el-form-item>
          <el-form-item label="状态:">
            <el-select v-model="form.region">
              <el-option label="在售" value="1" />
              <el-option label="停售" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="类型:">
            <el-select v-model="form.region1">
              <el-option label="整手" value="1" />
              <el-option label="散码" value="2" />
              <el-option label="混合" value="2" />
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
      <el-tabs v-model="form.type" @tab-click="handleClick">
        <el-tab-pane label="出售中 (3)" name="1" />
        <el-tab-pane label="仓库中 (129)" name="2" />
        <el-tab-pane label=" 已售罄 (18)" name="3" />
        <el-tab-pane label="库存预警 (2)" name="4" />
        <el-tab-pane label="待确认 (10)" name="5" />
      </el-tabs>
      <el-form ref="form" :inline="true" @submit.native.prevent>
        <el-form-item>
          <el-button
            native-type="submit"
            size="small"
            type="primary"
            @click="handleEdit('add')"
          >
            添加商品
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
          <el-table-column align="center" prop="id" sortable width="80" />
          <el-table-column label="商品图" prop="img" width="80">
            <template #default="{ row }">
              <img :src="row.img" style="width: 50px; height: 50px" />
            </template>
          </el-table-column>
          <el-table-column label="标题" prop="shoptitle" />
          <el-table-column label="商品名称" prop="name" width="250" />
          <el-table-column label="款号" prop="kuanshi" width="80" />
          <el-table-column label="供应商" prop="gongying" width="120" />
          <el-table-column label="类别款式" prop="liebie" width="120" />
          <el-table-column label="销售价" prop="xiaoshou" width="80" />
          <el-table-column prop="num" width="150">
            <template slot="header">
              <span>现货|生产中</span>
            </template>
            <template slot-scope="scope">
              {{ scope.row.num }}
            </template>
          </el-table-column>
          <el-table-column label="创建时间" prop="time" sortable width="200" />
          <el-table-column
            align="center"
            fixed="right"
            label="操作"
            show-overflow-tooltip
            width="85"
          >
            <template #default="{ row }">
              <el-button type="text" @click="handleDetail(row)">详情</el-button>
              <el-button type="text" @click="handleEdit(row)">编辑</el-button>
            </template>
          </el-table-column>
        </template>
      </List>
    </el-card>
    <el-drawer size="50%" :visible.sync="drawer" :with-header="false">
      <!-- 详情抽屉组件 -->
      <Drawer />
    </el-drawer>
    <edit ref="edit" :type-data="typeData" @fetch-data="fetchData" />
  </div>
</template>

<script>
  import List from '@/subview/components/List'
  import Form from '@/subview/components/Form'
  import Edit from './components/ManageEdit'
  import Drawer from './components/Drawer'
  import { getGoodsManagementList, getGoodsTypeList } from '@/api/basic'
  export default {
    name: 'GoodsManage',
    components: { List, Form, Drawer, Edit },
    data() {
      return {
        drawer: false,
        // 表单数据/列表参数
        form: {
          // 自定义参数
          type: '1',
          brand: '',
          // 公共参数
          pageNo: 1,
          pageSize: 10,
          //款式
          kuanshi: '',
          //年份
          nianfen: '',
          //季节
          jijie: '',
          //商品名称
          name: '',
        },
        // 列表数据相关
        // 公共参数
        listType: 1,
        formType: 4,
        list: [],
        typeData: [],
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
      this.getGoodsTypeList()
    },
    methods: {
      // 新增修改
      async handleEdit(row) {
        this.$refs.edit.typeData = this.typeData
        if (row === 'add') {
          this.$refs['edit'].showEdit()
        } else {
          console.log(65466546, row)
          this.$refs['edit'].showEdit(row)
        }
      },
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
        console.log(1111, tab.label, tab.name)
        this.form.pageNo = 1
      },
      // 列表数据请求函数 公共部分
      async fetchData() {
        this.listLoading = true
        const {
          data: { list, total },
        } = await getGoodsManagementList(this.form)
        this.list = list
        this.total = total
        this.listLoading = false
      },
      async getGoodsTypeList() {
        const {
          data: { data },
        } = await getGoodsTypeList(this.form)
        this.typeData = data
      },
      // 详情抽屉
      handleDetail() {
        this.drawer = true
      },
      resetForm() {
        this.form = this.$options.data().form
      },
    },
  }
</script>
<style lang="scss" scoped></style>
