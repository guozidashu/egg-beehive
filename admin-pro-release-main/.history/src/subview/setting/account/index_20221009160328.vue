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
    <div style="display: flex; justify-content: space-between">
      <el-card style="width: 60%">
        <div slot="header">
          <span>通知信息</span>
        </div>
      </el-card>
      <el-card style="width: 38%">
        <div slot="header">
          <span>客服信息</span>
        </div>
        <div class="customer-warp">
          <el-avatar :size="100" :src="avatar" />
          <div>
            <p>楚芝馨</p>
            <p>15236804776</p>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'Account',
    data() {
      return {}
    },
    computed: {
      ...mapGetters({
        avatar: 'user/avatar',
      }),
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
  .customer-warp {
    display: flex;
  }
</style>
