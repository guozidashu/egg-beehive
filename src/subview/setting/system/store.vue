<template>
  <div style="padding: 20px">
    <div class="textCss">
      <p style="font-weight: 600">使用说明</p>
    </div>
    <div style="font-weight: 600">商城配置</div>
    <el-divider />
    <el-radio-group v-model="activeName" style="margin-bottom: 20px">
      <el-radio-button label="基础配置" />
      <el-radio-button label="财务设置" />
      <el-radio-button label="积分设置" />
      <el-radio-button label="分销分红" />
      <el-radio-button label="文本自定义" />
      <el-radio-button label="登录设置" />
      <el-radio-button label="注册协议" />
    </el-radio-group>
    <el-form
      ref="form"
      class="demo-form"
      label-position="right"
      label-width="150px"
      :model="form"
      :rules="rules"
    >
      <div v-if="activeName == '基础配置'">
        <el-form-item label="商家名称" prop="name">
          <el-input v-model="form.name" style="width: 215px" />
        </el-form-item>
        <el-form-item label="唯一标识" prop="shopid">
          <el-input v-model="form.shopid" style="width: 215px" />
        </el-form-item>
        <el-form-item label="api域名" prop="domain">
          <el-input v-model="form.domain" style="width: 215px" />
        </el-form-item>
        <el-form-item label="商家LOGO：">
          <el-button type="primary" @click="handleShow()">图片上传</el-button>
          <span style="margin-left: 20px; color: #999999">
            建议尺寸：200×200像素
          </span>
          <div v-if="form.logo" style="margin-top: 20px">
            <img :src="form.logo" />
          </div>
        </el-form-item>
        <el-form-item label="商家简介" prop="desc">
          <el-input v-model="form.desc" style="width: 215px" />
        </el-form-item>
        <el-form-item label="商家服务电话" prop="tel">
          <el-input v-model="form.tel" style="width: 215px" />
        </el-form-item>
        <el-form-item label="商家地址" prop="address">
          <el-input v-model="form.address" style="width: 215px" />
        </el-form-item>
        <el-form-item label="经纬度" prop="longitude">
          <el-input v-model="form.longitude" style="width: 100px" />
          <el-input
            v-model="form.latitude"
            style="width: 100px; margin-left: 15px"
          />
        </el-form-item>
        <el-form-item label="微信客服url" prop="wxkfurl">
          <el-input v-model="form.wxkfurl" style="width: 215px" />
        </el-form-item>
        <el-form-item label="微信客服企业id" prop="corpid">
          <el-input v-model="form.corpid" style="width: 215px" />
        </el-form-item>
        <div style="display: flex">
          <el-form-item label="微信小程序客服">
            <el-radio-group v-model="form.wxkf">
              <el-radio :label="0">客服链接</el-radio>
              <el-radio :label="1">小程序客服</el-radio>
              <el-radio :label="2">微信客服</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="客服系统链接" prop="kfurl">
            <el-input v-model="form.kfurl" style="width: 215px" />
          </el-form-item>
        </div>
        <div style="margin-top: 10px; margin-left: 184px; color: #999999">
          客服链接：使用填写的客服链接，不填写则使用商城内部客服系统；
        </div>
        <div style="margin-top: 5px; margin-left: 184px; color: #999999">
          小程序客服：在小程序后台-功能-客服-小程序客服，配置客服人员；
        </div>
        <div
          style="
            margin-top: 5px;
            margin-bottom: 20px;
            margin-left: 184px;
            color: #999999;
          "
        >
          微信客服：在
          <a href="#" style="color: black">微信客服</a>
          系统注册账号并绑定，
          <a href="" style="color: black">查看绑定流程</a>
          ，填写企业ID并复制客服链接填写到客服链接处
        </div>
        <el-form-item label="关注提示">
          <el-checkbox
            v-model="form.gzts1"
            :data-a="checked"
            @change="checkChange()"
          >
            商品
          </el-checkbox>
          <el-checkbox
            v-model="form.gzts2"
            :data-a="checked"
            @change="checkChange()"
          >
            商品详情页
          </el-checkbox>
        </el-form-item>
        <el-form-item label="订单播报">
          <el-checkbox
            v-model="form.ddbb1"
            :data-a="checked"
            @change="checkChange()"
          >
            商品
          </el-checkbox>
          <el-checkbox
            v-model="form.ddbb2"
            :data-a="checked"
            @change="checkChange()"
          >
            商品详情页
          </el-checkbox>
        </el-form-item>

        <div style="display: flex">
          <el-form-item label="主色调">
            <el-input v-model="form.color1" style="width: 215px" />
          </el-form-item>
          <el-color-picker v-model="form.color1" style="margin-left: 20px" />
          <span style="padding-top: 5px; margin-left: 20px; color: #999999">
            商城主色调，如：#FD4A46
          </span>
        </div>
        <div style="display: flex">
          <el-form-item label="辅色调">
            <el-input v-model="form.color2" style="width: 215px" />
          </el-form-item>
          <el-color-picker v-model="form.color2" style="margin-left: 20px" />
          <span style="padding-top: 5px; margin-left: 20px; color: #999999">
            商城辅色调，如：#7E71F6
          </span>
        </div>
        <el-form-item label="进入条件">
          <el-checkbox
            v-model="form.gettj1"
            :data-a="checked"
            @change="checkChange()"
          >
            普通会员
          </el-checkbox>
          <el-checkbox
            v-model="form.gettj2"
            :data-a="checked"
            @change="checkChange()"
          >
            分销商
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <span>{{ form.gettjtip }}</span>
        </el-form-item>
        <el-form-item>
          <el-button
            style="margin-top: 10px"
            type="primary"
            @click="submitForm('form')"
          >
            提交
          </el-button>
        </el-form-item>
      </div>
      <div v-if="activeName == '财务设置'">
        <el-divider content-position="left">余额</el-divider>
        <el-form-item label="余额提现">
          <el-radio-group v-model="form.moneypay">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="余额充值">
          <el-radio-group v-model="form.recharge">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="佣金转余额">
          <el-radio-group v-model="form.commission2money">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <div style="margin-bottom: 20px; margin-left: 80px; color: #999999">
          开启后会员可以将佣金直接转入余额中用于消费
        </div>
        <el-divider content-position="left">提现</el-divider>
        <el-form-item label="提现方式">
          <el-checkbox
            v-model="form.withdraw_weixin1"
            :data-a="checked"
            @change="checkChange()"
          >
            微信钱包
          </el-checkbox>
          <el-checkbox
            v-model="form.withdraw_aliaccount1"
            :data-a="checked"
            @change="checkChange()"
          >
            支付宝
          </el-checkbox>
          <el-checkbox
            v-model="form.withdraw_bankcard1"
            :data-a="checked"
            @change="checkChange()"
          >
            银行卡
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <span style="color: #999999">
            提现到微信钱包需开通企业付款到零钱功能
          </span>
        </el-form-item>
        <el-form-item label="自动打款">
          <el-radio-group v-model="form.withdraw_autotransfer">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="余额提现">
          <el-radio-group v-model="form.withdraw">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="佣金提现">
          <el-radio-group v-model="form.comwithdraw">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="提现最小金额">
          <el-input v-model="form.withdrawmin" style="width: 215px" />
        </el-form-item>
        <el-form-item label="提现手续费">
          <el-input v-model="form.withdrawfee" style="width: 215px" />
        </el-form-item>
        <el-divider content-position="left">在线支付</el-divider>
        <el-form-item label="微信支付限额">
          <el-input v-model="form.maxonpay" style="width: 215px" />
        </el-form-item>
        <el-form-item>
          <span>超过此金额只能联系客服支付 0代表不限制</span>
        </el-form-item>
        <el-form-item label="主动打款">
          <el-radio-group v-model="form.dakuan">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-divider content-position="left">发票</el-divider>
        <el-form-item label="发票开关">
          <el-radio-group v-model="form.invoice">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="form.invoice == 1" label="发票类型">
          <el-checkbox
            v-model="form.invoice_type1"
            :data-a="checked"
            @change="checkChange()"
          >
            普通发票
          </el-checkbox>
          <el-checkbox
            v-model="form.invoice_type2"
            :data-a="checked"
            @change="checkChange()"
          >
            增值税专用发票
          </el-checkbox>
        </el-form-item>
        <el-divider content-position="left">转账汇款支付</el-divider>
        <el-form-item label="转账付款支付">
          <el-radio-group v-model="form.pay_transfer">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <div v-if="form.pay_transfer == 1">
          <el-form-item label="户名">
            <el-input
              v-model="form.pay_transfer_account_name"
              style="width: 215px"
            />
          </el-form-item>
          <el-form-item label="账号">
            <el-input
              v-model="form.pay_transfer_account"
              style="width: 215px"
            />
          </el-form-item>
          <el-form-item label="开户行">
            <el-input v-model="form.pay_transfer_bank" style="width: 215px" />
          </el-form-item>
          <el-form-item label="提示信息">
            <el-input v-model="form.pay_transfer_desc" style="width: 215px" />
          </el-form-item>
        </div>
      </div>
    </el-form>
    <vab-upload
      ref="vabUpload"
      :limit="50"
      name="file"
      :size="2"
      url="/upload"
    />
  </div>
</template>
<script>
  import { getShopConfigInfo, editShopConfig } from '@/api/basic'
  import VabUpload from '@/extra/VabUpload'
  export default {
    name: 'SystemStore',
    components: {
      VabUpload,
    },
    data() {
      return {
        activeName: '基础配置',
        checked: false,
        form: {
          gettj1: false,
          gettj2: false,
          gzts1: false,
          gzts2: false,
          ddbb1: false,
          ddbb2: false,
          withdraw_weixin1: false,
          withdraw_aliaccount1: false,
          withdraw_bankcard1: false,
          invoice_type1: false,
          invoice_type2: false,
          /** 基础设置 **/
          name: '商城系统', //商家名称
          shopid: 'quanyudemo', //唯一标识
          domain: 'demo.quanyu123.com', //api域名
          logo: 'https://new.shopvvv.cn/static/imgsrc/logo.jpg', //商家logo
          desc: '', //商家简介
          tel: '', //商家服务电话
          address: '', //商家地址
          longitude: '', //经度
          latitude: '', //纬度
          kfurl: '', //客服系统链接
          wxkf: '0', //微信小程序客服 0 客服链接 1 小程序客服 2 微信客服
          wxkfurl: '', //微信客服url
          corpid: '', //微信客服企业id
          gzts: [1, 2], //关注提示 1首页 2商品详情页
          ddbb: [1, 2], //订单播报 1首页 2商品详情页
          color1: '#FD4A46', //主色调
          color2: '#7E71F6', //辅色调
          gettj: [1, 2], //进入条件
          gettjtip: '您没有权限进入', //写死传值
          /** 财务设置 **/
          moneypay: '0', //余额提现 0关闭 1开启
          recharge: '0', //余额充值 0关闭 1开启
          commission2money: '0', //佣金转余额 0关闭 1开启
          withdraw_weixin: '0', //提现方式-微信钱包 0关闭 1开启
          withdraw_aliaccount: '0', //提现方式-支付宝 0关闭 1开启
          withdraw_bankcard: '0', //提现方式-银行卡 0关闭 1开启
          withdraw_autotransfer: '0', //自动打款 0关闭 1开启
          withdraw: '0', //余额提现 0关闭 1开启
          withdrawmin: '0', //提现最小金额
          withdrawfee: '0', //提现手续费 百分比
          comwithdraw: '0', //佣金提现 0关闭 1开启
          comwithdrawmin: '0', //提现最小金额
          comwithdrawfee: '0', //提现手续费 百分比
          maxonpay: '', //在线支付限额（超过此金额只能联系客服支付 0代表不限制）
          dakuan: '0', //主动打款 0关闭 1开启
          invoice: '0', //发票开关 0关闭 1开启
          invoice_type: [1, 2], //发票类型（发票开关为开） 1普通发票 2增值税专用发票
          pay_transfer: '0', //转账付款支付 0关闭 1开启
          pay_transfer_account_name: '1', //户名
          pay_transfer_account: '0', //账号
          pay_transfer_bank: '0', //开户行
          pay_transfer_desc: '0', //提示信息
        },
        rules: {},
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      handleShow() {
        this.$refs['vabUpload'].handleShow()
      },
      async fetchData() {
        const { data } = await getShopConfigInfo()
        if (data !== null) {
          this.form = data
          this.form.wxkf = Number(this.form.wxkf)
          this.form.moneypay = Number(this.form.moneypay)
          this.form.recharge = Number(this.form.recharge)
          this.form.commission2money = Number(this.form.commission2money)
          this.form.withdraw = Number(this.form.withdraw)
          this.form.withdraw_autotransfer = Number(
            this.form.withdraw_autotransfer
          )
          this.form.comwithdraw = Number(this.form.comwithdraw)
          this.form.dakuan = Number(this.form.dakuan)
          this.form.invoice = Number(this.form.invoice)
          this.form.pay_transfer = Number(this.form.pay_transfer)
          this.form.gettj1 = false
          this.form.gettj2 = false
          if (this.form.gettj.length != 0) {
            this.form.gettj.forEach((item) => {
              if (item === 1) {
                this.form.gettj1 = true
              } else if (item === 2) {
                this.form.gettj2 = true
              }
            })
          }
          this.form.gzts1 = false
          this.form.gzts2 = false
          if (this.form.gzts.length != 0) {
            this.form.gzts.forEach((item) => {
              if (item === 1) {
                this.form.gzts1 = true
              } else if (item === 2) {
                this.form.gzts2 = true
              }
            })
          }
          this.form.invoice_type1 = false
          this.form.invoice_type2 = false
          if (this.form.invoice_type.length != 0) {
            this.form.invoice_type.forEach((item) => {
              if (item === 1) {
                this.form.invoice_type1 = true
              } else if (item === 2) {
                this.form.invoice_type2 = true
              }
            })
          }
          this.form.ddbb1 = false
          this.form.ddbb2 = false
          if (this.form.ddbb.length != 0) {
            this.form.ddbb.forEach((item) => {
              if (item === 1) {
                this.form.ddbb1 = true
              } else if (item === 2) {
                this.form.ddbb2 = true
              }
            })
          }
          if (this.form.withdraw_weixin == 0) {
            this.form.withdraw_weixin1 = false
          } else {
            this.form.withdraw_weixin1 = true
          }
          if (this.form.withdraw_aliaccount == 0) {
            this.form.withdraw_aliaccount1 = false
          } else {
            this.form.withdraw_aliaccount1 = true
          }
          if (this.form.withdraw_bankcard == 0) {
            this.form.withdraw_bankcard1 = false
          } else {
            this.form.withdraw_bankcard1 = true
          }
          this.checked = true
        }
      },
      checkChange() {
        this.checked = true
        this.$forceUpdate()
      },
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const { code } = await editShopConfig(this.form)
            if (code === 200) {
              this.$message.success('保存成功')
            } else {
              this.$message.error('保存失败')
            }
          } else {
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
