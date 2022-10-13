<template>
  <div class="comprehensive-form-container">
    <el-card class="tabs-card" shadow="hover">
      <el-tabs v-model="activeName">
        <el-tab-pane label="短信模板" name="first">
          <div class="textCss">
            <p>主营行业：未选择</p>
            <p>副营行业：未选择</p>
            <p>
              注意：小程序需选择生活服务/百货/超市/便利店类目，否则不能同步小程序订阅消息
            </p>
          </div>
          <el-form
            ref="form"
            class="demo-form"
            label-position="right"
            label-width="140px"
            :model="form"
          >
            <el-form-item label="短信状态">
              <el-radio-group v-model="form.resource">
                <el-radio label="开启" />
                <el-radio label="关闭" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="短信接口">
              <el-input v-model="form.name" style="width: 250px" />
            </el-form-item>
            <el-form-item label="AccessKey ID">
              <el-input v-model="form.name" style="width: 250px" />
            </el-form-item>
            <el-form-item label="AccessKey Secret">
              <el-input v-model="form.name" style="width: 250px" />
            </el-form-item>
            <el-form-item label="短信签名">
              <el-input v-model="form.name" style="width: 250px" />
            </el-form-item>
            <el-form-item label="短信模板设置" style="width: 250px" />
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
            <el-form-item label="拼团成功通知">
              <el-input v-model="form.name" class="sms-input" />
              <el-switch
                v-model="value"
                active-color="#13ce66"
                class="switch-input"
                inactive-color="#ff4949"
              />
              <span>短信验证码 请填写模板编号</span>
              <span style="color: gray">
                模板内容示例：恭喜您的订单${ordernum}拼团成功，我们会尽快为您准备发货。
              </span>
            </el-form-item>
            <el-form-item label="退款成功通知">
              <el-input v-model="form.name" class="sms-input" />
              <el-switch
                v-model="value"
                active-color="#13ce66"
                class="switch-input"
                inactive-color="#ff4949"
              />
              <span>短信验证码 请填写模板编号</span>
              <span style="color: gray">
                模板内容示例：您的订单${ordernum}退款成功，退款金额：${money}元，请留意查收。
              </span>
            </el-form-item>
            <el-form-item label="退款驳回通知">
              <el-input v-model="form.name" class="sms-input" />
              <el-switch
                v-model="value"
                active-color="#13ce66"
                class="switch-input"
                inactive-color="#ff4949"
              />
              <span>短信验证码 请填写模板编号</span>
              <span style="color: gray">
                模板内容示例：抱歉您的订单${ordernum}退款申请失败，原因：${reason}。
              </span>
            </el-form-item>
            <el-form-item label="提现成功通知">
              <el-input v-model="form.name" class="sms-input" />
              <el-switch
                v-model="value"
                active-color="#13ce66"
                class="switch-input"
                inactive-color="#ff4949"
              />
              <span>短信验证码 请填写模板编号</span>
              <span style="color: gray">
                模板内容示例：恭喜您提现成功，打款金额：${money}，请留意查收。
              </span>
            </el-form-item>
            <el-form-item label="提现失败通知">
              <el-input v-model="form.name" class="sms-input" />
              <el-switch
                v-model="value"
                active-color="#13ce66"
                class="switch-input"
                inactive-color="#ff4949"
              />
              <span>短信验证码 请填写模板编号</span>
              <span style="color: gray">
                模板内容示例：抱歉您的提现申请失败，原因：${reason}。
              </span>
            </el-form-item>
            <el-form-item label="分销成功提醒">
              <el-input v-model="form.name" class="sms-input" />
              <el-switch
                v-model="value"
                active-color="#13ce66"
                class="switch-input"
                inactive-color="#ff4949"
              />
              <span>短信验证码 请填写模板编号</span>
              <span style="color: gray">
                模板内容示例：恭喜您成功获得佣金：${money}元，请留意查收。
              </span>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('form')">
                确认
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="消息配置" name="second">敬请期待</el-tab-pane>
        <el-tab-pane label="企业微信配置" name="three">
          <div class="textCss">
            <p style="font-weight: 600">使用说明</p>
            <p>
              1.可以生成带参数的二维码名片，支持活码功能，即随机选取设置的活码成员推给用户。加企业微信为好友后，可以给微信联系人自动回复相应欢迎消息和打标签。
            </p>
            <p>
              2.受限于官方，单人类型的渠道码创建后尽量不要再修改成员，否则会造成列表中，该二维码中间的头像与配置的成员头像不一致，但是并不影响功能使用。
            </p>
            <p>
              3.如果企业在企业微信后台为相关成员配置了可用的欢迎语，使用本系统配置欢迎语，则均不起效，推送的还是企业微信官方的。
            </p>
          </div>
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
        <el-tab-pane label="小程序通知配置" name="four">敬请期待</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
  // import { getList } from '@/api/area'

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
