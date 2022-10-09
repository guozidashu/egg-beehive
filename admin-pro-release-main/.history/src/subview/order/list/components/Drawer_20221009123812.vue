<template>
  <div>
    <div class="headed">
      <div class="detail-top">
        <div class="detail-top-text">
          <span>[普通订单]</span>
          <span>订单编号：wx310090959855550464</span>
        </div>
        <el-button
          native-type="submit"
          size="small"
          style="height: 32px"
          type="primary"
        >
          小票打印
        </el-button>
      </div>
      <div class="detail-sta">
        <div class="detail-sta-text">
          <span>订单状态</span>
          <span>待评价</span>
        </div>
        <div class="detail-sta-text">
          <span>实际支付</span>
          <span>¥247.50</span>
        </div>
        <div class="detail-sta-text">
          <span>支付方式</span>
          <span>余额支付</span>
        </div>
        <div class="detail-sta-text">
          <span>支付时间</span>
          <span>2022-10-08 16:30:46</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ComponentsDrawer',
    data() {
      return {}
    },
    created() {},
    methods: {},
  }
</script>
<style lang="scss" scoped>
  .headed {
    padding: 30px 35px 25px;
  }
</style>
