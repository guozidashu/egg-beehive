<template>
  <div>
    <el-form label-width="110px">
      <el-form-item label="余额：">
        <el-input v-model="f1" />
      </el-form-item>
      <el-form-item label="积分：">
        <el-input v-model="f2" />
      </el-form-item>
      <el-form-item label="佣金：">
        <el-input v-model="f3" />
      </el-form-item>
      <el-form-item label="优惠券：">
        <el-input v-model="f4" />
      </el-form-item>
      <el-form-item label="会员：">
        <el-input v-model="f5" />
      </el-form-item>
      <el-form-item label="团队分红：">
        <el-input v-model="f6" />
      </el-form-item>
      <el-form-item label="股东分红：">
        <el-input v-model="f7" />
      </el-form-item>
      <el-form-item label="区域代理分红：">
        <el-input v-model="f8" />
      </el-form-item>
    </el-form>
    <el-button style="margin-left: 110px" type="primary">提交</el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        f1: '余额',
        f2: '积分',
        f3: '佣金',
        f4: '优惠券',
        f5: '会员',
        f6: '团队分红',
        f7: '股东分红',
        f8: '区域代理分红',
      }
    },
  }
</script>

<style lang="scss" scoped>
  ::v-deep .el-input--small .el-input__inner {
    width: 248px;
    height: 32px;
    line-height: 32px;
  }
</style>
