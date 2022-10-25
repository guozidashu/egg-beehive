<template>
  <div class="comprehensive-form-container">
    <el-card class="tabs-card" shadow="hover">
      <el-tabs v-model="activeName">
        <el-tab-pane label="ERP配置" name="first">
          <div class="textCss">
            <p style="font-weight: 600">使用说明</p>
          </div>
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
          <div class="textCss">
            <p style="font-weight: 600">使用说明</p>
          </div>
          <el-form
            ref="form"
            class="demo-form"
            label-position="right"
            label-width="180px"
            :model="form"
          >
            <el-form-item label="生产协同参数保留参数">
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
          <div class="textCss">
            <p style="font-weight: 600">使用说明</p>
          </div>
          <el-form
            ref="form"
            class="demo-form"
            label-position="right"
            label-width="180px"
            :model="form"
          >
            <el-form-item label="生产协同参数保留参数">
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
          <div class="textCss">
            <p style="font-weight: 600">使用说明</p>
          </div>
          <el-form
            ref="form"
            class="demo-form"
            label-position="right"
            label-width="140px"
            :model="form"
          >
            <div style="font-weight: 600">企业微信基础配置</div>
            <el-divider />
            <el-form-item label="企微ID">
              <el-input v-model="form.name" style="width: 250px" />
            </el-form-item>
            <el-form-item>
              <span style="color: #999">
                企业微信ID，前往企业微信后台【我的企业】企业信息中可查看
              </span>
            </el-form-item>
            <div style="font-weight: 600">企业微信通讯录配置</div>
            <el-divider />
            <div class="textCss">
              <p>
                1.请先登录企业微信:https://work.weixin.qq.com
                客户与上下游->客户联系->关联微信开发者ID。2.请必须绑定微信开放平台
              </p>
            </div>
            <el-form-item label="Token">
              <el-input v-model="form.name" style="width: 250px" />
            </el-form-item>
            <el-form-item>
              <span style="color: #999">通讯录事件接收服务器token</span>
            </el-form-item>
            <el-form-item label="EncodingAESKey">
              <el-input v-model="form.name" style="width: 250px" />
            </el-form-item>
            <el-form-item>
              <span style="color: #999">企业微信通讯录EncodingAESKey</span>
            </el-form-item>
            <el-form-item label="服务器地址">
              <el-input v-model="form.name" style="width: 250px" />
            </el-form-item>

            <div style="font-weight: 600">企业微信客户设置</div>
            <el-divider />
            <el-form-item label="Secret">
              <el-input v-model="form.name" style="width: 250px" />
            </el-form-item>
            <el-form-item>
              <span style="color: #999">
                企业微信客户secret，可前往【客户与上下游】查看secret
              </span>
            </el-form-item>
            <div style="font-weight: 600">企业微信自建应用设置</div>
            <el-divider />
            <el-form-item label="应用AgentId">
              <el-input v-model="form.name" style="width: 250px" />
            </el-form-item>
            <el-form-item>
              <span style="color: #999">
                企业微信自建应用AgentId，可前往【应用管理】进行自建应用
              </span>
            </el-form-item>
            <el-form-item label="应用Secret">
              <el-input v-model="form.name" style="width: 250px" />
            </el-form-item>
            <el-form-item>
              <span style="color: #999">
                企业微信自建应用secret，可前往【应用管理】自建应用应用内查看secret
              </span>
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
        <el-tab-pane label="SCRM配置" name="six">
          <p style="font-weight: 700">将以下信息复制到圈域宝SCRM后台</p>
          <el-form
            ref="form"
            class="demo-form"
            label-position="right"
            label-width="140px"
            :model="form"
          >
            <div class="textCss">
              <p>
                用于对接圈域宝SCRM，实现聊天中向客户一键发送商品、优惠券等，查看客户购买的商城订单信息、购物车的商品等，使用该功能需要先购买圈域宝的企业私域
                SCRM 用户增长系统
              </p>
            </div>
            <el-form-item label="功能启用：">
              <el-radio-group v-model="form.resource1">
                <el-radio label="开启" />
                <el-radio label="关闭" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="ERP应用密钥：">
              <el-input v-model="form.name" style="width: 250px" />
            </el-form-item>
            <el-form-item label="请求地址：">
              <el-input v-model="form.name" style="width: 250px" />
              <span style="margin-left: 20px; color: #999">
                请求地址： 开启并填入地址后需要一段时间同步会员信息
              </span>
            </el-form-item>
            <el-form-item label="店铺域名：">
              <el-input v-model="form.name" style="width: 250px" />
            </el-form-item>
            <el-form-item label="店铺ID：">
              <el-input v-model="form.name" style="width: 250px" />
            </el-form-item>
            <el-form-item label="API_KEY">
              <el-input
                v-model="form.name"
                placeholder="已隐藏内容，点击查看或编辑"
                style="width: 250px"
              />
              <el-button
                style="margin-left: 20px"
                type="primary"
                @click="submitForm('form')"
              >
                重置
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('form')">
                提交
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
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
          value: true,
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
