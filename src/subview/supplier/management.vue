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
          <el-form-item label="供应商类别:">
            <!-- 1外协加工厂2成品采购商3面辅料供应商4其他5自厂 -->
            <el-select v-model="form.type">
              <el-option
                v-for="item in supplier_type"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="搜索:">
            <el-input
              v-model="form.name"
              placeholder="请输入供应商名称"
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
            @click="handleDetail('add', 3)"
          >
            添加供应商
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
          <el-table-column type="selection" />
          <el-table-column label="ID" prop="id" sortable width="80" />
          <el-table-column label="供应商名称" prop="name" width="150" />
          <el-table-column label="供应商类别" prop="type_name" width="150" />
          <el-table-column label="供应商类型" prop="craft_name">
            <template #default="{ row }">
              <span v-for="item in row.craft_name" :key="item">
                {{ item }}
              </span>
              <span v-for="item in row.produce_name" :key="item">
                {{ item }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="联系人" prop="contact_name" width="100" />
          <el-table-column label="手机号码" prop="tel" width="200" />
          <el-table-column label="应付款" prop="arrears" width="100" />
          <el-table-column label="创建时间" prop="create_time" width="200" />
          <el-table-column label="状态" prop="status" width="100">
            <template #default="{ row }">
              <el-switch
                v-model="row.status"
                active-color="#41B584"
                active-text="开启"
                :active-value="1"
                class="switch"
                inactive-color="#D2D2D2"
                inactive-text="关闭"
                :inactive-value="0"
              />
            </template>
          </el-table-column>
          <el-table-column align="center" fixed="right" label="操作" width="85">
            <template #default="{ row }">
              <el-button type="text" @click="handleDetail(row, 2)">
                编辑
              </el-button>
              <el-button type="text" @click="handleDetail(row, 1)">
                详情
              </el-button>
            </template>
          </el-table-column>
        </template>
      </List>
    </el-card>
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
  import Drawer from './components/ManagementDrawer'
  import { getSupplierList, getCommonAllList } from '@/api/basic'
  import publicjosn from '@/assets/assets_josn/publicjosn'
  export default {
    name: 'SupplierOrder',
    components: { List, Form, Drawer },
    mixins: [publicjosn],
    data() {
      return {
        title: '',
        drawer: false,
        drawerInof: {},
        activeName: 'first',
        supplier_type: [],
        form: {
          // 自定义参数
          // 公共参数
          type: '',
          name: '',
          page: 1,
          pageSize: 10,
        },
        // 列表数据相关
        // 公共参数
        listType: 1,
        formType: 4,
        list: [],
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
      this.getSelectData()
      this.fetchData()
    },
    methods: {
      handleQuery() {
        this.fetchData()
      },
      resetForm() {
        this.form = this.$options.data().form
      },
      handleClick() {
        this.form.page = 1
      },
      async fetchData() {
        this.listLoading = true
        const { data } = await getSupplierList(this.form)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
      async getSelectData() {
        const { data } = await getCommonAllList({ type: 'supplier_type' })
        this.supplier_type = data.supplier_type
      },
      // 详情抽屉
      handleDetail(row, type) {
        if (type === 1) {
          this.title = '供应商详情'
        } else if (type === 2) {
          this.title = '编辑供应商'
        } else {
          this.title = '添加供应商'
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
      handleClose() {
        this.drawer = false
      },
    },
  }
</script>
