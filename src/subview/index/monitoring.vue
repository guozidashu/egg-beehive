<template>
  <div>
    <div style="display: flex; border-top: 20px solid #f6f8f9">
      <el-menu
        class="el-menu-vertical-demo"
        default-active="1"
        style="width: 200px; min-height: calc(70vh)"
        @select="handleSelect"
      >
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span slot="title">商品</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">库存</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-menu"></i>
          <span slot="title">客户</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-menu"></i>
          <span slot="title">生产</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-menu"></i>
          <span slot="title">预警</span>
        </el-menu-item>
        <el-menu-item index="6">
          <i class="el-icon-menu"></i>
          <span slot="title">
            实时
            <span
              style="
                padding: 3px 2px 0 2px;
                font-size: 12px;
                color: #fe7879;
                background-color: #fedede;
                border-radius: 25px;
              "
            >
              new
            </span>
          </span>
        </el-menu-item>
        <el-menu-item index="7">
          <i class="el-icon-menu"></i>
          <span slot="title">我的账户</span>
        </el-menu-item>
        <el-menu-item index="8">
          <i class="el-icon-menu"></i>
          <span slot="title">我的关注</span>
        </el-menu-item>
      </el-menu>
      <div style="width: 100%; border-left: 20px solid #f6f8f9">
        <Goods v-if="menu_select == '1'" />
        <Inventory v-if="menu_select == '2'" />
        <Customer v-if="menu_select == '3'" />
      </div>
    </div>
  </div>
</template>
<script>
  import Goods from '@/subview/components/MonitoringComponents/goods'
  import Inventory from '@/subview/components/MonitoringComponents/inventory'
  import Customer from '@/subview/components/MonitoringComponents/customer'
  export default {
    components: { Goods, Inventory, Customer },
    data() {
      return {
        menu_select: '1',
      }
    },
    watch: {},
    created() {},
    methods: {
      // 菜单切换
      handleSelect(key) {
        this.menu_select = key
      },
    },
  }
</script>
<style lang="scss" scoped></style>
