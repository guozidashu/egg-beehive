<template>
  <div class="comprehensive-form-container">
    <el-card class="tabs-card" shadow="hover" style="border-radius: 5px">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!-- <el-tab-pane label="本地存储" name="本地存储" />
        <el-tab-pane label="阿里云存储" name="阿里云存储" />
        <el-tab-pane label="腾讯云存储" name="腾讯云存储" /> -->
        <el-tab-pane label="七牛云存储" name="七牛云存储" />
      </el-tabs>
      <div
        v-if="activeName == '本地存储'"
        class="textCss ceshi-color ceshi-background"
        v-html="listText[0].text"
      ></div>
      <div
        v-if="activeName == '阿里云存储'"
        class="textCss ceshi-color ceshi-background"
        v-html="listText[1].text"
      ></div>
      <div
        v-if="activeName == '腾讯云存储'"
        class="textCss ceshi-color ceshi-background"
        v-html="listText[2].text"
      ></div>
      <div
        v-if="activeName == '七牛云存储'"
        class="textCss ceshi-color ceshi-background"
        v-html="listText[3].text"
      ></div>
      <el-form
        ref="form"
        label-position="right"
        label-width="160px"
        :model="form"
        :rules="rules"
        style="width: 40%; margin-top: 20px"
      >
        <div v-if="activeName === '本地存储'">
          <el-form-item label="接口是否开启">
            <el-switch
              v-model="form.state"
              active-color="#41B584"
              active-text="开启"
              :active-value="1"
              class="switch"
              inactive-color="#D2D2D2"
              inactive-text="关闭"
              :inactive-value="0"
            />
          </el-form-item>
        </div>
        <div v-if="activeName === '阿里云存储'">
          <el-form-item label="access_key_id" prop="access_key_id">
            <el-input v-model="form.access_key_id" />
          </el-form-item>
          <el-form-item label="access_key_secret" prop="access_key_secret">
            <el-input v-model="form.access_key_secret" />
          </el-form-item>
          <el-form-item label="访问链接" prop="url">
            <el-input v-model="form.url" />
          </el-form-item>
          <el-form-item label="存储桶" prop="bucket">
            <el-input v-model="form.bucket" />
          </el-form-item>
          <el-form-item label="是否启用图片压缩">
            <el-switch
              v-model="form.photo_reduce"
              active-color="#41B584"
              active-text="开启"
              :active-value="1"
              class="switch"
              inactive-color="#D2D2D2"
              inactive-text="关闭"
              :inactive-value="0"
            />
          </el-form-item>
        </div>
        <div v-if="activeName === '腾讯云存储'">
          <el-form-item label="app_id" prop="app_id1">
            <el-input v-model="form.app_id1" />
          </el-form-item>
          <el-form-item label="secret_id" prop="secret_id1">
            <el-input v-model="form.secret_id1" />
          </el-form-item>
          <el-form-item label="secret_key" prop="secret_key1">
            <el-input v-model="form.secret_key1" />
          </el-form-item>
          <el-form-item label="访问链接" prop="url1">
            <el-input v-model="form.url1" />
          </el-form-item>
          <el-form-item label="存储桶" prop="bucket1">
            <el-input v-model="form.bucket1" />
          </el-form-item>
        </div>
        <div v-if="activeName === '七牛云存储'">
          <el-form-item label="access_key_id" prop="access_key_id2">
            <el-input v-model="form.access_key_id2" />
          </el-form-item>
          <el-form-item label="access_key_secret" prop="access_key_secret2">
            <el-input v-model="form.access_key_secret2" />
          </el-form-item>
          <el-form-item label="访问链接" prop="url2">
            <el-input v-model="form.url2" />
          </el-form-item>
          <el-form-item label="存储桶" prop="bucket2">
            <el-input v-model="form.bucket2" />
          </el-form-item>
          <!-- <el-form-item label="是否启用图片压缩">
            <el-switch
              v-model="form.photo_reduce2"
              active-color="#41B584"
              active-text="开启"
              :active-value="1"
              class="switch"
              inactive-color="#D2D2D2"
              inactive-text="关闭"
              :inactive-value="0"
            />
          </el-form-item> -->
        </div>
        <el-form-item>
          <el-button
            v-has-permi="['btn:SystemStorage:edit']"
            style="margin-top: 10px"
            type="primary"
            @click="submitForm('form')"
          >
            保存
          </el-button>
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
        activeName: '七牛云存储',
        form: {
          state: 0, //接口是否开启

          access_key_id: null, //access_key_id
          access_key_secret: null, //access_key_secret
          url: null, //访问链接
          bucket: null, //存储桶
          photo_reduce: 0, //是否启用图片压缩 0否 1是

          app_id1: null, //app_id
          secret_id1: null, //secret_id
          secret_key1: null, //secret_key
          url1: null, //访问链接
          bucket1: null, //存储桶

          access_key_id2: null, //access_key_id
          access_key_secret2: null, //access_key_secret
          url2: null, //访问链接
          bucket2: null, //存储桶
          photo_reduce2: 0, //是否启用图片压缩 0否 1是
        },
        rules: {
          access_key_id: [
            {
              required: true,
              message: '请输入access_key_id',
              trigger: 'blur',
            },
          ],
          access_key_secret: [
            {
              required: true,
              message: '请输入access_key_secret',
              trigger: 'blur',
            },
          ],
          url: [
            {
              required: true,
              message: '请输入访问链接',
              trigger: 'blur',
            },
          ],
          bucket: [
            {
              required: true,
              message: '请输入存储桶',
              trigger: 'blur',
            },
          ],
          app_id1: [
            {
              required: true,
              message: '请输入app_id',
              trigger: 'blur',
            },
          ],
          secret_id1: [
            {
              required: true,
              message: '请输入secret_id',
              trigger: 'blur',
            },
          ],
          secret_key1: [
            {
              required: true,
              message: '请输入secret_key',
              trigger: 'blur',
            },
          ],
          url1: [
            {
              required: true,
              message: '请输入访问链接',
              trigger: 'blur',
            },
          ],
          bucket1: [
            {
              required: true,
              message: '请输入存储桶',
              trigger: 'blur',
            },
          ],
          access_key_id2: [
            {
              required: true,
              message: '请输入access_key_id',
              trigger: 'blur',
            },
          ],
          access_key_secret2: [
            {
              required: true,
              message: '请输入access_key_secret',
              trigger: 'blur',
            },
          ],
          url2: [
            {
              required: true,
              message: '请输入访问链接',
              trigger: 'blur',
            },
          ],
          bucket2: [
            {
              required: true,
              message: '请输入存储桶',
              trigger: 'blur',
            },
          ],
        },
        listText: [
          {
            text:
              '<p style="font-weight:600">本地存储开通方法</p> <p ">' +
              '第一步： 文件、图片存储在圈域服务器由阿里云计算提供技术及安全服务</p><p > ' +
              '第二步： 圈域默认提供10G免费存储空间，超额部分需另行购买，具体参考阿里云计价</p><p >' +
              '第三步： 私有化独立部署客户请省略</p>',
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
    created() {
      this.fetchData()
    },
    methods: {
      async handleClick() {
        this.fetchData()
      },
      async fetchData() {
        if (this.activeName == '本地存储') {
          const { data } = await this.api.getConfig({ key: 'local_store' })
          if (data !== null) {
            let temp = JSON.parse(data)
            this.form.state = Number(temp.state)
          }
        } else if (this.activeName == '阿里云存储') {
          const { data } = await this.api.getConfig({ key: 'aliyun_oss' })
          if (data !== null) {
            let temp = JSON.parse(data)
            this.form.access_key_id = temp.access_key_id
            this.form.access_key_secret = temp.access_key_secret
            this.form.url = temp.url
            this.form.bucket = temp.bucket
            this.form.photo_reduce = Number(temp.photo_reduce)
          }
        } else if (this.activeName == '腾讯云存储') {
          const { data } = await this.api.getConfig({ key: 'tencent_oss' })
          if (data !== null) {
            let temp = JSON.parse(data)
            this.form.app_id1 = temp.app_id
            this.form.secret_id1 = temp.secret_id
            this.form.secret_key1 = temp.secret_key
            this.form.url1 = temp.url
            this.form.bucket1 = temp.bucket
          }
        } else if (this.activeName == '七牛云存储') {
          const { data } = await this.api.getConfig({ key: 'qiniu_oss' })
          if (data !== null) {
            let temp = JSON.parse(data)
            this.form.access_key_id2 = temp.access_key_id
            this.form.access_key_secret2 = temp.access_key_secret
            this.form.url2 = temp.url
            this.form.bucket2 = temp.bucket
            this.form.photo_reduce2 = Number(temp.photo_reduce)
          }
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            if (this.activeName == '本地存储') {
              const { code } = await this.api.editLocalStore({
                state: this.form.state, //接口是否开启
              })
              if (code === 200) {
                this.$message.success('保存成功')
              } else {
                this.$message.error('保存失败')
              }
            } else if (this.activeName == '阿里云存储') {
              const { code } = await this.api.editALiYunOss({
                access_key_id: this.form.access_key_id, //access_key_id
                access_key_secret: this.form.access_key_secret, //access_key_secret
                url: this.form.url, //访问链接
                bucket: this.form.bucket, //存储桶
                photo_reduce: this.form.photo_reduce, //是否启用图片压缩 0否 1是
              })
              if (code === 200) {
                this.$message.success('保存成功')
              } else {
                this.$message.error('保存失败')
              }
            } else if (this.activeName == '腾讯云存储') {
              const { code } = await this.api.editTencentOss({
                app_id: this.form.app_id1, //app_id
                secret_id: this.form.secret_id1, //secret_id
                secret_key: this.form.secret_key1, //secret_key
                url: this.form.url1, //访问链接
                bucket: this.form.bucket1, //存储桶
              })
              if (code === 200) {
                this.$message.success('保存成功')
              } else {
                this.$message.error('保存失败')
              }
            } else if (this.activeName == '七牛云存储') {
              const { code } = await this.api.editQiNiuOss({
                access_key_id: this.form.access_key_id2, //access_key_id
                access_key_secret: this.form.access_key_secret2, //access_key_secret
                url: this.form.url2, //访问链接
                bucket: this.form.bucket2, //存储桶
                photo_reduce: this.form.photo_reduce2, //是否启用图片压缩 0否 1是
              })
              if (code === 200) {
                this.$message.success('保存成功')
              } else {
                this.$message.error('保存失败')
              }
            }
          }
        })
      },
    },
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
