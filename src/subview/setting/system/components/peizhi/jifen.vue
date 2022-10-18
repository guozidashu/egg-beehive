<template>
  <div>
    <el-form>
      <el-form-item label="消费赠积分：">
        <div style="display: flex">
          <div style="margin-right: 13px">
            <span class="cl1">消费每满</span>
            <el-input v-model="y1" class="cl1Ipt" />
            元
          </div>
          <div>
            <span class="cl1">赠送</span>
            <el-input v-model="y2" class="cl1Ipt" />
            积分
          </div>
          <div style="margin-left: 13px">
            使用余额支付时不赠送，支付后积分即到账，发生退款时不会扣除
          </div>
        </div>
      </el-form-item>
      <el-form-item label="充值赠积分：">
        <div style="display: flex">
          <div style="margin-right: 13px; color: #999999">
            <span class="cl1">充值每满</span>
            <el-input v-model="y3" class="cl1Ipt" />
            元
          </div>
          <div>
            <span class="cl1">赠送</span>
            <el-input v-model="y4" class="cl1Ipt" />
            积分
          </div>
        </div>
      </el-form-item>
      <el-form-item label="积分抵扣：">
        <div style="display: flex">
          <div style="margin-right: 13px">
            <span class="cl1">每积分抵扣</span>
            <el-input v-model="y5" class="cl1Ipt" />
            元
          </div>
          <div style="margin-right: 13px; color: #999999">
            付款时一个积分可抵扣多少元，0表示不开启积分抵扣
          </div>
        </div>
        <div style="display: flex">
          <div style="margin-right: 13px">
            <span class="cl2">最多抵扣百分比</span>
            <el-input v-model="y5" class="cl1Ipt" />
            %
          </div>
          <div style="line-height: 50px; color: #999999">
            选择使用积分抵扣时，最多可抵扣订单额的百分之多少
          </div>
        </div>
      </el-form-item>
      <el-form-item label="积分不抵扣运费：">
        <el-switch
          v-model="value"
          active-color="#13ce66"
          inactive-color="#ff4949"
        />
        <span style="margin-left: 20px">开启后积分不能抵扣运费</span>
      </el-form-item>
    </el-form>
    <el-button
      style="
        margin-left: 80px;
        margin-top: 30px;
        background-color: #009688;
        border: unset;
      "
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
      }
    },
  }
</script>

<style lang="scss">
  .cl1 {
    display: inline-block;
    width: 74px;
    height: 35px;
    background-color: #e6e6e6;
    text-align: center;
  }
  .cl2 {
    display: inline-block;
    width: 116px;
    height: 38px;
    background-color: #e6e6e6;
    text-align: center;
    margin-left: 160px;
    margin-top: 10px;
  }
  .cl1Ipt {
    width: 100px;
    height: 35px;
  }
</style>
