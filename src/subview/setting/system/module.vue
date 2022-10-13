<template>
  <div class="comprehensive-form-container">
    <el-card class="tabs-card" shadow="hover">
      <el-tabs v-model="activeName">
        <el-tab-pane label="ERP配置" name="first">
          <el-form
            ref="form"
            class="demo-form"
            label-position="right"
            label-width="120px"
            :model="form"
          >
            <el-form-item label="库存计算方式：">
              <el-radio-group v-model="form.resource1">
                <el-radio label="开单扣库存" />
                <el-radio label="发货扣库存" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="欠款计算方式：">
              <el-radio-group v-model="form.resource4">
                <el-radio label="开单扣款" />
                <el-radio label="发货扣款" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="金额格式：">
              <el-radio-group v-model="form.resource5">
                <el-radio label="取整" />
                <el-radio label="保留1位" />
                <el-radio label="保留2位" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="无库存可开单：">
              <el-radio-group v-model="form.resource2">
                <el-radio label="关闭" />
                <el-radio label="开启" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="商品列表默认：">
              <el-radio-group v-model="form.resource3">
                <el-radio label="整手" />
                <el-radio label="散码" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="单位：">
              <el-input v-model="form.name" style="width: 250px" />
            </el-form-item>
            <el-form-item label="年龄段：">
              <el-input v-model="form.name" style="width: 250px" />
            </el-form-item>
            <el-form-item label="性别：">
              <el-input v-model="form.name" style="width: 250px" />
            </el-form-item>
            <el-form-item label="公司地址：">
              <el-input v-model="form.name" style="width: 250px" />
            </el-form-item>
            <el-form-item label="电话：">
              <el-input v-model="form.name" style="width: 250px" />
            </el-form-item>
            <el-form-item label="微信：">
              <el-input v-model="form.name" style="width: 250px" />
            </el-form-item>
            <el-form-item label="支付宝：">
              <el-input v-model="form.name" style="width: 250px" />
            </el-form-item>
            <el-form-item label="银行卡号：">
              <el-input v-model="form.name" style="width: 250px" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('form')">
                提交
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="生产配置" name="second">
          <el-form
            ref="form"
            class="demo-form"
            label-position="right"
            label-width="180px"
            :model="form"
          >
            <el-form-item label="生产协同参数保留参数：">
              <el-input v-model="form.name" style="width: 250px" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('form')">
                提交
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="研发配置" name="three">
          <el-form
            ref="form"
            class="demo-form"
            label-position="right"
            label-width="180px"
            :model="form"
          >
            <el-form-item label="生产协同参数保留参数：">
              <el-input v-model="form.name" style="width: 250px" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('form')">
                提交
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="企业微信配置" name="four">
          <el-form
            ref="form"
            class="demo-form"
            label-position="right"
            label-width="140px"
            :model="form"
          >
            <el-form-item label="企微ID：">
              <el-input v-model="form.name" style="width: 250px" />
            </el-form-item>
            <el-form-item label="通讯录密钥：">
              <el-input v-model="form.name" style="width: 250px" />
            </el-form-item>
            <el-form-item label="研发应用ID：">
              <el-input v-model="form.name" style="width: 250px" />
            </el-form-item>
            <el-form-item label="研发应用密钥：">
              <el-input v-model="form.name" style="width: 250px" />
            </el-form-item>
            <el-form-item label="ERP应用ID：">
              <el-input v-model="form.name" style="width: 250px" />
            </el-form-item>
            <el-form-item label="ERP应用密钥：">
              <el-input v-model="form.name" style="width: 250px" />
            </el-form-item>
            <el-form-item label="生产协同应用ID：">
              <el-input v-model="form.name" style="width: 250px" />
            </el-form-item>
            <el-form-item label="生产协同应用密钥：">
              <el-input v-model="form.name" style="width: 250px" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('form')">
                提交
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商城配置" name="five">
          <Form />
        </el-tab-pane>
        <el-tab-pane label="SCRM配置" name="six">敬请期待</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
  // import { getList } from '@/api/area'
  import Form from './components/store'
  export default {
    name: 'SystemModule',
    components: { Form },
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
        // const {
        //   data: { list },
        // } = await getList()
        // this.areaOptions = list
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

<style lang="scss" scoped></style>
