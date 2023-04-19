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
            :src="form.img"
            style="width: 200px; height: 200px"
          >
            <div slot="error" class="el-image__error">暂无图片</div>
          </el-image>
          <el-image :src="form.img" style="width: 80px; height: 80px">
            <div slot="error" class="el-image__error">暂无图片</div>
          </el-image>
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
            {{ form.name }}
          </div>
          <div style="margin: 10px 0 10px 0; color: #a8a9c3">
            <span>{{ form.sn }}</span>
            &nbsp;
            <span>{{ form.other_sn }}</span>
          </div>
          <div>
            <span style="color: #a8a9c3">销售价</span>
            &nbsp;
            <span style="color: red">￥{{ form.price }}</span>
          </div>
        </div>
      </div>
      <div style="display: flex; color: #3d4069">
        <div style="margin-right: 20px">
          <div style="margin-bottom: 20px; font-size: 14px; font-weight: 600">
            销售件数
          </div>
          <div style="font-size: 20px; font-weight: 600">
            {{ form.all_sum_num }}
          </div>
        </div>
        <div style="margin-right: 20px">
          <div style="margin-bottom: 20px; font-size: 14px; font-weight: 600">
            销售额
          </div>
          <div style="font-size: 20px; font-weight: 600">
            ￥{{ form.all_sum_total }}
          </div>
        </div>
        <div style="margin-right: 20px">
          <div style="margin-bottom: 20px; font-size: 14px; font-weight: 600">
            库存合计
          </div>
          <div style="font-size: 20px; font-weight: 600">
            {{ form.all_sum_xh }}
          </div>
        </div>
      </div>
    </div>
    <el-table
      ref="expandstable"
      v-loading="listLoading"
      :data="tableData"
      :expand-row-keys="expands"
      :row-key="getRowKeys"
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column type="expand" width="1">
        <template slot-scope="props">
          <el-table :data="props.row.spec_info" style="width: 100%">
            <el-table-column label="颜色" prop="color_name" />
            <el-table-column label="尺码" prop="size_name" />
            <el-table-column label="销售件数" prop="sum_num" />
            <el-table-column label="现货库存" prop="xh_num" />
            <el-table-column label="生产中库存" prop="zsc_num" />
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="商品信息" width="350">
        <template #default="{ row }">
          <div style="display: flex; margin-left: -10px">
            <el-tooltip placement="top">
              <el-image
                slot="content"
                :src="row.img"
                style="width: 200px; height: 200px"
              >
                <div slot="error" class="el-image__error">暂无图片</div>
              </el-image>
              <el-image :src="row.img" style="width: 80px; height: 80px">
                <div slot="error" class="el-image__error">暂无图片</div>
              </el-image>
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
                {{ row.name }}
              </div>
              <div style="margin: 5px 0 0 0">
                {{ row.sn }}
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
                    ￥{{ row.price | moneyFormat }}
                  </span>
                </div>
                <div>
                  {{ row.create_time }}
                </div>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="销售件数" prop="sum_num" />
      <el-table-column align="center" label="现货库存" prop="sum_xh_num" />
      <el-table-column align="center" label="生产中库存" prop="sum_zsc_num" />
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
        // 商品信息
        form: {},
        // 弹窗状态
        dialogFormVisible: false,
        // 商品列表 loading 数据
        listLoading: false,
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
      }
    },
    created() {},
    methods: {
      /*点击更多展开table*/
      async expandsHandle(row) {
        this.$refs.expandstable.toggleRowExpansion(row)
      },
      async showEdit(row) {
        this.dialogFormVisible = true
        this.listLoading = true
        const { data } = await this.api.getMergeStock({
          goods_id: row.id, //商品id
        })
        this.tableData = data.goods_list
        this.form = data.all_info
        this.listLoading = false
      },
      close() {
        this.dialogFormVisible = false
      },
    },
  }
</script>
