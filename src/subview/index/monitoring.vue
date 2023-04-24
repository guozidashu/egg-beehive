<template>
  <div>
    <!-- <div style="display: flex; border-top: 20px solid #f6f8f9">
      <el-menu
        class="el-menu-vertical-demo"
        default-active="1"
        style="width: 200px; min-height: calc(70vh)"
        @select="handleSelect"
      >
        <el-menu-item index="1">
          <vab-icon icon="shopping-bag-2-line" style="padding: 0 5px" />
          <span slot="title">商品</span>
        </el-menu-item>
        <el-menu-item index="2">
          <vab-icon icon="stock-line" style="padding: 0 5px" />
          <span slot="title">库存</span>
        </el-menu-item>
        <el-menu-item index="3">
          <vab-icon icon="user-3-line" style="padding: 0 5px" />
          <span slot="title">客户</span>
        </el-menu-item>
        <el-menu-item index="4">
          <vab-icon icon="settings-line" style="padding: 0 5px" />
          <span slot="title">生产</span>
        </el-menu-item>
        <el-menu-item index="5">
          <vab-icon icon="alarm-warning-line" style="padding: 0 5px" />
          <span slot="title">预警</span>
        </el-menu-item>
        <el-menu-item index="6">
          <vab-icon icon="time-line" style="padding: 0 5px" />
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
          <vab-icon icon="account-circle-line" style="padding: 0 5px" />
          <span slot="title">我的账户</span>
        </el-menu-item>
        <el-menu-item index="8">
          <vab-icon icon="user-add-line" style="padding: 0 5px" />
          <span slot="title">我的关注</span>
        </el-menu-item>
      </el-menu>
      
    </div> -->
    <div style="padding: 20px">
      <el-tabs v-model="menu_select" type="card">
        <el-tab-pane label="商品" name="1" />
        <!-- <el-tab-pane label="库存" name="2" /> -->
        <el-tab-pane label="客户" name="3" />
      </el-tabs>
    </div>
    <div style="width: 100%">
      <Goods v-if="menu_select == '1'" />
      <!-- <Inventory v-if="menu_select == '2'" /> -->
      <Customer v-if="menu_select == '3'" />
    </div>
  </div>
</template>
<script>
  import Goods from '@/subview/components/MonitoringComponents/goods'
  // import Inventory from '@/subview/components/MonitoringComponents/inventory'
  import Customer from '@/subview/components/MonitoringComponents/customer'
  export default {
    components: { Goods, Customer },
    data() {
      return {
        menu_select: '1',
      }
    },
    watch: {
      '$route.query': {
        handler: async function (newval) {
          if (newval.type) {
            this.menu_select = '3'
          }
        },
        deep: true,
        immediate: true,
      },
    },
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
