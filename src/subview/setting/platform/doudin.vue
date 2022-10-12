<template>
  <div class="comprehensive-form-container">
    <el-card shadow="never">
      <div slot="header" class="clearfix">
        <span>绑定微信抖音</span>
      </div>
      <el-form
        ref="form"
        label-position="right"
        label-width="160px"
        :model="form"
        style="width: 40%; padding-top: 40px"
      >
        <el-form-item label="抖音ID：">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="开发者私钥：">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="支付宝公钥：">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="抖音名称：">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="抖音头像：">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="抖音码：">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="抖音支付状态">
          <el-radio-group v-model="form.resource1">
            <el-radio label="开启" />
            <el-radio label="关闭" />
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">确认</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'Platformwxgong',
    data() {
      return {
        formType: '本地储存',
        form: {
          name: '',
          state: '',
          date: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          description: '',
          area: [],
        },
      }
    },
    created() {},
    methods: {},
  }
</script>

<style lang="scss" scoped></style>
