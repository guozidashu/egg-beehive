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
      <el-radio-button label="登录设置" />
      <el-radio-button label="注册协议" />
      <el-radio-button label="同步设置" />
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
          <el-form-item label="主色调" prop="color2">
            <el-input v-model="form.color2" style="width: 215px" />
          </el-form-item>
          <el-color-picker v-model="form.color1" style="margin-left: 20px" />
          <span style="padding-top: 5px; margin-left: 20px; color: #999999">
            商城主色调，如：#FD4A46
          </span>
        </div>
        <div style="display: flex">
          <el-form-item label="辅色调" prop="color2">
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
            所有人
          </el-checkbox>
          <el-checkbox
            v-model="form.gettj2"
            :data-a="checked"
            @change="checkChange()"
          >
            普通会员
          </el-checkbox>
          <el-checkbox
            v-model="form.gettj3"
            :data-a="checked"
            @change="checkChange()"
          >
            分销商
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <span>{{ form.gettjtip }}</span>
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
        <div v-if="form.withdraw == 1">
          <el-form-item label="提现最小金额" prop="withdrawmin">
            <el-input v-model="form.withdrawmin" style="width: 215px" />
            元
          </el-form-item>
          <el-form-item label="提现手续费" prop="withdrawfee">
            <el-input v-model="form.withdrawfee" style="width: 215px" />
            %
          </el-form-item>
        </div>
        <el-form-item label="佣金提现">
          <el-radio-group v-model="form.comwithdraw">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <div v-if="form.comwithdraw == 1">
          <el-form-item label="提现最小金额" prop="comwithdrawmin">
            <el-input v-model="form.comwithdrawmin" style="width: 215px" />
            元
          </el-form-item>
          <el-form-item label="提现手续费" prop="comwithdrawfee">
            <el-input v-model="form.comwithdrawfee" style="width: 215px" />
            %
          </el-form-item>
        </div>
        <el-divider content-position="left">在线支付</el-divider>
        <el-form-item label="微信支付限额" prop="maxonpay">
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
          <el-form-item label="户名" prop="pay_transfer_account_name">
            <el-input
              v-model="form.pay_transfer_account_name"
              style="width: 215px"
            />
          </el-form-item>
          <el-form-item label="账号" prop="pay_transfer_account">
            <el-input
              v-model="form.pay_transfer_account"
              style="width: 215px"
            />
          </el-form-item>
          <el-form-item label="开户行" prop="pay_transfer_bank">
            <el-input v-model="form.pay_transfer_bank" style="width: 215px" />
          </el-form-item>
          <el-form-item label="提示信息" prop="pay_transfer_desc">
            <el-input
              v-model="form.pay_transfer_desc"
              style="width: 215px"
              type="textarea"
            />
          </el-form-item>
        </div>
      </div>
      <div v-if="activeName == '积分设置'">
        <el-form-item label="消费赠积分：">
          <el-row type="felx">
            <el-input
              v-model="form.scorein_money"
              placeholder="请输入内容"
              style="width: 200px"
            >
              <template slot="prepend">消费每满</template>
            </el-input>
            <span>元</span>
            <el-input
              v-model="form.scorein_score"
              placeholder="请输入内容"
              style="width: 200px; margin-left: 20px"
            >
              <template slot="prepend">赠送</template>
            </el-input>
            <span>积分</span>
            <span style="margin-left: 20px; color: #a5a5ae">
              使用余额支付时不赠送，支付后积分立即到账，发生退款时不会扣除
            </span>
          </el-row>
        </el-form-item>
        <el-form-item label="充值赠积分：">
          <el-row type="felx">
            <el-input
              v-model="form.scorecz_money"
              placeholder="请输入内容"
              style="width: 200px"
            >
              <template slot="prepend">充值每满</template>
            </el-input>
            <span>元</span>
            <el-input
              v-model="form.scorecz_score"
              placeholder="请输入内容"
              style="width: 200px; margin-left: 20px"
            >
              <template slot="prepend">赠送</template>
            </el-input>
            <span>积分</span>
          </el-row>
        </el-form-item>
        <el-form-item label="积分抵扣：">
          <el-input
            v-model="form.score2money"
            placeholder="请输入内容"
            style="width: 200px"
          >
            <template slot="prepend">每积分抵扣</template>
          </el-input>
          <span>元</span>
          <span style="margin-left: 30px; color: #a5a5ae">
            付款时一个积分可以抵扣多少元，0表示不开启积分抵扣
          </span>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.scoredkmaxpercent"
            placeholder="请输入内容"
            style="width: 200px"
          >
            <template slot="prepend">最多抵扣百分比</template>
          </el-input>
          <span>%</span>
          <span style="margin-left: 30px; color: #a5a5ae">
            选择使用积分抵扣时，最多可抵扣订单额的百分之多少
          </span>
        </el-form-item>
        <el-form-item label="积分不抵扣运费">
          <el-switch
            v-model="form.scorebdkyf"
            active-color="#41B584"
            active-text="开启"
            :active-value="1"
            class="switch"
            inactive-color="#D2D2D2"
            inactive-text="关闭"
            :inactive-value="0"
            style="margin: 0 10px"
          />
          <span style="margin-left: 10px; color: #a5a5ae">
            开启后积分不能抵扣运费
          </span>
        </el-form-item>
      </div>
      <div v-if="activeName == '分销分红'">
        <el-form-item label="分销结算方式：">
          <el-radio-group v-model="form.fxjiesuantype">
            <el-radio :label="0">按商品价格</el-radio>
            <el-radio :label="1">按成交价格</el-radio>
            <el-radio :label="2">按销售利润</el-radio>
          </el-radio-group>
          <div style="color: #999999">
            按商品价格结算：商品价格×提成百分比；按成交价格结算：成交价格×提成百分比,即扣除会员折扣、满减优惠、优惠券抵扣及积分抵扣后计算分销；按销售利润结算：（成交价格-商品成本）×提成百分比
          </div>
        </el-form-item>
        <el-form-item label="分销结算时间：">
          <el-radio-group v-model="form.fxjiesuantime">
            <el-radio :label="0">确认收货后结算</el-radio>
            <el-radio :label="1">付款后结算</el-radio>
          </el-radio-group>
          <div style="color: #999999">
            注意：选择付款后结算，如果产生退款，已发放的佣金不会扣除
          </div>
        </el-form-item>
        <el-form-item label="分红结算方式：">
          <el-radio-group v-model="form.fhjiesuantype">
            <el-radio :label="0">按销售金额</el-radio>
            <el-radio :label="1">按销售利润</el-radio>
          </el-radio-group>
          <div style="color: #999999">
            按销售金额结算即：销售价格×提成百分比，按销售利润即：（销售价格-商品成本）×提成百分比
          </div>
        </el-form-item>
        <el-form-item label="分红结算时间：">
          <el-radio-group v-model="form.fhjiesuantime_type">
            <el-radio :label="0">确认收货后结算</el-radio>
            <el-radio :label="1">付款后结算</el-radio>
          </el-radio-group>
          <div style="color: #999999">
            确认收货后结算：可选计算周期，付款后结算：每分钟计算一次
          </div>
          <div style="color: red">注意：选择付款后结算退款时无法退回分红</div>
        </el-form-item>
        <el-form-item label="分红结算周期：">
          <el-radio-group v-model="form.fhjiesuantime">
            <el-radio :label="0">每天结算</el-radio>
            <el-radio :label="1">每小时结算</el-radio>
            <el-radio :label="2">每分钟结算</el-radio>
            <el-radio :label="3">3月初结算</el-radio>
            <el-radio :label="4">3月底结算</el-radio>
          </el-radio-group>
          <div style="color: #999999">
            每天结算则第二天计算前一天的分红并发放，月初结算则每月一号计算上一个月的分红并发放（确认收货的订单）
          </div>
        </el-form-item>
        <el-form-item label="团队分红极差：">
          <el-radio-group v-model="form.teamfenhong_differential">
            <el-radio :label="0">否</el-radio>
            <el-radio :label="1">是</el-radio>
          </el-radio-group>
          <div style="color: #999999">开启后团队分红将按照级差进行分红</div>
        </el-form-item>
        <el-form-item label="多商户商品分红：">
          <el-radio-group v-model="form.fhjiesuanbusiness">
            <el-radio :label="0">否</el-radio>
            <el-radio :label="1">是</el-radio>
          </el-radio-group>
          <div style="color: #999999">开启后多商户的商品也参与分红</div>
        </el-form-item>
      </div>
      <div v-if="activeName == '登录设置'">
        <el-form-item label="微信公众号">
          <el-checkbox
            v-model="form.logintype_mp1"
            :data-a="checked"
            @change="checkChange()"
          >
            注册登陆
          </el-checkbox>
          <el-checkbox
            v-model="form.logintype_mp2"
            :data-a="checked"
            @change="checkChange()"
          >
            手机号登陆
          </el-checkbox>
          <el-checkbox
            v-model="form.logintype_mp3"
            :data-a="checked"
            @change="checkChange()"
          >
            授权登陆
          </el-checkbox>
        </el-form-item>
        <el-form-item label="微信小程序">
          <el-checkbox
            v-model="form.logintype_wx1"
            :data-a="checked"
            @change="checkChange()"
          >
            注册登陆
          </el-checkbox>
          <el-checkbox
            v-model="form.logintype_wx2"
            :data-a="checked"
            @change="checkChange()"
          >
            手机号登陆
          </el-checkbox>
          <el-checkbox
            v-model="form.logintype_wx3"
            :data-a="checked"
            @change="checkChange()"
          >
            授权登陆
          </el-checkbox>
        </el-form-item>
        <el-form-item label="支付宝小程序">
          <el-checkbox
            v-model="form.logintype_alipay1"
            :data-a="checked"
            @change="checkChange()"
          >
            注册登陆
          </el-checkbox>
          <el-checkbox
            v-model="form.logintype_alipay2"
            :data-a="checked"
            @change="checkChange()"
          >
            手机号登陆
          </el-checkbox>
          <el-checkbox
            v-model="form.logintype_alipay3"
            :data-a="checked"
            @change="checkChange()"
          >
            授权登陆
          </el-checkbox>
        </el-form-item>
        <el-form-item label="百度小程序">
          <el-checkbox
            v-model="form.logintype_baidu1"
            :data-a="checked"
            @change="checkChange()"
          >
            注册登陆
          </el-checkbox>
          <el-checkbox
            v-model="form.logintype_baidu2"
            :data-a="checked"
            @change="checkChange()"
          >
            手机号登陆
          </el-checkbox>
          <el-checkbox
            v-model="form.logintype_baidu3"
            :data-a="checked"
            @change="checkChange()"
          >
            授权登陆
          </el-checkbox>
        </el-form-item>
        <el-form-item label="头条小程序">
          <el-checkbox
            v-model="form.logintype_toutiao1"
            :data-a="checked"
            @change="checkChange()"
          >
            注册登陆
          </el-checkbox>
          <el-checkbox
            v-model="form.logintype_toutiao2"
            :data-a="checked"
            @change="checkChange()"
          >
            手机号登陆
          </el-checkbox>
          <el-checkbox
            v-model="form.logintype_toutiao3"
            :data-a="checked"
            @change="checkChange()"
          >
            授权登陆
          </el-checkbox>
        </el-form-item>
        <el-form-item label="QQ小程序">
          <el-checkbox
            v-model="form.logintype_qq1"
            :data-a="checked"
            @change="checkChange()"
          >
            注册登陆
          </el-checkbox>
          <el-checkbox
            v-model="form.logintype_qq2"
            :data-a="checked"
            @change="checkChange()"
          >
            手机号登陆
          </el-checkbox>
          <el-checkbox
            v-model="form.logintype_qq3"
            :data-a="checked"
            @change="checkChange()"
          >
            授权登陆
          </el-checkbox>
        </el-form-item>
        <el-form-item label="手机H5">
          <el-checkbox
            v-model="form.logintype_h51"
            :data-a="checked"
            @change="checkChange()"
          >
            注册登陆
          </el-checkbox>
          <el-checkbox
            v-model="form.logintype_h52"
            :data-a="checked"
            @change="checkChange()"
          >
            手机号登陆
          </el-checkbox>
        </el-form-item>
        <el-form-item label="手机App">
          <el-checkbox
            v-model="form.logintype_app1"
            :data-a="checked"
            @change="checkChange()"
          >
            注册登陆
          </el-checkbox>
          <el-checkbox
            v-model="form.logintype_app2"
            :data-a="checked"
            @change="checkChange()"
          >
            手机号登陆
          </el-checkbox>
          <el-checkbox
            v-model="form.logintype_app3"
            :data-a="checked"
            @change="checkChange()"
          >
            授权登陆
          </el-checkbox>
        </el-form-item>
        <el-form-item label="强制登陆">
          <el-checkbox
            v-model="form.login_mastmp"
            :data-a="checked"
            @change="checkChange()"
          >
            微信公众号
          </el-checkbox>
          <el-checkbox
            v-model="form.login_mastwx"
            :data-a="checked"
            @change="checkChange()"
          >
            微信小程序
          </el-checkbox>
          <el-checkbox
            v-model="form.login_mastalipay"
            :data-a="checked"
            @change="checkChange()"
          >
            支付宝小程序
          </el-checkbox>
          <el-checkbox
            v-model="form.login_mastbaidu"
            :data-a="checked"
            @change="checkChange()"
          >
            百度小程序
          </el-checkbox>
          <el-checkbox
            v-model="form.login_masttoutiao"
            :data-a="checked"
            @change="checkChange()"
          >
            头条小程序
          </el-checkbox>
          <el-checkbox
            v-model="form.login_mastqq"
            :data-a="checked"
            @change="checkChange()"
          >
            QQ小程序
          </el-checkbox>
          <el-checkbox
            v-model="form.login_masth5"
            :data-a="checked"
            @change="checkChange()"
          >
            手机H5
          </el-checkbox>
          <el-checkbox
            v-model="form.login_mastapp"
            :data-a="checked"
            @change="checkChange()"
          >
            手机app
          </el-checkbox>
        </el-form-item>
      </div>
      <div v-if="activeName == '注册协议'">
        <!-- /** 注册协议 **/
          register_status: null, //0不开启 1开启
          register_name: '测试', //注册协议名称
          register_content: '1212', //注册协议内容 -->
        <el-form-item label="用户注册协议">
          <el-radio-group v-model="form.register_status">
            <el-radio :label="0">不开启</el-radio>
            <el-radio :label="1">开启</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="协议名称" prop="register_name">
          <el-input v-model="form.register_name" style="width: 215px" />
        </el-form-item>
        <el-form-item class="vab-quill-content" label="内容" prop="content">
          <vab-quill
            ref="vab-quill"
            v-model="form.register_content"
            :min-height="400"
            :options="options"
          />
        </el-form-item>
      </div>
      <div v-if="activeName == '同步设置'">
        <div class="textCss">
          <p style="font-weight: 600">数据同步使用说明</p>
        </div>
        <el-form-item>
          <el-button style="margin-top: 10px" type="primary">
            同步数据
          </el-button>
        </el-form-item>
      </div>
      <el-form-item v-if="activeName != '同步设置'">
        <el-button
          v-has-permi="['btn:SystemStore:edit']"
          style="margin-top: 10px"
          type="primary"
          @click="submitForm('form')"
        >
          提交
        </el-button>
      </el-form-item>
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
  import VabQuill from '@/extra/VabQuill'
  export default {
    name: 'SystemStore',
    components: {
      VabUpload,
      VabQuill,
    },
    data() {
      return {
        activeName: '基础配置',
        options: {
          theme: 'snow',
          bounds: document.body,
          debug: 'warn',
          modules: {
            toolbar: {
              container: [
                ['bold', 'italic', 'underline', 'strike'],
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [{ size: ['small', false, 'large', 'huge'] }],
                [{ color: [] }, { background: [] }],
                ['blockquote', 'code-block'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ script: 'sub' }, { script: 'super' }],
                [{ indent: '-1' }, { indent: '+1' }],
                [{ align: [] }],
                [{ direction: 'rtl' }],
                [{ font: [] }],
                ['clean'],
                ['link', 'image', 'vab-upload-image'],
              ],
              handlers: {
                'vab-upload-image': () => {
                  this.$baseConfirm(
                    '演示环境未使用真实文件服务器，故图片上传回显不会生效，开发时请修改为正式文件服务器地址',
                    '开发注意事项！！！',
                    () => {
                      this.$refs['vabUpload'].handleShow()
                    },
                    () => {
                      this.handleAddImg()
                    },
                    '模拟打开文件上传',
                    '模拟添加一张文件服务器图片'
                  )
                },
              },
            },
          },
          placeholder: '内容...',
          readOnly: false,
        },
        checked: false,
        form: {
          // 多选转换
          gettj1: false,
          gettj2: false,
          gettj3: false,
          gzts1: false,
          gzts2: false,
          ddbb1: false,
          ddbb2: false,
          withdraw_weixin1: false,
          withdraw_aliaccount1: false,
          withdraw_bankcard1: false,
          invoice_type1: false,
          invoice_type2: false,
          logintype_mp1: false,
          logintype_mp2: false,
          logintype_mp3: false,
          logintype_wx1: false,
          logintype_wx2: false,
          logintype_wx3: false,
          logintype_alipay1: false,
          logintype_alipay2: false,
          logintype_alipay3: false,
          logintype_baidu1: false,
          logintype_baidu2: false,
          logintype_baidu3: false,
          logintype_toutiao1: false,
          logintype_toutiao2: false,
          logintype_toutiao3: false,
          logintype_qq1: false,
          logintype_qq2: false,
          logintype_qq3: false,
          logintype_h51: false,
          logintype_h52: false,
          logintype_app1: false,
          logintype_app2: false,
          logintype_app3: false,
          login_mastmp: false,
          login_mastwx: false,
          login_mastalipay: false,
          login_mastbaidu: false,
          login_masttoutiao: false,
          login_mastqq: false,
          login_masth5: false,
          login_mastapp: false,
          /** 基础设置 **/
          name: null, //商家名称
          shopid: null, //唯一标识
          domain: null, //api域名
          logo: null, //商家logo
          desc: null, //商家简介
          tel: null, //商家服务电话
          address: null, //商家地址
          longitude: null, //经度
          latitude: null, //纬度
          kfurl: null, //客服系统链接
          wxkf: null, //微信小程序客服 0 客服链接 1 小程序客服 2 微信客服
          wxkfurl: null, //微信客服url
          corpid: null, //微信客服企业id
          gzts: null, //关注提示 1首页 2商品详情页
          ddbb: null, //订单播报 1首页 2商品详情页
          color1: null, //主色调
          color2: null, //辅色调
          gettj: null, //进入条件
          gettjtip: null, //写死传值
          /** 财务设置 **/
          moneypay: null, //余额提现 0关闭 1开启
          recharge: null, //余额充值 0关闭 1开启
          commission2money: null, //佣金转余额 0关闭 1开启
          withdraw_weixin: null, //提现方式-微信钱包 0关闭 1开启
          withdraw_aliaccount: null, //提现方式-支付宝 0关闭 1开启
          withdraw_bankcard: null, //提现方式-银行卡 0关闭 1开启
          withdraw_autotransfer: null, //自动打款 0关闭 1开启
          withdraw: null, //余额提现 0关闭 1开启
          withdrawmin: null, //提现最小金额
          withdrawfee: null, //提现手续费 百分比
          comwithdraw: null, //佣金提现 0关闭 1开启
          comwithdrawmin: null, //提现最小金额
          comwithdrawfee: null, //提现手续费 百分比
          maxonpay: null, //在线支付限额（超过此金额只能联系客服支付 0代表不限制）
          dakuan: null, //主动打款 0关闭 1开启
          invoice: null, //发票开关 0关闭 1开启
          invoice_type: null, //发票类型（发票开关为开） 1普通发票 2增值税专用发票
          pay_transfer: null, //转账付款支付 0关闭 1开启
          pay_transfer_account_name: null, //户名
          pay_transfer_account: null, //账号
          pay_transfer_bank: null, //开户行
          pay_transfer_desc: null, //提示信息
          /** 积分设置 **/
          scorein_money: null, //消费赠积分 消费
          scorein_score: null, //赠送
          scorecz_money: null, //冲值赠积分 消费
          scorecz_score: null, //赠送
          score2money: null, //积分抵扣
          scoredkmaxpercent: null, //积分抵扣百分比
          scorebdkyf: null, //积分不抵扣运费 0否 1是
          /** 分销分红 **/
          fxjiesuantype: null, //分销结算方式 0商品价格 1按成交价格 2按销售利润
          fxjiesuantime: null, //分销结算时间 0确认收货后结算 1付款后结算
          fhjiesuantype: null, //分红结算方式 0按销售金额 1按销售利润
          fhjiesuantime_type: null, //分红结算时间 0确认收货后结算 1付款后结算
          fhjiesuantime: null, //分红结算周期 0每天结算 1每小时结算 2每分钟结算 3月初结算 4月底结算
          teamfenhong_differential: null, //团队分红极差 0否 1是
          fhjiesuanbusiness: null, //多商户商品分红 0否 1是
          /** 登陆设置 **/
          logintype_mp: null, //微信公众号 1注册登陆 2手机号登陆 3授权登陆
          logintype_wx: null, //微信小程序 1注册登陆 2手机号登陆 3授权登陆
          logintype_alipay: null, //支付宝小程序 1注册登陆 2手机号登陆 3授权登陆
          logintype_baidu: null, //百度小程序 1注册登陆 2手机号登陆 3授权登陆
          logintype_toutiao: null, //头条小程序 1注册登陆 2手机号登陆 3授权登陆
          logintype_qq: null, //QQ小程序 1注册登陆 2手机号登陆 3授权登陆
          logintype_h5: null, //手机H5 1注册登陆 2手机号登陆
          logintype_app: null, //手机App 1注册登陆 2手机号登陆  3授权登陆
          login_mast: null, //强制登陆
          /** 注册协议 **/
          register_status: null, //0不开启 1开启
          register_name: null, //注册协议名称
          register_content: null, //注册协议内容
        },
        rules: {
          name: [
            { required: true, message: '请输入商家名称', trigger: 'blur' },
          ],
          shopid: [
            { required: true, message: '请输入唯一标识', trigger: 'blur' },
          ],
          domain: [
            { required: true, message: '请输入api域名', trigger: 'blur' },
          ],
          desc: [
            { required: true, message: '请输入商家简介', trigger: 'blur' },
          ],
          tel: [
            { required: true, message: '请输入商家服务电话', trigger: 'blur' },
          ],
          address: [
            { required: true, message: '请输入商家地址', trigger: 'blur' },
          ],
          longitude: [
            { required: true, message: '请输入经度', trigger: 'blur' },
          ],
          latitude: [
            { required: true, message: '请输入纬度', trigger: 'blur' },
          ],
          kfurl: [
            { required: true, message: '请输入客服系统链接', trigger: 'blur' },
          ],
          wxkfurl: [
            { required: true, message: '请输入微信客服url', trigger: 'blur' },
          ],
          corpid: [
            {
              required: true,
              message: '请输入微信客服企业id',
              trigger: 'blur',
            },
          ],
          color1: [
            { required: true, message: '请输入主色调', trigger: 'blur' },
          ],
          color2: [
            { required: true, message: '请输入辅色调', trigger: 'blur' },
          ],
          withdrawmin: [
            { required: true, message: '请输入提现最小金额', trigger: 'blur' },
          ],
          withdrawfee: [
            { required: true, message: '请输入提现手续费', trigger: 'blur' },
          ],
          comwithdrawmin: [
            { required: true, message: '请输入提现最小金额', trigger: 'blur' },
          ],
          comwithdrawfee: [
            { required: true, message: '请输入提现手续费', trigger: 'blur' },
          ],
          maxonpay: [
            { required: true, message: '请输入在线支付限额', trigger: 'blur' },
          ],
          pay_transfer_account_name: [
            { required: true, message: '请输入户名', trigger: 'blur' },
          ],
          pay_transfer_account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          pay_transfer_bank: [
            { required: true, message: '请输入开户行', trigger: 'blur' },
          ],
          pay_transfer_desc: [
            { required: true, message: '请输入提示信息', trigger: 'blur' },
          ],
          register_name: [
            { required: true, message: '请输入注册协议名称', trigger: 'blur' },
          ],
        },
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
          // 数据转化
          // 1.单选框转换 字符串转换成数组
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
          this.form.scorebdkyf = Number(this.form.scorebdkyf)
          this.form.fxjiesuantype = Number(this.form.fxjiesuantype)
          this.form.fxjiesuantime = Number(this.form.fxjiesuantime)
          this.form.fhjiesuantype = Number(this.form.fhjiesuantype)
          this.form.fhjiesuantime_type = Number(this.form.fhjiesuantime_type)
          this.form.fhjiesuantime = Number(this.form.fhjiesuantime)
          this.form.teamfenhong_differential = Number(
            this.form.teamfenhong_differential
          )
          this.form.fhjiesuanbusiness = Number(this.form.fhjiesuanbusiness)
          this.form.register_status = Number(this.form.register_status)
          // 2.多选框转换
          this.form.gettj1 = false
          this.form.gettj2 = false
          this.form.gettj3 = false
          if (this.form.gettj.length != 0) {
            this.form.gettj.forEach((item) => {
              if (item === 1) {
                this.form.gettj1 = true
              } else if (item === 2) {
                this.form.gettj2 = true
              } else if (item === 3) {
                this.form.gettj3 = true
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

          this.form.logintype_mp1 = false
          this.form.logintype_mp2 = false
          this.form.logintype_mp3 = false
          if (this.form.logintype_mp.length != 0) {
            this.form.logintype_mp.forEach((item) => {
              if (item === 1) {
                this.form.logintype_mp1 = true
              } else if (item === 2) {
                this.form.logintype_mp2 = true
              } else if (item === 3) {
                this.form.logintype_mp3 = true
              }
            })
          }
          this.form.logintype_wx1 = false
          this.form.logintype_wx2 = false
          this.form.logintype_wx3 = false
          if (this.form.logintype_wx.length != 0) {
            this.form.logintype_wx.forEach((item) => {
              if (item === 1) {
                this.form.logintype_wx1 = true
              } else if (item === 2) {
                this.form.logintype_wx2 = true
              } else if (item === 3) {
                this.form.logintype_wx3 = true
              }
            })
          }
          this.form.logintype_alipay1 = false
          this.form.logintype_alipay2 = false
          this.form.logintype_alipay3 = false
          if (this.form.logintype_alipay.length != 0) {
            this.form.logintype_alipay.forEach((item) => {
              if (item === 1) {
                this.form.logintype_alipay1 = true
              } else if (item === 2) {
                this.form.logintype_alipay2 = true
              } else if (item === 3) {
                this.form.logintype_alipay3 = true
              }
            })
          }
          this.form.logintype_baidu1 = false
          this.form.logintype_baidu2 = false
          this.form.logintype_baidu3 = false
          if (this.form.logintype_baidu.length != 0) {
            this.form.logintype_baidu.forEach((item) => {
              if (item === 1) {
                this.form.logintype_baidu1 = true
              } else if (item === 2) {
                this.form.logintype_baidu2 = true
              } else if (item === 3) {
                this.form.logintype_baidu3 = true
              }
            })
          }
          this.form.logintype_toutiao1 = false
          this.form.logintype_toutiao2 = false
          this.form.logintype_toutiao3 = false
          if (this.form.logintype_toutiao.length != 0) {
            this.form.logintype_toutiao.forEach((item) => {
              if (item === 1) {
                this.form.logintype_toutiao1 = true
              } else if (item === 2) {
                this.form.logintype_toutiao2 = true
              } else if (item === 3) {
                this.form.logintype_toutiao3 = true
              }
            })
          }
          this.form.logintype_qq1 = false
          this.form.logintype_qq2 = false
          this.form.logintype_qq3 = false
          if (this.form.logintype_qq.length != 0) {
            this.form.logintype_qq.forEach((item) => {
              if (item === 1) {
                this.form.logintype_qq1 = true
              } else if (item === 2) {
                this.form.logintype_qq2 = true
              } else if (item === 3) {
                this.form.logintype_qq3 = true
              }
            })
          }
          this.form.logintype_h51 = false
          this.form.logintype_h52 = false
          if (this.form.logintype_h5.length != 0) {
            this.form.logintype_h5.forEach((item) => {
              if (item === 1) {
                this.form.logintype_h51 = true
              } else if (item === 2) {
                this.form.logintype_h52 = true
              }
            })
          }
          this.form.logintype_app1 = false
          this.form.logintype_app2 = false
          this.form.logintype_app3 = false
          if (this.form.logintype_app.length != 0) {
            this.form.logintype_app.forEach((item) => {
              if (item === 1) {
                this.form.logintype_app1 = true
              } else if (item === 2) {
                this.form.logintype_app2 = true
              } else if (item === 3) {
                this.form.logintype_app3 = true
              }
            })
          }
          if (this.form.login_mast.length != 0) {
            this.form.login_mast.forEach((item) => {
              if (item == 'mp') {
                this.form.login_mastmp = true
              } else if (item == 'wx') {
                this.form.login_mastwx = true
              } else if (item == 'alipay') {
                this.form.login_mastalipay = true
              } else if (item == 'baidu') {
                this.form.login_mastbaidu = true
              } else if (item == 'toutiao') {
                this.form.login_masttoutiao = true
              } else if (item == 'qq') {
                this.form.login_mastqq = true
              } else if (item == 'h5') {
                this.form.login_masth5 = true
              } else if (item == 'app') {
                this.form.login_mastapp = true
              }
            })
          }
          // 多选框双向绑定页面渲染处理参数
          this.checked = true
        }
      },
      // 多选框双向绑定页面渲染处理函数
      checkChange() {
        this.checked = true
        this.$forceUpdate()
      },
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            // 提交前多选框转换
            let arr = []
            if (this.form.gettj1) {
              arr.push(1)
            }
            if (this.form.gettj2) {
              arr.push(2)
            }
            if (this.form.gettj3) {
              arr.push(3)
            }
            this.form.gettj = arr
            arr = []
            if (this.form.gzts1) {
              arr.push(1)
            }
            if (this.form.gzts2) {
              arr.push(2)
            }
            this.form.gzts = arr
            arr = []
            if (this.form.ddbb1) {
              arr.push(1)
            }
            if (this.form.ddbb2) {
              arr.push(2)
            }
            this.form.ddbb = arr
            arr = []
            if (this.form.withdraw_weixin1) {
              this.form.withdraw_weixin = 1
            } else {
              this.form.withdraw_weixin = 0
            }
            if (this.form.withdraw_aliaccount1) {
              this.form.withdraw_aliaccount = 1
            } else {
              this.form.withdraw_aliaccount = 0
            }
            if (this.form.withdraw_bankcard1) {
              this.form.withdraw_bankcard = 1
            } else {
              this.form.withdraw_bankcard = 0
            }
            if (this.form.invoice_type1) {
              arr.push(1)
            }
            if (this.form.invoice_type2) {
              arr.push(2)
            }
            this.form.invoice_type = arr
            arr = []
            if (this.form.logintype_mp1) {
              arr.push(1)
            }
            if (this.form.logintype_mp2) {
              arr.push(2)
            }
            if (this.form.logintype_mp3) {
              arr.push(3)
            }
            this.form.logintype_mp = arr
            arr = []
            if (this.form.logintype_wx1) {
              arr.push(1)
            }
            if (this.form.logintype_wx2) {
              arr.push(2)
            }
            if (this.form.logintype_wx3) {
              arr.push(3)
            }
            this.form.logintype_wx = arr
            arr = []
            if (this.form.logintype_alipay1) {
              arr.push(1)
            }
            if (this.form.logintype_alipay2) {
              arr.push(2)
            }
            if (this.form.logintype_alipay3) {
              arr.push(3)
            }
            this.form.logintype_alipay = arr
            arr = []
            if (this.form.logintype_baidu1) {
              arr.push(1)
            }
            if (this.form.logintype_baidu2) {
              arr.push(2)
            }
            if (this.form.logintype_baidu3) {
              arr.push(3)
            }
            this.form.logintype_baidu = arr
            arr = []
            if (this.form.logintype_toutiao1) {
              arr.push(1)
            }
            if (this.form.logintype_toutiao2) {
              arr.push(2)
            }
            if (this.form.logintype_toutiao3) {
              arr.push(3)
            }
            this.form.logintype_toutiao = arr
            arr = []
            if (this.form.logintype_qq1) {
              arr.push(1)
            }
            if (this.form.logintype_qq2) {
              arr.push(2)
            }
            if (this.form.logintype_qq3) {
              arr.push(3)
            }
            this.form.logintype_qq = arr
            arr = []
            if (this.form.logintype_h51) {
              arr.push(1)
            }
            if (this.form.logintype_h52) {
              arr.push(2)
            }
            this.form.logintype_h5 = arr
            arr = []
            if (this.form.logintype_app1) {
              arr.push(1)
            }
            if (this.form.logintype_app2) {
              arr.push(2)
            }
            if (this.form.logintype_app3) {
              arr.push(3)
            }
            this.form.logintype_app = arr
            arr = []
            if (this.form.login_mastmp) {
              arr.push('mp')
            }
            if (this.form.login_mastwx) {
              arr.push('wx')
            }
            if (this.form.login_mastalipay) {
              arr.push('alipay')
            }
            if (this.form.login_mastbaidu) {
              arr.push('baidu')
            }
            if (this.form.login_masttoutiao) {
              arr.push('toutiao')
            }
            if (this.form.login_mastqq) {
              arr.push('qq')
            }
            if (this.form.login_masth5) {
              arr.push('h5')
            }
            if (this.form.login_mastapp) {
              arr.push('app')
            }
            this.form.login_mast = arr
            arr = []
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
  .vab-quill-content {
    ::v-deep {
      .el-form-item__content {
        line-height: normal;
      }
    }
  }

  @font-face {
    font-family: 'remixicon';
    src: url('~remixicon/fonts/remixicon.eot?t=1590207869815'); /* IE9*/
    src: url('~remixicon/fonts/remixicon.eot?t=1590207869815#iefix')
        format('embedded-opentype'),
      url('~remixicon/fonts/remixicon.woff2?t=1590207869815') format('woff2'),
      url('~remixicon/fonts/remixicon.woff?t=1590207869815') format('woff'),
      url('~remixicon/fonts/remixicon.ttf?t=1590207869815') format('truetype'),
      url('~remixicon/fonts/remixicon.svg?t=1590207869815#remixicon')
        format('svg');
    font-display: swap;
  }
  ::v-deep {
    .vab-quill {
      .ql-vab-upload-image {
        font-family: 'remixicon', sans-serif !important;
        font-size: 16px;
        font-weight: 580;

        &:before {
          content: '\ee46';
        }
      }
    }
  }
</style>
