<template>
  <div>
    <el-form label-width="150px">
      <el-form-item label="消费赠积分：">
        <el-row type="felx">
          <el-input
            v-model="input1"
            placeholder="请输入内容"
            style="width: 200px"
          >
            <template slot="prepend">消费每满</template>
          </el-input>
          <span>元</span>
          <el-input
            v-model="input1"
            placeholder="请输入内容"
            style="width: 200px; margin-left: 20px"
          >
            <template slot="prepend">赠送</template>
          </el-input>
          <span>积分</span>
          <span style="margin-left: 20px; color: #a5a5ae">
            使用余额支付时不赠送，支付后积分立即到账，发生退款时不会扣除
          </span>
        </el-row>
      </el-form-item>
      <el-form-item label="充值赠积分：">
        <el-row type="felx">
          <el-input
            v-model="input1"
            placeholder="请输入内容"
            style="width: 200px"
          >
            <template slot="prepend">充值每满</template>
          </el-input>
          <span>元</span>
          <el-input
            v-model="input1"
            placeholder="请输入内容"
            style="width: 200px; margin-left: 20px"
          >
            <template slot="prepend">赠送</template>
          </el-input>
          <span>积分</span>
        </el-row>
      </el-form-item>
      <el-form-item label="积分抵扣：">
        <el-input
          v-model="input1"
          placeholder="请输入内容"
          style="width: 200px"
        >
          <template slot="prepend">每积分抵扣</template>
        </el-input>
        <span>元</span>
        <span style="margin-left: 30px; color: #a5a5ae">
          付款时一个积分可以抵扣多少元，0表示不开启积分抵扣
        </span>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="input1"
          placeholder="请输入内容"
          style="width: 200px"
        >
          <template slot="prepend">最多抵扣百分比</template>
        </el-input>
        <span>%</span>
        <span style="margin-left: 30px; color: #a5a5ae">
          选择使用积分抵扣时，最多可抵扣订单额的百分之多少
        </span>
      </el-form-item>
      <el-form-item label="积分不抵扣运费">
        <el-switch v-model="value1" active-text="开启" inactive-text="关闭" />
        <span style="margin-left: 10px; color: #a5a5ae">
          开启后积分不能抵扣运费
        </span>
      </el-form-item>
    </el-form>
    <el-button
      style="margin-top: 30px; margin-left: 80px; border: unset"
      type="primary"
    >
      提交
    </el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        y1: '1.00',
        y2: '1',
        y3: '1.00',
        y4: '1',
        y5: '0.01',
        value: true,
        input1: 1.0,
        value1: true,
      }
    },
  }
</script>

<style lang="scss" scoped>
  ::v-deep .el-input-group__prepend {
    background-color: #e6e6e6;
    border: 1px solid #dcdfe6;
  }
</style>
