<template>
  <el-dialog
    title="同款商品"
    :visible.sync="dialogFormVisible"
    width="50%"
    @close="close"
  >
    <div style="display: flex; justify-content: space-between">
      <div style="display: flex">
        <el-tooltip placement="top">
          <el-image
            slot="content"
            src="https://img.wechatboss.com/FlXEXc07TF2wSn75Hrh51E_PV5Fp"
            style="width: 200px; height: 200px"
          />
          <el-image
            src="https://img.wechatboss.com/FlXEXc07TF2wSn75Hrh51E_PV5Fp"
            style="width: 80px; height: 80px"
          />
        </el-tooltip>
        <div style="width: 280px; margin-top: 5px; margin-left: 10px">
          <div
            style="
              width: 150px;
              overflow: hidden;
              font-size: 14px;
              font-weight: 600;
              color: #3d4069;
              text-align: left;
              text-overflow: ellipsis;
              white-space: nowrap;
            "
          >
            棉布背带裤【合并中】
          </div>
          <div style="margin: 10px 0 10px 0; color: #a8a9c3">
            <span>YZ13011</span>
            &nbsp;
            <span>YZ13011-1</span>
          </div>
          <div>
            <span style="color: #a8a9c3">销售价</span>
            &nbsp;
            <span style="color: red">￥198</span>
            &nbsp;
            <span style="color: red">￥398</span>
          </div>
        </div>
      </div>
      <div style="display: flex; color: #3d4069">
        <div style="margin-right: 20px">
          <div style="margin-bottom: 20px; font-size: 14px; font-weight: 600">
            销售件数
          </div>
          <div style="font-size: 20px; font-weight: 600">100000</div>
        </div>
        <div style="margin-right: 20px">
          <div style="margin-bottom: 20px; font-size: 14px; font-weight: 600">
            销售额
          </div>
          <div style="font-size: 20px; font-weight: 600">$100000</div>
        </div>
        <div style="margin-right: 20px">
          <div style="margin-bottom: 20px; font-size: 14px; font-weight: 600">
            库存合计
          </div>
          <div style="font-size: 20px; font-weight: 600">1000000</div>
        </div>
      </div>
    </div>
    <el-table
      ref="expandstable"
      :data="tableData"
      :expand-row-keys="expands"
      :row-key="getRowKeys"
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column type="expand" width="1">
        <template slot-scope="props">
          <el-table :data="props.row.is_show" style="width: 100%">
            <el-table-column label="颜色" prop="color" />
            <el-table-column label="尺码" prop="size" />
            <el-table-column label="销售件数" prop="order_num" />
            <el-table-column label="现货库存" prop="not_delivery_num" />
            <el-table-column label="生产中库存" prop="outage_rate" />
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="商品信息" width="350">
        <template #default="{ row }">
          <div style="display: flex; margin-left: -10px">
            <el-tooltip placement="top">
              <el-image
                slot="content"
                :src="row.goods_img"
                style="width: 200px; height: 200px"
              />
              <el-image
                :src="row.goods_img"
                style="width: 80px; height: 80px"
              />
            </el-tooltip>
            <div style="width: 250px; margin-left: 10px">
              <div
                style="
                  width: 150px;
                  overflow: hidden;
                  font-size: 14px;
                  font-weight: 600;
                  text-align: left;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                "
              >
                {{ row.goods_name }}
              </div>
              <div style="margin: 5px 0 0 0">
                {{ row.goods_sn }}
              </div>
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  margin: 5px 0 0 0;
                "
              >
                <div>
                  <span style="color: red">
                    ￥{{ row.sale_price | moneyFormat }}
                  </span>
                </div>
                <div>
                  {{ row.create_time | formatTime }}
                </div>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="销售件数" prop="zsc_total" />
      <el-table-column align="center" label="现货库存" prop="zsc_total" />
      <el-table-column align="center" label="生产中库存" prop="zsc_total" />
      <el-table-column
        align="center"
        fixed="right"
        label="操作"
        prop="unit"
        width="100"
      >
        <template slot-scope="scope">
          <el-button
            class="fs-16"
            size="medium"
            type="text"
            @click="expandsHandle(scope.row)"
          >
            更多
            <i class="el-icon-arrow-down el-icon--right fs-20"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        //设置row-key只展示一行
        expands: [], //只展开一行放入当前行id
        getRowKeys: (row) => {
          //获取当前行id
          return row.id //这里看这一行中需要根据哪个属性值是id
        },
        tableData: [
          {
            not_delivery_num: '32',
            num: '32',
            goods_id: 711,
            goods_sn: 'YZ13002',
            goods_name: '棉布背带裙',
            create_time: 1671125846,
            sale_price: '109.00',
            goods_img:
              'https://img.wechatboss.com/FkV-x3-FbnJ6M3Ag2TovXXopOg_H',
            outage_rate: '100%',
            xh_total: -32,
            zsc_total: 0,
            is_show: [],
          },
          {
            not_delivery_num: '32',
            num: '32',
            goods_id: 711,
            goods_sn: 'YZ13002',
            goods_name: '棉布背带裙',
            create_time: 1671125846,
            sale_price: '109.00',
            goods_img:
              'https://img.wechatboss.com/FkV-x3-FbnJ6M3Ag2TovXXopOg_H',
            outage_rate: '100%',
            xh_total: -32,
            zsc_total: 0,
            is_show: [],
          },
        ],
        form: {},
        dialogFormVisible: false,
      }
    },
    created() {},
    methods: {
      /*点击更多展开table*/
      async expandsHandle(row) {
        const { data } = await this.api.getWarehouseAnalysisRankDetail({
          goods_id: 711,
        })
        row.is_show = data
        this.$refs.expandstable.toggleRowExpansion(row)
      },
      showEdit(row) {
        this.form = Object.assign({}, row)
        this.dialogFormVisible = true
      },
      close() {
        this.dialogFormVisible = false
      },
    },
  }
</script>
