<template>
  <div class="comprehensive-form-container">
    <el-card class="tabs-card" shadow="hover">
      <el-tabs v-model="activeName">
        <el-tab-pane label="短信" name="first">
          <el-form
            ref="form"
            class="demo-form"
            label-position="right"
            label-width="120px"
            :model="form"
          >
            <el-form-item label="短信状态">
              <el-radio-group v-model="form.resource">
                <el-radio label="开启" />
                <el-radio label="关闭" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="短信接口">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="AccessKey ID">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="AccessKey Secret">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="短信签名">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="短信模板设置" />
            <el-divider />
            <el-form-item label="短信验证码">
              <el-input v-model="form.name" class="sms-input" />
              <el-switch
                v-model="value"
                active-color="#13ce66"
                class="switch-input"
                inactive-color="#ff4949"
              />
              <span>短信验证码 请填写模板编号</span>
              <span style="color: gray">
                模板内容示例：您的验证码：${code}，该验证码5分钟内有效，请勿泄漏于他人！
              </span>
            </el-form-item>
            <el-form-item label="订单支付成功">
              <el-input v-model="form.name" class="sms-input" />
              <el-switch
                v-model="value"
                active-color="#13ce66"
                class="switch-input"
                inactive-color="#ff4949"
              />
              <span>短信验证码 请填写模板编号</span>
              <span style="color: gray">
                恭喜您订单支付成功，订单号：${ordernum}，我们会尽快为您准备发货。
              </span>
            </el-form-item>
            <el-form-item label="订单发货通知">
              <el-input v-model="form.name" class="sms-input" />
              <el-switch
                v-model="value"
                active-color="#13ce66"
                class="switch-input"
                inactive-color="#ff4949"
              />
              <span>短信验证码 请填写模板编号</span>
              <span style="color: gray">
                模板内容示例：您的订单${ordernum}已发货，快递公司：${express_com}，快递单号：${express_no}，请留意查收。
              </span>
            </el-form-item>
            <el-form-item label="短信验证码">
              <el-input v-model="form.name" class="sms-input" />
              <el-switch
                v-model="value"
                active-color="#13ce66"
                class="switch-input"
                inactive-color="#ff4949"
              />
              <span>短信验证码 请填写模板编号</span>
              <span style="color: gray">
                模板内容示例：您的验证码：${code}，该验证码5分钟内有效，请勿泄漏于他人！
              </span>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('form')">
                确认
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="微信模板" name="second">敬请期待</el-tab-pane>
        <el-tab-pane label="企业微信模板" name="three">
          <el-form
            ref="form"
            class="demo-form"
            label-position="right"
            label-width="120px"
            :model="form"
          >
            <el-form-item label="企微ID：">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="通讯录密钥：">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="研发应用ID：">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="ERP应用ID：">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="ERP应用密钥：">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="生产协同应用ID：">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="生产协同应用密钥：">
              <el-input v-model="form.name" />
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm('form')">
                提交
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="小程序通知模板" name="four">敬请期待</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
  import { getList } from '@/api/area'

  export default {
    name: 'SystemNotice',
    data() {
      return {
        activeName: 'first',
        value: true,
        form: {
          name: '',
          region: '',
          date: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          description: '',
          area: [],
        },
        areaOptions: [],
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            {
              min: 3,
              max: 5,
              message: '长度在 3 到 5 个字符',
              trigger: 'blur',
            },
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' },
          ],
          date: [
            {
              type: 'date',
              required: true,
              message: '请选择日期',
              trigger: 'change',
            },
          ],
          type: [
            {
              type: 'array',
              required: true,
              message: '请至少选择一个活动性质',
              trigger: 'change',
            },
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' },
          ],
          description: [
            { required: true, message: '请填写活动形式', trigger: 'blur' },
          ],
        },
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      //获取行政区划
      async fetchData() {
        const {
          data: { list },
        } = await getList()
        this.areaOptions = list
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            // eslint-disable-next-line no-console
            console.log('error submit!!')
          }
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .comprehensive-form-container {
    .demo-form {
      margin-top: 10px;
      .sms-input {
        width: 180px;
      }
      .switch-input {
        margin: 0 40px 0 10px;
      }
    }
  }
</style>
