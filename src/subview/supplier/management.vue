<template>
  <div style="background-color: #f6f8f9">
    <div
      style="padding-top: 1px; margin-bottom: 20px; background-color: #ffffff"
    >
      <QYForm
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
      </QYForm>
    </div>
    <el-card shadow="never" style="border: 0">
      <el-form ref="form" :inline="true" @submit.native.prevent>
        <el-form-item>
          <el-button
            v-has-permi="['btn:SupplierManagement:add']"
            size="small"
            type="primary"
            @click="handleDetail('add', 3)"
          >
            添加供应商
          </el-button>
        </el-form-item>
      </el-form>
      <QYList
        :list="list"
        :list-type="listType"
        :page-no="page"
        :page-size="pageSize"
        :state="listLoading"
        :total="total"
        @changePage="changeBtnPage"
        @changePageSize="changeBtnPageSize"
      >
        <template #List>
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
          <el-table-column label="手机号码" prop="tel" width="150" />
          <el-table-column
            align="right"
            label="应付款"
            prop="arrears"
            width="150"
          >
            <template #default="{ row }">
              <el-tag>￥{{ row.arrears | moneyFormat }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" prop="create_time" width="200" />
          <el-table-column label="状态" prop="status" width="100">
            <template #default="{ row }">
              <el-tag v-if="row.status == 1">开启</el-tag>
              <el-tag v-else type="danger">关闭</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" fixed="right" label="操作" width="85">
            <template #default="{ row }">
              <el-button
                v-has-permi="['btn:SupplierManagement:edit']"
                type="text"
                @click="handleDetail(row, 2)"
              >
                编辑
              </el-button>
              <el-button
                v-has-permi="['btn:SupplierManagement:view']"
                type="text"
                @click="handleDetail(row, 1)"
              >
                详情
              </el-button>
            </template>
          </el-table-column>
        </template>
      </QYList>
    </el-card>
    <el-drawer
      :before-close="handleClose"
      size="50%"
      :title="title"
      :visible.sync="drawer"
      :wrapper-closable="false"
    >
      <Drawer :drawer-inof="drawerInof" @fetch-data="fetchData" />
    </el-drawer>
  </div>
</template>
<script>
  import Drawer from '@/subview/components/Drawer/ManagementDrawer'
  import publicjosn from '@/assets/assets_josn/publicjosn'
  export default {
    components: { Drawer },
    mixins: [publicjosn],
    data() {
      return {
        title: '',
        drawer: false,
        drawerInof: {},
        activeName: 'first',
        supplier_type: [],
        formTemp: null,
        page: 1,
        pageSize: 10,
        form: {
          type: '',
          name: '',
          page: 1,
          pageSize: 10,
        },
        listType: 1,
        formType: 4,
        list: [],
        listLoading: false,
        total: 0,
      }
    },
    watch: {
      form: {
        handler: function (newVal) {
          this.formTemp = JSON.parse(JSON.stringify(newVal))
          if (this.pageState) {
            this.formTemp.page = newVal.page
            this.formTemp.pageSize = newVal.pageSize
            this.page = newVal.page
            this.pageSize = newVal.pageSize
          } else {
            this.formTemp.page = 1
            this.formTemp.pageSize = 10
            this.page = 1
            this.pageSize = 10
          }
          this.fetchData()
          this.pageState = false
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
      changeBtnPage(data) {
        this.pageState = true
        this.form.page = data
      },

      changeBtnPageSize(data) {
        this.pageState = true
        this.form.pageSize = data
      },
      resetForm() {
        this.form = this.$options.data().form
      },
      handleClick() {
        this.form.page = 1
      },
      async fetchData(type) {
        if (type == 1) {
          this.drawer = false
        }
        this.listLoading = true
        if (this.formTemp == null) {
          this.formTemp = JSON.parse(JSON.stringify(this.form))
        }
        const { data } = await this.api.getSupplierList(this.formTemp)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
      async getSelectData() {
        const { data } = await this.api.getCommonAllList({
          type: 'supplier_type',
        })
        this.supplier_type = data.supplier_type
      },

      async handleDetail(row, type) {
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
          this.drawerInof.status = 1
          this.drawerInof.initial_amount = 0
        } else {
          const { data } = await this.api.getSupplierEditDetail({ id: row.id })
          this.drawerInof = JSON.parse(JSON.stringify(data[0]))
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
