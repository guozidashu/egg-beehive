<template>
  <div>
    <el-form label-width="130px" >
        <el-form-item label="分销结算方式：">
            <el-radio-group v-model="radio">
    <el-radio :label="3">按商品价格</el-radio>
    <el-radio :label="6">按成交价格</el-radio>
    <el-radio :label="9">按销售利润</el-radio>
  </el-radio-group>
  <div style="margin-left:80px;color:#999999">按商品价格结算：商品价格×提成百分比；按成交价格结算：成交价格×提成百分比,即扣除会员折扣、满减优惠、优惠券抵扣及积分抵扣后计算分销；按销售利润结算：（成交价格-商品成本）×提成百分比</div>
        </el-form-item>
        <el-form-item label="分销结算时间：">
            <el-radio-group v-model="get1">
    <el-radio :label="1">确认收货后结算</el-radio>
    <el-radio :label="2">付款后结算</el-radio>
  </el-radio-group>
  <div style="margin-left:80px;color:#999999">注意：选择付款后结算，如果产生退款，已发放的佣金不会扣除</div>
        </el-form-item>
        <el-form-item label="分红结算方式：">
            <el-radio-group v-model="get2">
    <el-radio :label="1">按销售金额</el-radio>
    <el-radio :label="2">按销售利润</el-radio>
  </el-radio-group>
  <div style="margin-left:80px;color:#999999">按销售金额结算即：销售价格×提成百分比，按销售利润即：（销售价格-商品成本）×提成百分比
</div>
        </el-form-item>
        <el-form-item label="分红结算时间：">
            <el-radio-group v-model="get3">
    <el-radio :label="1">确认收货后结算</el-radio>
    <el-radio :label="2">付款后结算</el-radio>
  </el-radio-group>
  <div style="margin-left:80px;color:#999999">确认收货后结算：可选计算周期，付款后结算：每分钟计算一次</div>
  <div style="color:red;margin-left:80px">注意：选择付款后结算退款时无法退回分红</div>
        </el-form-item>
        <el-form-item label="分红结算周期：">
            <el-radio-group v-model="get4">
    <el-radio :label="1">每天结算</el-radio>
    <el-radio :label="2">每小时结算</el-radio>
    <el-radio :label="3">每分钟结算</el-radio>
    <el-radio :label="4">月初结算</el-radio>
    <el-radio :label="4">月底结算</el-radio>
  </el-radio-group>
  <div style="margin-left:80px;color:#999999">每天结算则第二天计算前一天的分红并发放，月初结算则每月一号计算上一个月的分红并发放（确认收货的订单）</div>
        </el-form-item>
        <el-form-item label="团队分红级差：">
            <el-radio-group v-model="get5">
    <el-radio :label="1">是</el-radio>
    <el-radio :label="2">否</el-radio>
  </el-radio-group>
  <div style="margin-left:80px;color:#999999">开启后团队分红将按照级差进行分红</div>
        </el-form-item>
        <el-form-item label="多商户商品分红：">
            <el-radio-group v-model="get5">
    <el-radio :label="1">是</el-radio>
    <el-radio :label="2">否</el-radio>
  </el-radio-group>
  <div style="margin-left:80px;color:#999999">开启后多商户的商品也参与分红</div>
        </el-form-item>
    </el-form>
    <el-button style="margin-left:80px;margin-top:30px;background-color: #009688;border:unset">提交</el-button>
  </div>
</template>

<script>
export default {
    data () {
      return {
        radio: 3,
        get1:1,
        get2:1,
        get3:1,
        get4:1,
        get5:1
      };
    }
}
</script>

<style>

</style>