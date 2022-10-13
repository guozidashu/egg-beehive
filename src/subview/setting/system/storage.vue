<template>
  <div class="comprehensive-form-container">
    <el-card class="tabs-card" shadow="hover">
      <el-tabs v-model="activeName">
        <el-tab-pane label="本地储存" name="本地储存" />
        <el-tab-pane label="阿里云储存" name="阿里云储存" />
        <el-tab-pane label="腾讯云储存" name="腾讯云储存" />
        <el-tab-pane label="七牛云储存" name="七牛云储存" />
      </el-tabs>
      <el-button
        v-if="activeName === '本地储存'"
        style="margin-top: 30px"
        type="primary"
        @click="submitForm('form')"
      >
        保存
      </el-button>
      <el-form
        v-if="activeName !== '本地储存'"
        ref="form"
        label-position="right"
        label-width="160px"
        :model="form"
        style="width: 40%"
      >
        <el-form-item v-if="activeName === '七牛云储存'" label="AccessKey">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item v-if="activeName === '七牛云储存'" label="Secret">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item v-if="activeName === '阿里云储存'" label="Access Key ID">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item
          v-if="activeName === '阿里云储存'"
          label="Access Key Secret"
        >
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item v-if="activeName === '腾讯云储存'" label="App ID">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item v-if="activeName === '腾讯云储存'" label="Secret ID ">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item v-if="activeName === '腾讯云储存'" label="Secret Key ">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item v-if="activeName === '腾讯云储存'" label="储存地域 ">
          <el-select v-model="form.region" placeholder="请选择储存地域">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="存储空间(Bucket)">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="访问URL">
          <el-input v-model="form.ur" placeholder="请输入网址">
            <template slot="prepend">Http://</template>
          </el-input>
        </el-form-item>
        <el-form-item v-if="activeName !== '腾讯云储存'" label="图片压缩">
          <el-radio-group v-model="form.state">
            <el-radio label="启用" />
            <el-radio label="关闭" />
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="activeName !== '腾讯云储存' && form.state === '启用'"
          label="压缩样式代码"
        >
          <el-input v-model="form.name" />
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
    name: 'SystemStorage',
    data() {
      return {
        activeName: '本地储存',
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
