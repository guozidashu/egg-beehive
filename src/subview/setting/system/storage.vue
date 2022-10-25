<template>
  <div class="comprehensive-form-container">
    <el-card class="tabs-card" shadow="hover">
      <el-tabs v-model="activeName">
        <el-tab-pane label="本地存储" name="本地存储" />
        <el-tab-pane label="阿里云存储" name="阿里云存储" />
        <el-tab-pane label="腾讯云存储" name="腾讯云存储" />
        <el-tab-pane label="七牛云存储" name="七牛云存储" />
      </el-tabs>
      <div
        v-if="activeName == '本地存储'"
        class="textCss"
        v-html="listText[0].text"
      ></div>
      <div
        v-if="activeName == '阿里云存储'"
        class="textCss"
        v-html="listText[1].text"
      ></div>
      <div
        v-if="activeName == '腾讯云存储'"
        class="textCss"
        v-html="listText[2].text"
      ></div>
      <div
        v-if="activeName == '七牛云存储'"
        class="textCss"
        v-html="listText[3].text"
      ></div>
      <el-form
        v-if="activeName === '本地存储'"
        ref="form"
        label-position="right"
        label-width="160px"
        :model="form"
        style="width: 40%"
      >
        <el-form-item label="线下支付状态">
          <span v-if="form.value" style="margin-right: 10px">开启</span>
          <el-switch
            v-model="form.value"
            active-color="#13ce66"
            disabled
            inactive-color="#ff4949"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            style="margin-top: 30px"
            type="primary"
            @click="submitForm('form')"
          >
            保存
          </el-button>
        </el-form-item>
      </el-form>

      <el-form
        v-if="activeName !== '本地存储'"
        ref="form"
        label-position="right"
        label-width="160px"
        :model="form"
        style="width: 40%"
      >
        <el-form-item v-if="activeName === '七牛云存储'" label="AccessKey">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item v-if="activeName === '七牛云存储'" label="Secret">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item v-if="activeName === '阿里云存储'" label="Access Key ID">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item
          v-if="activeName === '阿里云存储'"
          label="Access Key Secret"
        >
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item v-if="activeName === '腾讯云存储'" label="App ID">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item v-if="activeName === '腾讯云存储'" label="Secret ID ">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item v-if="activeName === '腾讯云存储'" label="Secret Key ">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item v-if="activeName === '腾讯云存储'" label="存储地域 ">
          <el-select v-model="form.region" placeholder="请选择存储地域">
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
        <el-form-item v-if="activeName !== '腾讯云存储'" label="图片压缩">
          <el-radio-group v-model="form.state">
            <el-radio label="启用" />
            <el-radio label="关闭" />
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="activeName !== '腾讯云存储' && form.state === '启用'"
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
        activeName: '本地存储',
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
        listText: [
          {
            text: '<p>未设置按照系统默认生成，系统默认：大图800 * 800px，中图300 * 300px，小图150 * 150px</p> ',
          },
          {
            text:
              '<p style="font-weight:600">阿里云oss开通方法</p> <p ">' +
              '第一步： 添加【存储空间】（空间名称不能重复）</p><p > ' +
              '第二步： 开启【使用状态】</p><p >第三步（可选）： 选择云存储空间列表上的修改【空间域名操作】</p><p >' +
              '第四步（可选）： 选择云存储空间列表上的修改【CNAME配置】，打开后复制记录值到对应的平台解析</p>',
          },
          {
            text:
              '<p style="font-weight:600">腾讯云oss开通方法</p> <p ">' +
              '第一步： 添加【存储空间】（空间名称不能重复）</p><p > ' +
              '第二步： 开启【使用状态】</p><p >第三步（可选）： 选择云存储空间列表上的修改【空间域名操作】</p><p >' +
              '第四步（可选）： 选择云存储空间列表上的修改【CNAME配置】，打开后复制记录值到对应的平台解析</p>',
          },
          {
            text:
              '<p style="font-weight:600">七牛云开通方法</p> <p ">' +
              '第一步： 添加【存储空间】（空间名称不能重复）</p><p > ' +
              '第二步： 开启【使用状态】</p><p >第三步（可选）： 选择云存储空间列表上的修改【空间域名操作】</p><p >' +
              '第四步（可选）： 选择云存储空间列表上的修改【CNAME配置】，打开后复制记录值到对应的平台解析</p>',
          },
        ],
      }
    },
    created() {},
    methods: {},
  }
</script>

<style lang="scss" scoped>
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
