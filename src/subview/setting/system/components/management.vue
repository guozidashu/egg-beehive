<template>
  <div>
    <el-divider content-position="left">余额</el-divider>
    <el-form label-width="108px">
      <el-form-item label="余额支付：">
        <el-radio-group v-model="open1">
          <el-radio :label="1">开启</el-radio>
          <el-radio :label="2">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="余额充值：">
        <el-radio-group v-model="open2">
          <el-radio :label="3">开启</el-radio>
          <el-radio :label="4">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="佣金转余额：">
        <el-radio-group v-model="open3">
          <el-radio :label="5">开启</el-radio>
          <el-radio :label="6">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
      <div style="margin-left: 80px; color: #999999">
        开启后会员可以将佣金直接转入余额中用于消费
      </div>
      <el-divider content-position="left">提现</el-divider>
      <el-form-item label="提现方式：">
        <el-checkbox-group v-model="checkboxGroup1" size="small">
          <el-checkbox
            border
            class="box1"
            label="微信钱包"
            style="padding-left: 0px"
          />
          <el-checkbox
            border
            class="box1"
            label=" 支付宝"
            style="padding-left: 3px"
          />
          <el-checkbox
            border
            class="box1"
            label="银行卡"
            style="padding-left: 3px"
          />
        </el-checkbox-group>
        <div style="margin-left: 80px; color: #999999">
          提现到微信钱包需开通企业付款到零钱功能
        </div>
      </el-form-item>
      <el-form-item label="自动打款：">
        <el-radio-group v-model="open4">
          <el-radio :label="7">关闭</el-radio>
          <el-radio :label="8">开启</el-radio>
        </el-radio-group>
        <span style="margin-left: 80px; color: #999999">
          开启后提现到微信钱包时不需要审核，自动用企业付款打款，需开通企业付款到零钱功能
        </span>
      </el-form-item>
      <el-form-item label="余额提现：">
        <el-radio-group v-model="open5">
          <el-radio :label="9">开启</el-radio>
          <el-radio :label="10">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="佣金提现：">
        <el-radio-group v-model="open6">
          <el-radio :label="11">开启</el-radio>
          <el-radio :label="12">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="提现最小金额：">
        <el-row type="flex">
          <el-input v-model="money" />
          <span style="margin-left: -1120px">元</span>
        </el-row>
      </el-form-item>
      <el-form-item label="提现手续费：">
        <el-row type="flex">
          <el-input v-model="money1" />
          <span style="margin-left: -1120px">%</span>
        </el-row>
      </el-form-item>
      <el-divider content-position="left">在线支付</el-divider>
      <el-form-item label="微信支付限额：">
        <el-input v-model="money2" />
        超过此金额只能联系客服支付，0代表不限制
      </el-form-item>
      <el-form-item label="主动打款：">
        <el-radio-group v-model="open7">
          <el-radio :label="11">开启</el-radio>
          <el-radio :label="12">关闭</el-radio>
        </el-radio-group>
        <span style="margin-left: 80px; color: #999999">
          开启后，线下转账支付需要客户上传打款截图
        </span>
      </el-form-item>
      <el-divider content-position="left">发票</el-divider>
      <el-form-item label="发票开关：">
        <el-radio-group v-model="open8">
          <el-radio :label="13">关闭</el-radio>
          <el-radio :label="14">开启</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-divider content-position="left">转账汇款</el-divider>
      <el-form-item label="转账汇款支付：">
        <el-radio-group v-model="open9">
          <el-radio :label="15">开启</el-radio>
          <el-radio :label="16">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
      <div style="margin-left: 80px; color: #999999">
        开启后会员下单时可使用此支付方式，后台需审核并处理订单，仅平台支持
      </div>
    </el-form>
    <el-button style="margin-top: 20px; margin-left: 40px" type="primary">
      提交
    </el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        open1: 1,
        open2: 3,
        open3: 6,
        open4: 7,
        open5: 10,
        open6: 11,
        open7: 12,
        open8: 14,
        open9: 16,
        checkList: ['微信钱包', '支付宝', '银行卡'],
        money: '1.00',
        money1: '0.00',
        money2: '0',
        checkboxGroup1: ['注册登录', '手机号登录', '授权登录'],
      }
    },
  }
</script>
<style lang="scss" scoped>
  ::v-deep .el-input--small .el-input__inner {
    width: 248px;
  }
  ::v-deep .el-checkbox.is-bordered + .el-checkbox.is-bordered {
    padding-right: 22px;
    margin-left: 10px;
  }
</style>
<style lang="scss" scoped>
  .el-divider--horizontal .el-divider__text {
    padding-top: 10px;
    font-size: 16px;
  }
  html body .el-divider--horizontal,
  html body[class*='vab-theme-'] .el-divider--horizontal {
    margin-top: 47px;
  }
  .vab-theme-blue-black
    .el-checkbox-button.is-checked
    .el-checkbox-button__inner {
    margin-right: 45px;
    background-color: #1890ff;
    border-color: #1890ff;
  }
  [data-v-5509bdc4] .el-checkbox.is-bordered + .el-checkbox.is-bordered {
    padding-right: 35px;
    margin-left: 11px;
  }

  ::v-deep .el-checkbox.is-bordered.el-checkbox--small .el-checkbox__inner {
    width: 32px;
    height: 32px;
    text-align: center;
    background-color: #fff;
    border: 1px solid #5fb878;
  }
  ::v-deep[data-v-49011f64]
    .el-checkbox.is-bordered.el-checkbox--small
    .el-checkbox__inner {
    position: absolute;
    top: -15px;
    left: 73px;
  }
  .vab-theme-blue-black .el-checkbox.is-bordered.is-checked {
    background-color: #1890ff;
    border: 1px solid #1890ff;
  }
  ::v-deep .el-checkbox__inner::after {
    top: 1px;
    left: 10px;
  }
  ::v-deep
    .el-checkbox.is-bordered.el-checkbox--small
    .el-checkbox__inner::after {
    width: 8px;
    height: 16px;
  }
  ::v-deep .el-checkbox__inner::after {
    border: 1px solid #1890ff;
    border-top: #fff;
    border-left: #fff;
  }
  ::v-deep
    [data-v-49011f64]
    .el-checkbox.is-bordered.el-checkbox--small
    .el-checkbox__inner {
    border: 1px solid #d2d2d2;
  }
  ::v-deep .el-checkbox.is-bordered.el-checkbox--small .el-checkbox__label {
    color: #fff;
  }
  ::v-deep .el-checkbox.is-bordered {
    background-color: #d2d2d2;
  }
  ::v-deep .el-checkbox__inner {
    position: absolute;
    top: -16px;
    left: 73px;
  }
  ::v-deep[data-v-5509bdc4]
    .el-checkbox.is-bordered.el-checkbox--small
    .el-checkbox__inner {
    border: 1px solid #d2d2d2;
  }
  ::v-deep[data-v-64dbe5e0]
    .el-checkbox.is-bordered.el-checkbox--small
    .el-checkbox__inner {
    width: 32px;
    height: 32px;
    margin-left: -13px;
    text-align: center;
    background-color: #fff;
    border: 1px solid #d2d2d2;
  }
</style>
