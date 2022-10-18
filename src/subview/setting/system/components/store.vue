<template>
  <div>
    <el-card>
      <i class="el-icon-s-tools"></i>
      商城配置
      <el-divider />
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基础配置" name="first">
          <!-- 插入基础设置-->
          <basicSetting />
        </el-tab-pane>
        <el-tab-pane label="财务设置" name="two">
          <!-- 插入配置管理 -->
          <management />
        </el-tab-pane>
        <el-tab-pane label="积分设置" name="three">
          <!-- 插入积分配置 -->
          <jifen />
        </el-tab-pane>
        <el-tab-pane label="分销分红" name="four">
          <!-- 插入分销配置 -->
          <distribution />
        </el-tab-pane>
        <el-tab-pane label="文本自定义" name="five">
          <!-- 插入文本自定义 -->
          <textTT />
        </el-tab-pane>
        <el-tab-pane label="登录设置" name="six">
          <!-- 插入登录设置 -->
          <!-- <logging></logging> -->
          <loginGin />
        </el-tab-pane>
        <el-tab-pane label="注册协议" name="seven">
          <!-- 插入富文本编辑 -->
          <fuwenben />
        </el-tab-pane>
        <el-tab-pane label="配置管理" name="eight">
          <!-- 插入附件设置 -->
          <accessory />
        </el-tab-pane>
      </el-tabs>
    </el-card>
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
        activeName: 'two',
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
</style>
