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
          <el-form-item label="客户搜索:">
            <el-input
              v-model="form.name"
              placeholder="请输入手机号/姓名"
              style="width: 215px"
            />
          </el-form-item>
          <el-form-item v-show="!form.fold" label="客户等级:">
            <el-select v-model="form.region">
              <el-option label="黄金" value="shanghai" />
              <el-option label="白银" value="shanghai" />
              <el-option label="钻石" value="shanghai" />
              <el-option label="青铜" value="shanghai" />
            </el-select>
          </el-form-item>
          <el-form-item v-show="!form.fold" label="用户标签:">
            <el-select v-model="form.region">
              <el-option label="标签一" value="shanghai" />
              <el-option label="标签二" value="shanghai" />
            </el-select>
          </el-form-item>
          <el-form-item v-show="!form.fold" label="客户分类:">
            <el-select v-model="form.region">
              <el-option label="分类一" value="shanghai" />
              <el-option label="分类二" value="shanghai" />
            </el-select>
          </el-form-item>
          <el-form-item v-show="!form.fold" label="来源渠道:">
            <el-radio-group
              v-model="form.orderSource"
              size="small"
              @change="changeHandler"
            >
              <el-radio-button label="全部" />
              <el-radio-button label="ERP平台" />
              <el-radio-button label="微信公众号" />
              <el-radio-button label="微信小程序" />
              <el-radio-button label="H5" />
              <el-radio-button label="APP" />
              <el-radio-button label="EXP手动导入" />
              <el-radio-button label="淘宝" />
              <el-radio-button label="天猫" />
              <el-radio-button label="抖音" />
              <el-radio-button label="快团团" />
              <el-radio-button label="小红书" />
            </el-radio-group>
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
        <el-tab-pane label="app (10)" name="five" />
        <el-tab-pane label="第三方平台 (100)" name="six" />
        <el-tab-pane label="企业微信 (10)" name="seven" />
      </el-tabs>
      <el-form ref="form" :inline="true" @submit.native.prevent>
        <el-form-item>
          <el-button
            native-type="submit"
            size="small"
            type="primary"
            @click="handleEdit('add')"
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
          <el-table-column type="selection" />
          <el-table-column label="ID" prop="id" width="80" />
          <el-table-column label="昵称头像" prop="img" width="120">
            <template #default="{ row }">
              <img :src="row.img" style="width: 50px; height: 50px" />
            </template>
          </el-table-column>
          <el-table-column label="客户名称" prop="name" width="120" />
          <el-table-column label="客户等级" prop="level" width="120" />
          <el-table-column label="客户分类" prop="type" width="120" />
          <el-table-column label="来源" prop="yuantou" />
          <el-table-column label="成交额" prop="money1" width="120" />
          <el-table-column label="余额/欠款" width="150">
            <template #default="{ row }">
              <span>{{ row.money }}</span>
              /
              <span>{{ row.qiankuan }}</span>
            </template>
          </el-table-column>
          <el-table-column label="加入时间" prop="time" />
          <el-table-column align="center" label="操作" width="100">
            <template #default="{ row }">
              <el-button type="text" @click="handleEdit(row)">编辑</el-button>
              <el-button type="text" @click="handleDetail(row)">详情</el-button>
              <!-- <el-button type="text">发货</el-button> -->
            </template>
          </el-table-column>
        </template>
      </List>
    </el-card>
    <edit ref="edit" @fetch-data="fetchData" />
  </div>
</template>

<script>
  import List from '@/subview/components/List'
  import Form from '@/subview/components/Form'
  import Edit from './components/manageDeit'
  import { getManagementList, addManagementList } from '@/api/basic'
  export default {
    name: 'CustomerManage',
    components: { Form, List, Edit },
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
          pageNo: 1,
          pageSize: 10,
        },
        // 列表数据相关

        // 公共参数
        listType: 1,
        formType: 1,
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
      this.fetchData()
    },
    methods: {
      // 新增修改
      async handleEdit(row) {
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
      // 查询
      handleQuery() {
        this.form.pageNo = 1
      },
      // 删除
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm('你确定要删除当前项吗', null, async () => {
            const { code } = await addManagementList({ id: row.id })
            if (code != 200) {
              return
            }
            this.$baseMessage('删除成功', 'success', 'vab-hey-message-success')
            this.fetchData()
          })
        } else {
          if (this.selectRows.length > 0) {
            const ids = this.selectRows.map((item) => item.id).join()
            this.$baseConfirm('你确定要删除选中项吗', null, async () => {
              const { code } = await addManagementList(ids)
              if (code != 200) {
                return
              }
              this.fetchData()
            })
          } else {
            this.$baseMessage('未选中任何行', 'error', 'vab-hey-message-error')
          }
        }
      },

      // 列表表单子组件展开闭合事件  公共部分
      changeBtnSta(data) {
        this.form.fold = data
      },
      // 列表表单单选标签监听  自定义部分
      changeHandler(data) {
        console.log(888, data)
        this.form.pageNo = 1
      },
      // 列表数据表头切换监听 自定义部分
      handleClick(tab) {
        console.log(1111, tab.label)
        this.form.pageNo = 1
      },

      // 列表数据封装函数

      // 列表数据改变页数   公共部分
      changeBtnPage(data) {
        console.log(9090909, data)
        this.form.pageNo = data
      },
      // 列表数据改变每页条数  自定义部分
      changeBtnPageSize(data) {
        console.log(8080080, data)
        this.form.pageSize = data
      },
      // 列表数据请求函数 公共部分
      async fetchData() {
        this.listLoading = true
        const {
          data: { list, total },
        } = await getManagementList(this.form)
        this.list = list
        this.total = total
        this.listLoading = false
      },
      // 详情抽屉
      handleDetail() {
        this.drawer = true
      },
    },
  }
</script>
<style lang="scss" scoped></style>
