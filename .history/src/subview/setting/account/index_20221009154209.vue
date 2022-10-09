<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>卡片名称</span>
      </div>
      <p>
        商城名称：
        <span>商城系统</span>
      </p>
      <p>
        联系人：
        <span>演示（没有关联ERP)</span>
      </p>
      <p>
        联系电话：
        <span></span>
      </p>
    </el-card>
    <el-card class="account-card">
      <div slot="header" class="clearfix">
        <span>卡片名称</span>
      </div>
      <p>
        授权到期日：
        <span>2023-03-15 14:06:06</span>
      </p>
      <p>
        研发模块：
        <span>未开通</span>
      </p>
      <p>
        ERP模块：
        <span>未开通</span>
      </p>
      <p>
        跟单模块：
        <span>未开通</span>
      </p>
    </el-card>
  </div>
</template>

<script>
  import { getList } from '@/api/area'

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
  .account {
    display: flex;
    justify-content: space-between;
    .account-card {
      width: 480px;
    }
  }
</style>
