<template>
  <div class="user-management-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="全部订单" name="first" />
      <el-tab-pane label="未支付" name="second" />
    </el-tabs>
  </div>
</template>

<script>
  // import List from './components/OrderList'

  export default {
    name: 'OrderList',
    // components: { List },
    data() {
      return {
        activeName: 'first',
      }
    },
    created() {},
    methods: {},
  }
</script>
