<template>
  <div class="components-drawer">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">{{ form.title }}</div>
      <el-form ref="form" label-width="120px" :model="formDrawer">
        <el-form-item label="联系人:">
          <el-input
            v-model="formDrawer.name"
            placeholder="请输入联系人"
            style="width: 215px"
          />
        </el-form-item>
        <el-form-item label="状态：" prop="zhuangtai">
          <el-select v-model="formDrawer.zhuangtai">
            <el-option label="营业中" :value="2" />
            <el-option label="停业" :value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="新增门店类型:" prop="name">
          <el-radio-group v-model="formDrawer.name">
            <el-radio label="自营店" />
            <el-radio label="加盟店" />
            <el-radio label="联营店" />
          </el-radio-group>
          <div>注：自营店取公司库存，加盟店有独立的线上零售小程序</div>
        </el-form-item>
        <el-form-item label="门店地址：" prop="qx">
          <addressCity @getLawyerListInfo="selectAddress" />
        </el-form-item>
        <el-form-item label="详细地址：" prop="qx">
          <el-input
            v-model="formDrawer.address"
            class="input-with-select"
            placeholder="请输入详细地址"
            style="width: 665px"
          >
            <el-button slot="append" icon="el-icon-search">查找位置</el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <div style="width: 100px; height: 500px; background-color: #fff">
            <img src="../../../assets/1666436281999.jpg" />
          </div>
          <el-row style="margin-top: 10px" type="flex">
            <el-input style="width: 150px" />
            <el-input style="width: 150px; margin-left: 20px" />
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button native-type="submit" size="small" type="primary">
            确认
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import addressCity from '@/subview/components/City.vue'
  export default {
    name: 'EmployeesDrawer',
    components: { addressCity },
    props: {
      form: {
        type: Object,
        default: () => {},
      },
    },

    data() {
      return {
        formDrawer: this.form,
      }
    },
    watch: {
      form: {
        handler: function (val) {
          this.formDrawer = val
          console.log(val)
        },
        deep: true,
      },
    },
    created() {},
    methods: {
      selectAddress(selectProvince, selectCity, selectArea) {
        this.address = selectProvince + selectCity + selectArea
      },
    },
  }
</script>
<style lang="scss" scoped></style>
