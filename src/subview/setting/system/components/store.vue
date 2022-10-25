<template>
  <div>
    <div class="textCss">
      <p style="font-weight: 600">使用说明</p>
    </div>
    <div style="font-weight: 600">商城配置</div>
    <el-divider />
    <el-radio-group v-model="activeName" style="margin-bottom: 20px">
      <el-radio-button label="基础配置" />
      <el-radio-button label="财务设置" />
      <el-radio-button label="积分设置" />
      <el-radio-button label="分销分红" />
      <el-radio-button label="文本自定义" />
      <el-radio-button label="登录设置" />
      <el-radio-button label="注册协议" />
      <el-radio-button label="配置管理" />
    </el-radio-group>
    <basicSetting v-if="activeName == '基础配置'" />
    <management v-if="activeName == '财务设置'" />
    <jifen v-if="activeName == '积分设置'" />
    <distribution v-if="activeName == '分销分红'" />
    <textTT v-if="activeName == '文本自定义'" />
    <loginGin v-if="activeName == '登录设置'" />
    <fuwenben v-if="activeName == '注册协议'" />
    <accessory v-if="activeName == '配置管理'" />
    <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="基础配置" name="first" />
      <el-tab-pane label="财务设置" name="two">
        <management />
      </el-tab-pane>
      <el-tab-pane label="积分设置" name="three">
        <jifen />
      </el-tab-pane>
      <el-tab-pane label="分销分红" name="four">
        <distribution />
      </el-tab-pane>
      <el-tab-pane label="文本自定义" name="five">
        <textTT />
      </el-tab-pane>
      <el-tab-pane label="登录设置" name="six">
        <loginGin />
      </el-tab-pane>
      <el-tab-pane label="注册协议" name="seven">
        <fuwenben />
      </el-tab-pane>
      <el-tab-pane label="配置管理" name="eight">
        <accessory />
      </el-tab-pane>
    </el-tabs> -->
  </div>
</template>
<script>
  import basicSetting from './peizhi/basicSetting.vue'
  import management from './peizhi/management.vue'
  import jifen from './peizhi/jifen.vue'
  import distribution from './peizhi/distribution.vue'
  import textTT from './peizhi/textTT.vue'
  import accessory from './peizhi/accessory.vue'
  //  import logging from './peizhi/logging.vue'
  import loginGin from './peizhi/loginGin.vue'
  import fuwenben from './peizhi/fuwenben.vue'
  export default {
    components: {
      basicSetting,
      management,
      jifen,
      distribution,
      textTT,
      accessory,
      //  logging,
      loginGin,
      fuwenben,
    },
    data() {
      return {
        activeName: '基础配置',
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event)
      },
    },
  }
</script>

<style lang="scss" scoped>
  ::v-deep.el-form-item--small.el-form-item {
    margin-left: 90px;
  }
  .textCss {
    padding: 8px 16px 8px 16px;
    margin-bottom: 10px;
    font-size: 12px;
    line-height: 22px;
    color: #666;
    background-color: #e8f4ff;
    border-radius: 6px;
  }
</style>
