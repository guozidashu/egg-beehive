<template>
  <div style="background-color: #f6f8f9">
    <div
      style="padding-top: 1px; margin-bottom: 20px; background-color: #ffffff"
    >
      <Form :form="form" :form-type="formType" @changeSearch="handleQuery">
        <template #Form>
          <el-form-item label="供应商类别:">
            <!-- 1外协加工厂2成品采购商3面辅料供应商4其他5自厂 -->
            <el-select v-model="form.supplierType">
              <el-option label="外协加工厂" :value="1" />
              <el-option label="成品采购商" :value="2" />
              <el-option label="面辅料供应商" :value="3" />
              <el-option label="其他" :value="4" />
              <el-option label="自厂" :value="5" />
            </el-select>
          </el-form-item>
          <el-form-item label="搜索:">
            <el-input
              v-model="form.supplierName"
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
            @click="handleDetail('add', 2)"
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
          <el-table-column label="供应商类别" prop="lx" width="150">
            <template #default="{ row }">
              <span v-if="row.lx === 1">外协加工厂</span>
              <span v-else-if="row.lx === 2">成品采购商</span>
              <span v-else-if="row.lx === 3">面辅料供应商</span>
              <span v-else-if="row.lx === 4">其他</span>
              <span v-else-if="row.lx === 5">自厂</span>
            </template>
          </el-table-column>
          <el-table-column label="供应商类型" prop="fenlei" />
          <el-table-column label="联系人" prop="usename" width="100" />
          <el-table-column label="手机号码" prop="tel" width="200" />
          <el-table-column label="应付款" prop="yingfu" width="80" />
          <el-table-column label="创建时间" prop="time" width="200" />
          <el-table-column label="状态" prop="isdefault" width="100">
            <template #default="{ row }">
              <el-switch
                v-model="row.isdefault"
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
    <el-drawer size="50%" :visible.sync="drawer" :with-header="false">
      <!-- 详情抽屉组件 -->
      <Drawer :drawer-inof="drawerInof" />
    </el-drawer>
  </div>
</template>
<script>
  import List from '@/subview/components/List'
  import Form from '@/subview/components/Form'
  import Drawer from './components/ManagementDrawer'
  // import { getSupplierManagementList } from '@/api/basic'
  export default {
    name: 'SupplierOrder',
    components: { List, Form, Drawer },
    data() {
      return {
        drawer: false,
        drawerInof: {},
        activeName: 'first',
        // 表单数据/列表参数
        form: {
          // 自定义参数
          // 公共参数
          supplierType: '',
          supplierName: '',
          page: 1,
          pageSize: 10,
        },
        // 列表数据相关
        // 公共参数
        listType: 1,
        formType: 3,
        list: [
          {
            id: 1,
            name: '张三',
            lx: 1,
            fenlei: '外协加工厂',
            yingfu: 100,
            usename: '张三',
            tel: '123456789',
            time: '2020-01-01',
            isdefault: 1,
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
        // } = await getSupplierManagementList(this.form)
        // this.list = list
        // this.total = total
        // this.listLoading = false
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
    },
  }
</script>
<style lang="scss">
  /* switch按钮样式 */
  .switch .el-switch__label {
    position: absolute;
    display: none;
    color: #fff !important;
  }
  /*打开时文字位置设置*/
  .switch .el-switch__label--right {
    z-index: 1;
  }
  /* 调整打开时文字的显示位子 */
  .switch .el-switch__label--right span {
    margin-left: 10px;
  }
  /*关闭时文字位置设置*/
  .switch .el-switch__label--left {
    z-index: 1;
  }
  /* 调整关闭时文字的显示位子 */
  .switch .el-switch__label--left span {
    margin-left: 20px;
  }
  /*显示文字*/
  .switch .el-switch__label.is-active {
    display: block;
  }
  /* 调整按钮的宽度 */
  .switch.el-switch .el-switch__core,
  .el-switch .el-switch__label {
    width: 60px !important;
    margin: 0;
  }
</style>
