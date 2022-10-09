<template>
  <div class="comprehensive-form-container">
    <el-radio-group v-model="formType" size="small">
      <el-radio-button label="本地储存" />
      <el-radio-button label="阿里云储存" />
      <el-radio-button label="腾讯云储存" />
      <el-radio-button label="七牛云储存" />
    </el-radio-group>
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
        <el-button type="primary" @click="submitForm('form')">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'SystemStorage',
    data() {
      return {
        formType: '本地储存',
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
      }
    },
    created() {},
    methods: {},
  }
</script>

<style lang="scss" scoped></style>
