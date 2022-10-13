<template>
  <div>
    <el-form  label-width="108px">
        <el-form-item label="商家名称：" >
       <el-input ></el-input>
  </el-form-item>
  <el-form-item label="唯一标识：" >
       <el-input ></el-input>
  </el-form-item>
  <el-form-item label="API域名：" >
       <el-input ></el-input>
  </el-form-item>
  <el-form-item label="商家LOGO：" >
       <el-button>上传图片</el-button>
       <span style="color:#999999">建议尺寸：200×200像素</span>
       <div class="topLogo" ><img src="https://new.shopvvv.cn/static/imgsrc/logo.jpg" alt=""></div>
  </el-form-item>
  <el-form-item label="商家简介：" >
       <el-input class="ipt1" ></el-input>
  </el-form-item>
  <el-form-item label="服务商家电话：" >
       <el-input ></el-input>
  </el-form-item>
  <el-form-item label="经纬度：" >
       <el-input class="ipt2" style="margin-right:10px;"></el-input> - <el-input class="ipt2" style="margin-left:10px"></el-input>
       <el-button class="btn1">选择坐标</el-button>
  </el-form-item>
  <el-form-item label="客服链接地址：" >
       <el-input style="width:300px;height:38px"></el-input>
       <div style="color:#999999;margin-left:80px">商品详情页客服链接，不填写则使用商城内部客服系统</div>
  </el-form-item>
   <el-row type="flex" style="height:38px;line-height: 38px;">
    <div style="margin-left:80px;">微信小程序客服：</div>
    <el-radio-group v-model="radio" style="line-height: 50px;" >
    <el-radio :label="3">备选项</el-radio>
    <el-radio :label="6">备选项</el-radio>
    <el-radio :label="9">备选项</el-radio>
  </el-radio-group>
      <div v-if="radio===3" style="margin-left:50px"> 客服链接：<el-input ></el-input></div>
      <div v-if="radio===9" style="margin-left:50px"> 客服链接：<el-input ></el-input>
        <span style="margin-left:10px">企业ID ：<el-input></el-input></span>
      </div>
   </el-row>
   <div style="color:#999999;margin-left:184px;margin-top: 10px;">客服链接：使用填写的客服链接，不填写则使用商城内部客服系统；</div>
    <div style="color:#999999;margin-left:184px;margin-top: 5px;">小程序客服：在小程序后台-功能-客服-小程序客服，配置客服人员；</div>
    <div style="color:#999999;margin-left:184px;margin-top: 5px;">微信客服：在<a href="#" style="color:black">微信客服</a>系统注册账号并绑定，<a href="" style="color:black">查看绑定流程</a>，填写企业ID并复制客服链接填写到客服链接处</div>
     <el-row type="flex">
      <el-col :span="8">
        <el-form-item label="关注提示：" style="margin-top:20px;margin-right:20px">
      <el-checkbox-group v-model="checked">
        <el-checkbox label="首页"></el-checkbox>
      <el-checkbox label="商品详情页"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
      </el-col>
      <el-col :span="16"><span style="line-height: 70px;color:#999999">仅公众号端有效</span></el-col>
     </el-row>
     <el-row type="flex">
      <el-col :span="8">
        <el-form-item label="关注提示：" style="margin-right:20px">
      <el-checkbox-group v-model="checked1">
        <el-checkbox label="首页"></el-checkbox>
      <el-checkbox label="订单播报"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
      </el-col>
      <el-col :span="16"><span style="line-height: 0px;color:#999999">首页或商品详情页滚动显示最近购买信息</span></el-col>
     </el-row>
     <el-form-item label="主色调：" >
       <el-input v-model="color1"></el-input>
       <el-color-picker v-model="color1"></el-color-picker><span style="margin-left:20px;color:#999999">商城主色调，如：#FD4A46</span>
  </el-form-item>
  <el-form-item label="辅色调：" >
       <el-input v-model="color2"></el-input>
       <el-color-picker v-model="color2"></el-color-picker><span style="margin-left:20px;color:#999999">商城辅色调，如：#7E71F6</span>
  </el-form-item>
  <el-form-item label="进入条件：" style="margin-right:20px">
      <el-checkbox-group v-model="checked2">
        <el-checkbox label="所有人"></el-checkbox>
      <el-checkbox label="普通会员"></el-checkbox>
      <el-checkbox label="分销商"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <div v-if="checked2.length==0" style="margin-left:80px">
      无权限提示: <el-input v-model="a"></el-input>
    </div>
    </el-form>
    <el-button style="margin-left:80px;margin-top:30px;background-color: #009688;border:unset">提交</el-button>
  </div>
</template>

<script>
export default {
    data(){
      return{
        radio: 3,
        checked:[],
        checked1:[],
        checked2:['所有人'],
        color1: '#FD4A46',
        color2:'#7E71F6',
        a:'您没有权限进入'
      }
    }
}
</script>

<style lang="scss" >
.el-color-picker--small .el-color-picker__trigger{
  margin-top: -14px;
    margin-bottom: -13px;
    height: 38px;
    width: 38px;
    margin-left:10px;
}
.el-form-item__label{
  margin-left:80px;
}
.el-input{
  width: 190px;
 
}
.el-input--small .el-input__inner{
  height: 38px;
}
.vab-theme-blue-black .el-button{
  margin-right:20px;
}
.topLogo{
 width:106px;
 height:106px;
 margin-top:10px;
 margin-left: 80px;
 img{
    width: 100%;
    height: 100%;
    padding: 2px;
    border: #d3d3d3 1px solid;
    background-color: #f6f6f6;
 }
}
.ipt1{
  width: 600px;
  height: 38px;
}
.ipt2{
  width: 150px;
  height: 38px;
}
 .btn1{
  width: 94px;
  height: 37px;
  margin-left: 10px;
}
.vab-theme-blue-black .el-button{
  border:1px solid #555555;
}
</style>