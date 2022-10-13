<template>
    <div class="bigbox">
      <el-form label-width="120px">
          <el-form-item label="微信公众号：">
              <el-checkbox-group v-model="checkboxGroup1" size="small">
        <el-checkbox label="注册登录" border></el-checkbox>
        <el-checkbox label="手机号登录" border ></el-checkbox>
        <el-checkbox label="授权登录" border></el-checkbox>
      </el-checkbox-group>
          </el-form-item>
          <el-form-item label="微信小程序：" style="margin-top:40px">
              <el-checkbox-group v-model="checkboxGroup2" size="small">
        <el-checkbox label="注册登录" border></el-checkbox>
        <el-checkbox label="手机号登录" border ></el-checkbox>
        <el-checkbox label="授权登录" border></el-checkbox>
      </el-checkbox-group>
          </el-form-item>
          <el-form-item label="支付宝小程序：" style="margin-top:40px">
              <el-checkbox-group v-model="checkboxGroup3" size="small">
        <el-checkbox label="注册登录" border></el-checkbox>
        <el-checkbox label="手机号登录" border ></el-checkbox>
        <el-checkbox label="授权登录" border></el-checkbox>
      </el-checkbox-group>
          </el-form-item>
          <el-form-item label="百度小程序：" style="margin-top:40px">
              <el-checkbox-group v-model="checkboxGroup4" size="small">
        <el-checkbox label="注册登录" border></el-checkbox>
        <el-checkbox label="手机号登录" border ></el-checkbox>
        <el-checkbox label="授权登录" border></el-checkbox>
      </el-checkbox-group>
          </el-form-item>
          <el-form-item label="头条小程序：" style="margin-top:40px">
              <el-checkbox-group v-model="checkboxGroup5" size="small">
        <el-checkbox label="注册登录" border></el-checkbox>
        <el-checkbox label="手机号登录" border ></el-checkbox>
        <el-checkbox label="授权登录" border></el-checkbox>
      </el-checkbox-group>
          </el-form-item>
          <el-form-item label="QQ小程序：" style="margin-top:40px">
              <el-checkbox-group v-model="checkboxGroup6" size="small">
        <el-checkbox label="注册登录" border></el-checkbox>
        <el-checkbox label="手机号登录" border ></el-checkbox>
        <el-checkbox label="授权登录" border></el-checkbox>
      </el-checkbox-group>
          </el-form-item>
          <el-form-item label="手机H5：" style="margin-top:40px">
              <el-checkbox-group v-model="checkboxGroup7" size="small">
        <el-checkbox label="注册登录" border></el-checkbox>
        <el-checkbox label="手机号登录" border ></el-checkbox>
      </el-checkbox-group>
          </el-form-item>
          <el-form-item label="手机APP：" style="margin-top:40px">
              <el-checkbox-group v-model="checkboxGroup8" size="small">
        <el-checkbox label="注册登录" border></el-checkbox>
        <el-checkbox label="手机号登录" border ></el-checkbox>
        <el-checkbox label="授权登录" border></el-checkbox>
      </el-checkbox-group>
          </el-form-item>
          <el-form-item label="绑定手机号：">
              <el-radio-group v-model="radio">
      <el-radio :label="3">不绑定</el-radio>
      <el-radio :label="6">可选绑定</el-radio>
      <el-radio :label="9">强制绑定</el-radio>
    </el-radio-group>
    <span style="margin-left:60px;color: #999999;">授权登录时是否提示绑定手机号</span>
          </el-form-item>
          <el-form-item label="强制登录：">
              <el-checkbox-group v-model="checkList">
    <div class="big">
      <el-checkbox label="复选框 A"></el-checkbox>
      <el-checkbox label="复选框 B"></el-checkbox>
      <el-checkbox label="复选框 C"></el-checkbox>
      <el-checkbox label="禁用" ></el-checkbox>
    </div>
    <div style="margin-left:80px" class="bigTwo">
      <el-checkbox label="复选框 D"></el-checkbox>
      <el-checkbox label="复选框 E"></el-checkbox>
      <el-checkbox label="复选框 F"></el-checkbox>
      <el-checkbox label="禁用1" ></el-checkbox>
    </div>
    </el-checkbox-group>
    <div style="color:#999999">开启后进入系统必须先登录</div>
          </el-form-item>
      </el-form>
      <el-button style="margin-left:80px;margin-top:30px;background-color: #009688;border:unset">提交</el-button>
    </div>
  </template>

<script>
export default {
    data(){
    return {
        checkList: [],
        radio: 3,
        checkboxGroup1: ['注册登录'],
        checkboxGroup2:['注册登录','手机号登录','授权登录'],
        checkboxGroup3:['注册登录','手机号登录','授权登录'],
        checkboxGroup4:['注册登录','手机号登录','授权登录'],
        checkboxGroup5:['注册登录','手机号登录','授权登录'],
        checkboxGroup6:['注册登录','手机号登录','授权登录'],
        checkboxGroup7:['注册登录','手机号登录','授权登录'],
        checkboxGroup8:['注册登录','手机号登录','授权登录']
    }
   }
}
</script>

<style scoped lang="scss">
   ::v-deep .el-checkbox.is-bordered.el-checkbox--small .el-checkbox__inner {
    height: 32px;
    width: 32px;
    background-color: #fff;
    border:1px solid #5fb878;
    text-align: center;
}
::v-deep[data-v-49011f64] .el-checkbox.is-bordered.el-checkbox--small .el-checkbox__inner{
    position: absolute;
    top: -15px;
    left: 73px;
}
.vab-theme-blue-black .el-checkbox.is-bordered.is-checked{
    background-color:#5fb878;
    border:1px solid #5fb878;
}
::v-deep .el-checkbox__inner::after{
    left:10px;
    top:1px;
}
::v-deep .el-checkbox.is-bordered.el-checkbox--small .el-checkbox__inner::after{
    height: 16px;
    width: 8px;
}
::v-deep .el-checkbox__inner::after{
    border:1px solid green;
    border-top:#fff;
    border-left:#fff;
}
::v-deep [data-v-49011f64] .el-checkbox.is-bordered.el-checkbox--small .el-checkbox__inner{
    border:1px solid #d2d2d2;
}
::v-deep .el-checkbox.is-bordered.el-checkbox--small .el-checkbox__label{
    color:#fff;
}
::v-deep .el-checkbox.is-bordered{
    background-color: #d2d2d2;
}

</style>