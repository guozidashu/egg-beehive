<template>
  <div>
    <div v-if="form.drawerType != 3">
      <div style="padding: 0 20px 20px 20px">
        <div>
          <el-row :gutter="20">
            <el-col :span="12" style="display: flex">
              <img
                :src="goodsDetails.img"
                style="width: 50px; height: 50px; margin: 0 10px 10px 0"
              />
              <div style="margin-top: -5px">
                <div style="margin: 15px 0 0 0">
                  款号：{{ goodsDetails.sn }}
                </div>
                <div>名称：{{ goodsDetails.name }}</div>
              </div>
            </el-col>

            <el-col :span="12">
              <vab-icon
                icon="align-center"
                style="float: right; margin: 6px 0 0 0"
              />
              <el-button
                v-if="form.drawerType == 1 && form.path == 'erp'"
                v-has-permi="['btn:GoodsManage:edit']"
                size="small"
                style="float: right; margin-right: 10px"
                type="primary"
                @click="changeTypeBtn(2)"
              >
                编辑
              </el-button>
              <el-button
                v-if="form.drawerType == 2"
                v-has-permi="['btn:GoodsManage:edit']"
                size="small"
                style="float: right; margin-right: 10px"
                type="primary"
                @click="changeTypeBtn(1)"
              >
                完成
              </el-button>
            </el-col>
          </el-row>
        </div>
        <div style="display: flex">
          <div style="display: flex; flex: 1; flex-direction: column">
            <span style="margin-bottom: 12px">总销量</span>
            <span>{{ goodsAllNum.sales_total }}</span>
          </div>
          <div style="display: flex; flex: 1; flex-direction: column">
            <span style="margin-bottom: 12px">总销售额</span>
            <span>￥{{ goodsAllNum.volume_total | moneyFormat }}</span>
          </div>
          <div style="display: flex; flex: 1; flex-direction: column">
            <span style="margin-bottom: 12px">库存数</span>
            <span>{{ goodsAllNum.stock_total }}</span>
          </div>
          <div style="display: flex; flex: 1; flex-direction: column">
            <span style="margin-bottom: 12px">聚水潭库存</span>
            <span>{{ goodsAllNum.jst_stock_total }}</span>
          </div>
          <div style="display: flex; flex: 1; flex-direction: column">
            <span style="margin-bottom: 12px">聚水潭占用库存</span>
            <span>{{ goodsAllNum.jst_occupy_stock_total }}</span>
          </div>
          <div style="display: flex; flex: 1; flex-direction: column">
            <span style="margin-bottom: 12px">库存价值</span>
            <span>￥{{ goodsAllNum.inventory_value | moneyFormat }}</span>
          </div>
          <div style="display: flex; flex: 1; flex-direction: column">
            <span style="margin-bottom: 12px">总发货</span>
            <span>{{ goodsAllNum.shipments_total }}</span>
          </div>
          <div style="display: flex; flex: 1; flex-direction: column">
            <span style="margin-bottom: 12px">总入库</span>
            <span>{{ goodsAllNum.warehousing_total }}</span>
          </div>
        </div>
      </div>
      <el-tabs
        v-model="activeNameTemp"
        style="padding: 0 25px"
        @tab-click="handleClick"
      >
        <el-tab-pane label="商品信息" name="0" />
        <el-tab-pane label="客户销售" name="1" />
        <el-tab-pane label="发货信息" name="2" />
        <el-tab-pane label="退货信息" name="3" />
        <el-tab-pane label="入库信息" name="4" />
        <el-tab-pane label="出库信息" name="5" />
        <el-tab-pane label="调整信息" name="6" />
        <el-tab-pane label="库存明细" name="7" />
      </el-tabs>
    </div>
    <div v-if="form.drawerType == 3">
      <el-button
        v-if="form.drawerType == 1"
        v-has-permi="['btn:GoodsManage:edit']"
        size="small"
        style="float: right; margin-right: 10px"
        type="primary"
        @click="changeTypeBtn(2)"
      >
        编辑
      </el-button>
      <el-button
        v-if="form.drawerType == 2 || form.drawerType == 3"
        v-has-permi="['btn:GoodsManage:edit']"
        size="small"
        style="float: right; margin-right: 10px"
        type="primary"
        @click="changeTypeBtn(1)"
      >
        完成
      </el-button>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      form: {
        type: Object,
        default: () => {},
      },
      goodsDetails: {
        type: Object,
        default: () => {},
      },
      goodsAllNum: {
        type: Object,
        default: () => {},
      },
      activeName: {
        type: String,
        default: '0',
      },
    },
    data() {
      return {
        activeNameTemp: this.activeName,
      }
    },
    watch: {
      activeName(val) {
        this.activeNameTemp = val
      },
    },
    methods: {
      changeTypeBtn(type) {
        this.$emit('changeTypeBtn', type)
      },
      handleClick(tab) {
        this.$emit('handleClick', tab)
      },
    },
  }
</script>
