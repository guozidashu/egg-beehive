<template>
  <div class="comprehensive-form-container">
    <el-radio-group v-model="formType" size="small" style="width: 100%">
      <el-radio-button label="基础设置" />
      <el-radio-button label="财务设置" />
      <el-radio-button label="积分设置" />
      <el-radio-button label="分销分红" />
      <el-radio-button label="文本自定义" />
      <el-radio-button label="登录设置" />
      <el-radio-button label="注册协议" />
      <el-radio-button label="附件设置" />
    </el-radio-group>
    <el-form
      v-if="formType === '基础设置'"
      ref="form"
      label-position="right"
      label-width="160px"
      :model="form"
      style="width: 100%; padding-top: 40px"
    >
      <el-form-item label="商家名称：">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="唯一标识：">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="API域名：">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="商家LOGO：">
        <el-button type="primary" @click="submitForm('form')">
          上传图片
        </el-button>
        <sapn style="margin-left: 10px; color: #999">
          建议尺寸：200×200像素
        </sapn>
      </el-form-item>
      <el-form-item>
        <img
          src="https://new.shopvvv.cn/static/imgsrc/logo.jpg"
          style="width: 100px; height: 100px"
        />
      </el-form-item>
      <el-form-item label="商家简介：">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="商家服务电话：">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="商家地址：">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="经纬度：">
        <el-input v-model="form.name" style="width: 150px" />
        -
        <el-input v-model="form.name" style="width: 150px" />
        <el-button
          style="margin-left: 10px"
          type="primary"
          @click="submitForm('form')"
        >
          选择坐标
        </el-button>
      </el-form-item>
      <el-form-item label="客服系统链接：">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="客服系统链接：">
        <span style="margin-left: 10px; color: #999">
          商品详情页客服链接，不填写则使用商城内部客服系统
        </span>
      </el-form-item>
      <el-form-item label="微信小程序客服：">
        <el-radio-group v-model="form.resource1">
          <el-radio label="客服链接" />
          <el-radio label="小程序客服" />
          <el-radio label="微信客服" />
        </el-radio-group>
      </el-form-item>
      <div style="display: flex; flex-direction: row">
        <el-form-item
          v-if="form.resource1 === '客服链接' || form.resource1 === '微信客服'"
          label="客服链接："
        >
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item v-if="form.resource1 === '微信客服'" label="企业ID：">
          <el-input v-model="form.name" />
        </el-form-item>
      </div>
      <el-form-item>
        <span style="color: #999">
          客服链接：使用填写的客服链接，不填写则使用商城内部客服系统；
          小程序客服：在小程序后台-功能-客服-小程序客服，配置客服人员；
          微信客服：在
          <span style="color: black">微信客服</span>
          系统注册账号并绑定，
          <span style="color: black">查看绑定流程</span>
          ，填写企业ID并复制客服链接填写到客服链接处
        </span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'SystemStorage',
    data() {
      return {
        formType: '基础设置',
        form: {
          name: '',
          state: '',
          date: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          description: '',
          checkList: ['选中且禁用', '复选框 A'],
          area: [],
        },
      }
    },
    created() {},
    methods: {},
  }
</script>

<style lang="scss" scoped></style>
