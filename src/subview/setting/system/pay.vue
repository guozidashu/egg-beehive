<template>
  <div class="comprehensive-form-container">
    <el-card class="tabs-card" shadow="hover">
      <el-tabs v-model="activeName">
        <el-tab-pane label="微信支付" name="first">
          <el-form
            ref="form"
            class="demo-form"
            label-position="right"
            label-width="140px"
            :model="form"
          >
            <el-form-item label="微信支付状态：">
              <el-radio-group v-model="form.resource1">
                <el-radio label="开启" />
                <el-radio label="关闭" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="微信支付模式：">
              <el-radio-group v-model="form.resource1">
                <el-radio label="普通模式" />
                <el-radio label="服务商模式" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="支付商户号：">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="支付秘钥：">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('form')">
                提交
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="支付宝支付" name="second">
          <el-form
            ref="form"
            class="demo-form"
            label-position="right"
            label-width="140px"
            :model="form"
          >
            <el-form-item label="支付宝支付状态：">
              <el-radio-group v-model="form.resource1">
                <el-radio label="开启" />
                <el-radio label="关闭" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="支付宝支付模式：">
              <el-radio-group v-model="form.resource1">
                <el-radio label="普通模式" />
                <el-radio label="服务商模式" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="支付商户号：">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="支付秘钥：">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('form')">
                提交
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="余额支付" name="three">敬请期待</el-tab-pane>
        <el-tab-pane label="线下支付" name="four">敬请期待</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
  import { getList } from '@/api/area'

  export default {
    name: 'SystemPay',
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
  .demo-form {
    margin-top: 10px;
  }
  .sms-input {
    width: 180px;
  }
  .switch-input {
    margin: 0 40px 0 10px;
  }
</style>
