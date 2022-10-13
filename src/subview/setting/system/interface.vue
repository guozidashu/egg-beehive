<template>
  <div class="comprehensive-form-container">
    <el-card class="tabs-card" shadow="hover">
      <el-tabs v-model="activeName">
        <el-tab-pane label="聚水潭ERP" name="聚水潭ERP" />
        <el-tab-pane label="伯俊BOS" name="伯俊BOS" />
        <el-tab-pane label="百盛ERP" name="百盛ERP" />
        <el-tab-pane label="紫日ERP" name="紫日ERP" />
      </el-tabs>
      <el-form
        ref="form"
        label-position="right"
        label-width="160px"
        :model="form"
        style="width: 40%"
      >
        <el-form-item v-if="formType === '聚水潭ERP'" label="AccessKey">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item v-if="formType === '聚水潭ERP'" label="Secret">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item v-if="formType === '伯俊BOS'" label="Access Key ID">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item v-if="formType === '伯俊BOS'" label="Access Key Secret">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item v-if="formType === '百盛ERP'" label="App ID">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item v-if="formType === '百盛ERP'" label="Secret ID ">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item v-if="formType === '百盛ERP'" label="Secret Key ">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item v-if="formType === '百盛ERP'" label="储存地域 ">
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
        <el-form-item v-if="formType !== '百盛ERP'" label="图片压缩">
          <el-radio-group v-model="form.state">
            <el-radio label="启用" />
            <el-radio label="关闭" />
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="formType !== '百盛ERP' && form.state === '启用'"
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
