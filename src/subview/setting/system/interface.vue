<template>
  <div class="comprehensive-form-container">
    <el-card class="tabs-card" shadow="hover">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="聚水潭ERP" name="聚水潭ERP" />
        <el-tab-pane label="旺店通ERP" name="旺店通ERP" />
        <el-tab-pane label="伯俊BOS" name="伯俊BOS" />
        <el-tab-pane label="百胜ERP" name="百胜ERP" />
        <el-tab-pane label="紫日ERP" name="紫日ERP" />
      </el-tabs>
      <div
        v-if="activeName == '聚水潭ERP'"
        class="textCss"
        v-html="listText[0].text"
      ></div>
      <div
        v-if="activeName == '旺店通ERP'"
        class="textCss"
        v-html="listText[1].text"
      ></div>
      <div
        v-if="activeName == '伯俊BOS'"
        class="textCss"
        v-html="listText[2].text"
      ></div>
      <div
        v-if="activeName == '百胜ERP'"
        class="textCss"
        v-html="listText[3].text"
      ></div>
      <div
        v-if="activeName == '紫日ERP'"
        class="textCss"
        v-html="listText[4].text"
      ></div>
      <el-form
        ref="form"
        label-position="right"
        label-width="200px"
        :model="form"
        :rules="rules"
        style="width: 100%"
      >
        <div style="font-weight: 600">对接设置</div>
        <el-divider />
        <div v-if="activeName == '聚水潭ERP'">
          <el-form-item label="聚水潭接口是否开启：">
            <el-radio-group v-model="form.jst_api_open">
              <el-radio :label="1">开启</el-radio>
              <el-radio :label="0">关闭</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="ERP版本：">
            <el-radio-group v-model="form.jst_version">
              <el-radio :label="1">ERP专业版</el-radio>
              <el-radio :label="2">ERP企业版</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="聚水潭authUrl：" prop="jst_auth_url">
            <el-input v-model="form.jst_auth_url" style="width: 40%" />
          </el-form-item>
          <el-form-item label="聚水潭baseUrl：" prop="jst_base_url">
            <el-input v-model="form.jst_base_url" style="width: 40%" />
          </el-form-item>
          <el-form-item label="聚水潭access_token：" prop="jst_access_token">
            <el-input v-model="form.jst_access_token" style="width: 40%" />
          </el-form-item>
          <el-form-item label="聚水潭app_Key：" prop="jst_app_key">
            <el-input v-model="form.jst_app_key" style="width: 40%" />
          </el-form-item>
          <el-form-item label="聚水潭app_Secret：" prop="jst_app_secret">
            <el-input v-model="form.jst_app_secret" style="width: 40%" />
          </el-form-item>
        </div>
        <div v-if="activeName == '旺店通ERP'">
          <el-form-item label="旺店通接口是否开启：">
            <el-radio-group v-model="form.api_open">
              <el-radio :label="1">开启</el-radio>
              <el-radio :label="0">关闭</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="ERP版本：">
            <el-radio-group v-model="form.version">
              <el-radio :label="1">ERP专业版</el-radio>
              <el-radio :label="2">ERP企业版</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="旺店通authUrl：" prop="auth_url">
            <el-input v-model="form.auth_url" style="width: 40%" />
          </el-form-item>
          <el-form-item label="旺店通baseUrl：" prop="base_url">
            <el-input v-model="form.base_url" style="width: 40%" />
          </el-form-item>
          <el-form-item label="旺店通access_token：" prop="access_token">
            <el-input v-model="form.access_token" style="width: 40%" />
          </el-form-item>
          <el-form-item label="旺店通app_Key：" prop="app_key">
            <el-input v-model="form.app_key" style="width: 40%" />
          </el-form-item>
          <el-form-item label="旺店通app_Secret：" prop="app_secret">
            <el-input v-model="form.app_secret" style="width: 40%" />
          </el-form-item>
        </div>
        <div
          v-if="
            activeName == '伯俊BOS' ||
            activeName == '百胜ERP' ||
            activeName == '紫日ERP'
          "
        >
          <el-form-item label="聚水潭接口是否开启：">
            <el-radio-group v-model="form.api_open1">
              <el-radio :label="1">开启</el-radio>
              <el-radio :label="0">关闭</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="activeName == '伯俊BOS'" label="ERP版本：">
            <el-radio-group v-model="form.version1">
              <el-radio :label="1">BOSXE</el-radio>
              <el-radio :label="2">BOS2.0</el-radio>
              <el-radio :label="3">BOS3.0</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="activeName == '百胜ERP'" label="ERP版本：">
            <el-radio-group v-model="form.version1">
              <el-radio :label="1">BSERP2</el-radio>
              <el-radio :label="2">BS3000+</el-radio>
              <el-radio :label="3">BSERP3+IPOS</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="activeName == '紫日ERP'" label="ERP版本：">
            <el-radio-group v-model="form.version1">
              <el-radio :label="1">Q3</el-radio>
              <el-radio :label="2">Q5</el-radio>
              <el-radio :label="3">Q7</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="数据库链接地址" prop="sql_url">
            <el-input v-model="form.sql_url" style="width: 40%" />
          </el-form-item>
          <el-form-item label="数据库名" prop="data_base">
            <el-input v-model="form.data_base" style="width: 40%" />
          </el-form-item>
          <el-form-item label="数据库用户名" prop="user_name">
            <el-input v-model="form.user_name" style="width: 40%" />
          </el-form-item>
          <el-form-item label="数据库密码" prop="password">
            <el-input v-model="form.password" style="width: 40%" />
          </el-form-item>
          <el-form-item label="ERP管理员" prop="erp_admin">
            <el-input v-model="form.erp_admin" style="width: 40%" />
          </el-form-item>
        </div>
        <el-form-item>
          <el-button
            v-has-permi="['btn:SystemInterface:edit']"
            type="primary"
            @click="submitForm('form')"
          >
            确认
          </el-button>
        </el-form-item>
        <div style="font-weight: 600">回调配置</div>
        <el-divider style="margin-bottom: 0" />
        <div class="textCss">
          将以下信息复制到ERP系统中，用于接收ERP订单库存变化信息
        </div>
        <el-form-item label="物流同步：">
          <span style="color: rgb(251, 102, 56)">
            {{ wangzhi }}
            <span
              style="color: #1890ff"
              @click="handleCopyIcon(wangzhi, $event)"
            >
              复制
            </span>
          </span>
        </el-form-item>
        <el-form-item label="取消订单：">
          <span style="color: rgb(251, 102, 56)">
            {{ wangzhi }}
            <span
              style="color: #1890ff"
              @click="handleCopyIcon(wangzhi, $event)"
            >
              复制
            </span>
          </span>
        </el-form-item>
        <el-form-item label="库存同步：">
          <span style="color: rgb(251, 102, 56)">
            {{ wangzhi }}
            <span
              style="color: #1890ff"
              @click="handleCopyIcon(wangzhi, $event)"
            >
              复制
            </span>
          </span>
        </el-form-item>
        <el-form-item label="售后收货：">
          <span style="color: rgb(251, 102, 56)">
            {{ wangzhi }}
            <span
              style="color: #1890ff"
              @click="handleCopyIcon(wangzhi, $event)"
            >
              复制
            </span>
          </span>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import {
    gitJuShuiTanInfo,
    getConfig,
    editJuShuiTan,
    editWangDianTong,
    editBoJun,
    editBaiSheng,
    editZiRi,
  } from '@/api/basic'
  import clip from '@/utils/clipboard'
  export default {
    name: 'SystemStorage',
    data() {
      return {
        wangzhi: 'https://v.99xcx.cn/shop/apps/erp321/client/api2/q36dye440r01',
        activeName: '聚水潭ERP',
        form: {
          jst_api_open: 1, //聚水潭接口是否开启
          jst_version: 1, //1：ERP专业版（无精细化库存管理）\r\n\r\n2：ERP企业版（有精细化库存管理）
          jst_auth_url: null, //聚水潭authUrl
          jst_base_url: null, //聚水潭baseUrl
          jst_access_token: null, //聚水潭access_token
          jst_app_key: null, //聚水潭app_Key
          jst_app_secret: null, //聚水潭app_Secret
          api_open: 1, //接口是否开启
          version: 1, //1：ERP专业版（无精细化库存管理）\r\n\r\n2：ERP企业版（有精细化库存管理）
          auth_url: null, //authUrl
          base_url: null, //baseUrl
          access_token: null, //access_token
          app_key: null, //app_Key
          app_secret: null, //app_Secret
          api_open1: 1, //接口是否开启
          version1: 1, //1：BOSXE 2：BOS2.0 3:BOS3.0
          sql_url: null, //数据库链接地址
          data_base: null, //数据库名
          user_name: null, //数据库用户名
          password: null, //数据库密码
          erp_admin: null, //ERP管理员
        },
        rules: {
          jst_auth_url: [
            { required: true, message: '请输入聚水潭authUrl', trigger: 'blur' },
          ],
          jst_base_url: [
            { required: true, message: '请输入聚水潭baseUrl', trigger: 'blur' },
          ],
          jst_access_token: [
            {
              required: true,
              message: '请输入聚水潭access_token',
              trigger: 'blur',
            },
          ],
          jst_app_key: [
            { required: true, message: '请输入聚水潭app_Key', trigger: 'blur' },
          ],
          jst_app_secret: [
            {
              required: true,
              message: '请输入聚水潭app_Secret',
              trigger: 'blur',
            },
          ],
          auth_url: [
            { required: true, message: '请输入旺店通authUrl', trigger: 'blur' },
          ],
          base_url: [
            { required: true, message: '请输入旺店通baseUrl', trigger: 'blur' },
          ],
          access_token: [
            {
              required: true,
              message: '请输入旺店通access_token',
              trigger: 'blur',
            },
          ],
          app_key: [
            { required: true, message: '请输入旺店通app_Key', trigger: 'blur' },
          ],
          app_secret: [
            {
              required: true,
              message: '请输入旺店通app_Secret',
              trigger: 'blur',
            },
          ],
          sql_url: [
            {
              required: true,
              message: '请输入数据库链接地址',
              trigger: 'blur',
            },
          ],

          data_base: [
            { required: true, message: '请输入数据库名', trigger: 'blur' },
          ],
          user_name: [
            { required: true, message: '请输入数据库用户名', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入数据库密码', trigger: 'blur' },
          ],
          erp_admin: [
            { required: true, message: '请输入ERP管理员', trigger: 'blur' },
          ],
        },
        listText: [
          {
            text: '<p>用于对接聚水潭ERP，实现相互同步商品、订单、库存数据等，使用该功能需要先购买聚水潭ERP。</p> ',
          },
          {
            text: '<p>用于对接旺店通ERP，实现相互同步商品、订单、库存数据等，使用该功能需要先购买旺店通ERP。</p> ',
          },
          {
            text: '<p>用于对接伯俊BOS，实现相互同步会员、积分、优惠券、商品、订单、库存数据等，使用该功能需要先购买伯俊BOS。</p> ',
          },
          {
            text: '<p>用于对接百胜ERP，实现相互同步会员、积分、优惠券、商品、订单、库存数据等，使用该功能需要先购买百胜ERP。</p> ',
          },
          {
            text: '<p>用于对接紫日ERP，实现相互同步会员、积分、优惠券、商品、订单、库存数据等，使用该功能需要先购买紫日ERP。</p> ',
          },
        ],
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      async handleClick(tab) {
        if (tab.label == '聚水潭ERP') {
          this.fetchData()
        } else if (tab.label == '旺店通ERP') {
          const { data } = await getConfig({ key: 'wdt_erp' })
          if (data !== null) {
            let temp = JSON.parse(data)
            this.form.api_open = Number(temp.api_open)
            this.form.version = Number(temp.version)
            this.form.auth_url = temp.auth_url
            this.form.base_url = temp.base_url
            this.form.access_token = temp.access_token
            this.form.app_key = temp.app_key
            this.form.app_secret = temp.app_secret
          }
        } else if (tab.label == '伯俊BOS') {
          const { data } = await getConfig({ key: 'bj_bos' })
          if (data !== null) {
            let temp = JSON.parse(data)
            this.form.api_open1 = Number(temp.api_open)
            this.form.version1 = Number(temp.version)
            this.form.sql_url = temp.sql_url
            this.form.data_base = temp.data_base
            this.form.user_name = temp.user_name
            this.form.password = temp.password
            this.form.erp_admin = temp.erp_admin
          }
        } else if (tab.label == '百胜ERP') {
          const { data } = await getConfig({ key: 'bs_erp' })
          if (data !== null) {
            let temp = JSON.parse(data)
            this.form.api_open1 = Number(temp.api_open)
            this.form.version1 = Number(temp.version)
            this.form.sql_url = temp.sql_url
            this.form.data_base = temp.data_base
            this.form.user_name = temp.user_name
            this.form.password = temp.password
            this.form.erp_admin = temp.erp_admin
          }
        } else if (tab.label == '紫日ERP') {
          const { data } = await getConfig({ key: 'zr_erp' })
          if (data !== null) {
            let temp = JSON.parse(data)
            this.form.api_open1 = Number(temp.api_open)
            this.form.version1 = Number(temp.version)
            this.form.sql_url = temp.sql_url
            this.form.data_base = temp.data_base
            this.form.user_name = temp.user_name
            this.form.password = temp.password
            this.form.erp_admin = temp.erp_admin
          }
        }
      },
      async fetchData() {
        const { data } = await gitJuShuiTanInfo()
        if (data !== null) {
          let temp = data
          this.form.jst_api_open = Number(temp.jst_api_open)
          this.form.jst_version = Number(temp.jst_version)
          this.form.jst_auth_url = temp.jst_auth_url
          this.form.jst_base_url = temp.jst_base_url
          this.form.jst_access_token = temp.jst_access_token
          this.form.jst_app_key = temp.jst_app_key
          this.form.jst_app_secret = temp.jst_app_secret
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            if (this.activeName == '聚水潭ERP') {
              const { code } = await editJuShuiTan({
                jst_api_open: this.form.jst_api_open, //聚水潭接口是否开启
                jst_version: this.form.jst_version, //1：ERP专业版（无精细化库存管理）\r\n\r\n2：ERP企业版（有精细化库存管理）
                jst_auth_url: this.form.jst_auth_url, //聚水潭authUrl
                jst_base_url: this.form.jst_base_url, //聚水潭baseUrl
                jst_access_token: this.form.jst_access_token, //聚水潭access_token
                jst_app_key: this.form.jst_app_key, //聚水潭app_Key
                jst_app_secret: this.form.jst_app_secret, //聚水潭app_Secret
              })
              if (code === 200) {
                this.$message.success('保存成功')
              } else {
                this.$message.error('保存失败')
              }
            } else if (this.activeName == '旺店通ERP') {
              const { code } = await editWangDianTong({
                api_open: this.form.api_open, //接口是否开启
                version: this.form.version, //1：ERP专业版（无精细化库存管理）\r\n\r\n2：ERP企业版（有精细化库存管理）
                auth_url: this.form.auth_url, //authUrl
                base_url: this.form.base_url, //baseUrl
                access_token: this.form.access_token, //access_token
                app_key: this.form.app_key, //app_Key
                app_secret: this.form.app_secret, //app_Secret
              })
              if (code === 200) {
                this.$message.success('保存成功')
              } else {
                this.$message.error('保存失败')
              }
            } else if (this.activeName == '伯俊BOS') {
              const { code } = await editBoJun({
                api_open: this.form.api_open1, //接口是否开启
                version: this.form.version1, //1：ERP专业版（无精细化库存管理）\r\n\r\n2：ERP企业版（有精细化库存管理）
                sql_url: this.form.sql_url, //数据库链接地址
                data_base: this.form.data_base, //数据库名
                user_name: this.form.user_name, //数据库用户名
                password: this.form.password, //数据库密码
                erp_admin: this.form.erp_admin, //ERP管理员
              })
              if (code === 200) {
                this.$message.success('保存成功')
              } else {
                this.$message.error('保存失败')
              }
            } else if (this.activeName == '百胜ERP') {
              const { code } = await editBaiSheng({
                api_open: this.form.api_open1, //接口是否开启
                version: this.form.version1, //1：ERP专业版（无精细化库存管理）\r\n\r\n2：ERP企业版（有精细化库存管理）
                sql_url: this.form.sql_url, //数据库链接地址
                data_base: this.form.data_base, //数据库名
                user_name: this.form.user_name, //数据库用户名
                password: this.form.password, //数据库密码
                erp_admin: this.form.erp_admin, //ERP管理员
              })
              if (code === 200) {
                this.$message.success('保存成功')
              } else {
                this.$message.error('保存失败')
              }
            } else if (this.activeName == '紫日ERP') {
              const { code } = await editZiRi({
                api_open: this.form.api_open1, //接口是否开启
                version: this.form.version1, //1：ERP专业版（无精细化库存管理）\r\n\r\n2：ERP企业版（有精细化库存管理）
                sql_url: this.form.sql_url, //数据库链接地址
                data_base: this.form.data_base, //数据库名
                user_name: this.form.user_name, //数据库用户名
                password: this.form.password, //数据库密码
                erp_admin: this.form.erp_admin, //ERP管理员
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
      handleCopyIcon(wangzhi, event) {
        clip(`${wangzhi}`, event)
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
