<template>
  <div class="components-drawer" style="padding: 0 20px">
    <h4>基础信息</h4>
    <div style="display: flex; margin-bottom: 10px">
      <div style="width: 50%">总件数：{{ form.order_info.quantity }} 件</div>
      <div style="width: 50%">
        总金额：
        <el-tag>￥{{ form.order_info.total_price | moneyFormat }}</el-tag>
      </div>
    </div>
    <div style="display: flex; margin-bottom: 10px">
      <div style="width: 50%">批次：{{ form.order_info.id }}</div>
      <div style="width: 50%">供应商： {{ form.order_info.supplier_name }}</div>
    </div>
    <div v-if="drawerType == 2">
      <div style="display: flex; margin-bottom: 10px">
        <div style="width: 50%">
          入库类型：{{ form.order_info.receipt_type }}
        </div>
        <div style="width: 50%">
          入库仓： {{ form.order_info.receipt_warehouse }}
        </div>
      </div>
      <div style="display: flex; margin-bottom: 10px">
        <div style="width: 50%">开单日期：{{ form.order_info.order_date }}</div>
        <div style="width: 50%">创建时间：{{ form.order_info.order_time }}</div>
      </div>
      <div style="display: flex; margin-bottom: 10px">
        <div style="width: 50%">操作者：{{ form.order_info.author }}</div>
        <div v-if="form.order_info.is_void" style="width: 50%">
          状态：
          <el-tag type="danger">作废</el-tag>
        </div>
        <div v-else style="width: 50%">
          状态：
          <el-tag type="success">正常</el-tag>
        </div>
      </div>
      <div style="display: flex; margin-bottom: 10px">
        <div style="width: 100%">备注：{{ form.order_info.remarks }}</div>
      </div>
    </div>

    <div v-if="drawerType == 1">
      <div style="display: flex; margin-bottom: 10px">
        <div style="width: 50%">操作者：{{ form.order_info.author }}</div>
        <div style="width: 50%">创建时间：{{ form.order_info.order_time }}</div>
      </div>
      <div style="display: flex; margin-bottom: 10px">
        <div v-if="form.order_info.is_void" style="width: 50%">
          状态：
          <el-tag type="danger">作废</el-tag>
        </div>
        <div v-else style="width: 50%">
          状态：
          <el-tag type="success">正常</el-tag>
        </div>
        <div style="width: 50%">备注：{{ form.order_info.remarks }}</div>
      </div>
    </div>
    <h4>商品信息</h4>
    <el-row :gutter="20" style="height: calc(60vh); overflow: auto">
      <el-col v-for="(item, index) in form.goods_list" :key="index" :span="12">
        <el-card class="box-card" shadow="hover">
          <div style="display: flex">
            <el-image :src="item.goods_img" style="width: 140px; height: 140px">
              <div slot="error" class="el-image__error">暂无图片</div>
            </el-image>
            <div style="margin-left: 20px">
              <div style="margin-bottom: 10px">款号：{{ item.goods_sn }}</div>
              <div style="margin-bottom: 10px">名称：{{ item.goods_name }}</div>
              <div style="margin-bottom: 10px">波段：{{ item.band_name }}</div>
              <div style="margin-bottom: 10px">
                单价：
                <el-tag>￥{{ item.goods_price | moneyFormat }}</el-tag>
              </div>
              <div style="margin-bottom: 10px">
                合计：
                <el-tag>￥{{ item.goods_total | moneyFormat }}</el-tag>
              </div>
            </div>
          </div>
          <el-table
            border
            :data="item.details"
            style="width: 100%; height: 250px; margin-top: 20px; overflow: auto"
          >
            <el-table-column label="颜色" prop="colorname" />
            <el-table-column label="尺码" prop="sizename" />
            <el-table-column
              v-if="drawerType == 1"
              label="裁床数量"
              prop="quantity"
            />
            <el-table-column
              v-if="drawerType == 2"
              label="入库数量"
              prop="quantity"
            />
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    props: {
      drawerInof: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        drawerType: null,
        tableData: [],
        form: {
          order_info: {
            id: null,
            supplier_name: null,
            quantity: null,
            total_price: null,
            order_time: null,
            remarks: null,
            order_date: null,
            type: null,
            author: null,
            is_void: false,
            receipt_type: null,
            receipt_warehouse: null,
            ordertype: null,
          },
          goods_list: [
            {
              goods_name: null,
              band_name: null,
              goods_img: null,
              quantity: null,
              goods_id: null,
              goods_sn: null,
              original_price: null,
              goods_price: null,
              goods_total: null,
              details: [
                {
                  colorname: null,
                  sizename: null,
                  quantity: null,
                  goodsdetail_id: null,
                },
              ],
            },
          ],
        },
      }
    },
    watch: {
      drawerInof: {
        handler(val) {
          this.drawerType = val.drawerType
          this.getDetails(val)
        },
        immediate: true,
        deep: true,
      },
    },
    created() {},
    methods: {
      async getDetails(val) {
        if (this.drawerType == 2) {
          const { data } = await this.api.getInboundOrderDetail({
            order_id: val.id,
          })
          this.form = data
        } else if (this.drawerType == 1) {
          const { data } = await this.api.getCuttingOrderDetail({
            order_id: val.id,
          })
          this.form = data
        }
      },
    },
  }
</script>
<style lang="scss" scoped></style>
