<template>
  <div class="user-management-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="全部订单" name="first">
        <List />
      </el-tab-pane>
      <el-tab-pane label="未支付" name="second">
        <List />
      </el-tab-pane>
      <el-tab-pane label="代发货" name="three">
        <List />
      </el-tab-pane>
      <el-tab-pane label="已发货" name="four">
        <List />
      </el-tab-pane>
      <el-tab-pane label="已完成" name="five">
        <List />
      </el-tab-pane>
      <el-tab-pane label="已关闭" name="six">
        <el-form class="demo-form-inline" :inline="true">
          <el-form-item label="审批人">
            <el-input placeholder="审批人" />
          </el-form-item>
          <el-form-item label="活动区域">
            <el-select placeholder="活动区域">
              <el-option label="区域一" value="shanghai" />
              <el-option label="区域二" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">查询</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import List from './components/OrderList'

  export default {
    name: 'OrderList',
    components: { List },
    data() {
      return {
        activeName: 'first',
      }
    },
    created() {},
    methods: {},
  }
</script>
