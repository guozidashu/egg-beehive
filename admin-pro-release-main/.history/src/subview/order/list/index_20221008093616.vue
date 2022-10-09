<template>
  <div class="user-management-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="全部订单" name="first" />
      <el-tab-pane label="未支付" name="second" />
    </el-tabs>
  </div>
</template>

<script>
  import Edit from './components/UserManagementEdit'

  export default {
    name: 'OrderList',
    components: { Edit },
    data() {
      return {
        activeName: 'first',
      }
    },
    created() {},
    methods: {},
  }
</script>
