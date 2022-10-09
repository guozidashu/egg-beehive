<template>
  <div class="comprehensive-form-container">
    <el-radio-group
      v-model="orderForm.orderSta"
      size="small"
      @change="changeHandler"
    >
      <el-radio-button label="全部" />
      <el-radio-button label="待收款" />
      <el-radio-button label="待发货" />
      <el-radio-button label="待收货" />
      <el-radio-button label="退货" />
      <el-radio-button label="待确认" />
    </el-radio-group>
  </div>
</template>

<script>
  export default {
    name: 'SystemStorage',
    data() {
      return {}
    },
    created() {},
    methods: {},
  }
</script>

<style lang="scss" scoped></style>
