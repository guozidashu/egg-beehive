<template>
  <div class="components-drawer">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">{{ form.title }}</div>
      <el-form ref="form" label-width="120px" :model="formDrawer">
        <el-form-item label="门店Logo：">
          <img :src="formDrawer.img" style="width: 50px; height: 50px" />
        </el-form-item>
        <el-form-item label="门店名称：">
          <el-input
            v-model="formDrawer.name"
            placeholder="请输入门店名称"
            style="width: 215px"
          />
        </el-form-item>
        <el-form-item label="合作模式：" prop="type">
          <el-radio-group v-model="formDrawer.type">
            <el-radio label="直营店" />
            <el-radio label="联营店" />
            <el-radio label="加盟店" />
            <el-radio label="分销店" />
          </el-radio-group>
          <div v-if="formDrawer.type == '直营店 || 联营店'">
            注：接入总部小程序，享受门店自提+核销服务，线下线上管好一盘生意
          </div>
          <div v-else-if="formDrawer.type == '加盟店'">
            注：独立运营小程序商城，用户数字资产、资金流水完全私有化部署
          </div>
          <div v-else>
            注：第三方线上销售渠道如：抖音主播、快团团社群渠道、享受一件代发政策
          </div>
        </el-form-item>
        <!-- 渠道类型 -->
        <el-form-item label="渠道类型：" prop="type1">
          <el-radio-group v-model="formDrawer.type1">
            <el-radio label="公司总部" />
            <el-radio label="渠道合作" />
            <el-radio label="第三方渠道" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="门店地址：" prop="qx">
          <addressCity @getLawyerListInfo="selectAddress" />
        </el-form-item>
        <StroeMap @getshopInfo="getStroeMap" />
        <el-form-item label="联系人：" prop="qx">
          <el-input v-model="formDrawer.address" style="width: 215px" />
        </el-form-item>
        <el-form-item label="联系电话：" prop="qx">
          <el-input v-model="formDrawer.address" style="width: 215px" />
        </el-form-item>
        <el-form-item label="营业时间：" prop="qx">
          <el-time-picker
            v-model="value1"
            end-placeholder="下班时间"
            is-range
            placeholder="选择时间范围"
            range-separator="至"
            start-placeholder="上班时间"
          />
        </el-form-item>
        <el-form-item label="门店图片：">
          <img
            :src="formDrawer.img"
            style="width: 50px; height: 50px; margin-right: 10px"
          />
          <img
            :src="formDrawer.img"
            style="width: 50px; height: 50px; margin-right: 10px"
          />
          <img
            :src="formDrawer.img"
            style="width: 50px; height: 50px; margin-right: 10px"
          />
          <img
            src="../../../assets/addImg.png"
            style="width: 50px; height: 50px; margin-right: 10px"
            @click="handleShow()"
          />
        </el-form-item>
        <!-- 下拉框 -->
        <el-form-item label="特色服务：" prop="type1">
          <el-select v-model="formDrawer.type1">
            <el-option label="服务1" :value="1" />
            <el-option label="服务2" :value="2" />
            <el-option label="服务3" :value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="营业状态：" prop="zhuangtai">
          <el-radio v-model="formDrawer.zhuangtai" label="营业中">
            营业中
          </el-radio>
          <el-radio v-model="formDrawer.zhuangtai" label="停业">停业</el-radio>
        </el-form-item>
        <el-form-item>
          <el-button native-type="submit" size="small" type="primary">
            确认
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
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
  import StroeMap from '@/subview/components/StroeMap'
  import VabUpload from '@/extra/VabUpload'
  import addressCity from '@/subview/components/City.vue'
  export default {
    name: 'EmployeesDrawer',
    components: { addressCity, VabUpload, StroeMap },
    props: {
      form: {
        type: Object,
        default: () => {},
      },
    },

    data() {
      return {
        value1: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
        value2: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
        formDrawer: Object.assign({}, this.form),
      }
    },
    watch: {
      form: {
        handler: function (newVal) {
          this.formDrawer = Object.assign({}, newVal)
          console.log(2222, newVal)
        },
        deep: true,
      },
    },
    created() {},
    methods: {
      selectAddress(selectProvince, selectCity, selectArea) {
        this.address = selectProvince + selectCity + selectArea
      },
      handleShow() {
        this.$refs['vabUpload'].handleShow()
      },
      getStroeMap(value) {
        this.formDrawer.lng = value.lng
        this.formDrawer.lat = value.lat
      },
    },
  }
</script>
<style lang="scss" scoped></style>
