<template>
  <div>
    <el-card>
      <div slot="header">
        <span>授权信息</span>
      </div>
      <div class="account-warp">
        <div class="account-item">商城名称：商城系统</div>
        <div class="account-item">联系人: 演示（没有关联ERP)</div>
        <div class="account-item">联系人: 15236804776</div>
        <div class="account-item">授权到期日: 2023-03-15 14:06:06</div>
        <div class="account-item">研发模块: 未开通</div>
        <div class="account-item">ERP模块: 未开通</div>
        <div class="account-item">跟单模块：未开通</div>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'Account',
    data() {
      return {}
    },
    created() {},
    methods: {},
  }
</script>

<style lang="scss" scoped>
  .account-warp {
    display: flex;
    flex-wrap: wrap;
    .account-item {
      width: 33%;
      padding-top: 10px;
    }
  }
</style>
